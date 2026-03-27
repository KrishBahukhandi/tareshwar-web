import Image from "next/image";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <PageContainer className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="Tareshwar Tutorials"
                width={52}
                height={52}
                className="rounded-xl object-contain"
              />
              <h2 className="font-heading text-2xl font-bold text-ink">Tareshwar Tutorials</h2>
            </div>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate">
              A modern EdTech platform for ambitious learners seeking better coaching, stronger results, and a clearer study journey.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate">
              <p>support@tareshwartutorials.com</p>
              <p>+91 98765 43210</p>
              <p>Mon-Sat, 9:00 AM - 7:00 PM IST</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            <div>
              <p className="font-semibold text-ink">Explore</p>
              <div className="mt-4 space-y-3 text-sm text-slate">
                <Link href="/" className="block hover:text-coral">
                  Home
                </Link>
                <Link href="/courses" className="block hover:text-coral">
                  Courses
                </Link>
                <Link href="/teachers" className="block hover:text-coral">
                  Teachers
                </Link>
                <Link href="/blog" className="block hover:text-coral">
                  Blog
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold text-ink">Company</p>
              <div className="mt-4 space-y-3 text-sm text-slate">
                <Link href="/about" className="block hover:text-coral">
                  About
                </Link>
                <Link href="/contact" className="block hover:text-coral">
                  Contact
                </Link>
                <Link href="/login" className="block hover:text-coral">
                  Login
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold text-ink">Legal & Social</p>
              <div className="mt-4 space-y-3 text-sm text-slate">
                <Link href="/terms" className="block hover:text-coral">
                  Terms
                </Link>
                <Link href="/privacy-policy" className="block hover:text-coral">
                  Privacy Policy
                </Link>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-coral"
                >
                  Instagram
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-coral"
                >
                  YouTube
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-coral"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-6 text-sm text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Tareshwar Tutorials. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="hover:text-coral">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-coral">
              Privacy Policy
            </Link>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
