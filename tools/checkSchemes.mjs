/**
 * Pairing-scheme integrity check.
 *
 * A wrong pairing scheme is worse than none: a student may skip a chapter that
 * is actually examinable. This asserts two invariants before anything ships:
 *
 *   1. each MCQ table sums to its declared mcqTotal;
 *   2. every chapter the scheme references actually exists in the syllabus we
 *      ship, so we never point a student at a chapter their book lacks.
 *
 * Run: npx tsx tools/checkSchemes.mjs
 */
import { PAIRING_SCHEMES, chapterNumberOf } from "../src/pairingScheme.ts";
import { CHAPTER_LISTS } from "../src/syllabusData.ts";

const SYLLABUS_KEY = {
  "9th-physics": "syl-phy-9-sci",
  "9th-chemistry": "syl-ch-9-sci",
  "9th-biology": "syl-bio-9-sci",
  "10th-physics": "syl-phy-10-sci",
  "10th-biology": "syl-bio-10-sci",
  "10th-math": "syl-math-10-sci",
  "11th-physics": "syl-phy-11-fsc",
  "11th-chemistry": "syl-ch-11-fsc",
};

let failures = 0;

for (const [key, scheme] of Object.entries(PAIRING_SCHEMES)) {
  const sum = Object.values(scheme.mcqs).reduce((a, b) => a + b, 0);
  if (sum !== scheme.mcqTotal) {
    console.log(`FAIL ${key}: MCQs sum to ${sum} but mcqTotal says ${scheme.mcqTotal}`);
    failures++;
  }

  const listKey = SYLLABUS_KEY[key];
  if (!listKey) {
    console.log(`FAIL ${key}: no syllabus mapping in checkSchemes.mjs`);
    failures++;
    continue;
  }
  const list = CHAPTER_LISTS[listKey];
  if (!list) {
    console.log(`FAIL ${key}: syllabus key ${listKey} not found`);
    failures++;
    continue;
  }

  const have = new Set(list.map(chapterNumberOf).filter((n) => n != null));
  const referenced = new Set();
  Object.keys(scheme.mcqs).forEach((n) => referenced.add(Number(n)));
  scheme.shortGroups.forEach((g) => g.chapters.forEach((c) => referenced.add(c)));
  scheme.longPairs.forEach((p) => p.chapters.forEach((c) => referenced.add(c)));

  const ghosts = [...referenced].filter((c) => !have.has(c));
  if (ghosts.length) {
    console.log(`FAIL ${key}: references chapters not in the syllabus: ${ghosts.join(", ")}`);
    failures++;
  } else {
    console.log(`ok   ${key.padEnd(14)} ${sum}/${scheme.mcqTotal} MCQs · ${list.length} chapters`);
  }
}

console.log(failures ? `\n${failures} FAILURE(S)` : `\nAll ${Object.keys(PAIRING_SCHEMES).length} schemes valid.`);
process.exit(failures ? 1 : 0);
