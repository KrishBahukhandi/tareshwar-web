import Link from "next/link";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LiveClassCard } from "@/components/dashboard/LiveClassCard";
import { requireStudent } from "@/lib/auth-server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

function firstRelation<T>(value: T | T[] | null | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

export default async function DashboardLiveClassesPage() {
  const student = await requireStudent();
  const supabase = await createSupabaseServerClient();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("student_id", student.id);

  const courseIds = (enrollments ?? []).map((entry) => entry.course_id);

  const { data: liveClasses } = courseIds.length
    ? await supabase
        .from("live_classes")
        .select("id, title, description, meeting_link, start_time, duration_minutes, course:courses(title, class_level), teacher:users(name)")
        .in("course_id", courseIds)
        .gte("start_time", new Date().toISOString())
        .order("start_time", { ascending: true })
    : { data: [] };

  return (
    <DashboardLayout
      studentName={student.name}
      studentEmail={student.email}
      title="Upcoming Live Classes"
      description="See every scheduled live session for your enrolled courses and join directly from the dashboard."
    >
      <div className="mt-12 grid gap-6">
        {(liveClasses ?? []).length ? (
          liveClasses?.map((liveClass) => {
            const course = firstRelation(liveClass.course);
            const teacher = firstRelation(liveClass.teacher);

            return (
              <div key={liveClass.id} className="space-y-3">
                <LiveClassCard
                  title={liveClass.title}
                  teacherName={teacher?.name ?? "Faculty"}
                  startTime={liveClass.start_time}
                  meetingLink={liveClass.meeting_link}
                  courseLabel={course?.title ?? course?.class_level ?? "Live course"}
                />
                {liveClass.description ? (
                  <p className="px-3 text-sm text-slate">{liveClass.description}</p>
                ) : null}
                <div className="px-3 text-sm text-slate">
                  Duration: {liveClass.duration_minutes} minutes
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
            <p className="text-base text-slate">No live classes are scheduled for your courses right now.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
