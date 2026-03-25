"use client";

import Image from "next/image";
import { Wine } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollingDecoText } from "@/components/ui/ScrollingDecoText";

const wines = [
  {
    name: "Amarone della Valpolicella",
    description: "Il re dei vini veronesi. Rosso intenso, corposo e avvolgente.",
  },
  {
    name: "Soave Classico",
    description: "Bianco elegante dai Colli Scaligeri. Fresco e minerale.",
  },
  {
    name: "Valpolicella Ripasso",
    description: "Strutturato e morbido, eccellente con secondi di carne.",
  },
] as const;

/**
 * Layout Quay House: testo a sx, immagine verticale a dx — staggered (immagine più in basso)
 */
export function CantinaSection() {
  return (
    <section
      id="cantina"
      className="relative min-h-[120vh] overflow-hidden bg-[#EBD9D4] pt-14 pb-20 sm:pt-20 sm:pb-28"
    >
      <div className="relative mx-auto flex min-h-[100vh] max-w-screen-2xl flex-col items-stretch px-4 lg:flex-row lg:items-end lg:gap-16 lg:px-8">
        {/* Testo a sinistra */}
        <div className="relative z-10 order-1 flex flex-col justify-center lg:order-1 lg:max-w-lg lg:pb-32">
          <ScrollReveal variant="fadeRight" delay={0.1}>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">04</p>
            <div className="mt-2 flex items-center gap-3">
              <Wine size={28} className="text-[#B8962E]" />
              <h2 className="font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
                LA CANTINA
              </h2>
            </div>
            <p className="mt-6 text-[#2C2420]/90">
              Una selezione di vini della Valpolicella e del territorio veronese, scelti per
              accompagnare ogni piatto.
            </p>
          </ScrollReveal>
          <div className="mt-10 space-y-4">
            {wines.map((wine, i) => (
              <ScrollReveal key={wine.name} variant="fadeLeft" delay={0.2 + i * 0.1}>
                <div className="border-l-2 border-[#B8962E]/40 pl-4">
                  <h3 className="font-serif text-lg font-semibold text-[#2C2420]">{wine.name}</h3>
                  <p className="mt-1 text-sm text-[#2C2420]/80">{wine.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Immagine verticale a destra — LA CANTINA in sovraimpressione, entra da sx */}
        <ScrollReveal variant="slideFromBottomOvershoot" delay={0.15} className="relative z-20 order-2 mt-12 shrink-0 lg:order-2 lg:mt-0 lg:w-[42%] lg:translate-y-20">
          <div className="relative aspect-[3/4] w-full overflow-hidden lg:min-h-[75vh]">
            <ParallaxImage
              speed={0.2}
              opacityInput={[0, 0.5]}
              opacityOutput={[0.05, 1]}
              className="relative h-full min-h-[280px] w-full lg:min-h-[75vh]"
            >
              <Image
                src="/images/cantina.jpg"
                alt="Cantina e vini"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 45vw"
                unoptimized
              />
            </ParallaxImage>
            <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-visible">
              <ScrollingDecoText
                direction="leftToRight"
                className="flex h-full min-h-full w-full min-w-full items-center justify-center font-serif text-[clamp(2.25rem,7vw,5rem)] font-semibold leading-[0.85] tracking-tight text-[#F5EDE6]/[0.26]"
              >
                LA CANTINA
              </ScrollingDecoText>
            </div>
          </div>
        </ScrollReveal>

        <div className="hidden flex-1 lg:block" aria-hidden />
      </div>
    </section>
  );
}
