"use client";

import { motion } from "framer-motion";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";
import { openChatbot } from "@/components/ui/ChatbotWidget";

export function ArenaHero({
  title: titleProp,
  kicker: kickerProp,
  subtitle: subtitleProp,
}: {
  title?: string;
  kicker?: string;
  subtitle?: string;
}) {
  const { lang } = useSiteLanguage();
  const title = titleProp ?? t(translations.arena.title, lang);
  const kicker = kickerProp ?? t(translations.arena.kicker, lang);
  const subtitle = subtitleProp ?? t(translations.arena.subtitle, lang);
  return (
    <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-[#EBD9D4]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EBD9D4] via-[#EBD9D4]/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm uppercase tracking-[0.3em] text-[#B8962E]"
        >
          {kicker}
        </motion.p>

        {/* Title — character-by-character stagger */}
        <h1 className="mt-6 font-viva text-5xl font-semibold leading-tight text-[#2C2420] sm:text-6xl lg:text-7xl">
          <span className="sr-only">{title}</span>
          <span aria-hidden="true" className="inline-block">
            {title.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.4 + i * 0.03,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="inline-block"
                style={char === " " ? { width: "0.3em" } : undefined}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Decorative rotating Arena silhouette */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="mx-auto mt-6 h-12 w-12 opacity-25"
        >
          <svg viewBox="0 0 100 100" fill="none" className="text-gold">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 50 + 35 * Math.cos(angle);
              const y1 = 50 + 35 * Math.sin(angle);
              const x2 = 50 + 45 * Math.cos(angle);
              const y2 = 50 + 45 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mx-auto mt-4 max-w-xl text-lg text-[#2C2420]/70"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={openChatbot}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-sm bg-[#2C2420] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#EBD9D4] transition-colors hover:bg-[#3d3630] cursor-pointer"
          >
            {t(translations.arena.cta, lang)}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
