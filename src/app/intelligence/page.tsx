import type { Metadata } from "next";
import { AgentFilingCanvas } from "@/components/AgentFilingCanvas";
import { IntelligenceCanvas } from "@/components/IntelligenceCanvas";
import { ErrorRecoveryCanvas } from "@/components/ErrorRecoveryCanvas";
import { RunwayCanvas } from "@/components/RunwayCanvas";
import { BirdsBackground } from "@/components/BirdsBackground";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { intelligenceCallUrl } from "@/lib/links";

const title = "firstocean · intelligence";
const description =
  "Every dollar your clinical trial spends, reconciled. firstocean reconciles CRO, CDMO, lab, site and specialist-vendor spend against contracts, work orders, change orders and invoices. Finance gets a close it can defend. Clinical operations gets scope it can control.";

export const metadata: Metadata = {
  // absolute so the root layout's "%s · firstocean" template doesn't double the suffix
  title: { absolute: title },
  description,
  alternates: { canonical: "/intelligence" },
  // deliberately undiscoverable — no index, no follow, no sitemap entry
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    url: "/intelligence",
    siteName: "firstocean",
    title,
    description,
    // child openGraph replaces the root's wholesale, so re-declare the share image
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/seo/fo.jpeg"],
  },
};

function Logo() {
  return (
    <span className="inline-flex items-center gap-3 text-white">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <circle cx="11" cy="11" r="10" stroke="white" strokeWidth="1" />
        <path
          d="M1.6 12.2c2 0 2-1.8 4-1.8s2 1.8 4 1.8 2-1.8 4-1.8 2 1.8 4 1.8"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[15px] font-medium tracking-[-0.01em]">
        firstocean
      </span>
    </span>
  );
}

const panel =
  "relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]";

// green "recovered" state — never colour alone: a check glyph and the word carry
// it for anyone who can't read the tint.
function RecoveredPill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5fd0a0]/30 bg-[#5fd0a0]/10 px-2.5 py-1 text-[11px] font-semibold text-[#5fd0a0]">
      <span aria-hidden>✓</span> Recovered
    </span>
  );
}

function EvidenceChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((it) => (
        <span
          key={it}
          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-white/60"
        >
          {it}
        </span>
      ))}
    </div>
  );
}

// One workflow step: number, title, sentence, and a small concrete visual state.
function WorkflowStep({
  n,
  title,
  body,
  visual,
}: {
  n: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-[13px] font-semibold text-white/70">
          {n}
        </span>
        <h3 className="text-[1.15rem] font-medium tracking-[-0.01em] text-white">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-white/65">{body}</p>
      <div className="mt-6 flex-1">{visual}</div>
    </div>
  );
}

function TrustRow() {
  const items = [
    "Clinical-stage sponsors",
    "CRO · CDMO · lab · site · specialist-vendor spend",
    "Contract-backed audit trail",
    "Evidence on every flagged variance",
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9rem] text-white/50">
      {items.map((it, i) => (
        <span key={it} className="inline-flex items-center gap-3">
          {i > 0 && <span aria-hidden className="text-white/20">·</span>}
          {it}
        </span>
      ))}
    </div>
  );
}

