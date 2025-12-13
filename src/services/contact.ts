import { fetchOne } from "@/lib/sanityFetch";
import type { Contact } from "../../sanity.types";

export async function getContact(): Promise<Contact | null> {
  const CONTACT_QUERY = `*[_type == "contact"][0] {
        _id,
        _type,
        title,
        subtitle
    }`;
  return await fetchOne<Contact>(CONTACT_QUERY);
}
