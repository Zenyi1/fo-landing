'use client';

import Link from 'next/link';
import { SlashIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

const PILLARS = [
  {
    n: '01',
    title: 'Asset identification',
    body:
      'Screening approved-drug registers across the FDA, EMA, PMDA and Health Canada for assets with the right combination of clinical maturity, payer fit, manufacturing feasibility and rights availability for the markets we serve.',
  },
  {
    n: '02',
    title: 'Rights acquisition',
    body:
      'In-licensing or distribution agreements with the originators who hold the IP. This is the gating step: assets are not scarce, signed terms are. Structuring deals that work for both a US developer and an emerging-market launch is the work most of the field underestimates.',
  },
  {
    n: '03',
    title: 'Clinical and regulatory translation',
    body:
      'Adapting an approval issued in one jurisdiction to the evidence package, label and standard-of-care expectations of a market that sees the disease, the patient and the payer differently.',
  },
  {
    n: '04',
    title: 'Regulatory navigation',
    body:
      'Working alongside each national authority through dossier preparation, deficiency responses, pricing negotiation and post-market commitments, each on its own clock and in its own language.',
  },
  {
    n: '05',
    title: 'In-country execution',
    body:
      'Partnering with the operators who control distribution, tender access, cold-chain logistics and clinical engagement, so that an approval becomes a prescription rather than a press release.',
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
                Approved by the world&apos;s top regulators <br />Sold almost nowhere else.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8 text-[17px] md:text-[19px] leading-[1.6]">
              <p className="font-serif text-[26px] md:text-[34px] leading-[1.25] text-approach">
                Roughly three-quarters of FDA-approved novel drugs from the past decade are not commercially available across LATAM, MENA or Southeast Asia. In most cases they have never been registered or launched there at all.
              </p>
              <p>
                The broader universe is larger still: hundreds of therapeutics already cleared by the FDA, EMA, PMDA or Health Canada have never been brought into the emerging markets where they are clinically needed and commercially viable.
              </p>
              <p>
                Ex-US and ex-EU rights frequently sit unallocated inside developers whose commercial focus is the next blockbuster, not the markets we serve. The therapies are real, the patient populations are real, and the regulatory pathways now exist. The constraint is operational: someone has to do the work, market by market, to close the gap.
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
                Identifying assets is the first filter. Acquiring them is the gate.
              </h2>
              <div className="mt-8 space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
                <p>
                  Each year the FDA, EMA and PMDA approve more than 200 new therapeutics. Only a fraction are clinically meaningful and commercially viable in the markets we serve, and identifying them is not a labelling exercise. It requires reconciling clinical evidence, payer behaviour, treatment standards, manufacturing feasibility and rights availability across jurisdictions with materially different healthcare systems and standards of care.
                </p>
                <p>
                  Global pharma is structurally not set up for this work. Minimum deal sizes, first-in-class mandates and global-rights requirements leave high-quality therapies stranded outside large-cap pipelines. The opportunity is real; sustained access to it is not commodity work.
                </p>
                <p>
                  The harder step is not surfacing the asset but signing for it. The originators who own ex-US and ex-EU rights move on their own diligence cycles, their own committee calendars and their own internal priorities. Deals close because the counterparty is treated as a long-term partner, not a counterparty.
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
                  An approval issued by the FDA, EMA, PMDA or Health Canada is increasingly recognised, in part, by the national authorities of dozens of emerging markets through reliance pathways operationalised in the last two years. The same body of clinical evidence can now anchor submissions across LATAM, MENA and Southeast Asia.
                </p>
                <p>
                  Recognition is not approval. A reliance pathway shortens local review but does not replace it. Pricing, post-market commitments, label adaptation, and in some markets bridging data, remain national. The saving is measured in months of timeline and millions in avoided duplicated clinical work; it is not a free pass. Moving an asset cleanly through fifteen jurisdictions is craft as much as science, done market by market by people who have done it before.
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
                Bringing an approved therapy into an emerging market requires scientific, commercial, regulatory and operational capabilities sequenced in the right order. Any one of them done in isolation is wasted. The defensibility comes from running them in series, across multiple assets and multiple jurisdictions, against the same originator relationships.
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
              <h3 className="font-serif text-[24px] md:text-[28px]">US revenue compression</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                The Inflation Reduction Act granted Medicare direct drug-price negotiation for the first time, with industry analyses projecting roughly 30% revenue compression on affected molecules and a meaningfully smaller approvals cohort through the late 2030s. The 2025 most-favored-nation executive order added a further pull on US prices toward international reference levels. The implication is not that ex-US markets become cheaper to enter; it is that an originator&apos;s incentive to license rights they were never going to commercialise themselves becomes stronger.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">Emerging-market demand</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                IQVIA forecasts double-digit nominal growth in LATAM pharma through 2027, and MENA pharma is on track to reach roughly $78B by 2033, with the GCC alone forecast above $36B. Growth is uneven across therapeutic areas and skewed by FX, but the direction and the order of magnitude are clear: addressable demand for approved therapies in these markets is no longer a rounding error.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">Reliance pathways</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                Brazil&apos;s ANVISA finalised its framework via RDC 913/2024. Mexico&apos;s COFEPRIS, Saudi SFDA Verification and Singapore HSA Abridged are now operational. A single FDA, EMA, PMDA or Health Canada decision shortens local review across more than fifteen emerging markets, typically by months and sometimes by years, without removing local pricing, labelling or post-market obligations.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-[24px] md:text-[28px]">Sovereign drug-security mandates</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6]">
                Saudi Arabia&apos;s Vision 2030 has elevated drug security and biotech localisation to national priorities, with NUPCO consolidating public procurement, Lifera anchoring domestic manufacturing and Hevolution funding longevity science. Comparable agendas are being executed across the GCC and in several LATAM and SEA markets. The strategic preference now favours partners who can place approved therapies in-country rather than ship from afar.
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
