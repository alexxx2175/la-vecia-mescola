"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EventCard } from "@/components/arena/EventCard";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";
import { parseEventDate, upcoming, type ArenaEvent } from "@/lib/events-shared";

export type { ArenaEvent } from "@/lib/events-shared";

type EventTypeFilter = "Tutti" | "Opera" | "Concerto" | "Balletto" | "Musica da camera";

function monthKeyFromDate(value: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 7);
  const d = parseEventDate(value);
  if (!d) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function formatMonthLabel(monthKey: string): string {
  const [y, m] = monthKey.split("-").map((v) => Number(v));
  const d = new Date(y, Math.max(0, (m || 1) - 1), 1);
  return new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" }).format(d);
}

const INITIAL_VISIBLE = 6;

/**
 * Riceve gli eventi già caricati dal server (ISR): l'elenco è nell'HTML
 * iniziale, il client si occupa solo di filtri ed espansione.
 */
export function ArenaEventsClient({ initialEvents }: { initialEvents: ArenaEvent[] }) {
  const { lang } = useSiteLanguage();
  const events = initialEvents;
  const [filter, setFilter] = useState<EventTypeFilter>("Tutti");
  const [monthFilter, setMonthFilter] = useState<string>("Tutti i mesi");
  const [expanded, setExpanded] = useState(false);

  const monthOptions = useMemo(() => {
    const keys = new Set<string>();
    for (const e of events) {
      const k = monthKeyFromDate(e.date);
      if (k) keys.add(k);
    }
    return Array.from(keys).sort();
  }, [events]);

  const filtered = useMemo(() => {
    const typeFiltered =
      filter === "Tutti" ? events : events.filter((e) => e.type.toLowerCase() === filter.toLowerCase());
    if (monthFilter === "Tutti i mesi") return typeFiltered;
    return typeFiltered.filter((e) => monthKeyFromDate(e.date) === monthFilter);
  }, [events, filter, monthFilter]);

  const filters: EventTypeFilter[] = ["Tutti", "Opera", "Concerto", "Balletto", "Musica da camera"];

  const featured = useMemo(() => upcoming(events, 6), [events]);

  const visibleFiltered = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  return (
    <div id="arena-events" className="bg-[#EBD9D4]">
      {/* Hero con titolo della pagina */}
      <section className="relative pt-24">
        <div className="relative h-[52svh] min-h-[400px] w-full overflow-hidden">
          <Image
            src="/images/arena-di-verona-panoramica-notturna-la-vecia-mescola.png"
            alt="Arena di Verona di notte"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover contrast-110 saturate-110"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#EBD9D4] via-[#EBD9D4]/80 to-transparent" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-12 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#EBD9D4]/90 sm:text-sm">
              {t(translations.arena.kicker, lang)}
            </p>
            <h1
              className="mt-4 font-viva font-semibold leading-tight text-white"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
            >
              {t(translations.arena.title, lang)}
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/90 sm:text-lg">
              {t(translations.arena.subtitle, lang)}
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-viva font-semibold text-[#2C2420]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
                Eventi in evidenza
              </h2>
              <p className="mt-3 text-sm text-[#2C2420]/70">
                I prossimi appuntamenti in arrivo.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {featured.length === 0 ? (
          <div className="mt-10 text-sm text-[#2C2420]/70">Nessun evento in evidenza.</div>
        ) : (
          <div className="mt-10 grid items-stretch gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((event, i) => (
              <EventCard
                key={`featured-${event.title}-${event.date}-${i}`}
                title={event.title}
                date={event.date}
                time={event.time}
                genre={event.type}
                location={event.location}
                url={event.url}
                buyUrl={event.buyUrl}
                index={i}
              />
            ))}
          </div>
        )}
      </section>

      {/* All events + filters */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-8 sm:pb-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => { setFilter(f); setExpanded(false); }}
                  className={`min-h-[44px] rounded-full border px-4 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EBD9D4] ${
                    active
                      ? "border-gold/60 bg-gold/10 text-[#2C2420]"
                      : "border-[#2C2420]/15 bg-transparent text-[#2C2420]/70 hover:border-gold/40 hover:text-[#2C2420]"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="w-full max-w-xs">
            <label className="sr-only" htmlFor="month-filter">
              Filtra per mese
            </label>
            <select
              id="month-filter"
              value={monthFilter}
              onChange={(e) => { setMonthFilter(e.target.value); setExpanded(false); }}
              className="min-h-[44px] w-full rounded-md border border-[#2C2420]/20 bg-transparent px-3 text-sm text-[#2C2420] outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              <option value="Tutti i mesi">Tutti i mesi</option>
              {monthOptions.map((m) => (
                <option key={m} value={m}>
                  {formatMonthLabel(m)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mx-auto mt-12 max-w-xl text-center text-sm text-[#2C2420]/70">
            Nessun evento trovato per questo filtro.
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              <motion.div
                key={expanded ? "expanded" : "collapsed"}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.06 }}
                className="mt-12 grid items-stretch gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visibleFiltered.map((event, i) => (
                  <EventCard
                    key={`${event.title}-${event.date}-${i}`}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    genre={event.type}
                    location={event.location}
                    url={event.url}
                    buyUrl={event.buyUrl}
                    index={i}
                  />
                ))}
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
                      Mostra meno
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      {`Vedi tutti gli eventi Arena (${filtered.length} totali)`}
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
