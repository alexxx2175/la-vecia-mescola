"use client";

import { motion } from "framer-motion";
import { RotatingReserveBadge } from "@/components/ui/RotatingReserveBadge";
import { VerticalSocialNav } from "@/components/ui/VerticalSocialNav";
import { VerticalNav } from "./VerticalNav";
import { ScrollIndicator } from "./ScrollIndicator";
import { LuxuryHero } from "./LuxuryHero";
import { LuxurySection } from "./LuxurySection";
import Link from "next/link";

const sections = [
  {
    id: "concept",
    number: "01",
    title: "Concept",
    description:
      "Esplorando l'eredità della cucina veneta. Un viaggio di (ri)scoperta nel cuore di Verona, a pochi passi dall'Arena.",
    imageSrc: "/images/sala-ristorante-panoramica-affreschi-la-vecia-mescola-verona.jpg",
    imageAlt: "Interno — La Vecia Mescola",
    reverse: false,
    bgVariant: "default" as const,
  },
  {
    id: "cucina",
    number: "02",
    title: "La Cucina",
    description:
      "Pasta fresca fatta in casa, risotto all'Amarone, ingredienti del territorio. La tradizione veneta nel piatto, con tecniche tradizionali e contemporanee.",
    imageSrc: "/images/bigoli-ragu-pasta-fatta-in-casa-la-vecia-mescola-verona.jpg",
    imageAlt: "Cucina veneta tradizionale",
    reverse: true,
    bgVariant: "alt" as const,
  },
  {
    id: "cantina",
    number: "03",
    title: "La Cantina",
    description:
      "Una selezione di vini della Valpolicella e del territorio veronese: Amarone, Soave Classico, Ripasso. Scelti per accompagnare ogni piatto.",
    imageSrc: "/images/cantina-vini-pregiati-tignanello-la-vecia-mescola-verona.jpeg",
    imageAlt: "Cantina e vini",
    reverse: false,
    bgVariant: "default" as const,
  },
  {
    id: "territorio",
    number: "04",
    title: "Pasto & Presente",
    description:
      "La Vecia Mescola è radicata nel cuore di Verona. Un invito a celebrare il convivio — come si faceva nella Verona di un tempo.",
    imageSrc: "/images/brasato-manzo-polenta-tradizionale-la-vecia-mescola-verona.jpg",
    imageAlt: "Cucina veneta",
    reverse: true,
    bgVariant: "alt" as const,
  },
];

export function LuxuryLanding() {
  return (
    <div className="min-h-screen bg-[#EBD9D4] font-serif">
      {/* Link torna alla home */}
      <Link
        href="/"
        className="fixed left-8 top-8 z-50 font-serif text-sm text-[#2C2420]/70 transition-colors hover:text-[#B8962E]"
      >
        ← Home
      </Link>

      {/* Cerchio prenotazione — slide da destra all'ingresso */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <RotatingReserveBadge />
      </motion.div>
      <VerticalNav />
      <VerticalSocialNav />

      {/* Hero */}
      <LuxuryHero />

      {/* Sezioni */}
      {sections.map((section) => (
        <LuxurySection key={section.id} {...section} />
      ))}

      {/* Scroll indicator */}
      <ScrollIndicator />
    </div>
  );
}
