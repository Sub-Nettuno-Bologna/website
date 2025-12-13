import { fetchList, fetchOne } from "@/lib/sanityFetch";
import type { Event } from "../../sanity.types";

type EventListOptions = {
  page?: number;
  pageSize?: number;
};

export async function getEvents(options?: EventListOptions): Promise<Event[]> {
  const hasPagination = Number.isFinite(options?.page) || Number.isFinite(options?.pageSize);

  if (hasPagination) {
    const currentPage = options?.page && options.page > 0 ? Math.floor(options.page) : 1;
    const size = options?.pageSize && options.pageSize > 0 ? Math.floor(options.pageSize) : 12;
    const offset = (currentPage - 1) * size;
    const end = offset + size;

    const EVENTS_PAGE_QUERY = `*[
        _type == "event" && defined(slug.current)
      ] | order(eventDate desc) [$offset...$end] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage,
        content,
        eventDate,
        location,
        maxParticipants,
        registrationRequired,
        registrationDeadline,
        price,
        publishedAt,
        featured
      }`;

    return await fetchList<Event>(EVENTS_PAGE_QUERY, { offset, end });
  }

  const EVENTS_QUERY = `*[
        _type == "event" && defined(slug.current)
      ] | order(eventDate desc) {
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage,
        content,
        eventDate,
        location,
        maxParticipants,
        registrationRequired,
        registrationDeadline,
        price,
        publishedAt,
        featured
      }`;
  return await fetchList<Event>(EVENTS_QUERY);
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const EVENT_QUERY = `*[
      _type == "event" && slug.current == $slug
    ][0] {
      _id,
      _type,
      title,
      slug,
      excerpt,
      featuredImage,
      content,
      eventDate,
      location,
      maxParticipants,
      registrationRequired,
      registrationDeadline,
      price,
      publishedAt,
      featured
    }`;
  return await fetchOne<Event>(EVENT_QUERY, { slug });
}

export async function getAllEventsForStaticPaths(): Promise<Event[]> {
  try {
    return await getEvents();
  } catch (error) {
    console.error("Error fetching events for static paths:", error);
    return [];
  }
}

export async function getEventsTotalCount(): Promise<number> {
  const COUNT_QUERY = `count(*[_type == "event" && defined(slug.current)])`;
  const count = await fetchOne<number>(COUNT_QUERY);
  return typeof count === "number" ? count : 0;
}

// getEventsPage removed in favor of getEvents(options)
