/**
 * COVERAGE AUDIT — the single source of truth for "what is still missing".
 *
 * Walks every (class, group, subject, chapter) the app can actually show a
 * student and reports which of the five resource types is empty:
 *   videos · solved exercises · glossary · textbook · topic list
 *
 * Run: npx tsx tools/audit.mjs [--json]
 * Exit code is the number of BLOCKING gaps, so it can gate a commit.
 */
import { videosForChapter, videosForSubject } from "../src/videoLibrary.ts";
import { glossaryForChapter } from "../src/glossaryData.ts";
import { problemsFor } from "../src/workedSolutions.ts";
import { booksFor } from "../src/bookLibrary.ts";
import { CHAPTER_LISTS } from "../src/syllabusData.ts";

const CYCLE = { "9th": ["9th"], "10th": ["9th", "10th"], "11th": ["11th"], "12th": ["11th", "12th"] };

/** Which syllabus keys a given class+group actually renders. */
const PROFILES = [
  { cls: "9th",  group: "Science (Biology)",  keys: ["syl-math-9-sci","syl-phy-9-sci","syl-ch-9-sci","syl-bio-9-sci","syl-eng-9-all","syl-urd-9-all","syl-isl-9-all"] },
  { cls: "9th",  group: "Computer Science",   keys: ["syl-math-9-sci","syl-phy-9-sci","syl-ch-9-sci","syl-cs-9","syl-eng-9-all","syl-urd-9-all","syl-isl-9-all"] },
  { cls: "9th",  group: "Arts",               keys: ["syl-math-9-art","syl-gsci-9-art","syl-eng-9-all","syl-urd-9-all","syl-isl-9-all"] },
  { cls: "10th", group: "Science (Biology)",  keys: ["syl-math-10-sci","syl-phy-10-sci","syl-ch-10-sci","syl-bio-10-sci","syl-eng-10-all","syl-urd-10-all","syl-isl-10-all"] },
  { cls: "10th", group: "Computer Science",   keys: ["syl-math-10-sci","syl-phy-10-sci","syl-ch-10-sci","syl-cs-10","syl-eng-10-all","syl-urd-10-all","syl-isl-10-all"] },
  { cls: "10th", group: "Arts",               keys: ["syl-math-10-art","syl-gsci-10-art","syl-eng-10-all","syl-urd-10-all","syl-isl-10-all"] },
  { cls: "11th", group: "Pre-Medical",        keys: ["syl-phy-11-fsc","syl-ch-11-fsc","syl-bio-11-fsc","syl-eng-11-all","syl-urd-11-all","syl-isl-11-all"] },
  { cls: "11th", group: "Pre-Engineering",    keys: ["syl-math-11-fsc","syl-phy-11-fsc","syl-ch-11-fsc","syl-eng-11-all","syl-urd-11-all","syl-isl-11-all"] },
  { cls: "11th", group: "ICS",                keys: ["syl-math-11-fsc","syl-phy-11-fsc","syl-cs-11","syl-eng-11-all","syl-urd-11-all","syl-isl-11-all"] },
  { cls: "11th", group: "ICom",               keys: ["syl-math-11-comm","syl-comm-11","syl-acc-11","syl-eco-11","syl-eng-11-all","syl-urd-11-all","syl-isl-11-all"] },
  { cls: "12th", group: "Pre-Medical",        keys: ["syl-phy-12-fsc","syl-ch-12-fsc","syl-bio-12-fsc","syl-eng-12-all","syl-urd-12-all","syl-isl-12-all"] },
  { cls: "12th", group: "Pre-Engineering",    keys: ["syl-math-12-fsc","syl-phy-12-fsc","syl-ch-12-fsc","syl-eng-12-all","syl-urd-12-all","syl-isl-12-all"] },
  { cls: "12th", group: "ICS",                keys: ["syl-math-12-fsc","syl-phy-12-fsc","syl-cs-12-fsc","syl-eng-12-all","syl-urd-12-all","syl-isl-12-all"] },
  { cls: "12th", group: "ICom",               keys: ["syl-math-12-comm","syl-comm-12","syl-acc-12","syl-bank-12","syl-eng-12-all","syl-urd-12-all","syl-isl-12-all"] },
];

