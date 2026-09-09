import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ weight: ["600"], subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato", display: "swap" });

export const metadata: Metadata = {
  title: "Pagina non trovata | La Vecia Mescola",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/arena", label: "Eventi a Verona" },
  { href: "/contatti", label: "Contatti" },
];

/** 404 globale: documento completo, richiesto da Next con più root layout. */
export default function GlobalNotFound() {
  return (
    <html lang="it" className={`${playfair.variable} ${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#EBD9D4] text-[#2C2420]">
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <Link href="/" className="font-serif text-2xl font-semibold tracking-wide">
            La Vecia Mescola
          </Link>
          <p className="mt-12 text-sm font-medium uppercase tracking-[0.3em] text-[#B8962E]">
            Errore 404
          </p>
          <h1
            className="mt-4 font-serif font-semibold"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Pagina non trovata
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#2C2420]/70">
            La pagina che cerchi non esiste più o è stata spostata. Il menu, gli
            eventi a Verona e i contatti sono sempre qui.
          </p>
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  i === 0
                    ? "inline-flex min-h-[48px] items-center rounded-sm bg-[#2C2420] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#EBD9D4] transition-colors hover:bg-[#3d3630]"
                    : "inline-flex min-h-[48px] items-center rounded-sm border border-[#2C2420]/30 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#2C2420] transition-colors hover:border-[#B8962E]/60 hover:text-[#B8962E]"
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="mt-10 text-sm text-[#2C2420]/70">
            Vicolo Chiodo 4, Verona · WhatsApp{" "}
            <a href="https://wa.me/393928699275" className="underline">
              +39 392 869 9275
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
