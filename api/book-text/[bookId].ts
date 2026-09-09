/**
 * Vercel serverless function: full-text search inside a scanned textbook.
 *
 * archive.org's *_djvu.txt has NO page delimiters (verified: zero form feeds),
 * so the searchable text comes from the hOCR sidecars instead:
 *   <base>_hocr_searchtext.txt.gz   - the OCR text
 *   <base>_hocr_pageindex.json.gz   - one [startChar, endChar, ...] per page
 * Binary-searching a match offset against those start offsets yields the true
 * printed page (spot-checked: "Mitosis" -> p.109 in the Biology 9 scan).
 *
 * Runs on the Node runtime: the edge runtime re-encoded the "%20" in these
 * filenames (archive.org 400s/404s on that) and its DecompressionStream fought
 * with the CDN's own gzip transfer encoding. Node + zlib.gunzipSync is
 * deterministic here.
 */

import zlib from "node:zlib";

export const config = { runtime: "nodejs" };

const BOOK_SOURCES: Record<string, { archiveId: string; base: string }> = {
  "bio-9-ptb": { archiveId: "pakbooks-seed-0023", base: "PTB Biology 9" },
  "bio-10-ptb": { archiveId: "pakbooks-seed-0024", base: "PTB Biology 10TH" },
  "chem-10-ptb": { archiveId: "pakbooks-seed-0025", base: "PTB Chemistry 10 EM" },
  "chem-9-fbise": { archiveId: "pakbooks-seed-0001", base: "CHEMISTRY 9TH FBISE" },
  "chem-10-fbise": { archiveId: "pakbooks-seed-0002", base: "CHEMISTRY 10TH FBISE" },
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
  });

/**
 * Fetch a .gz sidecar and inflate it. "Accept-Encoding: identity" stops the CDN
 * from gzipping the already-gzipped file, so what arrives is exactly the .gz
 * bytes we then gunzip ourselves.
 */
async function fetchGz(archiveId: string, file: string): Promise<string> {
  const res = await fetch(
    `https://archive.org/download/${archiveId}/${encodeURIComponent(file)}`,
    {
      redirect: "follow",
      headers: {
        "Accept-Encoding": "identity",
        "User-Agent": "Mozilla/5.0 (compatible; ScholarStack/1.0)",
      },
    }
  );
  if (!res.ok) throw new Error(`Upstream ${res.status} for ${file}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return zlib.gunzipSync(buf).toString("utf8");
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

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const bookId = url.pathname.split("/").pop() || "";
  const src = BOOK_SOURCES[bookId];
  if (!src) return json({ error: "Unknown book id" }, 404);

  const q = (url.searchParams.get("q") || "").trim();
  if (q.length < 2) return json({ query: q, results: [] });

  try {
    const [text, idxRaw] = await Promise.all([
      fetchGz(src.archiveId, `${src.base}_hocr_searchtext.txt.gz`),
      fetchGz(src.archiveId, `${src.base}_hocr_pageindex.json.gz`),
    ]);
    const starts = (JSON.parse(idxRaw) as number[][]).map((e) => e[0]);

    const hay = text.toLowerCase();
    const needle = q.toLowerCase();
    const results: { page: number; snippet: string }[] = [];
    const seen = new Set<number>();
    let at = hay.indexOf(needle);
    while (at !== -1 && results.length < 60) {
      const page = pageForOffset(starts, at);
      if (!seen.has(page)) {
        seen.add(page);
        results.push({
          page,
          snippet: text
            .slice(Math.max(0, at - 70), at + needle.length + 90)
            .replace(/\s+/g, " ")
            .trim(),
        });
      }
      at = hay.indexOf(needle, at + needle.length);
    }
    return json({ query: q, totalPages: starts.length, results });
  } catch (err: any) {
    return json({ error: err?.message || "Search failed" }, 502);
  }
}
