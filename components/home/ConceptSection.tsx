"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollingDecoText } from "@/components/ui/ScrollingDecoText";

/**
 * Layout Quay House: immagine verticale a sx (sopra), testo decorativo scorre sotto
 * all'ingresso si legge, scrollando va sotto l'immagine
 */
export function ConceptSection() {
  return (
    <section id="concept" className="relative min-h-[110vh] overflow-hidden bg-[#EBD9D4] py-16 lg:py-24">
      <div className="relative mx-auto flex min-h-[90vh] max-w-screen-2xl flex-col items-stretch px-4 lg:flex-row lg:items-start lg:gap-8 lg:px-8">
        {/* Testo decorativo — z-0, scorre sotto l'immagine (z-20) */}
        <div className="absolute inset-0 z-0 flex min-h-full items-center justify-center overflow-visible">
          <ScrollingDecoText
            direction="leftToRight"
            className="font-serif text-[clamp(3rem,12vw,10rem)] font-semibold leading-[0.85] tracking-tight text-[#2C2420]/[0.1]"
          >
            CONCEPT
          </ScrollingDecoText>
        </div>

        {/* Contenuto sopra al testo decorativo */}
        {/* Immagine verticale a sinistra — z-20, il testo scorre sotto */}
        <ScrollReveal variant="slideFromBottomOvershoot" delay={0} className="relative z-20 order-2 mt-8 shrink-0 lg:order-1 lg:mt-0 lg:w-[38%] lg:-translate-x-4">
          <ParallaxImage speed={0.2} className="relative aspect-[3/4] w-full overflow-hidden lg:min-h-[85vh]">
            <Image
              src="/images/sala-ristorante-panoramica-affreschi-la-vecia-mescola-verona.jpg"
              alt="Interno — La Vecia Mescola"
              fill
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
              unoptimized
            />
          </ParallaxImage>
        </ScrollReveal>

        {/* Testo — colonna stretta a destra */}
        <div className="relative z-10 order-1 flex flex-col justify-center lg:order-2 lg:max-w-md lg:pl-12">
          <ScrollReveal variant="fadeLeft" delay={0.1} duration={0.9}>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">01</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl lg:text-6xl">
              CONCEPT
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeRight" delay={0.25} duration={0.9}>
            <p className="mt-8 max-w-sm text-lg leading-relaxed text-[#2C2420]/90">
              Esplorando l&apos;eredità della cucina veneta. Un viaggio di (ri)scoperta nel cuore
              di Verona, a pochi passi dall&apos;Arena.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.4} duration={0.8}>
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-[#2C2420]/70">
              Origini e Ispirazioni
            </p>
            <Link
              href="/#gallery"
              className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[#B8962E] transition-colors hover:text-[#8B4513]"
            >
              VIEW GALLERY
            </Link>
          </ScrollReveal>
        </div>

        {/* Spazio per elementi fixed (badge, social) */}
        <div className="hidden flex-1 lg:block" aria-hidden />
      </div>
    </section>
  );
}
