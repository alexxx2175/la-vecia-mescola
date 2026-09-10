"use client";

import { useSyncExternalStore } from "react";

export type Consent = { analytics: boolean; ts: number };

const KEY = "cookie-consent";
/** Il Garante chiede di richiedere di nuovo il consenso dopo sei mesi. */
const MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000;
const listeners = new Set<() => void>();
let cached: string | null | undefined;

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (typeof c.analytics !== "boolean" || typeof c.ts !== "number") return null;
    if (Date.now() - c.ts > MAX_AGE_MS) return null;
    return c;
  } catch {
    return null;
  }
}

function snapshot(): string {
  try {
    const raw = localStorage.getItem(KEY) ?? "";
    if (raw !== cached) cached = raw;
    return cached ?? "";
  } catch {
    return "";
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/** Rimuove i cookie di Google Analytics già impostati quando il consenso viene revocato. */
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter((name) => name.startsWith("_ga"))
    .forEach((name) => {
      for (const d of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}

export function setConsent(analytics: boolean) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics, ts: Date.now() } satisfies Consent));
  } catch {
    // storage non disponibile: il banner resterà visibile alla prossima visita
  }
  if (!analytics) clearAnalyticsCookies();
  listeners.forEach((cb) => cb());
}

/** Consenso corrente (null = mai espresso o scaduto). Server: null. */
export function useConsent(): Consent | null {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  if (!raw) return null;
  return readConsent();
}

const OPEN_EVENT = "cookie-preferences:open";

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookiePreferences(cb: () => void) {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}
