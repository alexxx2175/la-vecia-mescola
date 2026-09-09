import type { Metadata } from "next";
import { ArenaLocalePage } from "@/components/arena/ArenaLocalePage";
import { FaqSection } from "@/components/ui/FaqSection";
import { ARENA_FAQ_DE, faqJsonLd } from "@/data/faq";
import { loadArenaEvents, loadCulturaEvents } from "@/lib/events";
import { breadcrumbJsonLd, buildEventListSchema } from "@/lib/events-shared";
import { SITE_URL, baseMetadata } from "@/lib/site";

export const revalidate = 3600;

const PAGE_URL = `${SITE_URL}/de/arena`;
const TITLE = "Veranstaltungen in Verona diese Woche | La Vecia Mescola";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    "Entdecke Veranstaltungen in Verona diese Woche: Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen. La Vecia Mescola ist 2 Gehminuten von der Arena: Abendessen vor der Vorstellung buchen.",
  keywords: [
    "Veranstaltungen Verona",
    "Verona Events diese Woche",
    "Arena di Verona Programm",
    "Was tun in Verona",
    "Konzerte Verona",
    "Ausstellungen Verona",
    "Restaurant Arena Verona",
    "Abendessen vor der Oper Verona",
    "Restaurant Verona Altstadt",
    "Geheimtipp Restaurant Verona",
    "Essen Verona Innenstadt",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      it: `${SITE_URL}/arena`,
      en: `${SITE_URL}/en/arena`,
      de: PAGE_URL,
      "x-default": `${SITE_URL}/arena`,
    },
  },
  openGraph: {
    ...baseMetadata.openGraph,
    locale: "de_DE",
    title: TITLE,
    description:
      "Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen. Abendessen vor der Vorstellung: La Vecia Mescola ist 2 Gehminuten von der Arena.",
    url: PAGE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Veranstaltungen Verona — La Vecia Mescola Restaurant nahe der Arena di Verona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Vorstellungen, Konzerte, Ausstellungen in Verona. Abendessen 2 Gehminuten von der Arena di Verona.",
    images: ["/og-image.jpg"],
  },
};

const DE_TRANSLATIONS = {
  hero_kicker: "Verona, Italien",
  hero_title: "Veranstaltungen in Verona diese Woche",
  hero_subtitle:
    "Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen. La Vecia Mescola ist 2 Gehminuten entfernt: ideal für das Abendessen vor der Vorstellung.",
  hero_cta: "Tisch reservieren",
  events_subtitle: "Wöchentlich aktualisierter Kalender",
  events_title: "Bevorstehende Veranstaltungen in Verona",
  no_events: "Keine bevorstehenden Veranstaltungen gefunden. Bald wieder prüfen.",
  full_calendar: "Vollständigen Kalender ansehen",
  info_cta: "Mehr Infos",
  restaurant_label: "La Vecia Mescola — 2 Gehminuten von der Arena",
  restaurant_desc:
    "Authentische venezianische Küche im historischen Zentrum Veronas. Hausgemachte frische Pasta, Amarone-Risotto, traditionelle Rezepte. Der perfekte Stopp vor oder nach Ihrer Vorstellung.",
};

export default async function ArenaDePage() {
  const [arenaEvents, culturaEvents] = await Promise.all([
    loadArenaEvents(),
    loadCulturaEvents(),
  ]);

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
    name: "Bevorstehende Veranstaltungen in Verona",
    description:
      "Aktueller Kalender der Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen in Verona",
    url: PAGE_URL,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(ARENA_FAQ_DE)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(SITE_URL, "Veranstaltungen in Verona", PAGE_URL)
          ),
        }}
      />
      {eventListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }}
        />
      )}
      <ArenaLocalePage events={events} translations={DE_TRANSLATIONS} />
      <FaqSection
        id="faq-arena"
        items={ARENA_FAQ_DE}
        kicker="Häufige Fragen"
        title="Abendessen in der Nähe der Arena di Verona"
      />
    </>
  );
}
