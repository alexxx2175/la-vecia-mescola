import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { ArenaLocalePage } from "@/components/arena/ArenaLocalePage";
import type { CulturaEvent } from "@/components/arena/CulturaEventsSection";

export const metadata: Metadata = {
  title: {
    absolute: "Events in Verona this week | La Vecia Mescola",
  },
  description:
    "Discover events in Verona this week: shows at the Arena di Verona, concerts, exhibitions and fairs. La Vecia Mescola restaurant is 2 minutes from the Arena — book dinner before the show.",
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
    canonical: "https://www.laveciamescola.com/en/arena",
    languages: {
      "it-IT": "https://www.laveciamescola.com/arena",
      "en-US": "https://www.laveciamescola.com/en/arena",
      "de-DE": "https://www.laveciamescola.com/de/arena",
      "x-default": "https://www.laveciamescola.com/arena",
    },
  },
  openGraph: {
    title: "Events in Verona this week | La Vecia Mescola",
    description:
      "Shows at the Arena di Verona, concerts, exhibitions and fairs. Dinner before the show — La Vecia Mescola is 2 minutes from the Arena.",
    url: "https://www.laveciamescola.com/en/arena",
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
    title: "Events in Verona this week | La Vecia Mescola",
    description:
      "Shows, concerts, exhibitions in Verona. Dinner 2 minutes from the Arena di Verona.",
    images: ["/og-image.jpg"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where to eat near the Arena di Verona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Vecia Mescola Dell'Oste is located at Vicolo Chiodo 4, just 2 minutes' walk from the Arena di Verona. Authentic Venetian cuisine with handmade fresh pasta and Amarone risotto. Open every evening. Book via WhatsApp: +39 392 869 9275.",
      },
    },
    {
      "@type": "Question",
      name: "What to do in Verona this week?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This week in Verona there are shows at the Arena di Verona, concerts, art exhibitions and fairs. La Vecia Mescola updates every week the calendar of events in Verona. Before the show, join us for dinner — we are 2 minutes' walk from the Arena.",
      },
    },
    {
      "@type": "Question",
      name: "What shows are on at the Arena di Verona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Arena di Verona hosts every summer a rich calendar of shows: opera, rock and pop concerts, ballets and major international events. La Vecia Mescola, 2 minutes from the Arena, updates weekly the programme of shows and cultural events in Verona.",
      },
    },
    {
      "@type": "Question",
      name: "Best restaurant near the Arena di Verona — how to book?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Vecia Mescola Dell'Oste is the closest restaurant to the Arena di Verona, just 2 minutes' walk. Traditional Venetian cuisine, warm atmosphere. Book easily via WhatsApp at +39 392 869 9275. Open daily for lunch and dinner.",
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
      name: "Events in Verona",
      item: "https://www.laveciamescola.com/en/arena",
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

const EN_TRANSLATIONS = {
  hero_kicker: "Verona, Italy",
  hero_title: "Events in Verona this week",
  hero_subtitle:
    "Shows at the Arena di Verona, concerts, exhibitions and fairs. La Vecia Mescola is 2 minutes away — perfect for dinner before the show.",
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

export default function ArenaEnPage() {
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
          name: "Upcoming events in Verona",
          url: "https://www.laveciamescola.com/en/arena",
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
      <ArenaLocalePage events={events} translations={EN_TRANSLATIONS} />
    </>
  );
}
