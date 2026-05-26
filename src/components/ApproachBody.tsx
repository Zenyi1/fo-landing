'use client';

import Link from 'next/link';
import { SlashIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

const FUNCTIONS = [
  {
    n: '01',
    title: 'Identification',
    body:
      'Screening approved-drug registers of the FDA, EMA, PMDA and Health Canada against clinical fit, payer behaviour, manufacturing feasibility and rights availability in the markets we serve.',
  },
  {
    n: '02',
    title: 'Acquisition',
    body:
      'In-licensing and distribution agreements with the originators who hold ex-US and ex-EU rights. Structured to work for a developer whose primary market is the US or EU and a launch whose primary market is not.',
  },
  {
    n: '03',
    title: 'Regulatory translation',
    body:
      'Adapting an approval issued in one jurisdiction to the evidence package, label and standard-of-care expectations of fifteen others through the reliance pathways that recognise the underlying decision.',
  },
  {
    n: '04',
    title: 'In-country execution',
    body:
      'Partnering with the operators who control distribution, tender access, cold-chain logistics and clinical engagement, so that an approval becomes a registered product on a national formulary.',
  },
];

const SHIFTS = [
  {
    title: 'US revenue compression',
    body:
      'The Inflation Reduction Act and the 2025 most-favored-nation executive order are projected to compress US revenue on affected molecules by approximately 30%. Originators are more willing to license rights they were never going to commercialise themselves.',
  },
  {
    title: 'Emerging-market demand',
    body:
      'IQVIA forecasts double-digit nominal growth in LATAM pharma through 2027. MENA pharma is on track to reach approximately $78B by 2033, with the GCC alone forecast above $36B.',
  },
  {
    title: 'Reliance pathways',
    body:
      'ANVISA finalised its framework via RDC 913/2024. COFEPRIS, SFDA Verification and HSA Abridged are now operational. The infrastructure for cross-jurisdictional recognition exists for the first time.',
  },
  {
    title: 'Sovereign drug-security mandates',
    body:
      'Vision 2030 has elevated drug security and biotech localisation to national priorities in Saudi Arabia, with comparable agendas across the GCC and in several LATAM and SEA markets. The strategic preference favours partners who can place approved therapies in-country.',
  },
];

export function ApproachBody() {
  return (
    <>
      <section className="relative bg-approach">
        <img
          src="/images/approach/earth-night.jpg"
          alt="Earth at night, viewed from orbit"
          className="w-full h-[60vh] md:h-[80vh] object-cover"
        />
      </section>

      <section id="gap" className="bg-white text-approach py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
                /the gap today
              </p>
              <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words">
                A regulatory frontier the industry has not yet crossed.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-8 text-[17px] md:text-[19px] leading-[1.6]">
              <p className="font-serif text-[26px] md:text-[34px] leading-[1.25] text-approach">
                Approximately 75% of novel drugs approved by the FDA over the past decade are not commercially available in LATAM, MENA or Southeast Asia.
              </p>
              <p>
                The broader pool is larger: hundreds of therapeutics cleared by the four reference regulators have never been registered in the emerging markets where they are clinically needed.
              </p>
              <p>
                The constraint is not scientific, regulatory or commercial. It is operational. Ex-US and ex-EU rights sit with originators whose priorities lie elsewhere. Reliance pathways now exist but require local execution. Patient populations are large and growing but fragmented across jurisdictions with materially different healthcare systems.
              </p>
              <p className="font-serif text-[22px] md:text-[26px] leading-[1.3] text-approach">
                First Ocean exists to close this gap.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-approach text-white py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-4">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/60">
                /what we do
              </p>
              <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words">
                Four functions, run in series, across multiple assets and jurisdictions.
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {FUNCTIONS.map((p, i) => {
                  const inLastCol = i % 2 === 1;
                  const hasRightNeighbor = !inLastCol && i + 1 < FUNCTIONS.length;
                  const hasBelowNeighbor = i + 2 < FUNCTIONS.length;
                  const isLast = i === FUNCTIONS.length - 1;
                  return (
                    <div
                      key={p.n}
                      className={cn(
                        'p-8 md:p-10',
                        !isLast && 'border-b border-white/15 sm:border-b-0',
                        hasBelowNeighbor && 'sm:border-b sm:border-white/15',
                        hasRightNeighbor && 'sm:border-r sm:border-white/15',
                      )}
                    >
                      <div className="font-serif text-[28px] md:text-[34px] text-white/70">{p.n}</div>
                      <h3 className="mt-3 font-serif text-[24px] md:text-[28px] leading-[1.15] text-white">
                        {p.title}
                      </h3>
                      <p className="mt-4 text-[14px] md:text-[15px] leading-[1.6] text-white/85">
                        {p.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-approach py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
            /the markets we serve
          </p>
          <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words max-w-[1000px]">
            Three regions. Twelve jurisdictions. One body of evidence.
          </h2>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-brand/15 pt-12 text-[14px] md:text-[15px] leading-[1.55]">
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-approach/60">LATAM</div>
              <p className="mt-3 text-approach">
                Brazil (ANVISA) · Mexico (COFEPRIS).
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-approach/60">MENA</div>
              <p className="mt-3 text-approach">
                Saudi Arabia (SFDA Verification) · UAE (MOHAP) · Egypt (EDA) · Jordan · Israel, recognising FDA and EMA decisions.
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-approach/60">SEA</div>
              <p className="mt-3 text-approach">
                Singapore (HSA Abridged) · Malaysia (NPRA) · Thailand (TFDA) · Philippines (FDA-PH) · Vietnam (DAV).
              </p>
            </div>
          </div>

          <div className="mt-16 md:mt-20 max-w-[1000px] space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
            <p>
              A single FDA, EMA or PMDA approval can now anchor submissions across all twelve. Local regulators rely on the reference regulator&apos;s evaluation of the underlying clinical dossier, supplemented by the post-market and real-world evidence accumulated since the original approval.
            </p>
            <p>
              Recognition is not approval. Pricing, labelling and post-market commitments remain national, but the duplication is removed. Timelines compress from years to months, and the cost of redundant clinical work is avoided.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white text-approach py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
            /why now
          </p>
          <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words max-w-[1000px]">
            Four shifts in the same 24 months.
          </h2>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-20 md:gap-y-16">
            {SHIFTS.map((s) => (
              <div key={s.title}>
                <h3 className="font-serif text-[24px] md:text-[28px]">{s.title}</h3>
                <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">{s.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-16 md:mt-20 max-w-[1000px] font-serif text-[22px] md:text-[28px] leading-[1.3] text-approach">
            The four shifts are independent, but they converge on the same conclusion: the window for this work has opened, and it has not been open before.
          </p>
        </div>
      </section>

      <section className="bg-approach text-white py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/60">
            /work with us
          </p>
          <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words max-w-[1000px]">
            Two ways in.
          </h2>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-20 border-t border-white/15 pt-12">
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-white/60">For originators</div>
              <p className="mt-6 text-[17px] md:text-[19px] leading-[1.6] text-white/90">
                We acquire the rights you are not pursuing, on terms that protect your primary markets and surface incremental value from assets already in your portfolio.
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-white/60">For investors and co-investors</div>
              <p className="mt-6 text-[17px] md:text-[19px] leading-[1.6] text-white/90">
                We invest in the only function in this value chain that no one else is running at scale, in the 24 months that the regulatory and commercial conditions for it have existed.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-20 md:mt-28 inline-flex items-center gap-3 text-base md:text-lg text-white hover:opacity-70 transition-opacity"
          >
            Talk to us <SlashIcon className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </>
  );
}
