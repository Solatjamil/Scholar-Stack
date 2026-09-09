import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * Vercel serverless function: stream a scanned textbook PDF.
 *
 * archive.org sends no Access-Control-Allow-Origin header, so the browser
 * cannot fetch these directly; we proxy them and forward Range headers so the
 * PDF viewer can stream pages instead of pulling the whole file.
 *
 * Node runtime with the classic (req, res) signature. The edge runtime failed
 * two ways: its fetch re-encoded the "%20" in these filenames (archive.org
 * 404s on the "+" form) and DecompressionStream fought the CDN's own gzip.
 */

export const config = { runtime: "nodejs" };

const BOOK_SOURCES: Record<string, { archiveId: string; pdfFile: string }> = {
  "bio-9-ptb": { archiveId: "pakbooks-seed-0023", pdfFile: "PTB Biology 9.pdf" },
  "bio-10-ptb": { archiveId: "pakbooks-seed-0024", pdfFile: "PTB Biology 10TH_text.pdf" },
  "chem-10-ptb": { archiveId: "pakbooks-seed-0025", pdfFile: "PTB Chemistry 10 EM_text.pdf" },
  "chem-9-fbise": { archiveId: "pakbooks-seed-0001", pdfFile: "CHEMISTRY 9TH FBISE.pdf" },
  "chem-10-fbise": { archiveId: "pakbooks-seed-0002", pdfFile: "CHEMISTRY 10TH FBISE.pdf" },
};

const UA = "Mozilla/5.0 (compatible; ScholarStack/1.0)";

export default async function handler(
  req: IncomingMessage & { query?: Record<string, string | string[]> },
  res: ServerResponse
) {
  const raw = req.query?.bookId;
  const bookId = Array.isArray(raw) ? raw[0] : raw || "";
  const src = BOOK_SOURCES[bookId];

  if (!src) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Unknown book id" }));
  }

  try {
    const headers: Record<string, string> = { "User-Agent": UA };
    const range = req.headers.range;
    if (range) headers.Range = range;

    const upstream = await fetch(
      `https://archive.org/download/${src.archiveId}/${encodeURIComponent(src.pdfFile)}`,
      { headers, redirect: "follow" }
    );

    if (!upstream.ok && upstream.status !== 206) {
      res.statusCode = 502;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: `Upstream returned ${upstream.status}` }));
    }

    res.statusCode = upstream.status === 206 ? 206 : 200;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const cr = upstream.headers.get("content-range");
    if (cr) res.setHeader("Content-Range", cr);

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Length", String(buf.length));
    return res.end(buf);
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: err?.message || "Failed to fetch book" }));
  }
}
