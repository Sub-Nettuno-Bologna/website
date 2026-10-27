import type { APIRoute } from "astro";
import { escapeXml, getAiDiscoveryData } from "@/lib/aiDiscovery";

export const GET: APIRoute = async () => {
  const data = await getAiDiscoveryData();

  const items = data.posts
    .map((post) =>
      [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${post.url}</link>`,
        `<guid>${post.url}</guid>`,
        ...(post.publishedAt ? [`<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`] : []),
        ...(post.excerpt ? [`<description>${escapeXml(post.excerpt)}</description>`] : []),
        "</item>",
      ].join(""),
    )
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0"><channel>` +
    `<title>${escapeXml(data.name)}</title>` +
    `<link>${data.siteUrl}</link>` +
    `<description>${escapeXml(data.description)}</description>` +
    `<language>${data.language}</language>` +
    items +
    `</channel></rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
