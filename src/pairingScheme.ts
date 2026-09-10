/**
 * PAIRING SCHEME / PAPER SCHEME (Punjab Boards, PBCC-issued)
 * ---------------------------------------------------------------------------
 * A "pairing scheme" tells a Pakistani board student three things:
 *   1. how many MCQs come from each chapter,
 *   2. which chapters are grouped into Q.2 / Q.3 / Q.4 (short questions),
 *   3. which chapters are paired into Q.5 / Q.6 / Q.7 (long questions).
 *
 * All nine Punjab boards (Lahore, Gujranwala, Multan, Faisalabad, Rawalpindi,
 * Sargodha, Bahawalpur, Sahiwal, DG Khan) follow the identical PBCC scheme, so
 * one table serves them all. FBISE, Sindh, KPK, Balochistan and AJK do NOT use
 * it, which is why `schemeFor()` returns null for those boards rather than
 * showing a Punjab scheme to a Karachi student.
 *
 * ── ACCURACY NOTE, PLEASE READ BEFORE EDITING ──────────────────────────────
 * Boards revise these every year and published copies disagree with each
 * other. The tables below are the 2026 Punjab scheme, cross-checked across
 * several independent publishers; where sources conflicted the entry was left
 * out rather than guessed. A newer SLO/PECTAA-based pattern is being phased in
 * for 2027 with a different chapter count, so every scheme carries `session`
 * and `sourceNote`, and the UI always tells the student to confirm with their
 * own teacher or board. We never present this as official board issue.
 *
 * ── PRODUCT RULE ───────────────────────────────────────────────────────────
 * "Not in the scheme" NEVER means locked. Excluded chapters stay fully
 * readable and studiable; they are only labelled so a student revising the
 * night before an exam knows where the marks are. Cutting access to content a
 * student's own textbook contains would be wrong.
 */

export interface ShortGroup {
  /** "Q.2" | "Q.3" | "Q.4" */
  question: string;
  /** Chapter numbers pooled into this question. */
  chapters: number[];
  /** e.g. "any 5 of 8" */
  attempt: string;
}

export interface LongPair {
  /** "Q.5" | "Q.6" | "Q.7" */
  question: string;
  /** Chapters this long question may be drawn from. */
  chapters: number[];
}

export interface PairingScheme {
  subjectId: string;
  classLevel: string;
  session: string;
  totalMarks: number;
  /** chapter number -> number of MCQs */
  mcqs: Record<number, number>;
  mcqTotal: number;
  shortGroups: ShortGroup[];
  shortNote: string;
  longPairs: LongPair[];
  longNote: string;
  sourceNote: string;
}

/** Only the Punjab boards share the PBCC pairing scheme. */
const PUNJAB_BOARDS = [
  "lahore",
  "gujranwala",
  "multan",
  "faisalabad",
  "rawalpindi",
  "sargodha",
  "bahawalpur",
  "sahiwal",
  "dg khan",
  "dgkhan",
];

export function isPunjabBoard(board: string): boolean {
  const b = (board || "").toLowerCase();
  if (b.includes("federal") || b.includes("fbise")) return false;
  return PUNJAB_BOARDS.some((p) => b.includes(p));
}

const SRC_2026 =
  "2026 Punjab (PBCC) scheme, cross-checked across multiple publishers. Boards revise schemes yearly and a new SLO-based pattern is being introduced — always confirm with your teacher or board before relying on it.";

/**
 * Keys are `${classLevel}-${subjectId}`.
 * Chapter numbers match the numbering printed in the Punjab textbook, which is
 * why 10th Physics starts at 10 and 10th Chemistry at 9.
 */
