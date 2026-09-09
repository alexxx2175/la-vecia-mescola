import type { Metadata } from "next";
import { MenuContent } from "@/components/pages/MenuContent";
import { isLocale, type Locale } from "@/data/locales";
import { localizedMetadata } from "@/lib/page-metadata";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  return localizedMetadata("menu", (isLocale(lang) ? lang : "it") as Locale);
}

export default async function LocaleMenuPage({ params }: { params: Params }) {
  const { lang } = await params;
  return <MenuContent lang={(isLocale(lang) ? lang : "it") as Locale} />;
}
