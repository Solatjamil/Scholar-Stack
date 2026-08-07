import React, { useState, useMemo } from "react";
import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  Award,
  BookOpen as BookOpenIcon,
  ChevronRight,
  FileText,
  Clock,
  Sparkles,
  Bookmark,
  Check,
  Languages,
  PenTool,
  Binary,
  Lightbulb
} from "lucide-react";

interface Chapter {
  id: string;
  name: string;
  completed: boolean;
}

interface SyllabusItem {
  id: string;
  subjectId: string;
  title: string;
  board: string;
  chapters: Chapter[];
}

interface ChapterWiseStudyProps {
  currentClass: string;
  currentBoard: string;
  studentGroup: string;
  subjects: { id: string; name: string; color: string }[];
  syllabusList: SyllabusItem[];
  // Focus Timer parameters passed from App.tsx
  isTimerRunning: boolean;
  setIsTimerRunning: (val: boolean) => void;
  timeSpent: number;
  setTimeSpent: (val: number) => void;
  timerSubject: string;
  setTimerSubject: (val: string) => void;
  formatTimer: (seconds: number) => string;
}

export interface ImportantTopic {
  name: string;
  romanUrdu: string;
  videoTitle: string;
  videoUrl: string;
  diagramType: "physics-coulomb" | "physics-ohms" | "chemistry-structure" | "math-graph" | "biology-cell" | "cs-spa" | "english-tree" | "urdu-calligraphy" | "generic-mindmap";
  content: string;
}

export function TopicDiagram({ type }: { type: string }) {
  if (type === "physics-coulomb") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-white relative font-mono text-xs overflow-hidden h-48 flex flex-col justify-between">
        <div className="absolute top-2 left-2 text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Physics: Coulomb's Law Schematic</div>
        <div className="flex justify-around items-center my-auto h-24 relative">
          <div className="flex flex-col items-center z-10 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.5)]">q₁</div>
            <span className="text-[10px] text-blue-300 mt-1">+ve Charge</span>
          </div>
          
          <div className="flex-1 h-0.5 border-t-2 border-dashed border-slate-705 mx-4 relative flex items-center justify-center">
            <div className="absolute left-0 -translate-y-1/2">
              <span className="text-rose-400 font-sans text-[10px] font-bold">← F₁₂</span>
            </div>
            <div className="absolute right-0 -translate-y-1/2">
              <span className="text-rose-400 font-sans text-[10px] font-bold">F₂₁ →</span>
            </div>
            <div className="absolute -top-4 bg-slate-950 px-2 shadow-sm rounded-full border border-slate-800 text-[9px] text-slate-400">
              Distance (r)
            </div>
          </div>

          <div className="flex flex-col items-center z-10 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(244,63,94,0.5)]">q₂</div>
            <span className="text-[10px] text-rose-300 mt-1">-ve Charge</span>
          </div>
        </div>
        <div className="text-[9px] text-slate-400 italic">Forces are equal in magnitude but opposite in direction (Newton's 3rd Law)</div>
      </div>
    );
  }

  if (type === "physics-ohms") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-white relative font-mono text-xs overflow-hidden h-48 flex flex-col justify-between">
        <div className="absolute top-2 left-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Physics: Ohm's Circuit Diagram</div>
        <div className="flex justify-center items-center my-auto h-24 relative">
          <svg className="w-64 h-24 text-slate-400" viewBox="0 0 200 80" fill="none">
            <line x1="20" y1="40" x2="65" y2="40" stroke="currentColor" strokeWidth="1.5" />
            <line x1="40" y1="30" x2="40" y2="50" stroke="#f43f5e" strokeWidth="3" />
            <line x1="45" y1="35" x2="45" y2="45" stroke="#3b82f6" strokeWidth="1.5" />
            
            <path d="M 20 40 L 20 15 L 80 15" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 80 15 L 85 10 L 90 20 L 95 10 L 100 20 L 105 10 L 110 20 L 115 15" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" />
            <text x="91" y="6" fill="#10b981" className="text-[9px] font-bold">R</text>

            <path d="M 115 15 L 180 15 L 180 40" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 180 40 L 180 65 L 20 65 L 20 40" stroke="currentColor" strokeWidth="1.5" />

            <path d="M 140 15 L 148 15" stroke="#f59e0b" strokeWidth="2" />
            <polygon points="148,12 153,15 148,18" fill="#f59e0b" />
            <text x="131" y="8" fill="#f59e0b" className="text-[8px] font-bold">I →</text>

            <text x="48" y="58" fill="white" className="text-[10px] font-bold">V (Battery)</text>
          </svg>
        </div>
        <div className="text-[9px] text-slate-400">Mathematical Expression: I = V / R or V = I · R</div>
      </div>
    );
  }

  if (type === "chemistry-structure") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-white relative font-mono text-xs overflow-hidden h-48 flex flex-col justify-between">
        <div className="absolute top-2 left-2 text-[10px] text-purple-400 font-bold uppercase tracking-wider">Chemistry: IUPAC Molecular Ball-and-Stick Model</div>
        <div className="flex justify-center items-center my-auto h-24 relative space-x-1">
          <div className="relative w-32 h-24 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-sm z-20 shadow-md">C</div>
            
            <div className="absolute top-1 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-white text-slate-900 border border-slate-300 flex items-center justify-center font-bold text-[10px] z-20">H</div>
              <div className="w-0.5 h-4 bg-purple-400 -mt-1 z-10"></div>
            </div>

            <div className="absolute bottom-1 flex flex-col-reverse items-center">
              <div className="w-6 h-6 rounded-full bg-white text-slate-900 border border-slate-300 flex items-center justify-center font-bold text-[10px] z-20">H</div>
              <div className="w-0.5 h-4 bg-purple-400 -mb-1 z-10"></div>
            </div>

            <div className="absolute left-3 flex items-center">
              <div className="w-6 h-6 rounded-full bg-white text-slate-900 border border-slate-300 flex items-center justify-center font-bold text-[10px] z-20">H</div>
              <div className="h-0.5 w-4 bg-purple-400 -mr-1 z-10"></div>
            </div>

            <div className="absolute right-3 flex items-center flex-row-reverse">
              <div className="w-6 h-6 rounded-full bg-white text-slate-900 border border-slate-300 flex items-center justify-center font-bold text-[10px] z-20">H</div>
              <div className="h-0.5 w-4 bg-purple-400 -ml-1 z-10"></div>
            </div>
          </div>
          
          <div className="text-left py-2 border-l border-slate-800 pl-3 space-y-1 text-[10px] text-slate-300">
            <div><strong className="text-purple-300">Name:</strong> Methane</div>
            <div><strong className="text-purple-300">Formula:</strong> CH₄</div>
            <div><strong className="text-purple-405">Bonds:</strong> 4 σ-bonds</div>
            <div><strong className="text-purple-405">Hybrid:</strong> sp³ (109.5°)</div>
          </div>
        </div>
        <div className="text-[9px] text-slate-400">Single bonds are stable saturated hydrocarbons (Alkanes)</div>
      </div>
    );
  }

  if (type === "math-graph") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-white relative font-mono text-xs overflow-hidden h-48 flex flex-col justify-between">
        <div className="absolute top-2 left-2 text-[10px] text-amber-400 font-bold uppercase tracking-wider">Mathematics: Graph of Continuous Limit</div>
        <div className="flex justify-center items-center my-auto h-24 relative">
          <svg className="w-64 h-24 text-slate-600" viewBox="0 0 160 80" fill="none">
            <line x1="20" y1="70" x2="150" y2="70" stroke="currentColor" strokeWidth="1" />
            <polyline points="146,67 150,70 146,73" fill="currentColor" />
            <line x1="30" y1="10" x2="30" y2="75" stroke="currentColor" strokeWidth="1" />
            <polyline points="27,14 30,10 33,14" fill="currentColor" />
            
            <path d="M 40 60 Q 90 40 140 15" stroke="#f59e0b" strokeWidth="2" fill="none" />
            
            <circle cx="95" cy="38" r="3" fill="#3b82f6" />
            <line x1="95" y1="38" x2="95" y2="70" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="95" y1="38" x2="30" y2="38" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />

            <text x="91" y="78" fill="#3b82f6" className="text-[8px] font-bold">x=c</text>
            <text x="12" y="41" fill="#3b82f6" className="text-[8px] font-bold">f(c)</text>
          </svg>
        </div>
        <div className="text-[9px] text-slate-400">Limit exists if Left Limit (LHL) matches Right Limit (RHL)</div>
      </div>
    );
  }

  if (type === "biology-cell") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-white relative font-mono text-xs overflow-hidden h-48 flex flex-col justify-between">
        <div className="absolute top-2 left-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Biology: Punnett Square Inheritance Map</div>
        <div className="flex justify-center items-center my-auto h-24 relative space-x-6">
          <div className="grid grid-cols-3 gap-1 w-32 font-bold text-center text-xs">
            <div className="bg-slate-950 p-1 border border-slate-800 text-slate-500 text-[8px] flex items-center justify-center">Parent</div>
            <div className="bg-emerald-900/40 p-1 border border-slate-800 text-emerald-300">T</div>
            <div className="bg-emerald-900/40 p-1 border border-slate-800 text-emerald-300">t</div>

            <div className="bg-emerald-900/40 p-1 border border-slate-800 text-emerald-300">T</div>
            <div className="bg-slate-800 p-1 border border-slate-705 text-white rounded">TT</div>
            <div className="bg-slate-800 p-1 border border-slate-705 text-white rounded">Tt</div>

            <div className="bg-emerald-900/40 p-1 border border-slate-800 text-emerald-300">t</div>
            <div className="bg-slate-800 p-1 border border-slate-705 text-white rounded">Tt</div>
            <div className="bg-slate-800 p-1 border border-slate-705 text-white rounded">tt</div>
          </div>
          
          <div className="text-left text-[10px] space-y-1 text-slate-300">
            <div><strong className="text-emerald-400">Tall:</strong> T</div>
            <div><strong className="text-emerald-400">Dwarf:</strong> t</div>
            <div><strong className="text-emerald-350">Ratio:</strong> 1:2:1 (G), 3:1 (P)</div>
          </div>
        </div>
        <div className="text-[9px] text-slate-400 font-sans">Mendel's Law of Segregation shown in a simplified monohybrid model</div>
      </div>
    );
  }

  if (type === "cs-spa") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-white relative font-mono text-xs overflow-hidden h-48 flex flex-col justify-between">
        <div className="absolute top-2 left-2 text-[10px] text-blue-400 font-bold uppercase tracking-wider">Computer Science: SPA Dynamic Lifecycle Arc</div>
        <div className="flex justify-around items-center my-auto h-24 relative">
          <div className="bg-slate-950 px-2 py-1 rounded border border-slate-800 flex flex-col items-center">
            <span className="text-[8px] text-slate-500">1. UI NODE</span>
            <span className="text-emerald-400 font-bold text-[10px]">React V-DOM</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[8px] text-indigo-400">Updates</span>
            <span className="text-slate-500">⇄</span>
          </div>

          <div className="bg-slate-950 px-2 py-1 rounded border border-slate-800 flex flex-col items-center">
            <span className="text-[8px] text-slate-500">2. STATE</span>
            <span className="text-blue-400 font-bold text-[10px]">useState</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[8px] text-rose-405">Diffing</span>
            <span className="text-slate-500">⇄</span>
          </div>

          <div className="bg-slate-950 px-2 py-1 rounded border border-slate-800 flex flex-col items-center">
            <span className="text-[8px] text-slate-500">3. OUTPUT</span>
            <span className="text-amber-400 font-bold text-[10px]">DOM Update</span>
          </div>
        </div>
        <div className="text-[9px] text-slate-400">SPA loads a single HTML container page and switches nodes in real-time.</div>
      </div>
    );
  }

  if (type === "english-tree") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-white relative font-mono text-xs overflow-hidden h-48 flex flex-col justify-between">
        <div className="absolute top-2 left-2 text-[10px] text-teal-400 font-bold uppercase tracking-wider">English B: Generative Grammar Tree</div>
        <div className="flex justify-center items-center my-auto h-24 relative">
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-[10px] text-white font-bold">S (Sentence Sentence)</div>
            
            <div className="flex space-x-6">
              <div className="flex flex-col items-center border border-slate-800 bg-slate-950/60 p-1 rounded">
                <span className="text-[8px] text-slate-500">NP (Noun Phrase)</span>
                <span className="text-teal-400 font-bold text-[10px] mt-0.5">"The student"</span>
              </div>
              <div className="flex flex-col items-center border border-slate-800 bg-slate-950/60 p-1 rounded">
                <span className="text-[8px] text-slate-500">VP (Verb Phrase)</span>
                <span className="text-amber-400 font-bold text-[10px] mt-0.5">"studies hard"</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[9px] text-slate-405 italic">Sentence syntax structure facilitates flawless translation and active conversion.</div>
      </div>
    );
  }

  if (type === "urdu-calligraphy") {
    return (
      <div className="bg-slate-950 border-2 border-amber-900/50 rounded-xl p-4 text-center text-white relative text-sm overflow-hidden h-48 flex flex-col justify-between shadow-inner">
        <div className="absolute top-2 right-2 text-[8px] text-amber-500 font-bold uppercase tracking-wider font-mono" dir="rtl">اردو ادب: خلاصہ و تشریح گائیڈ</div>
        <div className="my-auto py-1 text-center leading-loose text-amber-400 text-sm md:text-base select-none" dir="rtl">
          سبق کا عنوان: اسوہ حسنہ صلی اللہ علیہ وسلم<br/>
          <span className="text-slate-400 text-xs font-mono font-normal">مصنف: مولانا سید سلیمان ندویؒ</span>
        </div>
        <div className="text-[9px] text-slate-500 font-mono" dir="rtl">جمالیاتی گائیڈ: تمام خلاصے بورڈ امتحانی پیٹرن کی مکمل تعمیل کرتے ہیں۔</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-white relative font-mono text-xs overflow-hidden h-48 flex flex-col justify-between">
      <div className="absolute top-2 left-2 text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Concept Core: Study Mindmap</div>
      <div className="flex justify-center items-center my-auto h-24 relative">
        <div className="relative flex items-center justify-center">
          <div className="bg-indigo-600 px-3 py-1 bg-indigo-600 rounded-lg border border-indigo-500 z-10 font-bold shadow">Core Concept</div>
          <div className="absolute -left-12 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-[9px] text-slate-400">Definition</div>
          <div className="absolute -right-12 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-[9px] text-slate-400">Derivation</div>
          <div className="absolute -top-10 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-[9px] text-slate-400">Syllabus</div>
        </div>
      </div>
      <div className="text-[9px] text-slate-400">Conceptual study structures ensure retention across modern board past papers.</div>
    </div>
  );
}

