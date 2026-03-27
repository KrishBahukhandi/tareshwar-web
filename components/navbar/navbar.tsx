import Image from "next/image";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/teachers", label: "Teachers" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-cream/90 backdrop-blur-xl">
      <PageContainer className="py-2">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
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
          <nav className="hidden lg:flex items-center gap-7">
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

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden lg:inline-flex text-sm font-medium text-slate transition hover:text-ink"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral/90"
            >
              Enroll Free →
            </Link>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
