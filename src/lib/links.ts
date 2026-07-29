// Single source of truth for the booking link, shared by the valuation funnel
// (drug owners, with their estimate attached) and the in-licensor CTA.
export const CALENDLY_URL = "https://calendly.com/zenyi-first-ocean/30min";

// Book link for in-licensors / distributors, tagged so bookings from the
// homepage buy-side CTA are attributable in analytics.
export function inlicensorCallUrl() {
  const params = new URLSearchParams({
    utm_source: "inlicensors",
    utm_medium: "homepage",
    utm_campaign: "portfolio-access",
  });
  return `${CALENDLY_URL}?${params.toString()}`;
}
