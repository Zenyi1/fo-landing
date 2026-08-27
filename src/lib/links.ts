// Single source of truth for the booking link, shared by the valuation funnel
// (drug owners, with their estimate attached) and the distribution-partner CTA.
export const CALENDLY_URL = "https://calendly.com/zenyi-first-ocean/30min";

export const CONTACT_EMAIL = "hugo@first-ocean.com";

// Book link for distribution partners, tagged so supply-side bookings stay
// separable from originator bookings in analytics.
export function inlicensorCallUrl() {
  const params = new URLSearchParams({
    utm_source: "distributors",
    utm_medium: "site",
    utm_campaign: "partner-application",
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
