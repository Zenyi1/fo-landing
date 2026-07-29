import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <div id="page" className="min-h-full">
      <SiteHeader />

      <Hero />

      {/* everything below the hero is a clean white surface — no pixels */}
      <main className="bg-white text-ink">
        {/* drug owners — the primary audience */}
        <section className="mx-auto max-w-[1160px] px-6 py-24 md:px-14 md:py-32">
          <h2 className="max-w-[22ch] font-sans text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
            Non-dilutive capital from the markets your launch plan will never cover.
          </h2>
          <div className="mt-8 max-w-[62ch] space-y-6 text-[clamp(1.1rem,2vw,1.3rem)] leading-[1.6] text-ink">
            <p>
              Demand for your medicine exists in far more countries than you will ever enter,
              approved or still in trials. firstocean prices your asset, finds the local operators
              to commercialize in 90+ market, and structures the deal with your biotech's priorities first, so your asset earns everywhere
              demand exists.
            </p>
            <p className="font-medium">
              You keep the asset. You approve every deal. We are paid only when you close.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/originators"
              className="inline-flex items-center gap-2 rounded-[11px] bg-brand px-7 py-4 font-sans text-[1.05rem] font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
            >
              See what your drug is worth →
            </Link>
          </div>
        </section>

        {/* in-licensors — teaser into the portfolio */}
        <section id="inlicensors" className="scroll-mt-24">
          <div className="mx-auto max-w-[1160px] px-6 pb-24 md:px-14 md:pb-32">
            <h2 className="max-w-[20ch] font-sans text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
              Looking to license instead?
            </h2>
            <p className="mt-8 max-w-[62ch] text-[clamp(1.1rem,2vw,1.3rem)] leading-[1.6] text-ink">
              100+ assets ready to be commercialized across MENA, LATAM, and Southeast Asia.
              Commercially validated, in many cases clinically de-risked, and screened before they
              reach you. firstocean qualifies each asset, assembles the evidence, and runs the deal
              process, so your BD teams focuses on evaluating the most promising assets instead of searching.
            </p>
            <div className="mt-10">
              <Link
                href="/distributors"
                className="inline-flex items-center gap-2 rounded-[11px] bg-brand px-7 py-4 font-sans text-[1.05rem] font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
              >
                See the portfolio →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
