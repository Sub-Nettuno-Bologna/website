import { fetchOne } from "@/lib/sanityFetch";
import type { Seo } from "../../sanity.types";

export async function getSeo(): Promise<Seo | null> {
    const SEO_QUERY = `*[_type == "seo"][0] {
    _id,
    _type,
    siteName,
    siteUrl,
    inLanguage,
    organization {
      name,
      alternateName,
      url,
      email,
      telephone,
      logo,
      image,
      description,
      priceRange,
      areaServedCity,
      sameAs,
      address {
        streetAddress,
        addressLocality,
        postalCode,
        addressRegion,
        addressCountry
      },
      geo {
        latitude,
        longitude
      },
      offerCatalogName,
      aggregateRating {
        ratingValue,
        reviewCount
      },
      reviews[] {
        authorName,
        datePublished,
        reviewBody,
        rating {
          ratingValue,
          bestRating,
          worstRating
        }
      },
      keywords
    }
  }`;
    return await fetchOne<Seo>(SEO_QUERY);
}

