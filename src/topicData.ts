/**
 * Chapter-level study topics for the Chapter-Wise Study desk.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * getTopicsForChapter() in ChapterWiseStudy.tsx only recognised 17 chapter
 * keywords across the whole 322-chapter curriculum, so almost every chapter
 * fell through to a single generic "Core Syllabus Outline" placeholder that
 * mentioned "Genesis of Pakistan" regardless of the subject being studied.
 *
 * It also shipped 12 hardcoded YouTube embed IDs. Every one of them was
 * checked against the YouTube oEmbed API and every one returned 404 — they
 * were fabricated. Students saw dead iframes captioned "Sabaq Foundation:
 * Coulomb's Law Explanation". Rather than invent more IDs, each topic here
 * carries a SEARCH QUERY, and the UI builds a youtube.com/results link
 * scoped to the real Sabaq Foundation channel (verified: youtube.com/@sabaqpk
 * and sabaq.pk both resolve 200). A search link cannot rot the way a
 * specific video ID does.
 *
 * Keyed by subject, then by a lowercase keyword found in the chapter name.
 * Longest keyword wins, so "aromatic hydrocarbons" beats "hydrocarbons".
 */

export interface TopicSeed {
  name: string;
  /** Roman-Urdu explanation, matching how Pakistani students actually revise. */
  romanUrdu: string;
  /** Formula sheet / key content. Urdu subjects use native script. */
  content: string;
  /** Search terms; the UI turns these into a real YouTube search URL. */
  search: string;
  diagramType:
    | "physics-coulomb"
    | "physics-ohms"
    | "chemistry-structure"
    | "math-graph"
    | "biology-cell"
    | "cs-spa"
    | "english-tree"
    | "urdu-calligraphy"
    | "generic-mindmap";
}

type SubjectTopics = Record<string, TopicSeed[]>;

/* =============================== PHYSICS =============================== */
const physics: SubjectTopics = {
  "kinematics": [
    {
      name: "Equations of Uniformly Accelerated Motion",
      romanUrdu:
        "Teen equations yaad karna zaroori hain: v = u + at, S = ut + ½at², aur 2aS = v² - u². Yeh sirf tab lagti hain jab acceleration constant ho aur motion straight line me ho. Numerical me pehle likhein kaunsi quantity given hai aur kaunsi required, phir formula select karein.",
      content:
        "v = u + at\nS = ut + ½at²\n2aS = v² − u²\n\nFree fall: a = g = 9.8 m s⁻², u = 0 for a dropped body.\nUpward motion: a = −g, and at the highest point v = 0.",
      search: "sabaq foundation equations of motion physics",
      diagramType: "math-graph",
    },
    {
      name: "Distance vs Displacement, Speed vs Velocity",
      romanUrdu:
        "Distance scalar hai aur kabhi kam nahi hoti; displacement vector hai aur zero bhi ho sakti hai. Agar koi banda circular track ka ek chakkar pura kare to distance = 2πr magar displacement = 0. Board me yeh comparison bohat baar aata hai.",
      content:
        "Distance: total path length, scalar, always positive.\nDisplacement: shortest directed distance, vector, can be zero.\nSpeed = distance/time (scalar)\nVelocity = displacement/time (vector)",
      search: "sabaq foundation distance and displacement",
      diagramType: "generic-mindmap",
    },
  ],
  "force and motion": [
    {
      name: "Newton's Three Laws of Motion",
      romanUrdu:
        "Pehla law inertia define karta hai, dusra F = ma deta hai, teesra action-reaction ka hai. Yaad rakhein action aur reaction hamesha DO alag ajsaam par lagte hain, isi liye woh cancel nahi hote.",
      content:
        "1st law (inertia): a body stays at rest or in uniform motion unless acted on by a net force.\n2nd law: F = ma = rate of change of momentum.\n3rd law: to every action there is an equal and opposite reaction, acting on a different body.",
      search: "sabaq foundation newton laws of motion",
      diagramType: "generic-mindmap",
    },
    {
      name: "Momentum and Its Conservation",
      romanUrdu:
        "p = mv, aur isolated system me total momentum constant rehti hai. Collision ke numericals me pehle m₁u₁ + m₂u₂ likhein, phir m₁v₁ + m₂v₂ ke barabar rakhein. Units kg m s⁻¹ ya N s hain.",
      content:
        "p = mv  (SI unit: kg m s⁻¹)\nConservation: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂\nImpulse = F × t = change in momentum",
      search: "sabaq foundation momentum conservation physics",
      diagramType: "generic-mindmap",
    },
  ],
  "work and energy": [
    {
      name: "Work, Power and the Energy Equations",
      romanUrdu:
        "Work tab hota hai jab force ke direction me displacement ho. Agar force aur displacement ke darmiyan 90° ka angle ho to work zero hota hai — yeh MCQ me bohat aata hai. Power kaam karne ki rate hai.",
      content:
        "W = F d cos θ   (joule)\nK.E. = ½mv²\nP.E. = mgh\nP = W/t = Fv   (watt; 1 hp = 746 W)\nEfficiency = (output/input) × 100",
      search: "sabaq foundation work power energy physics",
      diagramType: "generic-mindmap",
    },
  ],
  "gravitation": [
    {
      name: "Newton's Law of Universal Gravitation",
      romanUrdu:
        "F = Gm₁m₂/r². G universal constant hai 6.67 × 10⁻¹¹. Zameen ki surface par g = GM/R², is liye altitude barhne se g kam ho jati hai. Escape velocity 11.2 km/s hai.",
      content:
        "F = G m₁m₂ / r²,  G = 6.67 × 10⁻¹¹ N m² kg⁻²\ng = GM/R² = 9.8 m s⁻²\nEscape velocity v = √(2gR) ≈ 11.2 km s⁻¹\nOrbital velocity v = √(GM/r)",
      search: "sabaq foundation law of gravitation physics",
      diagramType: "generic-mindmap",
    },
  ],
  "electrostatics": [
    {
      name: "Coulomb's Law of Electrostatics",
      romanUrdu:
        "Do point charges ke darmiyan force unke product ke directly proportional aur distance ke square ke inversely proportional hoti hai. Medium badalne se force kam ho jati hai kyunke dielectric constant divide karta hai.",
      content:
        "F = k q₁q₂ / r²,  k = 9 × 10⁹ N m² C⁻²\nIn a medium: F_med = F_vac / εr\nElectric field E = F/q = kq/r²  (N C⁻¹)\nPotential V = kq/r  (volt)",
      search: "sabaq foundation coulomb law electrostatics",
      diagramType: "physics-coulomb",
    },
  ],
  "current electricity": [
    {
      name: "Ohm's Law and Resistor Combinations",
      romanUrdu:
        "V = IR constant temperature par. Series me current same rehti hai aur resistances jama hoti hain; parallel me voltage same rehti hai aur reciprocals jama hote hain. Parallel ka equivalent hamesha sab se choti resistance se bhi kam hota hai.",
      content:
        "V = IR\nSeries: Re = R₁ + R₂ + R₃\nParallel: 1/Re = 1/R₁ + 1/R₂ + 1/R₃\nPower P = VI = I²R = V²/R\nJoule heating H = I²Rt",
      search: "sabaq foundation ohms law series parallel",
      diagramType: "physics-ohms",
    },
  ],
  "electromagnetism": [
    {
      name: "Electromagnetic Induction and the Transformer",
      romanUrdu:
        "Faraday ka law kehta hai ke flux change hone par EMF induce hoti hai. Lenz ka law direction batata hai — induced current hamesha apni wajah ki mukhalifat karti hai, jo conservation of energy ka nateeja hai.",
      content:
        "e = −N dΦ/dt   (Faraday + Lenz)\nTransformer: Vs/Vp = Ns/Np\nStep-up: Ns > Np (V increases, I decreases)\nIdeal transformer: VpIp = VsIs",
      search: "sabaq foundation electromagnetic induction transformer",
      diagramType: "generic-mindmap",
    },
  ],
  "oscillations": [
    {
      name: "Simple Harmonic Motion and the Pendulum",
      romanUrdu:
        "SHM me acceleration displacement ke directly proportional hoti hai magar direction ulta hota hai: a = −ω²x. Simple pendulum ka time period sirf length aur g par depend karta hai, bob ke mass par bilkul nahi.",
      content:
        "a = −ω²x\nT = 2π√(L/g)   (simple pendulum)\nT = 2π√(m/k)   (mass–spring)\nf = 1/T,  ω = 2πf",
      search: "sabaq foundation simple harmonic motion pendulum",
      diagramType: "math-graph",
    },
  ],
  "waves": [
    {
      name: "Wave Equation, Sound and Echo",
      romanUrdu:
        "v = fλ har wave par lagti hai. Sound longitudinal wave hai jo compressions aur rarefactions banati hai. Echo sunne ke liye reflecting surface kam az kam 17 m door hona chahiye.",
      content:
        "v = fλ\nSpeed of sound in air ≈ 340 m s⁻¹\nEcho requires reflector ≥ 17 m away (ear retains sound 0.1 s)\nLongitudinal: vibration ∥ propagation. Transverse: vibration ⊥ propagation.",
      search: "sabaq foundation waves sound echo physics",
      diagramType: "math-graph",
    },
  ],
  "light": [
    {
      name: "Reflection, Refraction and Total Internal Reflection",
      romanUrdu:
        "Snell's law n = sin i / sin r. Jab light denser se rarer medium me jaye aur angle critical angle se barh jaye to total internal reflection hoti hai — yahi optical fibre aur heere ki chamak ki wajah hai.",
      content:
        "Laws of reflection: i = r, all in one plane.\nSnell: n = sin i / sin r = c/v\nCritical angle: sin C = 1/n  (glass ≈ 42°)\nLens formula: 1/f = 1/v − 1/u,  P = 1/f (dioptre)",
      search: "sabaq foundation refraction total internal reflection",
      diagramType: "generic-mindmap",
    },
  ],
  "heat": [
    {
      name: "Specific Heat, Latent Heat and Thermal Expansion",
      romanUrdu:
        "Q = mcΔT temperature change ke liye, aur Q = mL state change ke liye. State change ke doran temperature constant rehta hai — yeh graph wala sawal board me aata hai.",
      content:
        "Q = mcΔT   (c of water = 4200 J kg⁻¹ K⁻¹)\nQ = mL   (Lf ice = 3.36 × 10⁵ J/kg, Lv water = 2.26 × 10⁶ J/kg)\nCharles: V/T = constant;  Boyle: PV = constant",
      search: "sabaq foundation specific heat latent heat",
      diagramType: "math-graph",
    },
  ],
  "thermodynamics": [
    {
      name: "Laws of Thermodynamics and the Carnot Engine",
      romanUrdu:
        "Pehla law energy conservation hai: Q = ΔU + W. Carnot engine ki efficiency sirf source aur sink ke absolute temperatures par depend karti hai — temperatures hamesha kelvin me lein.",
      content:
        "1st law: Q = ΔU + W\nCarnot efficiency = 1 − T₂/T₁  (T in kelvin)\nIsothermal: ΔT = 0. Adiabatic: Q = 0.",
      search: "sabaq foundation thermodynamics carnot engine",
      diagramType: "math-graph",
    },
  ],
  "modern physics": [
    {
      name: "Photoelectric Effect and Quantum Basics",
      romanUrdu:
        "Einstein ka equation KE(max) = hf − W. Electrons tabhi nikalte hain jab frequency threshold se ooper ho — intensity barhane se sirf electrons ki tadaad barhti hai, unki energy nahi.",
      content:
        "E = hf = hc/λ,  h = 6.63 × 10⁻³⁴ J s\nKE(max) = hf − W\nThreshold frequency f₀ = W/h\n1 eV = 1.6 × 10⁻¹⁹ J",
      search: "sabaq foundation photoelectric effect physics",
      diagramType: "generic-mindmap",
    },
  ],
  "nuclear": [
    {
      name: "Radioactivity and Half-Life",
      romanUrdu:
        "Half-life woh waqt hai jis me aadhe nuclei decay ho jayen. Yeh temperature ya pressure se bilkul mutasir nahi hoti. n half-lives ke baad baqi hissa (½)ⁿ hota hai.",
      content:
        "Remaining after n half-lives = N₀(½)ⁿ\nα-particle: helium nucleus. β: electron. γ: EM radiation.\nE = mc²  (mass–energy equivalence)",
      search: "sabaq foundation radioactivity half life",
      diagramType: "generic-mindmap",
    },
  ],
};

