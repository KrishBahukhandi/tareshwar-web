"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { trackAnalyticsEvent } from "@/lib/analytics";
import { signUpStudent } from "@/lib/auth";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const result = await signUpStudent({ name, email, password });

    setIsSubmitting(false);

    if ("error" in result && result.error) {
      setError(result.error);
      return;
    }

    if ("needsEmailVerification" in result && result.needsEmailVerification) {
      await trackAnalyticsEvent({
        userId: result.user.id,
        eventType: "signup",
        eventData: {
          email,
          needsEmailVerification: true
        }
      });
      setSuccess("Account created. Please verify your email before logging in.");
      return;
    }

    if ("user" in result && result.user) {
      await trackAnalyticsEvent({
        userId: result.user.id,
        eventType: "signup",
        eventData: {
          email,
          needsEmailVerification: false
        }
      });
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
      <h1 className="font-heading text-4xl font-bold text-ink">Student Signup</h1>
      <p className="mt-3 text-sm leading-6 text-slate">
        Create your student account to enroll in courses and continue learning across web and mobile.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            required
            className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
          />
        </label>
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
            minLength={6}
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
          className="inline-flex w-full justify-center rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-teal">
          Login here
        </Link>
      </p>
    </div>
  );
}
