"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Sezione PAST & PRESENT — layout Quay House:
 * - Immagine verticale a sinistra (entra da sotto, overshoot, torna)
 * - Titoli grandi in overlay che sovrappongono immagine e sfondo
 * - "PASTO & PRESENTE" entra da sinistra
 * - "SAPORI & TERRITORIO" entra da destra
 */
export function LaMescolaSection() {
  return (
    <section className="relative z-10 min-h-[100vh] bg-[#EBD9D4] py-20 lg:py-28">
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col gap-8 px-4 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        {/* Immagine verticale a sinistra — entra da sotto, overshoot, torna indietro */}
        <ScrollReveal variant="slideFromBottomOvershoot" delay={0} className="relative z-0 w-full shrink-0 lg:w-[42%]">
          <div className="relative aspect-[3/4] w-full overflow-hidden lg:aspect-[4/5] lg:min-h-[75vh]">
            <Image
              src="/images/27.jpeg"
              alt="Cucina veneta — La Vecia Mescola"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 42vw"
              unoptimized
              priority={false}
            />
          </div>
        </ScrollReveal>

        {/* Titoli e testo — a destra dell'immagine, senza sovrapposizione */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-2 lg:pl-8 lg:pr-12">
          <div className="space-y-1">
            {/* "PASTO & PRESENTE" — entra da sinistra */}
            <ScrollReveal variant="fadeLeft" delay={0.1} duration={0.9}>
              <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#2C2420]/90 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                PASTO & PRESENTE
              </h2>
            </ScrollReveal>
            {/* "SAPORI & TERRITORIO" — entra da destra */}
            <ScrollReveal variant="fadeRight" delay={0.25} duration={0.9}>
              <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#2C2420]/90 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                SAPORI & TERRITORIO
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="fadeUp" delay={0.5} duration={0.8}>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-[#2C2420]/85 sm:text-lg">
              La Vecia Mescola è radicata nel cuore di Verona, nel centro storico
              a pochi passi dall&apos;Arena. Un viaggio nella tradizione veneta:
              pasta fresca fatta in casa, risotto all&apos;Amarone, ingredienti
              del territorio.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2C2420]/85 sm:text-lg">
              Cucina senza confini imposti, che esplora il patrimonio di sapori
              e spezie della regione, combinando tecniche tradizionali e
              contemporanee. Un invito a celebrare il convivio — come si faceva
              nella Verona di un tempo.
            </p>
          </ScrollReveal>
        </div>

        {/* Spazio vuoto a destra — stile reference Quay House */}
        <div className="hidden flex-[0.6] lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
