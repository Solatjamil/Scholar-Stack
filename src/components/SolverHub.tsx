import React, { useEffect, useMemo, useState } from "react";
import {
  ALL_FORMULAS,
  Formula,
  SolveResult,
  SubjectKey,
  ClassKey,
  formulasFor,
  solve,
} from "../solverEngine";
import {
  WorkedProblem,
  WorkedSubject,
  chaptersFor,
  coverageNote,
  problemsFor,
} from "../workedSolutions";

/**
 * NUMERICALS, THEOREMS & SOLUTIONS
 *
 * Two complementary tools, because "solve any sum" and "show me the book's
 * answer" are different needs:
 *
 *  1. Step-by-Step Solver - pick a formula, pick the unknown, type your own
 *     values, get Given -> Formula -> Rearrangement -> Steps -> Answer. Works
 *     for any exercise question in that chapter, not a fixed list.
 *  2. Worked Solutions - fully written-out exercise problems and geometry
 *     theorem proofs in board answer format.
 *
 * Everything runs locally: no AI, no network, works offline in the Android
 * build. The solver's arithmetic and every worked solution are unit-tested.
 */

type Mode = "solver" | "solutions";
const CLASSES: ClassKey[] = ["9th", "10th", "11th", "12th"];
const SOLVER_SUBJECTS: SubjectKey[] = ["physics", "chemistry", "math"];

