import { bandsForBoard, gradeFor, gradeWithMeaning, scaleLabel } from "../grading";
import React, { useState, useEffect } from "react";
import { 
  Award, 
  BarChart2, 
  BookOpen, 
  CheckCircle, 
  Compass, 
  History, 
  Plus, 
  Smile, 
  Sparkles, 
  Star, 
  Trash2, 
  TrendingUp, 
  AlertCircle,
  Target,
  Sliders,
  Percent
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { motion } from "motion/react";

export interface EvaluationRecord {
  id: string;
  date: string;
  classLevel: string;
  boardName: string;
  subjectId: string;
  subjectName: string;
  mcqScore: number;
  mcqMax: number;
  writtenScore: number;
  writtenMax: number;
  totalEarned: number;
  totalMax: number;
  percentage: number;
  grade: string;
  feedback: string;
}

export interface SelfAssessment {
  id: string;
  date: string;
  subjectId: string;
  subjectName: string;
  conceptualStrength: number; // 1-5
  timeManagement: number; // 1-5
  syllabusCoverage: number; // 1-5
  notes: string;
}

/**
 * A fixed reference line to benchmark against, NOT observed peer data.
 *
 * This was previously labelled "Board Peer Avg" and returned per-board numbers
 * (68 for Punjab, 62 for Sindh, and so on) as though they were real statistics
 * for other students on that board. No such data is collected by this app and
 * none of those figures came from a published source, so the comparison and
 * the "Margin" it produced were meaningless. It is now presented as what it
 * actually is: a target line set at the board's A-grade threshold, which is a
 * genuine, checkable number the student can aim for.
 */
const getBoardTargetLine = (boardName: string) => {
  const bands = bandsForBoard(boardName);
  const aBand = bands.find((b) => b.grade === "A");
  return aBand ? aBand.min : 70;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as EvaluationRecord;
    const studentVal = payload.find(p => p.dataKey === "percentage")?.value;
    const peerVal = payload.find(p => p.dataKey === "peerAverage")?.value;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        className="bg-slate-950/95 backdrop-blur-md text-white p-4 rounded-xl shadow-xl border border-slate-800 text-xs max-w-64 font-sans ring-1 ring-black/10"
      >
        <p className="font-semibold text-slate-400 mb-2 text-[10px] uppercase tracking-wider font-mono flex items-center justify-between">
          <span>Reviewed on {data.date}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
        </p>
        <div className="space-y-2">
          <p className="text-white text-xs font-semibold">
            Subject: <span className="font-bold text-indigo-300">{data.subjectName}</span>
          </p>
          
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            {studentVal !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Your Score:</span>
                <span className="font-extrabold text-indigo-300 text-sm font-mono">{studentVal}% ({data.grade})</span>
              </div>
            )}
            {peerVal !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">A-Grade Target:</span>
                <span className="font-extrabold text-amber-400 font-mono">{peerVal}%</span>
              </div>
            )}
            {studentVal !== undefined && peerVal !== undefined && (
              <div className="pt-2 mt-1 border-t border-slate-800 flex justify-between font-mono text-[9px] items-center">
                <span className="text-slate-500 uppercase tracking-tight font-bold">Margin:</span>
                <span className={`px-1.5 py-0.5 rounded-sm font-bold text-[10px] ${studentVal >= peerVal ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-rose-400 bg-rose-500/10 border border-rose-500/20"}`}>
                  {studentVal >= peerVal ? `+${(studentVal - peerVal).toFixed(1)}%` : `${(studentVal - peerVal).toFixed(1)}%`}
                </span>
              </div>
            )}
          </div>

          <div className="text-[10px] leading-relaxed pt-2 border-t border-slate-800 mt-1 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
            <div className="flex justify-between mb-1">
              <span className="text-slate-500 font-medium">Raw Marks:</span>
              <span className="font-bold text-slate-300 font-mono">{data.totalEarned}/{data.totalMax}</span>
            </div>
            <div className="flex justify-between text-[9px] text-slate-500 font-mono pt-1 border-t border-slate-800/30">
              <span>MCQ: {data.mcqScore}/{data.mcqMax || 17}</span>
              <span>Written: {data.writtenScore}/{data.writtenMax || 68}</span>
            </div>
          </div>

          {data.feedback && (
            <p className="text-slate-400 text-[10px] italic leading-relaxed border-t border-slate-800 pt-2 mt-1 line-clamp-3">
              "{data.feedback}"
            </p>
          )}
        </div>
      </motion.div>
    );
  }
  return null;
};

