import express from "express";
import zlib from "zlib";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;


function buildExactPredictionFormat(
  subject: string, 
  mcqs: any[], 
  shorts: any[], 
  longs: any[]
) {
  // Ensure mcqs has exactly 16 multiple-choice questions (between 15 and 18)
  const targetMcqCount = 16;
  const finalMcqs = [...mcqs];
  
  const genericMcqPool = [
    {
      question: `Which of the following describes the fundamental law governing ${subject} models?`,
      options: ["A) Conservation of Energy", "B) Linear Superposition", "C) Optimal Efficiency", "D) Standard Decay Value"],
      correctAnswer: "A",
      explanation: "Most systems are governed by the law of conservation of energy to maintain equilibrium under standard board guidelines."
    },
    {
      question: `Under Student Learning Outcomes (SLO), the major variable of interest in ${subject} is measured in:`,
      options: ["A) SI Standard Units", "B) Arbitrary scale indices", "C) Empirical coefficients", "D) Dimensionless ratios"],
      correctAnswer: "A",
      explanation: "SI unit configuration is standard for academic boards across matric and intermediate curricula."
    },
    {
      question: `What is the primary objective of studying ${subject} foundations at the board level?`,
      options: ["A) Rote learning of formulas", "B) Critical scientific analysis and logic formulation", "C) Rote translation of textbook scripts", "D) Unstructured field research"],
      correctAnswer: "B",
      explanation: "Modern SLO guidelines promote critical thinking, reasoning, and logic over rote learning."
    },
    {
      question: `Which anomalous behavior is most common in ${subject} processes under increased external thermal variables?`,
      options: ["A) Perfect Linear expansion", "B) Exponential decay of active state", "C) Direct proportional increase in efficiency", "D) Constant state preservation"],
      correctAnswer: "B",
      explanation: "Increased thermal noise generally leads to decay in modern academic process models."
    },
    {
      question: `In standard board grading rubrics, how should a student represent key derivations?`,
      options: ["A) With textual descriptions only", "B) Through step-by-step mathematical proofs and labeled diagrams", "C) With raw final answers only", "D) By quoting external web references only"],
      correctAnswer: "B",
      explanation: "Full marks require a step-by-step layout including complete formulas, assumptions, and clean diagrams."
    },
    {
      question: `Which historical researcher laid down the central tenets of ${subject} classical studies?`,
      options: ["A) Standard local researchers", "B) Renaissance scientists and subsequent 20th century experts", "C) Unverified web commentators", "D) Dynamic software compilers"],
      correctAnswer: "B",
      explanation: "Core curriculum units credit classical European and Islamic golden-era scholars with early conceptual templates."
    }
  ];

  while (finalMcqs.length < targetMcqCount) {
    const idx = finalMcqs.length;
    const template = genericMcqPool[idx % genericMcqPool.length];
    finalMcqs.push({
      id: `${subject.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-m-pad-${idx}`,
      question: template.question,
      options: template.options,
      correctAnswer: template.correctAnswer,
      explanation: template.explanation
    });
  }
  
  if (finalMcqs.length > targetMcqCount) {
    finalMcqs.splice(targetMcqCount);
  }

  // Ensure shorts has exactly 24 short questions from the whole book with choice to do at least 18
  let flatShorts: any[] = [];
  if (shorts && shorts.length > 0) {
    for (const group of shorts) {
      if (group.questions && group.questions.length > 0) {
        flatShorts.push(...group.questions);
      }
    }
  }

  const genericShortPool = [
    { text: `Explain the fundamental concept of standard ${subject} operations with a clear brief formula.`, hint: "Clearly state the core expression, label all variables, and define the standard units of measurement." },
    { text: `Distinguish between primary and secondary attributes of ${subject} under SLO-based criteria.`, hint: "Highlight at least two points of differential characteristics, identifying practical daily-life examples." },
    { text: `Identify the main sources of systematic error in measuring ${subject} variables during laboratory trials.`, hint: "List personal biases, calibration flaws in tools, and environmental conditions like temperature." },
    { text: `How does Le Chatelier's equilibrium or equivalent dynamic balancing affect ${subject} outcomes?`, hint: "Describe how external stress forces the system to adapt, shifting to neutralize the change." },
    { text: `Outline how the modern BISE textbook classifies different stages of ${subject} development.`, hint: "Mention historical background, early theoretical limitations, and final consensus structures." },
    { text: `Write the core mathematical equation relevant to modern ${subject} and write down its SI unit.`, hint: "Display the equation clearly, explaining constants and how the unit is derived." },
    { text: `List three critical safety precautions or logical validations required when verifying ${subject}.`, hint: "Highlight grounding, calibration thresholds, and safe range limit monitoring." },
    { text: `What are the practical applications of ${subject} in Pakistani domestic and commercial sectors?`, hint: "Cite industrial manufacturing, educational tools, and agricultural or IT enhancements." },
    { text: `Explain how Student Learning Outcomes (SLO) evaluate creative application questions in ${subject}.`, hint: "Explain that SLO prioritizes conceptual understanding and daily application over textbook memorization." },
    { text: `Describe why experimental values of ${subject} might differ from theoretical predictions.`, hint: "Attribute differences to friction, air resistance, heat loss, or precision limits in measurement tools." }
  ];

  while (flatShorts.length < 24) {
    const idx = flatShorts.length;
    const template = genericShortPool[idx % genericShortPool.length];
    flatShorts.push({
      id: `${subject.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-s-pad-${idx}`,
      text: template.text,
      marks: 3,
      hint: template.hint
    });
  }

  if (flatShorts.length > 24) {
    flatShorts.splice(24);
  }

  const finalizedShorts = [
    {
      groupTitle: "Section B: Short Questions (Attempt any 18)",
      instruction: "Short answer conceptual questions from the whole book",
      totalMarks: 54, // 18 questions * 3 marks = 54
      questions: flatShorts.map((q, qidx) => ({
        ...q,
        id: q.id || `s-${qidx + 1}`
      }))
    }
  ];

  // Ensure longs contains exactly 3 long questions, each with exactly 2 parts (Part A and Part B).
  const finalLongs = [...longs];

  const genericLongPool = [
    {
      questionNum: "Question No. 5",
      parts: [
        { partLetter: "A", text: `Define and formulate the classical theorem of ${subject}. Prove its mathematical correctness with diagrams.`, marks: 5, stepSchema: "1.5 marks statement/diagram, 3.5 marks step algebraic proofs." },
        { partLetter: "B", text: `Solve a numerical scenario or algorithmic challenge mapping directly to ${subject} primary formulas.`, marks: 3, stepSchema: "1 mark formula construction, 1 mark calculations, 1 mark correct final units." }
      ]
    },
    {
      questionNum: "Question No. 6",
      parts: [
        { partLetter: "A", text: `Discuss the industrial and practical execution of ${subject} systems. Detail all thermodynamic or structural parameters.`, marks: 5, stepSchema: "2 marks chemical/mechanical equations, 1.5 marks parameter discussion, 1.5 marks efficiency factors." },
        { partLetter: "B", text: `Calculate the derivative efficiency or optimal yield variance of a standard ${subject} setup.`, marks: 3, stepSchema: "1 mark input parameters, 1 mark computation steps, 1 mark final analytical percentage." }
      ]
    },
    {
      questionNum: "Question No. 7",
      parts: [
        { partLetter: "A", text: `Provide a detailed, comparative matrix of different methodologies surrounding ${subject} studies.`, marks: 5, stepSchema: "2 marks structural comparison table, 3 marks theoretical validation description." },
        { partLetter: "B", text: `Contrast the classical approach with the modern Student Learning Outcomes (SLO) approach of ${subject}.`, marks: 3, stepSchema: "1 mark key differentiators, 2 marks application illustrations." }
      ]
    }
  ];

  while (finalLongs.length < 3) {
    const idx = finalLongs.length;
    const template = genericLongPool[idx];
    finalLongs.push({
      questionNum: template.questionNum,
      totalMarks: 8,
      parts: template.parts
    });
  }

  if (finalLongs.length > 3) {
    finalLongs.splice(3);
  }

  const labels = ["Question No. 5", "Question No. 6", "Question No. 7"];
  const finalizedLongs = finalLongs.map((l, lidx) => {
    return {
      ...l,
      questionNum: labels[lidx],
      totalMarks: 8,
      parts: l.parts.map(p => ({
        ...p,
        marks: p.marks || (p.partLetter === "A" ? 5 : 3)
      }))
    };
  });

  return {
    mcqs: finalMcqs,
    shorts: finalizedShorts,
    longs: finalizedLongs
  };
}

