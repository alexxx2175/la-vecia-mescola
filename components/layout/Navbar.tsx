"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { openChatbot } from "@/components/ui/ChatbotWidget";
import { Logo } from "@/components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/#concept", num: "01", label: "CONCEPT" },
  { href: "/menu", num: "02", label: "MENU" },
  { href: "/#cucina", num: "03", label: "LA CUCINA" },
  { href: "/#cantina", num: "04", label: "LA CANTINA" },
  { href: "/#prenotazioni", num: "05", label: "PRENOTAZIONI" },
  { href: "/#gallery", num: "06", label: "GALLERY" },
  { href: "/contatti", num: "07", label: "CONTATTI" },
  { href: "/arena", num: "08", label: "ARENA" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const forceScrolled = pathname === "/arena";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || forceScrolled
            ? "bg-[#EBD9D4]/95 backdrop-blur-md shadow-lg border-b border-[#2C2420]/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3 lg:px-6">
          <Logo
            variant={scrolled || forceScrolled ? "dark" : "light"}
            className="text-xl leading-tight sm:text-2xl lg:text-[1.5rem]"
            asLink
          />

          {/* Desktop nav — testo bianco in hero, scuro su rosa quando scroll */}
          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-2 py-2 text-[11px] font-medium uppercase tracking-[0.25em] transition-all duration-300 lg:text-xs lg:tracking-[0.3em] ${
                  scrolled || forceScrolled
                    ? "text-[#2C2420]/90 hover:text-[#B8962E]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                <span className={scrolled || forceScrolled ? "text-[#B8962E]" : "text-[#B8962E]/90"}>{link.num}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  {link.label}
                </span>
              </Link>
            ))}
            <motion.button
              type="button"
              onClick={openChatbot}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(184,150,46,0)",
                  "0 0 0 4px rgba(184,150,46,0.35)",
                  "0 0 0 0 rgba(184,150,46,0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className={`ml-2 inline-flex min-h-[40px] items-center gap-2 rounded px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer lg:min-h-[44px] lg:px-5 ${
                scrolled || forceScrolled
                  ? "bg-[#2C2420] text-[#EBD9D4] hover:bg-[#3d3630]"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              Prenota
            </motion.button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center transition-opacity hover:opacity-80 md:hidden ${
              scrolled || forceScrolled ? "text-[#2C2420]" : "text-white"
            }`}
            aria-label="Apri menu di navigazione"
          >
            <Menu size={26} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-[#2C2420]/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] bg-[#EBD9D4] shadow-2xl border-l border-[#2C2420]/10"
            >
              <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
                <span className="text-sm font-medium uppercase tracking-widest text-[#B8962E]">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#2C2420]"
                  aria-label="Chiudi menu"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-0 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[48px] items-center gap-2 border-l-2 border-transparent px-6 py-3 text-sm uppercase tracking-widest text-[#2C2420]/80 transition-all hover:border-[#B8962E] hover:text-[#B8962E]"
                    >
                      <span className="text-xs text-[#B8962E]">{link.num}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="mt-4 px-6"
                >
                  <button
                    type="button"
                    onClick={() => { setMobileOpen(false); openChatbot(); }}
                    className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded bg-[#2C2420] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#EBD9D4] transition-colors hover:bg-[#3d3630] cursor-pointer"
                  >
                    Prenota
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
