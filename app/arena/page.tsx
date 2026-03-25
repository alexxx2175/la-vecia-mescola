import type { Metadata } from "next";
import { ArenaHero } from "@/components/arena/ArenaHero";
import { ArenaEventsClient } from "@/components/arena/ArenaEventsClient";

export const metadata: Metadata = {
  title: "Eventi a Verona — La Vecia Mescola",
  description:
    "Scopri gli eventi a Verona: opera, concerti, balletto e musica da camera. Filtra per tipologia e acquista i biglietti.",
  openGraph: {
    title: "Eventi a Verona — La Vecia Mescola",
    description:
      "Scopri gli eventi a Verona: opera, concerti, balletto e musica da camera. Filtra per tipologia e acquista i biglietti.",
  },
};

export default function ArenaPage() {
  return (
    <>
      <ArenaHero />
      <ArenaEventsClient />
    </>
  );
}
