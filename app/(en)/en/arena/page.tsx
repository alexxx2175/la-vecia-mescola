import type { Metadata } from "next";
import { ArenaLocalePage } from "@/components/arena/ArenaLocalePage";
import { FaqSection } from "@/components/ui/FaqSection";
import { ARENA_FAQ_EN, faqJsonLd } from "@/data/faq";
import { loadArenaEvents, loadCulturaEvents } from "@/lib/events";
import { breadcrumbJsonLd, buildEventListSchema } from "@/lib/events-shared";
import { SITE_URL, baseMetadata } from "@/lib/site";

export const revalidate = 3600;

const PAGE_URL = `${SITE_URL}/en/arena`;
const TITLE = "Events in Verona this week | La Vecia Mescola";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    "Discover events in Verona this week: shows at the Arena di Verona, concerts, exhibitions and fairs. La Vecia Mescola restaurant is 2 minutes from the Arena: book dinner before the show.",
  keywords: [
    "events in Verona",
    "Verona events this week",
    "Arena di Verona shows",
    "things to do in Verona",
    "what to do in Verona",
    "concerts in Verona",
    "exhibitions Verona",
    "restaurant near Arena di Verona",
    "dinner before opera Verona",
    "best restaurant Verona old town",
    "where to eat Verona",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      it: `${SITE_URL}/arena`,
      en: PAGE_URL,
      de: `${SITE_URL}/de/arena`,
      "x-default": `${SITE_URL}/arena`,
    },
  },
  openGraph: {
    ...baseMetadata.openGraph,
    locale: "en_GB",
    title: TITLE,
    description:
      "Shows at the Arena di Verona, concerts, exhibitions and fairs. Dinner before the show: La Vecia Mescola is 2 minutes from the Arena.",
    url: PAGE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Events in Verona — La Vecia Mescola restaurant near Arena di Verona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Shows, concerts, exhibitions in Verona. Dinner 2 minutes from the Arena di Verona.",
    images: ["/og-image.jpg"],
  },
};

const EN_TRANSLATIONS = {
  hero_kicker: "Verona, Italy",
  hero_title: "Events in Verona this week",
  hero_subtitle:
    "Shows at the Arena di Verona, concerts, exhibitions and fairs. La Vecia Mescola is 2 minutes away: perfect for dinner before the show.",
  hero_cta: "Book a table",
  events_subtitle: "Weekly updated calendar",
  events_title: "Upcoming events in Verona",
  no_events: "No upcoming events found. Check back soon.",
  full_calendar: "See full calendar",
  info_cta: "More info",
  restaurant_label: "La Vecia Mescola — 2 minutes from the Arena",
  restaurant_desc:
    "Authentic Venetian cuisine in the heart of Verona's historic center. Handmade fresh pasta, Amarone risotto, traditional recipes. The perfect stop before or after your show.",
};

export default async function ArenaEnPage() {
  const [arenaEvents, culturaEvents] = await Promise.all([
    loadArenaEvents(),
    loadCulturaEvents(),
  ]);

  // La lista localizzata mostra sia gli spettacoli dell'Arena sia gli eventi culturali.
  const events = [
    ...arenaEvents.map((e) => ({
      title: e.title,
      date: e.date,
      type: e.type,
      location: e.location,
      source: "arena.it",
      url: e.buyUrl ?? e.url ?? "",
    })),
    ...culturaEvents,
  ];

  const eventListSchema = buildEventListSchema(arenaEvents, culturaEvents, {
    name: "Upcoming events in Verona",
    description: "Updated calendar of shows at the Arena di Verona, concerts, exhibitions and fairs in Verona",
    url: PAGE_URL,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(ARENA_FAQ_EN)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(SITE_URL, "Events in Verona", PAGE_URL)),
        }}
      />
      {eventListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }}
        />
      )}
      <ArenaLocalePage events={events} translations={EN_TRANSLATIONS} />
      <FaqSection
        id="faq-arena"
        items={ARENA_FAQ_EN}
        kicker="Frequently asked questions"
        title="Dinner near the Arena di Verona"
      />
    </>
  );
}
