'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { WaveBackground } from "@/components/WaveBackground";
import { BackedBy } from "@/components/BackedBy";
import { originatorCallUrl } from "@/lib/links";

// The markets firstocean distributes into: the largest commercially viable
// economies across LATAM, MENA and Southeast Asia (top ~8 by GDP each),
// interleaved by region. The word swaps in on its own fixed-height line so the
// hero never changes size, however long the market name is.
const MARKETS = [
  "Brazil", "Saudi Arabia", "Indonesia",
  "Mexico", "the UAE", "Thailand",
  "Argentina", "Egypt", "the Philippines",
  "Colombia", "Vietnam", "South Africa",
  "Chile", "Qatar", "Malaysia",
  "Peru", "Kuwait", "Jordan",
  "Ecuador", "Algeria", "Morocco", "Türkiye"
];

export function Hero() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0); // 0 at top, 1 once faded out

  // fade the hero copy out as the page scrolls down
  useEffect(() => {
    function onScroll() {
      setProgress(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.6))));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // rotate the market name
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // hold a single market, no motion

    let swap: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setI((n) => (n + 1) % MARKETS.length);
        setVisible(true);
      }, 400);
    }, 2100);

    return () => {
      clearInterval(cycle);
      clearTimeout(swap);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#071a2b] text-white"
    >
      {/* wave video background (trial), scoped to the hero */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <WaveBackground />
        <div className="absolute inset-0 bg-[#071a2b]/45" />
      </div>

      <div
        className="relative z-10 mx-auto w-full max-w-[1160px] px-6 pt-28 md:px-14 md:pt-32"
        style={{
          opacity: 1 - progress,
          transform: `translateY(${-progress * 28}px)`,
          transition: "opacity 0.1s linear, transform 0.1s linear",
          willChange: "opacity, transform",
        }}
      >
        <p className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
          Your medicine isn&rsquo;t reaching
        </p>
        <p className="mt-1 min-h-[1.02em] whitespace-nowrap font-sans text-[clamp(2.7rem,10vw,7.4rem)] font-semibold leading-[1.0] tracking-[-0.035em]">
          <span
            className="inline-block text-[#88a6f8] transition-all duration-[400ms] ease-out motion-reduce:transition-none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(0.22em)",
            }}
          >
            {MARKETS[i]}
          </span>
        </p>

        {/* What firstocean actually does, in the hero rather than three
            sections down: the rotating market states the problem, this states
            the offer, and a reader who leaves here should still be able to
            repeat what the company is for.

            Written on the mechanism, not on the contract — no claim here
            depends on whether firstocean ends up inside the licence or beside
            it, so none of it goes stale when that is settled. */}
        <p className="mt-7 max-w-[54ch] text-[clamp(1.05rem,1.7vw,1.22rem)] leading-[1.55] text-white">
          firstocean is the commercial operation a biotech will not build for
          itself. Approved and late-stage medicines, taken into{" "}
          <Link
            href="/markets"
            className="font-medium underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
          >
            53 markets
          </Link>{" "}
          a launch plan leaves out, through operators already established in
          each one.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <a
            href={originatorCallUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[11px] bg-white px-7 py-4 font-sans text-[1.05rem] font-semibold text-[#1e3a8a] transition-colors hover:bg-white/90"
          >
            Talk to us about your asset →
          </a>
          <Link
            href="/originators"
            className="inline-flex items-center gap-2 rounded-[11px] border border-white/40 px-7 py-4 font-sans text-[1.05rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
          >
            See an anonymous estimate →
          </Link>
        </div>

        <BackedBy className="mt-8" />
      </div>
    </section>
  );
}
