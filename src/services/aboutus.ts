import { fetchOne } from "@/lib/sanityFetch";
import type { Aboutus } from "../../sanity.types";

type AboutUsWithCardSections = Aboutus & {
  cardSections?: Array<{
    title?: string;
    description?: string;
    icon?: "Award" | "Users" | "Heart" | "GlassWater" | "BookOpen";
    cta?: { href?: string; text?: string };
    _key?: string;
  }>;
};

export async function getAboutUs(): Promise<AboutUsWithCardSections | null> {
  const ABOUT_QUERY = `*[_type == "aboutus"][0] {
        _id,
        _type,
        title,
        subtitle,
        image,
        imageCaption,
        features,
        cardSections
    }`;
  return await fetchOne<AboutUsWithCardSections>(ABOUT_QUERY);
}
