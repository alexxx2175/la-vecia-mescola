/**
 * Tipi e normalizzazione eventi condivisi tra server (loader) e client (filtri).
 * Nessuna dipendenza da Node: importabile anche nei client component.
 */
export type ArenaEvent = {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  url?: string;
  buyUrl?: string;
};

export type CulturaEvent = {
  title: string;
  date: string;
  type: string;
  location: string;
  source: string;
  url: string;
  category?: string;
};

type RawEvent = Record<string, unknown>;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function decodeHtmlEntities(input: string): string {
  return input.replaceAll("&amp;", "&");
}

export function normalizeArenaEvent(raw: unknown): ArenaEvent | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as RawEvent;
  const title = asString(r.title) || asString(r.name) || asString(r.event) || asString(r.nome);
  const date = asString(r.date) || asString(r.data) || asString(r.startDate);
  const time = asString(r.time) || asString(r.orario) || asString(r.hour);
  const location =
    asString(r.location) || asString(r.venue) || asString(r.place) || asString(r.luogo) || "Verona";
  const type = asString(r.type) || asString(r.genre) || asString(r.category) || asString(r.tipo);
  const url = asString(r.url) || asString(r.website) || asString(r.page_url) || asString(r.pageUrl);
  const buyUrl =
    asString(r.buy_url) || asString(r.buyUrl) || asString(r.ticket_url) || asString(r.ticketsUrl);

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

export function parseEventDate(value: string): Date | null {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const d = new Date(`${value}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Eventi con data >= oggi, ordinati per data crescente. */
export function upcoming<T extends { date: string }>(events: T[], limit?: number): T[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const list = events
    .map((e) => ({ e, d: parseEventDate(e.date) }))
    .filter((x): x is { e: T; d: Date } => Boolean(x.d) && x.d!.getTime() >= today)
    .sort((a, b) => a.d.getTime() - b.d.getTime())
    .map((x) => x.e);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Indirizzi delle sedi principali per lo schema Event. */
export const VENUES: Record<string, { name: string; streetAddress: string }> = {
  "arena di verona": { name: "Arena di Verona", streetAddress: "Piazza Bra 1" },
  "teatro filarmonico": { name: "Teatro Filarmonico", streetAddress: "Via dei Mutilati 4" },
  "teatro romano": { name: "Teatro Romano", streetAddress: "Regaste Redentore 2" },
  "palazzo della gran guardia": { name: "Palazzo della Gran Guardia", streetAddress: "Piazza Bra 1" },
};

export function eventPlaceJsonLd(location: string) {
  const key = location.trim().toLowerCase();
  const venue = VENUES[key];
  return {
    "@type": "Place",
    name: venue?.name ?? (location || "Verona"),
    address: {
      "@type": "PostalAddress",
      ...(venue ? { streetAddress: venue.streetAddress } : {}),
      addressLocality: "Verona",
      postalCode: "37121",
      addressCountry: "IT",
    },
  };
}

type SchemaEvent = {
  title: string;
  date: string;
  location: string;
  url?: string;
  buyUrl?: string;
};

/** ItemList di Event per le pagine eventi: prima l'Arena, poi gli eventi culturali. */
export function buildEventListSchema(
  arena: ArenaEvent[],
  cultura: CulturaEvent[],
  meta: { name: string; description: string; url: string }
) {
  const items: SchemaEvent[] = [
    ...upcoming(arena, 20),
    ...upcoming(cultura, 10).map((e) => ({ title: e.title, date: e.date, location: e.location, url: e.url })),
  ].slice(0, 25);
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: meta.name,
    description: meta.description,
    url: meta.url,
    itemListElement: items.map((ev, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: ev.title,
        startDate: ev.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: eventPlaceJsonLd(ev.location),
        ...(ev.url ? { url: ev.url } : {}),
        ...(ev.buyUrl
          ? {
              offers: {
                "@type": "Offer",
                url: ev.buyUrl,
                availability: "https://schema.org/InStock",
              },
            }
          : {}),
      },
    })),
  };
}

export function breadcrumbJsonLd(siteUrl: string, pageName: string, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "La Vecia Mescola", item: siteUrl },
      { "@type": "ListItem", position: 2, name: pageName, item: pageUrl },
    ],
  };
}
