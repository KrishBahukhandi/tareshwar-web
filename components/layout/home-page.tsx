import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  LayoutDashboard,
  MessageCircle,
  Phone,
  PlayCircle,
  Radio,
  Smartphone,
  Star,
  Trophy,
  Users,
  Zap
} from "lucide-react";

import { CourseCard } from "@/components/course-card/course-card";
import { FAQSection } from "@/components/home/FAQSection";
import type { Course } from "@/lib/courses";
import type { EnrolledCourseSummary } from "@/lib/learning";
import { testimonials } from "@/lib/site-data";

type HomePageProps = {
  courses: Course[];
  student?: { id: string; name: string; email: string } | null;
  enrolledCourses?: EnrolledCourseSummary[];
};

const EXAM_TAGS = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12 CBSE", "State Boards"];

// ── Replace "#" below with the real Google Drive direct-download link once you upload the APK ──
// Format: https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
const APK_DOWNLOAD_URL = "#";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose your class and subject",
    desc: "Browse courses for your child's class — from Class 8 Foundation to Class 12 Boards. Check the curriculum, teacher profile, and course schedule."
  },
  {
    step: "02",
    title: "Enroll and join your course",
    desc: "Pay once and get instant access to your course, recorded sessions, student dashboard, and the mobile app — all activated immediately."
  },
  {
    step: "03",
    title: "Track progress, resolve doubts, improve marks",
    desc: "Attend live classes, take chapter tests, resolve doubts in under 2 hours. Watch your child's marks and confidence grow each month."
  }
];

const DIFFERENTIATORS = [
  {
    icon: Clock,
    title: "Doubts resolved in < 2 hrs",
    desc: "No waiting a day. Faculty respond during study hours so students never stay stuck before a chapter test or board exam."
  },
  {
    icon: Trophy,
    title: "Chapter-wise test analytics",
    desc: "Know exactly which chapters need more attention with score trends, subject-wise breakdowns, and improvement tracking every week."
  },
  {
    icon: Users,
    title: "Batch-based accountability",
    desc: "Students study alongside peers at the same class level. Batch mates, leaderboards, and teacher check-ins build consistency."
  },
  {
    icon: BookOpen,
    title: "Structured revision before boards",
    desc: "Built-in revision calendars, chapter mastery checkpoints, and board-pattern practice tests — not just content delivery."
  },
  {
    icon: Zap,
    title: "Live + recorded, always",
    desc: "Every live class is recorded. Miss a session? Watch it the same evening. Students never fall behind the class schedule."
  },
  {
    icon: MessageCircle,
    title: "Monthly parent progress reports",
    desc: "Detailed summaries sent to parents every month — marks, attendance, weak areas, and teacher notes. Full visibility, no surprises."
  }
];

