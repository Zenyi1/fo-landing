import type { Metadata } from "next";
import { AgentFilingCanvas } from "@/components/AgentFilingCanvas";
import { ErrorRecoveryCanvas } from "@/components/ErrorRecoveryCanvas";
import { RunwayCanvas } from "@/components/RunwayCanvas";
import { Reveal } from "@/components/Reveal";
import { intelligenceCallUrl } from "@/lib/links";

const title = "firstocean · intelligence";
const description =
  "One live record for every dollar your trial spends. Agents read every work order, change notice and invoice, file it against the contract, and flag what doesn't match. Finance gets a defensible close, clinical operations gets scope control.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/intelligence" },
  // deliberately undiscoverable — no index, no follow, no sitemap entry
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    url: "/intelligence",
    siteName: "first ocean",
    title,
    description,
  },
  twitter: { card: "summary", title, description },
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
        first ocean
      </span>
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.22em] text-white/90">
      {children}
    </p>
  );
}

const panel =
  "relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]";

// the packet ask — a file transfer that returns something valuable, and puts a
// real vendor document set on the system, which is what the first conversations
// actually need
const packetMailto =
  "mailto:hugo@first-ocean.com?subject=first%20ocean%20work%20order%20review&body=Attaching%20one%20CRO%20work%20order%2C%20its%20change%20notices%20and%20twelve%20months%20of%20invoices.%20What%20do%20you%20find%3F";

