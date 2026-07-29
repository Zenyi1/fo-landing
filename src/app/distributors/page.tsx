import type { Metadata } from "next";
import { WaveBackground } from "@/components/WaveBackground";
import { DistributorsHeader } from "@/components/DistributorsHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { inlicensorCallUrl } from "@/lib/links";

const title = "For in-licensors and distributors";
const description =
  "A gated portfolio of 100+ assets ready to license, tailored to your markets and screened before they reach you. Category detail is open; compound, originator, and terms unlock under NDA on a 30-minute call.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/distributors" },
  openGraph: {
    type: "website",
    url: "/distributors",
    siteName: "firstocean",
    title,
    description,
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: { card: "summary", title, description },
};

type Asset = {
  area: string;
  modality: string;
  stage: string;
  origin: string;
  markets: string;
};

// Illustrative, category-level preview of the live portfolio: drugs and biologics
// only, targeted at the LATAM, MENA and SEA markets firstocean distributes into.
// No row names a real company or compound, and none is a closed deal — the
// identity and terms are what the NDA opens.
const ASSETS: Asset[] = [
  { area: "Oncology", modality: "Monoclonal antibody", stage: "Approved · EMA, FDA", origin: "Western Europe", markets: "Brazil, Mexico, Colombia" },
  { area: "Cardiovascular", modality: "Small-molecule NCE", stage: "Phase 3 · ready to partner", origin: "North America", markets: "Saudi Arabia, UAE, Egypt" },
  { area: "HIV", modality: "Fixed-dose antiretroviral", stage: "Approved · WHO PQ", origin: "Western Europe", markets: "Indonesia, Thailand, Vietnam" },
  { area: "Rare disease", modality: "Orphan small molecule", stage: "Filed · FDA (orphan)", origin: "North America", markets: "Mexico, Chile, Argentina" },
  { area: "Diabetes", modality: "Biosimilar (insulin analog)", stage: "Phase 3 · ready to partner", origin: "Western Europe", markets: "Indonesia, Philippines, Vietnam" },
  { area: "Vaccines", modality: "Routine immunisation", stage: "WHO prequalified", origin: "Asia-Pacific", markets: "Egypt, Saudi Arabia, Morocco" },
  { area: "Infectious disease", modality: "Small-molecule NCE", stage: "Phase 2b · seeking partner", origin: "Western Europe", markets: "Thailand, Malaysia, Philippines" },
  { area: "Neurology (CNS)", modality: "Small-molecule NCE", stage: "Approved · MHRA, EMA", origin: "United Kingdom", markets: "Mexico, Chile, Peru" },
  { area: "Oncology", modality: "Kinase inhibitor (oral)", stage: "Approved · EMA", origin: "Western Europe", markets: "Saudi Arabia, UAE, Kuwait" },
  { area: "Respiratory", modality: "Inhaled combination", stage: "Phase 3 · filed in EU", origin: "Europe", markets: "Egypt, Morocco, Algeria" },
  { area: "Maternal & newborn", modality: "Small molecule", stage: "Approved · WHO PQ", origin: "Asia-Pacific", markets: "Indonesia, Philippines, Myanmar" },
  { area: "Immunology", modality: "Monoclonal antibody", stage: "Phase 3 · ready to partner", origin: "North America", markets: "Brazil, Mexico, Colombia" },
];

