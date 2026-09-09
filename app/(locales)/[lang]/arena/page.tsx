import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArenaLocalePage, type ArenaLocaleTranslations } from "@/components/arena/ArenaLocalePage";
import { FaqSection } from "@/components/ui/FaqSection";
import { ARENA_FAQ_DE, ARENA_FAQ_EN, faqJsonLd, type FaqItem } from "@/data/faq";
import { OG_LOCALE, hreflangMap, ARENA_LOCALES } from "@/data/locales";
import { loadArenaEvents, loadCulturaEvents } from "@/lib/events";
import { breadcrumbJsonLd, buildEventListSchema } from "@/lib/events-shared";
import { SITE_URL, baseMetadata } from "@/lib/site";

type ArenaLang = "en" | "de";
type Params = Promise<{ lang: string }>;

export const revalidate = 3600;
// La pagina eventi è tradotta solo in inglese e tedesco.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

type ArenaContent = {
  title: string;
  description: string;
  keywords: string[];
  ogDescription: string;
  ogAlt: string;
  twitterDescription: string;
  breadcrumb: string;
  listName: string;
  listDescription: string;
  faq: FaqItem[];
  faqKicker: string;
  faqTitle: string;
  translations: ArenaLocaleTranslations;
};

const CONTENT: Record<ArenaLang, ArenaContent> = {
  en: {
    title: "Events in Verona this week | La Vecia Mescola",
    description:
      "Discover events in Verona this week: shows at the Arena di Verona, concerts, exhibitions and fairs. La Vecia Mescola restaurant is 2 minutes from the Arena: book dinner before the show.",
    keywords: [
      "events in Verona", "Verona events this week", "Arena di Verona shows", "things to do in Verona",
      "what to do in Verona", "concerts in Verona", "exhibitions Verona", "restaurant near Arena di Verona",
      "dinner before opera Verona", "best restaurant Verona old town", "where to eat Verona",
    ],
    ogDescription:
      "Shows at the Arena di Verona, concerts, exhibitions and fairs. Dinner before the show: La Vecia Mescola is 2 minutes from the Arena.",
    ogAlt: "Events in Verona — La Vecia Mescola restaurant near Arena di Verona",
    twitterDescription: "Shows, concerts, exhibitions in Verona. Dinner 2 minutes from the Arena di Verona.",
    breadcrumb: "Events in Verona",
    listName: "Upcoming events in Verona",
    listDescription: "Updated calendar of shows at the Arena di Verona, concerts, exhibitions and fairs in Verona",
    faq: ARENA_FAQ_EN,
    faqKicker: "Frequently asked questions",
    faqTitle: "Dinner near the Arena di Verona",
    translations: {
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
    },
  },
  de: {
    title: "Veranstaltungen in Verona diese Woche | La Vecia Mescola",
    description:
      "Entdecke Veranstaltungen in Verona diese Woche: Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen. La Vecia Mescola ist 2 Gehminuten von der Arena: Abendessen vor der Vorstellung buchen.",
    keywords: [
      "Veranstaltungen Verona", "Verona Events diese Woche", "Arena di Verona Programm", "Was tun in Verona",
      "Konzerte Verona", "Ausstellungen Verona", "Restaurant Arena Verona", "Abendessen vor der Oper Verona",
      "Restaurant Verona Altstadt", "Geheimtipp Restaurant Verona", "Essen Verona Innenstadt",
    ],
    ogDescription:
      "Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen. Abendessen vor der Vorstellung: La Vecia Mescola ist 2 Gehminuten von der Arena.",
    ogAlt: "Veranstaltungen Verona — La Vecia Mescola Restaurant nahe der Arena di Verona",
    twitterDescription:
      "Vorstellungen, Konzerte, Ausstellungen in Verona. Abendessen 2 Gehminuten von der Arena di Verona.",
    breadcrumb: "Veranstaltungen in Verona",
    listName: "Bevorstehende Veranstaltungen in Verona",
    listDescription:
      "Aktueller Kalender der Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen in Verona",
    faq: ARENA_FAQ_DE,
    faqKicker: "Häufige Fragen",
    faqTitle: "Abendessen in der Nähe der Arena di Verona",
    translations: {
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
    },
  },
};

function isArenaLang(lang: string): lang is ArenaLang {
  return lang === "en" || lang === "de";
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isArenaLang(lang)) return {};
  const c = CONTENT[lang];
  const url = `${SITE_URL}/${lang}/arena`;
  return {
    title: { absolute: c.title },
    description: c.description,
    keywords: c.keywords,
    alternates: { canonical: url, languages: hreflangMap("/arena", ARENA_LOCALES) },
    openGraph: {
      ...baseMetadata.openGraph,
      locale: OG_LOCALE[lang],
      title: c.title,
      description: c.ogDescription,
      url,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: c.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.twitterDescription,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocaleArenaPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isArenaLang(lang)) notFound();
  const c = CONTENT[lang];
  const url = `${SITE_URL}/${lang}/arena`;

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
    name: c.listName,
    description: c.listDescription,
    url,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(c.faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(SITE_URL, c.breadcrumb, url)),
        }}
      />
      {eventListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }}
        />
      )}
      <ArenaLocalePage events={events} translations={c.translations} />
      <FaqSection id="faq-arena" items={c.faq} kicker={c.faqKicker} title={c.faqTitle} />
    </>
  );
}
