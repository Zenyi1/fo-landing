'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { inlicensorCallUrl } from "@/lib/links";

// Same scroll-to-solid behaviour as SiteHeader, but its links resolve
// site-wide (the homepage header uses in-page anchors that dead-end here).
export function DistributorsHeader() {
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white" : ""
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
        <Link
          href="/"
          className={`text-2xl font-semibold lowercase tracking-tight transition-colors ${
            solid ? "text-ink" : "text-white"
          }`}
        >
          firstocean
        </Link>
        <nav className="flex items-center gap-5 md:gap-7">
          <Link
            href="/originators"
            className={`hidden text-sm font-semibold transition-colors sm:inline ${linkColor}`}
          >
            For originators
          </Link>
          <a
            href={inlicensorCallUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-[9px] px-4 py-2 text-sm font-semibold transition-colors ${
              solid ? "bg-brand text-white hover:bg-[var(--brand-strong)]" : "bg-white text-ink hover:bg-white/90"
            }`}
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
