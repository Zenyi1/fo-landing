export const CONSENT_COOKIE = "fo_cookie_consent";

export type Consent = "accepted" | "declined";

//read the stored consent, or null if the visitor hasn't chosen yet
export function getConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  const value = match?.split("=")[1];
  return value === "accepted" || value === "declined" ? value : null;
}

//persist the choice for a year
export function setConsent(value: Consent): void {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
}

//true once the visitor has accepted - gate analytics and other cookies behind this
export function hasConsent(): boolean {
  return getConsent() === "accepted";
}
