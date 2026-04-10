import Link from "next/link";
import { MapPin, Tag, ArrowUpRight, CalendarDays } from "lucide-react";
import type { CulturaEvent } from "./CulturaEventsSection";

export type ArenaLocaleTranslations = {
  hero_kicker: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  events_subtitle: string;
  events_title: string;
  no_events: string;
  full_calendar: string;
  info_cta: string;
  restaurant_label: string;
  restaurant_desc: string;
};

const WHATSAPP_URL = "https://wa.me/393928699275";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function ArenaLocalePage({
  events,
  translations: tx,
}: {
  events: CulturaEvent[];
  translations: ArenaLocaleTranslations;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter((e) => {
      const d = new Date(`${e.date}T00:00:00`);
      return !Number.isNaN(d.getTime()) && d >= today;
    })
    .sort(
      (a, b) =>
        new Date(`${a.date}T00:00:00`).getTime() -
        new Date(`${b.date}T00:00:00`).getTime()
    )
    .slice(0, 12);

  return (
    <main className="min-h-screen bg-[#EBD9D4]">
      {/* Hero */}
      <section className="px-6 pb-16 pt-28 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#B8962E]">
          {tx.hero_kicker}
        </p>
        <h1
          className="mt-4 font-serif font-semibold text-[#2C2420]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          {tx.hero_title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#2C2420]/70">
          {tx.hero_subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center rounded-sm bg-[#2C2420] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#EBD9D4] transition-colors hover:bg-[#3d3630]"
          >
            {tx.hero_cta}
          </a>
          <Link
            href="/arena"
            className="inline-flex min-h-[48px] items-center rounded-sm border border-[#2C2420]/30 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#2C2420] transition-colors hover:border-[#B8962E]/60 hover:text-[#B8962E]"
          >
            {tx.full_calendar}
          </Link>
        </div>
      </section>

      {/* Restaurant callout */}
      <section className="bg-[#2C2420] px-6 py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B8962E]">
          {tx.restaurant_label}
        </p>
        <p className="mx-auto mt-3 max-w-lg text-base text-[#EBD9D4]/80">
          {tx.restaurant_desc}
        </p>
        <p className="mt-2 text-sm font-semibold text-[#EBD9D4]">
          Vicolo Chiodo 4, Verona — WhatsApp +39 392 869 9275
        </p>
      </section>

      {/* Events grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#B8962E]">
            {tx.events_subtitle}
          </p>
          <h2
            className="mt-3 font-serif font-semibold text-[#2C2420]"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
          >
            {tx.events_title}
          </h2>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-center text-sm text-[#2C2420]/60">{tx.no_events}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event, i) => (
              <div
                key={`${event.title}-${event.date}-${i}`}
                className="flex flex-col rounded-lg border border-[#2C2420]/10 bg-[#2C2420]/[0.03] p-6 transition-shadow hover:shadow-md"
              >
                <span className="inline-block self-start rounded-sm bg-[#B8962E]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#B8962E]">
                  {event.type}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-[#2C2420]">
                  {event.url ? (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[#B8962E]"
                    >
                      {event.title}
                    </a>
                  ) : (
                    event.title
                  )}
                </h3>
                <div className="mt-3 space-y-1.5 text-sm text-[#2C2420]/60">
                  <p className="flex items-center gap-2">
                    <Tag size={14} className="text-[#B8962E]/80" aria-hidden />
                    {formatDate(event.date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#B8962E]/80" aria-hidden />
                    {event.location}
                  </p>
                </div>
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#B8962E] transition-colors hover:text-[#B8962E]/80"
                  >
                    {tx.info_cta}
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/arena"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-sm border border-[#B8962E]/40 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#B8962E] transition-colors hover:bg-[#B8962E]/10"
          >
            <CalendarDays size={16} aria-hidden />
            {tx.full_calendar}
          </Link>
        </div>
      </section>
    </main>
  );
}
