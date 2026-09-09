/**
 * GLOSSARY, DEFINITIONS & SIDE NOTES
 * ------------------------------------------------------------------
 * Board-standard definitions for the four definition-heavy subjects:
 * Physics, Chemistry, Mathematics and Computer Science.
 *
 * WHY DEFINITIONS MATTER IN PAKISTANI BOARDS: short questions very often ask
 * "Define X" and are marked against the textbook wording. A loose paraphrase
 * loses marks. Each entry therefore gives the precise definition first, then a
 * Roman-Urdu gloss so the student actually understands it, and where relevant
 * the SI unit and formula - which is exactly what an examiner expects to see.
 *
 * Matching is done on chapter keywords rather than exact chapter titles,
 * because chapter names differ across PTB / FBISE / KPK / Sindh editions.
 */

export type GlossarySubject = "physics" | "chemistry" | "math" | "cs";

export interface GlossaryTerm {
  term: string;
  /** Exact, board-acceptable definition. */
  definition: string;
  /** Roman-Urdu explanation of the same idea. */
  romanUrdu: string;
  /** SI unit, where the quantity has one. */
  unit?: string;
  /** Defining formula, where one exists. */
  formula?: string;
  /** Short caution about the mistake students commonly make. */
  sideNote?: string;
}

export interface GlossaryGroup {
  subject: GlossarySubject;
  /** Lowercase keywords; a chapter matches if it contains any of them. */
  keywords: string[];
  chapterLabel: string;
  terms: GlossaryTerm[];
}

