/**
 * Board-accurate grade calculation.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * MockupSection.tsx graded mock papers on an invented scale:
 *   A+ >= 90, A >= 80, B >= 70, C >= 60, D >= 50, E >= 40, F below.
 *
 * That is one full band stricter than every Pakistani provincial board. A
 * student scoring 82% was shown "A" when BISE Lahore would award "A+", and a
 * student on 35% was shown "F" — a fail — when 33-39% is a pass at grade E on
 * provincial boards. Since the whole point of the mock papers is to predict
 * the real result, an inaccurate scale defeats the feature.
 *
 * Two scales are genuinely in use and the app lets students pick either:
 *
 *   Provincial BISE (Punjab, Sindh, KPK, Balochistan, AJK)
 *     A+ 80-100 | A 70-79 | B 60-69 | C 50-59 | D 40-49 | E 33-39 | F <33
 *     Minimum pass: 33%.
 *     Sources: bisesahiwal.edu.pk/grading.php, bisegrw.edu.pk/grading.html,
 *     ilmstan.com BISE Lahore criteria — all agree.
 *
 *   FBISE (Federal Board, Islamabad)
 *     A+ 90-100 | A 80-89 | B 70-79 | C 60-69 | D 50-59 | E 40-49 | F <40
 *     Minimum pass: 40%.
 *     FBISE deliberately uses a stricter scale and a 40% pass mark.
 *
 * Note: Punjab announced a revised numeric/CGPA scheme (A++ 95-100 etc.) from
 * 2024, but boards have not applied it uniformly and result cards students
 * receive still widely use the table above, so that remains the default.
 */

export type GradeScale = "provincial" | "fbise";

export interface GradeBand {
  grade: string;
  min: number;
  meaning: string;
}

/** Provincial BISE scale — pass mark 33%. */
export const PROVINCIAL_BANDS: GradeBand[] = [
  { grade: "A+", min: 80, meaning: "Outstanding" },
  { grade: "A", min: 70, meaning: "Excellent" },
  { grade: "B", min: 60, meaning: "Very Good" },
  { grade: "C", min: 50, meaning: "Good" },
  { grade: "D", min: 40, meaning: "Fair" },
  { grade: "E", min: 33, meaning: "Satisfactory (minimum pass)" },
  { grade: "F", min: 0, meaning: "Fail" },
];

/** FBISE scale — pass mark 40%. */
export const FBISE_BANDS: GradeBand[] = [
  { grade: "A+", min: 90, meaning: "Exceptional" },
  { grade: "A", min: 80, meaning: "Outstanding" },
  { grade: "B", min: 70, meaning: "Excellent" },
  { grade: "C", min: 60, meaning: "Good" },
  { grade: "D", min: 50, meaning: "Satisfactory" },
  { grade: "E", min: 40, meaning: "Minimum pass" },
  { grade: "F", min: 0, meaning: "Fail" },
];

/** Which scale a board name uses. Anything federal maps to the FBISE table. */
export function scaleForBoard(boardName: string | undefined): GradeScale {
  const b = (boardName || "").toLowerCase();
  if (b.includes("fbise") || b.includes("federal")) return "fbise";
  return "provincial";
}

export function bandsForBoard(boardName: string | undefined): GradeBand[] {
  return scaleForBoard(boardName) === "fbise" ? FBISE_BANDS : PROVINCIAL_BANDS;
}

/** Minimum percentage needed to pass on this board. */
export function passMarkForBoard(boardName: string | undefined): number {
  return scaleForBoard(boardName) === "fbise" ? 40 : 33;
}

/** Grade letter for a percentage on the given board's scale. */
export function gradeFor(percentage: number, boardName?: string): string {
  const pct = Math.max(0, Math.min(100, percentage));
  const band = bandsForBoard(boardName).find((b) => pct >= b.min);
  return band ? band.grade : "F";
}

/** Grade letter plus its official descriptor, e.g. "A+ (Outstanding)". */
export function gradeWithMeaning(percentage: number, boardName?: string): string {
  const pct = Math.max(0, Math.min(100, percentage));
  const band = bandsForBoard(boardName).find((b) => pct >= b.min);
  return band ? `${band.grade} (${band.meaning})` : "F (Fail)";
}

export function hasPassed(percentage: number, boardName?: string): boolean {
  return percentage >= passMarkForBoard(boardName);
}

/** Percentage points still needed to reach the next grade band, or null at the top. */
export function marksToNextGrade(
  percentage: number,
  boardName?: string
): { nextGrade: string; pointsNeeded: number } | null {
  const pct = Math.max(0, Math.min(100, percentage));
  const bands = bandsForBoard(boardName);
  const higher = [...bands].reverse().find((b) => b.min > pct);
  if (!higher) return null;
  return { nextGrade: higher.grade, pointsNeeded: Math.ceil(higher.min - pct) };
}

/** Human-readable label for the scale in use, for display next to a grade. */
export function scaleLabel(boardName?: string): string {
  return scaleForBoard(boardName) === "fbise"
    ? "FBISE scale (pass 40%)"
    : "BISE scale (pass 33%)";
}
