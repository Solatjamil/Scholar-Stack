import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  ClipboardList,
  MoreHorizontal,
  PlayCircle,
} from "lucide-react";

export type TabId =
  | "dashboard"
  | "syllabus"
  | "resources"
  | "mockups"
  | "evaluation"
  | "chapterstudy"
  | "boardexams"
  | "learn";

interface Props {
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
  onMore: () => void;
}

/**
 * Native-style bottom tab bar, shown only on small viewports.
 *
 * Phones cannot fit the 7-item desktop nav, so the five highest-traffic
 * destinations live here and the rest go in the "More" sheet. Every target
 * is >=56px tall and the bar respects the iOS/Android home-indicator inset
 * via env(safe-area-inset-bottom).
 */
export default function MobileTabBar({ activeTab, setActiveTab, onMore }: Props) {
  const items: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Home", icon: <LayoutDashboard size={19} /> },
    { id: "chapterstudy", label: "Study", icon: <BookOpen size={19} /> },
    { id: "learn", label: "Learn", icon: <PlayCircle size={19} /> },
    { id: "boardexams", label: "Papers", icon: <FileText size={19} /> },
  ];

  const moreActive = ["syllabus", "resources", "evaluation"].includes(activeTab);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Primary"
    >
      <div className="flex items-stretch justify-around">
        {items.map((it) => {
          const active = activeTab === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setActiveTab(it.id)}
              aria-current={active ? "page" : undefined}
              className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] transition-colors active:bg-slate-100 ${
                active ? "text-indigo-600" : "text-slate-400"
              }`}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-indigo-600 rounded-full" />
              )}
              <span className={active ? "scale-110 transition-transform" : "transition-transform"}>
                {it.icon}
              </span>
              <span className={`text-[10px] leading-none ${active ? "font-bold" : "font-medium"}`}>
                {it.label}
              </span>
            </button>
          );
        })}

        <button
          onClick={onMore}
          className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] transition-colors active:bg-slate-100 ${
            moreActive ? "text-indigo-600" : "text-slate-400"
          }`}
          aria-haspopup="dialog"
        >
          {moreActive && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-indigo-600 rounded-full" />
          )}
          <MoreHorizontal size={19} />
          <span className={`text-[10px] leading-none ${moreActive ? "font-bold" : "font-medium"}`}>
            More
          </span>
        </button>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  "More" bottom sheet                                                */
/* ------------------------------------------------------------------ */
interface SheetProps {
  open: boolean;
  onClose: () => void;
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
}

export function MobileMoreSheet({ open, onClose, activeTab, setActiveTab }: SheetProps) {
  if (!open) return null;

  const rest: { id: TabId; label: string; desc: string }[] = [
    { id: "mockups", label: "Mockup Exams", desc: "Practice tests in the real board pattern" },
    { id: "syllabus", label: "Syllabus Tracker", desc: "Chapter completion across all subjects" },
    { id: "evaluation", label: "Student Evaluation", desc: "Your scores and progress reports" },
    { id: "resources", label: "Books & Resources", desc: "Verified textbook downloads" },
  ];

  return (
    <div className="lg:hidden fixed inset-0 z-[60] flex items-end" role="dialog" aria-modal="true">
      <button
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close menu"
      />
      <div
        className="relative w-full bg-white rounded-t-2xl border-t border-slate-200 p-4 pb-6 animate-in slide-in-from-bottom duration-200"
        style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />
        <h3 className="text-sm font-bold text-slate-900 mb-3 px-1">More</h3>
        <div className="space-y-1.5">
          {rest.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setActiveTab(r.id);
                onClose();
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-colors min-h-[60px] ${
                activeTab === r.id
                  ? "border-indigo-300 bg-indigo-50"
                  : "border-slate-200 bg-white active:bg-slate-50"
              }`}
            >
              <p className="text-[13px] font-bold text-slate-800">{r.label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{r.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
