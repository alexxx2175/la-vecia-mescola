import { HeroSection } from "@/components/home/HeroSection";
import { ConceptSection } from "@/components/home/ConceptSection";
import { LaMescolaSection } from "@/components/home/LaMescolaSection";
import { MenuSection } from "@/components/home/MenuSection";
import { CucinaSection } from "@/components/home/CucinaSection";
import { CantinaSection } from "@/components/home/CantinaSection";
import { ReservationsSection } from "@/components/home/ReservationsSection";
import { EventsTeaserSection } from "@/components/home/EventsTeaserSection";
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
        text: "La Vecia Mescola Dell'Oste, in Vicolo Chiodo 4 a Verona, prepara il risotto all'Amarone con riso Vialone Nano IGP mantecato con Amarone della Valpolicella DOCG, radicchio di Treviso e fonduta veneta. È il piatto simbolo del ristorante, disponibile per un minimo di 2 persone al prezzo di €18,00 a persona. Il ristorante si trova a 200 metri dall'Arena di Verona.",
      },
    },
    {
      "@type": "Question",
      name: "Cos'è il risotto all'Amarone della Valpolicella?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il risotto all'Amarone è il piatto simbolo della cucina veronese. Si prepara con riso Vialone Nano IGP del Veneto — una varietà a chicco semitondo che assorbe i condimenti in modo eccezionale — mantecato lentamente con Amarone della Valpolicella DOCG, uno dei vini rossi più prestigiosi d'Italia. Il piatto è completato con radicchio di Treviso e fonduta veneta, che aggiungono dolcezza amaricante e cremosità. Il risultato è un risotto ricco, avvolgente, espressione autentica del territorio veronese.",
      },
    },
    {
      "@type": "Question",
      name: "Qual è il piatto tipico veronese da non perdere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il piatto tipico veronese per eccellenza è il risotto all'Amarone, preparato con riso Vialone Nano IGP e Amarone della Valpolicella DOCG. Tra i must della cucina veronese ci sono anche la pasta fresca fatta in casa (bigoli al ragù, pappardelle), il bollito con la pearà e le carni alla griglia. A La Vecia Mescola in Vicolo Chiodo 4, a 200 metri dall'Arena di Verona, si trovano tutti questi piatti della tradizione veneta autentica.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto costa il risotto all'Amarone a Verona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il risotto all'Amarone della Valpolicella a La Vecia Mescola di Verona costa €18,00 a persona (minimo 2 persone). È preparato con riso Vialone Nano IGP, Amarone della Valpolicella DOCG, radicchio di Treviso e fonduta veneta. Vicolo Chiodo 4, a 200 metri dall'Arena di Verona. Prenotazione su WhatsApp: +39 392 869 9275.",
      },
    },
    {
      "@type": "Question",
      name: "Cos'è il riso Vialone Nano?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il Vialone Nano è una varietà di riso IGP coltivata nel Veneto, a chicco semitondo e corto, con un elevato contenuto di amido che lo rende ideale per i risotti mantecati. Assorbe i condimenti meglio di altre varietà, mantenendo la giusta consistenza al dente. È l'ingrediente base del risotto all'Amarone veronese e di molti risotti della tradizione veneta. A La Vecia Mescola di Verona il Vialone Nano viene utilizzato per il risotto all'Amarone con fonduta veneta.",
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
      <EventsTeaserSection />
      <GallerySection />
    </>
  );
}
