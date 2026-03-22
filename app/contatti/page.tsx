import type { Metadata } from "next";
import {
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contatti — La Vecia Mescola | Ristorante Verona",
  description:
    "Contattaci o prenota un tavolo. La Vecia Mescola, Vicolo Chiodo 4, 37121 Verona. Telefono: +39 045 8036608.",
};

const hours = [
  { day: "Lunedì", lunch: "12:00 – 14:30", dinner: "19:00 – 22:30" },
  { day: "Martedì", lunch: "12:00 – 14:30", dinner: "19:00 – 22:30" },
  { day: "Mercoledì", lunch: "12:00 – 14:30", dinner: "19:00 – 22:30" },
  { day: "Giovedì", lunch: "12:00 – 14:30", dinner: "19:00 – 22:30" },
  { day: "Venerdì", lunch: "12:00 – 14:30", dinner: "19:00 – 23:00" },
  { day: "Sabato", lunch: "12:00 – 14:30", dinner: "19:00 – 23:00" },
  { day: "Domenica", lunch: "12:00 – 14:30", dinner: "19:00 – 22:00" },
] as const;

export default function ContattiPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#EBD9D4] pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
            Contatti
          </h1>
          <div className="mx-auto mt-4 h-px w-16 bg-[#B8962E]/60" />
        </div>
      </section>

      {/* Map */}
      <section className="bg-[#EBD9D4]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <ScrollReveal>
            <div className="overflow-hidden rounded-lg">
              <iframe
                title="La Vecia Mescola — Vicolo Chiodo 4, Verona"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.1!2d10.9924!3d45.4399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f5f46a6b5c0e5%3A0x0!2sVicolo+Chiodo+4%2C+37121+Verona+VR!5e0!3m2!1sit!2sit!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Info Grid */}
      <section className="bg-[#EBD9D4] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Address */}
            <ScrollReveal>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B8962E]/20">
                  <MapPin size={22} className="text-[#B8962E]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#2C2420]">
                  Dove Siamo
                </h2>
                <p className="text-[#2C2420]/80">
                  Vicolo Chiodo 4<br />
                  37121 Verona (VR)<br />
                  Italia
                </p>
              </div>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B8962E]/20">
                  <Phone size={22} className="text-[#B8962E]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#2C2420]">
                  Telefono
                </h2>
                <a
                  href="tel:+390458036608"
                  className="inline-flex min-h-[48px] items-center text-lg text-[#B8962E] transition-colors hover:text-[#8B4513]"
                >
                  +39 045 8036608
                </a>
              </div>
            </ScrollReveal>

            {/* Reservation */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B8962E]/20">
                  <MessageCircle size={22} className="text-[#B8962E]" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#2C2420]">
                  Prenotazioni
                </h2>
                <p className="text-[#2C2420]/80">
                  Per prenotazioni chiamare o scrivere su WhatsApp
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Hours Table */}
          <ScrollReveal>
            <div className="mt-20">
              <div className="flex items-center gap-3">
                <Clock size={22} className="text-[#B8962E]" />
                <h2 className="font-serif text-2xl font-semibold text-[#2C2420]">
                  Orari di Apertura
                </h2>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2C2420]/10">
                      <th className="py-3 pr-6 text-left font-semibold uppercase tracking-wider text-[#B8962E] text-xs">
                        Giorno
                      </th>
                      <th className="py-3 pr-6 text-left font-semibold uppercase tracking-wider text-[#B8962E] text-xs">
                        Pranzo
                      </th>
                      <th className="py-3 text-left font-semibold uppercase tracking-wider text-[#B8962E] text-xs">
                        Cena
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hours.map((row) => (
                      <tr
                        key={row.day}
                        className="border-b border-[#2C2420]/5"
                      >
                        <td className="py-3 pr-6 font-medium text-[#2C2420]">
                          {row.day}
                        </td>
                        <td className="py-3 pr-6 text-[#2C2420]/80">
                          {row.lunch}
                        </td>
                        <td className="py-3 text-[#2C2420]/80">
                          {row.dinner}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* Social */}
          <ScrollReveal>
            <div className="mt-16 flex items-center gap-6">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#2C2420]/60">
                Seguici
              </span>
              <a
                href="https://www.facebook.com/laveciamescola"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="min-h-[48px] min-w-[48px] flex items-center justify-center text-[#2C2420]/70 transition-colors hover:text-[#B8962E]"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/laveciamescola"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="min-h-[48px] min-w-[48px] flex items-center justify-center text-[#2C2420]/70 transition-colors hover:text-[#B8962E]"
              >
                <Instagram size={24} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