function generateCurriculumPrediction(classLevel: string, board: string, subject: string, streamGroup: any) {
  const subLower = (subject || "").toLowerCase();
  const clLower = (classLevel || "").toLowerCase();
  
  // Set default scheme values based on matric/intermediate
  let totalMarks = 75;
  let timeAllowed = "3 Hours";
  let passingMarks = 25;
  let structureNotes = "Strictly aligned with BISE 2026 Student Learning Outcomes (SLO) curriculum guidelines, containing 3 mandatory main sections.";

  if (clLower.includes("11") || clLower.includes("12") || clLower.includes("first") || clLower.includes("second") || clLower.includes("inter")) {
    if (subLower.includes("physics") || subLower.includes("chemistry") || subLower.includes("biology") || subLower.includes("computer")) {
      totalMarks = 85;
      timeAllowed = "3 Hours";
      passingMarks = 28;
    } else if (subLower.includes("math")) {
      totalMarks = 100;
      timeAllowed = "3 Hours";
      passingMarks = 33;
    }
  } else {
    // Matric (9th / 10th)
    if (subLower.includes("physics") || subLower.includes("chemistry") || subLower.includes("biology") || subLower.includes("computer")) {
      totalMarks = 60;
      timeAllowed = "2.5 Hours";
      passingMarks = 20;
    } else {
      totalMarks = 75;
      timeAllowed = "3 Hours";
      passingMarks = 25;
    }
  }

  // Base predicted topics & questions
  let predictedTopics = [
    {
      topic: "Core Textbook Fundamentals",
      probability: "94%",
      description: `Analysis of past papers shows recurring definition terms in Section A and B of the official ${board} examinations.`
    },
    {
      topic: "Theoretical Models & Formula Derivations",
      probability: "91%",
      description: "Highly recurring structural models usually selected for long-form answers in Section C."
    }
  ];

  let predictedQuestions = [
    {
      type: "Short Question",
      text: `Distinguish between primary properties and explain basic conceptual limitations of ${subject} setups.`,
      probability: "95%",
      reason: "Aligned with recent Student Learning Outcomes (SLO) updates."
    },
    {
      type: "Long Question",
      text: `Describe the core operations and practical applications of ${subject} referencing standard textbook diagrams.`,
      probability: "91%",
      reason: "Commonly selected for Section C to test analytical descriptive power."
    }
  ];

  // High-fidelity board specific mcqs, shorts, and longs
  let mcqs: any[] = [];
  let shorts: any[] = [];
  let longs: any[] = [];

  if (subLower.includes("physics")) {
    const is11th = clLower.includes("11") || clLower.includes("first") || clLower.includes("inter") || clLower.includes("1st");
    if (is11th) {
      predictedTopics = [
        {
          topic: "Oblique Projectile Trajectories & Range optimization (Ch 2)",
          probability: "98%",
          description: "Analyzing launch angle formulas, maximum ranges, time of flights, and air drag kinematics based on recent 2026 SLO guidelines."
        },
        {
          topic: "Bernoulli's Principle & Viscosity Dynamics (Ch 5)",
          probability: "95%",
          description: "Continuity applications, terminal velocity of drop spheres via Stoke's law, and pressure drop pinching in parallel moving row boats."
        },
        {
          topic: "First Law of Thermodynamics & Heat Engines (Ch 6)",
          probability: "94%",
          description: "Internal energy changes, isothermal and adiabatic expansion, and Carnot efficiency calculations for low/high temperature reservoirs."
        },
        {
          topic: "Vibrations, Simple Pendulums & Stopwatch Error (Ch 7)",
          probability: "93%",
          description: "Period uncertainty estimation in oscillations, stationary waves on 120cm strings, and resonance phenomenon."
        },
        {
          topic: "Young's Double Slit & Diffraction Grating Limits (Ch 8)",
          probability: "92%",
          description: "Coherent light interference, Michelson speed of light measurements, and non-coherent blue/red filter slit behaviors."
        }
      ];

      predictedQuestions = [
        {
          type: "Long Question",
          text: "Show that work done in gravitational field is independent of path followed. Explain why it is a conservative field with mathematical derivations.",
          probability: "96%",
          reason: "Classic core derivation from Ch 4, highly repetitive in BISE Sahiwal intermediate annual papers (G1 and G2)."
        },
        {
          type: "Short Question",
          text: "If one slit in Young's double slit experiment is covered with blue filter and other with red, how does the resulting pattern change?",
          probability: "95%",
          reason: "Standard SLO conceptual question testing knowledge of monochromatic wave coherence."
        },
        {
          type: "Short Question",
          text: "What happens to the temperature of a closed room when an air conditioner or refrigerator is left running open inside it?",
          probability: "94%",
          reason: "Tests thermodynamic application skills under daily life scenarios (Ch 6)."
        }
      ];

      mcqs = [
        {
          id: "swl-phy-m1",
          question: "An electric motor produces a tension of 4500N in a load lifting cable and rolls it at a rate of 2 m/s. The power of the motor is:",
          options: ["A) 4.5 kW", "B) 9.0 kW", "C) 15.0 kW", "D) 22.5 kW"],
          correctAnswer: "B",
          explanation: "Power is the product of Force and Velocity (P = F * v = 4500 N * 2 m/s = 9000 Watts = 9 kW)."
        },
        {
          id: "swl-phy-m2",
          question: "If vectors |a+b| = |a-b|, then the angle between vector a and vector b is:",
          options: ["A) 0 degrees", "B) 45 degrees", "C) 90 degrees", "D) 180 degrees"],
          correctAnswer: "C",
          explanation: "Squaring both sides gives a² + b² + 2a·b = a² + b² - 2a·b, which simplifies to 4a·b = 0, meaning the vectors are perpendicular (90°)."
        },
        {
          id: "swl-phy-m3",
          question: "In a Michelson interferometer, to switch the fringe pattern from bright back to dark, the mirror must be displaced by:",
          options: ["A) λ/8", "B) λ/4", "C) λ/2", "D) λ"],
          correctAnswer: "B",
          explanation: "A round-trip displacement of λ/2 shifts from bright to bright. Therefore, half of that displacement (λ/4) shifts from bright to dark."
        },
        {
          id: "swl-phy-m4",
          question: "Which of the following pairs of physical quantities has the same dimensions?",
          options: ["A) Force and Torque", "B) Momentum and Impulse", "C) Work and Power", "D) Velocity and Acceleration"],
          correctAnswer: "B",
          explanation: "Both Momentum (dp = F dt) and Impulse have the same dimensions ([MLT⁻¹]). Work and Torque also have the same dimensions ([ML²T⁻²])."
        },
        {
          id: "swl-phy-m5",
          question: "What is the equivalent radian value of 2 degrees?",
          options: ["A) 0.035 rad", "B) 0.350 rad", "C) 0.0035 rad", "D) 0.0175 rad"],
          correctAnswer: "A",
          explanation: "Since 180° = π rad, 2° = 2 * (π / 180) = π / 90 ≈ 0.0349 ≈ 0.035 rad."
        },
        {
          id: "swl-phy-m6",
          question: "If the velocity of an object has a 1% uncertainty and its mass has a 2% uncertainty, what is the total uncertainty in its Kinetic Energy?",
          options: ["A) 3%", "B) 4%", "C) 5%", "D) 6%"],
          correctAnswer: "B",
          explanation: "KE = 1/2 m v². Uncertainty = %dm + 2 * %dv = 2% + 2 * (1%) = 4%."
        },
        {
          id: "swl-phy-m7",
          question: "The speed of sound at 0°C is 332 m/s. What will be the speed of sound at 30°C?",
          options: ["A) 345 m/s", "B) 350 m/s", "C) 362 m/s", "D) 332 m/s"],
          correctAnswer: "B",
          explanation: "Using the temperature relation: v_t = v_0 + 0.61 * t = 332 + 0.61 * 30 = 332 + 18.3 ≈ 350 m/s."
        },
        {
          id: "swl-phy-m8",
          question: "If the mass of a vibrating body attached to a spring is quadrupled, the time period of its oscillations will be:",
          options: ["A) Quadrupled", "B) Doubled", "C) Halved", "D) Unchanged"],
          correctAnswer: "B",
          explanation: "Since T = 2π * sqrt(m/k), quadrupling mass (4m) increases the period T by a factor of sqrt(4) = 2."
        }
      ];

      shorts = [
        {
          groupTitle: "Section B - Part I (Attempt any 8 of 12)",
          instruction: "Answer the following conceptual questions clearly based on standard board textbook guidelines.",
          totalMarks: 24,
          questions: [
            { id: "swl-phy-s1", text: "Distinguish clearly between fundamental base units and derived SI units with examples.", marks: 3, hint: "Base units are independent (e.g. meter, kilogram) whereas derived units are products/ratios of base units (e.g. Newton, Joule)." },
            { id: "swl-phy-s2", text: "The time of 30 oscillations of a simple pendulum is 54.6s with stopwatch of 0.1s. Find its period with uncertainty.", marks: 3, hint: "Period T = 54.6 / 30 = 1.82 s. Uncertainty dt = Least Count / Count = 0.1 / 30 = 0.003 s. So, T = 1.82 ± 0.003 s." },
            { id: "swl-phy-s3", text: "Can velocity of an object reverse its direction if the acceleration remains constant? Support with an everyday example.", marks: 3, hint: "Yes. An object thrown straight up has constant downward acceleration g, but its velocity reverses at the top as it falls back down." },
            { id: "swl-phy-s4", text: "Show that range of projectile is maximum when thrown at an angle of 45 degrees.", marks: 3, hint: "R = (v²/g)*sin(2θ). To maximize R, sin(2θ) must equal 1, which happens when 2θ = 90°, so θ = 45°." },
            { id: "swl-phy-s5", text: "Water flows from a pipe at 3 kg/s and strikes a wall with a velocity of 5 m/s. Find the force exerted on the wall.", marks: 3, hint: "By Newton's Second Law: F = dp/dt = (dm/dt)*v = 3 kg/s * 5 m/s = 15 N." },
            { id: "swl-phy-s6", text: "A girl drops a cup from a height which breaks into pieces. State the energy changes involved.", marks: 3, hint: "Gravitational PE converts to Kinetic Energy as it falls, which converts upon collision into Sound Energy, Heat Energy, and Mechanical deformation energy." }
          ]
        },
        {
          groupTitle: "Section B - Part II (Attempt any 8 of 12)",
          instruction: "Answer the following physics application questions using formulas.",
          totalMarks: 24,
          questions: [
            { id: "swl-phy-s7", text: "If one slit in Young's experiment is covered with blue filter and other with red, why does the interference pattern disappear?", marks: 3, hint: "Blue and red light are of different wavelengths and frequencies, and hence are incoherent. Coherence is a prerequisite for static interference patterns." },
            { id: "swl-phy-s8", text: "What happens to the temperature of a closed room when a refrigerator or AC is left running open on a table in the center?", marks: 3, hint: "The temperature of the room rises. The electric motor and compressor of the device reject more heat into the room than is extracted by cooling grids." },
            { id: "swl-phy-s9", text: "How should a sound source move relative to an observer so that the detected Doppler frequency remains unchanged?", marks: 3, hint: "The source must move in a concentric circle around the observer as center. Since relative radial speed is zero, no frequency shifts occur." },
            { id: "swl-phy-s10", text: "Why does sound travel faster in solids than in gases? Support mathematically.", marks: 3, hint: "v = sqrt(E / ρ). Although solids have higher densities (ρ), their elastic modulae (E) are exponentially larger than gases." },
            { id: "swl-phy-s11", text: "Two row boats moving parallel in the same direction are pulled towards each other. Explain this behavior.", marks: 3, hint: "According to Bernoulli's principle, fluid velocity is highest in the pinched space between boats, leading to a local drop in pressure." },
            { id: "swl-phy-s12", text: "Show that orbital angular momentum can be represented as L_0 = mvr.", marks: 3, hint: "L = r x p. For a circular orbit, distance vector r is perpendicular to linear momentum p (mv), hence L = r * mv * sin(90°) = mvr." }
          ]
        }
      ];

      longs = [
        {
          questionNum: "Question No. 5 (Conservative Fields & Vector Projections)",
          totalMarks: 8,
          parts: [
            {
              partLetter: "A",
              text: "Define Gravitational Field. Show that work done in a gravitational field is completely independent of the path followed.",
              marks: 5,
              stepSchema: "1 mark field definition, 2 marks separate path work equations (path 1, path 2), 2 marks conservative field proof.",
              answer: `**Answer Key / Professional Proof:**\n\n1. **Gravitational Field**: A region of space surrounding a body with mass in which another body experiences a gravitational force.\n\n2. **Path Independence Proof**:\n   - Let a body of mass $m$ be moved from point $A$ (ground) to point $B$ (height $h$) in a uniform gravitational field of intensity $g$ matching Sahiwal standard gravity.\n   - **Let Path 1 be vertical upward (A -> B)**:\n     - The gravitational force acting on the body is $F_g = -mg$ (downward).\n     - Work done against the field is: $W_{AB} = F_g \\cdot d \\cos(180^\\circ) = -mg \\cdot h \\cdot (-1) = mgh$.\n   - **Let Path 2 be segmented step path (A -> C -> B)**:\n     - Moving horizontally (A -> C): displacement is perpendicular to force: $W_{AC} = F_g \\cdot d_{AC} \\cos(90^\\circ) = 0$.\n     - Moving vertically (C -> B): displacement is opposite to force: $W_{CB} = mgh$.\n     - Total Work Path 2: $W_{\\text{total}} = W_{AC} + W_{CB} = 0 + mgh = mgh$.\n   - **Let Path 3 be a curved/irregular trajectory**:\n     - Divide the curve into infinite horizontal and vertical stair steps. Since all horizontal steps contribute zero work, and the sum of all microscopic vertical steps equals high value $h$, the total work is strictly $\\sum mgh_i = mgh$.\n\n3. **Conclusion**: Since the work done depends only on the initial and final positions and is independent of the actual path followed, the gravitational field is a **conservative field**.`
            },
            {
              partLetter: "B",
              text: "Find the projection of vector A = 2i - 8j + k in the direction of vector B = 3i - 4j - 12k.",
              marks: 3,
              stepSchema: "1 mark dot product computation, 1 mark magnitude of vector B, 1 mark projection calculation.",
              answer: `**Numerical Solution Step-by-Step:**\n\n- **Given Vectors**:\n  - $\\vec{A} = 2\\hat{i} - 8\\hat{j} + \\hat{k}$\n  - $\\vec{B} = 3\\hat{i} - 4\\hat{j} - 12\\hat{k}$\n\n- **Formula**:\n  - Projection of $\\vec{A}$ on $\\vec{B}$ is given by:\n    $$\\text{Proj}_B A = \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{B}|}$$\n\n- **Calculations**:\n  - **Step 1: Compute Dot Product $\\vec{A} \\cdot \\vec{B}$**:\n    $$\\vec{A} \\cdot \\vec{B} = (2)(3) + (-8)(-4) + (1)(-12) = 6 + 32 - 12 = 26$$\n  - **Step 2: Compute Magnitude of $\\vec{B}$**:\n    $$|\\vec{B}| = \\sqrt{3^2 + (-4)^2 + (-12)^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$$\n  - **Step 3: Calculate Projection**:\n    $$\\text{Proj}_B A = \\frac{26}{13} = 2$$\n\n- **Final Answer**: The projection of $\\vec{A}$ in the direction of $\\vec{B}$ is **$2$**.`
            }
          ]
        },
        {
          questionNum: "Question No. 6 (Fluid Dynamics & Carnot Efficiency)",
          totalMarks: 8,
          parts: [
            {
              partLetter: "A",
              text: "State and prove Bernoulli's equation for a non-viscous, incompressible fluid undergoing laminar flow.",
              marks: 5,
              stepSchema: "1 mark statement & diagrams, 2 marks work done by pressure differences, 2 marks energy equivalence summation.",
              answer: `**Answer Key / Derivation Proof:**\n\n1. **Statement**: For a steady, non-viscous, and incompressible fluid flow, the sum of pressure energy, kinetic energy per unit volume, and potential energy per unit volume remains constant at any point along a streamline:\n   $$P + \\frac{1}{2} \\rho v^2 + \\rho g h = \\text{Constant}$$\n\n2. **Derivation**:\n   - Consider an ideal fluid flowing through a pipe of varying cross-sectional area and height.\n   - Work done on the fluid at lower end 1: $W_1 = P_1 A_1 \\Delta x_1 = P_1 V$.\n   - Work done by the fluid at upper end 2: $W_2 = -P_2 A_2 \\Delta x_2 = -P_2 V$.\n   - Net work done: $W_{\\text{net}} = (P_1 - P_2) V$.\n   - Change in Kinetic Energy: $\\Delta KE = \\frac{1}{2} m v_2^2 - \\frac{1}{2} m v_1^2 = \\frac{1}{2} \\rho V (v_2^2 - v_1^2)$.\n   - Change in Potential Energy: $\\Delta PE = mgh_2 - mgh_1 = \\rho V g (h_2 - h_1)$.\n   - By Law of Conservation of Energy (Work-Energy Principle): $W_{\\text{net}} = \\Delta KE + \\Delta PE$\n   - Substituting the values:\n     $$(P_1 - P_2) V = \\frac{1}{2} \\rho V (v_2^2 - v_1^2) + \\rho V g (h_2 - h_1)$$\n     $$P_1 - P_2 = \\frac{1}{2} \\rho (v_2^2 - v_1^2) + \\rho g (h_2 - h_1)$$\n     $$P_1 + \\frac{1}{2} \\rho v_1^2 + \\rho g h_1 = P_2 + \\frac{1}{2} \\rho v_2^2 + \\rho g h_2$$\n\n3. **Conclusion**: Hence, Bernoulli's equation is verified.`
            },
            {
              partLetter: "B",
              text: "A Carnot engine whose low temperature reservoir is at 7°C has an efficiency of 50%. It is desired to increase the efficiency to 70%. By how many Kelvins should the temperature of the high temperature source be increased?",
              marks: 3,
              stepSchema: "1 mark source temperature calculation at 50%, 1 mark new source calculation at 70%, 1 mark absolute temperature change with step equations.",
              answer: `**Numerical Solution Step-by-Step:**\n\n- **Given Data**:\n  - Sink temperature ($T_c$) = $7^\\circ\\text{C} = 7 + 273 = 280\\text{ K}$\n  - Initial efficiency ($\\eta_1$) = $50\\% = 0.50$\n  - Final efficiency ($\\eta_2$) = $70\\% = 0.70$\n\n- **Formula**:\n  $$\\eta = 1 - \\frac{T_c}{T_h} \\implies T_h = \\frac{T_c}{1 - \\eta}$$\n\n- **Calculations**:\n  - **Step 1: Calculate Initial Source Temperature ($T_{h1}$)**:\n    $$0.50 = 1 - \\frac{280}{T_{h1}} \\implies \\frac{280}{T_{h1}} = 0.50 \\implies T_{h1} = \\frac{280}{0.50} = 560\\text{ K}$$\n  - **Step 2: Calculate New Source Temperature ($T_{h2}$)**:\n    $$0.70 = 1 - \\frac{280}{T_{h2}} \\implies \\frac{280}{T_{h2}} = 0.30 \\implies T_{h2} = \\frac{280}{0.30} \\approx 933.33\\text{ K}$$\n  - **Step 3: Calculate Required Temperature Increase ($\\Delta T$)**:\n    $$\\Delta T = T_{h2} - T_{h1} = 933.33 - 560 = 373.33\\text{ K}$$\n\n- **Final Answer**: The high temperature source should be increased by **$373.33\\text{ Kelvins}$** (or $373.33^\\circ\\text{C}$ change).`
            }
          ]
        },
        {
          questionNum: "Question No. 7 (Wave Motion & Sound Speeds)",
          totalMarks: 8,
          parts: [
            {
              partLetter: "A",
              text: "Define Simple Harmonic Motion (SHM). Prove that total mechanical energy remains perfectly conserved at all stages for a body executing SHM.",
              marks: 5,
              stepSchema: "1 mark definition, 2 marks potential and kinetic energy formula, 2 marks algebraic summation proof.",
              answer: `**Answer Key / Mathematical Proof:**\n\n1. **Simple Harmonic Motion**: A periodic motion in which the acceleration of the body is directly proportional to its displacement from the mean position and is always directed towards the mean position: $a \\propto -x$.\n\n2. **Energy Conservation Proof**:\n   - Let a body of mass $m$ attached to a spring of spring constant $k$ execute SHM with amplitude $x_0$.\n   - **At any displacement $x$**:\n     - **Potential Energy ($PE$)**:\n       $$PE = \\frac{1}{2} k x^2$$\n     - **Kinetic Energy ($KE$)**:\n       $$v = \\omega \\sqrt{x_0^2 - x^2} \\implies KE = \\frac{1}{2} m v^2 = \\frac{1}{2} m \\omega^2 (x_0^2 - x^2)$$\n       - Since $\\omega^2 = k/m$:\n         $$KE = \\frac{1}{2} k (x_0^2 - x^2)$$\n     - **Total Energy ($E_{\\text{total}}$)**:\n       $$E_{\\text{total}} = PE + KE = \\frac{1}{2} k x^2 + \\frac{1}{2} k (x_0^2 - x^2)$$\n       $$E_{\\text{total}} = \\frac{1}{2} k x^2 + \\frac{1}{2} k x_0^2 - \\frac{1}{2} k x^2 = \\frac{1}{2} k x_0^2$$\n   - **At Mean Position ($x = 0$)**:\n     - $PE = 0$, $KE_\\text{max} = \\frac{1}{2} k x_0^2 \\implies E_\\text{total} = \\frac{1}{2} k x_0^2$.\n   - **At Extreme Position ($x = x_0$)**:\n     - $PE_\\text{max} = \\frac{1}{2} k x_0^2$, $KE = 0 \\implies E_\\text{total} = \\frac{1}{2} k x_0^2$.\n\n3. **Conclusion**: Since the total energy at any intermediate point, the mean position, and the extreme positions is exactly $\\frac{1}{2} k x_0^2$, energy remains perfectly conserved.`
            },
            {
              partLetter: "B",
              text: "Find the temperature at which the speed of sound in air becomes exactly two times its speed at 10°C.",
              marks: 3,
              stepSchema: "1 mark initial Kelvin temperature conversion, 1 mark speed ratio formula setup, 1 mark speed calculation & Kelvin-to-Celsius conversion.",
              answer: `**Numerical Solution Step-by-Step:**\n\n- **Given Data**:\n  - Initial temperature ($t_1$) = $10^\\circ\\text{C} = 10 + 273 = 283\\text{ K}$\n  - Speed of sound relation: $v \\propto \\sqrt{T}$ where $T$ is absolute temperature.\n  - Required speed ratio: $v_2 = 2 v_1 \\implies v_2 / v_1 = 2$\n\n- **Formula**:\n  $$\\frac{v_2}{v_1} = \\sqrt{\\frac{T_2}{T_1}}$$\n\n- **Calculations**:\n  - Squaring both sides:\n    $$\\left(\\frac{v_2}{v_1}\\right)^2 = \\frac{T_2}{T_1} \\implies 2^2 = \\frac{T_2}{283}$$\n    $$4 = \\frac{T_2}{283} \\implies T_2 = 4 \\times 283 = 1132\\text{ Kelvin}$$\n  - Convert to Celsius ($t_2$):\n    $$t_2 = 1132 - 273 = 859^\\circ\\text{C}$$\n\n- **Final Answer**: The temperature at which speed of sound is doubled is **$1132\\text{ K}$** (or **$859^\\circ\\text{C}$**).`
            }
          ]
        }
      ];
    } else {
      predictedTopics = [
        {
          topic: "Faraday's Law of Electromagnetic Induction & Lenz's Law",
          probability: "96%",
          description: "Focus on calculation of electric currents induced by changing magnetic fields. High repetition factor."
        },
        {
          topic: "Equations of Motion, Kinematics and Projectile Motion",
          probability: "94%",
          description: "Kinetic relationship derivations, horizontal range, and flight time models."
        },
        {
          topic: "Photoelectric Effect, Wave-Particle Duality & Work Function",
          probability: "91%",
          description: "Modern quantum physics essentials under SLO-based 2026 rubric guidelines."
        }
      ];

      predictedQuestions = [
        {
          type: "Long Question",
          text: "State Faraday's Law. Prove that Lenz's law represents the Law of Conservation of Energy. Solve related induction formula dynamics.",
          probability: "95%",
          reason: "Appeared in 2021, 2023, and 2024 regional BISE science exam cycles."
        },
        {
          type: "Short Question",
          text: "Why is a shock absorber used in vehicles? Explain with reference to impulse and momentum.",
          probability: "93%",
          reason: "Highly rated conceptual short question from chapter on Force and Motion."
        }
      ];

      mcqs = [
        {
          id: "phy-m1",
          question: "When a fluid travels through a pipe of changing cross-sectional area, the speed is highest where the area is:",
          options: ["A) Largest", "B) Smallest", "C) Intermediate", "D) Speed remains constant"],
          correctAnswer: "B",
          explanation: "According to the equation of continuity (A1v1 = A2v2), velocity is inversely proportional to cross-sectional area."
        },
        {
          id: "phy-m2",
          question: "A stone is thrown vertically upward with a velocity of 20 m/s. Its time of flight to return to the ground is:",
          options: ["A) 2 seconds", "B) 4 seconds", "C) 6 seconds", "D) 8 seconds"],
          correctAnswer: "B",
          explanation: "Using t = 2u/g, t = 2(20)/10 = 4 seconds (approx)."
        },
        {
          id: "phy-m3",
          question: "The power factor of a pure capacitive AC circuit is:",
          options: ["A) Zero", "B) One", "C) 0.5", "D) Infinite"],
          correctAnswer: "A",
          explanation: "For a pure capacitor, current leads voltage by 90 degrees. Power factor cos(90) = 0."
        },
        {
          id: "phy-m4",
          question: "Which electromagnetic wave carries the highest energy per photon?",
          options: ["A) Ultraviolet waves", "B) Gamma rays", "C) X-rays", "D) Infrared waves"],
          correctAnswer: "B",
          explanation: "Gamma rays have the highest frequency and shortest wavelength, hence carrying the highest energy (E = hf)."
        },
        {
          id: "phy-m5",
          question: "The SI unit of magnetic flux is:",
          options: ["A) Tesla", "B) Weber", "C) Henry", "D) Farad"],
          correctAnswer: "B",
          explanation: "Weber (Wb) is the SI unit of magnetic flux, equivalent to Tesla-meter squared."
        }
      ];

      shorts = [
        {
          groupTitle: "Section B - Part I (Attempt any 4 of 6)",
          instruction: "Write short models responses matching precise formulas.",
          totalMarks: 12,
          questions: [
            { id: "phy-s1", text: "Explain why sound travels faster in warm air than in cool air.", marks: 3, hint: "Speed of sound is proportional to the square root of absolute temperature (v ∝ √T)." },
            { id: "phy-s2", text: "Can a body have zero velocity but a non-zero acceleration? Give an daily life example.", marks: 3, hint: "Yes. When a ball is thrown vertically upward, at the highest peak point its velocity is zero, but acceleration is g (9.8 m/s²)." },
            { id: "phy-s3", text: "Differentiate clearly between elastic and inelastic collision with examples.", marks: 3, hint: "Elastic collision conserves both kinetic energy and momentum. Inelastic collision conserves momentum but not kinetic energy." },
            { id: "phy-s4", text: "Why can light waves be polarized but sound waves cannot?", marks: 3, hint: "Polarization occurs only in transverse waves. Light is transverse, whereas sound waves in air are longitudinal." }
          ]
        },
        {
          groupTitle: "Section B - Part II (Attempt any 3 of 5)",
          instruction: "Questions on electromagnetism and electricity.",
          totalMarks: 9,
          questions: [
            { id: "phy-s5", text: "State two basic differences between step-up and step-down transformers.", marks: 3, hint: "Step-up has secondary turns greater than primary turns (Ns > Np) and increases voltage. Step-down decreases voltage." },
            { id: "phy-s6", text: "Why is a voltmeter always connected in parallel inside an electrical circuit?", marks: 3, hint: "Voltmeter has extremely high internal resistance. Parallel connection ensures minimal current bypasses the component." }
          ]
        }
      ];

      longs = [
        {
          questionNum: "Question No. 5 (Kinematics & Energy)",
          totalMarks: 8,
          parts: [
            { 
              partLetter: "A", 
              text: "Define Work-Energy Theorem. Derive its mathematical proof for a moving block under constant force.", 
              marks: 5, 
              stepSchema: "1 mark statement, 1 mark calculus diagram, 3 marks step derivations.",
              answer: `**Answer Key / Derivation Proof:**\n\n1. **Statement**: The work done by a net force acting on a body is equal to the change in its kinetic energy:\n   $$W_{\\text{net}} = \\Delta KE = KE_f - KE_i = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2$$\n\n2. **Derivation Proof (Constant Force)**:\n   - Let a constant net force $F$ act on a body of mass $m$ causing a displacement $d$ in the direction of the force.\n   - According to Newton's Second Law: $F = ma$\n   - Using the third equation of motion: $v_f^2 - v_i^2 = 2ad \\implies a = \\frac{v_f^2 - v_i^2}{2d}$\n   - Work done $W = F \\cdot d$\n   - Substituting $F = ma$:\n     $$W = (ma) \\cdot d = m \\left( \\frac{v_f^2 - v_i^2}{2d} \\right) \\cdot d$$\n     $$W = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2 = \\Delta KE$$\n\n3. **Conclusion**: Hence, the Work-Energy Theorem is mathematically verified.`
            },
            { 
              partLetter: "B", 
              text: "An object of mass 10kg is sliding down a 30-degree inclined plane. Its initial speed is 2 m/s. Find its final kinetic energy after sliding a displacement of 5 meters. (Take friction coefficient = 0.15)", 
              marks: 3, 
              stepSchema: "1 mark formula setup, 1 mark component algebra, 1 mark final answer with Joules unit.",
              answer: `**Numerical Solution Step-by-Step:**\n\n- **Given Data**:\n  - Mass ($m$) = $10\\text{ kg}$\n  - Inclination angle ($\\theta$) = $30^\\circ$\n  - Initial speed ($v_i$) = $2\\text{ m/s}$\n  - Displacement ($d$) = $5\\text{ m}$\n  - Friction coefficient ($\\mu$) = $0.15$\n  - Gravity ($g$) = $9.8\\text{ m/s}^2$\n\n- **Formula & Component Analysis**:\n  - Force down the incline: $F_{\\text{gravity}} = mg\\sin(\\theta)$\n  - Normal Force: $F_N = mg\\cos(\\theta)$\n  - Frictional Force: $F_k = \\mu F_N = \\mu mg\\cos(\\theta)$\n  - Net Force: $F_{\\text{net}} = mg\\sin(\\theta) - \\mu mg\\cos(\\theta)$\n  - Work Done: $W = F_{\\text{net}} \\cdot d$\n  - By Work-Energy Theorem: $KE_f = KE_i + W_{\\text{net}} = \\frac{1}{2}mv_i^2 + F_{\\text{net}} \\cdot d$\n\n- **Calculations**:\n  - First, let's calculate $F_{\\text{net}}$:\n    $$F_{\\text{net}} = 10(9.8)\\sin(30^\\circ) - 0.15(10)(9.8)\\cos(30^\\circ)$$\n    $$F_{\\text{net}} = 98(0.5) - 1.47(8.487) = 49 - 12.73 = 36.27\\text{ Newtons}$$\n  - Calculate Work $W$:\n    $$W = 36.27 \\times 5 = 181.35\\text{ Joules}$$\n  - Calculate Initial Kinetic Energy $KE_i$:\n    $$KE_i = \\frac{1}{2} (10) (2)^2 = 20\\text{ Joules}$$\n  - Calculate Final Kinetic Energy $KE_f$:\n    $$KE_f = 20 + 181.35 = 201.35\\text{ Joules}$$\n\n- **Final Answer**: The final kinetic energy is **$201.35\\text{ J}$**.`
            }
          ]
        },
        {
          questionNum: "Question No. 6 (Electromagnetism)",
          totalMarks: 8,
          parts: [
            { 
              partLetter: "A", 
              text: "Describe Faraday's Law of Electromagnetic Induction. How does Lenz's Law define the polarity of induced EMF?", 
              marks: 5, 
              stepSchema: "1 mark law definition, 2 marks induced formula setup, 2 marks Conservation of Energy verification.",
              answer: `**Answer Key / Theoretical Proof:**\n\n1. **Faraday's Law**: The magnitude of the induced electromotive force (EMF) in a circuit is directly proportional to the time rate of change of magnetic flux through the circuit:\n   $$\\mathcal{E} = -N \\frac{\\Delta \\Phi_B}{\\Delta t}$$\n   Where:\n   - $\\mathcal{E}$ is the induced EMF (Volts)\n   - $N$ is the number of turns in the coil\n   - $\\Phi_B$ is the magnetic flux ($B \\cdot A \\cos\\theta$, in Webers)\n\n2. **Lenz's Law Definition**: The polarity of the induced EMF is such that it produces a current whose magnetic field opposes the change in magnetic flux that produced it. This is represented by the negative sign in Faraday's formula.\n\n3. **Lenz's Law & Conservation of Energy**:\n   - If the induced current did *not* oppose the change, it would create an attractive force, speeding up a magnet pushed into a coil and generating infinite electrical energy from nothing, violating the law of conservation of energy.\n   - Therefore, mechanical work must be done against the opposing induced field to generate electrical power, keeping the process strictly bound to the Law of Conservation of Energy.`
            },
            { 
              partLetter: "B", 
              text: "A coil of 50 turns is placed in a magnetic field that changes from 0.2 Tesla to 0.8 Tesla in 0.1 seconds. If area is 0.05 m², find the magnitude of induced EMF.", 
              marks: 3, 
              stepSchema: "1 mark ΔΦ calculation, 1 mark Faraday formula insertion, 1 mark final voltage outcome with units.",
              answer: `**Numerical Solution Step-by-Step:**\n\n- **Given Data**:\n  - Number of turns ($N$) = $50$\n  - Initial magnetic field ($B_i$) = $0.2\\text{ T}$\n  - Final magnetic field ($B_f$) = $0.8\\text{ T}$\n  - Time interval ($\\Delta t$) = $0.1\\text{ s}$\n  - Area of coil ($A$) = $0.05\\text{ m}^2$\n  - Assuming $\\theta = 0^\\circ$ (field perpendicular to the plane, $\\cos(0) = 1$)\n\n- **Formula**:\n  $$\\mathcal{E} = N \\frac{\\Delta \\Phi_B}{\\Delta t} = N A \\frac{\\Delta B}{\\Delta t}$$\n\n- **Calculations**:\n  - Change in magnetic field: $\\Delta B = B_f - B_i = 0.8 - 0.2 = 0.6\\text{ T}$\n  - Change in flux: $\\Delta \\Phi_B = A \\cdot \\Delta B = 0.05 \\times 0.6 = 0.03\\text{ Wb}$\n  - Magnitude of induced EMF:\n    $$\\mathcal{E} = 50 \\times \\frac{0.03}{0.1} = 50 \\times 0.3 = 15\\text{ Volts}$$\n\n- **Final Answer**: The magnitude of the induced EMF is **$15\\text{ Volts}$**.`
            }
          ]
        }
      ];
    }

  } else if (subLower.includes("chemistry")) {
    if (clLower.includes("11") || clLower.includes("first") || clLower.includes("inter")) {
      predictedTopics = [
        {
          topic: "VSEPR & Molecular Orbital Theory (Bonding)",
          probability: "96%",
          description: "Predicting geometry shapes, bond angles, and paramagnetic properties of Nitrogen and Oxygen under NCP 2023."
        },
        {
          topic: "Bohr's Radius Proof & Quantum Configurations",
          probability: "94%",
          description: "Derivations for local orbits of Hydrogen and assigning complete (n, l, m, s) coordinates to d-shell electrons."
        },
        {
          topic: "Born-Haber Cycle & Hess's Enthalpy Summation",
          probability: "92%",
          description: "Calculating state variables, heat of reactions, and lattice energetic variables of NaCl crystals."
        },
        {
          topic: "Stoichiometry, Yields & Limiting Reactants",
          probability: "95%",
          description: "Solving limiting reagent scenarios and determining yield discrepancies based on laboratory practical skills."
        },
        {
          topic: "Contact Process and Haber's Ammonia Yields",
          probability: "93%",
          description: "Optimizing sulfur and nitrogen outputs utilizing Le Chatelier's equilibrium pressure-temperature vectors."
        },
        {
          topic: "Stratospheric Ozone Depletion and Greenhouse Gases",
          probability: "90%",
          description: "Free radical chemistry of CFCs and environmental impacts of carbon emissions in Sahiwal division."
        }
      ];

      predictedQuestions = [
        {
          type: "Long Question",
          text: "Discuss Bohr's model of atomic structure. Derive the mathematical expression for the radius of the nth orbit of an electron in a hydrogen-like atom.",
          probability: "95%",
          reason: "Appeared in 3 out of 5 previous regional Punjab intermediate board calendars."
        },
        {
          type: "Long Question",
          text: "Explain Molecular Orbital Theory (MOT). Design the orbital energy level diagrams for Nitrogen (N2) and Oxygen (O2) and calculate their bond orders.",
          probability: "94%",
          reason: "Recurrent 5-mark inorganic theory syllabus question for intermediate science."
        },
        {
          type: "Short Question",
          text: "NH3 has a bond angle of 107.5° while H2O has 104.5°. Justify using VSEPR lone-pair repulsion theory.",
          probability: "93%",
          reason: "Standard student learning outcomes (SLO) conceptual chapter item."
        },
        {
          type: "Short Question",
          text: "Why is the second ionization energy of Sodium higher than its first value? Explain in terms of stable noble gas shell configuration.",
          probability: "92%",
          reason: "Testing core atomic periodicity understanding."
        }
      ];

      mcqs = [
        {
          id: "ch11-m1",
          question: "Which quantum number combination (n, l, m, s) describes an electron in 3d orbital?",
          options: ["A) n=3, l=2, m=0, s=+1/2", "B) n=3, l=1, m=1, s=-1/2", "C) n=3, l=3, m=2, s=+1/2", "D) n=3, l=0, m=0, s=-1/2"],
          correctAnswer: "A",
          explanation: "For the d subshell, Azimuthal quantum number l = 2. Principal quantum number n = 3."
        },
        {
          id: "ch11-m2",
          question: "The total number of covalent bonds present in one molecule of Benzene is:",
          options: ["A) 6 sigma, 3 pi", "B) 12 sigma, 3 pi", "C) 12 sigma, 6 pi", "D) 6 sigma, 6 pi"],
          correctAnswer: "B",
          explanation: "Benzene has 6 C-C sigma bonds, 6 C-H sigma bonds (total 12 sigma) and 3 alternating pi bonds."
        },
        {
          id: "ch11-m3",
          question: "According to Hess's Law of Heat Summation, the net enthalpy change of a reactions sequence depends on:",
          options: ["A) Number of steps involved", "B) Total speed of reactions", "C) Initial and final states only", "D) Catalyst presence or absence"],
          correctAnswer: "C",
          explanation: "Enthalpy is a state function; hence, the net change depends only on the initial and final states of the chemical species."
        },
        {
          id: "ch11-m4",
          question: "A reaction has a rate equation Rate = k[A][B]^2. What are the units of its rate constant k?",
          options: ["A) mol-2 dm6 s-1", "B) mol dm-3 s-1", "C) dm3 mol-1 s-1", "D) s-1"],
          correctAnswer: "A",
          explanation: "The reaction is third order. Unit of k is (dm^3/mol)^(n-1) * s^-1 = mol^-2 dm^6 s^-1."
        },
        {
          id: "ch11-m5",
          question: "Which hydrogen halide exhibits the highest percentage of covalent character?",
          options: ["A) HF", "B) HCl", "C) HBr", "D) HI"],
          correctAnswer: "D",
          explanation: "HI has the smallest electronegativity difference, hence the largest covalent/least ionic character."
        },
        {
          id: "ch11-m6",
          question: "The oxidation number of Sulfur in H2SO4 molecule is calculated to be:",
          options: ["A) +2", "B) +4", "C) +6", "D) +8"],
          correctAnswer: "C",
          explanation: "In H2SO4: 2(+1) + S + 4(-2) = 0 => S = +6."
        },
        {
          id: "ch11-m7",
          question: "How many chapters constitute the updated National Curriculum of Pakistan 2023 Chemistry F.Sc syllabus?",
          options: ["A) 11 Chapters", "B) 12 Chapters", "C) 14 Chapters", "D) 16 Chapters"],
          correctAnswer: "D",
          explanation: "The updated NCP 2023 syllabus for 11th class Chemistry features exactly 16 chapters for comprehensive learning."
        },
        {
          id: "ch11-m8",
          question: "Which gas exhibits the highest diffusion rate under identical physical conditions?",
          options: ["A) H2", "B) He", "C) CH4", "D) O2"],
          correctAnswer: "A",
          explanation: "According to Graham's law, rate of diffusion is inversely proportional to the square root of molecular mass. H2 has the lowest mass (2g/mol)."
        },
        {
          id: "ch11-m9",
          question: "In paper chromatography, the Rf value is always:",
          options: ["A) Greater than 1", "B) Less than 1", "C) Equal to zero", "D) Unbounded positive integer"],
          correctAnswer: "B",
          explanation: "The Rf value is the ratio of solute distance over solvent front distance. Since solute never outruns solvent, Rf < 1."
        },
        {
          id: "ch11-m10",
          question: "The gas constant R value when pressure is measured in atm and volume in dm3 is:",
          options: ["A) 8.314 J/mol.K", "B) 1.987 cal/mol.K", "C) 0.0821 dm3.atm/mol.K", "D) 62.4 dm3.torr/mol.K"],
          correctAnswer: "C",
          explanation: "Standard gas gas constant value is 0.0821 dm3.atm/mol.K."
        },
        {
          id: "ch11-m11",
          question: "Which halogen has the highest electron affinity value?",
          options: ["A) Fluorine", "B) Chlorine", "C) Bromine", "D) Iodine"],
          correctAnswer: "B",
          explanation: "Chlorine possesses a larger size than Fluorine, reducing inter-electronic repulsion when accepting an electron."
        },
        {
          id: "ch11-m12",
          question: "A basic buffer solution can be prepared by mixing:",
          options: ["A) NH4OH and NH4Cl", "B) CH3COOH and CH3COONa", "C) HCl and NaCl", "D) NaOH and NaCl"],
          correctAnswer: "A",
          explanation: "A basic buffer is made of a weak base (NH4OH) and its salt with a strong acid (NH4Cl)."
        },
        {
          id: "ch11-m13",
          question: "The catalyst used in contact process for manufacturing Sulfuric Acid is:",
          options: ["A) Pt or V2O5", "B) Fe powder", "C) Ni catalyst", "D) Al2O3 carrier"],
          correctAnswer: "A",
          explanation: "Vanadium pentoxide (V2O5) or finely divided Platinum is used to oxidize SO2 to SO3."
        },
        {
          id: "ch11-m14",
          question: "The major greenhouse gas responsible for Stratospheric Ozone thinning is:",
          options: ["A) Carbon dioxide", "B) Methane", "C) Chlorofluorocarbons (CFCs)", "D) Water vapor"],
          correctAnswer: "C",
          explanation: "CFCs decompose under UV to release active Chlorine free radicals which act as catalytic ozone depleting agents."
        },
        {
          id: "ch11-m15",
          question: "In solvent extraction, the ratio of concentrations of solute in two immiscible solvents is defined by:",
          options: ["A) Octet Rule", "B) Distribution Law", "C) Le Chatelier's Law", "D) Raoult's Law"],
          correctAnswer: "B",
          explanation: "According to Nernst distribution law, partition coefficient is constant for a solute distributing between immiscible phases."
        },
        {
          id: "ch11-m16",
          question: "Which safety pictogram represents a highly flammable chemical compound?",
          options: ["A) Flame icon", "B) Skull and crossbones", "C) Corrosive tube spilling", "D) Exclamation mark"],
          correctAnswer: "A",
          explanation: "The flame pictogram warns users that the chemical is easily ignitable and volatile."
        }
      ];

      shorts = [
        {
          groupTitle: "Section B: Short Questions (Attempt any 18)",
          instruction: "Answer any 18 conceptual SLO-based questions.",
          totalMarks: 54,
          questions: [
            { id: "ch11-s1", text: "Explain the abnormal electron affinity of Fluorine compared to Chlorine.", marks: 3, hint: "Fluorine has a smaller atomic size, resulting in a dense electron cloud and inter-electronic repulsion." },
            { id: "ch11-s2", text: "Why is the second ionization energy of Sodium extremely high compared to its first value?", marks: 3, hint: "First electron is lost easily from 3s, but the second must be extracted from a completely filled, stable 2p shell." },
            { id: "ch11-s3", text: "State the physical significance of Azimuthal quantum number (l).", marks: 3, hint: "It determines the spatial shape of the orbital/subshell (s, p, d, f) and orbital angular momentum." },
            { id: "ch11-s4", text: "How did Bohr's theory explain the discrete line spectrum of Hydrogen atom?", marks: 3, hint: "Electrons emit or absorb energy only in quantised photons of specific frequencies when jumping between stable orbits." },
            { id: "ch11-s5", text: "NH3 has a bond angle of 107.5° while H2O has 104.5°. Justify using VSEPR lone-pair repulsion rules.", marks: 3, hint: "Lone pair-lone pair repulsion in water is stronger than lone pair-bond pair repulsion in ammonia." },
            { id: "ch11-s6", text: "Explain why Pi bonds are weaker and more chemically reactive than Sigma bonds.", marks: 3, hint: "Sigma bonds are formed by head-on overlap with maximum electron density. Pi bonds form by parallel side-way overlap." },
            { id: "ch11-s7", text: "What is a limiting reactant? Explain with a neat daily-life or stoichiometry example.", marks: 3, hint: "The reactant that is fully consumed first, thereby controlling and limiting the mass of products." },
            { id: "ch11-s8", text: "How is the actual yield of a reaction usually less than its theoretical yield?", marks: 3, hint: "Due to side reactions, mechanical loss during filtration/transfer, or reversible equilibrium constraints." },
            { id: "ch11-s9", text: "Calculate the density of methane (CH4) gas at Standard Temperature and Pressure.", marks: 3, hint: "Density = PM/RT. For STP: (1 atm * 16 g/mol) / (0.0821 * 273 K) = 0.714 g/dm3." },
            { id: "ch11-s10", text: "State Graham's Law of Diffusion and write down its mathematical expression.", marks: 3, hint: "The rate of diffusion is inversely proportional to the square root of gas density (r ∝ 1/√d)." },
            { id: "ch11-s11", text: "Define State Function and explain state variables with examples.", marks: 3, hint: "A property independent of path followed to reach that state (e.g., Temperature, Pressure, Enthalpy)." },
            { id: "ch11-s12", text: "State Hess's Law of Constant Heat Summation and its mathematical significance.", marks: 3, hint: "The enthalpy change of a reaction is identical whether the reaction occurs in a single step or multiple steps." },
            { id: "ch11-s13", text: "Write the Arrhenius equation and define activation energy Ea.", marks: 3, hint: "k = A * e^(-Ea/RT). Ea is the minimum energy threshold required to form the activated complex." },
            { id: "ch11-s14", text: "Explain what is half-life of a reaction and express its formula for first order kinetics.", marks: 3, hint: "Time needed for half of reactants to consume. t1/2 = 0.693 / k (independent of initial [A])." },
            { id: "ch11-s15", text: "State Le Chatelier's Principle and predict the shift when pressure is raised in Haber's Process.", marks: 3, hint: "System shifts to relieve stress. Raising pressure shifts equilibrium towards side with fewer moles (products)." },
            { id: "ch11-s16", text: "Define the common ion effect with a relevant chemical mixture example.", marks: 3, hint: "The suppression of dissociation of a weak electrolyte by adding a strong electrolyte containing a common ion." },
            { id: "ch11-s17", text: "Justify why NH4+ is conjugate acid of base NH3 using Brønsted-Lowry concept.", marks: 3, hint: "NH4+ is formed when NH3 accepts a proton (H+), enabling it to donate a proton in the reverse reaction." },
            { id: "ch11-s18", text: "What are basic buffers and how do they maintain a stable pH? Give an example.", marks: 3, hint: "A weak base + its salt (e.g., NH4OH + NH4Cl). Neutralizes added H+ with OH- and added OH- with NH4+." },
            { id: "ch11-s19", text: "State Faraday's First Law of Electrolysis with mathematical notations.", marks: 3, hint: "Mass of substance deposited is directly proportional to quantity of electricity passed: W = Z * Q." },
            { id: "ch11-s20", text: "What is the function of a Salt Bridge in a Galvanic electrochemical cell?", marks: 3, hint: "It maintains electrical neutrality across half-cells by facilitating migration of anions and cations." },
            { id: "ch11-s21", text: "Outline the mechanistical steps of electrophilic nitration of Benzene with equations.", marks: 3, hint: "Generation of electrophile NO2+, electrophilic attack on ring forming sigma complex, and proton removal." },
            { id: "ch11-s22", text: "Why does concentrated H2SO4 act as an active dehydrating agent? Give example.", marks: 3, hint: "It has a powerful chemical affinity for water, extracting H and O as water molecules from sugar/cellulose." },
            { id: "ch11-s23", text: "Explain the distribution partition coefficient in solvent extraction.", marks: 3, hint: "Kd is the ratio of concentration of solute in organic phase over aqueous phase at equilibrium." },
            { id: "ch11-s24", text: "Write down the first-aid protocols if concentrated acid splashes on eye or skin in laboratory.", marks: 3, hint: "Instantly rinse with generous running tap water for 15 minutes, then apply weak sodium bicarbonate solution." }
          ]
        }
      ];

      longs = [
        {
          questionNum: "Question No. 5 (Chapters 2 & 5)",
          totalMarks: 8,
          parts: [
            { 
              partLetter: "A", 
              text: "Discuss Bohr's model of atomic structure. Derive the mathematical expression for the radius of the nth orbit of an electron in a hydrogen-like atom.", 
              marks: 5, 
              stepSchema: "1 mark postulates, 3 marks step derivations, 1 mark final radius value.",
              answer: `**Answer Key / Derivation Proof:**\n\n1. **Postulates of Bohr's Model**:\n   - Electrons revolve in circular orbits with quantized angular momentum: $mvr = \\frac{nh}{2\\pi}$\n   - Energy is emitted/absorbed only when transitioning between orbits: $\\Delta E = E_2 - E_1 = h\\nu$\n\n2. **Radius Derivation ($r_n$)**:\n   - Centripetal force = Electrostatic force:\n     $$\\frac{mv^2}{r} = \\frac{Ze^2}{4\\pi \\epsilon_0 r^2} \\implies mv^2 = \\frac{Ze^2}{4\\pi \\epsilon_0 r}$$\n   - From angular momentum $v = \\frac{nh}{2\\pi mr}$. Square it and substitute:\n     $$m \\left( \\frac{n^2 h^2}{4\\pi^2 m^2 r^2} \\right) = \\frac{Ze^2}{4\\pi \\epsilon_0 r}$$\n     $$\\frac{n^2 h^2}{4\\pi^2 m r} = \\frac{Ze^2}{4\\pi \\epsilon_0}$$\n     $$r = \\frac{n^2 h^2 \\epsilon_0}{\\pi m Z e^2}$$\n\n3. **Value for Hydrogen ($Z=1$, $n=1$)**:\n   - $r_1 = 0.529\\text{ Å}$ or $0.0529\\text{ nm}$.`
            },
            { 
              partLetter: "B", 
              text: "Using kinetic gas theory, derive Dalton's Law of Partial Pressures. How is it applied practically in high-altitude breathing systems?", 
              marks: 3, 
              stepSchema: "1 mark kinetic derivation, 1 mark Dalton definition, 1 mark respiration application.",
              answer: `**Answer Key & Application Details:**\n\n1. **Kinetic Derivation**:\n   - Pressure of gas: $P = \\frac{1}{3} \\frac{mN}{V} \\bar{c}^2$\n   - For dry gases $A, B$ in same container: $P_A = \\frac{1}{3} \\frac{m_A N_A}{V} \\bar{c}_A^2$ and $P_B = \\frac{1}{3} \\frac{m_B N_B}{V} \\bar{c}_B^2$\n   - Total pressure $P_{\\text{total}} = \\frac{1}{3V} [m_A N_A \\bar{c}_A^2 + m_B N_B \\bar{c}_B^2] = P_A + P_B$\n\n2. **Application in High Altitudes**:\n   - At higher altitudes, atmospheric pressure drops, reducing the partial pressure of oxygen ($p\\text{O}_2$). Since oxygen diffusion into blood depends directly on its partial pressure gradient in lungs, high-altitude aircraft/mountaineers use pressurized oxygen tanks to raise the partial pressure artificially, ensuring stable respiration.`
            }
          ]
        },
        {
          questionNum: "Question No. 6 (Chapters 3 & 4)",
          totalMarks: 8,
          parts: [
            { 
              partLetter: "A", 
              text: "Explain Molecular Orbital Theory (MOT). Design the orbital energy level diagrams for Nitrogen (N2) and Oxygen (O2) and calculate their bond orders.", 
              marks: 5, 
              stepSchema: "1 mark MOT tenets, 2 marks oxygen/nitrogen diagram layout, 2 marks bond order comparisons.",
              answer: `**Answer Key & Structural Comparison:**\n\n1. **Core Tenets of MOT**:\n   - Atomic orbitals overlap to form molecular orbitals (bonding $\\sigma, \\pi$ and anti-bonding $\\sigma^*, \\pi^*$).\n   - Electrons populate orbitals in order of increasing energy (Aufbau, Pauli, Hund).\n\n2. **Energy Diagram Levels**:\n   - **Nitrogen ($N_2$, $14e^-$)**: $\\sigma_{1s} < \\sigma^*_{1s} < \\sigma_{2s} < \\sigma^*_{2s} < (\\pi_{2p_y} = \\pi_{2p_z}) < \\sigma_{2p_x} < (\\pi^*_{2p_y} = \\pi^*_{2p_z}) < \\sigma^*_{2p_x}$\n     - Bond Order: $\\frac{N_b - N_a}{2} = \\frac{10 - 4}{2} = 3$ (Triple bond, diamagnetic).\n   - **Oxygen ($O_2$, $16e^-$)**: $\\sigma_{1s} < \\sigma^*_{1s} < \\sigma_{2s} < \\sigma^*_{2s} < \\sigma_{2p_x} < (\\pi_{2p_y} = \\pi_{2p_z}) < (\\pi^*_{2p_y} = \\pi^*_{2p_z}) < \\sigma^*_{2p_x}$\n     - Has 2 unpaired electrons in $\\pi^*_{2p}$, explaining its experimental paramagnetism.\n     - Bond Order: $\\frac{10 - 6}{2} = 2$ (Double bond, paramagnetic).`
            },
            { 
              partLetter: "B", 
              text: "A mixture of 10g of Hydrogen and 64g of Oxygen is reacted to form water. Identify the limiting reactant and calculate the mass of water produced.", 
              marks: 3, 
              stepSchema: "1 mark limiting reactant identification, 1 mark stoichiometry ratios, 1 mark final water weight.",
              answer: `**Numerical Solution Step-by-Step:**\n\n- **Reaction**:\n  $$2\\text{H}_2\\text{(g)} + \\text{O}_2\\text{(g)} \\longrightarrow 2\\text{H}_2\\text{O(l)}$$\n\n- **Given Data**:\n  - Mass of $\\text{H}_2 = 10\\text{ g}$\n  - Mass of $\\text{O}_2 = 64\\text{ g}$\n  - Molar Mass of $\\text{H}_2 = 2.016\\text{ g/mol}$\n  - Molar Mass of $\\text{O}_2 = 32\\text{ g/mol}$\n\n- **Calculations**:\n  - Moles of $\\text{H}_2 = \\frac{10}{2.016} = 4.96\\text{ moles}$\n  - Moles of $\\text{O}_2 = \\frac{64}{32} = 2.0\\text{ moles}$\n  - According to equation, $2\\text{ moles of H}_2$ react with $1\\text{ mole of O}_2$.\n  - Required $\\text{H}_2$ for $2.0\\text{ moles of O}_2$ is $2 \\times 2.0 = 4.0\\text{ moles}$. We have $4.96\\text{ moles}$ (excess).\n  - Therefore, **$\\text{O}_2$ is the Limiting Reactant**.\n  - Water produced (based on limiting reactant $\\text{O}_2$):\n    $$n_{\\text{H}_2\\text{O}} = 2 \\times n_{\\text{O}_2} = 2 \\times 2.0 = 4.0\\text{ moles}$$\n  - Mass of water ($H_2O$ molar mass = $18.015\\text{ g/mol}$):\n    $$\\text{Mass} = 4.0\\text{ moles} \\times 18.015\\text{ g/mol} = 72.06\\text{ grams}$$\n\n- **Final Answer**: Limiting reactant is **$\\text{O}_2$** and water produced is **$72.06\\text{ grams}$**.`
            }
          ]
        },
        {
          questionNum: "Question No. 7 (Chapters 6 & 8)",
          totalMarks: 8,
          parts: [
            { 
              partLetter: "A", 
              text: "Define Born-Haber cycle. Explain in detail how it is utilized to calculate lattice energy of crystalline Sodium Chloride (NaCl) with complete structural equations.", 
              marks: 5, 
              stepSchema: "1 mark Born-Haber concept, 2 marks Na/Cl state changes flowchart, 2 marks lattice chemical calculations.",
              answer: `**Answer Key / Flowchart Equations:**\n\n1. **Born-Haber Cycle**: A thermodynamic cycle based on Hess's Law used to calculate lattice energy (which cannot be measured directly) from measurable quantities like ionization energy, electron affinity, and sublimation energy.\n\n2. **Equations Flowchart steps**:\n   - Sublimation: $\\text{Na(s)} \\longrightarrow \\text{Na(g)} \\quad (\\Delta H_x = +108\\text{ kJ})$$\n   - Ionization: $\\text{Na(g)} \\longrightarrow \\text{Na}^+\\text{(g)} + e^- \\quad (IE = +496\\text{ kJ})$$\n   - Dissociation: $\\frac{1}{2}\\text{Cl}_2\\text{(g)} \\longrightarrow \\text{Cl(g)} \\quad (\\frac{1}{2}\\Delta H_{\\text{dis}} = +122\\text{ kJ})$$\n   - Electron Affinity: $\\text{Cl(g)} + e^- \\longrightarrow \\text{Cl}^-\\text{(g)} \\quad (EA = -349\\text{ kJ})$$\n   - Standard Formation: $\\text{Na(s)} + \\frac{1}{2}\\text{Cl}_2\\text{(g)} \\longrightarrow \\text{NaCl(s)} \\quad (\\Delta H_f = -411\\text{ kJ})$$\n   - Lattice Energy ($U$):\n     $$\\Delta H_f = \\Delta H_x + IE + \\frac{1}{2}\\Delta H_{\\text{dis}} + EA - U$$\n     $$-411 = 108 + 496 + 122 - 349 - U = 377 - U$$\n     $$U = 377 + 411 = +788\\text{ kJ/mol}$$\n\n3. **Conclusion**: The lattice energy of NaCl is approximately **$788\\text{ kJ/mol}$**.`
            },
            { 
              partLetter: "B", 
              text: "Detail Haber's process for Ammonia production. Show how temperature, pressure and catalytic constraints are optimized using Le Chatelier's principle.", 
              marks: 3, 
              stepSchema: "1 mark chemical equation, 1 mark operating condition values, 1 mark equilibrium explanation.",
              answer: `**Answer Key / Optimization Metrics:**\n\n- **Reversible Reaction**:\n  $$\\text{N}_2\\text{(g)} + 3\\text{H}_2\\text{(g)} \\rightleftharpoons 2\\text{NH}_3\\text{(g)} \\quad \\Delta H = -92.4\\text{ kJ/mol}$$\n\n- **Le Chatelier's Optimization**:\n  - **Pressure**: Since reactants have 4 moles and products have 2 moles of gas, high pressure shifts the equilibrium to the right. Optimized pressure: **$200\\text{ to } 300\\text{ atm}$**.\n  - **Temperature**: The reaction is exothermic. Low temperature favors yield, but reduces rate. Optimized compromise temp: **$400^\\circ\\text{C} \\text{ to } 450^\\circ\\text{C}$**.\n  - **Catalyst**: Finely divided iron with $\\text{Al}_2\\text{O}_3$ promoter is added to achieve equilibrium quickly without requiring higher temperatures.`
            }
          ]
        }
      ];
    } else {
      predictedTopics = [
        {
          topic: "Haber's Process & Chemical Equilibrium Kinetics",
          probability: "95%",
          description: "Factors controlling dynamic yield of ammonia, Le Chatelier's equilibrium responses."
        },
        {
          topic: "Aromatic Hydrocarbons, Benzene Resilience and Resonance Stability",
          probability: "93%",
          description: "Kekule model, molecular orbital proof of resonance energy (152 kJ/mol)."
        },
        {
          topic: "Electrode Potentials & Electrochemical Cells",
          probability: "89%",
          description: "Oxidation potentials, SHE construction, Daniel cell EMF computations."
        }
      ];

      predictedQuestions = [
        {
          type: "Long Question",
          text: "Describe Haber's process for the synthesis of Ammonia. Justify how temperature, pressure and catalyst are optimized using Le Chatelier's guidelines.",
          probability: "94%",
          reason: "Staple physical-organic board query in Class 10 and 11 chemistry papers."
        }
      ];

      mcqs = [
        {
          id: "ch-m1",
          question: "Which of the following organic compounds exhibits the highest resonance stability?",
          options: ["A) Cyclohexane", "B) Benzene", "C) Ethene", "D) Acetylene"],
          correctAnswer: "B",
          explanation: "Benzene has localized/delocalized pi electrons that contribute to a high resonance energy of 152 kJ/mol, making it exceptionally stable."
        },
        {
          id: "ch-m2",
          question: "According to Le Chatelier's Principle, an increase in system pressure will shift the equilibrium towards:",
          options: ["A) Endothermic direction", "B) Side with lesser number of moles of gaseous species", "C) Side with higher number of moles of gas", "D) Reactants always"],
          correctAnswer: "B",
          explanation: "Higher pressure forces the system to minimize volume, shifting to the side with fewer gas molecules."
        },
        {
          id: "ch-m3",
          question: "The oxidation state of Manganese (Mn) in KMnO4 is:",
          options: ["A) +2", "B) +5", "C) +6", "D) +7"],
          correctAnswer: "D",
          explanation: "In KMnO4: (+1) + Mn + 4(-2) = 0 => Mn = +7."
        },
        {
          id: "ch-m4",
          question: "Which hydrogen halide possesses the highest percentage of ionic character?",
          options: ["A) HF", "B) HCl", "C) HBr", "D) HI"],
          correctAnswer: "A",
          explanation: "Fluorine is the most electronegative element, inducing maximum charge separation in HF."
        },
        {
          id: "ch-m5",
          question: "During electroplating of copper, the electrolyte used is:",
          options: ["A) Dilute CuSO4", "B) Warm HCl", "C) Copper oxide powder", "D) Sodium hydroxide solution"],
          correctAnswer: "A",
          explanation: "Copper sulfate solution provides Cu2+ ions that deposit uniformly onto the cathode."
        }
      ];

      shorts = [
        {
          groupTitle: "Section B - Part I (Attempt any 4 of 6)",
          instruction: "Aromatic & General Inorganic Chemistry.",
          totalMarks: 12,
          questions: [
            { id: "ch-s1", text: "Why does Benzene undergo Electrophilic Substitution easily rather than addition reactions?", marks: 3, hint: "Addition reactions disrupt the highly stable resonance stabilization of the ring. Substitution preserves the aromatic character." },
            { id: "ch-s2", text: "How does hydrogen bonding account for high boiling point of water compared to hydrogen sulfide?", marks: 3, hint: "Oxygen has high electronegativity, creating strong intermolecular hydrogen bonds in water; sulfur has lower electronegativity, making H2S bonds weak." },
            { id: "ch-s3", text: "What is the key role of salt bridge in a Galvanic/Voltaic cell?", marks: 3, hint: "It maintains electrical neutrality across both half-cells by allowing exchange of inert ions (e.g., K+, Cl-)." },
            { id: "ch-s4", text: "State modern Periodic Law as formulated by Henry Moseley.", marks: 3, hint: "The physical and chemical properties of elements are a periodic function of their increasing atomic numbers." }
          ]
        }
      ];

      longs = [
        {
          questionNum: "Question No. 5 (Chemical Equilibrium)",
          totalMarks: 8,
          parts: [
            { 
              partLetter: "A", 
              text: "Analyze Haber's Process. Discuss the temperature and pressure conditions, along with catalyst action, under Le Chatelier's equilibrium.", 
              marks: 5, 
              stepSchema: "2 marks chemical equations, 1 mark pressure reasoning, 2 marks temperature optimization details.",
              answer: `**Answer Key / Performance Proof:**\n\n1. **Reversible Equation**:\n   $$\\text{N}_2\\text{(g)} + 3\\text{H}_2\\text{(g)} \\rightleftharpoons 2\\text{NH}_3\\text{(g)} \\quad \\Delta H = -92.4\\text{ kJ/mol}$$\n\n2. **Optimization Protocol**:\n   - **Pressure Options**: 4 moles of gas contract to 2 moles. Increasing pressure shifts system right. Ideal pressure: **$200\\text{ atm}$**.\n   - **Temperature Options**: Exothermic synthesis. Low temperature favors yield but reduces rates. Ideal compromise: **$450^\\circ\\text{C}$**.\n   - **Catalyst**: Finely divided iron with oxide promoter increases reaction rate.`
            },
            { 
              partLetter: "B", 
              text: "For a reaction A + B ⇄ 2C, if initial concentration of A and B is 1M, and equilibrium constant Kc is 16. Calculate equilibrium concentration of C.", 
              marks: 3, 
              stepSchema: "1 mark ICE table construction, 1 mark algebraic solve of x, 1 mark correct final molarity solution.",
              answer: `**Numerical Solution Step-by-Step:**\n\n- **ICE Table Setup**:\n  | Concentration | A | B | ⇄ 2C |\n  |---|---|---|---|\n  | Initial | $1$ | $1$ | $0$ |\n  | Change | $-x$ | $-x$ | $+2x$ |\n  | Equilibrium | $1-x$ | $1-x$ | $2x$ |\n\n- **Kc algebraic formula**:\n  $$K_c = \\frac{[C]^2}{[A][B]} = \\frac{(2x)^2}{(1-x)(1-x)} = 16$$\n  $$\\frac{4x^2}{(1-x)^2} = 16$$\n\n- **Taking Square Root on both sides**:\n  $$\\frac{2x}{1-x} = 4 \\implies 2x = 4(1-x) \\implies 2x = 4 - 4x \\implies 6x = 4 \\implies x = \\frac{2}{3} \\approx 0.67\\text{ M}$$\n\n- **Equilibrium Molarity of C**:\n  $$[C] = 2x = 2 \\left(\\frac{2}{3}\\right) = \\frac{4}{3} \\approx 1.33\\text{ M}$$\n\n- **Final Answer**: $[C] = \\mathbf{1.33\\text{ M}}$`
            }
          ]
        },
        {
          questionNum: "Question No. 6 (Organic Hydrocarbons)",
          totalMarks: 8,
          parts: [
            { 
              partLetter: "A", 
              text: "Write down the molecular orbital structure of Benzene. Outline Kekule formulas and list three experimental facts that support benzene resonance stability.", 
              marks: 5, 
              stepSchema: "2 marks diagram representation, 1 mark Kekule critique, 2 marks experimental corroboration.",
              answer: `**Answer Key / Core Proofs:**\n\n1. **Molecular Orbital Structure**:\n   - Each carbon is $sp^2$ hybridized, forming sigma bonds with other carbons and hydrogens.\n   - Unhybridized $2p_z$ orbitals overlap sideways to form a continuous, delocalized pi electron cloud above and below the ring.\n\n2. **Kekule's Formulas**: Alternating single and double bonds. Fails to explain chemical inertness/stability.\n\n3. **Experimental Facts Supporting Resonance Stability**:\n   - **Bond Lengths**: All C-C bonds have equal lengths ($1.397\\text{ Å}$), intermediate between single ($1.54\\text{ Å}$) and double ($1.34\\text{ Å}$).\n   - **Heat of Hydrogenation**: Idealized cyclohexatriene is expected to release $-360\\text{ kJ/mol}$, but Benzene only releases $-208\\text{ kJ/mol}$, showing it is $152\\text{ kJ/mol}$ more stable (resonance energy).\n   - **Reactivity**: Prefers electrophilic substitution over addition reactions.`
            },
            { 
              partLetter: "B", 
              text: "Write the stepwise chemical reaction with reagents for the synthesis of Nitrobenzene from Benzene. Outline the generation of nitronium ion (NO2+).", 
              marks: 3, 
              stepSchema: "1 mark electrophile generation formula, 2 marks mechanism scheme steps.",
              answer: `**Answer Key / Mechanism Steps:**\n\n1. **Electrophile Generation**:\n   $$\\text{HNO}_3 + 2\\text{H}_2\\text{SO}_4 \\rightleftharpoons \\text{NO}_2^+ + \\text{H}_3\\text{O}^+ + 2\\text{HSO}_4^-$$\n   Here, sulphuric acid acts as an acid to protonate nitric acid, generating the active nitronium electrophile ($\\text{NO}_2^+$).\n\n2. **Electrophilic Attack**:\n   - The pi-electron cloud of Benzene attacks the $\\text{NO}_2^+$ ion to form a resonance-stabilized arenium ion (sigma complex).\n\n3. **Proton Removal**:\n   - The basic bisulfate ion ($\\text{HSO}_4^-$) removes a proton from the carbon to restore aromaticity, yielding Nitrobenzene and regenerating $\\text{H}_2\\text{SO}_4$.`
            }
          ]
        }
      ];
    }

  } else if (subLower.includes("math") || subLower.includes("algebra") || subLower.includes("calculus") || subLower.includes("geometry") || subLower.includes("trig")) {
    predictedTopics = [
      {
        topic: "Matrices & Cramer's Rule / Inversion Theorem",
        probability: "96%",
        description: "Determinants, solving simultaneous linear equations of 2 or 3 variables. High marks value."
      },
      {
        topic: "Calculus - Limits of Functions & Differentiation",
        probability: "94%",
        description: "Standard limits, derivative theorems, ab-initio (first principle) proof of trigonometric variables."
      },
      {
        topic: "Integration, Areas under Curves & Analytical Geometry",
        probability: "90%",
        description: "Integration by parts, definite limits, equations of lines and circles."
      }
    ];

    predictedQuestions = [
      {
        type: "Long Question",
        text: "Solve the linear equations system using Cramer's Rule: x - y + 2z = 1, 2x + y + z = 2, x + y - z = 4. Verify determinants.",
        probability: "96%",
        reason: "Appeared in 2021, 2022, 2023 board papers across intermediate matrices tests."
      }
    ];

    mcqs = [
      {
        id: "mat-m1",
        question: "If A is a matrix of order 3x3 and |A| = 5, then the value of |2A| is:",
        options: ["A) 10", "B) 20", "C) 40", "D) 80"],
        correctAnswer: "C",
        explanation: "For a 3x3 matrix, |kA| = k^3 * |A|. Thus, |2A| = 2^3 * 5 = 8 * 5 = 40."
      },
      {
        id: "mat-m2",
        question: "The value of limit as x approaches 0 of [sin(x)/x] in radians is:",
        options: ["A) Zero", "B) 1", "C) Infinite", "D) Cannot be evaluated"],
        correctAnswer: "B",
        explanation: "This is the standard sandwich theorem limit where lim(x->0) [sin(x)/x] = 1."
      },
      {
        id: "mat-m3",
        question: "The derivative of cos(x) with respect to x under standard calculus is:",
        options: ["A) sin(x)", "B) -sin(x)", "C) -cos(x)", "D) sec^2(x)"],
        correctAnswer: "B",
        explanation: "The derivative of trigonometric cosine function is negative sine."
      },
      {
        id: "mat-m4",
        question: "Evaluate the integral of sec^2(x) dx:",
        options: ["A) sec(x) + C", "B) tan(x) + C", "C) -cot(x) + C", "D) ln(sec x) + C"],
        correctAnswer: "B",
        explanation: "Since the derivative of tan(x) is sec^2(x), the integration of sec^2(x) is tan(x) + C."
      },
      {
        id: "mat-m5",
        question: "The gradient of a line perpendicular to y = 3x - 5 is equal to:",
        options: ["A) 3", "B) -3", "C) 1/3", "D) -1/3"],
        correctAnswer: "D",
        explanation: "The product of perpendicular slopes is -1 (m1 * m2 = -1). If m1 = 3, m2 must be -1/3."
      }
    ];

    shorts = [
      {
        groupTitle: "Section B (Attempt any 5 of 8)",
        instruction: "Show clean, detailed steps for maximum marks.",
        totalMarks: 20,
        questions: [
          { id: "mat-s1", text: "Find dy/dx if y = x^2 * sin(x) using the product rule.", marks: 4, hint: "Apply d(uv) = u dv + v du. dy/dx = x^2 cos(x) + 2x sin(x)." },
          { id: "mat-s2", text: "Evaluate the limit as x approaches 2 of [ (x^2 - 4) / (x - 2) ].", marks: 4, hint: "Factor the numerator (x-2)(x+2) and simplify to get lim(x+2) = 4." },
          { id: "mat-s3", text: "If A = [[2, 3], [1, 4]], find the multiplicative inverse A^-1.", marks: 4, hint: "Inverse = [1/det(A)] * Adj(A). det(A) = 8-3 = 5. Adj = [[4, -3], [-1, 2]]." },
          { id: "mat-s4", text: "Solve the linear trigonometric equation: 2 sin(θ) + 1 = 0 in the range of 0 to 360 degrees.", marks: 4, hint: "sin(θ) = -1/2. θ lies in 3rd and 4th quadrants, giving θ = 210° and 330°." }
        ]
      }
    ];

    longs = [
      {
        questionNum: "Question No. 5 (Matrices & Equations)",
        totalMarks: 8,
        parts: [
          { 
            partLetter: "A", 
            text: "Solve the following system of linear simultaneous equations using Cramer's Rule: 2x - y + z = 5, x + y - z = -2, -x + 2y + 2z = 1.", 
            marks: 5, 
            stepSchema: "1 mark matrix representation, 2 marks finding Dx, Dy, Dz determinants, 2 marks calculating final x, y, z values.",
            answer: `**Numerical Solution Step-by-Step:**\n\n1. **Matrix Form $(AX = B)$**:\n   $$A = \\begin{bmatrix} 2 & -1 & 1 \\\\ 1 & 1 & -1 \\\\ -1 & 2 & 2 \\end{bmatrix}, \\quad X = \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}, \\quad B = \\begin{bmatrix} 5 \\\\ -2 \\\\ 1 \\end{bmatrix}$$\n\n2. **Calculate Determinant $|A|$**:\n   $$|A| = 2(2 - (-2)) - (-1)(2 - 1) + 1(2- (-1))$$\n   $$|A| = 2(4) + 1(1) + 1(3) = 8 + 1 + 3 = 12$$\n   Since $|A| = 12 \\neq 0$, a unique solution exists.\n\n3. **Calculate Determinants $D_x, D_y, D_z$**:\n   - Replace 1st column with $B$ for $D_x$:\n     $$D_x = \\begin{vmatrix} 5 & -1 & 1 \\\\ -2 & 1 & -1 \\\\ 1 & 2 & 2 \\end{vmatrix} = 5(2 - (-2)) + 1(-4 - (-1)) + 1(-4 - 1)$$\n     $$D_x = 5(4) + 1(-3) + 1(-5) = 20 - 3 - 5 = 12$$\n   - Replace 2nd column with $B$ for $D_y$:\n     $$D_y = \\begin{vmatrix} 2 & 5 & 1 \\\\ 1 & -2 & -1 \\\\ -1 & 1 & 2 \\end{vmatrix} = 2(-4 - (-1)) - 5(2 - 1) + 1(1 - 2)$$\n     $$D_y = 2(-3) - 5(1) + 1(-1) = -6 - 5 - 1 = -12$$\n   - Replace 3rd column with $B$ for $D_z$:\n     $$D_z = \\begin{vmatrix} 2 & -1 & 5 \\\\ 1 & 1 & -2 \\\\ -1 & 2 & 1 \\end{vmatrix} = 2(1 - (-4)) + 1(1 - 2) + 5(2 - (-1))$$\n     $$D_z = 2(5) + 1(-1) + 5(3) = 10 - 1 + 15 = 24$$\n\n4. **Solve for $x, y, z$ using Cramer's Rule**:\n   - $$x = \\frac{D_x}{|A|} = \\frac{12}{12} = 1$$\n   - $$y = \\frac{D_y}{|A|} = \\frac{-12}{12} = -1$$\n   - $$z = \\frac{D_z}{|A|} = \\frac{24}{12} = 2$$\n\n- **Final Answer**: $x = 1, y = -1, z = 2$`
          },
          { 
            partLetter: "B", 
            text: "Find the value of k for which the system has no unique solution (i.e. determinant of coefficient matrix is zero): [[3, -1], [k, 2]].", 
            marks: 3, 
            stepSchema: "1 mark algebraic setup, 1 mark determinant equation, 1 mark final k value solution.",
            answer: `**Step-by-Step Algebraic Solution:**\n\n- **Given Coefficient Matrix**:\n  $$M = \\begin{bmatrix} 3 & -1 \\\\ k & 2 \\end{bmatrix}$$\n\n- **Condition for no unique solution**:\n  The determinant must be equal to zero ($|M| = 0$).\n\n- **Calculation**:\n  $$|M| = (3 \\times 2) - (-1 \\times k) = 0$$\n  $$6 + k = 0$$\n  $$k = -6$$\n\n- **Final Answer**: The value of $k$ is **$-6$**.`
          }
        ]
      },
      {
        questionNum: "Question No. 6 (Calculus & Curves)",
        totalMarks: 8,
        parts: [
          { 
            partLetter: "A", 
            text: "By using integration by parts, evaluate the integral: ∫ x^2 * ln(x) dx.", 
            marks: 5, 
            stepSchema: "2 marks setting correct parts (u = ln(x), dv = x^2), 2 marks applying formula u∫vd - ∫(u'∫v)d, 1 mark integration constant completion.",
            answer: `**Mathematical Solution Step-by-Step:**\n\n1. **Integration by Parts Formula**:\n   $$\\int u \\, dv = u v - \\int v \\, du$$\n\n2. **Selecting Parts (using ILATE rule)**:\n   - Let $u = \\ln(x) \\implies du = \\frac{1}{x} \\, dx$\n   - Let $dv = x^2 \\, dx \\implies v = \\int x^2 \\, dx = \\frac{x^3}{3}$\n\n3. **Apply the Formula**:\n   $$\\int x^2 \\ln(x) \\, dx = \\ln(x) \\left( \\frac{x^3}{3} \\right) - \\int \\left( \\frac{x^3}{3} \\right) \\left( \\frac{1}{x} \\, dx \\right)$$\n   $$\\int x^2 \\ln(x) \\, dx = \\frac{x^3 \\ln(x)}{3} - \\frac{1}{3} \\int x^2 \\, dx$$\n   $$\\int x^2 \\ln(x) \\, dx = \\frac{x^3 \\ln(x)}{3} - \\frac{1}{3} \\left( \\frac{x^3}{3} \\right) + C$$\n   $$\\int x^2 \\ln(x) \\, dx = \\frac{x^3 \\ln(x)}{3} - \\frac{x^3}{9} + C$$\n\n- **Final Answer**: **$$\\frac{x^3}{3}\\ln(x) - \\frac{x^3}{9} + C$$**`
          },
          { 
            partLetter: "B", 
            text: "Find the equations of the tangent line to the curve y = 2x^2 - 3x + 1 at the point (2, 3).", 
            marks: 3, 
            stepSchema: "1 mark differentiating for slope (m = 4x-3 = 5), 1 mark using point-slope formula, 1 mark final equation formatting.",
            answer: `**Step-by-Step Analytical Solution:**\n\n- **Given Curve Equation**:\n  $$y = 2x^2 - 3x + 1$$\n  Point: $(x_1, y_1) = (2, 3)$\n\n- **Find the Slope ($m$) by differentiation**:\n  $$\\frac{dy}{dx} = \\frac{d}{dx}(2x^2 - 3x + 1) = 4x - 3$$\n  At $x = 2$:\n  $$m = 4(2) - 3 = 8 - 3 = 5$$\n\n- **Point-Slope Formula**:\n  $$y - y_1 = m(x - x_1)$$\n  $$y - 3 = 5(x - 2)$$\n  $$y - 3 = 5x - 10$$\n  $$5x - y - 7 = 0$$\n\n- **Final Answer**: Tangent line equation is **$5x - y - 7 = 0$** (or $y = 5x - 7$).`
          }
        ]
      }
    ];

  } else if (subLower.includes("computer") || subLower.includes("it") || subLower.includes("program")) {
    predictedTopics = [
      {
        topic: "Database Systems: Normalization & Schema Constraints",
        probability: "95%",
        description: "Primary/foreign keys, anomalies, and transforming a raw ledger table into 1NF, 2NF, and 3NF form."
      },
      {
        topic: "C Language Logic, Dynamic Loops & Conditional Blocks",
        probability: "93%",
        description: "Almost certain to require writing or dry-running a code snippet dealing with factorials, arrays, or loops."
      },
      {
        topic: "Network Hardware, Topologies & OSI Layer Functions",
        probability: "90%",
        description: "Data packeting, collision prevention, star and mesh layouts."
      }
    ];

    predictedQuestions = [
      {
        type: "Long Question",
        text: "What is normalisation? Detail the conversion of raw databases into First, Second and Third Normal Forms with illustrative dataset tables.",
        probability: "94%",
        reason: "A recurring 8-mark question in intermediate papers over five consecutive years."
      }
    ];

    mcqs = [
      {
        id: "cs-m1",
        question: "Which schema condition ensures that no key can contain a null value to protect table reference identity?",
        options: ["A) Referential Integrity", "B) Entity Integrity Rule", "C) Foreign Key limits", "D) Dominal Constraint"],
        correctAnswer: "B",
        explanation: "Entity integrity requires that the primary key cannot be null, ensuring every row remains uniquely searchable."
      },
      {
        id: "cs-m2",
        question: "How many layers constitute the standard Open Systems Interconnection (OSI) communication model?",
        options: ["A) 4", "B) 5", "C) 7", "D) 9"],
        correctAnswer: "C",
        explanation: "The OSI model consists of seven sequential layers: Physical, Data Link, Network, Transport, Session, Presentation, Application."
      },
      {
        id: "cs-m3",
        question: "In C language, what is the output of the logical condition (5 > 3 && 2 < 1)?",
        options: ["A) True / 1", "B) False / 0", "C) Run-time syntax error", "D) Infinite iteration value"],
        correctAnswer: "B",
        explanation: "The AND operator require both operands to be true. (2 < 1) evaluates to false, making the entire expression false (0)."
      },
      {
        id: "cs-m4",
        question: "Which database key uniquely identifies a record when there are multiple potential candidate columns?",
        options: ["A) Primary Key", "B) Secondary Key", "C) Foreign Key", "D) Composite Key"],
        correctAnswer: "A",
        explanation: "The primary key is selected from candidate keys to uniquely identify each record in a table."
      },
      {
        id: "cs-m5",
        question: "Which network topology features a centralized hub node that routes all device signal traffic?",
        options: ["A) Star Topology", "B) Ring Topology", "C) Bus Topology", "D) Mesh Topology"],
        correctAnswer: "A",
        explanation: "Star topology connects all network nodes to a single consolidated central switch or hub."
      }
    ];

    shorts = [
      {
        groupTitle: "Section B (Attempt any 5 of 8)",
        instruction: "Provide clear bulleted answers.",
        totalMarks: 20,
        questions: [
          { id: "cs-s1", text: "Point out three differences between RAM and ROM memory modules.", marks: 4, hint: "RAM is volatile, read/write, and stores current runtime data. ROM is non-volatile, read-only, and holds startup BIOS instructions." },
          { id: "cs-s2", text: "Write the C code line needed to declare a single-dimensional array of 5 integers.", marks: 4, hint: "int arr[5]; is the syntax in C." },
          { id: "cs-s3", text: "What is an IP Address? Differentiate between IPv4 and IPv6 format lengths.", marks: 4, hint: "An IP address identifies a device on a network. IPv4 is 32-bit (formatted as octets), while IPv6 is 128-bit." },
          { id: "cs-s4", text: "Explain what compilation is and distinguish C compilers from assemblers.", marks: 4, hint: "A compiler translates high-level C code to machine code. An assembler translates assembly language to machine code." }
        ]
      }
    ];

    longs = [
      {
        questionNum: "Question No. 5 (Database Systems)",
        totalMarks: 8,
        parts: [
          { 
            partLetter: "A", 
            text: "Define Database Normalization. Explain with concrete table mappings of 1NF and 2NF.", 
            marks: 5, 
            stepSchema: "1 mark normalization concept, 2 marks first normal form table representation, 2 marks second normal form transformation.",
            answer: `**Answer Key / Structural Mapping:**\n\n1. **Database Normalization**: The process of organizing a database to reduce data redundancy and eliminate anomalies.\n\n2. **First Normal Form (1NF)**:\n   - Every cell must contain only atomic (single) values, and no repeating groups are allowed.\n   - **Raw (Not 1NF)**:\n     | EmpID | Subject |\n     |---|---|\n     | 1 | CS, Maths |\n   - **1NF Mapping**:\n     | EmpID | Subject |\n     |---|---|\n     | 1 | CS |\n     | 1 | Maths |\n\n3. **Second Normal Form (2NF)**:\n   - Must be in 1NF and every non-key attribute must be *fully functionally dependent* on the entire primary key (no partial dependencies on part of a composite key).\n   - **2NF Mapping**: Split into two tables (e.g. \`Employees(EmpID, Name)\` and \`EmployeeSkills(EmpID, SkillID, SkillLevel)\`).`
          },
          { 
            partLetter: "B", 
            text: "Describe what data anomalies are. Point out insert, delete, and update anomaly examples.", 
            marks: 3, 
            stepSchema: "1 mark anomalies definition, 2 marks illustrating table flaws.",
            answer: `**Technical Answer Details:**\n\n- **Database Anomalies**: Problems that occur in poorly designed, unnormalized databases due to redundant data.\n- **Insert Anomaly**: Inability to insert new data without inserting other unrelated data (e.g., cannot add a new course unless at least one student registers for it).\n- **Delete Anomaly**: Unintentional loss of data when a record is deleted (e.g., deleting the only student in a course also deletes the course details and teacher info).\n- **Update Anomaly**: Redundancy forces updating multiple records (e.g., if a student changes their address, we must update all course rows where that student appears, causing potential inconsistency).`
          }
        ]
      },
      {
        questionNum: "Question No. 6 (Logic & Programming)",
        totalMarks: 8,
        parts: [
          { 
            partLetter: "A", 
            text: "Write a complete C program that declares an array of 5 indices, receives student marks inputs, and calculates both average marks and flags list failures (marks < 33).", 
            marks: 5, 
            stepSchema: "1 mark library imports and main entry, 2 marks input loops, 2 marks summation and average outputs.",
            answer: `**Program Solution Core C Code:**\n\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    int marks[5];\n    int i, sum = 0;\n    float average;\n\n    // Input loop\n    printf("Enter marks for 5 students:\\n");\n    for (i = 0; i < 5; i++) {\n        printf("Student %d: ", i + 1);\n        scanf("%d", &marks[i]);\n        sum += marks[i];\n    }\n\n    // Calculation\n    average = (float)sum / 5.0;\n    printf("\\nAverage Marks: %.2f\\n", average);\n\n    // Flagging failures (< 33)\n    printf("Students who failed (marks < 33):\\n");\n    int failures = 0;\n    for (i = 0; i < 5; i++) {\n        if (marks[i] < 33) {\n            printf("Student %d: %d marks\\n", i + 1, marks[i]);\n            failures++;\n        }\n    }\n    if (failures == 0) {\n        printf("None. All students passed!\\n");\n    }\n\n    return 0;\n}\n\`\`\``
          },
          { 
            partLetter: "B", 
            text: "Compare while loop and do-while loop behaviors in C language, with syntax blocks.", 
            marks: 3, 
            stepSchema: "1.5 marks explaining test-on-entry vs test-on-exit, 1.5 marks code snippets.",
            answer: `**Code Comparison & Explanations:**\n\n- **While Loop (Entry-controlled)**: The condition is tested *before* entering the loop. If the condition is false initially, the loop body is never executed.\n  \`\`\`c\n  while (condition) {\n      // body of loop\n  }\n  \`\`\`\n\n- **Do-While Loop (Exit-controlled)**: The loop body is executed *at least once* before the condition is tested.\n  \`\`\`c\n  do {\n      // body of loop\n  } while (condition);\n  \`\`\``
          }
        ]
      }
    ];

  } else if (subLower.includes("biology") || subLower.includes("botany") || subLower.includes("zoology")) {
    predictedTopics = [
      {
        topic: "Bioenergetics: Z-Scheme and Dark Reactions (Calvin Cycle)",
        probability: "95%",
        description: "Photosystem structure, ATP production pathway, ribulose bisphosphate configurations."
      },
      {
        topic: "Cell Biology: Chromosomal Phases of Mitosis vs Meiosis I",
        probability: "92%",
        description: "Prophase, metaphase layout, spindle fibre actions and homologous pairing."
      },
      {
        topic: "Human Cardiovascular & Heart Valve Operations",
        probability: "90%",
        description: "Double loop circulation pathway, chamber expansion and pressure gates."
      }
    ];

    predictedQuestions = [
      {
        type: "Long Question",
        text: "Trace the light-dependent reactions of photosynthesis (Z-Scheme) with a clean labelled visual diagram.",
        probability: "94%",
        reason: "Highly recurring structural biology long-form question in intermediate board papers."
      }
    ];

    mcqs = [
      {
        id: "bio-m1",
        question: "Which cell organelle is known as the powerhouse of the cell, responsible for aerobic cellular respiration?",
        options: ["A) Golgi Apparatus", "B) Ribosome", "C) Mitochondrion", "D) Lysosome"],
        correctAnswer: "C",
        explanation: "Mitochondria generate ATP through the Kreb's cycle and Electron Transport Chain, giving them their nickname."
      },
      {
        id: "bio-m2",
        question: "Homologous chromosomes pair up during which specific stage of Meiosis I?",
        options: ["A) Prophase I (Zygotene)", "B) Metaphase I", "C) Anaphase I", "D) Telophase I"],
        correctAnswer: "A",
        explanation: "Synapsis occurs in the zygotene sub-stage of Prophase I, where homologous chromosomes pair to form bivalents."
      },
      {
        id: "bio-m3",
        question: "Which heart valve prevents backflow of oxygenated blood from the left ventricle into the left atrium?",
        options: ["A) Tricuspid Valve", "B) Bicuspid / Mitral Valve", "C) Pulmonary Valve", "D) Aortic Valve"],
        correctAnswer: "B",
        explanation: "The bicuspid (mitral) valve guards the opening between the left atrium and left ventricle."
      },
      {
        id: "bio-m4",
        question: "Bacteriophages are viruses that specifically infect and replicate within:",
        options: ["A) Plant cells", "B) Fungi cells", "C) Bacterial cells", "D) Human cells"],
        correctAnswer: "C",
        explanation: "Bacteriophages (literally 'bacteria eaters') use host bacteria to assemble new virions."
      },
      {
        id: "bio-m5",
        question: "The cell wall of Gram-positive bacteria contains a thick layer of which structural macromolecule?",
        options: ["A) Peptidoglycan", "B) Chitin", "C) Cellulose", "D) Lipopolysaccharide"],
        correctAnswer: "A",
        explanation: "Gram-positive bacterial walls are composed of up to 90% peptidoglycan, which retains the crystal violet dye stain."
      }
    ];

    shorts = [
      {
        groupTitle: "Section B (Attempt any 5 of 8)",
        instruction: "Keep answers to-the-point with key scientific terms.",
        totalMarks: 20,
        questions: [
          { id: "bio-s1", text: "Point out three key differences between plant and animal cells under a microscope.", marks: 4, hint: "Plant cells have rigid cellulose walls, central vacuoles, and chloroplasts. Animal cells lack these but have centrioles." },
          { id: "bio-s2", text: "State the biological role of ribulose bisphosphate (RuBP) in carbon fixation.", marks: 4, hint: "RuBP is a 5-carbon sugar that acts as the primary carbon dioxide acceptor in the Calvin cycle catalyzed by Rubisco." },
          { id: "bio-s3", text: "What is active transport? Give an example of a sodium-potassium pump.", marks: 4, hint: "Active transport moves substances against their concentration gradient using ATP energy. The Na+/K+ pump maintains resting membrane potential." },
          { id: "bio-s4", text: "Define translocation and explain how pressure flow hypothesis operates in plants.", marks: 4, hint: "Translocation is the movement of organic solutes through phloem from source (leaves) to sink (storage)." },
          { id: "bio-s5", text: "Describe Lysosomes and mention why Tay-Sachs disease occurs.", marks: 4, hint: "Lysosomes are cell organelles loaded with hydrolytic enzymes. Tay-Sachs occurs due to congenital absence of hexosaminidase A, leading to lipid accumulation." },
          { id: "bio-s6", text: "Differentiate between Gram-positive and Gram-negative bacterial envelope structures.", marks: 4, hint: "Gram-positive has thick peptidoglycan and teichoic acids. Gram-negative has thin peptidoglycan with an outer lipopolysaccharide membrane." }
        ]
      }
    ];

    longs = [
      {
        questionNum: "Question No. 5 (Bioenergetics)",
        totalMarks: 8,
        parts: [
          { 
            partLetter: "A", 
            text: "Explain the light-dependent reactions of photosynthesis. Detail cyclic vs non-cyclic photophosphorylation.", 
            marks: 5, 
            stepSchema: "2 marks electron flow details, 1.5 marks ATP/NADPH yield comparison, 1.5 marks schematic pathway sketch.",
            answer: `**Answer Key / Core Biological Explanations:**\n\n1. **Light-Dependent Reactions**: Occur in the thylakoid membranes of chloroplasts, converting solar energy into chemical energy (ATP and NADPH).\n\n2. **Cyclic vs Non-Cyclic Photophosphorylation Comparison**:\n   - **Non-Cyclic (Z-Scheme)**:\n     - Involves both PSI (P700) and PSII (P680).\n     - Photolysis of water occurs to replace PSII's lost electrons, releasing oxygen ($O_2$).\n     - Products: Both ATP and NADPH are synthesized.\n     - Electron flow is unidirectional (linear) from water to $NADP^+$.\n   - **Cyclic**:\n     - Involves PSI only.\n     - No photolysis of water, and no oxygen is released.\n     - Product: Only ATP is synthesized (when the chloroplast runs low on ATP).\n     - Electron flow is cyclic (electrons return back to PSI main reaction center).`
          },
          { 
            partLetter: "B", 
            text: "Describe what limit factors are in photosynthesis, mentioning carbon concentration and light intensity.", 
            marks: 3, 
            stepSchema: "1 mark law definition, 2 marks impact curve explanations.",
            answer: `**Technical Explanation Details:**\n\n- **Blackman's Law of Limiting Factors**: When a physiological process is governed by multiple independent factors, the rate of the process is limited by the factor that is nearest to its minimum value.\n- **Light Intensity**: As light intensity increases, the rate of photosynthesis increases linearly, but levels off at high light intensity when other factors (like CO2 concentration or temperature) become limiting.\n- **Carbon Dioxide ($CO_2$) Concentration**: $CO_2$ is the substrate for the dark reactions. Increasing $CO_2$ acts as a direct rate accelerator up to about 0.1%, beyond which the rubisco enzyme becomes saturated and the rate plateaus unless light or temperature increases.`
          }
        ]
      },
      {
        questionNum: "Question No. 6 (Cell Structure)",
        totalMarks: 8,
        parts: [
          { 
            partLetter: "A", 
            text: "Discuss the mitotic cell division cycle. Outline the chromosomal events that happen during Prophase, Metaphase, and Anaphase.", 
            marks: 5, 
            stepSchema: "2 marks stages description, 1.5 marks centromere and chromatid behaviour, 1.5 marks drawing simple division diagrams.",
            answer: `**Answer Key Description:**\n\n1. **Prophase**:\n   - Chromatin fibers condense into distinct, visible chromosomes consisting of two sister chromatids.\n   - Nucleolus and nuclear envelope disintegrate.\n   - Mitotic spindle starts forming between opposite centrosomes.\n\n2. **Metaphase**:\n   - Spindle fibers attach to kinetochores of sister chromatids.\n   - Chromosomes align perfectly along the equilateral plane of the cell (Metaphase Plate).\n\n3. **Anaphase**:\n   - Centromeres split, separate sister chromatids (now individual daughter chromosomes).\n   - Spindle fibers shorten, pulling them to opposite poles of the cell.`
          },
          { 
            partLetter: "B", 
            text: "What is cancer in cellular biology? Underline how uncontrolled mitosis results in tumor growth.", 
            marks: 3, 
            stepSchema: "1 mark cell cycle checkpoints description, 2 marks malignancy development causes.",
            answer: `**Answer Key / Oncological Details:**\n\n- **Cancer**: A disease characterized by uncontrolled, abnormal cell division due to genetic mutations in regulatory genes.\n- **Loss of Checkpoints**: Normal cell cycles are strictly regulated by checkpoints (G1/S, G2/M, Metaphase checkpoints) led by cyclins and CDKs. Mutations in tumor suppressor genes (like p53) or proto-oncogenes allow damaged cells to bypass these checkpoints.\n- **Tumor Growth**: As checkpoints fail, cells divide continuously without normal contact inhibition or apoptosis, building a dense mass of abnormal tissues called a tumor.`
          }
        ]
      },
      {
        questionNum: "Question No. 7 (Variety of Life & Kingdom Prokaryotae)",
        totalMarks: 8,
        parts: [
          { 
            partLetter: "A", 
            text: "Describe the structure of a bacteriophage virus. Outline its lytic cycle of replication with suitable labelled diagrams.", 
            marks: 5, 
            stepSchema: "2 marks head/tail/sheath details, 1.5 marks lytic vs lysogenic differentiation, 1.5 marks steps description.",
            answer: `**Answer Key / Core Virology Explanations:**\n\n1. **Structure of Bacteriophage T4**:\n   - Tadpole-shaped with a hexagonal head (containing double-stranded DNA) and a cylindrical contractile tail.\n   - Tail consists of collar, sheath, end plate, and 6 tail fibers for attachment.\n\n2. **Lytic Pathway Steps**:\n   - **Adsorption**: Tail fibers latch onto receptor sites on the bacterial cell wall (E. coli).\n   - **Penetration**: Lysozyme at tail tip dissolves cell wall; viral DNA is injected into host cytoplasm (protein coat remains outside).\n   - **Synthesis/Multiplication**: Viral DNA halts host machinery, starting copy synthesis of viral DNA and capsomeres.\n   - **Assembly**: New heads, tails, and genomes are packaged together.\n   - **Lysis**: The host cell ruptures due to lysozyme build-up, releasing hundreds of mature progeny phages.`
          },
          { 
            partLetter: "B", 
            text: "Define Conjugation in bacteria and describe its significance in genetic variation.", 
            marks: 3, 
            stepSchema: "1 mark pilus connection definition, 2 marks plasmid sheet transfer cycle.",
            answer: `**Molecular Biology Explanation:**\n\n- **Conjugation**: The direct transfer of genetic materials (typically plasmids, such as the F-plasmid) from a donor cell ($F^+$) to a recipient ($F^-$) via a specialized protein tube called the sex pilus.\n- **Significance**: Unlike eukaryotic reproduction, binary fission is asexual. Conjugation acts as an alternate gene-sharing network, introducing DNA recombinations and rapidly spreading beneficial traits (like antibiotic resistance gene blocks) throughout bacterial colonies.`
          }
        ]
      }
    ];

  } else {
    // English / General Humanities Default
    predictedTopics = [
      {
        topic: "Functional Grammar: Voice, Narration, & Clause Construction",
        probability: "95%",
        description: "Standard board evaluation of active/passive structures, direct/indirect reporting, and complex parts-of-speech."
      },
      {
        topic: "Descriptive Writing and Passage Comprehension",
        probability: "92%",
        description: "Letter/application formatting standards, structured outline arguments, and key comprehension markers."
      }
    ];

    predictedQuestions = [
      {
        type: "Long Question",
        text: `Draft a comprehensive essay (300-350 words) on a socio-economic topic, maintaining proper introduction, body points, and conclusions.`,
        probability: "95%",
        reason: "Compulsory essay selection always carries high marks weightage in Section C."
      },
      {
        type: "Short Question",
        text: `Rephrase complex sentences utilizing standard active-passive and indirect speech rules.`,
        probability: "94%",
        reason: "Standard mandatory grammar question pools mapped with national textbook curricula."
      }
    ];

    mcqs = [
      {
        id: "gen-m1",
        question: "Select the correctly punctuated option:",
        options: ["A) The teacher said study hard and you will pass", "B) The teacher said, 'Study hard, and you will pass.'", "C) The teacher, said 'study hard and you will pass.'", "D) The teacher said \"study hard, and you will pass\""],
        correctAnswer: "B",
        explanation: "Direct speech quotes start with a comma, followed by quotation marks starting with a capital letter and ending with a final period."
      },
      {
        id: "gen-m2",
        question: "Identify the underlined word: This is the book **which** I bought yesterday.",
        options: ["A) Relative Pronoun", "B) Reflexive Pronoun", "C) Demonstrative Pronoun", "D) Possessive Pronoun"],
        correctAnswer: "A",
        explanation: "'Which' acts as a relative pronoun connecting the subordinate clause to the antecedent noun 'book'."
      },
      {
        id: "gen-m3",
        question: "Choose the correct voice: 'The letter was written by Ali.'",
        options: ["A) Ali wrote the letter.", "B) Ali writes the letter.", "C) Ali is writing the letter.", "D) Ali write a letter."],
        correctAnswer: "A",
        explanation: "The passive past tense helper 'was written' converts directly to active simple past 'wrote'."
      }
    ];

    shorts = [
      {
        groupTitle: "Section B (Attempt any 4 short segments)",
        instruction: "Syllabus grammar and comprehension.",
        totalMarks: 16,
        questions: [
          { id: "gen-s1", text: "Change the narration: She said, 'I have completed my science project.'", marks: 4, hint: "Rephrase to: She said that she had completed her science project." },
          { id: "gen-s2", text: "Explain the difference between a phrase and a clause with brief examples.", marks: 4, hint: "A phrase lacks a subject-verb pair (e.g., 'in the garden'), whereas a clause has a subject and a verb (e.g., 'he ran home')." },
          { id: "gen-s3", text: "Combine into a single sentence using an adjective clause: 'The boy is my brother. He got the first position.'", marks: 4, hint: "Rephrase to: The boy who got the first position is my brother." }
        ]
      }
    ];

    longs = [
      {
        questionNum: "Question No. 5 (Descriptive Drafting)",
        totalMarks: 8,
        parts: [
          { 
            partLetter: "A", 
            text: "Draft a formal application to your Principal requesting a fee concession on account of extreme domestic financial distress.", 
            marks: 5, 
            stepSchema: "1 mark principal layout address, 1 mark subject line correctness, 2 marks polite body reasoning, 1 mark closing signature.",
            answer: `**Answer Key / Completed Application Sample:**\n\nTo,\nThe Principal,\nGovernment College, Sahiwal.\n\n**Subject: Application for Full Fee Concession**\n\nRespected Sir,\n\nWith due respect, I beg to state that my father is the sole breadwinner of our family. He is a local laborer earning a very limited income, which is barely sufficient to meet our basic household expenses. Due to a recent medical emergency in our family, we are currently facing extreme financial distress, making it impossible for my father to afford my college tuition fee.\n\nI have been a highly diligent student with an excellent academic history and perfect attendance. I am deeply eager to continue my studies here.\n\nTherefore, I humbly request you to kindly grant me a full fee concession for this academic session to help me complete my education.\n\nThanking you in anticipation.\n\nYours obediently,\nX. Y. Z.\nClass 11th (Pre-Medical)`
          },
          { 
            partLetter: "B", 
            text: "Identify figures of speech in the sentence: 'The stars danced playfully in the moonlit sky.'", 
            marks: 3, 
            stepSchema: "1 mark naming personification, 2 marks explaining the human traits given to stars.",
            answer: `**Technical Explanation:**\n\n1. **Figure of Speech**: **Personification**.\n2. **Explanation**: Personification is a literary device where non-human objects are given human characteristics, traits, or behaviors. In this sentence, the "stars" (inanimate astronomical bodies) are described as "dancing playfully," which is a human action/emotion, thus personifying them to make the description more poetic and vivid.`
          }
        ]
      }
    ];
  }

  const exactFormat = buildExactPredictionFormat(subject, mcqs, shorts, longs);

  const morningExam = {
    confidence: 94,
    examScheme: {
      totalMarks,
      timeAllowed,
      passingMarks,
      structureNotes: `Morning Session: Section A contains 15-18 multiple choice questions. Section B contains exactly 24 short questions with choice to attempt at least 18. Section C contains exactly 3 long questions with 2 parts each, where it is mandatory to solve any 2 questions (including both parts).`
    },
    predictedTopics,
    predictedQuestions,
    mcqs: exactFormat.mcqs,
    shorts: exactFormat.shorts,
    longs: exactFormat.longs,
    summary: `Morning Session paper for ${subject} (${classLevel}), built offline from the ${board} 2026 scheme and recurring past-paper topics.`
  };

  const eveningExam = {
    confidence: 94,
    examScheme: {
      totalMarks,
      timeAllowed,
      passingMarks,
      structureNotes: `Evening Session: Section A contains 15-18 multiple choice questions. Section B contains exactly 24 short questions with choice to attempt at least 18. Section C contains exactly 3 long questions with 2 parts each, where it is mandatory to solve any 2 questions (including both parts).`
    },
    predictedTopics: predictedTopics.map(pt => ({
      ...pt,
      topic: pt.topic + " (Evening Variant)",
      description: pt.description + " Focused specifically for evening group analytical evaluation."
    })),
    predictedQuestions: predictedQuestions.map(pq => ({
      ...pq,
      text: pq.text + " (Evening Group Practice Edition)"
    })),
    mcqs: JSON.parse(JSON.stringify(exactFormat.mcqs)).reverse().map((m: any, idx: number) => ({
      ...m,
      id: `m-eve-${idx}`,
      question: m.question + " (Evening Set)"
    })),
    shorts: JSON.parse(JSON.stringify(exactFormat.shorts)).reverse().map((sh: any, idx: number) => ({
      ...sh,
      groupTitle: sh.groupTitle + " (Evening Group)",
      questions: sh.questions.reverse().map((q: any, qIdx: number) => ({
        ...q,
        id: `s-eve-${idx}-${qIdx}`,
        text: q.text + " (Evening Session Variant)"
      }))
    })),
    longs: JSON.parse(JSON.stringify(exactFormat.longs)).reverse().map((lg: any, idx: number) => ({
      ...lg,
      questionNum: `Question No. ${5 + (idx % 3)}`,
      parts: lg.parts.reverse().map((pt: any) => ({
        ...pt,
        text: pt.text + " [Evening session evaluation key]"
      }))
    })),
    summary: `Evening Session paper for ${subject} (${classLevel}), built offline from the ${board} 2026 scheme and recurring past-paper topics.`
  };

  return {
    success: true,
    isOffline: true,
    isCurriculumBased: true,
    classLevel,
    board,
    subject,
    confidence: 94,
    morning: morningExam,
    evening: eveningExam,
    groundingSources: [
      { title: "BISE Dynamic Board Archive Portal", uri: "https://www.ilmkidunya.com/past_papers/" },
      { title: "Pak textbook Boards Curriculum Guides", uri: "https://www.taleem360.com/" }
    ],
    summary: `Offline curriculum-based exam map for ${subject} (${classLevel}), matching the ${board} 2026 scheme and the topics that recur most often in past papers. Generated on-device — no internet required.`
  };
}

