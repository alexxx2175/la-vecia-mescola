"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface EventCardProps {
  title: string;
  date: string;
  genre: string;
  time: string;
  index: number;
}

export function EventCard({ title, date, genre, time, index }: EventCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{
          y: -4,
          transition: { duration: 0.2 },
        }}
        className="group relative rounded-lg border border-foreground/10 bg-foreground/[0.03] p-6 pl-5 transition-shadow duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
      >
        {/* Left terracotta border on hover */}
        <span className="absolute left-0 top-0 h-0 w-0.5 rounded-full bg-accent transition-all duration-200 group-hover:h-full" />

        <span className="inline-block rounded-sm bg-accent/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {genre}
        </span>
        <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm text-foreground/60">
          {date} — ore {time}
        </p>
        <a
          href="tel:+390458036608"
          className="mt-4 inline-flex min-h-[48px] items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-hover"
        >
          <Phone size={16} />
          Prenota il Tavolo
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </motion.div>
    </ScrollReveal>
  );
}
