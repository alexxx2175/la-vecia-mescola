"use client";

import Image from "next/image";
import { Landmark, MapPin, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const highlights = [
  {
    icon: Heart,
    title: "Locale Intimo",
    text: "Un ambiente caldo e accogliente dove sentirsi a casa. Mattoni a vista, luci soffuse e un servizio attento che fa la differenza.",
  },
  {
    icon: MapPin,
    title: "Centro Storico",
    text: "In Vicolo Chiodo 4, nel cuore pulsante di Verona. A pochi passi da Piazza Bra, Piazza delle Erbe e i monumenti più amati della città.",
  },
  {
    icon: Landmark,
    title: "Vicino all'Arena",
    text: "A soli 200 metri dall'Arena di Verona. La scelta ideale per una cena prima dello spettacolo o dopo una passeggiata serale.",
  },
] as const;

export function AtmosferaSection() {
  return (
    <section className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
        {/* Section enters with zoom */}
        <ScrollReveal variant="zoomIn">
          <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Dove Siamo
          </p>
          <div className="mx-auto mt-2 max-w-2xl text-center">
            <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              L&apos;Atmosfera
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
              unoptimized
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
