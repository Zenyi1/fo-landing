'use client';

import Link from 'next/link';
import { SlashIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/get-dictionary';

type Props = { locale: Locale; dict: Dictionary['approach'] };

export function ApproachBody({ locale, dict }: Props) {
  return (
    <>
      <section className="relative bg-approach">
        <img
          src="/images/approach/earth-night.jpg"
          alt={dict.earthAlt}
          className="w-full h-[60vh] md:h-[80vh] object-cover"
        />
      </section>

      <section id="gap" className="bg-white text-approach py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
                {dict.gapKicker}
              </p>
              <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words">
                {dict.gapHeadline}
              </h2>
            </div>
            <div className="md:col-span-7 space-y-8 text-[17px] md:text-[19px] leading-[1.6]">
              <p className="font-serif text-[26px] md:text-[34px] leading-[1.25] text-approach">
                {dict.gapStat}
              </p>
              <p>{dict.gapBody1}</p>
              <p>{dict.gapBody2}</p>
              <p className="font-serif text-[22px] md:text-[26px] leading-[1.3] text-approach">
                {dict.gapClose}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-approach text-white py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/60">
            {dict.functionsKicker}
          </p>
          <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words max-w-[1100px]">
            {dict.functionsHeadline}
          </h2>

          <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 border-t border-white/15">
            {dict.functions.map((p, i) => {
              const inLastCol = i % 2 === 1;
              const hasRightNeighbor = !inLastCol && i + 1 < dict.functions.length;
              const hasBelowNeighbor = i + 2 < dict.functions.length;
              const isLast = i === dict.functions.length - 1;
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
      </section>

      <section className="bg-white text-approach py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
            {dict.marketsKicker}
          </p>
          <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words max-w-[1000px]">
            {dict.marketsHeadline}
          </h2>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-brand/15 pt-12 text-[14px] md:text-[15px] leading-[1.55]">
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-approach/60">LATAM</div>
              <p className="mt-3 text-approach">{dict.marketsLatam}</p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-approach/60">MENA</div>
              <p className="mt-3 text-approach">{dict.marketsMena}</p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-approach/60">SEA</div>
              <p className="mt-3 text-approach">{dict.marketsSea}</p>
            </div>
          </div>

          <div className="mt-16 md:mt-20 max-w-[1000px] space-y-6 text-[17px] md:text-[19px] leading-[1.6]">
            <p>{dict.marketsBody1}</p>
            <p>{dict.marketsBody2}</p>
          </div>
        </div>
      </section>

      <section className="bg-approach text-white py-24 md:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/60">
            {dict.workKicker}
          </p>
          <h2 className="mt-4 font-serif text-[34px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] break-words max-w-[1000px]">
            {dict.workHeadline}
          </h2>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-20 border-t border-white/15 pt-12">
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-white/60">{dict.forOriginators}</div>
              <p className="mt-6 text-[17px] md:text-[19px] leading-[1.6] text-white/90">
                {dict.forOriginatorsBody}
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-white/60">{dict.forInvestors}</div>
              <p className="mt-6 text-[17px] md:text-[19px] leading-[1.6] text-white/90">
                {dict.forInvestorsBody}
              </p>
            </div>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="mt-20 md:mt-28 inline-flex items-center gap-3 text-base md:text-lg text-white hover:opacity-70 transition-opacity"
          >
            {dict.talkToUs} <SlashIcon className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </>
  );
}
