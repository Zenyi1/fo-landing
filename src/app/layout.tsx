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
  title: "firstocean",
  description:
    "FirstOcean is a global, diversified alternative investment firm with the mission to deliver high-quality returns for our investors.",
  icons: {
    icon: [{ url: "/seo/fo.ico" }],
    apple: { url: "/seo/fo.jpeg" },
  },
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
