'use client';

import Link from 'next/link';
import { SlashIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

const PILLARS = [
  {
    n: '01',
    title: 'Asset identification',
    body:
      'Combing the world’s approved-drug registers for assets with the right combination of clinical maturity, payer fit, manufacturing feasibility and unallocated rights.',
  },
  {
    n: '02',
    title: 'Clinical and regulatory translation',
    body:
      'Mapping an approval issued in one jurisdiction onto the evidence, label and standard-of-care expectations of a market that sees the disease differently.',
  },
  {
    n: '03',
    title: 'Partnerships',
    body:
      'Earning trust with the rights holders who control the original approval, and with the in-country operators who control distribution.',
  },
  {
    n: '04',
    title: 'Regulatory navigation',
    body:
      'Working alongside each national authority through dossier preparation, deficiency responses and label localisation, each on its own clock and in its own language.',
  },
  {
    n: '05',
    title: 'Local commercialisation',
    body:
      'Standing up the supply chain, clinical engagement, payer access and patient awareness needed to actually treat people once an approval lands.',
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

      <section id="opportunity" className="bg-white text-approach py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-4">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
                /the opportunity
              </p>
              <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words">
                Approved everywhere that matters. Available almost nowhere.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8 text-[17px] md:text-[19px] leading-[1.6]">
              <p className="font-serif text-[26px] md:text-[34px] leading-[1.25] text-approach">
                74% of FDA-approved novel drugs from the past decade are not commercially available across LATAM, ME, or SEA.
              </p>
              <p>
                The broader universe is much larger: hundreds of therapeutics already cleared by the FDA, EMA, PMDA and Health Canada have never been brought into the emerging markets where they are clinically needed and commercially viable.
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
              <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words">
                Finding the right asset is the hard part.
              </h2>
              <div className="mt-8 space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
                <p>
                  Each year, the FDA, EMA, and PMDA approve over 200 new therapeutics. Only a fraction are both clinically meaningful and commercially viable in emerging markets, and identifying them is not a labelling exercise. It requires reconciling clinical evidence, payer behaviour, treatment standards, manufacturing feasibility, and rights availability across jurisdictions with materially different healthcare systems, languages, and standards of care.
                </p>
                <p>
                  Global pharma is structurally not positioned for this work. Minimum deal sizes, first-in-class mandates, and global-rights requirements leave high-quality therapies stranded outside their pipelines. The opportunity is real; the depth of judgement required to surface it is what keeps the field thin.
                </p>
                <p>
                  Doing it well demands scientific judgement, regulatory fluency, and local market intelligence in equal measure. Most teams have one of the three.
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
              <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words">
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

      <section className="bg-approach text-white py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-4">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/60">
                /how we operate
              </p>
              <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words">
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
          <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words max-w-[1000px]">
            Four tailwinds converging in the same 24 months.
          </h2>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-20 md:gap-y-16">
            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">US pricing pressure</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                The Inflation Reduction Act gave Medicare drug-price negotiation power for the first time; ZS Consulting projects ~31% revenue compression and 135 fewer approvals through 2039. The May 2025 MFN executive order added a further squeeze, with 17 major manufacturers committing to most-favored-nation pricing in Medicaid.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">Emerging-market growth</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                IQVIA projects LATAM pharma at a 22% CAGR through 2027. MENA pharma is forecast to grow from ~$57B to ~$78B by 2033. BCG estimates ~$275B of Western patent-cliff revenue at risk between 2025 and 2030.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">Reliance pathways</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                Brazil&apos;s ANVISA finalised its framework via RDC 913/2024. Mexico&apos;s COFEPRIS, Saudi SFDA Verification and Singapore HSA Abridged are now operational. A single FDA, EMA, PMDA or Health Canada decision can now form the basis of submissions across more than fifteen emerging markets.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">AI capability</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                Bessemer puts the outsourced pharma-services market at $150B+, with only ~5% of pharma capturing measurable AI value. Dossier translation, regulatory analysis and multi-jurisdiction submission tracking are now automatable; the field is lagging.
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
