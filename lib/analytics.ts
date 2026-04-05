import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export type AnalyticsEventType =
  | "course_view"
  | "course_enroll_click"
  | "course_continue_click"
  | "signup"
  | "login"
  | "checkout_started"
  | "checkout_completed";

type AnalyticsEventInput = {
  eventType: AnalyticsEventType;
  eventData?: Record<string, unknown>;
  userId?: string | null;
};

export async function trackAnalyticsEvent({
  eventType,
  eventData = {},
  userId
}: AnalyticsEventInput) {
  try {
    const supabase = createSupabaseBrowserClient();
    let resolvedUserId = userId ?? null;

    if (!resolvedUserId) {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      resolvedUserId = user?.id ?? null;
    }

    await supabase.from("analytics_events").insert({
      user_id: resolvedUserId,
      event_type: eventType,
      event_data: eventData,
      timestamp: new Date().toISOString()
    });
  } catch {
    // Analytics should never block the student experience.
  }
}
