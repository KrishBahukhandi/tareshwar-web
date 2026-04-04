import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays, IndianRupee, UserRound } from "lucide-react";

import { getCoursePath } from "@/lib/course-paths";
import type { Course } from "@/lib/courses";

type CourseCardProps = {
  course: Course;
};

function formatCourseDate(value: string | null) {
  if (!value) {
    return "Schedule announced after publishing";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Schedule announced after publishing";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={getCoursePath(course)}
      className="group block overflow-hidden rounded-4xl border border-ink/10 bg-white shadow-glow transition hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <article className="p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
            {course.category}
          </span>
          <span className="text-sm font-semibold text-teal">
            {course.isActive ? "Open for enrollment" : "Currently inactive"}
          </span>
        </div>
        <h3 className="mt-5 font-heading text-2xl font-bold text-ink">{course.title}</h3>
        <p className="mt-3 text-base leading-7 text-slate">{course.description}</p>

        <div className="mt-6 grid gap-3 text-sm text-slate">
          <div className="flex items-center gap-3">
            <UserRound className="h-4 w-4 text-teal" />
            <span>{course.teacherName}</span>
          </div>
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-teal" />
            <span>{course.lectureCount} lectures</span>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays className="h-4 w-4 text-teal" />
            <span>{formatCourseDate(course.startDate)}</span>
          </div>
          <div className="flex items-center gap-3">
            <IndianRupee className="h-4 w-4 text-teal" />
            <span>{course.price.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-coral">
          View Course
        </div>
      </article>
    </Link>
  );
}
