import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/blog";
import { getCourses, STATIC_COURSES } from "@/lib/courses";
import { getCoursePath } from "@/lib/course-paths";
import { siteConfig } from "@/lib/seo";

const STATIC_ROUTES = [
  "",
  "/home",
  "/courses",
  "/teachers",
  "/blog",
  "/about",
  "/contact",
  "/login",
  "/signup",
  "/forgot-password",
  "/privacy-policy",
  "/terms"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let courses = STATIC_COURSES;
  let posts = getBlogPosts();

  try {
    const fetched = await getCourses();
    if (fetched.length) courses = fetched;
  } catch {
    // Supabase unavailable at build time — use static fallback
  }

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${siteConfig.url}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7
    })),
    ...courses.map((course) => ({
      url: `${siteConfig.url}${getCoursePath(course)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishDate),
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ];
}
