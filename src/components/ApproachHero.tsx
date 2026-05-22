'use client';

import { SlashIcon } from '@/components/icons';

export function ApproachHero() {
  return (
    <section className="relative bg-white text-approach pt-40 md:pt-48 pb-20 md:pb-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/70">
          /approach
        </p>
        <h1 className="mt-6 font-sans font-black tracking-[-0.02em] text-[56px] md:text-[96px] lg:text-[132px] leading-[1.1]">
          Identify de-risked assets.<br />
          Bridge them where they&apos;re needed.
        </h1>
        <p className="mt-10 md:mt-14 max-w-[860px] text-[20px] md:text-[26px] lg:text-[30px] leading-[1.45] text-approach">
          We source therapeutics already approved by the FDA, EMA, PMDA and Health Canada, and identify emerging markets where they are commercially viable but have never been launched. Every asset arrives de-risked: years of human safety data, an existing standard of care to beat, and a reliance pathway built to clear it
        </p>

        <a
          href="#opportunity"
          className="mt-12 inline-flex items-center gap-3 text-base text-approach hover:opacity-70 transition-opacity"
        >
          Read the thesis <SlashIcon className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
