import Link from "next/link";
import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { STUDY_MATERIAL_DATA } from "@/lib/study-material";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Study Material — Class 10, 11 & 12 Notes, Questions & PPTs",
  description:
    "Download free study material for Class 10, 11 and 12 — chapter-wise PDF notes, question banks, and PPT slides prepared by Tareshwar Tutorials faculty.",
  keywords: [
    "class 10 study material",
    "class 11 notes pdf",
    "class 12 chapter wise notes",
    "cbse notes free download",
    "physics chemistry maths notes"
  ],
  path: "/study-material"
});

export default function StudyMaterialPage() {
  return (
    <PageContainer as="section" className="py-20">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
          Study Material
        </span>
        <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-ink">
          Chapter-wise notes, questions &amp; slides — all in one place.
        </h1>
        <p className="mt-4 text-lg text-slate">
          Carefully crafted by our faculty for Class 10, 11 &amp; 12 students. Pick your class to browse subjects and download what you need.
        </p>
      </div>

      {/* Class cards */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {STUDY_MATERIAL_DATA.map((classLevel) => {
          const totalChapters = classLevel.subjects.reduce(
            (sum, s) => sum + s.chapters.length,
            0
          );
          const totalMaterials = classLevel.subjects.reduce(
            (sum, s) =>
              sum + s.chapters.reduce((cs, ch) => cs + ch.materials.length, 0),
            0
          );

          return (
            <Link
              key={classLevel.id}
              href={`/study-material/${classLevel.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-4xl border border-ink/8 bg-white p-8 shadow-glow transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Class badge */}
              <span className="inline-flex w-fit rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-coral">
                {classLevel.shortName}
              </span>

              <h2 className="mt-4 font-heading text-3xl font-bold text-ink">
                {classLevel.name}
              </h2>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                {classLevel.description}
              </p>

              {/* Subjects pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {classLevel.subjects.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1 rounded-full border border-ink/8 bg-cream px-3 py-1 text-xs font-medium text-ink"
                  >
                    {s.icon} {s.name}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 flex items-center gap-6 border-t border-ink/8 pt-5 text-xs text-slate">
                <span>
                  <strong className="text-base font-bold text-ink">{classLevel.subjects.length}</strong> Subjects
                </span>
                <span>
                  <strong className="text-base font-bold text-ink">{totalChapters}</strong> Chapters
                </span>
                <span>
                  <strong className="text-base font-bold text-ink">{totalMaterials}</strong> Files
                </span>
              </div>

              {/* Arrow */}
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-coral group-hover:gap-2 transition-all">
                Browse {classLevel.name} <span aria-hidden="true">→</span>
              </span>
            </Link>
          );
        })}
      </div>

      {/* How it works */}
      <div className="mt-24">
        <h2 className="font-heading text-2xl font-bold text-ink">How it works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { step: "01", title: "Pick your class", desc: "Choose from Class 10, 11, or 12." },
            { step: "02", title: "Select a subject", desc: "Browse subjects and open the chapter list." },
            { step: "03", title: "Download & study", desc: "Get PDF notes, question banks, or PPT slides instantly." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral/10 text-sm font-bold text-coral">
                {item.step}
              </span>
              <div>
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-slate">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