/* ============================== CHEMISTRY ============================== */
const chemistry: SubjectTopics = {
  'fundamentals of chemistry': [
    {
      name: 'Fundamentals: Atoms, Molecules and Formulas',
      romanUrdu: 'Atom sab se choti unit hai, molecule do ya zyada atoms ka jor. Empirical formula simplest ratio deta hai aur molecular formula asal tadaad. Avogadro number 6.02 × 10²³ hai.',
      content: "Atomic mass unit, molecular mass, formula mass.\nEmpirical formula = simplest whole-number ratio.\nMolecular formula = n × empirical formula.\nAvogadro's number = 6.02 × 10²³",
      search: 'sabaq foundation fundamentals of chemistry class 9',
      diagramType: 'chemistry-structure',
    },
  ],
  'physical states': [
    {
      name: 'Physical States of Matter and Gas Laws',
      romanUrdu: "Boyle's law PV constant, Charles' law V/T constant. Solid, liquid aur gas me farq intermolecular forces aur kinetic energy ka hai. Diffusion gases me sab se tez hoti hai.",
      content: 'Boyle: P₁V₁ = P₂V₂ (constant T)\nCharles: V₁/T₁ = V₂/T₂ (constant P)\nGeneral gas equation: PV = nRT,  R = 8.314 J mol⁻¹ K⁻¹\nSTP: 0 °C, 1 atm, molar volume 22.4 dm³',
      search: 'sabaq foundation physical states of matter gas laws',
      diagramType: 'chemistry-structure',
    },
  ],
  'solution': [
    {
      name: 'Solutions and Concentration Units',
      romanUrdu: 'Solution solute aur solvent ka homogeneous mixture hai. Molarity moles per dm³ hai. Solubility temperature ke sath badalti hai — solids me barhti hai magar gases me kam hoti hai.',
      content: 'Molarity M = moles of solute / volume of solution (dm³)\nMolality m = moles of solute / mass of solvent (kg)\n%w/w, %w/v, ppm\nColloid, suspension and true solution differ in particle size.',
      search: 'sabaq foundation solutions concentration molarity',
      diagramType: 'chemistry-structure',
    },
  ],
  'chemical reactivity': [
    {
      name: 'Chemical Reactivity and the Activity Series',
      romanUrdu: 'Reactivity series me ooper wale metals zyada reactive hain. Zyada reactive metal kam reactive ko uske salt se displace kar deta hai. Alkali metals paani ke sath shadeed reaction karte hain.',
      content: 'Activity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au\nA more reactive metal displaces a less reactive one from its salt.\nMetals lose electrons (oxidised); non-metals gain electrons.',
      search: 'sabaq foundation chemical reactivity metals non metals',
      diagramType: 'chemistry-structure',
    },
  ],
  'biochemistry': [
    {
      name: 'Biochemistry: Carbohydrates, Proteins, Lipids',
      romanUrdu: 'Carbohydrates energy dete hain, proteins amino acids se bante hain aur lipids energy store karte hain. Enzymes protein hain jo reaction tez karte hain aur temperature se mutasir hote hain.',
      content: 'Carbohydrates: mono (glucose), di (sucrose), poly (starch, cellulose)\nProteins: amino acids joined by peptide bonds\nLipids: fats and oils, esters of glycerol and fatty acids\nVitamins: water-soluble (B, C) and fat-soluble (A, D, E, K)',
      search: 'sabaq foundation biochemistry carbohydrates proteins lipids',
      diagramType: 'chemistry-structure',
    },
  ],
  'atmosphere': [
    {
      name: 'The Atmosphere and Air Pollution',
      romanUrdu: 'Atmosphere ki layers aur unme temperature ka behaviour yaad rakhein. Ozone layer stratosphere me hai jo UV rays rokti hai. CFCs isko nuqsan pohanchate hain.',
      content: 'Layers: troposphere, stratosphere (ozone), mesosphere, thermosphere\nAir: 78% N₂, 21% O₂, 0.9% Ar, 0.03% CO₂\nPollutants: CO, SO₂, NOx, CFCs, particulates\nGreenhouse effect and global warming.',
      search: 'sabaq foundation atmosphere air pollution chemistry',
      diagramType: 'generic-mindmap',
    },
  ],
  'water': [
    {
      name: 'Water: Hardness, Softening and Pollution',
      romanUrdu: 'Paani ko universal solvent kehte hain. Hardness Ca aur Mg salts ki wajah se hoti hai. Temporary hardness ubaal kar door hoti hai, permanent ke liye washing soda ya ion exchange chahiye.',
      content: "Temporary hardness: Ca(HCO₃)₂ — removed by boiling or Clark's method.\nPermanent hardness: CaSO₄, MgSO₄ — removed by washing soda or ion exchange.\nDisadvantages: wastes soap, scale in boilers.",
      search: 'sabaq foundation water hardness softening chemistry',
      diagramType: 'chemistry-structure',
    },
  ],
  'chemical industr': [
    {
      name: 'Chemical Industries of Pakistan',
      romanUrdu: 'Pakistan ki ahem industries: urea aur fertiliser, cement, sugar, paper aur petrochemical. Solvay process se sodium carbonate banta hai aur Haber process se ammonia.',
      content: 'Solvay process → Na₂CO₃ (raw: NaCl, CaCO₃, NH₃)\nHaber process → NH₃ (N₂ + 3H₂, Fe catalyst, 450 °C, 200 atm)\nContact process → H₂SO₄ (V₂O₅ catalyst)\nMajor sectors: fertiliser, cement, sugar, paper, petrochemicals.',
      search: 'chemical industries of pakistan urea cement',
      diagramType: 'generic-mindmap',
    },
  ],
  's-block': [
    {
      name: 's-Block Elements: Alkali and Alkaline Earth Metals',
      romanUrdu: 'Group IA alkali metals aur IIA alkaline earth metals hain. Yeh bohat reactive hain is liye qudrat me free nahi milte. Neeche jaate hue reactivity barhti hai.',
      content: 'Group IA: Li, Na, K, Rb, Cs — 1 valence electron, +1 ions, very reactive with water.\nGroup IIA: Be, Mg, Ca, Sr, Ba — +2 ions.\nReactivity increases down the group; ionisation energy decreases.',
      search: 's block elements alkali alkaline earth metals',
      diagramType: 'chemistry-structure',
    },
  ],
  'group iiia': [
    {
      name: 'Group IIIA and IVA Elements',
      romanUrdu: 'Boron non-metal hai magar group me neeche aluminium metal hai — yeh metallic character barhne ki misal hai. Carbon catenation ki wajah se lakhon compounds banata hai.',
      content: 'Group IIIA: B, Al, Ga, In, Tl — +3 oxidation state.\nGroup IVA: C, Si, Ge, Sn, Pb — +2 and +4 states.\nMetallic character increases down both groups.\nCarbon shows catenation and allotropy (diamond, graphite).',
      search: 'group IIIA IVA elements chemistry class 12',
      diagramType: 'chemistry-structure',
    },
  ],
  'group va': [
    {
      name: 'Group VA and VIA Elements',
      romanUrdu: 'Nitrogen aur oxygen hawa ke bunyadi ajza hain. Nitrogen ka triple bond bohat mazboot hai is liye woh kam reactive hai. Sulphur ke oxides acid rain ki wajah bante hain.',
      content: 'Group VA: N, P, As, Sb, Bi — −3 to +5 states; N≡N is very stable.\nGroup VIA: O, S, Se, Te, Po — mostly −2 state.\nOxides: SO₂, SO₃, NO₂ are acidic and cause acid rain.',
      search: 'group VA VIA elements nitrogen sulphur',
      diagramType: 'chemistry-structure',
    },
  ],
  'halogen': [
    {
      name: 'The Halogens and the Noble Gases',
      romanUrdu: 'Halogens group VIIA me hain aur sab se reactive non-metals hain. Fluorine sab se zyada reactive hai. Noble gases ka outermost shell mukammal hai is liye woh inert hain.',
      content: 'Halogens: F, Cl, Br, I — diatomic, form −1 ions, oxidising agents.\nReactivity decreases down the group (F > Cl > Br > I).\nNoble gases: complete octet, chemically inert, used in lamps and welding.',
      search: 'halogens noble gases chemistry class 12',
      diagramType: 'chemistry-structure',
    },
  ],
  'transition': [
    {
      name: 'Transition Elements and Complexes',
      romanUrdu: 'Transition metals ke d-orbitals adhoore hote hain, isi liye woh rangeen compounds aur variable oxidation states dikhate hain. Yeh acche catalysts bhi hain.',
      content: 'Partially filled d-orbitals.\nProperties: variable oxidation states, coloured ions, catalytic activity, complex formation, paramagnetism.\nExamples: Fe in Haber, V₂O₅ in Contact, Ni in hydrogenation.',
      search: 'transition elements d block chemistry',
      diagramType: 'chemistry-structure',
    },
  ],
  'alkyl halide': [
    {
      name: 'Alkyl Halides and Their Reactions',
      romanUrdu: 'Alkyl halide me halogen carbon se juda hota hai. Yeh nucleophilic substitution karte hain — SN1 aur SN2 ka farq mechanism aur stereochemistry ka hai.',
      content: 'R–X (X = F, Cl, Br, I)\nSN2: one step, inversion, favoured by primary halides.\nSN1: two steps via carbocation, favoured by tertiary halides.\nElimination gives alkenes (with alcoholic KOH).',
      search: 'alkyl halides SN1 SN2 chemistry',
      diagramType: 'chemistry-structure',
    },
  ],
  'alcohol': [
    {
      name: 'Alcohols, Phenols and Ethers',
      romanUrdu: 'Alcohol me –OH group carbon se juda hai. Primary, secondary aur tertiary ka farq –OH wale carbon par attached carbons se hota hai. Phenol me –OH benzene ring par hota hai.',
      content: 'Alcohols R–OH: 1°, 2°, 3° depending on the carbon bearing –OH.\nOxidation: 1° → aldehyde → acid; 2° → ketone; 3° resists oxidation.\nPhenol: –OH on a benzene ring, weakly acidic.\nEthers R–O–R′: relatively inert, good solvents.',
      search: 'alcohols phenols ethers chemistry class 12',
      diagramType: 'chemistry-structure',
    },
  ],
  'aldehyde': [
    {
      name: 'Aldehydes and Ketones',
      romanUrdu: 'Dono me carbonyl group hai magar aldehyde chain ke aakhir me hota hai aur ketone darmiyan me. Aldehyde Tollens aur Fehling test dete hain, ketone nahi — yehi distinguishing test hai.',
      content: "Aldehyde R–CHO; Ketone R–CO–R′\nTollens' reagent: aldehyde gives a silver mirror; ketone does not.\nFehling's solution: aldehyde gives a red precipitate of Cu₂O.\nBoth undergo nucleophilic addition at the carbonyl carbon.",
      search: 'aldehydes ketones tollens fehling test',
      diagramType: 'chemistry-structure',
    },
  ],
  'carboxylic': [
    {
      name: 'Carboxylic Acids and Their Derivatives',
      romanUrdu: 'Carboxylic acid me –COOH group hota hai. Yeh weak acids hain magar carbonic acid se strong. Alcohol ke sath reaction karke ester banate hain jo khushbudar hote hain.',
      content: 'R–COOH, weak acids.\nWith alcohol (H₂SO₄) → ester + water (esterification, sweet-smelling).\nWith NaOH → salt + water; with Na₂CO₃ → CO₂ effervescence.\nDerivatives: esters, amides, acid halides, anhydrides.',
      search: 'carboxylic acids esterification chemistry',
      diagramType: 'chemistry-structure',
    },
  ],
  'macromolecule': [
    {
      name: 'Macromolecules and Polymers',
      romanUrdu: 'Polymer chote monomers se banta hai. Addition polymerisation me kuch nahi nikalta, condensation me paani ya HCl nikalta hai. Polythene, PVC aur nylon roz marra ki misalen hain.',
      content: 'Addition polymers: polythene, PVC, polystyrene (no by-product).\nCondensation polymers: nylon, polyester, bakelite (small molecule eliminated).\nNatural macromolecules: starch, cellulose, proteins, DNA.',
      search: 'macromolecules polymers chemistry class 12',
      diagramType: 'chemistry-structure',
    },
  ],
  "atomic structure": [
    {
      name: "Bohr's Model and Quantum Numbers",
      romanUrdu:
        "Bohr ne kaha electron sirf fixed orbits me ghoomta hai aur energy tabhi kharij karta hai jab orbit badle. Char quantum numbers: n size, l shape, m orientation, s spin. Pauli ke mutabiq do electrons ke chaaron numbers same nahi ho sakte.",
      content:
        "mvr = nh/2π\nE = hf = E₂ − E₁\nMax electrons in a shell = 2n²\nn = 1,2,3…; l = 0…n−1; m = −l…+l; s = ±½",
      search: "sabaq foundation atomic structure quantum numbers",
      diagramType: "chemistry-structure",
    },
  ],
  "chemical bonding": [
    {
      name: "Ionic, Covalent and Hydrogen Bonding",
      romanUrdu:
        "Ionic bond electrons ke complete transfer se banta hai, covalent sharing se. Electronegativity difference 1.7 se zyada ho to bond ionic hota hai. Hydrogen bonding hi wajah hai ke paani ka boiling point itna zyada hai.",
      content:
        "Ionic: metal + non-metal, complete transfer, high m.p., conducts when molten.\nCovalent: sharing, low m.p., usually non-conductor.\nΔEN > 1.7 → ionic; < 1.7 → polar covalent.\nH-bond: H attached to F, O or N.",
      search: "sabaq foundation chemical bonding ionic covalent",
      diagramType: "chemistry-structure",
    },
  ],
  "periodic": [
    {
      name: "Periodic Trends Across and Down the Table",
      romanUrdu:
        "Period me left se right jaate hue atomic radius kam hoti hai aur ionization energy barhti hai. Group me neeche jaate hue ulta hota hai. Fluorine sab se zyada electronegative element hai (4.0).",
      content:
        "Across a period →: radius ↓, IE ↑, EN ↑, metallic ↓\nDown a group ↓: radius ↑, IE ↓, EN ↓, metallic ↑\nMost electronegative: F (4.0)",
      search: "sabaq foundation periodic table trends",
      diagramType: "chemistry-structure",
    },
  ],
  "mole": [
    {
      name: "The Mole Concept and Stoichiometry",
      romanUrdu:
        "Ek mole me 6.02 × 10²³ particles hote hain. n = mass / molar mass. Stoichiometry ke sawal me pehle balanced equation likhein, phir mole ratio use karein.",
      content:
        "n = mass / molar mass\nN = n × 6.02 × 10²³\nMolar volume at STP = 22.4 dm³\nMolarity M = moles of solute / volume (dm³)",
      search: "sabaq foundation mole concept stoichiometry",
      diagramType: "chemistry-structure",
    },
  ],
  "acids": [
    {
      name: "Acids, Bases, Salts and pH",
      romanUrdu:
        "Bronsted-Lowry ke mutabiq acid proton deta hai aur base leta hai. pH = −log[H⁺]. pH 7 se kam acidic, 7 neutral, 7 se zyada basic. Neutralisation se salt aur paani bante hain.",
      content:
        "pH = −log[H⁺],  pOH = 14 − pH\nAcid + Base → Salt + Water\nStrong acid: fully ionised (HCl, H₂SO₄, HNO₃)\nWeak acid: partially ionised (CH₃COOH)",
      search: "sabaq foundation acids bases salts pH",
      diagramType: "chemistry-structure",
    },
  ],
  "organic": [
    {
      name: "Fundamentals of Organic Chemistry and Nomenclature",
      romanUrdu:
        "Alkane CnH2n+2 saturated hain aur substitution karte hain; alkene CnH2n double bond ke sath addition karte hain; alkyne CnH2n−2 triple bond rakhte hain. IUPAC naam me longest chain dhoondhein aur functional group ko lowest number dein.",
      content:
        "Alkane CnH₂n₊₂ (−ane), alkene CnH₂n (−ene), alkyne CnH₂n₋₂ (−yne)\nFunctional groups: −OH alcohol, −CHO aldehyde, −CO− ketone, −COOH acid, −NH₂ amine\nIUPAC: longest chain + lowest locant to the functional group",
      search: "sabaq foundation organic chemistry nomenclature",
      diagramType: "chemistry-structure",
    },
  ],
  "hydrocarbon": [
    {
      name: "Aliphatic and Aromatic Hydrocarbons",
      romanUrdu:
        "Alkanes substitution reaction dete hain (free radical mechanism), alkenes aur alkynes addition. Benzene aromatic hai aur apni stability ki wajah se addition ke bajaye electrophilic substitution karta hai.",
      content:
        "Alkane + Cl₂ →(UV) chloroalkane + HCl (substitution)\nAlkene + Br₂ → dibromoalkane (addition, decolourises bromine water)\nBenzene C₆H₆: resonance-stabilised, undergoes electrophilic substitution (nitration, halogenation, Friedel–Crafts)",
      search: "sabaq foundation hydrocarbons alkanes alkenes benzene",
      diagramType: "chemistry-structure",
    },
  ],
  "equilibrium": [
    {
      name: "Chemical Equilibrium and Le Chatelier's Principle",
      romanUrdu:
        "Equilibrium par forward aur backward reaction ki rate barabar hoti hai. Le Chatelier ka usool: system stress ko kam karne ki taraf shift hota hai. Catalyst equilibrium ko shift nahi karta, sirf jaldi hasil karwata hai.",
      content:
        "Kc = [products]^n / [reactants]^m\nPressure ↑ → shifts to fewer gas moles\nTemperature ↑ → shifts in the endothermic direction\nCatalyst: no shift, only faster attainment",
      search: "sabaq foundation chemical equilibrium le chatelier",
      diagramType: "chemistry-structure",
    },
  ],
  "kinetics": [
    {
      name: "Reaction Rate and Activation Energy",
      romanUrdu:
        "Rate concentration, temperature, surface area aur catalyst se barhti hai. 10 °C temperature barhne par rate taqreeban double ho jati hai. Catalyst activation energy kam karta hai.",
      content:
        "Rate = Δ[concentration]/Δt  (mol dm⁻³ s⁻¹)\nFactors: nature, concentration, surface area, temperature, catalyst, light\nCatalyst lowers Ea for both forward and reverse equally.",
      search: "sabaq foundation reaction kinetics activation energy",
      diagramType: "math-graph",
    },
  ],
  "electrochemistry": [
    {
      name: "Redox Reactions and Electrolysis",
      romanUrdu:
        "OIL RIG yaad rakhein: Oxidation Is Loss, Reduction Is Gain (electrons ka). Electrolysis me cation cathode par jata hai aur reduce hota hai, anion anode par jaakar oxidise hota hai.",
      content:
        "Oxidation: loss of e⁻, oxidation number ↑\nReduction: gain of e⁻, oxidation number ↓\nCathode (−): reduction. Anode (+): oxidation.\nUses: electroplating, extraction of Al and Na.",
      search: "sabaq foundation electrochemistry electrolysis redox",
      diagramType: "chemistry-structure",
    },
  ],
  "environmental": [
    {
      name: "Acid Rain, Pollution and the Atmosphere",
      romanUrdu:
        "SO₂ aur NOx paani me ghul kar sulphuric aur nitric acid banate hain, jis se acid rain hoti hai (pH 5.6 se kam). Yeh fasal, machhli, imaraton aur mitti sab ko nuqsan pohanchati hai.",
      content:
        "SO₂ + NOx + H₂O → H₂SO₄ + HNO₃ (acid rain, pH < 5.6)\nOzone depletion: CFCs\nGreenhouse gases: CO₂, CH₄, N₂O\nLayers: troposphere, stratosphere, mesosphere, thermosphere",
      search: "sabaq foundation environmental chemistry acid rain",
      diagramType: "generic-mindmap",
    },
  ],
};

