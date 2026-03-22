"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingGrapes } from "@/components/ui/FloatingGrapes";
import { RotatingReserveBadge } from "@/components/ui/RotatingReserveBadge";
import { VerticalSocialNav } from "@/components/ui/VerticalSocialNav";

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLuxuryPage = pathname?.startsWith("/quay");

  if (isLuxuryPage) {
    return <>{children}</>;
  }

  return (
    <>
      <FloatingGrapes />
      <CustomCursor />
      <RotatingReserveBadge />
      <VerticalSocialNav />
      <Navbar />
      <main className="relative z-10 flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