function LockIcon({ size = 13, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function DistributorsPage() {
  return (
    <div className="min-h-full bg-[#071a2b]">
      <DistributorsHeader />

      {/* ============ HERO (dark, wave) ============ */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#071a2b] text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <WaveBackground />
          <div className="absolute inset-0 bg-[#071a2b]/45" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1160px] px-6 pt-28 md:px-14 md:pt-32">
          <h1 className="mt-5 max-w-[18ch] font-sans text-[clamp(2.2rem,5vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-white">
            100+ assets ready to license, screened before they reach you.
          </h1>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href={inlicensorCallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[11px] bg-white px-7 py-4 font-sans text-[1.05rem] font-semibold text-[#1e3a8a] transition-colors hover:bg-white/90"
            >
              Book a call to unlock the portfolio →
            </a>
            <a
              href="#assets"
              className="inline-flex items-center gap-2 rounded-[11px] border border-white/40 px-7 py-4 font-sans text-[1.05rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
            >
              See the assets →
            </a>
          </div>
        </div>
      </section>

      {/* ============ ASSETS (white) ============ */}
      <section id="assets" className="scroll-mt-20 bg-white text-ink">
        <div className="mx-auto max-w-[1160px] px-6 py-20 md:px-14 md:py-28">
          <h2 className="font-sans text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold tracking-[-0.02em] text-ink">
            Tailored to your portfolio.
          </h2>
          <p className="mt-4 max-w-[70ch] text-[0.98rem] leading-[1.6] text-ink">

            No fee to review. Every asset is de-risked: approved, filed, or in late-stage
            development, with documented demand. Specifics are released only under a mutual NDA.
          </p>
          <p className="mt-4 max-w-[70ch] text-[0.98rem] leading-[1.6] text-ink">
            De-risked and ready to partner: approved, filed, or in late-stage trials, each with
            documented demand in the regions you cover. We qualify it, assemble the evidence, and run
            the process. The preview below is representative. Compound, originator, and terms open
            under NDA on the call.
          </p>

          {/* asset cards: category data is readable; compound & originator stay locked */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ASSETS.slice(0, 6).map((a, i) => (
              <article
                key={i}
                className="flex flex-col rounded-[16px] border border-ink/10 bg-white p-5 shadow-[0_1px_2px_rgba(11,17,32,0.04),0_10px_30px_rgba(11,17,32,0.05)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-[1.05rem] font-semibold tracking-[-0.01em] text-ink">
                    {a.area}
                  </h3>
                  <span className="whitespace-nowrap rounded-full bg-brand/10 px-2.5 py-1 text-[0.68rem] font-semibold text-brand">
                    {a.stage}
                  </span>
                </div>
                <p className="mt-1 text-[0.9rem] text-ink">{a.modality}</p>
                <dl className="mt-4 space-y-2 text-[0.85rem]">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-medium text-ink">Origin</dt>
                    <dd className="text-right text-ink">{a.origin}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-medium text-ink">Target markets</dt>
                    <dd className="text-right text-ink">{a.markets}</dd>
                  </div>
                </dl>
                <div className="mt-4 flex items-center gap-2 border-t border-ink/10 pt-3 text-[0.82rem]">
                  <LockIcon size={13} className="shrink-0 text-brand" />
                  <span className="font-medium text-ink">Compound &amp; originator</span>
                  <span
                    className="ml-auto select-none tracking-[0.3em] text-ink"
                    style={{ filter: "blur(4px)" }}
                    aria-hidden
                  >
                    ●●●●●●
                  </span>
                  <span className="sr-only">locked, opens under NDA</span>
                </div>
              </article>
            ))}
          </div>

          {/* unlock band: the whole call-to-action to open the rest */}
          <div className="mt-6 flex flex-col items-start gap-5 rounded-[16px] border border-brand/25 bg-brand/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand/10 text-brand">
                <LockIcon size={19} />
              </span>
              <div>
                <p className="font-sans text-[1.15rem] font-semibold tracking-[-0.01em] text-ink">
                  90+ more assets, tailored to your markets.
                </p>
                <p className="mt-1 max-w-[54ch] text-[0.92rem] leading-[1.5] text-ink">
                  Compound, originator and terms unlock under NDA on a 30-minute call. No fee to
                  review, and you see everything before anything is committed.
                </p>
              </div>
            </div>
            <a
              href={inlicensorCallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-[11px] bg-brand px-6 py-3.5 font-sans text-base font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
            >
              Book a call to unlock →
            </a>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA (white) ============ */}
      <section className="bg-white text-ink">
        <div className="mx-auto max-w-[1160px] px-6 pb-24 pt-6 text-center md:px-14 md:pb-28 md:pt-10">
          <h2 className="mx-auto max-w-[18ch] font-sans text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
            See the full portfolio.
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[1.05rem] leading-[1.6] text-ink">
            One call opens 100+ screened assets, ready to license and matched to the markets you cover.
          </p>
          <a
            href={inlicensorCallUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-[11px] bg-brand px-7 py-4 font-sans text-base font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
          >
            Book a call to unlock the portfolio →
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
