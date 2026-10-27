import type { APIRoute } from "astro";
import { getAiDiscoveryData, jsonResponse } from "@/lib/aiDiscovery";

export const GET: APIRoute = async () => {
  const data = await getAiDiscoveryData();

  return jsonResponse({
    provider: data.name,
    url: data.siteUrl,
    services: data.services,
  });
};
