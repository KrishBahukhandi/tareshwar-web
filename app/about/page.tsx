import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Tareshwar Tutorials",
  description:
    "Learn about Tareshwar Tutorials, an exam preparation platform focused on online coaching, student progress, and better academic outcomes.",
  keywords: ["about online coaching", "about tareshwar tutorials", "exam preparation platform"],
  path: "/about"
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="rounded-[2.5rem] bg-hero-grid px-8 py-14 text-white shadow-glow">
        <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          About Tareshwar Tutorials
        </span>
        <h1 className="mt-6 max-w-3xl font-heading text-5xl font-bold tracking-tight">
          We blend strong teaching, smart technology, and visible progress tracking for every learner.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
          Tareshwar Tutorials was built to make premium coaching feel personal, measurable, and accessible across devices.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="rounded-4xl border border-ink/10 bg-white p-8">
          <h2 className="font-heading text-2xl font-semibold text-ink">Mission</h2>
          <p className="mt-4 text-base leading-7 text-slate">
            Help students from every background access high-quality coaching with structure and confidence.
          </p>
        </div>
        <div className="rounded-4xl border border-ink/10 bg-white p-8">
          <h2 className="font-heading text-2xl font-semibold text-ink">Approach</h2>
          <p className="mt-4 text-base leading-7 text-slate">
            Combine live classes, concise notes, analytics, and mentor accountability in one platform.
          </p>
        </div>
        <div className="rounded-4xl border border-ink/10 bg-white p-8">
          <h2 className="font-heading text-2xl font-semibold text-ink">Outcome</h2>
          <p className="mt-4 text-base leading-7 text-slate">
            Students build stronger habits, score better, and stay motivated because progress is visible.
          </p>
        </div>
      </div>
    </section>
  );
}
