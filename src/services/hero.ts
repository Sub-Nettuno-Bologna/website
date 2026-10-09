import { fetchOne } from "@/lib/sanityFetch";
import type { Hero } from "../../sanity.types";

export async function getHero(): Promise<Hero | null> {
  const HERO_QUERY = `*[_type == "hero"][0] {
        _id,
        _type,
        title,
        seoTitle,
        seoDescription,
        subtitle,
        images,
        buttons
    }`;
  return await fetchOne<Hero>(HERO_QUERY);
}
