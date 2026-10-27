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
    return withCanonicalOrigin(await fetchOne<Seo>(SEO_QUERY));
}

// Sanity stores the apex domain; structured data must use the canonical origin.
function withCanonicalOrigin(seo: Seo | null): Seo | null {
    const origin = new URL(import.meta.env.SITE).origin;
    const normalize = (url?: string) => {
        if (!url) return url;
        const parsed = new URL(url);
        return parsed.hostname === new URL(origin).hostname.replace(/^www\./, "")
            ? origin + parsed.pathname.replace(/\/$/, "") + parsed.search + parsed.hash
            : url;
    };
    if (!seo) return seo;
    return {
        ...seo,
        siteUrl: normalize(seo.siteUrl),
        organization: seo.organization && {
            ...seo.organization,
            url: normalize(seo.organization.url),
        },
    };
}