export const GLOSSARY: GlossaryGroup[] = [
  /* ============================ PHYSICS ============================ */
  {
    subject: "physics",
    chapterLabel: "Kinematics / Motion",
    keywords: ["kinematic", "motion", "rest", "velocity", "speed", "acceleration"],
    terms: [
      {
        term: "Scalar quantity",
        definition: "A physical quantity that is completely described by its magnitude only.",
        romanUrdu: "Aisi quantity jise sirf number aur unit se bayan kiya ja sake, direction ki zaroorat nahi.",
        sideNote: "Examples: mass, time, distance, speed, energy.",
      },
      {
        term: "Vector quantity",
        definition:
          "A physical quantity that requires both magnitude and direction for its complete description.",
        romanUrdu: "Aisi quantity jiske liye magnitude ke saath direction bhi batana zaroori hai.",
        sideNote: "Examples: displacement, velocity, acceleration, force, momentum.",
      },
      {
        term: "Displacement",
        definition:
          "The shortest distance between the initial and final positions of a body, in a specified direction.",
        romanUrdu: "Shuru aur aakhri point ke darmiyan seedha faasla, direction ke saath.",
        unit: "metre (m)",
        sideNote:
          "Distance aur displacement alag hain. Agar jism wapas usi jagah aa jaye to displacement zero hoga magar distance zero nahi.",
      },
      {
        term: "Speed",
        definition: "The distance covered by a body in unit time. It is a scalar quantity.",
        romanUrdu: "Ek second mein tay kiya gaya faasla.",
        unit: "metre per second (m/s)",
        formula: "v = S / t",
      },
      {
        term: "Velocity",
        definition:
          "The rate of change of displacement of a body. It is a vector quantity.",
        romanUrdu: "Displacement badalne ki raftaar, direction ke saath.",
        unit: "metre per second (m/s)",
        formula: "v = displacement / time",
      },
      {
        term: "Acceleration",
        definition: "The rate of change of velocity of a body.",
        romanUrdu: "Velocity kitni tezi se badal rahi hai.",
        unit: "metre per second squared (m/s²)",
        formula: "a = (v_f − v_i) / t",
        sideNote:
          "Agar velocity kam ho rahi ho to acceleration negative hoti hai, jise retardation ya deceleration kehte hain.",
      },
      {
        term: "Uniform velocity",
        definition:
          "A body has uniform velocity if it covers equal displacements in equal intervals of time, however small the interval.",
        romanUrdu: "Barabar waqt mein barabar displacement — na speed badle na direction.",
        sideNote: "Uniform velocity mein acceleration hamesha zero hoti hai.",
      },
    ],
  },
  {
    subject: "physics",
    chapterLabel: "Dynamics / Force",
    keywords: ["dynamic", "force", "newton", "friction", "momentum", "inertia"],
    terms: [
      {
        term: "Force",
        definition:
          "An agent that changes or tends to change the state of rest or of uniform motion of a body.",
        romanUrdu: "Woh cheez jo kisi jism ki halat-e-sukoon ya harkat ko badal de ya badalne ki koshish kare.",
        unit: "newton (N)",
        formula: "F = m a",
      },
      {
        term: "Inertia",
        definition:
          "The property of a body by virtue of which it resists any change in its state of rest or of uniform motion.",
        romanUrdu: "Jism ki woh khaasiyat jiski wajah se woh apni maujooda halat badalne ki mukhalifat karta hai.",
        sideNote: "Inertia ka inhisaar sirf mass par hai — mass jitna zyada, inertia utna zyada.",
      },
      {
        term: "Newton's first law of motion",
        definition:
          "A body at rest remains at rest, and a body in uniform motion continues its motion in a straight line with uniform velocity, unless acted upon by an unbalanced external force.",
        romanUrdu:
          "Jab tak bahar se koi force na lage, saakin jism saakin rahega aur chalta jism seedhi line mein chalta rahega.",
        sideNote: "Ise law of inertia bhi kehte hain.",
      },
      {
        term: "Newton's second law of motion",
        definition:
          "When an unbalanced force acts on a body, it produces an acceleration in the direction of the force, directly proportional to the force and inversely proportional to the mass of the body.",
        romanUrdu: "Force jitni zyada, acceleration utni zyada; mass jitna zyada, acceleration utni kam.",
        formula: "F = m a",
      },
      {
        term: "Newton's third law of motion",
        definition: "To every action there is an equal and opposite reaction.",
        romanUrdu: "Har action ka barabar aur mukhalif reaction hota hai.",
        sideNote:
          "Action aur reaction hamesha DO alag jismon par lagte hain, isi liye woh ek doosre ko cancel nahi karte. Yeh sab se aam ghalat-fehmi hai.",
      },
      {
        term: "Momentum",
        definition: "The product of the mass and the velocity of a body. It is a vector quantity.",
        romanUrdu: "Mass aur velocity ka hasil-e-zarb.",
        unit: "kilogram metre per second (kg·m/s)",
        formula: "p = m v",
      },
      {
        term: "Friction",
        definition:
          "The force that opposes the relative motion between two surfaces in contact.",
        romanUrdu: "Do satahon ke darmiyan harkat ki mukhalifat karne wali force.",
        sideNote: "Friction hamesha motion ke ulat direction mein lagti hai.",
      },
    ],
  },
  {
    subject: "physics",
    chapterLabel: "Work, Energy and Power",
    keywords: ["work", "energy", "power", "efficiency"],
    terms: [
      {
        term: "Work",
        definition:
          "Work is done when a force acting on a body displaces it in the direction of the force.",
        romanUrdu: "Kaam tabhi hota hai jab force lagne par jism us direction mein harkat kare.",
        unit: "joule (J)",
        formula: "W = F S cos θ",
        sideNote:
          "Agar force aur displacement ke darmiyan 90° ka angle ho to kaam zero hota hai, kyunke cos 90° = 0.",
      },
      {
        term: "Energy",
        definition: "The ability of a body to do work.",
        romanUrdu: "Kisi jism ki kaam karne ki salahiyat.",
        unit: "joule (J)",
      },
      {
        term: "Kinetic energy",
        definition: "The energy possessed by a body by virtue of its motion.",
        romanUrdu: "Harkat ki wajah se jism mein maujood energy.",
        unit: "joule (J)",
        formula: "K.E = ½ m v²",
      },
      {
        term: "Potential energy",
        definition: "The energy possessed by a body by virtue of its position or configuration.",
        romanUrdu: "Jism ki jagah ya halat ki wajah se jama shuda energy.",
        unit: "joule (J)",
        formula: "P.E = m g h",
      },
      {
        term: "Power",
        definition: "The rate of doing work, or the rate at which energy is transferred.",
        romanUrdu: "Kaam karne ki raftaar — ek second mein kitna kaam hua.",
        unit: "watt (W)",
        formula: "P = W / t",
      },
      {
        term: "Law of conservation of energy",
        definition:
          "Energy can neither be created nor destroyed, but it can be converted from one form into another; the total energy of a closed system remains constant.",
        romanUrdu: "Energy na banayi ja sakti hai na khatam ki ja sakti hai, sirf ek shakal se doosri mein badalti hai.",
      },
    ],
  },
  {
    subject: "physics",
    chapterLabel: "Electricity and Magnetism",
    keywords: ["electric", "current", "electrostatic", "ohm", "magnet", "circuit", "capacitor"],
    terms: [
      {
        term: "Electric current",
        definition: "The rate of flow of electric charge through a conductor.",
        romanUrdu: "Ek second mein conductor se kitna charge guzarta hai.",
        unit: "ampere (A)",
        formula: "I = Q / t",
      },
      {
        term: "Potential difference (voltage)",
        definition:
          "The amount of work done in moving a unit positive charge from one point to another in an electric field.",
        romanUrdu: "Ek coulomb charge ko ek point se doosre tak le jaane mein kitna kaam karna parta hai.",
        unit: "volt (V)",
        formula: "V = W / Q",
      },
      {
        term: "Resistance",
        definition: "The opposition offered by a conductor to the flow of electric current through it.",
        romanUrdu: "Conductor current ke behaav ki kitni mukhalifat karta hai.",
        unit: "ohm (Ω)",
        formula: "R = V / I",
      },
      {
        term: "Ohm's law",
        definition:
          "The current passing through a conductor is directly proportional to the potential difference across its ends, provided the physical state and temperature remain constant.",
        romanUrdu: "Temperature same rahe to current, voltage ke raast mutanasib hoti hai.",
        formula: "V = I R",
        sideNote:
          "\"Provided temperature remains constant\" likhna zaroori hai — is condition ke baghair definition adhoori mani jaati hai.",
      },
      {
        term: "Coulomb's law",
        definition:
          "The force of attraction or repulsion between two point charges is directly proportional to the product of their magnitudes and inversely proportional to the square of the distance between them.",
        romanUrdu: "Do charges ke darmiyan force, charges ke zarb ke raast aur faasle ke square ke ulat mutanasib hai.",
        formula: "F = k q₁ q₂ / r²,  k = 9 × 10⁹ N·m²/C²",
      },
    ],
  },

  /* =========================== CHEMISTRY =========================== */
  {
    subject: "chemistry",
    chapterLabel: "Fundamentals of Chemistry",
    keywords: ["fundamental", "mole", "atomic", "formula", "basic concept"],
    terms: [
      {
        term: "Atomic number (Z)",
        definition: "The number of protons present in the nucleus of an atom.",
        romanUrdu: "Atom ke nucleus mein maujood protons ki tadaad.",
        sideNote: "Atomic number hi element ki pehchaan hai — badal jaye to element hi badal jata hai.",
      },
      {
        term: "Mass number (A)",
        definition: "The total number of protons and neutrons present in the nucleus of an atom.",
        romanUrdu: "Nucleus mein protons aur neutrons ka total.",
        formula: "A = Z + number of neutrons",
      },
      {
        term: "Isotopes",
        definition:
          "Atoms of the same element having the same atomic number but different mass numbers.",
        romanUrdu: "Ek hi element ke aise atoms jinke protons barabar magar neutrons alag hon.",
        sideNote: "Isotopes ki chemical properties same hoti hain, sirf physical properties farq karti hain.",
      },
      {
        term: "Mole",
        definition:
          "The amount of a substance that contains 6.022 × 10²³ particles (Avogadro's number) of that substance.",
        romanUrdu: "Kisi maadde ki woh miqdaar jismein 6.022 × 10²³ particles hon.",
        unit: "mole (mol)",
        formula: "n = m / M",
      },
      {
        term: "Empirical formula",
        definition:
          "The formula that shows the simplest whole-number ratio of atoms of each element present in a compound.",
        romanUrdu: "Compound mein atoms ka sab se saada ratio.",
        sideNote: "Glucose ka molecular formula C₆H₁₂O₆ hai magar empirical formula CH₂O hai.",
      },
    ],
  },
  {
    subject: "chemistry",
    chapterLabel: "Structure of Atoms",
    keywords: ["structure of atom", "atomic structure", "electron", "orbital", "shell"],
    terms: [
      {
        term: "Orbit (shell)",
        definition:
          "A fixed circular path around the nucleus in which an electron revolves with a definite amount of energy.",
        romanUrdu: "Nucleus ke gird woh muqarrar raasta jahan electron ghoomta hai.",
      },
      {
        term: "Orbital",
        definition:
          "The region of space around the nucleus where the probability of finding an electron is maximum.",
        romanUrdu: "Nucleus ke gird woh jagah jahan electron milne ka imkaan sab se zyada hai.",
        sideNote:
          "Orbit aur orbital alag cheezein hain — orbit ek fixed circular path hai, orbital ek probability region.",
      },
      {
        term: "Valence electrons",
        definition: "The electrons present in the outermost shell of an atom.",
        romanUrdu: "Atom ke sab se bahri shell ke electrons.",
        sideNote: "Yehi electrons chemical bonding mein hissa lete hain.",
      },
    ],
  },
  {
    subject: "chemistry",
    chapterLabel: "Chemical Bonding",
    keywords: ["bond", "molecule", "structure of molecule"],
    terms: [
      {
        term: "Chemical bond",
        definition:
          "The force of attraction that holds two or more atoms together in a molecule or compound.",
        romanUrdu: "Woh kashish jo atoms ko aapas mein jodey rakhti hai.",
      },
      {
        term: "Ionic bond",
        definition:
          "The electrostatic force of attraction between oppositely charged ions, formed by the complete transfer of electrons from a metal to a non-metal.",
        romanUrdu: "Metal electron deta hai, non-metal leta hai, phir ulat charge wale ions ek doosre ko kheenchte hain.",
        sideNote: "Example: NaCl. Ionic compounds paani mein ghul kar bijli conduct karte hain.",
      },
      {
        term: "Covalent bond",
        definition: "A bond formed by the mutual sharing of electron pairs between two atoms.",
        romanUrdu: "Do atoms electron pair aapas mein share karte hain.",
        sideNote: "Example: H₂, O₂, CH₄.",
      },
      {
        term: "Electronegativity",
        definition:
          "The tendency of an atom to attract the shared pair of electrons towards itself in a covalent bond.",
        romanUrdu: "Bond mein share kiye gaye electrons ko apni taraf kheenchne ki salahiyat.",
        sideNote: "Fluorine sab se zyada electronegative element hai (4.0).",
      },
    ],
  },
  {
    subject: "chemistry",
    chapterLabel: "Acids, Bases and Salts",
    keywords: ["acid", "base", "salt", "ph"],
    terms: [
      {
        term: "Acid (Arrhenius)",
        definition: "A substance that produces hydrogen ions (H⁺) when dissolved in water.",
        romanUrdu: "Woh maadda jo paani mein ghul kar H⁺ ions deta hai.",
        sideNote: "Litmus test: acid neele litmus ko laal kar deta hai.",
      },
      {
        term: "Base (Arrhenius)",
        definition: "A substance that produces hydroxide ions (OH⁻) when dissolved in water.",
        romanUrdu: "Woh maadda jo paani mein ghul kar OH⁻ ions deta hai.",
        sideNote: "Litmus test: base laal litmus ko neela kar deta hai.",
      },
      {
        term: "pH",
        definition: "The negative logarithm of the hydrogen ion concentration of a solution.",
        romanUrdu: "Solution kitna acidic ya basic hai, uska paimana.",
        formula: "pH = −log[H⁺]",
        sideNote: "pH < 7 acidic, pH = 7 neutral, pH > 7 basic. Aur pH + pOH = 14.",
      },
      {
        term: "Neutralisation",
        definition: "The reaction between an acid and a base to form a salt and water.",
        romanUrdu: "Acid aur base mil kar namak aur paani banate hain.",
        formula: "Acid + Base → Salt + Water",
      },
    ],
  },

  /* ========================= MATHEMATICS ========================= */
  {
    subject: "math",
    chapterLabel: "Algebra and Quadratic Equations",
    keywords: ["quadratic", "algebra", "equation", "factorization", "polynomial"],
    terms: [
      {
        term: "Quadratic equation",
        definition:
          "An equation of the second degree in one variable, of the form ax² + bx + c = 0, where a ≠ 0.",
        romanUrdu: "Aisi equation jismein variable ki sab se bari power 2 ho.",
        sideNote: "Agar a = 0 ho jaye to yeh quadratic nahi rehti, linear ban jaati hai.",
      },
      {
        term: "Discriminant",
        definition:
          "The expression b² − 4ac, which determines the nature of the roots of a quadratic equation.",
        romanUrdu: "Yeh batata hai ke roots real hain, barabar hain ya imaginary.",
        formula: "D = b² − 4ac",
        sideNote:
          "D > 0 real aur alag; D = 0 real aur barabar; D < 0 imaginary. D perfect square ho to roots rational hote hain.",
      },
      {
        term: "Roots of an equation",
        definition:
          "The values of the variable which satisfy the equation, i.e. make both sides equal.",
        romanUrdu: "Woh values jo equation mein rakhne par dono taraf barabar kar dein.",
      },
    ],
  },
  {
    subject: "math",
    chapterLabel: "Geometry and Theorems",
    keywords: ["theorem", "geometry", "triangle", "circle", "chord", "tangent", "congruent"],
    terms: [
      {
        term: "Theorem",
        definition: "A statement that has been proved on the basis of previously established results.",
        romanUrdu: "Aisa bayan jo pehle sabit shuda nataij ki bunyaad par sabit kiya gaya ho.",
      },
      {
        term: "Congruent figures",
        definition: "Two figures that have exactly the same shape and the same size.",
        romanUrdu: "Do shaklein jo bilkul ek jaisi hon — shakal bhi aur size bhi.",
        sideNote: "Congruent ke liye ≅ ka nishaan istemal hota hai. Similar (~) sirf shakal same hone par hota hai.",
      },
      {
        term: "Similar figures",
        definition:
          "Two figures having the same shape but not necessarily the same size; their corresponding angles are equal and corresponding sides are proportional.",
        romanUrdu: "Shakal ek jaisi magar size alag; angles barabar aur sides mutanasib hoti hain.",
      },
      {
        term: "Chord",
        definition: "A straight line segment whose endpoints both lie on the circumference of a circle.",
        romanUrdu: "Woh line jiske dono sire circle ki circumference par hon.",
        sideNote: "Sab se lambi chord diameter hoti hai, jo markaz se guzarti hai.",
      },
      {
        term: "Tangent to a circle",
        definition: "A straight line that touches the circle at exactly one point.",
        romanUrdu: "Woh line jo circle ko sirf ek point par choo kar guzar jaye.",
        sideNote: "Tangent us point par radius ke perpendicular hota hai.",
      },
      {
        term: "Pythagoras' theorem",
        definition:
          "In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
        romanUrdu: "Right angle triangle mein hypotenuse ka square baaqi dono sides ke squares ke jama ke barabar hota hai.",
        formula: "(hyp)² = (base)² + (perp)²",
      },
    ],
  },
  {
    subject: "math",
    chapterLabel: "Trigonometry",
    keywords: ["trigonometry", "trigonometric", "angle", "radian", "sine", "cosine"],
    terms: [
      {
        term: "Radian",
        definition:
          "The angle subtended at the centre of a circle by an arc whose length is equal to the radius of the circle.",
        romanUrdu: "Woh angle jo radius ke barabar lambe arc se markaz par banta hai.",
        formula: "S = r θ,  π radians = 180°",
      },
      {
        term: "Sine of an angle",
        definition:
          "In a right-angled triangle, the ratio of the length of the side opposite the angle to the length of the hypotenuse.",
        romanUrdu: "Perpendicular taqseem hypotenuse.",
        formula: "sin θ = perpendicular / hypotenuse",
      },
      {
        term: "Cosine of an angle",
        definition:
          "In a right-angled triangle, the ratio of the length of the side adjacent to the angle to the length of the hypotenuse.",
        romanUrdu: "Base taqseem hypotenuse.",
        formula: "cos θ = base / hypotenuse",
      },
    ],
  },
  {
    subject: "math",
    chapterLabel: "Calculus",
    keywords: ["differenti", "integrat", "calculus", "derivative", "limit"],
    terms: [
      {
        term: "Derivative",
        definition:
          "The instantaneous rate of change of a function with respect to its independent variable.",
        romanUrdu: "Function kis raftaar se badal raha hai, kisi ek lamhe par.",
        formula: "dy/dx = lim(δx→0) [f(x+δx) − f(x)] / δx",
      },
      {
        term: "Integration",
        definition:
          "The inverse process of differentiation, used to find a function whose derivative is given.",
        romanUrdu: "Differentiation ka ulta amal — derivative se asal function wapas nikalna.",
        sideNote: "Indefinite integral mein constant C likhna na bhoolein; definite integral mein zaroorat nahi.",
      },
    ],
  },

  /* ====================== COMPUTER SCIENCE ====================== */
  {
    subject: "cs",
    chapterLabel: "Fundamentals of Computer",
    keywords: ["fundamental", "introduction", "computer", "hardware", "software", "component"],
    terms: [
      {
        term: "Computer",
        definition:
          "An electronic device that accepts data as input, processes it according to a set of instructions, and produces meaningful information as output.",
        romanUrdu: "Aisa electronic device jo data leta hai, hidayaat ke mutabiq process karta hai aur natija deta hai.",
      },
      {
        term: "Hardware",
        definition: "The physical, tangible components of a computer system that can be touched.",
        romanUrdu: "Computer ke woh hisse jinhe haath se chhua ja sakta hai.",
        sideNote: "Examples: CPU, keyboard, monitor, RAM, hard disk.",
      },
      {
        term: "Software",
        definition:
          "A set of programs and instructions that tell the computer hardware what to do.",
        romanUrdu: "Programs ka majmooa jo hardware ko batata hai ke kya karna hai.",
        sideNote: "Do qismein: system software (Windows) aur application software (MS Word).",
      },
      {
        term: "CPU (Central Processing Unit)",
        definition:
          "The main component of a computer that interprets and executes instructions; it consists of the ALU, the control unit and registers.",
        romanUrdu: "Computer ka dimaagh jo tamam hidayaat parhta aur amal karta hai.",
        sideNote: "ALU hisaab-kitaab karta hai, Control Unit baaqi parts ko control karta hai.",
      },
      {
        term: "RAM (Random Access Memory)",
        definition:
          "The volatile primary memory that temporarily stores data and programs currently in use; its contents are lost when power is switched off.",
        romanUrdu: "Aarzi memory — bijli band hote hi sab kuch mit jaata hai.",
        sideNote: "RAM volatile hai, ROM non-volatile. Yeh farq exam mein aksar poocha jaata hai.",
      },
    ],
  },
  {
    subject: "cs",
    chapterLabel: "Data and Number Systems",
    keywords: ["data", "number system", "binary", "storage", "memory", "bit", "byte"],
    terms: [
      {
        term: "Data",
        definition: "Raw, unprocessed facts and figures that have no meaning on their own.",
        romanUrdu: "Ghair-processed haqaiq jinka akela koi matlab nahi.",
      },
      {
        term: "Information",
        definition: "Processed data that is meaningful and useful for decision making.",
        romanUrdu: "Process shuda data jo baamani aur kaam ka ho.",
        sideNote: "Data + processing = information. Yeh farq definition question mein zaroor likhein.",
      },
      {
        term: "Bit",
        definition:
          "The smallest unit of data in a computer, which can have only one of two values: 0 or 1.",
        romanUrdu: "Data ka sab se chhota hissa — sirf 0 ya 1.",
        sideNote: "8 bits = 1 byte. 1 KB = 1024 bytes (na ke 1000).",
      },
      {
        term: "Binary number system",
        definition:
          "A number system with base 2 that uses only the digits 0 and 1 to represent all values.",
        romanUrdu: "Base 2 wala system jismein sirf 0 aur 1 istemal hote hain.",
        sideNote: "Computer sirf binary samajhta hai kyunke circuits ke do hi states hain: on aur off.",
      },
    ],
  },
  {
    subject: "cs",
    chapterLabel: "Programming and Algorithms",
    keywords: ["program", "algorithm", "flowchart", "language", "loop", "variable", "function"],
    terms: [
      {
        term: "Algorithm",
        definition:
          "A finite, step-by-step sequence of well-defined instructions for solving a particular problem.",
        romanUrdu: "Kisi masle ko hal karne ke liye tarteebwar aur mehdood steps.",
        sideNote: "Algorithm hamesha finite hona chahiye — yani kisi na kisi point par khatam ho.",
      },
      {
        term: "Flowchart",
        definition:
          "A diagrammatic representation of an algorithm using standard symbols connected by arrows.",
        romanUrdu: "Algorithm ki tasveeri shakal, muqarrar symbols ke zariye.",
        sideNote: "Oval = start/stop, parallelogram = input/output, rectangle = process, diamond = decision.",
      },
      {
        term: "Variable",
        definition:
          "A named memory location whose value can change during the execution of a program.",
        romanUrdu: "Memory ki aisi jagah jiska naam ho aur jiski value program chalte waqt badal sakti ho.",
      },
      {
        term: "Constant",
        definition:
          "A named memory location whose value remains fixed throughout the execution of a program.",
        romanUrdu: "Aisi value jo program ke dauran kabhi nahi badalti.",
      },
      {
        term: "Loop",
        definition:
          "A control structure that repeats a block of statements while a given condition remains true.",
        romanUrdu: "Aisa structure jo statements ko baar baar chalata hai jab tak shart sachi ho.",
        sideNote:
          "Agar condition kabhi false na ho to infinite loop ban jaata hai aur program hang ho jaata hai.",
      },
      {
        term: "Syntax error",
        definition:
          "An error that occurs when the rules of the programming language are violated; the program will not compile.",
        romanUrdu: "Programming language ke qawaid torne par aane wali ghalti — program compile hi nahi hota.",
        sideNote:
          "Syntax error compile hone se rok deta hai; logical error mein program chalta hai magar ghalat jawab deta hai.",
      },
    ],
  },
];

