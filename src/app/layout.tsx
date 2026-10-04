import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

/* Stand-in for the brand kit's Feature Display Italic (commercial face):
   the serif-italic voice used for emphasis in headlines. */
const feature = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-feature",
  display: "swap",
});

const description =
  "Firstocean is a global commercialization partner for biotechs. We take on registration, pricing, distribution and safety under one agreement. You keep the intellectual property. There is no payment before a sale.";

export const metadata: Metadata = {
  metadataBase: new URL("https://first-ocean.com"),
  title: "Firstocean",
  description,
  applicationName: "firstocean",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://first-ocean.com",
    siteName: "firstocean",
    title: "Firstocean",
    description,
    locale: "en_US",
    images: [{ url: "/brand/og.jpg", width: 1837, height: 776 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Firstocean",
    description,
    images: ["/brand/og.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "firstocean",
  url: "https://first-ocean.com",
  description,
  logo: "https://first-ocean.com/brand/og.jpg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${feature.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
