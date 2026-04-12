import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { STUDY_MATERIAL_DATA, getChapterBySlug, MATERIAL_TYPE_META } from "@/lib/study-material";
import { MaterialsGrid } from "@/components/study-material/MaterialsGrid";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ classSlug: string; subjectSlug: string; chapterSlug: string }>;
};

export async function generateStaticParams() {
  const params: { classSlug: string; subjectSlug: string; chapterSlug: string }[] = [];
  for (const c of STUDY_MATERIAL_DATA) {
    for (const s of c.subjects) {
      for (const ch of s.chapters) {
        params.push({ classSlug: c.slug, subjectSlug: s.slug, chapterSlug: ch.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classSlug, subjectSlug, chapterSlug } = await params;
  const result = getChapterBySlug(classSlug, subjectSlug, chapterSlug);
  if (!result) return {};

  return buildMetadata({
    title: `${result.chapter.name} — ${result.subject.name} ${result.classLevel.name} Study Material`,
    description: `Preview PDF notes, question bank, and PPT slides for ${result.chapter.name} (${result.subject.name}, ${result.classLevel.name}) from Tareshwar Tutorials.`,
    path: `/study-material/${classSlug}/${subjectSlug}/${chapterSlug}`
  });
}

export default async function ChapterPage({ params }: Props) {
  const { classSlug, subjectSlug, chapterSlug } = await params;
  const result = getChapterBySlug(classSlug, subjectSlug, chapterSlug);
  if (!result) notFound();

  const { classLevel, subject, chapter } = result;

  // Find prev / next chapters for navigation
  const allChapters = subject.chapters;
  const currentIndex = allChapters.findIndex((ch) => ch.slug === chapterSlug);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  // Material type summary for the stats bar
  const typeCounts = chapter.materials.reduce<Record<string, number>>((acc, m) => {
    acc[m.type] = (acc[m.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <PageContainer as="section" className="py-20">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-slate" aria-label="Breadcrumb">
        <Link href="/study-material" className="hover:text-ink transition">Study Material</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/study-material/${classSlug}`} className="hover:text-ink transition">{classLevel.name}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/study-material/${classSlug}/${subjectSlug}`} className="hover:text-ink transition">{subject.name}</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-ink line-clamp-1">{chapter.name}</span>
      </nav>

      {/* Chapter header */}
      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${subject.color}`}>
            {subject.icon}
          </span>
          <span className="text-sm text-slate">{classLevel.name} · {subject.name}</span>
        </div>
        <div className="mt-4 flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink/5 text-sm font-bold text-ink">
            {String(chapter.chapterNumber).padStart(2, "0")}
          </span>
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-ink lg:text-4xl">
              {chapter.name}
            </h1>
            <p className="mt-1 text-sm text-slate">{chapter.materials.length} files available — click any card to preview</p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-ink/8 bg-white px-6 py-4">
        {Object.entries(typeCounts).map(([type, count]) => {
          const meta = MATERIAL_TYPE_META[type as keyof typeof MATERIAL_TYPE_META];
          return (
            <div key={type} className="flex items-center gap-2">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${meta.bgColor}`}>
                {meta.icon}
              </span>
              <span className="text-sm text-slate">
                <strong className="font-bold text-ink">{count}</strong> {meta.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Interactive materials grid — client component */}
      <MaterialsGrid materials={chapter.materials} />

      {/* Chapter navigation */}
      <div className="mt-16 flex flex-col gap-4 border-t border-ink/8 pt-10 sm:flex-row sm:justify-between">
        {prevChapter ? (
          <Link
            href={`/study-material/${classSlug}/${subjectSlug}/${prevChapter.slug}`}
            className="group flex flex-col gap-1 rounded-2xl border border-ink/8 bg-white px-5 py-4 transition hover:border-coral/30 hover:shadow-md sm:max-w-xs"
          >
            <span className="text-xs text-slate">← Previous</span>
            <span className="text-sm font-semibold text-ink group-hover:text-coral transition line-clamp-2">
              Ch {prevChapter.chapterNumber}: {prevChapter.name}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextChapter ? (
          <Link
            href={`/study-material/${classSlug}/${subjectSlug}/${nextChapter.slug}`}
            className="group flex flex-col gap-1 rounded-2xl border border-ink/8 bg-white px-5 py-4 text-right transition hover:border-coral/30 hover:shadow-md sm:max-w-xs"
          >
            <span className="text-xs text-slate">Next →</span>
            <span className="text-sm font-semibold text-ink group-hover:text-coral transition line-clamp-2">
              Ch {nextChapter.chapterNumber}: {nextChapter.name}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Back link */}
      <div className="mt-6">
        <Link
          href={`/study-material/${classSlug}/${subjectSlug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate hover:text-ink transition"
        >
          <span aria-hidden="true">←</span> All {subject.name} chapters
        </Link>
      </div>
    </PageContainer>
  );
}
