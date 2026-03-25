"use client";

import Link from "next/link";

interface LogoProps {
  /** Variante chiara (bianco) per hero/navbar trasparente */
  variant?: "light" | "dark";
  /** Classe aggiuntiva per sizing */
  className?: string;
  /** Se wrappato in link (default: true) */
  asLink?: boolean;
}

export function Logo({ variant = "dark", className = "", asLink = true }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-[#5C2C2C]";
  const content = (
    <span
      className={`italic tracking-tight ${textColor} ${className}`}
      style={{ fontFamily: 'var(--font-viva)' }}
    >
      La Vecia Mescola
    </span>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="flex items-center transition-opacity hover:opacity-90"
        aria-label="La Vecia Mescola — Torna alla home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
