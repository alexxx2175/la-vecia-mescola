"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EventCard } from "@/components/arena/EventCard";

const EVENTS_URL =
  "/api/events";

type EventTypeFilter = "Tutti" | "Opera" | "Concerto" | "Balletto" | "Musica da camera";

type RawEvent = Record<string, unknown>;

export type ArenaEvent = {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  url?: string;
  buyUrl?: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function decodeHtmlEntities(input: string): string {
  // Ingested data sometimes contains HTML entities (e.g. "&amp;") inside URLs.
  return input.replaceAll("&amp;", "&");
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  // Prefer ISO dates like "2026-03-25"
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const d = new Date(`${value}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function monthKeyFromDate(value: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 7);
  const d = parseDate(value);
  if (!d) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function formatMonthLabel(monthKey: string): string {
  // monthKey: YYYY-MM
  const [y, m] = monthKey.split("-").map((v) => Number(v));
  const d = new Date(y, Math.max(0, (m || 1) - 1), 1);
  return new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" }).format(d);
}

function normalizeEvent(raw: RawEvent): ArenaEvent | null {
  const title =
    asString(raw.title) ||
    asString(raw.name) ||
    asString(raw.event) ||
    asString(raw.nome);
  const date = asString(raw.date) || asString(raw.data) || asString(raw.startDate);
  const time = asString(raw.time) || asString(raw.orario) || asString(raw.hour);
  const location =
    asString(raw.location) ||
    asString(raw.venue) ||
    asString(raw.place) ||
    asString(raw.luogo) ||
    "Verona";
  const type = asString(raw.type) || asString(raw.genre) || asString(raw.category) || asString(raw.tipo);
  const url = asString(raw.url) || asString(raw.website) || asString(raw.page_url) || asString(raw.pageUrl);
  const buyUrl = asString(raw.buy_url) || asString(raw.buyUrl) || asString(raw.ticket_url) || asString(raw.ticketsUrl);

  if (!title || !date) return null;

  return {
    title,
    date,
    time,
    location,
    type: type || "Evento",
    url: url ? decodeHtmlEntities(url) : undefined,
    buyUrl: buyUrl ? decodeHtmlEntities(buyUrl) : undefined,
  };
}

const INITIAL_VISIBLE = 6;

export function ArenaEventsClient() {
  const [events, setEvents] = useState<ArenaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<EventTypeFilter>("Tutti");
  const [monthFilter, setMonthFilter] = useState<string>("Tutti i mesi");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        async function fetchJson(url: string): Promise<unknown> {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) throw new Error(`Fetch fallita (${res.status})`);
          const text = await res.text();
          if (!text.trim()) throw new Error("events.json è vuoto");
          try {
            return JSON.parse(text) as unknown;
          } catch {
            throw new Error("events.json non è JSON valido");
          }
        }

        let json: unknown;
        try {
          json = await fetchJson(EVENTS_URL);
        } catch (e) {
          // Fallback locale (public/data/events.json) utile se la raw GitHub è vuota o non accessibile
          json = await fetchJson("/data/events.json");
        }

        const rawList = Array.isArray(json) ? json : [];
        const normalized = rawList
          .map((e) => (e && typeof e === "object" ? normalizeEvent(e as RawEvent) : null))
          .filter((e): e is ArenaEvent => Boolean(e));

        if (!active) return;
        setEvents(normalized);
      } catch (e) {
        if (!active) return;
        const msg = e instanceof Error ? e.message : "Errore nel caricamento eventi";
        setError(`${msg}.`);
        setEvents([]);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

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

  const featured = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return [...events]
      .map((e) => ({ e, d: parseDate(e.date) }))
      .filter((x): x is { e: ArenaEvent; d: Date } => Boolean(x.d))
      .filter((x) => x.d.getTime() >= today.getTime())
      .sort((a, b) => a.d.getTime() - b.d.getTime())
      .slice(0, 6)
      .map((x) => x.e);
  }, [events]);

  const visibleFiltered = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  return (
    <div id="arena-events" className="bg-[#EBD9D4]">
      {/* Hero image */}
      <section className="relative pt-24">
        <div className="relative h-[48svh] min-h-[360px] w-full overflow-hidden">
          <Image
            src="/images/arena-di-verona-panoramica-notturna-la-vecia-mescola.png"
            alt="Arena di Verona di notte"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover contrast-110 saturate-110"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#EBD9D4] via-[#EBD9D4]/80 to-transparent" />
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

        {loading ? (
          <div className="mt-10 text-sm text-[#2C2420]/70">Caricamento…</div>
        ) : featured.length === 0 ? (
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

        {loading && (
          <div className="mx-auto mt-12 max-w-xl text-center text-sm text-[#2C2420]/70">
            Caricamento eventi…
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto mt-12 max-w-xl text-center">
            <p className="text-sm text-[#2C2420]/70">
              Non riesco a caricare gli eventi. ({error})
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-sm border border-gold/40 px-5 text-xs font-semibold uppercase tracking-wider text-[#2C2420] transition-colors hover:bg-gold/10"
            >
              Riprova
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
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
          </>
        )}
      </section>
    </div>
  );
}