export function getTopicsForChapter(subjectId: string, chapterName: string): ImportantTopic[] {
  const normSub = subjectId.toLowerCase();
  const nameClean = chapterName.replace(/Unit \d+:\s*|Chapter \d+:\s*|Book \d+:\s*/gi, "").trim();

  if (normSub === "physics") {
    if (nameClean.includes("Coulomb") || nameClean.includes("Electric")) {
      return [
        {
          name: "Coulomb's Law of Electrostatics",
          romanUrdu: "Dosto, Coulomb's Law batata hai ke do point charges ke darmiyan attraction ya repulsion ki force unke charges ke product ke directly proportional hoti hai, aur unke darmiyan distance ke square ke inversely proportional hoti hai. Mathematically: F = k * (q1 * q2) / r^2. Kismat se, agar medium badle to force bhi badal jati hai kyun ke dielectric constant (epsilon) introduces physical resistance.",
          videoTitle: "Sabaq Foundation: Coulomb's Law Explanation",
          videoUrl: "https://www.youtube.com/embed/gIK_5e5vHhI",
          diagramType: "physics-coulomb",
          content: "Formula Key: F = k · q₁ · q₂ / r²\nWhere k ≈ 9 × 10⁹ N·m²/C² inside vacuum. Medium decrease constant to F_med = F_vac / ε_r."
        },
        {
          name: "Electric Field Intensity & Lines of Force",
          romanUrdu: "Electric Field Intensity (E) kisi point par wo electric force hoti hai jo ek unit positive test charge par act krti hai (E = F/q). Positive charge se force lines hamesha bahar ki taraf nikalti hain (outward) aur negative charge me andar ki taraf aati hain (inward). Field lines kabhi bhi ek dusre ko cross nahi kartin kyun ke ek point par E ki sirf ek direction ho sakti hai.",
          videoTitle: "Khan Academy Urdu: Electric Fields & Force Lines",
          videoUrl: "https://www.youtube.com/embed/oL7C1_QonSg",
          diagramType: "physics-coulomb",
          content: "Electric Flux Φ = E · A cos(θ). Gauss's Law states total flux through any closed surface is 1/ε₀ times total charge enclosed."
        }
      ];
    } else if (nameClean.includes("Ohm") || nameClean.includes("Kirchoff") || nameClean.includes("Current")) {
      return [
        {
          name: "Ohm's Law & Electrical Resistivity",
          romanUrdu: "Ohm's Law ke mutabiq, kisi conductor me se guzarne wala electric current directly proportional hota hai uske ends ke darmiyan potential difference ke, jab tak physical state (jaise temperature) constant rahe. V = I * R. Resistance R depend karti hai wire ki length (L), area (A) aur material ki resistivity (rho) par: R = ρ * L / A.",
          videoTitle: "ilmkidunya: Ohm's Law and Resistivity",
          videoUrl: "https://www.youtube.com/embed/A6E6v4FfGqY",
          diagramType: "physics-ohms",
          content: "Key Expression: V = I·R, Resistivity ρ = R·A / L. Temperature coefficient α = (R_t - R_o) / (R_o · Δt)."
        },
        {
          name: "Kirchhoff's Rules (KCL & KVL)",
          romanUrdu: "Kirchhoff k do rules hain complex circuits ko solve krne k liye. Pehla rule (KCL - Law of Conservation of Charge) kehta hai k kisi junction par aane wala total current barabar hota hai wahan se jane wale current k. Dusra rule (KVL - Law of Conservation of Energy) kehta hai k kisi bhi closed loop me total change in potential zero hota hai: ΣΔV = 0.",
          videoTitle: "Taleem360: Kirchhoff's Rules in Complex Networks",
          videoUrl: "https://www.youtube.com/embed/QyP85fN3Pec",
          diagramType: "physics-ohms",
          content: "KCL: Σ I_in = Σ I_out (Junction Rule)\nKVL: Σ E + Σ I·R = 0 (Loop Rule)"
        }
      ];
    } else {
      return [
        {
          name: `Fundamental Theory of ${nameClean || "Electromagnetism"}`,
          romanUrdu: `Is topic me hum standard Physics concepts ko seekhenge. Board exams k liye ye zaroori hai k aap iske formulas, units aur conceptual questions ko samajh kar yaad karein. Ratay (memorization) ki bajaye core principles ko apply karna seekhein taake numeric questions me asani ho.`,
          videoTitle: "Sabaq Foundation: High School Physics series",
          videoUrl: "https://www.youtube.com/embed/YIBy5-6vTsg",
          diagramType: "physics-coulomb",
          content: `Core parameters represent physical properties of standard mechanics, thermodynamics, or electricity. Practice deriving formulas step-by-step with clean SI Units.`
        }
      ];
    }
  }

  if (normSub === "chemistry") {
    if (nameClean.includes("Nomenclature") || nameClean.includes("Alkane") || nameClean.includes("Alkene") || nameClean.includes("Organic")) {
      return [
        {
          name: "IUPAC Rules for Naming Alkanes & Alkenes",
          romanUrdu: "Organic Chemistry me compounds ko name dene k liye IUPAC rules follow kiye jate hain. Sab se pehle sab se lambi continuous carbon chain (longest chain) select karni hai. Agar double bond ho, to numbering wahan se start hogi jahan se double bond kareeb parta ho. Branches (substituents) ke names alphabetical order me likhe jate hain aur unki position ko numbers se represent kia jata hai, jaise 2-Methylbutane.",
          videoTitle: "Khan Academy Urdu: IUPAC Nomenclature of Alkanes",
          videoUrl: "https://www.youtube.com/embed/S_8qM1m9m6A",
          diagramType: "chemistry-structure",
          content: "Standard IUPAC Prefixes: Meth (1C), Eth (2C), Prop (3C), But (4C), Pent (5C), Hex (6C).\nSuffix: -ane for single bonds, -ene for double bonds, -yne for triple bonds."
        },
        {
          name: "Functional Groups Classification",
          romanUrdu: "Functional group kisi bhi organic molecule ka wo atom ya group of atoms hota hai jo compound ko uski khas chemical properties deta hai. Jaise Hydroxyl group (-OH) alcohols banata hai, aur Carboxyl group (-COOH) carboxylic acids banata hai. Puray compound ki reactivity isi group par depend krti hai.",
          videoTitle: "Sabaq Foundation: Functional Groups Introduction",
          videoUrl: "https://www.youtube.com/embed/9G0zqyK72t4",
          diagramType: "chemistry-structure",
          content: "Common Functional Groups:\n- Halides: -X\n- Alcohols: -OH\n- Ethers: -O-\n- Aldehydes: -CHO\n- Ketones: -CO-\n- Carboxylic Acids: -COOH"
        }
      ];
    } else {
      return [
        {
          name: `Core Concept of ${nameClean || "Saturated Compounds"}`,
          romanUrdu: `Chemistry ka ye chapter bohot important hai. Isme reaction mechanisms aur chemical formulations ko likh kar practice karein. Board paper me equations ke names aur colors of products zaroor likha karein taake pore number mil skein.`,
          videoTitle: "ilmkidunya: Chemistry Board Preparation Lectures",
          videoUrl: "https://www.youtube.com/embed/C3U1lXg9n_s",
          diagramType: "chemistry-structure",
          content: `Structured molecular outlines, reactive states and orbital alignments are central to standard intermediate chemistry syllabus. Write accurate chemical equations.`
        }
      ];
    }
  }

  if (normSub === "math" || normSub === "mathematics") {
    if (nameClean.includes("Limit") || nameClean.includes("Continuity")) {
      return [
        {
          name: "Concept of Limits & One-Sided Limit Rules",
          romanUrdu: "Limit ka matlab hota hai k jab variable 'x' kisi value 'a' k kareeb jata hai (but exact equal nahi hota), to function f(x) kis value ki taraf approach krta hai. Agar left side se approach karein to use left-hand limit bolte hain, aur right side se approach karein to right-hand limit. Limit tab hi exist krti hai jab dono limits barabar hon: LHL = RHL.",
          videoTitle: "Sabaq Foundation: Limits and Continuity",
          videoUrl: "https://www.youtube.com/embed/Z0oY_4Wca85",
          diagramType: "math-graph",
          content: "Standard Definition: lim (x → a) f(x) = L. Squeeze Theorem can verify complex trigonometric limits like lim (x → 0) (sin x / x) = 1."
        },
        {
          name: "Continuity of Functions at a Point",
          romanUrdu: "Koi bhi function f(x) kisi point x = c par continuously defined tab kehlata hai jab teen shrait puri hon: (1) f(c) defined ho, (2) limit f(x) as x approaches c exist krta ho, aur (3) limit ki value f(c) ke exact barabar ho. Agar inme se koi ek shart bhi tutay to function discontinuous ho jata hai.",
          videoTitle: "Taleem360: Continuity of Algebraic Functions",
          videoUrl: "https://www.youtube.com/embed/A6E6v4FfGqY",
          diagramType: "math-graph",
          content: "Continuous Conditions: f(c) = lim (x → c) f(x). Geometrically, means the curve has no break, hole, or vertical asymptote at that specific point."
        }
      ];
    } else if (nameClean.includes("Differentiation") || nameClean.includes("Chain") || nameClean.includes("Derivative")) {
      return [
        {
          name: "First Principles of Differentiation (Ab-Initio Method)",
          romanUrdu: "Differentiation from First Principles (ya Ab-initio method) kisi bhi continuous curve ka derivative nikalne ka core rules-based tareeqa hai. Isme hum step-by-step formula apply krte hain: f'(x) = limit (deltax -> 0) [f(x + deltax) - f(x)] / deltax. Isse hum algebra, trigonometry aur exponent powers ke derivatives derive krte hain.",
          videoTitle: "ilmkidunya: Derivative from First Principle (Ab-initio)",
          videoUrl: "https://www.youtube.com/embed/oK7C1_QonSg",
          diagramType: "math-graph",
          content: "Step 1: y = f(x)\nStep 2: y + Δy = f(x + Δx)\nStep 3: Δy = f(x + Δx) - f(x)\nStep 4: dy/dx = lim (Δx → 0) Δy/Δx"
        },
        {
          name: "The Chain Rule of Composite Variables",
          romanUrdu: "Jab ek function dusre function k andar nested ho f(g(x)), tab derivative nikalne k liye hum Chain Rule use krte hain. Agar y depend kre u par, aur u depend kre x par, to y ka derivative with respect to x hoga: dy/dx = (dy/du) * (du/dx). Ye derivative ko link karne ka sab se asan tareeqa hai.",
          videoTitle: "Khan Academy Urdu: Chain Rule in Calculus",
          videoUrl: "https://www.youtube.com/embed/FfeN9Y2_sM0",
          diagramType: "math-graph",
          content: "Chain Expression: dy/dx = dy/du · du/dx\nUseful for power functions like y = (ax + b)ⁿ -> dy/dx = n(ax+b)ⁿ⁻¹ · (a)."
        }
      ];
    } else {
      return [
        {
          name: `Mathematics Rule of ${nameClean || "Differentiation Principles"}`,
          romanUrdu: `Maths practice ka naam hai. Is topic ke theorems aur exercises ko rozana apne hath se solve karein. Board paper me formulas aur step values ko box me highlight karein taake maximum credit mil ske.`,
          videoTitle: "ilmkidunya: Intermediate Mathematics Syllabus Study",
          videoUrl: "https://www.youtube.com/embed/1kH3_G0tW1k",
          diagramType: "math-graph",
          content: `Solve matrices system, calculus curves, coordinate geometry and trigonometry values step-by-step. Keep formulas memorized.`
        }
      ];
    }
  }

  if (normSub === "biology") {
    if (nameClean.includes("Inheritance") || nameClean.includes("Chromosome") || nameClean.includes("Genetic")) {
      return [
        {
          name: "Mendel's Laws of Inheritance & Trait Segregation",
          romanUrdu: "Gregor Mendel ne pea plants (matar ke poday) par experiments kr k genetics ke do bunyadi laws diye. (1) Law of Segregation kehta hai k har individual me do alleles hote hain jo gamete formation k dauran alag jo jate hain. (2) Law of Independent Assortment kehta hai k different traits k alleles productively independently assort krte hain bina ek dusre ko affect kiye.",
          videoTitle: "Sabaq Foundation: Mendel's Laws of genetics",
          videoUrl: "https://www.youtube.com/embed/oK7C1_QonSg",
          diagramType: "biology-cell",
          content: "Monobybrid Cross ratio: 3:1 (Phenotype), 1:2:1 (Genotype).\nDihybrid Cross ratio matches: 9:3:3:1 Phenotype distributions."
        },
        {
          name: "Chromosomal Theory of Inheritance",
          romanUrdu: "Sutton aur Boveri ne ye theory pesh ki jo kehti hai k chromosomes hi genetics units (genes) ke real structures hain jo meiosis k dauran move krte hain. Gene loci chromosomes par line-wise arranged hote hain. Ye theory biology me classical genetics aur cellular analysis ko aapas me jor deti hai.",
          videoTitle: "Khan Academy Urdu: Chromosomal inheritance basics",
          videoUrl: "https://www.youtube.com/embed/YIBy5-6vTsg",
          diagramType: "biology-cell",
          content: "Meiosis division separation ensures haploid chromosome allocation to gametes, matching Mendel's law patterns."
        }
      ];
    } else {
      return [
        {
          name: `Biological Analysis of ${nameClean || "Inheritance Principles"}`,
          romanUrdu: `Biology me full marks lene ka sab se behtareen tareeqa hai k aap diagrams banaein! Paper me hamesha clear pencil se diagrams banakaer labels karein. Terminology key points ki short details bar-bar repeat karein.`,
          videoTitle: "Sabaq Foundation: BISE Biology Lectures Series",
          videoUrl: "https://www.youtube.com/embed/C3U1lXg9n_s",
          diagramType: "biology-cell",
          content: `Draw labeled cell organs, genetics grids or vascular tissues. Emphasize standard biology definitions and biochemical reactions.`
        }
      ];
    }
  }

  if (normSub === "cs") {
    return [
      {
        name: `Single Page Application (SPA) Architectural Patterns in ${nameClean || "State Hooks"}`,
        romanUrdu: "Computer Science me SPA (Single Page Application) un apps ko kehter hain jo dynamic rendering ke zariye single web document reload kiye bina complete screen contents update krti hain. React iska behtareen example hai. Isme components build kiye jate hain aur browser request-rebuild cycles se complete state flow chalta hai bina page flash ke.",
        videoTitle: "Taleem360: React SPA routing and state web guides",
        videoUrl: "https://www.youtube.com/embed/9G0zqyK72t4",
        diagramType: "cs-spa",
        content: "Browser triggers virtual tree diff -> reconciles real DOM -> changes target sections smoothly. Port 3000 serves all dev bundles."
      },
      {
        name: "React States, Hooks and Component Lifecycles",
        romanUrdu: "React architecture me state kisi component ka physical variables container hota hai jo badalne pr automatic component re-render trigger krta hai. 'useState' hook simple state management k liye use hota hai aur 'useEffect' asynchronous functions, operations ya data fetches handle krne k liye use krte hain jo component mounting or modifications par execute hote hain.",
        videoTitle: "Taleem360: React state hooks (useState & useEffect) course",
        videoUrl: "https://www.youtube.com/embed/oL7C1_QonSg",
        diagramType: "cs-spa",
        content: "useState returns state value and transition dispatcher. Avoid heavy loops inside useEffect variables dependencies."
      }
    ];
  }

  if (normSub === "english") {
    return [
      {
        name: `Linguistic Structures & Syntax Rules in ${nameClean || "Tenses"}`,
        romanUrdu: "English language k paper me maximum marks secure krne k liye functional grammar structures par absolute command hona zaroori hai. Sentence patterns, subject-verb agreement aur parts of speech ki positions clear honi chaiye. Tenses ko proper time frame markers k sath use kijiye.",
        videoTitle: "ilmkidunya: English Compulsory Grammar Lectures",
        videoUrl: "https://www.youtube.com/embed/YIBy5-6vTsg",
        diagramType: "english-tree",
        content: "Direct vs Indirect rules: Shift tenses backward from absolute present to immediate past when main reporting clause is past."
      }
    ];
  }

  if (normSub === "urdu") {
    return [
      {
        name: `اردو ادب اور ادبی معانی: ${nameClean || "ادبی خدمات"}`,
        romanUrdu: "Urdu compulsory me sub se zada importance 'Shaer e Mashriq Allama Iqbal' ki poetry ko aur classical prose ko di jati hai. Tashreeh likhte waqt alfaz k mushkil ma'ni aur muasir tehzeebi pas-manzar ko samjhna lazmi hai. Har tashreeh me aqwal or quranic references bhi add karein.",
        videoTitle: "Taleem360: Study guides and lessons summaries",
        videoUrl: "https://www.youtube.com/embed/1kH3_G0tW1k",
        diagramType: "urdu-calligraphy",
        content: "تشریحات لکھتے وقت صنف کا نام، مصنف کا نام اور پس منظر مع سیاق و سباق یا خلاصہ متن لازمی شامل کیا کریں۔ اردو ب کے خلاصہ جات کا ایک جامع تسلسل قائم رکھیے۔"
      }
    ];
  }

  return [
    {
      name: `Core Syllabus Outline in ${nameClean || "Genesis of Pakistan"}`,
      romanUrdu: "Islamabad and provincial boards check detailed notes closely. Is chapter k important historical details, dates, and Quranic verses ko box me highlighter se mark karein, aur points me elaborate kijiye taake pore marks secure hon.",
      videoTitle: "Sabaq Foundation: Pakistan studies core lessons",
      videoUrl: "https://www.youtube.com/embed/oL7C1_QonSg",
      diagramType: "generic-mindmap",
      content: "Ensure references are visually separated from local text and written respectfully in elegant containers."
    }
  ];
}

