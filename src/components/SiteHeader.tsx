'use client';

import { useEffect, useState } from "react";

export function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > window.innerHeight * 0.85);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = solid ? "text-ink hover:opacity-70" : "text-white hover:opacity-80";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-ink/[0.06] bg-white/80 backdrop-blur-sm" : "border-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
        <a
          href="#top"
          className={`text-2xl font-semibold lowercase tracking-tight transition-colors ${
            solid ? "text-ink" : "text-white"
          }`}
        >
          firstocean
        </a>
        <nav className="flex items-center gap-6 md:gap-8">
          <a href="#about" className={`text-sm font-semibold transition-colors ${linkColor}`}>
            About
          </a>
          <a href="#early-access" className={`text-sm font-semibold transition-colors ${linkColor}`}>
            Get early access
          </a>
        </nav>
      </div>
    </header>
  );
}
