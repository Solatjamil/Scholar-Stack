import React, { useMemo, useState } from "react";
import { VIDEO_LIBRARY, VIDEO_COUNT, videosForSubject, TopicVideo } from "../videoLibrary";
import { AnimatedDiagram, diagramForTopic } from "./AnimatedDiagrams";
import BookReader from "./BookReader";
import { booksFor } from "../bookLibrary";

/**
 * LEARN HUB - topic-wise learning for 9th/10th science.
 *
 * Three views over the same verified data set:
 *  - Topics: every syllabus topic, each with an animated diagram, a Roman-Urdu
 *    explanation and its embedded lecture videos.
 *  - Videos: the whole gallery grouped by teacher, for students who prefer to
 *    follow one channel.
 *  - Textbook: the real scanned PTB/FBISE book with search and page jump.
 *
 * All video ids are oEmbed-verified (see src/videoLibrary.ts). Nothing here is
 * placeholder content.
 */

type View = "topics" | "videos" | "book";
type ClassLevel = "9th" | "10th" | "11th" | "12th";

const CLASSES: ClassLevel[] = ["9th", "10th", "11th", "12th"];

/** Subject ids shown per class, matching what the boards actually offer. */
const SUBJECTS_FOR: Record<ClassLevel, string[]> = {
  "9th": ["physics", "chemistry", "biology", "math", "cs"],
  "10th": ["physics", "chemistry", "biology", "math", "cs"],
  "11th": ["physics", "chemistry", "biology", "math", "cs"],
  "12th": ["physics", "chemistry", "biology", "math", "cs"],
};

const SUBJECT_LABEL: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  math: "Mathematics",
  cs: "Computer Science",
};

