"use client";

import { motion } from "framer-motion";

/**
 * Cerchio "PRENOTA UN TAVOLO" che ruota — stile Quay House (grande, serif leggibile)
 */
export function RotatingReserveBadge() {
  return (
    <a
      href="tel:+393928699275"
      className="fixed right-6 top-24 z-50 hidden lg:block"
      aria-label="Prenota un tavolo"
    >
      <motion.div
        className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full border-2 border-[#2C2420]/20 bg-[#EBD9D4] shadow-xl lg:h-52 lg:w-52"
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute h-[85%] w-[85%]"
          style={{ overflow: "visible" }}
        >
          <defs>
            <path
              id="reserveCircle"
              d="M 50, 50 m -40, 0 a 40, 40 0 1, 1 80, 0 a 40, 40 0 1, 1 -80, 0"
            />
          </defs>
          <text
            fill="#2C2420"
            fontSize="9"
            fontFamily="var(--font-playfair), Georgia, serif"
            fontWeight="600"
            letterSpacing="0.05em"
          >
            <textPath href="#reserveCircle" startOffset="0">
              PRENOTA UN TAVOLO ⬧ PRENOTA UN TAVOLO ⬧
            </textPath>
          </text>
        </svg>
        <span className="text-[#B8962E] text-2xl lg:text-3xl">⬧</span>
      </motion.div>
    </a>
  );
}
