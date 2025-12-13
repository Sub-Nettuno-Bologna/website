import { fetchList, fetchOne } from "@/lib/sanityFetch";
import type { Team } from "../../sanity.types";

export async function getTeam({ active = true }: { active?: boolean } = {}): Promise<Team[]> {
  const baseProjection = `{
        _id,
        _type,
        name,
        instructor_grade,
        description,
        image,
        active,
        council,
        council_seat
    }`;

  const QUERY = `*[_type == "team"${active ? " && active == true" : ""}] | order(council desc, name asc) ${baseProjection}`;

  return await fetchList<Team>(QUERY);
}

export async function getTeamMemberById(id: string): Promise<Team | null> {
  const MEMBER_QUERY = `*[_type == "team" && _id == $id][0] {
        _id,
        _type,
        name,
        instructor_grade,
        description,
        image,
        active,
        council,
        council_seat
    }`;
  return await fetchOne<Team>(MEMBER_QUERY, { id });
}
