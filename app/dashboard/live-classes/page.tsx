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
    .select("batch_id")
    .eq("student_id", student.id);

  const batchIds = (enrollments ?? []).map((entry) => entry.batch_id);

  const { data: liveClasses } = batchIds.length
    ? await supabase
        .from("live_classes")
        .select("id, title, description, meeting_link, start_time, duration_minutes, batch:batches(batch_name), teacher:users(name)")
        .in("batch_id", batchIds)
        .gte("start_time", new Date().toISOString())
        .order("start_time", { ascending: true })
    : { data: [] };

  return (
    <DashboardLayout
      studentName={student.name}
      title="Upcoming Live Classes"
      description="See every scheduled live session for your enrolled batches and join directly from the dashboard."
    >
      <div className="mt-12 grid gap-6">
        {(liveClasses ?? []).length ? (
          liveClasses?.map((liveClass) => {
            const batch = firstRelation(liveClass.batch);
            const teacher = firstRelation(liveClass.teacher);

            return (
              <div key={liveClass.id} className="space-y-3">
                <LiveClassCard
                  title={liveClass.title}
                  teacherName={teacher?.name ?? "Faculty"}
                  startTime={liveClass.start_time}
                  meetingLink={liveClass.meeting_link}
                  batchName={batch?.batch_name ?? "Batch class"}
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
            <p className="text-base text-slate">No live classes are scheduled for your batches right now.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
