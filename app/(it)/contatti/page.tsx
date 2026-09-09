import type { Metadata } from "next";
import { ContattiContent } from "@/components/contatti/ContattiContent";
import { PHONE_E164, RESTAURANT_ID } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Contatti e Prenotazioni | La Vecia Mescola Dell'Oste, Verona",
  },
  description:
    "Prenota un tavolo alla Vecia Mescola su WhatsApp: +39 392 869 9275. Vicolo Chiodo 4, Verona — a 2 minuti dall'Arena. Aperto tutti i giorni a pranzo e cena.",
  alternates: {
    canonical: "https://www.laveciamescola.com/contatti",
  },
  openGraph: {
    title: "Contatti e Prenotazioni | La Vecia Mescola Dell'Oste, Verona",
    description:
      "Prenota su WhatsApp al +39 392 869 9275. Vicolo Chiodo 4, Verona — a 2 minuti dall'Arena di Verona.",
    url: "https://www.laveciamescola.com/contatti",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Vecia Mescola — Contatti e prenotazioni Verona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contatti e Prenotazioni | La Vecia Mescola Dell'Oste, Verona",
    description:
      "Prenota su WhatsApp al +39 392 869 9275. Vicolo Chiodo 4, Verona.",
    images: ["/og-image.jpg"],
  },
};

// Nodo minimo che estende l'entità Restaurant del root layout tramite @id:
// niente indirizzo/orari duplicati, solo le proprietà specifiche dei contatti.
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": RESTAURANT_ID,
  email: "info@laveciamescola.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_E164,
    contactType: "reservations",
    availableLanguage: ["Italian", "English", "German"],
  },
};

export default function ContattiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContattiContent />
    </>
  );
}
