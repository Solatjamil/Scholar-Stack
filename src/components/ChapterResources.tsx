import React, { useMemo, useState } from "react";
import { videosForChapter, TopicVideo } from "../videoLibrary";
import { problemsFor, WorkedProblem, WorkedClass, WorkedSubject } from "../workedSolutions";
import { glossaryForChapter, GlossaryTerm, toGlossarySubject } from "../glossaryData";
import { AnimatedDiagram, diagramForTopic } from "./AnimatedDiagrams";

/**
 * CHAPTER RESOURCES - the per-chapter desk inside Chapter Study.
 *
 * Brings together, for the chapter the student has actually selected:
 *   - the animated diagram for that topic
 *   - verified video lectures (thumbnail first, iframe only on tap)
 *   - solved exercise questions in board format
 *   - glossary / definitions / side notes
 *
 * DESIGN RULE: every panel states plainly when it has nothing for the chosen
 * chapter instead of rendering an empty box or, worse, unrelated filler. The
 * video library covers 9th/10th science only, and worked solutions cover
 * physics/chemistry/maths, so those gaps are real and are labelled as such.
 */

type Panel = "videos" | "solved" | "glossary";

/** Map the app's subject id onto the video library's subject naming. */
function toVideoSubject(subjectId: string): string | null {
  const s = subjectId.toLowerCase();
  if (s.includes("physic")) return "physics";
  if (s.includes("chem")) return "chemistry";
  if (s.includes("bio")) return "biology";
  return null;
}

function toWorkedSubject(subjectId: string): WorkedSubject | null {
  const s = subjectId.toLowerCase();
  if (s.includes("physic")) return "physics";
  if (s.includes("chem")) return "chemistry";
  if (s.includes("math")) return "math";
  if (s.includes("bio")) return "biology";
  return null;
}

/** Strip "Unit 3:" / bracketed detail so chapter names compare cleanly. */
export function cleanChapter(name: string): string {
  return name
    .replace(/^(unit|chapter|ch)\s*[\divx\-\s]*:?\s*/i, "")
    .replace(/\([^)]*\)/g, "")
    .trim();
}

/**
 * Worked problems whose chapter overlaps the selected chapter. Matching is by
 * significant-word overlap rather than exact title, because chapter names
 * differ between board editions.
 */
function solvedForChapter(
  classLevel: string,
  subjectId: string,
  chapterName: string
): WorkedProblem[] {
  const subject = toWorkedSubject(subjectId);
  if (!subject) return [];
  const cls = (["9th", "10th", "11th", "12th"] as WorkedClass[]).includes(
    classLevel as WorkedClass
  )
    ? (classLevel as WorkedClass)
    : "10th";

  const target = cleanChapter(chapterName).toLowerCase();
  if (!target) return [];
  const stop = new Set(["and", "of", "the", "in", "to", "its", "with", "for", "a"]);
  const words = target.split(/[^a-z]+/).filter((w) => w.length > 3 && !stop.has(w));

  return problemsFor(cls, subject).filter((p) => {
    const hay = p.chapter.toLowerCase();
    if (hay.includes(target) || target.includes(hay)) return true;
    return words.some((w) => hay.includes(w));
  });
}

