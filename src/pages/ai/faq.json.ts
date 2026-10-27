import type { APIRoute } from "astro";
import { getAiDiscoveryData, jsonResponse } from "@/lib/aiDiscovery";

export const GET: APIRoute = async () => {
  const data = await getAiDiscoveryData();

  return jsonResponse({
    source: data.abs("/domande-frequenti"),
    faqs: data.faqs,
  });
};
