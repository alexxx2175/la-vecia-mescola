const WHATSAPP_URL = "https://wa.me/393928699275";

export function GermanArenaSection() {
  return (
    <section lang="de" className="bg-[#EBD9D4] py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#B8962E]">
          Geheimtipp Verona
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold text-[#2C2420] sm:text-4xl">
          Restaurant in der Nähe der Arena di Verona
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#2C2420]/80">
          La Vecia Mescola ist das ideale Restaurant für einen Abend in Verona
          — nur 2 Gehminuten von der Arena entfernt. Genießen Sie authentische
          venetische Küche: hausgemachte Pasta, Risotto all&apos;Amarone und das
          berühmte Chateaubriand. Der perfekte Geheimtipp für Verona.
        </p>

        <div className="mx-auto mt-12 max-w-2xl border-t border-[#2C2420]/10 pt-10">
          <h3 className="font-serif text-xl font-semibold text-[#2C2420] sm:text-2xl">
            Abendessen vor der Oper oder dem Konzert
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#2C2420]/80">
            Planen Sie ein Abendessen vor Ihrer Vorstellung in der Arena di
            Verona? Wir empfehlen eine Reservierung 2–3 Stunden vor Beginn.
            Unsere Küche serviert bis 22:30 Uhr (freitags und samstags bis
            23:00 Uhr).
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-sm bg-[#2C2420] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#EBD9D4] transition-colors hover:bg-[#3d3630]"
          >
            Tisch reservieren via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