/** Map a syllabus key to the subjectId used by the content modules. */
function subjectOf(key) {
  if (key.includes("-math-") ) return "math";
  if (key.includes("-phy-")) return "physics";
  if (key.includes("-ch-")) return "chemistry";
  if (key.includes("-bio-")) return "biology";
  if (key.includes("-cs-") || key === "syl-cs-9" || key === "syl-cs-10" || key === "syl-cs-11") return "cs";
  if (key.includes("-eng-")) return "english";
  if (key.includes("-urd-")) return "urdu";
  if (key.includes("-isl-")) return "islam";
  if (key.includes("-gsci-")) return "gsci";
  if (key.startsWith("syl-acc")) return "accounting";
  if (key.startsWith("syl-comm")) return "commerce";
  if (key.startsWith("syl-eco")) return "economics";
  if (key.startsWith("syl-bank")) return "banking";
  return "unknown";
}

/** Subjects where a given resource is genuinely expected. */
const WANT_VIDEO   = new Set(["physics","chemistry","biology","math","cs","accounting","commerce","economics","banking"]);
const WANT_SOLVED  = new Set(["physics","chemistry","math","accounting"]);
const WANT_GLOSS   = new Set(["physics","chemistry","math","cs","biology","accounting","commerce","economics","banking"]);
const WANT_BOOK    = new Set(["physics","chemistry","biology","math","cs"]);

const rows = [];
const missingKeys = [];

for (const prof of PROFILES) {
  for (const key of prof.keys) {
    const chapters = CHAPTER_LISTS[key];
    if (!chapters) { missingKeys.push(`${prof.cls}/${prof.group}: ${key}`); continue; }
    const subj = subjectOf(key);
    for (const ch of chapters) {
      const clean = ch.replace(/^(unit|chapter|book)\s*[ivx\d\-–,\s]*:?\s*/i, "").replace(/\([^)]*\)/g, "").trim();
      const vids = WANT_VIDEO.has(subj) ? videosForChapter(prof.cls, subj, clean).length : -1;
      const gl = WANT_GLOSS.has(subj) ? glossaryForChapter(subj, clean) : null;
      const glN = gl ? (gl.matched ? gl.groups.reduce((n,g)=>n+g.terms.length,0) : 0) : -1;
      let solvedN = -1;
      if (WANT_SOLVED.has(subj)) {
        const cls = CYCLE[prof.cls] ? prof.cls : "10th";
        const pool = problemsFor(cls, subj);
        const t = clean.toLowerCase();
        const words = t.split(/[^a-z]+/).filter(w=>w.length>3);
        solvedN = pool.filter(p=>{
          const hay=p.chapter.toLowerCase();
          return hay.includes(t)||t.includes(hay)||words.some(w=>hay.includes(w));
        }).length;
      }
      rows.push({ cls: prof.cls, group: prof.group, key, subj, chapter: clean, vids, solvedN, glN });
    }
  }
}

const bookGaps = [];
for (const cls of ["9th","10th","11th","12th"]) {
  for (const s of WANT_BOOK) {
    if (booksFor(cls, s).length === 0) bookGaps.push(`${cls} ${s}`);
  }
}

const noVid    = rows.filter(r => r.vids === 0);
const noGloss  = rows.filter(r => r.glN === 0);
const noSolved = rows.filter(r => r.solvedN === 0);

const uniq = a => [...new Set(a)];
const report = {
  totalChapterRows: rows.length,
  missingSyllabusKeys: uniq(missingKeys),
  chaptersWithNoVideo: noVid.length,
  chaptersWithNoGlossary: noGloss.length,
  chaptersWithNoSolved: noSolved.length,
  bookGaps,
  noVideoSample:  uniq(noVid.map(r=>`${r.cls} ${r.subj}: ${r.chapter}`)).slice(0,400),
  noGlossSample:  uniq(noGloss.map(r=>`${r.cls} ${r.subj}: ${r.chapter}`)).slice(0,400),
  noSolvedSample: uniq(noSolved.map(r=>`${r.cls} ${r.subj}: ${r.chapter}`)).slice(0,400),
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 1));
} else {
  console.log("=== COVERAGE AUDIT ===");
  console.log("chapter rows audited :", report.totalChapterRows);
  console.log("MISSING syllabus keys:", report.missingSyllabusKeys.length);
  report.missingSyllabusKeys.forEach(k=>console.log("   !!", k));
  console.log("chapters w/o video   :", report.chaptersWithNoVideo);
  console.log("chapters w/o glossary:", report.chaptersWithNoGlossary);
  console.log("chapters w/o solved  :", report.chaptersWithNoSolved);
  console.log("book gaps            :", bookGaps.length, bookGaps.join(", "));
}
const blocking = report.missingSyllabusKeys.length;
process.exit(Math.min(blocking, 250));
