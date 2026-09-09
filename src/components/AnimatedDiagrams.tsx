import React from "react";

/**
 * Animated science diagrams.
 *
 * These are hand-written inline SVGs with CSS/SMIL animation - no image files,
 * no external CDN, no network. That matters for three reasons: the app must
 * work offline for students on patchy connections, the in-app preview sandbox
 * blocks external assets, and the Android build ships them without extra size.
 *
 * Every caption is Roman Urdu with English technical terms retained, matching
 * how Pakistani students actually revise ("force lagti hai", not "quwwat").
 */

export type AnimatedDiagramType =
  | "motion-graph"
  | "newton-force"
  | "wave"
  | "circuit"
  | "refraction"
  | "atom"
  | "bonding"
  | "ph-scale"
  | "cell"
  | "mitosis"
  | "photosynthesis"
  | "heart";

const shell =
  "relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900";

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-t border-slate-800 bg-slate-950/60 px-3 py-2 text-[11px] leading-snug text-slate-300">
      {children}
    </p>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-2 top-2 z-10 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
      {children}
    </div>
  );
}

export function AnimatedDiagram({ type }: { type: AnimatedDiagramType }) {
  switch (type) {
    /* ------------------------- PHYSICS ------------------------- */
    case "motion-graph":
      return (
        <div className={shell}>
          <Label>Kinematics: v-t graph</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <line x1="40" y1="140" x2="300" y2="140" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="20" x2="40" y2="140" stroke="#475569" strokeWidth="1.5" />
            <text x="150" y="160" fill="#94a3b8" fontSize="9">time (t) &rarr;</text>
            <text x="6" y="80" fill="#94a3b8" fontSize="9">v (m/s)</text>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="40" y1={140 - i * 30} x2="300" y2={140 - i * 30} stroke="#1e293b" strokeWidth="1" />
            ))}
            {/* accelerating line */}
            <line x1="40" y1="140" x2="230" y2="40" stroke="#6366f1" strokeWidth="2.5" />
            {/* area under graph = distance */}
            <polygon points="40,140 230,40 230,140" fill="#6366f1" opacity="0.15" />
            <text x="130" y="120" fill="#a5b4fc" fontSize="8">Area = distance (S)</text>
            {/* moving dot */}
            <circle r="5" fill="#f43f5e">
              <animateMotion dur="3s" repeatCount="indefinite" path="M40,140 L230,40" />
            </circle>
            <text x="238" y="42" fill="#f43f5e" fontSize="8">slope = a</text>
          </svg>
          <Caption>
            Line ka <strong>slope</strong> acceleration deta hai (a = &Delta;v/&Delta;t), aur
            line ke neeche ka <strong>area</strong> tay ki gayi distance. Straight
            upar jaati line ka matlab uniform acceleration.
          </Caption>
        </div>
      );

    case "newton-force":
      return (
        <div className={shell}>
          <Label>Dynamics: F = ma</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <line x1="0" y1="130" x2="320" y2="130" stroke="#475569" strokeWidth="2" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 0; 150 0; 0 0" dur="4s" repeatCount="indefinite" />
              <rect x="40" y="90" width="46" height="40" rx="4" fill="#6366f1" />
              <text x="52" y="115" fill="#fff" fontSize="12" fontWeight="bold">m</text>
              <line x1="86" y1="110" x2="130" y2="110" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#ah)" />
              <text x="96" y="102" fill="#fb7185" fontSize="10" fontWeight="bold">F</text>
              <line x1="63" y1="90" x2="63" y2="55" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#ah2)" />
              <text x="68" y="62" fill="#67e8f9" fontSize="8">Normal (N)</text>
              <line x1="63" y1="130" x2="63" y2="160" stroke="#facc15" strokeWidth="2" />
              <text x="68" y="150" fill="#fde047" fontSize="8">W = mg</text>
            </g>
            <defs>
              <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 z" fill="#f43f5e" />
              </marker>
              <marker id="ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 z" fill="#22d3ee" />
              </marker>
            </defs>
          </svg>
          <Caption>
            Jitni zyada <strong>force (F)</strong> lagayen, utni zyada acceleration
            milegi; jitna zyada <strong>mass (m)</strong>, utni kam. Isi liye
            <strong> F = ma</strong>. Weight W = mg hamesha neeche ki taraf.
          </Caption>
        </div>
      );

    case "wave":
      return (
        <div className={shell}>
          <Label>Waves: v = f&lambda;</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <line x1="0" y1="85" x2="320" y2="85" stroke="#334155" strokeDasharray="4 4" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 0; -80 0" dur="2s" repeatCount="indefinite" />
              <path
                d="M0,85 Q20,35 40,85 T80,85 T120,85 T160,85 T200,85 T240,85 T280,85 T320,85 T360,85 T400,85"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
            </g>
            <line x1="60" y1="30" x2="60" y2="85" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="64" y="34" fill="#fb7185" fontSize="9">Amplitude</text>
            <line x1="120" y1="145" x2="200" y2="145" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#w1)" markerStart="url(#w1)" />
            <text x="132" y="140" fill="#4ade80" fontSize="9">Wavelength &lambda;</text>
            <text x="8" y="60" fill="#7dd3fc" fontSize="9">Crest</text>
            <text x="8" y="118" fill="#7dd3fc" fontSize="9">Trough</text>
            <defs>
              <marker id="w1" markerWidth="7" markerHeight="7" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 z" fill="#22c55e" />
              </marker>
            </defs>
          </svg>
          <Caption>
            Ek second mein jitni waves guzrein woh <strong>frequency (f)</strong>, aur do
            crests ka faasla <strong>wavelength (&lambda;)</strong>. Speed
            <strong> v = f&lambda;</strong>. Amplitude sound ki loudness batati hai.
          </Caption>
        </div>
      );

    case "circuit":
      return (
        <div className={shell}>
          <Label>Current Electricity: V = IR</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <rect x="45" y="35" width="230" height="100" fill="none" stroke="#64748b" strokeWidth="2.5" rx="4" />
            {/* battery */}
            <line x1="140" y1="27" x2="140" y2="43" stroke="#facc15" strokeWidth="4" />
            <line x1="152" y1="20" x2="152" y2="50" stroke="#facc15" strokeWidth="2" />
            <text x="120" y="16" fill="#fde047" fontSize="9">Battery (V)</text>
            {/* resistor */}
            <rect x="245" y="65" width="20" height="40" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
            <text x="270" y="90" fill="#fb7185" fontSize="9">R</text>
            {/* bulb */}
            <circle cx="160" cy="135" r="13" fill="#facc15" opacity="0.9">
              <animate attributeName="opacity" values="0.35;1;0.35" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <text x="178" y="152" fill="#fde047" fontSize="9">Bulb</text>
            {/* electrons */}
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} r="3.5" fill="#38bdf8">
                <animateMotion
                  dur="4s"
                  begin={`${i * 0.8}s`}
                  repeatCount="indefinite"
                  path="M45,35 L275,35 L275,135 L45,135 Z"
                />
              </circle>
            ))}
            <text x="60" y="28" fill="#7dd3fc" fontSize="9">I (current) &rarr;</text>
          </svg>
          <Caption>
            Battery <strong>voltage (V)</strong> deti hai, jo electrons ko dhakka deti hai =
            <strong> current (I)</strong>. <strong>Resistance (R)</strong> current ko rokti hai.
            Ohm&apos;s Law: <strong>V = IR</strong>.
          </Caption>
        </div>
      );

    case "refraction":
      return (
        <div className={shell}>
          <Label>Optics: Refraction &amp; Snell&apos;s Law</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <rect x="0" y="85" width="320" height="85" fill="#0c4a6e" opacity="0.45" />
            <line x1="0" y1="85" x2="320" y2="85" stroke="#38bdf8" strokeWidth="2" />
            <line x1="160" y1="10" x2="160" y2="160" stroke="#64748b" strokeDasharray="4 4" />
            <text x="164" y="20" fill="#94a3b8" fontSize="8">Normal</text>
            <line x1="60" y1="20" x2="160" y2="85" stroke="#facc15" strokeWidth="2.5" />
            <line x1="160" y1="85" x2="225" y2="160" stroke="#facc15" strokeWidth="2.5" />
            <circle r="4" fill="#fff">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M60,20 L160,85 L225,160" />
            </circle>
            <path d="M160,55 A30,30 0 0,0 138,68" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="118" y="55" fill="#fb7185" fontSize="9">i</text>
            <path d="M160,115 A30,30 0 0,1 182,128" fill="none" stroke="#4ade80" strokeWidth="1.5" />
            <text x="186" y="120" fill="#4ade80" fontSize="9">r</text>
            <text x="8" y="78" fill="#cbd5e1" fontSize="9">Air (n&#8321;)</text>
            <text x="8" y="104" fill="#bae6fd" fontSize="9">Water / Glass (n&#8322;)</text>
          </svg>
          <Caption>
            Jab light denser medium mein jaati hai to normal ki taraf <strong>mud</strong> jaati
            hai (r &lt; i). Yeh <strong>refraction</strong> hai. Snell&apos;s Law:
            <strong> n&#8321; sin i = n&#8322; sin r</strong>.
          </Caption>
        </div>
      );

    /* ------------------------ CHEMISTRY ------------------------ */
    case "atom":
      return (
        <div className={shell}>
          <Label>Atomic Structure</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <ellipse cx="160" cy="85" rx="55" ry="55" fill="none" stroke="#475569" strokeWidth="1" />
            <ellipse cx="160" cy="85" rx="95" ry="95" fill="none" stroke="#475569" strokeWidth="1" />
            <circle cx="160" cy="85" r="17" fill="#f43f5e" />
            <text x="150" y="89" fill="#fff" fontSize="9" fontWeight="bold">+</text>
            <text x="140" y="118" fill="#fb7185" fontSize="8">Nucleus</text>
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 160 85" to="360 160 85" dur="4s" repeatCount="indefinite" />
              <circle cx="215" cy="85" r="6" fill="#38bdf8" />
              <circle cx="105" cy="85" r="6" fill="#38bdf8" />
            </g>
            <g>
              <animateTransform attributeName="transform" type="rotate" from="360 160 85" to="0 160 85" dur="7s" repeatCount="indefinite" />
              <circle cx="255" cy="85" r="6" fill="#4ade80" />
              <circle cx="65" cy="85" r="6" fill="#4ade80" />
              <circle cx="160" cy="-10" r="6" fill="#4ade80" />
            </g>
            <text x="228" y="30" fill="#7dd3fc" fontSize="8">K shell (2e&#8315;)</text>
            <text x="228" y="160" fill="#4ade80" fontSize="8">L shell (8e&#8315;)</text>
          </svg>
          <Caption>
            Beech mein <strong>nucleus</strong> (protons + neutrons), aur uske gird
            <strong> shells</strong> mein electrons ghoomte hain. Har shell mein max 2n&sup2;
            electrons: K = 2, L = 8, M = 18.
          </Caption>
        </div>
      );

    case "bonding":
      return (
        <div className={shell}>
          <Label>Chemical Bonding</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <text x="42" y="22" fill="#a5b4fc" fontSize="9" fontWeight="bold">IONIC (NaCl)</text>
            <circle cx="45" cy="75" r="20" fill="#6366f1" />
            <text x="34" y="79" fill="#fff" fontSize="10">Na</text>
            <circle cx="135" cy="75" r="23" fill="#22c55e" />
            <text x="126" y="79" fill="#fff" fontSize="10">Cl</text>
            <circle r="4" fill="#fde047">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M62,70 L114,70" />
            </circle>
            <text x="70" y="52" fill="#fde047" fontSize="8">e&#8315; transfer</text>
            <text x="34" y="112" fill="#c7d2fe" fontSize="9">Na&#8314;</text>
            <text x="126" y="112" fill="#bbf7d0" fontSize="9">Cl&#8315;</text>
            <text x="30" y="132" fill="#94a3b8" fontSize="8">Electron diya &rarr; ions bane</text>

            <line x1="180" y1="10" x2="180" y2="160" stroke="#334155" />
            <text x="205" y="22" fill="#fca5a5" fontSize="9" fontWeight="bold">COVALENT (H&#8322;)</text>
            <circle cx="230" cy="75" r="18" fill="#f43f5e" opacity="0.85" />
            <circle cx="275" cy="75" r="18" fill="#f43f5e" opacity="0.85" />
            <text x="223" y="79" fill="#fff" fontSize="10">H</text>
            <text x="268" y="79" fill="#fff" fontSize="10">H</text>
            <ellipse cx="252" cy="75" rx="20" ry="13" fill="#fde047" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <text x="206" y="132" fill="#94a3b8" fontSize="8">Electron pair share hota hai</text>
          </svg>
          <Caption>
            <strong>Ionic bond</strong>: metal electron <em>deta</em> hai, non-metal
            <em> leta</em> hai &rarr; ions ban kar attract karte hain.
            <strong> Covalent bond</strong>: dono atoms electron pair <em>share</em> karte hain.
          </Caption>
        </div>
      );

    case "ph-scale":
      return (
        <div className={shell}>
          <Label>Acids, Bases &amp; pH</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <defs>
              <linearGradient id="phg" x1="0" x2="1">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <rect x="20" y="60" width="280" height="30" rx="6" fill="url(#phg)" />
            {[0, 2, 4, 6, 7, 8, 10, 12, 14].map((n) => (
              <text key={n} x={20 + (n / 14) * 280 - 4} y="106" fill="#cbd5e1" fontSize="8">
                {n}
              </text>
            ))}
            <polygon points="0,-8 6,2 -6,2" fill="#fff">
              <animateMotion dur="6s" repeatCount="indefinite" path="M40,58 L160,58 L280,58 L40,58" />
            </polygon>
            <text x="24" y="48" fill="#fca5a5" fontSize="9" fontWeight="bold">ACIDIC</text>
            <text x="140" y="48" fill="#86efac" fontSize="9" fontWeight="bold">NEUTRAL</text>
            <text x="248" y="48" fill="#c4b5fd" fontSize="9" fontWeight="bold">BASIC</text>
            <text x="20" y="130" fill="#94a3b8" fontSize="8">Lemon (2), Vinegar (3)</text>
            <text x="132" y="130" fill="#94a3b8" fontSize="8">Water (7)</text>
            <text x="212" y="130" fill="#94a3b8" fontSize="8">Soap (10), NaOH (14)</text>
            <text x="20" y="148" fill="#64748b" fontSize="8">pH = &minus;log[H&#8314;] &nbsp; | &nbsp; kam pH = zyada H&#8314; ions</text>
          </svg>
          <Caption>
            <strong>pH 7</strong> neutral. 7 se kam = <strong>acid</strong> (H&#8314; zyada,
            litmus laal). 7 se zyada = <strong>base</strong> (OH&#8315; zyada, litmus neela).
          </Caption>
        </div>
      );

    /* ------------------------- BIOLOGY ------------------------- */
    case "cell":
      return (
        <div className={shell}>
          <Label>Cell Structure</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <rect x="30" y="20" width="260" height="130" rx="14" fill="#065f46" opacity="0.3" stroke="#22c55e" strokeWidth="2" />
            <text x="34" y="15" fill="#4ade80" fontSize="8">Cell wall + membrane</text>
            <ellipse cx="120" cy="82" rx="34" ry="28" fill="#6366f1" opacity="0.8" />
            <circle cx="120" cy="82" r="11" fill="#312e81" />
            <text x="100" y="122" fill="#c7d2fe" fontSize="8">Nucleus</text>
            {[
              [205, 55],
              [235, 100],
              [190, 110],
            ].map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx="16" ry="8" fill="#f43f5e" opacity="0.75">
                <animate attributeName="opacity" values="0.45;0.9;0.45" dur={`${2 + i * 0.6}s`} repeatCount="indefinite" />
              </ellipse>
            ))}
            <text x="196" y="42" fill="#fb7185" fontSize="8">Mitochondria</text>
            <circle cx="70" cy="45" r="9" fill="#22d3ee" opacity="0.8" />
            <text x="46" y="34" fill="#67e8f9" fontSize="8">Vacuole</text>
            <ellipse cx="75" cy="125" rx="14" ry="7" fill="#84cc16" />
            <text x="46" y="145" fill="#bef264" fontSize="8">Chloroplast</text>
          </svg>
          <Caption>
            <strong>Nucleus</strong> = cell ka control room (DNA).
            <strong> Mitochondria</strong> = powerhouse, ATP banata hai.
            <strong> Chloroplast</strong> sirf plant cell mein - photosynthesis ke liye.
          </Caption>
        </div>
      );

    case "mitosis":
      return (
        <div className={shell}>
          <Label>Cell Cycle: Mitosis</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            {["Prophase", "Metaphase", "Anaphase", "Telophase"].map((ph, i) => (
              <g key={ph}>
                <circle cx={48 + i * 75} cy="70" r="27" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5">
                  <animate attributeName="stroke" values="#6366f1;#f43f5e;#6366f1" dur="4s" begin={`${i}s`} repeatCount="indefinite" />
                </circle>
                <text x={48 + i * 75 - 26} y="118" fill="#a5b4fc" fontSize="8">{ph}</text>
              </g>
            ))}
            {/* chromosomes per phase */}
            <g stroke="#f43f5e" strokeWidth="2.5">
              <line x1="40" y1="60" x2="56" y2="80" />
              <line x1="56" y1="60" x2="40" y2="80" />
              <line x1="123" y1="55" x2="123" y2="85" />
              <line x1="131" y1="55" x2="131" y2="85" />
              <line x1="185" y1="52" x2="185" y2="70" />
              <line x1="212" y1="72" x2="212" y2="90" />
              <line x1="265" y1="58" x2="265" y2="76" />
              <line x1="288" y1="58" x2="288" y2="76" />
            </g>
            <text x="60" y="146" fill="#94a3b8" fontSize="8">2 identical daughter cells (diploid, 2n)</text>
          </svg>
          <Caption>
            Mitosis mein ek cell se <strong>2 bilkul same</strong> cells bante hain (2n).
            Growth aur repair ke liye. Meiosis alag hai - us mein 4 cells bante hain
            aur chromosome number aadha (n) ho jaata hai.
          </Caption>
        </div>
      );

    case "photosynthesis":
      return (
        <div className={shell}>
          <Label>Bioenergetics: Photosynthesis</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <circle cx="42" cy="32" r="15" fill="#facc15">
              <animate attributeName="r" values="14;17;14" dur="2s" repeatCount="indefinite" />
            </circle>
            {[0, 1, 2].map((i) => (
              <line key={i} x1="56" y1={40 + i * 8} x2="120" y2={62 + i * 8} stroke="#fde047" strokeWidth="1.5" strokeDasharray="3 3">
                <animate attributeName="stroke-dashoffset" values="12;0" dur="0.8s" repeatCount="indefinite" />
              </line>
            ))}
            <ellipse cx="170" cy="85" rx="52" ry="38" fill="#16a34a" opacity="0.75" />
            <text x="146" y="89" fill="#fff" fontSize="10" fontWeight="bold">Leaf</text>
            <text x="8" y="120" fill="#7dd3fc" fontSize="9">CO&#8322; + H&#8322;O</text>
            <line x1="60" y1="115" x2="118" y2="100" stroke="#38bdf8" strokeWidth="2" />
            <line x1="222" y1="70" x2="284" y2="52" stroke="#4ade80" strokeWidth="2" />
            <text x="246" y="44" fill="#4ade80" fontSize="9">O&#8322;</text>
            <line x1="222" y1="100" x2="284" y2="118" stroke="#fb923c" strokeWidth="2" />
            <text x="240" y="136" fill="#fdba74" fontSize="9">C&#8326;H&#8321;&#8322;O&#8326;</text>
            <text x="60" y="160" fill="#64748b" fontSize="8">
              6CO&#8322; + 6H&#8322;O + light &rarr; C&#8326;H&#8321;&#8322;O&#8326; + 6O&#8322;
            </text>
          </svg>
          <Caption>
            Patta <strong>sunlight</strong>, CO&#8322; aur paani leta hai, aur chlorophyll ki
            madad se <strong>glucose</strong> banata hai - oxygen bahar nikalti hai. Yeh
            reaction chloroplast mein hoti hai.
          </Caption>
        </div>
      );

    case "heart":
      return (
        <div className={shell}>
          <Label>Transport: Heart &amp; Circulation</Label>
          <svg viewBox="0 0 320 170" className="w-full">
            <g>
              <animateTransform attributeName="transform" type="scale" values="1;1.06;1" dur="1.1s" repeatCount="indefinite" additive="sum" />
              <path
                d="M160,145 C110,110 105,60 132,45 C148,36 160,50 160,58 C160,50 172,36 188,45 C215,60 210,110 160,145 Z"
                fill="#dc2626"
                opacity="0.9"
              />
            </g>
            <text x="70" y="40" fill="#93c5fd" fontSize="9">Deoxygenated</text>
            <line x1="70" y1="46" x2="126" y2="62" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="215" y="40" fill="#fca5a5" fontSize="9">Oxygenated</text>
            <line x1="212" y1="46" x2="192" y2="62" stroke="#ef4444" strokeWidth="2.5" />
            <text x="96" y="112" fill="#e2e8f0" fontSize="8">Right</text>
            <text x="196" y="112" fill="#e2e8f0" fontSize="8">Left</text>
            <text x="52" y="163" fill="#64748b" fontSize="8">
              Body &rarr; Right atrium &rarr; Right ventricle &rarr; Lungs &rarr; Left side &rarr; Body
            </text>
          </svg>
          <Caption>
            Dil ke <strong>4 chambers</strong>: 2 atria (upar), 2 ventricles (neeche).
            Right side gandha (deoxygenated) khoon lungs bhejta hai, left side saaf
            khoon poore jism mein - isi ko <strong>double circulation</strong> kehte hain.
          </Caption>
        </div>
      );

    default:
      return null;
  }
}

/**
 * Picks a sensible animated diagram for a chapter/topic name. Returns null when
 * nothing matches, so the caller can fall back to the existing static diagram
 * rather than showing something misleading.
 */
export function diagramForTopic(subject: string, topic: string): AnimatedDiagramType | null {
  const t = `${topic}`.toLowerCase();
  const s = subject.toLowerCase();
  const has = (...w: string[]) => w.some((x) => t.includes(x));

  if (has("kinematic", "motion", "speed", "velocit", "accelerat")) return "motion-graph";
  if (has("dynamic", "newton", "force", "momentum", "friction")) return "newton-force";
  if (has("wave", "sound", "harmonic", "oscill")) return "wave";
  if (has("current", "circuit", "ohm", "electric", "electronics")) return "circuit";
  if (has("optic", "light", "lens", "mirror", "refract")) return "refraction";
  if (has("atom", "nuclear", "radioact", "isotope")) return "atom";
  if (has("bond", "molecul", "structure of molecule")) return "bonding";
  if (has("acid", "base", "salt", "ph ", "equilibrium")) return "ph-scale";
  if (has("cell cycle", "mitosis", "meiosis", "inherit", "genetic")) return "mitosis";
  if (has("photosynth", "bioenerg", "respirat")) return "photosynthesis";
  if (has("heart", "circulat", "transport", "blood", "homeostas")) return "heart";
  if (has("cell", "tissue", "organ")) return "cell";

  if (s === "physics") return "motion-graph";
  if (s === "chemistry") return "atom";
  if (s === "biology") return "cell";
  return null;
}
