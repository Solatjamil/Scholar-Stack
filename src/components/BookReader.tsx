import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScannedBook, booksFor, missingBookNote } from "../bookLibrary";
import { videosForSubject } from "../videoLibrary";
import { apiUrl } from "../apiBase";

/**
 * Scanned textbook reader.
 *
 * Rendering strategy: the PDF is streamed from our own /api/book-pdf proxy
 * (archive.org sends no CORS headers) into an <iframe>, and the page is driven
 * by the standard PDF "#page=N" fragment. That gives real page turning and
 * page selection through the browser's built-in viewer without shipping a
 * multi-megabyte PDF renderer to students on slow connections.
 *
 * Full-text search is served separately by /api/book-text, which maps OCR
 * character offsets to true printed pages, so tapping a result jumps the
 * viewer straight to that page.
 */

interface SearchHit {
  page: number;
  snippet: string;
}

const SUBJECTS = ["physics", "chemistry", "biology"] as const;

export default function BookReader({
  classLevel = "9th",
  subject: subjectProp,
}: {
  classLevel?: "9th" | "10th";
  /** Subject chosen by the parent (LearnHub); the reader stays in sync with it. */
  subject?: string;
}) {
  const [subject, setSubject] = useState<string>(subjectProp ?? "biology");

  // Follow the parent's subject when it changes, so switching subject in the
  // Learn hub doesn't silently leave the reader on a different book.
  useEffect(() => {
    if (subjectProp) setSubject(subjectProp);
  }, [subjectProp]);
  const available = useMemo(() => booksFor(classLevel, subject), [classLevel, subject]);
  const [bookId, setBookId] = useState<string | null>(available[0]?.id ?? null);

  useEffect(() => {
    setBookId(available[0]?.id ?? null);
    setPage(1);
    setHits(null);
    setQuery("");
  }, [classLevel, subject]); // eslint-disable-line react-hooks/exhaustive-deps

  const book: ScannedBook | undefined = available.find((b) => b.id === bookId) ?? available[0];

  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => setPageInput(String(page)), [page]);

  const goTo = useCallback(
    (n: number) => {
      if (!book) return;
      const clamped = Math.min(Math.max(1, n), book.pages);
      setPage(clamped);
    },
    [book]
  );

  const runSearch = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!book || query.trim().length < 2) return;
      setSearching(true);
      setSearchError(null);
      try {
        const res = await fetch(
          apiUrl(`/api/book-text/${book.id}?q=${encodeURIComponent(query.trim())}`)
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setHits(data.results || []);
      } catch (err: any) {
        setSearchError(err?.message || "Search failed. Check your connection.");
        setHits(null);
      } finally {
        setSearching(false);
      }
    },
    [book, query]
  );

  const missing = missingBookNote(classLevel, subject);

  return (
    <div className="space-y-4">
      {/* Subject picker */}
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map((s) => {
          const has = booksFor(classLevel, s).length > 0;
          return (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`min-h-[44px] rounded-xl px-4 text-sm font-semibold capitalize transition ${
                subject === s
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {s}
              {!has && <span className="ml-2 text-[10px] opacity-70">no book</span>}
            </button>
          );
        })}
      </div>

      {/* Honest empty state - no fake reader for books that don't exist */}
      {missing && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <h3 className="text-base font-bold text-amber-200">
            Book abhi available nahi hai
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-amber-100/80">{missing}</p>
          <p className="mt-2 text-xs text-amber-100/60">
            Hum yahan sirf asli scanned textbook dikhate hain. Jo cheez mojood nahi,
            uska nakli reader dikhana aapke kaam ka nahi - is liye neeche videos se
            parhein.
          </p>
          <VideoFallback classLevel={classLevel} subject={subject} />
        </div>
      )}

      {book && (
        <>
          {/* Edition picker when more than one board's scan exists */}
          {available.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {available.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setBookId(b.id);
                    setPage(1);
                    setHits(null);
                  }}
                  className={`min-h-[44px] rounded-lg px-3 text-xs font-medium ${
                    b.id === book.id
                      ? "bg-slate-100 text-slate-900"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {b.edition}
                </button>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">{book.title}</h3>
                <p className="text-xs text-slate-400">
                  {book.edition} &middot; {book.pages} pages &middot; {book.sizeLabel}
                </p>
              </div>
              <a
                href={apiUrl(`/api/book-pdf/${book.id}`)}
                download
                className="min-h-[44px] rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
              >
                Download PDF
              </a>
            </div>

            {/* Search */}
            <form onSubmit={runSearch} className="mt-4 flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Poori book mein search karein (e.g. photosynthesis)"
                className="min-h-[44px] flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={searching || query.trim().length < 2}
                className="min-h-[44px] rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white disabled:opacity-40"
              >
                {searching ? "..." : "Search"}
              </button>
            </form>

            {searchError && (
              <p className="mt-2 text-xs text-rose-300">{searchError}</p>
            )}

            {hits && (
              <div className="mt-3 max-h-56 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/60">
                {hits.length === 0 ? (
                  <p className="p-3 text-xs text-slate-400">
                    Koi result nahi mila. Doosra lafz try karein.
                  </p>
                ) : (
                  <>
                    <p className="border-b border-slate-800 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">
                      {hits.length} page{hits.length > 1 ? "s" : ""} found
                    </p>
                    {hits.map((h) => (
                      <button
                        key={h.page}
                        onClick={() => goTo(h.page)}
                        className="block w-full border-b border-slate-800/60 px-3 py-2 text-left hover:bg-slate-800/60"
                      >
                        <span className="text-[11px] font-bold text-indigo-300">
                          Page {h.page}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-slate-300">
                          {h.snippet}
                        </span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* Page controls */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => goTo(page - 1)}
                disabled={page <= 1}
                className="min-h-[44px] rounded-lg bg-slate-800 px-4 text-sm font-semibold text-slate-200 disabled:opacity-30"
              >
                &larr; Pichla
              </button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const n = parseInt(pageInput, 10);
                  if (!Number.isNaN(n)) goTo(n);
                }}
                className="flex items-center gap-1"
              >
                <input
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  inputMode="numeric"
                  className="min-h-[44px] w-20 rounded-lg border border-slate-700 bg-slate-950 px-2 text-center text-sm text-slate-100"
                  aria-label="Page number"
                />
                <span className="text-xs text-slate-400">/ {book.pages}</span>
              </form>
              <button
                onClick={() => goTo(page + 1)}
                disabled={page >= book.pages}
                className="min-h-[44px] rounded-lg bg-slate-800 px-4 text-sm font-semibold text-slate-200 disabled:opacity-30"
              >
                Agla &rarr;
              </button>
            </div>

            {/* The scan itself */}
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
              <iframe
                ref={iframeRef}
                key={`${book.id}-${page}`}
                src={`${apiUrl(`/api/book-pdf/${book.id}`)}#page=${page}&view=FitH`}
                title={`${book.title} page ${page}`}
                className="h-[70vh] w-full"
              />
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
              Yeh asli scanned textbook hai (archive.org se), hamare server ke
              zariye stream hoti hai. Agar aapke phone ka browser PDF inline nahi
              dikhata, upar &ldquo;Download PDF&rdquo; dabayein.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/** Chapter videos shown when no scanned book exists for a subject. */
function VideoFallback({ classLevel, subject }: { classLevel: string; subject: string }) {
  const vids = React.useMemo(
    () => videosForSubject(classLevel, subject).flatMap((t) => t.videos.slice(0, 1)).slice(0, 6),
    [classLevel, subject]
  );
  if (!vids.length) return null;
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {vids.map((v) => (
        <a
          key={v.id}
          href={`https://www.youtube.com/watch?v=${v.id}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-slate-900/60 p-3 hover:bg-slate-900"
        >
          <p className="line-clamp-2 text-xs font-semibold text-slate-100">{v.title}</p>
          <p className="mt-1 text-[11px] text-slate-400">{v.channel}</p>
        </a>
      ))}
    </div>
  );
}
