"use client";

import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Sezione Contatti — stile Quay House
 * Orari dal sito: Lun–Dom 12:00–14:30 / 19:00–22:30 (Ven/Sab 23:00, Dom 22:00)
 */
export function ContactSection() {
  return (
    <section
      id="contatti"
      className="relative z-10 bg-[#EBD9D4] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal duration={0.9}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">
            07
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
            CONTATTI
          </h2>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#2C2420]/70">
            Get in touch
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <a
              href="tel:+390458036608"
              className="flex items-center gap-4 transition-colors hover:text-[#8B4513]"
            >
              <Phone size={24} className="text-[#B8962E]" />
              <span className="text-lg text-[#2C2420]">+39 045 8036608</span>
            </a>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <Link
              href="https://www.google.com/maps/place/Vicolo+Chiodo+4,+37121+Verona+VR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 transition-colors hover:text-[#8B4513]"
            >
              <MapPin size={24} className="mt-0.5 shrink-0 text-[#B8962E]" />
              <div className="text-[#2C2420]">
                <p>Vicolo Chiodo 4</p>
                <p>37121 Verona (VR)</p>
              </div>
            </Link>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="text-[#2C2420]">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#2C2420]/70">
                Orari
              </p>
              <p className="mt-2">Lun–Gio: 12:00–14:30 / 19:00–22:30</p>
              <p>Ven–Sab: 12:00–14:30 / 19:00–23:00</p>
              <p>Dom: 12:00–14:30 / 19:00–22:00</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
