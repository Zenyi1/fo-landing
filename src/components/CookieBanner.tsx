"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/cookie-consent";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = { locale: Locale; dict: Dictionary["cookieBanner"] };

export function CookieBanner({ locale, dict }: Props) {
  const [visible, setVisible] = useState(false);

  //only show once we know the visitor hasn't chosen yet
  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  function choose(value: "accepted" | "declined") {
    setConsent(value);
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6">
      <div className="max-w-[1440px] mx-auto bg-white text-brand border border-brand/10 rounded-lg shadow-lg p-5 md:p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-brand/70 max-w-2xl">
          {dict.message}{" "}
          <Link
            href={`/${locale}/legal/cookies`}
            className="underline hover:text-brand transition-colors"
          >
            {dict.learnMore}
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => choose("declined")}
            className="text-sm px-4 py-2 rounded text-brand/70 hover:text-brand transition-colors"
          >
            {dict.decline}
          </button>
          <button
            onClick={() => choose("accepted")}
            className="text-sm px-5 py-2 rounded bg-brand text-white hover:opacity-80 transition-opacity"
          >
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
