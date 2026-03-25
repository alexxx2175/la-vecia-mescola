"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxImageProps {
  children: ReactNode;
  /** Velocità parallax: valori positivi = immagine si muove più lenta dello scroll */
  speed?: number;
  className?: string;
  /** Mappa opacità personalizzata in base allo scroll */
  opacityInput?: number[];
  opacityOutput?: number[];
}

export function ParallaxImage({
  children,
  speed = 0.15,
  className = "",
  opacityInput = [0, 0.25, 0.5],
  opacityOutput = [0.1, 0.55, 1],
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80 * speed, 0, -80 * speed]);
  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
