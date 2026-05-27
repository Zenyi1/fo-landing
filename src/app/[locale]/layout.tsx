import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Prata } from "next/font/google";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import "../globals.css";

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type Params = { locale: string };

export async function generateStaticParams(): Promise<Params[]> {
  return locales.map((l) => ({ locale: l }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale).home;

  return {
    metadataBase: new URL("https://first-ocean.com"),
    title: { default: d.metaTitle, template: "%s · First Ocean" },
    description: d.metaDescription,
    applicationName: "First Ocean",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ja: "/ja" },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/seo/favicon-32.png", type: "image/png", sizes: "32x32" },
        { url: "/seo/favicon-192.png", type: "image/png", sizes: "192x192" },
      ],
      apple: { url: "/seo/apple-touch-icon.png", sizes: "180x180" },
    },
    openGraph: {
      type: "website",
      url: `https://first-ocean.com/${locale}`,
      siteName: "First Ocean",
      title: d.metaTitle,
      description: d.metaDescription,
      locale: locale === "ja" ? "ja_JP" : "en_US",
      images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
    },
    twitter: {
      card: "summary",
      title: d.metaTitle,
      description: d.metaDescription,
      images: ["/seo/fo.jpeg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${prata.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
