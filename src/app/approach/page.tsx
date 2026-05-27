import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterPromo } from "@/components/FooterPromo";
import { ApproachHero } from "@/components/ApproachHero";
import { ApproachBody } from "@/components/ApproachBody";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "FirstOcean's AI sourcing engine scores de-risked, approved therapeutics against patient populations, regulatory pathways, and commercial fit — routing the best assets into LATAM, MENA, and SEA.",
  openGraph: {
    title: "Approach · First Ocean",
    description:
      "How FirstOcean sources, bridges, and globalises FDA/EMA/PMDA-approved therapeutics into emerging markets.",
    url: "https://first-ocean.com/approach",
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
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
    </>
  );
}