/* ============================= MATHEMATICS ============================= */
const math: SubjectTopics = {
  'logarithm': [
    {
      name: 'Logarithms and Their Laws',
      romanUrdu: 'Log ke teen bunyadi qawaneen: product ka log jama, quotient ka log tafreeq, aur power ka log multiply. Common log base 10 hota hai aur natural log base e. Characteristic aur mantissa ka farq samajhna zaroori hai.',
      content: 'log(ab) = log a + log b\nlog(a/b) = log a − log b\nlog(aⁿ) = n log a\nlogₐa = 1, logₐ1 = 0\nChange of base: logₐb = log b / log a',
      search: 'sabaq foundation logarithms class 9 math',
      diagramType: 'math-graph',
    },
  ],
  'factoriz': [
    {
      name: 'Factorization and Algebraic Formulas',
      romanUrdu: 'Factorization me pehle common factor nikalein, phir formula pehchanein. a² − b² = (a+b)(a−b) sab se zyada use hota hai. Middle term break karna quadratic ke liye standard tareeqa hai.',
      content: 'a² − b² = (a+b)(a−b)\n(a±b)² = a² ± 2ab + b²\na³ ± b³ = (a±b)(a² ∓ ab + b²)\nx² + (p+q)x + pq = (x+p)(x+q)',
      search: 'sabaq foundation factorization algebraic formulas',
      diagramType: 'math-graph',
    },
  ],
  'algebraic': [
    {
      name: 'Algebraic Expressions and Manipulation',
      romanUrdu: 'Rational expression me numerator aur denominator dono factorise karke common factor cancel karein. HCF aur LCM nikalne ke liye pehle har expression ko factors me torein. Denominator kabhi zero nahi ho sakta.',
      content: 'Rational expression p(x)/q(x), q(x) ≠ 0\nSimplify by factorising and cancelling common factors.\nHCF × LCM = product of the two expressions.\nSurd rationalisation: multiply by the conjugate.',
      search: 'sabaq foundation algebraic expressions manipulation',
      diagramType: 'math-graph',
    },
  ],
  'linear equation': [
    {
      name: 'Linear Equations and Inequalities',
      romanUrdu: 'Linear equation ka ek hi solution hota hai. Inequality solve karte waqt agar dono taraf manfi number se divide ya multiply karein to sign ULTA ho jata hai — yeh sab se aam ghalti hai.',
      content: 'Solve ax + b = c → x = (c − b)/a\nInequality: dividing/multiplying by a negative REVERSES the sign.\n|x| = a → x = ±a\nRepresent solutions on a number line.',
      search: 'sabaq foundation linear equations inequalities',
      diagramType: 'math-graph',
    },
  ],
  'set': [
    {
      name: 'Sets, Functions and Relations',
      romanUrdu: 'Set elements ka collection hai. Union sab elements, intersection sirf mushtarak. Function me har input ka sirf ek output hota hai — yehi relation aur function ka bunyadi farq hai.',
      content: 'A ∪ B, A ∩ B, A − B, A′ (complement)\nDe Morgan: (A∪B)′ = A′∩B′, (A∩B)′ = A′∪B′\nn(A∪B) = n(A) + n(B) − n(A∩B)\nFunction: each input has exactly one output.',
      search: 'sabaq foundation sets and functions math',
      diagramType: 'math-graph',
    },
  ],
  'triangle': [
    {
      name: 'Triangles: Congruence and Properties',
      romanUrdu: 'Congruent triangles ke corresponding sides aur angles barabar hote hain. Postulates SSS, SAS, ASA aur RHS yaad rakhein. Kisi bhi triangle me bara angle bare side ke samne hota hai.',
      content: 'Congruence: SSS, SAS, ASA, RHS\nAngle sum = 180°; exterior angle = sum of opposite interior angles\nThe greater side lies opposite the greater angle.\nSum of any two sides > the third side.',
      search: 'sabaq foundation congruent triangles geometry',
      diagramType: 'generic-mindmap',
    },
  ],
  'circle': [
    {
      name: 'Circle: Chords, Arcs and Tangents',
      romanUrdu: 'Centre se chord par dala gaya perpendicular chord ko do barabar hisson me taqseem karta hai. Tangent point of contact par radius ke perpendicular hoti hai. Semi-circle ka angle hamesha 90° hota hai.',
      content: 'A perpendicular from the centre bisects the chord.\nEqual chords are equidistant from the centre.\nA tangent is perpendicular to the radius at the point of contact.\nAngle in a semicircle = 90°; angle at centre = 2 × angle at circumference.',
      search: 'sabaq foundation circle chords tangent theorems',
      diagramType: 'generic-mindmap',
    },
  ],
  'ratio': [
    {
      name: 'Ratio, Proportion and Percentage',
      romanUrdu: 'Ratio do miqdaron ka taqabul hai aur proportion do ratios ki barabari. Percentage nikalne ke liye part/whole × 100. Direct variation me dono barhte hain, inverse me ek barhe to doosra kam ho.',
      content: 'a:b = c:d ⇒ ad = bc\nPercentage = (part/whole) × 100\nDirect variation: y = kx.  Inverse: y = k/x\nProfit% = (profit/cost price) × 100',
      search: 'sabaq foundation ratio proportion percentage',
      diagramType: 'math-graph',
    },
  ],
  'zakat': [
    {
      name: 'Zakat, Ushr and Inheritance Calculations',
      romanUrdu: 'Zakat bachat ka 2.5% hai agar nisab pura ho. Ushr barani zameen par 10% aur sairab par 5%. Inheritance ke sawal me pehle total shares nikalein phir har waris ka hissa.',
      content: "Zakat = 2.5% of wealth held for one lunar year above nisab.\nUshr: 10% (rain-fed land), 5% (irrigated land).\nInheritance: compute the total shares, then each heir's portion.",
      search: 'sabaq foundation zakat ushr inheritance math',
      diagramType: 'math-graph',
    },
  ],
  'business': [
    {
      name: 'Business, Financial and Consumer Mathematics',
      romanUrdu: 'Profit aur loss hamesha cost price par calculate hote hain. Simple interest I = PRT/100. Discount marked price par lagta hai. Tax aur insurance ke sawal me percentage ka base theek pehchanein.',
      content: 'Profit/Loss% = (profit or loss / C.P.) × 100\nS.P. = C.P. × (100 ± profit or loss%)/100\nSimple interest I = PRT/100\nCompound amount A = P(1 + r/100)ⁿ\nDiscount is calculated on the marked price.',
      search: 'sabaq foundation business mathematics profit loss interest',
      diagramType: 'math-graph',
    },
  ],
  'interest': [
    {
      name: 'Simple and Compound Interest',
      romanUrdu: 'Simple interest sirf principal par lagta hai, compound me har period ke baad interest bhi principal ka hissa ban jata hai. Isi liye compound amount hamesha zyada hota hai.',
      content: 'Simple: I = PRT/100, A = P + I\nCompound: A = P(1 + r/100)ⁿ, C.I. = A − P\nHalf-yearly: rate r/2, periods 2n',
      search: 'sabaq foundation simple compound interest',
      diagramType: 'math-graph',
    },
  ],
  'accounting': [
    {
      name: 'Introduction to Accounting and the Accounting Equation',
      romanUrdu: 'Bunyadi equation: Assets = Liabilities + Capital. Har transaction is equation ko balance rakhta hai. Double entry me har debit ka ek barabar credit hota hai.',
      content: 'Assets = Liabilities + Capital\nDouble entry: every debit has an equal credit.\nGolden rules — Debit: what comes in, the receiver, expenses/losses.\nCredit: what goes out, the giver, income/gains.',
      search: 'accounting equation double entry class 11',
      diagramType: 'generic-mindmap',
    },
  ],
  'journal': [
    {
      name: 'Journal, Ledger and Posting',
      romanUrdu: 'Journal me transactions tareekh ke hisab se darj hote hain, phir ledger me post kiye jate hain. Har entry ke saath narration likhna zaroori hai warna marks kat jate hain.',
      content: 'Journal: date | particulars | L.F. | debit | credit + narration\nLedger: posting from the journal to individual accounts.\nBalancing: balance c/d and b/d.',
      search: 'journal ledger posting accounting class 11',
      diagramType: 'generic-mindmap',
    },
  ],
  'cash book': [
    {
      name: 'Cash Book and Petty Cash Book',
      romanUrdu: 'Cash book journal aur ledger dono ka kaam karti hai. Single, double aur triple column hoti hai. Petty cash me imprest system use hota hai jis me kharch ke barabar rakam wapas di jati hai.',
      content: "Cash book acts as both journal and ledger.\nSingle / double (cash + bank) / triple (cash + bank + discount) column.\nContra entry marked 'C' — cash to bank or bank to cash.\nPetty cash uses the imprest system.",
      search: 'cash book petty cash imprest accounting',
      diagramType: 'generic-mindmap',
    },
  ],
  'bank reconciliation': [
    {
      name: 'Bank Reconciliation Statement',
      romanUrdu: 'Cash book aur bank statement ka balance farq karte hain kyunke cheques abhi present nahi hue ya bank ne charges lagaye. BRS dono ko milata hai.',
      content: 'Causes: unpresented cheques, uncredited deposits, bank charges, direct credits, errors.\nStart from the cash book balance, adjust each item, reach the bank statement balance (or vice versa).',
      search: 'bank reconciliation statement accounting',
      diagramType: 'generic-mindmap',
    },
  ],
  'trial balance': [
    {
      name: 'Trial Balance and Rectification of Errors',
      romanUrdu: 'Trial balance debits aur credits ki barabari check karti hai. Magar kuch errors isse pakde nahi jate — jaise error of omission, principle aur compensating errors.',
      content: 'Trial balance: total debits = total credits.\nErrors NOT disclosed: omission, principle, commission, compensating, original entry.\nSuspense account holds the difference until errors are found.',
      search: 'trial balance rectification of errors accounting',
      diagramType: 'generic-mindmap',
    },
  ],
  'financial statement': [
    {
      name: 'Financial Statements of a Sole Trader',
      romanUrdu: 'Trading account gross profit deta hai, profit & loss account net profit, aur balance sheet position batati hai. Closing stock hamesha adjustment me aata hai.',
      content: 'Trading A/C → Gross Profit = Net Sales − Cost of Goods Sold\nCOGS = Opening stock + Purchases + Direct expenses − Closing stock\nP&L A/C → Net Profit = Gross Profit + Incomes − Expenses\nBalance Sheet: Assets = Liabilities + Capital',
      search: 'financial statements sole trader trading profit loss',
      diagramType: 'generic-mindmap',
    },
  ],
  'depreciation': [
    {
      name: 'Depreciation and Its Accounting Treatment',
      romanUrdu: 'Depreciation asset ki value me kami hai. Straight line me har saal barabar rakam, diminishing balance me book value par percentage. Yeh non-cash expense hai.',
      content: 'Straight line = (Cost − Scrap value) / Useful life\nDiminishing balance = rate % × book value each year\nDepreciation is a non-cash expense charged to the P&L account.',
      search: 'depreciation straight line diminishing balance accounting',
      diagramType: 'generic-mindmap',
    },
  ],
  'partnership': [
    {
      name: 'Partnership Accounts',
      romanUrdu: 'Partnership me profit agreed ratio me taqseem hota hai. Admission par goodwill aur revaluation ka hisab hota hai; dissolution par realisation account banta hai.',
      content: "Profit shared in the agreed ratio; interest on capital and drawings as per deed.\nAdmission: goodwill, revaluation of assets, new profit-sharing ratio.\nRetirement/death: settle the outgoing partner's account.\nDissolution: prepare a Realisation Account.",
      search: 'partnership accounts admission dissolution',
      diagramType: 'generic-mindmap',
    },
  ],
  'company account': [
    {
      name: 'Company Accounts: Shares and Debentures',
      romanUrdu: 'Shares par application, allotment aur calls ki entries hoti hain. Debenture company ka qarz hai jis par fixed interest milta hai, jabke share holder malik hota hai.',
      content: 'Shares: application → allotment → calls; may be issued at par, premium or discount.\nDebenture = loan capital with fixed interest (a charge against profit).\nShareholders are owners; debenture holders are creditors.',
      search: 'company accounts issue of shares debentures',
      diagramType: 'generic-mindmap',
    },
  ],
  'permutation': [
    {
      name: 'Permutation, Combination and Probability',
      romanUrdu: 'Permutation me order matter karta hai, combination me nahi. Probability hamesha 0 aur 1 ke darmiyan hoti hai. nCr = nCn−r shortcut yaad rakhein.',
      content: 'nPr = n!/(n−r)!\nnCr = n!/(r!(n−r)!),  nCr = nC(n−r)\nP(E) = favourable outcomes / total outcomes,  0 ≤ P ≤ 1\nP(A or B) = P(A) + P(B) − P(A and B)',
      search: 'sabaq foundation permutation combination probability',
      diagramType: 'math-graph',
    },
  ],
  'vector': [
    {
      name: 'Vectors and Their Operations',
      romanUrdu: 'Vector me magnitude aur direction dono hoti hain. Dot product scalar deta hai aur cross product vector. Perpendicular vectors ka dot product zero hota hai.',
      content: '|A| = √(x²+y²+z²)\nA·B = |A||B|cosθ (scalar);  A·B = 0 ⇒ perpendicular\nA×B = |A||B|sinθ n̂ (vector);  A×B = 0 ⇒ parallel\nUnit vector Â = A/|A|',
      search: 'sabaq foundation vectors dot cross product',
      diagramType: 'math-graph',
    },
  ],
  'conic': [
    {
      name: 'Conic Sections: Circle, Parabola, Ellipse, Hyperbola',
      romanUrdu: 'Har conic ka standard equation aur eccentricity yaad rakhein. Circle e = 0, parabola e = 1, ellipse e < 1 aur hyperbola e > 1.',
      content: 'Circle: x² + y² = r²\nParabola: y² = 4ax, focus (a,0)\nEllipse: x²/a² + y²/b² = 1, e < 1\nHyperbola: x²/a² − y²/b² = 1, e > 1',
      search: 'sabaq foundation conic sections parabola ellipse',
      diagramType: 'math-graph',
    },
  ],
  'partial fraction': [
    {
      name: 'Partial Fractions',
      romanUrdu: 'Proper fraction ko chote fractions me torna. Denominator ke factors ke hisab se form choose karein — linear, repeated linear ya quadratic. Pehle check karein ke fraction proper hai ya nahi.',
      content: 'Linear factors: A/(x−a) + B/(x−b)\nRepeated: A/(x−a) + B/(x−a)²\nQuadratic: (Ax+B)/(x²+c)\nIf improper, divide first.',
      search: 'sabaq foundation partial fractions',
      diagramType: 'math-graph',
    },
  ],
  'linear programming': [
    {
      name: 'Linear Inequalities and Linear Programming',
      romanUrdu: 'Feasible region graph par shade karke corner points nikalein, phir objective function har corner par test karein. Maximum ya minimum hamesha corner point par hota hai.',
      content: 'Graph each constraint, shade the feasible region.\nEvaluate the objective function at every corner point.\nThe optimum always occurs at a vertex of the feasible region.',
      search: 'sabaq foundation linear programming feasible region',
      diagramType: 'math-graph',
    },
  ],
  'dispersion': [
    {
      name: 'Measures of Dispersion',
      romanUrdu: 'Range sab se simple hai magar sirf do values use karta hai. Standard deviation sab se reliable hai kyunke har value ko count karti hai. Variance SD ka square hai.',
      content: 'Range = max − min\nQ.D. = (Q3 − Q1)/2\nM.D. = Σ|x − x̄|/n\nS.D. σ = √(Σ(x − x̄)²/n),  Variance = σ²\nC.V. = (σ/x̄) × 100',
      search: 'statistics measures of dispersion standard deviation',
      diagramType: 'math-graph',
    },
  ],
  'correlation': [
    {
      name: 'Correlation and Regression',
      romanUrdu: 'Correlation coefficient r −1 aur +1 ke darmiyan hota hai. r = +1 perfect direct, −1 perfect inverse aur 0 ka matlab koi linear relation nahi.',
      content: 'r = Σ(x−x̄)(y−ȳ) / √[Σ(x−x̄)² Σ(y−ȳ)²],  −1 ≤ r ≤ 1\nRegression line: y = a + bx\nCorrelation does not imply causation.',
      search: 'correlation regression statistics',
      diagramType: 'math-graph',
    },
  ],
  'index number': [
    {
      name: 'Index Numbers and Time Series',
      romanUrdu: 'Index number waqt ke sath tabdeeli measure karta hai, base year ko 100 mana jata hai. Time series ke chaar components: trend, seasonal, cyclical aur irregular.',
      content: 'Simple index = (current/base) × 100\nLaspeyre uses base-year quantities; Paasche uses current-year.\nTime series components: trend, seasonal, cyclical, irregular.',
      search: 'index numbers time series statistics',
      diagramType: 'math-graph',
    },
  ],
  "matrices": [
    {
      name: "Matrices, Determinants and Cramer's Rule",
      romanUrdu:
        "2×2 matrix ka determinant ad − bc hota hai. Agar |A| = 0 ho to matrix singular hai aur uska inverse nahi hota. Cramer's rule me x = Dx/D aur y = Dy/D — pehle D nikalein aur check karein ke woh zero na ho.",
      content:
        "|A| = ad − bc\nA⁻¹ = (1/|A|)·adj A,  requires |A| ≠ 0\nCramer: x = Dx/D, y = Dy/D\nSingular ⇔ |A| = 0 ⇔ no inverse",
      search: "sabaq foundation matrices determinants cramer rule",
      diagramType: "math-graph",
    },
  ],
  "quadratic": [
    {
      name: "Quadratic Equations and the Discriminant",
      romanUrdu:
        "Quadratic formula x = (−b ± √(b²−4ac))/2a. Discriminant D = b² − 4ac roots ki nature batata hai. Sum of roots = −b/a aur product = c/a — yeh shortcut MCQ me bohat kaam aata hai.",
      content:
        "x = (−b ± √(b² − 4ac)) / 2a\nD > 0 perfect square → real, rational, unequal\nD > 0 not perfect square → real, irrational\nD = 0 → real and equal;  D < 0 → imaginary\nSum = −b/a, Product = c/a",
      search: "sabaq foundation quadratic equation discriminant",
      diagramType: "math-graph",
    },
  ],
  "sequence": [
    {
      name: "Arithmetic and Geometric Progressions",
      romanUrdu:
        "AP me har term me common difference d jama hota hai; GP me common ratio r se multiply hota hai. Sum ke formulas alag hain — exam me pehle pehchanein ke AP hai ya GP.",
      content:
        "AP: aₙ = a + (n−1)d,  Sₙ = (n/2)[2a + (n−1)d]\nGP: aₙ = arⁿ⁻¹,  Sₙ = a(1−rⁿ)/(1−r)\nInfinite GP (|r|<1): S∞ = a/(1−r)\nA.M. = (a+b)/2,  G.M. = √(ab)",
      search: "sabaq foundation arithmetic geometric progression",
      diagramType: "math-graph",
    },
  ],
  "trigonometry": [
    {
      name: "Trigonometric Ratios and Fundamental Identities",
      romanUrdu:
        "sin²θ + cos²θ = 1 sab se ahem identity hai. Standard values (0°, 30°, 45°, 60°, 90°) zabani yaad hone chahiyen. Radian me convert karne ke liye π/180 se multiply karein.",
      content:
        "sin²θ + cos²θ = 1;  1 + tan²θ = sec²θ;  1 + cot²θ = cosec²θ\nsin30 = ½, cos30 = √3/2, tan45 = 1\n180° = π radians\nsin(A±B) = sinA cosB ± cosA sinB",
      search: "sabaq foundation trigonometric identities",
      diagramType: "math-graph",
    },
  ],
  "limit": [
    {
      name: "Functions, Limits and Continuity",
      romanUrdu:
        "Limit woh value hai jis ke qareeb function jata hai. lim(x→0) sinx/x = 1 standard limit hai. Function continuous tab hai jab left limit, right limit aur f(a) teeno barabar hon.",
      content:
        "lim(x→0) sin x / x = 1\nlim(x→0) (1+x)^(1/x) = e\nContinuous at a ⇔ LHL = RHL = f(a)\n0/0 and ∞/∞ are indeterminate — factorise or rationalise first.",
      search: "sabaq foundation limits and continuity calculus",
      diagramType: "math-graph",
    },
  ],
  "differentiation": [
    {
      name: "Rules of Differentiation",
      romanUrdu:
        "Power rule d/dx(xⁿ) = nxⁿ⁻¹. Product rule u·v' + v·u', quotient rule (v·u' − u·v')/v². Chain rule composite functions ke liye — bahar wala derivative into andar wala derivative.",
      content:
        "d/dx(xⁿ) = nxⁿ⁻¹\nProduct: (uv)' = uv' + vu'\nQuotient: (u/v)' = (vu' − uv')/v²\nChain: dy/dx = dy/du × du/dx\nd/dx(sin x) = cos x;  d/dx(eˣ) = eˣ;  d/dx(ln x) = 1/x",
      search: "sabaq foundation differentiation rules calculus",
      diagramType: "math-graph",
    },
  ],
  "integration": [
    {
      name: "Integration Techniques and Definite Integrals",
      romanUrdu:
        "Integration differentiation ka ulta amal hai. ∫xⁿdx = xⁿ⁺¹/(n+1) + c, magar n = −1 par yeh ln|x| banta hai. Definite integral me limits lagakar upper minus lower karein — constant c ki zaroorat nahi.",
      content:
        "∫xⁿ dx = xⁿ⁺¹/(n+1) + c,  n ≠ −1\n∫(1/x) dx = ln|x| + c\n∫eˣ dx = eˣ + c\nDefinite: ∫[a→b] f(x)dx = F(b) − F(a)\nBy parts: ∫u dv = uv − ∫v du",
      search: "sabaq foundation integration calculus",
      diagramType: "math-graph",
    },
  ],
  "geometry": [
    {
      name: "Coordinate Geometry: Distance, Slope and Lines",
      romanUrdu:
        "Distance formula √((x₂−x₁)² + (y₂−y₁)²). Slope m = (y₂−y₁)/(x₂−x₁). Parallel lines ka slope barabar hota hai, perpendicular ka product −1.",
      content:
        "d = √((x₂−x₁)² + (y₂−y₁)²)\nMidpoint = ((x₁+x₂)/2, (y₁+y₂)/2)\nm = (y₂−y₁)/(x₂−x₁)\nPoint-slope: y − y₁ = m(x − x₁)\nParallel: m₁ = m₂;  Perpendicular: m₁m₂ = −1",
      search: "sabaq foundation coordinate geometry distance slope",
      diagramType: "math-graph",
    },
  ],
  "theorem": [
    {
      name: "Writing Geometry Theorem Proofs",
      romanUrdu:
        "Board me theorem ka pura structure chahiye: Given, To Prove, Construction, Proof. Har step ke saath reason likhna zaroori hai warna marks kat jate hain. Congruence postulates SSS, SAS, ASA yaad rakhein.",
      content:
        "Structure: GIVEN → TO PROVE → CONSTRUCTION → PROOF (with a reason on every line)\nCongruence: SSS, SAS, ASA, RHS\nPythagoras: c² = a² + b²\nAngle sum of a triangle = 180°",
      search: "sabaq foundation geometry theorems proof",
      diagramType: "generic-mindmap",
    },
  ],
  "statistics": [
    {
      name: "Measures of Central Tendency and Dispersion",
      romanUrdu:
        "Mean average hai, median beech wali value, mode sab se zyada baar aane wali. Standard deviation batati hai ke data mean ke around kitna phaila hua hai.",
      content:
        "Mean x̄ = Σx/n\nMedian: middle value of ordered data\nMode: most frequent value\nRange = max − min\nS.D. σ = √(Σ(x − x̄)²/n)",
      search: "sabaq foundation statistics mean median mode",
      diagramType: "math-graph",
    },
  ],
};

