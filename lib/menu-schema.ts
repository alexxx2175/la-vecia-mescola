import type { MenuData, MenuItem } from "@/data/types";
import type { Locale } from "@/data/locales";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/types";
import { SITE_URL } from "@/lib/site";

function localized(item: MenuItem, field: "name" | "desc", lang: Locale): string {
  const key = `${field}_${lang}` as keyof MenuItem;
  return (item[key] as string | undefined) || (item[`${field}_it` as keyof MenuItem] as string);
}

/**
 * Nodo Menu nella lingua della pagina. Il root layout collega Restaurant → hasMenu
 * allo stesso "@id", quindi qui non si ripetono indirizzo, orari e coordinate.
 */
export function buildMenuJsonLd(menu: MenuData, lang: Locale) {
  const hasMenuSection = CATEGORY_ORDER.map((key) => {
    const items = (menu[key] ?? []).filter(
      (item) => typeof item.price === "number" && item.price > 0
    );
    return {
      "@type": "MenuSection" as const,
      name: CATEGORY_LABELS[key][lang],
      hasMenuItem: items.map((item) => ({
        "@type": "MenuItem" as const,
        name: localized(item, "name", lang),
        description: localized(item, "desc", lang),
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
    url: `${SITE_URL}${lang === "it" ? "" : `/${lang}`}/menu`,
    inLanguage: lang,
    hasMenuSection,
  };
}
