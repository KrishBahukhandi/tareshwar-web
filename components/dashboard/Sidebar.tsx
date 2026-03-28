"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { signOutStudent } from "@/lib/auth";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    href: "/dashboard/courses",
    label: "My Courses",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" />
      </svg>
    )
  },
  {
    href: "/dashboard/live-classes",
    label: "Live Classes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
      </svg>
    )
  }
];

type SidebarProps = {
  studentName: string;
  studentEmail?: string;
};

export function Sidebar({ studentName, studentEmail }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const initials = studentName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleSignOut() {
    setSigningOut(true);
    await signOutStudent();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="rounded-4xl border border-ink/10 bg-white p-6 shadow-glow lg:sticky lg:top-24">
      {/* Student identity card */}
      <div className="rounded-3xl bg-ink px-5 py-5 text-cream">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral text-sm font-bold text-white">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-heading text-base font-bold leading-tight">{studentName}</p>
            {studentEmail ? (
              <p className="truncate text-xs text-cream/60">{studentEmail}</p>
            ) : (
              <p className="text-xs text-cream/60">Student</p>
            )}
          </div>
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cream/40">Student Space</p>
      </div>

      {/* Navigation */}
      <nav className="mt-5 grid gap-1.5">
        {links.map((link) => {
          const isActive =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-coral/10 text-coral"
                  : "text-ink hover:border-coral/30 hover:bg-coral/5 hover:text-coral"
              }`}
            >
              <span className={isActive ? "text-coral" : "text-slate"}>
                {link.icon}
              </span>
              {link.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-coral" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="mt-5 border-t border-ink/8 pt-4">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate transition hover:bg-coral/5 hover:text-coral disabled:opacity-60"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-1.068a.75.75 0 1 0-1.064-1.056l-2.5 2.535a.75.75 0 0 0 0 1.056l2.5 2.535a.75.75 0 1 0 1.064-1.056L8.704 10.75H18.25A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
          </svg>
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
