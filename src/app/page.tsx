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
                For more than 440 million patients, the medicine they need exists. Regulators have
                approved it and trials have proven it works. No one has built a route to the markets
                where those patients live.
              </p>
              <p>
                Thousands of de-risked therapeutics sit idle for that reason. For originators, each
                one is value locked inside a franchise they have no plans to launch in most countries.
                For distributors and in-licensors, each one is a medicine with approval and evidence
                behind it, safer to commercialize than early-stage science.
              </p>
              <p>
                firstocean connects the two. Originators use the platform to map viable routes to
                market and distribution for an approved therapeutic. Distributors and in-licensors
                receive qualified inbound with regulatory proof and a commercial case attached. Deals
                close, and medicines reach markets their originators had written off.
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
