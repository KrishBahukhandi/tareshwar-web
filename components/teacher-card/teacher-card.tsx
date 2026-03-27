import Image from "next/image";
import { BookOpen, Trophy, Users } from "lucide-react";

import type { TeacherProfile } from "@/lib/teachers";

type TeacherCardProps = {
  teacher: TeacherProfile;
};

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <article className="overflow-hidden rounded-4xl border border-ink/10 bg-white shadow-glow">
      <div className="relative h-64 w-full">
        <Image
          src={
            teacher.avatarUrl ??
            "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
          }
          alt={teacher.name}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink backdrop-blur">
          {teacher.courseCount} published {teacher.courseCount === 1 ? "course" : "courses"}
        </div>
      </div>
      <div className="p-7">
        <h3 className="font-heading text-2xl font-bold text-ink">{teacher.name}</h3>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal">{teacher.primaryCategory}</p>
        <p className="mt-4 text-base leading-7 text-slate">
          Faculty profile sourced from published courses on the platform. Student enrollment and course delivery remain batch-based.
        </p>
        <div className="mt-6 grid gap-3 text-sm text-slate">
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-coral" />
            <span>{teacher.courseCount} live course{teacher.courseCount === 1 ? "" : "s"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-4 w-4 text-coral" />
            <span>{teacher.totalStudents.toLocaleString("en-IN")} enrolled students</span>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="h-4 w-4 text-coral" />
            <span>Primary category: {teacher.primaryCategory}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
