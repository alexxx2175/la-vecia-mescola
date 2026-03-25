"use client";

/**
 * Barra laterale verticale — WHATSAPP ⬧ INSTAGRAM ⬧ FACEBOOK (grande, serif leggibile)
 */
export function VerticalSocialNav() {
  const links = [
    { href: "https://wa.me/390458036608", label: "WhatsApp" },
    { href: "https://www.instagram.com/laveciamescola", label: "Instagram" },
    { href: "https://www.facebook.com/laveciamescola", label: "Facebook" },
    { href: "https://www.tripadvisor.it/Restaurant_Review-g187873-d25051492", label: "Tripadvisor" },
  ];

  return (
    <nav
      className="fixed right-6 top-[22rem] z-40 hidden flex-col items-center gap-3 lg:flex"
      aria-label="Social e contatti"
    >
      {links.map((link, i) => (
        <span key={link.label} className="flex flex-col items-center gap-3">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-[#2C2420] transition-colors hover:text-[#B8962E]"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {link.label}
          </a>
          {i < links.length - 1 && (
            <span className="text-[#B8962E] text-base">⬧</span>
          )}
        </span>
      ))}
    </nav>
  );
}
