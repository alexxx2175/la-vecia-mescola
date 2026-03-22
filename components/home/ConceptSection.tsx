"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Sezione CONCEPT — layout come GIF Quay House:
 * - Colonna sx: 01, titolo CONCEPT (entra da sinistra), paragrafo (entra da destra)
 * - Colonna centro: immagine verticale (entra da sotto con overshoot)
 * - Colonna dx: spazio per badge rotante e social (elementi fixed globali)
 */
export function ConceptSection() {
  return (
    <section id="concept" className="relative z-10 min-h-[90vh] bg-[#EBD9D4] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid min-h-[70vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_1fr_0.4fr] lg:gap-16 lg:px-8">
        {/* Colonna sinistra — testo */}
        <div className="flex flex-col justify-center">
          {/* 01 + CONCEPT — entra da sinistra */}
          <ScrollReveal variant="fadeLeft" delay={0} duration={0.9}>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">
              01
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl lg:text-6xl">
              CONCEPT
            </h2>
          </ScrollReveal>

          {/* Paragrafo — entra da destra */}
          <ScrollReveal variant="fadeRight" delay={0.15} duration={0.9}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#2C2420]/90">
              Esplorando l&apos;eredità della cucina veneta. Un viaggio di
              (ri)scoperta nel cuore di Verona, a pochi passi dall&apos;Arena.
            </p>
          </ScrollReveal>

          {/* ORIGINI E ISPIRAZIONI + VIEW GALLERY */}
          <ScrollReveal variant="fadeUp" delay={0.3} duration={0.8}>
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

        {/* Colonna centro — immagine sale, supera il testo CONCEPT, torna a posizione */}
        <ScrollReveal variant="slideFromBottomOvershootPast" delay={0.1} className="relative z-20 flex justify-center">
          <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden">
            <Image
              src="/images/27.jpeg"
              alt="Interno — La Vecia Mescola"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              unoptimized
            />
          </div>
        </ScrollReveal>

        {/* Colonna destra — spazio per badge rotante e social (fixed in layout) */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
