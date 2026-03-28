import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { requireStudent } from "@/lib/auth-server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export const metadata = { title: "My Progress | Tareshwar Tutorials" };

function firstRelation<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default async function AnalyticsPage() {
  const student = await requireStudent();
  const supabase = await createSupabaseServerClient();

  const [
    { count: totalEnrolled },
    { count: completedLectures },
    { count: inProgressLectures },
    { data: watchData },
    { data: enrollments },
  ] = await Promise.all([
    supabase
      .from("enrollments")
      .select("id", { count: "exact", head: true })
      .eq("student_id", student.id),
    supabase
      .from("watch_progress")
      .select("id", { count: "exact", head: true })
      .eq("student_id", student.id)
      .eq("completed", true),
    supabase
      .from("watch_progress")
      .select("id", { count: "exact", head: true })
      .eq("student_id", student.id)
      .eq("completed", false),
    supabase
      .from("watch_progress")
      .select("watched_seconds")
      .eq("student_id", student.id),
    supabase
      .from("enrollments")
      .select("id, progress_percent, enrolled_at, batch:batches(batch_name, course:courses(id, title, total_lectures))")
      .eq("student_id", student.id)
      .order("enrolled_at", { ascending: false }),
  ]);

  const totalWatchSeconds = (watchData ?? []).reduce(
    (sum, row) => sum + Number(row.watched_seconds ?? 0),
    0
  );

  const stats = [
    {
      label: "Courses Enrolled",
      value: String(totalEnrolled ?? 0),
      sub: "active enrolments",
      color: "bg-teal/10 text-teal",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6" aria-hidden="true">
          <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" />
        </svg>
      ),
    },
    {
      label: "Lectures Completed",
      value: String(completedLectures ?? 0),
      sub: "fully watched",
      color: "bg-coral/10 text-coral",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "In Progress",
      value: String(inProgressLectures ?? 0),
      sub: "partially watched",
      color: "bg-amber-500/10 text-amber-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6" aria-hidden="true">
          <path fillRule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "Total Watch Time",
      value: totalWatchSeconds > 0 ? formatDuration(totalWatchSeconds) : "0m",
      sub: "across all lectures",
      color: "bg-violet-500/10 text-violet-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <DashboardLayout
      studentName={student.name}
      studentEmail={student.email}
      title="My Progress"
      description="Track your learning activity, lecture completions, and per-course progress at a glance."
    >
      <div className="mt-8 space-y-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-ink/10 bg-white p-6 shadow-glow">
              <div className={`inline-flex rounded-2xl p-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="mt-4 font-heading text-3xl font-bold text-ink">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{stat.label}</p>
              <p className="text-xs text-slate">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Per-course breakdown */}
        <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
          <h2 className="font-heading text-xl font-semibold text-ink">Course Progress</h2>
          <p className="mt-1 text-sm text-slate">Progress percentage reported from your enrolled courses.</p>

          {(enrollments ?? []).length ? (
            <div className="mt-6 space-y-5">
              {enrollments!.map((entry) => {
                const batch = firstRelation(entry.batch);
                const course = firstRelation(batch?.course);
                const pct = Math.min(100, Math.max(0, Number(entry.progress_percent ?? 0)));

                return (
                  <div key={entry.id}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-ink">{course?.title ?? "Course"}</p>
                        <p className="text-xs text-slate">{batch?.batch_name ?? "Batch"}</p>
                      </div>
                      <span className="shrink-0 font-heading text-lg font-bold text-ink">{pct}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/8">
                      <div
                        className="h-full rounded-full bg-coral transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate">No course data yet. Enrol in a course to see progress here.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
