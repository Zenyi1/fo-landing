'use client';

import { SlashIcon } from '@/components/icons';

const PILLARS = [
  {
    n: '01',
    title: 'AI-native sourcing',
    body:
      'Our agents continuously scan FDA, EMA, PMDA and Health Canada approvals against an internal map of unallocated emerging-market rights. From 444+ identified candidates we surface the ~1% that combine clean safety data, a payer-willing indication, and an upstream rights holder with no LATAM, MENA or SEA execution plan.',
  },
  {
    n: '02',
    title: 'Bridge analysis',
    body:
      'For each shortlisted asset we build the bridge dossier — CMC translation, label crosswalks, comparator standard-of-care benchmarks, KOL mapping, payer access, and patient-population sizing — across multiple jurisdictions in parallel rather than one country at a time.',
  },
  {
    n: '03',
    title: 'Licensing',
    body:
      'We approach upstream rights holders — Catalys-style NewCos, specialty biotechs, venture development funds — and sign single-asset deals: small cash, NewCo equity, royalty per market. The rights they were never going to monetise become ours to launch.',
  },
  {
    n: '04',
    title: 'Regulatory cascade',
    body:
      'We file Mexico COFEPRIS under the 45-business-day abbreviated reliance pathway, then cascade the same dossier into Brazil (ANVISA / PAHO reference), Colombia, Argentina, Chile and Peru — and onward into MENA via Saudi SFDA Verification, UAE MOHAP, Egypt EDA — and SEA via Singapore HSA Abridged. One bridge, many markets.',
  },
  {
    n: '05',
    title: 'Local execution',
    body:
      'Boots-on-the-ground operations per country: bulk import, local CDMO packaging, distributor partnerships, KOL relationships and payer access. The operational playbook is run by embedded teams while our agents handle dossier translation, deficiency responses and multi-jurisdiction submission tracking.',
  },
];

