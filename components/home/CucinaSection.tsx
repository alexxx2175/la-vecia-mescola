"use client";

import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CucinaSection() {
  return (
    <section id="cucina" className="relative z-10 bg-[#EBD9D4] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">
            03
          </p>
          <div className="mt-2 flex items-center gap-3">
            <UtensilsCrossed size={28} className="text-[#B8962E]" />
            <h2 className="font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
              LA CUCINA
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <ScrollReveal variant="slideFromBottomOvershoot" delay={0.05}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
              <Image
                src="/images/cucina.jpg"
                alt="Cucina veneta tradizionale"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal variant="fadeLeft" delay={0.1}>
              <h3 className="font-serif text-2xl font-semibold text-[#2C2420]">
                Pasta Fresca
              </h3>
              <p className="mt-2 text-[#2C2420]/90">
                Fatta in casa ogni giorno con farine selezionate e uova fresche.
                Bigoli, pappardelle, tagliolini — la tradizione veneta nel piatto.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fadeLeft" delay={0.2}>
              <h3 className="font-serif text-2xl font-semibold text-[#2C2420]">
                Risotto all&apos;Amarone
              </h3>
              <p className="mt-2 text-[#2C2420]/90">
                Il nostro piatto simbolo: riso Vialone Nano mantecato con
                Amarone della Valpolicella, radicchio e fonduta veneta.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fadeLeft" delay={0.3}>
              <h3 className="font-serif text-2xl font-semibold text-[#2C2420]">
                Ingredienti Freschi
              </h3>
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
