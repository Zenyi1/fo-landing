import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div id="page" className="min-h-full">
      <SiteHeader />

      <Hero />

      {/* everything below the hero is a clean white surface — no pixels */}
      <main className="bg-white text-ink">
        <section id="inlicensors" className="scroll-mt-24">
          <div className="mx-auto max-w-[1160px] px-6 py-24 md:px-14 md:py-36">
            <h2 className="max-w-[15ch] font-sans text-[clamp(2.2rem,5vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink">
              100+ approved assets, screened before they reach you.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[clamp(1.05rem,2.1vw,1.3rem)] leading-[1.55] text-ink-soft">
              Each one already approved somewhere, with documented demand in your region. We
              qualify it, assemble the evidence, and run the process, so you evaluate instead
              of search.
            </p>
            <div className="mt-9">
              <a
                href="mailto:hugo@first-ocean.com?subject=Portfolio%20access%20request"
                className="inline-flex items-center gap-2 rounded-[11px] bg-brand px-6 py-3.5 font-sans text-base font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
              >
                Request portfolio access →
              </a>
            </div>
            <p className="mt-6 text-[0.95rem] text-ink-soft">
              Shared under standard confidentiality. You see the full dossier once we&rsquo;re both
              covered.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10 bg-white text-ink">
        <div className="mx-auto max-w-[1160px] px-6 py-16 md:px-14">
          <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-8">
            <div>
              <div className="text-2xl font-semibold lowercase tracking-tight text-ink">
                firstocean
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2.5 text-[0.8rem] text-ink-soft">
                Backed by <b className="font-semibold text-ink">Entrepreneurs First</b>
                <span className="text-ink-soft/50">·</span>
                <b className="font-semibold text-ink">Transpose Platform</b>
              </div>
            </div>
            <div className="text-[0.9rem] leading-8 text-ink-soft">
              <a
                href="mailto:hugo@first-ocean.com"
                className="text-ink transition-colors hover:opacity-70"
              >
                hugo@first-ocean.com
              </a>
              <br />
              <a href="/originators" className="text-ink transition-colors hover:opacity-70">
                See what your rights are worth
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-6 text-[0.8rem] text-ink-soft">
            <span>© {year} firstocean. All rights reserved.</span>
            <span>
              Latin America · Africa · Middle East · South &amp; Southeast Asia. Excludes China.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
