'use client';

import { SlashIcon, PlayIcon } from '@/components/icons';

export function HomepageHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cream">
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/videos/waves.mp4"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col justify-center pl-10 md:pl-20 lg:pl-[120px] pr-6 md:pr-12 py-32">
        <h1 className="font-serif text-[48px] md:text-[72px] lg:text-[90px] leading-[1.15] lg:leading-[1.35] text-white max-w-4xl">
          Built for treatments<br />without borders
        </h1>
        
        <p className="mt-8 max-w-[600px] text-[22px] md:text-[28px] lg:text-[34px] leading-[1.5] text-white">
          Defined by sourcing, bridging and developing approved-elsewhere therapeutics.
        </p>
        <button
          type="button"
          onClick={() =>
            document
              .getElementById('stats')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          className="mt-12 inline-flex items-center gap-3 text-white text-base hover:opacity-70 transition-opacity w-fit"
        >
          Explore what&apos;s possible <SlashIcon className="w-3 h-3" />
        </button>
      </div>

      <div className="hidden lg:block absolute left-10 top-1/3 bottom-32 w-px bg-white z-10" />
      <span className="hidden lg:inline-block absolute left-10 bottom-12 text-xs uppercase tracking-wider text-white -rotate-90 origin-left z-10 whitespace-nowrap">
        Scroll
      </span>

      <button
        onClick={() =>
          document
            .getElementById('stats')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-12 right-6 md:right-12 w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand grid place-items-center text-white hover:opacity-90 transition-opacity z-10"
        aria-label="Scroll to next section"
      >
        <PlayIcon className="w-5 h-5 ml-0.5" />
      </button>
    </section>
  );
}
