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
          <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
            <p className="text-base text-slate">You have not enrolled in any courses yet.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
