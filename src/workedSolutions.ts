/**
 * WORKED TEXTBOOK EXERCISE SOLUTIONS + MATHS THEOREMS
 * ------------------------------------------------------------------
 * Hand-authored, board-format solutions for exercise questions of the kind
 * printed in PTB/FBISE textbooks, plus the geometry theorems that carry marks
 * in the Maths paper.
 *
 * HONESTY NOTE - please read before extending this file:
 * These are *representative* exercise problems in the exact style, difficulty
 * and numbers used by Pakistani board textbooks. They are NOT claimed to be a
 * verbatim reproduction of any single edition's numbering, because exercise
 * numbering differs between PTB, FBISE, KPK and Sindh editions and between
 * print years. Each entry therefore records the chapter it belongs to rather
 * than asserting "Exercise 3.2 Q4 of the 2023 PTB print".
 *
 * Auto-extracting the real exercises from the scanned books was attempted and
 * rejected: the OCR renders chemistry as "CaCOx) —> Ca0q + COr)", which would
 * have produced confidently wrong equations and answers. Wrong solutions are
 * far worse for a student than fewer solutions.
 *
 * FORMAT RULE (from AGENTS.md): every numerical shows Given -> Formula ->
 * Intermediate steps -> Final answer with SI units. Every step here is
 * arithmetically verified by a test harness.
 */

export type WorkedSubject =
  | "physics"
  | "chemistry"
  | "math"
  | "biology"
  /** I.Com Principles of Accounting - numerical/practical questions. */
  | "accounting";
export type WorkedClass = "9th" | "10th" | "11th" | "12th";

export interface WorkedStep {
  label: string;
  value: string;
}

export interface WorkedProblem {
  id: string;
  classLevel: WorkedClass;
  subject: WorkedSubject;
  chapter: string;
  /** "numerical" shows Given/Formula/Steps; "theorem" shows a proof table. */
  kind: "numerical" | "theorem" | "concept";
  question: string;
  /** Roman-Urdu restatement so weaker students grasp what is being asked. */
  romanUrdu: string;
  /** Data extracted from the statement (numericals only). */
  given?: WorkedStep[];
  /** Formula(e) used, as printed in the textbook. */
  formula?: string;
  /** For theorems: what is assumed and what must be shown. */
  toProve?: string;
  construction?: string;
  /** The working, in order. Theorem proofs put the reason in `value`. */
  steps: WorkedStep[];
  /** Final boxed answer with units, or "Hence proved". */
  answer: string;
  /** Common mistake students make - high value for exam marks. */
  examTip?: string;
}

/* ===================== 9TH PHYSICS ===================== */
const physics9: WorkedProblem[] = [
  {
    id: "p9-kin-1",
    classLevel: "9th",
    subject: "physics",
    chapter: "Kinematics",
    kind: "numerical",
    question:
      "A car starts from rest and attains a velocity of 20 m/s in 8 seconds. Find its acceleration and the distance it covers in this time.",
    romanUrdu:
      "Gaari rest se shuru hoti hai aur 8 second mein 20 m/s ki raftaar pakadti hai. Acceleration aur distance nikalein.",
    given: [
      { label: "Initial velocity", value: "v_i = 0 m/s (starts from rest)" },
      { label: "Final velocity", value: "v_f = 20 m/s" },
      { label: "Time", value: "t = 8 s" },
    ],
    formula: "v_f = v_i + a t   and   S = v_i t + ½ a t²",
    steps: [
      { label: "Rearranging for a", value: "a = (v_f − v_i) / t" },
      { label: "Substituting", value: "a = (20 − 0) / 8 = 20 / 8" },
      { label: "Acceleration", value: "a = 2.5 m/s²" },
      { label: "Now for distance", value: "S = v_i t + ½ a t² = 0 + ½ × 2.5 × (8)²" },
      { label: "Computing", value: "S = 0.5 × 2.5 × 64 = 80" },
    ],
    answer: "a = 2.5 m/s² and S = 80 m",
    examTip:
      "\"Starts from rest\" ka matlab hamesha v_i = 0 hota hai. Yeh line miss karna sab se aam ghalti hai.",
  },
  {
    id: "p9-kin-2",
    classLevel: "9th",
    subject: "physics",
    chapter: "Kinematics",
    kind: "numerical",
    question:
      "A body is dropped from a height of 45 m. How long does it take to reach the ground, and with what velocity does it strike? (g = 10 m/s²)",
    romanUrdu:
      "45 metre bulandi se jism giraya gaya. Zameen tak pohanchne ka waqt aur takrane ki velocity nikalein.",
    given: [
      { label: "Height", value: "S = 45 m" },
      { label: "Initial velocity", value: "v_i = 0 m/s (dropped)" },
      { label: "Acceleration", value: "a = g = 10 m/s²" },
    ],
    formula: "S = v_i t + ½ g t²   and   v_f = v_i + g t",
    steps: [
      { label: "Since v_i = 0", value: "S = ½ g t²" },
      { label: "Substituting", value: "45 = ½ × 10 × t² = 5 t²" },
      { label: "Solving for t²", value: "t² = 45 / 5 = 9" },
      { label: "Taking square root", value: "t = 3 s" },
      { label: "Now velocity", value: "v_f = 0 + 10 × 3 = 30" },
    ],
    answer: "t = 3 s and v_f = 30 m/s",
    examTip:
      "Free fall mein neeche ki taraf motion ko positive lein to g bhi positive rakhein - signs mix na karein.",
  },
  {
    id: "p9-dyn-1",
    classLevel: "9th",
    subject: "physics",
    chapter: "Dynamics",
    kind: "numerical",
    question:
      "A force of 150 N acts on a mass of 50 kg resting on a smooth surface. Find the acceleration produced and the velocity after 4 seconds.",
    romanUrdu:
      "50 kg ke jism par 150 N force lagti hai. Acceleration aur 4 second baad velocity nikalein.",
    given: [
      { label: "Force", value: "F = 150 N" },
      { label: "Mass", value: "m = 50 kg" },
      { label: "Time", value: "t = 4 s" },
      { label: "Initial velocity", value: "v_i = 0 m/s (at rest)" },
    ],
    formula: "F = m a   and   v_f = v_i + a t",
    steps: [
      { label: "Rearranging", value: "a = F / m" },
      { label: "Substituting", value: "a = 150 / 50" },
      { label: "Acceleration", value: "a = 3 m/s²" },
      { label: "Velocity after 4 s", value: "v_f = 0 + 3 × 4 = 12" },
    ],
    answer: "a = 3 m/s² and v_f = 12 m/s",
    examTip: "Smooth surface ka matlab friction zero - warna F_net = F − friction lena parta.",
  },
  {
    id: "p9-dyn-2",
    classLevel: "9th",
    subject: "physics",
    chapter: "Dynamics",
    kind: "numerical",
    question:
      "A 1000 kg car moving at 20 m/s is brought to rest in 5 seconds. Find the retarding force applied by the brakes.",
    romanUrdu:
      "1000 kg gaari 20 m/s se chal rahi hai aur 5 second mein ruk jaati hai. Brake ki force nikalein.",
    given: [
      { label: "Mass", value: "m = 1000 kg" },
      { label: "Initial velocity", value: "v_i = 20 m/s" },
      { label: "Final velocity", value: "v_f = 0 m/s (comes to rest)" },
      { label: "Time", value: "t = 5 s" },
    ],
    formula: "a = (v_f − v_i) / t   and   F = m a",
    steps: [
      { label: "Acceleration", value: "a = (0 − 20) / 5 = −4 m/s²" },
      { label: "Negative sign", value: "The minus shows retardation (deceleration)" },
      { label: "Force", value: "F = 1000 × (−4) = −4000 N" },
    ],
    answer: "F = 4000 N, directed opposite to the motion (retarding force)",
    examTip:
      "Answer mein negative sign ka matlab likhna zaroori hai - examiner direction ka marks deta hai.",
  },
  {
    id: "p9-work-1",
    classLevel: "9th",
    subject: "physics",
    chapter: "Work and Energy",
    kind: "numerical",
    question:
      "A boy of mass 40 kg climbs a staircase of height 5 m in 10 seconds. Find the work done and his power. (g = 10 m/s²)",
    romanUrdu:
      "40 kg ka larka 5 metre ki seerhiyan 10 second mein charhta hai. Kaam aur power nikalein.",
    given: [
      { label: "Mass", value: "m = 40 kg" },
      { label: "Height", value: "h = 5 m" },
      { label: "Time", value: "t = 10 s" },
      { label: "Gravity", value: "g = 10 m/s²" },
    ],
    formula: "W = m g h   and   P = W / t",
    steps: [
      { label: "Work done against gravity", value: "W = 40 × 10 × 5" },
      { label: "Computing", value: "W = 2000 J" },
      { label: "Power", value: "P = W / t = 2000 / 10" },
      { label: "Computing", value: "P = 200 W" },
    ],
    answer: "W = 2000 J and P = 200 W",
    examTip: "Seerhi charhne mein kaam sirf vertical height par hota hai, seerhi ki lambai par nahi.",
  },
  {
    id: "p9-heat-1",
    classLevel: "9th",
    subject: "physics",
    chapter: "Thermal Properties of Matter",
    kind: "numerical",
    question:
      "How much heat is required to raise the temperature of 2 kg of water from 20 °C to 70 °C? (c = 4200 J/kg·K)",
    romanUrdu:
      "2 kg paani ka temperature 20 °C se 70 °C tak le jaane ke liye kitni heat chahiye?",
    given: [
      { label: "Mass", value: "m = 2 kg" },
      { label: "Specific heat", value: "c = 4200 J/kg·K" },
      { label: "Temperature change", value: "ΔT = 70 − 20 = 50 K" },
    ],
    formula: "Q = m c ΔT",
    steps: [
      { label: "Substituting", value: "Q = 2 × 4200 × 50" },
      { label: "Computing", value: "Q = 8400 × 50" },
      { label: "Result", value: "Q = 420000 J" },
      { label: "In kilojoules", value: "Q = 420 kJ" },
    ],
    answer: "Q = 4.2 × 10⁵ J (420 kJ)",
    examTip:
      "ΔT ke liye Celsius ka difference aur Kelvin ka difference barabar hota hai - convert karne ki zaroorat nahi.",
  },
];

/* ===================== 10TH PHYSICS ===================== */
const physics10: WorkedProblem[] = [
  {
    id: "p10-wave-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Simple Harmonic Motion and Waves",
    kind: "numerical",
    question:
      "A wave of frequency 500 Hz travels with a speed of 350 m/s. Find its wavelength and time period.",
    romanUrdu: "500 Hz ki wave 350 m/s se safar karti hai. Wavelength aur time period nikalein.",
    given: [
      { label: "Frequency", value: "f = 500 Hz" },
      { label: "Speed", value: "v = 350 m/s" },
    ],
    formula: "v = f λ   and   T = 1 / f",
    steps: [
      { label: "Rearranging", value: "λ = v / f" },
      { label: "Substituting", value: "λ = 350 / 500" },
      { label: "Wavelength", value: "λ = 0.7 m" },
      { label: "Time period", value: "T = 1 / 500 = 0.002 s" },
    ],
    answer: "λ = 0.7 m and T = 2 × 10⁻³ s",
    examTip: "Frequency ka unit hertz (Hz) hai = per second, isi liye T = 1/f seedha nikal aata hai.",
  },
  {
    id: "p10-opt-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Geometrical Optics",
    kind: "numerical",
    question:
      "An object is placed 30 cm from a convex lens of focal length 10 cm. Find the position of the image.",
    romanUrdu:
      "10 cm focal length ke convex lens se 30 cm door object rakha hai. Image kahan banegi?",
    given: [
      { label: "Object distance", value: "p = 30 cm" },
      { label: "Focal length", value: "f = 10 cm (convex, so positive)" },
    ],
    formula: "1/f = 1/p + 1/q",
    steps: [
      { label: "Rearranging", value: "1/q = 1/f − 1/p" },
      { label: "Substituting", value: "1/q = 1/10 − 1/30" },
      { label: "Common denominator", value: "1/q = 3/30 − 1/30 = 2/30" },
      { label: "Simplifying", value: "1/q = 1/15" },
      { label: "Inverting", value: "q = 15 cm" },
    ],
    answer: "q = 15 cm on the opposite side (real, inverted image)",
    examTip:
      "Positive q ka matlab real image hai jo lens ke doosri taraf banti hai. Convex lens ki f positive, concave ki negative.",
  },
  {
    id: "p10-elec-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Current Electricity",
    kind: "numerical",
    question:
      "An electric bulb draws a current of 0.5 A when connected to a 220 V supply. Find its resistance and the power consumed.",
    romanUrdu:
      "220 V par bulb 0.5 A current leta hai. Uski resistance aur power nikalein.",
    given: [
      { label: "Voltage", value: "V = 220 V" },
      { label: "Current", value: "I = 0.5 A" },
    ],
    formula: "V = I R   and   P = V I",
    steps: [
      { label: "Rearranging Ohm's law", value: "R = V / I" },
      { label: "Substituting", value: "R = 220 / 0.5" },
      { label: "Resistance", value: "R = 440 Ω" },
      { label: "Power", value: "P = V I = 220 × 0.5" },
      { label: "Computing", value: "P = 110 W" },
    ],
    answer: "R = 440 Ω and P = 110 W",
    examTip: "Power ke teen formulay hain: P = VI = I²R = V²/R. Jo data mila ho uske hisaab se chunein.",
  },
  {
    id: "p10-nuc-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Atomic and Nuclear Physics",
    kind: "numerical",
    question:
      "The half-life of a radioactive element is 20 days. If the initial mass is 80 g, how much remains after 60 days?",
    romanUrdu:
      "Radioactive element ki half-life 20 din hai. 80 g se shuru kar ke 60 din baad kitna bachega?",
    given: [
      { label: "Half-life", value: "T½ = 20 days" },
      { label: "Initial mass", value: "N₀ = 80 g" },
      { label: "Time elapsed", value: "t = 60 days" },
    ],
    formula: "N = N₀ × (1/2)^(t / T½)",
    steps: [
      { label: "Number of half-lives", value: "n = t / T½ = 60 / 20 = 3" },
      { label: "After 1st half-life", value: "80 → 40 g" },
      { label: "After 2nd half-life", value: "40 → 20 g" },
      { label: "After 3rd half-life", value: "20 → 10 g" },
    ],
    answer: "10 g of the element remains",
    examTip:
      "Half-life ke sawaal mein pehle 'kitni half-lives guzrin' nikalein - phir baar baar aadha karte jayein.",
  },
];

/* ===================== 9TH & 10TH CHEMISTRY ===================== */
const chemistry: WorkedProblem[] = [
  {
    id: "c9-mole-1",
    classLevel: "9th",
    subject: "chemistry",
    chapter: "Fundamentals of Chemistry",
    kind: "numerical",
    question:
      "Calculate the number of moles and the number of molecules in 90 g of water (H₂O).",
    romanUrdu: "90 gram paani mein kitne moles aur kitne molecules hain?",
    given: [
      { label: "Mass", value: "m = 90 g" },
      { label: "Molar mass of H₂O", value: "M = 2(1) + 16 = 18 g/mol" },
    ],
    formula: "n = m / M   and   N = n × 6.022 × 10²³",
    steps: [
      { label: "Moles", value: "n = 90 / 18" },
      { label: "Computing", value: "n = 5 mol" },
      { label: "Molecules", value: "N = 5 × 6.022 × 10²³" },
      { label: "Computing", value: "N = 3.011 × 10²⁴" },
    ],
    answer: "n = 5 mol and N = 3.011 × 10²⁴ molecules",
    examTip:
      "Molar mass nikalte waqt har atom ka atomic mass jama karein: H₂O = 1+1+16 = 18, na ke 17.",
  },
  {
    id: "c9-sol-1",
    classLevel: "9th",
    subject: "chemistry",
    chapter: "Solutions",
    kind: "numerical",
    question:
      "Calculate the molarity of a solution containing 20 g of NaOH dissolved in 500 cm³ of solution.",
    romanUrdu: "500 cm³ solution mein 20 g NaOH hai. Molarity nikalein.",
    given: [
      { label: "Mass of NaOH", value: "m = 20 g" },
      { label: "Molar mass of NaOH", value: "M = 23 + 16 + 1 = 40 g/mol" },
      { label: "Volume", value: "V = 500 cm³ = 0.5 dm³" },
    ],
    formula: "n = m / M   and   Molarity = n / V(dm³)",
    steps: [
      { label: "Moles of NaOH", value: "n = 20 / 40 = 0.5 mol" },
      { label: "Converting volume", value: "500 cm³ ÷ 1000 = 0.5 dm³" },
      { label: "Molarity", value: "M = 0.5 / 0.5" },
      { label: "Computing", value: "M = 1 mol/dm³" },
    ],
    answer: "Molarity = 1 mol/dm³ (1 M solution)",
    examTip:
      "Volume ko hamesha dm³ (litre) mein convert karein. 1 dm³ = 1000 cm³ - yeh conversion bhoolna aam ghalti hai.",
  },
  {
    id: "c10-ph-1",
    classLevel: "10th",
    subject: "chemistry",
    chapter: "Acids, Bases and Salts",
    kind: "numerical",
    question:
      "A solution has a hydrogen ion concentration of 1 × 10⁻⁴ mol/dm³. Calculate its pH and pOH, and state whether it is acidic or basic.",
    romanUrdu:
      "Solution mein [H⁺] = 1 × 10⁻⁴ hai. pH aur pOH nikalein aur bataein acidic hai ya basic.",
    given: [{ label: "Hydrogen ion concentration", value: "[H⁺] = 1 × 10⁻⁴ mol/dm³" }],
    formula: "pH = −log[H⁺]   and   pH + pOH = 14",
    steps: [
      { label: "Applying formula", value: "pH = −log(1 × 10⁻⁴)" },
      { label: "Using log rule", value: "log(10⁻⁴) = −4" },
      { label: "So", value: "pH = −(−4) = 4" },
      { label: "Finding pOH", value: "pOH = 14 − 4 = 10" },
      { label: "Interpretation", value: "pH = 4 is less than 7" },
    ],
    answer: "pH = 4, pOH = 10 — the solution is acidic",
    examTip:
      "pH 7 se kam = acidic, 7 se zyada = basic. Sirf number likhna kaafi nahi, nature bhi likhein.",
  },
  {
    id: "c10-eq-1",
    classLevel: "10th",
    subject: "chemistry",
    chapter: "Chemical Equilibrium",
    kind: "concept",
    question:
      "State Le Chatelier's principle and explain the effect of increasing pressure on the equilibrium: N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
    romanUrdu:
      "Le Chatelier ka usool bayan karein aur batayein ke pressure barhane se is reaction par kya asar hoga.",
    steps: [
      {
        label: "Statement",
        value:
          "If a stress (change in concentration, pressure or temperature) is applied to a system at equilibrium, the system shifts in the direction that relieves that stress.",
      },
      { label: "Counting moles of gas", value: "Left side: 1 + 3 = 4 moles. Right side: 2 moles." },
      {
        label: "Applying the principle",
        value:
          "Increasing pressure favours the side with fewer gas molecules, because that reduces the volume and so relieves the pressure.",
      },
      {
        label: "Direction of shift",
        value: "The equilibrium shifts to the right (forward direction), towards NH₃.",
      },
      { label: "Result", value: "The yield of ammonia increases." },
    ],
    answer:
      "Increasing pressure shifts the equilibrium forward, increasing the yield of NH₃ (this is why the Haber process runs at high pressure).",
    examTip:
      "Pressure ka asar sirf gases par hota hai. Dono taraf moles barabar hon to pressure ka koi asar nahi hoga.",
  },
];

/* ===================== MATHS: NUMERICALS ===================== */
const math: WorkedProblem[] = [
  {
    id: "m10-quad-1",
    classLevel: "10th",
    subject: "math",
    chapter: "Quadratic Equations",
    kind: "numerical",
    question: "Solve the quadratic equation 2x² − 7x + 3 = 0 using the quadratic formula.",
    romanUrdu: "Quadratic formula se yeh equation hal karein.",
    given: [
      { label: "Coefficients", value: "a = 2, b = −7, c = 3" },
    ],
    formula: "x = [−b ± √(b² − 4ac)] / 2a",
    steps: [
      { label: "Discriminant", value: "b² − 4ac = (−7)² − 4(2)(3) = 49 − 24 = 25" },
      { label: "Nature of roots", value: "D = 25 > 0 and a perfect square, so roots are real, distinct and rational" },
      { label: "Square root", value: "√25 = 5" },
      { label: "Substituting", value: "x = [7 ± 5] / (2 × 2) = [7 ± 5] / 4" },
      { label: "First root", value: "x₁ = (7 + 5)/4 = 12/4 = 3" },
      { label: "Second root", value: "x₂ = (7 − 5)/4 = 2/4 = 1/2" },
    ],
    answer: "x = 3 or x = 1/2",
    examTip:
      "b = −7 hai, to −b = +7. Sign ki ghalti sab se zyada marks zaya karti hai - bracket lagaa kar likhein.",
  },
  {
    id: "m10-coord-1",
    classLevel: "10th",
    subject: "math",
    chapter: "Introduction to Coordinate Geometry",
    kind: "numerical",
    question:
      "Show that the points A(1, 2), B(4, 6) and C(1, 6) form a right-angled triangle.",
    romanUrdu:
      "Sabit karein ke yeh teen points mil kar right-angled triangle banate hain.",
    given: [{ label: "Points", value: "A(1, 2), B(4, 6), C(1, 6)" }],
    formula: "d = √[(x₂−x₁)² + (y₂−y₁)²]  and Pythagoras: hyp² = base² + perp²",
    steps: [
      { label: "|AB|", value: "√[(4−1)² + (6−2)²] = √[9 + 16] = √25 = 5" },
      { label: "|BC|", value: "√[(1−4)² + (6−6)²] = √[9 + 0] = 3" },
      { label: "|AC|", value: "√[(1−1)² + (6−2)²] = √[0 + 16] = 4" },
      { label: "Testing Pythagoras", value: "|BC|² + |AC|² = 9 + 16 = 25" },
      { label: "Compare", value: "|AB|² = 25, which equals 9 + 16" },
    ],
    answer: "Since |AB|² = |BC|² + |AC|², the triangle is right-angled at C. Hence proved.",
    examTip:
      "Sab se lambi side hamesha hypotenuse hoti hai - pehle teeno lambaiyan nikaal kar sab se bari chunein.",
  },
  {
    id: "m9-mens-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Mensuration",
    kind: "numerical",
    question:
      "Find the volume and total surface area of a cylinder of radius 7 cm and height 10 cm. (π = 22/7)",
    romanUrdu: "7 cm radius aur 10 cm height wale cylinder ka hajm aur total surface area nikalein.",
    given: [
      { label: "Radius", value: "r = 7 cm" },
      { label: "Height", value: "h = 10 cm" },
      { label: "Pi", value: "π = 22/7" },
    ],
    formula: "V = π r² h   and   A = 2πr(r + h)",
    steps: [
      { label: "Volume", value: "V = (22/7) × 7² × 10 = (22/7) × 49 × 10" },
      { label: "Simplifying", value: "V = 22 × 7 × 10 = 1540" },
      { label: "Surface area", value: "A = 2 × (22/7) × 7 × (7 + 10)" },
      { label: "Simplifying", value: "A = 2 × 22 × 17 = 748" },
    ],
    answer: "V = 1540 cm³ and A = 748 cm²",
    examTip:
      "Jab radius 7 ka multiple ho to π = 22/7 lein - calculation saaf kat jaati hai aur time bachta hai.",
  },
  {
    id: "m12-diff-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Differentiation",
    kind: "numerical",
    question: "Differentiate y = 3x⁴ − 5x² + 7x − 2 with respect to x, and find dy/dx at x = 1.",
    romanUrdu: "Is function ka derivative nikalein aur x = 1 par uski qeemat maloom karein.",
    given: [{ label: "Function", value: "y = 3x⁴ − 5x² + 7x − 2" }],
    formula: "d/dx (a xⁿ) = n a xⁿ⁻¹, and the derivative of a constant is 0",
    steps: [
      { label: "Term 1", value: "d/dx(3x⁴) = 4 × 3 x³ = 12x³" },
      { label: "Term 2", value: "d/dx(−5x²) = 2 × (−5) x = −10x" },
      { label: "Term 3", value: "d/dx(7x) = 7" },
      { label: "Term 4", value: "d/dx(−2) = 0" },
      { label: "Combining", value: "dy/dx = 12x³ − 10x + 7" },
      { label: "At x = 1", value: "12(1) − 10(1) + 7 = 12 − 10 + 7 = 9" },
    ],
    answer: "dy/dx = 12x³ − 10x + 7, and at x = 1 its value is 9",
    examTip: "Constant ka derivative hamesha zero hota hai - usay likhna mat bhoolein warna step miss lagta hai.",
  },
  {
    id: "m12-int-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Integration",
    kind: "numerical",
    question: "Evaluate the definite integral of (2x + 3) with respect to x from x = 0 to x = 2.",
    romanUrdu: "0 se 2 tak is function ka definite integral nikalein.",
    given: [{ label: "Integral", value: "∫₀² (2x + 3) dx" }],
    formula: "∫ xⁿ dx = x^(n+1)/(n+1), then apply limits F(b) − F(a)",
    steps: [
      { label: "Antiderivative of 2x", value: "2 × x²/2 = x²" },
      { label: "Antiderivative of 3", value: "3x" },
      { label: "So F(x)", value: "F(x) = x² + 3x" },
      { label: "Upper limit", value: "F(2) = (2)² + 3(2) = 4 + 6 = 10" },
      { label: "Lower limit", value: "F(0) = 0 + 0 = 0" },
      { label: "Subtracting", value: "F(2) − F(0) = 10 − 0" },
    ],
    answer: "The value of the integral is 10",
    examTip:
      "Definite integral mein constant C likhne ki zaroorat nahi - woh subtract hote waqt khatam ho jaata hai.",
  },
];

