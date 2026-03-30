"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingGrapes } from "@/components/ui/FloatingGrapes";
import { RotatingReserveBadge } from "@/components/ui/RotatingReserveBadge";
import { VerticalSocialNav } from "@/components/ui/VerticalSocialNav";
import { ChatbotWidget } from "@/components/ui/ChatbotWidget";

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLuxuryPage = pathname?.startsWith("/quay");

  if (isLuxuryPage) {
    return (
      <>
        {children}
        <ChatbotWidget />
      </>
    );
  }

  return (
    <>
      <FloatingGrapes />
      <CustomCursor />
      <RotatingReserveBadge />
      <VerticalSocialNav />
      <ChatbotWidget />
      <Navbar />
      <main className="relative z-10 flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
