import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "Review the terms and conditions for Tareshwar Tutorials course access, student conduct, and platform usage.",
  keywords: ["terms and conditions", "course access policy", "student platform terms"],
  path: "/terms"
});

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
        <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
          Terms
        </span>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-ink">
          Clear terms for learning access, student conduct, and platform usage.
        </h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-slate">
          <p>
            Enrollment grants access to the purchased learning resources for the duration specified with each course.
          </p>
          <p>
            Students are expected to use the platform responsibly, protect their login credentials, and avoid sharing paid content without permission.
          </p>
          <p>
            For course access issues, billing questions, or policy clarifications, contact support@tareshwartutorials.com.
          </p>
        </div>
      </div>
    </section>
  );
}
