import Link from "next/link";
import { LinkedInIcon, XIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = { locale: Locale; dict: Dictionary["footer"] };

export function SiteFooter({ locale, dict }: Props) {
  const base = `/${locale}`;

  const columns = [
    {
      heading: dict.headings.company,
      links: [
        { label: dict.links.approach, href: `${base}/approach` },
        { label: dict.links.contact, href: `${base}/contact` },
      ],
    },
    {
      heading: dict.headings.legal,
      links: [
        { label: dict.links.privacy, href: `${base}/legal/privacy` },
        { label: dict.links.terms, href: `${base}/legal/terms` },
        { label: dict.links.cookies, href: `${base}/legal/cookies` },
        { label: dict.links.disclosures, href: `${base}/legal/disclosures` },
      ],
    },
  ];

  return (
    <footer className="bg-white text-brand border-t border-brand/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-16">
          <div className="space-y-5 sm:col-span-2 lg:col-span-1 max-w-sm">
            <Link href={base} className="font-serif text-2xl lowercase">
              firstocean
            </Link>
            <p className="text-sm leading-relaxed text-brand/60">{dict.legal}</p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.linkedin.com/company/first-ocean"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 grid place-items-center rounded bg-brand text-white hover:opacity-80 transition-opacity"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/firstocean"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="w-9 h-9 grid place-items-center rounded bg-brand text-white hover:opacity-80 transition-opacity"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} className="space-y-4">
              <p className="text-[11px] tracking-[0.25em] uppercase text-brand/45">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-brand/70 hover:text-brand transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] tracking-[0.25em] uppercase text-brand/45">
                {dict.registeredOffice}
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-line text-brand/70">
                {dict.usAddress}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] tracking-[0.25em] uppercase text-brand/45">
                {dict.londonHq}
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-line text-brand/70">
                {dict.londonAddress}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16 pt-6 border-t border-brand/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand/55">{dict.rights}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={`${base}/legal/privacy`}
              className="text-xs text-brand/55 hover:text-brand transition-colors"
            >
              {dict.links.privacy}
            </Link>
            <Link
              href={`${base}/legal/terms`}
              className="text-xs text-brand/55 hover:text-brand transition-colors"
            >
              {dict.links.terms}
            </Link>
            <Link
              href={`${base}/legal/cookies`}
              className="text-xs text-brand/55 hover:text-brand transition-colors"
            >
              {dict.links.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
