/**
 * N8N "Parse NEW Sources" node — JavaScript (Code node)
 *
 * Fixed parsers for veronafiere.it, veronasera.it, cittadiverona.it
 * based on real HTML structure inspected 2026-04-08.
 *
 * Expects 3 input items from HTTP Request nodes, each with:
 *   - $json.data  → raw HTML string
 *   - $json.source → one of "veronafiere", "veronasera", "cittadiverona"
 *
 * Outputs: array of event objects with shape:
 *   { id, title, date, time, type, venue_type, location, source, url, buy_url, image, category }
 *
 * To use in N8N:
 *   1. Create a Code node (JavaScript)
 *   2. Paste the contents of the `jsCode` string below
 *   3. Connect the 3 HTTP Request nodes as inputs
 */

// ─── Italian month utilities ────────────────────────────────────────────────

const ITALIAN_MONTHS = {
  gennaio: "01", febbraio: "02", marzo: "03", aprile: "04",
  maggio: "05", giugno: "06", luglio: "07", agosto: "08",
  settembre: "09", ottobre: "10", novembre: "11", dicembre: "12",
};

function italianMonthToNum(month) {
  return ITALIAN_MONTHS[month.toLowerCase().trim()] || null;
}

/**
 * Parse Italian date text like "4 Gennaio 2026" → "2026-01-04"
 */
function parseItalianDate(text) {
  if (!text) return null;
  const cleaned = text.replace(/\s+/g, " ").trim();
  const m = cleaned.match(/(\d{1,2})\s+([A-Za-zÀ-ú]+)\s+(\d{4})/);
  if (!m) return null;
  const day = m[1].padStart(2, "0");
  const month = italianMonthToNum(m[2]);
  const year = m[3];
  if (!month) return null;
  return `${year}-${month}-${day}`;
}

/**
 * Decode common HTML entities
 */
function decodeEntities(str) {
  return str
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&egrave;/g, "è")
    .replace(/&eacute;/g, "é")
    .replace(/&agrave;/g, "à")
    .replace(/&ograve;/g, "ò")
    .replace(/&ugrave;/g, "ù")
    .replace(/&igrave;/g, "ì")
    .replace(/&#\d+;/g, (match) => {
      const code = parseInt(match.replace(/&#|;/g, ""), 10);
      return String.fromCharCode(code);
    });
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function makeId(source, date, title) {
  const slug = (title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .substring(0, 40);
  return `${source}_${date}_${slug}`;
}

// ─── VERONAFIERE parser ─────────────────────────────────────────────────────
// URL: https://www.veronafiere.it/calendario-fiere/calendario-italia-2026/
//
// HTML structure:
//   <div class="calendario__event ...">
//     <div class="calendario__eventWrapper">
//       <div class="calendario__event__head">
//         <span class="calendario__event__dates">23-25<small>Gennaio</small></span>
//       </div>
//       <div class="calendario__event__detail">
//         <a class="calendario__event__detail__link" href="...">
//           <h4 class="calendario__event__title">Motor Bike Expo</h4>
//           <p class="calendario__event__description">...</p>
//         </a>
//       </div>
//     </div>
//   </div>

function parseVeronafiere(html) {
  const events = [];
  const YEAR = "2026";

  // Match each calendario__event block
  const eventBlocks =
    html.match(
      /<div[^>]*class="[^"]*calendario__event\b[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi
    ) || [];

  for (const block of eventBlocks) {
    // Extract title
    const titleMatch = block.match(
      /<h4[^>]*class="[^"]*calendario__event__title[^"]*"[^>]*>([\s\S]*?)<\/h4>/i
    );
    if (!titleMatch) continue;
    const title = stripTags(titleMatch[1]);
    if (!title) continue;

    // Extract date: "23-25<small>Gennaio</small>"
    const datesMatch = block.match(
      /<span[^>]*class="[^"]*calendario__event__dates[^"]*"[^>]*>([\s\S]*?)<\/span>/i
    );
    let date = null;
    if (datesMatch) {
      const datesHtml = datesMatch[1];
      // Day(s): first number(s) before <small>
      const dayMatch = datesHtml.match(/(\d{1,2})/);
      // Month: inside <small>
      const monthMatch = datesHtml.match(/<small>([\s\S]*?)<\/small>/i);
      if (dayMatch && monthMatch) {
        const day = dayMatch[1].padStart(2, "0");
        const monthNum = italianMonthToNum(stripTags(monthMatch[1]));
        if (monthNum) {
          date = `${YEAR}-${monthNum}-${day}`;
        }
      }
    }
    if (!date) continue;

    // Extract URL
    const urlMatch = block.match(
      /<a[^>]*class="[^"]*calendario__event__detail__link[^"]*"[^>]*href="([^"]+)"/i
    );
    const url = urlMatch ? urlMatch[1] : "https://www.veronafiere.it/calendario-fiere/calendario-italia-2026/";

    // Extract description (optional)
    const descMatch = block.match(
      /<p[^>]*class="[^"]*calendario__event__description[^"]*"[^>]*>([\s\S]*?)<\/p>/i
    );
    const description = descMatch ? stripTags(descMatch[1]) : "";

    events.push({
      id: makeId("veronafiere", date, title),
      title: decodeEntities(title),
      date,
      time: "",
      type: description || "Fiera",
      venue_type: "Fiera",
      location: "Veronafiere — Viale del Lavoro 8, Verona",
      source: "veronafiere.it",
      url,
      buy_url: null,
      image: null,
      category: "fiere",
    });
  }

  return events;
}

