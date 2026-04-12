import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpen, Calendar, GraduationCap, Layers3 } from "lucide-react";

import { TrackEventOnView } from "@/components/analytics/TrackEventOnView";
import { PageContainer } from "@/components/layout/page-container";
import { CourseActionButton } from "@/components/courses/CourseActionButton";
import { getCourseById, getCourses } from "@/lib/courses";
import { getCourseIdFromSlug, getCoursePath, slugifyCourseTitle } from "@/lib/course-paths";
import { formatCoursePrice } from "@/lib/pricing";
import { buildMetadata, siteConfig } from "@/lib/seo";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

const TEACHER_AVATAR_FALLBACK =
  "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80";

function formatDate(value: string | null) {
  if (!value) {
    return "To be announced";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "To be announced";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

export async function generateStaticParams() {
  try {
    const courses = await getCourses();
    return courses.map((course) => ({
      slug: `${course.id}--${course.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`
    }));
  } catch {
    // Admin client not available at build time (missing SUPABASE_SERVICE_ROLE_KEY).
    // Pages will be generated on-demand instead.
    return [];
  }
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const courseId = getCourseIdFromSlug(slug);
    const course = await getCourseById(courseId);

    if (!course) {
      return buildMetadata({
        title: "Course Not Found",
        description: "The requested course could not be found.",
        path: "/courses"
      });
    }

    return buildMetadata({
      title: `${course.title} by ${course.teacherName}`,
      description: course.description,
      keywords: [
        `${course.title} online`,
        `${course.category} coaching`,
        `${course.teacherName} course`,
        "exam preparation course"
      ],
      path: getCoursePath(course),
      image: course.thumbnail
    });
  } catch {
    return buildMetadata({
      title: "Course Not Found",
      description: "The requested course could not be loaded.",
      path: "/courses"
    });
  }
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  let course = null;

  try {
    const { slug } = await params;
    course = await getCourseById(getCourseIdFromSlug(slug));
  } catch {
    course = null;
  }

  if (!course) {
    notFound();
  }

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name
    },
    image: course.thumbnail,
    instructor: {
      "@type": "Person",
      name: course.teacherName
    }
  };

  return (
    <PageContainer as="section" className="py-20">
      <TrackEventOnView
        eventType="course_view"
        eventData={{
          course_id: course.id,
          course_title: course.title,
          teacher_name: course.teacherName,
          category: course.category,
          price: course.price
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <div className="rounded-[2.75rem] bg-hero-grid px-8 py-12 text-white shadow-glow lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              {course.category}
            </span>
            <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight sm:text-6xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{course.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 px-5 py-4 backdrop-blur">
                <p className="text-sm text-white/70">Teacher</p>
                <p className="mt-2 font-semibold text-white">{course.teacherName}</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-5 py-4 backdrop-blur">
                <p className="text-sm text-white/70">Lectures</p>
                <p className="mt-2 font-semibold text-white">{course.lectureCount}</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-5 py-4 backdrop-blur">
                <p className="text-sm text-white/70">Enrollment</p>
                <p className="mt-2 font-semibold text-white">{course.isActive ? "Open" : "Closed"}</p>
              </div>
            </div>

            <div className="mt-8">
              <CourseActionButton
                courseId={course.id}
                courseTitle={course.title}
                courseSlug={`${course.id}--${slugifyCourseTitle(course.title)}`}
                variant="hero"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-4">
                <BookOpen className="h-5 w-5 text-white" />
                <p className="mt-3 text-sm text-white/70">Curriculum</p>
                <p className="mt-1 font-semibold text-white">{course.curriculum.length} subjects</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <GraduationCap className="h-5 w-5 text-white" />
                <p className="mt-3 text-sm text-white/70">Class level</p>
                <p className="mt-1 font-semibold text-white">{course.classLevel ?? "All levels"}</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <Calendar className="h-5 w-5 text-white" />
                <p className="mt-3 text-sm text-white/70">Course start</p>
                <p className="mt-1 font-semibold text-white">{formatDate(course.startDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.45fr_0.85fr]">
        <div className="space-y-8">
          <section className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
            <h2 className="font-heading text-3xl font-bold text-ink">Course Overview</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-ink/10 bg-cream px-5 py-4">
                <p className="text-sm text-slate">Price</p>
                <p className="mt-2 text-xl font-semibold text-ink">{formatCoursePrice(course.price)}</p>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-cream px-5 py-4">
                <p className="text-sm text-slate">Class level</p>
                <p className="mt-2 text-xl font-semibold text-ink">{course.classLevel ?? "Not set"}</p>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-cream px-5 py-4">
                <p className="text-sm text-slate">Published lectures</p>
                <p className="mt-2 text-xl font-semibold text-ink">{course.lectureCount}</p>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-cream px-5 py-4">
                <p className="text-sm text-slate">Enrollment</p>
                <p className="mt-2 text-xl font-semibold text-ink">{course.isActive ? "Open" : "Closed"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
            <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
              Course Curriculum
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold text-ink">Subjects and chapter structure</h2>
            {course.curriculum.length > 0 ? (
              <div className="mt-8 space-y-5">
                {course.curriculum.map((subject) => (
                  <article
                    key={subject.id}
                    className="rounded-3xl border border-ink/10 bg-cream p-6"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-ink">{subject.subject}</h3>
                        <p className="mt-1 text-sm text-slate">{subject.lectures} lectures</p>
                      </div>
                      <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-coral">
                        {subject.chapters.length} chapters
                      </span>
                    </div>
                    {subject.chapters.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {subject.chapters.map((chapter) => (
                          <span
                            key={chapter}
                            className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm text-slate"
                          >
                            {chapter}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-5 text-sm text-slate">
                        Chapter names have not been published yet for this subject.
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl border border-dashed border-ink/15 bg-cream px-6 py-8 text-slate">
                Curriculum has not been published for this course yet. Students should not rely on
                this page for detailed chapter planning until subjects are added in the dashboard.
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
            <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
              Teacher Profile
            </span>
            <div className="mt-6 flex items-center gap-4">
              <Image
                src={course.teacherAvatarUrl ?? TEACHER_AVATAR_FALLBACK}
                alt={course.teacherName}
                width={80}
                height={80}
                className="h-20 w-20 rounded-3xl object-cover"
              />
              <div>
                <h2 className="font-heading text-2xl font-bold text-ink">{course.teacherName}</h2>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-teal">
                  Assigned faculty
                </p>
              </div>
            </div>
            <p className="mt-6 text-base leading-8 text-slate">
              This profile card is sourced from the teacher linked to the course record. Extended
              biography, experience summary, and testimonials are not shown until they are stored in
              the platform.
            </p>
          </section>

          <aside className="rounded-4xl bg-ink p-8 text-cream shadow-glow">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cream/60">Enrollment</p>
            <p className="mt-6 font-heading text-5xl font-bold">{formatCoursePrice(course.price)}</p>
            <p className="mt-3 text-base text-cream/75">
              Purchase grants access to this published course and your student learning area.
            </p>
            <CourseActionButton
              courseId={course.id}
              courseTitle={course.title}
              courseSlug={`${course.id}--${slugifyCourseTitle(course.title)}`}
              variant="sidebar"
            />
            <div className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <Layers3 className="mt-0.5 h-5 w-5 text-coral" />
                <div>
                  <p className="text-sm font-medium text-cream/70">Published structure</p>
                  <p className="mt-1 text-base text-cream">
                    {course.curriculum.length > 0
                      ? `${course.curriculum.length} subjects and ${course.lectureCount} lectures are visible.`
                      : "Detailed curriculum is still pending publication."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-coral" />
                <div>
                  <p className="text-sm font-medium text-cream/70">Course start</p>
                  <p className="mt-1 text-base text-cream">{formatDate(course.startDate)}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}
