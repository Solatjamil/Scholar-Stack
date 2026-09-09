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

export const WORKED_PROBLEMS: WorkedProblem[] = [
  ...physics9,
  ...physics10,
  ...chemistry,
  ...math,
  ...theorems,
  ...intermediate,
  ...intermediate2,
  ...accounting,
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
