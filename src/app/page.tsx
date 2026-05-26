import { SiteHeader } from "@/components/SiteHeader";
import { HomepageHero } from "@/components/HomepageHero";
import { FooterPromo } from "@/components/FooterPromo";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HomepageHero />
        <FooterPromo />
      </main>
      <SiteFooter />
    </>
  );
}
