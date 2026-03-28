import type { Metadata } from "next";
import { Suspense } from "react";

import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { PageContainer } from "@/components/layout/page-container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Reset Password",
  description: "Set a new password for your Tareshwar Tutorials student account.",
  keywords: ["reset password", "new password", "account recovery"],
  path: "/auth/reset-password"
});

export default function ResetPasswordPage() {
  return (
    <PageContainer as="section" className="max-w-md py-20">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </PageContainer>
  );
}
