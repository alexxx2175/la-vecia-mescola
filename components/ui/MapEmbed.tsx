"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { CONSENT_STRINGS } from "@/data/consent";
import type { Locale } from "@/data/locales";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.1!2d10.9924!3d45.4399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f5f46a6b5c0e5%3A0x0!2sVicolo+Chiodo+4%2C+37121+Verona+VR!5e0!3m2!1sit!2sit!4v1";
const MAPS_LINK = "https://www.google.com/maps?cid=7870716361863865033";

/** La mappa di Google imposta cookie: viene caricata solo su richiesta esplicita. */
export function MapEmbed({ lang }: { lang: Locale }) {
  const s = CONSENT_STRINGS[lang];
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="La Vecia Mescola — Vicolo Chiodo 4, Verona"
        src={MAP_SRC}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      />
    );
  }

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center border border-[#2C2420]/10 bg-[#E5D3CE] px-6 py-12 text-center">
      <MapPin size={28} className="text-[#B8962E]" aria-hidden />
      <p className="mt-4 font-serif text-xl font-semibold text-[#2C2420]">{s.mapTitle}</p>
      <p className="mt-2 max-w-md text-sm text-[#2C2420]/75">{s.mapText}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="inline-flex min-h-[48px] items-center rounded-sm bg-[#2C2420] px-6 text-sm font-semibold uppercase tracking-wider text-[#EBD9D4] transition-colors hover:bg-[#3d3630]"
        >
          {s.mapLoad}
        </button>
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center rounded-sm border border-[#2C2420]/30 px-6 text-sm font-semibold uppercase tracking-wider text-[#2C2420] transition-colors hover:border-[#B8962E]/60 hover:text-[#B8962E]"
        >
          {s.mapOpen}
        </a>
      </div>
    </div>
  );
}