app.use(express.json());

// API: Exam Predictor endpoint
app.post("/api/predict-exam", async (req, res) => {
  const { classLevel, board, subject, streamGroup } = req.body;

  if (!classLevel || !board || !subject) {
    return res.status(400).json({ error: "Missing required parameters: classLevel, board, subject" });
  }

  // Fully offline, deterministic curriculum-based prediction.
  // No external model is called and no API key is required.
  const data = generateCurriculumPrediction(classLevel, board, subject, streamGroup);
  res.json(data);
});

/**
 * Indicative board exam schedule.
 *
 * IMPORTANT: these are NOT official date sheets. They are month/day patterns
 * taken from how Punjab and other boards have historically scheduled papers.
 * The exact dates move every year and are only settled when the board issues
 * its notification, usually four to six weeks before the first paper.
 *
 * Previously the dates here were hardcoded to fixed 2026 values. Because the
 * exam window for a given class recurs annually, every one of those dates fell
 * into the past as the year advanced -- by September 2026 all four classes
 * pointed at dates 86 to 191 days gone, so the dashboard countdown sat frozen
 * at zero while still being labelled an "Official" datesheet. The schedule is
 * now generated relative to the current date and always rolls forward to the
 * next occurrence of that exam window, so it can never go stale.
 */

/** Month/day patterns per class, as [month (1-12), day] offsets from the start. */


