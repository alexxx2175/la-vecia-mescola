"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Sezione Menu — stile Quay House, link a /menu
 */
export function MenuSection() {
  return (
    <section
      id="menu"
      className="relative z-10 bg-[#EBD9D4] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <ScrollReveal duration={0.9}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2C2420]/60">
            02
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-[#2C2420] sm:text-5xl">
            MENU
          </h2>
          <Link
            href="/menu"
            className="mt-10 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#B8962E] transition-colors hover:text-[#8B4513]"
          >
            ⬧ SCOPRI IL MENU ⬧
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
