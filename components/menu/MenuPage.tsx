"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { CategoryTabs } from "./CategoryTabs";
import { DishCard } from "./DishCard";
import type { MenuData, MenuCategoryKey, Language } from "@/data/types";
import { CATEGORY_ORDER, ALLERGENS_IT, ALLERGENS_EN } from "@/data/types";

interface MenuPageProps {
  menuData: MenuData;
  logoFontClassName?: string;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function AllergenLegend({
  lang,
  isOpen,
  onToggle,
}: {
  lang: Language;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mt-8 border-t border-[#2C2420]/10 pt-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left text-sm font-medium uppercase tracking-wider text-[#2C2420]/80 transition-colors hover:text-[#2C2420] focus:outline-none focus:ring-2 focus:ring-[#B8962E] focus:ring-offset-2 focus:ring-offset-[#EBD9D4]"
        aria-expanded={isOpen}
        aria-controls="allergen-legend"
        id="allergen-legend-button"
      >
        {lang === "it" ? "Legenda allergeni" : "Allergen legend"}
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
          {Object.entries(ALLERGENS_IT).map(([num, nameIt]) => {
            const nameEn = (ALLERGENS_EN as Record<number, string>)[Number(num)];
            return (
              <div key={num} className="flex items-center gap-2">
                <span className="shrink-0 rounded px-1.5 py-0.5 font-medium text-[#2C2420]/70 ring-1 ring-[#2C2420]/20">
                  {num}
                </span>
                <span>
                  {nameIt} / {nameEn}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

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
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2C2420]/10 bg-[#EBD9D4]/95 px-4 py-3 backdrop-blur-sm"
      >
        <div className="flex-1" aria-hidden />
        <h1
          className={`text-xl font-semibold text-[#2C2420] sm:text-2xl ${logoFontClassName ?? ""}`}
        >
          La Vecia Mescola
        </h1>
        <div className="flex flex-1 justify-end">
          <LanguageToggle lang={lang} onLangChange={setLang} />
        </div>
      </motion.header>

      <main className="flex-1 px-4 pb-8 pt-4">
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
                  key={`${activeCategory}-${index}-${lang === "it" ? item.name_it : item.name_en}`}
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

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-auto border-t border-[#2C2420]/10 px-4 py-6"
      >
        <div className="mx-auto max-w-2xl space-y-2 text-center text-sm text-[#2C2420]/80">
          <p>Vicolo Chiodo 4, Verona</p>
          <p>
            <a
              href="tel:+390458036608"
              className="hover:text-[#B8962E] focus:text-[#B8962E] focus:outline-none"
            >
              +39 045 8036608
            </a>
          </p>
          <p className="text-xs">
            Lun–Gio: 12:00–14:30 / 19:00–22:30<br />
            Ven–Sab: 12:00–14:30 / 19:00–23:00<br />
            Dom: 12:00–14:30 / 19:00–22:00
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <a
              href="https://www.instagram.com/laveciamescola"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2C2420]/70 transition-colors hover:text-[#B8962E] focus:text-[#B8962E] focus:outline-none"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="https://www.facebook.com/laveciamescola"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2C2420]/70 transition-colors hover:text-[#B8962E] focus:text-[#B8962E] focus:outline-none"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