// ─── VERONASERA parser ──────────────────────────────────────────────────────
// URL: https://www.veronasera.it/eventi/tipo/concerti/  (or /eventi/)
//
// HTML structure:
//   <article class="c-card u-flex u-column">
//     <figure ...>
//       <span class="c-card__kicker c-card__kicker--cultura">Concerti</span>
//       <a href="/eventi/johnny-marr-concerto-teatro-romano-16-luglio-2026.html">
//         <img src="..." alt="..." title="...">
//       </a>
//     </figure>
//     <div class="c-card__content ...">
//       <header>
//         <a href="/eventi/johnny-marr-concerto-teatro-romano-16-luglio-2026.html">
//           <h2 class="c-card__heading ...">Title</h2>
//         </a>
//       </header>
//     </div>
//   </article>
//
// Date is NOT in the listing — extract from URL slug:
//   /eventi/ligabue-concerto-arena-verona-22-settembre-2026.html
//   → DD=22, month=settembre, YYYY=2026

function parseVeronasera(html) {
  const events = [];
  const BASE = "https://www.veronasera.it";

  // Match article.c-card blocks
  const articles =
    html.match(/<article[^>]*class="[^"]*c-card[^"]*"[^>]*>[\s\S]*?<\/article>/gi) || [];

  for (const article of articles) {
    // Extract title from c-card__heading
    const headingMatch = article.match(
      /<h2[^>]*class="[^"]*c-card__heading[^"]*"[^>]*>([\s\S]*?)<\/h2>/i
    );
    if (!headingMatch) continue;
    const title = decodeEntities(stripTags(headingMatch[1]));
    if (!title) continue;

    // Extract first href (event URL)
    const hrefMatch = article.match(/href="(\/eventi\/[^"]+\.html)"/i);
    if (!hrefMatch) continue;
    const relUrl = hrefMatch[1];
    const url = `${BASE}${relUrl}`;

    // Extract date from URL slug
    // Pattern: DD-monthname-YYYY.html at the end of the URL
    const dateSlugMatch = relUrl.match(/(\d{1,2})-([a-z]+)-(\d{4})\.html$/i);
    let date = null;
    if (dateSlugMatch) {
      const day = dateSlugMatch[1].padStart(2, "0");
      const monthNum = italianMonthToNum(dateSlugMatch[2]);
      const year = dateSlugMatch[3];
      if (monthNum) {
        date = `${year}-${monthNum}-${day}`;
      }
    }
    // If date can't be extracted from URL, skip (we can't create a valid event)
    if (!date) continue;

    // Extract category badge from c-card__kicker
    const kickerMatch = article.match(
      /<span[^>]*class="[^"]*c-card__kicker[^"]*"[^>]*>([\s\S]*?)<\/span>/i
    );
    const badge = kickerMatch ? stripTags(kickerMatch[1]) : "";

    // Category mapping: "Concerti" or concert-like → concerti_pop, else → cultura
    const isConcert = /concert/i.test(badge);
    const category = isConcert ? "concerti_pop" : "cultura";
    const type = badge || "Evento";

    // Extract image (optional)
    const imgMatch = article.match(/<img[^>]*src="([^"]+)"[^>]*>/i);
    const image = imgMatch ? (imgMatch[1].startsWith("//") ? `https:${imgMatch[1]}` : imgMatch[1]) : null;

    events.push({
      id: makeId("veronasera", date, title),
      title,
      date,
      time: "",
      type,
      venue_type: type,
      location: "Verona",
      source: "veronasera.it",
      url,
      buy_url: null,
      image,
      category,
    });
  }

  return events;
}

// ─── CITTADIVERONA parser ───────────────────────────────────────────────────
// URL: https://www.cittadiverona.it/eventi/
//
// HTML structure:
//   <article class="post lsvr_event post-73627 has-post-thumbnail">
//     <div class="post__inner">
//       <header class="post__header">
//         <p class="post__thumbnail">
//           <a href="..."><img src="..." /></a>
//         </p>
//       </header>
//       <div class="post__content">
//         <p class="lsvr-pressville-post-grid__post-badge">
//           <span class="lsvr-pressville-post-grid__post-badge-categories">
//             <a class="post__category-link">Mostre</a>
//           </span>
//         </p>
//         <p class="post__date">
//           4 Gennaio 2026
//           <time datetime="2026-12-04T19:00:00+01:00"> > 4 Dicembre 2026</time>
//         </p>
//         <h2 class="post__title">
//           <a href="...">Title</a>
//         </h2>
//       </div>
//     </div>
//   </article>

