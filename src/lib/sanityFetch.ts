import { sanityClient } from "@/lib/sanity";

export async function fetchList<T>(query: string, params?: Record<string, unknown>): Promise<T[]> {
  try {
    const result = await sanityClient.fetch<T[]>(query, params);
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Sanity fetchList error:", error, { query, params });
    return [];
  }
}

export async function fetchOne<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> {
  try {
    const result = await sanityClient.fetch<T | null>(query, params);
    return result;
  } catch (error) {
    console.error("Sanity fetchOne error:", error, { query, params });
    return null;
  }
}
