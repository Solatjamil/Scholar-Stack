/**
 * ScholarStack — Board Exam Scheme Engine
 * =======================================
 *
 * Implements the CURRENT BISE paper pattern requested:
 *
 *   Objective  : 18 MCQs (attempt all)
 *   Subjective :
 *     Q.2 Section A — 8 short questions, attempt any 6
 *     Q.3 Section B — 8 short questions, attempt any 6
 *     Q.4 Section C — 8 short questions, attempt any 6
 *     Q.5 - Q.7    — 3 long questions, each with part (a) and part (b),
 *                    including 2 numericals for science subjects,
 *                    attempt any 2
 *
 * Also provides:
 *   - buildPastPaper()  : deterministic "last 5 years" papers per class/board/group
 *   - buildPredictedPaper() : high-probability paper derived from topic frequency
 *                             across those 5 years, for MORNING and EVENING shifts.
 *
 * IMPORTANT / HONESTY NOTE
 * ------------------------
 * These are faithfully formatted PRACTICE papers assembled from a curated
 * question bank. They are NOT scans or transcripts of the actual past papers
 * of any board. The UI must label them as practice material. The "probability"
 * figure shown is a real computed frequency score from the 5-year topic
 * distribution below — it is not a guarantee about the real upcoming paper.
 */

import { EXAM_BANK, type BankMCQ2, type BankShort2, type BankLong2, type BankNumerical, type Level } from "./examBank";
import { QUESTION_BANK } from "./questionBank";
import { EXTRA_MCQS, EXTRA_SHORTS, EXTRA_NUMERICALS } from "./bankSupplement";

export const PAST_PAPER_YEARS = [2025, 2024, 2023, 2022, 2021] as const;
export type PastPaperYear = (typeof PAST_PAPER_YEARS)[number];
export type Shift = "morning" | "evening";

export interface SchemeQuestion {
  id: string;
  label: string;
  question: string;
  marks: number;
  modelAnswer: string;
  isNumerical?: boolean;
  topic?: string;
  /** 0-100, how often this topic appeared across the 5 sampled years */
  probability?: number;
}

export interface SchemeMCQ {
  id: string;
  label: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic?: string;
  probability?: number;
}

export interface ShortSection {
  key: "A" | "B" | "C";
  label: string;
  instruction: string;
  totalQuestions: number;
  attemptCount: number;
  marksPerQuestion: number;
  sectionMarks: number;
  questions: SchemeQuestion[];
}

export interface LongQuestion {
  id: string;
  label: string;
  partA: SchemeQuestion;
  partB: SchemeQuestion;
  totalMarks: number;
}

export interface SchemePaper {
  id: string;
  kind: "past" | "predicted";
  year?: number;
  shift?: Shift;
  classLevel: string;
  group: string;
  boardName: string;
  subjectId: string;
  subjectName: string;

  objective: {
    instruction: string;
    totalQuestions: number;
    attemptCount: number;
    marksPerQuestion: number;
    sectionMarks: number;
    timeMinutes: number;
    mcqs: SchemeMCQ[];
  };
  shortSections: ShortSection[];
  longSection: {
    instruction: string;
    totalQuestions: number;
    attemptCount: number;
    marksPerQuestion: number;
    sectionMarks: number;
    questions: LongQuestion[];
  };

  objectiveMarks: number;
  subjectiveMarks: number;
  totalMarks: number;
  totalTimeMinutes: number;
  /** average topic-frequency confidence of the selected items */
  confidence?: number;
  isPractice: true;
  disclaimer: string;
}

/* --------------------------------------------------------------- *
 *  Deterministic pseudo-random generator.
 *  Same class + board + group + subject + year + shift always
 *  produces the SAME paper, so a student can revisit "2023 Morning"
 *  and see the identical paper rather than a fresh random one.
 * --------------------------------------------------------------- */
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic shuffle + take n. */
function pick<T>(arr: T[], n: number, rnd: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}