export default function IntelligencePage() {
  const bookUrl = intelligenceCallUrl();

  return (
    <main className="min-h-screen w-full bg-[#0a0b0d] text-white">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen w-full flex-col px-8 py-9 sm:px-14 sm:py-12">
        <header className="flex items-center justify-between">
          <Logo />
          <a
            href="#contact"
            className="text-[15px] font-normal text-white/80 underline-offset-[6px] transition-colors hover:text-white hover:underline"
          >
            Contact
          </a>
        </header>

        <div className="grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
          {/* left — statement */}
          <div className="max-w-xl pt-10 lg:pt-0">
            <h1 className="text-balance text-[2.6rem] font-normal leading-[1.05] tracking-[-0.03em] sm:text-[3.6rem] lg:text-[4.1rem] lg:leading-[1.02]">
              One live record for every dollar your trial spends.
            </h1>
            <p className="mt-7 max-w-md text-[1.15rem] font-normal leading-snug text-white/75 sm:text-[1.3rem]">
              Agents read every work order, change notice and invoice the moment
              it lands, file it against the contract, and flag what doesn&rsquo;t
              match. Your CRO, CDMO and lab spend in one place, always current.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[11px] bg-white px-7 py-3.5 text-[1.02rem] font-semibold text-[#0a0b0d] transition-colors hover:bg-white/90"
              >
                Book a call →
              </a>
              <a
                href="#reconciliation"
                className="text-[1.02rem] font-medium text-white/70 underline-offset-[6px] transition-colors hover:text-white hover:underline"
              >
                How it works
              </a>
            </div>
          </div>

          {/* right — the filing animation */}
          <div className={`${panel} h-[340px] sm:h-[420px] lg:h-[560px]`}>
            <AgentFilingCanvas />
          </div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-5xl px-8 pt-24 sm:px-14 sm:pt-32">
        <Reveal>
          <Eyebrow>What it is</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-balance text-[2rem] font-normal leading-[1.12] tracking-[-0.025em] sm:text-[2.9rem]">
            Your development programme runs through a dozen vendors&rsquo;
            invoicing systems.
          </h2>
        </Reveal>
        <Reveal
          delay={120}
          className="mt-7 max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-white/70 sm:text-[1.15rem]"
        >
          <p>
            The trial runs at a CRO. Manufacturing runs at a CDMO. Assays,
            statistics, submissions and site payments each run somewhere else.
            Every one of them bills on its own schedule, in its own format,
            against a contract that has been amended four times.
          </p>
          <p className="text-white">
            Those line items fall in the gap between finance, which owns the
            money but can&rsquo;t see the trial, and clinical operations, which
            runs the vendors but doesn&rsquo;t own the P&amp;L. Duplicate charges,
            scope creep and unrecovered tax live in that gap. We close it with
            one record per vendor, kept current by agents that read every
            document as it arrives.
          </p>
        </Reveal>
      </section>

      {/* ── ROW 1 · reconciliation (animation left) ──────────── */}
      <section
        id="reconciliation"
        className="mx-auto w-full max-w-6xl scroll-mt-16 px-8 py-20 sm:px-14 sm:py-24"
      >
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* text (first in DOM for mobile, moved right on desktop) */}
          <div className="lg:order-2">
            <Eyebrow>Reconciliation</Eyebrow>
            <h3 className="mt-5 max-w-md text-balance text-[1.7rem] font-normal leading-[1.15] tracking-[-0.02em] sm:text-[2.3rem]">
              The party managing your spend is the party billing for it.
            </h3>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-white/70 sm:text-[1.13rem]">
              Agents check every invoice against what you contracted and what was
              actually delivered. Duplicate charges, change orders billed outside
              scope, overbilling against the contract rate, unrecovered VAT and FX
              markup on site payments, caught the month they land, while the
              vendor still has the paperwork to back the charge out. Recoveries
              post inside your close, with the line-item working attached.
            </p>
          </div>
          {/* animation */}
          <div className={`${panel} h-[320px] sm:h-[380px] lg:order-1 lg:h-[440px]`}>
            <ErrorRecoveryCanvas />
          </div>
        </Reveal>
      </section>

      {/* ── ROW 2 · runway (animation right) ─────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-8 py-20 sm:px-14 sm:py-24">
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* text left */}
          <div>
            <Eyebrow>Runway</Eyebrow>
            <h3 className="mt-5 max-w-md text-balance text-[1.7rem] font-normal leading-[1.15] tracking-[-0.02em] sm:text-[2.3rem]">
              Will the data arrive before the cash runs out?
            </h3>
            <div className="mt-6 max-w-md space-y-5 text-[1.05rem] leading-relaxed text-white/70 sm:text-[1.13rem]">
              <p>
                It is the only question that matters, and today it gets answered
                with a number that is six weeks old. The accrual arrives after
                the month closes, built from vendor reports that arrive later
                still.
              </p>
              <p>
                We rebuild it as the trial moves. Enrollment pace, site
                activation and committed spend give you a projected readout date
                and a projected cash-out date, updated continuously. You see a
                programme running hot while there is still time to act, you reach
                your next readout with cash to spare, and the money we recover
                along the way is on top.
              </p>
            </div>
          </div>
          {/* animation */}
          <div className={`${panel} h-[320px] sm:h-[380px] lg:h-[440px]`}>
            <RunwayCanvas />
          </div>
        </Reveal>
      </section>

      {/* ── PAYOFF ───────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-5xl px-8 py-16 sm:px-14 sm:py-20">
        <Reveal>
          <p className="max-w-2xl text-[1.2rem] leading-relaxed text-white/80 sm:text-[1.45rem]">
            Finance gets a close it can defend. Clinical operations gets scope it
            can control. Both read from the same record, so a flagged variance is
            the system catching an error rather than one team second-guessing
            another.
          </p>
        </Reveal>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section
        id="contact"
        className="mx-auto w-full max-w-5xl scroll-mt-16 px-8 pb-28 sm:px-14 sm:pb-36"
      >
        <Reveal className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-14 sm:px-14 sm:py-20">
          <h2 className="max-w-2xl text-balance text-[2rem] font-normal leading-[1.1] tracking-[-0.025em] sm:text-[2.9rem]">
            See it on your own vendors.
          </h2>
          <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-white/70 sm:text-[1.2rem]">
            We&rsquo;re building with a small number of clinical-stage sponsors.
            Send us one CRO work order, its change notices and twelve months of
            invoices. We&rsquo;ll run them through and come back with exactly what
            we find, in dollars. We&rsquo;ll sign your NDA first, and you get the
            analysis whether or not you work with us.
          </p>
          <div className="mt-9">
            <a
              href={packetMailto}
              className="inline-flex items-center gap-2 rounded-[11px] bg-white px-7 py-3.5 text-[1.02rem] font-semibold text-[#0a0b0d] transition-colors hover:bg-white/90"
            >
              Send us a work order →
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