// Extensive Real Data Banks for Chapter Wise Practice
// Organized by subject rules as requested
export default function ChapterWiseStudy({
  currentClass,
  currentBoard,
  studentGroup,
  subjects,
  syllabusList,
  isTimerRunning,
  setIsTimerRunning,
  timeSpent,
  setTimeSpent,
  timerSubject,
  setTimerSubject,
  formatTimer
}: ChapterWiseStudyProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    subjects.length > 0 ? subjects[0].id : "physics"
  );
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [activeStudyTab, setActiveStudyTab] = useState<"mcq" | "topics" | "short" | "long" | "special">("mcq");
  
  // MCQ state practice
  const [userSelectedMCQs, setUserSelectedMCQs] = useState<{ [qId: string]: number }>({});
  const [showMCQAnswers, setShowMCQAnswers] = useState<{ [qId: string]: boolean }>({});

  // Active syllabus/subject selection
  const activeSyllabus = useMemo(() => {
    return syllabusList.find((s) => s.subjectId === selectedSubjectId);
  }, [syllabusList, selectedSubjectId]);

  // Reset selected chapter when subject changes
  React.useEffect(() => {
    if (activeSyllabus && activeSyllabus.chapters.length > 0) {
      setSelectedChapterId(activeSyllabus.chapters[0].id);
      setUserSelectedMCQs({});
      setShowMCQAnswers({});
    } else {
      setSelectedChapterId("");
    }
  }, [activeSyllabus, selectedSubjectId]);

  const activeChapter = useMemo(() => {
    return activeSyllabus?.chapters.find((c) => c.id === selectedChapterId);
  }, [activeSyllabus, selectedChapterId]);

  // Get active subject info
  const activeSubjectInfo = useMemo(() => {
    return subjects.find((s) => s.id === selectedSubjectId);
  }, [subjects, selectedSubjectId]);

  // --- DYNAMIC DATA GENERATOR FOR REAL-WORLD HIGH QUALITY CONTENT ---
  // To adhere to "show real data with answers, and English B and Urdu B with khulasa, salees, tashreeh, letters, essays",
  // we build beautiful pre-formatted academic data structures dynamically mapped to state items.
  const studyData = useMemo(() => {
    if (!selectedSubjectId || !selectedChapterId) return null;

    const chName = activeChapter?.name || "Topic Practice";
    const subId = selectedSubjectId.toLowerCase();
    const isMatric = currentClass === "9th" || currentClass === "10th";

    // 1. PHYSICS STUDY DATA
    if (subId === "physics") {
      return {
        mcqs: [
          {
            id: "m1",
            question: "In standard measurements, which of the following is a supplementary base unit under SI convention?",
            options: ["Radian & Steradian", "Pascal & Joule", "Newton & Coulomb", "Watts & Volts"],
            correctIndex: 0,
            explanation: "Supplementary units comprise Radian (for plane angle) and Steradian (for solid angle)."
          },
          {
            id: "m2",
            question: `A rocket engine expands gas, generating thrust. Under which of Newton's physical directives is this phenomenon quantified?`,
            options: ["Third Law of Motion", "First Law of Inertia", "Torque Equilibrium Law", "Bernoulli's Principle"],
            correctIndex: 0,
            explanation: "The mechanical escape of gas creates an equal and opposite reaction force, pushing the rocket upwards."
          },
          {
            id: "m3",
            question: "Choose correct value of Coulomb's constant (k) under vacuum permittivity:",
            options: ["9.0 x 10^9 N.m²/C²", "8.85 x 10^-12 C²/N.m²", "1.6 x 10^-19 Joules", "6.63 x 10^-34 J.s"],
            correctIndex: 0,
            explanation: "k = 1/(4πε₀), yielding approximately 9.0 x 10^9 N.m²/C²."
          }
        ],
        shorts: [
          {
            id: "s1",
            question: "What is the difference between systematic error and random error?",
            answer: "Systematic Error arises from faulty design, poor calibration of instruments, or structural zero-error. It affects all measurements in a constant direction and can be removed by applying correction factors. \n\nRandom Error arises from unpredictable fluctuations in environmental variables or human reading anomalies. It is bidirectional and minimized by calculating the statistical mean of multiple readings."
          },
          {
            id: "s2",
            question: "Why does the physical rate of friction decrease when rolling contact is established?",
            answer: "When a round body rolls on a surface, the area in contact is theoretically a single linear point, preventing deep molecular interlocking between local surface ridges. Since the micro-cavities do NOT rub side-to-side, the sliding shear resistance is eliminated, leading to far smaller resistance force."
          },
          {
            id: "s3",
            question: "State the law of conservation of standard linear momentum.",
            answer: "In the absence of an external net force, the total linear momentum of an isolated system of interacting particles remains strictly constant. For two colliding spheres, m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂."
          }
        ],
        longs: [
          {
            id: "l1",
            title: "Derivation of Horizontal Projectile Escape Trajectory & Flying Metrics",
            answer: "Consider an object launched near Earth's surface with horizontal velocity v_i at an angle θ with the horizontal. \n\n1. Horizontal Motion: No external force acts horizontally (neglecting air resistance). Thus, a_x = 0. Range displacement is x(t) = (v_i cos θ)t.\n\n2. Vertical Motion: Gravitation acts downwards continuously (a_y = -g). Vertical velocity changes as v_y(t) = v_i sin θ - gt. Symmetrical flight path yields total time of flight:\n   T = (2 v_i sin θ) / g\n\n3. Range Formula: Substituting time into horizontal range: R = (v_i cos θ) * T = (v_i² sin 2θ) / g. Peak vertical elevation is given by H = (v_i² sin² θ) / 2g. These laws provide optimal firing targets for modern ballistic dynamics."
          }
        ],
        // Numericals section - highly specific mathematical problems with solvers
        specialTitle: "Numerical Practice Exercises",
        specialType: "numericals",
        specials: [
          {
            id: "num1",
            label: "Problem 1: Kinetic Velocity & Stopping Force",
            problem: "A compact vehicle of mass 1200 kg travelling at 25 m/s skates to a complete stop. If the braking friction provides a constant opposing force of 3000 N, find the deceleration and the total stopping distance.",
            formulaUsed: "F = m * a  and  v_f² - v_i² = 2as",
            steps: [
              "Step 1: Write down Given Data: Mass m = 1200 kg, Initial velocity v_i = 25 m/s, Final velocity v_f = 0 m/s (stop), Opposing force F = -3000 N.",
              "Step 2: Calculate acceleration: F = ma => a = F/m = -3000 / 1200 = -2.5 m/s² (deceleration).",
              "Step 3: Solve for distance (s) using Third Equation of Motion: v_f² - v_i² = 2as.",
              "0² - (25)² = 2 * (-2.5) * s => -625 = -5 * s => s = 125 meters.",
              "Conclusion: The deceleration is -2.5 m/s² and the car stops in exactly 125 meters."
            ],
            correctOutput: "Acceleration: -2.5 m/s², Distance: 125 m"
          },
          {
            id: "num2",
            label: "Problem 2: Orbital Space Satellite Height",
            problem: `Calculate the gravitational force of attraction between a geostationary communication satellite of mass 600 kg and the Earth (Mass of Earth = 6.0 x 10^24 kg, constant g = 6.67 x 10^-11 N.m²/kg², and distance of satellite from center is 4.2 x 10^7 meters).`,
            formulaUsed: "F = G * (m1 * m2) / r²",
            steps: [
              "Step 1: Parameters: m1 (satellite) = 600 kg, m2 (Earth) = 6.0 x 10^24 kg, G = 6.67 x 10^-11, r = 4.2 x 10^7 m.",
              "Step 2: Plug values into equation: F = (6.67 x 10^-11 * 600 * 6.0 x 10^24) / (4.2 x 10^7)².",
              "Step 3: Calculate numerator raw: 6.67 x 10^-11 * 3.6 x 10^27 = 2.4012 x 10^17.",
              "Step 4: Calculate denominator: (4.2 x 10^7)² = 1.764 x 10^15.",
              "Step 5: Solve division: F = 2.4012 x 10^17 / 1.764 x 10^15 = 136.12 Newtons.",
              "Conclusion: The earth pulls the satellite with a mechanical force of 136.12 N."
            ],
            correctOutput: "Force: 136.12 N"
          }
        ]
      };
    }

    // 2. CHEMISTRY STUDY DATA
    if (subId === "chemistry") {
      return {
        mcqs: [
          {
            id: "mc1",
            question: "Which electronic quantum number governs the absolute orientation of atomic orbitals in orbital space?",
            options: ["Magnetic Quantum Number (m)", "Principal Quantum Number (n)", "Azimuthal Quantum Number (l)", "Spin Quantum Number (s)"],
            correctIndex: 0,
            explanation: "The magnetic quantum number (m) determines the spatial orientation of orbitals around the central nucleus."
          },
          {
            id: "mc2",
            question: "Why do standard Noble gases possess extremely high ionization energies?",
            options: ["Fully paired stable outer shells", "Extremely large Bohr atomic radiuses", "High metallic crystalline lustre", "Very low nuclear charge concentration"],
            correctIndex: 0,
            explanation: "Having completely filled s & p subshells matches octet bounds, making electron removal highly endotermic."
          }
        ],
        shorts: [
          {
            id: "sc1",
            question: "What is meant by Limiting Reactant? State two steps to identify it.",
            answer: "A Limiting Reactant is the reactant in a chemical system that is completely consumed during the reaction, thus restricting and limiting the total mass of products generated.\n\nSteps to Identify:\n1. Calculate the moles of all reactants. \n2. Find the moles of targeted product that can be synthesized from each reactant. The one yielding the lowest stoichiometric mol of product is declared the Limiting Reactant."
          },
          {
            id: "sc2",
            question: "State how London Dispersion forces scale with the molecular size of halogens (F₂ to I₂).",
            answer: "As we descend from Fluorine to Iodine in Group VII-A, the atomic mass and total number of electrons increase. This expands the atomic radius, making the electronic cloud more polarizable. As polarizability scales higher, the instantaneous dipole-induced dipole forces (London forces) become remarkably stronger, turning Fluorine into a gas and Iodine into a solid."
          }
        ],
        longs: [
          {
            id: "lc1",
            title: "Postulates and Successes of Bohr's Atomic Theory",
            answer: "Niels Bohr in 1913 synthesized quantum theory and classical mechanics to construct his hydrogen atomic model: \n\n1. Postulates of the theory:\n- Electrons orbit only in distinct non-radiating paths with specified circular radius called orbits.\n- Orbiting is only possible where angular momentum satisfies integer multiples of h/2π (i.e. mvr = nh / 2π).\n- Light energy is radiated or absorbed only when electrons hop between state orbits (ΔE = E₂ - E₁ = hν).\n\n2. Success of Theory:\n- Accurately derived the Rydberg constant, explaining why hydrogen emission yields specialized Balmer/Paschen lines.\n- Determined the Bohr radius of the H-atom ground state as exactly 0.529 Angstroms. It paved the way for modern molecular design and orbitals chemistry."
          }
        ],
        specialTitle: "Stoichiometry & pH Numericals",
        specialType: "numericals",
        specials: [
          {
            id: "cnum1",
            label: "Problem 1: Nitrogen Triiodide Decomposition Yield",
            problem: "If 12.0 grams of NH₃ gas is mixed with excess iodine to generate Nitrogen Triiodide. Calculate theoretical yield moles of the salt produced. (Molecular Mass of NH₃ = 17 g/mol).",
            formulaUsed: "Moles = Mass / Molar Mass  &  Mole Ratio",
            steps: [
              "Step 1: Find initial moles of ammonia reactant: Moles = 12.0 / 17.0 = 0.706 moles of NH₃.",
              "Step 2: Balanced equation indicates: NH₃ + 3I₂ -> NI₃ + 3HI.",
              "Step 3: Mole ratio of NH₃ to NI₃ is 1 : 1.",
              "Step 4: Moles of NI₃ synthesized theoretically = 0.706 moles.",
              "Step 5: Convert moles to mass: (0.706 mol) * (394.7 g/mol molar mass of NI₃) = 278.6 grams.",
              "Conclusion: Theoretical production limit yields 278.6 grams."
            ],
            correctOutput: "Yield Moles: 0.706 mol, Mass: 278.6 g"
          }
        ]
      };
    }

    // 3. MATHEMATICS STUDY DATA
    if (subId === "math" || subId === "mathematics") {
      return {
        mcqs: [
          {
            id: "mm1",
            question: "What is the rank of a unit identity matrix of size 3x3?",
            options: ["3", "1", "0", "9"],
            correctIndex: 0,
            explanation: "All three diagonal components are linearly independent, so its rank is 3."
          },
          {
            id: "mm2",
            question: "Formulate the general nth term of an Arithmetic Progression with first step 'a' and constant difference 'd':",
            options: ["a + (n - 1)d", "a * r^(n-1)", "n * a + d", "((a + d) / n)"],
            correctIndex: 0,
            explanation: "Arithmetic sequence: T_n = a + (n-1)d."
          }
        ],
        shorts: [
          {
            id: "sm1",
            question: "Find the complex multiplicative inverse of (3, -4) complex coordination pair.",
            answer: "Let z = 3 - 4i. Multiplicative inverse is z⁻¹ = (3 + 4i) / (3² + (-4)²).\nCalculation: z⁻¹ = (3 + 4i) / (9 + 16) = (3 + 4i) / 25.\nIn coordinates: (3/25, 4/25)."
          },
          {
            id: "sm2",
            question: "Prove that a skew-symmetric matrix holds values where transpose A^t = -A.",
            answer: "A square matrix A = [a_ij] is skew-symmetric if and only if a_ij = -a_ji for all entries. This implies diagonal entries must satisfy a_ii = -a_ii => 2a_ii = 0 => a_ii = 0. Taking transpose reflects row indexes, leaving all elements matching sign inversion, thus A^t = -A."
          }
        ],
        longs: [
          {
            id: "lm1",
            title: "Solving Non-Homogeneous Liner Matrices using Cramer's Determinant Rule",
            answer: "Define system of linear variables: \n  x + 2y + z = 8 \n  2x - y + z = 3 \n  x + y - z = 1 \n\n1. Coefficient Matrix Determinant (D):\n   | 1  2  1 |\n   | 2 -1  1 | = 1(1 - 1) - 2(-2 - 1) + 1(2 - (-1)) = 0 + 6 + 3 = 9. Since D ≠ 0, a unique solution exists.\n\n2. X-Determinant (Dx) replace row-1 with [8, 3, 1]:\n   Dx = 8(0) - 2(-4) + 1(4) = 12. Thus x = 12 / 9 = 4/3.\n\n3. Y-Determinant (Dy):\n   Dy = 18. Thus y = 18 / 9 = 2.\n\n4. Z-Determinant (Dz):\n   Dz = 15. Thus z = 15 / 9 = 5/3.\n\nThese matrices determine standard linear equations intersections in 3D coordinate grids easily."
          }
        ],
        specialTitle: "Trigonometric & Calculus Step Solver",
        specialType: "numericals",
        specials: [
          {
            id: "mnum1",
            label: "Exercise 1: Limit as x approaches 0",
            problem: "Find the analytical limit as x approaches 0 of f(x) = (1 - cos(x)) / x².",
            formulaUsed: "Double angle identity & L'Hopital rule",
            steps: [
              "Step 1: Direct substitution results in indeterminate state (1 - 1) / 0 = 0/0.",
              "Step 2: Apply classic L'Hopital rule, differentiating top and bottom separately.",
              "Numerator differential: d/dx(1 - cos x) = sin x. Denominator differential: d/dx(x²) = 2x.",
              "Step 3: New limit: limit (sin x / 2x). Substituting still leaves 0/0.",
              "Step 4: Differentiate a second time: d/dx(sin x) = cos x, d/dx(2x) = 2.",
              "Step 5: Compute terminal limit value: cos(0) / 2 = 1 / 2 = 0.5.",
              "Conclusion: The limit value is exactly 0.5."
            ],
            correctOutput: "Limit: 1/2"
          }
        ]
      };
    }

    // 4. ENGLISH STUDY DATA (INCLUDING DEEPLY ELABORATE ENGLISH B NOUNS)
    if (subId === "english") {
      return {
        mcqs: [
          {
            id: "me1",
            question: "Which of the following is direct model of a complex conditional sentence type 3 (retrospective regret)?",
            options: [
              "If they had studied harder, they would have cleared the BISE exam.",
              "If they study hard, they will score well.",
              "Unless you prepare, you have no chance.",
              "They studied hard because they are ambitious."
            ],
            correctIndex: 0,
            explanation: "Type 3 expresses unfulfilled past conditions: If + past perfect, would + have + past participle."
          },
          {
            id: "me2",
            question: "Choose correct adverb of frequency from options:",
            options: ["Seldom", "Quickly", "Behind", "Yesterday"],
            correctIndex: 0,
            explanation: "'Seldom' describes how often an event occurs, which qualifies it as an adverb of frequency."
          }
        ],
        shorts: [
          {
            id: "se1",
            question: "How did the Holy Prophet (PBUH) illustrate justice and equality in Medina society?",
            answer: "The Holy Prophet (PBUH) established of unmatched standards of justice. He judged all disputes on merit, irrespective of creed, rank, or tribe. He declared that even if his own daughter Fatima (R.A) had committed a crime, she would be subject to the law of the state, demonstrating complete equality of humans."
          },
          {
            id: "se2",
            question: "Explain the central theme of the poem 'Stopping by Woods on a Snowy Evening'.",
            answer: "The central theme contrasts the alluring beauty and tranquility of rest (symbolized by the dark woods) with the reality of human responsibility (symbolized by 'promises to keep'). The poet emphasizes that duty and commitments must take precedence over temporary escapism or relaxation."
          }
        ],
        longs: [
          {
            id: "le1",
            title: "Prose Analysis & Theme: The Savior of Mankind",
            answer: "Theme Analysis:\nThe first chapter highlights the revolutionary transformation that the message of Islam brought to the pagan Arabian peninsula. Pre-Islamic Arabia was on the verge of chaotic collapse, engulfed in sectarian wars, moral decadence, and systemic ignorance. \n\nThrough the divine light conferred upon the Holy Prophet (PBUH), a broken society was unified into an incredibly resilient, enlightened empire. The prose details elements of extreme character strength, steadfastness, and divine mercy, illustrating how the ideals of truth and universal brotherhood permanently reshaped the cultural fabric of human history."
          }
        ],
        // English B segment with letters, applications, essays, active-passive tables
        specialTitle: "English B: Grammar, Letters, Applications & essays",
        specialType: "english_b",
        specials: [
          {
            id: "elit",
            label: "Formal Board Applications Structure",
            subLabel: "Application to the Principal for Fee Concession",
            content: `To,\nThe Principal,\nGovernment College / Model High School,\n(Your Board City Name e.g. Lahore / Rawalpindi).\n\nSubject: Request for Complete Concession in Tuition Fee\n\nRespected Sir,\n\nWith due profile, it is stated that my father is a humble clerk working on a meager monthly wage. Our household comprises six dependents, including three school-going children. It has become exceedingly difficult for my father to provide for the fundamental cooking utilities and bear the educational expenses of all family members in these inflated modern days.\n\nI have maintained a pristine academic record, securing 90%+ marks in the previous BISE examinations. Over the years, I have won numerous debates and science quizzes for our institution. I am highly passionate about pursuing higher studies, and do not wish for financial distress to compromise my educational dream.\n\nTherefore, I humbly request you to grant me a full fee concession. This act of kindness will enable me to study diligently and serve my esteemed country in the future.\n\nI shall be highly obliged to you for this favor.\n\nYours obediently,\nX.Y.Z (Class Reg No. #38493),\nDate: June 17, 2026.`
          },
          {
            id: "elet",
            label: "Formal Letters to Family",
            subLabel: "Letter to Father Requesting Funds for BISE Books",
            content: `Examination Hall,\nCity A.B.C,\nJune 17, 2026.\n\nMy Dear Father,\n\nAssalam-o-Alaikum,\n\nI hope this letter finds you in the pink of health and absolute high spirits. You will be glad to know that I have settled comfortably in the college hostel. Our new academic term has officially commenced, and the teachers have recommended several critical reference guides and key books for our pre-engineering BISE board syllabus preparation.\n\nTo purchase these volumes along with chemistry laboratory notebooks, I require an additional sum of Rs. 4,500. This is a crucial, one-time study expenditure that will support my preparation for the board board exams.\n\nTherefore, I kindly request you to send this amount via online bank transfer or EasyPaisa at your earliest convenience. I am putting in my absolute best efforts and hope to secure top positions in the final results.\n\nPlease pay my humblest regards to dearest Mother and love to younger siblings.\n\nYour loving son,\nX.Y.Z`
          },
          {
            id: "e_essay",
            label: "Model Essay Outlines & Content",
            subLabel: "Topic: The Role of Social Media in Modern Education",
            content: `1. INTRODUCTION\nIn the contemporary era, social media has expanded far beyond simple interpersonal texting to emerge as a formidable pedagogical asset. Applications like YouTube, academic forums, WhatsApp groups, and Pinterest boards now serve as dynamic channels for educational exchange.\n\n2. MAIN BODY ARGUMENTS\n- Democratization of Resources: Students in far-flung rural districts of Pakistan (such as Gilgit Baltistan or South Punjab) can easily view world-class lectures on Physics, Calculus, and Languages free of cost.\n- Collaboration hubs: Classrooms form digital networks, where doubts are cleared overnight, and peer-to-peer sharing flourishes.\n- Dynamic Grounded learning: Animated graphs and simulated science laboratories make complex physics concepts interactive and easier to digest.\n\n3. DRAWBACKS & CHALLENGES\nUnrestrained exposure to these apps leads to severe distraction, attention span degradation, and exposure to unverified mock information. Balancing social media usage is essential to prevent academic decay.\n\n4. CONCLUSION\nSocial media is a dual-edged sword. When utilized with absolute discipline and under strict school guidelines, it serves as a powerful catalyst for modern education, enabling competitive growth across global bounds.`
          },
          {
            id: "egram",
            label: "Active and Passive / Direct-Indirect Rules",
            subLabel: "Board Standard Grammar Practice Tables",
            content: `**Active / Passive Transform Rules:**\n- Present Simple: Active (Subject + V1 + Object) -> Passive (Object + is/am/are + V3 + by + Subject)\n- Past Simple: Active (Subject + V2 + Object) -> Passive (Object + was/were + V3 + by + Subject)\n- Present Perfect: Active (Subject + have/has + V3) -> Passive (Object + have/has + been + V3)\n\n**Example Sentence Drill:**\n- Active: The board secretary announced the date sheet.\n  Passive: The date sheet was announced by the board secretary.\n- Active: Teachers conduct regular test sessions.\n  Passive: Regular test sessions are conducted by the teachers.\n\n**Direct & Indirect Speech Transforms:**\n- Rule: When reporting verb is in past tense, change internal present tenses to corresponding past tenses.\n- Direct: She said, "I am writing a chemistry chapter summary."\n  Indirect: She said that she was writing a chemistry chapter summary.\n- Direct: The examiner said, "Do not open the test sheet booklets yet."\n  Indirect: The examiner forbade them from opening the test sheet booklets then.`
          }
        ]
      };
    }

    // 5. URDU STUDY DATA (FULLY NATIVE URDU LANGUAGE FOR URDU B OR URDU A)
    if (subId === "urdu") {
      return {
        mcqs: [
          {
            id: "mu1",
            question: "مصنف نظیر احمد کے زمرے میں، ان میں سے کونسی شہرہ آفاق کتاب ان کے قلم سے لکھی گئی ہے؟",
            options: ["توبۃ النصوح", "آبِ حیات", "دستک", "مسدس حالی"],
            correctIndex: 0,
            explanation: "توبۃ النصوح مولانا نظیر احمد کا ایک بہترین اصلاحی ناول ہے۔"
          },
          {
            id: "mu2",
            question: "شعری اصطلاح میں، غزل کے آخری شعر کو کیا کہا جاتا ہے جس میں شاعر اپنا تخلص استعمال کرتا ہے؟",
            options: ["مقطع", "مطلع", "قافیہ", "ردیف"],
            correctIndex: 0,
            explanation: "مقطع غزل کا آخری شعر ہوتا ہے جس میں شاعر اپنا تخلص پیش کرتا ہے۔"
          }
        ],
        shorts: [
          {
            id: "su1",
            question: "سبق 'اسوہ حسنہ' کی روشنی میں بتائیں کہ اخلاقِ نبوی صلی اللہ علیہ وآلہ وسلم کا سب سے بڑا وصف کیا ہے؟",
            answer: "حضور اکرمؐ کا وجودِ مبارک تمام انسانیت کے لیے رحمت و شفقت اور عفو و درگزر کا اعلیٰ ترین نمونہ ہے۔ آپؐ نے سخت ترین دشمنوں کو بھی معاف فرمایا اور زندگی کے تمام شعبوں میں عدل اور مساوات کے زریں اصول قائم کیے۔"
          },
          {
            id: "su2",
            question: "نثر پارہ کی تشریح کے لیے سیاق و سباق سے کیا مراد ہے؟",
            answer: "سیاق و سباق سے مراد یہ ہے کہ دیا گیا نثر پارہ سبق کے کس حصے سے لیا گیا ہے، اس سے پہلے کون سے اہم واقعات رونما ہوئے اور اس کے بعد مصنف کیا کہنا چاہتا ہے۔ عام طور پر یہ ۶ سے ۸ جملوں پر مشتمل ہوتا ہے۔"
          }
        ],
        longs: [
          {
            id: "lu1",
            title: "سبق 'سفرنامہ' کی نظریاتی و تنقیدی تلخیص",
            answer: "یہ سبق ہمیں مختلف ممالک کے سفر کی تعلیمی اور تہذیبی اہمیت سے متعارف کرواتا ہے۔ مصنف نے پاکستان اور بیرونِ ممالک کے تعلیمی نظام، وقت کی پابندی اور معاشرتی نظم و ضبط کا خوبصورت موازنہ پیش کیا ہے۔ ہمیں اپنے ملک کو ترقی یافتہ بنانے کے لیے جدید علوم اور محنتِ شاقہ کی ضرورت ہے تاکہ ہم عالمی سطح پر باوقار مقام حاصل کر سکیں۔"
          }
        ],
        // Urdu B and Special text: Khulasa, Salees, Tashreeh
        specialTitle: "اردو ب: قواعد، خلاصہ جات اور تشریحات",
        specialType: "urdu_b",
        specials: [
          {
            id: "u_khulasa",
            label: "سبق کا خلاصہ (BISE پیٹرن کے مطابق)",
            subLabel: "عنوان: سبق 'امتحان' (مصنف: مرزا فرحت اللہ بیگ)",
            content: `مصنف اپنے امتحان کے تجربات کو بڑے مزاحیہ انداز میں بیان کرتے ہیں۔ وہ لکھتے ہیں کہ انہوں نے دو سال لا کلاس میں گزارے مگر پڑھائی کے نام پر خاک نہ جانا۔ دوستوں اور گھر والوں کو یقین دلانے کے لیے کہ وہ دن رات محنت کر رہے ہیں، وہ بس اپنے کمرے کے دروازے بند کر لیتے تھے۔ جب امتحانات کا وقت قریب آیا تو انہوں نے والد صاحب سے عرض کی کہ تیاری مکمل ہے۔\n\nامتحانی مرکز میں مصنف نے اپنی تسلی کے لیے نگرانِ کار سے مدد مانگنے کی کوشش کی لیکن نگران انتہائی سخت نکلے۔ پرچہ سوالات دیکھ کر انہیں اندازہ ہوا کہ سوائے اپنے نام کے انہیں کچھ نہیں آتا۔ مصنف نے پرچہ خالی چھوڑنے کے بجائے ادھر ادھر کی باتیں لکھ ماریں۔ جب نتیجہ آیا تو وہ تمام مضامین میں بری طرح فیل ہو گئے۔ مصنف نے کمالِ ہوشیاری سے سارا الزام ممتحن کی بے انصافی پر ڈال دیا۔ والد صاحب نے تسلی دی کہ کوئی بات نہیں، اگلے سال دوبارہ امتحان دے دینا۔ اس طرح مرزا فرحت اللہ بیگ نے امتحانی نظام اور طلباء کے جھوٹے بہانوں پر بھرپور چوٹ کی ہے۔`
          },
          {
            id: "u_salees",
            label: "سیاق و سباق کے ساتھ سلیس اردو",
            subLabel: "اقتباس کی سلیس: 'انسان کی زندگی ایک سفر ہے، جس کا کوئی نہ کوئی مقصد ہونا چاہیے...'",
            content: `**حوالہ متن:**\nسبق کا عنوان: اسوہ حسنہ صلی اللہ علیہ وآلہ وسلم\nمصنف کا نام: سید سلیمان ندوی\n\n**سیاق و سباق:**\nیہ اقتباس سبق کے درمیانی حصے سے لیا گیا ہے۔ مصنف اس سے پہلے یہ بتا چکے ہیں کہ دنیا میں مکمل رہنمائی کے لیے ایک کامل ترین نمونے کی ضرورت ہے۔ اس کے بعد وہ واضح کرتے ہیں کہ انسانی کردار کے تمام پہلوؤں کی اصلاح صرف اسوہ رسولؐ کی پیروی سے ہی ممکن ہے۔\n\n**سہل/سلیس اردو:**\nمصنف کہتے ہیں کہ انسان کی دنیاوی حیات دراصل ایک مسلسل سفر کی مانند ہے اور ایک بامقصد زندگی ہی خوبصورت نتائج لا سکتی ہے۔ جو لوگ بنا کسی اعلیٰ مقصد کے جیتے ہیں وہ اپنی منزل سے بھٹک جاتے ہیں۔ حضور پاکؐ کی پاکیزہ زندگی ہمارے لیے وہ اعلیٰ ترین مقصد اور راستہ فراہم کرتی ہے جس پر چل کر ہم ابدی کامیابی سے ہمکنار ہو سکتے ہیں۔`
          },
          {
            id: "u_tashreeh",
            label: "اشعار کی تشریح (غزل و نظم)",
            subLabel: "شعر: 'محبت میں نہیں ہے فرق جینے اور مرنے کا / اسی کو دیکھ کر جیتے ہیں جس کافر پہ دم نکلے'",
            content: `**حوالہ شعر:**\nشاعر کا نام: مرزا اسد اللہ خان غالب\nصنف: غزل\n\n**مفہوم:**\nعشق کی حالت میں زندگی اور موت کا فرق مٹ جاتا ہے۔ ہم اپنے محبوب کی ایک جھلک دیکھ کر ہی دوبارہ زندہ ہوتے ہیں خواہ اسی پر ہماری جان ہی کیوں نہ نکل رہی ہو۔\n\n**تفصیلی تشریح:**\nغالب نے اس شعر میں روایتی ردیف اور صوفیانہ افکار کو یکجا کیا ہے۔ وہ کہتے ہیں کہ سچی محبت میں ہجر و وصال، جینا اور مرنا یکساں ہو جاتے ہیں۔ عاشق کے لیے جینے کی تمنا صرف اس لیے ہے کہ وہ اپنے محبوب کا چہرہ دیکھ سکے۔ اگر محبوب سامنے ہو تو موت کی تکلیف بھی لذت میں بدل جاتی ہے۔ غالب کی یہ جمالیاتی رمز عاشق کی بے خودی اور فنائیت کو کمال مہارت سے ظاہر کرتی ہے۔ یہ شعر اردو کلاسیکی شاعری کی ایک لافانی مثال ہے۔`
          },
          {
            id: "u_grammar",
            label: "اردو قواعد و گرامر (سابقے لاحقے اور رموزِ اوقاف)",
            subLabel: "بورڈ امتحانات کے اہم ترین گرائمر قوانین",
            content: `**۱۔ سابقے اور لاحقے:**\n- **سابقے:** وہ لفظ یا حرف جو کسی بامعنی لفظ کے شروع میں لگانے سے نیا لفظ بنا دے۔\n  مثال: 'با' (باادب، باوقار)، 'بے' (بے وقوف، بے عمل)، 'ان' (ان پڑھ، ان دیکھا)۔\n- **لاحقے:** وہ لفظ یا حرف جو کسی بامعنی لفظ کے آخر میں لگانے سے نیا لفظ بنا دے۔\n  مثال: 'ناک' (خوفناک، دردناک)، 'دان' (قلم دان، نمک دان)، 'گر' (کاریگر، کیمیا گر)۔\n\n**۲۔ رموزِ اوقاف (Punctuation):**\n- **سکتہ (،):** مختصر ترین وقفہ، جیسے: احمد، علی اور اسلم اسکول گئے۔\n- **رابطہ (::):** تفصیل یا قول پیش کرنے کے لیے، جیسے: قائدِ اعظم نے فرمایا: "کام، کام اور بس کام۔"\n- **تفصیلیہ (:-):** کسی چیز کی تفصیل سے پہلے، جیسے: مندرجہ ذیل امور درج ذیل ہیں:-\n\n**۳۔ امدادی افعال (Auxiliary Verbs):**\n- فعلِ اول کے ساتھ مل کر معنی میں اصرار یا نکھار پیدا کرنے والے فعل کو امدادی فعل کہتے ہیں۔\n- مثال: 'لینا' سے 'کام کر لینا'، 'جانا' سے 'وہ سو گیا'۔`
          }
        ]
      };
    }

    // Default Fallback
    return {
      mcqs: [
        {
          id: "m_def",
          question: `Which fundamental principle is central to the board syllabus of ${activeSubjectInfo?.name}?`,
          options: ["Critical logical induction", "Literal textbook memorization", "Both analytical skills and conceptual application", "Unverified claims"],
          correctIndex: 2,
          explanation: "BISE Punjab and Federal Boards emphasize both structured conceptual retention and clear logical inquiry."
        }
      ],
      shorts: [
        {
          id: "s_def",
          question: `Give a high-level overview of Chapter: "${chName}"`,
          answer: `This chapter covers the essential definitions and standard theories of ${activeSubjectInfo?.name}. Practice solving historical past papers of ${currentBoard} to review the typical analytical question patterns.`
        }
      ],
      longs: [
        {
          id: "l_def",
          title: "Detailed Board Examination Essay Plan",
          answer: "To maximize scores in long essay items:\n1. Open with crisp definitions or Quranic/literary references.\n2. Dedicate at least two distinct paragraphs to logical or mathematical derivations.\n3. Mention real practical applications of the theory in current industrial or socio-economic contexts.\n4. Conclude with a solid summary matching the recommended textbook outline."
        }
      ],
      specialTitle: "Syllabus Practice Exercises",
      specialType: "numericals",
      specials: [
        {
          id: "snum1",
          label: "Analytical Practice Problem",
          problem: "Review your standard textbook exercises for this chapter to solve the related analytical problems.",
          formulaUsed: "Given board syllabus models",
          steps: [
            "Step 1: Check the syllabus outline from your textbook index.",
            "Step 2: Read the clear solved examples provided in your standard guide book.",
            "Step 3: Solve the practice exercises independently and cross-check with solutions."
          ],
          correctOutput: "Refer to textbook keys"
        }
      ]
    };
  }, [selectedSubjectId, selectedChapterId, activeChapter, currentClass, currentBoard]);

  return (
    <div id="chapter_wise_study_view" className="text-slate-800 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-100 pb-5 gap-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
              New Academic Module
            </span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
              {currentClass} Class
            </span>
          </div>
          <h2 className="text-xl font-display font-black text-slate-800 mt-2 flex items-center gap-2">
            <BookOpen className="text-violet-600" size={24} />
            Chapter-Wise Real Study Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse important board questions, detailed answers, Urdu B (Khulasa, Salees, Tashreeh) and English B models tailored to <strong className="text-slate-700">{currentBoard}</strong>.
          </p>
        </div>
      </div>

      {/* 1. Subject Selectors */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((sub) => {
          const isActive = selectedSubjectId === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 border ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${sub.color}`} />
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* No active syllabus filter guard */}
      {!activeSyllabus || activeSyllabus.chapters.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          <BookOpenIcon className="mx-auto text-slate-300 mb-2" size={32} />
          <h4 className="font-semibold text-slate-700 text-sm">Syllabus Not Set For This Class</h4>
          <p className="text-xs">Add subjects or populate the curriculum inside the Syllabus Archive tab to access study metrics.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Chapter Selector list */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1 uppercase tracking-wider">
              <span>Course Chapters</span>
              <span>{activeSyllabus.chapters.length} Units</span>
            </div>
            
            <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
              {activeSyllabus.chapters.map((ch) => {
                const isSelected = selectedChapterId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setSelectedChapterId(ch.id);
                      setUserSelectedMCQs({});
                      setShowMCQAnswers({});
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl border text-xs transition-all flex items-start space-x-2.5 group ${
                      isSelected
                        ? "bg-white border-indigo-500 text-slate-800 shadow-xs font-semibold"
                        : "bg-transparent border-transparent text-slate-600 hover:bg-white hover:border-slate-200"
                    }`}
                  >
                    <BookOpenIcon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                    <div className="leading-tight flex-1">
                      <p className={`${isSelected ? "text-indigo-900" : "text-slate-700"}`}>
                        {ch.name}
                      </p>
                      {ch.completed && (
                        <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-600 mt-1 font-bold">
                          <CheckCircle size={10} />
                          <span>Finished</span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 text-[11px] text-indigo-800 space-y-1">
              <span className="font-bold uppercase tracking-wider text-[9px] text-indigo-500 block">Syllabus Sync</span>
              <p>Completing units here works hand-in-hand with the main board tracker on your dashboard dashboard.</p>
            </div>

            {/* Focus Study Timer Card (Moved to Chapter Study as requested!) */}
            <div className="bg-indigo-950 text-white rounded-2xl p-5 text-center mt-3 border border-indigo-800 shadow-sm">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">Pomodoro Focus Active</span>
              <h4 className="text-xs font-bold text-indigo-100 mt-1 mb-3">Minimalist Focus Timer</h4>

              <div className="w-28 h-28 bg-indigo-900/50 shadow-xs border border-indigo-700/85 rounded-full mx-auto flex flex-col justify-center items-center mb-4 relative">
                <span className="text-xl font-bold font-mono text-white">
                  {formatTimer(timeSpent)}
                </span>
                <span className="text-[8px] text-indigo-300 uppercase tracking-widest mt-1 font-semibold">
                  {isTimerRunning ? "Deep Studying..." : "Deep Focus"}
                </span>

                {isTimerRunning && (
                  <div className="absolute inset-1.5 border border-dashed border-indigo-400 rounded-full animate-spin"></div>
                )}
              </div>

              <div className="space-y-3">
                <div className="text-left select-subject">
                  <label className="text-[9px] font-bold text-indigo-300 uppercase tracking-wide block mb-1">Focus Subject</label>
                  <select
                    value={timerSubject}
                    onChange={(e) => setTimerSubject(e.target.value)}
                    className="w-full text-[11px] px-2.5 py-1.5 bg-indigo-900 border border-indigo-700 rounded-lg outline-none cursor-pointer text-white font-semibold"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id} className="bg-indigo-950 text-white">{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-1.5 justify-center">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                      isTimerRunning
                        ? "bg-slate-200 text-slate-800 hover:bg-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-500"
                    }`}
                  >
                    {isTimerRunning ? "Pause" : "Start 25m"}
                  </button>

                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimeSpent(1500);
                    }}
                    className="px-2.5 py-1.5 bg-indigo-900 hover:bg-indigo-850 text-indigo-200 hover:text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Material Display desk */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden p-6 shadow-xs space-y-6">
            
            {/* Header displaying targeted selection */}
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {activeSubjectInfo?.name} • Chapter Review
              </span>
              <h3 className="text-base font-bold text-slate-800 mt-1">
                {activeChapter?.name || "Select a Chapter"}
              </h3>
            </div>

            {/* Quick study material tabs switcher */}
            <div className="flex border-b border-slate-100 overflow-x-auto gap-1 p-0.5 scrollbar-thin bg-slate-50 rounded-xl">
              <button
                onClick={() => setActiveStudyTab("mcq")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                  activeStudyTab === "mcq"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <HelpCircle size={14} />
                <span>MCQs Practice</span>
              </button>

              <button
                onClick={() => setActiveStudyTab("topics")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                  activeStudyTab === "topics"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Sparkles size={14} className="text-violet-500 shrink-0" />
                <span>Important Topics</span>
              </button>
              
              <button
                onClick={() => setActiveStudyTab("short")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                  activeStudyTab === "short"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText size={14} />
                <span>Short Questions</span>
              </button>
              
              <button
                onClick={() => setActiveStudyTab("long")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                  activeStudyTab === "long"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <PenTool size={14} />
                <span>Long Questions</span>
              </button>

              <button
                onClick={() => setActiveStudyTab("special")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                  activeStudyTab === "special"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-indigo-600 hover:bg-white/70"
                }`}
              >
                {selectedSubjectId === "english" || selectedSubjectId === "urdu" ? (
                  <Languages size={14} />
                ) : (
                  <Binary size={14} />
                )}
                <span>
                  {selectedSubjectId === "english"
                    ? "English B (Grammar & Letters)"
                    : selectedSubjectId === "urdu"
                      ? "اردو قواعد، سلیس و خلاصہ"
                      : "Numerical Solves"}
                </span>
              </button>
            </div>

            {/* TAB CONTENT RENDERING */}
            <div className="space-y-4">
              
              {/* === TAB 1: MCQS PRACTICE === */}
              {activeStudyTab === "mcq" && studyData && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500 flex items-start gap-2">
                    <Sparkles className="text-indigo-500 mt-0.5 shrink-0" size={14} />
                    <p>Click your options directly to get instant color answers and board explanations. Perfect for BISE Section A prep!</p>
                  </div>

                  <div className="space-y-5">
                    {studyData.mcqs.map((q, idx) => {
                      const selectedOptionIndex = userSelectedMCQs[q.id];
                      const isAnswerRevealed = showMCQAnswers[q.id] || selectedOptionIndex !== undefined;

                      return (
                        <div key={q.id} className="border border-slate-100 rounded-xl p-4 bg-white/50 space-y-3 shadow-2xs">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-start">
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md mr-1.5 text-[10px]">Q.{idx + 1}</span>
                            <span className="flex-1">{q.question}</span>
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {q.options.map((opt, oIdx) => {
                              const isCorrect = oIdx === q.correctIndex;
                              const isSelected = selectedOptionIndex === oIdx;
                              
                              let btnClass = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700";
                              if (isAnswerRevealed) {
                                if (isCorrect) {
                                  btnClass = "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";
                                } else if (isSelected) {
                                  btnClass = "bg-rose-50 border-rose-300 text-rose-800 font-semibold";
                                } else {
                                  btnClass = "bg-slate-50 border-slate-200 opacity-60 text-slate-400";
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={isAnswerRevealed}
                                  onClick={() => {
                                    setUserSelectedMCQs((prev) => ({ ...prev, [q.id]: oIdx }));
                                  }}
                                  className={`px-4 py-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {isAnswerRevealed && isCorrect && <Check size={14} className="text-emerald-600 ml-1 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>

                          {isAnswerRevealed && (
                            <div className="mt-2.5 p-3 rounded-lg bg-indigo-50/50 text-[11px] text-indigo-900 border border-indigo-100">
                              <span className="font-bold flex items-center gap-1">
                                <Lightbulb size={12} className="text-indigo-500" /> Key Explanation:
                              </span>
                              <p className="mt-1 leading-normal">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* === TAB 1.5: IMPORTANT TOPICS WITH DIAGRAMS & VIDEOS === */}
              {activeStudyTab === "topics" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 rounded-xl p-3.5 text-xs text-slate-600 flex items-start gap-2.5">
                    <Sparkles className="text-violet-600 mt-0.5 shrink-0 animate-bounce" size={16} />
                    <div>
                      <p className="font-bold text-slate-800">Important Chapter Topics Desk</p>
                      <p className="mt-0.5 leading-normal">Prepared custom explanations in Roman Urdu, embedded visual board schematics, and grounded Sabaq Foundation & ilmkidunya video feeds for target exams.</p>
                    </div>
                  </div>

                  {getTopicsForChapter(selectedSubjectId, activeChapter?.name || "").map((topic, tIdx) => (
                    <div key={tIdx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs space-y-4 p-5">
                      {/* Topic Name Header */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs">
                            {tIdx + 1}
                          </span>
                          <h4 className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight">
                            {topic.name}
                          </h4>
                        </div>
                        <span className="text-[10px] bg-violet-50 text-violet-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Critical Board Topic
                        </span>
                      </div>

                      {/* Explanation in Roman Urdu */}
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-extrabold uppercase tracking-widest block w-fit">
                          💡 Roman Urdu Explanation (سمجھنے کے لئے)
                        </span>
                        <p className="text-xs sm:text-sm text-slate-705 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                          {topic.romanUrdu}
                        </p>
                      </div>

                      {/* Diagram Section */}
                      <div className="space-y-2">
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-extrabold uppercase tracking-widest block w-fit">
                          📊 Board Model Diagram / Interactive Visual
                        </span>
                        <div className="rounded-xl overflow-hidden shadow-xs">
                          <TopicDiagram type={topic.diagramType} />
                        </div>
                        <p className="text-[10px] text-slate-450 leading-relaxed italic block mt-1">
                          Fig {tIdx + 1}.a: {topic.name} schematic mapping. Keep this structure practiced for quick drawing in board exams.
                        </p>
                      </div>

                      {/* Rich diagram content annotations */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/80">
                        <strong className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Key Analytical Specifications:</strong>
                        <pre className="text-xs font-mono text-slate-600 mt-1 whitespace-pre-wrap leading-normal font-sans tracking-tight">
                          {topic.content}
                        </pre>
                      </div>

                      {/* Video Grounding Player */}
                      {topic.videoUrl && (
                        <div className="rounded-xl overflow-hidden shadow-xs border border-slate-200 mt-2 bg-slate-100">
                          <div className="bg-slate-50 px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between border-b border-slate-200">
                            <span className="flex items-center gap-1">📺 Free Board Lecture Video Grounding</span>
                            <span className="text-indigo-600 font-mono">Official Feed</span>
                          </div>
                          <div className="aspect-video w-full h-[300px]">
                            <iframe
                              src={topic.videoUrl}
                              className="w-full h-full"
                              title={topic.videoTitle}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              referrerPolicy="no-referrer"
                            ></iframe>
                          </div>
                          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
                            <div>
                              <h5 className="text-xs font-bold text-slate-805 leading-tight">{topic.videoTitle}</h5>
                              <p className="text-[10px] text-slate-400 leading-normal mt-0.5">High-quality targeted, web-search indexed educational guide for the {activeSubjectInfo?.name} syllabus.</p>
                            </div>
                            <a 
                              href={topic.videoUrl.replace("/embed/", "/watch?v=")} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold font-sans transition-all flex items-center gap-1 shrink-0"
                            >
                              Open YT
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {activeStudyTab === "short" && studyData && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-500 flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span>BISE Standard: Worth 2 Marks each</span>
                    <span>Total {studyData.shorts.length} Items</span>
                  </div>

                  <div className="space-y-4">
                    {studyData.shorts.map((q, idx) => (
                      <div key={q.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <div className="bg-slate-50 px-4 py-2.5 font-bold text-xs sm:text-sm text-slate-800 border-b border-slate-200/85">
                          Short Q.{idx + 1}: {q.question}
                        </div>
                        <div className="p-4 text-xs sm:text-sm leading-relaxed text-slate-600 whitespace-pre-line bg-white font-serif">
                          <strong className="text-indigo-700 block mb-1 text-xs font-sans uppercase tracking-wider">Board Model Answer:</strong>
                          {q.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* === TAB 3: LONG OUTLINES === */}
              {activeStudyTab === "long" && studyData && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    Syllabus Section C essay & conceptual derivation models. Earn up to 6 marks per item easily.
                  </div>

                  <div className="space-y-4 font-serif">
                    {studyData.longs.map((q, idx) => (
                      <div key={q.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <div className="bg-slate-100/80 px-4 py-3 font-display font-black text-xs sm:text-base text-slate-900 border-b border-slate-200 flex justify-between">
                          <span>Long Task {idx + 1}: {q.title}</span>
                          <span className="text-slate-400 font-sans text-xs">Exams Model</span>
                        </div>
                        <div className="p-5 text-xs sm:text-sm leading-relaxed text-slate-700 whitespace-pre-line bg-amber-50/10">
                          <h5 className="font-sans font-bold text-indigo-700 text-xs uppercase tracking-wider mb-2">Detailed Syllabus Solution Outline:</h5>
                          {q.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* === TAB 4: SUBJECT SPECIFIC EXTRA (ENGLISH B, URDU B, NUMERICAL SOLVER) === */}
              {activeStudyTab === "special" && studyData && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                    <Award className="text-amber-500" size={18} />
                    {studyData.specialTitle}
                  </h4>

                  {/* 4A: Numericals (Physics/Chem/Math) */}
                  {studyData.specialType === "numericals" && (
                    <div className="space-y-4 text-xs sm:text-sm">
                      {studyData.specials.map((num) => (
                        <div key={num.id} className="border border-indigo-100 rounded-xl overflow-hidden bg-white">
                          <div className="bg-indigo-50/60 px-4 py-2.5 border-b border-indigo-100 flex justify-between items-center">
                            <span className="font-bold text-indigo-900">{num.label}</span>
                            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold font-mono">
                              {num.formulaUsed}
                            </span>
                          </div>

                          <div className="p-4 space-y-4">
                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-slate-700 leading-relaxed italic">
                              <strong>Statement:</strong> {num.problem}
                            </div>

                            <div className="space-y-2">
                              <span className="text-indigo-700 font-bold text-xs uppercase tracking-wider block">Step-By-Step Solution Path:</span>
                              <div className="bg-white border border-slate-200/80 rounded-lg p-3.5 space-y-2.5 text-xs font-mono text-slate-600">
                                {num.steps.map((step, sIdx) => (
                                  <div key={sIdx} className="flex">
                                    <span className="text-slate-400 mr-2 shrink-0">{sIdx + 1}.</span>
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-lg p-3 text-xs flex justify-between items-center font-bold">
                              <span>Final Analytical Answer:</span>
                              <span className="font-mono bg-emerald-100/55 px-2.5 py-1 rounded">{num.correctOutput}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 4B: English B */}
                  {studyData.specialType === "english_b" && (
                    <div className="space-y-4">
                      {studyData.specials.map((spec) => (
                        <div key={spec.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                          <div className="bg-slate-50 px-4 py-2.5 font-bold text-xs sm:text-sm text-slate-800 border-b border-slate-200">
                            {spec.label}: <span className="font-medium text-slate-600 ml-1">{spec.subLabel}</span>
                          </div>
                          
                          <div className="p-4 bg-white text-xs sm:text-sm leading-relaxed text-slate-700 font-sans whitespace-pre-wrap">
                            {spec.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 4C: Urdu B */}
                  {studyData.specialType === "urdu_b" && (
                    <div className="space-y-4" dir="rtl">
                      {studyData.specials.map((spec) => (
                        <div key={spec.id} className="border border-red-100 rounded-xl overflow-hidden bg-white">
                          <div className="bg-red-50/50 px-4 py-3 font-bold text-xs sm:text-base text-red-900 border-b border-red-100">
                            {spec.label}: <span className="font-medium text-slate-600 mr-2 text-xs sm:text-sm">{spec.subLabel}</span>
                          </div>
                          
                          <div className="p-5 bg-white text-xs sm:text-sm leading-relaxed text-slate-800 font-serif whitespace-pre-wrap leading-loose">
                            {spec.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