export default function ChapterResources({
  classLevel,
  subjectId,
  chapterName,
}: {
  classLevel: string;
  subjectId: string;
  chapterName: string;
}) {
  const [panel, setPanel] = useState<Panel>("videos");

  const videoSubject = toVideoSubject(subjectId);
  const videos = useMemo(
    () => (videoSubject ? videosForChapter(classLevel, videoSubject, chapterName) : []),
    [classLevel, videoSubject, chapterName]
  );
  const solved = useMemo(
    () => solvedForChapter(classLevel, subjectId, chapterName),
    [classLevel, subjectId, chapterName]
  );
  const glossary = useMemo(
    () => glossaryForChapter(subjectId, chapterName),
    [subjectId, chapterName]
  );
  const glossaryCount = glossary.groups.reduce((n, g) => n + g.terms.length, 0);

  const diagram = useMemo(() => {
    const vs = toVideoSubject(subjectId);
    return vs ? diagramForTopic(vs, cleanChapter(chapterName)) : null;
  }, [subjectId, chapterName]);

  const tabs: { id: Panel; label: string; count: number }[] = [
    { id: "videos", label: "Video Lectures", count: videos.length },
    { id: "solved", label: "Solved Exercises", count: solved.length },
    { id: "glossary", label: "Glossary & Definitions", count: glossaryCount },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-4">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
          Chapter Resources
        </span>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
          Is chapter ke liye videos, hal shuda exercises aur definitions — sab yahin.
        </p>
      </div>

      {/* Animated diagram for the chapter's topic */}
      {diagram && (
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Visual Concept
          </p>
          <AnimatedDiagram type={diagram} />
        </div>
      )}

      {/* Panel switcher */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setPanel(t.id)}
            className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              panel === t.id
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>{t.label}</span>
            <span
              className={`px-1.5 rounded-full text-[10px] ${
                panel === t.id ? "bg-white/20" : "bg-slate-200 text-slate-600"
              }`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {panel === "videos" && (
        <VideosPanel videos={videos} subjectId={subjectId} classLevel={classLevel} />
      )}
      {panel === "solved" && <SolvedPanel problems={solved} subjectId={subjectId} />}
      {panel === "glossary" && (
        <GlossaryPanel
          groups={glossary.groups}
          matched={glossary.matched}
          subjectId={subjectId}
        />
      )}
    </div>
  );
}

/* ------------------------------- VIDEOS ------------------------------- */

function VideosPanel({
  videos,
  subjectId,
  classLevel,
}: {
  videos: TopicVideo[];
  subjectId: string;
  classLevel: string;
}) {
  if (!videos.length) {
    const isScience = toVideoSubject(subjectId);
    return (
      <EmptyNote>
        {isScience
          ? `Is chapter ke liye verified video lectures abhi nahi hain. Hamari video library filhal 9th aur 10th ke science subjects (Physics, Chemistry, Biology) ko cover karti hai — har video oEmbed se verify ki gayi hai, is liye hum ghair-tasdeeq shuda link nahi dikhate.`
          : `Video lectures filhal sirf 9th/10th ke Physics, Chemistry aur Biology ke liye mojood hain. Is subject ke liye "Learn & Videos" tab dekhein.`}
      </EmptyNote>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {videos.map((v) => (
        <div key={v.id}>
          <VideoCard video={v} />
        </div>
      ))}
    </div>
  );
}

/**
 * Thumbnail first, iframe only after the student taps play — mounting several
 * YouTube iframes at once would pull megabytes on a mobile data plan.
 */
function VideoCard({ video }: { video: TopicVideo }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play ${video.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 shadow-lg transition group-hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="bg-white p-2.5">
        <p className="line-clamp-2 text-[11px] font-bold leading-snug text-slate-800">
          {video.title}
        </p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="truncate text-[10px] text-slate-500">{video.channel}</span>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[10px] font-bold text-indigo-600 hover:underline"
          >
            YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- SOLVED EXERCISES --------------------------- */

function SolvedPanel({
  problems,
  subjectId,
}: {
  problems: WorkedProblem[];
  subjectId: string;
}) {
  const [open, setOpen] = useState<string | null>(problems[0]?.id ?? null);

  if (!problems.length) {
    return (
      <EmptyNote>
        Is chapter ki solved exercises abhi tayyar nahi huin. &ldquo;Numericals&rdquo;
        tab par Step-by-Step Solver se apne numbers daal kar khud hal nikaal sakte
        hain — woh kisi bhi sawal par kaam karta hai.
      </EmptyNote>
    );
  }

  return (
    <div className="space-y-2.5">
      {problems.map((p, i) => {
        const isOpen = open === p.id;
        const isTheorem = p.kind === "theorem";
        return (
          <div key={p.id} className="rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : p.id)}
              className="w-full min-h-[52px] flex items-start justify-between gap-3 px-3 py-2.5 text-left hover:bg-slate-50"
            >
              <span className="flex gap-2.5">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold ${
                    isTheorem
                      ? "bg-violet-100 text-violet-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs font-semibold leading-snug text-slate-800">
                  {p.question}
                </span>
              </span>
              <span
                className={`shrink-0 text-slate-400 text-xs transition ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                &#9662;
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-slate-100 bg-slate-50/60 px-3 py-3 space-y-3">
                <p className="rounded-lg bg-white px-2.5 py-2 text-[11px] italic leading-relaxed text-slate-600 border border-slate-100">
                  {p.romanUrdu}
                </p>

                {p.given && <Block title="Given Data" rows={p.given} />}
                {p.toProve && (
                  <Block title="To Prove" rows={[{ label: "", value: p.toProve }]} />
                )}
                {p.construction && (
                  <Block title="Construction" rows={[{ label: "", value: p.construction }]} />
                )}
                {p.formula && (
                  <Block title="Formula" rows={[{ label: "", value: p.formula }]} />
                )}
                <Block
                  title={isTheorem ? "Proof" : "Solution"}
                  rows={p.steps.map((s, n) => ({
                    label: `${n + 1}. ${s.label}`,
                    value: s.value,
                  }))}
                />

                <div
                  className={`rounded-lg border-2 p-2.5 ${
                    isTheorem
                      ? "border-violet-300 bg-violet-50"
                      : "border-emerald-300 bg-emerald-50"
                  }`}
                >
                  <p
                    className={`text-[9px] font-bold uppercase tracking-wider ${
                      isTheorem ? "text-violet-700" : "text-emerald-700"
                    }`}
                  >
                    {isTheorem ? "Conclusion" : "Final Answer"}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900">{p.answer}</p>
                </div>

                {p.examTip && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-amber-700">
                      Exam Tip
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-amber-900">
                      {p.examTip}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Block({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div>
      <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <div className="space-y-1">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex flex-wrap items-baseline gap-x-2 rounded bg-white px-2.5 py-1.5 border border-slate-100"
          >
            {r.label && (
              <span className="text-[10px] font-semibold text-slate-500">{r.label}</span>
            )}
            <span className="font-mono text-[11px] text-slate-800">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ GLOSSARY ------------------------------ */

function GlossaryPanel({
  groups,
  matched,
  subjectId,
}: {
  groups: { chapterLabel: string; terms: GlossaryTerm[] }[];
  matched: boolean;
  subjectId: string;
}) {
  if (!groups.length) {
    return (
      <EmptyNote>
        Glossary filhal Physics, Chemistry, Mathematics aur Computer Science ke liye
        tayyar hai — kyunke inhi subjects mein &ldquo;Define X&rdquo; wale short
        questions sab se zyada aate hain.
      </EmptyNote>
    );
  }
  return (
    <div className="space-y-4">
      {!matched && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-900">
          Is chapter ke liye alag se terms map nahi huin, is liye neeche is subject ki
          poori glossary di gayi hai.
        </p>
      )}
      {groups.map((g) => (
        <div key={g.chapterLabel}>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
            {g.chapterLabel}
          </p>
          <div className="space-y-2">
            {g.terms.map((t) => (
              <div
                key={t.term}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h5 className="text-xs font-extrabold text-slate-900">{t.term}</h5>
                  {t.unit && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                      {t.unit}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-700">
                  {t.definition}
                </p>
                <p className="mt-1 text-[11px] italic leading-relaxed text-indigo-800">
                  {t.romanUrdu}
                </p>
                {t.formula && (
                  <p className="mt-1.5 rounded bg-white px-2 py-1 font-mono text-[11px] text-emerald-700 border border-slate-100">
                    {t.formula}
                  </p>
                )}
                {t.sideNote && (
                  <p className="mt-1.5 rounded bg-amber-50 border border-amber-200 px-2 py-1 text-[10px] leading-relaxed text-amber-900">
                    <strong className="font-bold">Side note: </strong>
                    {t.sideNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-[11px] leading-relaxed text-slate-600">
      {children}
    </p>
  );
}
