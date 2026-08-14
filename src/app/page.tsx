import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Cascade } from "@/components/Cascade";
import { SiteFooter } from "@/components/SiteFooter";
import { originatorCallUrl } from "@/lib/links";

/* The homepage argues one case, to drug owners: your rights outside the core
   markets are unlicensed, here is why, and here is exactly how we license them.
   In-licensors get a door rather than half the page — they arrive on
   /distributors from the nav and from the band near the bottom. */

/* Three things that stay true whatever the licence, supply and royalty terms
   end up being — so none of this has to be rewritten when that is settled. The
   middle one is the objection a commercial lead raises first: a cheap launch in
   a referencing market can drag the price down in a market that matters. */
const CONTROL = [
  {
    title: "You choose the territories.",
    body: "Nothing is entered without your approval, and a market you want held back stays held back.",
  },
  {
    title: "Your reference price is protected.",
    body: "Pricing in each territory is set against your existing markets, so a launch here does not drag a price down there.",
  },
  {
    title: "One line of sight.",
    body: "Registration status, pricing, stock and sales come back to you in one place, not as eleven partner reports.",
  },
];

export default function Home() {
  return (
    <div id="page" className="min-h-full">
      <SiteHeader />

      <Hero />

      {/* everything below the hero is a clean white surface — no pixels */}
      <main className="bg-white text-ink">
        {/* who is behind this, before any of the argument — the strip belongs to
            the wave above it, so it sits tight under the fold and leaves the
            gap underneath to the first section's own top padding */}
        <section
          aria-label="Where the team came from"
          className="mx-auto max-w-[1160px] px-6 pt-16 md:px-14 md:pt-20"
        >
          <LogoMarquee />
        </section>

        {/* the gap — why the rights are still sitting there */}
        <section className="mx-auto max-w-[1160px] px-6 py-24 md:px-14 md:py-32">
          {/* Two sentences, one per line, set here rather than left to the
              wrap: a character cap breaks wherever it runs out of room, which
              is almost never where the sentence ends. */}
          <h2 className="font-sans text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
            <span className="block">Approved in one market.</span>
            <span className="block">Absent from fifty-three.</span>
          </h2>
          <div className="mt-8 max-w-[62ch] space-y-6 text-[clamp(1.1rem,2vw,1.3rem)] leading-[1.6] text-ink">
            <p>
              A launch plan covers the markets that pay for the work: the United
              States, Western Europe, Japan. Past them the arithmetic stops
              working. Registering the product, getting a price agreed and
              standing up a commercial operation costs your regulatory,
              market-access and commercial teams the same months whether the
              market is worth two hundred million or two.
            </p>
            <p>
              So the medicine never arrives, and an approval you already hold
              earns nothing outside your core markets. firstocean does that
              groundwork once, across all 53 markets it covers in parallel
              rather than one at a time, and carries that cost rather than
              passing it to your team. That is what makes a small territory worth
              entering at all.
            </p>
          </div>
        </section>

        {/* how — the part the old page never answered */}
        <section id="how" className="scroll-mt-24 bg-[var(--surface)]">
          <div className="mx-auto max-w-[1160px] px-6 py-24 md:px-14 md:py-32">
            <Cascade />
          </div>
        </section>

        {/* control — the terms that make it safe to hand us an asset */}
        <section className="mx-auto max-w-[1160px] px-6 py-24 md:px-14 md:py-32">
          <h2 className="text-balance font-sans text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
            You decide where it goes.
          </h2>
          <dl className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {CONTROL.map((item) => (
              <div key={item.title} className="border-t border-ink/10 pt-6">
                <dt className="font-sans text-[1.15rem] font-semibold tracking-[-0.012em] text-ink">
                  {item.title}
                </dt>
                <dd className="mt-3 text-[1rem] leading-[1.6] text-ink-soft">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* The one block on the page addressing the other side of the market,
            and an invitation rather than a claim: firstocean is recruiting the
            operator network, not reporting on a finished one. Held deliberately
            quieter than the sections around it, so a biotech reader can see at
            a glance that it is not aimed at them and a distributor can still
            find it. */}
        <section id="inlicensors" className="scroll-mt-24 bg-[var(--surface)]">
          <div className="mx-auto max-w-[1160px] px-6 py-20 md:px-14 md:py-24">
            <div className="max-w-[70ch] border-t border-ink/15 pt-8">
              <h2 className="font-sans text-[clamp(1.4rem,2.6vw,1.95rem)] font-semibold tracking-[-0.02em] text-ink">
                Already selling in these markets?
              </h2>
              <p className="mt-5 text-[1.05rem] leading-[1.6] text-ink">
                firstocean is building the operator side of this across Latin
                America, the Middle East, Africa, Asia and Eastern Europe. If you
                hold registrations, run a channel and carry a salesforce in one
                of those markets, we bring you medicines that are approved
                elsewhere and not yet sold in yours, matched to the therapeutic
                areas you already cover.
              </p>
              <p className="mt-5 text-[1rem] leading-[1.6] text-ink-soft">
                No fee to be assessed, and nothing is committed until you have
                seen the terms.{" "}
                <Link
                  href="/distributors"
                  className="font-medium text-brand underline underline-offset-4 transition-colors hover:decoration-current"
                >
                  Join the partner network
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* close */}
        <section className="mx-auto max-w-[1160px] px-6 py-24 text-center md:px-14 md:py-32">
          <h2 className="text-balance font-sans text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
            Start with one asset.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-[clamp(1.05rem,1.9vw,1.25rem)] leading-[1.6] text-ink">
            Tell us what you hold and where your rights are free. We come back
            with the markets worth entering and what it takes to launch in each
            one.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={originatorCallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[11px] bg-brand px-7 py-4 font-sans text-[1.05rem] font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
            >
              Talk to us about your asset →
            </a>
            <Link
              href="/originators"
              className="inline-flex items-center gap-2 rounded-[11px] border border-ink/20 px-7 py-4 font-sans text-[1.05rem] font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.03]"
            >
              See an anonymous estimate →
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
