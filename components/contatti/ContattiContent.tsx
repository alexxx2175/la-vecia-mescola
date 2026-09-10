"use client";

import {
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";
import { MapEmbed } from "@/components/ui/MapEmbed";

const DAY_KEYS = [
  "lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato", "domenica",
] as const;

const HOURS = [
  "12:00 – 22:30", "12:00 – 22:30", "12:00 – 22:30", "12:00 – 22:30",
  "12:00 – 23:00", "12:00 – 23:00", "12:00 – 22:00",
];

export function ContattiContent() {
  const { lang } = useSiteLanguage();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#EBD9D4] pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="font-serif font-semibold text-[#2C2420]" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
            {t(translations.contatti.title, lang)}
          </h1>
          <div className="mx-auto mt-4 h-px w-16 bg-[#B8962E]/60" />
        </div>
      </section>

      {/* Map */}
      <section className="bg-[#EBD9D4]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <ScrollReveal>
            <div className="overflow-hidden rounded-lg">
              <MapEmbed lang={lang} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Info Grid */}
      <section className="bg-[#EBD9D4] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Address */}
            <ScrollReveal>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B8962E]/20">
                  <MapPin size={22} className="text-[#B8962E]" />
                </div>
                <h2 className="font-serif font-semibold text-[#2C2420]" style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}>
                  {t(translations.contatti.dove, lang)}
                </h2>
                <p className="text-[#2C2420]/80">
                  Vicolo Chiodo 4<br />
                  37121 Verona (VR)<br />
                  Italia
                </p>
              </div>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B8962E]/20">
                  <Phone size={22} className="text-[#B8962E]" />
                </div>
                <h2 className="font-serif font-semibold text-[#2C2420]" style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}>
                  {t(translations.contatti.telefono, lang)}
                </h2>
                <a
                  href="tel:+390458036608"
                  className="inline-flex min-h-[48px] items-center text-xl font-semibold text-[#B8962E] transition-colors hover:text-[#8B4513] sm:text-2xl"
                >
                  +39 045 803 6608
                </a>
                <a
                  href="tel:+393928699275"
                  className="flex min-h-[44px] items-center text-base text-[#2C2420]/80 transition-colors hover:text-[#B8962E]"
                >
                  WhatsApp +39 392 869 9275
                </a>
              </div>
            </ScrollReveal>

            {/* Reservation */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B8962E]/20">
                  <MessageCircle size={22} className="text-[#B8962E]" />
                </div>
                <h2 className="font-serif font-semibold text-[#2C2420]" style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}>
                  {t(translations.contatti.prenotazioni, lang)}
                </h2>
                <p className="text-[#2C2420]/80">
                  {t(translations.contatti.prenotazioni_desc, lang)}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Hours Table */}
          <ScrollReveal>
            <div className="mt-20">
              <div className="flex items-center gap-3">
                <Clock size={22} className="text-[#B8962E]" />
                <h2 className="font-serif font-semibold text-[#2C2420]" style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}>
                  {t(translations.contatti.orari, lang)}
                </h2>
              </div>
              <div className="mt-6 overflow-x-auto -mx-2 px-2">
                <table className="w-full min-w-0 text-sm">
                  <thead>
                    <tr className="border-b border-[#2C2420]/10">
                      <th className="py-3 pr-6 text-left font-semibold uppercase tracking-wider text-[#B8962E] text-xs">
                        {t(translations.contatti.giorno, lang)}
                      </th>
                      <th className="py-3 pr-6 text-left font-semibold uppercase tracking-wider text-[#B8962E] text-xs">
                        {t(translations.contatti.pranzo, lang)}
                      </th>
                      <th className="py-3 text-left font-semibold uppercase tracking-wider text-[#B8962E] text-xs">
                        {t(translations.contatti.cena, lang)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {DAY_KEYS.map((dayKey, i) => (
                      <tr
                        key={dayKey}
                        className="border-b border-[#2C2420]/5"
                      >
                        <td className="py-3 pr-6 font-medium text-[#2C2420]">
                          {t(translations.contatti[dayKey], lang)}
                        </td>
                        <td className="py-3 pr-6 text-[#2C2420]/80">
                          {HOURS[i]}
                        </td>
                        <td className="py-3 text-[#2C2420]/80">
                          —
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* Social */}
          <ScrollReveal>
            <div className="mt-16 flex items-center gap-6">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#2C2420]/60">
                {t(translations.contatti.seguici, lang)}
              </span>
              <a
                href="https://www.facebook.com/people/La-Vecia-Mescola/100046353020148/?sk=about&locale=it_IT"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="min-h-[48px] min-w-[48px] flex items-center justify-center text-[#2C2420]/70 transition-colors hover:text-[#B8962E]"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/laveciamescola"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="min-h-[48px] min-w-[48px] flex items-center justify-center text-[#2C2420]/70 transition-colors hover:text-[#B8962E]"
              >
                <Instagram size={24} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
