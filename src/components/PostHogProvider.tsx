'use client';

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    posthog.init(key, {
      // first-party path, rewritten to posthog in next.config so ad blockers don't drop it
      api_host: "/ingest",
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.posthog.com",
      // no person profile until we explicitly identify, keeps anonymous visitors anonymous
      person_profiles: "identified_only",
      // posthog follows app-router client navigation itself. capturing pageviews by
      // hand instead would switch $pageleave off, and with it session duration
      capture_pageview: "history_change",
      session_recording: {
        // record all inputs in replay, passwords always stay masked
        maskAllInputs: false,
        maskInputOptions: { password: true },
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