/* =============================== BIOLOGY =============================== */
const biology: SubjectTopics = {
  'introduction to biology': [
    {
      name: 'Introduction to Biology and Its Branches',
      romanUrdu: 'Biology zindagi ka mutala hai. Iski shakhen: morphology, anatomy, physiology, genetics aur ecology. Levels of organisation cell se le kar biosphere tak hain.',
      content: 'Branches: morphology, anatomy, physiology, histology, genetics, ecology, taxonomy.\nLevels: atom → molecule → organelle → cell → tissue → organ → system → organism → population → community → ecosystem → biosphere.\nCareers: medicine, agriculture, biotechnology.',
      search: 'sabaq foundation introduction to biology class 9',
      diagramType: 'biology-cell',
    },
  ],
  'biological problem': [
    {
      name: 'Solving a Biological Problem: Scientific Method',
      romanUrdu: 'Scientific method ke steps: observation, hypothesis, deduction, experiment, result aur theory. Malaria ki misal textbook me di gayi hai — usi ko example bana kar likhein.',
      content: 'Steps: observation → hypothesis → deduction → experiment → result → theory → law.\nA good hypothesis is testable and falsifiable.\nControl group vs experimental group; keep variables constant.\nBook example: the malaria story (Ronald Ross).',
      search: 'sabaq foundation solving a biological problem',
      diagramType: 'biology-cell',
    },
  ],
  'biodiversity': [
    {
      name: 'Biodiversity and Classification',
      romanUrdu: 'Biodiversity zindagi ki iqsaam ki kasrat hai. Five kingdom classification: Monera, Protista, Fungi, Plantae aur Animalia. Binomial nomenclature me genus capital aur species small letter se likha jata hai.',
      content: 'Five kingdoms: Monera, Protista, Fungi, Plantae, Animalia.\nTaxonomic hierarchy: kingdom, phylum, class, order, family, genus, species.\nBinomial nomenclature: Homo sapiens (genus capitalised, species lowercase, italic).\nConservation: national parks, wildlife sanctuaries.',
      search: 'sabaq foundation biodiversity classification biology',
      diagramType: 'biology-cell',
    },
  ],
  'enzyme': [
    {
      name: 'Enzymes: Mechanism and Factors',
      romanUrdu: 'Enzyme biological catalyst hai jo activation energy kam karta hai. Lock and key model se substrate active site me fit hota hai. Zyada temperature par enzyme denature ho jata hai.',
      content: 'Enzymes are protein catalysts; they lower activation energy.\nLock-and-key and induced-fit models.\nFactors: temperature (optimum ~37 °C), pH, substrate concentration.\nHigh temperature or extreme pH denatures the enzyme.',
      search: 'sabaq foundation enzymes biology class 9',
      diagramType: 'biology-cell',
    },
  ],
  'nutrition': [
    {
      name: 'Nutrition in Plants and Humans',
      romanUrdu: 'Plants autotrophic hain aur photosynthesis se khana banate hain. Insan heterotrophic hai. Balanced diet me carbohydrates, proteins, fats, vitamins, minerals aur paani shamil hain.',
      content: 'Human digestive tract: mouth → oesophagus → stomach → small intestine → large intestine.\nEnzymes: amylase (starch), pepsin (protein), lipase (fat).\nDeficiency: kwashiorkor, marasmus, rickets, scurvy, anaemia.\nPlants need N, P, K as macronutrients.',
      search: 'sabaq foundation nutrition digestion biology',
      diagramType: 'biology-cell',
    },
  ],
  'transport': [
    {
      name: 'Transport in Plants and Human Circulation',
      romanUrdu: 'Plants me xylem paani aur minerals ooper le jata hai aur phloem khana. Insan me heart chaar chambers ka hai aur double circulation hoti hai.',
      content: 'Xylem: water and minerals upward (transpiration pull).\nPhloem: food (translocation).\nHuman heart: 4 chambers, double circulation.\nArteries carry blood away (thick walls); veins return blood (valves).\nBlood: plasma, RBC, WBC, platelets.',
      search: 'sabaq foundation transport circulatory system biology',
      diagramType: 'biology-cell',
    },
  ],
  'gaseous exchange': [
    {
      name: 'Gaseous Exchange in Plants and Humans',
      romanUrdu: 'Plants stomata se gas exchange karte hain, insan lungs se. Alveoli me surface area bohat zyada hota hai jis se diffusion tez hoti hai. Smoking se emphysema aur cancer hota hai.',
      content: 'Plants: stomata and lenticels.\nHuman path: nose → pharynx → larynx → trachea → bronchi → bronchioles → alveoli.\nAlveoli: thin walls, huge surface area, rich blood supply.\nDisorders: asthma, emphysema, lung cancer, bronchitis.',
      search: 'sabaq foundation gaseous exchange respiration biology',
      diagramType: 'biology-cell',
    },
  ],
  'support and movement': [
    {
      name: 'Support and Movement: Skeleton and Muscles',
      romanUrdu: 'Human skeleton me 206 haddiyan hain. Axial aur appendicular do hisse hain. Muscles jore me antagonistic pairs me kaam karte hain — biceps aur triceps ki misal dein.',
      content: 'Skeleton: 206 bones; axial (skull, vertebrae, ribs) and appendicular (limbs, girdles).\nFunctions: support, protection, movement, blood cell production.\nJoints: hinge, ball-and-socket, pivot, fixed.\nAntagonistic muscles: biceps (flexor) and triceps (extensor).\nDisorders: arthritis, osteoporosis.',
      search: 'sabaq foundation support and movement skeleton biology',
      diagramType: 'biology-cell',
    },
  ],
  'growth and development': [
    {
      name: 'Growth and Development',
      romanUrdu: 'Growth size me izafa hai jo irreversible hota hai, development me differentiation shamil hai. Plants me meristem se growth hoti hai aur growth hormones auxin isko control karte hain.',
      content: 'Growth: irreversible increase in size and mass. Development includes differentiation.\nPlants: apical and lateral meristems; auxins, gibberellins, cytokinins.\nAnimals: embryonic development — cleavage, gastrulation, organogenesis.\nGrowth curve is sigmoid (S-shaped).',
      search: 'sabaq foundation growth and development biology',
      diagramType: 'biology-cell',
    },
  ],
  'variation': [
    {
      name: 'Variation and Genetics',
      romanUrdu: 'Variation ki do qisme: continuous (jaise height) aur discontinuous (jaise blood group). Mutation aur crossing over variation ke bare sabab hain. Yeh evolution ki bunyad hai.',
      content: "Continuous variation (height, weight) vs discontinuous (blood group, tongue rolling).\nSources: mutation, crossing over, independent assortment, random fertilisation.\nMutation: gene (sickle-cell) and chromosomal (Down's syndrome).\nVariation is the raw material of evolution.",
      search: 'sabaq foundation variation genetics biology',
      diagramType: 'biology-cell',
    },
  ],
  'pharmacolog': [
    {
      name: 'Pharmacology: Medicines and Drug Addiction',
      romanUrdu: 'Pharmacology dawaon ka mutala hai. Antibiotics bacteria par asar karte hain, viruses par nahi. Nasha aawar ashya jism aur dimagh dono ko nuqsan pohanchati hain.',
      content: 'Antibiotics act on bacteria, not viruses; misuse causes resistance.\nAnalgesics relieve pain; vaccines give active immunity.\nAddictive substances: narcotics, sedatives, stimulants, alcohol, tobacco.\nEffects: dependence, organ damage, social harm.',
      search: 'pharmacology medicines drug addiction biology',
      diagramType: 'biology-cell',
    },
  ],
  'pollution': [
    {
      name: 'Environment, Pollution and Conservation',
      romanUrdu: 'Pollution ki qisme: air, water, soil aur noise. Deforestation se soil erosion aur global warming barhti hai. Conservation ke liye afforestation aur recycling zaroori hai.',
      content: 'Air pollution: CO, SO₂, NOx → acid rain, smog, respiratory disease.\nWater pollution: sewage, industrial waste, pesticides.\nDeforestation → erosion, flooding, loss of biodiversity.\nConservation: afforestation, recycling, protected areas.',
      search: 'environment pollution conservation biology',
      diagramType: 'generic-mindmap',
    },
  ],
  'natural resource': [
    {
      name: 'Natural Resources and Their Conservation',
      romanUrdu: 'Resources renewable (paani, jungle, hawa) aur non-renewable (coal, gas, tel) hote hain. Pakistan me paani aur jungle ki kami sanjeeda masla hai.',
      content: "Renewable: water, forests, solar, wind. Non-renewable: coal, oil, natural gas, minerals.\nPakistan's forest cover is below 5% — well under the recommended 25%.\nConservation: efficient irrigation, afforestation, alternative energy, recycling.",
      search: 'natural resources conservation pakistan biology',
      diagramType: 'generic-mindmap',
    },
  ],
  'disease': [
    {
      name: 'Human Health, Disease and Immunity',
      romanUrdu: 'Bimariyan infectious (bacteria, virus) aur non-infectious (diabetes, cancer) hoti hain. Vaccination se active immunity milti hai. Balanced diet aur safai bachao ka behtareen tareeqa hai.',
      content: 'Infectious: bacterial (TB, typhoid), viral (hepatitis, polio), protozoan (malaria).\nNon-infectious: diabetes, cancer, hypertension.\nImmunity: innate vs acquired; active (vaccine) vs passive (antibodies).\nPrevention: hygiene, clean water, vaccination, balanced diet.',
      search: 'human health disease immunity biology',
      diagramType: 'biology-cell',
    },
  ],
  "cell": [
    {
      name: "Cell Structure and Organelles",
      romanUrdu:
        "Prokaryotic cell me nucleus nahi hota, eukaryotic me hota hai. Mitochondria powerhouse hai, ribosome protein banata hai. Plant cell me cell wall, chloroplast aur bara vacuole hota hai jo animal cell me nahi.",
      content:
        "Prokaryote: no true nucleus (bacteria). Eukaryote: true nucleus.\nMitochondrion — ATP; Ribosome — protein synthesis; Chloroplast — photosynthesis; Lysosome — digestion.\nPlant-only: cell wall, chloroplast, large central vacuole.",
      search: "sabaq foundation cell structure organelles biology",
      diagramType: "biology-cell",
    },
  ],
  "bioenergetics": [
    {
      name: "Photosynthesis and Respiration",
      romanUrdu:
        "Photosynthesis me light energy chemical energy me badalti hai aur oxygen nikalti hai. Respiration ulta amal hai jis me glucose tor kar ATP banti hai. Aerobic me 38 ATP, anaerobic me sirf 2.",
      content:
        "Photosynthesis: 6CO₂ + 6H₂O →(light, chlorophyll) C₆H₁₂O₆ + 6O₂\nRespiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy\nAerobic ≈ 38 ATP; anaerobic = 2 ATP (lactic acid / ethanol)",
      search: "sabaq foundation photosynthesis respiration biology",
      diagramType: "biology-cell",
    },
  ],
  "inheritance": [
    {
      name: "Mendel's Laws and Monohybrid Crosses",
      romanUrdu:
        "Mendel ke qawaneen: segregation aur independent assortment. Monohybrid cross ka F2 ratio 3:1 phenotypic aur 1:2:1 genotypic hota hai. Punnett square banane se galti kam hoti hai.",
      content:
        "Monohybrid F₂: 3:1 phenotypic, 1:2:1 genotypic\nDihybrid F₂: 9:3:3:1\nTest cross: with homozygous recessive\nSex determination: XX female, XY male",
      search: "sabaq foundation mendel inheritance genetics",
      diagramType: "biology-cell",
    },
  ],
  "chromosome": [
    {
      name: "Chromosomes, DNA and the Cell Cycle",
      romanUrdu:
        "DNA double helix hai jis me A-T aur G-C pair karte hain. Mitosis se do identical cells banti hain (2n), meiosis se chaar gametes (n). Meiosis me crossing over se variation aati hai.",
      content:
        "DNA: double helix, A=T (2 H-bonds), G≡C (3 H-bonds)\nMitosis: 1 cell → 2 identical diploid cells (growth, repair)\nMeiosis: 1 cell → 4 haploid gametes (variation, crossing over)\nHuman: 46 chromosomes (23 pairs)",
      search: "sabaq foundation dna chromosomes mitosis meiosis",
      diagramType: "biology-cell",
    },
  ],
  "homeostasis": [
    {
      name: "Homeostasis and Kidney Function",
      romanUrdu:
        "Homeostasis jism ke andruni maahol ko constant rakhne ka amal hai. Nephron kidney ki functional unit hai. Teen marahil: ultrafiltration, selective reabsorption aur tubular secretion.",
      content:
        "Nephron = functional unit of the kidney\n1. Ultrafiltration (Bowman's capsule)\n2. Selective reabsorption (PCT)\n3. Tubular secretion → urine\nADH controls water reabsorption.\nPlants: transpiration, guttation, osmoregulation.",
      search: "sabaq foundation homeostasis kidney nephron",
      diagramType: "biology-cell",
    },
  ],
  "coordination": [
    {
      name: "Nervous and Chemical Coordination",
      romanUrdu:
        "Nervous system electrical impulses se tez paighaam bhejta hai, endocrine system hormones se aahista magar der tak asar wala. Reflex arc me paighaam brain tak jaye baghair spinal cord se wapas aata hai.",
      content:
        "Neuron: dendrite → cell body → axon → synapse\nReflex arc: receptor → sensory → relay (spinal cord) → motor → effector\nHormones: insulin (glucose ↓), adrenaline (fight/flight), thyroxine (metabolism)",
      search: "sabaq foundation nervous coordination reflex arc",
      diagramType: "biology-cell",
    },
  ],
  "reproduction": [
    {
      name: "Reproduction in Plants and Humans",
      romanUrdu:
        "Asexual reproduction me ek parent hota hai aur offspring identical hote hain; sexual me do parents aur variation hoti hai. Phool me pollination ke baad fertilisation hoti hai.",
      content:
        "Asexual: 1 parent, identical offspring (binary fission, budding, vegetative)\nSexual: 2 parents, gametes fuse, variation\nFlower: stamen (anther+filament), carpel (stigma, style, ovary)\nPollination → fertilisation → seed and fruit",
      search: "sabaq foundation reproduction plants biology",
      diagramType: "biology-cell",
    },
  ],
  "biotechnology": [
    {
      name: "Biotechnology and Genetic Engineering",
      romanUrdu:
        "Genetic engineering me kisi jandaar ka gene doosre me daala jata hai. Insulin ab bacteria se banti hai. Fermentation se bread, dahi, penicillin aur alcohol bante hain.",
      content:
        "Recombinant DNA: restriction enzymes cut, ligase joins, plasmid vector.\nProducts: human insulin, growth hormone, vaccines.\nFermentation: bread, yoghurt, cheese, penicillin, ethanol.\nTissue culture: many clones from one explant.",
      search: "sabaq foundation biotechnology genetic engineering",
      diagramType: "biology-cell",
    },
  ],
  "ecosystem": [
    {
      name: "Ecosystem, Food Chains and Nutrient Cycles",
      romanUrdu:
        "Ecosystem me biotic aur abiotic components hote hain. Food chain me energy ek trophic level se doosre tak jati hai magar sirf 10% transfer hoti hai — baqi heat ban kar zaya ho jati hai.",
      content:
        "Producers → primary consumers → secondary → tertiary → decomposers\n10% rule: only ~10% of energy passes to the next trophic level.\nCycles: carbon, nitrogen, water.\nPyramid of numbers, biomass and energy.",
      search: "sabaq foundation ecosystem food chain biology",
      diagramType: "biology-cell",
    },
  ],
  "evolution": [
    {
      name: "Evolution and Natural Selection",
      romanUrdu:
        "Darwin ke mutabiq jo jandaar maahol ke mutabiq behtar hote hain woh zinda rehte hain aur apni khasoosiyat aage pohanchate hain — survival of the fittest. Lamarck ka nazriya rad kar diya gaya.",
      content:
        "Darwin: variation → struggle → natural selection → survival of the fittest\nEvidence: fossils, comparative anatomy (homologous organs), embryology, molecular biology\nLamarck's inheritance of acquired characters is rejected.",
      search: "sabaq foundation evolution natural selection darwin",
      diagramType: "generic-mindmap",
    },
  ],
};

