"use client";

import { useMemo, useState } from "react";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Tag, ChevronDown, ChevronUp } from "lucide-react";

export type CulturaEvent = {
  title: string;
  date: string;
  type: string;
  location: string;
  source: string;
  url: string;
  category?: string;
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  cultura: { bg: "bg-[#B8962E]/15", text: "text-[#B8962E]" },
  fiere: { bg: "bg-[#8B1A2E]/15", text: "text-[#8B1A2E]" },
  concerti_pop: { bg: "bg-[#2E7D32]/15", text: "text-[#2E7D32]" },
};

const DEFAULT_COLOR = { bg: "bg-[#B8962E]/15", text: "text-[#B8962E]" };

type PeriodFilter = "this_week" | "next_week" | "two_weeks" | "this_month" | "all_upcoming";

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

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
}

function endOfWeek(date: Date): Date {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  d.setDate(d.getDate() + daysUntilSunday);
  d.setHours(23, 59, 59);
  return d;
}

const INITIAL_VISIBLE = 9;

export function CulturaEventsSection({ events }: { events: CulturaEvent[] }) {
  const { lang } = useSiteLanguage();
  const [period, setPeriod] = useState<PeriodFilter>("two_weeks");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // All future events sorted
  const allFuture = useMemo(() => {
    if (!events || events.length === 0) return [];
    return [...events]
      .map((e) => ({ e, d: parseDate(e.date) }))
      .filter((x): x is { e: CulturaEvent; d: Date } => Boolean(x.d))
      .filter((x) => x.d.getTime() >= today.getTime())
      .sort((a, b) => a.d.getTime() - b.d.getTime())
      .map((x) => x.e);
  }, [events, today.getTime()]);

  // Unique sources for filter
  const sources = useMemo(() => {
    const s = new Set<string>();
    for (const e of allFuture) s.add(e.source);
    return Array.from(s).sort();
  }, [allFuture]);

  // Apply period filter
  const periodFiltered = useMemo(() => {
    let cutoff: Date;
    switch (period) {
      case "this_week":
        cutoff = endOfWeek(today);
        break;
      case "next_week":
        cutoff = endOfWeek(addDays(today, 7));
        break;
      case "two_weeks":
        cutoff = addDays(today, 14);
        break;
      case "this_month":
        cutoff = endOfMonth(today);
        break;
      case "all_upcoming":
      default:
        return allFuture;
    }
    return allFuture.filter((e) => {
      const d = parseDate(e.date);
      return d && d.getTime() <= cutoff.getTime();
    });
  }, [allFuture, period, today.getTime()]);

  // Apply source filter
  const filtered = useMemo(() => {
    if (sourceFilter === "all") return periodFiltered;
    return periodFiltered.filter((e) => e.source === sourceFilter);
  }, [periodFiltered, sourceFilter]);

  if (allFuture.length === 0) return null;

  const title = t(translations.cultura_section.title, lang);
  const subtitle = t(translations.cultura_section.subtitle, lang);
  const more = t(translations.cultura_section.more, lang);
  const noEvents = t(translations.cultura_section.no_events, lang);

  const visibleEvents = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  const periodOptions: { value: PeriodFilter; labelKey: keyof typeof translations.cultura_section }[] = [
    { value: "this_week", labelKey: "this_week" },
    { value: "next_week", labelKey: "next_week" },
    { value: "two_weeks", labelKey: "two_weeks" },
    { value: "this_month", labelKey: "this_month" },
    { value: "all_upcoming", labelKey: "all_upcoming" },
  ];

  return (
    <section id="eventi-culturali" className="bg-[#EBD9D4] py-20 sm:py-28">
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

        {/* Filters */}
        <div className="mt-10 flex flex-col items-center gap-4">
          {/* Period pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {periodOptions.map((opt) => {
              const active = opt.value === period;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { setPeriod(opt.value); setExpanded(false); }}
                  className={`min-h-[44px] rounded-full border px-4 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EBD9D4] ${
                    active
                      ? "border-gold/60 bg-gold/10 text-[#2C2420]"
                      : "border-[#2C2420]/15 bg-transparent text-[#2C2420]/70 hover:border-gold/40 hover:text-[#2C2420]"
                  }`}
                >
                  {t(translations.cultura_section[opt.labelKey], lang)}
                </button>
              );
            })}
          </div>

          {/* Source dropdown */}
          {sources.length > 1 && (
            <div className="w-full max-w-xs">
              <label className="sr-only" htmlFor="cultura-source-filter">
                {t(translations.cultura_section.source_filter, lang)}
              </label>
              <select
                id="cultura-source-filter"
                value={sourceFilter}
                onChange={(e) => { setSourceFilter(e.target.value); setExpanded(false); }}
                className="min-h-[44px] w-full rounded-md border border-[#2C2420]/20 bg-transparent px-3 text-sm text-[#2C2420] outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              >
                <option value="all">{t(translations.cultura_section.source_filter, lang)}</option>
                {sources.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          {/* Count */}
          <p className="text-sm text-[#2C2420]/60">
            {filtered.length} {filtered.length === 1 ? "evento" : "eventi"}
          </p>
        </div>

        {/* Event cards */}
        {filtered.length === 0 ? (
          <div className="mx-auto mt-12 max-w-xl text-center text-sm text-[#2C2420]/70">
            {noEvents}
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              <motion.div
                key={expanded ? "expanded" : "collapsed"}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.06 }}
                className="mt-8 grid items-stretch gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visibleEvents.map((event, i) => {
                  const cat = event.category || "cultura";
                  const colors = CATEGORY_COLORS[cat] || DEFAULT_COLOR;

                  return (
                    <ScrollReveal key={`cultura-${event.title}-${event.date}-${i}`} delay={i * 0.008}>
                      <motion.div
                        whileHover={{ y: -4, transition: { duration: 0.02 } }}
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
              </motion.div>
            </AnimatePresence>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#2C2420]/20 px-6 py-3 text-sm font-semibold text-[#2C2420] transition-colors hover:border-gold/40 hover:bg-gold/5"
                >
                  {expanded ? (
                    <>
                      {lang === "it" ? "Mostra meno" : "Show less"}
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      {lang === "it"
                        ? `Vedi tutti (${filtered.length} eventi)`
                        : `See all (${filtered.length} events)`}
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
