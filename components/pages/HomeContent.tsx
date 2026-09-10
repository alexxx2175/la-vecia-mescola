import { HeroSection } from "@/components/home/HeroSection";
import { ConceptSection } from "@/components/home/ConceptSection";
import { LaMescolaSection } from "@/components/home/LaMescolaSection";
import { MenuSection } from "@/components/home/MenuSection";
import { CucinaSection } from "@/components/home/CucinaSection";
import { CantinaSection } from "@/components/home/CantinaSection";
import { ReservationsSection } from "@/components/home/ReservationsSection";
import { EventsTeaserSection } from "@/components/home/EventsTeaserSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FaqSection } from "@/components/ui/FaqSection";
import { HOME_FAQ, faqJsonLd } from "@/data/faq";
import { LOCALE_SEO, type Locale } from "@/data/locales";
import { loadArenaEvents } from "@/lib/events";
import { upcoming } from "@/lib/events-shared";

/**
 * Home condivisa da tutte le lingue: le sezioni leggono la lingua dal contesto
 * (impostato dal root layout della route), le FAQ vengono dal registro locale.
 */
export async function HomeContent({ lang }: { lang: Locale }) {
  const arenaEvents = await loadArenaEvents();
  const teaserEvents = upcoming(arenaEvents, 3).map((e) => ({
    title: e.title,
    date: e.date,
    type: e.type,
    location: e.location,
  }));
  const seo = LOCALE_SEO[lang];
  const faq = lang === "it" ? HOME_FAQ : seo.faq;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }}
      />
      <HeroSection />
      <ConceptSection />
      <LaMescolaSection />
      <MenuSection />
      <CucinaSection />
      <CantinaSection />
      <ReservationsSection />
      <EventsTeaserSection events={teaserEvents} />
      <ReviewsSection lang={lang} />
      <FaqSection id="faq" items={faq} kicker={seo.faqKicker} title={seo.faqTitle} />
      <GallerySection />
    </>
  );
}
