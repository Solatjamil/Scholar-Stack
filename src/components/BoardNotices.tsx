import { useEffect, useState } from "react";
import { ExternalLink, RefreshCw, AlertTriangle, CalendarDays, Award, FileText, BellRing } from "lucide-react";

/**
 * BoardNotices
 * ----------------------------------------------------------------------
 * Live date sheet / result / admission headlines pulled from the student's
 * own board website via /api/board-notices.
 *
 * DESIGN RULE: this component never invents or reformats a date. It shows the
 * board's own wording and always links back to the official page, because a
 * student acting on a wrong exam date is a serious harm. When the board cannot
 * be reached it says so plainly and points to the offline indicative schedule
 * rather than silently showing nothing.
 */

interface Notice {
  title: string;
  url: string;
  date: string | null;
  kind: "datesheet" | "result" | "admission" | "notice" | string;
  classLevel: string | null;
}

interface BoardResult {
  key: string;
  board: string;
  sourceUrl: string;
  ok: boolean;
  reason?: string;
  notices: Notice[];
}

const KIND_STYLE: Record<string, { label: string; cls: string; Icon: typeof CalendarDays }> = {
  datesheet: { label: "Date Sheet", cls: "bg-indigo-100 text-indigo-700 border-indigo-200", Icon: CalendarDays },
  result: { label: "Result", cls: "bg-emerald-100 text-emerald-700 border-emerald-200", Icon: Award },
  admission: { label: "Admission", cls: "bg-amber-100 text-amber-700 border-amber-200", Icon: FileText },
  notice: { label: "Notice", cls: "bg-slate-100 text-slate-600 border-slate-200", Icon: BellRing },
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "datesheet", label: "Date Sheets" },
  { id: "result", label: "Results" },
  { id: "admission", label: "Admissions" },
] as const;

export default function BoardNotices({
  board,
  studentClass,
}: {
  board?: string;
  studentClass?: string;
}) {
  const [data, setData] = useState<BoardResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [onlyMyClass, setOnlyMyClass] = useState(true);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  async function load() {
    if (!board) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/board-notices?board=${encodeURIComponent(board)}`);
      if (!r.ok) throw new Error(`Server returned ${r.status}`);
      const j = await r.json();
      setData(j.boards?.[0] ?? null);
      setFetchedAt(j.fetchedAt ?? null);
    } catch (e: any) {
      setError(e?.message || "Could not reach the board update service.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  let notices = data?.notices ?? [];
  if (filter !== "all") notices = notices.filter((n) => n.kind === filter);
  if (onlyMyClass && studentClass) {
    const mine = notices.filter((n) => !n.classLevel || n.classLevel === studentClass);
    // Only apply the class filter if it leaves something useful on screen.
    if (mine.length > 0) notices = mine;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            Live Board Updates
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Read directly from{" "}
            <span className="font-semibold text-slate-700">{data?.board || board || "your board"}</span>
            {fetchedAt && (
              <> · checked {new Date(fetchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</>
            )}
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 disabled:opacity-50 min-h-[40px]"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-all active:scale-95 ${
              filter === f.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
        {studentClass && (
          <button
            onClick={() => setOnlyMyClass((v) => !v)}
            className={`ml-auto rounded-full px-3 py-1.5 text-[11px] font-bold transition-all active:scale-95 ${
              onlyMyClass
                ? "bg-violet-100 text-violet-700 border border-violet-200"
                : "bg-slate-100 text-slate-500 border border-transparent"
            }`}
          >
            {onlyMyClass ? `Showing ${studentClass}` : "All classes"}
          </button>
        )}
      </div>

      {/* Body */}
      <div className="mt-4">
        {loading && (
          <div className="space-y-2" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        )}

        {!loading && (error || (data && !data.ok)) && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
            <p className="flex items-start gap-2 font-semibold">
              <AlertTriangle size={15} className="mt-0.5 shrink-0" />
              Could not reach {data?.board || "the board"} right now
              {data?.reason ? ` (${data.reason})` : ""}.
            </p>
            <p className="mt-1.5 leading-relaxed">
              Some boards block automated requests. Your Exam Countdown still works — it uses the
              built-in indicative schedule. Check the official site for confirmed dates.
            </p>
            {(data?.sourceUrl || board) && (
              <a
                href={data?.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-1 font-bold text-amber-900 underline underline-offset-2"
              >
                Open official board site <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}

        {!loading && !error && data?.ok && notices.length === 0 && (
          <p className="rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-500">
            No matching announcements on the board's homepage right now.
          </p>
        )}

        {!loading && data?.ok && notices.length > 0 && (
          <ul className="space-y-2">
            {notices.slice(0, 12).map((n, i) => {
              const st = KIND_STYLE[n.kind] ?? KIND_STYLE.notice;
              const { Icon } = st;
              return (
                <li key={i}>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-sm active:scale-[0.99]"
                  >
                    <span className={`mt-0.5 shrink-0 rounded-lg border p-1.5 ${st.cls}`}>
                      <Icon size={13} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold leading-snug text-slate-800 group-hover:text-indigo-900">
                        {n.title}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        <span className={`rounded px-1.5 py-0.5 ${st.cls}`}>{st.label}</span>
                        {n.classLevel && <span className="text-slate-500">{n.classLevel}</span>}
                        {n.date && <span className="text-slate-500">{n.date}</span>}
                      </span>
                    </span>
                    <ExternalLink
                      size={13}
                      className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-indigo-500"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="mt-4 border-t border-slate-100 pt-3 text-[10px] leading-relaxed text-slate-400">
        Headlines are read live from the board's official website and are shown in the board's own
        wording. Always confirm on the official page before relying on any date.
      </p>
    </section>
  );
}
