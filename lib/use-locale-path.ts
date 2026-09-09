"use client";

import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { arenaPath, localePath } from "@/data/locales";

/** Link interni nella lingua corrente: `to("/menu")` → "/en/menu" su una pagina inglese. */
export function useLocalePath() {
  const { lang } = useSiteLanguage();
  return {
    lang,
    to: (path: string) => (path === "/arena" ? arenaPath(lang) : localePath(lang, path)),
  };
}