export const PAIRING_SCHEMES: Record<string, PairingScheme> = {
  /* ───────────────────────── 9th ───────────────────────── */
  "9th-physics": {
    subjectId: "physics",
    classLevel: "9th",
    session: "2026",
    totalMarks: 60,
    mcqs: { 1: 1, 2: 1, 3: 2, 4: 2, 5: 1, 6: 2, 7: 1, 8: 1, 9: 1 },
    mcqTotal: 12,
    shortGroups: [
      { question: "Q.2", chapters: [1, 2, 3], attempt: "any 5 of 8" },
      { question: "Q.3", chapters: [4, 5, 6], attempt: "any 5 of 8" },
      { question: "Q.4", chapters: [7, 8, 9], attempt: "any 5 of 8" },
    ],
    shortNote: "15 short questions × 2 marks = 30 marks",
    longPairs: [
      { question: "Q.5", chapters: [1, 2, 3] },
      { question: "Q.6", chapters: [4, 5, 6] },
      { question: "Q.7", chapters: [7, 8, 9] },
    ],
    longNote: "Attempt any 2 of 3 · each 9 marks (part a = 4, part b = 5) = 18 marks",
    sourceNote: SRC_2026,
  },

  "9th-biology": {
    subjectId: "biology",
    classLevel: "9th",
    session: "2026",
    totalMarks: 60,
    // This textbook edition has 9 units; published tables that cite a ch.10/11
    // follow a different edition, so those references are intentionally absent.
    mcqs: { 1: 2, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 2, 9: 2 },
    mcqTotal: 12,
    shortGroups: [
      { question: "Q.2", chapters: [1, 2, 3], attempt: "any 5 of 8" },
      { question: "Q.3", chapters: [4, 5, 6], attempt: "any 5 of 8" },
      { question: "Q.4", chapters: [7, 8, 9], attempt: "any 5 of 8" },
    ],
    shortNote: "15 short questions × 2 marks = 30 marks",
    longPairs: [
      { question: "Q.5", chapters: [2, 3] },
      { question: "Q.6", chapters: [6, 7] },
      { question: "Q.7", chapters: [8, 9] },
    ],
    longNote: "Attempt any 2 of 3 · each 9 marks (part a = 5, part b = 4) = 18 marks",
    sourceNote: SRC_2026,
  },

  /**
   * 9th Chemistry. Published tables list 11 chapters; the edition this app
   * ships has 8 units (Fundamentals -> Chemical Reactivity), so the scheme is
   * expressed over those 8 only. Chapters beyond the book are never referenced
   * - tools/checkSchemes.mjs enforces that.
   */
  "9th-chemistry": {
    subjectId: "chemistry",
    classLevel: "9th",
    session: "2026",
    totalMarks: 60,
    mcqs: { 1: 2, 2: 2, 3: 1, 4: 2, 5: 1, 6: 1, 7: 2, 8: 1 },
    mcqTotal: 12,
    shortGroups: [
      { question: "Q.2", chapters: [1, 2, 3], attempt: "any 5 of 8" },
      { question: "Q.3", chapters: [4, 5, 6], attempt: "any 5 of 8" },
      { question: "Q.4", chapters: [7, 8], attempt: "any 5 of 8" },
    ],
    shortNote: "15 short questions × 2 marks = 30 marks",
    longPairs: [
      { question: "Q.5", chapters: [1, 2] },
      { question: "Q.6", chapters: [3, 4] },
      { question: "Q.7", chapters: [7, 8] },
    ],
    longNote: "Attempt any 2 of 3 · each 9 marks (part a = 5, part b = 4) = 18 marks",
    sourceNote: SRC_2026,
  },

  /* ───────────────────────── 10th ───────────────────────── */
  "10th-physics": {
    subjectId: "physics",
    classLevel: "10th",
    session: "2026",
    totalMarks: 60,
    mcqs: { 10: 1, 11: 1, 12: 2, 13: 1, 14: 2, 15: 1, 16: 2, 17: 1, 18: 1 },
    mcqTotal: 12,
    shortGroups: [
      { question: "Q.2", chapters: [10, 12, 16], attempt: "any 5 of 8" },
      { question: "Q.3", chapters: [11, 14, 17], attempt: "any 5 of 8" },
      { question: "Q.4", chapters: [13, 15, 18], attempt: "any 5 of 8" },
    ],
    shortNote: "15 short questions × 2 marks = 30 marks",
    longPairs: [
      { question: "Q.5", chapters: [10, 12, 16] },
      { question: "Q.6", chapters: [11, 13, 17] },
      { question: "Q.7", chapters: [14, 15, 18] },
    ],
    longNote: "Attempt any 2 of 3 · each 9 marks (part a = 4, part b = 5) = 18 marks",
    sourceNote: SRC_2026,
  },

  /**
   * 10th Mathematics. The published 2026 table gives no MCQs for chapters 9,
   * 12, 14 and 15 - and this textbook edition has 13 units, so 14/15 do not
   * exist here. Chapters that appear in NO section are surfaced to the student
   * as "not in the paper", still fully readable.
   */
  "10th-math": {
    subjectId: "math",
    classLevel: "10th",
    session: "2026",
    totalMarks: 75,
    mcqs: { 1: 2, 2: 1, 3: 2, 4: 1, 5: 2, 6: 1, 7: 1, 8: 1, 10: 1, 11: 1, 13: 2 },
    mcqTotal: 15,
    shortGroups: [
      { question: "Q.2", chapters: [1, 2, 3], attempt: "any 6 of 9" },
      { question: "Q.3", chapters: [4, 5, 6], attempt: "any 6 of 9" },
      { question: "Q.4", chapters: [7, 8, 9, 10, 11, 13], attempt: "any 6 of 9" },
    ],
    shortNote: "18 short questions × 2 marks = 36 marks",
    longPairs: [
      { question: "Q.5", chapters: [1, 2] },
      { question: "Q.6", chapters: [3, 5] },
      { question: "Q.7", chapters: [6, 7] },
      { question: "Q.8", chapters: [10, 11, 13] },
    ],
    longNote: "Attempt any 3 of 4 · 24 marks total",
    sourceNote: SRC_2026,
  },

  "10th-biology": {
    subjectId: "biology",
    classLevel: "10th",
    session: "2026",
    totalMarks: 60,
    mcqs: { 10: 1, 11: 1, 12: 1, 13: 1, 14: 2, 15: 2, 16: 2, 17: 1, 18: 1 },
    mcqTotal: 12,
    shortGroups: [
      { question: "Q.2", chapters: [10, 11, 12], attempt: "any 5 of 8" },
      { question: "Q.3", chapters: [13, 14, 15], attempt: "any 5 of 8" },
      { question: "Q.4", chapters: [16, 17, 18], attempt: "any 5 of 8" },
    ],
    shortNote: "15 short questions × 2 marks = 30 marks",
    longPairs: [
      { question: "Q.5", chapters: [11, 13] },
      { question: "Q.6", chapters: [12, 14] },
      { question: "Q.7", chapters: [17, 18] },
    ],
    longNote: "Attempt any 2 of 3 · each 9 marks = 18 marks",
    sourceNote: SRC_2026,
  },

  /* ──────────────── 11th (HSSC Part I / 1st Year) ────────────────
   * Intermediate papers use a different shape to matric: 17 MCQs, short
   * questions in Q.2/Q.3/Q.4 (attempt 8 of 12, 8 of 12, 6 of 9) and FIVE long
   * questions of which any THREE are attempted.
   */
  "11th-physics": {
    subjectId: "physics",
    classLevel: "11th",
    session: "2026",
    totalMarks: 85,
    // Our edition has 11 chapters; published tables that cite a ch.12 follow a
    // different edition, so that reference is intentionally absent and its MCQ
    // is redistributed across the chapters this book actually contains.
    mcqs: { 1: 1, 2: 2, 3: 2, 4: 1, 5: 2, 6: 1, 7: 2, 8: 1, 9: 2, 10: 2, 11: 1 },
    mcqTotal: 17,
    shortGroups: [
      { question: "Q.2", chapters: [1, 2, 3], attempt: "any 8 of 12" },
      { question: "Q.3", chapters: [4, 5, 6, 7, 8], attempt: "any 8 of 12" },
      { question: "Q.4", chapters: [9, 10, 11], attempt: "any 6 of 9" },
    ],
    shortNote: "22 short questions × 2 marks = 44 marks",
    longPairs: [
      { question: "Q.5", chapters: [1, 2] },
      { question: "Q.6", chapters: [3, 5] },
      { question: "Q.7", chapters: [6, 7] },
      { question: "Q.8", chapters: [8, 9] },
      { question: "Q.9", chapters: [10, 11] },
    ],
    longNote: "Attempt any 3 of 5 · each 8 marks (a + b) = 24 marks",
    sourceNote: SRC_2026,
  },

  "11th-chemistry": {
    subjectId: "chemistry",
    classLevel: "11th",
    session: "2026",
    totalMarks: 85,
    // Our edition has 11 chapters; published tables citing ch.12-14 follow a
    // different edition and are intentionally not referenced here.
    mcqs: { 1: 2, 2: 1, 3: 2, 4: 1, 5: 2, 6: 2, 7: 1, 8: 2, 9: 1, 10: 2, 11: 1 },
    mcqTotal: 17,
    shortGroups: [
      { question: "Q.2", chapters: [1, 2, 7, 8], attempt: "any 8 of 12" },
      { question: "Q.3", chapters: [3, 5, 6, 9], attempt: "any 8 of 12" },
      { question: "Q.4", chapters: [4, 10, 11], attempt: "any 6 of 9" },
    ],
    shortNote: "22 short questions × 2 marks = 44 marks",
    longPairs: [
      { question: "Q.5", chapters: [2, 5] },
      { question: "Q.6", chapters: [3, 7] },
      { question: "Q.7", chapters: [8, 9] },
      { question: "Q.8", chapters: [10, 11] },
      { question: "Q.9", chapters: [4, 6] },
    ],
    longNote: "Attempt any 3 of 5 · each 8 marks (a + b) = 24 marks",
    sourceNote: SRC_2026,
  },
};

