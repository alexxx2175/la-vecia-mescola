import type { ReactNode } from "react";

/** Layout comune delle informative: titolo, data di aggiornamento, prosa leggibile. */
export function LegalArticle({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-[#EBD9D4] px-6 pb-24 pt-32 text-[#2C2420] lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif font-semibold" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
          {title}
        </h1>
        <p className="mt-3 text-sm text-[#2C2420]/60">{updated}</p>
        <div className="legal-prose mt-10">{children}</div>
      </div>
    </article>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-[#2C2420]/85">{children}</div>
    </section>
  );
}
