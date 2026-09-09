"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingGrapes } from "@/components/ui/FloatingGrapes";
import { RotatingReserveBadge } from "@/components/ui/RotatingReserveBadge";
import { VerticalSocialNav } from "@/components/ui/VerticalSocialNav";
import { SiteLanguageToggle } from "./SiteLanguageToggle";
import { SiteLanguageProvider } from "@/context/SiteLanguageContext";
import { stripLocale, type Locale } from "@/data/locales";

export function ConditionalChrome({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLuxuryPage = pathname?.startsWith("/quay");
  const isMenuPage = stripLocale(pathname ?? "/") === "/menu";

  if (isLuxuryPage) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <SiteLanguageProvider lang={lang}>
      <FloatingGrapes />
      <CustomCursor />
      <RotatingReserveBadge />
      <VerticalSocialNav />
      {!isMenuPage && <SiteLanguageToggle />}
      <Navbar />
      <main className="relative z-10 flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </SiteLanguageProvider>
  );
}
