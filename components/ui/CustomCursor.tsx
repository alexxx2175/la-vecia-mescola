"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  const onMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    // Disable custom cursor for reduced motion or touch devices
    if (prefersReduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setActive(true);
    document.documentElement.style.cursor = "none";

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='tab'], [role='button']")) {
        setHovering(true);
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='tab'], [role='button']")) {
        setHovering(false);
      }
    };

    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [prefersReduced, onMouseMove, onMouseLeave]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]" aria-hidden>
      <motion.div
        className="fixed left-0 top-0 rounded-full mix-blend-difference"
        animate={{
          x: position.x - (hovering ? 20 : 5),
          y: position.y - (hovering ? 20 : 5),
          width: hovering ? 40 : 10,
          height: hovering ? 40 : 10,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          x: { duration: 0.08, ease: "linear" },
          y: { duration: 0.08, ease: "linear" },
          width: { duration: 0.2, ease: "easeOut" as const },
          height: { duration: 0.2, ease: "easeOut" as const },
          opacity: { duration: 0.15 },
        }}
        style={{
          backgroundColor: "#C4602A",
          willChange: "transform",
        }}
      />
    </div>
  );
}
