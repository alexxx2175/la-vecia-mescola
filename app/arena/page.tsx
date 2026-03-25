import type { Metadata } from "next";
import { MapPin, UtensilsCrossed, CalendarCheck, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArenaHero } from "@/components/arena/ArenaHero";
import { EventCard } from "@/components/arena/EventCard";

export const metadata: Metadata = {
  title: "Ristorante vicino Arena di Verona — La Vecia Mescola",
  description:
    "Cena prima dello spettacolo all'Arena di Verona? La Vecia Mescola è a 200 metri dall'ingresso. Cucina veneta autentica, pasta fresca, risotto all'Amarone. Prenota ora.",
  openGraph: {
    title: "Ristorante vicino Arena di Verona — La Vecia Mescola",
    description:
      "Cena prima dello spettacolo all'Arena di Verona? La Vecia Mescola è a 200 metri dall'ingresso. Cucina veneta autentica, pasta fresca, risotto all'Amarone. Prenota ora.",
  },
};

interface ArenaEvent {
  title: string;
  date: string;
  genre: string;
  time: string;
}

const events: ArenaEvent[] = [
  {
    title: "Aida — Giuseppe Verdi",
    date: "14 Giugno 2025",
    genre: "Opera",
    time: "21:00",
  },
  {
    title: "Carmen — Georges Bizet",
    date: "28 Giugno 2025",
    genre: "Opera",
    time: "21:00",
  },
  {
    title: "Il Volo — Concerto dal Vivo",
    date: "12 Luglio 2025",
    genre: "Concerto",
    time: "21:30",
  },
  {
    title: "La Traviata — Giuseppe Verdi",
    date: "26 Luglio 2025",
    genre: "Opera",
    time: "21:00",
  },
  {
    title: "Roberto Bolle and Friends",
    date: "9 Agosto 2025",
    genre: "Balletto",
    time: "21:00",
  },
];

const benefits = [
  {
    icon: MapPin,
    title: "A 200 metri dall'Arena",
    text: "Raggiungi l'ingresso principale in meno di 3 minuti a piedi da Vicolo Chiodo 4.",
  },
  {
    icon: UtensilsCrossed,
    title: "Cucina veneta autentica",
    text: "Pasta fresca fatta in casa, risotto all'Amarone, secondi di carne e pesce del territorio.",
  },
  {
    icon: CalendarCheck,
    title: "Prenotazione facile",
    text: "Chiama o scrivi su WhatsApp per riservare il tuo tavolo prima dello spettacolo.",
  },
  {
    icon: BookOpen,
    title: "Menu completo disponibile",
    text: "Dall'antipasto al dolce, con una selezione di vini della Valpolicella.",
  },
] as const;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "La Vecia Mescola Dell'Oste",
    description:
      "Ristorante ideale per una cena prima dello spettacolo all'Arena di Verona. Cucina veneta autentica a 200 metri dall'Arena.",
    url: "https://www.laveciamescola.it/arena",
    telephone: "+390458036608",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vicolo Chiodo 4",
      addressLocality: "Verona",
      postalCode: "37121",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.4399,
      longitude: 10.9924,
    },
    servesCuisine: ["Veneta", "Italiana"],
    priceRange: "€€",
  },
  ...events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Arena di Verona",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Piazza Bra 1",
        addressLocality: "Verona",
        postalCode: "37121",
        addressCountry: "IT",
      },
    },
  })),
];

export default function ArenaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArenaHero />

      {/* SEO Content */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-lg leading-relaxed text-foreground/80">
              La Vecia Mescola è il ristorante ideale per una cena prima dello
              spettacolo all&apos;Arena di Verona. A soli 200 metri
              dall&apos;ingresso principale, offriamo cucina veneta autentica:
              pasta fresca fatta in casa, risotto all&apos;Amarone, secondi di
              carne e pesce. Prenota il tuo tavolo per la serata.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Events */}
      <section className="bg-[#141412] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
                Prossimi Spettacoli
              </h2>
              <div className="mx-auto mt-4 h-px w-16 bg-gold/60" />
              <p className="mt-6 text-foreground/70">
                Cena da noi prima di uno di questi eventi all&apos;Arena
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <EventCard
                key={event.title}
                title={event.title}
                date={event.date}
                genre={event.genre}
                time={event.time}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
                Perché cenare da noi prima dello spettacolo
              </h2>
              <div className="mx-auto mt-4 h-px w-16 bg-gold/60" />
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.1}>
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <b.icon size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {b.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
