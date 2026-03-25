"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type MenuPreviewItem = {
  key: string;
  label: string;
  src: string;
  alt: string;
};

const menuPreview: MenuPreviewItem[] = [
  { key: "antipasti", label: "ANTIPASTI", src: "/images/secondi.jpg", alt: "Antipasti" },
  { key: "primi", label: "PRIMI", src: "/images/cucina.jpg", alt: "Primi" },
  { key: "secondi", label: "SECONDI", src: "/images/19.jpeg", alt: "Secondi" },
  { key: "dolci", label: "DOLCI", src: "/images/dolci.jpg", alt: "Dolci" },
];

/** Meno ripetizioni su parole lunghe = archi più larghi, testo meno compresso */
const ringSegmentsByKey: Record<string, number> = {
  antipasti: 4,
  secondi: 4,
};
const DEFAULT_RING_SEGMENTS = 5;

/** Arco di cerchio da startDeg a endDeg (gradi, senso orario sullo schermo) */
function circularArcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
): string {
  const s = (startDeg * Math.PI) / 180;
  const e = (endDeg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

/** Rombo con diagonale sul raggio: vertice esterno esattamente sulla circonferenza */
function rhombusPointsOnRing(
  cx: number,
  cy: number,
  angleDeg: number,
  rOuter: number,
  rInner: number,
  halfWidth: number
): string {
  const rad = (angleDeg * Math.PI) / 180;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  const px = -uy;
  const py = ux;
  const out = { x: cx + rOuter * ux, y: cy + rOuter * uy };
  const inn = { x: cx + rInner * ux, y: cy + rInner * uy };
  const rc = (rOuter + rInner) / 2;
  const mx = cx + rc * ux;
  const my = cy + rc * uy;
  const s1 = { x: mx + halfWidth * px, y: my + halfWidth * py };
  const s2 = { x: mx - halfWidth * px, y: my - halfWidth * py };
  return `${out.x},${out.y} ${s1.x},${s1.y} ${inn.x},${inn.y} ${s2.x},${s2.y}`;
}

function RotatingCategoryRing({
  idPrefix,
  label,
  segments,
}: {
  idPrefix: string;
  label: string;
  segments: number;
}) {
  const center = 50;
  const diamondOuterR = 36.2;
  const diamondInnerR = 33.5;
  const diamondHalfW = 1.35;
  const textRadius = 30;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ willChange: "transform" }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="h-[78%] w-[78%] overflow-visible">
        <defs>
          {Array.from({ length: segments }).map((_, i) => {
            const startDeg = -90 + (i * 360) / segments;
            const endDeg = -90 + ((i + 1) * 360) / segments;
            const pathId = `${idPrefix}-arc-${i}`;
            return (
              <path
                key={pathId}
                id={pathId}
                d={circularArcPath(center, center, textRadius, startDeg, endDeg)}
                fill="none"
              />
            );
          })}
        </defs>

        {Array.from({ length: segments }).map((_, i) => {
          const diamondAngle = -90 + (i * 360) / segments;
          const pathId = `${idPrefix}-arc-${i}`;
          const rhombus = rhombusPointsOnRing(
            center,
            center,
            diamondAngle,
            diamondOuterR,
            diamondInnerR,
            diamondHalfW
          );
          return (
            <g key={`${idPrefix}-seg-${i}`}>
              <polygon points={rhombus} fill="#EBD9D4" opacity="0.95" />
              <text
                fill="#EBD9D4"
                fontSize="6.6"
                fontFamily="var(--font-playfair), Georgia, serif"
                fontWeight="600"
                letterSpacing="0.08em"
              >
                <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                  {label}
                </textPath>
              </text>
            </g>
          );
        })}
      </svg>
      <span className="absolute text-base text-[#EBD9D4]/95">+</span>
    </motion.div>
  );
}

function FallingMenuCard({
  item,
  index,
  progress,
}: {
  item: MenuPreviewItem;
  index: number;
  progress: MotionValue<number>;
}) {
  // Caduta in sequenza ma allineamento comune quando la sezione è "in focus"
  const alignAt = 0.54;
  const start = 0.18 + index * 0.07;
  const y = useTransform(progress, [0, start, alignAt, 1], [-44, -44, 0, 0]);

  return (
    <Link
      href={`/menu#${item.key}`}
      className="block rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EBD9D4]"
      aria-label={`Apri il menu: ${item.alt}`}
    >
      <motion.div style={{ y }} className="group relative aspect-[3/4] overflow-hidden rounded-sm">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/25" />
        <RotatingCategoryRing
          idPrefix={`menu-ring-${item.key}`}
          label={item.label}
          segments={ringSegmentsByKey[item.key] ?? DEFAULT_RING_SEGMENTS}
        />
      </motion.div>
    </Link>
  );
}

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-[#EBD9D4] pt-20 pb-14 sm:pt-28 sm:pb-20"
    >
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-8">
        <ScrollReveal duration={0.9}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">02</p>
          <h2 className="mt-2 font-serif text-5xl font-semibold text-[#2C2420] sm:text-6xl">MENU</h2>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {menuPreview.map((item, index) => (
            <ScrollReveal key={item.key} variant="fadeUp" delay={index * 0.06} duration={0.7}>
              <FallingMenuCard item={item} index={index} progress={scrollYProgress} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 text-left md:text-center">
            <Link
              href="/menu"
              className="inline-block text-sm font-semibold uppercase tracking-[0.22em] text-[#2C2420] transition-colors hover:text-[#B8962E]"
            >
              ⬧ SCOPRI IL MENU ⬧
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
