import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * Vercel serverless function: live date sheet / result notices from the
 * official BISE board websites.
 *
 * WHY THIS IS A SERVER FUNCTION AND NOT A BROWSER FETCH
 * Board sites send no Access-Control-Allow-Origin header, so a student's
 * browser cannot read them directly. Several also reject requests that do not
 * look like a real browser. We therefore fetch server-side with a normal UA
 * and return clean JSON.
 *
 * WHAT IT DOES NOT DO
 * It does not invent dates. It only surfaces links the board itself published,
 * with the board's own wording, and always returns the source URL so a student
 * can confirm on the official site. If a board is unreachable (some block
 * datacentre IPs outright) the entry reports ok:false and the UI falls back to
 * the offline indicative schedule in src/biseDatesheet.ts.
 *
 * Verified live against biselahore.com, fbise.edu.pk, bisep.edu.pk,
 * biek.edu.pk, bisemultan.edu.pk and bbiseqta.edu.pk.
 */

export const config = { runtime: "nodejs" };

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/** Board key -> official homepage. Keys match what the app stores in profiles. */
const BOARDS: Record<string, { name: string; url: string }> = {
  lahore: { name: "BISE Lahore", url: "https://www.biselahore.com/" },
  federal: { name: "Federal Board (FBISE)", url: "https://www.fbise.edu.pk/" },
  fbise: { name: "Federal Board (FBISE)", url: "https://www.fbise.edu.pk/" },
  peshawar: { name: "BISE Peshawar", url: "https://www.bisep.edu.pk/" },
  karachi: { name: "BIE Karachi", url: "https://biek.edu.pk/" },
  multan: { name: "BISE Multan", url: "https://www.bisemultan.edu.pk/" },
  quetta: { name: "BBISE Quetta", url: "https://bbiseqta.edu.pk/" },
  rawalpindi: { name: "BISE Rawalpindi", url: "https://www.biserawalpindi.edu.pk/" },
  gujranwala: { name: "BISE Gujranwala", url: "https://www.bisegrw.edu.pk/" },
  faisalabad: { name: "BISE Faisalabad", url: "https://www.bisefsd.edu.pk/" },
  sargodha: { name: "BISE Sargodha", url: "https://www.bisesargodha.edu.pk/" },
  sahiwal: { name: "BISE Sahiwal", url: "https://www.bisesahiwal.edu.pk/" },
  bahawalpur: { name: "BISE Bahawalpur", url: "https://bisebwp.edu.pk/" },
  hyderabad: { name: "BISE Hyderabad", url: "https://www.biseh.edu.pk/" },
};

/** Only surface links that look like real exam news. */
const KEEP =
  /(date\s*sheet|datesheet|result|roll\s*no|admission|notification|press\s*release|announce|schedule|supplementary|annual\s*exam)/i;

/**
 * Navigation chrome that matches KEEP but carries no news. Without this the
 * feed fills up with "Online Results", "Results For Students" menu links.
 */
const DROP =
  /^(results?|date\s*sheets?|notifications?|downloads?|home|about|contact|login|admissions?|roll no\.? slips?|online results?|last results?|results? for (students|institutions)|institution portal.*|recent result declaration|result declaration|diploma \(results.*|programs)$/i;

const DATE_RE =
  /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4})|(\d{4}-\d{2}-\d{2})|(\d{1,2}[-/]\d{1,2}[-/]\d{4})/i;

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ");
}

function decode(s: string): string {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;|&rsquo;/gi, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
}

function absolute(base: string, href: string): string {
  try {
    return new URL(href, base).toString();
  } catch {
    return base;
  }
}

/** Classify a notice so the UI can badge and filter it. */
function kindOf(title: string): "datesheet" | "result" | "admission" | "notice" {
  if (/date\s*sheet|datesheet|schedule/i.test(title)) return "datesheet";
  if (/result|gazette|position holder/i.test(title)) return "result";
  if (/admission|enrol|registration|roll\s*no/i.test(title)) return "admission";
  return "notice";
}

/** Which class a notice concerns, when the board says so. */
function classOf(title: string): string | null {
  if (/\b(9th|ix|ssc[- ]?i\b|ssc part[- ]?i\b)/i.test(title)) return "9th";
  if (/\b(10th|matric|ssc)\b/i.test(title)) return "10th";
  if (/\b(11th|1st year|hssc[- ]?i\b|inter part[- ]?i\b)/i.test(title)) return "11th";
  if (/\b(12th|2nd year|hssc|inter)\b/i.test(title)) return "12th";
  return null;
}

