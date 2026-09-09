import type { Metadata } from "next";
import menuData from "@/data/menu.json";
import { MenuPage } from "@/components/menu/MenuPage";
import type { MenuData, MenuItem } from "@/data/types";
import { Cormorant_Garamond } from "next/font/google";
import { SITE_URL } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    absolute: "Menu | La Vecia Mescola Dell'Oste, Ristorante Tipico a Verona",
  },
  description:
    "Scopri il menu de La Vecia Mescola: pasta fresca fatta in casa, risotto all'Amarone, bistecca Chateaubriand e cucina veneta autentica. A 2 minuti dall'Arena di Verona. Vicolo Chiodo 4.",
  alternates: {
    canonical: "https://www.laveciamescola.com/menu",
  },
  openGraph: {
    title: "Menu | La Vecia Mescola Dell'Oste, Ristorante Tipico a Verona",
    description:
      "Pasta fresca fatta in casa, risotto all'Amarone, bistecca Chateaubriand. Cucina veneta autentica a 2 minuti dall'Arena di Verona.",
    url: "https://www.laveciamescola.com/menu",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Menu La Vecia Mescola — Cucina veneta autentica a Verona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu | La Vecia Mescola Dell'Oste, Ristorante Tipico a Verona",
    description:
      "Pasta fresca fatta in casa, risotto all'Amarone, bistecca Chateaubriand. A 2 minuti dall'Arena di Verona.",
    images: ["/og-image.jpg"],
  },
};

/**
 * Nodo Menu completo. Il root layout collega Restaurant → hasMenu allo stesso
 * "@id", quindi qui non si ripetono indirizzo, orari e coordinate.
 */
function buildMenuJsonLd(menu: MenuData) {
  const categories = [
    { key: "antipasti", name: "Antipasti" },
    { key: "primi", name: "Primi" },
    { key: "secondi", name: "Secondi" },
    { key: "contorni", name: "Contorni" },
    { key: "dolci", name: "Dolci" },
    { key: "bevande", name: "Bevande" },
  ] as const;

  const hasMenuSection = categories.map(({ key, name }) => {
    const rawItems = (menu[key as keyof MenuData] ?? []) as MenuItem[];
    const items = rawItems.filter(
      (item) => typeof item.price === "number" && item.price > 0
    );
    return {
      "@type": "MenuSection" as const,
      name,
      hasMenuItem: items.map((item) => ({
        "@type": "MenuItem" as const,
        name: item.name_it,
        description: item.desc_it,
        offers: {
          "@type": "Offer" as const,
          price: item.price.toFixed(2),
          priceCurrency: "EUR",
        },
      })),
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}/menu#menu`,
    name: "Menu La Vecia Mescola",
    url: `${SITE_URL}/menu`,
    inLanguage: "it",
    hasMenuSection,
  };
}

export default function MenuPageRoute() {
  const menu = menuData as MenuData;
  const jsonLd = buildMenuJsonLd(menu);

  return (
    <div className={cormorant.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MenuPage menuData={menu} />
    </div>
  );
}
