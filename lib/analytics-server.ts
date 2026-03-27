import type { AnalyticsEventType } from "@/lib/analytics";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export async function trackServerAnalyticsEvent({
  userId,
  eventType,
  eventData = {}
}: {
  userId?: string | null;
  eventType: AnalyticsEventType;
  eventData?: Record<string, unknown>;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    await supabase.from("analytics_events").insert({
      user_id: userId ?? null,
      event_type: eventType,
      event_data: eventData,
      timestamp: new Date().toISOString()
    });
  } catch {
    // Analytics should never block server actions or redirects.
  }
}
