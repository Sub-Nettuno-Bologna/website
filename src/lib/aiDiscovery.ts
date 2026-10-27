import { getSeo } from "@/services/seo";
import { getCourseCategories } from "@/services/courses";
import { getFaqPage } from "@/services/faq";
import { getBlogPosts } from "@/services/blog";
import { absoluteUrl } from "@/lib/seo";

const FALLBACK_SITE_URL = "https://www.subnettuno.it";

export const AI_KEY_PAGES = [
  { title: "Corsi", path: "/corsi", description: "Corsi di subacquea e apnea" },
  { title: "Prova gratuita", path: "/prova-gratuita", description: "Prova sub e apnea gratuita in piscina" },
  { title: "Domande frequenti", path: "/domande-frequenti", description: "Risposte su certificati, età minima e durata dei corsi" },
  { title: "Chi siamo", path: "/chi-siamo", description: "Storia e organizzazione del club" },
  { title: "Staff", path: "/chi-siamo/staff", description: "Istruttori e staff" },
  { title: "Eventi", path: "/eventi", description: "Eventi e uscite del club" },
  { title: "Blog", path: "/blog", description: "Articoli su subacquea e apnea" },
  { title: "Contatti", path: "/contatti", description: "Dove siamo e come contattarci" },
];

/** Single Sanity-backed snapshot used by every AI discovery endpoint. */
export async function getAiDiscoveryData() {
  const [seo, categories, faqPage, posts] = await Promise.all([
    getSeo(),
    getCourseCategories(),
    getFaqPage(),
    getBlogPosts(),
  ]);

  const siteUrl = (seo?.siteUrl || FALLBACK_SITE_URL).replace(/\/+$/, "");
  const org = seo?.organization;
  const abs = (path: string) => absoluteUrl(siteUrl, path);

  return {
    siteUrl,
    abs,
    name: seo?.siteName || org?.name || "Club Sub Nettuno",
    description: org?.description || "",
    language: seo?.inLanguage || "it-IT",
    contact: {
      email: org?.email,
      telephone: org?.telephone,
      address: org?.address,
    },
    keywords: org?.keywords ?? [],
    pages: AI_KEY_PAGES.map((page) => ({ ...page, url: abs(page.path) })),
    services: categories.map((category) => ({
      title: category.title ?? "",
      description: category.description ?? "",
      url: abs(`/corsi/${category.slug?.current}`),
    })),
    faqs: (faqPage?.faqs ?? [])
      .filter((faq) => faq.question && faq.answer)
      .map((faq) => ({ question: faq.question!, answer: faq.answer! })),
    posts: posts.map((post) => ({
      title: post.title ?? "",
      excerpt: post.excerpt ?? "",
      publishedAt: post.publishedAt,
      url: abs(`/blog/${post.slug.current}`),
    })),
  };
}

export type AiDiscoveryData = Awaited<ReturnType<typeof getAiDiscoveryData>>;

export function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export function textResponse(body: string): Response {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
