import type { ReactNode } from "react";

import { PageContainer } from "@/components/layout/page-container";
import { Sidebar } from "@/components/dashboard/Sidebar";

type DashboardLayoutProps = {
  studentName: string;
  studentEmail?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function DashboardLayout({
  studentName,
  studentEmail,
  title,
  description,
  children
}: DashboardLayoutProps) {
  return (
    <PageContainer as="section" className="py-16 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
        <Sidebar studentName={studentName} studentEmail={studentEmail} />

        <div>
          <div className="rounded-4xl bg-ink px-8 py-10 text-cream shadow-glow">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cream/60">Student Dashboard</p>
            <h1 className="mt-4 font-heading text-4xl font-bold">{title}</h1>
            <p className="mt-3 max-w-3xl text-base text-cream/80">{description}</p>
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </PageContainer>
  );
}
