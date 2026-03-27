import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Payment Failure",
    description: "Your course payment could not be completed. Please try again.",
    path: "/payment-failure"
  }),
  robots: {
    index: false,
    follow: false
  }
};

export default function PaymentFailurePage() {
  return (
    <PageContainer as="section" className="py-20">
      <div className="mx-auto max-w-2xl rounded-4xl border border-ink/10 bg-white p-8 text-center shadow-glow">
        <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
          Payment Failed
        </span>
        <h1 className="mt-6 font-heading text-4xl font-bold text-ink">We could not complete your enrollment</h1>
        <p className="mt-4 text-base leading-8 text-slate">
          Something went wrong while processing your payment or course enrollment. Please try again.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/courses"
            className="inline-flex justify-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink/90"
          >
            Back to Courses
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex justify-center rounded-full border border-ink/10 px-6 py-3 font-semibold text-ink transition hover:bg-cream"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
