import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Ledger face for /intelligence: figures, row IDs and eyebrows. Two weights
// only — a dollar amount set in mono reads as a figure lifted off a document
// rather than as a marketing stat.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Display and body face for /intelligence. Tighter and lower-contrast than
// Inter at large sizes, which is what the blueprint headline scale needs.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const title = "firstocean";
const description =
  "firstocean commercializes approved and late-stage medicines in 53 markets across Latin America, the Middle East, Africa, Asia and Eastern Europe, from selection to launch.";

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
      className={`${inter.variable} ${plexMono.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
