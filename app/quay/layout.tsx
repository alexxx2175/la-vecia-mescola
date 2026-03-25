import type { Metadata } from "next";
import { QuayBodyStyle } from "@/components/luxury/QuayBodyStyle";

export const metadata: Metadata = {
  title: "La Vecia Mescola — Ristorante Verona",
  description:
    "Cucina veneta autentica nel cuore di Verona. Pasta fresca, risotto all'Amarone, vini della Valpolicella.",
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