export default function LearnHub({ studentClass }: { studentClass?: string } = {}) {
  const [view, setView] = useState<View>("topics");
  // Open on the student's own class where we know it, so the hub is relevant
  // the moment it loads rather than always starting at 9th.
  const initialClass = (CLASSES as string[]).includes(studentClass || "")
    ? (studentClass as ClassLevel)
    : "9th";
  const [classLevel, setClassLevel] = useState<ClassLevel>(initialClass);
  const [subject, setSubject] = useState<string>("physics");

  const subjectsForClass = SUBJECTS_FOR[classLevel];

  // If the chosen subject is not offered for the newly picked class, fall back
  // to the first one that is, instead of rendering an empty panel.
  const activeSubject = subjectsForClass.includes(subject)
    ? subject
    : subjectsForClass[0];

  const topics = useMemo(
    () => videosForSubject(classLevel, activeSubject),
    [classLevel, activeSubject]
  );

  return (
    <div className="space-y-5">
      <header className="rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-5">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Topic-wise Learning
        </h2>
        <p className="mt-1 text-sm text-slate-300">
          Har chapter ka har topic - animated diagram, Roman Urdu explanation aur
          Pakistan ke best teachers ki video lectures, ek hi jagah.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          <Stat label="Verified videos" value={String(VIDEO_COUNT)} />
          <Stat label="Topics covered" value={String(VIDEO_LIBRARY.length)} />
          <Stat
            label="Teachers"
            value={String(
              new Set(VIDEO_LIBRARY.flatMap((t) => t.videos.map((v) => v.channel))).size
            )}
          />
        </div>
      </header>

      {/* Class + subject selectors */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl bg-slate-800 p-1">
          {CLASSES.map((c) => (
            <button
              key={c}
              onClick={() => setClassLevel(c)}
              className={`min-h-[40px] rounded-lg px-4 text-sm font-semibold transition ${
                classLevel === c ? "bg-indigo-600 text-white" : "text-slate-300"
              }`}
            >
              Class {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {subjectsForClass.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`min-h-[40px] rounded-lg px-4 text-sm font-medium transition ${
                activeSubject === s
                  ? "bg-slate-100 text-slate-900"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {SUBJECT_LABEL[s] ?? s}
            </button>
          ))}
        </div>
      </div>

      {/* View switch */}
      <div className="flex gap-2 border-b border-slate-800">
        {(
          [
            ["topics", "Topics"],
            ["videos", "Video Gallery"],
            ["book", "Textbook"],
          ] as [View, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`min-h-[44px] px-4 text-sm font-semibold transition ${
              view === id
                ? "border-b-2 border-indigo-500 text-indigo-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {label}
            {id === "book" && booksFor(classLevel, activeSubject).length === 0 && (
              <span className="ml-1.5 text-[10px] text-amber-400">!</span>
            )}
          </button>
        ))}
      </div>

      {view === "topics" && <TopicsView classLevel={classLevel} subject={activeSubject} topics={topics} />}
      {view === "videos" && <GalleryView classLevel={classLevel} subject={activeSubject} />}
      {view === "book" && <BookReader classLevel={classLevel} subject={activeSubject} />}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">
      <strong className="text-white">{value}</strong> {label}
    </span>
  );
}

function TopicsView({
  classLevel,
  subject,
  topics,
}: {
  classLevel: string;
  subject: string;
  topics: { topic: string; videos: TopicVideo[] }[];
}) {
  const [open, setOpen] = useState<string | null>(topics[0]?.topic ?? null);

  if (!topics.length) {
    return (
      <p className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
        Is subject ke topics abhi add nahi hue.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {topics.map((t, i) => {
        const isOpen = open === t.topic;
        const dia = diagramForTopic(subject, t.topic);
        return (
          <div
            key={t.topic}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"
          >
            <button
              onClick={() => setOpen(isOpen ? null : t.topic)}
              className="flex min-h-[56px] w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-800/50"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600/20 text-xs font-bold text-indigo-300">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-slate-100">{t.topic}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                  {t.videos.length} video{t.videos.length > 1 ? "s" : ""}
                </span>
                <span className={`text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}>
                  &#9662;
                </span>
              </span>
            </button>

            {isOpen && (
              <div className="space-y-4 border-t border-slate-800 px-4 py-4">
                {dia && <AnimatedDiagram type={dia} />}

                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Video lectures
                  </h4>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {t.videos.map((v) => (
                      <div key={v.id}>
                        <VideoCard video={v} />
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  Yeh sab videos asli Pakistani teachers ki hain aur {classLevel} class
                  ke syllabus ke mutabiq hain.
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Videos load only after the student taps play. Embedding 4 iframes per topic
 * eagerly would pull megabytes on a mobile data plan, so we show a lightweight
 * YouTube thumbnail first and swap in the iframe on demand.
 */
function VideoCard({ video }: { video: TopicVideo }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
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
              className="h-full w-full object-cover opacity-85 transition group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg transition group-hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-xs font-semibold leading-snug text-slate-100">
          {video.title}
        </p>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="truncate text-[11px] text-slate-400">{video.channel}</span>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-[11px] text-indigo-400 hover:underline"
          >
            YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

/** All videos for the subject, grouped by teacher. */
function GalleryView({ classLevel, subject }: { classLevel: string; subject: string }) {
  const byChannel = useMemo(() => {
    const map = new Map<string, { topic: string; video: TopicVideo }[]>();
    for (const t of videosForSubject(classLevel, subject)) {
      for (const v of t.videos) {
        if (!map.has(v.channel)) map.set(v.channel, []);
        map.get(v.channel)!.push({ topic: t.topic, video: v });
      }
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [classLevel, subject]);

  if (!byChannel.length) {
    return (
      <p className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
        Koi video nahi mili.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {byChannel.map(([channel, items]) => (
        <section key={channel}>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-100">
            {channel}
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-normal text-slate-400">
              {items.length} video{items.length > 1 ? "s" : ""}
            </span>
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ topic, video }) => (
              <div key={video.id}>
                <VideoCard video={video} />
                <p className="mt-1 px-1 text-[10px] uppercase tracking-wide text-slate-500">
                  {topic}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
