"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { mapSupabaseAuthError } from "@/lib/auth";

type Status = "verifying" | "ready" | "submitting" | "success" | "invalid";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [status, setStatus] = useState<Status>("verifying");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Exchange the one-time code for a session so updateUser will work
  useEffect(() => {
    if (!code) { setStatus("invalid"); return; }

    createSupabaseBrowserClient()
      .auth.exchangeCodeForSession(code)
      .then(({ error }) => setStatus(error ? "invalid" : "ready"));
  }, [code]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("submitting");
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(mapSupabaseAuthError(updateError.message));
      setStatus("ready");
      return;
    }

    await supabase.auth.signOut();
    setStatus("success");
    setTimeout(() => router.push("/login?password_reset=true"), 2000);
  }

  // ── Invalid / expired link ────────────────────────────────
  if (status === "invalid") {
    return (
      <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
        <div className="flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-coral/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-coral" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
        </div>
        <h1 className="mt-5 font-heading text-3xl font-bold text-ink">Link expired</h1>
        <p className="mt-3 text-sm leading-6 text-slate">
          This password reset link has expired or already been used. Request a new one below.
        </p>
        <Link
          href="/forgot-password"
          className="mt-6 inline-flex w-full justify-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink/90"
        >
          Request new link
        </Link>
        <p className="mt-4 text-center text-sm text-slate">
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-teal">Sign in</Link>
        </p>
      </div>
    );
  }

  // ── Verifying spinner ─────────────────────────────────────
  if (status === "verifying") {
    return (
      <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
        <div className="flex flex-col items-center gap-4 py-8">
          <svg className="h-8 w-8 animate-spin text-coral" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-slate">Verifying your reset link…</p>
        </div>
      </div>
    );
  }

  // ── Success ───────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
        <div className="flex justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-teal/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-9 w-9 text-teal" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
        <h1 className="mt-5 font-heading text-3xl font-bold text-ink">Password updated!</h1>
        <p className="mt-3 text-sm leading-6 text-slate">
          Your password has been changed. Redirecting you to sign in…
        </p>
      </div>
    );
  }

  // ── Reset form ────────────────────────────────────────────
  return (
    <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
      <h1 className="font-heading text-4xl font-bold text-ink">Set new password</h1>
      <p className="mt-3 text-sm leading-6 text-slate">
        Choose a strong password with at least 6 characters.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="grid gap-2 text-sm font-medium text-ink">
          New Password
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              className="w-full rounded-2xl border border-ink/10 px-4 py-3 pr-11 outline-none transition focus:border-coral"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" /><path d="M10.748 13.93l2.523 2.524a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.185A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41Z" clipRule="evenodd" /></svg>
              )}
            </button>
          </div>
        </label>

        <label className="grid gap-2 text-sm font-medium text-ink">
          Confirm Password
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type={showPassword ? "text" : "password"}
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
          disabled={status === "submitting"}
          className="inline-flex w-full justify-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}
