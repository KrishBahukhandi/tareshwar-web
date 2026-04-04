import type { Metadata } from "next";
import Link from "next/link";

import { CourseDiscovery } from "@/components/course-card/course-discovery";
import { PageContainer } from "@/components/layout/page-container";
import { getCourses } from "@/lib/courses";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Courses for Class 8 to 12 — CBSE and State Board Students",
  description:
    "Explore school coaching courses for Class 8 to 12 with expert faculty, structured live classes, and student progress tracking for CBSE and state boards.",
  keywords: [
    "class 8 to 12 coaching courses",
    "cbse online courses",
    "class 10 board preparation",
    "class 12 board preparation",
    "school tuition online",
    "foundation course class 8 9 10"
  ],
  path: "/courses"
});

export default async function CoursesPage() {
  const courses = await getCourses();
  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tareshwar Tutorials Courses",
    itemListElement: courses.map((course, index) => ({
      "@type": "Course",
      position: index + 1,
      name: course.title,
      description: course.description,
      provider: {
        "@type": "EducationalOrganization",
        name: siteConfig.name
      }
    }))
  };

  return (
    <PageContainer as="section" className="py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
          Course Discovery
        </span>
        <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-ink">
          Explore live and self-paced programs that move students from confusion to confidence.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate">
          Compare published pricing, curriculum coverage, course availability, and faculty assignment
          across board prep and entrance coaching tracks.
        </p>
      </div>

      <CourseDiscovery courses={courses} />

      <div className="mt-16 rounded-4xl bg-ink px-8 py-10 text-cream shadow-glow lg:flex lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold">Not sure where to begin?</h2>
          <p className="mt-3 max-w-2xl text-base text-cream/80">
            Take our free learning readiness quiz and get a recommended pathway in under 2 minutes.
          </p>
        </div>
        <Link
          href="/signup"
          className="mt-6 inline-flex rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral/90 lg:mt-0"
        >
          Start Free
        </Link>
      </div>
    </PageContainer>
  );
}
