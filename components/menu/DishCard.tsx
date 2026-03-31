"use client";

import { motion } from "framer-motion";
import type { MenuItem, Language } from "@/data/types";

interface DishCardProps {
  item: MenuItem;
  lang: Language;
}

function formatPrice(price: number): string {
  return `€ ${price.toFixed(2).replace(".", ",")}`;
}

function getLocalized(item: MenuItem, field: "name" | "desc", lang: Language): string {
  const key = `${field}_${lang}` as keyof MenuItem;
  return (item[key] as string | undefined) || item[`${field}_it` as keyof MenuItem] as string;
}

const UI_TEXT: Record<string, Record<Language, string>> = {
  frozen: {
    it: "può essere surgelato", en: "may be frozen", es: "puede estar congelado", de: "kann tiefgekühlt sein",
    ru: "может быть заморожено", ro: "poate fi congelat", zh: "可能为冷冻食材", ja: "冷凍の場合あり",
  },
  ask_waiter: {
    it: "chiedi al cameriere", en: "ask waiter", es: "pregunte al camarero", de: "bitte fragen Sie",
    ru: "спросите официанта", ro: "întrebați chelnerul", zh: "请咨询服务员", ja: "スタッフにお尋ねください",
  },
};

export function DishCard({ item, lang }: DishCardProps) {
  const name = getLocalized(item, "name", lang);
  const description = getLocalized(item, "desc", lang);

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
            ** {UI_TEXT.frozen[lang]}
          </span>
        )}
        {item.ask_waiter && (
          <span className="text-xs italic text-[#2C2420]/60">
            * {UI_TEXT.ask_waiter[lang]}
          </span>
        )}
        {item.note && (
          <span className="text-xs italic text-[#2C2420]/60">{item.note}</span>
        )}
      </div>
    </motion.article>
  );
}
