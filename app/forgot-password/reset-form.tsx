"use client";

import Link from "next/link";
import { useState } from "react";

import { requestPasswordReset } from "@/lib/auth";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const result = await requestPasswordReset(email);

    setIsSubmitting(false);

    if ("error" in result && result.error) {
      setError(result.error);
      return;
    }

    setSuccess("Password reset instructions have been sent to your email.");
  };

  return (
    <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
      <h1 className="font-heading text-4xl font-bold text-ink">Forgot Password</h1>
      <p className="mt-3 text-sm leading-6 text-slate">
        Enter your student email and we’ll send you a password reset link.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-2xl border border-teal/20 bg-teal/10 px-4 py-3 text-sm text-teal">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-teal">
          Back to login
        </Link>
      </p>
    </div>
  );
}