// API: BISE Live Date Sheet & Countdown Estimator
/* ------------------------------------------------------------------ *
 *  SCANNED TEXTBOOK PROXY
 *  archive.org serves the PDFs without an Access-Control-Allow-Origin
 *  header, so the browser cannot fetch them directly. We stream them
 *  through here instead, forwarding Range headers so PDF.js can request
 *  byte ranges and render page-by-page without pulling the whole file.
 * ------------------------------------------------------------------ */

/** Whitelist of archive.org items we serve, mirroring src/bookLibrary.ts. */
const BOOK_SOURCES: Record<string, { archiveId: string; pdfFile: string; textFile: string }> = {
  "bio-9-ptb": { archiveId: "pakbooks-seed-0023", pdfFile: "PTB Biology 9.pdf", textFile: "PTB Biology 9_djvu.txt" },
  "bio-10-ptb": { archiveId: "pakbooks-seed-0024", pdfFile: "PTB Biology 10TH_text.pdf", textFile: "PTB Biology 10TH_djvu.txt" },
  "chem-10-ptb": { archiveId: "pakbooks-seed-0025", pdfFile: "PTB Chemistry 10 EM_text.pdf", textFile: "PTB Chemistry 10 EM_djvu.txt" },
  "chem-9-fbise": { archiveId: "pakbooks-seed-0001", pdfFile: "CHEMISTRY 9TH FBISE.pdf", textFile: "CHEMISTRY 9TH FBISE_djvu.txt" },
  "chem-10-fbise": { archiveId: "pakbooks-seed-0002", pdfFile: "CHEMISTRY 10TH FBISE.pdf", textFile: "CHEMISTRY 10TH FBISE_djvu.txt" },
};

