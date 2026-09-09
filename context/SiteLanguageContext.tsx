"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { SiteLang } from "@/data/translations";

type SiteLanguageContextType = {
  lang: SiteLang;
  setLang: (lang: SiteLang) => void;
};

const SiteLanguageContext = createContext<SiteLanguageContextType>({
  lang: "it",
  setLang: () => {},
});

const STORAGE_KEY = "site-lang";
const listeners = new Set<() => void>();

function readStoredLang(): SiteLang {
  try {
    return (localStorage.getItem(STORAGE_KEY) as SiteLang | null) ?? "it";
  } catch {
    return "it";
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  // Server: sempre "it" (HTML indicizzabile in italiano); client: lingua salvata.
  const lang = useSyncExternalStore(subscribe, readStoredLang, () => "it" as SiteLang);

  const setLang = (l: SiteLang) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // storage non disponibile: la lingua resta quella di default
    }
    listeners.forEach((cb) => cb());
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
