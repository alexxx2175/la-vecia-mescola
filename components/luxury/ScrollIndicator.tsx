"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  const opacity = useTransform(scrollY, [0, 80], [1, 0]);
  const y = useTransform(scrollY, [0, 80], [0, 20]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => {
      if (v > 50) setHasScrolled(true);
    });
    return () => unsub();
  }, [scrollY]);

  if (hasScrolled) return null;

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-10 left-1/2 z-30 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#2C2420]/60">
          Scorri
        </span>
        <div className="h-10 w-6 rounded-full border-2 border-[#B8962E]/40 p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mx-auto h-1.5 w-1 rounded-full bg-[#B8962E]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
