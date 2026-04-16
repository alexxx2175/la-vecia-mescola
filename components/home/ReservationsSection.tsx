"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";
import { openChatbot } from "@/components/ui/ChatbotWidget";

/**
 * Sezione Prenotazioni — stile Quay House "CONTACT US TO RESERVE"
 */
export function ReservationsSection() {
  const { lang } = useSiteLanguage();
  return (
    <section
      id="prenotazioni"
      className="relative z-10 bg-[#EBD9D4] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-screen-2xl px-6 text-center lg:px-8">
        <ScrollReveal duration={0.9}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">
            {t(translations.reservations.number, lang)}
          </p>
          <h2 className="mt-2 font-serif font-semibold text-[#2C2420]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            {t(translations.reservations.title, lang)}
          </h2>
          <button
            type="button"
            onClick={openChatbot}
            className="mt-10 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-sm bg-[#2C2420] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#EBD9D4] transition-colors hover:bg-[#3d3630] cursor-pointer sm:w-auto"
          >
            {t(translations.reservations.cta, lang)}
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
