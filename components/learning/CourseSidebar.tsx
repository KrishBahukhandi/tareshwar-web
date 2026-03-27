import Link from "next/link";
import { BookMarked, CirclePlay, FileText } from "lucide-react";

import type { LearningCourse } from "@/lib/learning";

type CourseSidebarProps = {
  course: LearningCourse;
  currentLectureId?: string | null;
};

export function CourseSidebar({ course, currentLectureId }: CourseSidebarProps) {
  return (
    <aside className="rounded-4xl border border-ink/10 bg-white p-6 shadow-glow">
      <div className="rounded-3xl bg-cream p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">Learning Progress</p>
        <h2 className="mt-3 font-heading text-2xl font-bold text-ink">{course.title}</h2>
        <p className="mt-2 text-sm text-slate">{course.batchName}</p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-coral"
            style={{ width: `${Math.max(0, Math.min(course.progressPercent, 100))}%` }}
          />
        </div>
        <p className="mt-3 text-sm font-semibold text-ink">
          {course.completedLectures}/{course.totalLectures} lectures completed
        </p>
        {course.resumeLectureId ? (
          <Link
            href={`/lecture/${encodeURIComponent(course.resumeLectureId)}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
          >
            <CirclePlay className="h-4 w-4" />
            Resume Last Lecture
          </Link>
        ) : null}
      </div>

      <div className="mt-6 space-y-5">
        {course.subjects.map((subject) => (
          <section key={subject.id}>
            <div className="flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-coral" />
              <h3 className="font-semibold text-ink">{subject.name}</h3>
            </div>
            <div className="mt-3 space-y-3">
              {subject.chapters.map((chapter) => (
                <div key={chapter.id} className="rounded-3xl bg-cream p-4">
                  <p className="text-sm font-semibold text-slate">{chapter.name}</p>
                  <div className="mt-3 space-y-2">
                    {chapter.lectures.map((lecture) => {
                      const isActive = lecture.id === currentLectureId;

                      return (
                        <Link
                          key={lecture.id}
                          href={`/lecture/${encodeURIComponent(lecture.id)}`}
                          className={`block rounded-2xl px-3 py-3 text-sm transition ${
                            isActive ? "bg-ink text-white" : "bg-white text-ink hover:bg-white/80"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">{lecture.title}</span>
                            {lecture.notesUrl ? <FileText className={`h-4 w-4 ${isActive ? "text-white" : "text-coral"}`} /> : null}
                          </div>
                          <p className={`mt-1 text-xs ${isActive ? "text-white/70" : "text-slate"}`}>
                            {lecture.completed
                              ? "Completed"
                              : lecture.watchedSeconds > 0
                                ? `${Math.floor(lecture.watchedSeconds / 60)} min watched`
                                : "Not started"}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}
