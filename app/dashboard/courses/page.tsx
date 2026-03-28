import { CourseCard } from "@/components/dashboard/CourseCard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { requireStudent } from "@/lib/auth-server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

function firstRelation<T>(value: T | T[] | null | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

export default async function DashboardCoursesPage() {
  const student = await requireStudent();
  const supabase = await createSupabaseServerClient();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(
      "id, progress_percent, enrolled_at, batch:batches(id, batch_name, start_date, end_date, course:courses(id, title, description, thumbnail_url, total_lectures, teacher:users(name)))"
    )
    .eq("student_id", student.id)
    .order("enrolled_at", { ascending: false });

  return (
    <DashboardLayout
      studentName={student.name}
      studentEmail={student.email}
      title="My Courses"
      description="Browse every enrolled course, check your current progress, and jump back into the learning flow."
    >
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {(enrollments ?? []).length ? (
          enrollments?.map((entry) => {
            const batch = firstRelation(entry.batch);
            const course = firstRelation(batch?.course);
            const teacher = firstRelation(course?.teacher);

            return (
              <div key={entry.id} className="space-y-3">
                <CourseCard
                  courseId={course?.id ?? ""}
                  title={course?.title ?? "Course"}
                  thumbnailUrl={course?.thumbnail_url}
                  teacherName={teacher?.name ?? "Faculty"}
                  progressPercent={Number(entry.progress_percent ?? 0)}
                />
                <p className="px-3 text-sm text-slate">
                  Batch: {batch?.batch_name ?? "Assigned batch"}
                </p>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 flex flex-col items-center gap-4 rounded-4xl border border-ink/10 bg-white px-8 py-16 text-center shadow-glow">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-coral/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral" aria-hidden="true">
                <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </span>
            <div>
              <p className="font-heading text-lg font-semibold text-ink">No courses yet</p>
              <p className="mt-1 text-sm text-slate">You haven&apos;t been enrolled in any courses. Contact your teacher or browse available courses.</p>
            </div>
            <a
              href="/courses"
              className="mt-2 inline-flex rounded-full bg-coral px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-coral/90"
            >
              Browse Courses
            </a>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
