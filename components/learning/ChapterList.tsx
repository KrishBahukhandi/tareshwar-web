import Link from "next/link";
import { BookOpen, FileText, PlayCircle } from "lucide-react";

import type { LearningSubject } from "@/lib/learning";

function formatMinutes(durationSeconds: number) {
  if (!durationSeconds) {
    return "Self-paced";
  }

  return `${Math.max(1, Math.round(durationSeconds / 60))} min`;
}

type ChapterListProps = {
  subjects: LearningSubject[];
};

export function ChapterList({ subjects }: ChapterListProps) {
  return (
    <div className="space-y-6">
      {subjects.map((subject) => (
        <section key={subject.id} className="rounded-4xl border border-ink/10 bg-white p-6 shadow-glow">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">Subject</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-ink">{subject.name}</h2>
            </div>
            <span className="inline-flex rounded-full bg-cream px-4 py-2 text-sm font-semibold text-coral">
              {subject.chapters.length} chapters
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {subject.chapters.map((chapter) => (
              <article key={chapter.id} className="rounded-3xl bg-cream p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-coral">Chapter</p>
                    <h3 className="mt-2 text-xl font-semibold text-ink">{chapter.name}</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
                    <BookOpen className="h-4 w-4 text-teal" />
                    {chapter.lectures.length} lectures
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  {chapter.lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-ink">{lecture.title}</p>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate">
                          <span>{formatMinutes(lecture.durationSeconds)}</span>
                          <span>{lecture.completed ? "Completed" : `${Math.floor(lecture.watchedSeconds / 60)} min watched`}</span>
                          {lecture.notesUrl ? (
                            <span className="inline-flex items-center gap-1">
                              <FileText className="h-4 w-4 text-coral" />
                              Notes available
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <Link
                        href={`/lecture/${encodeURIComponent(lecture.id)}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
                      >
                        <PlayCircle className="h-4 w-4" />
                        {lecture.completed ? "Watch Again" : lecture.watchedSeconds > 0 ? "Resume" : "Start"}
                      </Link>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
