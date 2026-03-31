"use client";

import { motion } from "framer-motion";
import type { MenuItem } from "@/data/types";
import type { Language } from "@/data/types";

interface DishCardProps {
  item: MenuItem;
  lang: Language;
}

function formatPrice(price: number): string {
  return `€ ${price.toFixed(2).replace(".", ",")}`;
}

export function DishCard({ item, lang }: DishCardProps) {
  const name = lang === "it" ? item.name_it : item.name_en;
  const description = lang === "it" ? item.desc_it : item.desc_en;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        x: 4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="group relative border-b border-[#2C2420]/10 py-4 pl-3 last:border-0"
    >
      {/* Left border grows on hover */}
      <span className="absolute left-0 top-0 h-0 w-0.5 rounded-full bg-[#B8962E] transition-all duration-200 group-hover:h-full" />

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="min-w-0 flex-1 text-base font-semibold leading-tight text-[#2C2420] sm:text-lg">
          {name}
        </h3>
        <span className="shrink-0 whitespace-nowrap text-base font-medium text-[#B8962E] transition-colors duration-200 group-hover:text-[#8B4513]">
          {formatPrice(item.price)}
        </span>
      </div>

      {description && (
        <p className="mt-1 text-sm italic text-neutral-600">{description}</p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {item.allergens.length > 0 &&
          item.allergens.map((a) => (
            <span
              key={a}
              className="rounded px-1.5 py-0.5 text-xs font-medium text-[#2C2420]/70 ring-1 ring-[#2C2420]/20 transition-transform duration-150 hover:scale-110"
            >
              {a}
            </span>
          ))}
        {item.frozen && (
          <span className="text-xs italic text-[#2C2420]/60">
            ** {lang === "it" ? "può essere surgelato" : "may be frozen"}
          </span>
        )}
        {item.ask_waiter && (
          <span className="text-xs italic text-[#2C2420]/60">
            * {lang === "it" ? "chiedi al cameriere" : "ask waiter"}
          </span>
        )}
        {item.note && (
          <span className="text-xs italic text-[#2C2420]/60">{item.note}</span>
        )}
      </div>
    </motion.article>
  );
}
