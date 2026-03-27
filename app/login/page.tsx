import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/LoginForm";
import { PageContainer } from "@/components/layout/page-container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Student Login",
  description:
    "Student login for Tareshwar Tutorials. Access your dashboard, courses, live classes, and learning progress.",
  keywords: ["student login", "course dashboard login", "online learning login"],
  path: "/login"
});

export default function LoginPage() {
  return (
    <PageContainer as="section" className="max-w-md py-20">
      <LoginForm />
    </PageContainer>
  );
}
