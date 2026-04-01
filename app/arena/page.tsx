import type { Metadata } from "next";
import { ArenaEventsClient } from "@/components/arena/ArenaEventsClient";
import { GermanArenaSection } from "@/components/arena/GermanArenaSection";

export const metadata: Metadata = {
  title: "Eventi a Verona — La Vecia Mescola",
  description:
    "Cena prima dello spettacolo all'Arena di Verona? La Vecia Mescola è a 2 minuti a piedi. Cucina veneta autentica, prenotazione facile su WhatsApp. Aperto ogni sera.",
  keywords: [
    "Restaurant Verona",
    "Essen Verona",
    "Restaurant Arena Verona",
    "Verona Restaurant Geheimtipp",
    "Italienisches Restaurant Verona Altstadt",
    "Abendessen vor der Oper Verona",
  ],
  alternates: {
    languages: {
      "de-DE": "https://www.laveciamescola.com/arena",
      "it-IT": "https://www.laveciamescola.com/arena",
    },
  },
  openGraph: {
    title: "Eventi a Verona — La Vecia Mescola",
    description:
      "Cena prima dello spettacolo all'Arena di Verona? La Vecia Mescola è a 2 minuti a piedi. Cucina veneta autentica, prenotazione facile su WhatsApp. Aperto ogni sera.",
  },
};

export default function ArenaPage() {
  return (
    <>
      <ArenaEventsClient />
      <GermanArenaSection />
    </>
  );
}
