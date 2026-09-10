"use client";

import Script from "next/script";
import { LEGAL } from "@/data/legal";
import { useConsent } from "@/lib/consent";

/** Google Analytics 4 viene caricato solo dopo il consenso ai cookie statistici. */
export function GoogleAnalytics() {
  const consent = useConsent();
  if (!consent?.analytics) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${LEGAL.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${LEGAL.gaId}');`}
      </Script>
    </>
  );
}
