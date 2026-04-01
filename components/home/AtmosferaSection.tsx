"use client";

import Image from "next/image";
import { Landmark, MapPin, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";

export function AtmosferaSection() {
  const { lang } = useSiteLanguage();
  const highlights = [
    {
      icon: Heart,
      title: t(translations.atmosfera.card1_title, lang),
      text: t(translations.atmosfera.card1_desc, lang),
    },
    {
      icon: MapPin,
      title: t(translations.atmosfera.card2_title, lang),
      text: t(translations.atmosfera.card2_desc, lang),
    },
    {
      icon: Landmark,
      title: t(translations.atmosfera.card3_title, lang),
      text: t(translations.atmosfera.card3_desc, lang),
    },
  ];
  return (
    <section className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
        {/* Section enters with zoom */}
        <ScrollReveal variant="zoomIn">
          <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-gold">
            {t(translations.atmosfera.where, lang)}
          </p>
          <div className="mx-auto mt-2 max-w-2xl text-center">
            <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              {t(translations.atmosfera.title, lang)}
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold/60" />
          </div>
        </ScrollReveal>

        {/* Full-width image */}
        <ScrollReveal variant="slideFromBottom" duration={1} delay={0.05}>
          <div className="relative mx-auto mt-12 aspect-[21/9] max-w-5xl overflow-hidden shadow-xl">
            <Image
              src="/images/tavola-elegante-rosa-rossa-cristalli-affresco-la-vecia-mescola.jpg"
              alt="Ambiente intimo del ristorante La Vecia Mescola — intimate restaurant setting"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-3">
          {highlights.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <item.icon size={28} className="text-accent" />
                </div>
                <h3 className="mt-5 font-serif font-semibold text-foreground" style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {item.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
