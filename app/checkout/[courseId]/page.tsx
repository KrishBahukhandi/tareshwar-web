import Image from "next/image";
import { notFound } from "next/navigation";

import { TrackEventOnView } from "@/components/analytics/TrackEventOnView";
import { PageContainer } from "@/components/layout/page-container";
import { requireStudent } from "@/lib/auth-server";
import { getCourseById } from "@/lib/courses";
import { formatCoursePrice } from "@/lib/pricing";

import { PaymentButton } from "./payment-button";

type CheckoutPageProps = {
  params: Promise<{ courseId: string }>;
};

function formatCourseDate(value: string | null) {
  if (!value) {
    return "To be announced";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  await requireStudent();

  const { courseId } = await params;
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <PageContainer as="section" className="py-20">
      <TrackEventOnView
        eventType="checkout_started"
        eventData={{
          course_id: course.id,
          course_title: course.title,
          teacher_name: course.teacherName,
          price: course.price
        }}
      />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
          <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
            Checkout
          </span>
          <h1 className="mt-6 font-heading text-4xl font-bold text-ink">Review your course purchase</h1>
          <p className="mt-4 text-base leading-8 text-slate">
            Confirm the published course details before continuing to Razorpay payment.
          </p>

          <div className="mt-8 overflow-hidden rounded-4xl bg-cream">
            <div className="aspect-[16/8] bg-sand">
              <div className="relative h-full w-full">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
                {course.category}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-ink">{course.title}</h2>
              <p className="mt-4 text-base leading-8 text-slate">{course.description}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
                  Course Access
                </p>
                <h2 className="mt-2 font-heading text-3xl font-bold text-ink">
                  Review the live course setup from Supabase
                </h2>
              </div>
              <div className="rounded-3xl bg-cream px-4 py-3 text-right">
                <p className="text-sm text-slate">Enrollment status</p>
                <p className="font-heading text-3xl font-bold text-ink">
                  {course.isActive ? "Open" : "Closed"}
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              <article className="rounded-4xl border border-ink/10 bg-cream p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-coral">
                      Course Access
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-bold text-ink">{course.title}</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:min-w-[22rem]">
                    <div className="rounded-3xl bg-white px-4 py-3">
                      <p className="text-sm text-slate">Start date</p>
                      <p className="mt-1 font-semibold text-ink">
                        {formatCourseDate(course.startDate)}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white px-4 py-3">
                      <p className="text-sm text-slate">Teacher</p>
                      <p className="mt-1 font-semibold text-ink">{course.teacherName}</p>
                    </div>
                    <div className="rounded-3xl bg-white px-4 py-3">
                      <p className="text-sm text-slate">Class level</p>
                      <p className="mt-1 font-semibold text-ink">{course.classLevel ?? "Not specified"}</p>
                    </div>
                    <div className="rounded-3xl bg-white px-4 py-3">
                      <p className="text-sm text-slate">Capacity</p>
                      <p className="mt-1 font-semibold text-ink">
                        {course.maxStudents > 0 ? `${course.totalStudents}/${course.maxStudents}` : course.totalStudents}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 rounded-3xl bg-white px-4 py-4">
                  <p className="text-sm text-slate">Subjects overview</p>
                  <p className="mt-2 text-base leading-7 text-ink">
                    {course.subjectsOverview.length > 0
                      ? course.subjectsOverview.join(", ")
                      : "No subjects overview has been published yet."}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <aside className="rounded-4xl bg-ink p-8 text-cream shadow-glow">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cream/60">
            Order Summary
          </p>
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-cream/60">Course title</p>
              <p className="mt-2 text-lg font-semibold">{course.title}</p>
            </div>
            <div>
              <p className="text-sm text-cream/60">Teacher</p>
              <p className="mt-2 text-lg font-semibold">{course.teacherName}</p>
            </div>
            <div>
              <p className="text-sm text-cream/60">Course price</p>
              <p className="mt-2 font-heading text-5xl font-bold">{formatCoursePrice(course.price)}</p>
            </div>
            <div>
              <p className="text-sm text-cream/60">Published learning structure</p>
              <p className="mt-2 text-base text-cream/80">
                {course.curriculum.length > 0
                  ? `${course.curriculum.length} subjects and ${course.lectureCount} lectures are available in the current course setup.`
                  : "Detailed curriculum has not been published yet for this course."}
              </p>
            </div>
          </div>

          <div className="mt-8">
            {course.isActive ? (
              <PaymentButton
                courseId={course.id}
                isFree={course.price <= 0}
                course={{
                  teacher: course.teacherName,
                  startDate: course.startDate,
                  description:
                    course.subjectsOverview.length > 0
                      ? course.subjectsOverview.join(", ")
                      : course.description
                }}
              />
            ) : (
              <div className="rounded-3xl border border-coral/20 bg-coral/10 px-5 py-4 text-sm text-coral">
                This course is currently not open for enrollment. Please contact support or check
                back soon.
              </div>
            )}
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
