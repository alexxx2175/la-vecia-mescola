"use client";

import { openCookiePreferences } from "@/lib/consent";

export function OpenCookiePreferencesButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={
        className ??
        "inline-flex min-h-[44px] items-center rounded-sm border border-[#2C2420]/30 px-5 text-sm font-semibold uppercase tracking-wider text-[#2C2420] transition-colors hover:border-[#B8962E]/60 hover:text-[#B8962E]"
      }
    >
      {label}
    </button>
  );
}
