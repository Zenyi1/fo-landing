'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SlashIcon, MenuSlashIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

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
          {scrolled ? (
            <Image
              src="/seo/fo.jpeg"
              alt="FirstOcean"
              width={40}
              height={40}
              priority
              className="w-10 h-10 rounded object-cover"
            />
          ) : (
            <span className="font-serif text-2xl lowercase">firstocean</span>
          )}
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
            className="lg:hidden relative z-[60]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuSlashIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 z-40 bg-white text-brand flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center gap-10 px-6">
            <Link
              href="/"
              className="font-serif text-3xl lowercase hover:opacity-70 transition-opacity"
            >
              Home
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
          </div>
        </div>
      )}
    </header>
  );
}
