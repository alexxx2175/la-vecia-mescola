"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { SiteLang } from "@/data/translations";

type SiteLanguageContextType = {
  lang: SiteLang;
  setLang: (lang: SiteLang) => void;
};

const SiteLanguageContext = createContext<SiteLanguageContextType>({
  lang: "it",
  setLang: () => {},
});

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SiteLang>("it");

  useEffect(() => {
    const saved = localStorage.getItem("site-lang") as SiteLang | null;
    if (saved) setLangState(saved);
  }, []);

  const setLang = (l: SiteLang) => {
    setLangState(l);
    localStorage.setItem("site-lang", l);
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
