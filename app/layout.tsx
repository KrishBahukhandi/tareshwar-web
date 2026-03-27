import type { Metadata } from "next";

import "@/styles/globals.css";

import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Online Coaching for JEE, NEET and Board Exams`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    title: `${siteConfig.name} | Online Coaching for JEE, NEET and Board Exams`,
    description: siteConfig.description,
    url: siteConfig.url
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Online Coaching for JEE, NEET and Board Exams`,
    description: siteConfig.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream font-sans text-ink antialiased">
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(241,106,79,0.18),_transparent_45%)]" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
