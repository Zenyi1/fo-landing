'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SlashIcon } from "@/components/icons";
import { ImageRotator } from "@/components/ImageRotator";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = { locale: Locale; dict: Dictionary["home"] };

function SlideIn({
  children,
  from,
}: {
  children: React.ReactNode;
  from: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const offset = from === "left" ? "-80px" : "80px";

  return (
    <div
      ref={ref}
      className="transition-all duration-[900ms] ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${offset})`,
      }}
    >
      {children}
    </div>
  );
}

export function FeaturedStats({ locale, dict }: Props) {
  return (
    <section id="stats" className="relative overflow-hidden bg-brand text-white py-24 md:py-40">
      <ImageRotator />
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
        <SlideIn from="left">
          <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/70">
            {dict.problemKicker}
          </p>
          <p className="mt-6 font-serif text-[32px] md:text-[48px] lg:text-[60px] leading-[1.2] max-w-[1100px]">
            {dict.problemBody}
          </p>
        </SlideIn>

        <div className="mt-24 md:mt-40 space-y-16 md:space-y-24">
          {dict.stats.map((stat, i) => {
            const align: "left" | "right" = i % 2 === 0 ? "left" : "right";
            return (
              <SlideIn key={stat.label} from={align}>
                <div
                  className={cn(
                    "border-b border-white/30 pb-8",
                    align === "right"
                      ? "md:ml-auto md:max-w-[55%] md:text-left"
                      : "md:max-w-[55%]"
                  )}
                >
                  <div className="font-serif leading-[0.9] text-white text-[72px] md:text-[120px] lg:text-[165px]">
                    {stat.value}
                  </div>
                  <div className="mt-4 md:mt-6 text-[12px] md:text-sm tracking-[0.15em] uppercase text-white">
                    {stat.label}
                  </div>
                </div>
              </SlideIn>
            );
          })}
        </div>

        <SlideIn from="left">
          <div className="mt-24 md:mt-40 max-w-[1100px]">
            <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/70">
              {dict.solutionKicker}
            </p>
            <p className="mt-6 font-serif text-[32px] md:text-[48px] lg:text-[60px] leading-[1.2]">
              {dict.solutionBody}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 mt-12 md:mt-16 text-base md:text-lg text-white hover:opacity-70 transition-opacity"
            >
              {dict.contactLink} <SlashIcon className="w-3 h-3" />
            </Link>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}
