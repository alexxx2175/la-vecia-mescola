"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#concept", label: "Concept" },
  { href: "#cucina", label: "La Cucina" },
  { href: "#cantina", label: "La Cantina" },
  { href: "#territorio", label: "Pasto & Presente" },
];

export function VerticalNav() {
  return (
    <motion.nav
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 lg:flex"
      aria-label="Navigazione sezioni"
    >
      {links.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          className="font-serif text-sm font-medium uppercase tracking-[0.2em] text-[#2C2420]/70 transition-colors hover:text-[#B8962E]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          whileHover={{ x: -6, color: "#B8962E" }}
          transition={{ duration: 0.3 }}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.nav>
  );
}