interface Notice {
  title: string;
  url: string;
  date: string | null;
  kind: string;
  classLevel: string | null;
}

function extract(pageUrl: string, htmlText: string): Notice[] {
  const cleaned = htmlText.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ");
  const out: Notice[] = [];
  const seen = new Set<string>();

  const re = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m: RegExpExecArray | null;

  while ((m = re.exec(cleaned)) !== null) {
    const href = m[1];
    let title = decode(stripTags(m[2])).replace(/\s+/g, " ").trim();
    // Some boards (Quetta) render the publish date inside the anchor text and
    // then repeat the headline. Pull the date out and de-duplicate the rest.
    const lead = title.match(
      /^(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4})\s+(.*)$/i
    );
    let leadDate: string | null = null;
    if (lead) {
      leadDate = lead[1];
      title = lead[2].trim();
    }
    const half = Math.floor(title.length / 2);
    if (half > 12 && title.slice(0, half).trim().toLowerCase() === title.slice(half).trim().toLowerCase()) {
      title = title.slice(0, half).trim();
    }

    if (title.length < 18 || title.length > 180) continue;
    if (!KEEP.test(title) || DROP.test(title)) continue;
    // A real notice names a year, a class or an exam session. Menu labels like
    // "Private Result Cards" or "Admissions (Private)" do not, so drop them.
    if (!/\b(20\d{2}|9th|10th|11th|12th|ssc|hssc|matric|inter|annual|supplementary)\b/i.test(title))
      continue;
    if (/^(#|javascript:|mailto:|tel:)/i.test(href)) continue;

    const key = title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    // Look for a date printed near the link before falling back to null.
    const ctx = stripTags(
      cleaned.slice(Math.max(0, m.index - 280), m.index + m[0].length + 280)
    );
    const dm = ctx.match(DATE_RE);

    out.push({
      title,
      url: absolute(pageUrl, href),
      date: leadDate || (dm ? dm[0].trim() : null),
      kind: kindOf(title),
      classLevel: classOf(title),
    });

    if (out.length >= 40) break;
  }
  return out;
}

async function fetchBoard(key: string) {
  const board = BOARDS[key];
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 12000);
  try {
    const r = await fetch(board.url, {
      redirect: "follow",
      signal: ctl.signal,
      headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
    });
    if (!r.ok) {
      return { key, board: board.name, sourceUrl: board.url, ok: false, reason: `HTTP ${r.status}`, notices: [] };
    }
    const notices = extract(board.url, await r.text());
    return { key, board: board.name, sourceUrl: board.url, ok: true, notices };
  } catch (e: any) {
    const reason = e?.name === "AbortError" ? "timeout" : e?.message || "unreachable";
    return { key, board: board.name, sourceUrl: board.url, ok: false, reason, notices: [] };
  } finally {
    clearTimeout(timer);
  }
}

/** Map a stored profile string ("BISE Lahore (Punjab)") onto a board key. */
function resolveKey(board: string): string | null {
  const b = (board || "").toLowerCase();
  const hit = Object.keys(BOARDS).find((k) => b.includes(k));
  return hit || null;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || "/", "http://localhost");
  const wanted = url.searchParams.get("board");

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  // Boards update a few times a day at most; cache hard and refresh in the
  // background so a class of students does not hammer the board's server.
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");

  try {
    let keys: string[];
    if (wanted) {
      const k = resolveKey(wanted);
      if (!k) {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({ error: `Unknown board: ${wanted}`, known: Object.keys(BOARDS) })
        );
      }
      keys = [k];
    } else {
      keys = ["lahore", "federal", "peshawar", "karachi", "multan", "quetta"];
    }

    const results = await Promise.all(keys.map(fetchBoard));
    res.statusCode = 200;
    return res.end(
      JSON.stringify({
        fetchedAt: new Date().toISOString(),
        boards: results,
        disclaimer:
          "Headlines are read live from each board's official website. Always confirm on the board's own page before relying on a date.",
      })
    );
  } catch (e: any) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: e?.message || "Failed to load board notices" }));
  }
}
