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

  useEffect(() => {
    if (!hasDarkHero) return;
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

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
          <a
            href="mailto:info@first-ocean.com"
            className="hidden lg:inline-flex items-center gap-3 text-base hover:opacity-70 transition-opacity"
          >
            Contact Us
            <SlashIcon className="w-3 h-3" />
          </a>
          <button
            type="button"
            className="lg:hidden"
            aria-label="Open menu"
          >
            <MenuSlashIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