/* ===================== MATHS: THEOREMS ===================== */
const theorems: WorkedProblem[] = [
  {
    id: "th-pythagoras",
    classLevel: "9th",
    subject: "math",
    chapter: "Theorems (Pythagoras)",
    kind: "theorem",
    question:
      "Pythagoras' theorem: In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
    romanUrdu:
      "Right-angle triangle mein hypotenuse ka square, baaqi dono sides ke squares ke jama ke barabar hota hai.",
    toProve: "In △ABC with ∠B = 90°, prove that |AC|² = |AB|² + |BC|²",
    construction:
      "Draw BD perpendicular from B to the hypotenuse AC, meeting AC at D.",
    steps: [
      { label: "In △ADB and △ABC", value: "∠A is common to both triangles" },
      { label: "Right angles", value: "∠ADB = ∠ABC = 90° (by construction and given)" },
      { label: "Similarity", value: "△ADB ~ △ABC (AA similarity postulate)" },
      { label: "Corresponding sides", value: "AD/AB = AB/AC, therefore |AB|² = AD × AC  ...(i)" },
      { label: "Similarly, in △BDC and △ABC", value: "∠C is common and ∠BDC = ∠ABC = 90°" },
      { label: "Similarity", value: "△BDC ~ △ABC (AA similarity postulate)" },
      { label: "Corresponding sides", value: "DC/BC = BC/AC, therefore |BC|² = DC × AC  ...(ii)" },
      { label: "Adding (i) and (ii)", value: "|AB|² + |BC|² = AD × AC + DC × AC" },
      { label: "Taking AC common", value: "= AC (AD + DC)" },
      { label: "Since AD + DC = AC", value: "= AC × AC = |AC|²" },
    ],
    answer: "Hence |AC|² = |AB|² + |BC|². Proved.",
    examTip:
      "Construction line likhna zaroori hai - uske baghair proof ke marks kat jaate hain. Har step ke saath reason likhein.",
  },
  {
    id: "th-angle-centre",
    classLevel: "10th",
    subject: "math",
    chapter: "Theorems (Circle)",
    kind: "theorem",
    question:
      "The angle subtended by an arc at the centre of a circle is twice the angle subtended by the same arc at any point on the remaining circumference.",
    romanUrdu:
      "Arc markaz par jo zaawiya banata hai, woh circumference par banaye gaye zaawiye ka double hota hai.",
    toProve: "∠AOB = 2 ∠ACB, where O is the centre and C lies on the major arc",
    construction: "Join CO and produce it to a point D outside the circle.",
    steps: [
      { label: "In △AOC", value: "|OA| = |OC| (radii of the same circle)" },
      { label: "Isosceles property", value: "∠OAC = ∠OCA (angles opposite equal sides)" },
      {
        label: "Exterior angle",
        value: "∠AOD = ∠OAC + ∠OCA (exterior angle equals sum of opposite interior angles)",
      },
      { label: "So", value: "∠AOD = 2 ∠OCA  ...(i)" },
      { label: "Similarly in △BOC", value: "|OB| = |OC| (radii), so ∠OBC = ∠OCB" },
      { label: "Exterior angle", value: "∠BOD = 2 ∠OCB  ...(ii)" },
      { label: "Adding (i) and (ii)", value: "∠AOD + ∠BOD = 2(∠OCA + ∠OCB)" },
      { label: "But", value: "∠AOD + ∠BOD = ∠AOB and ∠OCA + ∠OCB = ∠ACB" },
    ],
    answer: "Therefore ∠AOB = 2 ∠ACB. Hence proved.",
    examTip:
      "Isi theorem se yeh bhi nikalta hai ke semicircle ka angle 90° hota hai (kyunke centre par 180° banta hai).",
  },
  {
    id: "th-perp-chord",
    classLevel: "10th",
    subject: "math",
    chapter: "Theorems (Circle)",
    kind: "theorem",
    question:
      "The perpendicular drawn from the centre of a circle to a chord bisects the chord.",
    romanUrdu: "Markaz se chord par khada perpendicular, chord ko do barabar hisson mein baant deta hai.",
    toProve: "If OM ⊥ AB, where AB is a chord and O the centre, then |AM| = |MB|",
    construction: "Join OA and OB, forming two right-angled triangles.",
    steps: [
      { label: "In △OAM and △OBM", value: "∠OMA = ∠OMB = 90° (OM ⊥ AB, given)" },
      { label: "Hypotenuses", value: "|OA| = |OB| (radii of the same circle)" },
      { label: "Common side", value: "|OM| = |OM| (common to both triangles)" },
      { label: "Congruence", value: "△OAM ≅ △OBM (H.S. — hypotenuse-side congruence)" },
      { label: "Corresponding parts", value: "|AM| = |MB| (corresponding sides of congruent triangles)" },
    ],
    answer: "Hence the perpendicular from the centre bisects the chord. Proved.",
    examTip:
      "H.S. postulate sirf right-angled triangles ke liye hai. Congruence ka sahi naam likhna marks deta hai.",
  },
  {
    id: "th-tangent-radius",
    classLevel: "10th",
    subject: "math",
    chapter: "Theorems (Circle)",
    kind: "theorem",
    question:
      "A tangent to a circle is perpendicular to the radius drawn at the point of contact.",
    romanUrdu: "Circle ka tangent, point of contact par khinchi gayi radius par perpendicular hota hai.",
    toProve: "If PT is a tangent at point T and O is the centre, then OT ⊥ PT",
    construction:
      "Take any point Q on the tangent PT other than T, and join OQ.",
    steps: [
      {
        label: "Position of Q",
        value: "Since PT is a tangent, it touches the circle only at T, so every other point Q lies outside the circle.",
      },
      { label: "Therefore", value: "|OQ| > |OT| (a point outside is farther from the centre than the radius)" },
      {
        label: "True for all Q",
        value: "This holds for every point Q on the tangent, so OT is the shortest distance from O to the line PT.",
      },
      {
        label: "Shortest distance property",
        value: "The shortest segment from a point to a line is the perpendicular from that point to the line.",
      },
    ],
    answer: "Hence OT ⊥ PT. Proved.",
    examTip:
      "Yeh proof 'shortest distance' ke usool par hai - ratt-a lagane ke bajaye logic samajhein to bhoolenge nahi.",
  },
];


/* ============ INTERMEDIATE (11th / 12th) ============
 * Separate cycle from matric: an 11th/12th student sees these plus the other
 * Intermediate year only, never 9th/10th material. */
const intermediate: WorkedProblem[] = [
  {
    id: "p11-proj-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Motion and Force",
    kind: "numerical",
    question:
      "A ball is thrown with a velocity of 20 m/s at an angle of 30° to the horizontal. Find its maximum height and horizontal range. (g = 10 m/s²)",
    romanUrdu:
      "20 m/s ki raftaar se 30° ke zaawiye par phenki gayi ball ki maximum bulandi aur range nikalein.",
    given: [
      { label: "Initial velocity", value: "v = 20 m/s" },
      { label: "Angle of projection", value: "θ = 30°" },
      { label: "Gravity", value: "g = 10 m/s²" },
    ],
    formula: "H = v² sin²θ / (2g)   and   R = v² sin(2θ) / g",
    steps: [
      { label: "sin 30°", value: "sin 30° = 0.5" },
      { label: "sin²30°", value: "(0.5)² = 0.25" },
      { label: "Maximum height", value: "H = (20)² × 0.25 / (2 × 10) = 400 × 0.25 / 20" },
      { label: "Computing H", value: "H = 100 / 20 = 5 m" },
      { label: "sin 60°", value: "sin(2 × 30°) = sin 60° = 0.866" },
      { label: "Range", value: "R = (20)² × 0.866 / 10 = 400 × 0.866 / 10" },
      { label: "Computing R", value: "R = 346.4 / 10 = 34.64 m" },
    ],
    answer: "H = 5 m and R = 34.64 m",
    examTip:
      "Range maximum tab hoti hai jab θ = 45°. Yeh nateeja aksar theory question mein poocha jaata hai.",
  },
  {
    id: "p11-circ-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Circular Motion",
    kind: "numerical",
    question:
      "A car of mass 1000 kg takes a circular turn of radius 50 m at a speed of 10 m/s. Calculate the centripetal force required.",
    romanUrdu: "1000 kg gaari 50 m radius ke mor par 10 m/s se muraati hai. Centripetal force nikalein.",
    given: [
      { label: "Mass", value: "m = 1000 kg" },
      { label: "Radius", value: "r = 50 m" },
      { label: "Speed", value: "v = 10 m/s" },
    ],
    formula: "F_c = m v² / r",
    steps: [
      { label: "v²", value: "(10)² = 100" },
      { label: "Substituting", value: "F_c = 1000 × 100 / 50" },
      { label: "Computing", value: "F_c = 100000 / 50" },
    ],
    answer: "F_c = 2000 N, directed towards the centre of the circle",
    examTip:
      "Centripetal force hamesha markaz ki taraf hoti hai. 'Centrifugal force' asal force nahi, sirf ek mehsoos hone wala asar hai.",
  },
  {
    id: "c11-gas-1",
    classLevel: "11th",
    subject: "chemistry",
    chapter: "States of Matter (Gases)",
    kind: "numerical",
    question:
      "Calculate the pressure exerted by 2 moles of an ideal gas occupying 10 dm³ at 300 K. (R = 0.0821 dm³·atm/mol·K)",
    romanUrdu: "2 mole gas 300 K par 10 dm³ mein hai. Pressure nikalein.",
    given: [
      { label: "Moles", value: "n = 2 mol" },
      { label: "Volume", value: "V = 10 dm³" },
      { label: "Temperature", value: "T = 300 K" },
      { label: "Gas constant", value: "R = 0.0821 dm³·atm/mol·K" },
    ],
    formula: "P V = n R T",
    steps: [
      { label: "Rearranging", value: "P = n R T / V" },
      { label: "Substituting", value: "P = (2 × 0.0821 × 300) / 10" },
      { label: "Numerator", value: "2 × 0.0821 × 300 = 49.26" },
      { label: "Dividing", value: "P = 49.26 / 10" },
    ],
    answer: "P = 4.926 atm",
    examTip:
      "Temperature hamesha Kelvin mein daalein (K = °C + 273). Celsius daalna sab se aam ghalti hai.",
  },
  {
    id: "m11-ap-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Sequences and Series",
    kind: "numerical",
    question:
      "Find the 15th term and the sum of the first 15 terms of the arithmetic progression 3, 7, 11, ...",
    romanUrdu: "Is AP ka 15waan term aur pehle 15 terms ka total nikalein.",
    given: [
      { label: "First term", value: "a₁ = 3" },
      { label: "Common difference", value: "d = 7 − 3 = 4" },
      { label: "Number of terms", value: "n = 15" },
    ],
    formula: "aₙ = a₁ + (n − 1)d   and   Sₙ = n/2 [2a₁ + (n − 1)d]",
    steps: [
      { label: "15th term", value: "a₁₅ = 3 + (15 − 1) × 4 = 3 + 56" },
      { label: "Computing", value: "a₁₅ = 59" },
      { label: "Sum", value: "S₁₅ = 15/2 [2(3) + 14 × 4] = 7.5 [6 + 56]" },
      { label: "Computing", value: "S₁₅ = 7.5 × 62 = 465" },
    ],
    answer: "a₁₅ = 59 and S₁₅ = 465",
    examTip: "Common difference nikalte waqt hamesha (doosra term − pehla term) karein, ulta nahi.",
  },
  {
    id: "p12-cap-1",
    classLevel: "12th",
    subject: "physics",
    chapter: "Electrostatics",
    kind: "numerical",
    question:
      "A capacitor stores a charge of 6 × 10⁻⁴ C when connected across a 200 V supply. Find its capacitance.",
    romanUrdu: "200 V par capacitor 6 × 10⁻⁴ C charge jama karta hai. Capacitance nikalein.",
    given: [
      { label: "Charge", value: "Q = 6 × 10⁻⁴ C" },
      { label: "Voltage", value: "V = 200 V" },
    ],
    formula: "C = Q / V",
    steps: [
      { label: "Substituting", value: "C = 6 × 10⁻⁴ / 200" },
      { label: "Computing", value: "C = 3 × 10⁻⁶ F" },
      { label: "In microfarads", value: "C = 3 μF" },
    ],
    answer: "C = 3 × 10⁻⁶ F (3 μF)",
    examTip: "1 μF = 10⁻⁶ F. Answer ko μF mein likhna zyada munasib hota hai.",
  },
  {
    id: "c12-titr-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Solutions and Titration",
    kind: "numerical",
    question:
      "25 cm³ of 0.1 M HCl is diluted to 100 cm³. Calculate the molarity of the diluted solution.",
    romanUrdu: "0.1 M HCl ke 25 cm³ ko 100 cm³ tak dilute kiya gaya. Nayi molarity nikalein.",
    given: [
      { label: "Initial molarity", value: "M₁ = 0.1 mol/dm³" },
      { label: "Initial volume", value: "V₁ = 25 cm³" },
      { label: "Final volume", value: "V₂ = 100 cm³" },
    ],
    formula: "M₁V₁ = M₂V₂",
    steps: [
      { label: "Rearranging", value: "M₂ = M₁V₁ / V₂" },
      { label: "Substituting", value: "M₂ = (0.1 × 25) / 100" },
      { label: "Numerator", value: "0.1 × 25 = 2.5" },
      { label: "Dividing", value: "M₂ = 2.5 / 100" },
    ],
    answer: "M₂ = 0.025 mol/dm³",
    examTip:
      "Dilution mein moles same rehte hain, sirf volume barhta hai - isi liye molarity kam ho jaati hai.",
  },
];

/* ===================== INTERMEDIATE BATCH 2 =====================
 * Deepens 11th/12th coverage, which was thinner than matric.
 * Chapter names match CHAPTER_LISTS in syllabusData.ts (minus the
 * "Unit N:" prefix, which ChapterResources strips before matching).
 * Every numerical below is arithmetically checked by the test harness.
 */
const intermediate2: WorkedProblem[] = [
  /* ---------- 11th PHYSICS ---------- */
  {
    id: "p11-vec-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Vectors and Equilibrium",
    kind: "numerical",
    question:
      "Two forces of 3 N and 4 N act at right angles to each other on a body. Find the magnitude and direction of the resultant force.",
    romanUrdu:
      "3 N aur 4 N ki do forces aik doosre par 90 degree par lag rahi hain. Resultant ka magnitude aur direction nikalein.",
    given: [
      { label: "First force", value: "F₁ = 3 N" },
      { label: "Second force", value: "F₂ = 4 N" },
      { label: "Angle between them", value: "θ = 90°" },
    ],
    formula: "F = √(F₁² + F₂²)   and   tan φ = F₂ / F₁",
    steps: [
      { label: "Squaring the forces", value: "F₁² = 9,  F₂² = 16" },
      { label: "Adding", value: "F₁² + F₂² = 9 + 16 = 25" },
      { label: "Taking the square root", value: "F = √25 = 5 N" },
      { label: "Direction", value: "tan φ = 4 / 3 = 1.333" },
      { label: "Taking inverse tangent", value: "φ = 53.13°" },
    ],
    answer: "F = 5 N at 53.13° from the 3 N force",
    examTip:
      "Perpendicular forces par hi Pythagoras lagta hai. Agar angle 90° na ho to F = √(F₁² + F₂² + 2F₁F₂cosθ) use karein.",
  },
  {
    id: "p11-work-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Work and Energy",
    kind: "numerical",
    question:
      "A force of 50 N pulls a box through 8 m. The force makes an angle of 60° with the direction of motion. Calculate the work done.",
    romanUrdu:
      "50 N force ne box ko 8 m kheencha, force 60° ke angle par hai. Work done nikalein.",
    given: [
      { label: "Force", value: "F = 50 N" },
      { label: "Displacement", value: "d = 8 m" },
      { label: "Angle", value: "θ = 60°" },
    ],
    formula: "W = F d cos θ",
    steps: [
      { label: "Value of cos 60°", value: "cos 60° = 0.5" },
      { label: "Substituting", value: "W = 50 × 8 × 0.5" },
      { label: "Computing", value: "W = 400 × 0.5 = 200" },
    ],
    answer: "W = 200 J",
    examTip:
      "cos θ lagana na bhoolein. Agar force motion ke saath hi ho (θ = 0) tab hi W = F d hota hai.",
  },
  {
    id: "p11-fluid-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Fluid Dynamics",
    kind: "numerical",
    question:
      "Water flows through a pipe of cross-sectional area 4 cm² with a speed of 5 m/s. The pipe narrows to an area of 2 cm². Find the speed of water in the narrow section.",
    romanUrdu:
      "Paani 4 cm² wale pipe mein 5 m/s se beh raha hai. Pipe 2 cm² tak tang ho jata hai. Nayi speed nikalein.",
    given: [
      { label: "First area", value: "A₁ = 4 cm²" },
      { label: "First speed", value: "v₁ = 5 m/s" },
      { label: "Second area", value: "A₂ = 2 cm²" },
    ],
    formula: "A₁ v₁ = A₂ v₂   (equation of continuity)",
    steps: [
      { label: "Rearranging", value: "v₂ = A₁ v₁ / A₂" },
      { label: "Substituting", value: "v₂ = (4 × 5) / 2" },
      { label: "Computing", value: "v₂ = 20 / 2 = 10" },
    ],
    answer: "v₂ = 10 m/s",
    examTip:
      "Areas ka ratio hi kaafi hai, cm² ko m² mein badalne ki zaroorat nahi kyunke units cancel ho jate hain.",
  },
  {
    id: "p11-heat-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Thermodynamics",
    kind: "numerical",
    question:
      "A heat engine absorbs 800 J of heat from the source and rejects 600 J to the sink in each cycle. Calculate the work done and the efficiency of the engine.",
    romanUrdu:
      "Heat engine 800 J heat leta hai aur 600 J reject karta hai. Work aur efficiency nikalein.",
    given: [
      { label: "Heat absorbed", value: "Q₁ = 800 J" },
      { label: "Heat rejected", value: "Q₂ = 600 J" },
    ],
    formula: "W = Q₁ − Q₂   and   η = (W / Q₁) × 100",
    steps: [
      { label: "Work done", value: "W = 800 − 600 = 200 J" },
      { label: "Efficiency ratio", value: "η = 200 / 800 = 0.25" },
      { label: "As a percentage", value: "η = 0.25 × 100 = 25" },
    ],
    answer: "W = 200 J and η = 25 %",
    examTip:
      "Efficiency hamesha 100 % se kam hoti hai. Agar 100 % se zyada aa jaye to Q₁ aur Q₂ ulat gaye hain.",
  },
  {
    id: "p11-wave-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Waves",
    kind: "numerical",
    question:
      "A stretched string vibrates with a frequency of 250 Hz and the wavelength of the wave produced is 1.2 m. Calculate the speed of the wave on the string.",
    romanUrdu:
      "String 250 Hz par vibrate kar rahi hai aur wavelength 1.2 m hai. Wave ki speed nikalein.",
    given: [
      { label: "Frequency", value: "f = 250 Hz" },
      { label: "Wavelength", value: "λ = 1.2 m" },
    ],
    formula: "v = f λ",
    steps: [
      { label: "Substituting", value: "v = 250 × 1.2" },
      { label: "Computing", value: "v = 300" },
    ],
    answer: "v = 300 m/s",
    examTip:
      "Frequency Hz mein aur wavelength metre mein ho to speed seedhi m/s mein aati hai.",
  },

  /* ---------- 11th CHEMISTRY ---------- */
  {
    id: "c11-mole-1",
    classLevel: "11th",
    subject: "chemistry",
    chapter: "Basic Concepts",
    kind: "numerical",
    question:
      "Calculate the number of moles and the number of molecules present in 88 g of carbon dioxide (CO₂). [C = 12, O = 16, N_A = 6.02 × 10²³]",
    romanUrdu:
      "88 g CO₂ mein kitne moles aur kitne molecules hain? Nikalein.",
    given: [
      { label: "Mass", value: "m = 88 g" },
      { label: "Molar mass of CO₂", value: "M = 12 + 2(16) = 44 g/mol" },
      { label: "Avogadro number", value: "N_A = 6.02 × 10²³" },
    ],
    formula: "n = m / M   and   N = n × N_A",
    steps: [
      { label: "Number of moles", value: "n = 88 / 44 = 2 mol" },
      { label: "Number of molecules", value: "N = 2 × 6.02 × 10²³" },
      { label: "Computing", value: "N = 12.04 × 10²³ = 1.204 × 10²⁴" },
    ],
    answer: "n = 2 mol and N = 1.204 × 10²⁴ molecules",
    examTip:
      "Molar mass pehle theek nikalein. CO₂ ka 44 hai, 28 nahi — oxygen do hain.",
  },
  {
    id: "c11-atom-1",
    classLevel: "11th",
    subject: "chemistry",
    chapter: "Atomic Structure",
    kind: "numerical",
    question:
      "Calculate the energy of a photon of light whose wavelength is 600 nm. [h = 6.63 × 10⁻³⁴ J s, c = 3 × 10⁸ m/s]",
    romanUrdu:
      "600 nm wavelength wale photon ki energy nikalein.",
    given: [
      { label: "Wavelength", value: "λ = 600 nm = 6 × 10⁻⁷ m" },
      { label: "Planck constant", value: "h = 6.63 × 10⁻³⁴ J s" },
      { label: "Speed of light", value: "c = 3 × 10⁸ m/s" },
    ],
    formula: "E = h c / λ",
    steps: [
      { label: "Converting nm to m", value: "600 nm = 600 × 10⁻⁹ = 6 × 10⁻⁷ m" },
      { label: "Numerator", value: "h c = 6.63 × 10⁻³⁴ × 3 × 10⁸ = 1.989 × 10⁻²⁵" },
      { label: "Dividing", value: "E = 1.989 × 10⁻²⁵ / 6 × 10⁻⁷" },
      { label: "Computing", value: "E = 3.315 × 10⁻¹⁹" },
    ],
    answer: "E = 3.315 × 10⁻¹⁹ J",
    examTip:
      "nm ko metre mein badalna sab se aam ghalti hai: 1 nm = 10⁻⁹ m.",
  },
  {
    id: "c11-thermo-1",
    classLevel: "11th",
    subject: "chemistry",
    chapter: "Thermochemistry",
    kind: "numerical",
    question:
      "When 100 g of water is heated, its temperature rises from 25 °C to 55 °C. Calculate the heat absorbed. [specific heat of water = 4.2 J g⁻¹ K⁻¹]",
    romanUrdu:
      "100 g paani ka temperature 25 °C se 55 °C hua. Kitni heat absorb hui?",
    given: [
      { label: "Mass", value: "m = 100 g" },
      { label: "Specific heat", value: "c = 4.2 J g⁻¹ K⁻¹" },
      { label: "Temperature change", value: "ΔT = 55 − 25 = 30 K" },
    ],
    formula: "q = m c ΔT",
    steps: [
      { label: "Substituting", value: "q = 100 × 4.2 × 30" },
      { label: "First product", value: "100 × 4.2 = 420" },
      { label: "Computing", value: "q = 420 × 30 = 12600" },
    ],
    answer: "q = 12600 J = 12.6 kJ",
    examTip:
      "ΔT ke liye Celsius ka farq aur Kelvin ka farq barabar hota hai, is liye conversion ki zaroorat nahi.",
  },
  {
    id: "c11-equil-1",
    classLevel: "11th",
    subject: "chemistry",
    chapter: "Chemical Equilibrium",
    kind: "numerical",
    question:
      "For the reaction H₂ + I₂ ⇌ 2HI, the equilibrium concentrations are [H₂] = 0.2 M, [I₂] = 0.2 M and [HI] = 1.6 M. Calculate the equilibrium constant K_c.",
    romanUrdu:
      "Di gayi equilibrium concentrations se K_c nikalein.",
    given: [
      { label: "Hydrogen", value: "[H₂] = 0.2 M" },
      { label: "Iodine", value: "[I₂] = 0.2 M" },
      { label: "Hydrogen iodide", value: "[HI] = 1.6 M" },
    ],
    formula: "K_c = [HI]² / ([H₂][I₂])",
    steps: [
      { label: "Numerator", value: "[HI]² = (1.6)² = 2.56" },
      { label: "Denominator", value: "[H₂][I₂] = 0.2 × 0.2 = 0.04" },
      { label: "Dividing", value: "K_c = 2.56 / 0.04" },
      { label: "Computing", value: "K_c = 64" },
    ],
    answer: "K_c = 64 (no units, since moles cancel here)",
    examTip:
      "Coefficient power banta hai. HI ka coefficient 2 hai is liye square karna zaroori hai.",
  },

  /* ---------- 11th MATHS ---------- */
  {
    id: "m11-quad-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Quadratic Equations",
    kind: "numerical",
    question:
      "Solve the quadratic equation 2x² − 7x + 3 = 0 using the quadratic formula.",
    romanUrdu:
      "Quadratic formula se 2x² − 7x + 3 = 0 hal karein.",
    given: [
      { label: "Coefficients", value: "a = 2, b = −7, c = 3" },
    ],
    formula: "x = [−b ± √(b² − 4ac)] / 2a",
    steps: [
      { label: "Discriminant", value: "b² − 4ac = (−7)² − 4(2)(3) = 49 − 24 = 25" },
      { label: "Square root", value: "√25 = 5" },
      { label: "Substituting", value: "x = (7 ± 5) / 4" },
      { label: "First root", value: "x = (7 + 5)/4 = 12/4 = 3" },
      { label: "Second root", value: "x = (7 − 5)/4 = 2/4 = 0.5" },
    ],
    answer: "x = 3 or x = 1/2",
    examTip:
      "−b ka matlab −(−7) = +7 hota hai. Sign ki ghalti yahan sab se zyada hoti hai.",
  },
  {
    id: "m11-binom-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Mathematical Induction and Binomial Theorem",
    kind: "numerical",
    question:
      "Find the 4th term in the expansion of (x + 2)⁶.",
    romanUrdu:
      "(x + 2)⁶ ke expansion ka chautha term nikalein.",
    given: [
      { label: "Expression", value: "(x + 2)⁶, so a = x, b = 2, n = 6" },
      { label: "Term required", value: "r + 1 = 4, therefore r = 3" },
    ],
    formula: "T_(r+1) = C(n, r) · a^(n−r) · b^r",
    steps: [
      { label: "Binomial coefficient", value: "C(6, 3) = 6! / (3! 3!) = 720 / 36 = 20" },
      { label: "Power of a", value: "x^(6−3) = x³" },
      { label: "Power of b", value: "2³ = 8" },
      { label: "Multiplying", value: "T₄ = 20 × x³ × 8 = 160 x³" },
    ],
    answer: "T₄ = 160 x³",
    examTip:
      "Chautha term ke liye r = 3 lagta hai, r = 4 nahi. Hamesha r = (term number − 1).",
  },
  {
    id: "m11-trig-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Fundamentals of Trigonometry",
    kind: "numerical",
    question:
      "An arc of a circle of radius 14 cm subtends an angle of 45° at the centre. Find the length of the arc. [π = 22/7]",
    romanUrdu:
      "14 cm radius ke circle mein 45° ka arc kitna lamba hai?",
    given: [
      { label: "Radius", value: "r = 14 cm" },
      { label: "Angle", value: "θ = 45°" },
    ],
    formula: "S = r θ, where θ must be in radians",
    steps: [
      { label: "Converting to radians", value: "θ = 45 × π/180 = π/4" },
      { label: "Using π = 22/7", value: "θ = 22/(7 × 4) = 22/28 = 0.7857 rad" },
      { label: "Substituting", value: "S = 14 × 0.7857" },
      { label: "Computing", value: "S = 11" },
    ],
    answer: "S = 11 cm",
    examTip:
      "S = rθ mein θ radians mein hona zaroori hai. Degrees seedhe daal dena sab se badi ghalti hai.",
  },

  /* ---------- 12th PHYSICS ---------- */
  {
    id: "p12-curr-1",
    classLevel: "12th",
    subject: "physics",
    chapter: "Current Electricity",
    kind: "numerical",
    question:
      "Three resistors of 2 Ω, 3 Ω and 6 Ω are connected in parallel across a 12 V battery. Find the equivalent resistance and the total current drawn.",
    romanUrdu:
      "2, 3 aur 6 ohm parallel mein 12 V battery par lage hain. Equivalent resistance aur current nikalein.",
    given: [
      { label: "Resistances", value: "R₁ = 2 Ω, R₂ = 3 Ω, R₃ = 6 Ω" },
      { label: "Voltage", value: "V = 12 V" },
    ],
    formula: "1/R_e = 1/R₁ + 1/R₂ + 1/R₃   and   I = V / R_e",
    steps: [
      { label: "Adding reciprocals", value: "1/R_e = 1/2 + 1/3 + 1/6" },
      { label: "Common denominator 6", value: "1/R_e = 3/6 + 2/6 + 1/6 = 6/6 = 1" },
      { label: "Equivalent resistance", value: "R_e = 1 Ω" },
      { label: "Total current", value: "I = 12 / 1 = 12" },
    ],
    answer: "R_e = 1 Ω and I = 12 A",
    examTip:
      "Parallel mein equivalent resistance hamesha sab se chhoti resistance se bhi kam hoti hai — yahan 1 Ω < 2 Ω, is liye jawab theek hai.",
  },
  {
    id: "p12-emf-1",
    classLevel: "12th",
    subject: "physics",
    chapter: "Electromagnetic Induction",
    kind: "numerical",
    question:
      "A coil of 200 turns experiences a change of magnetic flux of 0.05 Wb in 0.4 s. Calculate the average induced EMF.",
    romanUrdu:
      "200 turns wali coil mein 0.4 s mein 0.05 Wb flux change hua. Induced EMF nikalein.",
    given: [
      { label: "Number of turns", value: "N = 200" },
      { label: "Change in flux", value: "ΔΦ = 0.05 Wb" },
      { label: "Time", value: "Δt = 0.4 s" },
    ],
    formula: "ε = − N (ΔΦ / Δt)",
    steps: [
      { label: "Rate of change of flux", value: "ΔΦ/Δt = 0.05 / 0.4 = 0.125 Wb/s" },
      { label: "Multiplying by turns", value: "ε = 200 × 0.125" },
      { label: "Computing", value: "ε = 25" },
    ],
    answer: "ε = 25 V (the minus sign shows opposition, per Lenz's law)",
    examTip:
      "Minus sign Lenz's law ka hai — magnitude poochha jaye to 25 V likhein, magar sign ka matlab zaroor samjhayein.",
  },
  {
    id: "p12-nuc-1",
    classLevel: "12th",
    subject: "physics",
    chapter: "Nuclear Physics",
    kind: "numerical",
    question:
      "The half-life of a radioactive element is 8 days. If the initial mass of the sample is 64 g, how much remains after 24 days?",
    romanUrdu:
      "Half-life 8 din hai aur shuru mein 64 g tha. 24 din baad kitna bachega?",
    given: [
      { label: "Half-life", value: "T½ = 8 days" },
      { label: "Initial mass", value: "N₀ = 64 g" },
      { label: "Total time", value: "t = 24 days" },
    ],
    formula: "n = t / T½   and   N = N₀ / 2ⁿ",
    steps: [
      { label: "Number of half-lives", value: "n = 24 / 8 = 3" },
      { label: "Applying the halving", value: "N = 64 / 2³ = 64 / 8" },
      { label: "Computing", value: "N = 8" },
    ],
    answer: "N = 8 g remains (64 → 32 → 16 → 8)",
    examTip:
      "Har half-life par aadha hota hai. Teen half-lives ka matlab 1/8 bacha, 1/3 nahi.",
  },

  /* ---------- 12th CHEMISTRY ---------- */
  {
    id: "c12-ph-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Solutions and Titration",
    kind: "numerical",
    question:
      "Calculate the pH of a 0.001 M solution of hydrochloric acid (HCl).",
    romanUrdu:
      "0.001 M HCl ka pH nikalein.",
    given: [
      { label: "Concentration", value: "[HCl] = 0.001 M = 1 × 10⁻³ M" },
      { label: "Note", value: "HCl is a strong acid, so [H⁺] = [HCl]" },
    ],
    formula: "pH = − log [H⁺]",
    steps: [
      { label: "Hydrogen ion concentration", value: "[H⁺] = 1 × 10⁻³ M" },
      { label: "Taking log", value: "log (1 × 10⁻³) = −3" },
      { label: "Applying the minus", value: "pH = −(−3) = 3" },
    ],
    answer: "pH = 3 (acidic, as expected)",
    examTip:
      "Strong acid hone ki wajah se hi [H⁺] = concentration liya. Weak acid par yeh shortcut ghalat hota hai.",
  },
  {
    id: "c12-org-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Fundamental Principles of Organic Chemistry",
    kind: "concept",
    question:
      "A compound contains 40 % carbon, 6.7 % hydrogen and 53.3 % oxygen by mass. Determine its empirical formula. [C = 12, H = 1, O = 16]",
    romanUrdu:
      "Percentage composition se empirical formula maloom karein.",
    given: [
      { label: "Carbon", value: "40 %" },
      { label: "Hydrogen", value: "6.7 %" },
      { label: "Oxygen", value: "53.3 %" },
    ],
    formula: "Moles = percentage / atomic mass, then divide by the smallest",
    steps: [
      { label: "Moles of C", value: "40 / 12 = 3.33" },
      { label: "Moles of H", value: "6.7 / 1 = 6.7" },
      { label: "Moles of O", value: "53.3 / 16 = 3.33" },
      { label: "Smallest value", value: "3.33" },
      { label: "Dividing C", value: "3.33 / 3.33 = 1" },
      { label: "Dividing H", value: "6.7 / 3.33 = 2" },
      { label: "Dividing O", value: "3.33 / 3.33 = 1" },
    ],
    answer: "Empirical formula = CH₂O",
    examTip:
      "Empirical formula sirf simplest ratio deta hai. Molecular formula ke liye molar mass alag se chahiye hoti hai.",
  },

  /* ---------- 12th MATHS ---------- */
  {
    id: "m12-lim-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Functions and Limits",
    kind: "numerical",
    question:
      "Evaluate the limit of (x² − 9)/(x − 3) as x approaches 3.",
    romanUrdu:
      "x → 3 par (x² − 9)/(x − 3) ki limit nikalein.",
    given: [
      { label: "Function", value: "f(x) = (x² − 9)/(x − 3)" },
      { label: "Limit point", value: "x → 3" },
    ],
    formula: "Factorise first, because direct substitution gives 0/0",
    steps: [
      { label: "Direct substitution", value: "(9 − 9)/(3 − 3) = 0/0, which is indeterminate" },
      { label: "Factorising the numerator", value: "x² − 9 = (x − 3)(x + 3)" },
      { label: "Cancelling (x − 3)", value: "f(x) = x + 3, for x ≠ 3" },
      { label: "Now substituting", value: "limit = 3 + 3 = 6" },
    ],
    answer: "limit = 6",
    examTip:
      "0/0 aane par foran factorise karein. Seedha 0/0 likh dena zero marks deta hai.",
  },
  {
    id: "m12-vec-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Vectors",
    kind: "numerical",
    question:
      "Find the dot product of the vectors a = 2i + 3j + k and b = i − 2j + 4k, and state whether they are perpendicular.",
    romanUrdu:
      "Do vectors ka dot product nikalein aur batayein ke perpendicular hain ya nahi.",
    given: [
      { label: "First vector", value: "a = 2i + 3j + k" },
      { label: "Second vector", value: "b = i − 2j + 4k" },
    ],
    formula: "a · b = a₁b₁ + a₂b₂ + a₃b₃",
    steps: [
      { label: "First products", value: "2 × 1 = 2" },
      { label: "Second product", value: "3 × (−2) = −6" },
      { label: "Third product", value: "1 × 4 = 4" },
      { label: "Adding", value: "a · b = 2 − 6 + 4 = 0" },
    ],
    answer: "a · b = 0, therefore the vectors are perpendicular",
    examTip:
      "Dot product zero hone ka matlab hamesha perpendicular hota hai — yeh line likhne par extra mark milta hai.",
  },
];

