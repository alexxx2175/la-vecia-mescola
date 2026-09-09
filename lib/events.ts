import fs from "node:fs";
import path from "node:path";
import {
  normalizeArenaEvent,
  type ArenaEvent,
  type CulturaEvent,
} from "@/lib/events-shared";

/**
 * Il workflow n8n aggiorna ogni giorno i JSON su GitHub (branch main) senza
 * redeploy. Le pagine leggono la copia remota con revalidazione ISR e usano il
 * file locale (allineato all'ultimo deploy) come fallback.
 */
const RAW_BASE =
  "https://raw.githubusercontent.com/alexxx2175/la-vecia-mescola/main/public/data";

export const EVENTS_REVALIDATE_SECONDS = 3600;

function extractList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const maybe = (payload as Record<string, unknown>).events;
    if (Array.isArray(maybe)) return maybe;
  }
  return [];
}

function readLocal(file: string): unknown[] {
  try {
    const filePath = path.join(process.cwd(), "public", "data", file);
    if (!fs.existsSync(filePath)) return [];
    return extractList(JSON.parse(fs.readFileSync(filePath, "utf-8")));
  } catch {
    return [];
  }
}

async function loadJson(file: string): Promise<unknown[]> {
  try {
    const res = await fetch(`${RAW_BASE}/${file}`, {
      next: { revalidate: EVENTS_REVALIDATE_SECONDS },
    });
    if (res.ok) {
      const text = await res.text();
      if (text.trim()) {
        const list = extractList(JSON.parse(text));
        if (list.length > 0) return list;
      }
    }
  } catch {
    // rete assente (es. build offline): si usa il file locale
  }
  return readLocal(file);
}

export async function loadArenaEvents(): Promise<ArenaEvent[]> {
  const list = await loadJson("events.json");
  return list
    .map(normalizeArenaEvent)
    .filter((e): e is ArenaEvent => Boolean(e));
}

export async function loadCulturaEvents(): Promise<CulturaEvent[]> {
  const list = await loadJson("events-cultura.json");
  return list.filter(
    (e): e is CulturaEvent =>
      Boolean(e) &&
      typeof e === "object" &&
      typeof (e as CulturaEvent).title === "string" &&
      typeof (e as CulturaEvent).date === "string"
  );
}
