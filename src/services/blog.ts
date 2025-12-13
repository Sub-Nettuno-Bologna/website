import { fetchList, fetchOne } from "@/lib/sanityFetch";
import type { Blog } from "../../sanity.types";

type BlogListOptions = {
  page?: number;
  pageSize?: number;
};

export async function getBlogPosts(options?: BlogListOptions): Promise<Blog[]> {
  const hasPagination = Number.isFinite(options?.page) || Number.isFinite(options?.pageSize);

  if (hasPagination) {
    const currentPage = options?.page && options.page > 0 ? Math.floor(options.page) : 1;
    const size = options?.pageSize && options.pageSize > 0 ? Math.floor(options.pageSize) : 12;
    const offset = (currentPage - 1) * size;
    const end = offset + size;

    const BLOGS_PAGE_QUERY = `*[
        _type == "blog" && defined(slug.current)
      ] | order(publishedAt desc) [$offset...$end] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage,
        content,
        publishedAt,
        featured
      }`;

    return await fetchList<Blog>(BLOGS_PAGE_QUERY, { offset, end });
  }

  const BLOGS_QUERY = `*[
        _type == "blog" && defined(slug.current)
      ] | order(publishedAt desc) {
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage,
        content,
        publishedAt,
        featured
      }`;
  return await fetchList<Blog>(BLOGS_QUERY);
}

export async function getBlogPostBySlug(slug: string): Promise<Blog | null> {
  const BLOG_QUERY = `*[
      _type == "blog" && slug.current == $slug
    ][0] {
      _id,
      _type,
      title,
      slug,
      excerpt,
      featuredImage,
      content,
      publishedAt,
      featured
    }`;
  return await fetchOne<Blog>(BLOG_QUERY, { slug });
}

export async function getAllBlogPostsForStaticPaths(): Promise<Blog[]> {
  try {
    return await getBlogPosts();
  } catch (error) {
    console.error("Error fetching blog posts for static paths:", error);
    return [];
  }
}

export async function getBlogTotalCount(): Promise<number> {
  const COUNT_QUERY = `count(*[_type == "blog" && defined(slug.current)])`;
  const count = await fetchOne<number>(COUNT_QUERY);
  return typeof count === "number" ? count : 0;
}

// getBlogPostsPage removed in favor of getBlogPosts(options)