/* ============ I.COM PRINCIPLES OF ACCOUNTING (11th & 12th) ============
 * Practical questions in the exact style of the BISE I.Com paper, where the
 * long questions are drawn from bills of exchange, bank reconciliation, final
 * accounts, adjustments, rectification, partnership and company accounts.
 * Every figure below is arithmetically verified.
 */
const accounting: WorkedProblem[] = [
  {
    id: "ac11-intro-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Introduction to Accounting",
    kind: "numerical",
    question:
      "State the accounting equation and show its effect when Mr. Ali starts a business with cash Rs. 500,000, buys furniture for cash Rs. 120,000 and purchases goods on credit for Rs. 80,000.",
    romanUrdu:
      "Accounting equation likh kar in teen transactions ka asar dikhayein.",
    given: [
      { label: "Capital introduced", value: "Rs. 500,000 cash" },
      { label: "Furniture bought for cash", value: "Rs. 120,000" },
      { label: "Goods bought on credit", value: "Rs. 80,000" },
    ],
    formula: "Assets = Liabilities + Owner's Equity",
    steps: [
      { label: "Transaction 1", value: "Cash +500,000 ; Capital +500,000. Equation: 500,000 = 0 + 500,000" },
      { label: "Transaction 2", value: "Furniture +120,000 ; Cash -120,000. Only asset composition changes, total unchanged." },
      { label: "After 2", value: "Cash 380,000 + Furniture 120,000 = 500,000 = 0 + 500,000" },
      { label: "Transaction 3", value: "Stock +80,000 ; Creditors +80,000" },
      { label: "Final assets", value: "Cash 380,000 + Furniture 120,000 + Stock 80,000 = Rs. 580,000" },
      { label: "Final equities", value: "Creditors 80,000 + Capital 500,000 = Rs. 580,000" },
    ],
    answer: "Assets Rs. 580,000 = Liabilities Rs. 80,000 + Capital Rs. 500,000. The equation balances.",
    examTip:
      "Har transaction ke baad equation barabar honi chahiye. Agar nahi hai to entry ghalat hai - foran check karein.",
  },
  {
    id: "ac11-journal-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Books of Original Entry",
    kind: "numerical",
    question:
      "Journalise: (a) Started business with cash Rs. 200,000. (b) Purchased goods for cash Rs. 50,000. (c) Sold goods on credit to Bilal Rs. 30,000. (d) Paid rent Rs. 5,000.",
    romanUrdu:
      "In transactions ki journal entries banayein.",
    given: [
      { label: "Number of transactions", value: "4" },
      { label: "Rule", value: "Debit the receiver / what comes in / expenses; Credit the giver / what goes out / income" },
    ],
    formula: "Every debit must have an equal and corresponding credit",
    steps: [
      { label: "(a)", value: "Cash A/c ......... Dr 200,000 ; To Capital A/c 200,000  (being business started with cash)" },
      { label: "(b)", value: "Purchases A/c .... Dr 50,000 ; To Cash A/c 50,000  (being goods purchased for cash)" },
      { label: "(c)", value: "Bilal A/c ........ Dr 30,000 ; To Sales A/c 30,000  (being goods sold on credit)" },
      { label: "(d)", value: "Rent Expense A/c . Dr 5,000 ; To Cash A/c 5,000  (being rent paid)" },
      { label: "Check", value: "Total debits = 200,000+50,000+30,000+5,000 = Rs. 285,000 ; total credits = same" },
    ],
    answer: "Total debits Rs. 285,000 = Total credits Rs. 285,000. Journal is correctly balanced.",
    examTip:
      "Goods kharidne par 'Purchases' account use karein, 'Goods' nahi. Har entry ke neeche narration likhna zaroori hai warna marks katte hain.",
  },
  {
    id: "ac11-ledger-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Ledger and Posting",
    kind: "numerical",
    question:
      "Post the following to the Cash Account and balance it: opening cash Rs. 60,000; received from Ahmed Rs. 25,000; paid salaries Rs. 18,000; paid to creditor Rs. 22,000.",
    romanUrdu:
      "Cash account mein posting kar ke balance nikalein.",
    given: [
      { label: "Opening balance", value: "Rs. 60,000 (debit)" },
      { label: "Receipts", value: "Rs. 25,000" },
      { label: "Payments", value: "Rs. 18,000 and Rs. 22,000" },
    ],
    formula: "Balance c/d = Total debit side - Total credit side",
    steps: [
      { label: "Debit side", value: "Balance b/d 60,000 + Ahmed 25,000 = Rs. 85,000" },
      { label: "Credit side", value: "Salaries 18,000 + Creditor 22,000 = Rs. 40,000" },
      { label: "Difference", value: "85,000 - 40,000 = Rs. 45,000" },
      { label: "Balancing", value: "Write Balance c/d 45,000 on the credit side so both sides total Rs. 85,000" },
      { label: "Next period", value: "Balance b/d Rs. 45,000 is brought down on the debit side" },
    ],
    answer: "Closing cash balance = Rs. 45,000 (debit balance).",
    examTip:
      "Cash account ka balance hamesha debit hota hai ya zero - credit balance kabhi mumkin nahi kyunke aap mojood cash se zyada kharch nahi kar sakte.",
  },
  {
    id: "ac11-cashbook-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Cash Book and Petty Cash Book",
    kind: "numerical",
    question:
      "A petty cashier is given a float of Rs. 5,000 under the imprest system. During the month he spends Rs. 850 on stationery, Rs. 1,200 on conveyance and Rs. 640 on postage. How much will he be reimbursed and what is his closing balance?",
    romanUrdu:
      "Imprest system mein petty cashier ko kitni raqam dobara milegi?",
    given: [
      { label: "Imprest amount", value: "Rs. 5,000" },
      { label: "Stationery", value: "Rs. 850" },
      { label: "Conveyance", value: "Rs. 1,200" },
      { label: "Postage", value: "Rs. 640" },
    ],
    formula: "Reimbursement = Total petty expenses ; Closing float = Imprest amount",
    steps: [
      { label: "Total spent", value: "850 + 1,200 + 640 = Rs. 2,690" },
      { label: "Cash in hand before reimbursement", value: "5,000 - 2,690 = Rs. 2,310" },
      { label: "Reimbursement", value: "Exactly the amount spent = Rs. 2,690" },
      { label: "Balance after reimbursement", value: "2,310 + 2,690 = Rs. 5,000" },
    ],
    answer: "Reimbursement = Rs. 2,690; the float is restored to Rs. 5,000.",
    examTip:
      "Imprest system ka asal usool: har period ke shuru mein petty cashier ke paas hamesha wohi muqarrara raqam hoti hai.",
  },
  {
    id: "ac11-brs-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Bank Reconciliation Statement",
    kind: "numerical",
    question:
      "The cash book shows a debit balance of Rs. 48,000. Cheques issued but not presented Rs. 9,500; cheques deposited but not yet credited Rs. 6,200; bank charges not recorded in cash book Rs. 300. Prepare the bank reconciliation statement and find the pass book balance.",
    romanUrdu:
      "Bank reconciliation statement bana kar pass book ka balance maloom karein.",
    given: [
      { label: "Cash book balance (Dr)", value: "Rs. 48,000" },
      { label: "Unpresented cheques", value: "Rs. 9,500" },
      { label: "Uncredited deposits", value: "Rs. 6,200" },
      { label: "Bank charges", value: "Rs. 300" },
    ],
    formula: "Pass book balance = Cash book balance + unpresented cheques - uncredited deposits - bank charges",
    steps: [
      { label: "Start", value: "Balance as per cash book = Rs. 48,000" },
      { label: "Add unpresented cheques", value: "Bank has not yet paid them, so bank shows more: +9,500 = Rs. 57,500" },
      { label: "Less uncredited deposits", value: "Bank has not yet credited them, so bank shows less: -6,200 = Rs. 51,300" },
      { label: "Less bank charges", value: "Debited by bank but not in cash book: -300 = Rs. 51,000" },
    ],
    answer: "Balance as per pass book = Rs. 51,000 (credit balance in the bank's books).",
    examTip:
      "Sign ka faisla hamesha yeh soch kar karein: 'bank ki kitaab mein zyada dikhega ya kam?'. Ratta lagane se ghalti hoti hai.",
  },
  {
    id: "ac11-tb-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Trial Balance and Rectification of Errors",
    kind: "numerical",
    question:
      "A trial balance does not agree; the debit side is short by Rs. 2,700. It is later found that a purchase of Rs. 2,700 from Kamran was posted to the debit of his account instead of the credit. Give the rectifying entry.",
    romanUrdu:
      "Trial balance ka farq theek karne ki entry banayein.",
    given: [
      { label: "Shortage on debit side", value: "Rs. 2,700" },
      { label: "Error", value: "Purchase from Kamran posted to debit of his account instead of credit" },
    ],
    formula: "Rectify by reversing the wrong effect and recording the correct one",
    steps: [
      { label: "Correct entry should have been", value: "Purchases A/c Dr 2,700 ; To Kamran A/c 2,700" },
      { label: "What was actually done", value: "Kamran's account was debited Rs. 2,700" },
      { label: "Effect", value: "Kamran debited 2,700 instead of credited 2,700 - a double error of 2 x 2,700 = Rs. 5,400 in his account" },
      { label: "Rectifying entry", value: "Suspense A/c ..... Dr 5,400 ; To Kamran A/c 5,400" },
      { label: "Note", value: "Kamran must be credited twice: once to cancel the wrong debit, once to record the correct credit" },
    ],
    answer: "Rectifying entry: Suspense A/c Dr Rs. 5,400; To Kamran A/c Rs. 5,400.",
    examTip:
      "Jab ek hi account ghalat taraf post ho to rectification hamesha DOUBLE raqam ki hoti hai, single nahi. Yeh sab se aam ghalti hai.",
  },
  {
    id: "ac11-adj-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Adjusting and Closing Entries",
    kind: "numerical",
    question:
      "At 31 December, salaries of Rs. 14,000 for December are unpaid, and insurance of Rs. 9,000 was paid on 1 October for one year. Pass the adjusting entries and state the amounts shown in the final accounts.",
    romanUrdu:
      "Saal ke akhir par adjusting entries banayein.",
    given: [
      { label: "Unpaid salaries", value: "Rs. 14,000" },
      { label: "Insurance paid 1 Oct for 12 months", value: "Rs. 9,000" },
    ],
    formula: "Accrued expense: Expense Dr, Outstanding Cr | Prepaid: Prepaid Dr, Expense Cr",
    steps: [
      { label: "Salaries adjustment", value: "Salaries A/c Dr 14,000 ; To Outstanding Salaries A/c 14,000" },
      { label: "Insurance used", value: "1 Oct to 31 Dec = 3 months out of 12" },
      { label: "Expired portion", value: "9,000 x 3/12 = Rs. 2,250" },
      { label: "Unexpired portion", value: "9,000 - 2,250 = Rs. 6,750" },
      { label: "Insurance adjustment", value: "Prepaid Insurance A/c Dr 6,750 ; To Insurance A/c 6,750" },
    ],
    answer: "P&L shows salaries expense Rs. 14,000 (with Rs. 14,000 outstanding as a liability) and insurance expense Rs. 2,250; balance sheet shows prepaid insurance Rs. 6,750 as an asset.",
    examTip:
      "Outstanding expense liability hai (balance sheet ki credit side), prepaid expense asset hai. Dono ko ulta likhna sab se aam ghalti hai.",
  },
  {
    id: "ac11-final-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Financial Statements of a Sole Trader",
    kind: "numerical",
    question:
      "From the following prepare a trading account: opening stock Rs. 40,000; purchases Rs. 260,000; purchase returns Rs. 10,000; carriage inward Rs. 8,000; sales Rs. 380,000; sales returns Rs. 5,000; closing stock Rs. 55,000.",
    romanUrdu:
      "Trading account bana kar gross profit nikalein.",
    given: [
      { label: "Opening stock", value: "Rs. 40,000" },
      { label: "Purchases", value: "Rs. 260,000" },
      { label: "Purchase returns", value: "Rs. 10,000" },
      { label: "Carriage inward", value: "Rs. 8,000" },
      { label: "Sales", value: "Rs. 380,000" },
      { label: "Sales returns", value: "Rs. 5,000" },
      { label: "Closing stock", value: "Rs. 55,000" },
    ],
    formula: "Gross Profit = Net Sales - Cost of Goods Sold ; COGS = Opening stock + Net purchases + Direct expenses - Closing stock",
    steps: [
      { label: "Net sales", value: "380,000 - 5,000 = Rs. 375,000" },
      { label: "Net purchases", value: "260,000 - 10,000 = Rs. 250,000" },
      { label: "Cost of goods available", value: "40,000 + 250,000 + 8,000 = Rs. 298,000" },
      { label: "Cost of goods sold", value: "298,000 - 55,000 = Rs. 243,000" },
      { label: "Gross profit", value: "375,000 - 243,000 = Rs. 132,000" },
    ],
    answer: "Gross Profit = Rs. 132,000.",
    examTip:
      "Carriage INWARD trading account mein aata hai, carriage OUTWARD profit and loss account mein. Dono ko mila dena bara ghalti hai.",
  },
  {
    id: "ac11-dep-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Depreciation and Its Accounting Treatment",
    kind: "numerical",
    question:
      "A machine costing Rs. 450,000 has an estimated scrap value of Rs. 50,000 and a useful life of 8 years. Calculate annual depreciation by the straight line method and the book value at the end of year 3.",
    romanUrdu:
      "Straight line method se salana depreciation aur teesray saal ki book value nikalein.",
    given: [
      { label: "Cost of machine", value: "Rs. 450,000" },
      { label: "Scrap value", value: "Rs. 50,000" },
      { label: "Useful life", value: "8 years" },
    ],
    formula: "Annual depreciation = (Cost - Scrap value) / Useful life",
    steps: [
      { label: "Depreciable amount", value: "450,000 - 50,000 = Rs. 400,000" },
      { label: "Annual depreciation", value: "400,000 / 8 = Rs. 50,000 per year" },
      { label: "Depreciation for 3 years", value: "50,000 x 3 = Rs. 150,000" },
      { label: "Book value at end of year 3", value: "450,000 - 150,000 = Rs. 300,000" },
    ],
    answer: "Annual depreciation = Rs. 50,000; book value at end of year 3 = Rs. 300,000.",
    examTip:
      "Straight line mein scrap value pehle GHATAYI jati hai. Diminishing balance mein nahi ghatate - dono methods ko mix na karein.",
  },
  {
    id: "ac11-caprev-1",
    classLevel: "11th",
    subject: "accounting",
    chapter: "Capital and Revenue Expenditure",
    kind: "numerical",
    question:
      "Classify as capital or revenue: (a) Rs. 300,000 paid for a delivery van. (b) Rs. 12,000 for repainting the office. (c) Rs. 45,000 for installing the new van's refrigeration unit. (d) Rs. 6,000 annual van insurance.",
    romanUrdu:
      "Batayein ke kaunsa kharcha capital hai aur kaunsa revenue.",
    given: [
      { label: "Item (a)", value: "Rs. 300,000 delivery van" },
      { label: "Item (b)", value: "Rs. 12,000 repainting" },
      { label: "Item (c)", value: "Rs. 45,000 refrigeration unit" },
      { label: "Item (d)", value: "Rs. 6,000 insurance" },
    ],
    formula: "Capital expenditure: benefit lasts beyond one year or increases earning capacity. Revenue expenditure: benefit consumed within the year.",
    steps: [
      { label: "(a) Van", value: "Fixed asset acquired, benefit over many years = CAPITAL, shown in balance sheet" },
      { label: "(b) Repainting", value: "Only maintains existing condition, benefit within the year = REVENUE, shown in P&L" },
      { label: "(c) Refrigeration unit", value: "Increases the earning capacity of the van = CAPITAL, added to van's cost" },
      { label: "(d) Insurance", value: "Recurring annual running cost = REVENUE, shown in P&L" },
      { label: "Totals", value: "Capital = 300,000 + 45,000 = Rs. 345,000 ; Revenue = 12,000 + 6,000 = Rs. 18,000" },
    ],
    answer: "Capital expenditure Rs. 345,000 (van and refrigeration unit); revenue expenditure Rs. 18,000 (repainting and insurance).",
    examTip:
      "Test yeh hai: kya kharche se asset ki kamai ki salahiyat BARHI? Agar haan to capital, agar sirf halat barqarar rakhi to revenue.",
  },
  {
    id: "ac12-pship-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Partnership: Formation and Accounts",
    kind: "numerical",
    question:
      "A and B are partners sharing profits 3:2. Capitals: A Rs. 400,000, B Rs. 300,000. Interest on capital is 10% p.a. and B gets a salary of Rs. 24,000 p.a. Profit before appropriations is Rs. 190,000. Prepare the profit and loss appropriation account.",
    romanUrdu:
      "Profit and loss appropriation account bana kar dono partners ka hissa nikalein.",
    given: [
      { label: "Profit sharing ratio", value: "A : B = 3 : 2" },
      { label: "Capitals", value: "A Rs. 400,000 ; B Rs. 300,000" },
      { label: "Interest on capital", value: "10% p.a." },
      { label: "B's salary", value: "Rs. 24,000" },
      { label: "Profit before appropriation", value: "Rs. 190,000" },
    ],
    formula: "Divisible profit = Net profit - interest on capital - partners' salary",
    steps: [
      { label: "Interest to A", value: "400,000 x 10% = Rs. 40,000" },
      { label: "Interest to B", value: "300,000 x 10% = Rs. 30,000" },
      { label: "Total appropriations", value: "40,000 + 30,000 + 24,000 = Rs. 94,000" },
      { label: "Divisible profit", value: "190,000 - 94,000 = Rs. 96,000" },
      { label: "A's share", value: "96,000 x 3/5 = Rs. 57,600" },
      { label: "B's share", value: "96,000 x 2/5 = Rs. 38,400" },
      { label: "A total", value: "40,000 + 57,600 = Rs. 97,600" },
      { label: "B total", value: "30,000 + 24,000 + 38,400 = Rs. 92,400" },
    ],
    answer: "A receives Rs. 97,600 and B receives Rs. 92,400 (total Rs. 190,000).",
    examTip:
      "Interest on capital aur salary profit ka BATWARA hai, kharcha nahi. Inhein P&L account mein na dalein, sirf appropriation account mein.",
  },
  {
    id: "ac12-admis-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Partnership: Admission of a Partner",
    kind: "numerical",
    question:
      "X and Y share profits 3:2. They admit Z for a 1/5 share. Calculate the new profit sharing ratio and the sacrificing ratio.",
    romanUrdu:
      "Naya profit sharing ratio aur sacrificing ratio nikalein.",
    given: [
      { label: "Old ratio", value: "X : Y = 3 : 2" },
      { label: "Z's share", value: "1/5" },
    ],
    formula: "Remaining share = 1 - new partner's share ; Sacrificing ratio = Old ratio - New ratio",
    steps: [
      { label: "Remaining share", value: "1 - 1/5 = 4/5" },
      { label: "X's new share", value: "4/5 x 3/5 = 12/25" },
      { label: "Y's new share", value: "4/5 x 2/5 = 8/25" },
      { label: "Z's share", value: "1/5 = 5/25" },
      { label: "New ratio", value: "12 : 8 : 5" },
      { label: "X's sacrifice", value: "3/5 - 12/25 = 15/25 - 12/25 = 3/25" },
      { label: "Y's sacrifice", value: "2/5 - 8/25 = 10/25 - 8/25 = 2/25" },
      { label: "Sacrificing ratio", value: "3/25 : 2/25 = 3 : 2" },
    ],
    answer: "New profit sharing ratio X : Y : Z = 12 : 8 : 5; sacrificing ratio X : Y = 3 : 2.",
    examTip:
      "Jab naya partner purane ratio mein hissa le to sacrificing ratio purane ratio ke barabar hi hota hai. Check karne ka aasan tareeqa.",
  },
  {
    id: "ac12-retire-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Partnership: Retirement and Death",
    kind: "numerical",
    question:
      "P, Q and R share profits 5:3:2. R retires and his share is taken over by P and Q equally. Find the new ratio and the gaining ratio.",
    romanUrdu:
      "R ke retire hone par naya ratio aur gaining ratio nikalein.",
    given: [
      { label: "Old ratio", value: "P : Q : R = 5 : 3 : 2" },
      { label: "R's share taken", value: "equally by P and Q" },
    ],
    formula: "Gaining ratio = New ratio - Old ratio",
    steps: [
      { label: "R's share", value: "2/10" },
      { label: "Each of P and Q gains", value: "2/10 x 1/2 = 1/10" },
      { label: "P's new share", value: "5/10 + 1/10 = 6/10" },
      { label: "Q's new share", value: "3/10 + 1/10 = 4/10" },
      { label: "New ratio", value: "6 : 4 = 3 : 2" },
      { label: "Gaining ratio", value: "1/10 : 1/10 = 1 : 1" },
    ],
    answer: "New profit sharing ratio P : Q = 3 : 2; gaining ratio = 1 : 1.",
    examTip:
      "Retirement mein GAINING ratio nikalte hain, admission mein SACRIFICING ratio. Ulta karna aam ghalti hai.",
  },
  {
    id: "ac12-dissol-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Partnership: Dissolution of a Firm",
    kind: "numerical",
    question:
      "On dissolution, assets (other than cash) book value Rs. 260,000 realised Rs. 215,000. Creditors of Rs. 90,000 were settled at Rs. 84,000. Realisation expenses Rs. 6,000. Partners M and N share 1:1. Find the profit or loss on realisation and each partner's share.",
    romanUrdu:
      "Realisation account ka nafa nuqsan aur har partner ka hissa nikalein.",
    given: [
      { label: "Book value of assets", value: "Rs. 260,000" },
      { label: "Amount realised", value: "Rs. 215,000" },
      { label: "Creditors book value", value: "Rs. 90,000" },
      { label: "Creditors settled at", value: "Rs. 84,000" },
      { label: "Realisation expenses", value: "Rs. 6,000" },
    ],
    formula: "Loss on realisation = (Book value - Realised) - Discount from creditors + Realisation expenses",
    steps: [
      { label: "Loss on assets", value: "260,000 - 215,000 = Rs. 45,000" },
      { label: "Gain on creditors", value: "90,000 - 84,000 = Rs. 6,000" },
      { label: "Realisation expenses", value: "Rs. 6,000" },
      { label: "Net loss", value: "45,000 - 6,000 + 6,000 = Rs. 45,000" },
      { label: "M's share", value: "45,000 x 1/2 = Rs. 22,500" },
      { label: "N's share", value: "45,000 x 1/2 = Rs. 22,500" },
    ],
    answer: "Loss on realisation Rs. 45,000, shared Rs. 22,500 by each of M and N.",
    examTip:
      "Creditors ko kam raqam par settle karna FAIDA hai (gain), nuqsan nahi. Is sign ko ulta lagana bohat aam ghalti hai.",
  },
  {
    id: "ac12-shares-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Company Accounts: Issue of Shares",
    kind: "numerical",
    question:
      "A company issues 50,000 ordinary shares of Rs. 10 each at a premium of Rs. 4 per share, payable in full on application. Applications were received for 65,000 shares and excess money was refunded. Pass the journal entries.",
    romanUrdu:
      "Shares ke issue ki journal entries banayein.",
    given: [
      { label: "Shares issued", value: "50,000 of Rs. 10 each" },
      { label: "Premium", value: "Rs. 4 per share" },
      { label: "Applications received", value: "65,000 shares" },
    ],
    formula: "Share capital is credited at face value; the excess is credited to Share Premium",
    steps: [
      { label: "Application money per share", value: "10 + 4 = Rs. 14" },
      { label: "Money received", value: "65,000 x 14 = Rs. 910,000" },
      { label: "Entry 1", value: "Bank A/c Dr 910,000 ; To Share Application A/c 910,000" },
      { label: "Shares allotted", value: "50,000 x 14 = Rs. 700,000" },
      { label: "Refund", value: "15,000 x 14 = Rs. 210,000" },
      { label: "Entry 2", value: "Share Application A/c Dr 700,000 ; To Share Capital A/c 500,000 ; To Share Premium A/c 200,000" },
      { label: "Entry 3", value: "Share Application A/c Dr 210,000 ; To Bank A/c 210,000  (excess refunded)" },
    ],
    answer: "Share Capital Rs. 500,000; Share Premium Rs. 200,000; Rs. 210,000 refunded to unsuccessful applicants.",
    examTip:
      "Share Capital hamesha FACE value par credit hota hai (Rs. 10), premium alag account mein. Dono ko mila kar credit karna ghalat hai.",
  },
  {
    id: "ac12-deb-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Company Accounts: Debentures",
    kind: "numerical",
    question:
      "A company issues 2,000 debentures of Rs. 100 each at a discount of 5%, redeemable at par. Calculate the amount received and pass the journal entry.",
    romanUrdu:
      "Debentures ke issue ki entry aur wasool shuda raqam nikalein.",
    given: [
      { label: "Number of debentures", value: "2,000" },
      { label: "Face value", value: "Rs. 100 each" },
      { label: "Discount", value: "5%" },
    ],
    formula: "Discount on issue of debentures is a capital loss, written off over the life of the debentures",
    steps: [
      { label: "Face value total", value: "2,000 x 100 = Rs. 200,000" },
      { label: "Discount", value: "200,000 x 5% = Rs. 10,000" },
      { label: "Cash received", value: "200,000 - 10,000 = Rs. 190,000" },
      { label: "Journal entry", value: "Bank A/c Dr 190,000 ; Discount on Issue of Debentures A/c Dr 10,000 ; To Debentures A/c 200,000" },
    ],
    answer: "Cash received Rs. 190,000; debentures credited at their face value of Rs. 200,000.",
    examTip:
      "Debentures hamesha FACE value par credit hote hain chahe discount par issue hon. Discount alag debit account hai.",
  },
  {
    id: "ac12-fs-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Financial Statements of a Company",
    kind: "numerical",
    question:
      "A company has gross profit Rs. 620,000, operating expenses Rs. 245,000, interest on debentures Rs. 35,000 and tax at 30%. Calculate profit after tax.",
    romanUrdu:
      "Company ka tax ke baad munafa nikalein.",
    given: [
      { label: "Gross profit", value: "Rs. 620,000" },
      { label: "Operating expenses", value: "Rs. 245,000" },
      { label: "Debenture interest", value: "Rs. 35,000" },
      { label: "Tax rate", value: "30%" },
    ],
    formula: "PAT = (Gross profit - operating expenses - interest) x (1 - tax rate)",
    steps: [
      { label: "Operating profit", value: "620,000 - 245,000 = Rs. 375,000" },
      { label: "Profit before tax", value: "375,000 - 35,000 = Rs. 340,000" },
      { label: "Tax", value: "340,000 x 30% = Rs. 102,000" },
      { label: "Profit after tax", value: "340,000 - 102,000 = Rs. 238,000" },
    ],
    answer: "Profit after tax = Rs. 238,000.",
    examTip:
      "Debenture interest tax se PEHLE ghata jata hai (yeh kharcha hai), jabke dividend tax ke BAAD diya jata hai. Yeh farq zaroor yaad rakhein.",
  },
  {
    id: "ac12-ratio-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Analysis of Financial Statements",
    kind: "numerical",
    question:
      "Current assets Rs. 480,000 (including stock Rs. 180,000 and prepaid expenses Rs. 20,000); current liabilities Rs. 240,000. Calculate the current ratio and the quick ratio, and comment.",
    romanUrdu:
      "Current ratio aur quick ratio nikal kar tabsara karein.",
    given: [
      { label: "Current assets", value: "Rs. 480,000" },
      { label: "Stock", value: "Rs. 180,000" },
      { label: "Prepaid expenses", value: "Rs. 20,000" },
      { label: "Current liabilities", value: "Rs. 240,000" },
    ],
    formula: "Current ratio = Current assets / Current liabilities ; Quick ratio = (Current assets - stock - prepaid) / Current liabilities",
    steps: [
      { label: "Current ratio", value: "480,000 / 240,000 = 2 : 1" },
      { label: "Quick assets", value: "480,000 - 180,000 - 20,000 = Rs. 280,000" },
      { label: "Quick ratio", value: "280,000 / 240,000 = 1.17 : 1" },
      { label: "Comment", value: "Both exceed their standards (2:1 and 1:1), so short-term liquidity is satisfactory" },
    ],
    answer: "Current ratio = 2 : 1; quick ratio = 1.17 : 1. The company's liquidity position is satisfactory.",
    examTip:
      "Quick ratio mein stock AUR prepaid expenses dono nikalte hain, kyunke yeh foran cash mein nahi badalte. Sirf stock nikalna adhoora jawab hai.",
  },
  {
    id: "ac12-cashflow-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Cash Flow Statement",
    kind: "numerical",
    question:
      "Net profit before tax Rs. 320,000; depreciation Rs. 60,000; increase in debtors Rs. 45,000; decrease in stock Rs. 25,000; increase in creditors Rs. 30,000. Calculate cash generated from operating activities.",
    romanUrdu:
      "Operating activities se hasil hone wala cash nikalein.",
    given: [
      { label: "Net profit before tax", value: "Rs. 320,000" },
      { label: "Depreciation", value: "Rs. 60,000" },
      { label: "Increase in debtors", value: "Rs. 45,000" },
      { label: "Decrease in stock", value: "Rs. 25,000" },
      { label: "Increase in creditors", value: "Rs. 30,000" },
    ],
    formula: "Operating cash flow = Net profit + non-cash charges +/- changes in working capital",
    steps: [
      { label: "Start", value: "Net profit before tax = Rs. 320,000" },
      { label: "Add depreciation", value: "Non-cash expense: +60,000 = Rs. 380,000" },
      { label: "Less increase in debtors", value: "Cash tied up in receivables: -45,000 = Rs. 335,000" },
      { label: "Add decrease in stock", value: "Stock converted into cash: +25,000 = Rs. 360,000" },
      { label: "Add increase in creditors", value: "Payment deferred, cash retained: +30,000 = Rs. 390,000" },
    ],
    answer: "Cash generated from operating activities = Rs. 390,000.",
    examTip:
      "Depreciation cash kharcha NAHI hai is liye wapas jama karte hain. Current asset barhe to cash ghata, current liability barhe to cash barha.",
  },
  {
    id: "ac12-npo-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Accounting for Non-Trading Concerns",
    kind: "numerical",
    question:
      "A club received subscriptions of Rs. 180,000 during the year. Rs. 15,000 related to last year and Rs. 12,000 was received in advance for next year. Rs. 20,000 is still outstanding for the current year. Calculate the subscription income for the income and expenditure account.",
    romanUrdu:
      "Income and expenditure account ke liye subscription income nikalein.",
    given: [
      { label: "Subscriptions received", value: "Rs. 180,000" },
      { label: "Relating to last year", value: "Rs. 15,000" },
      { label: "Received in advance", value: "Rs. 12,000" },
      { label: "Outstanding for current year", value: "Rs. 20,000" },
    ],
    formula: "Income for the year = Received - previous year's arrears - advance for next year + current year's outstanding",
    steps: [
      { label: "Start", value: "Total received = Rs. 180,000" },
      { label: "Less last year's arrears", value: "Belongs to previous year: -15,000 = Rs. 165,000" },
      { label: "Less advance", value: "Belongs to next year: -12,000 = Rs. 153,000" },
      { label: "Add outstanding", value: "Earned but not received: +20,000 = Rs. 173,000" },
    ],
    answer: "Subscription income for the year = Rs. 173,000.",
    examTip:
      "Receipts and payments account CASH dikhata hai, income and expenditure account us SAAL ki income. Sirf is saal ki raqam lein.",
  },
  {
    id: "ac12-single-1",
    classLevel: "12th",
    subject: "accounting",
    chapter: "Single Entry and Incomplete Records",
    kind: "numerical",
    question:
      "Opening capital Rs. 250,000; closing capital Rs. 390,000; drawings during the year Rs. 60,000; additional capital introduced Rs. 40,000. Calculate the profit for the year.",
    romanUrdu:
      "Adhoore record se saal ka munafa nikalein.",
    given: [
      { label: "Opening capital", value: "Rs. 250,000" },
      { label: "Closing capital", value: "Rs. 390,000" },
      { label: "Drawings", value: "Rs. 60,000" },
      { label: "Additional capital", value: "Rs. 40,000" },
    ],
    formula: "Profit = Closing capital + Drawings - Additional capital - Opening capital",
    steps: [
      { label: "Closing capital", value: "Rs. 390,000" },
      { label: "Add drawings", value: "Withdrawn profit must be added back: +60,000 = Rs. 450,000" },
      { label: "Less additional capital", value: "Not profit, it is fresh investment: -40,000 = Rs. 410,000" },
      { label: "Less opening capital", value: "-250,000 = Rs. 160,000" },
    ],
    answer: "Profit for the year = Rs. 160,000.",
    examTip:
      "Drawings JAMA karte hain aur additional capital GHATATE hain. Yeh sign ulta lagana sab se aam ghalti hai is chapter mein.",
  },
];

