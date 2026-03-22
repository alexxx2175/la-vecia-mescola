"use client";

import { motion } from "framer-motion";
import type { Language } from "@/data/types";

interface LanguageToggleProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
}

export function LanguageToggle({ lang, onLangChange }: LanguageToggleProps) {
  return (
    <div className="flex gap-1">
      {(["it", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onLangChange(l)}
          className="relative px-2 py-1 text-sm font-medium uppercase tracking-wider transition-colors duration-200 hover:text-[#2C2420] focus:outline-none focus:ring-2 focus:ring-[#B8962E] focus:ring-offset-2 focus:ring-offset-[#EBD9D4]"
          aria-pressed={lang === l}
          aria-label={l === "it" ? "Italiano" : "English"}
          style={{
            color: lang === l ? "#B8962E" : "rgba(44, 36, 32, 0.8)",
          }}
        >
          {l.toUpperCase()}
          {lang === l && (
            <motion.span
              layoutId="lang-indicator"
              className="absolute inset-x-0.5 -bottom-0.5 h-0.5 rounded-full bg-[#B8962E]"
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
