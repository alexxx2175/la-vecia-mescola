"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const galleryImages = [
  { src: "/images/19.jpeg", alt: "Atmosfera del ristorante" },
  { src: "/images/cucina.jpg", alt: "Cucina veneta" },
  { src: "/images/27.jpeg", alt: "Interno La Vecia Mescola" },
  { src: "/images/secondi.jpg", alt: "Secondi piatti" },
  { src: "/images/dolci.jpg", alt: "Dolci della casa" },
  { src: "/images/cantina.jpg", alt: "Cantina" },
] as const;

export function GallerySection() {
  return (
    <section id="gallery" className="relative z-10 bg-[#EBD9D4] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal duration={0.9}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">
            06
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
            GALLERY
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((img, i) => (
            <ScrollReveal
              key={`${img.src}-${i}`}
              variant="slideFromBottomOvershoot"
              delay={i * 0.05}
              duration={0.85}
            >
              <div className="group relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
