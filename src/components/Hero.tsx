'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { GameOfLife } from "@/components/GameOfLife";

// Emerging (and a few unreached developed) markets where an approved drug is
// often simply not sold. The word swaps in on its own fixed-height line so the
// hero never changes size, however long the market name is.
const MARKETS = [
  "Brazil", "Egypt", "Vietnam", "Poland", "Mexico", "Indonesia",
  "Saudi Arabia", "Nigeria", "Colombia", "the Philippines", "Morocco",
  "Thailand", "Argentina", "Kenya", "Romania", "Pakistan", "Malaysia",
  "South Africa", "Peru", "Australia", "Jordan", "Bangladesh", "Chile",
  "Ukraine", "the UAE", "Algeria", "Serbia", "India",
];

const textShadow = "0 1px 22px rgba(3,10,18,0.5), 0 1px 3px rgba(3,10,18,0.4)";

export function Hero() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

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
      {/* living pixel field, scoped to the hero only */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <GameOfLife />
      </div>

      <div
        className="relative z-10 mx-auto w-full max-w-[1160px] px-6 pt-28 md:px-14 md:pt-32"
        style={{ textShadow }}
      >
        <p className="max-w-[20ch] font-sans text-[clamp(1.55rem,3.4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
          Your medicine is approved and proven. It&rsquo;s just not sold in
        </p>
        <p className="mt-1 min-h-[1.05em] whitespace-nowrap font-sans text-[clamp(2.3rem,8.4vw,6.2rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          <span
            className="inline-block text-[#88a6f8] transition-all duration-[400ms] ease-out motion-reduce:transition-none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(0.22em)",
            }}
          >
            {MARKETS[i]}
          </span>
          <span className="text-white">.</span>
        </p>

        <p className="mt-7 max-w-[50ch] text-[clamp(1.05rem,2.1vw,1.3rem)] leading-[1.55] text-white/70">
          Demand exists in 90+ markets your launch plan will never cover. See what those
          unused rights are worth, anonymously, in about two minutes. No name, no email,
          no compound.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <Link
            href="/originators"
            className="inline-flex items-center gap-2 rounded-[11px] bg-brand px-6 py-3.5 font-sans text-base font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
          >
            See what my rights are worth →
          </Link>
          <a
            href="#inlicensors"
            className="inline-flex items-center gap-2 rounded-[11px] border border-white/25 px-6 py-3.5 font-sans text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
          >
            I&rsquo;m here to license assets →
          </a>
        </div>

        <div className="mt-8 flex max-w-[64ch] flex-wrap items-center text-[0.92rem] text-white/70">
          <span className="text-white">You keep the asset</span>
          <span className="mx-4 text-white/40">·</span>
          <span className="text-white">Success fee only, paid on close</span>
          <span className="mx-4 text-white/40">·</span>
          <span className="text-white">Core markets never touched</span>
          <span className="mx-4 text-white/40">·</span>
          <span className="text-white">Everything under NDA</span>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2.5 text-[0.8rem] text-white/55">
          Backed by <b className="font-semibold text-white">Entrepreneurs First</b>
          <span className="text-white/40">·</span>
          <b className="font-semibold text-white">Transpose Platform</b>
        </div>
      </div>
    </section>
  );
}