export function HomePage({ courses, student, enrolledCourses = [] }: HomePageProps) {
  const isLoggedIn = !!student;

  return (
    <div className="pb-20">

      {/* ── HERO — switches based on auth ─────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-8 lg:pt-16">
        {isLoggedIn ? (
          <LoggedInHero student={student!} enrolledCourses={enrolledCourses} />
        ) : (
        <div className="grid items-center gap-10 rounded-[2.75rem] bg-hero-grid px-8 py-14 text-white shadow-glow lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:py-16">
          <div>
            {/* Star rating trust signal */}
            <div className="flex items-center gap-2 text-sm text-white/80">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9/5</span>
              <span>from 3,200+ student reviews</span>
            </div>

            <h1 className="mt-5 max-w-3xl font-heading text-5xl font-bold tracking-tight sm:text-6xl">
              Score higher in Class 8 to 12 with India&apos;s most trusted school coaching.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Live classes, personal doubt support in under 2 hours, and real chapter-test analytics — all in one platform built for school students who want consistent marks and real understanding.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 font-semibold text-white transition hover:bg-coral/90"
              >
                Enroll Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Browse Courses
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                { value: "12k+", label: "active learners" },
                { value: "92%", label: "retention rate" },
                { value: "180+", label: "live sessions / month" }
              ].map(({ value, label }) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4">
                  <p className="font-heading text-3xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-sm text-white/75">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero right — social proof cards */}
          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.18em] text-white/60">Live right now</p>
              <p className="mt-2 text-lg font-semibold">Class 10 Science — Chemical Reactions</p>
              <p className="mt-1 text-sm text-white/70">with Dr. Kavya Sharma · 847 students attending</p>
              <div className="mt-5 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-sm font-medium text-green-400">Class in progress</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-white px-6 py-5 text-ink">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Avg. improvement</p>
                <p className="mt-3 font-heading text-3xl font-bold">+21%</p>
                <p className="mt-1 text-sm text-slate">test scores in 8 weeks</p>
              </div>
              <div className="rounded-[2rem] bg-white/10 px-6 py-5 text-white backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Doubts resolved in</p>
                <p className="mt-3 font-heading text-3xl font-bold">&lt; 2 hrs</p>
                <p className="mt-1 text-sm text-white/70">guaranteed</p>
              </div>
            </div>
          </div>
        </div>
        )}
      </section>

      {/* ── EXAM TRUST STRIP ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-medium text-slate">Courses for</span>
          {EXAM_TAGS.map((tag) => (
            <Link
              key={tag}
              href="/courses"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:border-coral hover:text-coral"
            >
              {tag}
              <ChevronRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
            How It Works
          </span>
          <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-ink">
            From enrollment to your child&apos;s first marks improvement in 3 steps.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="relative rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
              <span className="font-heading text-5xl font-extrabold text-ink/8">{step}</span>
              <h3 className="mt-4 font-heading text-xl font-bold text-ink">{title}</h3>
              <p className="mt-3 text-base leading-7 text-slate">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED COURSES ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
              Featured Courses
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-ink">
              Structured courses for Class 8 to 12 — every subject, every stage.
            </h2>
          </div>
          <Link href="/courses" className="font-semibold text-teal hover:text-teal/80">
            View all courses →
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* ── WHY TARESHWAR ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[2.5rem] bg-ink px-8 py-12 shadow-glow">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cream">
              Why Students Choose Us
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-cream">
              Not just video lessons. A system built for real school results.
            </h2>
            <p className="mt-4 text-base leading-7 text-cream/70">
              Other platforms upload videos. We build accountability, feedback loops, and revision structures that make the difference between a student who watches and a student who actually scores.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {DIFFERENTIATORS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral/20 text-coral">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-cream">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[2.5rem] bg-sand px-8 py-12">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-coral">
              Student Stories
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-ink">
              Results that families talk about.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <article key={t.name} className="flex flex-col rounded-4xl bg-white p-7 shadow-glow">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-5 flex-1 text-base leading-7 text-slate">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-slate">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
            FAQ
          </span>
          <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-ink">
            Questions parents ask before enrolling their child.
          </h2>
        </div>
        <div className="mt-10">
          <FAQSection />
        </div>
        <p className="mt-8 text-center text-slate">
          Still have questions?{" "}
          <Link href="/contact" className="font-semibold text-coral hover:underline">
            Talk to our counselors →
          </Link>
        </p>
      </section>

      {/* ── APP DOWNLOAD ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 rounded-[2.5rem] bg-ink px-8 py-12 text-cream shadow-glow lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cream">
              App
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight">
              Download the app. Continue learning from your phone.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/80">
              A fast, native experience for live classes, recorded lectures, assignments, and progress tracking — available on Android.
            </p>
            <div className="mt-8">
              <a
                href={APK_DOWNLOAD_URL}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral/90"
              >
                <Download className="h-4 w-4" />
                Download for Android
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="rounded-[1.75rem] bg-white px-6 py-8 text-ink">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-teal/10 p-3 text-teal">
                  <Smartphone className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">On the app</p>
              </div>
              <ul className="mt-5 space-y-4 text-base text-slate">
                {[
                  "One-tap join for live classes",
                  "Watch recorded lectures offline",
                  "Progress synced across web and app",
                  "Submit doubts directly to faculty"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="rounded-[2.75rem] bg-coral px-8 py-14 text-center text-white shadow-glow lg:px-16">
          <h2 className="font-heading text-5xl font-bold tracking-tight">
            Your child&apos;s board result is closer than you think.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Join 12,000+ school students who chose structured coaching over scattered self-study. Current course seats are filling up, so enroll today and lock your spot.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-coral transition hover:bg-sand"
            >
              Enroll Now — It&apos;s Free to Start
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Talk to a counselor
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">
            Free signup · 7-day refund guarantee · No hidden fees
          </p>
        </div>
      </section>

    </div>
  );
}

// ─── Logged-in hero ────────────────────────────────────────────────────────────

type LoggedInHeroProps = {
  student: { name: string; email: string };
  enrolledCourses: EnrolledCourseSummary[];
};

function LoggedInHero({ student, enrolledCourses }: LoggedInHeroProps) {
  const firstName = student.name.split(" ")[0];

  return (
    <div className="rounded-[2.75rem] bg-hero-grid px-8 py-12 text-white shadow-glow lg:px-12 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

        {/* Left — greeting + quick nav */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Welcome back</p>
          <h1 className="mt-3 font-heading text-5xl font-bold tracking-tight sm:text-6xl">
            Hey, {firstName}! 👋
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-white/80">
            Pick up where you left off. Your courses, subjects, and live classes are ready.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/courses"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:bg-sand"
            >
              <LayoutDashboard className="h-4 w-4" />
              My Dashboard
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Browse More Courses
            </Link>
          </div>

          {/* Live class placeholder */}
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
            <Radio className="h-5 w-5 shrink-0 text-green-400" />
            <div>
              <p className="text-sm font-semibold text-white">No live class right now</p>
              <p className="text-xs text-white/60">Your teacher will announce the next session in your course dashboard.</p>
            </div>
          </div>
        </div>

        {/* Right — enrolled course cards */}
        <div>
          {enrolledCourses.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Your courses
              </p>
              {enrolledCourses.map((ec) => (
                <Link
                  key={ec.courseId}
                  href={`/course/${encodeURIComponent(ec.slug)}/learn`}
                  className="group flex items-center gap-4 rounded-[1.75rem] border border-white/10 bg-white/10 p-4 backdrop-blur transition hover:bg-white/15"
                >
                  {ec.thumbnail ? (
                    <Image
                      src={ec.thumbnail}
                      alt={ec.title}
                      width={64}
                      height={64}
                      className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                      <BookOpen className="h-6 w-6 text-white/60" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{ec.title}</p>
                    <p className="mt-0.5 text-xs text-white/60">{ec.classLevel ?? "Course"}</p>
                    {/* Progress bar */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-coral transition-all"
                        style={{ width: `${Math.max(ec.progressPercent > 0 ? 3 : 0, ec.progressPercent)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-white/50">{ec.progressPercent.toFixed(0)}% complete</p>
                  </div>
                  <PlayCircle className="h-5 w-5 shrink-0 text-white/40 transition group-hover:text-white" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-7 backdrop-blur">
              <BookOpen className="h-8 w-8 text-white/50" />
              <p className="mt-4 font-semibold text-white">No courses yet</p>
              <p className="mt-2 text-sm text-white/60">
                Browse our catalog and enroll in a course to get started.
              </p>
              <Link
                href="/courses"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-coral/90"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
