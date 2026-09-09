import { Cormorant_Garamond } from "next/font/google";
import menuData from "@/data/menu.json";
import { MenuPage } from "@/components/menu/MenuPage";
import type { MenuData } from "@/data/types";
import type { Locale } from "@/data/locales";
import { buildMenuJsonLd } from "@/lib/menu-schema";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

export function MenuContent({ lang }: { lang: Locale }) {
  const menu = menuData as MenuData;
  const jsonLd = buildMenuJsonLd(menu, lang);

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
