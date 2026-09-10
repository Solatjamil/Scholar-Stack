import { useMemo } from "react";
import { Info, CheckCircle2, BookOpen } from "lucide-react";
import {
  schemeFor,
  chapterNumberOf,
  weightForChapter,
  type PairingScheme,
} from "../pairingScheme";

/**
 * PairingSchemePanel
 * ---------------------------------------------------------------------------
 * Shows the Punjab (PBCC) pairing scheme for the student's class + subject:
 * how many MCQs come from each chapter, which chapters group into Q.2/Q.3/Q.4,
 * and which pair into the long questions.
 *
 * TWO RULES THIS COMPONENT EXISTS TO ENFORCE
 *
 * 1. Chapters outside the scheme are LABELLED, NEVER LOCKED. A student whose
 *    textbook contains a chapter must always be able to study it. We mark it
 *    "Not in 2026 paper" and immediately say it is still fully readable.
 *
 * 2. We never claim this is an official board document. Boards revise schemes
 *    annually and published copies disagree, so the footer tells the student to
 *    confirm with their teacher or board.
 *
 * Renders nothing for non-Punjab boards (FBISE/Sindh/KPK/Balochistan/AJK do not
 * use this scheme) rather than showing a student a scheme that is not theirs.
 */

export default function PairingSchemePanel({
  classLevel,
  subjectId,
  board,
  chapterNames,
}: {
  classLevel: string;
  subjectId: string;
  board: string;
  /** Chapter titles as displayed, e.g. "Unit 12: Geometrical Optics". */
  chapterNames: string[];
}) {
  const scheme: PairingScheme | null = useMemo(
    () => schemeFor(classLevel, subjectId, board),
    [classLevel, subjectId, board]
  );

  const rows = useMemo(() => {
    if (!scheme) return [];
    return chapterNames.map((name) => {
      const no = chapterNumberOf(name);
      return { name, no, weight: weightForChapter(scheme, no) };
    });
  }, [scheme, chapterNames]);

  if (!scheme) return null;

  const included = rows.filter((r) => r.weight?.inScheme);
  const excluded = rows.filter((r) => r.weight && !r.weight.inScheme);

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="rounded-lg bg-indigo-100 p-1.5 text-indigo-700">
              <BookOpen size={14} />
            </span>
            Paper Scheme (Pairing Scheme) {scheme.session}
          </h3>
          <p className="mt-1 text-[11px] text-slate-500">
            Punjab Boards · {scheme.totalMarks} marks · {scheme.mcqTotal} MCQs
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 border border-emerald-200">
          {included.length} of {rows.length} chapters in paper
        </span>
      </div>

      {/* Structure summary */}
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Objective</p>
          <p className="mt-1 text-xs font-semibold text-slate-800">{scheme.mcqTotal} MCQs × 1 mark</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Short</p>
          <p className="mt-1 text-xs font-semibold text-slate-800">{scheme.shortNote}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Long</p>
          <p className="mt-1 text-xs font-semibold text-slate-800">{scheme.longNote}</p>
        </div>
      </div>

      {/* Question grouping */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
            Short question groups
          </p>
          <ul className="space-y-1">
            {scheme.shortGroups.map((g) => (
              <li
                key={g.question}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px]"
              >
                <span className="font-bold text-slate-700">{g.question}</span>
                <span className="text-slate-500">
                  Ch {g.chapters.join(", ")} · {g.attempt}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
            Long question pairing
          </p>
          <ul className="space-y-1">
            {scheme.longPairs.map((p) => (
              <li
                key={p.question}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px]"
              >
                <span className="font-bold text-slate-700">{p.question}</span>
                <span className="text-slate-500">Ch {p.chapters.join(" + ")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Per-chapter weight */}
      <div className="mt-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
          Chapter weightage
        </p>
        <ul className="space-y-1">
          {rows.map((r) => {
            const w = r.weight;
            const inPaper = Boolean(w?.inScheme);
            return (
              <li
                key={r.name}
                className={`flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border px-2.5 py-2 text-[11px] ${
                  inPaper
                    ? "border-slate-200 bg-white"
                    : "border-dashed border-slate-300 bg-slate-50/70"
                }`}
              >
                <span
                  className={`min-w-0 flex-1 truncate font-semibold ${
                    inPaper ? "text-slate-800" : "text-slate-500"
                  }`}
                >
                  {r.name}
                </span>
                {inPaper ? (
                  <>
                    {w!.mcqs > 0 && (
                      <span className="rounded bg-indigo-50 px-1.5 py-0.5 font-bold text-indigo-700">
                        {w!.mcqs} MCQ{w!.mcqs > 1 ? "s" : ""}
                      </span>
                    )}
                    {w!.shortQuestion && (
                      <span className="rounded bg-violet-50 px-1.5 py-0.5 font-bold text-violet-700">
                        {w!.shortQuestion}
                      </span>
                    )}
                    {w!.longQuestion && (
                      <span className="rounded bg-amber-50 px-1.5 py-0.5 font-bold text-amber-700">
                        {w!.longQuestion}
                      </span>
                    )}
                    <span className="text-slate-400">up to {w!.maxMarks} marks</span>
                  </>
                ) : (
                  <span className="rounded bg-slate-200 px-1.5 py-0.5 font-bold text-slate-600">
                    Not in {scheme.session} paper
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* The important reassurance: excluded never means locked. */}
      {excluded.length > 0 && (
        <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-3">
          <p className="flex items-start gap-2 text-[11px] font-bold text-sky-900">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
            These chapters are still fully open — read and learn them normally
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-sky-900/90">
            {excluded.map((e) => e.name).join(" · ")}
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-sky-900/80">
            Nothing is locked. They carry no marks under the {scheme.session} scheme, so leave them
            for last when revising — but your textbook still contains them, they build concepts the
            examinable chapters rely on, and they can appear in school tests or a revised scheme.
          </p>
        </div>
      )}

      <p className="mt-4 flex items-start gap-1.5 border-t border-slate-100 pt-3 text-[10px] leading-relaxed text-slate-400">
        <Info size={12} className="mt-0.5 shrink-0" />
        {scheme.sourceNote}
      </p>
    </section>
  );
}
