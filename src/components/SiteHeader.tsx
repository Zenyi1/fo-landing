'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SlashIcon, MenuSlashIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const hasDarkHero = pathname === "/";
  const [scrolled, setScrolled] = useState(!hasDarkHero);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!hasDarkHero) return;
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  //close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  //lock body scroll while menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(20,52,203,0.1)] text-brand"
            : "bg-transparent text-white"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="FirstOcean">
            <span className="font-serif text-2xl lowercase">firstocean</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/approach"
              className="hidden lg:inline-flex items-center gap-3 text-base hover:opacity-70 transition-opacity"
            >
              Approach
              <SlashIcon className="w-3 h-3" />
            </Link>
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-3 text-base hover:opacity-70 transition-opacity"
            >
              Contact Us
              <SlashIcon className="w-3 h-3" />
            </Link>
            <button
              type="button"
              className="lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <MenuSlashIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white text-brand flex flex-col">
          <div className="px-6 md:px-10 py-6 flex items-center">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-70 transition-opacity"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-10 px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-2xl hover:opacity-70 transition-opacity"
            >
              Home
              <SlashIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/approach"
              className="inline-flex items-center gap-3 text-2xl hover:opacity-70 transition-opacity"
            >
              Approach
              <SlashIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-2xl hover:opacity-70 transition-opacity"
            >
              Contact Us
              <SlashIcon className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
