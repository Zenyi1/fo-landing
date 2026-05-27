import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale).contact;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", ja: "/ja/contact" },
    },
    openGraph: {
      title: `${d.metaTitle} · First Ocean`,
      description: d.metaDescription,
      url: `https://first-ocean.com/${locale}/contact`,
      images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const c = dict.contact;

  return (
    <>
      <SiteHeader locale={locale} dict={dict.nav} />
      <main className="flex-1 bg-white text-approach">
        <section className="pt-40 md:pt-48 pb-20 md:pb-32">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/70">
              {c.kicker}
            </p>
            <h1 className="mt-6 font-sans font-black text-[64px] md:text-[112px] lg:text-[140px] leading-[0.95] tracking-[-0.02em]">
              {c.headline}
            </h1>
            <p className="mt-10 md:mt-14 max-w-[760px] text-[20px] md:text-[26px] lg:text-[30px] leading-[1.45] font-medium text-approach">
              {c.intro}
            </p>
          </div>
        </section>

        <section className="pb-32 md:pb-48">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid gap-16 md:gap-20 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div className="space-y-10 md:space-y-12">
              {c.categories.map((cat) => (
                <div key={cat.slug} className="border-t border-approach/20 pt-6 md:pt-8">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-approach/70">
                    /{cat.slug}
                  </p>
                  <h2 className="mt-3 font-sans font-bold text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.01em]">
                    {cat.label}
                  </h2>
                  <a
                    href={`mailto:${cat.email}`}
                    className="mt-3 inline-block text-[16px] md:text-[18px] font-medium text-approach hover:opacity-70 transition-opacity"
                  >
                    {cat.email}
                  </a>
                </div>
              ))}
            </div>

            <div>
              <ContactForm dict={c} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
