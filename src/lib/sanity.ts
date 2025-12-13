import { createClient } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import type { CourseCategory } from "../../sanity.types";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? "h3gj11wn";
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? "2023-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  // Use CDN on production for faster, cached responses, disable on dev
  useCdn: import.meta.env.PROD,
  apiVersion,
});

export const urlFor = (source: SanityImageSource) => {
  if (!source) return null;
  if (typeof source === "string") return source;
  return projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;
};

export type BuildImageOptions = {
  width?: number;
  height?: number;
  format?: "webp" | "jpg" | "jpeg" | "png" | string;
  quality?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | string;
  placeholder?: string;
};

export function buildImageUrl(
  source: SanityImageSource | null | undefined,
  options?: BuildImageOptions
): string {
  const fallback = options?.placeholder ?? "/placeholder.svg";
  const defaultOptions = {
    format: "webp",
    quality: 70,
  };
  const mergedOptions = { ...defaultOptions, ...options };
  if (!source) return fallback;
  const built = urlFor(source as SanityImageSource);

  if (!built) return fallback;
  if (typeof built === "string") return built;

  let builder = built;
  if (mergedOptions?.width) builder = builder.width(mergedOptions.width);
  if (mergedOptions?.height) builder = builder.height(mergedOptions.height);
  if (mergedOptions?.format) builder = builder.format(mergedOptions.format as any);
  if (mergedOptions?.quality) builder = builder.quality(mergedOptions.quality);
  if (mergedOptions?.fit) builder = builder.fit(mergedOptions.fit as any);

  return builder.url();
}

export function getCategoryHref(category: CourseCategory): string {
  return `/corsi/${category.slug?.current}`;
}
