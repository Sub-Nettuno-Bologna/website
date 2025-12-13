import { fetchList, fetchOne } from "@/lib/sanityFetch";
import type { Gallery } from "../../sanity.types";

export async function getGalleries(): Promise<Gallery[]> {
  const GALLERIES_QUERY = `*[_type == "gallery"] | order(_createdAt desc) {
        _id,
        _type,
        title,
        subtitle,
        buttonText,
        images
    }`;
  return await fetchList<Gallery>(GALLERIES_QUERY);
}

export async function getGalleryById(id: string): Promise<Gallery | null> {
  const GALLERY_QUERY = `*[_type == "gallery" && _id == $id][0] {
        _id,
        _type,
        title,
        subtitle,
        buttonText,
        images
    }`;
  return await fetchOne<Gallery>(GALLERY_QUERY, { id });
}
