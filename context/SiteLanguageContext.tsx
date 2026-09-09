"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { SiteLang } from "@/data/translations";
import { ARENA_LOCALES, localePath, stripLocale } from "@/data/locales";

type SiteLanguageContextType = {
  lang: SiteLang;
  setLang: (lang: SiteLang) => void;
};

const SiteLanguageContext = createContext<SiteLanguageContextType>({
  lang: "it",
  setLang: () => {},
});

const STORAGE_KEY = "site-lang";

/**
 * La lingua è determinata dall'URL (route group per lingua), quindi ogni
 * versione ha una pagina propria indicizzabile. Cambiare lingua significa
 * navigare alla stessa pagina nell'altra lingua.
 */
export function SiteLanguageProvider({
  lang,
  children,
}: {
  lang: SiteLang;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = (next: SiteLang) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage non disponibile: la navigazione funziona comunque
    }
    if (next === lang) return;
    const base = stripLocale(pathname);
    const target =
      base === "/arena" && !ARENA_LOCALES.includes(next)
        ? localePath(next, "/")
        : localePath(next, base);
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(`${target}${hash}`);
  };

  return (
    <SiteLanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </SiteLanguageContext.Provider>
  );
}

export function useSiteLanguage() {
  return useContext(SiteLanguageContext);
}
