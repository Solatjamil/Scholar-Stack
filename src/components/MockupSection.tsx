import { gradeFor, gradeWithMeaning, hasPassed, scaleLabel } from "../grading";
import React, { useState, useEffect, useMemo } from "react";
import { 
  generateBoardPaper, 
  BoardPaper, 
  MCQ, 
  WrittenQuestion, 
  LongQuestionGroup 
} from "../mockUpService";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  HelpCircle, 
  RotateCcw, 
  BookOpen, 
  Award, 
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  Sliders,
  AlertCircle
} from "lucide-react";

interface MockupSectionProps {
  currentClass: string;
  currentBoard: string;
  subjects: { id: string; name: string; color: string; textColor: string; bgLight: string }[];
  onAddEvaluationRecord?: (record: any) => void;
  syllabusList?: any[];
  studentGroup?: string;
}

export default function MockupSection({ 
  currentClass, 
  currentBoard, 
  subjects,
  onAddEvaluationRecord,
  syllabusList,
  studentGroup
}: MockupSectionProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]?.id || "physics");
  const [examYear, setExamYear] = useState<string>("2026");
  const [paper, setPaper] = useState<BoardPaper | null>(null);
  const [examScope, setExamScope] = useState<"full" | "chapter">("full");
  const [selectedChapterId, setSelectedChapterId] = useState<string>("all");

  // Fetch available chapters from the select subject's syllabus
  const availableChapters = useMemo(() => {
    if (!syllabusList) return [];
    const items = syllabusList.filter(item => item.subjectId === selectedSubject);
    if (items.length === 0) return [];
    
    const chapters: { id: string; name: string }[] = [];
    items.forEach(item => {
      if (item.chapters) {
        chapters.push(...item.chapters);
      }
    });
    return chapters;
  }, [syllabusList, selectedSubject]);
  
  // MCQ inputs
  const [selectedMCQAnswers, setSelectedMCQAnswers] = useState<Record<string, number>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState<boolean>(false);
  const [mcqScore, setMcqScore] = useState<number>(0);

  // Self Grading state
  const [selfGrades, setSelfGrades] = useState<Record<string, number>>({});
  const [expandedModelAnswers, setExpandedModelAnswers] = useState<Record<string, boolean>>({});

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(150 * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);

  // active view sub-tab
  const [activeSectionTab, setActiveSectionTab] = useState<"sectionA" | "sectionB" | "sectionC" | "sectionD">("sectionA");

  // Load a fresh paper when class, subject, scope, chapter, or year changes
  useEffect(() => {
    handleRegenerate();
  }, [currentClass, selectedSubject, examScope, selectedChapterId, examYear]);

  // Clock effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      handleAutoSubmitOnTimeout();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleRegenerate = () => {
    const matchedChapter = examScope === "chapter" && selectedChapterId !== "all"
      ? (availableChapters.find(c => c.id === selectedChapterId)?.name || "")
      : undefined;

    const freshPaper = generateBoardPaper(currentClass, selectedSubject, currentBoard, matchedChapter, studentGroup, examYear);
    setPaper(freshPaper);
    setSelectedMCQAnswers({});
    setMcqSubmitted(false);
    setMcqScore(0);
    setSelfGrades({});
    setExpandedModelAnswers({});
    setTimeLeft(freshPaper.timeLimitMinutes * 60);
    setTimerActive(false);
    setIsExamCompleted(false);
    setActiveSectionTab("sectionA");
  };

  const handleAutoSubmitOnTimeout = () => {
    alert("Time is up! Your board mock exam has been automatically submitted.");
    handleSubmitAll();
  };

  const selectMCQOption = (qId: string, index: number) => {
    if (mcqSubmitted) return;
    setSelectedMCQAnswers(prev => ({ ...prev, [qId]: index }));
  };

  const submitMCQSection = () => {
    if (!paper) return;
    let score = 0;
    paper.sectionA.forEach(q => {
      if (selectedMCQAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setMcqScore(score);
    setMcqSubmitted(true);
    // Auto advance to written sections
    setActiveSectionTab("sectionB");
  };

  const handleGradeChange = (qId: string, value: number) => {
    setSelfGrades(prev => ({ ...prev, [qId]: value }));
  };

  const toggleModelAnswer = (qId: string) => {
    setExpandedModelAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmitAll = () => {
    if (!paper) return;

    // Calculate MCQ portion marks
    const mcqComponentScore = mcqScore;
    
    // Calculate Self Graded essay portion marks
    let writtenComponentScore = 0;
    
    // Sum Section B points
    paper.sectionB.questions.forEach(q => {
      writtenComponentScore += selfGrades[q.id] || 0;
    });

    // Sum Section C points
    paper.sectionC.groups.forEach(g => {
      g.parts.forEach(p => {
        writtenComponentScore += selfGrades[p.id] || 0;
      });
    });

    // Sum Section D points if present
    if (paper.sectionD) {
      paper.sectionD.theorems.forEach(th => {
        writtenComponentScore += selfGrades[th.id] || 0;
      });
    }

    const totalMarksEarned = mcqComponentScore + writtenComponentScore;
    const maxPossMarks = paper.totalMarks;
    const pct = Math.round((totalMarksEarned / maxPossMarks) * 100);

    // Graded on the student's actual board scale. The previous inline ladder
    // was one band stricter than any real Pakistani board (see src/grading.ts).
    const assignedGrade = gradeFor(pct, currentBoard);

    const summaryRecord = {
      id: `eval-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      classLevel: currentClass,
      boardName: currentBoard,
      subjectId: selectedSubject,
      subjectName: paper.subjectName,
      mcqScore: mcqComponentScore,
      mcqMax: paper.sectionA.length,
      writtenScore: writtenComponentScore,
      writtenMax: maxPossMarks - paper.sectionA.length,
      totalEarned: totalMarksEarned,
      totalMax: maxPossMarks,
      percentage: pct,
      grade: assignedGrade,
      feedback: `Scored ${totalMarksEarned}/${maxPossMarks} (${pct}%) — ${gradeWithMeaning(pct, currentBoard)} on the ${scaleLabel(currentBoard)}. ${hasPassed(pct, currentBoard) ? "This is a pass" : "This is below the pass mark"} for ${currentBoard}. Objective ${mcqComponentScore}/${paper.sectionA.length}, written ${writtenComponentScore}/${maxPossMarks - paper.sectionA.length}.`
    };

    if (onAddEvaluationRecord) {
      onAddEvaluationRecord(summaryRecord);
    }

    setIsExamCompleted(true);
    setTimerActive(false);
  };

  if (!paper) {
    return (
      <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
        <AlertCircle className="mx-auto text-slate-400 mb-2 animate-bounce" />
        <p className="text-sm font-semibold text-slate-600">Generating board mockup exam sheet...</p>
      </div>
    );
  }

  // Calculate sum of currently filled grades
  const totalGradedSoFar = (Object.values(selfGrades) as number[]).reduce((a, b) => a + b, 0) + (mcqSubmitted ? mcqScore : 0);

  return (
    <div className="space-y-6">
      
      {/* Configuration Header & Selection */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-indigo-500 text-white text-[10px] font-bold font-mono rounded-full uppercase tracking-wider">
                Exam Simulator
              </span>
              <span className="text-slate-400 text-xs">
                {currentBoard} • {currentClass} Class
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1.5 flex items-center space-x-2">
              <FileText className="text-indigo-400 shrink-0" size={24} />
              <span>{examScope === "chapter" ? "Chapter-Wise Revision Mockup" : "Full Board Mockup Assessment"}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {examScope === "chapter" 
                ? "Generate a targeted mock practice paper focusing strictly on your chosen syllabus chapter to sharpen your understanding."
                : "Strictly engineered to Pakistan Federal and Punjab board matric/inter exam patterns. Prepare under real conditions with realistic MCQs, analytical numericals, and step-by-step grading rubrics."
              }
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-end bg-slate-900 border-none p-0">
            {/* Scope selection buttons */}
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Exam Mode:</span>
              <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                <button
                  onClick={() => {
                    setExamScope("full");
                    setSelectedChapterId("all");
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    examScope === "full" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Full Book
                </button>
                <button
                  onClick={() => setExamScope("chapter")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    examScope === "chapter" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Chapter-wise
                </button>
              </div>
            </div>

            {/* Chapter Selection Dropdown */}
            {examScope === "chapter" && (
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Select Chapter:</span>
                <select
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-700 rounded-lg text-xs font-semibold px-3 py-1.5 outline-none focus:border-indigo-500 cursor-pointer max-w-[200px] truncate"
                >
                  <option value="all">All Chapters</option>
                  {availableChapters.map(ch => (
                    <option key={ch.id} value={ch.id}>{ch.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Subject:</span>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedChapterId("all");
                }}
                className="bg-slate-800 text-white border border-slate-700 rounded-lg text-xs font-semibold px-3 py-1.5 outline-none focus:border-indigo-500 cursor-pointer"
              >
                {subjects.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Paper & Year:</span>
              <select
                value={examYear}
                onChange={(e) => setExamYear(e.target.value)}
                className="bg-slate-800 text-white border border-slate-700 rounded-lg text-xs font-semibold px-3 py-1.5 outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="2026">2026 Past Board Paper (Latest)</option>
                <option value="2025">2025 Past Board Paper</option>
                <option value="2024">2024 Past Board Paper</option>
                <option value="2023">2023 Past Board Paper</option>
                <option value="2022">2022 Past Board Paper</option>
                <option value="2021">2021 Past Board Paper</option>
                <option value="dynamic">Dynamic Syllabus Simulator</option>
              </select>
            </div>

            <button
              onClick={handleRegenerate}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors flex items-center space-x-1 text-xs font-bold h-9"
              title="Regenerate/Reset Test"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Control & Information Strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Stats card */}
        <div className="md:col-span-8 bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-3xs">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Marks</p>
              <p className="text-2xl font-display font-extrabold text-slate-800">{paper.totalMarks}</p>
            </div>
            <div className="w-px h-10 bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Allowed</p>
              <p className="text-2xl font-display font-extrabold text-slate-800">{paper.timeLimitMinutes} mins</p>
            </div>
            <div className="w-px h-10 bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Self Grading Marks</p>
              <p className="text-2xl font-display font-extrabold text-emerald-600">{totalGradedSoFar}</p>
            </div>
          </div>

          {/* Sub-sections links */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveSectionTab("sectionA")}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeSectionTab === "sectionA"
                  ? "bg-white text-indigo-600 shadow-3xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sec A (MCQs)
            </button>
            <button
              onClick={() => setActiveSectionTab("sectionB")}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeSectionTab === "sectionB"
                  ? "bg-white text-indigo-600 shadow-3xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sec B (Short Qs)
            </button>
            <button
              onClick={() => setActiveSectionTab("sectionC")}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeSectionTab === "sectionC"
                  ? "bg-white text-indigo-600 shadow-3xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sec C (Long Qs)
            </button>
            {paper.sectionD && (
              <button
                onClick={() => setActiveSectionTab("sectionD")}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  activeSectionTab === "sectionD"
                    ? "bg-white text-indigo-600 shadow-3xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Sec D (Theorems)
              </button>
            )}
          </div>
        </div>

        {/* Right Stopwatch Timer Card */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-3xs">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${timerActive ? "bg-amber-50 text-amber-600 animate-pulse" : "bg-slate-50 text-slate-400"}`}>
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Simulated Countdown</p>
              <p className="text-lg font-mono font-bold text-slate-800">{formatTime(timeLeft)}</p>
            </div>
          </div>

          <button
            onClick={() => setTimerActive(p => !p)}
            disabled={isExamCompleted}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isExamCompleted
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : timerActive
                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200"
            }`}
          >
            {timerActive ? "Pause" : "Start Clock"}
          </button>
        </div>

      </div>

      {/* Main Simulation View Area */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        
        {/* Exam Title Block */}
        <div className="bg-slate-50 border-b border-slate-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-slate-800 text-base flex items-center gap-1.5 flex-wrap">
              <span>{paper.subjectName}</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-lg bg-indigo-100 text-indigo-700">
                {examYear === "dynamic" ? "Syllabus Simulator" : `${examYear} Board Paper`}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Exam guidelines: Answer logically relative to allocated marks. Complete MCQ sheet first. Synchronized with the 2021-2026 board indexes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 font-mono bg-white border border-slate-200 px-2.5 py-1 rounded-full shrink-0">
              BOARD: {paper.boardName}
            </span>
            <span className="text-xs font-bold text-slate-500 font-mono bg-white border border-slate-200 px-2.5 py-1 rounded-full shrink-0">
              CLASS: {paper.classLevel}
            </span>
          </div>
        </div>

        {/* Exam-year context banner */}
        {examYear !== "dynamic" && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-3 flex items-center space-x-2 text-emerald-800 text-xs font-semibold">
            <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded font-mono text-[9px] font-extrabold uppercase shrink-0">PAST PAPER</span>
            <span>{examYear} annual board paper, rebuilt in your board's exact scheme. Useful for tracking recurring trends.</span>
          </div>
        )}

        <div className="p-6">
          
          {/* SECTION A: MCQS */}
          {activeSectionTab === "sectionA" && (
            <div className="space-y-6">
              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex items-start space-x-2.5">
                <Info size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600">
                  <p className="font-bold text-indigo-700">Section A Is Compulsory</p>
                  <p className="mt-0.5">Choose the most accurate option. You will receive instantly marked feedback upon submitting Section A, so you can evaluate conceptual clarity immediately before written tasks.</p>
                </div>
              </div>

              <div className="space-y-4">
                {paper.sectionA.map((q, idx) => {
                  const hasSelected = selectedMCQAnswers[q.id] !== undefined;
                  const selectedIdx = selectedMCQAnswers[q.id];
                  
                  return (
                    <div key={q.id} className="p-4 bg-slate-50/45 border border-slate-200 rounded-xl relative">
                      <p className="text-xs font-bold text-slate-800 flex items-start">
                        <span className="mr-2 text-indigo-600">{idx + 1}.</span>
                        <span className="flex-1">{q.question}</span>
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedIdx === optIdx;
                          const isCorrect = q.correctIndex === optIdx;
                          const isWrong = isSelected && !isCorrect;

                          let btnClass = "border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300";
                          if (mcqSubmitted) {
                            if (isCorrect) {
                              btnClass = "bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold";
                            } else if (isWrong) {
                              btnClass = "bg-red-50 text-red-700 border-red-300 font-semibold";
                            } else {
                              btnClass = "bg-slate-50 text-slate-400 border-slate-100 opacity-70";
                            }
                          } else if (isSelected) {
                            btnClass = "bg-indigo-50 text-indigo-700 border-indigo-400 font-semibold ring-1 ring-indigo-300";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => selectMCQOption(q.id, optIdx)}
                              disabled={mcqSubmitted}
                              className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${btnClass}`}
                            >
                              <span>{opt}</span>
                              {mcqSubmitted && isCorrect && <Check size={12} className="text-emerald-600" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Block */}
                      {mcqSubmitted && (
                        <div className="mt-3 p-3 bg-indigo-50/40 rounded-lg border border-indigo-100 text-[11px] text-indigo-800 leading-normal flex items-start space-x-1.5">
                          <HelpCircle size={13} className="shrink-0 mt-0.5 text-indigo-500" />
                          <div>
                            <span className="font-bold">Model Scheme: </span>
                            {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!mcqSubmitted && (
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={submitMCQSection}
                    disabled={Object.keys(selectedMCQAnswers).length < paper.sectionA.length}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center space-x-2"
                  >
                    <CheckCircle size={14} />
                    <span>Grading & Advance to Section B</span>
                  </button>
                </div>
              )}

              {mcqSubmitted && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                  <p className="font-semibold flex items-center space-x-2">
                    <CheckCircle size={15} className="text-emerald-500" />
                    <span>Graded successfully! Score: {mcqScore} / {paper.sectionA.length} marks on Section A.</span>
                  </p>
                  <button
                    onClick={() => setActiveSectionTab("sectionB")}
                    className="px-3 py-1 bg-white border border-emerald-200 rounded-md text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
                  >
                    View Section B →
                  </button>
                </div>
              )}

            </div>
          )}

          {/* SECTION B: SHORT QUESTIONS */}
          {activeSectionTab === "sectionB" && (
            <div className="space-y-6">
              
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-700 font-mono text-center uppercase tracking-wider">
                  {paper.sectionB.instruction}
                </p>
              </div>

              <div className="space-y-6 divide-y divide-slate-100">
                {paper.sectionB.questions.map((q, idx) => {
                  const val = selfGrades[q.id] || 0;
                  const isAnswerOpen = expandedModelAnswers[q.id] || false;

                  return (
                    <div key={q.id} className={`pt-6 ${idx === 0 ? "pt-0" : ""} space-y-3`}>
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-indigo-600 font-mono">{q.label}</p>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 leading-normal">
                            {q.question}
                          </h4>
                        </div>
                        <span className="text-xs font-bold font-mono text-slate-400 shrink-0 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                          Marks: {q.marks}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-y-2 pt-1">
                        <button
                          onClick={() => toggleModelAnswer(q.id)}
                          className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 flex items-center space-x-1 border border-slate-200 hover:border-indigo-100 px-2.5 py-1 rounded-lg bg-white shadow-3xs transition-all"
                        >
                          <span>{isAnswerOpen ? "Hide" : "Expand"} Model Answer & Steps</span>
                          {isAnswerOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>

                        {/* Grading slider */}
                        <div className="flex items-center space-x-2.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">Self Grade:</span>
                          <div className="flex space-x-1">
                            {Array.from({ length: q.marks + 1 }).map((_, valIdx) => (
                              <button
                                key={valIdx}
                                onClick={() => handleGradeChange(q.id, valIdx)}
                                className={`w-6 h-6 rounded-full text-[10px] font-extrabold flex items-center justify-center transition-all border ${
                                  val === valIdx
                                    ? "bg-slate-800 text-white border-transparent"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {valIdx}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Expanding Solution */}
                      {isAnswerOpen && (
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 space-y-2 leading-relaxed">
                          <p className="text-slate-400 font-bold border-b border-slate-800 pb-1.5 flex items-center space-x-1.5 text-[10px] tracking-wider uppercase">
                            <Sliders size={12} className="text-indigo-400" />
                            <span>Step Solutions & Marking Criteria (Pak-Board Standard)</span>
                          </p>
                          <div className="whitespace-pre-wrap">{q.modelAnswer}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveSectionTab("sectionC")}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  Proceed to Section C (Long Qs) →
                </button>
              </div>

            </div>
          )}

          {/* SECTION C: LONG QUESTIONS */}
          {activeSectionTab === "sectionC" && (
            <div className="space-y-6">
              
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-700 font-mono text-center uppercase tracking-wider">
                  {paper.sectionC.instruction}
                </p>
              </div>

              <div className="space-y-8 divide-y divide-slate-100">
                {paper.sectionC.groups.map((group, gIdx) => {
                  return (
                    <div key={group.id} className={`pt-6 ${gIdx === 0 ? "pt-0" : ""} space-y-4`}>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-display">
                          {group.label} {group.choiceText && <span className="text-slate-400 font-normal text-xs">({group.choiceText})</span>}
                        </h4>
                      </div>

                      <div className="space-y-6 pl-4 border-l-2 border-indigo-50/50">
                        {group.parts.map((p) => {
                          const val = selfGrades[p.id] || 0;
                          const isAnswerOpen = expandedModelAnswers[p.id] || false;

                          return (
                            <div key={p.id} className="space-y-3">
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <span className="text-xs font-bold text-slate-400 font-mono block mb-0.5">{p.label}</span>
                                  <h5 className="text-xs sm:text-sm font-semibold text-slate-800 leading-normal">
                                    {p.question}
                                  </h5>
                                </div>
                                <span className="text-xs font-bold font-mono text-slate-400 shrink-0 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                                  Marks: {p.marks}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center justify-between gap-y-2 pt-1">
                                <button
                                  onClick={() => toggleModelAnswer(p.id)}
                                  className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 flex items-center space-x-1 border border-slate-200 hover:border-indigo-100 px-2.5 py-1 rounded-lg bg-white shadow-3xs transition-all"
                                >
                                  <span>{isAnswerOpen ? "Hide" : "Expand"} Model Answer & Steps</span>
                                  {isAnswerOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>

                                {/* Grading range */}
                                <div className="flex items-center space-x-2.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl">
                                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">Self Grade:</span>
                                  <div className="flex space-x-1">
                                    {Array.from({ length: p.marks + 1 }).map((_, valIdx) => (
                                      <button
                                        key={valIdx}
                                        onClick={() => handleGradeChange(p.id, valIdx)}
                                        className={`w-6 h-6 rounded-full text-[10px] font-extrabold flex items-center justify-center transition-all border ${
                                          val === valIdx
                                            ? "bg-slate-800 text-white border-transparent"
                                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                                        }`}
                                      >
                                        {valIdx}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {isAnswerOpen && (
                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 space-y-2 leading-relaxed">
                                  <p className="text-slate-400 font-bold border-b border-slate-800 pb-1.5 flex items-center space-x-1.5 text-[10px] tracking-wider uppercase">
                                    <Sliders size={12} className="text-indigo-400" />
                                    <span>Step Solutions & Marking Criteria (Pak-Board Standard)</span>
                                  </p>
                                  <div className="whitespace-pre-wrap">{p.modelAnswer}</div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submission Area */}
              <div className="pt-8 mt-6 border-t border-slate-100 flex flex-col items-center justify-center space-y-3">
                <p className="text-xs text-slate-500 text-center max-w-sm font-medium">
                  Make sure you have carefully reviewed the Model Solutions and inserted your Self-Grades for all chosen written portions.
                </p>
                <button
                  onClick={handleSubmitAll}
                  disabled={isExamCompleted}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-emerald-50 disabled:text-emerald-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Award size={15} />
                  <span>{isExamCompleted ? "Evaluated & Logged✓" : "Submit Complete Board Exam Paper Evaluation"}</span>
                </button>
              </div>

            </div>
          )}

          {/* Section D: Compulsory Theorems */}
          {activeSectionTab === "sectionD" && paper.sectionD && (
            <div className="space-y-6">
              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
                <CheckCircle className="text-amber-600 mt-0.5 shrink-0 animate-pulse" size={18} />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight">
                    {paper.sectionD.instruction}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Geometric proofs (ثبوتِ مسائل) in BISE Pakistan exams are highly structured. Each proof is evaluated on 4 mandatory components: Given (معلوم), To Prove (مطلوب), Construction (عمل), and detailed Statements & Reasons table (دلائل و بیانات). Use our visual layout and the step solutions to self-grade.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {paper.sectionD.theorems.map((th) => {
                  const val = selfGrades[th.id] || 0;
                  const isAnswerOpen = !!expandedModelAnswers[th.id];

                  return (
                    <div
                      key={th.id}
                      className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-3xs hover:shadow-2xs transition-all space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-50 text-indigo-700 tracking-wider uppercase font-mono">
                            {th.label}
                          </span>
                          <h3 className="text-sm font-bold text-slate-800 leading-snug">
                            {th.question}
                          </h3>
                        </div>
                        <span className="text-xs font-black text-indigo-600 font-mono tracking-wider bg-indigo-50/40 px-2.5 py-1 rounded-md shrink-0">
                          {th.marks} Marks
                        </span>
                      </div>

                      {/* Interactive visual canvas for Geometry Theorems */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center justify-center space-y-3">
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono">Dynamic Proof Construction Canvas</p>
                        
                        {th.id.includes("theorem-mat-1") ? (
                          <svg width="220" height="220" className="bg-white rounded-lg border border-slate-200 shadow-3xs p-1">
                            {/* Circle */}
                            <circle cx="110" cy="110" r="70" fill="none" stroke="#2563eb" strokeWidth="2" />
                            {/* Center */}
                            <circle cx="110" cy="110" r="3" fill="#dc2626" />
                            <text x="108" y="102" fontSize="9" fontWeight="bold" fill="#dc2626" className="font-mono">O</text>
                            {/* Chord AB */}
                            <line x1="50" y1="150" x2="170" y2="150" stroke="#1e293b" strokeWidth="2" />
                            <text x="40" y="153" fontSize="10" fontWeight="bold" fill="#1e293b">A</text>
                            <text x="175" y="153" fontSize="10" fontWeight="bold" fill="#1e293b">B</text>
                            {/* Perpendicular OM */}
                            <line x1="110" y1="110" x2="110" y2="150" stroke="#16a34a" strokeWidth="2" strokeDasharray="3,3" />
                            <circle cx="110" cy="150" r="3" fill="#16a34a" />
                            <text x="114" y="146" fontSize="10" fontWeight="bold" fill="#16a34a">M (Midpoint)</text>
                            {/* Right angle indicator */}
                            <rect x="110" y="142" width="8" height="8" fill="none" stroke="#dc2626" strokeWidth="1" />
                            {/* Construction lines */}
                            <line x1="110" y1="110" x2="50" y2="150" stroke="#b45309" strokeWidth="1" strokeDasharray="2,2" />
                            <line x1="110" y1="110" x2="170" y2="150" stroke="#b45309" strokeWidth="1" strokeDasharray="2,2" />
                          </svg>
                        ) : th.id.includes("theorem-mat-2") ? (
                          <svg width="220" height="220" className="bg-white rounded-lg border border-slate-200 shadow-3xs p-1">
                            {/* Segment AB */}
                            <line x1="40" y1="140" x2="180" y2="140" stroke="#1e293b" strokeWidth="2" />
                            <text x="28" y="144" fontSize="10" fontWeight="bold" fill="#1e293b">A</text>
                            <text x="185" y="144" fontSize="10" fontWeight="bold" fill="#1e293b">B</text>
                            {/* Midpoint C */}
                            <circle cx="110" cy="140" r="3" fill="#1e293b" />
                            <text x="114" y="152" fontSize="9" fontWeight="bold" fill="#1e293b">C</text>
                            {/* Right Bisector line LM */}
                            <line x1="110" y1="30" x2="110" y2="190" stroke="#2563eb" strokeWidth="1.5" />
                            <text x="114" y="38" fontSize="10" fontWeight="bold" fill="#2563eb">L</text>
                            <text x="114" y="185" fontSize="10" fontWeight="bold" fill="#2563eb">M</text>
                            {/* Point P */}
                            <circle cx="110" cy="70" r="4" fill="#dc2626" />
                            <text x="118" y="72" fontSize="10" fontWeight="bold" fill="#dc2626">P</text>
                            {/* Equidistant lines */}
                            <line x1="110" y1="70" x2="40" y2="140" stroke="#16a34a" strokeWidth="2" strokeDasharray="3,3" />
                            <line x1="110" y1="70" x2="180" y2="140" stroke="#16a34a" strokeWidth="2" strokeDasharray="3,3" />
                            {/* Perpendicular indicator */}
                            <rect x="110" y="132" width="8" height="8" fill="none" stroke="#2563eb" strokeWidth="1" />
                          </svg>
                        ) : th.id.includes("theorem-mat-3") ? (
                          <svg width="220" height="220" className="bg-white rounded-lg border border-slate-200 shadow-3xs p-1">
                            {/* Circle */}
                            <circle cx="110" cy="110" r="75" fill="none" stroke="#1e293b" strokeWidth="2" />
                            {/* Chord AB */}
                            <line x1="50" y1="160" x2="170" y2="160" stroke="#1e293b" strokeWidth="2" />
                            <text x="38" y="165" fontSize="10" fontWeight="bold" fill="#1e293b">A</text>
                            <text x="175" y="165" fontSize="10" fontWeight="bold" fill="#1e293b">B</text>
                            {/* Point C on circle perimeter */}
                            <circle cx="85" cy="42" r="3" fill="#2563eb" />
                            <text x="82" y="32" fontSize="10" fontWeight="bold" fill="#2563eb">C</text>
                            {/* Point D on circle perimeter */}
                            <circle cx="135" cy="42" r="3" fill="#16a34a" />
                            <text x="135" y="32" fontSize="10" fontWeight="bold" fill="#16a34a">D</text>
                            {/* Angles triangles lines AC-CB */}
                            <line x1="50" y1="160" x2="85" y2="42" stroke="#2563eb" strokeWidth="1" />
                            <line x1="170" y1="160" x2="85" y2="42" stroke="#2563eb" strokeWidth="1" />
                            {/* Angles triangles lines AD-DB */}
                            <line x1="50" y1="160" x2="135" y2="42" stroke="#16a34a" strokeWidth="1" />
                            <line x1="170" y1="160" x2="135" y2="42" stroke="#16a34a" strokeWidth="1" />
                          </svg>
                        ) : (
                          <svg width="220" height="220" className="bg-white rounded-lg border border-slate-200 shadow-3xs p-1">
                            {/* Vector altitude geometry */}
                            <polygon points="110,40 50,160 170,160" fill="none" stroke="#1e293b" strokeWidth="2" />
                            <text x="105" y="32" fontSize="10" fontWeight="bold" fill="#1e293b">A</text>
                            <text x="38" y="165" fontSize="10" fontWeight="bold" fill="#1e293b">B</text>
                            <text x="175" y="165" fontSize="10" fontWeight="bold" fill="#1e293b">C</text>
                            {/* Orthocenter O */}
                            <circle cx="110" cy="120" r="3" fill="#dc2626" />
                            <text x="114" y="115" fontSize="9" fontWeight="bold" fill="#dc2626">O</text>
                            {/* Altitudes AD, BE */}
                            <line x1="110" y1="40" x2="110" y2="160" stroke="#2563eb" strokeWidth="1" strokeDasharray="2,2" />
                            <text x="106" y="172" fontSize="9" fontWeight="bold" fill="#2563eb">D</text>
                            <line x1="50" y1="160" x2="140" y2="100" stroke="#16a34a" strokeWidth="1" strokeDasharray="2,2" />
                            <text x="145" y="98" fontSize="9" fontWeight="bold" fill="#16a34a">E</text>
                          </svg>
                        )}
                        <span className="text-[10px] text-slate-400 font-bold font-mono">Figure Construction Scheme</span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-y-2 pt-1">
                        <button
                          onClick={() => toggleModelAnswer(th.id)}
                          className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 flex items-center space-x-1 border border-slate-200 hover:border-indigo-100 px-2.5 py-1 rounded-lg bg-white shadow-3xs transition-all"
                        >
                          <span>{isAnswerOpen ? "Hide" : "Expand"} Model Proof Statements & Reasons</span>
                          {isAnswerOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>

                        {/* Grading options */}
                        <div className="flex items-center space-x-2.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">Self Grade:</span>
                          <div className="flex space-x-1">
                            {Array.from({ length: th.marks + 1 }).map((_, valIdx) => (
                              <button
                                key={valIdx}
                                onClick={() => handleGradeChange(th.id, valIdx)}
                                className={`w-6 h-6 rounded-full text-[10px] font-extrabold flex items-center justify-center transition-all border ${
                                  val === valIdx
                                    ? "bg-slate-800 text-white border-transparent"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {valIdx}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {isAnswerOpen && (
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 space-y-2 leading-relaxed">
                          <p className="text-slate-400 font-bold border-b border-slate-800 pb-1.5 flex items-center space-x-1.5 text-[10px] tracking-wider uppercase">
                            <Sliders size={12} className="text-amber-400" />
                            <span>Academic Theorem Proof Table (ثبوت مع دلائل و نقوش)</span>
                          </p>
                          <div className="whitespace-pre-wrap">{th.modelAnswer}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submission Area */}
              <div className="pt-8 mt-6 border-t border-slate-100 flex flex-col items-center justify-center space-y-3">
                <p className="text-xs text-slate-500 text-center max-w-sm">
                  Make sure you have carefully reviewed the Model Solutions and inserted your Self-Grades for all chosen written portions.
                </p>
                <button
                  onClick={handleSubmitAll}
                  disabled={isExamCompleted}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-emerald-50 disabled:text-emerald-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Award size={15} />
                  <span>{isExamCompleted ? "Evaluated & Logged✓" : "Submit Complete Board Exam Paper Evaluation"}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