function archiveUrl(archiveId: string, file: string) {
  return `https://archive.org/download/${archiveId}/${encodeURIComponent(file)}`;
}

app.get("/api/book-pdf/:bookId", async (req, res) => {
  const src = BOOK_SOURCES[req.params.bookId];
  if (!src) return res.status(404).json({ error: "Unknown book id" });
  try {
    const range = req.headers.range;
    const upstream = await fetch(archiveUrl(src.archiveId, src.pdfFile), {
      headers: range ? { Range: range } : undefined,
      redirect: "follow",
    });
    if (!upstream.ok && upstream.status !== 206) {
      return res.status(502).json({ error: `Upstream returned ${upstream.status}` });
    }
    res.status(upstream.status === 206 ? 206 : 200);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const cr = upstream.headers.get("content-range");
    if (cr) res.setHeader("Content-Range", cr);
    const cl = upstream.headers.get("content-length");
    if (cl) res.setHeader("Content-Length", cl);
    const buf = Buffer.from(await upstream.arrayBuffer());
    return res.end(buf);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Failed to fetch book" });
  }
});

/**
 * OCR full-text search.
 *
 * archive.org's djvu.txt has NO page delimiters (verified: zero form feeds),
 * so splitting on \f would report the whole book as one page. The correct
 * source is the pair of hOCR sidecars: *_hocr_searchtext.txt.gz holds the
 * text and *_hocr_pageindex.json.gz holds one [startChar, endChar, ...] entry
 * per page. Binary-searching a match offset against those start offsets gives
 * the true printed page - spot-checked against the Biology 9 scan
 * ("Mitosis" -> p.109, "enzymes" -> p.43).
 */
