"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Which classes and subjects do Tareshwar Tutorials cover?",
    a: "We offer live coaching for Class 8 through Class 12 across core CBSE and state board subjects — Mathematics, Science (Physics, Chemistry, Biology), English, and Social Science. Each batch is structured around the specific class's syllabus and exam pattern."
  },
  {
    q: "Are the classes live or recorded?",
    a: "Every batch includes live classes taught by faculty in real time. All sessions are recorded and available in your dashboard the same evening, so if your child misses a class they can catch up without falling behind."
  },
  {
    q: "How does doubt resolution work?",
    a: "Students can submit doubts through the platform or app and get a faculty response within 2 hours during study hours (Mon–Sat, 9 AM–9 PM IST). Doubts close to tests and board exams are prioritised."
  },
  {
    q: "Is this suitable for Class 8 and 9 students, not just board classes?",
    a: "Yes. We specifically offer Foundation batches for Class 8, 9, and 10 to build strong subject basics before boards. Starting early gives students a significant advantage by the time they reach Class 10 and 12."
  },
  {
    q: "What happens immediately after enrollment?",
    a: "Enrollment confirmation and batch joining instructions are sent instantly. Students get full access to their dashboard, all published recordings for their batch, and live class schedule — with no waiting period."
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. We offer a 7-day refund if you are not satisfied after joining. Submit your request through the contact page or email support@tareshwartutorials.com and it will be processed within 3 business days."
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
