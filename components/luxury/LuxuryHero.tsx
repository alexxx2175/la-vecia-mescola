"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function LuxuryHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image con overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src="/images/tavola-elegante-rosa-rossa-cristalli-affresco-la-vecia-mescola.jpg"
          alt="La Vecia Mescola — Cucina veneta nel cuore di Verona"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#EBD9D4] via-[#EBD9D4]/80 to-transparent" />
      </motion.div>

      {/* Contenuto centrale */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          className="text-5xl font-semibold leading-[1.1] tracking-tight text-white italic sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-viva)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          La Vecia Mescola
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-white/90 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Cucina veneta autentica nel cuore di Verona.
        </motion.p>

        {/* Separatore ⬧ MENU ⬧ */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
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
    </section>
  );
}
