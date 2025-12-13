import { fetchList, fetchOne } from "@/lib/sanityFetch";
import type { Course, CourseCategory, Slug } from "../../sanity.types";
import { sanityClient } from "@/lib/sanity";

// List course categories for general views
export async function getCourseCategories(): Promise<
  Array<CourseCategory & { coursesCount: number }>
> {
  const QUERY = `*[_type == "course-category" && defined(slug.current)] | order(orderRank asc) {
    _id,
    _type,
    title,
    slug,
    description,
    image,
    "coursesCount": count(courses)
  }`;
  return await fetchList<CourseCategory & { coursesCount: number }>(QUERY);
}

// Static paths helpers
export async function getAllCourseCategorySlugs(): Promise<string[]> {
  const QUERY = `*[_type == "course-category" && defined(slug.current)].slug.current`;
  return await fetchList<string>(QUERY);
}

export async function getAllCategoryCoursePaths(): Promise<
  Array<{ category: string; course: string }>
> {
  const QUERY = `*[_type == "course-category" && defined(slug.current)]{
    "category": slug.current,
    "courses": courses[]->slug.current
  }`;
  const rows = await fetchList<{ category: string; courses: (string | null)[] }>(QUERY);
  const paths: Array<{ category: string; course: string }> = [];
  for (const row of rows) {
    for (const courseSlug of row.courses || []) {
      if (courseSlug) paths.push({ category: row.category, course: courseSlug });
    }
  }
  return paths;
}

// Get single category by slug
export async function getCategoryBySlug(categorySlug: string): Promise<CourseCategory | null> {
  const QUERY = `*[_type == "course-category" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    description,
    image,
    courses[]->{
      _id,
      _type,
      title,
      slug,
      description,
      image,
      duration,
      level,
      certification,
      maxDepth,
      prerequisites,
      whatYouWillLearn,
      capabilities,
      structure,
      kit,
      nextCourses[]->{
        _id,
        _type,
        title,
        slug,
        description,
        image,
        duration,
        level,
        certification,
        maxDepth,
        prerequisites,
        whatYouWillLearn,
        capabilities,
        structure,
        kit,
      }
    }
  }`;
  const result = await fetchOne<CourseCategory>(QUERY, { slug: categorySlug });
  return result;
}

// Get a single course by slug with related info (category + nextCourses)
export async function getCourse({ slug }: { slug: Slug["current"] | string }): Promise<
  | (Course & {
      categorySlug?: string | null;
      nextCourses?: Array<{
        title?: string;
        slug?: string;
        categorySlug?: string | null;
      }>;
    })
  | null
> {
  const QUERY = `*[_type == "course" && slug.current == $slug][0]{
    ...,
    "categorySlug": *[_type == "course-category" && references(^._id)][0].slug.current,
    "nextCourses": nextCourses[]->{
      title,
      "slug": slug.current,
      "categorySlug": *[_type == "course-category" && references(^._id)][0].slug.current
    }
  }`;
  return await fetchOne<
    Course & {
      categorySlug?: string | null;
      nextCourses?: Array<{
        title?: string;
        slug?: string;
        categorySlug?: string | null;
      }>;
    }
  >(QUERY, { slug });
}
