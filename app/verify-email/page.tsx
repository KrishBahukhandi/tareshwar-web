import type { Metadata } from "next";

import { VerifyEmailCard } from "@/components/auth/VerifyEmailCard";
import { PageContainer } from "@/components/layout/page-container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Verify Your Email",
  description: "Check your inbox and click the verification link to activate your Tareshwar Tutorials account.",
  keywords: ["verify email", "email confirmation", "activate account"],
  path: "/verify-email"
});

export default function VerifyEmailPage() {
  return (
    <PageContainer as="section" className="max-w-md py-20">
      <VerifyEmailCard />
    </PageContainer>
  );
}
