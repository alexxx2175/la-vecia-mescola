import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/pages/PrivacyPolicyContent";
import { SITE_URL } from "@/lib/site";

// Le informative esistono in italiano (radice) e inglese.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "en" }];
}

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | La Vecia Mescola" },
  description: "How La Vecia Mescola Dell'Oste, Verona, processes personal data.",
  alternates: {
    canonical: `${SITE_URL}/en/privacy-policy`,
    languages: { it: `${SITE_URL}/privacy-policy`, en: `${SITE_URL}/en/privacy-policy`, "x-default": `${SITE_URL}/privacy-policy` },
  },
};

export default function PrivacyPolicyEnPage() {
  return <PrivacyPolicyContent lang="en" />;
}
