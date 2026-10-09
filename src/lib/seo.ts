const SITE_NAME = "Club Sub Nettuno";
const DESCRIPTION_LIMIT = 160;

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/** Extract text without rendering markup or including image/embedded blocks. */
export function firstParagraph(value: unknown): string {
  if (typeof value === "string") {
    return normalizeText(value.trim().split(/\n\s*\n/)[0] ?? "");
  }
  if (!Array.isArray(value)) return "";

  for (const block of value) {
    if (block?._type !== "block" || !Array.isArray(block.children)) continue;
    if (block.style && block.style !== "normal") continue;
    const text = block.children
      .filter((child: { text?: unknown }) => typeof child?.text === "string")
      .map((child: { text: string }) => child.text)
      .join("");
    const paragraph = firstParagraph(text);
    if (paragraph) return paragraph;
  }
  return "";
}

function excerpt(text: string): string {
  if (text.length <= DESCRIPTION_LIMIT) return text;
  const prefix = text.slice(0, DESCRIPTION_LIMIT - 1);
  const lastSpace = prefix.lastIndexOf(" ");
  return `${prefix.slice(0, lastSpace > 0 ? lastSpace : prefix.length).trimEnd()}…`;
}

export function buildPageSeo(options: {
  title: string;
  description?: unknown;
  seoTitle?: string | null;
  seoDescription?: string | null;
}): { title: string; description: string } {
  const baseTitle = normalizeText(options.title)
    .replace(/\s*[|–—-]?\s*Club Sub Nettuno\b/gi, "")
    .trim();
  const location = /\bBologna\b/i.test(baseTitle) ? "" : " a Bologna";
  const title = options.seoTitle?.trim()
    ? normalizeText(options.seoTitle)
    : `${baseTitle || "Corsi subacquea e apnea"}${location} | ${SITE_NAME}`;
  const description = options.seoDescription?.trim()
    ? normalizeText(options.seoDescription)
    : excerpt(firstParagraph(options.description));

  return { title, description };
}
