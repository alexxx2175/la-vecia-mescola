import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Date reali dell'ultima modifica strutturale: Google ignora un lastmod
// che coincide sempre con l'istante della build.
const PAGES_UPDATED = new Date("2026-09-09");
const arenaAlternates = {
  languages: {
    it: `${SITE_URL}/arena`,
    en: `${SITE_URL}/en/arena`,
    de: `${SITE_URL}/de/arena`,
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Le pagine eventi si rigenerano ogni ora (ISR): lastmod = oggi.
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return [
    { url: SITE_URL, lastModified: PAGES_UPDATED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/menu`, lastModified: PAGES_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/arena`, lastModified: today, changeFrequency: "daily", priority: 0.9, alternates: arenaAlternates },
    { url: `${SITE_URL}/en/arena`, lastModified: today, changeFrequency: "daily", priority: 0.8, alternates: arenaAlternates },
    { url: `${SITE_URL}/de/arena`, lastModified: today, changeFrequency: "daily", priority: 0.8, alternates: arenaAlternates },
    { url: `${SITE_URL}/contatti`, lastModified: PAGES_UPDATED, changeFrequency: "monthly", priority: 0.7 },
  ];
}
