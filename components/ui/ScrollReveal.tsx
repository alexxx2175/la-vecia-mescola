"use client";

import { type ReactNode, useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "zoomIn" | "slideFromBottom" | "slideFromBottomOvershoot" | "slideFromBottomOvershootPast";

const variantMap: Record<
  RevealVariant,
  { hidden: Record<string, number>; visible: Record<string, number>; transition?: object }
> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideFromBottom: {
    hidden: { opacity: 0, y: 100, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  slideFromBottomOvershoot: {
    hidden: { opacity: 0.5, y: 180 },
    visible: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 55, damping: 12 },
  },
  // Sale da sotto, supera il testo (overshoot in alto), torna a posizione
  slideFromBottomOvershootPast: {
    hidden: { opacity: 0.6, y: 280 },
    visible: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 45, damping: 9 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -150 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

const QUAY_EASE = [0.25, 0.1, 0.25, 1] as const;

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  duration = 0.07,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const v = variantMap[variant];

  // Defer client-only render to avoid hydration mismatch (server has no motion styles)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReduced || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, prefersReduced]);

  // Server + initial client: plain div (no motion styles) — prevents hydration mismatch
  if (!mounted || prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={v.hidden}
      animate={inView ? v.visible : v.hidden}
      transition={
        v.transition
          ? { ...v.transition, delay }
          : { duration, ease: QUAY_EASE, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
