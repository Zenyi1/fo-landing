'use client';

import { useEffect, useState } from "react";

export function Hero() {
  const [progress, setProgress] = useState(0); // 0 at top, 1 once faded out

  useEffect(() => {
    function onScroll() {
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.5)));
      setProgress(p);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="flex min-h-screen items-center">
      <div
        className="mx-auto w-full max-w-[1100px] px-6 pt-28 md:px-10 md:pt-32"
        style={{
          opacity: 1 - progress,
          transform: `translateY(${-progress * 24}px)`,
          transition: "opacity 0.1s linear, transform 0.1s linear",
          willChange: "opacity, transform",
        }}
      >
        <h1 className="max-w-[16ch] font-sans text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:max-w-[20ch] md:text-[58px] lg:text-[72px]">
          <span className="text-[#4a72e8]">firstocean</span> is the infrastructure that takes proven
          medicines to every market where demand exists.
        </h1>
        <a
          href="#early-access"
          className="mt-10 inline-flex items-center rounded-[10px] bg-white px-7 py-3.5 font-sans text-base font-semibold text-ink transition-colors hover:bg-white/90"
        >
          Get early access
        </a>
      </div>
    </section>
  );
}
