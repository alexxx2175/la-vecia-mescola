"use client";

import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollingDecoText } from "@/components/ui/ScrollingDecoText";

/**
 * Layout Quay House: immagine verticale a sx, testo a dx — staggered
 */
export function CucinaSection() {
  return (
    <section
      id="cucina"
      className="relative min-h-[120vh] overflow-hidden bg-[#EBD9D4] pt-14 pb-7 sm:pt-20 sm:pb-10"
    >
      <div className="relative mx-auto flex min-h-[100vh] max-w-screen-2xl flex-col items-stretch px-4 lg:flex-row lg:items-end lg:gap-16 lg:px-8">
        {/* Testo decorativo — scorre sotto l'immagine */}
        <div className="absolute inset-0 z-0 flex min-h-full items-center justify-center overflow-visible">
          <ScrollingDecoText className="font-serif text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.85] tracking-tight text-[#2C2420]/[0.08]">
            LA CUCINA
          </ScrollingDecoText>
        </div>

        {/* Immagine verticale a sinistra — leggermente più in alto */}
        <ScrollReveal variant="slideFromBottomOvershoot" delay={0} className="relative z-20 order-2 shrink-0 lg:order-1 lg:w-[42%] lg:-translate-y-16">
          <ParallaxImage speed={0.2} className="relative aspect-[3/4] w-full overflow-hidden lg:min-h-[75vh]">
            <Image
              src="/images/bigoli-ragu-pasta-fatta-in-casa-la-vecia-mescola-verona.jpg"
              alt="Cucina veneta tradizionale"
              fill
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 45vw"
              unoptimized
            />
          </ParallaxImage>
        </ScrollReveal>

        {/* Testo a destra */}
        <div className="relative z-10 order-1 flex flex-col justify-center lg:order-2 lg:max-w-lg lg:pb-20">
          <ScrollReveal variant="fadeLeft" delay={0.1}>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">03</p>
            <div className="mt-2 flex items-center gap-3">
              <UtensilsCrossed size={28} className="text-[#B8962E]" />
              <h2 className="font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
                LA CUCINA
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-10 space-y-6">
            <ScrollReveal variant="fadeLeft" delay={0.2}>
              <h3 className="font-serif text-2xl font-semibold text-[#2C2420]">Pasta Fresca</h3>
              <p className="mt-2 text-[#2C2420]/90">
                Fatta in casa ogni giorno con farine selezionate e uova fresche. Bigoli, pappardelle,
                tagliolini — la tradizione veneta nel piatto.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fadeLeft" delay={0.3}>
              <h3 className="font-serif text-2xl font-semibold text-[#2C2420]">Risotto all&apos;Amarone</h3>
              <p className="mt-2 text-[#2C2420]/90">
                Il nostro piatto simbolo: riso Vialone Nano mantecato con Amarone della Valpolicella,
                radicchio e fonduta veneta.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fadeLeft" delay={0.4}>
              <h3 className="font-serif text-2xl font-semibold text-[#2C2420]">Ingredienti Freschi</h3>
              <p className="mt-2 text-[#2C2420]/90">
                Materie prime locali e di stagione dal territorio veronese.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
