import type { ReactNode } from "react";
import Script from "next/script";
import { preconnect, preload } from "react-dom";
import { Playfair_Display, Lato } from "next/font/google";
import "@/app/globals.css";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { GA_ID, restaurantJsonLd } from "@/lib/site";

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

import type { Locale } from "@/data/locales";

export type SiteLocale = Locale;

/**
 * Documento HTML condiviso dai tre root layout. L'attributo `lang` cambia per
 * route group, così /en/* e /de/* dichiarano la lingua corretta ai crawler.
 */
export function RootDocument({
  lang,
  children,
}: {
  lang: SiteLocale;
  children: ReactNode;
}) {
  preconnect("https://www.googletagmanager.com");
  // Font del logo e dei titoli hero: è nel percorso critico dell'LCP
  preload("/fonts/E111Viva.ttf", { as: "font", type: "font/ttf", crossOrigin: "anonymous" });

  return (
    <html
      lang={lang}
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-[#EBD9D4] text-[#2C2420]">
        <ConditionalChrome lang={lang}>{children}</ConditionalChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
