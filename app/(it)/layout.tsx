import type { Metadata } from "next";
import { RootDocument } from "@/components/layout/RootDocument";
import { baseMetadata } from "@/lib/site";

export const metadata: Metadata = baseMetadata;

export default function ItalianRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument lang="it">{children}</RootDocument>;
}
