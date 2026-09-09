import type { IncomingMessage, ServerResponse } from "node:http";
import zlib from "node:zlib";

/**
 * Vercel serverless function: full-text search inside a scanned textbook.
 *
 * archive.org's *_djvu.txt has NO page delimiters (verified: zero form feeds),
 * so the searchable text comes from the hOCR sidecars instead:
 *   <base>_hocr_searchtext.txt.gz   - the OCR text
 *   <base>_hocr_pageindex.json.gz   - one [startChar, endChar, ...] per page
 * Binary-searching a match offset against those start offsets yields the true
 * printed page (verified live: "mitosis" -> page 109 of 278 in Biology 9).
 */

export const config = { runtime: "nodejs" };

const BOOK_SOURCES: Record<string, { archiveId: string; base: string }> = {
  "bio-9-ptb": { archiveId: "pakbooks-seed-0023", base: "PTB Biology 9" },
  "bio-10-ptb": { archiveId: "pakbooks-seed-0024", base: "PTB Biology 10TH" },
  "chem-10-ptb": { archiveId: "pakbooks-seed-0025", base: "PTB Chemistry 10 EM" },
  "chem-9-fbise": { archiveId: "pakbooks-seed-0001", base: "CHEMISTRY 9TH FBISE" },
  "chem-10-fbise": { archiveId: "pakbooks-seed-0002", base: "CHEMISTRY 10TH FBISE" },
};

const UA = "Mozilla/5.0 (compatible; ScholarStack/1.0)";

/**
 * "Accept-Encoding: identity" stops the CDN gzipping an already-gzipped file,
 * so what arrives is exactly the .gz bytes we then gunzip ourselves.
 */
async function fetchGz(archiveId: string, file: string): Promise<string> {
  const r = await fetch(
    `https://archive.org/download/${archiveId}/${encodeURIComponent(file)}`,
    { redirect: "follow", headers: { "Accept-Encoding": "identity", "User-Agent": UA } }
  );
  if (!r.ok) throw new Error(`Upstream ${r.status} for ${file}`);
  return zlib.gunzipSync(Buffer.from(await r.arrayBuffer())).toString("utf8");
}

function pageForOffset(starts: number[], pos: number): number {
  let lo = 0;
  let hi = starts.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (starts[mid] <= pos) lo = mid + 1;
    else hi = mid;
  }
  return Math.max(1, lo);
}

/** Inflated books are cached per warm lambda so repeat searches are instant. */
const cache = new Map<string, { text: string; starts: number[] }>();

export default async function handler(
  req: IncomingMessage & { query?: Record<string, string | string[]> },
  res: ServerResponse
) {
  const pick = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v || "");
  const bookId = pick(req.query?.bookId);
  const q = pick(req.query?.q).trim();

  res.setHeader("Content-Type", "application/json");

  const src = BOOK_SOURCES[bookId];
  if (!src) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: "Unknown book id" }));
  }
  if (q.length < 2) return res.end(JSON.stringify({ query: q, results: [] }));

  try {
    let entry = cache.get(bookId);
    if (!entry) {
      const [text, idxRaw] = await Promise.all([
        fetchGz(src.archiveId, `${src.base}_hocr_searchtext.txt.gz`),
        fetchGz(src.archiveId, `${src.base}_hocr_pageindex.json.gz`),
      ]);
      entry = { text, starts: (JSON.parse(idxRaw) as number[][]).map((e) => e[0]) };
      cache.set(bookId, entry);
    }

    const hay = entry.text.toLowerCase();
    const needle = q.toLowerCase();
    const results: { page: number; snippet: string }[] = [];
    const seen = new Set<number>();
    let at = hay.indexOf(needle);
    while (at !== -1 && results.length < 60) {
      const page = pageForOffset(entry.starts, at);
      if (!seen.has(page)) {
        seen.add(page);
        results.push({
          page,
          snippet: entry.text
            .slice(Math.max(0, at - 70), at + needle.length + 90)
            .replace(/\s+/g, " ")
            .trim(),
        });
      }
      at = hay.indexOf(needle, at + needle.length);
    }

    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.end(
      JSON.stringify({ query: q, totalPages: entry.starts.length, results })
    );
  } catch (err: any) {
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: err?.message || "Search failed" }));
  }
}
