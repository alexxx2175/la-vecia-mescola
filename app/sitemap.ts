import type { MetadataRoute } from "next";
import { ARENA_LOCALES, LOCALES, hreflangMap, localePath } from "@/data/locales";
import { SITE_URL } from "@/lib/site";

// Date reali dell'ultima modifica strutturale: Google ignora un lastmod
// che coincide sempre con l'istante della build.
const PAGES_UPDATED = new Date("2026-09-09");

export default function sitemap(): MetadataRoute.Sitemap {
  // Le pagine con eventi si rigenerano ogni ora (ISR): lastmod = oggi.
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const entries: MetadataRoute.Sitemap = [];

  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly"; lastModified: Date }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly", lastModified: today },
    { path: "/menu", priority: 0.9, changeFrequency: "weekly", lastModified: PAGES_UPDATED },
    { path: "/contatti", priority: 0.7, changeFrequency: "monthly", lastModified: PAGES_UPDATED },
  ];

  for (const page of pages) {
    const alternates = { languages: hreflangMap(page.path) };
    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE_URL}${localePath(lang, page.path)}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: lang === "it" ? page.priority : Math.max(0.5, page.priority - 0.2),
        alternates,
      });
    }
  }

  const arenaAlternates = { languages: hreflangMap("/arena", ARENA_LOCALES) };
  for (const lang of ARENA_LOCALES) {
    entries.push({
      url: `${SITE_URL}${localePath(lang, "/arena")}`,
      lastModified: today,
      changeFrequency: "daily",
      priority: lang === "it" ? 0.9 : 0.8,
      alternates: arenaAlternates,
    });
  }

  return entries;
}
