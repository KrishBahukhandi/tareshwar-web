import Link from "next/link";
import { CalendarClock, UserRound } from "lucide-react";

type LiveClassCardProps = {
  title: string;
  teacherName: string;
  startTime: string;
  meetingLink: string;
  batchName?: string | null;
};

export function LiveClassCard({
  title,
  teacherName,
  startTime,
  meetingLink,
  batchName
}: LiveClassCardProps) {
  return (
    <article className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-ink">{title}</h2>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate">
            <span className="inline-flex items-center gap-2">
              <UserRound className="h-4 w-4 text-coral" />
              {teacherName}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-coral" />
              {new Date(startTime).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              })}
            </span>
            {batchName ? <span>{batchName}</span> : null}
          </div>
        </div>

        <Link
          href={meetingLink}
          className="inline-flex justify-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-coral"
        >
          Join Class
        </Link>
      </div>
    </article>
  );
}
