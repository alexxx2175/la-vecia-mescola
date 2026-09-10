import type { Metadata } from "next";

export const SITE_URL = "https://www.laveciamescola.com";
export const RESTAURANT_ID = `${SITE_URL}/#restaurant`;
export const LANDLINE_E164 = "+390458036608";
export const LANDLINE_DISPLAY = "+39 045 803 6608";
/** Cellulare usato per WhatsApp e prenotazioni. */
export const PHONE_E164 = "+393928699275";
export const PHONE_DISPLAY = "+39 392 869 9275";
export const WHATSAPP_URL = "https://wa.me/393928699275";
export const GA_ID = "G-94TZMX9LMF";

export const OPENING_HOURS = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday"], opens: "12:00", closes: "23:30" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday"], opens: "12:00", closes: "22:30" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "12:00", closes: "23:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "12:00", closes: "22:00" },
] as const;

export const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Vicolo Chiodo 4",
  addressLocality: "Verona",
  addressRegion: "VR",
  postalCode: "37121",
  addressCountry: "IT",
} as const;

/**
 * Entità principale del sito. Ogni altra pagina che deve aggiungere proprietà
 * (menu, contatti) referenzia questo nodo tramite "@id" invece di ripeterlo.
 */
export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness"],
  "@id": RESTAURANT_ID,
  name: "La Vecia Mescola Dell'Oste",
  alternateName: "La Vecia Mescola",
  description:
    "Trattoria storica nel centro storico di Verona, a 2 minuti dall'Arena. Cucina veneta autentica: pasta fresca fatta in casa, risotto all'Amarone, bistecca Chateaubriand e vini della Valpolicella.",
  url: SITE_URL,
  image: [
    `${SITE_URL}/og-image.jpg`,
    `${SITE_URL}/images/sala-ristorante-panoramica-affreschi-la-vecia-mescola-verona.jpg`,
    `${SITE_URL}/images/tartare-piatto-gourmet-hero-la-vecia-mescola-verona.jpg`,
  ],
  logo: `${SITE_URL}/images/logo-la-vecia-mescola-ristorante-verona.png`,
  telephone: LANDLINE_E164,
  email: "info@laveciamescola.com",
  contactPoint: [
    { "@type": "ContactPoint", telephone: LANDLINE_E164, contactType: "reservations", availableLanguage: ["Italian", "English", "German"] },
    { "@type": "ContactPoint", telephone: PHONE_E164, contactType: "reservations", name: "WhatsApp", url: WHATSAPP_URL, availableLanguage: ["Italian", "English", "German"] },
  ],
  sameAs: [
    "https://www.instagram.com/laveciamescola",
    "https://www.facebook.com/people/La-Vecia-Mescola/100046353020148/",
    "https://www.tripadvisor.it/Restaurant_Review-g187871-d3746880-Reviews-La_Vecia_Mescola_Dell_Oste-Verona_Province_of_Verona_Veneto.html",
    "https://www.tripadvisor.com/Restaurant_Review-g187871-d3746880-Reviews-La_Vecia_Mescola_Dell_Oste-Verona_Province_of_Verona_Veneto.html",
    "https://www.thefork.it/ristorante/la-vecia-mescola-r495845",
    "https://www.paginegialle.it/verona-vr/ristoranti/la-vecia-mescola-dell-oste",
  ],
  hasMenu: {
    "@type": "Menu",
    "@id": `${SITE_URL}/menu#menu`,
    name: "Menu La Vecia Mescola",
    url: `${SITE_URL}/menu`,
  },
  address: POSTAL_ADDRESS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.4399,
    longitude: 10.9924,
  },
  openingHoursSpecification: OPENING_HOURS,
  servesCuisine: ["Veneta", "Italiana"],
  priceRange: "€€",
  acceptsReservations: true,
  potentialAction: {
    "@type": "ReserveAction",
    target: WHATSAPP_URL,
    name: "Prenota su WhatsApp",
  },
};

const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "La Vecia Mescola Dell'Oste — Ristorante nel centro storico di Verona",
};

/** Metadata condivisi da tutti i root layout (it / en / de). */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "La Vecia Mescola Dell'Oste | Ristorante storico nel centro di Verona",
    template: "%s | La Vecia Mescola",
  },
  description:
    "La Vecia Mescola Dell'Oste, trattoria storica nel centro di Verona a 2 minuti dall'Arena. Pasta fresca fatta in casa, risotto all'Amarone, bistecca Chateaubriand. Prenota su WhatsApp.",
  authors: [{ name: "La Vecia Mescola Dell'Oste" }],
  icons: {
    icon: [{ url: "/favicon.png", sizes: "48x48", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "La Vecia Mescola Dell'Oste",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};
