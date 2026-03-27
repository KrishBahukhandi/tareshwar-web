import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { TeacherCard } from "@/components/teacher-card/teacher-card";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { getTeachers, STATIC_TEACHERS } from "@/lib/teachers";

export const metadata: Metadata = buildMetadata({
  title: "Meet Our Teachers — Class 8 to 12 School Coaching Faculty",
  description:
    "Meet Tareshwar Tutorials faculty — experienced teachers for Class 8 to 12 CBSE coaching in Maths, Science, and all subjects. Results-focused mentors.",
  keywords: [
    "class 10 maths teacher online",
    "class 12 science coaching faculty",
    "cbse school coaching teachers",
    "online school tuition teachers",
    "class 8 to 12 coaching mentors"
  ],
  path: "/teachers"
});

export default async function TeachersPage() {
  const fetched = await getTeachers().catch(() => []);
  const teachers = fetched.length ? fetched : STATIC_TEACHERS;

  const teachersJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tareshwar Tutorials Teachers",
    itemListElement: teachers.map((teacher, index) => ({
      "@type": "Person",
      position: index + 1,
      name: teacher.name,
      image: teacher.avatarUrl ?? undefined,
      worksFor: {
        "@type": "EducationalOrganization",
        name: siteConfig.name
      }
    }))
  };

  return (
    <PageContainer as="section" className="py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teachersJsonLd) }}
      />
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
          Mentor Network
        </span>
        <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-ink">
          Learn from faculty who combine exam strategy, empathy, and real classroom momentum.
        </h1>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </PageContainer>
  );
}