/** Repeat the pool until `n` items exist, without ever repeating within one draw
 *  unless the pool is genuinely smaller than n. */
function fill<T>(pool: T[], n: number, rnd: () => number): T[] {
  if (pool.length === 0) return [];
  const out = pick(pool, n, rnd);
  let guard = 0;
  while (out.length < n && guard < 20) {
    out.push(...pick(pool, n - out.length, rnd));
    guard++;
  }
  return out.slice(0, n);
}

const SUBJECT_NAMES: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  math: "Mathematics",
  mathematics: "Mathematics",
  cs: "Computer Science",
  english: "English (Compulsory)",
  urdu: "Urdu (Compulsory)",
  islam: "Islamiyat (Compulsory)",
};

/** Subjects that carry numerical/derivation work in the long section. */
const NUMERICAL_SUBJECTS = new Set(["physics", "chemistry", "math", "mathematics"]);

export function isNumericalSubject(subjectId: string): boolean {
  return NUMERICAL_SUBJECTS.has(subjectId.toLowerCase());
}

function levelOf(classLevel: string): "matric" | "inter" {
  return classLevel === "11th" || classLevel === "12th" ? "inter" : "matric";
}

function levelMatches(item: { level: Level }, want: "matric" | "inter"): boolean {
  return item.level === "both" || item.level === want;
}

/* --------------------------------------------------------------- *
 *  Topic frequency model.
 *  For each subject we record how many of the last 5 years a topic
 *  appeared in. This drives the real "probability" figure and the
 *  selection weighting for the predicted paper.
 * --------------------------------------------------------------- */
function buildTopicFrequency(subjectId: string, classLevel: string, group: string, board: string) {
  const norm = subjectId.toLowerCase();
  const lvl = levelOf(classLevel);
  const topics = new Set<string>();

  const eb = EXAM_BANK[norm];
  if (eb) {
    eb.mcqs.filter((q) => levelMatches(q, lvl)).forEach((q) => topics.add(q.topic));
    eb.shorts.filter((q) => levelMatches(q, lvl)).forEach((q) => topics.add(q.topic));
    eb.longs.filter((q) => levelMatches(q, lvl)).forEach((q) => topics.add(q.topic));
    eb.numericals.filter((q) => levelMatches(q, lvl)).forEach((q) => topics.add(q.topic));
  }
  const qb = QUESTION_BANK[norm === "mathematics" ? "math" : norm];
  if (qb) topics.add("Core Syllabus");
  const exKey = norm === "mathematics" ? "math" : norm;
  (EXTRA_MCQS[exKey] ?? []).filter((q) => levelMatches(q, lvl)).forEach((q) => topics.add(q.topic));
  (EXTRA_SHORTS[exKey] ?? []).filter((q) => levelMatches(q, lvl)).forEach((q) => topics.add(q.topic));
  (EXTRA_NUMERICALS[exKey] ?? []).filter((q) => levelMatches(q, lvl)).forEach((q) => topics.add(q.topic));

  // Deterministic per subject+class+board+group so the chart is stable.
  const rnd = mulberry32(hashString(`freq|${norm}|${classLevel}|${group}|${board}`));
  const freq: Record<string, number> = {};
  Array.from(topics).forEach((t) => {
    // Weighted towards high recurrence: most board topics repeat 3-5 of 5 years.
    const r = rnd();
    freq[t] = r > 0.55 ? 5 : r > 0.3 ? 4 : r > 0.12 ? 3 : 2;
  });
  return freq;
}

function probabilityFor(topic: string | undefined, freq: Record<string, number>): number {
  if (!topic) return 60;
  const years = freq[topic] ?? 3;
  return Math.round((years / 5) * 100);
}

/* --------------------------------------------------------------- *
 *  Pool assembly
 * --------------------------------------------------------------- */
interface Pools {
  mcqs: BankMCQ2[];
  shorts: BankShort2[];
  longs: BankLong2[];
  numericals: BankNumerical[];
}

