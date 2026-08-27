import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { WorldField } from "@/components/WorldField";
import { originatorCallUrl } from "@/lib/links";

const title = "Markets";
const description =
  "Between 10 and 30 percent of a medicine's lifetime value sits outside the United States, Western Europe and Japan. firstocean holds the licence and runs the commercial operation across Latin America, the Middle East and Southeast Asia.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/markets" },
  openGraph: {
    type: "website",
    url: "/markets",
    siteName: "firstocean",
    title,
    description,
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: { card: "summary", title, description },
};

/* This page used to be a list of fifty-three country names under the heading
   "53 markets, named". A list invites the reader to audit the count, which is
   the wrong argument to be having. It then spent a draft arguing from
   population — four fifths of the world lives outside the core markets — which
   is the wrong argument too: a commercial lead knows most of that four fifths
   cannot pay a branded price, and the page had to contradict itself two
   paragraphs later to concede that value concentrates in three markets. The
   argument that survives contact with the buyer is the share of their own
   asset's lifetime value they are writing off, so that is what the page leads
   with now. */

export default function MarketsPage() {
  return (
    <div className="min-h-full bg-white text-ink">
      {/* The page is light throughout, so it carries its own bar rather than
          the homepage header, whose links are in-page anchors that dead-end
          anywhere but the homepage. */}
      <header className="border-b border-ink/10">
        <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-6 md:h-20 md:px-14">
          <Link
            href="/"
            className="text-2xl font-semibold lowercase tracking-tight text-ink"
          >
            firstocean
          </Link>
          <nav className="flex items-center gap-5 md:gap-7">
            <Link
              href="/originators"
              className="hidden text-sm font-semibold text-ink transition-opacity hover:opacity-70 sm:inline"
            >
              For originators
            </Link>
            <a
              href={originatorCallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[9px] bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
            >
              Talk to us
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Headline full width, then the argument level with the map. The
            visual is the claim rather than decoration under it, so it sits
            beside the prose. */}
        <section className="mx-auto max-w-[1160px] px-6 pt-16 md:px-14 md:pt-24">
          <h1 className="max-w-[22ch] text-balance font-sans text-[clamp(2.1rem,4.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink">
            A tenth to a third of a medicine&rsquo;s value is never collected.
          </h1>
          {/* The AI claim belongs above the fold, not three sections down. It
              is stated as a mechanism rather than a label: what the agents do,
              and what that changes about the clock. */}
          <p className="mt-7 max-w-[58ch] text-[clamp(1.1rem,1.8vw,1.3rem)] leading-[1.55] text-ink-soft">
            It sits outside the United States, Western Europe and Japan, where
            registering a product and standing up a commercial operation costs
            the same whether the territory returns fifteen million dollars or
            five hundred. We run that work with agents, so a launch is limited
            by the regulator&rsquo;s clock and not by headcount.
          </p>
        </section>

        <section className="mx-auto max-w-[1160px] px-6 py-14 md:px-14 md:py-20">
          <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="max-w-[58ch] space-y-6 text-[1.05rem] leading-[1.65] text-ink">
              <p>
                Commercial value in this industry concentrates in three markets:
                the United States, Western Europe and Japan. Everywhere else is
                the fastest-growing part of the industry — $350bn in 2024,
                reaching $550bn by 2030, compounding at roughly 10% a year
                against 6% in developed markets — and for most originators it is
                simply unsold.
              </p>
              <p className="font-medium">
                Latin America, the Middle East and Southeast Asia. That is where
                we work.
              </p>
              <p>
                An approval does not travel on its own. Hundreds of medicines
                cleared by the FDA or the EMA have no licensee anywhere in those
                three regions. The science is not in question: it is the same
                molecule, already approved. What stops it is that the cost of
                entry barely moves with the size of the prize, so the smaller
                territory never clears the internal bar.
              </p>
              <p>
                So the footprint never gets built. We build it. We take
                commercial rights from the originator, own the local entity,
                hold the registration in our own name and carry the compliance
                obligations that come with selling there. Physical distribution
                is contracted to licensed local partners. We do not run trials
                and we do not develop: clinical risk stays with you.
              </p>
            </div>

            {/* Holds the projection's own aspect ratio so it is never squashed,
                and stays tall enough on a phone to still read as a world. */}
            <div className="relative aspect-[140/66] w-full lg:mt-2">
              <WorldField />
            </div>
          </div>
        </section>

        {/* Two arguments, deliberately separate: the regulators changed, and
            the cost of the work changed. Either alone is not enough. */}
        <section className="border-t border-ink/10 bg-[var(--surface)]">
          <div className="mx-auto max-w-[1160px] px-6 py-20 md:px-14 md:py-28">
            <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
              <div className="max-w-[52ch]">
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold tracking-[-0.02em] text-ink">
                  Agencies stopped repeating the FDA&rsquo;s work.
                </h2>
                <p className="mt-5 text-[1rem] leading-[1.65] text-ink-soft">
                  The WHO formalised Good Reliance Practices in 2021 and
                  national agencies have built on it since. Saudi
                  Arabia&rsquo;s verification and abridged routes let a company
                  file straight after FDA or EMA approval. The Gulf runs one
                  submission across member states. Mexico replaced a decade of
                  one-off bilateral agreements with a single abbreviated route
                  recognising any reference authority, in force since September
                  2025. On the fastest of these routes a clearance takes about
                  two months. What is left of a submission is translation,
                  reformatting and local adaptation.
                </p>
              </div>

              <div className="max-w-[52ch]">
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold tracking-[-0.02em] text-ink">
                  Regulatory bridging is no longer expensive.
                </h2>
                <p className="mt-5 text-[1rem] leading-[1.65] text-ink-soft">
                  Converting a dossier into a compliant local submission used to
                  mean regulatory writers working module by module, repeated for
                  every product and every country. We run that layer with
                  purpose-built agents: dossier conversion into local eCTD
                  format, labeling in Arabic, Portuguese and Spanish, safety
                  case intake, pricing and HTA submissions, agency queries. The
                  same layer carries the obligations that never end — renewals,
                  variations, pharmacovigilance — which is the part a biotech
                  cannot absorb fifteen times over. Our people do only the work
                  that structurally needs a person in the room: the national
                  qualified person, the managers who sit with hospital formulary
                  committees, the medical science liaisons.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-6 py-24 md:px-14 md:py-32">
          <div className="max-w-[58ch]">
            <h2 className="text-balance font-sans text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold tracking-[-0.02em] text-ink">
              Where else could your drug make a difference?
            </h2>
            <p className="mt-5 text-[1.05rem] leading-[1.65] text-ink">
              Tell us what you hold and where you don&rsquo;t plan on launching
              yourself. We come back with the markets worth entering, the
              registration route each one allows, and what it takes to launch
              there. We are paid out of what the medicine earns in the
              territory, so there is nothing to pay for the assessment.
            </p>
            <a
              href={originatorCallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-[11px] bg-brand px-7 py-4 font-sans text-[1.05rem] font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
            >
              Talk to us about your asset →
            </a>
            <p className="mt-6 max-w-[54ch] text-[0.92rem] leading-[1.6] text-ink-soft">
              We work with medicines approved by the FDA or the EMA, and with
              Phase III assets approaching approval.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
