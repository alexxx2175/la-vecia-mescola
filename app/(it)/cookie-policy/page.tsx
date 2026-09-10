import type { Metadata } from "next";
import { CookiePolicyContent } from "@/components/pages/CookiePolicyContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Quali cookie usa il sito di La Vecia Mescola Dell'Oste e come gestirli.",
  alternates: {
    canonical: `${SITE_URL}/cookie-policy`,
    languages: { it: `${SITE_URL}/cookie-policy`, en: `${SITE_URL}/en/cookie-policy`, "x-default": `${SITE_URL}/cookie-policy` },
  },
};

export default function CookiePolicyPage() {
  return <CookiePolicyContent lang="it" />;
}
