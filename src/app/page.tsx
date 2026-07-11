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
                Somewhere, a regulator has already signed off. The trials are done, the risk retired,
                the medicine proven safe and effective. The hardest work is behind it. And still, for
                more than 440 million patients around the world, that medicine simply never arrives.
              </p>
              <p>
                The gap is not scientific. It is a failure of routing. Proven therapeutics stall short
                of the patients who need them, not for any clinical reason, but because the routes to
                market were never built. Thousands de-risked assets sit idle. For originators, that
                is value locked inside franchises they were never going to launch everywhere. For
                distributors and in-licensors, it is access to medicines that already work, rather than
                early-stage science that still might.
              </p>
              <p>
                firstocean is the infrastructure that closes that distance. It is the platform where
                originators see every viable option to bring an approved therapeutic to market and to
                distribution, and where distributors and in-licensors receive qualified inbound that is
                already proven and commercially viable. Medicines that exist become medicines that
                arrive, everywhere.
              </p>
            </div>

            <div id="early-access" className="mt-20 scroll-mt-24 border-t border-ink/10 pt-16">
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
