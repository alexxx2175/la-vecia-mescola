"use client";

import { motion } from "framer-motion";
import type { Language } from "@/data/types";
import { LANGUAGES, LANGUAGE_FLAGS, LANGUAGE_LABELS } from "@/data/types";

interface LanguageToggleProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
}

export function LanguageToggle({ lang, onLangChange }: LanguageToggleProps) {
  return (
    <div className="scrollbar-hide -mx-2 flex overflow-x-auto px-2 sm:mx-0 sm:overflow-visible sm:px-0">
      <div className="flex gap-0.5">
        {LANGUAGES.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => onLangChange(l)}
            className="relative flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#B8962E] focus:ring-offset-2 focus:ring-offset-[#EBD9D4]"
            aria-pressed={lang === l}
            aria-label={LANGUAGE_LABELS[l]}
            style={{
              opacity: lang === l ? 1 : 0.5,
              transform: lang === l ? "scale(1.15)" : "scale(1)",
            }}
          >
            <span aria-hidden>{LANGUAGE_FLAGS[l]}</span>
            {lang === l && (
              <motion.span
                layoutId="lang-indicator"
                className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-[#B8962E]"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