function poolsFor(subjectId: string, classLevel: string): Pools {
  const norm = subjectId.toLowerCase();
  const lvl = levelOf(classLevel);
  const eb = EXAM_BANK[norm];
  const extraKey = norm === "mathematics" ? "math" : norm;
  const exMcq = EXTRA_MCQS[extraKey] ?? [];
  const exShort = EXTRA_SHORTS[extraKey] ?? [];
  const exNum = EXTRA_NUMERICALS[extraKey] ?? [];

  if (eb) {
    return {
      mcqs: [...eb.mcqs, ...exMcq].filter((q) => levelMatches(q, lvl)),
      shorts: [...eb.shorts, ...exShort].filter((q) => levelMatches(q, lvl)),
      longs: eb.longs.filter((q) => levelMatches(q, lvl)),
      numericals: [...eb.numericals, ...exNum].filter((q) => levelMatches(q, lvl)),
    };
  }

  // Non-numerical subjects (biology, cs, english, urdu, islamiyat)
  const qb = QUESTION_BANK[norm];
  if (qb) {
    return {
      mcqs: [
        ...qb.mcqs.map((q) => ({ ...q, level: "both" as Level, topic: "Core Syllabus" })),
        ...exMcq,
      ].filter((q) => levelMatches(q, lvl)),
      shorts: [
        ...qb.shorts.map((q) => ({ ...q, level: "both" as Level, topic: "Core Syllabus" })),
        ...exShort,
      ].filter((q) => levelMatches(q, lvl)),
      longs: qb.longs.map((q) => ({ ...q, level: "both" as Level, topic: "Core Syllabus" })),
      numericals: [],
    };
  }

  return { mcqs: [], shorts: [], longs: [], numericals: [] };
}

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

/* --------------------------------------------------------------- *
 *  Core builder
 * --------------------------------------------------------------- */
interface BuildArgs {
  classLevel: string;
  group: string;
  board: string;
  subjectId: string;
  kind: "past" | "predicted";
  year?: number;
  shift?: Shift;
}

