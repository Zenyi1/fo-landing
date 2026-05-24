import type { Metadata } from "next";
import { Prata } from "next/font/google";
import "./globals.css";

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://first-ocean.com"),
  title: {
    default: "First Ocean",
    template: "%s · First Ocean",
  },
  description:
    "First Ocean is a global, diversified alternative investment firm with the mission to deliver high-quality returns for our investors.",
  applicationName: "First Ocean",
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
    siteName: "First Ocean",
    title: "First Ocean",
    description:
      "First Ocean is a global, diversified alternative investment firm with the mission to deliver high-quality returns for our investors.",
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title: "First Ocean",
    description:
      "First Ocean is a global, diversified alternative investment firm with the mission to deliver high-quality returns for our investors.",
    images: ["/seo/fo.jpeg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${prata.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