export default function SolverHub({
  studentClass = "10th",
}: {
  /** The class saved in the student's profile, so content matches their year. */
  studentClass?: ClassKey;
}) {
  const [mode, setMode] = useState<Mode>("solver");
  const [classLevel, setClassLevel] = useState<ClassKey>(studentClass);
  const [subject, setSubject] = useState<SubjectKey>("physics");

  useEffect(() => setClassLevel(studentClass), [studentClass]);

  return (
    <div className="space-y-5">
      <header className="rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-5">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Numericals, Theorems &amp; Solutions
        </h2>
        <p className="mt-1 text-sm text-slate-300">
          Har numerical ka mukammal hal - Given, Formula, Steps aur Answer ke saath.
          Apne numbers daal kar khud bhi hal nikaalein.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Matric (9th-10th) aur Intermediate (11th-12th) alag cycles hain: 10th walon
          ko 9th ka content bhi milta hai aur 12th walon ko 11th ka - dono cycles
          aapas mein mix nahi hote.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl bg-slate-800 p-1">
          {(["solver", "solutions"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`min-h-[42px] rounded-lg px-4 text-sm font-semibold transition ${
                mode === m ? "bg-emerald-600 text-white" : "text-slate-300"
              }`}
            >
              {m === "solver" ? "Step-by-Step Solver" : "Worked Solutions"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value as ClassKey)}
          className="min-h-[44px] rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100"
          aria-label="Class"
        >
          {CLASSES.map((c) => (
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {SOLVER_SUBJECTS.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`min-h-[44px] rounded-lg px-4 text-sm font-medium capitalize transition ${
                subject === s
                  ? "bg-slate-100 text-slate-900"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {s === "math" ? "Maths" : s}
            </button>
          ))}
        </div>
      </div>

      {mode === "solver" ? (
        <SolverPanel classLevel={classLevel} subject={subject} />
      ) : (
        <SolutionsPanel classLevel={classLevel} subject={subject} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Step-by-step solver
 * ------------------------------------------------------------------ */

function SolverPanel({
  classLevel,
  subject,
}: {
  classLevel: ClassKey;
  subject: SubjectKey;
}) {
  const list = useMemo(() => formulasFor(classLevel, subject), [classLevel, subject]);
  const [formulaId, setFormulaId] = useState<string>(list[0]?.id ?? "");
  const formula: Formula | undefined =
    list.find((f) => f.id === formulaId) ?? list[0];

  const [target, setTarget] = useState<string>("");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SolveResult | null>(null);

  // Reset cleanly whenever the chosen formula changes, so stale values from a
  // previous formula can never leak into a new calculation.
  useEffect(() => {
    if (list.length && !list.some((f) => f.id === formulaId)) {
      setFormulaId(list[0].id);
    }
  }, [list, formulaId]);

  useEffect(() => {
    if (!formula) return;
    setTarget(Object.keys(formula.solveFor)[0] ?? "");
    setInputs({});
    setResult(null);
  }, [formula?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!formula) {
    return (
      <p className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
        Is class aur subject ke liye formulas abhi add nahi hue.
      </p>
    );
  }

  const needed = formula.vars.filter((v) => v.sym !== target);

  const byChapter = list.reduce<Record<string, Formula[]>>((acc, f) => {
    (acc[f.chapter] ||= []).push(f);
    return acc;
  }, {});

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      {/* Formula picker */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
        <h3 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-slate-400">
          Formula chunein ({list.length})
        </h3>
        <div className="max-h-[420px] space-y-3 overflow-y-auto">
          {(Object.entries(byChapter) as [string, Formula[]][]).map(([chapter, fs]) => (
            <div key={chapter}>
              <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                {chapter}
              </p>
              {fs.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormulaId(f.id)}
                  className={`mb-1 block w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                    f.id === formula.id
                      ? "bg-emerald-600/20 text-emerald-200 ring-1 ring-emerald-500/40"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <span className="block font-semibold">{f.title}</span>
                  <span className="block font-mono text-[10px] text-slate-400">
                    {f.expression}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Input + result */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <h3 className="text-base font-bold text-white">{formula.title}</h3>
          <p className="mt-1 font-mono text-sm text-emerald-300">{formula.expression}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">{formula.romanUrdu}</p>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Kya nikalna hai? (unknown)
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(formula.solveFor).map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setTarget(k);
                    setResult(null);
                  }}
                  className={`min-h-[40px] rounded-lg px-3 font-mono text-sm transition ${
                    target === k
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {needed.map((v) => (
              <div key={v.sym}>
                <label className="mb-1 block text-xs text-slate-300">
                  <span className="font-mono font-bold text-slate-100">{v.sym}</span> — {v.name}
                  {v.unit && <span className="text-slate-500"> ({v.unit})</span>}
                </label>
                <input
                  value={inputs[v.sym] ?? ""}
                  onChange={(e) => {
                    setInputs({ ...inputs, [v.sym]: e.target.value });
                    setResult(null);
                  }}
                  inputMode="decimal"
                  placeholder={v.hint || "Value likhein"}
                  className="min-h-[44px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setResult(solve(formula, target, inputs))}
              className="min-h-[44px] flex-1 rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white hover:bg-emerald-500"
            >
              Hal karein (Solve)
            </button>
            <button
              onClick={() => {
                setInputs({});
                setResult(null);
              }}
              className="min-h-[44px] rounded-lg bg-slate-800 px-4 text-sm font-semibold text-slate-300 hover:bg-slate-700"
            >
              Clear
            </button>
          </div>
        </div>

        {result && <ResultCard result={result} target={target} />}
      </div>
    </div>
  );
}

function ResultCard({ result, target }: { result: SolveResult; target: string }) {
  if (!result.ok) {
    return (
      <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4">
        <p className="text-sm font-semibold text-rose-200">{result.error}</p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-900">
      <div className="border-b border-slate-800 bg-emerald-600/10 px-4 py-2">
        <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-300">
          Mukammal Hal (Complete Solution)
        </h4>
      </div>
      <div className="space-y-4 p-4">
        <Section title="Given Data">
          {result.given.map((g, i) => (
            <div key={i}>
              <Row label={g.label} value={g.value} />
            </div>
          ))}
        </Section>

        <Section title="Formula">
          <p className="font-mono text-sm text-emerald-300">{result.formula}</p>
        </Section>

        <Section title={`Rearranging for ${target}`}>
          <p className="font-mono text-sm text-slate-100">{result.rearranged}</p>
        </Section>

        {result.steps.length > 0 && (
          <Section title="Working">
            {result.steps.map((s, i) => (
              <div key={i}>
                <Row label={s.label} value={s.value} />
              </div>
            ))}
          </Section>
        )}

        <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-300">
            Final Answer
          </p>
          <p className="mt-0.5 font-mono text-xl font-bold text-white">
            {target} = {result.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 rounded-lg bg-slate-950/60 px-3 py-1.5">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="font-mono text-sm text-slate-100">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Worked solutions
 * ------------------------------------------------------------------ */

function SolutionsPanel({
  classLevel,
  subject,
}: {
  classLevel: ClassKey;
  subject: SubjectKey;
}) {
  const subj = subject as WorkedSubject;
  const chapters = useMemo(() => chaptersFor(classLevel, subj), [classLevel, subj]);
  const [chapter, setChapter] = useState<string>("all");
  const all = useMemo(() => problemsFor(classLevel, subj), [classLevel, subj]);
  const shown = chapter === "all" ? all : all.filter((p) => p.chapter === chapter);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => setChapter("all"), [classLevel, subject]);

  return (
    <div className="space-y-4">
      <p className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-xs leading-relaxed text-slate-300">
        {coverageNote(classLevel, subj)}
      </p>

      {chapters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setChapter("all")}
            className={`min-h-[38px] rounded-lg px-3 text-xs font-medium ${
              chapter === "all"
                ? "bg-slate-100 text-slate-900"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            All ({all.length})
          </button>
          {chapters.map((c) => (
            <button
              key={c}
              onClick={() => setChapter(c)}
              className={`min-h-[38px] rounded-lg px-3 text-xs font-medium ${
                chapter === c
                  ? "bg-slate-100 text-slate-900"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
          Is selection ke liye worked solutions abhi nahi hain. &ldquo;Step-by-Step
          Solver&rdquo; par jaayein aur apne numbers daal kar hal nikaalein.
        </p>
      ) : (
        <div className="space-y-3">
          {shown.map((p, i) => (
            <div key={p.id}>
            <ProblemCard
              problem={p}
              index={i + 1}
              isOpen={open === p.id}
              onToggle={() => setOpen(open === p.id ? null : p.id)}
            />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProblemCard({
  problem,
  index,
  isOpen,
  onToggle,
}: {
  problem: WorkedProblem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isTheorem = problem.kind === "theorem";
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
      <button
        onClick={onToggle}
        className="flex min-h-[56px] w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-slate-800/50"
      >
        <span className="flex gap-3">
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
              isTheorem
                ? "bg-violet-600/20 text-violet-300"
                : "bg-emerald-600/20 text-emerald-300"
            }`}
          >
            {index}
          </span>
          <span>
            <span className="block text-sm font-semibold leading-snug text-slate-100">
              {problem.question}
            </span>
            <span className="mt-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                {problem.chapter}
              </span>
              {isTheorem && (
                <span className="rounded-full bg-violet-600/20 px-2 py-0.5 text-[10px] text-violet-300">
                  Theorem
                </span>
              )}
            </span>
          </span>
        </span>
        <span className={`shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}>
          &#9662;
        </span>
      </button>

      {isOpen && (
        <div className="space-y-4 border-t border-slate-800 px-4 py-4">
          <p className="rounded-lg bg-slate-950/60 px-3 py-2 text-xs italic leading-relaxed text-slate-300">
            {problem.romanUrdu}
          </p>

          {problem.given && (
            <Section title="Given Data">
              {problem.given.map((g, i) => (
                <div key={i}>
                  <Row label={g.label} value={g.value} />
                </div>
              ))}
            </Section>
          )}

          {problem.toProve && (
            <Section title="To Prove">
              <p className="font-mono text-sm text-violet-200">{problem.toProve}</p>
            </Section>
          )}

          {problem.construction && (
            <Section title="Construction">
              <p className="text-sm text-slate-200">{problem.construction}</p>
            </Section>
          )}

          {problem.formula && (
            <Section title="Formula">
              <p className="font-mono text-sm text-emerald-300">{problem.formula}</p>
            </Section>
          )}

          <Section title={isTheorem ? "Proof" : "Solution"}>
            {problem.steps.map((s, i) => (
              <div
                key={i}
                className="flex flex-wrap items-baseline gap-x-2 rounded-lg bg-slate-950/60 px-3 py-1.5"
              >
                <span className="text-[11px] font-semibold text-slate-400">
                  {i + 1}. {s.label}
                </span>
                <span className="font-mono text-sm text-slate-100">{s.value}</span>
              </div>
            ))}
          </Section>

          <div
            className={`rounded-xl border-2 p-3 ${
              isTheorem
                ? "border-violet-500/50 bg-violet-500/10"
                : "border-emerald-500/50 bg-emerald-500/10"
            }`}
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-wide ${
                isTheorem ? "text-violet-300" : "text-emerald-300"
              }`}
            >
              {isTheorem ? "Conclusion" : "Final Answer"}
            </p>
            <p className="mt-0.5 text-base font-bold text-white">{problem.answer}</p>
          </div>

          {problem.examTip && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-300">
                Exam Tip
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-amber-100/90">
                {problem.examTip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Total count for honest UI copy elsewhere in the app. */
export const SOLVER_FORMULA_COUNT = ALL_FORMULAS.length;