/* =========================== COMPUTER SCIENCE =========================== */
const cs: SubjectTopics = {
  'problem solving': [
    {
      name: 'Problem Solving, Algorithms and Flowcharts',
      romanUrdu: 'Problem solving ke steps: problem samajhna, plan banana, algorithm likhna, flowchart banana, code karna aur test karna. Flowchart me har shape ka apna matlab hai.',
      content: 'Steps: define → analyse → design (algorithm) → code → test → document → maintain.\nFlowchart symbols: oval (start/stop), parallelogram (I/O), rectangle (process), diamond (decision), arrow (flow).\nPseudocode is written in plain structured English.',
      search: 'sabaq foundation problem solving algorithm flowchart',
      diagramType: 'cs-spa',
    },
  ],
  'computational thinking': [
    {
      name: 'Computational Thinking',
      romanUrdu: 'Chaar bunyadi cornerstones: decomposition, pattern recognition, abstraction aur algorithm design. Bare masle ko chote hisson me torna sab se ahem step hai.',
      content: 'Decomposition: break the problem into smaller parts.\nPattern recognition: find similarities.\nAbstraction: ignore irrelevant detail.\nAlgorithm design: write ordered steps.',
      search: 'computational thinking decomposition abstraction',
      diagramType: 'cs-spa',
    },
  ],
  'input': [
    {
      name: 'Input, Output and User Interaction',
      romanUrdu: 'Input devices data andar bhejte hain (keyboard, mouse, scanner) aur output devices bahar (monitor, printer). Program me input lete waqt data type ka khayal rakhein.',
      content: 'Input devices: keyboard, mouse, scanner, microphone, touch screen.\nOutput devices: monitor, printer, speaker, plotter.\nValidate input: check type, range and presence before processing.',
      search: 'computer input output devices class 9',
      diagramType: 'cs-spa',
    },
  ],
  'conditional': [
    {
      name: 'Conditional Logic and Decision Structures',
      romanUrdu: 'if statement condition true hone par chalta hai, else warna. Nested if me ek if ke andar doosra hota hai. switch bohat sari values check karne ke liye behtar hai.',
      content: 'if (condition) { … } else { … }\nelse-if ladder for multiple conditions.\nswitch(expr) { case v: … break; default: … }\nRelational: ==, !=, <, >, <=, >=. Logical: &&, ||, !',
      search: 'conditional statements if else switch programming',
      diagramType: 'cs-spa',
    },
  ],
  'loop': [
    {
      name: 'Loops and Repetition',
      romanUrdu: 'for loop tab use karein jab tadaad maloom ho, while jab condition par depend ho. do-while kam az kam ek baar zaroor chalta hai. break loop torta hai aur continue agla iteration shuru karta hai.',
      content: 'for (i = 0; i < n; i++) { … }\nwhile (condition) { … }   // tests first\ndo { … } while (condition);  // runs at least once\nbreak exits the loop; continue skips to the next iteration.',
      search: 'loops for while do while programming',
      diagramType: 'cs-spa',
    },
  ],
  'array': [
    {
      name: 'Arrays and Data Structures',
      romanUrdu: 'Array same data type ki values ka collection hai jo index se access hoti hain. Index hamesha 0 se shuru hota hai. Out-of-range index error deta hai.',
      content: 'int a[5];  // indices 0 to 4\nTraverse with a loop: for(i=0;i<5;i++)\n2D array a[rows][cols] for matrices.\nOther structures: stack (LIFO), queue (FIFO), linked list.',
      search: 'arrays data structures programming class 10',
      diagramType: 'cs-spa',
    },
  ],
  'boolean': [
    {
      name: 'Digital Logic and Boolean Algebra',
      romanUrdu: 'AND gate tabhi 1 deta hai jab dono input 1 hon, OR koi ek 1 ho to, aur NOT input ulta kar deta hai. Truth table banana har sawal me madadgar hai.',
      content: 'AND: 1 only if all inputs are 1.  OR: 1 if any input is 1.  NOT inverts.\nNAND and NOR are universal gates.\nA + 0 = A, A · 1 = A, A + A′ = 1, A · A′ = 0\nDe Morgan: (A+B)′ = A′B′, (AB)′ = A′+B′',
      search: 'digital logic gates boolean algebra',
      diagramType: 'cs-spa',
    },
  ],
  'architecture': [
    {
      name: 'Computer Architecture and Components',
      romanUrdu: 'CPU me ALU, control unit aur registers hote hain. RAM volatile hai aur ROM non-volatile. Primary memory tez magar mehngi hai, secondary sasti magar aahista.',
      content: 'CPU = ALU + Control Unit + Registers.\nRAM: volatile, read/write. ROM: non-volatile, read-only.\nMemory hierarchy: registers → cache → RAM → secondary storage.\nBuses: data, address, control.',
      search: 'computer architecture cpu memory class 11',
      diagramType: 'cs-spa',
    },
  ],
  'operating system': [
    {
      name: 'Operating Systems and Their Functions',
      romanUrdu: 'OS hardware aur user ke darmiyan interface hai. Iske kaam: process management, memory management, file management aur device management.',
      content: 'Functions: process, memory, file and device management; security; user interface.\nTypes: single-user, multi-user, real-time, distributed.\nExamples: Windows, Linux, macOS, Android.',
      search: 'operating system functions types computer',
      diagramType: 'cs-spa',
    },
  ],
  'data communication': [
    {
      name: 'Data Communication and Transmission',
      romanUrdu: 'Data transmission serial ya parallel ho sakti hai. Simplex ek taraf, half-duplex baari baari aur full-duplex dono taraf ek sath. Bandwidth transmission capacity batati hai.',
      content: 'Modes: simplex, half-duplex, full-duplex.\nSerial (one bit at a time, long distance) vs parallel (faster, short distance).\nMedia: twisted pair, coaxial, fibre optic, wireless.\nModem modulates and demodulates signals.',
      search: 'data communication transmission modes computer',
      diagramType: 'cs-spa',
    },
  ],
  'information and data': [
    {
      name: 'Information, Data and Data Representation',
      romanUrdu: 'Data raw facts hain aur information processed data. Computer sab kuch binary me store karta hai. ASCII aur Unicode characters ko numbers me badalte hain.',
      content: 'Data = raw facts; Information = processed, meaningful data.\nBit → byte (8 bits) → KB → MB → GB → TB\nASCII: 7/8-bit character codes. Unicode supports all scripts, including Urdu.',
      search: 'data information representation ascii unicode',
      diagramType: 'cs-spa',
    },
  ],
  'privacy': [
    {
      name: 'Data Privacy and Cyber Ethics',
      romanUrdu: 'Privacy ka matlab apni maloomat par ikhtiyar. Social media par zaati maloomat share karne se pehle sochein. Cyber bullying aur plagiarism dono ghair akhlaqi hain.',
      content: 'Personal data should be shared only with consent.\nThreats: identity theft, phishing, cyber bullying, data breaches.\nEthics: no plagiarism, respect copyright, cite sources.\nProtection: strong passwords, two-factor authentication, privacy settings.',
      search: 'data privacy cyber ethics computer',
      diagramType: 'cs-spa',
    },
  ],
  "number system": [
    {
      name: "Binary, Octal and Hexadecimal Conversions",
      romanUrdu:
        "Decimal se binary ke liye baar baar 2 se divide karein aur remainders ulta likhein. Binary se decimal ke liye har digit ko uski place value 2ⁿ se multiply karke jama karein.",
      content:
        "Decimal → Binary: divide by 2, read remainders upward.\nBinary → Decimal: Σ(digit × 2^position)\n1 byte = 8 bits; 1 KB = 1024 bytes\nHex digits: 0–9, A–F (A=10 … F=15)",
      search: "sabaq foundation number system binary conversion",
      diagramType: "cs-spa",
    },
  ],
  "programming": [
    {
      name: "Programming Fundamentals and Control Structures",
      romanUrdu:
        "Teen basic control structures: sequence, selection (if/else, switch) aur repetition (loops). Variable declare karte waqt data type dena zaroori hai. Loop me condition ghalat ho to infinite loop ban jata hai.",
      content:
        "Sequence, Selection (if / if-else / switch), Repetition (for / while / do-while)\nData types: int, float, char, double, bool\nfor(i=0; i<n; i++) { … }\nwhile tests before; do-while runs at least once.",
      search: "sabaq foundation programming control structures c language",
      diagramType: "cs-spa",
    },
  ],
  "database": [
    {
      name: "Databases, Keys and SQL Basics",
      romanUrdu:
        "Database organised data ka collection hai. Primary key har record ko unique banati hai aur duplicate ya null nahi ho sakti. Foreign key do tables ko jorti hai.",
      content:
        "Primary key: unique, not null. Foreign key: links tables.\nSELECT col FROM table WHERE condition;\nINSERT INTO table VALUES (…);\nUPDATE table SET col = val WHERE …;\nDELETE FROM table WHERE …;",
      search: "sabaq foundation database sql primary key",
      diagramType: "cs-spa",
    },
  ],
  "network": [
    {
      name: "Computer Networks and Topologies",
      romanUrdu:
        "LAN chhote area me, WAN bare area me. Topology network ka physical arrangement hai — star sab se common hai kyunke ek node kharab ho to baqi network chalta rehta hai.",
      content:
        "LAN, MAN, WAN\nTopologies: bus, star, ring, mesh, tree\nDevices: hub, switch, router, modem\nIPv4 = 32 bits; protocols: TCP/IP, HTTP, FTP, SMTP",
      search: "sabaq foundation computer networks topology",
      diagramType: "cs-spa",
    },
  ],
  "web": [
    {
      name: "HTML and Web Page Design",
      romanUrdu:
        "HTML tags se web page ki structure banti hai. Har tag open aur close hona chahiye. CSS presentation ke liye aur JavaScript interactivity ke liye use hoti hai.",
      content:
        "<html><head><title></title></head><body></body></html>\nHeadings <h1>–<h6>, paragraph <p>, link <a href>, image <img src>\nLists: <ul>, <ol>, <li>\nHTML = structure, CSS = style, JS = behaviour",
      search: "sabaq foundation html web design",
      diagramType: "cs-spa",
    },
  ],
  "security": [
    {
      name: "Data Security, Privacy and Cyber Ethics",
      romanUrdu:
        "Data security me confidentiality, integrity aur availability ahem hain. Strong password, antivirus aur backup zaroori hain. Phishing me jaali email se maloomat churayi jati hai.",
      content:
        "CIA triad: Confidentiality, Integrity, Availability\nThreats: virus, worm, trojan, phishing, hacking\nProtection: strong passwords, firewall, antivirus, encryption, regular backup",
      search: "sabaq foundation data security privacy computer",
      diagramType: "cs-spa",
    },
  ],
};

