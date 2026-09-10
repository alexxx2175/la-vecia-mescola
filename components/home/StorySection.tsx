import Image from "next/image";
import { STORY } from "@/data/story";
import type { Locale } from "@/data/locales";

/** Sezione "La nostra storia": testo nell'HTML iniziale, tradotto per ogni lingua. */
export function StorySection({ lang }: { lang: Locale }) {
  const s = STORY[lang];
  return (
    <section id="storia" className="bg-[#E5D3CE] py-20 sm:py-28" aria-labelledby="storia-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="relative aspect-[3/4] w-full overflow-hidden lg:max-h-[640px]">
          <Image
            src="/images/parete-foto-celebrita-lampadario-cristallo-la-vecia-mescola-verona.jpg"
            alt="La parete con le foto degli ospiti celebri e il lampadario di cristallo de La Vecia Mescola"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#B8962E]">{s.kicker}</p>
          <h2
            id="storia-title"
            className="mt-4 font-serif font-semibold text-[#2C2420]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            {s.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#2C2420]/85 sm:text-lg">
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
