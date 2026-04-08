"use client";

import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";

const WHATSAPP_URL = "https://wa.me/393928699275";

export function GermanArenaSection() {
  const { lang } = useSiteLanguage();

  return (
    <section className="bg-[#EBD9D4] py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#B8962E]">
          {t(translations.arena_promo.label, lang)}
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold text-[#2C2420] sm:text-4xl">
          {t(translations.arena_promo.title, lang)}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#2C2420]/80">
          {t(translations.arena_promo.p1, lang)}
        </p>

        <div className="mx-auto mt-12 max-w-2xl border-t border-[#2C2420]/10 pt-10">
          <h3 className="font-serif text-xl font-semibold text-[#2C2420] sm:text-2xl">
            {t(translations.arena_promo.h3, lang)}
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#2C2420]/80">
            {t(translations.arena_promo.p2, lang)}
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-sm bg-[#2C2420] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#EBD9D4] transition-colors hover:bg-[#3d3630]"
          >
            {t(translations.arena_promo.whatsapp_cta, lang)}
          </a>
        </div>
      </div>
    </section>
  );
}
