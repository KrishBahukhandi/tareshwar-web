import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/SignupForm";
import { PageContainer } from "@/components/layout/page-container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Student Signup",
  description:
    "Create a student account on Tareshwar Tutorials to enroll in courses, attend live classes, and track exam preparation progress.",
  keywords: ["student signup", "enroll online course", "create student account"],
  path: "/signup"
});

export default function SignupPage() {
  return (
    <PageContainer as="section" className="max-w-md py-20">
      <SignupForm />
    </PageContainer>
  );
}
