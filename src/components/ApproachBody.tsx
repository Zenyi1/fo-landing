'use client';

import Link from 'next/link';
import { SlashIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

const PILLARS = [
  {
    n: '01',
    title: 'Asset identification',
    body:
      'Combing the world’s approved-drug registers for therapeutics with the right combination of clinical maturity, indication and payer fit, manufacturing feasibility and unallocated rights. The signal-to-noise is brutal; most candidates fail at least one of these criteria.',
  },
  {
    n: '02',
    title: 'Clinical and regulatory translation',
    body:
      'Reading an approval issued in one jurisdiction and mapping it onto the evidence expectations, label conventions and standard of care of a market that sees the disease differently. Scientific and legal work in equal measure.',
  },
  {
    n: '03',
    title: 'Partnerships',
    body:
      'Earning trust with the rights holders who control the original approval, and with the in-country operators who control distribution. Both relationships take years to build and seconds to lose.',
  },
  {
    n: '04',
    title: 'Regulatory navigation',
    body:
      'Working alongside each national authority through dossier preparation, deficiency responses, label localisation and post-market commitments. Every authority on its own clock, in its own language, with its own conventions.',
  },
  {
    n: '05',
    title: 'Local commercialisation',
    body:
      'Standing up the in-country supply chain, clinical engagement, payer access and patient awareness needed to actually treat people once an approval lands. Approvals on paper aren’t medicine in patients.',
  },
];

export function ApproachBody() {
  return (
    <>
      <section className="relative bg-brand">
        <img
          src="/images/approach/earth-night.jpg"
          alt="Earth at night, viewed from orbit"
          className="w-full h-[60vh] md:h-[80vh] object-cover"
        />
      </section>

      <section id="opportunity" className="bg-white text-approach py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-4">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
                /the opportunity
              </p>
              <h2 className="mt-4 font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0]">
                Decades of unmet need, still waiting.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
              <p>
                Between 2005 and 2022, dozens of drugs were approved in Japan that never reached the United States. The broader universe is much larger: hundreds of therapeutics already cleared by the FDA, EMA, PMDA and Health Canada have never been brought into the emerging markets where they are clinically needed and commercially viable.
              </p>
              <p>
                The global rights typically sit unallocated inside US and European developers whose teams are focused on the next blockbuster, not on the markets we serve. The therapies are real, the patient populations are real, and the regulatory pathways to reach them now exist; the work that closes the gap is what does not.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-white text-approach py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <img
                src="/images/approach/pharmacy.jpg"
                alt="Pharmacy interior with rows of stocked medicine"
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
            <div className="md:col-span-7">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
                /sourcing
              </p>
              <h2 className="mt-4 font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0]">
                Finding the right asset is the hard part.
              </h2>
              <div className="mt-8 space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
                <p>
                  Each year the world&apos;s strictest regulators approve thousands of new therapeutics. Only a small fraction are both clinically meaningful and commercially viable in emerging markets. Identifying that fraction is not a matter of reading a label; it requires reconciling clinical evidence, payer behaviour, treatment standards, manufacturing feasibility and rights availability across jurisdictions with very different healthcare systems, languages and standards of care.
                </p>
                <p>
                  Global pharma is structurally uninterested in this work. Their thresholds, including minimum deal size, first-in-class only, and global rights, leave high-quality therapies stranded outside their pipelines. The opportunity is real; the depth of judgement needed to surface it is what keeps the field thin.
                </p>
                <p>
                  Doing it well demands equal parts scientific judgement, regulatory fluency and local market intelligence. Most teams have one of the three; building all three under one roof is the work of years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-approach py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-7 md:order-1 order-2">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
                /bridge &amp; approve
              </p>
              <h2 className="mt-4 font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.0]">
                One body of evidence. Many regulators.
              </h2>
              <div className="mt-8 space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
                <p>
                  An approval issued by the FDA, EMA, PMDA or Health Canada is increasingly recognised, in part, by the national authorities of dozens of emerging markets through reliance pathways finalised in the last two years. The same body of clinical evidence can now form the basis of submissions across LATAM, MENA and Southeast Asia.
                </p>
                <p>
                  Recognition is not the same as approval. Every authority has its own dossier conventions, language, response cycles and unwritten expectations. Each market has its own standard of care, its own payer dynamics, its own clinical community, its own logistics. Moving an asset cleanly through fifteen jurisdictions is a craft as much as a science. It is done market by market, by people who have done it before.
                </p>
              </div>
            </div>
            <div className="md:col-span-5 md:order-2 order-1">
              <img
                src="/images/approach/medicine.jpg"
                alt="Labelled medicine bottles arranged on a shelf"
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
          </div>

          <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-brand/15 pt-12 text-[14px] md:text-[15px] leading-[1.55]">
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-approach/60">LATAM</div>
              <p className="mt-3 text-approach">
                Brazil ANVISA · Mexico COFEPRIS · Colombia · Argentina · Chile · Peru, via PAHO reference cascade.
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-approach/60">MENA</div>
              <p className="mt-3 text-approach">
                Saudi SFDA Verification · UAE MOHAP · Egypt EDA · Jordan · Israel, recognising FDA and EMA decisions.
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-approach/60">SEA</div>
              <p className="mt-3 text-approach">
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
                Work that doesn&apos;t fit in one discipline.
              </h2>
              <p className="mt-8 text-[17px] md:text-[19px] leading-[1.6] text-white/85">
                Bringing an approved therapy into an emerging market requires capabilities that rarely sit under one roof: scientific, regulatory, commercial and operational. Each is hard on its own. Sequencing them across multiple assets and multiple jurisdictions is what makes the work defensible.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {PILLARS.map((p, i) => {
                  const inLastCol = i % 2 === 1;
                  const hasRightNeighbor = !inLastCol && i + 1 < PILLARS.length;
                  const hasBelowNeighbor = i + 2 < PILLARS.length;
                  const isLast = i === PILLARS.length - 1;
                  return (
                    <div
                      key={p.n}
                      className={cn(
                        "p-8 md:p-10",
                        !isLast && "border-b border-white/15 sm:border-b-0",
                        hasBelowNeighbor && "sm:border-b sm:border-white/15",
                        hasRightNeighbor && "sm:border-r sm:border-white/15",
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
                IQVIA projects LATAM pharma at a 22% CAGR through 2027. MENA pharma is forecast to grow from ~$57B in 2025 to ~$78B by 2033. BCG estimates ~$275B of Western patent-cliff revenue at risk between 2025 and 2030; capital and demand are rotating into the markets we operate in.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">Reliance pathways</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                Brazil&apos;s ANVISA finalised its reliance framework via RDC 913/2024. Mexico&apos;s COFEPRIS, Saudi SFDA Verification and Singapore HSA Abridged are now operational. For the first time, a single FDA, EMA, PMDA or Health Canada decision can form the basis of submissions across more than fifteen emerging markets.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">AI capability</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                Bessemer estimates the outsourced pharma-services market at $150B+, with only ~5% of pharma companies capturing measurable AI value. Dossier translation, regulatory analysis, deficiency-response drafting and multi-jurisdiction submission tracking are now technically automatable — the field is lagging and we get to compound the gap.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-20 md:mt-28 inline-flex items-center gap-3 text-base md:text-lg text-approach hover:opacity-70 transition-opacity"
          >
            Talk to us <SlashIcon className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </>
  );
}
