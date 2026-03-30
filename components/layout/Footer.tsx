"use client";

import Link from "next/link";
import { MapPin, Phone, Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
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

      <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="dark" className="text-2xl lg:text-[1.75rem]" asLink />
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
              href="tel:+393928699275"
              className="flex items-center gap-3 text-sm text-[#2C2420]/90 transition-colors hover:text-[#2C2420]"
            >
              <Phone size={18} className="shrink-0" />
              +39 392 869 9275
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#B8962E]">
              Orari
            </h4>
            <div className="space-y-1 text-sm text-[#2C2420]/90">
              <p>Lun: 12:00–23:30</p>
              <p>Mar–Gio: 12:00–22:30</p>
              <p>Ven–Sab: 12:00–23:00</p>
              <p>Dom: 12:00–22:00</p>
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
              <Link href="/arena" className="text-[#2C2420]/80 transition-colors hover:text-[#2C2420]">08 Arena</Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-[#2C2420]/10 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-xs font-medium uppercase tracking-wider text-[#2C2420]/60">
            <span>Seguici su</span>
            <a
              href="https://wa.me/393928699275"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#B8962E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E5D3CE]"
            >
              WhatsApp
            </a>
            <span className="text-[#B8962E]/50">⬧</span>
            <a
              href="https://www.instagram.com/laveciamescola"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#B8962E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E5D3CE]"
            >
              Instagram
            </a>
            <span className="text-[#B8962E]/50">⬧</span>
            <a
              href="https://www.facebook.com/people/La-Vecia-Mescola/100046353020148/?sk=about&locale=it_IT"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#B8962E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E5D3CE]"
            >
              Facebook
            </a>
          </div>

          <div className="mt-4 text-center text-xs text-[#2C2420]/50">
            © {new Date().getFullYear()} La Vecia Mescola — Powered by CT Marketing
          </div>
        </div>
      </div>
    </footer>
  );
}
