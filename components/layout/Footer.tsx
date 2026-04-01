"use client";

import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { motion } from "framer-motion";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";

const NAV_LINKS = [
  { href: "/#concept", num: "01", labelKey: "concept" as const },
  { href: "/menu", num: "02", labelKey: "menu" as const },
  { href: "/#cucina", num: "03", labelKey: "cucina" as const },
  { href: "/#cantina", num: "04", labelKey: "cantina" as const },
  { href: "/#prenotazioni", num: "05", labelKey: "prenotazioni" as const },
  { href: "/#gallery", num: "06", labelKey: "gallery" as const },
  { href: "/contatti", num: "07", labelKey: "contatti" as const },
  { href: "/arena", num: "08", labelKey: "arena" as const },
] as const;

/**
 * Footer — stile Quay House
 */
export function Footer() {
  const { lang } = useSiteLanguage();

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
              {t(translations.footer.tagline, lang)}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#B8962E]">
              {t(translations.footer.contatti, lang)}
            </h4>
            <div className="flex items-start gap-3 text-sm text-[#2C2420]/90">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span>Vicolo Chiodo 4, 37121 Verona (VR)</span>
            </div>
            <a
              href="tel:+393928699275"
              className="flex min-h-[44px] items-center gap-3 text-sm text-[#2C2420]/90 transition-colors hover:text-[#2C2420]"
            >
              <Phone size={18} className="shrink-0" />
              +39 392 869 9275
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#B8962E]">
              {t(translations.footer.orari, lang)}
            </h4>
            <div className="space-y-1 text-sm text-[#2C2420]/90">
              <p>{t(translations.footer.lun, lang)}: 12:00–23:30</p>
              <p>{t(translations.footer.mar_gio, lang)}: 12:00–22:30</p>
              <p>{t(translations.footer.ven_sab, lang)}: 12:00–23:00</p>
              <p>{t(translations.footer.dom, lang)}: 12:00–22:00</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#B8962E]">
              {t(translations.footer.naviga, lang)}
            </h4>
            <nav className="flex flex-col gap-1 text-sm">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-[#2C2420]/80 transition-colors hover:text-[#2C2420]">
                  {link.num} {t(translations.nav[link.labelKey], lang)}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-[#2C2420]/10 pt-6">
          {/* Instagram prominent link */}
          <div className="mb-4 text-center">
            <a
              href="https://www.instagram.com/laveciamescola"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#B8962E] transition-colors hover:text-[#8B4513] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E5D3CE]"
            >
              {t(translations.footer.seguici, lang)} @laveciamescola
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs font-medium uppercase tracking-wider text-[#2C2420]/60">
            <a
              href="https://wa.me/393928699275"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors hover:text-[#B8962E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E5D3CE]"
            >
              WhatsApp
            </a>
            <span className="text-[#B8962E]/50">⬧</span>
            <a
              href="https://www.instagram.com/laveciamescola"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors hover:text-[#B8962E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E5D3CE]"
            >
              Instagram
            </a>
            <span className="text-[#B8962E]/50">⬧</span>
            <a
              href="https://www.facebook.com/people/La-Vecia-Mescola/100046353020148/?sk=about&locale=it_IT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors hover:text-[#B8962E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E5D3CE]"
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
