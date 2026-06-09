import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const SLUGS = ["privacy", "terms", "cookies", "disclosures"] as const;
type Slug = (typeof SLUGS)[number];

function isSlug(value: string): value is Slug {
  return (SLUGS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSlug(slug)) return {};
  const d = getDictionary(locale).legalPages[slug];
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: {
      canonical: `/${locale}/legal/${slug}`,
      languages: { en: `/en/legal/${slug}`, ja: `/ja/legal/${slug}` },
    },
    openGraph: {
      title: `${d.metaTitle} · firstocean`,
      description: d.metaDescription,
      url: `https://first-ocean.com/${locale}/legal/${slug}`,
      images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSlug(slug)) notFound();
  const dict = getDictionary(locale);
  const doc = dict.legalPages[slug];

  return (
    <>
      <SiteHeader locale={locale} dict={dict.nav} />
      <main className="flex-1 bg-white text-approach">
        <section className="pt-40 md:pt-48 pb-24 md:pb-32">
          <div className="max-w-[860px] mx-auto px-6 md:px-10">
            <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/60">
              /legal
            </p>
            <h1 className="mt-6 font-serif text-[44px] md:text-[68px] lg:text-[80px] leading-[1.02] tracking-[-0.01em]">
              {doc.title}
            </h1>
            <p className="mt-6 text-xs tracking-[0.2em] uppercase text-approach/50">
              {doc.updated}
            </p>
            <p className="mt-10 text-[18px] md:text-[21px] leading-[1.5] font-medium text-approach">
              {doc.intro}
            </p>

            <div className="mt-14 md:mt-16 space-y-12">
              {doc.sections.map((s) => (
                <div key={s.heading} className="border-t border-approach/15 pt-8">
                  <h2 className="font-serif text-[24px] md:text-[30px] leading-[1.15]">
                    {s.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] md:text-[16px] leading-[1.7] text-approach/85">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dict={dict.footer} />
    </>
  );
}
