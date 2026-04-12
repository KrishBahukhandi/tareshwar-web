import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { STUDY_MATERIAL_DATA, getClassBySlug } from "@/lib/study-material";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ classSlug: string }> };

export async function generateStaticParams() {
  return STUDY_MATERIAL_DATA.map((c) => ({ classSlug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classSlug } = await params;
  const classLevel = getClassBySlug(classSlug);
  if (!classLevel) return {};

  return buildMetadata({
    title: `${classLevel.name} Study Material — Notes, Questions & PPTs`,
    description: `Browse all subjects for ${classLevel.name} — chapter-wise PDF notes, question banks, and PPT slides by Tareshwar Tutorials.`,
    path: `/study-material/${classSlug}`
  });
}

export default async function ClassPage({ params }: Props) {
  const { classSlug } = await params;
  const classLevel = getClassBySlug(classSlug);
  if (!classLevel) notFound();

  const allClasses = STUDY_MATERIAL_DATA;

  return (
    <PageContainer as="section" className="py-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate" aria-label="Breadcrumb">
        <Link href="/study-material" className="hover:text-ink transition">Study Material</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-ink">{classLevel.name}</span>
      </nav>

      {/* Header */}
      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-coral">
            {classLevel.shortName}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-ink lg:text-5xl">
            {classLevel.name} — Study Material
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate">{classLevel.description}</p>
        </div>

        {/* Class switcher */}
        <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-ink/8 bg-white p-1.5">
          {allClasses.map((c) => (
            <Link
              key={c.id}
              href={`/study-material/${c.slug}`}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                c.slug === classSlug
                  ? "bg-coral text-white shadow"
                  : "text-slate hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Subjects grid */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {classLevel.subjects.map((subject) => {
          const totalMaterials = subject.chapters.reduce(
            (sum, ch) => sum + ch.materials.length,
            0
          );
          return (
            <Link
              key={subject.id}
              href={`/study-material/${classSlug}/${subject.slug}`}
              className="group flex flex-col rounded-4xl border border-ink/8 bg-white p-6 shadow-glow transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Icon */}
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${subject.color}`}>
                {subject.icon}
              </span>

              <h2 className="mt-4 font-heading text-xl font-bold text-ink">{subject.name}</h2>

              {/* Stats */}
              <div className="mt-3 flex items-center gap-4 text-xs text-slate">
                <span>{subject.chapters.length} chapters</span>
                <span className="h-1 w-1 rounded-full bg-ink/20" aria-hidden="true" />
                <span>{totalMaterials} files</span>
              </div>

              {/* Chapter preview */}
              <ul className="mt-4 space-y-1.5">
                {subject.chapters.slice(0, 3).map((ch) => (
                  <li key={ch.id} className="flex items-center gap-2 text-xs text-slate">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-ink/25" aria-hidden="true" />
                    Ch {ch.chapterNumber}: {ch.name}
                  </li>
                ))}
                {subject.chapters.length > 3 && (
                  <li className="text-xs text-coral font-medium">
                    +{subject.chapters.length - 3} more chapters
                  </li>
                )}
              </ul>

              <span className="mt-auto pt-5 text-sm font-semibold text-coral group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                View chapters <span aria-hidden="true">→</span>
              </span>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}
