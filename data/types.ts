export type Language = "it" | "en" | "es" | "de" | "ru" | "ro" | "zh" | "ja";

export const LANGUAGES: Language[] = ["it", "en", "es", "de", "ru", "ro", "zh", "ja"];

export const LANGUAGE_FLAGS: Record<Language, string> = {
  it: "🇮🇹",
  en: "🇬🇧",
  es: "🇪🇸",
  de: "🇩🇪",
  ru: "🇷🇺",
  ro: "🇷🇴",
  zh: "🇨🇳",
  ja: "🇯🇵",
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  it: "Italiano",
  en: "English",
  es: "Español",
  de: "Deutsch",
  ru: "Русский",
  ro: "Română",
  zh: "中文",
  ja: "日本語",
};

export type MenuCategoryKey =
  | "antipasti"
  | "primi"
  | "secondi"
  | "contorni"
  | "dolci"
  | "bevande";

export type LocalizedText = Record<Language, string>;

export interface MenuItem {
  name_it: string;
  name_en: string;
  name_es?: string;
  name_de?: string;
  name_ru?: string;
  name_ro?: string;
  name_zh?: string;
  name_ja?: string;
  desc_it: string;
  desc_en: string;
  desc_es?: string;
  desc_de?: string;
  desc_ru?: string;
  desc_ro?: string;
  desc_zh?: string;
  desc_ja?: string;
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
  antipasti: { it: "Antipasti", en: "Starters", es: "Entrantes", de: "Vorspeisen", ru: "Закуски", ro: "Aperitive", zh: "前菜", ja: "前菜" },
  primi: { it: "Primi", en: "First courses", es: "Primeros platos", de: "Erste Gänge", ru: "Первые блюда", ro: "Felul întâi", zh: "头盘", ja: "プリモ" },
  secondi: { it: "Secondi", en: "Main courses", es: "Segundos platos", de: "Hauptgerichte", ru: "Вторые блюда", ro: "Felul doi", zh: "主菜", ja: "セコンド" },
  contorni: { it: "Contorni", en: "Side dishes", es: "Guarniciones", de: "Beilagen", ru: "Гарниры", ro: "Garnituri", zh: "配菜", ja: "付け合わせ" },
  dolci: { it: "Dolci", en: "Desserts", es: "Postres", de: "Desserts", ru: "Десерты", ro: "Deserturi", zh: "甜点", ja: "デザート" },
  bevande: { it: "Bevande", en: "Drinks", es: "Bebidas", de: "Getränke", ru: "Напитки", ro: "Băuturi", zh: "饮品", ja: "ドリンク" },
};

export const ALLERGENS: Record<Language, Record<number, string>> = {
  it: {
    1: "Glutine", 2: "Crostacei", 3: "Uova", 4: "Pesce", 5: "Arachidi",
    6: "Soia", 7: "Latte", 8: "Frutta a guscio", 9: "Sedano", 10: "Senape",
    11: "Semi di sesamo", 12: "Anidride solforosa", 13: "Lupini", 14: "Molluschi",
  },
  en: {
    1: "Gluten", 2: "Crustaceans", 3: "Eggs", 4: "Fish", 5: "Peanuts",
    6: "Soy", 7: "Milk", 8: "Tree nuts", 9: "Celery", 10: "Mustard",
    11: "Sesame seeds", 12: "Sulphur dioxide", 13: "Lupin", 14: "Molluscs",
  },
  es: {
    1: "Gluten", 2: "Crustáceos", 3: "Huevos", 4: "Pescado", 5: "Cacahuetes",
    6: "Soja", 7: "Leche", 8: "Frutos de cáscara", 9: "Apio", 10: "Mostaza",
    11: "Semillas de sésamo", 12: "Dióxido de azufre", 13: "Altramuces", 14: "Moluscos",
  },
  de: {
    1: "Gluten", 2: "Krebstiere", 3: "Eier", 4: "Fisch", 5: "Erdnüsse",
    6: "Soja", 7: "Milch", 8: "Schalenfrüchte", 9: "Sellerie", 10: "Senf",
    11: "Sesamsamen", 12: "Schwefeldioxid", 13: "Lupinen", 14: "Weichtiere",
  },
  ru: {
    1: "Глютен", 2: "Ракообразные", 3: "Яйца", 4: "Рыба", 5: "Арахис",
    6: "Соя", 7: "Молоко", 8: "Орехи", 9: "Сельдерей", 10: "Горчица",
    11: "Кунжут", 12: "Диоксид серы", 13: "Люпин", 14: "Моллюски",
  },
  ro: {
    1: "Gluten", 2: "Crustacee", 3: "Ouă", 4: "Pește", 5: "Arahide",
    6: "Soia", 7: "Lapte", 8: "Fructe cu coajă", 9: "Țelină", 10: "Muștar",
    11: "Semințe de susan", 12: "Dioxid de sulf", 13: "Lupin", 14: "Moluște",
  },
  zh: {
    1: "麸质", 2: "甲壳类", 3: "鸡蛋", 4: "鱼类", 5: "花生",
    6: "大豆", 7: "牛奶", 8: "坚果", 9: "芹菜", 10: "芥末",
    11: "芝麻", 12: "二氧化硫", 13: "羽扇豆", 14: "软体动物",
  },
  ja: {
    1: "グルテン", 2: "甲殻類", 3: "卵", 4: "魚", 5: "ピーナッツ",
    6: "大豆", 7: "乳", 8: "ナッツ類", 9: "セロリ", 10: "マスタード",
    11: "ごま", 12: "亜硫酸塩", 13: "ルピナス", 14: "軟体動物",
  },
};

// Keep backward compat exports
export const ALLERGENS_IT = ALLERGENS.it;
export const ALLERGENS_EN = ALLERGENS.en;