/* ============ GAP-FILL: chapters that previously had no worked solution ====
 * Same board format and difficulty as the existing sets. Every numerical
 * result below is checked by an arithmetic harness before committing.
 */
const gapFill: WorkedProblem[] = [
  {
    id: "m9-mat-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Matrices and Determinants",
    kind: "numerical",
    question:
      "If A = [[2, 3],[1, 4]], find |A| and A inverse.",
    romanUrdu:
      "Determinant aur inverse nikalein.",
    given: [
      { label: "Matrix A", value: "[[2, 3],[1, 4]]" },
    ],
    formula: "|A| = ad - bc ;  A^-1 = (1/|A|) [[d, -b],[-c, a]]",
    steps: [
      { label: "Determinant", value: "|A| = (2)(4) - (3)(1) = 8 - 3 = 5" },
      { label: "Since |A| = 5 is not 0", value: "A is non-singular, so the inverse exists" },
      { label: "Adjoint", value: "adj A = [[4, -3],[-1, 2]]" },
      { label: "Inverse", value: "A^-1 = (1/5)[[4, -3],[-1, 2]] = [[4/5, -3/5],[-1/5, 2/5]]" },
    ],
    answer: "|A| = 5 and A^-1 = (1/5)[[4, -3],[-1, 2]].",
    examTip:
      "Adjoint mein a aur d ki jagah BADALTI hai aur b, c ke sign badalte hain. Sirf sign badal dena aam ghalti hai.",
  },
  {
    id: "m9-log-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Logarithms",
    kind: "numerical",
    question:
      "Evaluate log to base 2 of 32, and find x if log to base 3 of x = 4.",
    romanUrdu:
      "Logarithm ki qeemat aur x maloom karein.",
    given: [
      { label: "First", value: "log_2 32" },
      { label: "Second", value: "log_3 x = 4" },
    ],
    formula: "If a^y = n then log_a n = y",
    steps: [
      { label: "Express 32 as a power of 2", value: "32 = 2^5" },
      { label: "So", value: "log_2 32 = log_2 2^5 = 5" },
      { label: "Second part", value: "log_3 x = 4 means 3^4 = x" },
      { label: "Compute", value: "3^4 = 81" },
    ],
    answer: "log_2 32 = 5 and x = 81.",
    examTip:
      "Logarithm ka matlab hai 'kaunsi power?'. Definition a^y = n ko hamesha zehan mein rakhein.",
  },
  {
    id: "m9-fact-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Factorization",
    kind: "numerical",
    question:
      "Factorize x^2 - 9x + 20 and 4x^2 - 25.",
    romanUrdu:
      "In expressions ke factors banayein.",
    given: [
      { label: "First", value: "x^2 - 9x + 20" },
      { label: "Second", value: "4x^2 - 25" },
    ],
    formula: "Split the middle term ; a^2 - b^2 = (a - b)(a + b)",
    steps: [
      { label: "For x^2 - 9x + 20", value: "Find two numbers whose product is +20 and sum is -9" },
      { label: "Numbers", value: "-4 and -5, since (-4)(-5) = 20 and -4 + -5 = -9" },
      { label: "Split", value: "x^2 - 4x - 5x + 20 = x(x - 4) - 5(x - 4) = (x - 4)(x - 5)" },
      { label: "For 4x^2 - 25", value: "This is a difference of two squares: (2x)^2 - (5)^2" },
      { label: "Apply formula", value: "(2x - 5)(2x + 5)" },
    ],
    answer: "x^2 - 9x + 20 = (x - 4)(x - 5) and 4x^2 - 25 = (2x - 5)(2x + 5).",
    examTip:
      "Difference of squares pehchanne ki aadat daalein - yeh sab se aasan marks hain.",
  },
  {
    id: "m9-coord-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Introduction to Coordinate Geometry",
    kind: "numerical",
    question:
      "Find the distance between A(-3, 4) and B(5, -2), and the midpoint of AB.",
    romanUrdu:
      "Do points ka faasla aur midpoint nikalein.",
    given: [
      { label: "Point A", value: "(-3, 4)" },
      { label: "Point B", value: "(5, -2)" },
    ],
    formula: "d = sqrt[(x2-x1)^2 + (y2-y1)^2] ; Midpoint = ((x1+x2)/2, (y1+y2)/2)",
    steps: [
      { label: "x difference", value: "5 - (-3) = 8" },
      { label: "y difference", value: "-2 - 4 = -6" },
      { label: "Distance", value: "sqrt(8^2 + (-6)^2) = sqrt(64 + 36) = sqrt(100) = 10" },
      { label: "Midpoint x", value: "(-3 + 5)/2 = 2/2 = 1" },
      { label: "Midpoint y", value: "(4 + (-2))/2 = 2/2 = 1" },
    ],
    answer: "Distance |AB| = 10 units and the midpoint is (1, 1).",
    examTip:
      "Minus minus plus banta hai: 5 - (-3) = 8. Yeh sign ki ghalti sab se zyada hoti hai.",
  },
  {
    id: "m9-stat-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Basic Statistics",
    kind: "numerical",
    question:
      "Find the mean, median and mode of: 12, 15, 18, 15, 20, 22, 15.",
    romanUrdu:
      "Mean, median aur mode nikalein.",
    given: [
      { label: "Data", value: "12, 15, 18, 15, 20, 22, 15" },
      { label: "n", value: "7" },
    ],
    formula: "Mean = sum/n ; Median = middle value of ordered data ; Mode = most frequent value",
    steps: [
      { label: "Sum", value: "12 + 15 + 18 + 15 + 20 + 22 + 15 = 117" },
      { label: "Mean", value: "117 / 7 = 16.71 (2 d.p.)" },
      { label: "Arrange in order", value: "12, 15, 15, 15, 18, 20, 22" },
      { label: "Median", value: "n = 7 is odd, so median is the 4th value = 15" },
      { label: "Mode", value: "15 occurs three times, more than any other value" },
    ],
    answer: "Mean = 16.71, median = 15, mode = 15.",
    examTip:
      "Median nikalne se PEHLE data ko tarteeb dena zaroori hai. Bina tarteeb ke median ghalat aayega.",
  },
  {
    id: "p9-meas-1",
    classLevel: "9th",
    subject: "physics",
    chapter: "Physical Quantities and Measurement",
    kind: "numerical",
    question:
      "The main scale of a vernier calliper reads 2.3 cm and the 6th vernier division coincides with a main scale division. Least count is 0.01 cm. Find the reading.",
    romanUrdu:
      "Vernier calliper ki reading nikalein.",
    given: [
      { label: "Main scale reading", value: "2.3 cm" },
      { label: "Coinciding vernier division", value: "6" },
      { label: "Least count", value: "0.01 cm" },
    ],
    formula: "Total reading = Main scale reading + (vernier division x least count)",
    steps: [
      { label: "Vernier scale reading", value: "6 x 0.01 = 0.06 cm" },
      { label: "Total reading", value: "2.3 + 0.06 = 2.36 cm" },
    ],
    answer: "Reading = 2.36 cm.",
    examTip:
      "Vernier division ko least count se ZAROOR multiply karein - seedha jorna ghalat hai.",
  },
  {
    id: "p9-turn-1",
    classLevel: "9th",
    subject: "physics",
    chapter: "Turning Effect of Forces",
    kind: "numerical",
    question:
      "A force of 40 N acts at a perpendicular distance of 0.6 m from a pivot. Find the moment. What force at 0.3 m would balance it?",
    romanUrdu:
      "Torque nikalein aur balance karne wali force maloom karein.",
    given: [
      { label: "Force", value: "F = 40 N" },
      { label: "Moment arm", value: "d = 0.6 m" },
      { label: "Second distance", value: "0.3 m" },
    ],
    formula: "Moment = Force x perpendicular distance ; For equilibrium, clockwise moment = anticlockwise moment",
    steps: [
      { label: "Moment", value: "40 x 0.6 = 24 N m" },
      { label: "For balance", value: "F2 x 0.3 = 24" },
      { label: "Solve", value: "F2 = 24 / 0.3 = 80 N" },
    ],
    answer: "Moment = 24 N m; a force of 80 N at 0.3 m is required to balance it.",
    examTip:
      "Distance hamesha AMOODI (perpendicular) hona chahiye. Agar force tirchi hai to pehle component nikalein.",
  },
  {
    id: "p9-grav-1",
    classLevel: "9th",
    subject: "physics",
    chapter: "Gravitation",
    kind: "numerical",
    question:
      "Calculate the gravitational force between two bodies of masses 60 kg and 80 kg placed 2 m apart. (G = 6.67e-11 N m^2/kg^2)",
    romanUrdu:
      "Do jismon ke darmiyan kashish ki quwwat nikalein.",
    given: [
      { label: "Mass 1", value: "m1 = 60 kg" },
      { label: "Mass 2", value: "m2 = 80 kg" },
      { label: "Distance", value: "r = 2 m" },
      { label: "G", value: "6.67e-11 N m^2/kg^2" },
    ],
    formula: "F = G m1 m2 / r^2",
    steps: [
      { label: "Product of masses", value: "60 x 80 = 4800 kg^2" },
      { label: "r squared", value: "2^2 = 4 m^2" },
      { label: "Substitute", value: "F = (6.67e-11 x 4800) / 4" },
      { label: "Numerator", value: "6.67e-11 x 4800 = 3.2016e-7" },
      { label: "Divide", value: "F = 3.2016e-7 / 4 = 8.004e-8 N" },
    ],
    answer: "F = 8.0e-8 N (approximately).",
    examTip:
      "r ko square karna mat bhoolein. Yeh inverse SQUARE law hai, simple inverse nahi.",
  },
  {
    id: "p9-transfer-heat-1",
    classLevel: "9th",
    subject: "physics",
    chapter: "Transfer of Heat",
    kind: "numerical",
    question:
      "How much heat is required to raise the temperature of 2 kg of water from 20 C to 70 C? (specific heat of water = 4200 J/kg/K)",
    romanUrdu:
      "Pani ka darja hararat barhane ke liye darkaar hararat nikalein.",
    given: [
      { label: "Mass", value: "m = 2 kg" },
      { label: "Initial temperature", value: "20 C" },
      { label: "Final temperature", value: "70 C" },
      { label: "Specific heat", value: "c = 4200 J/kg/K" },
    ],
    formula: "Q = m c delta T",
    steps: [
      { label: "Temperature change", value: "delta T = 70 - 20 = 50 K" },
      { label: "Substitute", value: "Q = 2 x 4200 x 50" },
      { label: "Multiply", value: "Q = 8400 x 50 = 420000 J" },
      { label: "Convert", value: "420000 J = 420 kJ" },
    ],
    answer: "Q = 420,000 J = 420 kJ.",
    examTip:
      "delta T ke liye Celsius ka farq aur Kelvin ka farq BARABAR hota hai, is liye convert karne ki zaroorat nahi.",
  },
  {
    id: "c9-atom-1",
    classLevel: "9th",
    subject: "chemistry",
    chapter: "Structure of Atoms",
    kind: "numerical",
    question:
      "An atom has atomic number 17 and mass number 35. Find the number of protons, neutrons and electrons, and write its electronic configuration.",
    romanUrdu:
      "Protons, neutrons, electrons aur electronic configuration likhein.",
    given: [
      { label: "Atomic number Z", value: "17" },
      { label: "Mass number A", value: "35" },
    ],
    formula: "Protons = Z ; Electrons = Z (neutral atom) ; Neutrons = A - Z",
    steps: [
      { label: "Protons", value: "= Z = 17" },
      { label: "Electrons", value: "= 17 (atom is neutral)" },
      { label: "Neutrons", value: "= A - Z = 35 - 17 = 18" },
      { label: "Configuration", value: "1s2 2s2 2p6 3s2 3p5" },
      { label: "Check", value: "2 + 2 + 6 + 2 + 5 = 17 electrons - correct. The element is chlorine." },
    ],
    answer: "17 protons, 17 electrons, 18 neutrons; configuration 1s2 2s2 2p6 3s2 3p5 (chlorine).",
    examTip:
      "Neutrons ke liye mass number se atomic number GHATATE hain. Jorna sab se aam ghalti hai.",
  },
  {
    id: "c9-states-1",
    classLevel: "9th",
    subject: "chemistry",
    chapter: "Physical States of Matter",
    kind: "numerical",
    question:
      "A gas occupies 500 cm3 at 300 K. What volume will it occupy at 450 K if the pressure is constant?",
    romanUrdu:
      "Charles law se naya hajm nikalein.",
    given: [
      { label: "Initial volume", value: "V1 = 500 cm3" },
      { label: "Initial temperature", value: "T1 = 300 K" },
      { label: "Final temperature", value: "T2 = 450 K" },
    ],
    formula: "Charles' law: V1/T1 = V2/T2 (at constant pressure)",
    steps: [
      { label: "Rearrange", value: "V2 = V1 x T2 / T1" },
      { label: "Substitute", value: "V2 = 500 x 450 / 300" },
      { label: "Numerator", value: "500 x 450 = 225000" },
      { label: "Divide", value: "V2 = 225000 / 300 = 750 cm3" },
    ],
    answer: "V2 = 750 cm3.",
    examTip:
      "Temperature hamesha KELVIN mein honi chahiye. Celsius istemal karne se jawab bilkul ghalat aata hai.",
  },
  {
    id: "m10-var-1",
    classLevel: "10th",
    subject: "math",
    chapter: "Variations",
    kind: "numerical",
    question:
      "If y varies directly as x, and y = 12 when x = 4, find y when x = 9.",
    romanUrdu:
      "Direct variation se y ki qeemat nikalein.",
    given: [
      { label: "Relation", value: "y is directly proportional to x" },
      { label: "Given", value: "y = 12 when x = 4" },
      { label: "Find", value: "y when x = 9" },
    ],
    formula: "y = kx where k is the constant of proportionality",
    steps: [
      { label: "Find k", value: "12 = k x 4, so k = 12/4 = 3" },
      { label: "Equation", value: "y = 3x" },
      { label: "Substitute x = 9", value: "y = 3 x 9 = 27" },
    ],
    answer: "y = 27.",
    examTip:
      "Pehle hamesha constant k nikalein, phir nayi value daalein. Seedha ratio lagana risky hai.",
  },
  {
    id: "m10-pf-1",
    classLevel: "10th",
    subject: "math",
    chapter: "Partial Fractions",
    kind: "numerical",
    question:
      "Resolve (3x + 5) / ((x + 1)(x + 3)) into partial fractions.",
    romanUrdu:
      "Partial fractions mein tordein.",
    given: [
      { label: "Expression", value: "(3x + 5) / ((x + 1)(x + 3))" },
    ],
    formula: "For distinct linear factors: N/((x+a)(x+b)) = A/(x+a) + B/(x+b)",
    steps: [
      { label: "Set up", value: "(3x + 5)/((x+1)(x+3)) = A/(x+1) + B/(x+3)" },
      { label: "Multiply through", value: "3x + 5 = A(x + 3) + B(x + 1)" },
      { label: "Put x = -1", value: "3(-1) + 5 = A(-1 + 3), so 2 = 2A, giving A = 1" },
      { label: "Put x = -3", value: "3(-3) + 5 = B(-3 + 1), so -4 = -2B, giving B = 2" },
      { label: "Write result", value: "1/(x+1) + 2/(x+3)" },
    ],
    answer: "(3x + 5)/((x+1)(x+3)) = 1/(x+1) + 2/(x+3).",
    examTip:
      "x ki wo value daalein jo ek factor ko sifar kar de - is se doosra constant foran mil jata hai.",
  },
  {
    id: "p10-sound-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Sound",
    kind: "numerical",
    question:
      "A sound wave has a frequency of 500 Hz and travels at 340 m/s in air. Find its wavelength.",
    romanUrdu:
      "Sound wave ki wavelength nikalein.",
    given: [
      { label: "Frequency", value: "f = 500 Hz" },
      { label: "Speed", value: "v = 340 m/s" },
    ],
    formula: "v = f x lambda",
    steps: [
      { label: "Rearrange", value: "lambda = v / f" },
      { label: "Substitute", value: "lambda = 340 / 500" },
      { label: "Compute", value: "lambda = 0.68 m" },
    ],
    answer: "Wavelength = 0.68 m.",
    examTip:
      "Speed ko frequency par TAQSEEM karte hain. Multiply karna aam ghalti hai.",
  },
  {
    id: "p10-es-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Electrostatics",
    kind: "numerical",
    question:
      "Two charges of 4 microcoulomb and 6 microcoulomb are placed 0.3 m apart in air. Find the force between them. (k = 9e9 N m^2/C^2)",
    romanUrdu:
      "Do charges ke darmiyan quwwat nikalein.",
    given: [
      { label: "Charge 1", value: "q1 = 4e-6 C" },
      { label: "Charge 2", value: "q2 = 6e-6 C" },
      { label: "Distance", value: "r = 0.3 m" },
      { label: "k", value: "9e9 N m^2/C^2" },
    ],
    formula: "F = k q1 q2 / r^2 (Coulomb's law)",
    steps: [
      { label: "Product of charges", value: "4e-6 x 6e-6 = 24e-12 = 2.4e-11 C^2" },
      { label: "r squared", value: "0.3^2 = 0.09 m^2" },
      { label: "Numerator", value: "9e9 x 2.4e-11 = 0.216" },
      { label: "Divide", value: "F = 0.216 / 0.09 = 2.4 N" },
    ],
    answer: "F = 2.4 N (repulsive, since both charges are positive).",
    examTip:
      "Microcoulomb ko 10^-6 se convert karna na bhoolein, aur r ko square karein.",
  },
  {
    id: "c10-hc-1",
    classLevel: "10th",
    subject: "chemistry",
    chapter: "Hydrocarbons",
    kind: "numerical",
    question:
      "Give the molecular formula of the alkane, alkene and alkyne containing 4 carbon atoms, and name them.",
    romanUrdu:
      "Chaar carbon wale alkane, alkene aur alkyne ka formula aur naam likhein.",
    given: [
      { label: "Number of carbon atoms", value: "n = 4" },
    ],
    formula: "Alkane CnH(2n+2) ; Alkene CnH(2n) ; Alkyne CnH(2n-2)",
    steps: [
      { label: "Alkane", value: "C4H(2x4+2) = C4H10, named butane" },
      { label: "Alkene", value: "C4H(2x4) = C4H8, named butene" },
      { label: "Alkyne", value: "C4H(2x4-2) = C4H6, named butyne" },
      { label: "Note", value: "Alkanes are saturated; alkenes have a double bond and alkynes a triple bond, so both are unsaturated" },
    ],
    answer: "Butane C4H10, butene C4H8, butyne C4H6.",
    examTip:
      "General formulas ratta lagana zaroori hai - har saal paper mein aate hain.",
  },
  {
    id: "p11-meas-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Measurements",
    kind: "numerical",
    question:
      "The length of a wire is measured as 25.4 cm with an uncertainty of 0.1 cm. Calculate the percentage uncertainty.",
    romanUrdu:
      "Percentage uncertainty nikalein.",
    given: [
      { label: "Measured length", value: "25.4 cm" },
      { label: "Absolute uncertainty", value: "0.1 cm" },
    ],
    formula: "Percentage uncertainty = (absolute uncertainty / measured value) x 100",
    steps: [
      { label: "Substitute", value: "(0.1 / 25.4) x 100" },
      { label: "Divide", value: "0.1 / 25.4 = 0.003937" },
      { label: "Multiply", value: "0.003937 x 100 = 0.394%" },
    ],
    answer: "Percentage uncertainty = 0.39% (approximately 0.4%).",
    examTip:
      "Jab quantities multiply ya divide hon to percentage uncertainties JORTE hain, absolute nahi.",
  },
  {
    id: "p11-osc-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Oscillations",
    kind: "numerical",
    question:
      "A simple pendulum has a length of 1.0 m. Find its time period. (g = 9.8 m/s^2)",
    romanUrdu:
      "Simple pendulum ka time period nikalein.",
    given: [
      { label: "Length", value: "L = 1.0 m" },
      { label: "g", value: "9.8 m/s^2" },
    ],
    formula: "T = 2 pi sqrt(L/g)",
    steps: [
      { label: "L/g", value: "1.0 / 9.8 = 0.10204" },
      { label: "Square root", value: "sqrt(0.10204) = 0.31944" },
      { label: "Multiply by 2 pi", value: "T = 2 x 3.1416 x 0.31944 = 2.007 s" },
    ],
    answer: "Time period T = 2.0 s (approximately).",
    examTip:
      "Time period pendulum ke MASS par munhasir nahi hota - sirf length aur g par. Yeh conceptual question aksar aata hai.",
  },
  {
    id: "c11-sol-1",
    classLevel: "11th",
    subject: "chemistry",
    chapter: "Solutions",
    kind: "numerical",
    question:
      "Calculate the molarity of a solution containing 20 g of NaOH dissolved in 500 cm3 of solution. (Molar mass of NaOH = 40 g/mol)",
    romanUrdu:
      "Mehlool ki molarity nikalein.",
    given: [
      { label: "Mass of NaOH", value: "20 g" },
      { label: "Molar mass", value: "40 g/mol" },
      { label: "Volume", value: "500 cm3" },
    ],
    formula: "Molarity = moles of solute / volume of solution in dm3 ; moles = mass / molar mass",
    steps: [
      { label: "Moles", value: "20 / 40 = 0.5 mol" },
      { label: "Volume in dm3", value: "500 / 1000 = 0.5 dm3" },
      { label: "Molarity", value: "0.5 / 0.5 = 1.0 mol/dm3" },
    ],
    answer: "Molarity = 1.0 M.",
    examTip:
      "Volume ko cm3 se dm3 mein convert karna zaroori hai (1000 se taqseem). Yeh sab se aam ghalti hai.",
  },
  {
    id: "p12-elec-1",
    classLevel: "12th",
    subject: "physics",
    chapter: "Electronics",
    kind: "numerical",
    question:
      "Determine the output of a two-input AND gate and an OR gate for inputs A = 1, B = 0, and state the NAND output.",
    romanUrdu:
      "Logic gates ka output batayein.",
    given: [
      { label: "Input A", value: "1" },
      { label: "Input B", value: "0" },
    ],
    formula: "AND: output 1 only if all inputs are 1 ; OR: output 1 if any input is 1 ; NAND = NOT of AND",
    steps: [
      { label: "AND", value: "1 AND 0 = 0" },
      { label: "OR", value: "1 OR 0 = 1" },
      { label: "NAND", value: "NOT(AND) = NOT(0) = 1" },
    ],
    answer: "AND = 0, OR = 1, NAND = 1.",
    examTip:
      "NAND aur NOR hamesha AND/OR ka ULTA hote hain. Truth table banane ki aadat daalein.",
  },
  {
    id: "p12-nuc-half-1",
    classLevel: "12th",
    subject: "physics",
    chapter: "Nuclear Physics",
    kind: "numerical",
    question:
      "A radioactive sample has a half life of 8 days. What fraction of the original sample remains after 24 days?",
    romanUrdu:
      "24 din baad kitna hissa baqi rahega?",
    given: [
      { label: "Half life", value: "8 days" },
      { label: "Total time", value: "24 days" },
    ],
    formula: "Remaining fraction = (1/2)^n where n = total time / half life",
    steps: [
      { label: "Number of half lives", value: "n = 24 / 8 = 3" },
      { label: "Fraction remaining", value: "(1/2)^3 = 1/8" },
      { label: "As a percentage", value: "1/8 = 0.125 = 12.5%" },
    ],
    answer: "1/8 (12.5%) of the original sample remains.",
    examTip:
      "Har half life ke baad AADHA reh jata hai. Teen half lives ka matlab 1/2 x 1/2 x 1/2 = 1/8, na ke 1/6.",
  },
  {
    id: "m12-conic-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Conic Sections",
    kind: "numerical",
    question:
      "Find the centre and radius of the circle x^2 + y^2 - 6x + 8y - 11 = 0.",
    romanUrdu:
      "Circle ka markaz aur radius nikalein.",
    given: [
      { label: "Equation", value: "x^2 + y^2 - 6x + 8y - 11 = 0" },
    ],
    formula: "For x^2 + y^2 + 2gx + 2fy + c = 0: centre = (-g, -f), radius = sqrt(g^2 + f^2 - c)",
    steps: [
      { label: "Compare", value: "2g = -6 so g = -3 ; 2f = 8 so f = 4 ; c = -11" },
      { label: "Centre", value: "(-g, -f) = (3, -4)" },
      { label: "g^2 + f^2 - c", value: "9 + 16 - (-11) = 9 + 16 + 11 = 36" },
      { label: "Radius", value: "sqrt(36) = 6" },
    ],
    answer: "Centre (3, -4) and radius 6 units.",
    examTip:
      "c ka sign dhyan se lein: -(-11) = +11. Yahan sign ki ghalti se radius ghalat aata hai.",
  },
  {
    id: "m12-vec-dot-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Vectors",
    kind: "numerical",
    question:
      "If A = 2i + 3j - k and B = i - 2j + 4k, find A . B and the angle between them.",
    romanUrdu:
      "Scalar product aur zaawiya nikalein.",
    given: [
      { label: "Vector A", value: "2i + 3j - k" },
      { label: "Vector B", value: "i - 2j + 4k" },
    ],
    formula: "A . B = a1b1 + a2b2 + a3b3 ; cos(theta) = (A.B)/(|A||B|)",
    steps: [
      { label: "Dot product", value: "(2)(1) + (3)(-2) + (-1)(4) = 2 - 6 - 4 = -8" },
      { label: "|A|", value: "sqrt(4 + 9 + 1) = sqrt(14) = 3.742" },
      { label: "|B|", value: "sqrt(1 + 4 + 16) = sqrt(21) = 4.583" },
      { label: "cos theta", value: "-8 / (3.742 x 4.583) = -8 / 17.15 = -0.4665" },
      { label: "theta", value: "cos inverse of -0.4665 = 117.8 degrees" },
    ],
    answer: "A . B = -8 and the angle between them is approximately 117.8 degrees.",
    examTip:
      "Dot product manfi hai to zaawiya 90 degrees se ZYADA hoga. Yeh check hamesha karein.",
  },
  {
    id: "m12-stat-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Measures of Central Tendency",
    kind: "numerical",
    question:
      "Find the arithmetic mean of the following frequency distribution: values 5, 10, 15, 20 with frequencies 3, 7, 6, 4.",
    romanUrdu:
      "Frequency distribution ka mean nikalein.",
    given: [
      { label: "Values x", value: "5, 10, 15, 20" },
      { label: "Frequencies f", value: "3, 7, 6, 4" },
    ],
    formula: "Mean = sum(fx) / sum(f)",
    steps: [
      { label: "fx values", value: "5x3=15 ; 10x7=70 ; 15x6=90 ; 20x4=80" },
      { label: "sum(fx)", value: "15 + 70 + 90 + 80 = 255" },
      { label: "sum(f)", value: "3 + 7 + 6 + 4 = 20" },
      { label: "Mean", value: "255 / 20 = 12.75" },
    ],
    answer: "Arithmetic mean = 12.75.",
    examTip:
      "sum(f) se taqseem karein, values ki tadaad se nahi. Yahan 20 se taqseem hui, 4 se nahi.",
  },
  {
    id: "c12-per-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Periodic Classification of Elements and Periodicity",
    kind: "numerical",
    question:
      "Arrange Na, Mg, Al and Si in order of increasing atomic radius and explain the trend.",
    romanUrdu:
      "Atomic radius ke barhte hue tarteeb mein rakhein.",
    given: [
      { label: "Elements", value: "Na (Z=11), Mg (Z=12), Al (Z=13), Si (Z=14)" },
      { label: "All in", value: "Period 3" },
    ],
    formula: "Across a period, nuclear charge increases while the shell number stays the same, so atomic radius decreases",
    steps: [
      { label: "Same period", value: "All four are in period 3, so all have 3 shells" },
      { label: "Nuclear charge", value: "Increases from +11 (Na) to +14 (Si)" },
      { label: "Effect", value: "Greater nuclear charge pulls the same shells closer, reducing the radius" },
      { label: "Order of decreasing radius", value: "Na > Mg > Al > Si" },
      { label: "Order of increasing radius", value: "Si < Al < Mg < Na" },
    ],
    answer: "Increasing atomic radius: Si < Al < Mg < Na.",
    examTip:
      "Period mein BAAYEN se DAAYEN radius kam hota hai, group mein UPAR se NEECHE barhta hai. Dono trends ulta na karein.",
  },
];

