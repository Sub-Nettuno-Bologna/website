import { createClient } from "@sanity/client";

const PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID || "r56dtkaq";
const DATASET = process.env.PUBLIC_SANITY_DATASET || "production";
const API_VERSION = "2023-01-01";

/** Events older than this are kept online but dropped from the sitemap. */
const OLD_EVENT_MONTHS = 24;
const MONTH_MS = 30.44 * 24 * 60 * 60 * 1000;

type CategoryRow = {
  slug: string;
  _updatedAt?: string;
  courses?: Array<{ slug: string | null; _updatedAt?: string }> | null;
};
type EventRow = {
  slug: string;
  _updatedAt?: string;
  eventDate?: string | null;
};
type PostRow = { slug: string; _updatedAt?: string };
type FaqRow = { _updatedAt?: string; updatedAt?: string } | null;

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

function newest(...dates: Array<string | null | undefined>): string | undefined {
  let max = 0;
  for (const date of dates) {
    if (!date) continue;
    const time = Date.parse(date);
    if (!Number.isNaN(time) && time > max) max = time;
  }
  return max > 0 ? new Date(max).toISOString() : undefined;
}

/**
 * Builds a pathname -> lastmod map (from Sanity document updates) and the set of
 * URL paths that must be kept out of the sitemap (past events, duplicate courses).
 * Fails soft: on any error the build continues without lastmod/exclusions.
 */
export async function buildSitemapData(): Promise<{
  lastmod: Map<string, string>;
  excludedPaths: Set<string>;
}> {
  const lastmod = new Map<string, string>();
  const excludedPaths = new Set<string>();

  try {
    const client = createClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      apiVersion: API_VERSION,
      useCdn: false,
    });

    const data = await client.fetch<{
      categories?: CategoryRow[];
      events?: EventRow[];
      posts?: PostRow[];
      faq?: FaqRow;
      singletons?: Array<{ _updatedAt?: string }>;
    }>(`{
      "categories": *[_type == "course-category" && defined(slug.current)] | order(orderRank asc) {
        "slug": slug.current,
        _updatedAt,
        "courses": courses[]->{ "slug": slug.current, _updatedAt }
      },
      "events": *[_type == "event" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt,
        eventDate
      },
      "posts": *[_type == "blog" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      },
      "faq": *[_type == "faqPage"][0]{ _updatedAt, updatedAt },
      "singletons": *[_type in ["hero", "seo", "club", "aboutus", "faqPage", "team"]] {
        _updatedAt
      }
    }`);

    const categories = data.categories ?? [];
    const events = data.events ?? [];
    const posts = data.posts ?? [];
    const faq = data.faq ?? null;
    const singletons = data.singletons ?? [];

    const categoryLastmods: string[] = [];
    const eventLastmods: string[] = [];
    const postLastmods: string[] = [];
    const claimedCourses = new Set<string>();

    for (const category of categories) {
      const categoryCourses = category.courses ?? [];
      const categoryLast = newest(
        category._updatedAt,
        ...categoryCourses.map((course) => course._updatedAt)
      );
      if (categoryLast) {
        lastmod.set(normalizePath(`/corsi/${category.slug}`), categoryLast);
        categoryLastmods.push(categoryLast);
      }

      for (const course of categoryCourses) {
        if (!course.slug) continue;
        const coursePath = normalizePath(`/corsi/${category.slug}/${course.slug}`);

        // A course reachable through several categories is a duplicate: keep the
        // first category (lowest orderRank) and drop the rest from the sitemap.
        if (claimedCourses.has(course.slug)) {
          excludedPaths.add(coursePath);
          continue;
        }
        claimedCourses.add(course.slug);

        const courseLast = newest(course._updatedAt, category._updatedAt);
        if (courseLast) lastmod.set(coursePath, courseLast);
      }
    }

    const coursesIndexLast = newest(...categoryLastmods);
    if (coursesIndexLast) lastmod.set("/corsi", coursesIndexLast);

    const cutoff = Date.now() - OLD_EVENT_MONTHS * MONTH_MS;
    for (const event of events) {
      const eventPath = normalizePath(`/eventi/${event.slug}`);
      const eventTime = event.eventDate ? Date.parse(event.eventDate) : NaN;

      if (!Number.isNaN(eventTime) && eventTime < cutoff) {
        excludedPaths.add(eventPath);
        continue;
      }
      if (event._updatedAt) {
        lastmod.set(eventPath, event._updatedAt);
        eventLastmods.push(event._updatedAt);
      }
    }

    const eventsIndexLast = newest(...eventLastmods);
    if (eventsIndexLast) lastmod.set("/eventi", eventsIndexLast);

    for (const post of posts) {
      if (post._updatedAt) {
        lastmod.set(normalizePath(`/blog/${post.slug}`), post._updatedAt);
        postLastmods.push(post._updatedAt);
      }
    }

    const blogIndexLast = newest(...postLastmods);
    if (blogIndexLast) lastmod.set("/blog", blogIndexLast);

    if (faq) {
      const faqLast = newest(faq.updatedAt, faq._updatedAt);
      if (faqLast) lastmod.set("/domande-frequenti", faqLast);
    }

    const homeLast = newest(
      ...categoryLastmods,
      ...eventLastmods,
      ...postLastmods,
      faq?.updatedAt,
      faq?._updatedAt,
      ...singletons.map((singleton) => singleton._updatedAt)
    );
    if (homeLast) lastmod.set("/", homeLast);
  } catch (error) {
    console.warn("[sitemap-lastmod] Sanity fetch failed, skipping lastmod/exclusions:", error);
    return { lastmod: new Map(), excludedPaths: new Set() };
  }

  return { lastmod, excludedPaths };
}
