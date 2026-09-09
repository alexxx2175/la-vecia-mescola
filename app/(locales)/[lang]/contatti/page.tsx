import type { Metadata } from "next";
import { ContattiPageContent } from "@/components/pages/ContattiPageContent";
import { isLocale, type Locale } from "@/data/locales";
import { localizedMetadata } from "@/lib/page-metadata";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  return localizedMetadata("contatti", (isLocale(lang) ? lang : "it") as Locale);
}

export default function LocaleContattiPage() {
  return <ContattiPageContent />;
}