interface StudentEvaluationProps {
  subjects: { id: string; name: string; color: string; textColor: string; bgLight: string }[];
  evaluationRecords: EvaluationRecord[];
  onAddEvaluationRecord: (rec: EvaluationRecord) => void;
  onDeleteEvaluationRecord: (id: string) => void;
  selfAssessments: SelfAssessment[];
  onAddSelfAssessment: (assess: SelfAssessment) => void;
  onDeleteSelfAssessment: (id: string) => void;
  currentBoard?: string;
}

export default function StudentEvaluation({
  subjects,
  evaluationRecords,
  onAddEvaluationRecord,
  onDeleteEvaluationRecord,
  selfAssessments,
  onAddSelfAssessment,
  onDeleteSelfAssessment,
  currentBoard = "BISE Lahore (Punjab)"
}: StudentEvaluationProps) {
  
  // Self Assessment form state
  const [selectedSub, setSelectedSub] = useState<string>(subjects[0]?.id || "physics");
  const [conceptRating, setConceptRating] = useState<number>(4);
  const [timeRating, setTimeRating] = useState<number>(3);
  const [coverageRating, setCoverageRating] = useState<number>(4);
  const [selfNotes, setSelfNotes] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"summary" | "assess" | "logs">("summary");
  const [showPeerBaseline, setShowPeerBaseline] = useState<boolean>(true);

  // Subject Target Scores state and persistence
  const [targetScores, setTargetScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("student_target_scores");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all current subjects are present
        let changed = false;
        subjects.forEach(s => {
          if (parsed[s.id] === undefined) {
            parsed[s.id] = 85;
            changed = true;
          }
        });
        return parsed;
      }
    } catch (_) {}
    const res: Record<string, number> = {};
    subjects.forEach(s => {
      res[s.id] = 85; // default high-achievement target
    });
    return res;
  });

  const handleTargetScoreChange = (subId: string, val: number) => {
    const updated = { ...targetScores, [subId]: val };
    setTargetScores(updated);
    try {
      localStorage.setItem("student_target_scores", JSON.stringify(updated));
    } catch (_) {}
  };

  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectObj = subjects.find(s => s.id === selectedSub);
    const subjectName = subjectObj?.name || selectedSub;

    const newAssessment: SelfAssessment = {
      id: `assess-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      subjectId: selectedSub,
      subjectName,
      conceptualStrength: conceptRating,
      timeManagement: timeRating,
      syllabusCoverage: coverageRating,
      notes: selfNotes || "Regular performance check-in."
    };

    onAddSelfAssessment(newAssessment);
    setSelfNotes("");
    setActiveTab("summary");
  };

  // Helper stats
  const totalMockups = evaluationRecords.length;
  const avgPercentage = totalMockups > 0 
    ? Math.round(evaluationRecords.reduce((sum, rec) => sum + rec.percentage, 0) / totalMockups)
    : 0;
  
  const topScoreRecord = evaluationRecords.length > 0
    ? [...evaluationRecords].sort((a,b) => b.percentage - a.percentage)[0]
    : null;

  // Chronologically sorted records with the A-grade target line for the trend chart
  const chronologicallySortedRecords = [...evaluationRecords].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  ).map(rec => ({
    ...rec,
    peerAverage: getBoardTargetLine(rec.boardName || currentBoard)
  }));

  const boardAvg = chronologicallySortedRecords.length > 0
    ? Math.round(chronologicallySortedRecords.reduce((sum, r) => sum + (r.peerAverage || getBoardTargetLine(currentBoard)), 0) / chronologicallySortedRecords.length)
    : getBoardTargetLine(currentBoard);
  const diffFromBoard = avgPercentage - boardAvg;

  // Grade distributions
  const aPlusGradeCount = evaluationRecords.filter(r => r.grade === "A+").length;
  const aGradeCount = evaluationRecords.filter(r => r.grade === "A" || r.grade === "B").length;

  // Dynamic recommendations based on scores and assessments
  const getSimulatedRecommendations = () => {
    const list = [];
    
    // Check if there are low assessments
    const lowAssessments = selfAssessments.filter(a => a.conceptualStrength <= 3 || a.timeManagement <= 3);
    
    if (lowAssessments.length > 0) {
      lowAssessments.forEach(item => {
        if (item.conceptualStrength <= 3) {
          list.push({
            type: "concept",
            subjectName: item.subjectName,
            text: `Conceptual weakness identified in ${item.subjectName}. Plan structured 1-hour active lectures or read focused board syllabus text guides in Chapter summaries.`
          });
        }
        if (item.timeManagement <= 3) {
          list.push({
            type: "time",
            subjectName: item.subjectName,
            text: `Time constraints noticed in ${item.subjectName}. Resolve the Mockup board exams Section B under strict 120-minute timer bounds.`
          });
        }
      });
    }

    // Default recommendations
    if (list.length === 0) {
      list.push({
        type: "general",
        subjectName: "General Prep",
        text: "Generate fresh board-format mockup papers across all subjects on your Young Scholars Pk dashboard to evaluate and log progress gaps."
      });
      list.push({
        type: "numerical",
        subjectName: "Physics / Math",
        text: "Make sure to solve numerical parts (b) of Section C questions to maximize score potential, as Pakistani board schemes allocate 3 free marks for formula equations."
      });
    }

    return list.slice(0, 3);
  };

  const recommendations = getSimulatedRecommendations();

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 text-white p-6 rounded-2xl shadow-xs border border-emerald-500/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-100 text-[10px] font-mono rounded-full font-extrabold uppercase tracking-widest">
                Academic Audit
              </span>
              <span className="text-emerald-100 text-xs">Analyze Strength & Gaps</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1.5 flex items-center space-x-2">
              <TrendingUp size={24} className="text-emerald-200" />
              <span>Performance Evaluation Center</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
              Log self-reflections and evaluate completed mocks to measure overall preparation levels against the anticipated Pakistani boards timeline.
            </p>
          </div>

          <div className="flex space-x-1.5 bg-white/10 p-1.5 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "summary"
                  ? "bg-white text-emerald-700 shadow-2xs"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("assess")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "assess"
                  ? "bg-white text-emerald-700 shadow-2xs"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              Self-Assessment
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "logs"
                  ? "bg-white text-emerald-700 shadow-2xs"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              Exam History ({totalMockups})
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY DISPLAY OR FORMS */}
      {activeTab === "summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Stats Cards (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Bento Grid Analytics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
                <div>
                  <Award size={20} className="text-indigo-500 mb-1" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Mocks</p>
                  <p className="text-3xl font-display font-extrabold text-slate-800 mt-1">{totalMockups}</p>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-50 pt-1.5">Official board simulations</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
                <div>
                  <TrendingUp size={20} className="text-emerald-500 mb-1" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Percent</p>
                  <p className="text-3xl font-display font-extrabold text-emerald-600 mt-1">{avgPercentage}%</p>
                </div>
                {totalMockups > 0 ? (
                  <p className="text-[10px] text-slate-500 mt-3 border-t border-slate-50 pt-1.5 font-semibold">
                    Current Grade: {gradeWithMeaning(avgPercentage, currentBoard)} — {scaleLabel(currentBoard)}
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-50 pt-1.5">No exams undertaken yet</p>
                )}
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs flex flex-col justify-between">
                <div>
                  <BarChart2 size={20} className="text-amber-500 mb-1" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Distributions</p>
                  <p className="text-3xl font-display font-extrabold text-slate-800 mt-1">
                    {aPlusGradeCount} <span className="text-xs text-slate-500 font-bold">A+</span>
                  </p>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-50 pt-1.5">High tier score consistency</p>
              </div>

            </div>

            {/* Percentage Score Trend Line Chart */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                    <TrendingUp size={16} className="text-indigo-500" />
                    <span>Mock Exam Performance Trend</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Score percentage progression over time</p>
                </div>
                
                <div className="flex items-center space-x-3.5 flex-wrap gap-y-1">
                  <label className="flex items-center space-x-2 text-[11px] text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-slate-100 transition-all">
                    <input 
                      type="checkbox" 
                      checked={showPeerBaseline} 
                      onChange={(e) => setShowPeerBaseline(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 border-slate-300"
                    />
                    <span className="font-semibold text-slate-700">Show A-grade target line</span>
                  </label>
                  {evaluationRecords.length > 0 && (
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded-lg font-mono whitespace-nowrap">
                      Target: 80%+ (A Grade)
                    </span>
                  )}
                </div>
              </div>

              {evaluationRecords.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                  <TrendingUp size={24} className="text-slate-300 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-slate-600">No score trend available</p>
                  <p className="text-[10px] text-slate-400 max-w-xs mx-auto mt-0.5">
                    Take your first mockup board exam to populate the automated performance tracking line chart.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="h-64 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chronologicallySortedRecords} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#94a3b8" 
                          fontSize={10} 
                          tickLine={false}
                          axisLine={false}
                          dy={8}
                          tickFormatter={(str) => {
                            try {
                              const date = new Date(str);
                              return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                            } catch (_) {
                              return str;
                            }
                          }}
                        />
                        <YAxis 
                          stroke="#94a3b8" 
                          fontSize={10} 
                          tickLine={false}
                          axisLine={false}
                          domain={[0, 100]}
                          dx={-4}
                          tickFormatter={(val) => `${val}%`}
                        />
                        <Tooltip 
                          content={<CustomTooltip />}
                        />
                        <Legend 
                          verticalAlign="top" 
                          height={36} 
                          iconType="circle" 
                          wrapperStyle={{ fontSize: 10, fontWeight: 500, paddingBottom: 10 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="percentage" 
                          name="Your Score" 
                          stroke="#4f46e5" 
                          strokeWidth={2.5}
                          activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
                          dot={{ r: 4, stroke: '#4f46e5', strokeWidth: 1.5, fill: '#ffffff' }}
                        />
                        {showPeerBaseline && (
                          <Line 
                            type="monotone" 
                            dataKey="peerAverage" 
                            name={`A-Grade Target (${gradeFor(getBoardTargetLine(currentBoard), currentBoard)} at ${getBoardTargetLine(currentBoard)}%)`}
                            stroke="#f59e0b" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            activeDot={{ r: 5, stroke: '#ffffff', strokeWidth: 1.5 }}
                            dot={{ r: 3, stroke: '#f59e0b', strokeWidth: 1, fill: '#ffffff' }}
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Dynamic Benchmarking Insights */}
                  {showPeerBaseline && (
                    <div className="pt-3.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-slate-50/50 rounded-lg p-3.5 border border-slate-150 flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 text-indigo-650 rounded-lg shrink-0">
                          <Award size={15} />
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Gap To A-Grade Target</p>
                          <p className="text-xs font-semibold text-slate-700 mt-0.5">
                            {diffFromBoard >= 0 ? (
                              <span>Above the A-grade target by <b className="text-emerald-600 font-extrabold font-mono">+{diffFromBoard}%</b></span>
                            ) : (
                              <span>Below the A-grade target by <b className="text-rose-600 font-extrabold font-mono">{Math.abs(diffFromBoard)}%</b></span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50/50 rounded-lg p-3.5 border border-slate-150 flex items-center space-x-3">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                          <Compass size={15} />
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Estimated Percentile Range</p>
                          <p className="text-xs font-semibold text-slate-700 mt-0.5">
                            {diffFromBoard >= 15 ? (
                              <span>90th - 99th Percentile <b className="text-indigo-600 font-semibold font-mono">(Top 10%)</b></span>
                            ) : diffFromBoard >= 5 ? (
                              <span>75th - 89th Percentile <b className="text-emerald-600 font-semibold font-mono">(Excellent)</b></span>
                            ) : diffFromBoard >= -5 ? (
                              <span>50th - 74th Percentile <b className="text-indigo-600 font-semibold font-mono">(Competitive)</b></span>
                            ) : (
                              <span>Below 50th Percentile <b className="text-rose-500 font-semibold font-mono">(Action Recommended)</b></span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Subject Target Planner & Progress Gaps */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                  <Target size={16} className="text-emerald-600 animate-pulse" />
                  <span>Subject Target Score Planner & Progress Gaps</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Set desired percentage targets for each board subject and visually track the conceptual preparation gap.
                </p>
              </div>

              <div className="space-y-4.5">
                {subjects.map(sub => {
                  // Calculate actual score average for this subject
                  const subjectMocks = evaluationRecords.filter(
                    rec => rec.subjectId === sub.id || rec.subjectName.toLowerCase() === sub.name.toLowerCase()
                  );
                  const subAvg = subjectMocks.length > 0
                    ? Math.round(subjectMocks.reduce((sum, r) => sum + r.percentage, 0) / subjectMocks.length)
                    : 0;

                  const targetValue = targetScores[sub.id] || 85;
                  const isAchieved = subAvg >= targetValue;
                  const gap = targetValue - subAvg;

                  // Dual percentage width calculations for structured visual progress bar 
                  const minWidth = Math.min(subAvg, targetValue);
                  const gapWidth = gap > 0 ? gap : 0;
                  const overflowWidth = isAchieved && subAvg > targetValue ? subAvg - targetValue : 0;

                  return (
                    <div key={sub.id} className="p-3.5 bg-slate-50/60 hover:bg-slate-50 border border-slate-150 rounded-xl transition-all">
                      {/* Name & status top */}
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                        <div className="flex items-center space-x-2">
                          <span className={`${sub.textColor} ${sub.bgLight} text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md`}>
                            {sub.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                            {subjectMocks.length} mock{subjectMocks.length !== 1 ? "s" : ""} logged
                          </span>
                        </div>
                        {/* Target control */}
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-slate-400 font-bold font-mono">TARGET:</span>
                          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-4xs">
                            <input 
                              type="range" 
                              min="50" 
                              max="100" 
                              value={targetValue}
                              onChange={(e) => handleTargetScoreChange(sub.id, parseInt(e.target.value))}
                              className="w-20 accent-emerald-600 h-1 bg-slate-200 rounded-lg cursor-pointer mr-2.5"
                            />
                            <span className="text-xs font-mono font-extrabold text-indigo-600 min-w-8 text-right">
                              {targetValue}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Score metrics */}
                      <div className="flex justify-between items-center text-[11px] mb-1.5 font-medium text-slate-500">
                        <div className="flex items-center space-x-1">
                          <span className="font-bold text-slate-700 font-mono text-xs">{subAvg > 0 ? `${subAvg}%` : "No Mocks Taken"}</span>
                          <span className="text-[10px] text-slate-400">Current Avg</span>
                        </div>
                        
                        {subAvg > 0 ? (
                          <div>
                            {isAchieved ? (
                              <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center space-x-0.5">
                                <CheckCircle size={10} className="text-emerald-500" />
                                <span>Target Met! (+{subAvg - targetValue}%)</span>
                              </span>
                            ) : (
                              <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                                Gap: -{gap}%
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                            Gap: -{targetValue}% (Awaiting Mock)
                          </span>
                        )}
                      </div>

                      {/* Multi-segment styled double progress bar */}
                      <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex shadow-4xs border border-slate-200/50 p-[2px]">
                        {subAvg > 0 ? (
                          <>
                            {/* Current performance zone bounded by target */}
                            <div 
                              style={{ width: `${minWidth}%` }} 
                              className={`h-full rounded-l-full transition-all duration-300 ${isAchieved ? "bg-emerald-500" : "bg-indigo-600"}`}
                            />
                            {/* Shortfall Gap zone */}
                            {!isAchieved && gapWidth > 0 && (
                              <div 
                                style={{ width: `${gapWidth}%` }} 
                                className="h-full bg-amber-500 opacity-80 border-l border-white/20 transition-all duration-300 relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[size:8px_8px] animate-[pulse_1.5s_infinite_ease-in-out]" />
                              </div>
                            )}
                            {/* Outperforming zone (overflow above target) */}
                            {isAchieved && overflowWidth > 0 && (
                              <div 
                                style={{ width: `${overflowWidth}%` }} 
                                className="h-full bg-cyan-500 rounded-r-full transition-all duration-300 relative border-l border-white/20"
                              />
                            )}
                          </>
                        ) : (
                          // 100% gap representation because no record is logged
                          <div 
                            style={{ width: `${targetValue}%` }} 
                            className="h-full bg-rose-450 opacity-60 rounded-l-full relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[size:8px_8px] animate-pulse" />
                          </div>
                        )}

                        {/* Visual pointer or label at key scores */}
                        <div className="absolute top-0 right-3 bottom-0 flex items-center justify-center">
                          <span className="text-[8px] font-mono font-bold text-slate-400 bg-white/90 px-1 rounded border border-slate-100 shadow-5xs">
                            Target {targetValue}%
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance confidence matrix */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs">
              <h3 className="text-sm font-bold text-slate-800 mb-3.5 flex items-center space-x-1.5">
                <BookOpen size={16} className="text-slate-600" />
                <span>Subject Confidence Tracker Matrix</span>
              </h3>
              
              {selfAssessments.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                  <Smile size={24} className="text-slate-300 mx-auto mb-1.5 animate-bounce" />
                  <p className="text-xs font-bold text-slate-600">No Assessments Saved Yet</p>
                  <p className="text-[10px] text-slate-400 max-w-xs mx-auto mt-0.5">
                    Click 'Self-Assessment' tab above to evaluate your conceptual strength and coverage by subject.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {subjects.map(sub => {
                    const matched = selfAssessments.filter(a => a.subjectId === sub.id);
                    if (matched.length === 0) return null;
                    const latest = matched[matched.length - 1];
                    const overallStars = Math.round((latest.conceptualStrength + latest.timeManagement + latest.syllabusCoverage) / 3);

                    return (
                      <div key={sub.id} className="p-3 bg-slate-50/55 rounded-xl border border-slate-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className={`${sub.textColor} ${sub.bgLight} text-[10px] font-bold px-2 py-0.5 rounded-md`}>
                            {sub.name}
                          </span>
                          <p className="text-xs text-slate-500 font-medium pl-1 mt-1 leading-normal">
                            Latest reflection: "{latest.notes}"
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 shrink-0">
                          <div className="text-[10px]">
                            <span className="text-slate-400 font-semibold font-mono">Concept: </span>
                            <span className="font-bold text-slate-800">{latest.conceptualStrength}/5</span>
                          </div>
                          <div className="text-[10px]">
                            <span className="text-slate-400 font-semibold font-mono">Time-Mgmt: </span>
                            <span className="font-bold text-slate-800">{latest.timeManagement}/5</span>
                          </div>
                          <div className="text-[10px]">
                            <span className="text-slate-400 font-semibold font-mono">Syllabus: </span>
                            <span className="font-bold text-slate-800">{latest.syllabusCoverage}/5</span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Log short summary */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                  <History size={16} className="text-slate-600" />
                  <span>Recent Mock Papers Undertakes</span>
                </h3>
                <button
                  onClick={() => setActiveTab("logs")}
                  className="text-[10px] font-bold text-indigo-600 hover:underline"
                >
                  View All ({evaluationRecords.length}) →
                </button>
              </div>

              {evaluationRecords.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                  <p className="text-xs text-slate-500 font-semibold">No board papers undertaken yet.</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Solve a model test under the "Mockup Papers" tab to automatically see results here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {evaluationRecords.slice(0, 3).map(rec => {
                    return (
                      <div key={rec.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-4xs">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-800">{rec.subjectName} Mock Exam</span>
                            <span className="text-[9px] bg-slate-100 text-slate-500 font-mono font-semibold px-2 rounded-full">{rec.date}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{rec.feedback}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-extrabold text-indigo-600">{rec.percentage}%</p>
                          <span className="text-[10px] font-extrabold text-emerald-600 font-mono bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">{rec.grade}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>

          {/* Sidebar Recommendation Engine & Action items (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xs relative text-white">
              <div className="absolute right-0 top-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl" />
              <div className="relative z-10">
                <div className="flex items-center space-x-1 mb-3.5">
                  <Sparkles size={16} className="text-amber-400 animate-spin-slow" />
                  <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-amber-300">Board Exam Strategy</h3>
                </div>

                <div className="space-y-4">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="space-y-1 text-xs border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                      <p className="font-bold text-slate-200 text-[11px] flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{rec.subjectName}</span>
                      </p>
                      <p className="text-slate-400 text-[11px] leading-relaxed pl-2.5">
                        {rec.text}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-slate-400 text-center mt-5 leading-normal">
                  Evaluation rules strictly align with federal and matric board curriculum constraints.
                </p>
              </div>
            </div>

            {/* Quick Action card */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest font-mono">Self Inspection Action</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Have you concluded revising a specific class chapter recently? Make sure to perform a self-assessment logs record now to document your personal rating status.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("assess")}
                className="w-full text-center mt-4 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-3xs flex items-center justify-center space-x-1"
              >
                <Plus size={14} />
                <span>Log Performance Assessment</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* SELF ASSESSMENT QUESTIONNAIRE FORM */}
      {activeTab === "assess" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-3xs max-w-2xl mx-auto">
          
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-base font-display font-bold text-slate-800">
              New Self-Performance Audit Assessment
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Reflecting on your own study habits is statistically proven to raise final board scores by 15%. Be honest regarding your preparation thresholds.
            </p>
          </div>

          <form onSubmit={handleSaveAssessment} className="space-y-5">
            
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Choose Curriculum Subject:</label>
              <select
                value={selectedSub}
                onChange={(e) => setSelectedSub(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold cursor-pointer"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Rating 1: Concept */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                <span>Conceptual Strength & Formulas Recall:</span>
                <span className="text-indigo-600 font-mono font-bold">{conceptRating} / 5</span>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setConceptRating(num)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${
                      conceptRating >= num
                        ? "bg-indigo-500 text-white border-transparent shadow-3xs font-extrabold"
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Star size={13} className={`mr-1 ${conceptRating >= num ? "fill-white" : ""}`} />
                    <span>{num}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 italic">Rate 1 (cannot remember key formulas or definitions) to 5 (can derive any thesis outline effortlessly).</p>
            </div>

            {/* Rating 2: Time Management */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                <span>Solving Speed & Time Management:</span>
                <span className="text-indigo-600 font-mono font-bold">{timeRating} / 5</span>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTimeRating(num)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${
                      timeRating >= num
                        ? "bg-amber-500 text-white border-transparent shadow-3xs font-extrabold"
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Star size={13} className={`mr-1 ${timeRating >= num ? "fill-white" : ""}`} />
                    <span>{num}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 italic">Rate 1 (always run over mock timeout limit) to 5 (can finalize sections easily with 15 mins to spare).</p>
            </div>

            {/* Rating 3: Syllabus Coverage */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                <span>Syllabus Coverage / Chapter Completion:</span>
                <span className="text-indigo-600 font-mono font-bold">{coverageRating} / 5</span>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCoverageRating(num)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${
                      coverageRating >= num
                        ? "bg-emerald-500 text-white border-transparent shadow-3xs font-extrabold"
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Star size={13} className={`mr-1 ${coverageRating >= num ? "fill-white" : ""}`} />
                    <span>{num}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 italic">Rate 1 (have only touched 1-2 units) to 5 (marked off all syllabus archive chapters as completed).</p>
            </div>

            {/* Reflection Text */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Personal Reflection Notes:</label>
              <textarea
                value={selfNotes}
                onChange={(e) => setSelfNotes(e.target.value)}
                placeholder="Write specific concepts you struggle with (e.g., 'Weak on mechanics numerical units' or 'Struggling to remember Surah translation context')..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 h-24 outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium resize-none leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-x-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab("summary")}
                className="px-4 py-2 hover:bg-slate-100 text-slate-500 rounded-lg text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center space-x-1.5"
              >
                <CheckCircle size={14} />
                <span>Save Reflections & Update Dashboard</span>
              </button>
            </div>

          </form>

        </div>
      )}

      {/* EXTENSIVE EXAM LOGS TIMELINE */}
      {activeTab === "logs" && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-3xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-800">Historical Evaluation Registry</h3>
              <p className="text-xs text-slate-400">All submitted timed mock performance outcomes archived under local telemetry.</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full font-mono">{evaluationRecords.length} records</span>
          </div>

          {evaluationRecords.length === 0 ? (
            <div className="text-center py-16">
              <History size={36} className="text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-600">No Historical Records Found</p>
              <p className="text-xs text-slate-400 mt-1">Conclude a complete mockup board exam to log your initial scores!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {evaluationRecords.map(rec => {
                return (
                  <div key={rec.id} className="border border-slate-200 bg-slate-50/20 rounded-xl p-4 shadow-4xs hover:border-slate-300 transition-all flex flex-col md:flex-row justify-between gap-4">
                    
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full font-mono">
                          {rec.subjectName}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-full">
                          {rec.classLevel} Class • {rec.boardName}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">({rec.date})</span>
                      </div>
                      
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {rec.feedback}
                      </p>

                      <div className="flex gap-x-4 text-[10px] text-slate-500 font-semibold pt-1">
                        <span>Sec-A Option marks: <strong className="text-slate-800 font-mono">{rec.mcqScore} / {rec.mcqMax}</strong></span>
                        <span className="text-slate-300">|</span>
                        <span>Sec-B/C Written marks: <strong className="text-slate-800 font-mono">{rec.writtenScore} / {rec.writtenMax}</strong></span>
                      </div>
                    </div>

                    <div className="flex min-w-0 md:flex-col items-start md:items-end justify-between md:justify-center border-t md:border-t-0 border-dashed border-slate-200 pt-3 md:pt-0 gap-2 shrink-0">
                      <div className="text-left md:text-right">
                        <p className="text-base font-extrabold text-slate-800">{rec.percentage}% Score</p>
                        <p className="text-[10px] font-bold text-emerald-600">Assigned Grade: <strong className="text-xs">{rec.grade}</strong></p>
                      </div>

                      <button
                        onClick={() => onDeleteEvaluationRecord(rec.id)}
                        className="text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100 transition-all"
                        title="Delete record"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
