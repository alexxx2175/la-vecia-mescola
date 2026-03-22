"use client";

import Image from "next/image";
import { Wine } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const wines = [
  {
    name: "Amarone della Valpolicella",
    description:
      "Il re dei vini veronesi. Rosso intenso, corposo e avvolgente.",
  },
  {
    name: "Soave Classico",
    description: "Bianco elegante dai Colli Scaligeri. Fresco e minerale.",
  },
  {
    name: "Valpolicella Ripasso",
    description:
      "Strutturato e morbido, eccellente con secondi di carne.",
  },
] as const;

export function CantinaSection() {
  return (
    <section id="cantina" className="relative z-10 bg-[#EBD9D4] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <ScrollReveal variant="slideFromBottomOvershoot" delay={0.05}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
              <Image
                src="/images/cantina.jpg"
                alt="Cantina e vini"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal variant="fadeRight">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">
                04
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Wine size={28} className="text-[#B8962E]" />
                <h2 className="font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
                  LA CANTINA
                </h2>
              </div>
              <p className="mt-6 text-[#2C2420]/90">
                Una selezione di vini della Valpolicella e del territorio
                veronese, scelti per accompagnare ogni piatto.
              </p>
            </ScrollReveal>

            <div className="mt-10 space-y-4">
              {wines.map((wine, i) => (
                <ScrollReveal key={wine.name} variant="fadeLeft" delay={i * 0.1}>
                  <div className="border-l-2 border-[#B8962E]/40 pl-4">
                    <h3 className="font-serif text-lg font-semibold text-[#2C2420]">
                      {wine.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#2C2420]/80">
                      {wine.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
