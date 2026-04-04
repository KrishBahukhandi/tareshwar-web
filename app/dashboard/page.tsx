import Link from "next/link";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LiveClassCard } from "@/components/dashboard/LiveClassCard";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import { requireStudent } from "@/lib/auth-server";

function firstRelation<T>(value: T | T[] | null | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

export default async function DashboardPage() {
  const student = await requireStudent();
  const supabase = await createSupabaseServerClient();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, progress_percent, course:courses(id, title, thumbnail_url)")
    .eq("student_id", student.id)
    .order("enrolled_at", { ascending: false })
    .limit(3);

  const courseIds = (enrollments ?? [])
    .map((entry) => firstRelation(entry.course)?.id)
    .filter((value): value is string => Boolean(value));

  const [
    { data: liveClasses },
    { data: progressRows },
    { data: courseAnnouncements },
    { data: platformAnnouncements }
  ] = await Promise.all([
    courseIds.length
      ? supabase
          .from("live_classes")
          .select("id, title, start_time, meeting_link, course:courses(title, class_level), teacher:users(name)")
          .in("course_id", courseIds)
          .gte("start_time", new Date().toISOString())
          .order("start_time", { ascending: true })
          .limit(3)
      : Promise.resolve({ data: [] }),
    supabase
      .from("watch_progress")
      .select(
        "id, watched_seconds, completed, lecture:lectures(id, title, chapter:chapters(subject:subjects(course:courses(id, title))))"
      )
      .eq("student_id", student.id)
      .eq("completed", false)
      .order("updated_at", { ascending: false })
      .limit(3),
    courseIds.length
      ? supabase
          .from("announcements")
          .select("id, title, body, created_at, course:courses(title, class_level)")
          .in("course_id", courseIds)
          .order("created_at", { ascending: false })
          .limit(3)
      : Promise.resolve({ data: [] }),
    supabase
      .from("announcements")
      .select("id, title, body, created_at, course_id")
      .is("course_id", null)
      .order("created_at", { ascending: false })
      .limit(3)
  ]);

  const announcements = [...(courseAnnouncements ?? []), ...(platformAnnouncements ?? [])]
    .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime())
    .slice(0, 3);

  return (
    <DashboardLayout
      studentName={student.name}
      studentEmail={student.email}
      title={`Welcome back, ${student.name}`}
      description="Keep up with your enrolled courses, resume unfinished lessons, and stay ready for upcoming live classes."
    >
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-heading text-2xl font-semibold text-ink">Continue Learning</h2>
          </div>
          <div className="mt-6 space-y-4">
            {(progressRows ?? []).length ? (
              progressRows?.map((progress) => {
                const lecture = firstRelation(progress.lecture);
                const chapter = firstRelation(lecture?.chapter);
                const subject = firstRelation(chapter?.subject);
                const course = firstRelation(subject?.course);

                return (
                  <div key={progress.id} className="rounded-3xl border border-ink/10 p-5">
                    <p className="font-semibold text-ink">{lecture?.title ?? "Lecture in progress"}</p>
                    <p className="mt-1 text-sm text-slate">{course?.title ?? "Resume your course"}</p>
                    <p className="mt-3 text-sm font-semibold text-teal">
                      {Math.floor(Number(progress.watched_seconds ?? 0) / 60)} min watched
                    </p>
                    {lecture?.id ? (
                      <Link
                        href={`/lecture/${encodeURIComponent(lecture.id)}`}
                        className="mt-4 inline-flex font-semibold text-coral"
                      >
                        Resume lecture
                      </Link>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate">You are all caught up. Pick a course below to continue learning.</p>
            )}
          </div>
          <Link href="/dashboard/courses" className="mt-6 inline-flex font-semibold text-coral">
            Open my courses
          </Link>
        </div>

        <div className="space-y-8">
          <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
            <h2 className="font-heading text-2xl font-semibold text-ink">Upcoming Live Classes</h2>
            <div className="mt-6 space-y-4">
            {(liveClasses ?? []).length ? (
              liveClasses?.map((liveClass) => {
                const course = firstRelation(liveClass.course);
                const teacher = firstRelation(liveClass.teacher);

                return (
                  <LiveClassCard
                    key={liveClass.id}
                    title={liveClass.title}
                    teacherName={teacher?.name ?? "Faculty"}
                    startTime={liveClass.start_time}
                    meetingLink={liveClass.meeting_link}
                    courseLabel={course?.title ?? course?.class_level ?? "Live course"}
                  />
                );
              })
            ) : (
              <p className="text-sm text-slate">No upcoming live classes scheduled yet.</p>
            )}
            </div>
            <Link href="/dashboard/live-classes" className="mt-6 inline-flex font-semibold text-coral">
              View all live classes
            </Link>
          </div>

          <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
            <h2 className="font-heading text-2xl font-semibold text-ink">Recent Announcements</h2>
            <div className="mt-6 space-y-4">
            {announcements.length ? (
              announcements.map((announcement) => {
                const course = firstRelation("course" in announcement ? announcement.course : null);
                const label = course?.title ?? course?.class_level ?? "Platform update";

                return (
                  <article key={announcement.id} className="rounded-3xl border border-ink/10 p-5">
                    <p className="font-semibold text-ink">{announcement.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate">{announcement.body}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.12em] text-teal">
                      <span>{label}</span>
                      <span>
                        {new Date(announcement.created_at).toLocaleDateString("en-IN", {
                          dateStyle: "medium"
                        })}
                      </span>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="text-sm text-slate">No recent announcements for your enrolled courses yet.</p>
            )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
