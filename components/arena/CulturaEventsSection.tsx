"use client";

import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Tag } from "lucide-react";

export type CulturaEvent = {
  title: string;
  date: string;
  type: string;
  location: string;
  source: string;
  url: string;
  category?: string;
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  cultura: { bg: "bg-[#B8962E]/15", text: "text-[#B8962E]", border: "border-[#B8962E]/30" },
  fiere: { bg: "bg-[#8B1A2E]/15", text: "text-[#8B1A2E]", border: "border-[#8B1A2E]/30" },
  concerti_pop: { bg: "bg-[#2E7D32]/15", text: "text-[#2E7D32]", border: "border-[#2E7D32]/30" },
};

const DEFAULT_COLOR = { bg: "bg-[#B8962E]/15", text: "text-[#B8962E]", border: "border-[#B8962E]/30" };

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function CulturaEventsSection({ events }: { events: CulturaEvent[] }) {
  const { lang } = useSiteLanguage();

  if (!events || events.length === 0) return null;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const sorted = [...events]
    .map((e) => ({ e, d: parseDate(e.date) }))
    .filter((x): x is { e: CulturaEvent; d: Date } => Boolean(x.d))
    .filter((x) => x.d.getTime() >= today.getTime())
    .sort((a, b) => a.d.getTime() - b.d.getTime())
    .slice(0, 12)
    .map((x) => x.e);

  if (sorted.length === 0) return null;

  const title = t(translations.cultura_section.title, lang);
  const subtitle = t(translations.cultura_section.subtitle, lang);
  const more = t(translations.cultura_section.more, lang);

  return (
    <section className="bg-[#EBD9D4] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#B8962E]">
              {subtitle}
            </p>
            <h2
              className="mt-4 font-serif font-semibold text-[#2C2420]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid items-stretch gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((event, i) => {
            const cat = event.category || "cultura";
            const colors = CATEGORY_COLORS[cat] || DEFAULT_COLOR;

            return (
              <ScrollReveal key={`cultura-${event.title}-${event.date}-${i}`} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative flex h-full flex-col rounded-lg border border-foreground/10 bg-foreground/[0.03] p-6 pl-5 transition-shadow duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
                >
                  <span className="absolute left-0 top-0 h-0 w-0.5 rounded-full bg-accent transition-all duration-200 group-hover:h-full" />

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block rounded-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${colors.bg} ${colors.text}`}
                    >
                      {event.type}
                    </span>
                    <span className="inline-block rounded-sm bg-[#2C2420]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#2C2420]/60">
                      {event.source}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
                    {event.url ? (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="outline-none transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2"
                      >
                        {event.title}
                      </a>
                    ) : (
                      event.title
                    )}
                  </h3>

                  <div className="mt-3 space-y-1.5 text-sm text-foreground/60">
                    <p className="flex items-center gap-2">
                      <Tag size={16} className="text-gold/80" aria-hidden />
                      <span>{formatDate(event.date)}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={16} className="text-gold/80" aria-hidden />
                      <span>{event.location}</span>
                    </p>
                  </div>

                  <a
                    href={event.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!event.url}
                    className={`mt-auto inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-sm pt-5 text-sm font-semibold transition-colors sm:w-auto sm:justify-start ${
                      event.url
                        ? "text-gold hover:text-gold-hover"
                        : "cursor-not-allowed text-foreground/35"
                    }`}
                    onClick={(e) => {
                      if (!event.url) e.preventDefault();
                    }}
                  >
                    {more}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