/* ============================ ENGLISH / URDU ============================ */
const english: SubjectTopics = {
  "grammar": [
    {
      name: "Tenses, Voice and Narration",
      romanUrdu:
        "Active se passive banate waqt object subject ban jata hai aur verb ki third form use hoti hai. Narration me reporting verb, pronoun aur tense — teeno change hote hain.",
      content:
        "Passive: object + correct form of 'be' + past participle (+ by agent)\nPresent continuous passive: is/am/are + being + V3\nNarration: change reporting verb, pronoun, tense and time words\n'said to' → 'told' for statements, 'requested' for requests",
      search: "english grammar active passive voice narration class 10",
      diagramType: "english-tree",
    },
  ],
  "writing": [
    {
      name: "Essay, Letter and Application Format",
      romanUrdu:
        "Application me sender, date, receiver, subject, body aur closing lazmi hain. Essay me introduction, 2-3 body paragraphs aur conclusion hona chahiye. Handwriting saaf rakhein aur paragraph alag alag karein.",
      content:
        "Application: To (designation, institution) → Subject → Body (respectfully…) → Yours obediently\nLetter: address, date, salutation, body, complimentary close\nEssay: introduction → 2–3 body paragraphs → conclusion (200–300 words)",
      search: "english essay letter application writing format board",
      diagramType: "english-tree",
    },
  ],
  "comprehension": [
    {
      name: "Comprehension, Summary and Central Idea",
      romanUrdu:
        "Comprehension me pehle sawal parhein phir passage. Jawab apne alfaz me likhein magar passage se hi lein. Summary asal ka taqreeban ek tihai honi chahiye.",
      content:
        "Read questions first, then the passage twice.\nAnswer in complete sentences, in your own words.\nSummary ≈ one-third of the original; keep only the main ideas.\nCentral idea = the single dominant message in 2–3 lines.",
      search: "english comprehension summary writing class 12",
      diagramType: "english-tree",
    },
  ],
  "vocabulary": [
    {
      name: "Idioms, Phrasal Verbs and Pairs of Words",
      romanUrdu:
        "Idioms ka literal matlab nahi lena chahiye. Pair of words me spelling ka farq maani badal deta hai — jaise accept aur except. Har lafz ko jumle me use karke dikhana zaroori hai.",
      content:
        "Idiom: figurative meaning ('let the cat out of the bag' = reveal a secret)\nPhrasal verb: verb + preposition ('give up' = quit)\nPairs: accept/except, advice/advise, principal/principle, weather/whether\nAlways illustrate with a full sentence.",
      search: "english idioms phrasal verbs pair of words board",
      diagramType: "english-tree",
    },
  ],
};

