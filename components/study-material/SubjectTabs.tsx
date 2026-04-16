"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SubSubject } from "@/lib/study-material";

type Props = {
  subSubjects: SubSubject[];
  active: string | undefined;
};

export function SubjectTabs({ subSubjects, active }: Props) {
  const pathname = usePathname();

  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {/* "All" tab */}
      <Link
        href={pathname}
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
          !active
            ? "bg-ink text-white shadow-md"
            : "bg-ink/6 text-slate hover:bg-ink/10 hover:text-ink"
        }`}
      >
        🗂️ All
      </Link>

      {subSubjects.map((sub) => {
        const isActive = active === sub.id;
        return (
          <Link
            key={sub.id}
            href={`${pathname}?sub=${sub.id}`}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-ink text-white shadow-md"
                : "bg-ink/6 text-slate hover:bg-ink/10 hover:text-ink"
            }`}
          >
            {sub.icon} {sub.label}
          </Link>
        );
      })}
    </div>
  );
}
