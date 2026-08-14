// Single source of truth for the booking link, shared by the valuation funnel
// (drug owners, with their estimate attached) and the in-licensor CTA.
export const CALENDLY_URL = "https://calendly.com/zenyi-first-ocean/30min";

export const CONTACT_EMAIL = "hugo@first-ocean.com";

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

// Book link for drug owners coming off the homepage rather than through the
// valuation funnel, tagged so the two originator routes stay separable.
export function originatorCallUrl() {
  const params = new URLSearchParams({
    utm_source: "originators",
    utm_medium: "homepage",
    utm_campaign: "commercialization",
  });
  return `${CALENDLY_URL}?${params.toString()}`;
}
