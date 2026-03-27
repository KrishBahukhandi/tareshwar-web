"use client";

import { useEffect } from "react";

import { trackAnalyticsEvent, type AnalyticsEventType } from "@/lib/analytics";

type TrackEventOnViewProps = {
  eventType: AnalyticsEventType;
  eventData?: Record<string, unknown>;
};

export function TrackEventOnView({ eventType, eventData = {} }: TrackEventOnViewProps) {
  useEffect(() => {
    void trackAnalyticsEvent({ eventType, eventData });
  }, [eventType, eventData]);

  return null;
}
