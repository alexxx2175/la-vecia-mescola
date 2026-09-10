import type { Metadata } from "next";
import { CookiePolicyContent } from "@/components/pages/CookiePolicyContent";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: { absolute: "Cookie Policy | La Vecia Mescola" },
  description: "Which cookies the La Vecia Mescola website uses and how to manage them.",
  alternates: {
    canonical: `${SITE_URL}/en/cookie-policy`,
    languages: { it: `${SITE_URL}/cookie-policy`, en: `${SITE_URL}/en/cookie-policy`, "x-default": `${SITE_URL}/cookie-policy` },
  },
};

export default function CookiePolicyEnPage() {
  return <CookiePolicyContent lang="en" />;
}