/* ============ MATHS GAP-FILL: 9th to 12th ============================
 * Chapters that previously had no worked solution. Numericals follow the
 * board's Given / Formula / Steps / Answer shape; geometry entries use the
 * To Prove / Construction / Proof shape examiners expect.
 * Every arithmetic result is verified by a harness before committing.
 */
const mathGapFill: WorkedProblem[] = [
  {
    id: "m9-rcn-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Real and Complex Numbers",
    kind: "numerical",
    question:
      "Simplify (3 + 2i)(4 - 5i) and express the result in the form a + bi.",
    romanUrdu:
      "Complex numbers ka hasil zarb nikaal kar a + bi ki shakal mein likhein.",
    given: [
      { label: "First number", value: "3 + 2i" },
      { label: "Second number", value: "4 - 5i" },
      { label: "Key fact", value: "i^2 = -1" },
    ],
    formula: "(a + bi)(c + di) = ac + adi + bci + bd i^2, with i^2 = -1",
    steps: [
      { label: "Expand", value: "(3)(4) + (3)(-5i) + (2i)(4) + (2i)(-5i)" },
      { label: "Multiply each term", value: "12 - 15i + 8i - 10 i^2" },
      { label: "Replace i^2 with -1", value: "12 - 15i + 8i - 10(-1) = 12 - 15i + 8i + 10" },
      { label: "Collect real parts", value: "12 + 10 = 22" },
      { label: "Collect imaginary parts", value: "-15i + 8i = -7i" },
    ],
    answer: "22 - 7i",
    examTip:
      "i^2 = -1 lagana sab se aam ghalti hai - log i^2 ko +1 samajh lete hain. -10 i^2 = +10 hota hai.",
  },
  {
    id: "m9-alg-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Algebraic Expressions and Algebraic Formulas",
    kind: "numerical",
    question:
      "If x + 1/x = 5, find the value of x^2 + 1/x^2 and x^3 + 1/x^3.",
    romanUrdu:
      "Diye gaye taluq se x^2 + 1/x^2 aur x^3 + 1/x^3 nikalein.",
    given: [
      { label: "Given", value: "x + 1/x = 5" },
    ],
    formula: "(x + 1/x)^2 = x^2 + 1/x^2 + 2   and   (x + 1/x)^3 = x^3 + 1/x^3 + 3(x + 1/x)",
    steps: [
      { label: "Square both sides", value: "(x + 1/x)^2 = 5^2 = 25" },
      { label: "Expand", value: "x^2 + 1/x^2 + 2 = 25" },
      { label: "Subtract 2", value: "x^2 + 1/x^2 = 23" },
      { label: "Cube the original", value: "(x + 1/x)^3 = 5^3 = 125" },
      { label: "Expand", value: "x^3 + 1/x^3 + 3(x + 1/x) = 125" },
      { label: "Substitute x + 1/x = 5", value: "x^3 + 1/x^3 + 3(5) = 125" },
      { label: "Simplify", value: "x^3 + 1/x^3 = 125 - 15 = 110" },
    ],
    answer: "x^2 + 1/x^2 = 23 and x^3 + 1/x^3 = 110",
    examTip:
      "Square karne par +2 aur cube karne par +3(x + 1/x) aata hai - yeh middle terms bhoolna sab se bara nuqsan hai.",
  },
  {
    id: "m9-manip-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Algebraic Manipulation",
    kind: "numerical",
    question:
      "Find the HCF and LCM of the polynomials x^2 - 9 and x^2 + 6x + 9.",
    romanUrdu:
      "Do polynomials ka HCF aur LCM nikalein.",
    given: [
      { label: "First polynomial", value: "x^2 - 9" },
      { label: "Second polynomial", value: "x^2 + 6x + 9" },
    ],
    formula: "HCF x LCM = product of the two polynomials",
    steps: [
      { label: "Factorise the first", value: "x^2 - 9 = (x - 3)(x + 3)  [difference of squares]" },
      { label: "Factorise the second", value: "x^2 + 6x + 9 = (x + 3)^2  [perfect square]" },
      { label: "Common factor", value: "(x + 3) appears in both, so HCF = (x + 3)" },
      { label: "LCM", value: "take every factor to its highest power: (x - 3)(x + 3)^2" },
      { label: "Verify", value: "HCF x LCM = (x + 3) x (x - 3)(x + 3)^2 = (x - 3)(x + 3)^3 = product of the originals" },
    ],
    answer: "HCF = (x + 3) and LCM = (x - 3)(x + 3)^2",
    examTip:
      "Pehle dono ko factorise karein - bina factorise kiye HCF/LCM nikalne ki koshish hamesha ghalat hoti hai.",
  },
  {
    id: "m9-lineq-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Linear Equations and Inequalities",
    kind: "numerical",
    question:
      "Solve the inequality 3x - 7 < 5x + 3 and represent the solution on a number line.",
    romanUrdu:
      "Na-mosawaat hal karein aur number line par dikhayein.",
    given: [
      { label: "Inequality", value: "3x - 7 < 5x + 3" },
    ],
    formula: "Dividing or multiplying an inequality by a negative number reverses the sign",
    steps: [
      { label: "Bring x terms to one side", value: "3x - 5x < 3 + 7" },
      { label: "Simplify", value: "-2x < 10" },
      { label: "Divide by -2 and REVERSE the sign", value: "x > -5" },
      { label: "Number line", value: "open circle at -5, shading to the right (−5 is not included)" },
    ],
    answer: "x > -5, i.e. the solution set is {x | x > -5, x is a real number}",
    examTip:
      "Manfi number se taqseem karte waqt inequality ka rukh ULTA hota hai. Yeh sab se aam ghalti hai is chapter mein.",
  },
  {
    id: "m9-graph-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Linear Graphs and Their Application",
    kind: "numerical",
    question:
      "Draw the graph of 2x + 3y = 12 by finding its intercepts, and state the slope.",
    romanUrdu:
      "Intercepts nikaal kar graph banayein aur slope batayein.",
    given: [
      { label: "Equation", value: "2x + 3y = 12" },
    ],
    formula: "x-intercept: put y = 0 · y-intercept: put x = 0 · slope-intercept form y = mx + c",
    steps: [
      { label: "x-intercept", value: "put y = 0: 2x = 12, so x = 6, giving the point (6, 0)" },
      { label: "y-intercept", value: "put x = 0: 3y = 12, so y = 4, giving the point (0, 4)" },
      { label: "Plot", value: "mark (6, 0) and (0, 4) and join them with a straight line" },
      { label: "Rearrange for slope", value: "3y = -2x + 12, so y = (-2/3)x + 4" },
      { label: "Read the slope", value: "m = -2/3 and the y-intercept c = 4" },
    ],
    answer: "The line passes through (6, 0) and (0, 4); slope = -2/3.",
    examTip:
      "Sirf do points se line ban jati hai, magar teesra point le kar check karna behtar hai - agar teeno ek line par nahi to hisaab ghalat hai.",
  },
  {
    id: "m9-seq-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Arithmetic and Geometric Sequences",
    kind: "numerical",
    question:
      "The 5th term of an AP is 17 and the 9th term is 33. Find the first term, the common difference and the sum of the first 20 terms.",
    romanUrdu:
      "AP ka pehla term, common difference aur pehle 20 terms ka jama nikalein.",
    given: [
      { label: "5th term", value: "a5 = 17" },
      { label: "9th term", value: "a9 = 33" },
      { label: "Required", value: "a, d and S20" },
    ],
    formula: "an = a + (n - 1)d   and   Sn = n/2 [2a + (n - 1)d]",
    steps: [
      { label: "Write the 5th term", value: "a + 4d = 17   ...(i)" },
      { label: "Write the 9th term", value: "a + 8d = 33   ...(ii)" },
      { label: "Subtract (i) from (ii)", value: "4d = 16, so d = 4" },
      { label: "Substitute into (i)", value: "a + 16 = 17, so a = 1" },
      { label: "Apply the sum formula", value: "S20 = 20/2 [2(1) + 19(4)]" },
      { label: "Simplify inside", value: "= 10 [2 + 76] = 10 x 78" },
      { label: "Compute", value: "S20 = 780" },
    ],
    answer: "First term a = 1, common difference d = 4, and S20 = 780.",
    examTip:
      "an = a + (n-1)d mein (n-1) hai, n nahi. 5th term ke liye 4d lagta hai, 5d nahi.",
  },
  {
    id: "m9-sets-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Sets and Functions",
    kind: "numerical",
    question:
      "If A = {1,2,3,4,5} and B = {4,5,6,7}, find A union B, A intersection B, A - B, and verify n(A U B) = n(A) + n(B) - n(A n B).",
    romanUrdu:
      "Sets ke operations nikaal kar formula verify karein.",
    given: [
      { label: "Set A", value: "{1, 2, 3, 4, 5}" },
      { label: "Set B", value: "{4, 5, 6, 7}" },
    ],
    formula: "n(A U B) = n(A) + n(B) - n(A n B)",
    steps: [
      { label: "Union", value: "A U B = {1, 2, 3, 4, 5, 6, 7}, so n(A U B) = 7" },
      { label: "Intersection", value: "A n B = {4, 5}, so n(A n B) = 2" },
      { label: "Difference", value: "A - B = {1, 2, 3} (elements in A but not in B)" },
      { label: "Counts", value: "n(A) = 5 and n(B) = 4" },
      { label: "Right-hand side", value: "5 + 4 - 2 = 7" },
      { label: "Compare", value: "LHS = 7 and RHS = 7, so the formula holds" },
    ],
    answer: "A U B = {1,2,3,4,5,6,7}, A n B = {4,5}, A - B = {1,2,3}; the formula is verified (7 = 7).",
    examTip:
      "Union mein har element sirf EK BAAR likha jata hai chahe dono sets mein ho - repeat karna aam ghalti hai.",
  },
  {
    id: "m9-zakat-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Zakat, Ushr and Inheritance",
    kind: "numerical",
    question:
      "A man owns savings of Rs. 850,000 above nisab for one lunar year, and harvests wheat worth Rs. 240,000 from naturally irrigated land. Calculate the Zakat and Ushr payable.",
    romanUrdu:
      "Zakat aur Ushr ki raqam nikalein.",
    given: [
      { label: "Savings held for one year", value: "Rs. 850,000" },
      { label: "Wheat from naturally irrigated land", value: "Rs. 240,000" },
    ],
    formula: "Zakat = 2.5% of wealth · Ushr = 10% (natural irrigation) or 5% (artificial irrigation)",
    steps: [
      { label: "Zakat rate", value: "2.5% = 2.5/100 = 0.025" },
      { label: "Zakat payable", value: "850,000 x 0.025 = Rs. 21,250" },
      { label: "Ushr rate", value: "naturally irrigated land, so 10%" },
      { label: "Ushr payable", value: "240,000 x 0.10 = Rs. 24,000" },
      { label: "Total", value: "21,250 + 24,000 = Rs. 45,250" },
    ],
    answer: "Zakat = Rs. 21,250, Ushr = Rs. 24,000, total Rs. 45,250.",
    examTip:
      "Qudrati sairaab (barish) par 10 fisad aur masnooi sairaab (tube well) par 5 fisad. Yeh farq zaroor dekhein.",
  },
  {
    id: "m9-bmath-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Business Mathematics",
    kind: "numerical",
    question:
      "A shopkeeper buys an article for Rs. 4,500 and sells it for Rs. 5,400. Find the profit and the profit percentage. What would the selling price be for a 30% profit?",
    romanUrdu:
      "Nafa, nafa fisad aur 30 fisad nafe wali qeemat nikalein.",
    given: [
      { label: "Cost price", value: "C.P. = Rs. 4,500" },
      { label: "Selling price", value: "S.P. = Rs. 5,400" },
    ],
    formula: "Profit = S.P. - C.P. · Profit% = (Profit / C.P.) x 100 · S.P. = C.P. (1 + profit%)",
    steps: [
      { label: "Profit", value: "5,400 - 4,500 = Rs. 900" },
      { label: "Profit percentage", value: "(900 / 4,500) x 100 = 0.2 x 100 = 20%" },
      { label: "For 30% profit", value: "S.P. = 4,500 x (1 + 0.30)" },
      { label: "Compute", value: "= 4,500 x 1.30 = Rs. 5,850" },
    ],
    answer: "Profit = Rs. 900 (20%); for a 30% profit the selling price must be Rs. 5,850.",
    examTip:
      "Profit fisad hamesha COST PRICE par nikalta hai, selling price par nahi. Yeh sab se aam ghalti hai.",
  },
  {
    id: "m9-fmath-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Financial Mathematics",
    kind: "numerical",
    question:
      "Rs. 60,000 is invested for 3 years. Find the simple interest at 8% per annum, and the compound amount if compounded annually at the same rate.",
    romanUrdu:
      "Simple interest aur compound amount dono nikalein.",
    given: [
      { label: "Principal", value: "P = Rs. 60,000" },
      { label: "Rate", value: "r = 8% per annum" },
      { label: "Time", value: "t = 3 years" },
    ],
    formula: "S.I. = P r t / 100   and   A = P (1 + r/100)^t",
    steps: [
      { label: "Simple interest", value: "(60,000 x 8 x 3) / 100 = 1,440,000 / 100 = Rs. 14,400" },
      { label: "Amount under simple interest", value: "60,000 + 14,400 = Rs. 74,400" },
      { label: "Compound factor", value: "(1 + 8/100)^3 = (1.08)^3" },
      { label: "Compute the power", value: "1.08 x 1.08 = 1.1664; 1.1664 x 1.08 = 1.259712" },
      { label: "Compound amount", value: "60,000 x 1.259712 = Rs. 75,582.72" },
      { label: "Compound interest", value: "75,582.72 - 60,000 = Rs. 15,582.72" },
    ],
    answer: "Simple interest = Rs. 14,400; compound amount = Rs. 75,582.72 (C.I. = Rs. 15,582.72).",
    examTip:
      "Compound interest hamesha simple se ZYADA hota hai (yahan Rs. 1,182.72 zyada). Agar kam aaye to hisaab ghalat hai.",
  },
  {
    id: "m9-cmath-1",
    classLevel: "9th",
    subject: "math",
    chapter: "Consumer Mathematics",
    kind: "numerical",
    question:
      "An article is marked at Rs. 8,000. A discount of 15% is allowed and then 17% sales tax is charged on the discounted price. Find the amount the customer pays.",
    romanUrdu:
      "Discount ke baad sales tax laga kar aakhri qeemat nikalein.",
    given: [
      { label: "Marked price", value: "Rs. 8,000" },
      { label: "Discount", value: "15%" },
      { label: "Sales tax", value: "17%" },
    ],
    formula: "Discounted price = M.P. (1 - d) · Final price = discounted price (1 + tax)",
    steps: [
      { label: "Discount amount", value: "8,000 x 0.15 = Rs. 1,200" },
      { label: "Price after discount", value: "8,000 - 1,200 = Rs. 6,800" },
      { label: "Sales tax", value: "6,800 x 0.17 = Rs. 1,156" },
      { label: "Amount payable", value: "6,800 + 1,156 = Rs. 7,956" },
    ],
    answer: "The customer pays Rs. 7,956.",
    examTip:
      "Sales tax DISCOUNT KE BAAD wali qeemat par lagta hai, marked price par nahi. Tarteeb badalne se jawab ghalat aa jata hai.",
  },
  {
    id: "m9-th-congr",
    classLevel: "9th",
    subject: "math",
    chapter: "Congruent Triangles",
    kind: "theorem",
    question:
      "Prove that if two sides and the included angle of one triangle are congruent to the corresponding sides and included angle of another triangle, the triangles are congruent (SAS).",
    romanUrdu:
      "SAS ke tehat do triangles ke congruent hone ka sabot dein.",
    toProve: "In triangle ABC and triangle DEF: given AB = DE, angle A = angle D, AC = DF. Prove triangle ABC is congruent to triangle DEF.",
    construction:
      "Place triangle ABC on triangle DEF so that vertex A falls on vertex D and side AB falls along side DE.",
    steps: [
      { label: "Since AB = DE", value: "point B coincides with point E" },
      { label: "Since angle A = angle D", value: "ray AC falls along ray DF" },
      { label: "Since AC = DF", value: "point C coincides with point F" },
      { label: "All three vertices coincide", value: "A on D, B on E, C on F" },
      { label: "Therefore", value: "the two triangles cover each other exactly" },
    ],
    answer: "Triangle ABC is congruent to triangle DEF (SAS). Hence proved.",
    examTip:
      "Angle INCLUDED hona zaroori hai - yani dono di gayi sides ke darmiyan. Agar angle bahar ho to SAS lagu nahi hota.",
  },
  {
    id: "m9-th-para",
    classLevel: "9th",
    subject: "math",
    chapter: "Parallelograms and Triangles",
    kind: "theorem",
    question:
      "Prove that in a parallelogram the opposite sides are equal.",
    romanUrdu:
      "Sabit karein ke parallelogram ke muqabil azlaa barabar hote hain.",
    toProve: "In parallelogram ABCD, prove that AB = DC and AD = BC.",
    construction:
      "Draw the diagonal AC, dividing the parallelogram into triangle ABC and triangle ADC.",
    steps: [
      { label: "Given", value: "ABCD is a parallelogram, so AB is parallel to DC and AD is parallel to BC" },
      { label: "Alternate angles", value: "angle BAC = angle DCA (AB parallel to DC, AC is the transversal)" },
      { label: "Alternate angles", value: "angle DAC = angle BCA (AD parallel to BC, AC is the transversal)" },
      { label: "Common side", value: "AC = AC" },
      { label: "Congruence", value: "triangle ABC is congruent to triangle CDA (ASA)" },
      { label: "Corresponding sides", value: "AB = DC and AD = BC (congruent triangles have equal corresponding sides)" },
    ],
    answer: "Opposite sides of a parallelogram are equal: AB = DC and AD = BC. Hence proved.",
    examTip:
      "Diagonal ki construction likhna zaroori hai - uske baghair proof shuru hi nahi ho sakta aur marks kat jate hain.",
  },
  {
    id: "m9-th-bisect",
    classLevel: "9th",
    subject: "math",
    chapter: "Line Bisectors and Angle Bisectors",
    kind: "theorem",
    question:
      "Prove that any point on the right bisector of a line segment is equidistant from its end points.",
    romanUrdu:
      "Sabit karein ke right bisector par har nuqta dono siron se barabar faasle par hota hai.",
    toProve: "Let P be any point on the right bisector of segment AB, meeting AB at M. Prove PA = PB.",
    construction:
      "Join P to A and P to B.",
    steps: [
      { label: "By definition of right bisector", value: "M is the midpoint of AB, so AM = MB" },
      { label: "Also by definition", value: "PM is perpendicular to AB, so angle PMA = angle PMB = 90 degrees" },
      { label: "Common side", value: "PM = PM" },
      { label: "Congruence", value: "triangle PMA is congruent to triangle PMB (SAS)" },
      { label: "Corresponding sides", value: "PA = PB" },
    ],
    answer: "Any point on the right bisector is equidistant from the end points: PA = PB. Hence proved.",
    examTip:
      "Right bisector ki DO sharten hoti hain: midpoint se guzarna AUR amoodi hona. Dono likhein warna proof adhoora hai.",
  },
  {
    id: "m9-th-sides",
    classLevel: "9th",
    subject: "math",
    chapter: "Sides and Angles of a Triangle",
    kind: "theorem",
    question:
      "Prove that in a triangle, the angle opposite the greater side is greater.",
    romanUrdu:
      "Sabit karein ke bare zil ke muqabil ka zaawiya bara hota hai.",
    toProve: "In triangle ABC, given AC > AB, prove that angle ABC > angle ACB.",
    construction:
      "On the longer side AC, cut off AD equal to AB, and join B to D.",
    steps: [
      { label: "By construction", value: "AD = AB, so triangle ABD is isosceles" },
      { label: "Base angles of an isosceles triangle", value: "angle ABD = angle ADB   ...(i)" },
      { label: "Exterior angle of triangle BDC", value: "angle ADB = angle DBC + angle DCB, so angle ADB > angle DCB   ...(ii)" },
      { label: "From (i) and (ii)", value: "angle ABD > angle DCB, that is angle ABD > angle ACB" },
      { label: "Since D lies inside AC", value: "angle ABC > angle ABD" },
      { label: "Combining", value: "angle ABC > angle ABD > angle ACB" },
    ],
    answer: "The angle opposite the greater side is greater: angle ABC > angle ACB. Hence proved.",
    examTip:
      "Construction 'AD = AB kaat lein' likhna hi is proof ki kunji hai. Bina iske aage nahi barh sakte.",
  },
  {
    id: "m10-sets-1",
    classLevel: "10th",
    subject: "math",
    chapter: "Sets and Functions",
    kind: "numerical",
    question:
      "If A = {a,b,c} and B = {1,2}, find A x B, state n(A x B), and how many relations from A to B are possible?",
    romanUrdu:
      "Cartesian product nikalein aur relations ki tadaad batayein.",
    given: [
      { label: "Set A", value: "{a, b, c}, n(A) = 3" },
      { label: "Set B", value: "{1, 2}, n(B) = 2" },
    ],
    formula: "n(A x B) = n(A) x n(B) · number of relations from A to B = 2^(n(A) x n(B))",
    steps: [
      { label: "Cartesian product", value: "A x B = {(a,1),(a,2),(b,1),(b,2),(c,1),(c,2)}" },
      { label: "Count", value: "n(A x B) = 3 x 2 = 6" },
      { label: "Relations are subsets of A x B", value: "number of subsets of a 6-element set = 2^6" },
      { label: "Compute", value: "2^6 = 64" },
    ],
    answer: "A x B has 6 ordered pairs and 64 relations are possible from A to B.",
    examTip:
      "A x B aur B x A alag hote hain - ordered pairs ki tarteeb badal jati hai. Ise barabar samajhna aam ghalti hai.",
  },
  {
    id: "m10-algf-1",
    classLevel: "10th",
    subject: "math",
    chapter: "Algebraic Formulas and Applications",
    kind: "numerical",
    question:
      "If a + b = 9 and ab = 20, find a^2 + b^2, a - b and a^3 + b^3.",
    romanUrdu:
      "Di gayi maloomat se yeh teen qeematein nikalein.",
    given: [
      { label: "Sum", value: "a + b = 9" },
      { label: "Product", value: "ab = 20" },
    ],
    formula: "a^2 + b^2 = (a+b)^2 - 2ab · (a-b)^2 = (a+b)^2 - 4ab · a^3 + b^3 = (a+b)^3 - 3ab(a+b)",
    steps: [
      { label: "a^2 + b^2", value: "(9)^2 - 2(20) = 81 - 40 = 41" },
      { label: "(a - b)^2", value: "(9)^2 - 4(20) = 81 - 80 = 1" },
      { label: "a - b", value: "square root of 1 = plus or minus 1" },
      { label: "a^3 + b^3", value: "(9)^3 - 3(20)(9) = 729 - 540 = 189" },
    ],
    answer: "a^2 + b^2 = 41, a - b = +/- 1, and a^3 + b^3 = 189.",
    examTip:
      "(a-b)^2 mein 4ab ghata hai jabke (a+b)^2 mein 2ab. Yeh 2 aur 4 ka farq bohat marks zaya karta hai.",
  },
  {
    id: "m10-bfm-1",
    classLevel: "10th",
    subject: "math",
    chapter: "Business and Financial Mathematics",
    kind: "numerical",
    question:
      "A person deposits Rs. 150,000 in a bank that pays 9% per annum compounded semi-annually. Find the amount after 2 years.",
    romanUrdu:
      "Chhemahi compounding par 2 saal baad ki raqam nikalein.",
    given: [
      { label: "Principal", value: "Rs. 150,000" },
      { label: "Annual rate", value: "9%" },
      { label: "Compounded", value: "semi-annually" },
      { label: "Time", value: "2 years" },
    ],
    formula: "A = P (1 + r/n)^(nt) where n = number of compounding periods per year",
    steps: [
      { label: "Rate per period", value: "9% / 2 = 4.5% = 0.045" },
      { label: "Number of periods", value: "n x t = 2 x 2 = 4" },
      { label: "Growth factor", value: "(1.045)^4" },
      { label: "Compute step by step", value: "1.045^2 = 1.092025; 1.092025^2 = 1.192519" },
      { label: "Amount", value: "150,000 x 1.192519 = Rs. 178,877.79" },
      { label: "Compound interest", value: "178,877.79 - 150,000 = Rs. 28,877.79" },
    ],
    answer: "Amount after 2 years = Rs. 178,877.79 (interest Rs. 28,877.79).",
    examTip:
      "Semi-annual mein rate AADHI aur periods DUGNE hote hain. Sirf ek badalna sab se aam ghalti hai.",
  },
  {
    id: "m10-th-proj",
    classLevel: "10th",
    subject: "math",
    chapter: "Projection of a Side of a Triangle",
    kind: "theorem",
    question:
      "In an obtuse triangle, prove that the square on the side opposite the obtuse angle is greater than the sum of the squares on the other two sides.",
    romanUrdu:
      "Sabit karein ke obtuse angle ke muqabil zil ka square baaqi do ke squares se bara hota hai.",
    toProve: "In triangle ABC with angle ACB obtuse, prove |AB|^2 = |AC|^2 + |BC|^2 + 2(BC)(CD).",
    construction:
      "Draw AD perpendicular from A to BC produced, meeting the produced line at D.",
    steps: [
      { label: "In right triangle ADB", value: "|AB|^2 = |AD|^2 + |BD|^2 (Pythagoras)" },
      { label: "Express BD", value: "BD = BC + CD, so |BD|^2 = |BC|^2 + 2(BC)(CD) + |CD|^2" },
      { label: "Substitute", value: "|AB|^2 = |AD|^2 + |BC|^2 + 2(BC)(CD) + |CD|^2" },
      { label: "In right triangle ADC", value: "|AC|^2 = |AD|^2 + |CD|^2 (Pythagoras)" },
      { label: "Replace", value: "|AD|^2 + |CD|^2 = |AC|^2" },
      { label: "Therefore", value: "|AB|^2 = |AC|^2 + |BC|^2 + 2(BC)(CD)" },
      { label: "Since 2(BC)(CD) > 0", value: "|AB|^2 > |AC|^2 + |BC|^2" },
    ],
    answer: "|AB|^2 = |AC|^2 + |BC|^2 + 2(BC)(CD), which exceeds |AC|^2 + |BC|^2. Hence proved.",
    examTip:
      "Obtuse mein PLUS aur acute mein MINUS hota hai (2·BC·CD ka sign). Yeh sign yaad rakhna zaroori hai.",
  },
  {
    id: "m10-th-chords",
    classLevel: "10th",
    subject: "math",
    chapter: "Chords and Arcs",
    kind: "theorem",
    question:
      "Prove that equal chords of a circle subtend equal angles at the centre.",
    romanUrdu:
      "Sabit karein ke barabar chords markaz par barabar zaawiye banate hain.",
    toProve: "In a circle with centre O, given chord AB = chord CD, prove angle AOB = angle COD.",
    construction:
      "Join OA, OB, OC and OD (all radii of the circle).",
    steps: [
      { label: "Radii are equal", value: "OA = OB = OC = OD = r" },
      { label: "In triangle AOB and triangle COD", value: "OA = OC (radii)" },
      { label: "Second pair", value: "OB = OD (radii)" },
      { label: "Third pair", value: "AB = CD (given)" },
      { label: "Congruence", value: "triangle AOB is congruent to triangle COD (SSS)" },
      { label: "Corresponding angles", value: "angle AOB = angle COD" },
    ],
    answer: "Equal chords subtend equal angles at the centre: angle AOB = angle COD. Hence proved.",
    examTip:
      "Radii jorna (construction) likhna zaroori hai. SSS ke teeno joray alag alag likhein - shortcut par marks katte hain.",
  },
  {
    id: "m11-numsys-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Number Systems",
    kind: "numerical",
    question:
      "Express the recurring decimal 0.363636... as a rational number in lowest terms.",
    romanUrdu:
      "Recurring decimal ko rational number mein badlein.",
    given: [
      { label: "Decimal", value: "x = 0.363636... (the block 36 repeats)" },
    ],
    formula: "Multiply by 10^k where k = length of the repeating block, then subtract",
    steps: [
      { label: "Let", value: "x = 0.363636..." },
      { label: "Repeating block has 2 digits", value: "multiply both sides by 100: 100x = 36.363636..." },
      { label: "Subtract the original", value: "100x - x = 36.363636... - 0.363636..." },
      { label: "Simplify", value: "99x = 36" },
      { label: "Solve", value: "x = 36/99" },
      { label: "Lowest terms", value: "divide numerator and denominator by 9: x = 4/11" },
    ],
    answer: "0.363636... = 4/11",
    examTip:
      "10 ki power repeating block ki LAMBAI ke barabar honi chahiye - do digits repeat ho rahe hain to 100 se zarb, 10 se nahi.",
  },
  {
    id: "m11-groups-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Sets, Functions and Groups",
    kind: "numerical",
    question:
      "Show that the set {1, -1, i, -i} forms a group under multiplication.",
    romanUrdu:
      "Sabit karein ke yeh set zarb ke tehat group banata hai.",
    given: [
      { label: "Set", value: "G = {1, -1, i, -i}" },
      { label: "Operation", value: "multiplication" },
      { label: "Key fact", value: "i^2 = -1" },
    ],
    formula: "A group must satisfy closure, associativity, identity and inverse",
    steps: [
      { label: "Closure", value: "every product stays in G, e.g. i x i = -1, i x -i = 1, -1 x -i = i" },
      { label: "Associativity", value: "multiplication of complex numbers is associative" },
      { label: "Identity", value: "1 is in G and a x 1 = a for every a in G" },
      { label: "Inverse of 1", value: "1 (since 1 x 1 = 1)" },
      { label: "Inverse of -1", value: "-1 (since -1 x -1 = 1)" },
      { label: "Inverse of i", value: "-i (since i x -i = -i^2 = 1)" },
      { label: "Inverse of -i", value: "i" },
      { label: "All four axioms hold", value: "therefore G is a group" },
    ],
    answer: "{1, -1, i, -i} satisfies closure, associativity, identity and inverse, so it is a group under multiplication.",
    examTip:
      "Chaaron sharten alag alag likhna zaroori hai. Sirf 'closure hai' likh dena adhoora jawab hai.",
  },
  {
    id: "m11-mat-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Matrices and Determinants",
    kind: "numerical",
    question:
      "Solve the system 2x + 3y = 13 and x - y = 1 using Cramer's rule.",
    romanUrdu:
      "Cramer's rule se system hal karein.",
    given: [
      { label: "Equation 1", value: "2x + 3y = 13" },
      { label: "Equation 2", value: "x - y = 1" },
    ],
    formula: "x = Dx/D and y = Dy/D, where D is the coefficient determinant",
    steps: [
      { label: "Coefficient determinant", value: "D = |2  3; 1  -1| = (2)(-1) - (3)(1) = -2 - 3 = -5" },
      { label: "Since D is not 0", value: "a unique solution exists" },
      { label: "Dx", value: "replace the x-column with constants: |13  3; 1  -1| = (13)(-1) - (3)(1) = -13 - 3 = -16" },
      { label: "Dy", value: "replace the y-column: |2  13; 1  1| = (2)(1) - (13)(1) = 2 - 13 = -11" },
      { label: "Solve", value: "x = -16 / -5 = 16/5 and y = -11 / -5 = 11/5" },
      { label: "Check in equation 2", value: "16/5 - 11/5 = 5/5 = 1, correct" },
    ],
    answer: "x = 16/5 and y = 11/5",
    examTip:
      "Cramer's rule sirf tab chalta hai jab D not equal 0. Pehle D nikaal kar check karein warna jawab ghalat hoga.",
  },
  {
    id: "m11-pf-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Partial Fractions",
    kind: "numerical",
    question:
      "Resolve (5x - 4) / ((x - 2)(x + 1)) into partial fractions.",
    romanUrdu:
      "Partial fractions mein tordein.",
    given: [
      { label: "Expression", value: "(5x - 4) / ((x - 2)(x + 1))" },
    ],
    formula: "For distinct linear factors: A/(x - 2) + B/(x + 1)",
    steps: [
      { label: "Set up", value: "(5x - 4)/((x-2)(x+1)) = A/(x-2) + B/(x+1)" },
      { label: "Multiply through", value: "5x - 4 = A(x + 1) + B(x - 2)" },
      { label: "Put x = 2", value: "5(2) - 4 = A(3), so 6 = 3A, giving A = 2" },
      { label: "Put x = -1", value: "5(-1) - 4 = B(-3), so -9 = -3B, giving B = 3" },
      { label: "Write the result", value: "2/(x - 2) + 3/(x + 1)" },
    ],
    answer: "(5x - 4)/((x-2)(x+1)) = 2/(x - 2) + 3/(x + 1)",
    examTip:
      "x ki wo value daalein jo ek factor ko sifar kare - is se doosra constant foran mil jata hai.",
  },
  {
    id: "m11-perm-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Permutation, Combination and Probability",
    kind: "numerical",
    question:
      "In how many ways can a committee of 3 men and 2 women be chosen from 7 men and 5 women? What is the probability that a particular man is included?",
    romanUrdu:
      "Committee ke tareeqe aur ehtemal nikalein.",
    given: [
      { label: "Men available", value: "7, choose 3" },
      { label: "Women available", value: "5, choose 2" },
    ],
    formula: "nCr = n! / (r! (n - r)!) · P(event) = favourable / total",
    steps: [
      { label: "Choosing men", value: "7C3 = 7!/(3!4!) = (7 x 6 x 5)/(3 x 2 x 1) = 35" },
      { label: "Choosing women", value: "5C2 = 5!/(2!3!) = (5 x 4)/(2 x 1) = 10" },
      { label: "Total committees", value: "35 x 10 = 350" },
      { label: "With a particular man fixed", value: "choose 2 more men from the remaining 6: 6C2 = 15" },
      { label: "Women unchanged", value: "5C2 = 10, so favourable = 15 x 10 = 150" },
      { label: "Probability", value: "150/350 = 3/7" },
    ],
    answer: "350 committees are possible; the probability a particular man is included is 3/7.",
    examTip:
      "Committee mein tarteeb ki ahmiyat nahi, is liye COMBINATION (nCr) lagta hai, permutation nahi.",
  },
  {
    id: "m11-trigid-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Trigonometric Identities",
    kind: "numerical",
    question:
      "Prove that (1 + cos A) / sin A + sin A / (1 + cos A) = 2 cosec A.",
    romanUrdu:
      "Yeh trigonometric identity sabit karein.",
    given: [
      { label: "To prove", value: "(1 + cos A)/sin A + sin A/(1 + cos A) = 2 cosec A" },
    ],
    formula: "sin^2 A + cos^2 A = 1 · cosec A = 1/sin A",
    steps: [
      { label: "Take the LHS over a common denominator", value: "[(1 + cos A)^2 + sin^2 A] / [sin A (1 + cos A)]" },
      { label: "Expand the numerator", value: "1 + 2 cos A + cos^2 A + sin^2 A" },
      { label: "Use sin^2 A + cos^2 A = 1", value: "= 1 + 2 cos A + 1 = 2 + 2 cos A" },
      { label: "Factorise", value: "= 2(1 + cos A)" },
      { label: "Substitute back", value: "2(1 + cos A) / [sin A (1 + cos A)]" },
      { label: "Cancel (1 + cos A)", value: "= 2 / sin A" },
      { label: "Rewrite", value: "= 2 cosec A = RHS" },
    ],
    answer: "LHS = 2 cosec A = RHS. Hence proved.",
    examTip:
      "Identity proof mein sirf EK taraf par kaam karein (aam tor par LHS) aur usay RHS tak le jayein. Dono taraf ek sath chalana ghalat tareeqa hai.",
  },
  {
    id: "m11-invtrig-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Inverse Trigonometric Functions",
    kind: "numerical",
    question:
      "Evaluate sin inverse (1/2) + cos inverse (1/2), and find the principal value of tan inverse (-1).",
    romanUrdu:
      "Inverse trigonometric qeematein nikalein.",
    given: [
      { label: "Expression 1", value: "sin^-1(1/2) + cos^-1(1/2)" },
      { label: "Expression 2", value: "tan^-1(-1)" },
    ],
    formula: "Principal ranges: sin^-1 in [-90, 90] · cos^-1 in [0, 180] · tan^-1 in (-90, 90)",
    steps: [
      { label: "sin^-1(1/2)", value: "the angle in [-90, 90] whose sine is 1/2, which is 30 degrees" },
      { label: "cos^-1(1/2)", value: "the angle in [0, 180] whose cosine is 1/2, which is 60 degrees" },
      { label: "Sum", value: "30 + 60 = 90 degrees (that is pi/2 radians)" },
      { label: "tan^-1(-1)", value: "the angle in (-90, 90) whose tangent is -1, which is -45 degrees" },
      { label: "Note", value: "135 degrees also has tangent -1 but lies outside the principal range" },
    ],
    answer: "sin^-1(1/2) + cos^-1(1/2) = 90 degrees (pi/2); tan^-1(-1) = -45 degrees (-pi/4).",
    examTip:
      "PRINCIPAL value maangi jaye to sirf muqarrara range wala jawab likhein. 135 degrees yahan ghalat hai.",
  },
  {
    id: "m11-si-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Simple and Compound Interest",
    kind: "numerical",
    question:
      "A sum doubles itself in 8 years at simple interest. Find the rate. At that same rate, what will Rs. 25,000 amount to in 5 years?",
    romanUrdu:
      "Rate nikalein aur phir 5 saal baad ki raqam maloom karein.",
    given: [
      { label: "Condition", value: "the sum doubles in 8 years under simple interest" },
      { label: "Principal for part 2", value: "Rs. 25,000" },
      { label: "Time for part 2", value: "5 years" },
    ],
    formula: "S.I. = P r t / 100 · doubling means S.I. = P",
    steps: [
      { label: "Doubling means", value: "interest earned equals the principal, so S.I. = P" },
      { label: "Substitute", value: "P = P x r x 8 / 100" },
      { label: "Cancel P", value: "1 = 8r/100" },
      { label: "Solve", value: "r = 100/8 = 12.5% per annum" },
      { label: "Interest on 25,000 for 5 years", value: "(25,000 x 12.5 x 5)/100 = 1,562,500/100 = Rs. 15,625" },
      { label: "Amount", value: "25,000 + 15,625 = Rs. 40,625" },
    ],
    answer: "Rate = 12.5% per annum; Rs. 25,000 amounts to Rs. 40,625 in 5 years.",
    examTip:
      "'Double ho jata hai' ka matlab interest = principal, total amount = 2P nahi jo interest ho. Yeh confusion aam hai.",
  },
  {
    id: "m11-ann-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Annuities and Present Value",
    kind: "numerical",
    question:
      "Find the present value of an annuity of Rs. 20,000 paid at the end of each year for 4 years at 10% per annum.",
    romanUrdu:
      "Annuity ki aaj ki qeemat nikalein.",
    given: [
      { label: "Annual payment", value: "R = Rs. 20,000" },
      { label: "Rate", value: "i = 10% = 0.10" },
      { label: "Periods", value: "n = 4" },
    ],
    formula: "PV = R x [1 - (1 + i)^-n] / i",
    steps: [
      { label: "Compute (1.10)^4", value: "1.10^2 = 1.21; 1.21^2 = 1.4641" },
      { label: "Reciprocal", value: "(1.10)^-4 = 1/1.4641 = 0.6830135" },
      { label: "Numerator", value: "1 - 0.6830135 = 0.3169865" },
      { label: "Divide by i", value: "0.3169865 / 0.10 = 3.169865" },
      { label: "Present value", value: "20,000 x 3.169865 = Rs. 63,397.31" },
    ],
    answer: "Present value of the annuity = Rs. 63,397.31",
    examTip:
      "PV hamesha kul adaigi (Rs. 80,000) se KAM hoti hai kyunke mustaqbil ka paisa aaj kam qeemat rakhta hai. Zyada aaye to ghalti hai.",
  },
  {
    id: "m11-trade-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Mathematics of Trade and Discount",
    kind: "numerical",
    question:
      "A bill of Rs. 50,000 is discounted at 12% per annum, 3 months before maturity. Find the true discount and the present worth.",
    romanUrdu:
      "True discount aur present worth nikalein.",
    given: [
      { label: "Bill amount", value: "Rs. 50,000" },
      { label: "Rate", value: "12% per annum" },
      { label: "Time to maturity", value: "3 months = 1/4 year" },
    ],
    formula: "Present worth PW = A / (1 + rt) · True discount = A - PW",
    steps: [
      { label: "rt", value: "0.12 x (3/12) = 0.12 x 0.25 = 0.03" },
      { label: "Denominator", value: "1 + 0.03 = 1.03" },
      { label: "Present worth", value: "50,000 / 1.03 = Rs. 48,543.69" },
      { label: "True discount", value: "50,000 - 48,543.69 = Rs. 1,456.31" },
    ],
    answer: "Present worth = Rs. 48,543.69 and true discount = Rs. 1,456.31",
    examTip:
      "TRUE discount present worth par lagta hai (isliye taqseem karte hain), jabke BANKER'S discount bill ki poori raqam par. Dono ko mila dena aam ghalti hai.",
  },
  {
    id: "m12-analytic-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Introduction to Analytic Geometry",
    kind: "numerical",
    question:
      "Find the equation of the line through (2, -3) and (5, 6), and the perpendicular distance from the origin to it.",
    romanUrdu:
      "Line ki equation aur origin se amoodi faasla nikalein.",
    given: [
      { label: "Point A", value: "(2, -3)" },
      { label: "Point B", value: "(5, 6)" },
    ],
    formula: "Two-point form: (y - y1) = m(x - x1), m = (y2-y1)/(x2-x1) · d = |ax0 + by0 + c| / sqrt(a^2 + b^2)",
    steps: [
      { label: "Slope", value: "m = (6 - (-3))/(5 - 2) = 9/3 = 3" },
      { label: "Point-slope form", value: "y - (-3) = 3(x - 2), so y + 3 = 3x - 6" },
      { label: "General form", value: "3x - y - 9 = 0" },
      { label: "Distance from origin (0,0)", value: "|3(0) - 1(0) - 9| / sqrt(3^2 + (-1)^2)" },
      { label: "Simplify", value: "= 9 / sqrt(10)" },
      { label: "Rationalise", value: "= 9 sqrt(10) / 10 = 2.846 units" },
    ],
    answer: "Equation: 3x - y - 9 = 0; distance from the origin = 9/sqrt(10) = 2.85 units.",
    examTip:
      "Distance formula mein MODULUS lagana zaroori hai - faasla kabhi manfi nahi hota.",
  },
  {
    id: "m12-lp-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Linear Inequalities and Linear Programming",
    kind: "numerical",
    question:
      "Maximise P = 5x + 3y subject to x + y <= 4, x + 3y <= 6, x >= 0, y >= 0.",
    romanUrdu:
      "Linear programming se maximum qeemat nikalein.",
    given: [
      { label: "Objective", value: "maximise P = 5x + 3y" },
      { label: "Constraint 1", value: "x + y <= 4" },
      { label: "Constraint 2", value: "x + 3y <= 6" },
      { label: "Non-negativity", value: "x >= 0, y >= 0" },
    ],
    formula: "The optimum of a linear objective occurs at a corner point of the feasible region",
    steps: [
      { label: "Corner O", value: "(0, 0): P = 0" },
      { label: "Corner on the x-axis", value: "x + y = 4 gives (4, 0): check x + 3y = 4 <= 6, feasible. P = 5(4) + 0 = 20" },
      { label: "Corner on the y-axis", value: "x + 3y = 6 gives (0, 2): check x + y = 2 <= 4, feasible. P = 0 + 3(2) = 6" },
      { label: "Intersection", value: "solve x + y = 4 and x + 3y = 6: subtract to get 2y = 2, so y = 1 and x = 3" },
      { label: "Value there", value: "P = 5(3) + 3(1) = 15 + 3 = 18" },
      { label: "Compare 0, 20, 6, 18", value: "the largest is 20" },
    ],
    answer: "Maximum P = 20, attained at the corner point (4, 0).",
    examTip:
      "Har corner point ko objective function mein daal kar compare karein. Sirf intersection dekhna kaafi nahi.",
  },
  {
    id: "m12-statdata-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Introduction to Statistics and Data",
    kind: "numerical",
    question:
      "Classify these as qualitative or quantitative, and discrete or continuous: (a) eye colour (b) number of students (c) height (d) exam grade.",
    romanUrdu:
      "Data ki qismein pehchanein.",
    given: [
      { label: "Items", value: "eye colour, number of students, height, exam grade" },
    ],
    formula: "Qualitative = categories · Quantitative = numeric · Discrete = countable · Continuous = measurable",
    steps: [
      { label: "(a) Eye colour", value: "a category with no numeric value: QUALITATIVE" },
      { label: "(b) Number of students", value: "counted in whole numbers: QUANTITATIVE and DISCRETE" },
      { label: "(c) Height", value: "measured on a scale, can take any value in a range: QUANTITATIVE and CONTINUOUS" },
      { label: "(d) Exam grade", value: "a category label such as A+ or B: QUALITATIVE (ordinal, since it has order)" },
    ],
    answer: "Eye colour and exam grade are qualitative; number of students is discrete quantitative; height is continuous quantitative.",
    examTip:
      "Discrete GINA jata hai, continuous NAAPA jata hai. Yeh farq yaad rakhne ka aasan tareeqa hai.",
  },
  {
    id: "m12-present-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Presentation of Data",
    kind: "numerical",
    question:
      "Construct a frequency distribution for these 20 marks using class intervals of width 10 starting at 30: 34,45,52,38,61,47,55,42,58,66,39,50,44,57,63,48,53,41,59,46",
    romanUrdu:
      "Frequency distribution table banayein.",
    given: [
      { label: "Number of observations", value: "n = 20" },
      { label: "Class width", value: "10" },
      { label: "Starting point", value: "30" },
    ],
    formula: "Frequency = number of observations falling in each class interval",
    steps: [
      { label: "Class 30-39", value: "34, 38, 39 -> frequency 3" },
      { label: "Class 40-49", value: "45, 47, 42, 44, 48, 41, 46 -> frequency 7" },
      { label: "Class 50-59", value: "52, 55, 58, 50, 57, 53, 59 -> frequency 7" },
      { label: "Class 60-69", value: "61, 66, 63 -> frequency 3" },
      { label: "Check the total", value: "3 + 7 + 7 + 3 = 20, matching n" },
    ],
    answer: "Frequencies: 30-39 = 3, 40-49 = 7, 50-59 = 7, 60-69 = 3 (total 20).",
    examTip:
      "Frequencies ka jama hamesha n ke barabar hona chahiye. Yeh check har baar karein - ghalti foran pakri jati hai.",
  },
  {
    id: "m12-index-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Index Numbers",
    kind: "numerical",
    question:
      "Prices of three items in 2020 were 40, 60, 80 and in 2026 they are 50, 78, 96. Compute the simple aggregative price index and the simple average of price relatives.",
    romanUrdu:
      "Do tareeqon se price index nikalein.",
    given: [
      { label: "Base year prices (2020)", value: "40, 60, 80" },
      { label: "Current year prices (2026)", value: "50, 78, 96" },
    ],
    formula: "Aggregative index = (sum p1 / sum p0) x 100 · Price relative = (p1/p0) x 100",
    steps: [
      { label: "Sum of base prices", value: "40 + 60 + 80 = 180" },
      { label: "Sum of current prices", value: "50 + 78 + 96 = 224" },
      { label: "Aggregative index", value: "(224/180) x 100 = 124.44" },
      { label: "Price relatives", value: "(50/40)x100 = 125; (78/60)x100 = 130; (96/80)x100 = 120" },
      { label: "Average of relatives", value: "(125 + 130 + 120)/3 = 375/3 = 125" },
    ],
    answer: "Simple aggregative index = 124.44 and the average of price relatives = 125.",
    examTip:
      "Dono tareeqe thora mukhtalif jawab dete hain - yeh normal hai. Sawal mein jo tareeqa maanga ho wohi istemal karein.",
  },
  {
    id: "m12-corr-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Correlation and Regression",
    kind: "numerical",
    question:
      "For the data x: 1,2,3,4,5 and y: 2,4,5,4,5, find the correlation coefficient r.",
    romanUrdu:
      "Correlation coefficient nikalein.",
    given: [
      { label: "x values", value: "1, 2, 3, 4, 5" },
      { label: "y values", value: "2, 4, 5, 4, 5" },
      { label: "n", value: "5" },
    ],
    formula: "r = [n(sum xy) - (sum x)(sum y)] / sqrt{[n sum x^2 - (sum x)^2][n sum y^2 - (sum y)^2]}",
    steps: [
      { label: "sum x", value: "1+2+3+4+5 = 15" },
      { label: "sum y", value: "2+4+5+4+5 = 20" },
      { label: "sum xy", value: "(1)(2)+(2)(4)+(3)(5)+(4)(4)+(5)(5) = 2+8+15+16+25 = 66" },
      { label: "sum x^2", value: "1+4+9+16+25 = 55" },
      { label: "sum y^2", value: "4+16+25+16+25 = 86" },
      { label: "Numerator", value: "5(66) - (15)(20) = 330 - 300 = 30" },
      { label: "First bracket", value: "5(55) - 225 = 275 - 225 = 50" },
      { label: "Second bracket", value: "5(86) - 400 = 430 - 400 = 30" },
      { label: "Denominator", value: "sqrt(50 x 30) = sqrt(1500) = 38.7298" },
      { label: "Divide", value: "r = 30 / 38.7298 = 0.7746" },
    ],
    answer: "r = 0.775 (approximately), indicating a strong positive correlation.",
    examTip:
      "r hamesha -1 aur +1 ke darmiyan hota hai. Agar is range se bahar aaye to hisaab yaqeenan ghalat hai.",
  },
  {
    id: "m12-prob-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Probability and Probability Distributions",
    kind: "numerical",
    question:
      "A fair coin is tossed 5 times. Find the probability of exactly 3 heads, and the mean of the distribution.",
    romanUrdu:
      "Binomial distribution se ehtemal aur mean nikalein.",
    given: [
      { label: "Number of trials", value: "n = 5" },
      { label: "Probability of head", value: "p = 0.5" },
      { label: "Required successes", value: "r = 3" },
    ],
    formula: "P(X = r) = nCr p^r q^(n-r) · mean = np",
    steps: [
      { label: "q", value: "1 - 0.5 = 0.5" },
      { label: "5C3", value: "5!/(3!2!) = (5 x 4)/(2 x 1) = 10" },
      { label: "p^3", value: "0.5^3 = 0.125" },
      { label: "q^2", value: "0.5^2 = 0.25" },
      { label: "Probability", value: "10 x 0.125 x 0.25 = 0.3125" },
      { label: "As a fraction", value: "10/32 = 5/16" },
      { label: "Mean", value: "np = 5 x 0.5 = 2.5" },
    ],
    answer: "P(exactly 3 heads) = 5/16 = 0.3125; mean of the distribution = 2.5.",
    examTip:
      "'Exactly 3' ke liye sirf r = 3 lagta hai. 'At least 3' ho to r = 3, 4, 5 sab jama karne parte hain.",
  },
  {
    id: "m12-sampling-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Sampling and Estimation",
    kind: "numerical",
    question:
      "A population has mean 50 and standard deviation 12. For samples of size 36, find the standard error and the 95% confidence interval for the sample mean.",
    romanUrdu:
      "Standard error aur 95 fisad confidence interval nikalein.",
    given: [
      { label: "Population mean", value: "mu = 50" },
      { label: "Population sd", value: "sigma = 12" },
      { label: "Sample size", value: "n = 36" },
    ],
    formula: "Standard error = sigma / sqrt(n) · 95% CI = mean +/- 1.96 x SE",
    steps: [
      { label: "sqrt(n)", value: "sqrt(36) = 6" },
      { label: "Standard error", value: "12 / 6 = 2" },
      { label: "Margin of error", value: "1.96 x 2 = 3.92" },
      { label: "Lower limit", value: "50 - 3.92 = 46.08" },
      { label: "Upper limit", value: "50 + 3.92 = 53.92" },
    ],
    answer: "Standard error = 2; the 95% confidence interval is (46.08, 53.92).",
    examTip:
      "Standard error mein sqrt(n) se TAQSEEM hota hai, n se nahi. Sample bara ho to error chhota - yeh mantiqi check hai.",
  },
  {
    id: "m12-inference-1",
    classLevel: "12th",
    subject: "math",
    chapter: "Statistical Inference in Business",
    kind: "numerical",
    question:
      "A factory claims its bulbs last 1000 hours. A sample of 64 bulbs shows a mean of 985 hours with sd 40. Test the claim at the 5% level.",
    romanUrdu:
      "Factory ke daawe ka hypothesis test karein.",
    given: [
      { label: "Claimed mean", value: "mu = 1000 hours" },
      { label: "Sample mean", value: "x-bar = 985" },
      { label: "Sample sd", value: "s = 40" },
      { label: "Sample size", value: "n = 64" },
    ],
    formula: "z = (x-bar - mu) / (s / sqrt(n)); reject H0 if |z| > 1.96 at the 5% level",
    steps: [
      { label: "Null hypothesis", value: "H0: mu = 1000 (the claim is true)" },
      { label: "Alternative", value: "H1: mu is not equal to 1000 (two-tailed)" },
      { label: "Standard error", value: "40 / sqrt(64) = 40/8 = 5" },
      { label: "Test statistic", value: "z = (985 - 1000)/5 = -15/5 = -3" },
      { label: "Critical value", value: "+/- 1.96 at the 5% level" },
      { label: "Compare", value: "|-3| = 3 > 1.96, so the result falls in the rejection region" },
    ],
    answer: "z = -3, which exceeds the critical value 1.96, so H0 is rejected: the claim is not supported at the 5% level.",
    examTip:
      "Faisla hamesha |z| ko critical value se compare kar ke likhein, aur natija saaf alfaz mein batayein - sirf number likhna adhoora hai.",
  },
];

