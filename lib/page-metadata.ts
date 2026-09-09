import type { Metadata } from "next";
import { LOCALE_SEO, OG_LOCALE, hreflangMap, localePath, type Locale } from "@/data/locales";
import { SITE_URL, baseMetadata } from "@/lib/site";

type PageKey = "home" | "menu" | "contatti";
const PATHS: Record<PageKey, string> = { home: "/", menu: "/menu", contatti: "/contatti" };

/** Metadata completi (canonical, hreflang, Open Graph, Twitter) per una pagina localizzata. */
export function localizedMetadata(page: PageKey, lang: Locale): Metadata {
  const seo = LOCALE_SEO[lang][page];
  const path = PATHS[page];
  const url = `${SITE_URL}${localePath(lang, path)}`;
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: url, languages: hreflangMap(path) },
    openGraph: {
      ...baseMetadata.openGraph,
      locale: OG_LOCALE[lang],
      title: seo.title,
      description: seo.description,
      url,
    },
    twitter: { ...baseMetadata.twitter, title: seo.title, description: seo.description },
  };
}
