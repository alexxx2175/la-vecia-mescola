"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface EventCardProps {
  title: string;
  date: string;
  genre: string;
  time: string;
  location: string;
  buyUrl?: string;
  index: number;
}

export function EventCard({ title, date, genre, time, location, buyUrl, index }: EventCardProps) {
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
        <div className="mt-3 space-y-1.5 text-sm text-foreground/60">
          <p className="flex items-center gap-2">
            <Clock size={16} className="text-gold/80" aria-hidden />
            <span>
              {date}
              {time ? ` — ore ${time}` : ""}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-gold/80" aria-hidden />
            <span>{location}</span>
          </p>
        </div>

        <a
          href={buyUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!buyUrl}
          className={`mt-5 inline-flex min-h-[48px] items-center gap-2 text-sm font-semibold transition-colors ${
            buyUrl
              ? "text-gold hover:text-gold-hover"
              : "cursor-not-allowed text-foreground/35"
          }`}
          onClick={(e) => {
            if (!buyUrl) e.preventDefault();
          }}
        >
          Acquista biglietti
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </motion.div>
    </ScrollReveal>
  );
}
