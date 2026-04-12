"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  PlayCircle,
  Radio,
  Video,
} from "lucide-react";

import type { LearningCourse, LearningSubject } from "@/lib/learning";

type Props = { course: LearningCourse };

// ─── Subject colour palette (cycles) ──────────────────────────────────────────
const SUBJECT_COLORS = [
  { bg: "bg-teal/10",  text: "text-teal",  border: "border-teal/20",  icon: "bg-teal/15 text-teal" },
  { bg: "bg-coral/10", text: "text-coral", border: "border-coral/20", icon: "bg-coral/15 text-coral" },
  { bg: "bg-ink/5",    text: "text-ink",   border: "border-ink/15",   icon: "bg-ink/10 text-ink" },
  { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "bg-amber-100 text-amber-700" },
];

export function LearnDashboard({ course }: Props) {
  const [activeSubject, setActiveSubject] = useState<LearningSubject | null>(null);

  return (
    <div className="space-y-6">
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {activeSubject ? (
            <button
              onClick={() => setActiveSubject(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to subjects
            </button>
          ) : (
            <Link
              href="/dashboard/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              My Courses
            </Link>
          )}
          <h1 className="mt-2 font-heading text-3xl font-bold text-ink">
            {activeSubject ? activeSubject.name : course.title}
          </h1>
          {!activeSubject && (
            <p className="mt-1 text-sm text-slate">{course.classLevel} · {course.teacherName}</p>
          )}
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-3 shadow-sm">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-cream">
            <div
              className="h-full rounded-full bg-coral transition-all"
              style={{ width: `${Math.max(2, course.progressPercent)}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-ink">
            {course.progressPercent.toFixed(0)}% complete
          </span>
        </div>
      </div>

      {/* ── SUBJECT VIEW ──────────────────────────────────────────────────── */}
      {activeSubject ? (
        <SubjectView subject={activeSubject} />
      ) : (
        <>
          {/* ── LIVE CLASS CARD ─────────────────────────────────────────── */}
          <LiveClassCard teacherName={course.teacherName} />

          {/* ── SUBJECTS GRID ───────────────────────────────────────────── */}
          <section>
            <h2 className="mb-4 font-heading text-xl font-bold text-ink">Your Subjects</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {course.subjects.map((subject, i) => {
                const color = SUBJECT_COLORS[i % SUBJECT_COLORS.length];
                const totalLectures = subject.chapters.reduce(
                  (sum, ch) => sum + ch.lectures.length, 0
                );
                const completedLectures = subject.chapters.reduce(
                  (sum, ch) => sum + ch.lectures.filter((l) => l.completed).length, 0
                );
                const progress = totalLectures > 0
                  ? Math.round((completedLectures / totalLectures) * 100)
                  : 0;

                return (
                  <button
                    key={subject.id}
                    onClick={() => setActiveSubject(subject)}
                    className={`group relative flex flex-col rounded-3xl border ${color.border} ${color.bg} p-6 text-left transition hover:shadow-md hover:-translate-y-0.5`}
                  >
                    {/* Icon */}
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${color.icon}`}>
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 font-heading text-xl font-bold text-ink">{subject.name}</h3>

                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate">
                      <span>{subject.chapters.length} chapters</span>
                      {totalLectures > 0 && <span>{totalLectures} lectures</span>}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
                      <div
                        className="h-full rounded-full bg-coral/70 transition-all"
                        style={{ width: `${Math.max(progress > 0 ? 3 : 0, progress)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs font-medium text-slate">
                      {totalLectures > 0 ? `${completedLectures}/${totalLectures} lectures done` : "Lectures coming soon"}
                    </p>

                    <div className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${color.text} group-hover:gap-2.5 transition-all`}>
                      View chapters
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

// ─── Live class card ──────────────────────────────────────────────────────────

function LiveClassCard({ teacherName }: { teacherName: string }) {
  // Placeholder — replace with real live class data when available
  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-glow">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-coral/10 text-coral">
            <Radio className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-coral">Live Classes</p>
            </div>
            <h2 className="mt-1 text-lg font-bold text-ink">No class scheduled yet</h2>
            <p className="mt-1 text-sm text-slate">
              {teacherName} will announce the next session here. You&apos;ll see a join button the moment class goes live.
            </p>
          </div>
        </div>

        {/* When a class IS live, swap this with a real join button */}
        <div className="shrink-0">
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-5 py-2.5 text-sm font-semibold text-slate"
          >
            <Video className="h-4 w-4" />
            Join Class
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Subject view (chapters list) ─────────────────────────────────────────────

function SubjectView({ subject }: { subject: LearningSubject }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate">{subject.chapters.length} chapters</p>

      {subject.chapters.map((chapter, idx) => {
        const totalLectures = chapter.lectures.length;
        const completedLectures = chapter.lectures.filter((l) => l.completed).length;

        return (
          <article
            key={chapter.id}
            className="rounded-3xl border border-ink/10 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Chapter number */}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-cream text-sm font-bold text-ink">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{chapter.name}</h3>
                  <p className="mt-1 text-xs text-slate">
                    {totalLectures > 0
                      ? `${completedLectures}/${totalLectures} lectures completed`
                      : "Lectures coming soon"}
                  </p>
                </div>
              </div>

              {totalLectures > 0 && (
                <Link
                  href={`/lecture/${encodeURIComponent(chapter.lectures[0].id)}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink/90"
                >
                  <PlayCircle className="h-4 w-4" />
                  {completedLectures > 0 ? "Resume" : "Start"}
                </Link>
              )}
            </div>

            {/* Lectures list */}
            {totalLectures > 0 && (
              <div className="mt-4 space-y-2 pl-13">
                {chapter.lectures.map((lecture) => (
                  <Link
                    key={lecture.id}
                    href={`/lecture/${encodeURIComponent(lecture.id)}`}
                    className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3 text-sm transition hover:bg-sand"
                  >
                    <span className="font-medium text-ink">{lecture.title}</span>
                    <span className={`text-xs font-semibold ${lecture.completed ? "text-teal" : "text-slate"}`}>
                      {lecture.completed ? "✓ Done" : lecture.watchedSeconds > 0 ? "In progress" : "Not started"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