export default function IntelligencePage() {
  const bookUrl = intelligenceCallUrl();

  return (
    <main className="relative min-h-screen w-full bg-[#0a0b0d] text-white">
      <BirdsBackground />
      <div className="relative z-10">
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="relative flex min-h-screen w-full flex-col px-8 py-9 sm:px-14 sm:py-12">
          <header className="flex items-center justify-between">
            <Logo />
            <a
              href="#audit"
              className="text-[15px] font-normal text-white/80 underline-offset-[6px] transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline"
            >
              See a sample audit
            </a>
          </header>

          <div className="grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
            {/* left — statement */}
            <div className="max-w-xl pt-10 lg:pt-0">
              <h1 className="text-balance text-[2.6rem] font-normal leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[3.9rem] lg:leading-[1.02]">
                Every dollar your clinical trial spends, reconciled.
              </h1>
              <p className="mt-7 max-w-md text-[1.12rem] font-normal leading-snug text-white/75 sm:text-[1.25rem]">
                firstocean reconciles CRO, CDMO, lab, site and specialist-vendor
                spend against contracts, work orders, change orders and
                invoices. Finance gets a close it can defend. Clinical
                operations gets scope it can control.
              </p>
              <p className="mt-5 text-[0.92rem] uppercase tracking-[0.14em] text-white/55">
                For finance &amp; clinical operations teams managing outsourced
                trial spend
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#audit"
                  className="inline-flex items-center gap-2 rounded-[11px] bg-white px-7 py-3.5 text-[1.02rem] font-semibold text-[#0a0b0d] transition-colors hover:bg-white/90"
                >
                  See a sample audit <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            {/* right — the product: existing systems stream in, firstocean
                reconciles, and fires opportunities and actions back out */}
            <div className={`${panel} h-[380px] sm:h-[440px] lg:h-[560px]`}>
              <IntelligenceCanvas />
            </div>
          </div>
        </section>

        {/* ── SAMPLE AUDIT · the proof, and the CTA target ────── */}
        <section
          id="audit"
          className="mx-auto w-full max-w-6xl scroll-mt-16 px-8 pt-24 sm:px-14 sm:pt-32"
        >
          <Reveal>
            <h2 className="max-w-3xl text-balance text-[2rem] font-normal leading-[1.12] tracking-[-0.025em] sm:text-[2.9rem]">
              One overbill, recovered before close.
            </h2>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/70 sm:text-[1.15rem]">
              Your vendors approve their own billing. firstocean independently
              checks every invoice line against the contract before Finance
              closes the period.
            </p>
          </Reveal>

          <Reveal
            delay={120}
            className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12"
          >
            {/* the record */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.82rem] uppercase tracking-[0.14em] text-white/55">
                    Illustrative example
                  </span>
                  <RecoveredPill />
                </div>
                <div className="mt-6 flex flex-wrap items-baseline gap-3">
                  <span className="text-[3.2rem] font-semibold leading-none tracking-[-0.03em] text-[#f0b83e] sm:text-[4rem]">
                    <CountUp value={97500} prefix="$" />
                  </span>
                  <span className="text-[1rem] text-white/55">
                    recovered variance
                  </span>
                </div>
                <p className="mt-3 text-[0.95rem] text-white/55">
                  CRO invoice · $497,500 billed vs $400,000 contracted
                </p>
              </div>
              <div className="mt-8">
                <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-white/55">
                  Evidence attached
                </p>
                <EvidenceChips
                  items={[
                    "Contract",
                    "Work order",
                    "Change order",
                    "Delivery record",
                    "Invoice",
                  ]}
                />
              </div>
            </div>

            {/* before / detected / outcome */}
            <div className="space-y-6">
              {[
                {
                  k: "Before",
                  v: "A CRO invoice enters $97,500 above the contracted amount, and it has already cleared into the accrual as correct.",
                },
                {
                  k: "Detected",
                  v: "firstocean catches it while the vendor still has the paperwork to reverse the charge: a change order billed outside the contracted scope.",
                },
                {
                  k: "Outcome",
                  v: "The recovery posts inside the close, with the supporting line-item working attached.",
                },
              ].map((row) => (
                <div key={row.k} className="border-l-2 border-white/10 pl-5">
                  <p className="text-[0.82rem] uppercase tracking-[0.14em] text-white/55">
                    {row.k}
                  </p>
                  <p className="mt-1.5 text-[1.05rem] leading-relaxed text-white/80">
                    {row.v}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* live detection across error types */}
          <Reveal delay={160} className="mt-10">
            <div className={`${panel} h-[300px] sm:h-[360px]`}>
              <ErrorRecoveryCanvas />
            </div>
          </Reveal>
        </section>

        {/* ── WORKFLOW · ingest / reconcile / act ─────────────── */}
        <section className="mx-auto w-full max-w-6xl px-8 py-24 sm:px-14 sm:py-28">
          <Reveal>
            <h2 className="max-w-3xl text-balance text-[2rem] font-normal leading-[1.12] tracking-[-0.025em] sm:text-[2.9rem]">
              From source document to reconciled result.
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <WorkflowStep
              n="1"
              title="Ingest"
              body="Work orders, change orders, invoices, payments, contracts and site activity land in one place as they arrive."
              visual={
                <EvidenceChips
                  items={[
                    "Work order",
                    "Change order",
                    "Invoice",
                    "Payment",
                    "Contract",
                    "Site activity",
                  ]}
                />
              }
            />
            <WorkflowStep
              n="2"
              title="Reconcile"
              body="Agents compare what was billed against what was contracted and what was actually delivered."
              visual={
                <dl className="space-y-2 text-[13px]">
                  <div className="flex items-center justify-between">
                    <dt className="text-white/50">Billed</dt>
                    <dd className="tabular-nums text-white/80">$497,500</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-white/50">Contracted</dt>
                    <dd className="tabular-nums text-white/80">$400,000</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-white/50">Delivered</dt>
                    <dd className="tabular-nums text-white/80">As contracted</dd>
                  </div>
                </dl>
              }
            />
            <WorkflowStep
              n="3"
              title="Act"
              body="Flag the variance, attach the evidence, update the forecast, and track the recovery to close."
              visual={
                <div className="flex items-center justify-between rounded-lg border border-[#5fd0a0]/25 bg-[#5fd0a0]/[0.06] px-3 py-2.5">
                  <span className="text-[13px] font-medium text-white/85">
                    $97,500 variance
                  </span>
                  <RecoveredPill />
                </div>
              }
            />
          </Reveal>
        </section>

        {/* ── COVERAGE · one record across every vendor ───────── */}
        <section className="mx-auto w-full max-w-6xl px-8 py-20 sm:px-14 sm:py-24">
          <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="max-w-md text-balance text-[1.7rem] font-normal leading-[1.15] tracking-[-0.02em] sm:text-[2.3rem]">
                One current record across every vendor.
              </h2>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-white/70 sm:text-[1.13rem]">
                Agents read each work order, change order, invoice and payment
                as it arrives. They file every item against the contract and
                reconcile what was billed with what was delivered. Your CRO,
                CDMO, lab, site and specialist-vendor spend stays in one current
                record,
                with accrual and runway updating as the trial moves.
              </p>
            </div>
            <div className={`${panel} h-[340px] sm:h-[420px] lg:h-[480px]`}>
              <AgentFilingCanvas />
            </div>
          </Reveal>
        </section>

        {/* ── FORECAST · cash-out before the next readout ─────── */}
        <section className="mx-auto w-full max-w-6xl px-8 py-20 sm:px-14 sm:py-24">
          <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="max-w-md text-balance text-[1.7rem] font-normal leading-[1.15] tracking-[-0.02em] sm:text-[2.3rem]">
                Know your cash-out date before the next readout.
              </h2>
              <div className="mt-6 max-w-md space-y-5 text-[1.05rem] leading-relaxed text-white/70 sm:text-[1.13rem]">
                <p>
                  Accruals often arrive after the month closes, built from vendor
                  reports that arrive later still. firstocean rebuilds committed
                  spend from invoices, site activity and programme pace. Finance
                  sees the projected readout date, the projected cash-out date,
                  and the decisions that still have time to change.
                </p>
                <p>
                  When a programme runs hot, you see it while there is still
                  time to act: flag a change order before it is billed, move a
                  site, or size your next raise around a readout date you can
                  defend.
                </p>
              </div>
            </div>
            <div className={`${panel} h-[320px] sm:h-[380px] lg:h-[440px]`}>
              <RunwayCanvas />
            </div>
          </Reveal>
        </section>

        {/* ── SHARED RECORD · the payoff ──────────────────────── */}
        <section className="mx-auto w-full max-w-5xl px-8 py-16 sm:px-14 sm:py-20">
          <Reveal>
            <p className="max-w-2xl text-[1.2rem] leading-relaxed text-white/80 sm:text-[1.45rem]">
              Finance gets a close it can defend. Clinical operations gets scope
              it can control. Both read from the same record, so a flagged
              variance is the system catching an error rather than one team
              second-guessing another.
            </p>
            <div className="mt-10">
              <TrustRow />
            </div>
          </Reveal>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────── */}
        <section
          id="contact"
          className="mx-auto w-full max-w-5xl scroll-mt-16 px-8 pb-28 sm:px-14 sm:pb-36"
        >
          <Reveal className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-14 sm:px-14 sm:py-20">
            <h2 className="max-w-2xl text-balance text-[2rem] font-normal leading-[1.1] tracking-[-0.025em] sm:text-[2.9rem]">
              See what your programme would surface.
            </h2>
            <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-white/70 sm:text-[1.2rem]">
              We&rsquo;re working with a small number of clinical-stage sponsors
              to reconcile CRO, CDMO, lab, site and specialist-vendor spend
              against the underlying
              contract and delivery record. Bring one programme or one vendor
              invoice, and we&rsquo;ll show you what the audit would surface.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[11px] bg-white px-7 py-3.5 text-[1.02rem] font-semibold text-[#0a0b0d] transition-colors hover:bg-white/90"
              >
                Talk through your programme
              </a>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
