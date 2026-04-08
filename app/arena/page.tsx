import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { ArenaEventsClient } from "@/components/arena/ArenaEventsClient";
import { ArenaQuickNav } from "@/components/arena/ArenaQuickNav";
import { GermanArenaSection } from "@/components/arena/GermanArenaSection";
import { CulturaEventsSection, type CulturaEvent } from "@/components/arena/CulturaEventsSection";

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

function loadCulturaEvents(): CulturaEvent[] {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "events-cultura.json");
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CulturaEvent[]) : [];
  } catch {
    return [];
  }
}

export default function ArenaPage() {
  const culturaEvents = loadCulturaEvents();

  return (
    <>
      <ArenaQuickNav />
      <ArenaEventsClient />
      <GermanArenaSection />
      <div id="prossimi-eventi" />
      <CulturaEventsSection events={culturaEvents} />
    </>
  );
}
