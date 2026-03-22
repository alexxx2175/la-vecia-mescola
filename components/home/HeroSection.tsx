"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const QUAY_EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative z-10 flex min-h-svh items-center justify-center overflow-hidden">
      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: QUAY_EASE }}
          className="absolute inset-0"
        >
          <Image
            src="/images/19.jpeg"
            alt="La Vecia Mescola — Cucina veneta nel cuore di Verona"
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </div>

      {/* Dark overlay per leggibilità testo su foto */}
      <div className="absolute inset-0 z-[1] bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-[#EBD9D4] via-[#EBD9D4]/80 to-transparent" />

      {/* Content — stile Quay House */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: QUAY_EASE }}
          className="font-serif text-5xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          La Vecia Mescola
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: QUAY_EASE }}
          className="mt-4 text-lg text-white/90 sm:text-xl"
        >
          Cucina veneta autentica nel cuore di Verona.
        </motion.p>

        {/* Separatore Quay House: ⬧ MENU ⬧ */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: QUAY_EASE }}
          className="mx-auto mt-10 flex origin-center items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-white/50" />
          <Link
            href="/menu"
            className="text-sm font-medium uppercase tracking-[0.35em] text-white transition-colors duration-300 hover:text-white/90"
          >
            Menu
          </Link>
          <span className="h-px w-12 bg-white/50" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
            Scorri
          </span>
          <div className="h-8 w-5 rounded-full border-2 border-white/40 p-1">
            <div className="mx-auto h-1.5 w-1 rounded-full bg-white/70" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
