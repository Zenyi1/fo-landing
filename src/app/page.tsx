import { SiteHeader } from "@/components/SiteHeader";
import { HomepageHero } from "@/components/HomepageHero";
import { FeaturedStats } from "@/components/FeaturedStats";
import { FooterPromo } from "@/components/FooterPromo";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HomepageHero />
        <FeaturedStats />
        <FooterPromo />
      </main>
      <SiteFooter />
    </>
  );
}
