import { NextResponse } from "next/server";

const EVENTS_URL =
  "https://raw.githubusercontent.com/alexxx2175/la-vecia-mescola/main/public/data/events.json";

export const revalidate = 0;

function extractEvents(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const maybeEvents = (payload as Record<string, unknown>).events;
    if (Array.isArray(maybeEvents)) return maybeEvents;
  }
  return [];
}

export async function GET() {
  try {
    const res = await fetch(EVENTS_URL, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Fetch fallita (${res.status})` },
        { status: 502 }
      );
    }

    const text = await res.text();
    if (!text.trim()) {
      return NextResponse.json({ error: "events.json è vuoto" }, { status: 502 });
    }

    let json: unknown;
    try {
      json = JSON.parse(text) as unknown;
    } catch {
      return NextResponse.json(
        { error: "events.json non è JSON valido" },
        { status: 502 }
      );
    }

    const events = extractEvents(json);
    return NextResponse.json(events, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Errore proxy eventi";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}

