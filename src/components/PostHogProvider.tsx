'use client';

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

// categorical funnel answers are safe to show in replay; everything else (the homepage
// early-access form's name, email and company) stays masked
const FUNNEL_FIELDS = new Set([
  "devStage",
  "therapeuticArea",
  "assetType",
  "approvals",
  "patentLife",
  "annualSales",
  "peakSales",
  "lmicBurden",
  "coreMarkets",
  "footprint",
  "emDeals",
]);

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
      // we drive pageviews ourselves for app-router client navigation
      capture_pageview: false,
      session_recording: {
        // mask every field by default, then reveal only the funnel's categorical dropdowns
        // so we can see what was picked while the homepage form's pii stays hidden
        maskAllInputs: true,
        maskInputFn: (text, element) => {
          const name = element?.getAttribute("name");
          return name && FUNNEL_FIELDS.has(name) ? text : "*".repeat(text.length);
        },
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    let url = window.origin + pathname;
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}
