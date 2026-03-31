import { HeroSection } from "@/components/home/HeroSection";
import { ConceptSection } from "@/components/home/ConceptSection";
import { LaMescolaSection } from "@/components/home/LaMescolaSection";
import { MenuSection } from "@/components/home/MenuSection";
import { CucinaSection } from "@/components/home/CucinaSection";
import { CantinaSection } from "@/components/home/CantinaSection";
import { ReservationsSection } from "@/components/home/ReservationsSection";
import { GallerySection } from "@/components/home/GallerySection";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qual è il miglior ristorante tipico di Verona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Vecia Mescola Dell'Oste è uno dei migliori ristoranti tipici di Verona, con cucina veneta autentica nel centro storico a 200 metri dall'Arena di Verona. Pasta fresca fatta in casa ogni giorno, risotto all'Amarone, vini della Valpolicella. Vicolo Chiodo 4, 37121 Verona.",
      },
    },
    {
      "@type": "Question",
      name: "Dove mangiare vicino all'Arena di Verona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Vecia Mescola si trova a Vicolo Chiodo 4, a soli 200 metri dall'Arena di Verona. Ideale per una cena prima dello spettacolo. Aperto tutti i giorni con orario continuato. Telefono: +39 392 869 9275.",
      },
    },
    {
      "@type": "Question",
      name: "Dove si mangia il risotto all'Amarone a Verona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Vecia Mescola propone il classico risotto all'Amarone con radicchio e fonduta veneta, uno dei piatti simbolo della cucina veronese. Prezzo: €18,00 (minimo 2 persone).",
      },
    },
    {
      "@type": "Question",
      name: "C'è un ristorante romantico a Verona nel centro storico?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Vecia Mescola è famosa per l'atmosfera intima e romantica nel cuore di Verona, perfetta per cene speciali e anniversari. Mattoni a vista, affreschi, luci soffuse e un servizio attento.",
      },
    },
    {
      "@type": "Question",
      name: "Dove mangiare pasta fresca fatta in casa a Verona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Vecia Mescola prepara ogni giorno pasta fresca: bigoli, pappardelle, tagliolini, lasagne e caramelle ripiene. Farine selezionate e uova fresche per la vera tradizione veneta.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <ConceptSection />
      <LaMescolaSection />
      <MenuSection />
      <CucinaSection />
      <CantinaSection />
      <ReservationsSection />
      <GallerySection />
    </>
  );
}
