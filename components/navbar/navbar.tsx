import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/teachers", label: "Teachers" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Login" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/80 backdrop-blur-xl">
      <PageContainer className="py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-lg font-bold text-white">
                TT
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-ink">Tareshwar Tutorials</p>
                <p className="text-xs uppercase tracking-[0.24em] text-slate">Online Coaching</p>
              </div>
            </Link>

            <Link
              href="/signup"
              className="inline-flex rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink/90 lg:hidden"
            >
              Start Learning
            </Link>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
            <nav className="overflow-x-auto">
              <div className="flex min-w-max items-center gap-5 pb-1 lg:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-ink transition hover:text-coral"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <Link
              href="/signup"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink/90 lg:inline-flex"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
