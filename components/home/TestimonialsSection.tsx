"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    name: "Rossella",
    text: "Cura dei dettagli estetici e soprattutto della qualità. Assolutamente consigliato, specialmente per il famoso risotto all'Amarone.",
  },
  {
    name: "Giuseppe",
    text: "Il locale è a pochi passi da Piazza Bra, ci hanno fatto sentire in famiglia e gustare delle ottime pietanze.",
  },
  {
    name: "Marco",
    text: "Ottima scelta per una cena romantica nella città dell'amore.",
  },
] as const;

function AnimatedStars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, j) => (
        <motion.div
          key={j}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: j * 0.1,
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Star size={14} className="fill-gold text-gold" />
        </motion.div>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative z-10 overflow-hidden py-24 sm:py-32">
      {/* Background decorative image */}
      <div className="absolute inset-0">
        <Image
          src="/images/tiramisu-artigianale-dolce-ristorante-la-vecia-mescola-verona.jpg"
          alt="Dolci della casa — house desserts"
          fill
          loading="lazy"
          className="object-cover opacity-10"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Recensioni
          </p>
          <div className="mx-auto mt-2 max-w-2xl text-center">
            <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              I Nostri Ospiti
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold/60" />
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll snap / Desktop: grid */}
        <div className="mt-16 -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
            {testimonials.map((t, i) => (
              <ScrollReveal
                key={t.name}
                delay={i * 0.15}
                className="w-[85vw] shrink-0 snap-center sm:w-auto"
              >
                <motion.div
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="h-full rounded-lg border border-foreground/10 bg-white/60 backdrop-blur-sm p-8 transition-all duration-500 ease-out hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10"
                >
                  <Quote size={24} className="text-gold/40" />
                  <p className="mt-4 text-sm italic leading-relaxed text-foreground/80">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <AnimatedStars />
                    <span className="text-sm font-semibold text-foreground">
                      — {t.name}
                    </span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
