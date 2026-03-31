"use client";

import { motion } from "framer-motion";
import type { MenuCategoryKey } from "@/data/types";
import type { Language } from "@/data/types";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/data/types";

interface CategoryTabsProps {
  activeCategory: MenuCategoryKey;
  onCategoryChange: (category: MenuCategoryKey) => void;
  lang: Language;
}

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
  lang,
}: CategoryTabsProps) {
  return (
    <nav
      className="scrollbar-hide flex justify-center overflow-x-auto py-3"
      role="tablist"
      aria-label="Menu categories"
    >
      {CATEGORY_ORDER.map((category) => {
        const isActive = activeCategory === category;
        const label = CATEGORY_LABELS[category][lang];

        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${category}`}
            id={`tab-${category}`}
            onClick={() => onCategoryChange(category)}
            className={`relative shrink-0 whitespace-nowrap px-4 py-3 min-h-[48px] text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B8962E] focus:ring-offset-2 focus:ring-offset-[#EBD9D4] sm:rounded ${
              isActive
                ? "text-[#B8962E]"
                : "text-[#2C2420]/70 hover:text-[#2C2420]"
            }`}
          >
            {label}
            {isActive && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-[#B8962E]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