const urdu: SubjectTopics = {
  "تشریح": [
    {
      name: "نظم و نثر کی تشریح کا طریقہ",
      romanUrdu:
        "Tashreeh likhte waqt pehle sheir ya iqtibas likhein, phir shayar/musannif ka naam, phir sabaq ka naam, phir matlab apne alfaz me. Aakhir me khoobsurti ya sanaye ka zikr karein.",
      content:
        "ترتیب: شعر یا اقتباس ← شاعر/مصنف کا نام ← سبق کا عنوان ← سیاق و سباق ← مفہوم ← خوبیاں و صنائع\nتشریح میں اپنے الفاظ استعمال کریں اور خطِ کشیدہ الفاظ کی وضاحت لازمی کریں۔",
      search: "urdu tashreeh nazm nasr class 12",
      diagramType: "urdu-calligraphy",
    },
  ],
  "قواعد": [
    {
      name: "اردو قواعد: اسم، فعل، حرف",
      romanUrdu:
        "Ism woh lafz hai jo kisi cheez ka naam ho, fail kaam ko zahir karta hai, harf dono ko jorta hai. Ism ki iqsaam: nakra, marfa, zaat, sifat. Yeh objective portion me zaroor aata hai.",
      content:
        "اسم: نکرہ، معرفہ، ذات، صفت، جامد، مشتق\nفعل: ماضی، حال، مستقبل؛ لازم و متعدی؛ معروف و مجہول\nحرف: حروفِ جار، عطف، ربط، ندا\nواحد جمع، تذکیر و تانیث اور مترادفات کی مشق کریں۔",
      search: "urdu grammar qawaid ism fail harf",
      diagramType: "urdu-calligraphy",
    },
  ],
  "مضمون": [
    {
      name: "مضمون نویسی اور خط نویسی",
      romanUrdu:
        "Mazmoon me tamheed, asal mazmoon (2-3 paragraph) aur khatma hona chahiye. Ashaar ya aqwal shamil karne se numbers barhte hain. Khat me unwan, tareekh aur ikhtitami kalimat lazmi hain.",
      content:
        "مضمون: تمہید ← اصل مضمون (دو تا تین پیراگراف) ← خاتمہ\nمناسب اشعار، اقوالِ زریں اور قرآنی حوالہ جات شامل کریں۔\nدرخواست: بخدمت جناب ← عنوان ← جسم ← آپ کا مخلص\nخط: پتہ، تاریخ، القاب، متن، اختتام",
      search: "urdu mazmoon nawesi khat nawesi",
      diagramType: "urdu-calligraphy",
    },
  ],
  "خلاصہ": [
    {
      name: "خلاصہ نگاری اور سلیس اردو",
      romanUrdu:
        "Khulasa asal ibarat ka taqreeban ek tihai hona chahiye aur usme sirf ahem baaten aani chahiyen. Salees Urdu me mushkil alfaz ko aasan alfaz se badla jata hai, maani nahi badalte.",
      content:
        "خلاصہ: اصل کا تقریباً ایک تہائی، صرف بنیادی نکات، اپنے الفاظ میں، مناسب عنوان کے ساتھ\nسلیس اردو: مشکل و ثقیل الفاظ کی جگہ آسان روزمرہ الفاظ، مفہوم برقرار\nمحاورات اور ضرب الامثال کو جملوں میں استعمال کریں۔",
      search: "urdu khulasa nigari salees urdu",
      diagramType: "urdu-calligraphy",
    },
  ],
};

