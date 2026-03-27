import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Tareshwar Tutorials",
  description:
    "Contact Tareshwar Tutorials for course guidance, enrollment support, and exam preparation counseling.",
  keywords: ["contact coaching institute", "course counseling", "exam preparation support"],
  path: "/contact"
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
            Contact
          </span>
          <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-ink">
            Talk to our academic counselors and find the right coaching plan.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate">
            Reach out for course guidance, partnership inquiries, school tie-ups, or parent support.
          </p>
          <div className="mt-8 space-y-4 text-base text-slate">
            <p>Email: support@tareshwartutorials.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Hours: Mon-Sat, 9:00 AM - 7:00 PM IST</p>
          </div>
        </div>

        <form className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Full name
              <input
                type="text"
                placeholder="Enter your name"
                className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Message
              <textarea
                rows={5}
                placeholder="Tell us how we can help"
                className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink/90"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
