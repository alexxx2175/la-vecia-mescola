import type { Metadata } from "next";
import { ContattiPageContent } from "@/components/pages/ContattiPageContent";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("contatti", "it");

export default function ContattiPage() {
  return <ContattiPageContent />;
}
