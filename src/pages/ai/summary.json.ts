import type { APIRoute } from "astro";
import { getAiDiscoveryData, jsonResponse } from "@/lib/aiDiscovery";

export const GET: APIRoute = async () => {
  const data = await getAiDiscoveryData();

  return jsonResponse({
    name: data.name,
    url: data.siteUrl,
    description: data.description,
    language: data.language,
    keywords: data.keywords,
    contact: data.contact,
    pages: data.pages.map(({ title, url }) => ({ title, url })),
  });
};