/* ============================ ISLAMIYAT ============================ */
const islam: SubjectTopics = {
  "aqaid": [
    {
      name: "Tauheed, Risalat aur Akhirat",
      romanUrdu:
        "Tauheed Allah ki wahdaniyat par yaqeen hai. Risalat me Hazrat Muhammad ﷺ ki khatm-un-nabiyeen haisiyat par iman lana zaroori hai. Akhirat ka aqeeda insan ko jawabdehi ka ehsas deta hai.",
      content:
        "Tauheed: oneness of Allah in His being, attributes and worship.\nRisalat: belief in all prophets; Muhammad ﷺ is Khatam-un-Nabiyyin.\nAkhirat: resurrection, record of deeds, accountability, Jannah or Jahannam.\nEffect: sincerity, honesty and restraint from sin.",
      search: "islamiyat tauheed risalat akhirat class 11",
      diagramType: "generic-mindmap",
    },
  ],
  "ibadat": [
    {
      name: "Arkan-e-Islam aur Ibadat ki Hikmat",
      romanUrdu:
        "Paanch arkan: Kalima, Salat, Sawm, Zakat aur Hajj. Har ibadat ki zahiri shakl ke saath batini hikmat bhi likhein — jaise Sawm se taqwa aur ghareebon ka ehsas paida hota hai.",
      content:
        "5 pillars: Kalima, Salat, Sawm, Zakat, Hajj\nSalat: discipline and remembrance. Sawm: taqwa and empathy.\nZakat: 2.5% of savings; purifies wealth, reduces inequality.\nHajj: unity and equality of the Ummah.",
      search: "islamiyat arkan e islam ibadat",
      diagramType: "generic-mindmap",
    },
  ],
  "seerat": [
    {
      name: "Seerat-un-Nabi ﷺ: Makki aur Madani Zindagi",
      romanUrdu:
        "Makki daur me sabr aur dawat ka pehlu numaya hai, Madani daur me riyasat, muashra aur ghazwat. Meesaq-e-Madina duniya ka pehla tehreeri dastoor mana jata hai.",
      content:
        "Born 571 CE (Year of the Elephant); prophethood at 40.\nMakki period: patience under persecution, invitation to Tauheed.\nHijrah 622 CE → Charter of Madinah (first written constitution).\nBadr 2 AH, Uhud 3 AH, Khandaq 5 AH, Hudaibiya 6 AH, Fath-e-Makkah 8 AH.",
      search: "islamiyat seerat un nabi makki madani life",
      diagramType: "generic-mindmap",
    },
  ],
  "akhlaq": [
    {
      name: "Huqooq-ul-Ibad aur Islami Akhlaqiyat",
      romanUrdu:
        "Islam me Huqooq-Allah ke saath Huqooq-ul-Ibad bhi lazmi hain. Walidain, parosi, yateem aur mazdoor ke huqooq ka khaas zikr hai. Sidq, amanat aur adl bunyadi akhlaqi khoobiyan hain.",
      content:
        "Huqooq-Allah: worship and obedience.\nHuqooq-ul-Ibad: parents, neighbours, orphans, workers, relatives.\nVirtues: truthfulness (sidq), trust (amanat), justice (adl), patience (sabr), forgiveness.\nProhibited: lying, backbiting, injustice, breaking promises.",
      search: "islamiyat huqooq ul ibad akhlaqiyat",
      diagramType: "generic-mindmap",
    },
  ],
  "quran": [
    {
      name: "Quran-e-Kareem: Jama-o-Tadween aur Ahmiyat",
      romanUrdu:
        "Quran 23 saal me nazil hua, 114 surahs hain. Hazrat Abu Bakr RA ke daur me jama hua aur Hazrat Usman RA ne standard nuskhe taqseem karwaye, isi liye unhein Jami-ul-Quran kaha jata hai.",
      content:
        "114 Surahs, revealed over 23 years.\nCompilation began under Hazrat Abu Bakr (RA); standard copies issued by Hazrat Usman (RA).\nSources of Islamic law: Quran → Sunnah → Ijma → Qiyas.\nQuran gives principles; Sunnah gives their practical form.",
      search: "islamiyat quran jama o tadween",
      diagramType: "generic-mindmap",
    },
  ],
};

export const TOPIC_BANK: Record<string, SubjectTopics> = {
  physics,
  chemistry,
  math,
  mathematics: math,
  biology,
  cs,
  english,
  urdu,
  islam,
};

/**
 * Finds the best topic set for a chapter by matching the longest keyword
 * present in the chapter name. Returns null when nothing matches, so the
 * caller can fall back to its own generic advice.
 */
export function lookupTopics(subjectId: string, chapterName: string): TopicSeed[] | null {
  const subject = TOPIC_BANK[subjectId.toLowerCase()];
  if (!subject) return null;

  const hay = chapterName.toLowerCase();
  let best: { key: string; topics: TopicSeed[] } | null = null;

  for (const [key, topics] of Object.entries(subject)) {
    if (hay.includes(key) && (!best || key.length > best.key.length)) {
      best = { key, topics };
    }
  }
  return best ? best.topics : null;
}

/**
 * Builds a real YouTube search URL. The previous implementation embedded
 * hardcoded video IDs which were all dead (verified 404 via oEmbed), so we
 * link to a search scoped to Sabaq Foundation — a genuine Pakistani
 * curriculum channel (youtube.com/@sabaqpk) — which cannot rot.
 */
export function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export const SABAQ_CHANNEL = "https://www.youtube.com/@sabaqpk";
export const SABAQ_SITE = "https://sabaq.pk/";
