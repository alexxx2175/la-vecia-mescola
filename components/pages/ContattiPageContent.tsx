import { ContattiContent } from "@/components/contatti/ContattiContent";
import { RESTAURANT_ID } from "@/lib/site";

// Nodo minimo che estende l'entità Restaurant del root layout tramite @id.
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": RESTAURANT_ID,
  email: "info@laveciamescola.com",
};

export function ContattiPageContent() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContattiContent />
    </>
  );
}
