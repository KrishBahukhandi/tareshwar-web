import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  MessageCircle,
  Phone,
  Smartphone,
  Star,
  Trophy,
  Users,
  Zap
} from "lucide-react";

import { CourseCard } from "@/components/course-card/course-card";
import { TeacherCard } from "@/components/teacher-card/teacher-card";
import { FAQSection } from "@/components/home/FAQSection";
import type { Course } from "@/lib/courses";
import type { TeacherProfile } from "@/lib/teachers";
import { testimonials } from "@/lib/site-data";

type HomePageProps = {
  courses: Course[];
  teachers: TeacherProfile[];
};

const EXAM_TAGS = ["JEE Mains & Advanced", "NEET", "Class 12 CBSE", "State Boards", "Foundation"];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose your course",
    desc: "Browse batches for your exam. Check the curriculum, teacher profile, and batch schedule. Pick what fits your timeline and budget."
  },
  {
    step: "02",
    title: "Enroll and join your batch",
    desc: "Pay once and get instant access — live batch, recorded sessions, student dashboard, and the Flutter app, all activated immediately."
  },
  {
    step: "03",
    title: "Track, practice, improve",
    desc: "Attend live classes, take weekly mocks, resolve doubts in under 2 hours. Watch your score and rank move week over week."
  }
];

const DIFFERENTIATORS = [
  {
    icon: Clock,
    title: "Doubt resolved in < 2 hrs",
    desc: "No waiting 24 hours. Faculty respond during study hours so you never stay stuck on a concept before a test."
  },
  {
    icon: Trophy,
    title: "Weekly rank analytics",
    desc: "Know exactly where you stand with test score trends, subject-wise breakdowns, and rank improvement tracking."
  },
  {
    icon: Users,
    title: "Batch-based accountability",
    desc: "Study alongside peers at your level. Batch mates, leaderboards, and regular teacher check-ins keep you consistent."
  },
  {
    icon: BookOpen,
    title: "Structured revision cycles",
    desc: "Built-in revision calendars, spaced repetition decks, and chapter mastery checkpoints — not just content dumps."
  },
  {
    icon: Zap,
    title: "Live + recorded, always",
    desc: "Every live class is recorded. Miss a session? Watch it the same evening. Never fall behind your batch."
  },
  {
    icon: MessageCircle,
    title: "Monthly parent reports",
    desc: "Summaries sent to parents each month. They stay informed without pressure, you stay focused without interruptions."
  }
];

export function HomePage({ courses, teachers }: HomePageProps) {
  return (
    <div className="pb-20">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-8 lg:pt-16">
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
              Crack JEE, NEET &amp; Boards with India&apos;s most trusted online coaching.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Live classes, personal doubt support in under 2 hours, and real mock test analytics — all in one platform built around how toppers actually study.
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
              <p className="mt-2 text-lg font-semibold">JEE Physics — Current Electricity</p>
              <p className="mt-1 text-sm text-white/70">with Rohan Verma · 847 students attending</p>
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
            From sign-up to your first rank improvement in 3 steps.
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
              Structured batches for every exam, every stage.
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
              Not just content. A system that produces real results.
            </h2>
            <p className="mt-4 text-base leading-7 text-cream/70">
              Other platforms upload videos. We build accountability, feedback loops, and learning structures that make the difference between knowing a concept and scoring on it.
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

      {/* ── TEACHERS ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
              Our Faculty
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-ink">
              Teachers with strong track records and real classroom momentum.
            </h2>
          </div>
          <Link href="/teachers" className="font-semibold text-coral hover:text-coral/80">
            Meet all mentors →
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {teachers.slice(0, 3).map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
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
            Questions parents and students ask before enrolling.
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

      {/* ── FLUTTER APP ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 rounded-[2.5rem] bg-ink px-8 py-12 text-cream shadow-glow lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cream">
              Flutter Mobile App
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight">
              Download the app. Continue learning from your phone.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/80">
              A fast, native experience for live classes, recorded lectures, assignments, and progress tracking — built in Flutter, available on Android and iOS.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral/90"
              >
                <Download className="h-4 w-4" />
                Get on Android
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-cream transition hover:bg-white/5"
              >
                Get on iOS
              </Link>
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
            Your exam is closer than you think.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Join 12,000+ students who chose structured coaching over scattered self-study. The next batch is filling up — enroll today and lock your spot.
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
