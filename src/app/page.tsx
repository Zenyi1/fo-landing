import Link from "next/link";
import { GameOfLife } from "@/components/GameOfLife";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { EnquiryForm } from "@/components/EnquiryForm";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div id="top" className="relative min-h-full text-white">
      {/* dark teal-blue gradient wash, with the cell automaton over it, behind the whole page */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-br from-[#071a2b] via-[#0a1730] to-[#120a2e]"
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <GameOfLife />
      </div>

      <SiteHeader />

      <main className="relative z-10">
        <Hero />

        <section id="about" className="relative scroll-mt-24 bg-white text-ink">
          <div className="mx-auto max-w-[680px] px-6 py-24 md:py-32">
            <h2 className="font-sans text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink md:text-[44px]">
              A data-driven approach to commercialization in emerging markets.
            </h2>
            <div className="mt-10 space-y-8 text-[18px] leading-[1.7] text-ink md:text-[20px]">
              <p>
                For more than 440 million patients, the medicine they need exists. It is approved,
                proven, and absent from the markets where they live. firstocean closes that gap by
                connecting the companies that own these medicines with the companies built to
                commercialize them.
              </p>
            </div>

            <div className="mt-20">
              <p className="text-[20px] font-bold text-brand md:text-[22px]">
                For drug owners
              </p>
              <h3 className="mt-4 font-sans text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink md:text-[30px]">
                Non-dilutive capital from the markets your launch plan will never cover.
              </h3>
              <p className="mt-5 text-[18px] leading-[1.7] text-ink md:text-[20px]">
                Demand for your medicine exists in far more countries than you will ever enter, and
                every year of patent life spent waiting is value you cannot recover. firstocean
                prices that opportunity, finds the right partners in each market, and structures the
                deals, so your asset earns everywhere demand exists while protection still holds.
              </p>
              <Link
                href="/originators"
                className="mt-8 inline-flex items-center rounded-[10px] bg-brand px-7 py-3.5 font-sans text-base font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
              >
                See what your asset is worth
              </Link>
            </div>

            <div className="mt-20">
              <p className="text-[20px] font-bold text-brand md:text-[22px]">
                For distributors and in-licensors
              </p>
              <h3 className="mt-4 font-sans text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink md:text-[30px]">
                The supply is here.
              </h3>
              <p className="mt-5 text-[18px] leading-[1.7] text-ink md:text-[20px]">
                100+ assets ready to be commercialized across MENA, LATAM, and Southeast Asia.
                Commercially validated, in many cases clinically de-risked, and screened before they
                reach you. firstocean qualifies each asset, assembles the evidence, and runs the deal
                process, so you spend your time evaluating instead of searching.
              </p>
            </div>

            <div id="early-access" className="mt-24 scroll-mt-24">
              <h2 className="font-sans text-[28px] font-semibold tracking-[-0.02em] text-ink md:text-[36px]">
                Get early access
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink">
                Tell us about your organization and we will reach out once a spot opens up.
              </p>
              <div className="mt-8">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10">
        <div className="flex min-h-[56vh] flex-col justify-end px-6 pb-12 md:px-10 lg:px-16">
          <div className="flex items-center justify-end text-sm text-white/60">
            <span>© {year} firstocean. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
