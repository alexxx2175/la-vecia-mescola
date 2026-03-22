"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CircularMenu() {
  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed right-8 top-8 z-50 hidden lg:block"
    >
      <Link href="#concept" aria-label="Reserve your table">
        <motion.div
        className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#d4af37]/40 bg-[#1a3a3a]/95 shadow-xl backdrop-blur-sm"
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="text-center font-serif text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
          Reserve
        </span>
      </motion.div>
      </Link>
    </motion.div>
  );
}
