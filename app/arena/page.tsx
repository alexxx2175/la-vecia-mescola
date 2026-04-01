import type { Metadata } from "next";
import { ArenaEventsClient } from "@/components/arena/ArenaEventsClient";

export const metadata: Metadata = {
  title: "Eventi a Verona — La Vecia Mescola",
  description:
    "Cena prima dello spettacolo all'Arena di Verona? La Vecia Mescola è a 2 minuti a piedi. Cucina veneta autentica, prenotazione facile su WhatsApp. Aperto ogni sera.",
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
    </>
  );
}
