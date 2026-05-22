import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FooterPromo } from "@/components/FooterPromo";
import { ApproachHero } from "@/components/ApproachHero";
import { ApproachBody } from "@/components/ApproachBody";

export const metadata: Metadata = {
  title: "Approach — firstocean",
  description:
    "How FirstOcean sources, bridges and globalises approved therapeutics into emerging markets.",
};

export default function ApproachPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ApproachHero />
        <ApproachBody />
        <FooterPromo />
      </main>
      <SiteFooter />
    </>
  );
}
