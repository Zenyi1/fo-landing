import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteHeader } from "@/components/SiteHeader";
import { HomepageHero } from "@/components/HomepageHero";
import { FeaturedStats } from "@/components/FeaturedStats";
import { FooterPromo } from "@/components/FooterPromo";
import { SiteFooter } from "@/components/SiteFooter";

export default async function Home({
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
        <HomepageHero locale={locale} dict={dict.home} />
        <FeaturedStats locale={locale} dict={dict.home} />
        <FooterPromo locale={locale} dict={dict.home} />
      </main>
      <SiteFooter locale={locale} dict={dict.footer} />
    </>
  );
}
