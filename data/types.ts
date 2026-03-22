export type Language = "it" | "en";

export type MenuCategoryKey =
  | "antipasti"
  | "primi"
  | "secondi"
  | "contorni"
  | "dolci"
  | "bevande";

export interface LocalizedText {
  it: string;
  en: string;
}

export interface MenuItem {
  name_it: string;
  name_en: string;
  desc_it: string;
  desc_en: string;
  price: number;
  allergens: number[];
  frozen?: boolean;
  ask_waiter?: boolean;
  note?: string;
}

export interface MenuData {
  antipasti: MenuItem[];
  primi: MenuItem[];
  secondi: MenuItem[];
  contorni: MenuItem[];
  dolci: MenuItem[];
  bevande: MenuItem[];
}

export const CATEGORY_ORDER: MenuCategoryKey[] = [
  "antipasti",
  "primi",
  "secondi",
  "contorni",
  "dolci",
  "bevande",
];

export const CATEGORY_LABELS: Record<MenuCategoryKey, LocalizedText> = {
  antipasti: { it: "Antipasti", en: "Starters" },
  primi: { it: "Primi", en: "First courses" },
  secondi: { it: "Secondi", en: "Main courses" },
  contorni: { it: "Contorni", en: "Side dishes" },
  dolci: { it: "Dolci", en: "Desserts" },
  bevande: { it: "Bevande", en: "Drinks" },
};

export const ALLERGENS_IT: Record<number, string> = {
  1: "Glutine",
  2: "Crostacei",
  3: "Uova",
  4: "Pesce",
  5: "Arachidi",
  6: "Soia",
  7: "Latte",
  8: "Frutta a guscio",
  9: "Sedano",
  10: "Senape",
  11: "Semi di sesamo",
  12: "Anidride solforosa",
  13: "Lupini",
  14: "Molluschi",
};

export const ALLERGENS_EN: Record<number, string> = {
  1: "Gluten",
  2: "Crustaceans",
  3: "Eggs",
  4: "Fish",
  5: "Peanuts",
  6: "Soy",
  7: "Milk",
  8: "Tree nuts",
  9: "Celery",
  10: "Mustard",
  11: "Sesame seeds",
  12: "Sulphur dioxide",
  13: "Lupin",
  14: "Molluscs",
};
