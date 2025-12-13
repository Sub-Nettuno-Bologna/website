import { fetchOne } from "@/lib/sanityFetch";
import type { Club } from "../../sanity.types";

export async function getClubData(): Promise<Club | null> {
  const CLUB_DATA_QUERY = `*[_type == "club"][0] {
        _id,
        _type,
        clubName,
        subtitle,
        description,
        logo,
        cf,
        piva,
        address,
        addressLink,
        phoneSchedule,
        phone,
        openingHours[] {
          dayOfWeek,
          opens,
          closes
        },
        whatsapp,
        email,
        instagram,
        facebook,
        other
    }`;
  return await fetchOne<Club>(CLUB_DATA_QUERY);
}
