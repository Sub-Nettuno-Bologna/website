import { fetchOne } from "@/lib/sanityFetch";
import type { FaqPage } from "../../sanity.types";

export async function getFaqPage(): Promise<FaqPage | null> {
  const FAQ_PAGE_QUERY = `*[_type == "faqPage"][0] {
    _id,
    _type,
    title,
    description,
    updatedAt,
    faqs[] {
      question,
      answer
    }
  }`;
  return await fetchOne<FaqPage>(FAQ_PAGE_QUERY);
}

