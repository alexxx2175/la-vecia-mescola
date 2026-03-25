"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollingDecoText } from "@/components/ui/ScrollingDecoText";

const galleryImages = [
  { src: "/images/19.jpeg", alt: "Atmosfera del ristorante" },
  { src: "/images/cucina.jpg", alt: "Cucina veneta" },
  { src: "/images/27.jpeg", alt: "Interno La Vecia Mescola" },
  { src: "/images/secondi.jpg", alt: "Secondi piatti" },
  { src: "/images/dolci.jpg", alt: "Dolci della casa" },
  { src: "/images/cantina.jpg", alt: "Cantina" },
  { src: "/images/hero.jpg", alt: "Sala e ambiente" },
  { src: "/images/19.jpeg", alt: "Vista interno ristorante" },
  { src: "/images/27.jpeg", alt: "Ambiente La Vecia Mescola" },
];

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
          <h2 className="mt-2 font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
            GALLERY
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {galleryImages.map((img, i) => (
            <div key={`${img.src}-${i}`}>
              <ScrollReveal
                variant="slideFromBottomOvershoot"
                delay={i * 0.05}
                duration={0.85}
              >
                <ParallaxImage speed={0.1} className="group relative aspect-[3/4] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
                </ParallaxImage>
              </ScrollReveal>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
