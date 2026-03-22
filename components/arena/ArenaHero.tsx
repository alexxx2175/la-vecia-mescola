"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const title = "A Due Passi dall'Arena di Verona";

export function ArenaHero() {
  return (
    <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-[#1A1A18]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1A1A18]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm uppercase tracking-[0.3em] text-accent"
        >
          A soli 200 metri
        </motion.p>

        {/* Title — character-by-character stagger */}
        <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
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
                className={`inline-block ${
                  i >= title.indexOf("Arena")
                    ? "text-gold"
                    : ""
                }`}
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
          className="mx-auto mt-6 h-12 w-12 opacity-20"
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
          className="mx-auto mt-4 max-w-xl text-lg text-foreground/70"
        >
          Cena da noi prima dello spettacolo — Vicolo Chiodo 4, a 200 metri
          dall&apos;Arena
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10"
        >
          <a
            href="tel:+390458036608"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-sm bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-accent-hover"
          >
            <Phone size={16} />
            Prenota il Tavolo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
