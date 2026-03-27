"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

import { trackAnalyticsEvent, type AnalyticsEventType } from "@/lib/analytics";

type TrackedLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
  eventType: AnalyticsEventType;
  eventData?: Record<string, unknown>;
};

export function TrackedLink({
  children,
  eventType,
  eventData,
  onClick,
  ...props
}: TrackedLinkProps & { onClick?: React.MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        void trackAnalyticsEvent({ eventType, eventData });
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
