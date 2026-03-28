"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { resendVerificationEmail } from "@/lib/auth";

const RESEND_COOLDOWN_SECONDS = 60;

export function VerifyEmailCard() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const hasInvalidLink = searchParams.get("error") === "invalid_link";

  const [cooldown, setCooldown] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "sent" | "error">("idle");
  const [resendError, setResendError] = useState("");

  // Count down the resend cooldown every second
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  async function handleResend() {
    if (!email || isSending || cooldown > 0) return;

    setIsSending(true);
    setResendStatus("idle");
    setResendError("");

    const result = await resendVerificationEmail(email);

    setIsSending(false);

    if ("error" in result && result.error) {
      setResendStatus("error");
      setResendError(result.error);
      return;
    }

    setResendStatus("sent");
    setCooldown(RESEND_COOLDOWN_SECONDS);
  }

  return (
    <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
      {/* Envelope illustration */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-teal"
            aria-hidden="true"
          >
            <rect width="20" height="16" x="2" y="4" rx="3" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      </div>

      <h1 className="font-heading text-3xl font-bold text-ink">Check your inbox</h1>

      <p className="mt-3 text-sm leading-6 text-slate">
        We&apos;ve sent a verification link to{" "}
        {email ? (
          <span className="font-semibold text-ink">{email}</span>
        ) : (
          "your email address"
        )}
        . Click the link to activate your account and start learning.
      </p>

      {/* Invalid / expired link error */}
      {hasInvalidLink ? (
        <div className="mt-5 rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
          That verification link has expired or is invalid. Please request a new one below.
        </div>
      ) : null}

      {/* Resend feedback */}
      {resendStatus === "sent" ? (
        <div className="mt-5 rounded-2xl border border-teal/20 bg-teal/10 px-4 py-3 text-sm text-teal">
          New verification email sent! Check your inbox (and spam folder).
        </div>
      ) : null}

      {resendStatus === "error" ? (
        <div className="mt-5 rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
          {resendError}
        </div>
      ) : null}

      {/* Steps */}
      <ol className="mt-6 space-y-3 text-sm text-slate">
        {[
          "Open the email from Tareshwar Tutorials",
          "Click the \"Verify Email\" button",
          "You'll be redirected back here to sign in",
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-bold text-teal">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      {/* Resend button — only shown when email is known */}
      {email ? (
        <div className="mt-7">
          <p className="text-sm text-slate">Didn&apos;t receive it?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isSending || cooldown > 0}
            className="mt-2 inline-flex w-full justify-center rounded-full border border-teal px-6 py-3 text-sm font-semibold text-teal transition hover:bg-teal/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending
              ? "Sending…"
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend verification email"}
          </button>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-4 text-sm">
        <Link href="/signup" className="font-semibold text-slate hover:text-ink">
          ← Back to signup
        </Link>
        <Link href="/login" className="font-semibold text-coral">
          Already verified? Sign in
        </Link>
      </div>
    </div>
  );
}
