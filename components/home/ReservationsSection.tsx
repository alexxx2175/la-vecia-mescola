"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Sezione Prenotazioni — stile Quay House "CONTACT US TO RESERVE"
 */
export function ReservationsSection() {
  return (
    <section
      id="prenotazioni"
      className="relative z-10 bg-[#EBD9D4] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <ScrollReveal duration={0.9}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">
            05
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
            PRENOTAZIONI
          </h2>
          <Link
            href="tel:+390458036608"
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-[#2C2420] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#EBD9D4] transition-colors hover:bg-[#3d3630]"
          >
            <Phone size={18} />
            CONTATTACI PER PRENOTARE
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
