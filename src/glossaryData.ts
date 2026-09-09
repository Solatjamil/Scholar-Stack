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

export type GlossarySubject =
  | "physics"
  | "chemistry"
  | "math"
  | "cs"
  | "biology"
  // I.Com / commerce stream
  | "accounting"
  | "commerce"
  | "economics"
  | "banking";

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

  /* ---------- PHYSICS: vectors & equilibrium (11th) ---------- */
  {
    subject: "physics",
    keywords: ["vector", "equilibrium", "scalar", "resultant"],
    chapterLabel: "Vectors and Equilibrium",
    terms: [
      {
        term: "Resultant vector",
        definition: "A single vector that produces the same effect as the combined effect of all the vectors acting together.",
        romanUrdu: "Aik aisa vector jo tamam vectors ke mile jule asar ke barabar asar paida kare.",
        formula: "F = √(F₁² + F₂² + 2F₁F₂ cos θ)",
      },
      {
        term: "Torque (moment of force)",
        definition: "The turning effect of a force about a pivot, equal to the product of the force and the moment arm.",
        romanUrdu: "Kisi force ka ghumane wala asar. Force aur moment arm ka hasil-e-zarb.",
        unit: "N m",
        formula: "τ = F × L",
      },
      {
        term: "Equilibrium",
        definition: "The state of a body in which there is no net force and no net torque acting on it, so it has neither linear nor angular acceleration.",
        romanUrdu: "Jism ki woh haalat jismein na koi net force ho na net torque.",
        sideNote: "Do shartein hain: ΣF = 0 (first condition) aur Στ = 0 (second condition). Dono likhna zaroori hai.",
      },
    ],
  },
  /* ---------- PHYSICS: thermodynamics (11th) ---------- */
  {
    subject: "physics",
    keywords: ["thermodynamic", "heat", "thermal", "temperature", "entropy", "engine"],
    chapterLabel: "Heat and Thermodynamics",
    terms: [
      {
        term: "Internal energy",
        definition: "The sum of all the kinetic and potential energies of the molecules of a system.",
        romanUrdu: "System ke tamam molecules ki kinetic aur potential energy ka majmua.",
        unit: "J",
      },
      {
        term: "First law of thermodynamics",
        definition: "The heat supplied to a system is equal to the increase in its internal energy plus the work done by the system on its surroundings.",
        romanUrdu: "System ko di gayi heat, uski internal energy ke izafay aur kiye gaye work ke barabar hoti hai.",
        formula: "ΔQ = ΔU + ΔW",
        sideNote: "Yeh law of conservation of energy ka hi roop hai.",
      },
      {
        term: "Isothermal process",
        definition: "A process carried out at constant temperature, so that the internal energy of an ideal gas remains unchanged.",
        romanUrdu: "Woh amal jo constant temperature par hota hai, is liye ΔU = 0 hota hai.",
        sideNote: "Isothermal mein ΔU = 0, adiabatic mein ΔQ = 0. Inko aapas mein na milayein.",
      },
      {
        term: "Adiabatic process",
        definition: "A process in which no heat enters or leaves the system.",
        romanUrdu: "Woh amal jismein na heat andar aati hai na bahar jati hai.",
        formula: "ΔQ = 0, so ΔU = −ΔW",
      },
      {
        term: "Efficiency of a heat engine",
        definition: "The ratio of the net work done by the engine to the total heat absorbed from the source, usually expressed as a percentage.",
        romanUrdu: "Engine ke kiye gaye work aur li gayi total heat ka nisbat.",
        formula: "η = (W / Q₁) × 100 %",
        sideNote: "Efficiency kabhi 100 % nahi ho sakti — yeh second law kehta hai.",
      },
    ],
  },
  /* ---------- PHYSICS: waves & oscillation ---------- */
  {
    subject: "physics",
    keywords: ["wave", "oscillat", "harmonic", "sound", "vibrat", "resonance"],
    chapterLabel: "Oscillations and Waves",
    terms: [
      {
        term: "Simple harmonic motion (SHM)",
        definition: "A vibratory motion in which the acceleration of the body is directly proportional to its displacement from the mean position and is always directed towards that mean position.",
        romanUrdu: "Woh jhoolne wali harkat jismein acceleration displacement ke mutanasib ho aur hamesha mean position ki taraf ho.",
        formula: "a = −ω² x",
        sideNote: "Minus sign zaroori hai — woh batata hai ke acceleration displacement ke ulat rukh mein hai.",
      },
      {
        term: "Time period",
        definition: "The time taken by a vibrating body to complete one full vibration.",
        romanUrdu: "Aik mukammal vibration mein laga hua waqt.",
        unit: "s",
        formula: "T = 1 / f",
      },
      {
        term: "Frequency",
        definition: "The number of complete vibrations performed by a body in one second.",
        romanUrdu: "Aik second mein poori hone wali vibrations ki tadaad.",
        unit: "Hz",
      },
      {
        term: "Wavelength",
        definition: "The distance between two consecutive crests or two consecutive troughs of a wave.",
        romanUrdu: "Do mutawatir crests ya troughs ke darmiyan ka faasla.",
        unit: "m",
        formula: "v = f λ",
      },
      {
        term: "Resonance",
        definition: "The setting up of vibrations of large amplitude in a body when the frequency of the applied force matches the natural frequency of the body.",
        romanUrdu: "Jab lagayi gayi force ki frequency jism ki natural frequency ke barabar ho jaye to bari amplitude ki vibrations paida hoti hain.",
      },
    ],
  },
  /* ---------- CHEMISTRY: gases & states of matter ---------- */
  {
    subject: "chemistry",
    keywords: ["gas", "liquid", "solid", "state of matter", "states of matter"],
    chapterLabel: "States of Matter",
    terms: [
      {
        term: "Boyle's law",
        definition: "At constant temperature, the volume of a given mass of a gas is inversely proportional to the pressure applied on it.",
        romanUrdu: "Constant temperature par gas ka volume pressure ke ulta mutanasib hota hai.",
        formula: "P₁V₁ = P₂V₂",
      },
      {
        term: "Charles's law",
        definition: "At constant pressure, the volume of a given mass of a gas is directly proportional to its absolute temperature.",
        romanUrdu: "Constant pressure par gas ka volume absolute temperature ke seedha mutanasib hota hai.",
        formula: "V₁/T₁ = V₂/T₂",
        sideNote: "Temperature hamesha Kelvin mein daalein, Celsius mein nahi. K = °C + 273.",
      },
      {
        term: "Ideal gas equation",
        definition: "The equation of state that combines Boyle's, Charles's and Avogadro's laws for an ideal gas.",
        romanUrdu: "Teenon gas laws ko mila kar banne wali equation.",
        formula: "PV = nRT,  R = 0.0821 dm³ atm mol⁻¹ K⁻¹",
      },
      {
        term: "Diffusion",
        definition: "The spontaneous spreading and mixing of the molecules of one substance through another due to their random motion.",
        romanUrdu: "Molecules ka khud ba khud phail kar aapas mein mil jana.",
      },
      {
        term: "Evaporation",
        definition: "The spontaneous change of a liquid into vapour at any temperature below its boiling point, occurring only at the surface.",
        romanUrdu: "Boiling point se neeche bhi liquid ka sirf sattah se vapour ban jana.",
        sideNote: "Evaporation sirf surface par hota hai, boiling poore liquid mein.",
      },
    ],
  },
  /* ---------- CHEMISTRY: thermochemistry & kinetics ---------- */
  {
    subject: "chemistry",
    keywords: ["thermochem", "kinetic", "rate", "enthalpy", "energetic", "equilibrium"],
    chapterLabel: "Thermochemistry, Equilibrium and Kinetics",
    terms: [
      {
        term: "Exothermic reaction",
        definition: "A reaction in which heat is released to the surroundings, so the enthalpy change is negative.",
        romanUrdu: "Woh reaction jismein heat bahar nikalti hai, ΔH manfi hota hai.",
        formula: "ΔH < 0",
      },
      {
        term: "Endothermic reaction",
        definition: "A reaction in which heat is absorbed from the surroundings, so the enthalpy change is positive.",
        romanUrdu: "Woh reaction jo heat jazb karti hai, ΔH musbat hota hai.",
        formula: "ΔH > 0",
      },
      {
        term: "Enthalpy of a reaction",
        definition: "The amount of heat absorbed or evolved when the reaction occurs at constant pressure.",
        romanUrdu: "Constant pressure par reaction mein li gayi ya nikli hui heat ki miqdar.",
        unit: "kJ mol⁻¹",
      },
      {
        term: "Hess's law",
        definition: "The total enthalpy change of a reaction is the same whether it takes place in one step or in several steps.",
        romanUrdu: "Reaction aik qadam mein ho ya kai qadmon mein, total enthalpy change wahi rehta hai.",
      },
      {
        term: "Rate of reaction",
        definition: "The change in the concentration of a reactant or a product per unit time.",
        romanUrdu: "Aik waqt ke andar reactant ya product ki concentration mein tabdeeli.",
        unit: "mol dm⁻³ s⁻¹",
      },
      {
        term: "Le Chatelier's principle",
        definition: "If a stress is applied to a system at equilibrium, the system shifts in the direction that relieves that stress.",
        romanUrdu: "Equilibrium par dabao daalein to system us rukh mein shift hota hai jo dabao kam kare.",
        sideNote: "Pressure, temperature aur concentration — teenon ka asar alag alag likhna chahiye.",
      },
      {
        term: "Catalyst",
        definition: "A substance that alters the rate of a chemical reaction without itself being consumed in the reaction.",
        romanUrdu: "Woh cheez jo reaction ki raftaar badle magar khud khatam na ho.",
        sideNote: "Catalyst equilibrium ki position nahi badalta, sirf usay jaldi haasil karwata hai.",
      },
    ],
  },
  /* ---------- CHEMISTRY: organic ---------- */
  {
    subject: "chemistry",
    keywords: ["organic", "hydrocarbon", "alkyl", "alcohol", "aldehyde", "carboxylic", "aromatic", "macromolecule"],
    chapterLabel: "Organic Chemistry",
    terms: [
      {
        term: "Organic chemistry",
        definition: "The branch of chemistry that deals with the study of hydrocarbons and their derivatives.",
        romanUrdu: "Chemistry ki woh shakh jo hydrocarbons aur unke derivatives ka mutala karti hai.",
      },
      {
        term: "Functional group",
        definition: "An atom or a group of atoms that determines the characteristic chemical properties of an organic compound.",
        romanUrdu: "Woh atom ya atoms ka group jo compound ki khaas chemical khasoosiyat tay karta hai.",
        sideNote: "−OH alcohol, −CHO aldehyde, −COOH carboxylic acid. Yeh yaad karna lazmi hai.",
      },
      {
        term: "Homologous series",
        definition: "A series of organic compounds having the same functional group and the same general formula, in which each successive member differs by a −CH₂− unit.",
        romanUrdu: "Aisay compounds ka silsila jinka functional group aik ho aur har agla member −CH₂− se barhta ho.",
      },
      {
        term: "Isomerism",
        definition: "The phenomenon in which two or more compounds have the same molecular formula but different structural formulae and different properties.",
        romanUrdu: "Jab do compounds ka molecular formula aik ho magar structure alag ho.",
      },
      {
        term: "Saturated hydrocarbon",
        definition: "A hydrocarbon in which all the carbon-to-carbon bonds are single covalent bonds.",
        romanUrdu: "Woh hydrocarbon jismein carbon ke darmiyan sirf single bonds hon, jaise alkanes.",
      },
    ],
  },
  /* ---------- MATHS: sequences, series, binomial, probability ---------- */
  {
    subject: "math",
    keywords: ["sequence", "series", "progression", "binomial", "induction", "permutation", "combination", "probability"],
    chapterLabel: "Sequences, Series and Counting",
    terms: [
      {
        term: "Arithmetic progression (AP)",
        definition: "A sequence in which each term after the first is obtained by adding a fixed number, called the common difference, to the preceding term.",
        romanUrdu: "Woh sequence jismein har term pichhle term mein aik muqarrara adad jama kar ke banti hai.",
        formula: "aₙ = a + (n − 1)d,  Sₙ = n/2 [2a + (n − 1)d]",
      },
      {
        term: "Geometric progression (GP)",
        definition: "A sequence in which each term after the first is obtained by multiplying the preceding term by a fixed non-zero number called the common ratio.",
        romanUrdu: "Woh sequence jismein har term pichhli term ko aik muqarrara adad se zarb de kar banti hai.",
        formula: "aₙ = a rⁿ⁻¹,  Sₙ = a(1 − rⁿ)/(1 − r)",
      },
      {
        term: "Binomial theorem",
        definition: "A formula that gives the expansion of any power of a binomial expression as a sum of terms involving binomial coefficients.",
        romanUrdu: "Woh formula jo (a + b)ⁿ ka expansion deta hai.",
        formula: "T₍ᵣ₊₁₎ = C(n, r) aⁿ⁻ʳ bʳ",
        sideNote: "r-wein term ke liye r = (term number − 1) lagta hai.",
      },
      {
        term: "Permutation",
        definition: "An arrangement of a number of objects in a definite order.",
        romanUrdu: "Cheezon ko aik muqarrara tarteeb mein rakhna — yahan order maayne rakhta hai.",
        formula: "ⁿPᵣ = n! / (n − r)!",
      },
      {
        term: "Combination",
        definition: "A selection of objects without regard to the order in which they are selected.",
        romanUrdu: "Cheezon ka intekhab jismein tarteeb ki koi ahmiyat nahi hoti.",
        formula: "ⁿCᵣ = n! / [r! (n − r)!]",
        sideNote: "Order zaroori ho to permutation, warna combination. Yeh farq pehchanna sab se ahem hai.",
      },
      {
        term: "Probability",
        definition: "The ratio of the number of favourable outcomes to the total number of equally likely possible outcomes.",
        romanUrdu: "Matlooba nateejon ki tadaad taqseem kul mumkina nateejon ki tadaad.",
        formula: "P(E) = n(E) / n(S),  0 ≤ P(E) ≤ 1",
      },
    ],
  },
  /* ---------- MATHS: matrices, sets & functions ---------- */
  {
    subject: "math",
    keywords: ["matrix", "matrices", "determinant", "set", "function", "group", "number system", "partial fraction"],
    chapterLabel: "Sets, Functions and Matrices",
    terms: [
      {
        term: "Matrix",
        definition: "A rectangular array of numbers arranged in rows and columns and enclosed by brackets.",
        romanUrdu: "Adad ka aik mustateel jadwal jo rows aur columns mein bracket ke andar likha jata hai.",
      },
      {
        term: "Determinant",
        definition: "A single number associated with every square matrix, obtained from its elements by a fixed rule.",
        romanUrdu: "Har square matrix se hasil hone wala aik adad.",
        formula: "For [[a, b], [c, d]],  det = ad − bc",
      },
      {
        term: "Singular matrix",
        definition: "A square matrix whose determinant is equal to zero, and which therefore has no inverse.",
        romanUrdu: "Woh square matrix jiska determinant sifar ho — iska inverse mumkin nahi.",
        sideNote: "Inverse nikalne se pehle hamesha determinant check karein.",
      },
      {
        term: "Function",
        definition: "A relation in which every element of the first set is paired with exactly one element of the second set.",
        romanUrdu: "Aisa taluq jismein pehle set ka har element doosre set ke sirf aik element se juda ho.",
      },
      {
        term: "Domain and range",
        definition: "The domain is the set of all first elements of a relation, and the range is the set of all second elements.",
        romanUrdu: "Domain pehle elements ka set hai aur range doosre elements ka.",
      },
    ],
  },
  /* ---------- CS: databases & SQL (12th) ---------- */
  {
    subject: "cs",
    keywords: ["database", "dbms", "sql", "query", "normalis", "normaliz", "integrity", "access", "table"],
    chapterLabel: "Databases and SQL",
    terms: [
      {
        term: "Database",
        definition: "An organised collection of logically related data stored in such a way that it can be easily accessed, managed and updated.",
        romanUrdu: "Aapas mein jure hue data ka manzam majmua jise aasani se dhoonda aur badla ja sake.",
      },
      {
        term: "DBMS",
        definition: "Database Management System: software that allows users to create, store, retrieve and manage the data in a database.",
        romanUrdu: "Woh software jo database banane, mehfooz karne aur istemal karne mein madad karta hai — jaise MS Access, Oracle.",
      },
      {
        term: "Primary key",
        definition: "A field, or a combination of fields, that uniquely identifies each record in a table and cannot contain a null value.",
        romanUrdu: "Woh field jo table ke har record ko yakta tor par pehchanti hai aur khali nahi ho sakti.",
        sideNote: "Primary key kabhi duplicate ya null nahi ho sakti — yeh do shartein exam mein poochhi jati hain.",
      },
      {
        term: "Foreign key",
        definition: "A field in one table that refers to the primary key of another table, and is used to establish a link between the two tables.",
        romanUrdu: "Aik table ki woh field jo doosre table ki primary key se juri hoti hai.",
      },
      {
        term: "Normalisation",
        definition: "The process of organising the data in a database into tables in order to remove redundancy and avoid update anomalies.",
        romanUrdu: "Data ko is tarah tables mein tarteeb dena ke takrar khatam ho jaye.",
      },
      {
        term: "SQL",
        definition: "Structured Query Language: the standard language used to create, retrieve, update and delete data in a relational database.",
        romanUrdu: "Woh standard zabaan jis se database mein data banaya, dhoonda aur badla jata hai.",
        formula: "SELECT column FROM table WHERE condition;",
      },
      {
        term: "Data redundancy",
        definition: "The unnecessary repetition of the same data at more than one place in a database.",
        romanUrdu: "Aik hi data ka database mein kai jagah ghair zaroori tor par dohraya jana.",
      },
    ],
  },
  /* ---------- CS: C programming (12th) ---------- */
  {
    subject: "cs",
    keywords: ["c language", "input", "output", "decision", "control structure", "loop", "iteration", "array", "function"],
    chapterLabel: "Programming in C",
    terms: [
      {
        term: "Compiler",
        definition: "A program that translates the whole source code written in a high level language into machine code in one go, before execution.",
        romanUrdu: "Woh program jo poore source code ko aik saath machine code mein tarjuma karta hai.",
        sideNote: "Compiler poora program aik dafa mein, interpreter aik aik line kar ke tarjuma karta hai.",
      },
      {
        term: "Array",
        definition: "A collection of a fixed number of elements of the same data type stored in consecutive memory locations under one name.",
        romanUrdu: "Aik hi qism ke elements ka majmua jo aik naam ke tehat mutasil memory mein rakha jata hai.",
        sideNote: "Array ka pehla index hamesha 0 hota hai, 1 nahi.",
      },
      {
        term: "Function",
        definition: "A self contained block of statements that performs a specific task and can be called from anywhere in the program.",
        romanUrdu: "Statements ka aik alag block jo koi khaas kaam karta hai aur baar baar bulaya ja sakta hai.",
      },
    ],
  },

  /* ============================ BIOLOGY ============================ */
  {
    subject: "biology",
    chapterLabel: "Introduction to Biology & Biological Method",
    keywords: ["introduction to biology", "biological problem", "biological method", "branches of biology"],
    terms: [
      {
        term: "Biology",
        definition:
          "The branch of science that deals with the study of living organisms, their structure, function, origin, evolution and distribution.",
        romanUrdu: "Wo science ki shakh jisme zinda ajsaam ki banawat, kaam, aghaaz aur irtiqa ka mutala kiya jata hai.",
      },
      {
        term: "Hypothesis",
        definition:
          "A tentative, testable explanation proposed for an observation, which may or may not be true.",
        romanUrdu: "Kisi mushahide ki aisi ibtidai wazahat jise test kiya ja sake.",
        sideNote:
          "A hypothesis must be testable and falsifiable; a guess that cannot be tested is not a hypothesis.",
      },
      {
        term: "Deductive reasoning",
        definition:
          "Reasoning that proceeds from a general principle to a specific prediction (if-then logic).",
        romanUrdu: "Aam usool se khaas nateeje tak pohanchna.",
      },
      {
        term: "Inductive reasoning",
        definition:
          "Reasoning that proceeds from specific observations to a general conclusion.",
        romanUrdu: "Khaas mushahidaat se aam usool banana.",
      },
      {
        term: "Theory",
        definition:
          "A hypothesis that has been repeatedly tested and supported by a large body of evidence.",
        romanUrdu: "Aisa hypothesis jo baar baar test hone ke baad tasdeeq shuda ho.",
        sideNote:
          "In everyday speech 'theory' means a guess, but in science it means a well-supported explanation. Do not confuse the two in an exam.",
      },
      {
        term: "Law / Principle",
        definition:
          "A uniform or constant fact of nature that has no known exception.",
        romanUrdu: "Qudrat ka aisa usool jiska koi istisna maloom nahi.",
      },
      {
        term: "Bioeconomics",
        definition:
          "The study of organisms from a business point of view, i.e. their cost-benefit relationship.",
        romanUrdu: "Zinda ajsaam ka maashi (cost-benefit) nuqta-e-nazar se mutala.",
      },
    ],
  },
  {
    subject: "biology",
    chapterLabel: "Biodiversity & Classification",
    keywords: ["biodiversity", "variety of life", "classification", "taxonomy", "kingdom prokaryotae", "protista", "fungi", "kingdom plantae", "kingdom animalia"],
    terms: [
      {
        term: "Biodiversity",
        definition:
          "The variety and variability among living organisms and the ecosystems in which they occur.",
        romanUrdu: "Zameen par mojood zinda ajsaam ki tanawwo aur mukhtalif qism.",
      },
      {
        term: "Taxonomy",
        definition:
          "The branch of biology that deals with the identification, naming and classification of organisms.",
        romanUrdu: "Ajsaam ki shanakht, naam rakhne aur darjabandi ka ilm.",
      },
      {
        term: "Species",
        definition:
          "A group of organisms which can interbreed freely among themselves and produce fertile offspring.",
        romanUrdu: "Aise ajsaam ka group jo aapas mein afzaish-e-nasl kar ke zarkhez bache paida kar sakein.",
        sideNote:
          "'Fertile offspring' is the key phrase. A mule is produced by two species but is sterile, so horse and donkey are separate species.",
      },
      {
        term: "Binomial nomenclature",
        definition:
          "The system of naming an organism by two names: the genus name followed by the species name.",
        romanUrdu: "Har jandaar ko do naam dene ka tareeqa: genus aur species.",
        sideNote:
          "Genus starts with a capital letter, species with small, and both are italicised or underlined - e.g. Homo sapiens.",
      },
      {
        term: "Prokaryote",
        definition:
          "An organism whose cell lacks a true, membrane-bound nucleus and membrane-bound organelles.",
        romanUrdu: "Aisa jandaar jiske cell mein haqeeqi nucleus nahi hota.",
        sideNote:
          "Bacteria and cyanobacteria are prokaryotes.",
      },
      {
        term: "Eukaryote",
        definition:
          "An organism whose cells possess a true, membrane-bound nucleus and membrane-bound organelles.",
        romanUrdu: "Aisa jandaar jiske cell mein jhilli wala haqeeqi nucleus hota hai.",
      },
      {
        term: "Virus",
        definition:
          "An acellular, obligate intracellular parasite consisting of a nucleic acid core surrounded by a protein coat.",
        romanUrdu: "Ghair-khalvi zarra jo sirf mezban cell ke andar afzaish karta hai.",
        sideNote:
          "Viruses are not placed in any of the five kingdoms because they are not cellular.",
      },
    ],
  },
  {
    subject: "biology",
    chapterLabel: "The Cell, Tissues & Cell Cycle",
    keywords: ["cell", "tissue", "cell cycle", "chromosome", "dna"],
    terms: [
      {
        term: "Cell",
        definition:
          "The structural and functional unit of life, capable of independent existence in unicellular organisms.",
        romanUrdu: "Zindagi ki banyadi banawati aur amali ikai.",
      },
      {
        term: "Cell theory",
        definition:
          "All living organisms are composed of cells, the cell is the basic unit of life, and all cells arise from pre-existing cells.",
        romanUrdu: "Tamam zinda ajsaam cells se bane hain aur har cell pehle se mojood cell se banta hai.",
      },
      {
        term: "Mitosis",
        definition:
          "A type of cell division in which a parent cell divides to produce two genetically identical daughter cells with the same chromosome number.",
        romanUrdu: "Aisi taqseem jisme ek cell se do bilkul yaksan cells bante hain.",
        sideNote:
          "Mitosis keeps the chromosome number the same (2n to 2n). It is used for growth and repair.",
      },
      {
        term: "Meiosis",
        definition:
          "A type of cell division in which the chromosome number is halved, producing four genetically different haploid daughter cells.",
        romanUrdu: "Aisi taqseem jisme chromosome ki tadaad aadhi ho jati hai aur chaar mukhtalif cells bante hain.",
        sideNote:
          "Meiosis (2n to n) makes gametes and creates variation through crossing over.",
      },
      {
        term: "Apoptosis",
        definition:
          "Programmed cell death, a normal and controlled process by which a cell kills itself.",
        romanUrdu: "Cell ki mansooba bandi ke tehat qudrati maut.",
        sideNote:
          "Apoptosis is normal and useful; necrosis is accidental, injury-caused death. Examiners often contrast these two.",
      },
      {
        term: "Chromosome",
        definition:
          "A thread-like structure of DNA and protein in the nucleus that carries the hereditary information.",
        romanUrdu: "Nucleus mein DNA aur protein ka dhaga numa dhancha jo warasti maloomat rakhta hai.",
      },
      {
        term: "Gene",
        definition:
          "The unit of heredity; a segment of DNA that codes for a particular polypeptide or functional RNA.",
        romanUrdu: "DNA ka wo hissa jo kisi khaas protein ki tayari ka code rakhta hai.",
      },
    ],
  },
  {
    subject: "biology",
    chapterLabel: "Enzymes & Biological Molecules",
    keywords: ["enzyme", "biological molecule", "biomolecule"],
    terms: [
      {
        term: "Enzyme",
        definition:
          "A biological catalyst, protein in nature, that speeds up a biochemical reaction without being consumed in it.",
        romanUrdu: "Protein qism ka catalyst jo reaction tez karta hai magar khud khatam nahi hota.",
      },
      {
        term: "Active site",
        definition:
          "The specific region of an enzyme to which the substrate binds and where the reaction occurs.",
        romanUrdu: "Enzyme ka wo khaas hissa jahan substrate judta hai.",
      },
      {
        term: "Lock and key model",
        definition:
          "A model in which the substrate fits exactly into the rigid active site of the enzyme, as a key fits a lock.",
        romanUrdu: "Substrate enzyme ke active site mein bilkul waise fit hota hai jaise chaabi taale mein.",
      },
      {
        term: "Induced fit model",
        definition:
          "A model in which the active site changes shape slightly to fit the substrate more closely once binding begins.",
        romanUrdu: "Substrate ke aane par active site apni shakal thodi tabdeel kar leta hai.",
      },
      {
        term: "Denaturation",
        definition:
          "The loss of the specific three-dimensional shape of an enzyme or protein, destroying its activity.",
        romanUrdu: "Enzyme ki khaas shakal bigad jana jis se wo kaam karna chhod deta hai.",
        sideNote:
          "High temperature and extreme pH denature enzymes. Denaturation is usually irreversible.",
      },
      {
        term: "Carbohydrate",
        definition:
          "An organic compound of carbon, hydrogen and oxygen with hydrogen and oxygen in a 2:1 ratio, serving mainly as an energy source.",
        romanUrdu: "Carbon, hydrogen aur oxygen par mushtamil compound jo tawanai ka bara zariya hai.",
        formula: "(CH2O)n",
      },
    ],
  },
  {
    subject: "biology",
    chapterLabel: "Bioenergetics, Nutrition & Gaseous Exchange",
    keywords: ["bioenergetic", "photosynthesis", "respiration", "nutrition", "gaseous exchange"],
    terms: [
      {
        term: "Bioenergetics",
        definition:
          "The study of energy relationships and energy transformations that occur in living organisms.",
        romanUrdu: "Zinda ajsaam mein tawanai ki tabdeeliyon ka mutala.",
      },
      {
        term: "Photosynthesis",
        definition:
          "The process by which green plants synthesise glucose from carbon dioxide and water using light energy trapped by chlorophyll.",
        romanUrdu: "Wo amal jisme sabz paude roshni ki madad se CO2 aur pani se glucose banate hain.",
        formula: "6CO2 + 6H2O --(light, chlorophyll)--> C6H12O6 + 6O2",
        sideNote:
          "Write the balanced equation - marks are awarded for it.",
      },
      {
        term: "Respiration",
        definition:
          "The oxidation of food materials within cells to release energy in the form of ATP.",
        romanUrdu: "Cell ke andar khurak ko oxidise kar ke ATP ki soorat mein tawanai hasil karna.",
        formula: "C6H12O6 + 6O2 --> 6CO2 + 6H2O + energy",
      },
      {
        term: "Aerobic respiration",
        definition:
          "Respiration that takes place in the presence of oxygen and yields a large amount of energy.",
        romanUrdu: "Oxygen ki mojoodgi mein hone wali respiration jo zyada tawanai deti hai.",
        sideNote:
          "Yields about 38 ATP per glucose molecule.",
      },
      {
        term: "Anaerobic respiration",
        definition:
          "Respiration that occurs in the absence of oxygen, yielding a small amount of energy plus lactic acid or ethanol.",
        romanUrdu: "Oxygen ke baghair hone wali respiration jo kam tawanai deti hai.",
        sideNote:
          "Yields only 2 ATP per glucose molecule.",
      },
      {
        term: "Transpiration",
        definition:
          "The loss of water in the form of vapour from the aerial parts of a plant, mainly through stomata.",
        romanUrdu: "Paude ke upri hisson se pani ka bhaap ki soorat mein kharij hona.",
      },
    ],
  },
  {
    subject: "biology",
    chapterLabel: "Transport, Homeostasis, Support & Movement",
    keywords: ["transport", "homeostasis", "support and movement", "circulation"],
    terms: [
      {
        term: "Homeostasis",
        definition:
          "The maintenance of a constant internal environment of the body despite changes in the external environment.",
        romanUrdu: "Bahri tabdeeliyon ke bawajood jism ke andar ke maahol ko qaim rakhna.",
      },
      {
        term: "Osmoregulation",
        definition:
          "The regulation of the amount of water and salts in the body fluids of an organism.",
        romanUrdu: "Jism mein pani aur namkiyat ka tawazun barqarar rakhna.",
      },
      {
        term: "Excretion",
        definition:
          "The removal of harmful metabolic waste products from the body.",
        romanUrdu: "Jism se muzir fuzla kharij karna.",
        sideNote:
          "Do not confuse excretion (metabolic waste) with egestion (undigested food removed as faeces).",
      },
      {
        term: "Nephron",
        definition:
          "The structural and functional unit of the kidney, which filters blood and forms urine.",
        romanUrdu: "Gurday ki banyadi ikai jo khoon saaf kar ke peshab banati hai.",
      },
      {
        term: "Transpiration pull",
        definition:
          "The suction force created in the xylem by the evaporation of water from leaves, which draws water upward.",
        romanUrdu: "Patton se pani urne se xylem mein paida hone wali kheenchne wali quwwat.",
      },
      {
        term: "Antagonistic muscles",
        definition:
          "A pair of muscles that work against each other, one contracting while the other relaxes.",
        romanUrdu: "Aise do pathhe jo ek dosray ke khilaf kaam karte hain.",
        sideNote:
          "Biceps and triceps are the standard example.",
      },
    ],
  },
  {
    subject: "biology",
    chapterLabel: "Coordination, Control & Reproduction",
    keywords: ["coordination", "control", "reproduction", "growth and development", "nervous"],
    terms: [
      {
        term: "Neuron",
        definition:
          "The structural and functional unit of the nervous system, specialised to conduct nerve impulses.",
        romanUrdu: "Nervous system ki banyadi ikai jo paighaam pohanchati hai.",
      },
      {
        term: "Synapse",
        definition:
          "The junction between two neurons across which a nerve impulse is transmitted by neurotransmitters.",
        romanUrdu: "Do neurons ke darmiyan wo jagah jahan se paighaam guzarta hai.",
      },
      {
        term: "Reflex action",
        definition:
          "A rapid, automatic, involuntary response to a stimulus, not involving the conscious part of the brain.",
        romanUrdu: "Kisi mahrik par foran hone wala ghair-iradi amal.",
      },
      {
        term: "Hormone",
        definition:
          "A chemical messenger secreted by an endocrine gland directly into the blood, which acts on a target organ.",
        romanUrdu: "Endocrine gland se khoon mein shaamil hone wala kimiyai paighaam bar.",
      },
      {
        term: "Fertilisation",
        definition:
          "The fusion of a male gamete with a female gamete to form a zygote.",
        romanUrdu: "Nar aur maada gametes ka milna jis se zygote banta hai.",
      },
      {
        term: "Pollination",
        definition:
          "The transfer of pollen grains from the anther to the stigma of a flower.",
        romanUrdu: "Anther se stigma tak pollen ka muntaqil hona.",
        sideNote:
          "Pollination is only the transfer; fertilisation is the fusion that follows. Examiners test this distinction.",
      },
    ],
  },
  {
    subject: "biology",
    chapterLabel: "Inheritance, Variation, Genetics & Evolution",
    keywords: ["inheritance", "variation and genetics", "genetics", "evolution"],
    terms: [
      {
        term: "Heredity",
        definition:
          "The transmission of characters from parents to their offspring.",
        romanUrdu: "Walidain se bachon tak khusoosiyat ka muntaqil hona.",
      },
      {
        term: "Allele",
        definition:
          "One of two or more alternative forms of a gene occupying the same locus on homologous chromosomes.",
        romanUrdu: "Ek hi gene ki mukhtalif shaklein.",
      },
      {
        term: "Genotype",
        definition:
          "The genetic makeup of an organism with respect to a particular trait.",
        romanUrdu: "Kisi sifat ke liye jandaar ki genetic banawat.",
      },
      {
        term: "Phenotype",
        definition:
          "The observable physical or biochemical characteristics of an organism.",
        romanUrdu: "Jandaar ki nazar aane wali zahiri khusoosiyat.",
      },
      {
        term: "Homozygous",
        definition:
          "Having two identical alleles for a particular trait (e.g. TT or tt).",
        romanUrdu: "Kisi sifat ke liye do yaksan alleles rakhna.",
      },
      {
        term: "Heterozygous",
        definition:
          "Having two different alleles for a particular trait (e.g. Tt).",
        romanUrdu: "Kisi sifat ke liye do mukhtalif alleles rakhna.",
      },
      {
        term: "Natural selection",
        definition:
          "The process by which organisms better adapted to their environment survive and reproduce more successfully.",
        romanUrdu: "Wo amal jisme maahol ke mutabiq behtar jandaar zinda reh kar nasl barhate hain.",
      },
    ],
  },
  {
    subject: "biology",
    chapterLabel: "Ecosystem, Environment, Biotechnology & Pharmacology",
    keywords: ["ecosystem", "man and his environment", "environment", "biotechnology", "pharmacology"],
    terms: [
      {
        term: "Ecosystem",
        definition:
          "A self-regulating unit in which living organisms interact with each other and with their non-living environment.",
        romanUrdu: "Aisa nizaam jisme jandaar aapas mein aur ghair-jandaar maahol se taluq rakhte hain.",
      },
      {
        term: "Food chain",
        definition:
          "A sequence of organisms through which energy is transferred by one feeding on the other.",
        romanUrdu: "Jandaaron ki aisi tarteeb jisme tawanai ek se dosray tak muntaqil hoti hai.",
      },
      {
        term: "Producer",
        definition:
          "An autotrophic organism, usually green plants, that manufactures its own food by photosynthesis.",
        romanUrdu: "Aisa jandaar jo khud apni khurak banata hai.",
      },
      {
        term: "Decomposer",
        definition:
          "An organism that breaks down dead organic matter and returns nutrients to the environment.",
        romanUrdu: "Aisa jandaar jo murda ajsaam ko toad kar ghiza wapas maahol mein bhejta hai.",
      },
      {
        term: "Biotechnology",
        definition:
          "The use of living organisms or their products for the benefit of mankind at an industrial scale.",
        romanUrdu: "Insani faide ke liye zinda ajsaam ya unki paidawar ka sanati istemal.",
      },
      {
        term: "Antibiotic",
        definition:
          "A chemical substance produced by a microorganism that kills or inhibits the growth of other microorganisms.",
        romanUrdu: "Aisa kimiyai maada jo doosray jaraseem ko marta ya rokta hai.",
        sideNote:
          "Antibiotics act on bacteria, not viruses - a very common exam trap.",
      },
      {
        term: "Vaccine",
        definition:
          "A preparation of weakened or killed pathogens introduced into the body to produce immunity.",
        romanUrdu: "Kamzor ya mare hue jaraseem ki aisi khurak jo jism mein muzahmat paida karti hai.",
      },
    ],
  },


  /* ================== I.COM / COMMERCE STREAM ================== */
  {
    subject: "accounting",
    chapterLabel: "Introduction, Accounting Equation & Double Entry",
    keywords: ["introduction to accounting", "accounting equation", "double entry", "basic concept"],
    terms: [
      {
        term: "Accounting",
        definition:
          "The art of recording, classifying and summarising in a significant manner, and in terms of money, the transactions and events of a financial character, and interpreting the results thereof.",
        romanUrdu: "Maali lein dein ko paison ki shakal mein likhne, tarteeb dene aur unka natija nikalne ka fan.",
      },
      {
        term: "Accounting equation",
        definition:
          "The equation showing that the total assets of a business always equal the sum of its liabilities and owner's equity.",
        romanUrdu: "Wo mosawaat jo batata hai ke assets hamesha liabilities aur capital ke barabar hote hain.",
        formula: "Assets = Liabilities + Owner's Equity",
        sideNote:
          "This equation must balance after every single transaction. If it does not, an error has been made.",
      },
      {
        term: "Asset",
        definition:
          "Any valuable thing or property owned by a business which gives it future economic benefit.",
        romanUrdu: "Karobar ki milkiyat jo aainda faida de.",
      },
      {
        term: "Liability",
        definition:
          "The claim of outsiders (creditors) against the assets of a business; what the business owes.",
        romanUrdu: "Karobar par bahar walon ka qarza.",
      },
      {
        term: "Owner's equity / Capital",
        definition:
          "The claim of the owner against the assets of the business, i.e. the amount invested by the owner.",
        romanUrdu: "Karobar ke assets par malik ka haq ya uski lagai hui raqam.",
      },
      {
        term: "Double entry system",
        definition:
          "The system of recording in which every transaction affects at least two accounts, one debited and the other credited with an equal amount.",
        romanUrdu: "Wo tareeqa jisme har lein dein do accounts par asar dalta hai - ek debit aur ek credit.",
        sideNote:
          "Golden rule: debit what comes in, credit what goes out. Total debits must always equal total credits.",
      },
      {
        term: "Transaction",
        definition:
          "Any exchange of goods, services or money between two parties that can be measured in monetary terms.",
        romanUrdu: "Do fareeqon ke darmiyan aisa tabadla jise paison mein naapa ja sake.",
      },
    ],
  },
  {
    subject: "accounting",
    chapterLabel: "Journal, Ledger, Cash Book & Special Journals",
    keywords: ["books of original entry", "journal", "ledger", "posting", "cash book", "petty cash", "special journal"],
    terms: [
      {
        term: "Journal",
        definition:
          "The book of original entry in which transactions are recorded for the first time in chronological order.",
        romanUrdu: "Wo pehli kitaab jisme lein dein tareekh ke hisaab se sab se pehle likhe jate hain.",
        sideNote:
          "Also called the day book or book of first entry.",
      },
      {
        term: "Ledger",
        definition:
          "The principal book of accounts in which all transactions relating to a particular account are collected in one place.",
        romanUrdu: "Wo asal kitaab jisme har account ke tamam lein dein aik jagah jama hote hain.",
        sideNote:
          "The ledger is called the 'king of books' because the trial balance is drawn from it.",
      },
      {
        term: "Posting",
        definition:
          "The process of transferring entries from the journal to the appropriate accounts in the ledger.",
        romanUrdu: "Journal se ledger mein indraaj muntaqil karne ka amal.",
      },
      {
        term: "Cash book",
        definition:
          "A subsidiary book in which all cash receipts and cash payments are recorded; it serves as both a journal and a ledger.",
        romanUrdu: "Wo kitaab jisme naqad wasooli aur adaigi likhi jati hai.",
        sideNote:
          "The cash book is unique because it is both a book of original entry and a ledger account.",
      },
      {
        term: "Petty cash book",
        definition:
          "A book maintained by the petty cashier to record small, routine payments of the business.",
        romanUrdu: "Choti motti rozmarra adaigiyon ki kitaab.",
      },
      {
        term: "Imprest system",
        definition:
          "A system in which the petty cashier is given a fixed sum, and is reimbursed at the end of the period for exactly what was spent.",
        romanUrdu: "Petty cashier ko muqarrara raqam di jati hai aur kharch ke barabar dobara di jati hai.",
      },
      {
        term: "Narration",
        definition:
          "A brief explanation of a journal entry written below it, stating why the entry was made.",
        romanUrdu: "Journal entry ke neeche likhi jane wali mukhtasar wazahat.",
      },
    ],
  },
  {
    subject: "accounting",
    chapterLabel: "Trial Balance, Errors, Bank Reconciliation & Adjustments",
    keywords: ["trial balance", "rectification of error", "bank reconciliation", "adjusting", "closing entries", "adjustment"],
    terms: [
      {
        term: "Trial balance",
        definition:
          "A statement of all the debit and credit balances of ledger accounts, prepared to check the arithmetical accuracy of the books.",
        romanUrdu: "Ledger ke tamam debit aur credit balances ki fehrist jo hisaab ki durusti check karti hai.",
        sideNote:
          "A tallied trial balance does not prove there are no errors: errors of principle, omission and compensating errors do not affect it.",
      },
      {
        term: "Suspense account",
        definition:
          "A temporary account opened to make the trial balance agree when the cause of a difference cannot be immediately located.",
        romanUrdu: "Aarzi account jo trial balance ka farq barabar karne ke liye khola jata hai.",
      },
      {
        term: "Error of principle",
        definition:
          "An error in which a transaction is recorded in the wrong class of account, e.g. capital expenditure treated as revenue expenditure.",
        romanUrdu: "Aisi ghalti jisme lein dein ghalat qism ke account mein likha jaye.",
        sideNote:
          "This error does NOT affect the trial balance.",
      },
      {
        term: "Error of omission",
        definition:
          "An error in which a transaction is completely left out of the books of account.",
        romanUrdu: "Aisi ghalti jisme lein dein bilkul likha hi na gaya ho.",
      },
      {
        term: "Bank reconciliation statement",
        definition:
          "A statement prepared to reconcile the difference between the cash book balance and the pass book (bank statement) balance on a particular date.",
        romanUrdu: "Cash book aur bank statement ke balance ka farq milane wala gosh-wara.",
      },
      {
        term: "Outstanding cheque",
        definition:
          "A cheque issued by the business and recorded in the cash book but not yet presented to the bank for payment.",
        romanUrdu: "Jari shuda cheque jo abhi tak bank mein pesh nahi hua.",
      },
      {
        term: "Accrued expense",
        definition:
          "An expense that has been incurred during the period but not yet paid at the end of the period.",
        romanUrdu: "Wo kharcha jo ho chuka hai magar ada nahi hua.",
      },
      {
        term: "Prepaid expense",
        definition:
          "An expense paid in advance, the benefit of which relates to the next accounting period.",
        romanUrdu: "Peshgi ada shuda kharcha jiska faida agle saal milega.",
      },
    ],
  },
  {
    subject: "accounting",
    chapterLabel: "Final Accounts, Depreciation & Capital/Revenue",
    keywords: ["financial statements of a sole trader", "final account", "depreciation", "capital and revenue", "work sheet"],
    terms: [
      {
        term: "Final accounts",
        definition:
          "The accounts prepared at the end of an accounting period, comprising the trading account, profit and loss account and balance sheet.",
        romanUrdu: "Saal ke akhir mein banaye jane wale hisaabat: trading, profit and loss aur balance sheet.",
      },
      {
        term: "Trading account",
        definition:
          "The account prepared to find the gross profit or gross loss of a business from its buying and selling activity.",
        romanUrdu: "Wo account jisse kharid o farokht ka gross profit maloom hota hai.",
        formula: "Gross Profit = Net Sales - Cost of Goods Sold",
      },
      {
        term: "Balance sheet",
        definition:
          "A statement of the assets, liabilities and capital of a business at a particular date, showing its financial position.",
        romanUrdu: "Kisi khaas tareekh par karobar ki maali halat ka gosh-wara.",
        sideNote:
          "A balance sheet is a statement, not an account, and is made 'as at' a date, not 'for the year ended'.",
      },
      {
        term: "Depreciation",
        definition:
          "The permanent, gradual and continuing decrease in the book value of a fixed asset due to use, wear and tear or passage of time.",
        romanUrdu: "Fixed asset ki qeemat mein istemal ya waqt ke sath mustaqil kami.",
      },
      {
        term: "Straight line method",
        definition:
          "A method of depreciation in which an equal amount is written off the asset every year over its useful life.",
        romanUrdu: "Har saal barabar raqam depreciation nikalne ka tareeqa.",
        formula: "Depreciation = (Cost - Scrap Value) / Useful Life",
      },
      {
        term: "Capital expenditure",
        definition:
          "Expenditure incurred to acquire a fixed asset or to increase the earning capacity of an existing asset; its benefit lasts more than one year.",
        romanUrdu: "Aisa kharcha jiska faida ek saal se zyada chale.",
        sideNote:
          "Shown in the balance sheet, not the profit and loss account.",
      },
      {
        term: "Revenue expenditure",
        definition:
          "Expenditure whose benefit is consumed within the current accounting period, such as rent, wages and repairs.",
        romanUrdu: "Aisa kharcha jiska faida usi saal khatam ho jaye.",
      },
    ],
  },
  {
    subject: "accounting",
    chapterLabel: "Partnership, Company Accounts & Non-Trading Concerns",
    keywords: ["partnership", "company accounts", "issue of shares", "debenture", "non-trading", "single entry", "incomplete records", "cash flow", "analysis of financial"],
    terms: [
      {
        term: "Partnership",
        definition:
          "The relation between persons who have agreed to share the profits of a business carried on by all or any of them acting for all.",
        romanUrdu: "Do ya zyada afraad ka aisa taluq jisme wo karobar ka munafa baantne par razamand hon.",
      },
      {
        term: "Goodwill",
        definition:
          "The value of the reputation of a business, which enables it to earn profits higher than the normal rate of return.",
        romanUrdu: "Karobar ki neik naami ki qeemat jo usay zyada munafa dilati hai.",
      },
      {
        term: "Sacrificing ratio",
        definition:
          "The ratio in which the old partners give up their share of profit in favour of a new partner.",
        romanUrdu: "Wo tanasub jisme purane partners naye partner ke liye apna hissa chhorte hain.",
        formula: "Sacrificing Ratio = Old Ratio - New Ratio",
      },
      {
        term: "Gaining ratio",
        definition:
          "The ratio in which the continuing partners acquire the share of the outgoing or deceased partner.",
        romanUrdu: "Wo tanasub jisme baqi partners jane wale partner ka hissa hasil karte hain.",
        formula: "Gaining Ratio = New Ratio - Old Ratio",
      },
      {
        term: "Dissolution of firm",
        definition:
          "The complete breaking up of the relation among all the partners of a firm, closing down the business.",
        romanUrdu: "Firm ke tamam partners ke darmiyan taluq ka mukammal khatma.",
      },
      {
        term: "Share",
        definition:
          "One of the equal parts into which the capital of a joint stock company is divided.",
        romanUrdu: "Company ke sarmaye ka aik barabar hissa.",
      },
      {
        term: "Debenture",
        definition:
          "An acknowledgement of debt issued by a company under its seal, carrying a fixed rate of interest.",
        romanUrdu: "Company ka jari karda qarze ka tehreeri iqrar jis par muqarrara sood milta hai.",
        sideNote:
          "A shareholder is an owner and gets dividend; a debenture holder is a creditor and gets interest. This contrast is a favourite exam question.",
      },
      {
        term: "Receipts and payments account",
        definition:
          "A summary of the cash book of a non-trading concern, showing all cash received and paid during the period.",
        romanUrdu: "Ghair-tijarati idaray ki cash book ka khulasa.",
      },
      {
        term: "Single entry system",
        definition:
          "An incomplete system of book-keeping in which only personal accounts and the cash book are maintained.",
        romanUrdu: "Adhoora tareeqa jisme sirf personal accounts aur cash book rakhi jati hai.",
      },
    ],
  },
  {
    subject: "commerce",
    chapterLabel: "Commerce, Business & Forms of Organisation",
    keywords: ["introduction to commerce", "forms of business", "sole proprietorship", "partnership", "joint stock company", "co-operative", "state enterprise"],
    terms: [
      {
        term: "Commerce",
        definition:
          "All those activities which are concerned with the transfer of goods and services from the producer to the consumer, including trade and aids to trade.",
        romanUrdu: "Wo tamam kaam jo maal ko producer se consumer tak pohanchane se mutalliq hain.",
      },
      {
        term: "Trade",
        definition:
          "The buying and selling of goods and services with the object of earning profit.",
        romanUrdu: "Munafe ki gharaz se maal ki kharid o farokht.",
        sideNote:
          "Trade is only one part of commerce; commerce also includes aids to trade.",
      },
      {
        term: "Industry",
        definition:
          "That part of business activity which is concerned with the extraction, production or processing of goods.",
        romanUrdu: "Karobar ka wo hissa jo maal nikaalne ya banane se mutalliq hai.",
      },
      {
        term: "Sole proprietorship",
        definition:
          "A form of business owned, managed and controlled by a single person who bears all the risk and takes all the profit.",
        romanUrdu: "Aisa karobar jo aik hi shakhs ki milkiyat aur intezam mein ho.",
        sideNote:
          "Its biggest drawback is unlimited liability of the owner.",
      },
      {
        term: "Partnership",
        definition:
          "An association of two or more persons who agree to carry on a lawful business and share its profits and losses.",
        romanUrdu: "Do ya zyada afraad ka mushtarka jaiz karobar.",
      },
      {
        term: "Joint stock company",
        definition:
          "An artificial person created by law, having a separate legal entity, perpetual succession and a common seal, with capital divided into shares.",
        romanUrdu: "Qanoon ka banaya hua masnooi shakhs jiska sarmaya shares mein taqseem hota hai.",
        sideNote:
          "Remember the three key features: separate legal entity, perpetual succession, limited liability.",
      },
      {
        term: "Limited liability",
        definition:
          "A privilege by which the liability of a member is limited to the unpaid amount on the shares held by him.",
        romanUrdu: "Aisi riayat jisme hissedaar ki zimmedari sirf uske shares tak mehdood hoti hai.",
      },
      {
        term: "Co-operative society",
        definition:
          "A voluntary association of persons formed to promote the economic interests of its members on the principle of self-help and mutual help.",
        romanUrdu: "Apne members ke maashi faide ke liye banai gai razakarana anjuman.",
      },
    ],
  },
  {
    subject: "commerce",
    chapterLabel: "Trade, Distribution & Aids to Trade",
    keywords: ["trade: home and foreign", "channels of distribution", "aids to trade", "banking and insurance", "transport", "warehousing", "advertising", "business combination", "stock exchange"],
    terms: [
      {
        term: "Home trade",
        definition:
          "The buying and selling of goods and services within the geographical boundaries of a country.",
        romanUrdu: "Mulk ke andar hone wali kharid o farokht.",
      },
      {
        term: "Foreign trade",
        definition:
          "The exchange of goods and services between two or more countries.",
        romanUrdu: "Do ya zyada mulkon ke darmiyan maal ka tabadla.",
      },
      {
        term: "Wholesaler",
        definition:
          "A middleman who buys goods in large quantities from producers and sells them in smaller lots to retailers.",
        romanUrdu: "Wo bichola jo producer se bara maal khareed kar retailer ko becha hai.",
      },
      {
        term: "Retailer",
        definition:
          "The last link in the chain of distribution, who sells goods in small quantities directly to the final consumer.",
        romanUrdu: "Taqseem ki aakhri kadi jo seedha upbhokta ko maal becha hai.",
      },
      {
        term: "Warehousing",
        definition:
          "The function of storing goods from the time of their production until the time of their consumption or sale.",
        romanUrdu: "Maal ko banne se lekar bikne tak mehfooz rakhna.",
        sideNote:
          "Warehousing creates time utility by removing the barrier of time.",
      },
      {
        term: "Insurance",
        definition:
          "A contract in which the insurer agrees to indemnify the insured against a specified loss in return for a premium.",
        romanUrdu: "Aisa muahida jisme premium ke badle nuqsan ka mua'waza diya jata hai.",
      },
      {
        term: "Advertising",
        definition:
          "Any paid form of non-personal presentation of goods, services or ideas by an identified sponsor.",
        romanUrdu: "Maal ya khidmaat ki adaigi shuda ghair-zaati tashheer.",
      },
      {
        term: "Stock exchange",
        definition:
          "An organised market where existing shares, debentures and other securities are bought and sold.",
        romanUrdu: "Munazzam bazaar jahan shares aur securities ki kharid o farokht hoti hai.",
        sideNote:
          "A stock exchange deals only in EXISTING (second-hand) securities; new ones are issued in the primary market.",
      },
    ],
  },
  {
    subject: "commerce",
    chapterLabel: "Commercial Geography of Pakistan",
    keywords: ["commercial geography", "location, land", "physical features", "climate", "agricultural resources", "water resources", "irrigation", "mineral", "power resources", "industries of pakistan", "means of transport", "communication", "foreign trade of pakistan", "population", "human resources"],
    terms: [
      {
        term: "Commercial geography",
        definition:
          "The branch of geography that studies the effect of the physical environment on the production, distribution and exchange of commodities.",
        romanUrdu: "Geography ki wo shakh jo qudrati maahol ka tijarat par asar parhti hai.",
      },
      {
        term: "Natural resources",
        definition:
          "Those useful materials and forces which are provided by nature and can be utilised by man for economic purposes.",
        romanUrdu: "Qudrat ki di hui wo cheezein jo insan maashi faide ke liye istemal kare.",
      },
      {
        term: "Cash crop",
        definition:
          "A crop grown mainly for sale in the market to earn income rather than for the grower's own consumption.",
        romanUrdu: "Aisi fasal jo bechne ke liye ugai jaye.",
        sideNote:
          "Cotton, sugarcane and tobacco are Pakistan's main cash crops.",
      },
      {
        term: "Kharif crops",
        definition:
          "Crops sown at the beginning of the summer monsoon (April-June) and harvested in autumn (October-December).",
        romanUrdu: "Garmi ke shuru mein boi jane wali fasal.",
        sideNote:
          "Rice, cotton, sugarcane and maize.",
      },
      {
        term: "Rabi crops",
        definition:
          "Crops sown in winter (October-December) and harvested in spring (April-May).",
        romanUrdu: "Sardi mein boi jane wali fasal.",
        sideNote:
          "Wheat, gram, barley and mustard.",
      },
      {
        term: "Perennial irrigation",
        definition:
          "A system of irrigation in which water is supplied to the fields throughout the year from a canal fed by a barrage.",
        romanUrdu: "Aisa nizaam jisme saal bhar nehron se pani milta rahe.",
      },
      {
        term: "Balance of trade",
        definition:
          "The difference between the value of a country's visible exports and visible imports over a period.",
        romanUrdu: "Mulk ki nazar aane wali bar-aamdaat aur dar-aamdaat ka farq.",
        formula: "BOT = Visible Exports - Visible Imports",
        sideNote:
          "Balance of trade covers only visible goods; balance of payments covers goods, services and capital.",
      },
      {
        term: "Balance of payments",
        definition:
          "A systematic record of all economic transactions between the residents of a country and the rest of the world in a year.",
        romanUrdu: "Mulk ke tamam bainul-aqwami maali lein dein ka record.",
      },
    ],
  },
  {
    subject: "economics",
    chapterLabel: "Basic Concepts, Consumer Behaviour & Demand",
    keywords: ["introduction to economics", "basic concept", "consumer behaviour", "utility", "demand, supply", "market equilibrium", "elasticity"],
    terms: [
      {
        term: "Economics",
        definition:
          "The social science which studies human behaviour as a relationship between ends and scarce means which have alternative uses.",
        romanUrdu: "Wo uloom-e-muashra jo mehdood wasail aur la-mehdood zarooriyat ke taluq ka mutala karta hai.",
        sideNote:
          "This is Lionel Robbins' definition - the one boards expect.",
      },
      {
        term: "Scarcity",
        definition:
          "The condition in which resources are limited in relation to unlimited human wants.",
        romanUrdu: "Wasail ka zarooriyat ke muqable mein kam hona.",
        sideNote:
          "Scarcity is the fundamental economic problem and the reason choice is necessary.",
      },
      {
        term: "Opportunity cost",
        definition:
          "The value of the next best alternative that must be given up in order to obtain something.",
        romanUrdu: "Kisi cheez ko hasil karne ke liye chhori gai behtareen doosri cheez ki qeemat.",
      },
      {
        term: "Utility",
        definition:
          "The power or capacity of a commodity to satisfy a human want.",
        romanUrdu: "Kisi shai ki wo salahiyat jo insani zaroorat poori kare.",
      },
      {
        term: "Law of diminishing marginal utility",
        definition:
          "As a consumer consumes more and more units of a commodity, the marginal utility derived from each successive unit goes on decreasing.",
        romanUrdu: "Jaise jaise zyada units istemal ho, har agli unit se milne wala faida kam hota jata hai.",
      },
      {
        term: "Demand",
        definition:
          "The quantity of a commodity which a consumer is willing and able to buy at a given price during a given period of time.",
        romanUrdu: "Wo miqdaar jo kharidaar kisi qeemat par khareedne ko tayyar aur qaabil ho.",
        sideNote:
          "Desire alone is not demand; it must be backed by willingness AND ability to pay.",
      },
      {
        term: "Law of demand",
        definition:
          "Other things remaining equal, as the price of a commodity falls its quantity demanded rises, and as the price rises its quantity demanded falls.",
        romanUrdu: "Baqi cheezein yaksan hon to qeemat barhne se talab kam aur qeemat girne se talab barhti hai.",
      },
      {
        term: "Elasticity of demand",
        definition:
          "The degree of responsiveness of quantity demanded to a change in the price of the commodity.",
        romanUrdu: "Qeemat ki tabdeeli par talab kitni tabdeel hoti hai.",
        formula: "Ed = (% change in quantity demanded) / (% change in price)",
      },
      {
        term: "Supply",
        definition:
          "The quantity of a commodity that a producer is willing and able to offer for sale at a given price in a given period.",
        romanUrdu: "Wo miqdaar jo bechne wala kisi qeemat par bechne ko tayyar ho.",
      },
    ],
  },
  {
    subject: "economics",
    chapterLabel: "Production, Cost, Market Structure & Macroeconomics",
    keywords: ["theory of production", "factors of production", "cost and revenue", "market structure", "price determination", "national income", "money, inflation", "public finance", "taxation", "economic development", "planning in pakistan"],
    terms: [
      {
        term: "Factors of production",
        definition:
          "The resources used to produce goods and services, namely land, labour, capital and organisation (entrepreneur).",
        romanUrdu: "Peda-waar ke wasail: zameen, mehnat, sarmaya aur tanzeem.",
      },
      {
        term: "Law of diminishing returns",
        definition:
          "As more and more units of a variable factor are applied to a fixed factor, the marginal product eventually begins to decline.",
        romanUrdu: "Muqarrara factor par zyada variable factor lagane se aakhir kar paidawar kam hone lagti hai.",
      },
      {
        term: "Fixed cost",
        definition:
          "A cost which does not change with the level of output in the short run, such as rent of a building.",
        romanUrdu: "Aisa kharcha jo paidawar barhne ya ghatne se tabdeel nahi hota.",
      },
      {
        term: "Variable cost",
        definition:
          "A cost which changes directly with the level of output, such as cost of raw material.",
        romanUrdu: "Aisa kharcha jo paidawar ke sath badalta hai.",
      },
      {
        term: "Perfect competition",
        definition:
          "A market structure in which there are a very large number of buyers and sellers dealing in a homogeneous product, with free entry and exit and perfect knowledge.",
        romanUrdu: "Aisa bazaar jisme bohat se kharidaar aur bechne wale yaksan maal ka lein dein karte hain.",
        sideNote:
          "Under perfect competition the firm is a price taker, not a price maker.",
      },
      {
        term: "Monopoly",
        definition:
          "A market structure in which there is a single seller of a commodity which has no close substitute.",
        romanUrdu: "Aisa bazaar jisme sirf aik bechne wala ho aur maal ka koi mutabadil na ho.",
      },
      {
        term: "National income",
        definition:
          "The total money value of all final goods and services produced in a country during a year.",
        romanUrdu: "Aik saal mein mulk mein bane tamam aakhri maal o khidmaat ki kul qeemat.",
      },
      {
        term: "Gross Domestic Product (GDP)",
        definition:
          "The total money value of all final goods and services produced within the geographical boundary of a country in one year.",
        romanUrdu: "Mulk ki sarhad ke andar aik saal mein bani tamam aakhri ashya ki qeemat.",
        formula: "GNP = GDP + Net factor income from abroad",
        sideNote:
          "GDP is by territory; GNP adds net factor income from abroad. Boards frequently ask for this difference.",
      },
      {
        term: "Inflation",
        definition:
          "A persistent and appreciable rise in the general price level of goods and services in an economy over a period of time.",
        romanUrdu: "Ashya ki aam qeematon mein musalsal aur numayan izafa.",
      },
      {
        term: "Direct tax",
        definition:
          "A tax whose burden cannot be shifted to another person, being paid by the person on whom it is levied, e.g. income tax.",
        romanUrdu: "Aisa tax jiska bojh doosray par nahi daala ja sakta.",
        sideNote:
          "Direct tax burden cannot be shifted; indirect tax (e.g. sales tax) can be.",
      },
      {
        term: "Budget",
        definition:
          "An annual statement of the estimated revenue and expenditure of a government for the coming financial year.",
        romanUrdu: "Hukumat ki salana amdani aur kharch ka takhmeena.",
      },
    ],
  },
  {
    subject: "banking",
    chapterLabel: "Banking, Central Bank & Commercial Banks",
    keywords: ["introduction to banking", "evolution", "kinds and functions of banks", "central bank", "state bank of pakistan", "commercial bank", "balance sheet"],
    terms: [
      {
        term: "Bank",
        definition:
          "A financial institution which deals in money, accepting deposits from the public repayable on demand and lending money for the purpose of earning profit.",
        romanUrdu: "Aisa maali idara jo amanat qubool karta aur qarza deta hai.",
      },
      {
        term: "Central bank",
        definition:
          "The apex financial institution of a country which controls, regulates and supervises the entire banking and monetary system of the state.",
        romanUrdu: "Mulk ka sab se bara maali idara jo poore banking nizaam ko control karta hai.",
        sideNote:
          "In Pakistan the central bank is the State Bank of Pakistan, established on 1st July 1948.",
      },
      {
        term: "Commercial bank",
        definition:
          "A bank which accepts deposits from the public and advances loans mainly for short periods, with the object of earning profit.",
        romanUrdu: "Aisa bank jo amanat le kar munafe ke liye qarza deta hai.",
      },
      {
        term: "Bank rate",
        definition:
          "The rate of interest at which the central bank rediscounts the first class bills of exchange of commercial banks.",
        romanUrdu: "Wo shrah jis par central bank commercial banks ko qarza deta hai.",
      },
      {
        term: "Credit creation",
        definition:
          "The process by which commercial banks are able to expand the total supply of money by advancing loans out of their deposits.",
        romanUrdu: "Wo amal jisme banks amanat par qarza de kar paison ki miqdaar barhate hain.",
      },
      {
        term: "Lender of the last resort",
        definition:
          "The function of the central bank by which it provides financial assistance to commercial banks in times of crisis.",
        romanUrdu: "Central bank ka wo kaam jisme wo mushkil waqt mein banks ki madad karta hai.",
      },
      {
        term: "Clearing house",
        definition:
          "An institution, usually run by the central bank, where the mutual claims of member banks against each other are settled.",
        romanUrdu: "Aisa idara jahan banks apne aapsi hisaab barabar karte hain.",
      },
    ],
  },
  {
    subject: "banking",
    chapterLabel: "Customers, Accounts & Negotiable Instruments",
    keywords: ["banker and customer", "bank accounts", "operation", "negotiable instrument", "cheque", "bill of exchange", "promissory note", "endorsement", "crossing"],
    terms: [
      {
        term: "Customer",
        definition:
          "A person who has an account with a bank and with whom the bank has dealings of a banking nature.",
        romanUrdu: "Aisa shakhs jiska bank mein account ho aur bank se lein dein karta ho.",
      },
      {
        term: "Current account",
        definition:
          "A running account from which the account holder may deposit and withdraw money any number of times, on which normally no profit is paid.",
        romanUrdu: "Aisa account jisme jitni baar chahe raqam jama ya nikaali ja sake.",
      },
      {
        term: "Negotiable instrument",
        definition:
          "A written document which is freely transferable by delivery or endorsement and which gives the holder in due course a good title to the money named in it.",
        romanUrdu: "Aisi tehreeri dastawez jo aasani se doosray ko muntaqil ki ja sake.",
        sideNote:
          "The three main types are the cheque, the bill of exchange and the promissory note.",
      },
      {
        term: "Cheque",
        definition:
          "An unconditional written order drawn on a specified bank by an account holder, directing it to pay a certain sum of money on demand to a named person or bearer.",
        romanUrdu: "Bank ko diya gaya tehreeri hukm ke muqarrara raqam ada ki jaye.",
      },
      {
        term: "Bill of exchange",
        definition:
          "An unconditional order in writing signed by the drawer, directing the drawee to pay a certain sum of money to a specified person or bearer on a fixed future date.",
        romanUrdu: "Aisa tehreeri ghair-mashroot hukm jisme muqarrara tareekh par raqam ada karni hoti hai.",
      },
      {
        term: "Promissory note",
        definition:
          "An unconditional written promise signed by the maker to pay a certain sum of money to a specified person or bearer on demand or at a fixed future date.",
        romanUrdu: "Aisa tehreeri wada jisme raqam ada karne ka iqrar kiya jata hai.",
        sideNote:
          "A bill of exchange is an ORDER by the drawer; a promissory note is a PROMISE by the maker. Two parties in a note, three in a bill.",
      },
      {
        term: "Endorsement",
        definition:
          "The act of signing one's name on the back of a negotiable instrument for the purpose of transferring its title to another person.",
        romanUrdu: "Instrument ki pusht par dastakhat kar ke usay doosray ke naam muntaqil karna.",
      },
      {
        term: "Crossing of a cheque",
        definition:
          "Drawing two parallel transverse lines across the face of a cheque, which makes it payable only through a bank account and not over the counter.",
        romanUrdu: "Cheque par do samanantar lakeerein khenchna taake raqam sirf account mein jaye.",
        sideNote:
          "A crossed cheque cannot be encashed over the counter - this is its whole safety purpose.",
      },
    ],
  },
  {
    subject: "banking",
    chapterLabel: "Foreign Trade Finance, Islamic & Electronic Banking",
    keywords: ["letter of credit", "financing of foreign trade", "islamic banking", "electronic banking", "modern banking"],
    terms: [
      {
        term: "Letter of credit",
        definition:
          "A written undertaking by a bank on behalf of an importer, guaranteeing payment to the exporter provided the stated documents are presented.",
        romanUrdu: "Bank ki taraf se importer ki janib se exporter ko adaigi ki tehreeri zamanat.",
      },
      {
        term: "Islamic banking",
        definition:
          "A system of banking which conducts all its operations in accordance with the principles of Shariah, prohibiting interest (riba).",
        romanUrdu: "Aisa banking nizaam jo Shariah ke mutabiq ho aur sood se paak ho.",
      },
      {
        term: "Riba",
        definition:
          "Any predetermined excess or increase over and above the principal amount of a loan, which is prohibited in Islam.",
        romanUrdu: "Qarze ki asal raqam par muqarrara izafa jo Islam mein haram hai.",
      },
      {
        term: "Mudarabah",
        definition:
          "A partnership in which one party provides the capital and the other provides labour and expertise, sharing profit at an agreed ratio while loss is borne by the capital provider.",
        romanUrdu: "Aisi shirkat jisme aik sarmaya aur doosra mehnat lagata hai.",
        sideNote:
          "Profit is shared as agreed, but financial loss falls on the capital provider alone.",
      },
      {
        term: "Musharakah",
        definition:
          "A joint venture in which all partners contribute capital and share profits and losses in proportion to their investment.",
        romanUrdu: "Aisi shirkat jisme sab partners sarmaya lagate aur nafa nuqsan baantte hain.",
      },
      {
        term: "ATM (Automated Teller Machine)",
        definition:
          "An electronic machine which allows a customer to withdraw cash, check balance and perform other transactions without visiting a bank counter.",
        romanUrdu: "Aisi machine jis se bank gaye baghair raqam nikaali ja sake.",
      },
      {
        term: "E-banking",
        definition:
          "The provision of banking services to customers through electronic channels such as the internet, mobile phones and ATMs.",
        romanUrdu: "Internet aur mobile ke zariye banking khidmaat ki faraahmi.",
      },
    ],
  },


  /* ========== GAP-FILL: science & maths chapters ========== */
  {
    subject: "physics",
    chapterLabel: "Measurement & Physical Quantities",
    keywords: ["physical quantities", "measurement"],
    terms: [
      {
        term: "Physical quantity",
        definition:
          "A quantity that can be measured and expressed in terms of a number and a unit.",
        romanUrdu: "Aisi miqdaar jise naapa ja sake aur number aur unit mein likha jaye.",
      },
      {
        term: "Base quantities",
        definition:
          "The seven fundamental quantities that are independent of one another: length, mass, time, temperature, electric current, amount of substance and luminous intensity.",
        romanUrdu: "Saat banyadi miqdaarein jo ek dosray par munhasir nahi.",
      },
      {
        term: "Least count",
        definition:
          "The smallest measurement that can be taken accurately with a measuring instrument.",
        romanUrdu: "Kisi aale se li jane wali sab se choti durust paimaish.",
        sideNote:
          "Vernier callipers 0.01 cm; screw gauge 0.001 cm.",
      },
      {
        term: "Significant figures",
        definition:
          "The accurately known digits of a measurement plus the first doubtful digit.",
        romanUrdu: "Paimaish ke wo hindse jo yaqeeni hon aur pehla mashkook hindsa.",
      },
      {
        term: "Zero error",
        definition:
          "The error in an instrument when it does not read zero while the jaws are fully closed.",
        romanUrdu: "Aale ki wo ghalti jab band halat mein bhi zero nahi dikhata.",
        sideNote:
          "Zero error must be subtracted (with its sign) from every reading.",
      },
    ],
  },
  {
    subject: "physics",
    chapterLabel: "Gravitation",
    keywords: ["gravitation"],
    terms: [
      {
        term: "Law of gravitation",
        definition:
          "Every body in the universe attracts every other body with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between their centres.",
        romanUrdu: "Kainaat ka har jism doosray ko apni kamiyat ke hisaab se kheenchta hai.",
        formula: "F = G m1 m2 / r^2",
      },
      {
        term: "Gravitational field strength",
        definition:
          "The gravitational force acting on a unit mass placed at a point in a gravitational field.",
        romanUrdu: "Kisi nuqte par ek unit kamiyat par lagne wali kashish ki quwwat.",
        unit: "N/kg",
        formula: "g = F/m",
      },
      {
        term: "Orbital velocity",
        definition:
          "The velocity required by a satellite to remain in its orbit around the Earth.",
        romanUrdu: "Wo raftaar jo satellite ko apne madaar mein rehne ke liye chahiye.",
        unit: "m/s",
        formula: "v = sqrt(GM/r)",
      },
      {
        term: "Weight",
        definition:
          "The force with which the Earth attracts a body towards its centre.",
        romanUrdu: "Wo quwwat jis se zameen kisi jism ko apni taraf kheenchti hai.",
        unit: "N",
        formula: "W = mg",
        sideNote:
          "Mass is constant everywhere; weight changes with g. Mass in kg, weight in newtons.",
      },
    ],
  },
  {
    subject: "physics",
    chapterLabel: "Properties & States of Matter",
    keywords: ["properties of matter"],
    terms: [
      {
        term: "Density",
        definition:
          "The mass per unit volume of a substance.",
        romanUrdu: "Kisi shai ki fi unit hajm kamiyat.",
        unit: "kg/m^3",
        formula: "d = m/V",
      },
      {
        term: "Pressure",
        definition:
          "The force acting normally per unit area on a surface.",
        romanUrdu: "Kisi satah par amoodi tor par fi unit raqba lagne wali quwwat.",
        unit: "Pa (N/m^2)",
        formula: "P = F/A",
      },
      {
        term: "Pascal's law",
        definition:
          "Pressure applied at any point of a liquid enclosed in a container is transmitted without loss to all other parts of the liquid.",
        romanUrdu: "Band maye par lagaya gaya dabao har taraf barabar muntaqil hota hai.",
      },
      {
        term: "Archimedes' principle",
        definition:
          "When a body is wholly or partially immersed in a fluid, it experiences an upthrust equal to the weight of the fluid displaced.",
        romanUrdu: "Maye mein doobe jism par utni upthrust lagti hai jitna maye hataya gaya.",
      },
      {
        term: "Hooke's law",
        definition:
          "Within the elastic limit, the extension produced in a body is directly proportional to the applied force.",
        romanUrdu: "Elastic had ke andar khinchao lagai gai quwwat ke raast mutanasib hota hai.",
        formula: "F = k x",
      },
    ],
  },
  {
    subject: "physics",
    chapterLabel: "Geometrical Optics & Optical Instruments",
    keywords: ["geometrical optics", "physical optics", "optical instrument"],
    terms: [
      {
        term: "Reflection of light",
        definition:
          "The bouncing back of light into the same medium after striking a surface.",
        romanUrdu: "Roshni ka kisi satah se takra kar wapas usi medium mein lautna.",
      },
      {
        term: "Refraction of light",
        definition:
          "The bending of light as it passes obliquely from one transparent medium into another due to a change in its speed.",
        romanUrdu: "Roshni ka ek medium se doosray mein jate hue mud jana.",
      },
      {
        term: "Total internal reflection",
        definition:
          "The complete reflection of light back into the denser medium when the angle of incidence exceeds the critical angle.",
        romanUrdu: "Jab zaawiya critical angle se bara ho to roshni ka poori tarah wapas laut jana.",
        sideNote:
          "Two conditions: light must travel from denser to rarer medium, and the angle of incidence must exceed the critical angle.",
      },
      {
        term: "Critical angle",
        definition:
          "The angle of incidence in the denser medium for which the angle of refraction in the rarer medium is 90 degrees.",
        romanUrdu: "Wo zaawiya jis par refraction ka zaawiya 90 darje ho jaye.",
      },
      {
        term: "Interference",
        definition:
          "The superposition of two coherent light waves resulting in an increase or decrease of intensity at a point.",
        romanUrdu: "Do coherent lehron ke milne se roshni ka barhna ya kam hona.",
      },
      {
        term: "Diffraction",
        definition:
          "The bending or spreading of light waves around the edges of an obstacle or aperture.",
        romanUrdu: "Roshni ka rukawat ke kinaron par mud kar phail jana.",
      },
      {
        term: "Resolving power",
        definition:
          "The ability of an optical instrument to show two closely placed objects as separate and distinct.",
        romanUrdu: "Aale ki wo salahiyat jo do qareebi cheezon ko alag dikhaye.",
      },
    ],
  },
  {
    subject: "physics",
    chapterLabel: "Electronics, Modern Physics & Nuclear",
    keywords: ["basic electronics", "electronics", "physics of solids", "dawn of modern physics", "atomic spectra", "nuclear physics", "radioactivity", "information and communication"],
    terms: [
      {
        term: "Thermionic emission",
        definition:
          "The emission of electrons from the surface of a heated metal.",
        romanUrdu: "Garam dhaat ki satah se electrons ka kharij hona.",
      },
      {
        term: "Semiconductor",
        definition:
          "A solid whose electrical conductivity lies between that of a conductor and an insulator, and increases with temperature.",
        romanUrdu: "Aisa thos jiski bijli chalane ki salahiyat conductor aur insulator ke darmiyan ho.",
      },
      {
        term: "Logic gate",
        definition:
          "A digital circuit that performs a basic logical operation on one or more binary inputs to produce a single binary output.",
        romanUrdu: "Aisa digital circuit jo binary inputs par mantiqi amal karta hai.",
      },
      {
        term: "Photoelectric effect",
        definition:
          "The emission of electrons from a metal surface when light of suitable frequency falls on it.",
        romanUrdu: "Dhaat par munasib roshni parne se electrons ka nikalna.",
        sideNote:
          "Emission depends on the FREQUENCY of light, not its intensity. Below the threshold frequency no electron is emitted however bright the light.",
      },
      {
        term: "Radioactivity",
        definition:
          "The spontaneous disintegration of the nuclei of heavy unstable elements with the emission of alpha, beta or gamma radiation.",
        romanUrdu: "Bhaari ghair-mustahkam elements ke nucleus ka khud ba khud tootna.",
      },
      {
        term: "Half life",
        definition:
          "The time in which half of the atoms of a radioactive element decay.",
        romanUrdu: "Wo waqt jisme radioactive element ke aadhe atoms toot jate hain.",
      },
      {
        term: "Isotopes",
        definition:
          "Atoms of the same element having the same atomic number but different mass numbers.",
        romanUrdu: "Aik hi element ke aise atoms jinka atomic number same magar mass number mukhtalif ho.",
      },
      {
        term: "Nuclear fission",
        definition:
          "The splitting of a heavy nucleus into two nearly equal lighter nuclei with the release of a large amount of energy.",
        romanUrdu: "Bhaari nucleus ka do halke hisson mein tootna aur bari tawanai kharij hona.",
      },
    ],
  },
  {
    subject: "chemistry",
    chapterLabel: "Periodic Table & Periodicity",
    keywords: ["periodic table", "periodicity", "periodic classification", "s-block", "group iiia", "group va", "transition element"],
    terms: [
      {
        term: "Periodic law",
        definition:
          "The physical and chemical properties of elements are a periodic function of their atomic numbers.",
        romanUrdu: "Elements ki khasoosiyat unke atomic number ka periodic function hain.",
      },
      {
        term: "Group",
        definition:
          "A vertical column of the periodic table containing elements with the same number of valence electrons and similar chemical properties.",
        romanUrdu: "Periodic table ka amoodi column jisme yaksan valence electrons hon.",
      },
      {
        term: "Period",
        definition:
          "A horizontal row of the periodic table in which the elements have the same number of occupied shells.",
        romanUrdu: "Periodic table ki ufqi qatar.",
      },
      {
        term: "Atomic radius",
        definition:
          "One half of the distance between the nuclei of two adjacent atoms of the same element bonded together.",
        romanUrdu: "Aik hi element ke do juday atoms ke nucleus ke faasle ka nisf.",
        sideNote:
          "Atomic radius decreases across a period (nuclear charge rises) and increases down a group (new shells added).",
      },
      {
        term: "Ionisation energy",
        definition:
          "The minimum amount of energy required to remove the most loosely bound electron from an isolated gaseous atom.",
        romanUrdu: "Gaseous atom se sab se dheela electron nikaalne ki kam se kam tawanai.",
        unit: "kJ/mol",
      },
      {
        term: "Electronegativity",
        definition:
          "The tendency of an atom to attract the shared pair of electrons towards itself in a covalent bond.",
        romanUrdu: "Covalent bond mein sanjhe electrons ko apni taraf kheenchne ka rujhaan.",
        sideNote:
          "Fluorine is the most electronegative element (4.0 on the Pauling scale).",
      },
      {
        term: "Transition element",
        definition:
          "An element whose atom or a stable ion possesses a partially filled d-subshell.",
        romanUrdu: "Aisa element jiske atom ya ion mein d-subshell adhoori bhari ho.",
      },
    ],
  },
  {
    subject: "chemistry",
    chapterLabel: "Solutions, Electrochemistry & Reactivity",
    keywords: ["solution", "electrochemistry", "chemical reactivity", "experimental technique"],
    terms: [
      {
        term: "Solution",
        definition:
          "A homogeneous mixture of two or more substances whose composition can be varied within certain limits.",
        romanUrdu: "Do ya zyada ashya ka yaksan mixture.",
      },
      {
        term: "Molarity",
        definition:
          "The number of moles of solute dissolved per cubic decimetre (litre) of solution.",
        romanUrdu: "Fi litre mehlool mein ghule hue solute ke moles ki tadaad.",
        unit: "mol/dm^3",
        formula: "M = moles of solute / volume of solution in dm^3",
        sideNote:
          "Molarity is per litre of SOLUTION, not per litre of solvent. Molality is per kg of solvent.",
      },
      {
        term: "Oxidation",
        definition:
          "The loss of electrons by an atom or ion, or an increase in its oxidation number.",
        romanUrdu: "Electrons ka khona ya oxidation number ka barhna.",
        sideNote:
          "Remember OIL RIG: Oxidation Is Loss, Reduction Is Gain.",
      },
      {
        term: "Reduction",
        definition:
          "The gain of electrons by an atom or ion, or a decrease in its oxidation number.",
        romanUrdu: "Electrons ka hasil karna ya oxidation number ka kam hona.",
      },
      {
        term: "Electrolysis",
        definition:
          "The process of chemical decomposition of an electrolyte by the passage of an electric current through it.",
        romanUrdu: "Bijli guzar kar electrolyte ko toadne ka amal.",
      },
      {
        term: "Electrochemical series",
        definition:
          "An arrangement of elements in order of their increasing standard reduction potential (tendency to gain electrons).",
        romanUrdu: "Elements ki reduction potential ke hisaab se tarteeb.",
      },
      {
        term: "Filtration",
        definition:
          "A technique used to separate an insoluble solid from a liquid by passing the mixture through a porous medium.",
        romanUrdu: "Ghair-hal-pazeer thos ko maye se alag karne ka tareeqa.",
      },
      {
        term: "Crystallisation",
        definition:
          "The process of obtaining pure crystals of a substance from its saturated solution on cooling.",
        romanUrdu: "Saturated mehlool ko thanda kar ke khalis crystals hasil karna.",
      },
    ],
  },
  {
    subject: "chemistry",
    chapterLabel: "Water, Biochemistry, Industry & Environment",
    keywords: ["water", "biochemistry", "chemical industries", "environmental chemistry"],
    terms: [
      {
        term: "Hard water",
        definition:
          "Water that does not produce lather readily with soap because it contains dissolved salts of calcium and magnesium.",
        romanUrdu: "Aisa pani jo soap ke sath jhaag nahi deta kyunke usme calcium aur magnesium ke namkiyat hain.",
      },
      {
        term: "Temporary hardness",
        definition:
          "Hardness of water caused by dissolved bicarbonates of calcium and magnesium, which can be removed by boiling.",
        romanUrdu: "Bicarbonates se hone wali sakhti jo ubaal kar door ho jati hai.",
      },
      {
        term: "Permanent hardness",
        definition:
          "Hardness caused by dissolved sulphates and chlorides of calcium and magnesium, which cannot be removed by boiling.",
        romanUrdu: "Sulphates aur chlorides se hone wali sakhti jo ubaalne se door nahi hoti.",
      },
      {
        term: "Carbohydrates",
        definition:
          "Polyhydroxy aldehydes or ketones, or compounds that yield them on hydrolysis, serving as the main source of energy.",
        romanUrdu: "Tawanai ka bara zariya - polyhydroxy aldehyde ya ketone.",
      },
      {
        term: "Protein",
        definition:
          "A high molecular mass polymer of alpha-amino acids joined together by peptide linkages.",
        romanUrdu: "Alpha-amino acids ka bara polymer jo peptide bond se juda ho.",
      },
      {
        term: "Acid rain",
        definition:
          "Rain having a pH less than 5.6, caused by dissolution of oxides of sulphur and nitrogen in atmospheric moisture.",
        romanUrdu: "Aisi barish jiska pH 5.6 se kam ho, sulphur aur nitrogen oxides ki wajah se.",
      },
      {
        term: "Ozone depletion",
        definition:
          "The thinning of the ozone layer of the stratosphere, mainly caused by chlorofluorocarbons.",
        romanUrdu: "Ozone layer ka patla hona, khaas tor par CFCs ki wajah se.",
      },
      {
        term: "Solvay process",
        definition:
          "The industrial process for manufacturing sodium carbonate from brine, limestone and ammonia.",
        romanUrdu: "Brine, limestone aur ammonia se sodium carbonate banane ka sanati amal.",
      },
    ],
  },
  {
    subject: "math",
    chapterLabel: "Numbers, Logarithms, Ratio & Variation",
    keywords: ["real and complex numbers", "logarithm", "ratio and proportion", "variation", "exponents", "percentage"],
    terms: [
      {
        term: "Rational number",
        definition:
          "A number which can be expressed in the form p/q where p and q are integers and q is not zero.",
        romanUrdu: "Aisa number jo p/q ki shakal mein likha ja sake jahan q sifar na ho.",
      },
      {
        term: "Irrational number",
        definition:
          "A real number which cannot be expressed in the form p/q with integers p and q.",
        romanUrdu: "Aisa haqeeqi number jo p/q ki shakal mein na likha ja sake.",
        sideNote:
          "Examples: sqrt(2), pi, e.",
      },
      {
        term: "Complex number",
        definition:
          "A number of the form a + bi where a and b are real numbers and i = sqrt(-1).",
        romanUrdu: "a + bi ki shakal ka number jahan i = sqrt(-1).",
        formula: "z = a + bi",
      },
      {
        term: "Logarithm",
        definition:
          "The logarithm of a number to a given base is the exponent to which the base must be raised to obtain that number.",
        romanUrdu: "Wo power jisme base ko uthane par number hasil ho.",
        formula: "if a^x = n then log_a n = x",
      },
      {
        term: "Characteristic",
        definition:
          "The integral part of a common logarithm.",
        romanUrdu: "Common logarithm ka sahih adad wala hissa.",
      },
      {
        term: "Mantissa",
        definition:
          "The decimal (fractional) part of a common logarithm, which is always positive.",
        romanUrdu: "Logarithm ka aashariya wala hissa jo hamesha musbat hota hai.",
      },
      {
        term: "Direct variation",
        definition:
          "A relation in which two quantities increase or decrease together so that their ratio remains constant.",
        romanUrdu: "Aisa taluq jisme do miqdaarein sath barhein ya kam hon.",
        formula: "y = kx",
      },
      {
        term: "Inverse variation",
        definition:
          "A relation in which an increase in one quantity produces a proportional decrease in the other, their product remaining constant.",
        romanUrdu: "Aisa taluq jisme ek barhe to doosri kam ho.",
        formula: "xy = k",
      },
    ],
  },
  {
    subject: "math",
    chapterLabel: "Statistics, Data & Index Numbers",
    keywords: ["basic statistics", "introduction to statistics", "presentation of data", "central tendency", "dispersion", "index number", "correlation", "regression", "sampling", "estimation", "statistical inference"],
    terms: [
      {
        term: "Statistics",
        definition:
          "The science of collecting, organising, presenting, analysing and interpreting numerical data to assist in making effective decisions.",
        romanUrdu: "Aankron ko jama karne, pesh karne aur tajziya karne ka ilm.",
      },
      {
        term: "Mean",
        definition:
          "The sum of all the values of a data set divided by the number of values.",
        romanUrdu: "Tamam qeematon ka majmoo taqseem unki tadaad.",
        formula: "Mean = Sum of values / n",
        sideNote:
          "The mean is affected by extreme values; the median is not.",
      },
      {
        term: "Median",
        definition:
          "The middle value of a data set when the values are arranged in ascending or descending order.",
        romanUrdu: "Tarteeb dene ke baad darmiyani qeemat.",
      },
      {
        term: "Mode",
        definition:
          "The value which occurs most frequently in a data set.",
        romanUrdu: "Wo qeemat jo sab se zyada baar aaye.",
        sideNote:
          "A data set may have no mode, one mode, or more than one mode.",
      },
      {
        term: "Range",
        definition:
          "The difference between the largest and the smallest value in a data set.",
        romanUrdu: "Sab se bari aur sab se choti qeemat ka farq.",
        formula: "Range = Xmax - Xmin",
      },
      {
        term: "Standard deviation",
        definition:
          "The positive square root of the arithmetic mean of the squared deviations of the values from their mean.",
        romanUrdu: "Mean se farq ke murabba ke ausat ka musbat square root.",
        formula: "S = sqrt( sum(x - xbar)^2 / n )",
      },
      {
        term: "Index number",
        definition:
          "A statistical measure designed to show changes in a variable or a group of related variables with respect to time, geographical location or other characteristic.",
        romanUrdu: "Aisa paimana jo waqt ke sath tabdeeli dikhaye.",
      },
      {
        term: "Correlation",
        definition:
          "The statistical relationship or degree of association between two or more variables.",
        romanUrdu: "Do ya zyada variables ke darmiyan taluq ki shiddat.",
        sideNote:
          "Correlation does not imply causation - a favourite conceptual question.",
      },
      {
        term: "Random sample",
        definition:
          "A sample selected in such a way that every member of the population has an equal chance of being included.",
        romanUrdu: "Aisa namoona jisme har fard ke chunne ke barabar mauqe hon.",
      },
    ],
  },
  {
    subject: "math",
    chapterLabel: "Linear Programming, Conics, Vectors & Graphs",
    keywords: ["linear inequalities", "linear programming", "conic section", "vector", "linear graphs"],
    terms: [
      {
        term: "Linear inequality",
        definition:
          "An inequality involving a linear expression, such as ax + by < c.",
        romanUrdu: "Aisi na-mosawaat jisme linear expression ho.",
      },
      {
        term: "Feasible region",
        definition:
          "The region of the plane containing all the points that satisfy every constraint of a linear programming problem simultaneously.",
        romanUrdu: "Wo hissa jahan tamam sharait ek sath poori hoti hain.",
        sideNote:
          "The optimal value always occurs at a corner (vertex) of the feasible region.",
      },
      {
        term: "Objective function",
        definition:
          "The linear function which is to be maximised or minimised in a linear programming problem.",
        romanUrdu: "Wo function jise zyada se zyada ya kam se kam karna ho.",
      },
      {
        term: "Conic section",
        definition:
          "A curve obtained by the intersection of a plane with a right circular cone: circle, parabola, ellipse or hyperbola.",
        romanUrdu: "Cone ko plane se kaatne par banne wala curve.",
      },
      {
        term: "Parabola",
        definition:
          "The locus of a point which moves so that its distance from a fixed point (focus) equals its distance from a fixed line (directrix).",
        romanUrdu: "Aisa nuqta jiska focus aur directrix se faasla barabar rahe.",
        formula: "y^2 = 4ax",
      },
      {
        term: "Ellipse",
        definition:
          "The locus of a point the sum of whose distances from two fixed points (foci) is constant.",
        romanUrdu: "Aisa nuqta jiske do foci se faaslon ka majmoo sabit rahe.",
        formula: "x^2/a^2 + y^2/b^2 = 1",
      },
      {
        term: "Scalar product",
        definition:
          "The product of the magnitudes of two vectors and the cosine of the angle between them, giving a scalar.",
        romanUrdu: "Do vectors ke magnitude aur unke darmiyan zaawiye ke cosine ka hasil.",
        formula: "A.B = |A||B| cos(theta)",
      },
      {
        term: "Vector product",
        definition:
          "The product of two vectors giving a vector perpendicular to both, with magnitude equal to |A||B| sin(theta).",
        romanUrdu: "Do vectors ka aisa hasil jo dono par amoodi vector deta hai.",
        formula: "A x B = |A||B| sin(theta) n",
      },
    ],
  },
  {
    subject: "math",
    chapterLabel: "Business & Financial Mathematics",
    keywords: ["financial mathematics", "consumer mathematics", "zakat", "ushr", "inheritance", "simple and compound interest", "annuit", "present value", "trade and discount"],
    terms: [
      {
        term: "Simple interest",
        definition:
          "Interest calculated only on the original principal for the whole period of the loan.",
        romanUrdu: "Sirf asal raqam par lagaya jane wala sood.",
        formula: "S.I. = P x R x T / 100",
      },
      {
        term: "Compound interest",
        definition:
          "Interest calculated on the principal together with the interest already accumulated in previous periods.",
        romanUrdu: "Asal raqam ke sath pehle ka sood mila kar lagaya jane wala sood.",
        formula: "A = P(1 + r/n)^(nt)",
      },
      {
        term: "Annuity",
        definition:
          "A sequence of equal payments made at equal intervals of time.",
        romanUrdu: "Barabar waqfon par ki jane wali barabar adaigiyan.",
      },
      {
        term: "Present value",
        definition:
          "The value today of a sum of money that is to be received or paid at a future date, discounted at a given rate.",
        romanUrdu: "Mustaqbil ki raqam ki aaj ki qeemat.",
      },
      {
        term: "Zakat",
        definition:
          "An obligatory Islamic levy charged at the rate of 2.5 percent per annum on the wealth of a Muslim held above the nisab for one lunar year.",
        romanUrdu: "Nisab se zyada maal par salana 2.5 fisad ki farz Islami adaigi.",
      },
      {
        term: "Ushr",
        definition:
          "An Islamic levy on agricultural produce, charged at 10 percent on naturally irrigated land and 5 percent on artificially irrigated land.",
        romanUrdu: "Zarai paidawar par lagne wala Islami hissa - qudrati sairaab par 10 fisad, masnooi par 5 fisad.",
      },
      {
        term: "Discount",
        definition:
          "A reduction allowed on the marked price or the list price of an article.",
        romanUrdu: "Maal ki likhi hui qeemat par di jane wali kami.",
      },
      {
        term: "Markup",
        definition:
          "The amount added to the cost price of an article to arrive at its selling price.",
        romanUrdu: "Cost price par lagaya gaya izafa taake selling price bane.",
      },
    ],
  },
  {
    subject: "cs",
    chapterLabel: "Problem Solving, Networks & Web Development",
    keywords: ["problem solving", "network", "designing website", "web development", "publishing", "internet", "emerging technolog"],
    terms: [
      {
        term: "Algorithm",
        definition:
          "A finite, ordered set of unambiguous steps that solves a given problem in a finite amount of time.",
        romanUrdu: "Kisi masle ko hal karne ke liye mehdood aur wazeh qadmon ki tarteeb.",
      },
      {
        term: "Flowchart",
        definition:
          "A pictorial representation of an algorithm using standard geometric symbols connected by arrows.",
        romanUrdu: "Algorithm ki tasveeri shakal jo khaas symbols se banti hai.",
      },
      {
        term: "Computer network",
        definition:
          "A collection of two or more computers connected together so that they can share data and resources.",
        romanUrdu: "Do ya zyada computers ka aisa majmua jo data share kar sakein.",
      },
      {
        term: "LAN (Local Area Network)",
        definition:
          "A network that connects computers within a small geographical area such as a single building or campus.",
        romanUrdu: "Chhote ilaqe mein computers ko jorne wala network.",
      },
      {
        term: "Protocol",
        definition:
          "A set of agreed rules that governs how data is transmitted between devices on a network.",
        romanUrdu: "Wo usool jinke tehat network par data bheja jata hai.",
      },
      {
        term: "HTML",
        definition:
          "HyperText Markup Language, the standard markup language used to create the structure and content of web pages.",
        romanUrdu: "Web page ki banawat banane wali markup language.",
        sideNote:
          "HTML is a markup language, not a programming language - it has no logic or loops.",
      },
      {
        term: "Hyperlink",
        definition:
          "A reference in a web document which, when clicked, takes the user to another document or another part of the same document.",
        romanUrdu: "Aisa link jis par click kar ke doosray page par jaya ja sake.",
      },
      {
        term: "Web browser",
        definition:
          "An application software used to access, retrieve and display web pages from the World Wide Web.",
        romanUrdu: "Aisa software jis se web pages dekhe jate hain.",
      },
    ],
  },
  {
    subject: "cs",
    chapterLabel: "Digital Logic, Operating Systems & Security",
    keywords: ["digital logic", "boolean algebra", "operating system", "security", "privacy", "cyber ethic"],
    terms: [
      {
        term: "Boolean algebra",
        definition:
          "The algebra of logic which deals with variables that can take only two values, 0 and 1 (false and true).",
        romanUrdu: "Aisi algebra jisme variables sirf 0 ya 1 ho sakte hain.",
      },
      {
        term: "Truth table",
        definition:
          "A table that lists every possible combination of input values of a logic circuit together with the corresponding output.",
        romanUrdu: "Aisi table jo har mumkin input aur uske output ko dikhati hai.",
        sideNote:
          "A circuit with n inputs has 2^n rows in its truth table.",
      },
      {
        term: "Operating system",
        definition:
          "System software that acts as an interface between the user and the computer hardware and manages all the resources of the system.",
        romanUrdu: "Aisa software jo user aur hardware ke darmiyan rabta karta aur wasail chalata hai.",
      },
      {
        term: "Multitasking",
        definition:
          "The capability of an operating system to execute more than one task apparently at the same time.",
        romanUrdu: "Operating system ki wo salahiyat jisme ek waqt mein kai kaam chalein.",
      },
      {
        term: "Computer virus",
        definition:
          "A malicious program that attaches itself to another program and replicates, damaging data or disrupting the working of the computer.",
        romanUrdu: "Aisa nuqsan deh program jo khud ko phailata aur data kharab karta hai.",
      },
      {
        term: "Firewall",
        definition:
          "Hardware or software that monitors incoming and outgoing network traffic and blocks unauthorised access to a network.",
        romanUrdu: "Aisa nizaam jo ghair-mujaz rasai rokta hai.",
      },
      {
        term: "Encryption",
        definition:
          "The process of converting plain, readable data into an unreadable coded form so that it cannot be understood by unauthorised persons.",
        romanUrdu: "Data ko aise code mein badalna jo ghair-mujaz shakhs na parh sake.",
      },
      {
        term: "Cyber ethics",
        definition:
          "The code of responsible and acceptable behaviour that should be observed while using computers and the internet.",
        romanUrdu: "Computer aur internet istemal karte waqt zimmedarana rawaiyye ke usool.",
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
  if (s.includes("bio")) return "biology";
  if (s.includes("account")) return "accounting";
  if (s.includes("econom")) return "economics";
  if (s.includes("bank")) return "banking";
  if (s.includes("commerc") || s.includes("geograph")) return "commerce";
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
