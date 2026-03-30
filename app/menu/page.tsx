import type { Metadata } from "next";
import menuData from "@/data/menu.json";
import { MenuPage } from "@/components/menu/MenuPage";
import type { MenuData, MenuItem } from "@/data/types";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Menu — La Vecia Mescola | Ristorante Verona",
  description:
    "Scopri il menu autentico de La Vecia Mescola, ristorante storico nel centro di Verona a 200 metri dall'Arena di Verona. Pasta fresca fatta in casa, risotto all'Amarone, cucina veneta tradizionale.",
  openGraph: {
    title: "Menu — La Vecia Mescola | Ristorante Verona",
    description:
      "Scopri il menu autentico de La Vecia Mescola, ristorante storico nel centro di Verona a 200 metri dall'Arena di Verona. Pasta fresca fatta in casa, risotto all'Amarone, cucina veneta tradizionale.",
  },
};

function buildJsonLd(menu: MenuData) {
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
          price: item.price,
          priceCurrency: "EUR",
        },
      })),
    };
  });

  const restaurant = {
    "@context": "https://schema.org" as const,
    "@type": "Restaurant" as const,
    name: "La Vecia Mescola",
    description:
      "Ristorante storico nel centro di Verona. Cucina veneta tradizionale, pasta fresca fatta in casa, risotto all'Amarone.",
    url: "https://www.laveciamescola.it",
    telephone: "+393928699275",
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: "Vicolo Chiodo 4",
      addressLocality: "Verona",
      postalCode: "37121",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: 45.4399,
      longitude: 10.9924,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification" as const,
        dayOfWeek: ["Monday"],
        opens: "12:00",
        closes: "23:30",
      },
      {
        "@type": "OpeningHoursSpecification" as const,
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "22:30",
      },
      {
        "@type": "OpeningHoursSpecification" as const,
        dayOfWeek: ["Friday", "Saturday"],
        opens: "12:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification" as const,
        dayOfWeek: ["Sunday"],
        opens: "12:00",
        closes: "22:00",
      },
    ],
    hasMenu: {
      "@type": "Menu" as const,
      hasMenuSection,
    },
  };

  const localBusiness = {
    "@context": "https://schema.org" as const,
    "@type": "LocalBusiness" as const,
    name: "La Vecia Mescola",
    image: "https://www.laveciamescola.it/og-image.jpg",
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: "Vicolo Chiodo 4",
      addressLocality: "Verona",
      postalCode: "37121",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: 45.4399,
      longitude: 10.9924,
    },
    telephone: "+393928699275",
    openingHours: "Mo 12:00-23:30; Tu-Th 12:00-22:30; Fr-Sa 12:00-23:00; Su 12:00-22:00",
  };

  return { restaurant, localBusiness };
}

export default function MenuPageRoute() {
  const menu = menuData as MenuData;
  const jsonLd = buildJsonLd(menu);

  return (
    <div className={cormorant.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.restaurant),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.localBusiness),
        }}
      />
      <MenuPage menuData={menu} logoFontClassName={cormorant.className} />
    </div>
  );
}
