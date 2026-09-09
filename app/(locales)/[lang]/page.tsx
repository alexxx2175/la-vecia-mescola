import type { Metadata } from "next";
import { HomeContent } from "@/components/pages/HomeContent";
import { isLocale, type Locale } from "@/data/locales";
import { localizedMetadata } from "@/lib/page-metadata";

type Params = Promise<{ lang: string }>;

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  return localizedMetadata("home", (isLocale(lang) ? lang : "it") as Locale);
}

export default async function LocaleHomePage({ params }: { params: Params }) {
  const { lang } = await params;
  return <HomeContent lang={(isLocale(lang) ? lang : "it") as Locale} />;
}
