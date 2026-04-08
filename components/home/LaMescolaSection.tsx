"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollingDecoText } from "@/components/ui/ScrollingDecoText";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";

/**
 * Layout Quay House: titoli scorrono sotto l'immagine, testo a sx, immagine a dx
 */
export function LaMescolaSection() {
  const { lang } = useSiteLanguage();
  return (
    <section className="relative min-h-[110vh] overflow-hidden bg-[#EBD9D4] py-8 lg:py-12">
      <div className="relative mx-auto flex min-h-[90vh] max-w-screen-2xl flex-col items-stretch px-4 lg:flex-row lg:items-end lg:gap-12 lg:px-8">
        {/* Testo decorativo — Passato da sx→dx, Sapori da dx→sx */}
        <div className="absolute inset-0 z-0 flex min-h-full flex-col items-center justify-center gap-2 overflow-visible">
          <ScrollingDecoText
            direction="leftToRight"
            className="font-serif text-[clamp(2rem,8vw,6rem)] font-semibold leading-[0.9] tracking-tight text-[#2C2420]/[0.09]"
          >
            PASSATO E PRESENTE
          </ScrollingDecoText>
          <ScrollingDecoText
            direction="rightToLeft"
            className="font-serif text-[clamp(2rem,8vw,6rem)] font-semibold leading-[0.9] tracking-tight text-[#2C2420]/[0.09]"
          >
            SAPORI & TERRITORIO
          </ScrollingDecoText>
        </div>

        {/* Contenuto con z sopra */}
        {/* Testo a sinistra — colonna stretta */}
        <div className="relative z-10 order-1 flex flex-col justify-center lg:order-1 lg:max-w-lg lg:pb-32">
          <ScrollReveal variant="fadeLeft" delay={0.1} duration={0.9}>
            <h2 className="font-serif font-semibold tracking-tight text-[#2C2420]/90" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              {t(translations.mescola.title1, lang)}
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeRight" delay={0.2} duration={0.9}>
            <h2 className="mt-1 font-serif font-semibold tracking-tight text-[#2C2420]/90" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              {t(translations.mescola.title2, lang)}
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.5} duration={0.8}>
            <p className="mt-10 max-w-md text-base leading-relaxed text-[#2C2420]/85 sm:text-lg">
              {t(translations.mescola.p1, lang)}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#2C2420]/85 sm:text-lg">
              {t(translations.mescola.p2, lang)}
            </p>
          </ScrollReveal>
        </div>

        {/* Immagine verticale a destra — z-20, il testo scorre sotto */}
        <ScrollReveal variant="slideFromBottomOvershoot" delay={0.15} className="relative z-20 order-2 mt-12 shrink-0 lg:order-2 lg:mt-0 lg:w-[40%] lg:translate-y-24">
          <ParallaxImage speed={0.25} className="relative aspect-[3/4] w-full overflow-hidden lg:min-h-[80vh]">
            <Image
              src="/images/brasato-manzo-polenta-tradizionale-la-vecia-mescola-verona.jpg"
              alt="Cucina veneta — La Vecia Mescola"
              fill
              loading="lazy"
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </ParallaxImage>
        </ScrollReveal>

        <div className="hidden flex-1 lg:block" aria-hidden />
      </div>
    </section>
  );
}
