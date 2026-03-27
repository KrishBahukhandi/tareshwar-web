import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ChapterList } from "@/components/learning/ChapterList";
import { CourseSidebar } from "@/components/learning/CourseSidebar";
import { LecturePlayer } from "@/components/learning/LecturePlayer";
import { PageContainer } from "@/components/layout/page-container";
import { requireStudent } from "@/lib/auth-server";
import { getStudentLecturePageData } from "@/lib/learning";

type LecturePageProps = {
  params: Promise<{ lectureId: string }>;
};

export default async function LecturePage({ params }: LecturePageProps) {
  const student = await requireStudent();
  const { lectureId } = await params;
  const data = await getStudentLecturePageData(lectureId, student.id);

  if (!data) {
    notFound();
  }

  return (
    <PageContainer as="section" className="py-12">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.55fr]">
        <CourseSidebar course={data.course} currentLectureId={data.lecture.id} />

        <div className="space-y-8">
          <section className="rounded-4xl bg-cream px-6 py-5">
            <Link href={`/course/${encodeURIComponent(data.course.id)}/learn`} className="inline-flex items-center gap-2 text-sm font-semibold text-coral">
              <ArrowLeft className="h-4 w-4" />
              Back to course learning
            </Link>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-teal">{data.subject.name}</p>
            <h1 className="mt-2 font-heading text-4xl font-bold text-ink">{data.chapter.name}</h1>
            <p className="mt-3 text-base leading-7 text-slate">Stay in flow with the current lecture, notes, and the next lesson in your sequence.</p>
          </section>

          <LecturePlayer
            lectureId={data.lecture.id}
            title={data.lecture.title}
            description={data.lecture.description}
            videoUrl={data.lecture.videoUrl}
            notesUrl={data.lecture.notesUrl}
            initialWatchedSeconds={data.lecture.watchedSeconds}
            initialCompleted={data.lecture.completed}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-4xl border border-ink/10 bg-white p-6 shadow-glow">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">Previous Lecture</p>
              {data.previousLectureId ? (
                <Link
                  href={`/lecture/${encodeURIComponent(data.previousLectureId)}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/10 px-5 py-3 font-semibold text-ink transition hover:bg-cream"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Open Previous
                </Link>
              ) : (
                <p className="mt-4 text-sm text-slate">This is the first lecture in your current course flow.</p>
              )}
            </div>

            <div className="rounded-4xl border border-ink/10 bg-white p-6 shadow-glow">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-coral">Next Lecture</p>
              {data.nextLectureId ? (
                <Link
                  href={`/lecture/${encodeURIComponent(data.nextLectureId)}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white transition hover:bg-ink/90"
                >
                  Open Next
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <p className="mt-4 text-sm text-slate">You have reached the last lecture in the current sequence.</p>
              )}
            </div>
          </div>

          <section>
            <h2 className="font-heading text-3xl font-bold text-ink">Course Structure</h2>
            <p className="mt-3 text-base text-slate">
              Browse the complete subject, chapter, and lecture structure without leaving the player.
            </p>
            <div className="mt-6">
              <ChapterList subjects={data.course.subjects} />
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
