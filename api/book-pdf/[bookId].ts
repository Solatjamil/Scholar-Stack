/**
 * Vercel serverless function: stream a scanned textbook PDF.
 *
 * The Express app in server.ts only runs during local development - Vercel
 * deploys the Vite build as static files, so anything under /api must exist as
 * its own function here or it 404s in production.
 *
 * archive.org sends no Access-Control-Allow-Origin header, so the browser
 * cannot fetch these directly; we proxy them and forward Range headers so
 * PDF.js / the native viewer can stream pages instead of the whole file.
 */

export const config = { runtime: "edge" };

const BOOK_SOURCES: Record<string, { archiveId: string; pdfFile: string }> = {
  "bio-9-ptb": { archiveId: "pakbooks-seed-0023", pdfFile: "PTB Biology 9.pdf" },
  "bio-10-ptb": { archiveId: "pakbooks-seed-0024", pdfFile: "PTB Biology 10TH_text.pdf" },
  "chem-10-ptb": { archiveId: "pakbooks-seed-0025", pdfFile: "PTB Chemistry 10 EM_text.pdf" },
  "chem-9-fbise": { archiveId: "pakbooks-seed-0001", pdfFile: "CHEMISTRY 9TH FBISE.pdf" },
  "chem-10-fbise": { archiveId: "pakbooks-seed-0002", pdfFile: "CHEMISTRY 10TH FBISE.pdf" },
};

export default async function handler(req: Request): Promise<Response> {
  const bookId = new URL(req.url).pathname.split("/").pop() || "";
  const src = BOOK_SOURCES[bookId];
  if (!src) {
    return new Response(JSON.stringify({ error: "Unknown book id" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const range = req.headers.get("range");
  const upstream = await fetch(
    `https://archive.org/download/${src.archiveId}/${encodeURIComponent(src.pdfFile)}`,
    { headers: range ? { Range: range } : undefined, redirect: "follow" }
  );

  if (!upstream.ok && upstream.status !== 206) {
    return new Response(JSON.stringify({ error: `Upstream returned ${upstream.status}` }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=86400",
  });
  const cr = upstream.headers.get("content-range");
  if (cr) headers.set("Content-Range", cr);
  const cl = upstream.headers.get("content-length");
  if (cl) headers.set("Content-Length", cl);

  return new Response(upstream.body, { status: upstream.status === 206 ? 206 : 200, headers });
}
