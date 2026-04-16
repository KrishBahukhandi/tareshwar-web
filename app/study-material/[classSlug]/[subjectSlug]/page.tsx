import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { STUDY_MATERIAL_DATA, getSubjectBySlug, MATERIAL_TYPE_META } from "@/lib/study-material";
import { SubjectTabs } from "@/components/study-material/SubjectTabs";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
  searchParams: Promise<{ sub?: string }>;
};

export async function generateStaticParams() {
  const params: { classSlug: string; subjectSlug: string }[] = [];
  for (const c of STUDY_MATERIAL_DATA) {
    for (const s of c.subjects) {
      params.push({ classSlug: c.slug, subjectSlug: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classSlug, subjectSlug } = await params;
  const result = getSubjectBySlug(classSlug, subjectSlug);
  if (!result) return {};

  return buildMetadata({
    title: `${result.classLevel.name} ${result.subject.name} — Chapter-wise Study Material`,
    description: `Download ${result.classLevel.name} ${result.subject.name} chapter-wise PDF notes, question banks, and PPT slides from Tareshwar Tutorials.`,
    path: `/study-material/${classSlug}/${subjectSlug}`
  });
}

export default async function SubjectPage({ params, searchParams }: Props) {
  const { classSlug, subjectSlug } = await params;
  const { sub } = await searchParams;

  const result = getSubjectBySlug(classSlug, subjectSlug);
  if (!result) notFound();

  const { classLevel, subject } = result;

  // Filter chapters by sub-subject if a tab is selected and subject supports it
  const activeSubId = subject.subSubjects && sub && subject.subSubjects.some(s => s.id === sub)
    ? sub
    : undefined;

  const visibleChapters = activeSubId
    ? subject.chapters.filter((ch) => ch.subSubject === activeSubId)
    : subject.chapters;

  // Sub-subject label for the header when filtered
  const activeSubLabel = activeSubId
    ? subject.subSubjects?.find((s) => s.id === activeSubId)
    : undefined;

  return (
    <PageContainer as="section" className="py-20">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-slate" aria-label="Breadcrumb">
        <Link href="/study-material" className="hover:text-ink transition">Study Material</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/study-material/${classSlug}`} className="hover:text-ink transition">{classLevel.name}</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-ink">
          {subject.name}{activeSubLabel ? ` — ${activeSubLabel.label}` : ""}
        </span>
      </nav>

      {/* Header */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <span className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${subject.color}`}>
          {activeSubLabel ? activeSubLabel.icon : subject.icon}
        </span>
        <div>
          <p className="text-sm font-medium text-slate">{classLevel.name}</p>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-ink">
            {subject.name}
            {activeSubLabel && (
              <span className="ml-3 text-2xl font-semibold text-slate">— {activeSubLabel.label}</span>
            )}
          </h1>
        </div>
      </div>

      {/* Sub-subject tabs — only for subjects that have sub-subjects */}
      {subject.subSubjects && subject.subSubjects.length > 0 && (
        <SubjectTabs subSubjects={subject.subSubjects} active={activeSubId} />
      )}

      {/* Stats bar */}
      <div className="mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-ink/8 bg-white px-6 py-4">
        <div className="text-center">
          <p className="text-xl font-bold text-ink">{visibleChapters.length}</p>
          <p className="text-xs text-slate mt-0.5">Chapters</p>
        </div>
        {(["pdf_notes", "question_notes", "ppt"] as const).map((type) => {
          const count = visibleChapters.reduce(
            (sum, ch) => sum + ch.materials.filter((m) => m.type === type).length,
            0
          );
          const meta = MATERIAL_TYPE_META[type];
          return (
            <div key={type} className="text-center">
              <p className="text-xl font-bold text-ink">{count}</p>
              <p className="text-xs text-slate mt-0.5">{meta.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chapters list */}
      <div className="mt-10 space-y-4">
        {visibleChapters.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-ink/8 bg-white py-16 text-center">
            <span className="text-5xl">📂</span>
            <p className="mt-4 font-semibold text-ink">No chapters yet</p>
            <p className="mt-1 text-sm text-slate">Content for this section will be added soon.</p>
          </div>
        ) : (
          visibleChapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/study-material/${classSlug}/${subjectSlug}/${chapter.slug}`}
              className="group flex flex-col gap-4 rounded-3xl border border-ink/8 bg-white p-6 shadow-glow transition hover:-translate-y-0.5 hover:shadow-xl sm:flex-row sm:items-center"
            >
              {/* Chapter number */}
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink/5 text-sm font-bold text-ink">
                {String(chapter.chapterNumber).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-ink group-hover:text-coral transition">
                  {chapter.name}
                </h2>
                {/* Sub-subject badge — shown in "All" view */}
                {!activeSubId && chapter.subSubject && subject.subSubjects && (
                  <span className="mt-1 inline-block text-xs font-medium text-slate">
                    {subject.subSubjects.find(s => s.id === chapter.subSubject)?.icon}{" "}
                    {subject.subSubjects.find(s => s.id === chapter.subSubject)?.label}
                  </span>
                )}
                {/* Material type pills */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {chapter.materials.map((mat) => {
                    const meta = MATERIAL_TYPE_META[mat.type];
                    return (
                      <span
                        key={mat.id}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.bgColor} ${meta.color}`}
                      >
                        {meta.icon} {meta.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 text-xs text-slate sm:flex-col sm:items-end sm:gap-1">
                <span>{chapter.materials.length} files</span>
                <span className="font-semibold text-coral group-hover:gap-1.5 inline-flex items-center gap-1 transition-all">
                  Open <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Back link */}
      <div className="mt-12">
        <Link
          href={`/study-material/${classSlug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate hover:text-ink transition"
        >
          <span aria-hidden="true">←</span> Back to {classLevel.name} subjects
        </Link>
      </div>
    </PageContainer>
  );
}
