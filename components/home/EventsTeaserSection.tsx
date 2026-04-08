"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";

type RawEvent = Record<string, unknown>;

type TeaserEvent = {
  title: string;
  date: string;
  type: string;
  location: string;
};

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const d = new Date(`${value}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDate(value: string): string {
  const d = parseDate(value);
  if (!d) return value;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

const WHATSAPP_URL = "https://wa.me/393928699275";

export function EventsTeaserSection() {
  const { lang } = useSiteLanguage();
  const [events, setEvents] = useState<TeaserEvent[]>([]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        if (!res.ok) return;
        const json: unknown = await res.json();
        if (!Array.isArray(json)) return;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const parsed = json
          .map((raw: RawEvent) => {
            const title = asString(raw.title) || asString(raw.name) || asString(raw.event);
            const date = asString(raw.date) || asString(raw.data) || asString(raw.startDate);
            const type = asString(raw.type) || asString(raw.genre) || asString(raw.category) || "Evento";
            const location = asString(raw.location) || asString(raw.venue) || "Verona";
            if (!title || !date) return null;
            return { title, date, type, location };
          })
          .filter((e): e is TeaserEvent => Boolean(e))
          .map((e) => ({ e, d: parseDate(e.date) }))
          .filter((x): x is { e: TeaserEvent; d: Date } => Boolean(x.d))
          .filter((x) => x.d.getTime() >= today.getTime())
          .sort((a, b) => a.d.getTime() - b.d.getTime())
          .slice(0, 3)
          .map((x) => x.e);

        if (active) setEvents(parsed);
      } catch {
        // silently fail — teaser is non-critical
      }
    }
    load();
    return () => { active = false; };
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="bg-[#2C2420] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2
            className="text-center font-serif font-semibold text-[#EBD9D4]"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
          >
            {t(translations.events_teaser.title, lang)}
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-3">
          {events.map((event, i) => (
            <ScrollReveal key={`teaser-${event.title}-${event.date}-${i}`} delay={i * 0.01}>
              <div className="rounded-lg border border-[#EBD9D4]/10 bg-[#EBD9D4]/[0.05] p-5">
                <span className="inline-block rounded-sm bg-[#B8962E]/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#B8962E]">
                  {event.type}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-[#EBD9D4]">
                  {event.title}
                </h3>
                <div className="mt-2 space-y-1 text-sm text-[#EBD9D4]/60">
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-[#B8962E]/80" aria-hidden />
                    {formatDate(event.date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#B8962E]/80" aria-hidden />
                    {event.location}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/arena"
            className="inline-flex min-h-[48px] items-center rounded-sm border border-[#B8962E]/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#B8962E] transition-colors hover:bg-[#B8962E]/10"
          >
            {t(translations.events_teaser.cta, lang)}
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center rounded-sm bg-[#B8962E] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#2C2420] transition-colors hover:bg-[#B8962E]/80"
          >
            {t(translations.events_teaser.book, lang)}
          </a>
        </div>
      </div>
    </section>
  );
}
