import { SlashIcon } from "@/components/icons";

export function FooterPromo() {
  return (
    <section className="relative h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden bg-brand text-white">
      <video
        src="/videos/waves.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-brand/30" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-[120px] gap-8 md:gap-10">
        <h2 className="font-serif leading-[0.95] text-white text-[56px] md:text-[96px] lg:text-[140px]">
          Make an impact
        </h2>
        <a
          href="mailto:info@first-ocean.com"
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-white text-base text-white hover:bg-white hover:text-brand transition-colors w-fit"
        >
          Contact Us <SlashIcon className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
