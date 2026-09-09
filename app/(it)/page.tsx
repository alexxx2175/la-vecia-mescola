import type { Metadata } from "next";
import { HomeContent } from "@/components/pages/HomeContent";
import { localizedMetadata } from "@/lib/page-metadata";

// Il teaser eventi è renderizzato lato server e si aggiorna ogni ora (ISR).
export const revalidate = 3600;

export const metadata: Metadata = {
  ...localizedMetadata("home", "it"),
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
};

export default function HomePage() {
  return <HomeContent lang="it" />;
}
