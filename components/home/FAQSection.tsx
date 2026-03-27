"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What exams do Tareshwar Tutorials courses cover?",
    a: "We offer batches for JEE Mains, JEE Advanced, NEET, Class 12 CBSE, and several state board exams. Each course is structured around that exam's specific pattern, marking scheme, and commonly tested concepts."
  },
  {
    q: "Are the classes live or recorded?",
    a: "Every batch includes live classes taught by faculty in real time. All sessions are recorded and available in your dashboard the same evening, so if you miss a class you can catch up without falling behind."
  },
  {
    q: "How does doubt resolution work?",
    a: "Students can submit doubts through the platform or app and get a faculty response within 2 hours during study hours (Mon–Sat, 9 AM–9 PM IST). Doubts raised before an exam are prioritised."
  },
  {
    q: "Can I access courses on my phone?",
    a: "Yes. All content is available on the Tareshwar Tutorials Flutter app for Android and iOS. Your progress, notes, and recordings are synced in real time across the app and web dashboard."
  },
  {
    q: "What happens immediately after I pay?",
    a: "You'll receive enrollment confirmation and batch joining instructions instantly. You get full access to your student dashboard, all published recordings, and live class links — no waiting period."
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. We offer a 7-day refund if you're not satisfied after joining. Submit your request through the contact page or email support@tareshwartutorials.com and it'll be processed within 3 business days."
  }
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="overflow-hidden rounded-3xl border border-ink/10 bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
          >
            <span className="font-semibold text-ink">{faq.q}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-slate transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <div className="px-7 pb-6 text-base leading-7 text-slate">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
