import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ConceptSection } from "@/components/home/ConceptSection";
import { LaMescolaSection } from "@/components/home/LaMescolaSection";
import { MenuSection } from "@/components/home/MenuSection";
import { CucinaSection } from "@/components/home/CucinaSection";
import { CantinaSection } from "@/components/home/CantinaSection";
import { ReservationsSection } from "@/components/home/ReservationsSection";
import { EventsTeaserSection } from "@/components/home/EventsTeaserSection";
import { GallerySection } from "@/components/home/GallerySection";
import { FaqSection } from "@/components/ui/FaqSection";
import { HOME_FAQ, faqJsonLd } from "@/data/faq";
import { loadArenaEvents } from "@/lib/events";
import { upcoming } from "@/lib/events-shared";
import { SITE_URL, baseMetadata } from "@/lib/site";

// Il teaser eventi è renderizzato lato server e si aggiorna ogni ora (ISR).
export const revalidate = 3600;

const TITLE = "La Vecia Mescola Dell'Oste | Ristorante storico nel centro di Verona";
const DESCRIPTION =
  "La Vecia Mescola Dell'Oste, trattoria storica nel centro di Verona a 2 minuti dall'Arena. Pasta fresca fatta in casa, risotto all'Amarone, bistecca Chateaubriand. Prenota su WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "ristorante Verona",
    "cucina veneta",
    "ristorante Arena Verona",
    "pasta fresca Verona",
    "risotto all'Amarone Verona",
    "risotto Vialone Nano Verona",
    "piatti tipici veronesi",
    "Amarone della Valpolicella ristorante",
    "trattoria Verona centro storico",
    "La Vecia Mescola",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    ...baseMetadata.openGraph,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    ...baseMetadata.twitter,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function HomePage() {
  const arenaEvents = await loadArenaEvents();
  const teaserEvents = upcoming(arenaEvents, 3).map((e) => ({
    title: e.title,
    date: e.date,
    type: e.type,
    location: e.location,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(HOME_FAQ)) }}
      />
      <HeroSection />
      <ConceptSection />
      <LaMescolaSection />
      <MenuSection />
      <CucinaSection />
      <CantinaSection />
      <ReservationsSection />
      <EventsTeaserSection events={teaserEvents} />
      <FaqSection
        id="faq"
        items={HOME_FAQ}
        kicker="Domande frequenti"
        title="Ristorante tipico a Verona, vicino all'Arena"
      />
      <GallerySection />
    </>
  );
}