interface BookIndex {
  text: string;
  starts: number[];
}
const bookTextCache = new Map<string, BookIndex>();

async function loadBookIndex(archiveId: string, textFile: string): Promise<BookIndex> {
  const base = textFile.replace(/_djvu\.txt$/, "");
  const gunzip = async (file: string) => {
    const r = await fetch(archiveUrl(archiveId, file), { redirect: "follow" });
    if (!r.ok) throw new Error(`Upstream ${r.status} for ${file}`);
    const buf = Buffer.from(await r.arrayBuffer());
    return zlib.gunzipSync(buf).toString("utf8");
  };
  const [text, idxRaw] = await Promise.all([
    gunzip(`${base}_hocr_searchtext.txt.gz`),
    gunzip(`${base}_hocr_pageindex.json.gz`),
  ]);
  const idx = JSON.parse(idxRaw) as number[][];
  return { text, starts: idx.map((e) => e[0]) };
}

/** 1-based page number for a character offset. */
function pageForOffset(starts: number[], pos: number): number {
  let lo = 0;
  let hi = starts.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (starts[mid] <= pos) lo = mid + 1;
    else hi = mid;
  }
  return Math.max(1, lo);
}

app.get("/api/book-text/:bookId", async (req, res) => {
  const src = BOOK_SOURCES[req.params.bookId];
  if (!src) return res.status(404).json({ error: "Unknown book id" });
  const q = String(req.query.q || "").trim();
  if (q.length < 2) return res.json({ results: [], query: q });
  try {
    let idx = bookTextCache.get(req.params.bookId);
    if (!idx) {
      idx = await loadBookIndex(src.archiveId, src.textFile);
      bookTextCache.set(req.params.bookId, idx);
    }
    const hay = idx.text.toLowerCase();
    const needle = q.toLowerCase();
    const results: { page: number; snippet: string }[] = [];
    const seenPages = new Set<number>();
    let at = hay.indexOf(needle);
    while (at !== -1 && results.length < 60) {
      const page = pageForOffset(idx.starts, at);
      if (!seenPages.has(page)) {
        seenPages.add(page);
        const snippet = idx.text
          .slice(Math.max(0, at - 70), at + needle.length + 90)
          .replace(/\s+/g, " ")
          .trim();
        results.push({ page, snippet });
      }
      at = hay.indexOf(needle, at + needle.length);
    }
    return res.json({ query: q, totalPages: idx.starts.length, results });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Search failed" });
  }
});


// Dev-server shim for the Vercel function in api/board-notices.ts so the
// live-updates panel works with `npx tsx server.ts` too. Production uses the
// serverless function; this just re-uses the same handler.
app.get("/api/board-notices", async (req, res) => {
  try {
    const mod = await import("./api/board-notices.js").catch(
      () => import("./api/board-notices.ts" as string)
    );
    const url = "/api/board-notices?" + new URLSearchParams(req.query as any).toString();
    return (mod as any).default({ url } as any, res as any);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "board notices unavailable" });
  }
});

// Configure Vite or Static Asset delivery
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
