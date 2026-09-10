import { Star } from "lucide-react";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, REVIEWS } from "@/data/reviews";
import { translations, t } from "@/data/translations";
import type { Locale } from "@/data/locales";

const READ_ALL: Record<Locale, string> = {
  it: "Leggi tutte le recensioni su Google",
  en: "Read all reviews on Google",
  de: "Alle Bewertungen auf Google lesen",
  es: "Leer todas las reseñas en Google",
  fr: "Lire tous les avis sur Google",
  pt: "Ler todas as avaliações no Google",
  ro: "Citește toate recenziile pe Google",
  ru: "Все отзывы на Google",
  zh: "在 Google 上查看全部评价",
  ja: "Google でレビューをすべて見る",
};

const OUT_OF: Record<Locale, string> = {
  it: "su 5 · {n} recensioni su Google",
  en: "out of 5 · {n} Google reviews",
  de: "von 5 · {n} Google-Bewertungen",
  es: "sobre 5 · {n} reseñas en Google",
  fr: "sur 5 · {n} avis Google",
  pt: "em 5 · {n} avaliações no Google",
  ro: "din 5 · {n} recenzii Google",
  ru: "из 5 · {n} отзывов в Google",
  zh: "/5 · Google {n} 条评价",
  ja: "/5 · Google レビュー {n} 件",
};

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < n ? "fill-[#B8962E] text-[#B8962E]" : "text-[#2C2420]/20"}
          aria-hidden
        />
      ))}
    </span>
  );
}

/**
 * Recensioni reali dal profilo Google, nell'HTML iniziale (server component):
 * risponde alle ricerche "recensioni la vecia mescola" e rafforza l'E-E-A-T.
 * Nessun aggregateRating nello schema: Google lo ignora quando è auto-riferito.
 */
export function ReviewsSection({ lang }: { lang: Locale }) {
  // Separatore delle migliaia esplicito: in italiano ICU non raggruppa i numeri a 4 cifre ("2512").
  const sep = lang === "en" || lang === "zh" || lang === "ja" ? "," : ".";
  const count = String(GOOGLE_RATING.count).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return (
    <section id="recensioni" className="bg-[#EBD9D4] py-20 sm:py-28" aria-labelledby="recensioni-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-[#B8962E]">
          {t(translations.testimonials.label, lang)}
        </p>
        <h2
          id="recensioni-title"
          className="mt-4 text-center font-serif font-semibold text-[#2C2420]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
        >
          {t(translations.testimonials.title, lang)}
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3 text-sm text-[#2C2420]/80">
          <span className="font-serif text-2xl font-semibold text-[#2C2420]">
            {GOOGLE_RATING.value.toLocaleString(lang === "it" ? "it-IT" : lang)}
          </span>
          <Stars n={5} />
          <span>{OUT_OF[lang].replace("{n}", count)}</span>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <li
              key={r.author + r.year}
              className="flex h-full flex-col rounded-lg border border-[#2C2420]/10 bg-white/50 p-7"
            >
              <Stars n={r.rating} />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-[#2C2420]/85">
                “{r.text}”
              </blockquote>
              <p className="mt-5 text-sm">
                <span className="font-semibold text-[#2C2420]">{r.author}</span>
                <span className="text-[#2C2420]/60"> · Google, {r.year}</span>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center rounded-sm border border-[#2C2420]/30 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#2C2420] transition-colors hover:border-[#B8962E]/60 hover:text-[#B8962E]"
          >
            {READ_ALL[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
