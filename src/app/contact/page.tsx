import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with First Ocean — partner with us, invest with us, work with us, or reach our media team.",
  openGraph: {
    title: "Contact · First Ocean",
    description:
      "Partner, invest, work with us, or reach our media team at First Ocean.",
    url: "https://first-ocean.com/contact",
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
};

const CATEGORIES = [
  { label: "Partner with us", email: "partner@first-ocean.com" },
  { label: "Invest with us", email: "invest@first-ocean.com" },
  { label: "Work with us", email: "careers@first-ocean.com" },
  { label: "Media", email: "media@first-ocean.com" },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-white text-approach">
        <section className="pt-40 md:pt-48 pb-20 md:pb-32">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-approach/70">
              /contact
            </p>
            <h1 className="mt-6 font-sans font-black text-[64px] md:text-[112px] lg:text-[140px] leading-[0.95] tracking-[-0.02em]">
              Contact
            </h1>
            <p className="mt-10 md:mt-14 max-w-[760px] text-[20px] md:text-[26px] lg:text-[30px] leading-[1.45] font-medium text-approach">
              Any questions? Want to learn more? We look forward to hearing from you.
            </p>
          </div>
        </section>

        <section className="pb-32 md:pb-48">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid gap-16 md:gap-20 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div className="space-y-10 md:space-y-12">
              {CATEGORIES.map((c) => (
                <div key={c.label} className="border-t border-approach/20 pt-6 md:pt-8">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-approach/70">
                    /{c.label.toLowerCase().replace(/\s+/g, "-")}
                  </p>
                  <h2 className="mt-3 font-sans font-bold text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.01em]">
                    {c.label}
                  </h2>
                  <a
                    href={`mailto:${c.email}`}
                    className="mt-3 inline-block text-[16px] md:text-[18px] font-medium text-approach hover:opacity-70 transition-opacity"
                  >
                    {c.email}
                  </a>
                </div>
              ))}
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