const CS_ALIASES = ["cs", "computer", "computerscience", "ics", "it"];

/** Normalise the app's subject id into a glossary subject key. */
export function toGlossarySubject(subjectId: string): GlossarySubject | null {
  const s = subjectId.toLowerCase().replace(/[^a-z]/g, "");
  if (s.includes("physic")) return "physics";
  if (s.includes("chem")) return "chemistry";
  if (s.includes("math")) return "math";
  if (CS_ALIASES.some((a) => s === a || s.includes("computer"))) return "cs";
  return null;
}

/**
 * Terms relevant to a chapter. Matching is keyword-based so it survives the
 * different chapter titles used by different boards; if nothing matches we
 * return every term for the subject rather than an empty panel, because a
 * glossary is useful even when the chapter mapping is imperfect.
 */
export function glossaryForChapter(
  subjectId: string,
  chapterName: string
): { matched: boolean; groups: GlossaryGroup[] } {
  const subject = toGlossarySubject(subjectId);
  if (!subject) return { matched: false, groups: [] };

  const all = GLOSSARY.filter((g) => g.subject === subject);
  const hay = chapterName.toLowerCase();
  const hits = all.filter((g) => g.keywords.some((k) => hay.includes(k)));

  return hits.length ? { matched: true, groups: hits } : { matched: false, groups: all };
}

export const GLOSSARY_TERM_COUNT = GLOSSARY.reduce((n, g) => n + g.terms.length, 0);
