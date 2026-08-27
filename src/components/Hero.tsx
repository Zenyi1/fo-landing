'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { WaveBackground } from "@/components/WaveBackground";
import { originatorCallUrl } from "@/lib/links";

export function Hero() {
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
        {/* The number is the argument. It sits above the headline because it is
            the only line on the page a commercial lead can carry into an
            internal meeting unchanged. */}
        <p className="max-w-[46ch] text-[0.95rem] font-medium leading-[1.5] text-[color:var(--fo-accent)] md:text-[1rem]">
          Between 10 and 30 percent of a medicine&rsquo;s lifetime value sits
          outside the United States, Western Europe and Japan.
        </p>

        <h1 className="mt-5 max-w-[19ch] font-sans text-[clamp(2.5rem,6.4vw,4.9rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
          The commercial operation you would otherwise have to build.
        </h1>

        {/* What firstocean actually is, immediately under the headline: the
            licence holder. Everything else on the site follows from this
            sentence, so it says who owns the registration before it says
            anything about who moves the boxes. */}
        <p className="mt-7 max-w-[58ch] text-[clamp(1.05rem,1.7vw,1.22rem)] leading-[1.55] text-white">
          firstocean commercializes approved medicines across Latin America, the
          Middle East and Southeast Asia. We own the local entity, hold the
          registration in our own name and carry the compliance obligations that
          come with selling there. Licensed distributors move the product.
          Nothing else is handed off.
        </p>

        <p className="mt-5 text-[0.95rem] text-white/70">
          First markets: Brazil, Mexico, Saudi Arabia, the UAE.
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
            See our markets →
          </Link>
        </div>
      </div>
    </section>
  );
}
