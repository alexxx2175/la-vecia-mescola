"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollingDecoText } from "@/components/ui/ScrollingDecoText";

const galleryCards = [
  {
    front: { src: "/images/tavola-elegante-rosa-rossa-cristalli-affresco-la-vecia-mescola.jpg", alt: "Atmosfera del ristorante" },
    back: { src: "/images/affresco-vite-uva-parete-bottiglie-vino-la-vecia-mescola.jpg", alt: "" },
  },
  {
    front: { src: "/images/bigoli-ragu-pasta-fatta-in-casa-la-vecia-mescola-verona.jpg", alt: "Cucina veneta" },
    back: { src: "/images/amarone-della-valpolicella-quintarelli-ristorante-la-vecia-mescola-verona.jpeg", alt: "" },
  },
  {
    front: { src: "/images/sala-ristorante-panoramica-affreschi-la-vecia-mescola-verona.jpg", alt: "Interno La Vecia Mescola" },
    back: { src: "/images/angolo-bar-liquori-distillati-la-vecia-mescola-verona.jpg", alt: "" },
  },
  {
    front: { src: "/images/brasato-manzo-polenta-tradizionale-la-vecia-mescola-verona.jpg", alt: "Secondi piatti" },
    back: { src: "/images/antipasto-crudo-prosciutto-polenta-lampada-tiffany-la-vecia-mescola.jpg", alt: "" },
  },
  {
    front: { src: "/images/tiramisu-artigianale-dolce-ristorante-la-vecia-mescola-verona.jpg", alt: "Dolci della casa" },
    back: { src: "/images/gamberi-frutti-di-mare-piatto-gourmet-la-vecia-mescola-verona.jpg", alt: "" },
  },
  {
    front: { src: "/images/cantina-vini-pregiati-tignanello-la-vecia-mescola-verona.jpeg", alt: "Cantina" },
    back: { src: "/images/ravioli-tartufo-crema-pasta-fresca-la-vecia-mescola.jpg", alt: "" },
  },
  {
    front: { src: "/images/clienti-cena-atmosfera-conviviale-la-vecia-mescola-verona.jpg", alt: "Sala e ambiente" },
    back: { src: "/images/semifreddo-cioccolato-frutti-rossi-arancia-dolce-la-vecia-mescola.jpg", alt: "" },
  },
  {
    front: { src: "/images/sala-ristorante-piena-clienti-cena-la-vecia-mescola-verona.jpg", alt: "Vista interno ristorante" },
    back: { src: "/images/spaghetti-nero-seppia-vongole-la-vecia-mescola-verona.jpg", alt: "" },
  },
  {
    front: { src: "/images/specchio-riflesso-sala-ristorante-la-vecia-mescola-verona.jpg", alt: "Ambiente La Vecia Mescola" },
    back: { src: "/images/tartare-cruda-gourmet-la-vecia-mescola-verona.jpg", alt: "" },
  },
];

function FlipCard({
  front,
  back,
  i,
}: {
  front: { src: string; alt: string };
  back: { src: string; alt: string };
  i: number;
}) {
  return (
    <ParallaxImage speed={0.1} className="group relative aspect-[3/4] overflow-hidden">
      <div className="relative h-full w-full [perspective:1000px]">
        <div className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <Image
              src={front.src}
              alt={front.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={i < 3}
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          </div>

          {/* Back */}
          <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]" aria-hidden="true">
            <Image
              src={back.src}
              alt=""
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          </div>
        </div>
      </div>
    </ParallaxImage>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" className="relative z-10 overflow-hidden bg-[#EBD9D4] py-20 sm:py-28">
      <div className="relative mx-auto min-h-[100vh] max-w-screen-2xl px-4 lg:px-8">
        {/* Testo decorativo — scorre sotto le immagini */}
        <div className="absolute inset-0 z-0 flex min-h-full items-center justify-center overflow-visible">
          <ScrollingDecoText className="font-serif text-[clamp(3rem,12vw,10rem)] font-semibold leading-[0.85] tracking-tight text-[#2C2420]/[0.07]">
            GALLERY
          </ScrollingDecoText>
        </div>

        <div className="relative z-10">
        <ScrollReveal duration={0.9}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">06</p>
          <h2 className="mt-2 font-serif font-semibold text-[#2C2420]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            GALLERY
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {galleryCards.map((card, i) => (
            <div key={`${card.front.src}-${i}`}>
              <ScrollReveal
                variant="slideFromBottomOvershoot"
                delay={i * 0.05}
                duration={0.85}
              >
                <FlipCard front={card.front} back={card.back} i={i} />
              </ScrollReveal>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
