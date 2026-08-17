'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { WaveBackground } from "@/components/WaveBackground";
import { originatorCallUrl } from "@/lib/links";

// The markets firstocean distributes into: the largest commercially viable
// economies across LATAM, MENA and Southeast Asia (top ~8 by GDP each),
// interleaved by region. The name rotates in a caption under the subhead, not
// in the headline — a headline that changes every two seconds reads as a
// consumer app, and the sentence underneath was always the real one.
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
        <h1 className="max-w-[19ch] font-sans text-[clamp(2.5rem,6.4vw,4.9rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
          The commercial operation you would otherwise have to build.
        </h1>

        {/* What firstocean actually does, immediately under the headline: the
            central work, and who does the selling. Written on the mechanism,
            not on the contract — no claim here depends on whether firstocean
            ends up inside the licence or beside it. */}
        <p className="mt-7 max-w-[56ch] text-[clamp(1.05rem,1.7vw,1.22rem)] leading-[1.55] text-white">
          firstocean takes approved and late-stage medicines into the markets a
          launch plan leaves out. Registration, price and partner selection run
          centrally. The selling is done by operators already established in
          each market.
        </p>

        {/* The rotator, demoted to a caption. Fixed height so the hero never
            changes size, however long the market name is. */}
        <p className="mt-5 text-[0.95rem] text-white/70">
          Today:{" "}
          <span
            className="inline-block text-[color:var(--fo-accent)] transition-all duration-[400ms] ease-out motion-reduce:transition-none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(0.22em)",
            }}
          >
            {MARKETS[i]}
          </span>
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
            href="/markets"
            className="inline-flex items-center gap-2 rounded-[11px] border border-white/40 px-7 py-4 font-sans text-[1.05rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
          >
            See the 53 markets →
          </Link>
        </div>
      </div>
    </section>
  );
}