function parseCittadiverona(html) {
  const events = [];

  // Match article.lsvr_event blocks
  const articles =
    html.match(/<article[^>]*class="[^"]*lsvr_event[^"]*"[^>]*>[\s\S]*?<\/article>/gi) || [];

  for (const article of articles) {
    // Extract title from .post__title a
    const titleMatch = article.match(
      /<h2[^>]*class="[^"]*post__title[^"]*"[^>]*>\s*<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i
    );
    if (!titleMatch) continue;
    const url = titleMatch[1];
    const title = decodeEntities(stripTags(titleMatch[2]));
    if (!title) continue;

    // Extract date — try <time datetime="..."> first
    let date = null;
    const timeMatch = article.match(/<time[^>]*datetime="([^"]+)"/i);
    if (timeMatch) {
      // datetime is ISO: "2026-12-04T19:00:00+01:00" — but this is the END date
      // The start date is the text before <time>
    }

    // Extract start date from .post__date text (before <time>)
    const dateBlockMatch = article.match(
      /<p[^>]*class="[^"]*post__date[^"]*"[^>]*>([\s\S]*?)(?:<time|<\/p>)/i
    );
    if (dateBlockMatch) {
      const dateText = stripTags(dateBlockMatch[1]);
      date = parseItalianDate(dateText);
    }

    // Fallback: parse from <time datetime> if start date failed
    if (!date && timeMatch) {
      const iso = timeMatch[1];
      const isoDateMatch = iso.match(/^(\d{4}-\d{2}-\d{2})/);
      if (isoDateMatch) date = isoDateMatch[1];
    }

    if (!date) continue;

    // Extract category from .post__category-link
    const catMatch = article.match(
      /<a[^>]*class="[^"]*post__category-link[^"]*"[^>]*>([\s\S]*?)<\/a>/i
    );
    const categoryLabel = catMatch ? stripTags(catMatch[1]) : "Evento";

    // Extract image (optional)
    const imgMatch = article.match(
      /<p[^>]*class="[^"]*post__thumbnail[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i
    );
    const image = imgMatch ? imgMatch[1] : null;

    events.push({
      id: makeId("cittadiverona", date, title),
      title,
      date,
      time: "",
      type: categoryLabel,
      venue_type: categoryLabel,
      location: "Verona",
      source: "cittadiverona.it",
      url,
      buy_url: null,
      image,
      category: "cultura",
    });
  }

  return events;
}

// ─── Main dispatcher ────────────────────────────────────────────────────────
// This is what runs inside the N8N Code node.
// Each input item should have $json.data (HTML) and $json.source (string).

function parseAllSources(items) {
  const allEvents = [];

  for (const item of items) {
    const html = item.json?.data || item.json?.html || "";
    const source = (item.json?.source || "").toLowerCase();

    if (!html) continue;

    let parsed = [];
    if (source === "veronafiere") {
      parsed = parseVeronafiere(html);
    } else if (source === "veronasera") {
      parsed = parseVeronasera(html);
    } else if (source === "cittadiverona") {
      parsed = parseCittadiverona(html);
    }

    allEvents.push(...parsed);
  }

  // Deduplicate by id
  const seen = new Set();
  const unique = [];
  for (const evt of allEvents) {
    if (!seen.has(evt.id)) {
      seen.add(evt.id);
      unique.push(evt);
    }
  }

  // Sort by date ascending
  unique.sort((a, b) => a.date.localeCompare(b.date));

  return unique;
}

// ─── N8N Code node entry point ──────────────────────────────────────────────
// Paste everything above + the block below into an N8N Code node.
//
// const results = parseAllSources($input.all());
// return results.map(evt => ({ json: evt }));
//
// ─── IMPORTANT: GitHub commit format ────────────────────────────────────────
// When writing to GitHub via the API, the contentBase64 MUST be a JSON array:
//
//   const eventsArray = results;  // already an array from parseAllSources
//   const contentBase64 = Buffer.from(JSON.stringify(eventsArray, null, 2)).toString('base64');
//
// Do NOT wrap in { lastUpdate, totalEvents, sources, events } — the Next.js
// component expects a plain array OR { events: [...] } at the top level.
// A plain array is preferred for simplicity.

// ─── Export for testing / use outside N8N ───────────────────────────────────
if (typeof module !== "undefined") {
  module.exports = {
    parseVeronafiere,
    parseVeronasera,
    parseCittadiverona,
    parseAllSources,
    parseItalianDate,
    italianMonthToNum,
    decodeEntities,
    stripTags,
  };
}
