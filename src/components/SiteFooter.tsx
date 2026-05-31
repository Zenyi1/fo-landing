import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = { dict: Dictionary["footer"] };

export function SiteFooter({ dict }: Props) {
  return (
    <footer className="bg-brand text-white border-t border-white/15">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-md space-y-4">
            <span className="font-serif text-2xl lowercase">firstocean</span>
            <p className="text-sm leading-relaxed text-white/70">{dict.legal}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:gap-16">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                {dict.registeredOffice}
              </p>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-white/85">
                {dict.usAddress}
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                {dict.londonHq}
              </p>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-white/85">
                {dict.londonAddress}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14 pt-6 border-t border-white/15">
          <p className="text-xs text-white/60">{dict.rights}</p>
        </div>
      </div>
    </footer>
  );
}
