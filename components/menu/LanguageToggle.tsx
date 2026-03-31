"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Language } from "@/data/types";
import { LANGUAGES, LANGUAGE_FLAGS, LANGUAGE_LABELS } from "@/data/types";

interface LanguageToggleProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
}

export function LanguageToggle({ lang, onLangChange }: LanguageToggleProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative z-[100]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[48px] items-center gap-2 rounded-lg border border-[#B8962E]/30 bg-[#F5F0E8] px-3 py-2 text-sm font-medium text-[#2C2420] shadow-sm transition-colors hover:border-[#B8962E]/60 focus:outline-none focus:ring-2 focus:ring-[#B8962E] focus:ring-offset-2 focus:ring-offset-[#EBD9D4]"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${LANGUAGE_LABELS[lang]}`}
      >
        <span className="text-lg" aria-hidden>{LANGUAGE_FLAGS[lang]}</span>
        <span className="uppercase tracking-wider">{lang}</span>
        <ChevronDown
          className="size-4 text-[#2C2420]/60 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-[#B8962E]/30 bg-[#F5F0E8] shadow-lg"
          >
            {LANGUAGES.map((l) => (
              <li key={l} role="option" aria-selected={lang === l}>
                <button
                  type="button"
                  onClick={() => {
                    onLangChange(l);
                    setOpen(false);
                  }}
                  className={`flex min-h-[48px] w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    lang === l
                      ? "bg-[#B8962E]/10 font-semibold text-[#B8962E]"
                      : "text-[#2C2420] hover:bg-[#B8962E]/5"
                  }`}
                >
                  <span className="text-lg" aria-hidden>{LANGUAGE_FLAGS[l]}</span>
                  <span>{LANGUAGE_LABELS[l]}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
