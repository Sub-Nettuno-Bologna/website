import type { APIRoute } from "astro";
import { getAiDiscoveryData, textResponse } from "@/lib/aiDiscovery";

// Mirrors the Content-Signal policy declared in public/robots.txt.
export const GET: APIRoute = async () => {
  const data = await getAiDiscoveryData();

  return textResponse(
    [
      `# AI crawler policy for ${data.name}`,
      "User-Agent: *",
      "Allow: /",
      "Disallow: /admin",
      "",
      "# Permissions (same as robots.txt Content-Signal)",
      "Training: allowed",
      "Search: allowed",
      "Input: allowed",
      "",
      `Summary: ${data.abs("/ai/summary.json")}`,
      `LLMs: ${data.abs("/llms.txt")}`,
      "",
    ].join("\n"),
  );
};
