import type { Metadata } from "next";
import { MenuContent } from "@/components/pages/MenuContent";
import { localizedMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = localizedMetadata("menu", "it");

export default function MenuPageRoute() {
  return <MenuContent lang="it" />;
}
