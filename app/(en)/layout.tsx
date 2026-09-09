import type { Metadata } from "next";
import { RootDocument } from "@/components/layout/RootDocument";
import { baseMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, locale: "en_GB" },
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
