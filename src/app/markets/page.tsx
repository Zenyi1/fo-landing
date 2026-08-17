import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { originatorCallUrl } from "@/lib/links";

const title = "Markets";
const description =
  "The markets firstocean commercializes into, named. Latin America, the Middle East and North Africa, Sub-Saharan Africa, South and Southeast Asia, Central Asia and Eastern Europe.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/markets" },
  openGraph: {
    type: "website",
    url: "/markets",
    siteName: "firstocean",
    title,
    description,
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: { card: "summary", title, description },
};

/* Naming the markets is the point. "90+ markets" is a number a reader has to
   take on trust; a list is a claim they can check, and checkable claims are what
   a counterparty's diligence is looking for.

   Grouped the way the regulatory clusters group, not alphabetically across the
   whole set, because the grouping is itself information: the Gulf reviews
   centrally, ASEAN assesses jointly, Latin America relies on its PAHO reference
   authorities. A reader scanning for their own region finds it in one place. */
const REGIONS = [
  {
    name: "Latin America",
    note: "Regulators here rely on the PAHO reference authorities, so an approval from ANVISA, COFEPRIS or INVIMA carries into its neighbours.",
    countries: [
      "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Costa Rica",
      "Dominican Republic", "Ecuador", "El Salvador", "Guatemala", "Honduras",
      "Jamaica", "Mexico", "Nicaragua", "Panama", "Paraguay", "Peru",
      "Trinidad and Tobago", "Uruguay",
    ],
  },
  {
    name: "Middle East and North Africa",
    note: "The Gulf runs a centralised review. Saudi Arabia's SFDA verifies an existing FDA or EMA approval rather than reviewing it again.",
    countries: [
      "Algeria", "Bahrain", "Egypt", "Jordan", "Kuwait", "Morocco", "Oman",
      "Qatar", "Saudi Arabia", "Tunisia", "Türkiye", "United Arab Emirates",
    ],
  },
  {
    name: "Sub-Saharan Africa",
    note: "Largely WHO collaborative-procedure territory, where prequalification or a stringent approval shortens the national decision.",
    countries: [
      "Angola", "Côte d'Ivoire", "Ghana", "Kenya", "Mauritius", "Nigeria",
      "Senegal", "South Africa",
    ],
  },
  {
    name: "South and Southeast Asia",
    note: "ASEAN uses a common technical dossier. One submission format, several national decisions.",
    countries: [
      "India", "Indonesia", "Malaysia", "Pakistan", "Philippines", "Singapore",
      "Sri Lanka", "Thailand", "Vietnam",
    ],
  },
  {
    name: "Central Asia and Eastern Europe",
    note: "Mostly national procedures, several of which recognise an EMA assessment directly.",
    countries: [
      "Bosnia and Herzegovina", "Georgia", "Kazakhstan", "Serbia", "Uzbekistan",
    ],
  },
];

const TOTAL = REGIONS.reduce((n, r) => n + r.countries.length, 0);

export default function MarketsPage() {
  return (
    <div className="min-h-full bg-white text-ink">
      {/* The page is light throughout, so it carries its own bar rather than
          the homepage header, whose links are in-page anchors that dead-end
          anywhere but the homepage. */}
      <header className="border-b border-ink/10">
        <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-6 md:h-20 md:px-14">
          <Link
            href="/"
            className="text-2xl font-semibold lowercase tracking-tight text-ink"
          >
            firstocean
          </Link>
          <nav className="flex items-center gap-5 md:gap-7">
            <Link
              href="/originators"
              className="hidden text-sm font-semibold text-ink transition-opacity hover:opacity-70 md:inline"
            >
              For originators
            </Link>
            <Link
              href="/distributors"
              className="hidden text-sm font-semibold text-ink transition-opacity hover:opacity-70 sm:inline"
            >
              For operators
            </Link>
            <a
              href={originatorCallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[9px] bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
            >
              Talk to us
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1160px] px-6 py-20 md:px-14 md:py-28">
        <h1 className="text-balance font-sans text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
          {TOTAL} markets, named.
        </h1>
        <div className="mt-8 max-w-[64ch] space-y-6 text-[clamp(1.05rem,1.8vw,1.2rem)] leading-[1.6] text-ink">
          <p>
            firstocean runs the commercial operation you would otherwise have to
            build. The regulatory sequence, the pricing strategy and the partner
            selection run centrally. The commercial work runs locally, through
            operators already established in each market.
          </p>
          <p>
            These are the markets. Not every asset belongs in every one of them.
            Saying which do is the first thing we do.
          </p>
        </div>

        <div className="mt-20 space-y-16">
          {REGIONS.map((region) => (
            <section key={region.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/15 pb-4">
                <h2 className="font-sans text-[clamp(1.3rem,2.4vw,1.7rem)] font-semibold tracking-[-0.02em] text-ink">
                  {region.name}
                </h2>
                <p className="text-[0.92rem] text-ink-soft">
                  {region.countries.length} markets
                </p>
              </div>

              <p className="mt-5 max-w-[68ch] text-[1rem] leading-[1.6] text-ink-soft">
                {region.note}
              </p>

              <ul className="mt-7 grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-4">
                {region.countries.map((country) => (
                  <li
                    key={country}
                    className="text-[0.98rem] leading-[1.5] text-ink"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-24 border-t border-ink/15 pt-10">
          <h2 className="text-balance font-sans text-[clamp(1.4rem,2.6vw,1.95rem)] font-semibold tracking-[-0.02em] text-ink">
            Which of these is your asset free in?
          </h2>
          <p className="mt-5 max-w-[58ch] text-[1.05rem] leading-[1.6] text-ink">
            Tell us what you hold and where the rights are unencumbered. We come
            back with the markets worth entering, the registration route each one
            allows, and what it takes to launch there.
          </p>
          <a
            href={originatorCallUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-[11px] bg-brand px-7 py-4 font-sans text-[1.05rem] font-semibold text-white transition-colors hover:bg-[var(--brand-strong)]"
          >
            Talk to us about your asset →
          </a>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
