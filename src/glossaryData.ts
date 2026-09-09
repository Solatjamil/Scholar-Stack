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
