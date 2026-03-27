import type { Metadata } from "next";
import { Mail, Phone, Clock } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "./contact-form";

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
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-base text-slate">
              <Mail className="h-5 w-5 text-coral shrink-0" />
              <span>support@tareshwartutorials.com</span>
            </div>
            <div className="flex items-center gap-3 text-base text-slate">
              <Phone className="h-5 w-5 text-coral shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-base text-slate">
              <Clock className="h-5 w-5 text-coral shrink-0" />
              <span>Mon–Sat, 9:00 AM – 7:00 PM IST</span>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
