"use client";

import { useState } from "react";

import { updateStudentPassword, updateStudentProfile } from "@/lib/auth";

type Props = { name: string; email: string };

export function ProfileForm({ name, email }: Props) {
  // ── Profile section ───────────────────────────────────────
  const [displayName, setDisplayName] = useState(name);
  const [profileStatus, setProfileStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [profileError, setProfileError] = useState("");

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    if (!displayName.trim()) return;
    setProfileStatus("saving");
    setProfileError("");

    const result = await updateStudentProfile({ name: displayName.trim() });

    if ("error" in result && result.error) {
      setProfileError(result.error);
      setProfileStatus("error");
      return;
    }
    setProfileStatus("saved");
    setTimeout(() => setProfileStatus("idle"), 3000);
  }

  // ── Password section ──────────────────────────────────────
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [passwordError, setPasswordError] = useState("");

  async function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordStatus("saving");
    const result = await updateStudentPassword(newPassword);

    if ("error" in result && result.error) {
      setPasswordError(result.error);
      setPasswordStatus("error");
      return;
    }

    setPasswordStatus("saved");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordStatus("idle"), 3000);
  }

  return (
    <div className="mt-8 space-y-6">
      {/* ── Profile info card ──────────────────────────────── */}
      <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
        <h2 className="font-heading text-xl font-semibold text-ink">Personal Information</h2>
        <p className="mt-1 text-sm text-slate">Update your display name shown across the platform.</p>

        <form onSubmit={handleProfileSave} className="mt-6 space-y-5">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Full Name
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
              required
              className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
            />
          </label>

          {/* Email — read only */}
          <div className="grid gap-2 text-sm font-medium text-ink">
            Email Address
            <div className="flex items-center rounded-2xl border border-ink/8 bg-ink/3 px-4 py-3 text-slate">
              {email}
              <span className="ml-auto rounded-full bg-ink/8 px-2.5 py-0.5 text-xs font-medium text-slate">
                Cannot change
              </span>
            </div>
            <p className="text-xs text-slate">Email is linked to your login and cannot be changed here.</p>
          </div>

          {profileStatus === "error" && (
            <div className="rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
              {profileError}
            </div>
          )}
          {profileStatus === "saved" && (
            <div className="rounded-2xl border border-teal/20 bg-teal/10 px-4 py-3 text-sm text-teal">
              Profile updated successfully.
            </div>
          )}

          <button
            type="submit"
            disabled={profileStatus === "saving" || displayName.trim() === name}
            className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {profileStatus === "saving" ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* ── Password card ──────────────────────────────────── */}
      <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
        <h2 className="font-heading text-xl font-semibold text-ink">Change Password</h2>
        <p className="mt-1 text-sm text-slate">Choose a strong password with at least 6 characters.</p>

        <form onSubmit={handlePasswordSave} className="mt-6 space-y-5">
          <label className="grid gap-2 text-sm font-medium text-ink">
            New Password
            <div className="relative">
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                aria-label={showPassword ? "Hide" : "Show"}
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
            Confirm New Password
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
              className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
            />
          </label>

          {passwordStatus === "error" && (
            <div className="rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
              {passwordError}
            </div>
          )}
          {passwordStatus === "saved" && (
            <div className="rounded-2xl border border-teal/20 bg-teal/10 px-4 py-3 text-sm text-teal">
              Password changed successfully.
            </div>
          )}

          <button
            type="submit"
            disabled={passwordStatus === "saving"}
            className="inline-flex rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {passwordStatus === "saving" ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
