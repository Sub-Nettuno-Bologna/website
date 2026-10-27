import type { APIRoute } from "astro";
import { getAiDiscoveryData, textResponse } from "@/lib/aiDiscovery";

export const GET: APIRoute = async () => {
  const data = await getAiDiscoveryData();
  const { address, email, telephone } = data.contact;

  const lines = [
    `# ${data.name}`,
    "",
    `> ${data.description}`,
    "",
    "## Pagine principali",
    ...data.pages.map((page) => `- [${page.title}](${page.url}): ${page.description}`),
    "",
    "## Corsi",
    ...data.services.map(
      (service) =>
        `- [${service.title}](${service.url})${service.description ? `: ${service.description}` : ""}`,
    ),
    "",
    "## Contatti",
    ...(address?.streetAddress ? [`- Indirizzo: ${address.streetAddress}`] : []),
    ...(telephone ? [`- Telefono: ${telephone}`] : []),
    ...(email ? [`- Email: ${email}`] : []),
    "",
    "## Optional",
    `- [FAQ (JSON)](${data.abs("/ai/faq.json")})`,
    `- [Riepilogo sito (JSON)](${data.abs("/ai/summary.json")})`,
    `- [Servizi (JSON)](${data.abs("/ai/service.json")})`,
    `- [Feed RSS](${data.abs("/rss.xml")})`,
    "",
  ];

  return textResponse(lines.join("\n"));
};
