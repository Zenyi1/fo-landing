'use client';

import { SlashIcon } from '@/components/icons';

export function ApproachHero() {
  return (
    <section className="relative bg-white text-brand pt-40 md:pt-48 pb-20 md:pb-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-brand/70">
          /approach
        </p>
        <h1 className="mt-6 font-serif text-[56px] md:text-[96px] lg:text-[132px] leading-[1.1]">
          Find the best drugs.<br />
          Bridge them where they&apos;re needed.
        </h1>
        <p className="mt-10 md:mt-14 max-w-[860px] text-[20px] md:text-[26px] lg:text-[30px] leading-[1.45] text-brand">
          We identify therapeutics already approved by the world&apos;s strictest regulators, including the FDA, EMA, PMDA and Health Canada, and bring them to emerging markets where they are commercially viable but have never been launched. Every asset arrives de-risked: years of human safety data, an existing standard of care to beat, and a reliance pathway built to clear it.
        </p>

        <a
          href="#opportunity"
          className="mt-12 inline-flex items-center gap-3 text-base text-brand hover:opacity-70 transition-opacity"
        >
          Read the thesis <SlashIcon className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
