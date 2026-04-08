"use client";

const anchors = [
  { emoji: "\uD83C\uDFAD", label: "Opera & Concerti", href: "#arena-events" },
  { emoji: "\uD83C\uDFAA", label: "Prossimi 10 giorni", href: "#prossimi-eventi" },
  { emoji: "\uD83C\uDFDB\uFE0F", label: "Eventi Culturali", href: "#eventi-culturali" },
] as const;

export function ArenaQuickNav() {
  return (
    <nav className="sticky top-[56px] z-40 bg-[#2C2420] shadow-md">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 scrollbar-hide sm:justify-center sm:gap-3">
        {anchors.map((a) => (
          <a
            key={a.href}
            href={a.href}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#EBD9D4]/20 px-4 py-2 text-xs font-semibold tracking-wide text-[#EBD9D4] transition-colors hover:border-[#B8962E]/50 hover:bg-[#B8962E]/10 hover:text-[#B8962E] sm:text-sm"
          >
            <span aria-hidden>{a.emoji}</span>
            {a.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
