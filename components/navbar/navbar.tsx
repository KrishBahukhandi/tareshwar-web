import Image from "next/image";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { getCurrentStudent } from "@/lib/auth-server";

import { MobileNav } from "./MobileNav";
import { UserMenu } from "./UserMenu";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/teachers", label: "Teachers" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
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
