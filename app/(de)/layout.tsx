import type { Metadata } from "next";
import { RootDocument } from "@/components/layout/RootDocument";
import { baseMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, locale: "de_DE" },
};

export default function GermanRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument lang="de">{children}</RootDocument>;
}