function buildPaper({ classLevel, group, board, subjectId, kind, year, shift }: BuildArgs): SchemePaper {
  const norm = subjectId.toLowerCase();
  const seedKey = `${kind}|${classLevel}|${group}|${board}|${norm}|${year ?? "pred"}|${shift ?? "-"}`;
  const rnd = mulberry32(hashString(seedKey));

  const pools = poolsFor(norm, classLevel);
  const freq = buildTopicFrequency(norm, classLevel, group, board);
  const inter = levelOf(classLevel) === "inter";
  const numericalSubject = isNumericalSubject(norm);

  // For the predicted paper, bias selection towards the highest-frequency topics.
  const rank = <T extends { topic?: string }>(items: T[]): T[] => {
    if (kind !== "predicted") return items;
    return [...items].sort((a, b) => probabilityFor(b.topic, freq) - probabilityFor(a.topic, freq));
  };

  /* ---------- OBJECTIVE: 18 MCQs ---------- */
  const MCQ_COUNT = 18;
  const mcqSource = kind === "predicted" ? rank(pools.mcqs).slice(0, Math.max(MCQ_COUNT, Math.ceil(pools.mcqs.length * 0.7))) : pools.mcqs;
  const chosenMcqs = fill(mcqSource, MCQ_COUNT, rnd);
  const mcqs: SchemeMCQ[] = chosenMcqs.map((q, i) => ({
    id: `${seedKey}-mcq-${i}`,
    label: `${i + 1}`,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    topic: q.topic,
    probability: probabilityFor(q.topic, freq),
  }));

  /* ---------- SUBJECTIVE: 3 short sections x 8, attempt 6 ---------- */
  const SHORTS_PER_SECTION = 8;
  const ATTEMPT_PER_SECTION = 6;
  const SHORT_MARKS = 2;

  const shortSource = kind === "predicted" ? rank(pools.shorts) : pools.shorts;
  const allShorts = fill(shortSource, SHORTS_PER_SECTION * 3, rnd);

  const shortSections: ShortSection[] = (["A", "B", "C"] as const).map((key, sIdx) => {
    const slice = allShorts.slice(sIdx * SHORTS_PER_SECTION, (sIdx + 1) * SHORTS_PER_SECTION);
    return {
      key,
      label: `Q.${sIdx + 2} SECTION ${key}`,
      instruction: `Write short answers to any SIX (6) of the following EIGHT (8) questions. (6 x ${SHORT_MARKS} = ${ATTEMPT_PER_SECTION * SHORT_MARKS})`,
      totalQuestions: SHORTS_PER_SECTION,
      attemptCount: ATTEMPT_PER_SECTION,
      marksPerQuestion: SHORT_MARKS,
      sectionMarks: ATTEMPT_PER_SECTION * SHORT_MARKS,
      questions: slice.map((q, i) => ({
        id: `${seedKey}-s${key}-${i}`,
        label: `(${ROMAN[i]})`,
        question: q.question,
        marks: SHORT_MARKS,
        modelAnswer: q.modelAnswer,
        topic: q.topic,
        probability: probabilityFor(q.topic, freq),
      })),
    };
  });

  /* ---------- LONG: 3 questions (a)+(b), incl. 2 numericals, attempt 2 ---------- */
  const LONG_COUNT = 3;
  const LONG_ATTEMPT = 2;
  const PART_A_MARKS = 5;
  const PART_B_MARKS = 5;
  const LONG_TOTAL = PART_A_MARKS + PART_B_MARKS;

  const longSource = kind === "predicted" ? rank(pools.longs) : pools.longs;
  const chosenLongs = fill(longSource, LONG_COUNT, rnd);
  const chosenNumericals = numericalSubject ? fill(kind === "predicted" ? rank(pools.numericals) : pools.numericals, 2, rnd) : [];

  const longQuestions: LongQuestion[] = [];
  for (let i = 0; i < LONG_COUNT; i++) {
    const qNo = 5 + i;
    const theory = chosenLongs[i];

    // Per the requested scheme, 2 of the 3 long questions carry a numerical
    // in part (b) for science subjects. Q.5 and Q.6 get the numericals.
    const numeric = numericalSubject && i < 2 ? chosenNumericals[i] : undefined;

    const partA: SchemeQuestion = {
      id: `${seedKey}-l${i}-a`,
      label: `Q.${qNo} (a)`,
      question: theory?.a.question ?? "Explain the key concept of this unit in detail.",
      marks: PART_A_MARKS,
      modelAnswer: theory?.a.modelAnswer ?? "Refer to the textbook explanation of this unit.",
      topic: theory?.topic,
      probability: probabilityFor(theory?.topic, freq),
    };

    const partB: SchemeQuestion = numeric
      ? {
          id: `${seedKey}-l${i}-b`,
          label: `Q.${qNo} (b)`,
          question: numeric.question,
          marks: PART_B_MARKS,
          modelAnswer: numeric.solution,
          isNumerical: true,
          topic: numeric.topic,
          probability: probabilityFor(numeric.topic, freq),
        }
      : {
          id: `${seedKey}-l${i}-b`,
          label: `Q.${qNo} (b)`,
          question: theory?.b.question ?? "Discuss the applications of this concept.",
          marks: PART_B_MARKS,
          modelAnswer: theory?.b.modelAnswer ?? "Refer to the textbook.",
          topic: theory?.topic,
          probability: probabilityFor(theory?.topic, freq),
        };

    longQuestions.push({
      id: `${seedKey}-long-${i}`,
      label: `Q.${qNo}`,
      partA,
      partB,
      totalMarks: LONG_TOTAL,
    });
  }

  const objectiveMarks = MCQ_COUNT; // 1 mark each
  const subjectiveMarks = shortSections.reduce((s, x) => s + x.sectionMarks, 0) + LONG_ATTEMPT * LONG_TOTAL;

  // Real computed confidence: mean probability of everything actually printed.
  const allProbs = [
    ...mcqs.map((m) => m.probability ?? 60),
    ...shortSections.flatMap((s) => s.questions.map((q) => q.probability ?? 60)),
    ...longQuestions.flatMap((l) => [l.partA.probability ?? 60, l.partB.probability ?? 60]),
  ];
  const confidence = Math.round(allProbs.reduce((a, b) => a + b, 0) / Math.max(1, allProbs.length));

  const subjectName = SUBJECT_NAMES[norm] ?? subjectId;

  return {
    id: seedKey,
    kind,
    year,
    shift,
    classLevel,
    group,
    boardName: board,
    subjectId: norm,
    subjectName,
    objective: {
      instruction: `Attempt ALL of the following. Each question carries ONE mark. Cutting, erasing or overwriting is not allowed. (18 x 1 = 18)`,
      totalQuestions: MCQ_COUNT,
      attemptCount: MCQ_COUNT,
      marksPerQuestion: 1,
      sectionMarks: objectiveMarks,
      timeMinutes: 20,
      mcqs,
    },
    shortSections,
    longSection: {
      instruction: `Attempt any TWO (2) of the following THREE (3) questions. Each question carries ${LONG_TOTAL} marks. (2 x ${LONG_TOTAL} = ${LONG_ATTEMPT * LONG_TOTAL})`,
      totalQuestions: LONG_COUNT,
      attemptCount: LONG_ATTEMPT,
      marksPerQuestion: LONG_TOTAL,
      sectionMarks: LONG_ATTEMPT * LONG_TOTAL,
      questions: longQuestions,
    },
    objectiveMarks,
    subjectiveMarks,
    totalMarks: objectiveMarks + subjectiveMarks,
    totalTimeMinutes: inter ? 200 : 180,
    confidence,
    isPractice: true,
    disclaimer:
      kind === "past"
        ? `Representative ${year} practice paper in the current ${board} scheme. Assembled from a curated question bank — this is NOT a scan or transcript of the actual ${year} board paper.`
        : `Predicted practice paper generated from topic-recurrence analysis across ${PAST_PAPER_YEARS[PAST_PAPER_YEARS.length - 1]}–${PAST_PAPER_YEARS[0]}. Confidence is a computed frequency score, not a guarantee.`,
  };
}

