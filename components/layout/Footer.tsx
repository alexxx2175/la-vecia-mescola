"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Footer — stile Quay House
 */
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#2C2420]/10 bg-[#E5D3CE]">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        className="h-px origin-left bg-[#B8962E]/40"
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/">
              <Image
                src="/images/cropped-logo-Low.png"
                alt="La Vecia Mescola Dell'Oste"
                width={140}
                height={52}
                className="h-10 w-auto"
                unoptimized
              />
            </Link>
            <p className="mt-3 text-sm text-[#2C2420]/80">
              Cucina veneta autentica nel cuore di Verona, a due passi
              dall&apos;Arena.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#B8962E]">
              Contatti
            </h4>
            <div className="flex items-start gap-3 text-sm text-[#2C2420]/90">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span>Vicolo Chiodo 4, 37121 Verona (VR)</span>
            </div>
            <a
              href="tel:+390458036608"
              className="flex items-center gap-3 text-sm text-[#2C2420]/90 transition-colors hover:text-[#2C2420]"
            >
              <Phone size={18} className="shrink-0" />
              +39 045 8036608
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#B8962E]">
              Orari
            </h4>
            <div className="space-y-1 text-sm text-[#2C2420]/90">
              <p>Lun–Gio: 12:00–14:30 / 19:00–22:30</p>
              <p>Ven–Sab: 12:00–14:30 / 19:00–23:00</p>
              <p>Dom: 12:00–14:30 / 19:00–22:00</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#B8962E]">
              Naviga
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/#concept" className="text-[#2C2420]/80 transition-colors hover:text-[#2C2420]">01 Concept</Link>
              <Link href="/menu" className="text-[#2C2420]/80 transition-colors hover:text-[#2C2420]">02 Menu</Link>
              <Link href="/#cucina" className="text-[#2C2420]/80 transition-colors hover:text-[#2C2420]">03 La Cucina</Link>
              <Link href="/#cantina" className="text-[#2C2420]/80 transition-colors hover:text-[#2C2420]">04 La Cantina</Link>
              <Link href="/#prenotazioni" className="text-[#2C2420]/80 transition-colors hover:text-[#2C2420]">05 Prenotazioni</Link>
              <Link href="/#gallery" className="text-[#2C2420]/80 transition-colors hover:text-[#2C2420]">06 Gallery</Link>
              <Link href="/contatti" className="text-[#2C2420]/80 transition-colors hover:text-[#2C2420]">07 Contatti</Link>
            </nav>
            <div className="flex items-center gap-2 pt-2 text-xs uppercase tracking-wider text-[#2C2420]/60">
              <span>Seguici</span>
              <a href="https://wa.me/390458036608" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-[#B8962E]">WhatsApp</a>
              <span className="text-[#B8962E]/50">⬧</span>
              <a href="https://www.instagram.com/laveciamescola" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-[#B8962E]">Instagram</a>
              <span className="text-[#B8962E]/50">⬧</span>
              <a href="https://www.facebook.com/laveciamescola" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-colors hover:text-[#B8962E]">Facebook</a>
            </div>
            <div className="flex gap-4 pt-2">
              <motion.a
                href="https://wa.me/390458036608"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                whileHover={{ y: -3 }}
                className="text-[#2C2420]/60 transition-colors hover:text-[#2C2420]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://www.facebook.com/laveciamescola"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                whileHover={{ y: -3 }}
                className="text-[#2C2420]/60 transition-colors hover:text-[#2C2420]"
              >
                <Facebook size={22} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/laveciamescola"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ y: -3 }}
                className="text-[#2C2420]/60 transition-colors hover:text-[#2C2420]"
              >
                <Instagram size={22} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#2C2420]/10 pt-6 text-center text-xs text-[#2C2420]/50">
          © {new Date().getFullYear()} La Vecia Mescola — Powered by CT Marketing
        </div>
      </div>
    </footer>
  );
}
