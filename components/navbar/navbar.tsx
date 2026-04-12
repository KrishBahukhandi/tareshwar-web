import Image from "next/image";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { getCurrentStudent } from "@/lib/auth-server";
import { STUDY_MATERIAL_DATA } from "@/lib/study-material";

import { MobileNav } from "./MobileNav";
import { UserMenu } from "./UserMenu";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export async function Navbar() {
  const student = await getCurrentStudent();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-cream/90 backdrop-blur-xl">
      <PageContainer className="py-2">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/logo.jpg"
              alt="Tareshwar Tutorials"
              width={44}
              height={44}
              className="rounded-lg object-contain"
              priority
            />
            <span className="font-heading text-base font-bold text-ink">Tareshwar Tutorials</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {/* Study Material mega-dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-slate transition hover:text-ink">
                Study Material
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown panel */}
              <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-[540px] -translate-x-1/2 rounded-3xl border border-ink/8 bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {/* Top link */}
                <Link
                  href="/study-material"
                  className="mb-3 flex items-center justify-between rounded-2xl bg-ink/3 px-4 py-3 hover:bg-ink/6 transition"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">All Study Material</p>
                    <p className="text-xs text-slate">Browse everything by class →</p>
                  </div>
                </Link>

                {/* Class columns */}
                <div className="grid grid-cols-3 gap-3">
                  {STUDY_MATERIAL_DATA.map((classLevel) => (
                    <div key={classLevel.id} className="rounded-2xl border border-ink/6 p-3">
                      <Link
                        href={`/study-material/${classLevel.slug}`}
                        className="mb-2 flex items-center gap-2 group/class"
                      >
                        <span className="inline-flex rounded-full bg-coral/10 px-2 py-0.5 text-xs font-bold text-coral">
                          {classLevel.shortName}
                        </span>
                        <span className="text-xs font-semibold text-ink group-hover/class:text-coral transition">{classLevel.name} →</span>
                      </Link>
                      <ul className="space-y-1">
                        {classLevel.subjects.map((subject) => (
                          <li key={subject.id}>
                            <Link
                              href={`/study-material/${classLevel.slug}/${subject.slug}`}
                              className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-xs text-slate hover:bg-ink/5 hover:text-ink transition"
                            >
                              <span>{subject.icon}</span>
                              {subject.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Regular nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate transition hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: desktop CTAs + mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop auth */}
            {student ? (
              <UserMenu name={student.name} email={student.email} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden text-sm font-medium text-slate transition hover:text-ink lg:inline-flex"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="hidden rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral/90 lg:inline-flex"
                >
                  Enroll Free →
                </Link>
              </>
            )}

            {/* Mobile hamburger (always rendered, manages its own state) */}
            <MobileNav student={student} />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
