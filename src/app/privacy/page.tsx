import type { Metadata } from "next";

import { LegalShell } from "@/components/blueprint/LegalShell";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How firstocean handles personal data on first-ocean.com, including analytics, session recording and booking.",
  alternates: { canonical: "/privacy" },
};

// TODO: legal review before launch, and fill in the two facts only firstocean
// can supply: the registered legal entity name and its address, and the
// governing jurisdiction. Everything else below describes what the site
// actually does today.
export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy policy" updated="9 August 2026">
      <p>
        This policy covers first-ocean.com. It describes what the site collects,
        why, and what you can do about it. We have tried to keep it to what is
        true rather than what is customary.
      </p>

      <section>
        <h2>What we collect</h2>
        <p>
          <strong>Product and analytics data.</strong> We use PostHog and Vercel
          Analytics to understand how the site is used. Between them these
          record your IP address, approximate location derived from it, browser
          and device type, referring page, and the pages and elements you
          interact with. PostHog is also configured to record sessions, which
          captures your interactions with pages as a replayable view.
        </p>
        <p>
          <strong>Booking data.</strong> When you book a call, that happens on
          Calendly. Any name, email address, and scheduling detail you enter is
          given to Calendly and passed to us, and is covered by Calendly&rsquo;s
          own privacy policy.
        </p>
        <p>
          <strong>Email.</strong> If you write to us, we hold your message and
          address for as long as we need it to reply and to keep a record of the
          conversation.
        </p>
        <p>
          <strong>What the valuation tool does not collect.</strong> The
          estimate tool asks about an asset, not about you. It does not ask for
          your name, your compound, or your email, and we do not attach the
          answers to an identity. The answers are sent to Anthropic&rsquo;s API
          to produce the estimate.
        </p>
      </section>

      <section>
        <h2>Why we are allowed to</h2>
        <p>
          We rely on legitimate interests to run and improve the site, and to
          reply when you contact us. Where consent is required for analytics or
          session recording in your jurisdiction, we rely on consent and you can
          withdraw it at any time by asking us, or by enabling Do Not Track or
          an equivalent control in your browser.
        </p>
      </section>

      <section>
        <h2>Who we share it with</h2>
        <p>
          We do not sell personal data and we do not share it for advertising.
          We use the following processors, each of which handles data on our
          instructions:
        </p>
        <ul>
          <li>Vercel, for hosting and site analytics</li>
          <li>PostHog, for product analytics and session recording</li>
          <li>Calendly, for scheduling</li>
          <li>Resend, for sending email</li>
          <li>
            Anthropic, for generating valuation estimates from asset details
          </li>
        </ul>
        <p>
          Some of these process data outside the UK and the EEA. Where that
          happens we rely on the transfer safeguards those providers put in
          place, such as standard contractual clauses.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          Analytics and session recordings are retained on our providers&rsquo;
          default schedules and are deleted after that. Email and booking
          records are kept for as long as the relationship is live, and then for
          as long as we need them for our own records.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Depending on where you live you can ask us for a copy of your data,
          ask us to correct or delete it, object to how we use it, or ask us to
          restrict it. Write to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will
          answer within a month. If you are in the UK or the EEA and you are not
          satisfied with our answer, you can complain to your data protection
          authority.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy go to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalShell>
  );
}
