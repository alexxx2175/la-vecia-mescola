import type { Metadata } from "next";
import { ContattiContent } from "@/components/contatti/ContattiContent";

export const metadata: Metadata = {
  title: "Contatti — La Vecia Mescola | Ristorante Verona",
  description:
    "Contattaci o prenota un tavolo. La Vecia Mescola, Vicolo Chiodo 4, 37121 Verona. Telefono: +39 392 869 9275.",
};

export default function ContattiPage() {
  return <ContattiContent />;
}
