import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = { dict: Dictionary["approach"] };

export function ApproachHero({ dict }: Props) {
  return (
    <section className="relative bg-white text-approach pt-40 md:pt-48 pb-20 md:pb-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/70">
          {dict.kicker}
        </p>
        <h1 className="mt-6 font-serif text-[40px] sm:text-[56px] md:text-[96px] lg:text-[132px] leading-[1.1] break-words hyphens-auto">
          {dict.headline1}<br />
          {dict.headline2}
        </h1>
        <p className="mt-10 md:mt-14 max-w-[860px] text-[17px] sm:text-[20px] md:text-[26px] lg:text-[30px] leading-[1.45] text-approach break-words">
          {dict.intro}
        </p>
      </div>
    </section>
  );
}
