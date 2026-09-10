/**
 * Deep content audit: MCQs, short questions, long questions and topics.
 *
 * The original audit.mjs checks videos/glossary/solved/books. It does NOT
 * check the four things a student actually sees first inside Chapter Study.
 *
 * Crucially this distinguishes:
 *   HIT      - the bank holds questions matching THIS chapter
 *   FALLBACK - no chapter match, so the UI shows generic subject-wide questions
 * A fallback is not a crash, but it means the student gets material that is not
 * really about their chapter, which is the kind of gap a green audit hides.
 */
import { CHAPTER_LISTS } from "../src/syllabusData.ts";
import { EXAM_BANK } from "../src/examBank.ts";
import { QUESTION_BANK } from "../src/questionBank.ts";
import { EXTRA_MCQS, EXTRA_SHORTS, EXTRA_LONGS, EXTRA_NUMERICALS } from "../src/bankSupplement.ts";
import { lookupTopics } from "../src/topicData.ts";

const KEY_SUBJECT = {
  "syl-phy": "physics", "syl-ch": "chemistry", "syl-bio": "biology",
  "syl-math": "math", "syl-cs": "cs", "syl-acc": "accounting",
  "syl-comm": "commerce", "syl-eco": "economics", "syl-bank": "banking",
  "syl-eng": "english", "syl-urd": "urdu", "syl-isl": "islamiat",
  "syl-gsci": "gsci",
};
function subjectOf(key) {
  const hit = Object.keys(KEY_SUBJECT).sort((a,b)=>b.length-a.length).find(p => key.startsWith(p));
  return hit ? KEY_SUBJECT[hit] : null;
}
function classOf(key) {
  const m = key.match(/-(9|10|11|12)\b/);
  return m ? m[1] + "th" : "?";
}
const clean = (n) => n.replace(/^(unit|chapter|ch)\s*[\divx\-\s]*:?\s*/i, "").trim();

const STOP = new Set(["and","the","of","to","in","its","with","a","an","for","or"]);
function matchesChapter(item, chapterName) {
  const words = clean(chapterName).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 3 && !STOP.has(w));
  if (!words.length) return false;
  const hay = `${item.topic ?? ""} ${item.question ?? ""}`.toLowerCase();
  return words.some(w => hay.includes(w));
}

// Only subjects whose question banks we intend to populate.
const WANT = new Set(["physics","chemistry","biology","math","cs"]);

const rows = [];
for (const [key, chapters] of Object.entries(CHAPTER_LISTS)) {
  const subj = subjectOf(key);
  if (!subj || !WANT.has(subj)) continue;
  const cls = classOf(key);
  const bankKey = subj === "mathematics" ? "math" : subj;
  const eb = EXAM_BANK[bankKey];
  const qb = QUESTION_BANK[bankKey];

  for (const chapter of chapters) {
    const mcqPool = [
      ...(eb ? eb.mcqs : []), ...(qb ? qb.mcqs : []), ...(EXTRA_MCQS[bankKey] ?? []),
    ];
    const shortPool = [
      ...(eb ? eb.shorts : []), ...(qb ? qb.shorts : []), ...(EXTRA_SHORTS[bankKey] ?? []),
    ];
    const longPool = [...(eb ? eb.longs : []), ...(qb ? qb.longs : []), ...(EXTRA_LONGS[bankKey] ?? [])];
    const numPool = [...(eb ? eb.numericals : []), ...(EXTRA_NUMERICALS[bankKey] ?? [])];

    const mcqHit = mcqPool.filter(q => matchesChapter(q, chapter)).length;
    const shortHit = shortPool.filter(q => matchesChapter(q, chapter)).length;
    const longHit = longPool.filter(q => matchesChapter(q, chapter)).length;
    const numHit = numPool.filter(q => matchesChapter(q, chapter)).length;
    const topics = lookupTopics(subj, clean(chapter));

    rows.push({
      cls, subj, chapter: clean(chapter),
      mcqHit, shortHit, longHit, numHit,
      topics: topics ? topics.length : 0,
      poolEmpty: mcqPool.length === 0 && shortPool.length === 0,
    });
  }
}

const noMcq = rows.filter(r => r.mcqHit === 0);
const noShort = rows.filter(r => r.shortHit === 0);
const noLong = rows.filter(r => r.longHit === 0);
const noTopics = rows.filter(r => r.topics === 0);

const label = (r) => `${r.cls} ${r.subj}: ${r.chapter}`;
const uniq = (a) => [...new Set(a)];

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({
    total: rows.length,
    noChapterMcq: noMcq.length, noChapterShort: noShort.length,
    noChapterLong: noLong.length, noTopics: noTopics.length,
    noMcqSample: uniq(noMcq.map(label)),
    noShortSample: uniq(noShort.map(label)),
    noLongSample: uniq(noLong.map(label)),
    noTopicsSample: uniq(noTopics.map(label)),
  }, null, 2));
} else {
  console.log("=== DEEP CONTENT AUDIT (chapter-specific matches) ===");
  console.log("chapters audited            :", rows.length);
  console.log("no chapter-specific MCQ     :", noMcq.length);
  console.log("no chapter-specific SHORT   :", noShort.length);
  console.log("no chapter-specific LONG    :", noLong.length);
  console.log("no TOPICS breakdown         :", noTopics.length);
}
