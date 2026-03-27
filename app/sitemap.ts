import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/blog";
import { getCourses } from "@/lib/courses";
import { getCoursePath } from "@/lib/course-paths";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, posts] = await Promise.all([getCourses(), Promise.resolve(getBlogPosts())]);

  const staticRoutes = [
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

  return [
    ...staticRoutes.map((path) => ({
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
