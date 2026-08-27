import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title =
  "firstocean | Commercialization across Latin America, the Middle East and Southeast Asia";
const description =
  "Between 10 and 30 percent of a medicine's lifetime value sits outside the United States, Western Europe and Japan. firstocean owns the local entity, holds the registration and runs the commercial operation so that value gets collected.";

export const metadata: Metadata = {
  metadataBase: new URL("https://first-ocean.com"),
  title: { default: title, template: "%s · firstocean" },
  description,
  applicationName: "firstocean",
  alternates: { canonical: "/" },
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
    url: "https://first-ocean.com",
    siteName: "firstocean",
    title,
    description,
    locale: "en_US",
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/seo/fo.jpeg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "firstocean",
  url: "https://first-ocean.com",
  description,
  logo: "https://first-ocean.com/seo/fo.jpeg",
  email: "hugo@first-ocean.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
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
