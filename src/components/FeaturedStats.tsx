'use client';

import { useEffect, useRef, useState } from "react";
import { SlashIcon } from "@/components/icons";
import { ImageRotator } from "@/components/ImageRotator";
import { cn } from "@/lib/utils";

const STATS: { value: string; label: string; align: "left" | "right" }[] = [
  { value: "2 in 3", label: "FDA-approved drugs never reach LATAM, MENA, or SEA", align: "left" },
  { value: "450+", label: "Identified Assets", align: "right" },
  { value: "$390Bn+", label: "Untapped Value", align: "left" },
  { value: "440M+", label: "Potential Patients", align: "right" },
];

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

export function FeaturedStats() {
  return (
    <section id="stats" className="relative overflow-hidden bg-brand text-white py-24 md:py-40">
      <ImageRotator />
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
        <p className="font-serif text-[32px] md:text-[48px] lg:text-[60px] leading-[1.2] max-w-[1100px]">
          Hundreds of de-risked therapies, approved by the FDA, EMA, and PMDA, never reach the emerging markets where demand is greatest. The result is global pharma's largest sourcing inefficiency. Firstocean is the AI sourcing engine that resolves it: scoring thousands of candidates against patient populations, regulatory pathways, and commercial fit, then routing the best assets to the right partners
        </p>

        <div className="mt-24 md:mt-40 space-y-16 md:space-y-24">
          {STATS.map((stat) => (
            <SlideIn key={stat.label} from={stat.align}>
              <div
                className={cn(
                  "border-b border-white/30 pb-8",
                  stat.align === "right"
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
          ))}
        </div>

        <a
          href="mailto:info@first-ocean.com"
          className="inline-flex items-center gap-3 mt-16 md:mt-24 text-base md:text-lg text-white hover:opacity-70 transition-opacity"
        >
          Contact Us <SlashIcon className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
