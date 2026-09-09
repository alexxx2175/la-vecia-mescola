import type { Metadata } from "next";
import { QuayBodyStyle } from "@/components/luxury/QuayBodyStyle";

// Pagina sperimentale di design: non indicizzata, non linkata, fuori dalla sitemap.
export const metadata: Metadata = {
  title: { absolute: "La Vecia Mescola — Ristorante Verona" },
  description:
    "Cucina veneta autentica nel cuore di Verona. Pasta fresca, risotto all'Amarone, vini della Valpolicella.",
  robots: { index: false, follow: false },
};

export default function QuayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QuayBodyStyle />
      {children}
    </>
  );
}
