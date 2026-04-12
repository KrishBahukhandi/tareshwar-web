"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { trackAnalyticsEvent } from "@/lib/analytics";

type CourseActionButtonProps = {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  variant: "hero" | "sidebar";
};

export function CourseActionButton({
  courseId,
  courseTitle,
  courseSlug,
  variant,
}: CourseActionButtonProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkEnrollment() {
      try {
        const supabase = createSupabaseBrowserClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (!cancelled) {
            setIsLoggedIn(false);
            setLoading(false);
          }
          return;
        }

        setIsLoggedIn(true);

        const { data: enrollment } = await supabase
          .from("enrollments")
          .select("id")
          .eq("student_id", user.id)
          .eq("course_id", courseId)
          .maybeSingle();

        if (!cancelled) {
          setIsEnrolled(!!enrollment);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    void checkEnrollment();
    return () => {
      cancelled = true;
    };
  }, [courseId]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    if (variant === "hero") {
      return (
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white/60 px-6 py-3 font-semibold text-ink">
          <Loader2 className="h-4 w-4 animate-spin" />
        </span>
      );
    }
    return (
      <span className="mt-8 inline-flex w-full justify-center rounded-full bg-coral/60 px-6 py-3 font-semibold text-white">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    );
  }

  // ── Already enrolled → Continue Learning ──────────────────────────────────
  if (isEnrolled) {
    const learnUrl = `/course/${encodeURIComponent(courseSlug)}/learn`;

    if (variant === "hero") {
      return (
        <Link
          href={learnUrl}
          onClick={() => {
            void trackAnalyticsEvent({
              eventType: "course_continue_click",
              eventData: { course_id: courseId, course_title: courseTitle, source: "course_hero" },
            });
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:bg-sand"
        >
          <BookOpen className="h-4 w-4" />
          Continue Learning
        </Link>
      );
    }

    return (
      <Link
        href={learnUrl}
        onClick={() => {
          void trackAnalyticsEvent({
            eventType: "course_continue_click",
            eventData: { course_id: courseId, course_title: courseTitle, source: "course_sidebar" },
          });
        }}
        className="mt-8 inline-flex w-full justify-center rounded-full bg-teal px-6 py-3 font-semibold text-white transition hover:bg-teal/90"
      >
        Continue Learning
      </Link>
    );
  }

  // ── Not enrolled ──────────────────────────────────────────────────────────
  // Logged in → go straight to checkout
  // Not logged in → go to login/signup with redirect back to checkout
  const checkoutPath = `/checkout/${encodeURIComponent(courseId)}`;
  const enrollUrl = isLoggedIn
    ? checkoutPath
    : `/login?redirect=${encodeURIComponent(checkoutPath)}`;

  if (variant === "hero") {
    return (
      <Link
        href={enrollUrl}
        onClick={() => {
          void trackAnalyticsEvent({
            eventType: "course_enroll_click",
            eventData: { course_id: courseId, course_title: courseTitle, source: "course_hero" },
          });
        }}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:bg-sand"
      >
        Enroll Now
        <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <Link
      href={enrollUrl}
      onClick={() => {
        void trackAnalyticsEvent({
          eventType: "course_enroll_click",
          eventData: { course_id: courseId, course_title: courseTitle, source: "course_sidebar" },
        });
      }}
      className="mt-8 inline-flex w-full justify-center rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral/90"
    >
      Enroll Now
    </Link>
  );
}
