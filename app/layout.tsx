import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.laveciamescola.com"),
  title: {
    default: "La Vecia Mescola Dell'Oste — Ristorante Verona",
    template: "%s — La Vecia Mescola",
  },
  description:
    "La Vecia Mescola — trattoria storica nel cuore di Verona dal centro storico. Pasta fresca fatta in casa, risotto all'Amarone, bistecca Chateaubriand. A 2 minuti dall'Arena di Verona. Prenota su WhatsApp.",
  keywords: [
    "ristorante Verona",
    "cucina veneta",
    "ristorante Arena Verona",
    "pasta fresca Verona",
    "risotto Amarone",
    "La Vecia Mescola",
  ],
  authors: [{ name: "La Vecia Mescola Dell'Oste" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.laveciamescola.com",
    siteName: "La Vecia Mescola Dell'Oste",
    title: "La Vecia Mescola Dell'Oste — Ristorante Verona",
    description:
      "La Vecia Mescola — trattoria storica nel cuore di Verona. Pasta fresca, risotto all'Amarone, bistecca Chateaubriand. A 2 minuti dall'Arena. Prenota su WhatsApp.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Vecia Mescola Dell'Oste — Ristorante nel centro storico di Verona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Vecia Mescola Dell'Oste — Ristorante Verona",
    description:
      "La Vecia Mescola — trattoria storica nel cuore di Verona. Pasta fresca, risotto all'Amarone, bistecca Chateaubriand. A 2 minuti dall'Arena. Prenota su WhatsApp.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    languages: {
      "it-IT": "https://www.laveciamescola.com",
      "en-US": "https://www.laveciamescola.com/en",
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness"],
  "@id": "https://www.laveciamescola.com",
  name: "La Vecia Mescola Dell'Oste",
  image: "https://www.laveciamescola.com/og-image.jpg",
  url: "https://www.laveciamescola.com",
  telephone: "+393928699275",
  menu: "https://www.laveciamescola.com/menu",
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
  servesCuisine: ["Veneta", "Italiana"],
  priceRange: "€€",
  acceptsReservations: "True",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/tavola-elegante-rosa-rossa-cristalli-affresco-la-vecia-mescola.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-full flex flex-col bg-[#EBD9D4] text-[#2C2420]">
        <ConditionalChrome>{children}</ConditionalChrome>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-94TZMX9LMF"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-94TZMX9LMF');
          `}
        </Script>
      </body>
    </html>
  );
}
