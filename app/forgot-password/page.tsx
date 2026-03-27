import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { buildMetadata } from "@/lib/seo";

import { ForgotPasswordForm } from "./reset-form";

export const metadata: Metadata = buildMetadata({
  title: "Forgot Password",
  description:
    "Reset your Tareshwar Tutorials student account password and recover access to your learning dashboard.",
  keywords: ["forgot password", "reset student password", "account recovery"],
  path: "/forgot-password"
});

export default function ForgotPasswordPage() {
  return (
    <PageContainer as="section" className="max-w-md py-20">
      <ForgotPasswordForm />
    </PageContainer>
  );
}
