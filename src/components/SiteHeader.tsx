'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SlashIcon, MenuSlashIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type Props = {
  locale: Locale;
  dict: Dictionary["nav"];
};

export function SiteHeader({ locale, dict }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  function switchLocale(target: Locale) {
    if (target === locale) return;
    document.cookie = `locale=${target}; path=/; max-age=31536000; samesite=lax`;
    const segments = pathname.split("/");
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    router.push(segments.join("/") || `/${target}`);
  }

  const localePrefix = `/${locale}`;

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
          <Link href={localePrefix} className="flex items-center" aria-label="firstocean">
            <span className="font-serif text-2xl lowercase">firstocean</span>
          </Link>

          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              href={`${localePrefix}/approach`}
              className="hidden lg:inline-flex items-center gap-3 text-base hover:opacity-70 transition-opacity"
            >
              {dict.approach}
              <SlashIcon className="w-3 h-3" />
            </Link>
            <Link
              href={`${localePrefix}/contact`}
              className="hidden lg:inline-flex items-center gap-3 text-base hover:opacity-70 transition-opacity"
            >
              {dict.contact}
              <SlashIcon className="w-3 h-3" />
            </Link>

            <LocaleToggle current={locale} onChange={switchLocale} />

            <button
              type="button"
              className="lg:hidden"
              aria-label={dict.openMenu}
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
              aria-label={dict.closeMenu}
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-70 transition-opacity"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-10 px-6">
            <Link
              href={localePrefix}
              className="inline-flex items-center gap-3 text-2xl hover:opacity-70 transition-opacity"
            >
              {dict.home}
              <SlashIcon className="w-4 h-4" />
            </Link>
            <Link
              href={`${localePrefix}/approach`}
              className="inline-flex items-center gap-3 text-2xl hover:opacity-70 transition-opacity"
            >
              {dict.approach}
              <SlashIcon className="w-4 h-4" />
            </Link>
            <Link
              href={`${localePrefix}/contact`}
              className="inline-flex items-center gap-3 text-2xl hover:opacity-70 transition-opacity"
            >
              {dict.contact}
              <SlashIcon className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

function LocaleToggle({
  current,
  onChange,
}: {
  current: Locale;
  onChange: (l: Locale) => void;
}) {
  return (
    <div className="inline-flex items-center text-xs md:text-sm tracking-wider uppercase select-none">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 opacity-40">/</span>}
          <button
            type="button"
            onClick={() => onChange(l)}
            aria-current={l === current ? "true" : undefined}
            className={cn(
              "transition-opacity",
              l === current ? "opacity-100 font-medium" : "opacity-50 hover:opacity-80"
            )}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
