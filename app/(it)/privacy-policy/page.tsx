import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/pages/PrivacyPolicyContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sul trattamento dei dati personali di La Vecia Mescola Dell'Oste, Verona.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
    languages: { it: `${SITE_URL}/privacy-policy`, en: `${SITE_URL}/en/privacy-policy`, "x-default": `${SITE_URL}/privacy-policy` },
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent lang="it" />;
}
