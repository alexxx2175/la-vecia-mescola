import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { ArenaLocalePage } from "@/components/arena/ArenaLocalePage";
import type { CulturaEvent } from "@/components/arena/CulturaEventsSection";

export const metadata: Metadata = {
  title: {
    absolute: "Veranstaltungen in Verona diese Woche | La Vecia Mescola",
  },
  description:
    "Entdecke Veranstaltungen in Verona diese Woche: Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen. La Vecia Mescola ist 2 Gehminuten von der Arena — Abendessen vor der Vorstellung buchen.",
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
    "Verona Restaurant Geheimtipp",
  ],
  alternates: {
    canonical: "https://www.laveciamescola.com/de/arena",
    languages: {
      "it-IT": "https://www.laveciamescola.com/arena",
      "en-US": "https://www.laveciamescola.com/en/arena",
      "de-DE": "https://www.laveciamescola.com/de/arena",
      "x-default": "https://www.laveciamescola.com/arena",
    },
  },
  openGraph: {
    title: "Veranstaltungen in Verona diese Woche | La Vecia Mescola",
    description:
      "Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen. Abendessen vor der Vorstellung — La Vecia Mescola ist 2 Gehminuten von der Arena.",
    url: "https://www.laveciamescola.com/de/arena",
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
    title: "Veranstaltungen in Verona diese Woche | La Vecia Mescola",
    description:
      "Vorstellungen, Konzerte, Ausstellungen in Verona. Abendessen 2 Gehminuten von der Arena di Verona.",
    images: ["/og-image.jpg"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wo essen in der Nähe der Arena di Verona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Vecia Mescola Dell'Oste befindet sich in der Vicolo Chiodo 4, nur 2 Gehminuten von der Arena di Verona entfernt. Authentische venezianische Küche mit hausgemachter frischer Pasta und Amarone-Risotto. Jeden Abend geöffnet. Reservierung per WhatsApp: +39 392 869 9275.",
      },
    },
    {
      "@type": "Question",
      name: "Was kann man diese Woche in Verona unternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diese Woche finden in Verona Vorstellungen in der Arena di Verona, Konzerte, Kunstausstellungen und Messen statt. La Vecia Mescola aktualisiert wöchentlich den Veranstaltungskalender für Verona. Vor der Vorstellung empfehlen wir ein Abendessen bei uns — wir sind nur 2 Gehminuten von der Arena entfernt.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Veranstaltungen gibt es in der Arena di Verona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Arena di Verona bietet jeden Sommer ein reiches Programm: Opernvorstellungen, Rock- und Popkonzerte, Ballette und große internationale Events. La Vecia Mescola, 2 Gehminuten von der Arena, aktualisiert wöchentlich das Programm der Vorstellungen und kulturellen Veranstaltungen in Verona.",
      },
    },
    {
      "@type": "Question",
      name: "Bestes Restaurant nahe der Arena di Verona — wie reservieren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Vecia Mescola Dell'Oste ist das nächste Restaurant zur Arena di Verona, nur 2 Gehminuten entfernt. Traditionelle venezianische Küche, gemütliche Atmosphäre. Einfach per WhatsApp reservieren unter +39 392 869 9275. Täglich zum Mittag- und Abendessen geöffnet.",
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
      name: "Veranstaltungen in Verona",
      item: "https://www.laveciamescola.com/de/arena",
    },
  ],
};

function loadCulturaEvents(): CulturaEvent[] {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "events-cultura.json"
    );
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as CulturaEvent[];
    if (
      parsed &&
      typeof parsed === "object" &&
      "events" in parsed &&
      Array.isArray((parsed as { events: unknown }).events)
    ) {
      return (parsed as { events: CulturaEvent[] }).events;
    }
    return [];
  } catch {
    return [];
  }
}

const DE_TRANSLATIONS = {
  hero_kicker: "Verona, Italien",
  hero_title: "Veranstaltungen in Verona diese Woche",
  hero_subtitle:
    "Vorstellungen in der Arena di Verona, Konzerte, Ausstellungen und Messen. La Vecia Mescola ist 2 Gehminuten entfernt — ideal für das Abendessen vor der Vorstellung.",
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

export default function ArenaDePage() {
  const events = loadCulturaEvents();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingForSchema = events
    .filter((e) => {
      const d = new Date(`${e.date}T00:00:00`);
      return !Number.isNaN(d.getTime()) && d >= today;
    })
    .slice(0, 20);

  const eventListSchema =
    upcomingForSchema.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Bevorstehende Veranstaltungen in Verona",
          url: "https://www.laveciamescola.com/de/arena",
          itemListElement: upcomingForSchema.map((event, index) => ({
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
      <ArenaLocalePage events={events} translations={DE_TRANSLATIONS} />
    </>
  );
}
