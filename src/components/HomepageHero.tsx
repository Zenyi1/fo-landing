'use client';

import { PlayIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/get-dictionary';

type Props = { locale: Locale; dict: Dictionary['home'] };

export function HomepageHero({ locale, dict }: Props) {
  const router = useRouter();

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
        <h1 className="font-serif text-[48px] md:text-[72px] lg:text-[90px] leading-[1.15] lg:leading-[1.25] text-white max-w-4xl">
          {dict.heroHeadline1}<br />{dict.heroHeadline2}
        </h1>

        <p className="mt-8 max-w-[720px] text-[20px] md:text-[24px] lg:text-[28px] leading-[1.5] text-white">
          {dict.heroSubtitle}
        </p>
        <button
          type="button"
          onClick={() => router.push(`/${locale}/approach`)}
          className="mt-12 inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white text-sm md:text-base tracking-wider uppercase hover:bg-white hover:text-brand transition-colors w-fit"
        >
          {dict.heroCta}
        </button>
      </div>

      <div className="hidden lg:block absolute left-10 top-1/3 bottom-32 w-px bg-white z-10" />
      <span className="hidden lg:inline-block absolute left-10 bottom-12 text-xs uppercase tracking-wider text-white -rotate-90 origin-left z-10 whitespace-nowrap">
        {dict.scroll}
      </span>

      <button
        onClick={() =>
          document
            .getElementById('stats')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-12 right-6 md:right-12 w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand grid place-items-center text-white hover:opacity-90 transition-opacity z-10"
        aria-label={dict.scrollAria}
      >
        <PlayIcon className="w-5 h-5 ml-0.5" />
      </button>
    </section>
  );
}