export function ApproachBody() {
  return (
    <>
      <section className="relative bg-brand">
        <img
          src="/images/world-dots.png"
          alt="World map of emerging-market reliance pathways"
          className="w-full h-auto object-cover opacity-90"
        />
      </section>

      <section id="opportunity" className="bg-white text-brand py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-4">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-brand/60">
                /the opportunity
              </p>
              <h2 className="mt-4 font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0]">
                A 20-year drug lag, repriced.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
              <p>
                Between 2005 and 2022, 78 drugs were approved in Japan that never reached the United States. The broader universe is much larger: hundreds of FDA-, EMA- and PMDA-approved therapeutics have never been bridged into emerging markets where they are clinically needed and commercially viable.
              </p>
              <p>
                Each conservatively represents <span className="font-serif text-brand">$1.9BN+</span> in lifetime per-asset revenue across our target markets. The global rights sit unallocated inside US and European biotechs, NewCo platforms, and venture-backed development funds whose own teams are focused on the next blockbuster, not on Mexico City or Riyadh.
              </p>
              <p>
                The model is already validated. Pint Pharma cultivated a portfolio of ~10 in-licensed drugs over 30 years, reached ~$60M ARR, and was acquired in September 2025 by Sobi (Nasdaq Stockholm: SOBI) primarily for its LATAM distribution footprint. We are building the AI-native, parallelised version.
              </p>
            </div>
          </div>

          <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-brand/15 pt-12">
            {[
              { k: '444+', v: 'Identified assets' },
              { k: '$1.9BN+', v: 'per Asset, per Country' },
              { k: '$390BN+', v: 'Total addressable value' },
              { k: '440M+', v: 'Patient reach' },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-serif text-[40px] md:text-[64px] lg:text-[80px] leading-[0.95] text-brand">
                  {s.k}
                </div>
                <div className="mt-3 text-[11px] md:text-xs tracking-[0.18em] uppercase text-brand/70">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream text-brand py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <img
                src="/images/rotator/06-molecule.jpg"
                alt=""
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
            <div className="md:col-span-7">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-brand/60">
                /sourcing
              </p>
              <h2 className="mt-4 font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0]">
                The wedge is finding what others overlook.
              </h2>
              <div className="mt-8 space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
                <p>
                  Big pharma is structurally uninterested in approved assets that don&apos;t look like the next Ozempic. Their thresholds — $250M+ minimum deal value, first-in-class only, global rights — leave high-quality therapies stranded. The arbitrage is real, but it is exceedingly hard to find the asset that combines clean human data, a payer-willing emerging-market indication, and an upstream holder willing to license.
                </p>
                <p>
                  Catalys Pacific runs a 100-to-200-to-1 pass rate and has moved 12 drugs in seven years; the discovery work is the bottleneck. We rebuild it as software. Our agents continuously index global approvals, in-license registers, NewCo portfolios and patent positions. They surface candidates, draft a one-page brief, and score each on regulatory cleanliness, commercial viability per country, and rights availability — at a throughput a manual team cannot match.
                </p>
                <p>
                  The humans focus on the part agents can&apos;t do: the upstream conversation. Most rights holders we approach have never put a serious number on their emerging-market rights — because no one has ever asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-brand py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-7 md:order-1 order-2">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-brand/60">
                /bridge &amp; approve
              </p>
              <h2 className="mt-4 font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0]">
                One dossier. Many markets.
              </h2>
              <div className="mt-8 space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
                <p>
                  Mexico&apos;s COFEPRIS reliance pathway, opened in September 2025, grants 45-business-day reviews for any drug already approved by FDA, EMA, PMDA or Health Canada within the prior five years. Mexico is a PAHO reference country, which means a Mexican approval cascades into Brazil, Colombia, Argentina, Chile and Peru through abbreviated review.
                </p>
                <p>
                  The same dossier moves into MENA via Saudi SFDA Verification (which accepts FDA + EMA), the UAE MOHAP, Egypt EDA, Jordan and Israel — and into Southeast Asia via Singapore HSA Abridged, which acts as a regional gateway into Malaysia NPRA, Thailand TFDA, the Philippines FDA-PH and Vietnam DAV.
                </p>
                <p>
                  Each new market filing runs in three to six months instead of twelve to eighteen because the bridge dossier and submission templates are already built. Incremental cost per market drops 70–80% after the first launch.
                </p>
              </div>
            </div>
            <div className="md:col-span-5 md:order-2 order-1">
              <img
                src="/images/rotator/08-dna-robot.jpg"
                alt=""
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
          </div>

          <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-brand/15 pt-12 text-[14px] md:text-[15px] leading-[1.55]">
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-brand/60">LATAM</div>
              <p className="mt-3 text-brand">
                Mexico COFEPRIS · Brazil ANVISA (RDC 913/2024) · Colombia · Argentina · Chile · Peru — via PAHO reference cascade.
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-brand/60">MENA</div>
              <p className="mt-3 text-brand">
                Saudi SFDA Verification · UAE MOHAP · Egypt EDA · Jordan · Israel — recognising FDA and EMA decisions.
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-brand/60">SEA</div>
              <p className="mt-3 text-brand">
                Singapore HSA Abridged · Malaysia NPRA · Thailand TFDA · Philippines FDA-PH · Vietnam DAV.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand text-white py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-4">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/60">
                /how we operate
              </p>
              <h2 className="mt-4 font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0]">
                Five steps, run in parallel.
              </h2>
              <p className="mt-8 text-[17px] md:text-[19px] leading-[1.6] text-white/85">
                Sourcing, bridging, licensing, regulatory cascade and local execution don&apos;t run sequentially — agents run them concurrently across multiple assets and multiple jurisdictions. The first assets are run with embedded ops to instrument every step; as patterns emerge, the work moves in-house.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/15">
                {PILLARS.map((p) => (
                  <div key={p.n} className="bg-brand p-8 md:p-10">
                    <div className="font-serif text-[28px] md:text-[34px] text-white/70">{p.n}</div>
                    <h3 className="mt-3 font-serif text-[24px] md:text-[28px] leading-[1.15] text-white">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[14px] md:text-[15px] leading-[1.6] text-white/85">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream text-brand py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-brand/60">
            /why now
          </p>
          <h2 className="mt-4 font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0] max-w-[1000px]">
            Four tailwinds converging in the same 24 months.
          </h2>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-20 md:gap-y-16">
            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">US pricing pressure</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                The Inflation Reduction Act (Aug 2022) gave Medicare drug-price negotiation power for the first time; ZS Consulting projects ~31% pharma-revenue compression and 135 fewer approvals through 2039. Trump&apos;s May 2025 MFN executive order layered on a further squeeze, with 17 major manufacturers committing to most-favored-nation pricing in Medicaid.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">Emerging-market growth</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                IQVIA projects LATAM pharma at a 22% CAGR through 2027. MENA pharma is forecast to grow from ~$57B in 2025 to ~$78B by 2033. BCG estimates ~$275B of Western patent-cliff revenue at risk between 2025 and 2030 — capital and demand are rotating into the markets we operate in.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">Reliance pathways</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                Mexico&apos;s COFEPRIS 45-business-day pathway opened in September 2025. Brazil&apos;s ANVISA finalised its reliance framework via RDC 913/2024. Saudi SFDA Verification and Singapore HSA Abridged are now operational. For the first time, a single FDA/EMA/PMDA decision can be parlayed into 15+ market approvals.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">AI capability</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                Bessemer estimates the outsourced pharma-services market at $150B+, with only ~5% of pharma companies capturing measurable AI value. Dossier translation, bridge analysis, deficiency-response drafting and multi-jurisdiction submission tracking are now technically automatable — the field is lagging and we get to compound the gap.
              </p>
            </div>
          </div>

          <a
            href="mailto:info@first-ocean.com"
            className="mt-20 md:mt-28 inline-flex items-center gap-3 text-base md:text-lg text-brand hover:opacity-70 transition-opacity"
          >
            Talk to us <SlashIcon className="w-3 h-3" />
          </a>
        </div>
      </section>
    </>
  );
}
