import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RootDocument } from "@/components/layout/RootDocument";
import { OG_LOCALE, SECONDARY_LOCALES, isLocale } from "@/data/locales";
import { baseMetadata } from "@/lib/site";

type Params = Promise<{ lang: string }>;

// Solo le lingue registrate: qualsiasi altro prefisso è un 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SECONDARY_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return baseMetadata;
  return {
    ...baseMetadata,
    openGraph: { ...baseMetadata.openGraph, locale: OG_LOCALE[lang] },
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Params }>) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "it") notFound();
  return <RootDocument lang={lang}>{children}</RootDocument>;
}
