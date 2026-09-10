"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_STRINGS } from "@/data/consent";
import { legalPath, type Locale } from "@/data/locales";
import { onOpenCookiePreferences, setConsent, useConsent } from "@/lib/consent";
import { useIsClient } from "@/lib/use-client-value";

/**
 * Banner cookie conforme alle linee guida del Garante: "Accetta" e "Rifiuta"
 * con pari evidenza, nessun cookie non necessario prima della scelta, scelta
 * modificabile in ogni momento dal footer ("Preferenze cookie").
 */
export function CookieBanner({ lang }: { lang: Locale }) {
  const s = CONSENT_STRINGS[lang];
  const consent = useConsent();
  const isClient = useIsClient();
  const [forced, setForced] = useState(false);

  useEffect(() => onOpenCookiePreferences(() => setForced(true)), []);

  const open = isClient && (forced || consent === null);
  if (!open) return null;

  const choose = (analytics: boolean) => {
    setConsent(analytics);
    setForced(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
      className="fixed inset-x-3 bottom-3 z-[200] mx-auto max-w-xl rounded-lg border border-[#2C2420]/15 bg-[#F5F0E8] p-5 text-[#2C2420] shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6"
    >
      <h2 id="cookie-banner-title" className="font-serif text-lg font-semibold">
        {s.title}
      </h2>
      <p id="cookie-banner-text" className="mt-2 text-sm leading-relaxed text-[#2C2420]/85">
        {s.text}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => choose(true)}
          className="inline-flex min-h-[44px] items-center rounded-sm bg-[#2C2420] px-6 text-sm font-semibold uppercase tracking-wider text-[#EBD9D4] transition-colors hover:bg-[#3d3630] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2"
        >
          {s.accept}
        </button>
        <button
          type="button"
          onClick={() => choose(false)}
          className="inline-flex min-h-[44px] items-center rounded-sm border border-[#2C2420] px-6 text-sm font-semibold uppercase tracking-wider text-[#2C2420] transition-colors hover:bg-[#2C2420]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2"
        >
          {s.reject}
        </button>
        <Link
          href={legalPath(lang, "/cookie-policy")}
          className="inline-flex min-h-[44px] items-center text-sm underline underline-offset-4 hover:text-[#8F6F1A]"
        >
          {s.policy}
        </Link>
      </div>
    </div>
  );
}
