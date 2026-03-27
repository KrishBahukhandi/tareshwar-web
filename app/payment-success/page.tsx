import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { getCourseById } from "@/lib/courses";
import { getCoursePath } from "@/lib/course-paths";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Payment Success",
    description: "Your course payment was successful and your enrollment has been completed.",
    path: "/payment-success"
  }),
  robots: {
    index: false,
    follow: false
  }
};

type PaymentSuccessPageProps = {
  searchParams?: Promise<{ course?: string }>;
};

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const params = searchParams ? await searchParams : {};
  const courseId = params.course;
  const course = courseId ? await getCourseById(courseId) : null;

  return (
    <PageContainer as="section" className="py-20">
      <div className="mx-auto max-w-2xl rounded-4xl border border-ink/10 bg-white p-8 text-center shadow-glow">
        <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
          Payment Success
        </span>
        <h1 className="mt-6 font-heading text-4xl font-bold text-ink">Enrollment confirmed</h1>
        <p className="mt-4 text-base leading-8 text-slate">
          You are now enrolled in the course. Continue learning from your dashboard.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex justify-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink/90"
          >
            Go to Dashboard
          </Link>
          {courseId ? (
            <Link
              href={course ? getCoursePath(course) : "/courses"}
              className="inline-flex justify-center rounded-full border border-ink/10 px-6 py-3 font-semibold text-ink transition hover:bg-cream"
            >
              Back to Course
            </Link>
          ) : null}
        </div>
      </div>
    </PageContainer>
  );
}
