"use client";

import { useState, useSyncExternalStore } from "react";
import { useIsClient } from "@/lib/use-client-value";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, CalendarDays } from "lucide-react";
import Link from "next/link";
import { LanguageToggle } from "./LanguageToggle";
import { CategoryTabs } from "./CategoryTabs";
import { DishCard } from "./DishCard";
import type { MenuData, MenuCategoryKey, Language } from "@/data/types";
import { CATEGORY_ORDER, CATEGORY_LABELS, ALLERGENS } from "@/data/types";

interface MenuPageProps {
  menuData: MenuData;
}

const UI_TEXT = {
  menu_title: {
    it: "Il Menu", en: "The Menu", es: "El Menú", de: "Die Speisekarte", ru: "Меню",
    ro: "Meniul", zh: "菜单", ja: "メニュー", fr: "Le Menu", pt: "O Menu",
  },
  menu_subtitle: {
    it: "Cucina veneta e pasta fresca fatta in casa, nel centro di Verona",
    en: "Venetian cuisine and handmade fresh pasta in the heart of Verona",
    es: "Cocina véneta y pasta fresca casera en el centro de Verona",
    de: "Venezianische Küche und hausgemachte Pasta im Zentrum von Verona",
    ru: "Венетская кухня и домашняя паста в центре Вероны",
    ro: "Bucătărie venețiană și paste proaspete de casă în centrul Veronei",
    zh: "维罗纳市中心的威尼托美食与手工鲜意面",
    ja: "ヴェローナ中心部のヴェネト料理と手打ち生パスタ",
    fr: "Cuisine vénitienne et pâtes fraîches maison au cœur de Vérone",
    pt: "Cozinha veneziana e massa fresca caseira no centro de Verona",
  },
  allergen_legend: {
    it: "Legenda allergeni", en: "Allergen legend", es: "Leyenda de alérgenos", de: "Allergenlegende",
    ru: "Обозначения аллергенов", ro: "Legenda alergenilor", zh: "过敏原说明", ja: "アレルゲン一覧",
    fr: "Légende des allergènes", pt: "Legenda de alergénios",
  },
  events_banner_title: {
    it: "Scopri gli eventi settimanali a Verona",
    en: "Discover Verona's weekly events",
    es: "Descubre los eventos semanales de Verona",
    de: "Entdecke die wöchentlichen Events in Verona",
    ru: "Еженедельные мероприятия Вероны",
    ro: "Descoperă evenimentele săptămânale din Verona",
    zh: "探索维罗纳的每周活动",
    ja: "ヴェローナの週刊イベントを探る",
    fr: "Découvrez les événements hebdomadaires de Vérone",
    pt: "Descubra os eventos semanais de Verona",
  },
  events_banner_cta: {
    it: "Vedi tutti gli eventi",
    en: "See all events",
    es: "Ver todos los eventos",
    de: "Alle Events anzeigen",
    ru: "Смотреть все мероприятия",
    ro: "Vezi toate evenimentele",
    zh: "查看所有活动",
    ja: "すべてのイベントを見る",
    fr: "Voir tous les événements",
    pt: "Ver todos os eventos",
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

const hashListeners = new Set<() => void>();

function subscribeHash(onChange: () => void) {
  hashListeners.add(onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    hashListeners.delete(onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

function categoryFromHash(): MenuCategoryKey {
  const h = window.location.hash.slice(1);
  return CATEGORY_ORDER.includes(h as MenuCategoryKey) ? (h as MenuCategoryKey) : "antipasti";
}

export function MenuPage({ menuData }: MenuPageProps) {
  const [lang, setLang] = useState<Language>("it");
  // L'hash dell'URL è l'unica fonte di verità per la categoria attiva
  // (server: "antipasti", così l'HTML iniziale è deterministico).
  const activeCategory = useSyncExternalStore(
    subscribeHash,
    categoryFromHash,
    () => "antipasti" as MenuCategoryKey
  );
  const [allergenLegendOpen, setAllergenLegendOpen] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);
  const mounted = useIsClient();

  const itemsFor = (category: MenuCategoryKey) =>
    (menuData[category] ?? []).filter(
      (item) => typeof item.price === "number" && item.price > 0
    );

  const currentIndex = CATEGORY_ORDER.indexOf(activeCategory);
  const direction = currentIndex >= prevIndex ? 1 : -1;

  const handleCategoryChange = (category: MenuCategoryKey) => {
    setPrevIndex(CATEGORY_ORDER.indexOf(activeCategory));
    window.history.replaceState(null, "", `#${category}`);
    hashListeners.forEach((cb) => cb());
  };

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
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
      {/* Language toggle — fixed bottom-left */}
      <div className="fixed bottom-6 left-6 z-[100]">
        <LanguageToggle lang={lang} onLangChange={setLang} />
      </div>

      <main className="flex-1 pb-8 pt-20">
        <header className="px-4 pb-4 pt-2 text-center">
          <h1 className="font-serif text-3xl font-semibold text-[#2C2420] sm:text-4xl">
            {UI_TEXT.menu_title[lang]}
          </h1>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-[#2C2420]/60">
            {UI_TEXT.menu_subtitle[lang]}
          </p>
        </header>
        <div className="sticky top-[56px] z-50 border-b border-[#2C2420]/10 bg-[#EBD9D4]/95 backdrop-blur-md px-4">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            lang={lang}
          />
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-6">
          {/* Tutte le categorie sono nell'HTML (indicizzabili); le tab mostrano solo quella attiva. */}
          {CATEGORY_ORDER.map((category) => {
            const isActive = category === activeCategory;
            const items = itemsFor(category);
            const list = items.map((item, index) => (
              <motion.div
                key={`${category}-${index}-${item.name_it}`}
                variants={itemVariants}
                initial={isActive && mounted ? "hidden" : "visible"}
                animate="visible"
                transition={{ delay: isActive && mounted ? index * 0.04 : 0 }}
              >
                <DishCard item={item} lang={lang} />
              </motion.div>
            ));

            return (
              <section
                key={category}
                id={`panel-${category}`}
                role="tabpanel"
                aria-labelledby={`tab-${category}`}
                hidden={!isActive}
              >
                <h2 className="sr-only">{CATEGORY_LABELS[category][lang]}</h2>
                {isActive ? (
                  <motion.div
                    key={`${category}-${lang}`}
                    custom={direction}
                    variants={slideVariants}
                    initial={mounted ? "enter" : "center"}
                    animate="center"
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="space-y-0"
                  >
                    {list}
                  </motion.div>
                ) : (
                  <div className="space-y-0">{list}</div>
                )}
              </section>
            );
          })}
        </div>

        <div className="px-4">
          <AllergenLegend
            lang={lang}
            isOpen={allergenLegendOpen}
            onToggle={() => setAllergenLegendOpen(!allergenLegendOpen)}
          />
        </div>

        {/* Events banner */}
        <div className="mt-10 bg-[#2C2420] px-6 py-10 text-center">
          <CalendarDays
            size={28}
            className="mx-auto mb-3 text-[#B8962E]"
            aria-hidden
          />
          <p
            className="font-serif font-semibold text-[#EBD9D4]"
            style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}
          >
            {UI_TEXT.events_banner_title[lang]}
          </p>
          <Link
            href="/arena"
            className="mt-5 inline-flex min-h-[48px] items-center rounded-sm border border-[#B8962E]/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#B8962E] transition-colors hover:bg-[#B8962E]/10"
          >
            {UI_TEXT.events_banner_cta[lang]}
          </Link>
        </div>
      </main>
    </div>
  );
}
