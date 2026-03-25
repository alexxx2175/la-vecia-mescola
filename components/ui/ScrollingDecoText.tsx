"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollingDecoTextProps {
  children: React.ReactNode;
  className?: string;
  /** "down" = scorre verso il basso | "leftToRight" = entra da sinistra a destra | "rightToLeft" = entra da destra a sinistra */
  direction?: "down" | "leftToRight" | "rightToLeft";
}

/**
 * Testo decorativo: down / leftToRight / rightToLeft
 */
export function ScrollingDecoText({
  children,
  className = "",
  direction = "down",
}: ScrollingDecoTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* ~30% più lento: keyframe spread su più scroll */
  const y = useTransform(
    scrollYProgress,
    [0, 0.32, 0.58, 0.82, 1],
    [0, 60, 140, 220, 300]
  );

  const xLeftToRight = useTransform(
    scrollYProgress,
    [0, 0.2, 0.48, 0.72, 1],
    [-320, -100, 0, 60, 150]
  );

  /** Entrata da sx: fade-in in trasparenza mentre scorre */
  const opacityLeftToRight = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.45, 1],
    [0, 0.35, 0.75, 1, 1]
  );

  const xRightToLeft = useTransform(
    scrollYProgress,
    [0, 0.2, 0.48, 0.72, 1],
    [320, 100, 0, -60, -150]
  );

  const style =
    direction === "leftToRight"
      ? { x: xLeftToRight, opacity: opacityLeftToRight }
      : direction === "rightToLeft"
        ? { x: xRightToLeft }
        : { y };

  return (
    <motion.div
      ref={ref}
      style={style}
      className={`pointer-events-none flex select-none items-center justify-center ${className}`}
      aria-hidden
    >
      {children}
    </motion.div>
  );
}
