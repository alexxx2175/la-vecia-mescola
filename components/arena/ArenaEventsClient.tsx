"use client";

import { useEffect, useMemo, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { EventCard } from "@/components/arena/EventCard";

const EVENTS_URL =
  "https://raw.githubusercontent.com/alexxx2175/la-vecia-mescola/main/public/data/events.json";

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

export function ArenaEventsClient() {
  const [events, setEvents] = useState<ArenaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<EventTypeFilter>("Tutti");

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

  const filtered = useMemo(() => {
    if (filter === "Tutti") return events;
    return events.filter((e) => e.type.toLowerCase() === filter.toLowerCase());
  }, [events, filter]);

  const filters: EventTypeFilter[] = ["Tutti", "Opera", "Concerto", "Balletto", "Musica da camera"];

  return (
    <section className="bg-[#EBD9D4] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-viva text-5xl font-semibold text-[#2C2420] sm:text-6xl">
              EVENTI A VERONA
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold/60" />
            <p className="mt-6 text-[#2C2420]/70">
              Scopri opera, concerti e spettacoli in città.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {filters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`min-h-[40px] rounded-full border px-4 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EBD9D4] ${
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

        {loading && (
          <div className="mx-auto mt-16 max-w-xl text-center text-sm text-[#2C2420]/70">
            Caricamento eventi…
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto mt-16 max-w-xl text-center">
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
              <div className="mx-auto mt-16 max-w-xl text-center text-sm text-[#2C2420]/70">
                Nessun evento trovato per questo filtro.
              </div>
            ) : (
              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((event, i) => (
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
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

