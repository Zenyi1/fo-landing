// Single source of truth for the booking link, shared by the valuation funnel
// (drug owners, with their estimate attached) and the in-licensor CTA.
export const CALENDLY_URL = "https://calendly.com/zenyi-first-ocean/30min";

// TODO: confirm the company page slug. Nothing public is indexed under
// first-ocean.com, so this is a guess and the announcement strip and footer
// both point at it.
export const LINKEDIN_URL = "https://www.linkedin.com/company/first-ocean";

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

// Book link for the intelligence page (clinical-stage sponsors), tagged so
// bookings from that page are attributable in analytics.
export function intelligenceCallUrl() {
  const params = new URLSearchParams({
    utm_source: "intelligence",
    utm_medium: "landing",
    utm_campaign: "operating-system",
  });
  return `${CALENDLY_URL}?${params.toString()}`;
}
