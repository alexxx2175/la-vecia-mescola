import { HeroSection } from "@/components/home/HeroSection";
import { ConceptSection } from "@/components/home/ConceptSection";
import { LaMescolaSection } from "@/components/home/LaMescolaSection";
import { MenuSection } from "@/components/home/MenuSection";
import { CucinaSection } from "@/components/home/CucinaSection";
import { CantinaSection } from "@/components/home/CantinaSection";
import { ReservationsSection } from "@/components/home/ReservationsSection";
import { GallerySection } from "@/components/home/GallerySection";

export default function HomePage() {
  return (
    <>
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
