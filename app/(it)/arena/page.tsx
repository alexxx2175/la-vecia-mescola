import type { Metadata } from "next";
import { ArenaEventsClient } from "@/components/arena/ArenaEventsClient";
import { ArenaQuickNav } from "@/components/arena/ArenaQuickNav";
import { GermanArenaSection } from "@/components/arena/GermanArenaSection";
import { CulturaEventsSection } from "@/components/arena/CulturaEventsSection";
import { FaqSection } from "@/components/ui/FaqSection";
import { ARENA_FAQ_IT, faqJsonLd } from "@/data/faq";
import { loadArenaEvents, loadCulturaEvents } from "@/lib/events";
import { breadcrumbJsonLd, buildEventListSchema } from "@/lib/events-shared";
import { SITE_URL, baseMetadata } from "@/lib/site";
import { ARENA_LOCALES, hreflangMap } from "@/data/locales";

// ISR: la pagina si rigenera al massimo ogni ora con i JSON aggiornati dal cron.
export const revalidate = 3600;

const PAGE_URL = `${SITE_URL}/arena`;
const TITLE = "Eventi a Verona questa settimana | La Vecia Mescola";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    "Scopri gli eventi a Verona questa settimana: spettacoli all'Arena, concerti, mostre e fiere. La Vecia Mescola è a 2 minuti dall'Arena di Verona: prenota la tua cena prima dello spettacolo.",
  keywords: [
    "eventi Verona",
    "eventi Verona questa settimana",
    "cosa fare a Verona",
    "spettacoli Arena di Verona",
    "concerti Verona",
    "opera lirica Verona",
    "Arena di Verona programma",
    "mostre Verona",
    "fiere Verona",
    "ristorante vicino Arena di Verona",
    "cena prima spettacolo Verona",
    "dove mangiare vicino Arena Verona",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: hreflangMap("/arena", ARENA_LOCALES),
  },
  openGraph: {
    ...baseMetadata.openGraph,
    title: TITLE,
    description:
      "Spettacoli, concerti, mostre e fiere a Verona. Cena prima dello spettacolo: La Vecia Mescola è a 2 minuti dall'Arena di Verona.",
    url: PAGE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arena di Verona — La Vecia Mescola ristorante a 2 minuti dall'Arena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Spettacoli, concerti, mostre e fiere a Verona. Cena prima dello spettacolo, a 2 minuti dall'Arena.",
    images: ["/og-image.jpg"],
  },
};

export default async function ArenaPage() {
  const [arenaEvents, culturaEvents] = await Promise.all([
    loadArenaEvents(),
    loadCulturaEvents(),
  ]);

  const eventListSchema = buildEventListSchema(arenaEvents, culturaEvents, {
    name: "Prossimi eventi a Verona",
    description:
      "Calendario aggiornato degli spettacoli all'Arena di Verona, concerti, mostre e fiere a Verona",
    url: PAGE_URL,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(ARENA_FAQ_IT)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(SITE_URL, "Eventi a Verona", PAGE_URL)),
        }}
      />
      {eventListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }}
        />
      )}
      <ArenaQuickNav />
      <ArenaEventsClient initialEvents={arenaEvents} />
      <GermanArenaSection />
      <div id="prossimi-eventi" />
      <CulturaEventsSection events={culturaEvents} />
      <FaqSection
        id="faq-arena"
        items={ARENA_FAQ_IT}
        kicker="Domande frequenti"
        title="Cena vicino all'Arena di Verona"
      />
    </>
  );
}
