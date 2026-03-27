"use client";

import { useActionState } from "react";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, action, isPending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-4xl border border-ink/10 bg-white p-12 shadow-glow text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-teal">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold text-ink">Message Received</h3>
        <p className="mt-3 text-base leading-7 text-slate">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
      {state.status === "error" && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {state.message}
        </div>
      )}
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Full name
          <input
            name="name"
            type="text"
            required
            placeholder="Enter your name"
            className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Message
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us how we can help"
            className="rounded-2xl border border-ink/10 px-4 py-3 outline-none transition focus:border-coral"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink/90 disabled:opacity-60"
      >
        {isPending ? "Sending…" : (
          <>
            Send Inquiry
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
