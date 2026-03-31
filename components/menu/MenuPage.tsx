"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { CategoryTabs } from "./CategoryTabs";
import { DishCard } from "./DishCard";
import type { MenuData, MenuCategoryKey, Language } from "@/data/types";
import { CATEGORY_ORDER, ALLERGENS } from "@/data/types";

interface MenuPageProps {
  menuData: MenuData;
  logoFontClassName?: string;
}

const UI_TEXT = {
  allergen_legend: {
    it: "Legenda allergeni", en: "Allergen legend", es: "Leyenda de alérgenos", de: "Allergenlegende",
    ru: "Обозначения аллергенов", ro: "Legenda alergenilor", zh: "过敏原说明", ja: "アレルゲン一覧",
  },
} satisfies Record<string, Record<Language, string>>;

function AllergenLegend({
  lang,
  isOpen,
  onToggle,
}: {
  lang: Language;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const allergens = ALLERGENS[lang] ?? ALLERGENS.it;

  return (
    <div className="mt-8 border-t border-[#2C2420]/10 pt-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[48px] w-full items-center justify-between text-left text-sm font-medium uppercase tracking-wider text-[#2C2420]/80 transition-colors hover:text-[#2C2420] focus:outline-none focus:ring-2 focus:ring-[#B8962E] focus:ring-offset-2 focus:ring-offset-[#EBD9D4]"
        aria-expanded={isOpen}
        aria-controls="allergen-legend"
        id="allergen-legend-button"
      >
        {UI_TEXT.allergen_legend[lang]}
        {isOpen ? (
          <ChevronUp className="size-4" aria-hidden />
        ) : (
          <ChevronDown className="size-4" aria-hidden />
        )}
      </button>
      <motion.div
        id="allergen-legend"
        role="region"
        aria-labelledby="allergen-legend-button"
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 text-xs text-[#2C2420]/80 sm:grid-cols-2">
          {Object.entries(allergens).map(([num, name]) => (
            <div key={num} className="flex items-center gap-2">
              <span className="shrink-0 rounded px-1.5 py-0.5 font-medium text-[#2C2420]/70 ring-1 ring-[#2C2420]/20">
                {num}
              </span>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function MenuPage({ menuData, logoFontClassName }: MenuPageProps) {
  const [lang, setLang] = useState<Language>("it");
  const [activeCategory, setActiveCategory] =
    useState<MenuCategoryKey>("antipasti");
  const [allergenLegendOpen, setAllergenLegendOpen] = useState(false);
  const prevCategoryRef = useRef<number>(0);

  const items = (menuData[activeCategory] ?? []).filter(
    (item) => typeof item.price === "number" && item.price > 0
  );

  const currentIndex = CATEGORY_ORDER.indexOf(activeCategory);
  const direction = currentIndex >= prevCategoryRef.current ? 1 : -1;

  const handleCategoryChange = (category: MenuCategoryKey) => {
    prevCategoryRef.current = CATEGORY_ORDER.indexOf(activeCategory);
    setActiveCategory(category);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${category}`);
    }
  };

  useLayoutEffect(() => {
    const fromHash = (): MenuCategoryKey | null => {
      const h = window.location.hash.slice(1);
      if (!h || !CATEGORY_ORDER.includes(h as MenuCategoryKey)) return null;
      return h as MenuCategoryKey;
    };
    const cat = fromHash();
    if (cat) setActiveCategory(cat);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const h = window.location.hash.slice(1);
      if (h && CATEGORY_ORDER.includes(h as MenuCategoryKey)) {
        setActiveCategory(h as MenuCategoryKey);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#EBD9D4]">
      {/* Floating language toggle — bottom-right, above all overlays */}
      <div className="fixed bottom-24 right-6 z-[100]">
        <LanguageToggle lang={lang} onLangChange={setLang} />
      </div>

      <main className="flex-1 px-4 pb-8 pt-20">
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          lang={lang}
        />

        <div className="mx-auto max-w-2xl pt-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              id={`panel-${activeCategory}`}
              key={`${activeCategory}-${lang}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeCategory}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-0"
            >
              {items.map((item, index) => (
                <motion.div
                  key={`${activeCategory}-${index}-${item.name_it}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.04 }}
                >
                  <DishCard item={item} lang={lang} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <AllergenLegend
          lang={lang}
          isOpen={allergenLegendOpen}
          onToggle={() => setAllergenLegendOpen(!allergenLegendOpen)}
        />
      </main>
    </div>
  );
}
