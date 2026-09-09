"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSiteLanguage } from "@/context/SiteLanguageContext";
import { translations, t } from "@/data/translations";

const HERO_POSTER =
  "/images/sala-principale-travi-vista-lampadari-muro-pietra-la-vecia-mescola.jpg";
const HERO_VIDEO = "/videos/la-vecia-mescola-hero.mp4";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Il video parte solo dopo il caricamento della pagina e mai su connessioni
 * lente o con "riduci movimento": l'LCP resta il poster ottimizzato da next/image.
 */
function useDeferredVideo(enabled: boolean): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /^(slow-2g|2g)$/.test(conn.effectiveType)) return;

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
      if (idle) idle(() => !cancelled && setReady(true));
      else setTimeout(() => !cancelled && setReady(true), 200);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, [enabled]);

  return ready;
}

export function HeroSection() {
  const { lang } = useSiteLanguage();
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const showVideo = useDeferredVideo(!prefersReduced);

  return (
    <section ref={ref} className="relative z-10 flex min-h-svh items-center justify-center overflow-hidden">
      {/* Sfondo: poster ottimizzato (LCP) + video differito con parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <Image
            src={HERO_POSTER}
            alt="Sala principale de La Vecia Mescola: travi a vista, lampadari e muro in pietra"
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover"
          />
          {showVideo && (
            <video
              className="absolute inset-0 h-full w-full object-cover hero-video-in"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </div>

      {/* Overlay scuro per leggibilità testo */}
      <div className="absolute inset-0 z-[1] bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-[#EBD9D4] via-[#EBD9D4]/80 to-transparent" />

      {/* Contenuto: animazioni CSS, così l'HTML iniziale non nasconde titolo e sottotitolo */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1
          className="hero-fade-up font-semibold leading-[1.1] tracking-tight text-white italic"
          style={{ fontFamily: "var(--font-viva)", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", animationDelay: "0.2s" }}
        >
          {t(translations.hero.title, lang)}
        </h1>
        <p
          className="hero-fade-up mt-4 text-base text-white/90 sm:text-xl"
          style={{ animationDelay: "0.6s" }}
        >
          {t(translations.hero.subtitle, lang)}
        </p>

        <div
          className="hero-fade-up mx-auto mt-10 flex items-center justify-center gap-4"
          style={{ animationDelay: "1s" }}
        >
          <span className="h-px w-12 bg-white/50" />
          <Link
            href="/menu"
            className="inline-flex min-h-[48px] items-center text-sm font-medium uppercase tracking-[0.35em] text-white transition-colors duration-300 hover:text-white/90"
          >
            {t(translations.hero.cta, lang)}
          </Link>
          <span className="h-px w-12 bg-white/50" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-fade-up absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        style={{ animationDelay: "1.8s" }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
            {t(translations.hero.scroll, lang)}
          </span>
          <div className="h-8 w-5 rounded-full border-2 border-white/40 p-1">
            <div className="mx-auto h-1.5 w-1 rounded-full bg-white/70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
