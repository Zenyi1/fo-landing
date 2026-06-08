import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterPromo } from "@/components/FooterPromo";
import { SiteFooter } from "@/components/SiteFooter";
import { ApproachHero } from "@/components/ApproachHero";
import { ApproachBody } from "@/components/ApproachBody";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale).approach;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: {
      canonical: `/${locale}/approach`,
      languages: { en: "/en/approach", ja: "/ja/approach" },
    },
    openGraph: {
      title: `${d.metaTitle} · First Ocean`,
      description: d.metaDescription,
      url: `https://first-ocean.com/${locale}/approach`,
      images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
    },
  };
}

export default async function ApproachPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} dict={dict.nav} />
      <main className="flex-1">
        <ApproachHero dict={dict.approach} />
        <ApproachBody locale={locale} dict={dict.approach} />
        <FooterPromo locale={locale} dict={dict.home} />
      </main>
      <SiteFooter locale={locale} dict={dict.footer} />
    </>
  );
}
