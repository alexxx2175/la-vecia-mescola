"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface LuxurySectionProps {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  bgVariant?: "default" | "alt";
}

export function LuxurySection({
  id,
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  bgVariant = "default",
}: LuxurySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px", amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  const bgClass = bgVariant === "alt" ? "bg-[#E5D3CE]" : "bg-[#EBD9D4]";

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen py-24 ${bgClass} lg:py-32`}
    >
      <div className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
        {/* Testo */}
        <motion.div
          className={reverse ? "lg:order-2" : ""}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-serif text-sm font-medium tracking-[0.3em] text-[#2C2420]/60">
            {number}
          </p>
          <motion.h2
            className="mt-3 font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mt-8 max-w-lg text-lg leading-relaxed text-[#2C2420]/90"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Immagine con decorazioni */}
        <motion.div
          className={`relative ${reverse ? "lg:order-1" : ""}`}
          style={{ y: imageY }}
        >
          {/* Linee decorative oro */}
          <motion.div
            className="absolute -top-4 left-0 right-0 h-px bg-[#B8962E]/60"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ originX: 0 }}
          />
          <motion.div
            className="absolute -bottom-4 left-0 right-0 h-px bg-[#B8962E]/60"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ originX: 1 }}
          />

          <motion.div
            className="relative aspect-[4/3] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </motion.div>

          {/* Cerchio decorativo */}
          <motion.div
            className="absolute -right-4 -top-4 h-16 w-16 rounded-full border-2 border-[#B8962E]/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