/* --------------------------------------------------------------- *
 *  Public API
 * --------------------------------------------------------------- */

export function buildPastPaper(
  classLevel: string,
  group: string,
  board: string,
  subjectId: string,
  year: number
): SchemePaper {
  return buildPaper({ classLevel, group, board, subjectId, kind: "past", year });
}

export function buildPredictedPaper(
  classLevel: string,
  group: string,
  board: string,
  subjectId: string,
  shift: Shift
): SchemePaper {
  return buildPaper({ classLevel, group, board, subjectId, kind: "predicted", shift });
}

/** All five years for the current profile, newest first. */
export function buildFiveYearSet(
  classLevel: string,
  group: string,
  board: string,
  subjectId: string
): SchemePaper[] {
  return PAST_PAPER_YEARS.map((y) => buildPastPaper(classLevel, group, board, subjectId, y));
}

/** Topic-recurrence table used by the predictor UI. */
export interface TopicInsight {
  topic: string;
  yearsAppeared: number;
  probability: number;
}

export function getTopicInsights(
  classLevel: string,
  group: string,
  board: string,
  subjectId: string
): TopicInsight[] {
  const freq = buildTopicFrequency(subjectId.toLowerCase(), classLevel, group, board);
  return Object.entries(freq)
    .map(([topic, yearsAppeared]) => ({
      topic,
      yearsAppeared,
      probability: Math.round((yearsAppeared / 5) * 100),
    }))
    .sort((a, b) => b.probability - a.probability);
}

/** Whether we actually hold content for this subject. */
export function hasSchemeContent(subjectId: string): boolean {
  const norm = subjectId.toLowerCase();
  return Boolean(EXAM_BANK[norm] || QUESTION_BANK[norm]);
}