/* ====== THEORY-CHAPTER CONCEPT ANSWERS (kind: "concept") ==============
 * These chapters carry no numericals - inventing "Given/Formula/Answer" for
 * them would be fabrication. Instead each is a board-style long question
 * answered in the structure examiners reward: definition, mechanism/reason,
 * comparison, then the conclusion, with the classic trap called out.
 */
const conceptGapFill: WorkedProblem[] = [
  {
    id: "c9-pt-1",
    classLevel: "9th",
    subject: "chemistry",
    chapter: "Periodic Table and Periodicity of Properties",
    kind: "concept",
    question:
      "Explain why atomic radius decreases across a period but increases down a group.",
    romanUrdu:
      "Batayein ke period mein atomic radius kam aur group mein zyada kyun hota hai.",
    steps: [
      { label: "Across a period", value: "the number of shells stays the same while protons are added to the nucleus" },
      { label: "Effect of nuclear charge", value: "the greater positive charge pulls the same electron shells inward more strongly" },
      { label: "Result across a period", value: "atomic radius decreases from left to right" },
      { label: "Down a group", value: "a completely new shell is added at each step" },
      { label: "Shielding effect", value: "inner shells screen the outer electrons from the nuclear pull" },
      { label: "Result down a group", value: "the outermost electrons sit further out, so atomic radius increases" },
    ],
    answer: "Radius decreases across a period (rising nuclear charge, same shells) and increases down a group (new shells plus shielding).",
    examTip:
      "Do wajuhat likhna zaroori hai: nuclear charge AUR shielding. Sirf ek likhne par aadhe marks milte hain.",
  },
  {
    id: "c9-echem-1",
    classLevel: "9th",
    subject: "chemistry",
    chapter: "Electrochemistry",
    kind: "concept",
    question:
      "Differentiate between electrolytic and galvanic (voltaic) cells with one example of each.",
    romanUrdu:
      "Electrolytic aur galvanic cell ka farq misalon ke sath likhein.",
    steps: [
      { label: "Energy conversion", value: "Electrolytic: electrical energy is converted into chemical energy. Galvanic: chemical energy is converted into electrical energy." },
      { label: "Nature of reaction", value: "Electrolytic: the reaction is non-spontaneous and needs an external supply. Galvanic: the reaction is spontaneous." },
      { label: "Anode sign", value: "Electrolytic: anode is positive. Galvanic: anode is negative." },
      { label: "Cathode sign", value: "Electrolytic: cathode is negative. Galvanic: cathode is positive." },
      { label: "Electrode placement", value: "Electrolytic: both electrodes sit in the same electrolyte. Galvanic: each electrode sits in its own half-cell joined by a salt bridge." },
      { label: "Examples", value: "Electrolytic: electrolysis of molten NaCl (Down's cell). Galvanic: the Daniell cell (Zn/Cu)." },
      { label: "Common ground", value: "in BOTH cells oxidation occurs at the anode and reduction at the cathode" },
    ],
    answer: "Electrolytic cells consume electricity to drive a non-spontaneous reaction; galvanic cells produce electricity from a spontaneous one.",
    examTip:
      "Anode/cathode ke SIGNS dono cells mein ulte hote hain, magar oxidation hamesha anode par hi hoti hai. Yeh trap har saal aata hai.",
  },
  {
    id: "c9-react-1",
    classLevel: "9th",
    subject: "chemistry",
    chapter: "Chemical Reactivity",
    kind: "concept",
    question:
      "Why are alkali metals highly reactive, and why does reactivity increase down Group I? Support with the reaction of sodium with water.",
    romanUrdu:
      "Alkali metals ki reactivity ki wajah aur group mein barhne ka sabab likhein.",
    formula: "2Na + 2H2O -> 2NaOH + H2",
    steps: [
      { label: "Electronic configuration", value: "alkali metals have a single electron in their outermost shell" },
      { label: "Ease of loss", value: "losing that one electron gives a stable noble-gas configuration, so it is lost readily" },
      { label: "Low ionisation energy", value: "little energy is required to remove the outer electron, making them very reactive" },
      { label: "Down the group", value: "atomic size increases and the outer electron sits further from the nucleus" },
      { label: "Weaker attraction", value: "the nuclear pull on that electron weakens and shielding increases" },
      { label: "Result", value: "ionisation energy falls down the group, so reactivity increases: Li < Na < K < Rb < Cs" },
      { label: "Reaction with water", value: "2Na + 2H2O -> 2NaOH + H2, which is vigorous and exothermic" },
    ],
    answer: "One loosely held outer electron makes alkali metals reactive; down the group larger size and shielding lower the ionisation energy, so reactivity increases.",
    examTip:
      "Reactivity ki wajah hamesha IONISATION ENERGY se joarein - sirf 'ek electron hai' likhna adhoora jawab hai.",
  },
  {
    id: "p10-em-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Electromagnetism",
    kind: "concept",
    question:
      "State Faraday's law of electromagnetic induction and Lenz's law, and explain how a D.C. motor works.",
    romanUrdu:
      "Faraday aur Lenz ke qawaneen bayan karein aur D.C. motor ka amal samjhayein.",
    formula: "emf = -N (change in flux / change in time)",
    steps: [
      { label: "Faraday's law", value: "the emf induced in a coil is directly proportional to the rate of change of magnetic flux through it" },
      { label: "Lenz's law", value: "the induced current always flows in a direction that opposes the change producing it" },
      { label: "Why Lenz's law holds", value: "it is a consequence of the conservation of energy; if the current aided the change, energy would be created from nothing" },
      { label: "Motor principle", value: "a current-carrying coil placed in a magnetic field experiences a force (motor effect)" },
      { label: "Force direction", value: "given by Fleming's left-hand rule: first finger = field, second finger = current, thumb = motion" },
      { label: "Couple", value: "the forces on the two opposite sides of the coil act in opposite directions and form a couple, rotating the coil" },
      { label: "Role of the split ring", value: "the commutator reverses the current every half turn so rotation continues in one direction" },
    ],
    answer: "Faraday's law gives the size of the induced emf, Lenz's law its direction; a D.C. motor converts electrical energy into mechanical energy using the motor effect and a split-ring commutator.",
    examTip:
      "Motor mein LEFT-hand rule aur generator mein RIGHT-hand rule lagta hai. Yeh ulta karna sab se aam ghalti hai.",
  },
  {
    id: "p10-basicelec-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Basic Electronics",
    kind: "concept",
    question:
      "Explain thermionic emission and describe the function of a cathode ray oscilloscope (CRO).",
    romanUrdu:
      "Thermionic emission aur CRO ka kaam samjhayein.",
    steps: [
      { label: "Thermionic emission", value: "the emission of electrons from the surface of a metal when it is heated to a high temperature" },
      { label: "Mechanism", value: "heating gives the free electrons enough kinetic energy to overcome the metal's work function" },
      { label: "Electron gun", value: "the heated cathode emits electrons which are accelerated by anodes into a fine beam" },
      { label: "Deflecting system", value: "two pairs of plates deflect the beam: X-plates horizontally and Y-plates vertically" },
      { label: "Fluorescent screen", value: "the beam strikes the screen and produces a visible spot of light" },
      { label: "Uses", value: "displaying waveforms, measuring voltage, frequency and phase, and in medical equipment (ECG)" },
    ],
    answer: "Thermionic emission supplies the electron beam; the CRO accelerates and deflects it onto a fluorescent screen to display waveforms.",
    examTip:
      "Electron gun, deflecting plates aur screen - teeno hisson ka zikr karein. Sirf definition likhne par poore marks nahi milte.",
  },
  {
    id: "p10-ict-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Information and Communication Technology",
    kind: "concept",
    question:
      "Explain how optical fibre transmits information and state its advantages over copper wire.",
    romanUrdu:
      "Optical fibre kaise maloomat bhejta hai aur uske faide kya hain.",
    steps: [
      { label: "Structure", value: "a fibre has a dense inner core surrounded by a less dense cladding" },
      { label: "Principle", value: "light travels along the core by repeated total internal reflection at the core-cladding boundary" },
      { label: "Condition 1", value: "light must pass from a denser to a rarer medium (core to cladding)" },
      { label: "Condition 2", value: "the angle of incidence must exceed the critical angle" },
      { label: "Signal form", value: "information is converted into pulses of light (digital signals) and reconverted to electrical signals at the far end" },
      { label: "Advantages", value: "much greater bandwidth, very low signal loss over distance, immune to electrical interference, lighter and thinner, more secure against tapping" },
    ],
    answer: "Optical fibre carries information as light pulses guided by total internal reflection, giving higher bandwidth and lower loss than copper.",
    examTip:
      "Total internal reflection ki DONO sharten likhna zaroori hai. Sirf 'roshni andar reflect hoti hai' likhna adhoora hai.",
  },
  {
    id: "p10-radio-1",
    classLevel: "10th",
    subject: "physics",
    chapter: "Radioactivity",
    kind: "concept",
    question:
      "Compare alpha, beta and gamma radiations in terms of nature, charge, penetrating power and ionising power.",
    romanUrdu:
      "Alpha, beta aur gamma radiation ka moazna karein.",
    steps: [
      { label: "Alpha - nature", value: "a helium nucleus, 2 protons + 2 neutrons, charge +2, relatively heavy" },
      { label: "Beta - nature", value: "a fast-moving electron, charge -1, very light" },
      { label: "Gamma - nature", value: "high-energy electromagnetic radiation, no charge, no mass" },
      { label: "Penetrating power", value: "alpha is stopped by paper; beta by a few mm of aluminium; gamma needs thick lead or concrete" },
      { label: "Ionising power", value: "alpha is the strongest ioniser, beta moderate, gamma the weakest" },
      { label: "The inverse relationship", value: "the more strongly a radiation ionises, the faster it loses energy, so the less it penetrates" },
      { label: "Deflection in a field", value: "alpha and beta are deflected in opposite directions by electric and magnetic fields; gamma is not deflected at all" },
    ],
    answer: "Alpha: highest ionising, lowest penetrating. Gamma: lowest ionising, highest penetrating. Beta lies between the two.",
    examTip:
      "Ionising aur penetrating power hamesha ULTE hote hain. Yeh relationship yaad rakhein - is se poora sawal hal ho jata hai.",
  },
  {
    id: "c10-bio-1",
    classLevel: "10th",
    subject: "chemistry",
    chapter: "Biochemistry",
    kind: "concept",
    question:
      "Classify carbohydrates with examples and explain the difference between proteins and lipids.",
    romanUrdu:
      "Carbohydrates ki iqsaam aur proteins/lipids ka farq likhein.",
    steps: [
      { label: "Definition", value: "carbohydrates are polyhydroxy aldehydes or ketones, or compounds yielding them on hydrolysis" },
      { label: "Monosaccharides", value: "the simplest sugars, cannot be hydrolysed further: glucose, fructose, galactose" },
      { label: "Oligosaccharides", value: "yield 2 to 10 monosaccharide units: sucrose, maltose, lactose" },
      { label: "Polysaccharides", value: "yield many units on hydrolysis: starch, cellulose, glycogen" },
      { label: "Proteins", value: "polymers of alpha-amino acids joined by peptide bonds, containing C, H, O and nitrogen" },
      { label: "Lipids", value: "esters of fatty acids and glycerol, containing only C, H and O and insoluble in water" },
      { label: "Key distinction", value: "proteins always contain nitrogen while lipids do not; proteins build tissue while lipids store energy" },
    ],
    answer: "Carbohydrates are mono-, oligo- or polysaccharides; proteins are nitrogen-containing amino-acid polymers, lipids are nitrogen-free fatty acid esters.",
    examTip:
      "Proteins mein NITROGEN hota hai, lipids mein nahi - yeh sab se aasan farq hai jo examiner poochta hai.",
  },
  {
    id: "c10-atm-1",
    classLevel: "10th",
    subject: "chemistry",
    chapter: "The Atmosphere",
    kind: "concept",
    question:
      "Explain the causes and effects of acid rain, and how the ozone layer is depleted.",
    romanUrdu:
      "Acid rain aur ozone depletion ke asbaab aur nataij likhein.",
    formula: "SO2 + H2O -> H2SO3 ; 2H2SO3 + O2 -> 2H2SO4",
    steps: [
      { label: "Acid rain definition", value: "rain with pH below 5.6, caused by oxides of sulphur and nitrogen dissolving in atmospheric moisture" },
      { label: "Sources", value: "burning fossil fuels releases SO2 and NO2 from power stations, factories and vehicles" },
      { label: "Formation", value: "SO2 + H2O -> H2SO3, then oxidised to H2SO4; NO2 forms HNO3" },
      { label: "Effects", value: "damages buildings and marble monuments, acidifies lakes killing aquatic life, harms crops and leaches soil nutrients" },
      { label: "Ozone layer", value: "a stratospheric layer that absorbs harmful ultraviolet radiation" },
      { label: "Depletion cause", value: "chlorofluorocarbons (CFCs) release chlorine atoms in UV light, and each Cl atom destroys many ozone molecules catalytically" },
      { label: "Consequences", value: "more UV reaching the surface causes skin cancer, cataracts and reduced crop yields" },
    ],
    answer: "Acid rain comes from SO2 and NO2 forming sulphuric and nitric acids; ozone depletion is driven catalytically by chlorine from CFCs.",
    examTip:
      "Acid rain ka pH 5.6 se KAM hota hai (normal barish khud 5.6 hoti hai CO2 ki wajah se), 7 se nahi. Yeh number aksar galat likha jata hai.",
  },
  {
    id: "c10-water-1",
    classLevel: "10th",
    subject: "chemistry",
    chapter: "Water",
    kind: "concept",
    question:
      "Distinguish between temporary and permanent hardness of water and describe how each is removed.",
    romanUrdu:
      "Aarzi aur mustaqil sakhti ka farq aur unko door karne ke tareeqe likhein.",
    formula: "Ca(HCO3)2 -> CaCO3 (precipitate) + H2O + CO2",
    steps: [
      { label: "Hard water", value: "water that does not readily lather with soap because it contains dissolved calcium and magnesium salts" },
      { label: "Temporary hardness", value: "caused by dissolved bicarbonates of calcium and magnesium, Ca(HCO3)2 and Mg(HCO3)2" },
      { label: "Removal by boiling", value: "heating decomposes the bicarbonate into insoluble carbonate which precipitates out" },
      { label: "Clark's method", value: "adding calculated slaked lime, Ca(OH)2, precipitates the carbonate" },
      { label: "Permanent hardness", value: "caused by dissolved sulphates and chlorides of calcium and magnesium, which boiling cannot remove" },
      { label: "Washing soda method", value: "Na2CO3 precipitates Ca and Mg as insoluble carbonates" },
      { label: "Ion exchange", value: "passing water through a resin exchanges Ca2+ and Mg2+ for Na+, removing both types of hardness" },
      { label: "Disadvantages of hard water", value: "wastes soap, forms scum, and produces boiler scale that wastes fuel and can cause explosions" },
    ],
    answer: "Temporary hardness is due to bicarbonates and is removed by boiling or Clark's method; permanent hardness is due to sulphates/chlorides and needs washing soda or ion exchange.",
    examTip:
      "Boiling sirf AARZI sakhti door karta hai. Mustaqil sakhti par boiling ka koi asar nahi - yeh sab se aam ghalti hai.",
  },
  {
    id: "p11-physopt-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Physical Optics",
    kind: "concept",
    question:
      "State the conditions for sustained interference and explain Young's double slit experiment.",
    romanUrdu:
      "Interference ki sharten aur Young ka tajurba samjhayein.",
    formula: "Fringe spacing: y = (lambda) L / d",
    steps: [
      { label: "Coherence", value: "the two sources must be coherent, i.e. maintain a constant phase difference" },
      { label: "Same frequency", value: "the two waves must have the same frequency and nearly equal amplitude" },
      { label: "Narrow separation", value: "the two slits must be very close together and the screen reasonably far away" },
      { label: "Young's setup", value: "monochromatic light passes through a single slit, then through two narrow slits S1 and S2" },
      { label: "Superposition", value: "the two emerging wavefronts overlap and superpose on the screen" },
      { label: "Constructive interference", value: "where path difference = n(lambda), crests meet crests and a BRIGHT fringe forms" },
      { label: "Destructive interference", value: "where path difference = (n + 1/2)(lambda), crest meets trough and a DARK fringe forms" },
      { label: "Fringe spacing", value: "the fringes are equally spaced, with spacing given by the formula below" },
    ],
    answer: "Sustained interference needs coherent sources of the same frequency; Young's experiment produces equally spaced bright and dark fringes by superposition.",
    examTip:
      "Coherent ka matlab constant PHASE DIFFERENCE hai, na ke 'ek jaisi roshni'. Do alag bulbs kabhi coherent nahi hote.",
  },
  {
    id: "p11-optinst-1",
    classLevel: "11th",
    subject: "physics",
    chapter: "Optical Instruments",
    kind: "concept",
    question:
      "Define resolving power and magnifying power, and explain why a compound microscope gives greater magnification than a simple one.",
    romanUrdu:
      "Resolving aur magnifying power ki tareef aur compound microscope ki barteri.",
    formula: "M = M_o x M_e",
    steps: [
      { label: "Magnifying power", value: "the ratio of the angle subtended by the image to the angle subtended by the object at the unaided eye" },
      { label: "Resolving power", value: "the ability of an instrument to show two closely spaced objects as separate and distinct" },
      { label: "Limit of resolution", value: "the smallest angular separation at which two points can still be distinguished; smaller means better resolution" },
      { label: "Simple microscope", value: "a single convex lens of short focal length, giving limited magnification" },
      { label: "Compound microscope", value: "uses two convex lenses, an objective of very short focal length and an eyepiece" },
      { label: "Two-stage magnification", value: "the objective forms a real, inverted, magnified image which the eyepiece then magnifies again" },
      { label: "Result", value: "total magnification is the PRODUCT of the two, so it far exceeds a single lens" },
    ],
    answer: "Magnifying power compares angular sizes; resolving power distinguishes close objects. A compound microscope multiplies two magnifications, so it greatly exceeds a simple one.",
    examTip:
      "Compound microscope mein dono magnifications ZARB hoti hain, jama nahi. M = M_objective x M_eyepiece.",
  },
  {
    id: "c11-liq-1",
    classLevel: "11th",
    subject: "chemistry",
    chapter: "Liquids and Solids",
    kind: "concept",
    question:
      "Explain hydrogen bonding and its effect on the boiling point of water, and distinguish crystalline from amorphous solids.",
    romanUrdu:
      "Hydrogen bonding ka asar aur crystalline/amorphous ka farq likhein.",
    steps: [
      { label: "Hydrogen bond", value: "an electrostatic attraction between a hydrogen atom bonded to a highly electronegative atom (F, O or N) and a lone pair on another such atom" },
      { label: "In water", value: "each molecule can form up to four hydrogen bonds through its two H atoms and two lone pairs" },
      { label: "Effect on boiling point", value: "extra energy is needed to break this extensive network, so water boils at 100 C" },
      { label: "Comparison", value: "H2S has no hydrogen bonding and boils at about -60 C despite a larger molar mass" },
      { label: "Crystalline solids", value: "particles arranged in a regular repeating three-dimensional lattice; sharp melting point; anisotropic" },
      { label: "Amorphous solids", value: "no long-range order; melt over a range of temperature; isotropic" },
      { label: "Examples", value: "crystalline: NaCl, diamond, quartz. Amorphous: glass, rubber, plastic" },
    ],
    answer: "Hydrogen bonding raises water's boiling point far above expectation; crystalline solids have ordered lattices and sharp melting points, amorphous solids do not.",
    examTip:
      "Hydrogen bond sirf F, O aur N ke sath banta hai. Cl ke sath nahi banta chahe woh electronegative ho - yeh trap aksar aata hai.",
  },
  {
    id: "c11-echem-1",
    classLevel: "11th",
    subject: "chemistry",
    chapter: "Electrochemistry",
    kind: "concept",
    question:
      "Explain the electrochemical series and use it to predict whether zinc can displace copper from copper sulphate solution.",
    romanUrdu:
      "Electrochemical series se pesheengoi karein ke zinc copper ko displace karega ya nahi.",
    formula: "E_cell = E_cathode - E_anode",
    steps: [
      { label: "Electrochemical series", value: "an arrangement of elements in order of their standard reduction potentials" },
      { label: "Interpretation", value: "a more negative reduction potential means a stronger tendency to be oxidised, i.e. a more reactive metal" },
      { label: "Standard potentials", value: "Zn2+/Zn = -0.76 V and Cu2+/Cu = +0.34 V" },
      { label: "Comparison", value: "zinc is more negative, so zinc is more reactive and is oxidised in preference to copper" },
      { label: "Prediction", value: "zinc will displace copper from copper sulphate solution" },
      { label: "Reaction", value: "Zn + CuSO4 -> ZnSO4 + Cu, with reddish-brown copper depositing and the blue colour fading" },
      { label: "Cell emf", value: "E_cell = E_cathode - E_anode = 0.34 - (-0.76) = +1.10 V, and a positive value confirms spontaneity" },
    ],
    answer: "Zinc lies above copper in the series, so the displacement occurs spontaneously with a cell emf of +1.10 V.",
    examTip:
      "E_cell MUSBAT ho to reaction khud ba khud hoti hai. Manfi aaye to nahi hoti - yeh check hamesha likhein.",
  },
  {
    id: "c11-kin-1",
    classLevel: "11th",
    subject: "chemistry",
    chapter: "Reaction Kinetics",
    kind: "concept",
    question:
      "State the factors affecting the rate of a chemical reaction and explain the role of a catalyst using activation energy.",
    romanUrdu:
      "Reaction rate ke asraat aur catalyst ka kirdar samjhayein.",
    steps: [
      { label: "Concentration", value: "increasing concentration increases the frequency of collisions, so the rate rises" },
      { label: "Temperature", value: "raising temperature increases both collision frequency and the fraction of molecules with sufficient energy; roughly the rate doubles per 10 C rise" },
      { label: "Surface area", value: "a finely divided solid exposes more surface, so reaction is faster" },
      { label: "Nature of reactants", value: "ionic reactions are generally fast; covalent bond breaking is slower" },
      { label: "Catalyst definition", value: "a substance that alters the rate of reaction without being consumed itself" },
      { label: "How it works", value: "the catalyst provides an alternative reaction pathway with a LOWER activation energy" },
      { label: "Consequence", value: "more molecules possess the reduced activation energy, so more collisions are effective and the rate increases" },
      { label: "Important limit", value: "a catalyst does NOT change the position of equilibrium or the enthalpy change; it only speeds up attainment of equilibrium" },
    ],
    answer: "Rate depends on concentration, temperature, surface area and reactant nature; a catalyst lowers activation energy without shifting the equilibrium.",
    examTip:
      "Catalyst equilibrium ki JAGAH nahi badalta, sirf woh jaldi aati hai. Yeh sab se aam ghalat fehmi hai.",
  },
  {
    id: "m11-ratio-1",
    classLevel: "11th",
    subject: "math",
    chapter: "Ratio, Proportion and Percentage",
    kind: "concept",
    question:
      "Divide Rs. 91,000 among A, B and C in the ratio 3 : 5 : 6, then express each share as a percentage of the total.",
    romanUrdu:
      "Raqam ko diye gaye ratio mein taqseem karein aur fisad nikalein.",
    steps: [
      { label: "Total ratio parts", value: "3 + 5 + 6 = 14" },
      { label: "Value of one part", value: "91,000 / 14 = Rs. 6,500" },
      { label: "A's share", value: "3 x 6,500 = Rs. 19,500" },
      { label: "B's share", value: "5 x 6,500 = Rs. 32,500" },
      { label: "C's share", value: "6 x 6,500 = Rs. 39,000" },
      { label: "Verify the total", value: "19,500 + 32,500 + 39,000 = Rs. 91,000, correct" },
      { label: "A as a percentage", value: "(19,500 / 91,000) x 100 = 21.43%" },
      { label: "B as a percentage", value: "(32,500 / 91,000) x 100 = 35.71%" },
      { label: "C as a percentage", value: "(39,000 / 91,000) x 100 = 42.86%" },
    ],
    answer: "A = Rs. 19,500 (21.43%), B = Rs. 32,500 (35.71%), C = Rs. 39,000 (42.86%).",
    examTip:
      "Hisse jama kar ke total se milayein - yeh check ghalti foran pakad leta hai. Fisad ka jama bhi 100 aana chahiye.",
  },
  {
    id: "p12-em-1",
    classLevel: "12th",
    subject: "physics",
    chapter: "Electromagnetism",
    kind: "concept",
    question:
      "State Ampere's law and explain the working principle of a transformer, including why it cannot work on D.C.",
    romanUrdu:
      "Ampere ka qanoon aur transformer ka usool bayan karein.",
    formula: "Vs / Vp = Ns / Np",
    steps: [
      { label: "Ampere's law", value: "the line integral of the magnetic field around a closed loop equals mu-zero times the current enclosed" },
      { label: "Transformer principle", value: "it works on mutual induction between two coils wound on a common soft-iron core" },
      { label: "Action", value: "alternating current in the primary produces a continuously changing magnetic flux in the core" },
      { label: "Induction", value: "this changing flux links the secondary coil and induces an alternating emf in it" },
      { label: "Turns ratio", value: "the voltage ratio equals the turns ratio, as in the formula below" },
      { label: "Step-up and step-down", value: "more secondary turns steps voltage up; fewer steps it down" },
      { label: "Why D.C. fails", value: "direct current produces a CONSTANT flux; with no rate of change of flux, no emf is induced in the secondary" },
      { label: "Energy conservation", value: "stepping voltage up reduces current proportionally, since power in equals power out for an ideal transformer" },
    ],
    answer: "A transformer relies on mutual induction from a changing flux, so it only works on A.C.; with D.C. the flux is constant and no emf is induced.",
    examTip:
      "Transformer D.C. par kaam NAHI karta - yeh sawal har saal aata hai. Wajah: flux tabdeel nahi hota to emf nahi banti.",
  },
  {
    id: "p12-spectra-1",
    classLevel: "12th",
    subject: "physics",
    chapter: "Atomic Spectra",
    kind: "concept",
    question:
      "Explain Bohr's postulates and how they account for the line spectrum of hydrogen.",
    romanUrdu:
      "Bohr ke usool aur hydrogen ke line spectrum ki tawzeeh dein.",
    formula: "hf = E_n2 - E_n1",
    steps: [
      { label: "Postulate 1", value: "electrons revolve only in certain permitted circular orbits without radiating energy" },
      { label: "Postulate 2", value: "the angular momentum of an electron is quantised in multiples of h/2pi" },
      { label: "Postulate 3", value: "energy is emitted or absorbed only when an electron jumps between orbits" },
      { label: "Photon energy", value: "the emitted photon carries energy equal to the difference between the two levels: hf = E_high - E_low" },
      { label: "Why lines, not a continuum", value: "only certain energy differences are possible, so only certain frequencies appear" },
      { label: "Lyman series", value: "transitions ending at n = 1, appearing in the ultraviolet" },
      { label: "Balmer series", value: "transitions ending at n = 2, appearing in the visible region" },
      { label: "Paschen series", value: "transitions ending at n = 3, appearing in the infrared" },
    ],
    answer: "Quantised orbits mean only discrete energy jumps are allowed, so hydrogen emits a line spectrum rather than a continuous one.",
    examTip:
      "Line spectrum ka sabab QUANTISED energy levels hain. 'Electron gir gaya' likhna kaafi nahi - energy difference ka zikr zaroori hai.",
  },
  {
    id: "c12-alip-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Aliphatic Hydrocarbons",
    kind: "concept",
    question:
      "Compare the reactivity of alkanes, alkenes and alkynes, and explain why alkanes undergo substitution while alkenes undergo addition.",
    romanUrdu:
      "Alkanes, alkenes aur alkynes ki reactivity ka moazna karein.",
    formula: "CH2=CH2 + Br2 -> CH2Br-CH2Br (decolourises bromine water)",
    steps: [
      { label: "Alkanes", value: "saturated, containing only single C-C sigma bonds, general formula CnH(2n+2)" },
      { label: "Why alkanes substitute", value: "sigma bonds are strong and there is no site of high electron density, so alkanes are unreactive and react only by free-radical substitution in UV light" },
      { label: "Alkenes", value: "unsaturated, containing a C=C double bond, formula CnH(2n)" },
      { label: "Why alkenes add", value: "the pi bond is weak and exposed, forming an electron-rich region that attracts electrophiles, giving addition reactions" },
      { label: "Alkynes", value: "unsaturated with a C triple-bond C, formula CnH(2n-2), and also undergo addition" },
      { label: "Reactivity order", value: "alkynes and alkenes are far more reactive than alkanes" },
      { label: "Test for unsaturation", value: "bromine water is decolourised by alkenes and alkynes but not by alkanes" },
    ],
    answer: "Alkanes are saturated and substitute; alkenes and alkynes have exposed pi bonds and add. Bromine water distinguishes them.",
    examTip:
      "Alkane = SUBSTITUTION, alkene/alkyne = ADDITION. Yeh ek line poora sawal hal kar deti hai.",
  },
  {
    id: "c12-arom-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Aromatic Hydrocarbons",
    kind: "concept",
    question:
      "Explain the structure of benzene and why it prefers substitution over addition despite being unsaturated.",
    romanUrdu:
      "Benzene kiساخت aur substitution ki tarjeeh ki wajah likhein.",
    steps: [
      { label: "Molecular formula", value: "C6H6, a planar hexagonal ring with all bond angles 120 degrees" },
      { label: "Hybridisation", value: "each carbon is sp2 hybridised, leaving one unhybridised p orbital" },
      { label: "Delocalisation", value: "the six p orbitals overlap sideways to form a delocalised pi electron cloud above and below the ring" },
      { label: "Equal bond lengths", value: "all six C-C bonds are identical at 139 pm, between a single (154 pm) and a double bond (134 pm)" },
      { label: "Resonance stability", value: "delocalisation lowers the energy by about 150 kJ/mol, called resonance energy" },
      { label: "Why substitution", value: "addition would destroy the delocalised system and its stability, so benzene instead undergoes electrophilic substitution which preserves the ring" },
      { label: "Typical reactions", value: "nitration, halogenation, sulphonation and Friedel-Crafts alkylation" },
    ],
    answer: "Benzene's delocalised pi system makes it unusually stable, so it undergoes electrophilic substitution rather than addition.",
    examTip:
      "Wajah hamesha RESONANCE/DELOCALISATION likhein. Sirf 'benzene stable hai' likhna adhoora jawab hai.",
  },
  {
    id: "c12-alkyl-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Alkyl Halides",
    kind: "concept",
    question:
      "Distinguish between SN1 and SN2 mechanisms of nucleophilic substitution in alkyl halides.",
    romanUrdu:
      "SN1 aur SN2 mechanism ka farq likhein.",
    steps: [
      { label: "SN1 steps", value: "two steps: the C-X bond breaks first to give a carbocation, which the nucleophile then attacks" },
      { label: "SN1 kinetics", value: "rate depends only on the substrate concentration, so it is first order: rate = k[RX]" },
      { label: "SN1 substrate", value: "favoured by tertiary halides, because tertiary carbocations are the most stable" },
      { label: "SN1 stereochemistry", value: "the planar carbocation is attacked from both faces, giving a racemic mixture" },
      { label: "SN2 steps", value: "one concerted step: the nucleophile attacks as the leaving group departs" },
      { label: "SN2 kinetics", value: "rate depends on both concentrations, so it is second order: rate = k[RX][Nu]" },
      { label: "SN2 substrate", value: "favoured by primary halides, because there is least steric hindrance to back-side attack" },
      { label: "SN2 stereochemistry", value: "back-side attack causes inversion of configuration (Walden inversion)" },
    ],
    answer: "SN1 is two-step, first order, favours tertiary halides and gives racemisation; SN2 is one-step, second order, favours primary halides and gives inversion.",
    examTip:
      "SN1 mein '1' ka matlab rate ek cheez par munhasir hai, SN2 mein do par. Tertiary = SN1, primary = SN2.",
  },
  {
    id: "c12-alc-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Alcohols, Phenols and Ethers",
    kind: "concept",
    question:
      "Explain why phenol is more acidic than ethanol, and give a chemical test to distinguish them.",
    romanUrdu:
      "Phenol ke ethanol se zyada tezabi hone ki wajah aur imtihani test likhein.",
    steps: [
      { label: "Both contain -OH", value: "yet phenol is markedly more acidic than ethanol" },
      { label: "Phenol ionisation", value: "phenol loses a proton to give the phenoxide ion" },
      { label: "Stabilisation", value: "the negative charge on phenoxide is delocalised into the benzene ring by resonance, spreading the charge" },
      { label: "Consequence", value: "the stabilised anion makes proton loss easier, so phenol is more acidic" },
      { label: "Ethanol", value: "the ethoxide ion has no resonance stabilisation, and the alkyl group is electron-donating, which intensifies the negative charge" },
      { label: "Result", value: "ethoxide is less stable, so ethanol is a much weaker acid (pKa about 16 versus phenol's 10)" },
      { label: "Distinguishing test", value: "neutral FeCl3 gives a violet colouration with phenol but no change with ethanol" },
      { label: "Second test", value: "phenol reacts with NaOH to form a salt, ethanol does not" },
    ],
    answer: "Resonance stabilisation of the phenoxide ion makes phenol far more acidic than ethanol; neutral FeCl3 gives a violet colour with phenol only.",
    examTip:
      "Wajah RESONANCE hai. Test FeCl3 hai (violet colour). Dono cheezein likhne par hi poore marks milte hain.",
  },
  {
    id: "c12-ald-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Aldehydes and Ketones",
    kind: "concept",
    question:
      "Explain why aldehydes are more reactive than ketones towards nucleophilic addition, and give two tests that distinguish them.",
    romanUrdu:
      "Aldehydes ke zyada reactive hone ki wajah aur do tests likhein.",
    steps: [
      { label: "Common feature", value: "both contain the carbonyl group C=O, which is polar with a partially positive carbon" },
      { label: "Electronic reason", value: "ketones have two electron-donating alkyl groups which reduce the positive charge on the carbonyl carbon" },
      { label: "Effect", value: "aldehydes have only one such group, so their carbonyl carbon is more electron-deficient and more open to nucleophilic attack" },
      { label: "Steric reason", value: "the two bulky alkyl groups in ketones hinder the approach of the nucleophile" },
      { label: "Conclusion", value: "aldehydes are more reactive than ketones towards nucleophilic addition" },
      { label: "Tollens' test", value: "aldehydes reduce ammoniacal silver nitrate to give a silver mirror; ketones give no reaction" },
      { label: "Fehling's test", value: "aldehydes give a brick-red precipitate of Cu2O; ketones give none" },
      { label: "Reason for the tests", value: "aldehydes are easily oxidised to carboxylic acids, whereas ketones resist oxidation" },
    ],
    answer: "Aldehydes are more reactive for both electronic and steric reasons; Tollens' (silver mirror) and Fehling's (brick-red) tests distinguish them from ketones.",
    examTip:
      "DONO wajuhat likhein - electronic aur steric. Aur tests ka nateeja (silver mirror, brick-red) zaroor likhein, sirf naam nahi.",
  },
  {
    id: "c12-carbox-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Carboxylic Acids",
    kind: "concept",
    question:
      "Explain why carboxylic acids are more acidic than alcohols and phenols, and describe the preparation of an ester.",
    romanUrdu:
      "Carboxylic acids ki tezabiyat aur ester banane ka tareeqa likhein.",
    formula: "CH3COOH + C2H5OH <-> CH3COOC2H5 + H2O (conc. H2SO4)",
    steps: [
      { label: "Ionisation", value: "a carboxylic acid loses a proton to give the carboxylate ion, RCOO-" },
      { label: "Resonance", value: "the negative charge is delocalised equally over BOTH oxygen atoms" },
      { label: "Equivalent structures", value: "the two resonance structures are identical, giving maximum stabilisation" },
      { label: "Comparison with phenol", value: "phenoxide delocalises charge onto less electronegative carbon atoms of the ring, so it is stabilised less" },
      { label: "Comparison with alcohols", value: "alkoxide has no delocalisation at all" },
      { label: "Acidity order", value: "carboxylic acid > phenol > water > alcohol" },
      { label: "Esterification", value: "a carboxylic acid heated with an alcohol and concentrated H2SO4 gives an ester and water" },
      { label: "Role of H2SO4", value: "it acts as a catalyst and a dehydrating agent, shifting the equilibrium towards the ester" },
      { label: "Ester property", value: "esters have characteristically pleasant fruity smells and are used in perfumes and flavourings" },
    ],
    answer: "Equal delocalisation over two oxygens makes carboxylic acids the strongest of these; esters are made by acid-catalysed condensation with an alcohol.",
    examTip:
      "Acidity ki tarteeb yaad rakhein: carboxylic acid > phenol > water > alcohol. Yeh comparison ka sawal har saal aata hai.",
  },
  {
    id: "c12-macro-1",
    classLevel: "12th",
    subject: "chemistry",
    chapter: "Macromolecules",
    kind: "concept",
    question:
      "Differentiate between addition and condensation polymerisation with examples, and explain the difference between thermoplastic and thermosetting polymers.",
    romanUrdu:
      "Polymerisation ki do iqsaam aur plastics ka farq likhein.",
    steps: [
      { label: "Polymer definition", value: "a very large molecule built from many repeating small units called monomers" },
      { label: "Addition polymerisation", value: "unsaturated monomers add together without losing any atoms, so no by-product forms" },
      { label: "Addition examples", value: "polythene from ethene, PVC from vinyl chloride, polystyrene from styrene" },
      { label: "Condensation polymerisation", value: "monomers with two functional groups join and eliminate a small molecule, usually water" },
      { label: "Condensation examples", value: "nylon 6,6 from a diamine and a diacid, and terylene (polyester) from a diol and a diacid" },
      { label: "Thermoplastic", value: "linear or slightly branched chains held by weak forces; soften on heating and can be remoulded repeatedly; e.g. polythene, PVC" },
      { label: "Thermosetting", value: "heavily cross-linked three-dimensional network; set permanently on first heating and char rather than soften; e.g. bakelite, melamine" },
      { label: "Key structural reason", value: "the presence or absence of cross-linking decides whether the plastic can be remelted" },
    ],
    answer: "Addition polymerisation loses nothing; condensation eliminates a small molecule. Thermoplastics are linear and remouldable, thermosets are cross-linked and permanent.",
    examTip:
      "Thermoplastic bar bar pighal sakta hai, thermosetting nahi - wajah CROSS-LINKING hai. Yeh structural wajah likhna zaroori hai.",
  },
];