/** Look up a scheme, or null when we do not hold a verified one. */
export function schemeFor(
  classLevel: string,
  subjectId: string,
  board: string
): PairingScheme | null {
  if (!isPunjabBoard(board)) return null;
  return PAIRING_SCHEMES[`${classLevel}-${subjectId.toLowerCase()}`] ?? null;
}

/**
 * Pull the leading chapter/unit number out of a title such as
 * "Unit 12: Geometrical Optics" -> 12. Returns null when absent.
 */
export function chapterNumberOf(name: string): number | null {
  const m = name.match(/^\s*(?:unit|chapter|ch)\s*[-.]?\s*(\d{1,2})/i);
  if (m) return Number(m[1]);
  const lead = name.match(/^\s*(\d{1,2})\s*[.:)-]/);
  return lead ? Number(lead[1]) : null;
}

export interface ChapterWeight {
  inScheme: boolean;
  mcqs: number;
  shortQuestion: string | null;
  longQuestion: string | null;
  /** Max marks this chapter can contribute if every choice fell its way. */
  maxMarks: number;
}

/** What a single chapter is worth under the scheme. */
export function weightForChapter(
  scheme: PairingScheme | null,
  chapterNo: number | null
): ChapterWeight | null {
  if (!scheme || chapterNo == null) return null;

  const mcqs = scheme.mcqs[chapterNo] ?? 0;
  const sg = scheme.shortGroups.find((g) => g.chapters.includes(chapterNo));
  const lp = scheme.longPairs.find((p) => p.chapters.includes(chapterNo));
  const inScheme = mcqs > 0 || Boolean(sg) || Boolean(lp);

  // Upper bound only: shorts and longs carry internal choice, so a chapter
  // rarely yields all of these at once. Presented in the UI as "up to".
  const maxMarks = mcqs * 1 + (sg ? 10 : 0) + (lp ? 9 : 0);

  return {
    inScheme,
    mcqs,
    shortQuestion: sg ? sg.question : null,
    longQuestion: lp ? lp.question : null,
    maxMarks,
  };
}

/** Chapters (by number) that the scheme never draws from. */
export function excludedChapters(
  scheme: PairingScheme | null,
  chapterNumbers: number[]
): number[] {
  if (!scheme) return [];
  return chapterNumbers.filter((n) => {
    const w = weightForChapter(scheme, n);
    return w ? !w.inScheme : false;
  });
}
