import React, { useMemo, useState } from "react";
import {
  FileText,
  Sparkles,
  Sunrise,
  Sunset,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Printer,
  AlertTriangle,
  Calculator,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  buildFiveYearSet,
  buildPredictedPaper,
  getTopicInsights,
  hasSchemeContent,
  PAST_PAPER_YEARS,
  type SchemePaper,
  type Shift,
} from "../examScheme";

interface Props {
  currentClass: string;
  currentBoard: string;
  studentGroup: string;
  subjects: { id: string; name: string; color?: string }[];
}

/* ------------------------------------------------------------------ */
/*  Paper renderer — real board layout                                 */
/* ------------------------------------------------------------------ */
function PaperView({ paper }: { paper: SchemePaper }) {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="mt-4 border border-slate-300 rounded-xl bg-white overflow-hidden print:border-black">
      {/* Header block, like a real board paper */}
      <div className="border-b-2 border-slate-800 p-4 text-center bg-slate-50">
        <h3 className="font-bold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
          {paper.boardName}
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
          {paper.classLevel === "9th" || paper.classLevel === "10th"
            ? `SSC (Class ${paper.classLevel.replace("th", "")})`
            : `HSSC (Class ${paper.classLevel.replace("th", "")})`}{" "}
          &middot; {paper.group}
        </p>
        <p className="font-bold text-sm text-slate-900 mt-1.5">{paper.subjectName}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-[10px] sm:text-[11px] font-semibold text-slate-700">
          <span>
            {paper.kind === "past"
              ? `Annual Examination ${paper.year}`
              : `Predicted Paper — ${paper.shift === "morning" ? "Morning" : "Evening"} Shift`}
          </span>
          <span>Total Marks: {paper.totalMarks}</span>
          <span>Time: {Math.floor(paper.totalTimeMinutes / 60)} hrs {paper.totalTimeMinutes % 60} min</span>
        </div>
      </div>

      {/* Practice disclaimer — always visible, never hidden */}
      <div className="flex items-start gap-2 px-4 py-2.5 bg-amber-50 border-b border-amber-200">
        <AlertTriangle size={14} className="text-amber-600 mt-0.5 shrink-0" />
        <p className="text-[10px] sm:text-[11px] text-amber-800 leading-relaxed">{paper.disclaimer}</p>
      </div>

      <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-end gap-2 border-b border-slate-100">
        <button
          onClick={() => setShowAnswers((v) => !v)}
          className="flex items-center justify-center gap-1.5 text-[11px] font-bold px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors min-h-[44px]"
        >
          {showAnswers ? <EyeOff size={13} /> : <Eye size={13} />}
          {showAnswers ? "Hide" : "Show"} Answer Key
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-1.5 text-[11px] font-bold px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors min-h-[44px]"
        >
          <Printer size={13} /> Print
        </button>
      </div>

      {/* ---------------- OBJECTIVE ---------------- */}
      <div className="p-3 sm:p-4 border-b border-slate-200">
        <div className="flex items-baseline justify-between mb-1">
          <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
            Objective Part — Q.1
          </h4>
          <span className="text-[10px] font-bold text-slate-600">
            Marks: {paper.objective.sectionMarks} &middot; Time: {paper.objective.timeMinutes} min
          </span>
        </div>
        <p className="text-[10px] text-slate-500 italic mb-3">{paper.objective.instruction}</p>

        <ol className="space-y-3">
          {paper.objective.mcqs.map((m, i) => (
            <li key={m.id} className="text-[12px] leading-relaxed">
              <div className="flex gap-2">
                <span className="font-bold text-slate-700 shrink-0">{i + 1}.</span>
                <div className="flex-1">
                  <p className="text-slate-800">{m.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-1.5 pl-1">
                    {m.options.map((opt, oi) => (
                      <span
                        key={oi}
                        className={`text-[11px] ${
                          showAnswers && oi === m.correctIndex
                            ? "text-emerald-700 font-bold"
                            : "text-slate-600"
                        }`}
                      >
                        ({String.fromCharCode(97 + oi)}) {opt}
                        {showAnswers && oi === m.correctIndex && " ✓"}
                      </span>
                    ))}
                  </div>
                  {showAnswers && (
                    <p className="mt-1.5 text-[10px] text-emerald-800 bg-emerald-50 border-l-2 border-emerald-400 pl-2 py-1 rounded-r">
                      {m.explanation}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------------- SUBJECTIVE: SHORT SECTIONS ---------------- */}
      {paper.shortSections.map((sec) => (
        <div key={sec.key} className="p-3 sm:p-4 border-b border-slate-200">
          <div className="flex items-baseline justify-between mb-1">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">{sec.label}</h4>
            <span className="text-[10px] font-bold text-slate-600">Marks: {sec.sectionMarks}</span>
          </div>
          <p className="text-[10px] text-slate-500 italic mb-3">{sec.instruction}</p>
          <ol className="space-y-2.5">
            {sec.questions.map((q) => (
              <li key={q.id} className="text-[12px] leading-relaxed flex gap-2">
                <span className="font-bold text-slate-700 shrink-0">{q.label}</span>
                <div className="flex-1">
                  <p className="text-slate-800">{q.question}</p>
                  {showAnswers && (
                    <p className="mt-1 text-[11px] text-slate-700 bg-slate-50 border-l-2 border-indigo-300 pl-2 py-1.5 rounded-r whitespace-pre-line">
                      {q.modelAnswer}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}

      {/* ---------------- LONG QUESTIONS ---------------- */}
      <div className="p-4">
        <div className="flex items-baseline justify-between mb-1">
          <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
            Detailed / Long Questions
          </h4>
          <span className="text-[10px] font-bold text-slate-600">
            Marks: {paper.longSection.sectionMarks}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 italic mb-3">{paper.longSection.instruction}</p>

        <div className="space-y-4">
          {paper.longSection.questions.map((lq) => (
            <div key={lq.id} className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[12px] text-slate-900">{lq.label}</span>
                <span className="text-[10px] font-bold text-slate-500">{lq.totalMarks} marks</span>
              </div>

              {[lq.partA, lq.partB].map((part) => (
                <div key={part.id} className="mb-2.5 last:mb-0">
                  <div className="flex gap-2 text-[12px] leading-relaxed">
                    <span className="font-bold text-slate-700 shrink-0">
                      {part.label.split(" ").pop()}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <p className="text-slate-800 flex-1">{part.question}</p>
                        {part.isNumerical && (
                          <span className="shrink-0 inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 border border-violet-200">
                            <Calculator size={9} /> NUMERICAL
                          </span>
                        )}
                        <span className="shrink-0 text-[10px] font-bold text-slate-400">
                          ({part.marks})
                        </span>
                      </div>
                      {showAnswers && (
                        <pre className="mt-1.5 text-[10.5px] sm:text-[11px] text-slate-700 bg-slate-50 border-l-2 border-violet-300 pl-2 pr-2 py-1.5 rounded-r whitespace-pre-wrap break-words font-mono leading-relaxed max-w-full">
                          {part.modelAnswer}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Marks summary */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-semibold text-slate-600">
        <span>Objective: {paper.objectiveMarks}</span>
        <span>Subjective: {paper.subjectiveMarks}</span>
        <span className="text-slate-900 font-bold">Total: {paper.totalMarks}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function BoardExamCenter({
  currentClass,
  currentBoard,
  studentGroup,
  subjects,
}: Props) {
  const supported = useMemo(() => subjects.filter((s) => hasSchemeContent(s.id)), [subjects]);
  const [subjectId, setSubjectId] = useState<string>(supported[0]?.id ?? "physics");
  const [mode, setMode] = useState<"past" | "predict">("past");
  const [openYear, setOpenYear] = useState<number | null>(null);
  const [shift, setShift] = useState<Shift>("morning");
  const [showPredicted, setShowPredicted] = useState(false);

  // Papers regenerate whenever the student's profile changes.
  const fiveYear = useMemo(
    () => buildFiveYearSet(currentClass, studentGroup, currentBoard, subjectId),
    [currentClass, studentGroup, currentBoard, subjectId]
  );

  const predicted = useMemo(
    () => buildPredictedPaper(currentClass, studentGroup, currentBoard, subjectId, shift),
    [currentClass, studentGroup, currentBoard, subjectId, shift]
  );

  const insights = useMemo(
    () => getTopicInsights(currentClass, studentGroup, currentBoard, subjectId),
    [currentClass, studentGroup, currentBoard, subjectId]
  );

  const activeSubject = supported.find((s) => s.id === subjectId);

  if (supported.length === 0) {
    return (
      <div className="py-10 text-center text-slate-400 text-xs">
        No exam content is available for the current subject selection.
      </div>
    );
  }

  return (
    <div className="space-y-5 text-left">
      {/* Profile bar */}
      <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-indigo-800 font-semibold">
          <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">
            Class {currentClass}
          </span>
          <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">{studentGroup}</span>
          <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">{currentBoard}</span>
          <span className="text-indigo-500 font-normal">
            Papers below follow your saved profile automatically.
          </span>
        </div>
      </div>

      {/* Subject selector */}
      <div>
        <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">
          Subject
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:flex-wrap sm:overflow-visible scrollbar-none">
          {supported.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSubjectId(s.id);
                setOpenYear(null);
                setShowPredicted(false);
              }}
              className={`px-3 py-2 rounded-lg text-[11px] font-bold border transition-all min-h-[44px] whitespace-nowrap shrink-0 ${
                subjectId === s.id
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setMode("past")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors min-h-[44px] ${
            mode === "past"
              ? "border-indigo-600 text-indigo-700"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <FileText size={13} className="inline mr-1.5 -mt-0.5" />
          Last 5 Years Papers
        </button>
        <button
          onClick={() => setMode("predict")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors min-h-[44px] ${
            mode === "predict"
              ? "border-violet-600 text-violet-700"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Sparkles size={13} className="inline mr-1.5 -mt-0.5" />
          Predicted Exam
        </button>
      </div>

      {/* ---------------- PAST PAPERS ---------------- */}
      {mode === "past" && (
        <div className="space-y-2.5">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Five full papers for <strong>{activeSubject?.name}</strong>, one per year, each in the
            current {currentBoard} scheme (18 MCQs &middot; 3 short sections of 8 &middot; 3 long
            questions). Papers are stable — reopening {PAST_PAPER_YEARS[0]} always shows the same
            paper.
          </p>

          {fiveYear.map((p) => (
            <div key={p.id} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenYear(openYear === p.year ? null : p.year!)}
                className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 transition-colors text-left min-h-[56px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-indigo-700">{p.year}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">
                      {p.subjectName} — Annual {p.year}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {p.totalMarks} marks &middot; {p.objective.totalQuestions} MCQs &middot;{" "}
                      {p.shortSections.length * 8} shorts &middot; {p.longSection.totalQuestions} long
                    </p>
                  </div>
                </div>
                {openYear === p.year ? (
                  <ChevronDown size={16} className="text-slate-400 shrink-0" />
                ) : (
                  <ChevronRight size={16} className="text-slate-400 shrink-0" />
                )}
              </button>
              {openYear === p.year && (
                <div className="px-3 pb-3 bg-slate-50/50">
                  <PaperView paper={p} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---------------- PREDICTOR ---------------- */}
      {mode === "predict" && (
        <div className="space-y-4">
          {/* Shift toggle */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                setShift("morning");
                setShowPredicted(false);
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all min-h-[64px] ${
                shift === "morning"
                  ? "border-amber-400 bg-amber-50"
                  : "border-slate-200 bg-white hover:border-amber-200"
              }`}
            >
              <Sunrise size={16} className={shift === "morning" ? "text-amber-600" : "text-slate-400"} />
              <p className="text-[12px] font-bold text-slate-800 mt-1.5">Morning Shift</p>
              <p className="text-[10px] text-slate-500">Group I paper variant</p>
            </button>
            <button
              onClick={() => {
                setShift("evening");
                setShowPredicted(false);
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all min-h-[64px] ${
                shift === "evening"
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-indigo-200"
              }`}
            >
              <Sunset size={16} className={shift === "evening" ? "text-indigo-600" : "text-slate-400"} />
              <p className="text-[12px] font-bold text-slate-800 mt-1.5">Evening Shift</p>
              <p className="text-[10px] text-slate-500">Group II paper variant</p>
            </button>
          </div>

          {/* Confidence */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-violet-700">
                  Topic-Recurrence Confidence
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Mean frequency of the selected topics across {PAST_PAPER_YEARS.length} years
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-violet-700">{predicted.confidence}%</span>
              </div>
            </div>
            <div className="mt-2.5 h-2 bg-white rounded-full overflow-hidden border border-violet-100">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${predicted.confidence}%` }}
              />
            </div>
            <p className="text-[10px] text-violet-800/70 mt-2 leading-relaxed">
              This is a computed score from how often each topic recurs in the sampled papers — it is
              a study-prioritisation aid, not a guarantee about the real upcoming paper.
            </p>
          </div>

          {/* Topic table */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp size={13} /> High-Probability Topics
            </h4>
            <div className="space-y-1.5">
              {insights.slice(0, 8).map((t) => (
                <div key={t.topic} className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-700 flex-1 truncate">{t.topic}</span>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                    <div
                      className={`h-full rounded-full ${
                        t.probability >= 80
                          ? "bg-emerald-500"
                          : t.probability >= 60
                          ? "bg-amber-500"
                          : "bg-slate-400"
                      }`}
                      style={{ width: `${t.probability}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 w-9 text-right shrink-0">
                    {t.probability}%
                  </span>
                  <span className="text-[9px] text-slate-400 w-10 shrink-0">{t.yearsAppeared}/5 yrs</span>
                </div>
              ))}
            </div>
          </div>

          {!showPredicted ? (
            <button
              onClick={() => setShowPredicted(true)}
              className="w-full py-3.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Sparkles size={14} />
              Generate Complete {shift === "morning" ? "Morning" : "Evening"} Paper
            </button>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-bold mb-1">
                <CheckCircle2 size={13} />
                Full paper generated in current board scheme
                <span className="ml-auto flex items-center gap-1 text-slate-500 font-normal">
                  <Clock size={11} /> {predicted.totalTimeMinutes} min
                </span>
              </div>
              <PaperView paper={predicted} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
