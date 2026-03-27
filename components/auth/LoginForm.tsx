"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signInStudent } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signInStudent({ email, password });

    setIsSubmitting(false);

    if ("error" in result && result.error) {
      setError(result.error);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
      <h1 className="font-heading text-4xl font-bold text-ink">Student Login</h1>
      <p className="mt-3 text-sm leading-6 text-slate">
        Access your courses, live classes, and resume-learning dashboard.
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
        <label className="grid gap-2 text-sm font-medium text-ink">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate">
        <Link href="/forgot-password" className="font-semibold text-teal">
          Forgot password?
        </Link>
        <Link href="/signup" className="font-semibold text-coral">
          Create account
        </Link>
      </div>
    </div>
  );
}
