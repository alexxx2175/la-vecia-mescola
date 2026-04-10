import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { ArenaEventsClient } from "@/components/arena/ArenaEventsClient";
import { ArenaQuickNav } from "@/components/arena/ArenaQuickNav";
import { GermanArenaSection } from "@/components/arena/GermanArenaSection";
import { CulturaEventsSection, type CulturaEvent } from "@/components/arena/CulturaEventsSection";

export const metadata: Metadata = {
  // absolute evita il doppio branding col template del root layout
  title: {
    absolute: "Eventi a Verona questa settimana | La Vecia Mescola",
  },
  description:
    "Scopri gli eventi a Verona questa settimana: spettacoli all'Arena, concerti, mostre e fiere. La Vecia Mescola è a 2 minuti dall'Arena di Verona — prenota la tua cena prima dello spettacolo.",
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
    "Restaurant Verona Arena",
    "Events Verona this week",
    "Veranstaltungen Verona",
    "Abendessen vor der Oper Verona",
    "Restaurant Arena Verona",
    "Verona Restaurant Geheimtipp",
  ],
  alternates: {
    canonical: "https://www.laveciamescola.com/arena",
    languages: {
      "it-IT": "https://www.laveciamescola.com/arena",
      "en-US": "https://www.laveciamescola.com/en/arena",
      "de-DE": "https://www.laveciamescola.com/de/arena",
      "x-default": "https://www.laveciamescola.com/arena",
    },
  },
  openGraph: {
    title: "Eventi a Verona questa settimana | La Vecia Mescola",
    description:
      "Spettacoli, concerti, mostre e fiere a Verona. Cena prima dello spettacolo — La Vecia Mescola è a 2 minuti dall'Arena di Verona.",
    url: "https://www.laveciamescola.com/arena",
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
    title: "Eventi a Verona questa settimana | La Vecia Mescola",
    description:
      "Spettacoli, concerti, mostre e fiere a Verona. Cena prima dello spettacolo — a 2 minuti dall'Arena.",
    images: ["/og-image.jpg"],
  },
};

function loadCulturaEvents(): CulturaEvent[] {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "events-cultura.json");
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    // Supporta sia array diretto sia oggetto { events: [...] } (formato N8N)
    if (Array.isArray(parsed)) return parsed as CulturaEvent[];
    if (parsed && typeof parsed === "object" && "events" in parsed && Array.isArray((parsed as { events: unknown }).events)) {
      return (parsed as { events: CulturaEvent[] }).events;
    }
    return [];
  } catch {
    return [];
  }
}

export default function ArenaPage() {
  const culturaEvents = loadCulturaEvents();

  // Genera JSON-LD dinamico dagli eventi server-side (crawlabile da Google e AI engines)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = culturaEvents
    .filter((e) => {
      const d = new Date(`${e.date}T00:00:00`);
      return !Number.isNaN(d.getTime()) && d >= today;
    })
    .slice(0, 20);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Dove mangiare vicino all'Arena di Verona?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La Vecia Mescola Dell'Oste si trova a Vicolo Chiodo 4, a soli 2 minuti a piedi dall'Arena di Verona. Cucina veneta autentica con pasta fresca fatta in casa, risotto all'Amarone e piatti tipici veronesi. Aperto ogni sera, prenotazione su WhatsApp al +39 392 869 9275.",
        },
      },
      {
        "@type": "Question",
        name: "Cosa fare a Verona questa settimana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Verona questa settimana ci sono spettacoli all'Arena di Verona, concerti, mostre d'arte e fiere. La Vecia Mescola aggiorna ogni settimana il calendario degli eventi veronesi. Prima dello spettacolo, fermati a cena — siamo a 2 minuti a piedi dall'Arena di Verona.",
        },
      },
      {
        "@type": "Question",
        name: "Quali eventi ci sono all'Arena di Verona?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'Arena di Verona ospita ogni estate un ricco calendario di spettacoli: opera lirica, concerti rock e pop, balletti e grandi eventi internazionali. La Vecia Mescola, a 2 minuti dall'Arena, aggiorna settimanalmente il programma degli spettacoli e degli eventi culturali a Verona.",
        },
      },
      {
        "@type": "Question",
        name: "Come prenotare un tavolo vicino all'Arena di Verona?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prenota un tavolo alla Vecia Mescola Dell'Oste su WhatsApp al +39 392 869 9275. Il ristorante si trova a Vicolo Chiodo 4, Verona, a 2 minuti dall'Arena di Verona. Aperto tutti i giorni a pranzo e cena.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "La Vecia Mescola",
        item: "https://www.laveciamescola.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Eventi a Verona",
        item: "https://www.laveciamescola.com/arena",
      },
    ],
  };

  const eventListSchema =
    upcomingEvents.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Prossimi eventi a Verona",
          description:
            "Calendario aggiornato degli eventi culturali, spettacoli e concerti a Verona",
          url: "https://www.laveciamescola.com/arena",
          itemListElement: upcomingEvents.map((event, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Event",
              name: event.title,
              startDate: event.date,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: event.location,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Verona",
                  addressCountry: "IT",
                },
              },
              ...(event.url ? { url: event.url } : {}),
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {eventListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }}
        />
      )}
      <ArenaQuickNav />
      <ArenaEventsClient />
      <GermanArenaSection />
      <div id="prossimi-eventi" />
      <CulturaEventsSection events={culturaEvents} />
    </>
  );
}
