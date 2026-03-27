import Link from "next/link";
import { ArrowRight, Download, PlayCircle, Smartphone, Star } from "lucide-react";

import { CourseCard } from "@/components/course-card/course-card";
import { TeacherCard } from "@/components/teacher-card/teacher-card";
import type { Course } from "@/lib/courses";
import type { TeacherProfile } from "@/lib/teachers";
import { testimonials } from "@/lib/site-data";

type HomePageProps = {
  courses: Course[];
  teachers: TeacherProfile[];
};

export function HomePage({ courses, teachers }: HomePageProps) {

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-10 rounded-[2.75rem] bg-hero-grid px-8 py-14 text-white shadow-glow lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:py-16">
          <div>
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              Modern online coaching for ambitious learners
            </span>
            <h1 className="mt-6 max-w-3xl font-heading text-5xl font-bold tracking-tight sm:text-6xl">
              Learn from India’s top mentors with live classes, smart practice, and visible progress.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Tareshwar Tutorials helps students discover the right course, enroll faster, and stay accountable with a clean web experience and a companion mobile app.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:bg-sand"
              >
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Courses
                <PlayCircle className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4">
                <p className="font-heading text-3xl font-bold text-white">12k+</p>
                <p className="mt-1 text-sm text-white/75">active learners</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-white">92%</p>
                <p className="mt-1 text-sm text-white/75">retention rate</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-white">180+</p>
                <p className="mt-1 text-sm text-white/75">live sessions monthly</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-white/60">This Week</p>
                  <p className="mt-2 text-2xl font-semibold">3 live classes, 2 mock tests, 1 mentor review</p>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">4.9/5 rating</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white px-5 py-5 text-ink">
                  <p className="text-sm text-slate">Average test improvement</p>
                  <p className="mt-2 font-heading text-3xl font-bold">+21%</p>
                </div>
                <div className="rounded-3xl bg-sand px-5 py-5 text-ink">
                  <p className="text-sm text-slate">Doubt resolution</p>
                  <p className="mt-2 font-heading text-3xl font-bold">&lt; 2 hrs</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-white px-6 py-5 text-ink">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Student-first</p>
                <p className="mt-3 text-lg font-semibold">Personalized guidance without the chaos.</p>
              </div>
              <div className="rounded-[2rem] bg-white/10 px-6 py-5 text-white backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">App synced</p>
                <p className="mt-3 text-lg font-semibold">Continue learning on web and Flutter mobile.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
              Featured Courses
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-ink">
              Featured courses built for entrance prep, school excellence, and consistent study habits.
            </h2>
          </div>
          <Link href="/courses" className="font-semibold text-teal">
            View all courses
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.length ? (
            courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} />)
          ) : (
            <div className="rounded-4xl border border-ink/10 bg-white p-8 text-slate shadow-glow md:col-span-2 xl:col-span-3">
              Published courses will appear here once they are available in Supabase.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
              Top Teachers
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-ink">
              Top teachers with strong classroom experience and a track record of student results.
            </h2>
          </div>
          <Link href="/teachers" className="font-semibold text-coral">
            Meet the mentors
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {teachers.length ? (
            teachers.slice(0, 3).map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)
          ) : (
            <div className="rounded-4xl border border-ink/10 bg-white p-8 text-slate shadow-glow md:col-span-2 xl:col-span-3">
              Teacher profiles will appear here after published courses are assigned to faculty.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2.5rem] bg-sand px-8 py-12">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-coral">
              Student Testimonials
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-ink">
              Families stay because the results are visible and the support feels real.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-4xl bg-white p-7 shadow-glow">
                <div className="flex gap-1 text-coral">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-7 text-slate">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6">
                  <p className="font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-sm text-slate">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 rounded-[2.5rem] bg-ink px-8 py-12 text-cream shadow-glow lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cream">
              Flutter Mobile App
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight">
              Download the Tareshwar Tutorials Flutter app for classes, revision, and doubt support on the go.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/80">
              Built alongside the website, the mobile app gives students a fast, native-feeling experience for joining live classes, watching recordings, and tracking assignments anywhere.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral/90"
              >
                <Download className="h-4 w-4" />
                Get the App
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-cream transition hover:bg-white/5"
              >
                Preview Dashboard
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="rounded-[1.75rem] bg-white px-6 py-8 text-ink">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-teal/10 p-3 text-teal">
                  <Smartphone className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Why students use it</p>
              </div>
              <ul className="mt-5 space-y-4 text-base text-slate">
                <li>One-tap join for live classes and revision rooms</li>
                <li>Flutter-powered performance across Android and iOS</li>
                <li>Assignments, reminders, and progress analytics in sync</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
