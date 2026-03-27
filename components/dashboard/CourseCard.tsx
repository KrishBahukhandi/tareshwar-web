import Link from "next/link";
import Image from "next/image";
import { BookOpen, UserRound } from "lucide-react";

type DashboardCourseCardProps = {
  courseId: string;
  title: string;
  thumbnailUrl?: string | null;
  teacherName: string;
  progressPercent: number;
};

export function CourseCard({
  courseId,
  title,
  thumbnailUrl,
  teacherName,
  progressPercent
}: DashboardCourseCardProps) {
  return (
    <Link
      href={`/course/${encodeURIComponent(courseId)}/learn`}
      className="block overflow-hidden rounded-4xl border border-ink/10 bg-white shadow-glow transition hover:-translate-y-1"
    >
      <div className="relative aspect-[16/8] bg-sand">
        {thumbnailUrl ? <Image src={thumbnailUrl} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" /> : null}
      </div>
      <div className="p-7">
        <h2 className="font-heading text-2xl font-bold text-ink">{title}</h2>
        <div className="mt-5 grid gap-3 text-sm text-slate">
          <div className="flex items-center gap-3">
            <UserRound className="h-4 w-4 text-coral" />
            <span>{teacherName}</span>
          </div>
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-coral" />
            <span>{progressPercent.toFixed(0)}% progress</span>
          </div>
        </div>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-cream">
          <div className="h-full rounded-full bg-teal" style={{ width: `${Math.min(progressPercent, 100)}%` }} />
        </div>
      </div>
    </Link>
  );
}
