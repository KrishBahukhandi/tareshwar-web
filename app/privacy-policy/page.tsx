import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the privacy policy for Tareshwar Tutorials and learn how student information is used and protected.",
  keywords: ["privacy policy", "student data policy", "website privacy"],
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
        <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
          Privacy Policy
        </span>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-ink">
          We protect student data with care, transparency, and responsible access controls.
        </h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-slate">
          <p>
            Tareshwar Tutorials collects only the information needed to deliver courses, manage enrollments, and improve the learning experience.
          </p>
          <p>
            Student profiles, contact details, and learning activity are used for authentication, support, analytics, and academic communication.
          </p>
          <p>
            We do not sell personal information. If you have questions about data usage, contact support@tareshwartutorials.com.
          </p>
        </div>
      </div>
    </section>
  );
}
