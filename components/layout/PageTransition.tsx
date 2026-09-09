"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useIsClient } from "@/lib/use-client-value";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Dissolvenza solo nelle navigazioni client (key = pathname). Al primo
 * caricamento l'HTML non ha opacity:0 inline: il contenuto è visibile ai crawler
 * e a chi ha JavaScript disattivato.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const isClient = useIsClient();

  return (
    <motion.div
      key={pathname}
      initial={isClient ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
