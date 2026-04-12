"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { signOutStudent } from "@/lib/auth";
import { STUDY_MATERIAL_DATA } from "@/lib/study-material";

type Props = {
  student: { name: string; email: string } | null;
};

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function MobileNav({ student }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function handleSignOut() {
    setSigningOut(true);
    await signOutStudent();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  const initials = student?.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "";

  const isStudyMaterial = pathname.startsWith("/study-material");

  const drawerPortal = mounted ? createPortal(
    <div>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[200] bg-ink/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[201] flex w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
          <span className="font-heading text-sm font-bold text-ink">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate transition hover:bg-ink/5"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
          {/* Nav links */}
          <nav className="space-y-1">
            {/* Study Material accordion */}
            <div>
              <button
                onClick={() => setStudyOpen((v) => !v)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isStudyMaterial ? "bg-coral/10 text-coral" : "text-ink hover:bg-ink/5"
                }`}
              >
                Study Material
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 transition-transform ${studyOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>

              {studyOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-ink/8 pl-3">
                  <Link
                    href="/study-material"
                    className="block rounded-xl px-3 py-2 text-xs font-semibold text-ink hover:bg-ink/5 transition"
                  >
                    All Study Material
                  </Link>
                  {STUDY_MATERIAL_DATA.map((classLevel) => (
                    <div key={classLevel.id} className="pt-1">
                      <Link
                        href={`/study-material/${classLevel.slug}`}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-ink hover:bg-ink/5 transition"
                      >
                        <span className="inline-flex rounded-full bg-coral/10 px-2 py-0.5 text-xs font-bold text-coral">
                          {classLevel.shortName}
                        </span>
                        {classLevel.name}
                      </Link>
                      <div className="ml-2 space-y-0.5">
                        {classLevel.subjects.map((subject) => (
                          <Link
                            key={subject.id}
                            href={`/study-material/${classLevel.slug}/${subject.slug}`}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-slate hover:bg-ink/5 hover:text-ink transition"
                          >
                            {subject.icon} {subject.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Regular links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  pathname.startsWith(link.href)
                    ? "bg-coral/10 text-coral"
                    : "text-ink hover:bg-ink/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-4 border-t border-ink/8" />

          {/* Auth section */}
          {student ? (
            <div className="space-y-1">
              {/* Student card */}
              <div className="mb-3 flex items-center gap-3 rounded-2xl bg-ink/5 px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral text-xs font-bold text-white">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{student.name}</p>
                  <p className="truncate text-xs text-slate">{student.email}</p>
                </div>
              </div>

              <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate" aria-hidden="true"><path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" /></svg>
                Dashboard
              </Link>
              <Link href="/dashboard/courses" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate" aria-hidden="true"><path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" /></svg>
                My Courses
              </Link>
              <Link href="/dashboard/profile" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate" aria-hidden="true"><path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" /></svg>
                Profile & Settings
              </Link>

              <div className="pt-2">
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-coral transition hover:bg-coral/5 disabled:opacity-60"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" /><path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-1.068a.75.75 0 1 0-1.064-1.056l-2.5 2.535a.75.75 0 0 0 0 1.056l2.5 2.535a.75.75 0 1 0 1.064-1.056L8.704 10.75H18.25A.75.75 0 0 0 19 10Z" clipRule="evenodd" /></svg>
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href="/login"
                className="flex w-full items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex w-full items-center justify-center rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral/90"
              >
                Enroll Free →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/10 text-ink transition hover:bg-ink/5 lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg>
      </button>

      {drawerPortal}
    </>
  );
}
