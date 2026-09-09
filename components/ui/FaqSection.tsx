import type { FaqItem } from "@/data/faq";

/**
 * FAQ visibili in pagina. Server component: il testo è nell'HTML iniziale e
 * coincide con lo schema FAQPage generato dalla stessa lista.
 */
export function FaqSection({
  items,
  title,
  kicker,
  id = "faq",
  tone = "light",
}: {
  items: FaqItem[];
  title: string;
  kicker?: string;
  id?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={`${dark ? "bg-[#2C2420] text-[#EBD9D4]" : "bg-[#EBD9D4] text-[#2C2420]"} py-20 sm:py-28`}
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {kicker && (
          <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-[#B8962E]">
            {kicker}
          </p>
        )}
        <h2
          id={`${id}-title`}
          className="mt-4 text-center font-serif font-semibold"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
        >
          {title}
        </h2>

        <div className={`mt-12 divide-y ${dark ? "divide-[#EBD9D4]/15" : "divide-[#2C2420]/10"}`}>
          {items.map((item, i) => (
            <details key={i} className="group py-1">
              <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-left font-serif text-lg font-semibold [&::-webkit-details-marker]:hidden">
                <h3 className="m-0 text-lg font-semibold">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl leading-none text-[#B8962E] transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className={`m-0 pb-5 text-base leading-relaxed ${dark ? "text-[#EBD9D4]/80" : "text-[#2C2420]/80"}`}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
