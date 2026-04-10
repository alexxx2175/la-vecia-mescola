import type { Metadata } from "next";
import { ContattiContent } from "@/components/contatti/ContattiContent";

export const metadata: Metadata = {
  title: {
    absolute: "Contatti & Prenotazioni | La Vecia Mescola — Verona",
  },
  description:
    "Prenota un tavolo alla Vecia Mescola su WhatsApp: +39 392 869 9275. Vicolo Chiodo 4, Verona — a 2 minuti dall'Arena. Aperto tutti i giorni a pranzo e cena.",
  alternates: {
    canonical: "https://www.laveciamescola.com/contatti",
  },
  openGraph: {
    title: "Contatti & Prenotazioni | La Vecia Mescola — Verona",
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
    title: "Contatti & Prenotazioni | La Vecia Mescola — Verona",
    description:
      "Prenota su WhatsApp al +39 392 869 9275. Vicolo Chiodo 4, Verona.",
    images: ["/og-image.jpg"],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness"],
  "@id": "https://www.laveciamescola.com",
  name: "La Vecia Mescola Dell'Oste",
  url: "https://www.laveciamescola.com",
  telephone: "+393928699275",
  email: "info@laveciamescola.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vicolo Chiodo 4",
    addressLocality: "Verona",
    addressRegion: "VR",
    postalCode: "37121",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.4399,
    longitude: 10.9924,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+393928699275",
    contactType: "reservations",
    availableLanguage: ["Italian", "English", "German"],
    contactOption: "TollFree",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday"],
      opens: "12:00",
      closes: "23:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "12:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "12:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "12:00",
      closes: "22:00",
    },
  ],
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
