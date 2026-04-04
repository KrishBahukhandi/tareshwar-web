import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, PlayCircle } from "lucide-react";

import { ChapterList } from "@/components/learning/ChapterList";
import { CourseSidebar } from "@/components/learning/CourseSidebar";
import { PageContainer } from "@/components/layout/page-container";
import { requireStudent } from "@/lib/auth-server";
import { getCourseIdFromSlug } from "@/lib/course-paths";
import { getStudentCourseLearning } from "@/lib/learning";

type CourseLearnPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CourseLearnPage({ params }: CourseLearnPageProps) {
  const student = await requireStudent();
  const { slug } = await params;
  const courseId = getCourseIdFromSlug(slug);
  const course = await getStudentCourseLearning(courseId, student.id);

  if (!course) {
    notFound();
  }

  return (
    <PageContainer as="section" className="py-12">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.55fr]">
        <CourseSidebar course={course} />

        <div className="space-y-8">
          <section className="rounded-4xl bg-hero-grid px-8 py-10 text-white shadow-glow">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Learning Dashboard</p>
            <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">{course.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
              Browse your subjects, open chapters, watch lectures, and pick up exactly where you left off.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 px-5 py-4 backdrop-blur">
                <p className="text-sm text-white/70">Class level</p>
                <p className="mt-2 font-semibold text-white">{course.classLevel ?? "Course access active"}</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-5 py-4 backdrop-blur">
                <p className="text-sm text-white/70">Teacher</p>
                <p className="mt-2 font-semibold text-white">{course.teacherName}</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-5 py-4 backdrop-blur">
                <p className="text-sm text-white/70">Progress</p>
                <p className="mt-2 font-semibold text-white">{course.progressPercent.toFixed(0)}%</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {course.resumeLectureId ? (
                <Link
                  href={`/lecture/${encodeURIComponent(course.resumeLectureId)}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:bg-sand"
                >
                  <PlayCircle className="h-4 w-4" />
                  Resume Last Lecture
                </Link>
              ) : null}
              <Link
                href="/dashboard/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Back to My Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {course.subjects.length > 0 ? (
            <ChapterList subjects={course.subjects} />
          ) : (
            <section className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
              <h2 className="font-heading text-3xl font-bold text-ink">Curriculum not published yet</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate">
                Your enrollment is active, but the subject and lecture structure for this course has
                not been published in the platform yet. Please contact your institute admin or
                teacher to finish the course setup.
              </p>
            </section>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