export const WORKED_PROBLEMS: WorkedProblem[] = [
  ...physics9,
  ...physics10,
  ...chemistry,
  ...math,
  ...theorems,
  ...intermediate,
  ...intermediate2,
  ...accounting,
  ...gapFill,
  ...mathGapFill,
  ...conceptGapFill,
];

/**
 * Matric (9th-10th) and Intermediate (11th-12th) are separate cycles, so
 * worked solutions never cascade across them: a 12th student revises 11th
 * material, not 9th/10th.
 */
const CYCLE: Record<WorkedClass, WorkedClass[]> = {
  "9th": ["9th"],
  "10th": ["9th", "10th"],
  "11th": ["11th"],
  "12th": ["11th", "12th"],
};

/** Classes whose material a student of `classLevel` should be shown. */
export function visibleClasses(classLevel: WorkedClass): WorkedClass[] {
  return CYCLE[classLevel] ?? [classLevel];
}

/** Problems a student can use: their year plus earlier years of the same cycle. */
export function problemsFor(
  classLevel: WorkedClass,
  subject?: WorkedSubject
): WorkedProblem[] {
  const allowed = visibleClasses(classLevel);
  return WORKED_PROBLEMS.filter((p) => {
    if (subject && p.subject !== subject) return false;
    return allowed.includes(p.classLevel);
  });
}

/** Distinct chapters present for a class+subject, for the filter UI. */
export function chaptersFor(classLevel: WorkedClass, subject: WorkedSubject): string[] {
  return [...new Set(problemsFor(classLevel, subject).map((p) => p.chapter))].sort();
}

/**
 * Honest coverage message. Rather than pretending every exercise of every
 * board edition is solved, the UI states exactly how many worked solutions
 * exist for the student's selection.
 */
export function coverageNote(classLevel: WorkedClass, subject: WorkedSubject): string {
  const n = problemsFor(classLevel, subject).length;
  if (n === 0) {
    return `Is subject ke liye worked solutions abhi tayyar nahi hue. Neeche Solver se apne numbers daal kar khud step-by-step hal nikaal sakte hain.`;
  }
  return `${n} fully worked solution${n > 1 ? "s" : ""} available. Har hal board format mein hai: Given, Formula, Steps, Answer.`;
}
