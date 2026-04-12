import { notFound } from "next/navigation";

import { LearnDashboard } from "@/components/learning/LearnDashboard";
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
      {course.subjects.length > 0 ? (
        <LearnDashboard course={course} />
      ) : (
        <div className="rounded-4xl border border-ink/10 bg-white p-10 text-center shadow-glow">
          <h2 className="font-heading text-3xl font-bold text-ink">Curriculum not published yet</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate">
            Your enrollment is active. The subject and lecture structure for this course will appear
            here once your teacher publishes it — check back soon.
          </p>
        </div>
      )}
    </PageContainer>
  );
}
