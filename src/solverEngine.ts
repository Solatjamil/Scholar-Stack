/**
 * STEP-BY-STEP NUMERICAL SOLVER ENGINE
 * ------------------------------------------------------------------
 * A formula registry that solves for ANY unknown in a relation, showing the
 * full working the way a board examiner expects it:
 *
 *   Given data (with symbols and SI units)
 *   -> Core formula
 *   -> Rearrangement for the unknown
 *   -> Substitution with numbers
 *   -> Final answer with unit
 *
 * This is deliberately an engine, not a list of pre-solved sums: the student
 * types their own values (from any exercise, any board, any year) and gets
 * correct working. No AI, no network - just arithmetic and algebra that is
 * unit-tested.
 *
 * ACCURACY RULES followed here:
 *  - Every formula is a standard SSC/HSSC relation, written with its textbook
 *    symbols so it matches what students see in the PTB/FBISE book.
 *  - Solving is explicit per variable (a hand-written rearrangement string and
 *    a compute function), never a generic symbolic solver that could silently
 *    produce an invalid branch.
 *  - Domain guards reject physically impossible input (negative mass, division
 *    by zero, log of a non-positive number) instead of printing NaN/Infinity.
 */

export type SubjectKey = "physics" | "chemistry" | "math";
export type ClassKey = "9th" | "10th" | "11th" | "12th";

export interface VarSpec {
  /** Symbol as printed in the textbook, e.g. "v_f". */
  sym: string;
  /** Plain-language name shown next to the input. */
  name: string;
  /** SI (or conventional) unit label; empty for dimensionless quantities. */
  unit: string;
  /** Roman-Urdu hint so the student knows what to enter. */
  hint?: string;
  /** Reject values outside the physically meaningful domain. */
  positiveOnly?: boolean;
  nonZero?: boolean;
}

export interface SolveStep {
  label: string;
  /** Expression / working line. */
  value: string;
}

export interface Formula {
  id: string;
  subject: SubjectKey;
  /** Lowest class where this appears; it stays available for higher classes. */
  classLevel: ClassKey;
  chapter: string;
  title: string;
  /** The relation as printed in the book. */
  expression: string;
  /** Roman-Urdu one-liner explaining what it means. */
  romanUrdu: string;
  vars: VarSpec[];
  /**
   * Which symbols this engine can solve for, each with the rearranged form and
   * the computation. `v` maps symbol -> numeric value in SI units.
   */
  solveFor: Record<
    string,
    {
      rearranged: string;
      compute: (v: Record<string, number>) => number;
      /** Extra intermediate working lines, shown before the substitution. */
      steps?: (v: Record<string, number>) => SolveStep[];
      unit: string;
    }
  >;
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/** Format a number for display: avoids 0.30000000000000004 and 1e+21 noise. */
export function fmt(n: number, sig = 4): string {
  if (!Number.isFinite(n)) return "undefined";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e6 || abs < 1e-4) {
    return n
      .toExponential(Math.max(0, sig - 1))
      .replace(/e([+-])(\d+)/, " x 10^$1$2")
      .replace(/\+/, "");
  }
  const r = parseFloat(n.toPrecision(sig));
  return String(r);
}

export const G_ACCEL = 9.8; // m/s^2, the value PTB/FBISE books use

/* ------------------------------------------------------------------ *
 * PHYSICS
 * ------------------------------------------------------------------ */

const physicsFormulas: Formula[] = [
  {
    id: "phy-v-eq1",
    subject: "physics",
    classLevel: "9th",
    chapter: "Kinematics",
    title: "First equation of motion",
    expression: "v_f = v_i + a t",
    romanUrdu: "Final velocity = initial velocity + (acceleration x time).",
    vars: [
      { sym: "v_f", name: "Final velocity", unit: "m/s" },
      { sym: "v_i", name: "Initial velocity", unit: "m/s" },
      { sym: "a", name: "Acceleration", unit: "m/s²" },
      { sym: "t", name: "Time", unit: "s", positiveOnly: true },
    ],
    solveFor: {
      v_f: { rearranged: "v_f = v_i + a t", unit: "m/s", compute: (v) => v.v_i + v.a * v.t },
      v_i: { rearranged: "v_i = v_f − a t", unit: "m/s", compute: (v) => v.v_f - v.a * v.t },
      a: { rearranged: "a = (v_f − v_i) / t", unit: "m/s²", compute: (v) => (v.v_f - v.v_i) / v.t },
      t: { rearranged: "t = (v_f − v_i) / a", unit: "s", compute: (v) => (v.v_f - v.v_i) / v.a },
    },
  },
  {
    id: "phy-s-eq2",
    subject: "physics",
    classLevel: "9th",
    chapter: "Kinematics",
    title: "Second equation of motion",
    expression: "S = v_i t + ½ a t²",
    romanUrdu: "Tay ki gayi distance, initial velocity aur acceleration se nikalti hai.",
    vars: [
      { sym: "S", name: "Distance covered", unit: "m" },
      { sym: "v_i", name: "Initial velocity", unit: "m/s" },
      { sym: "a", name: "Acceleration", unit: "m/s²" },
      { sym: "t", name: "Time", unit: "s", positiveOnly: true },
    ],
    solveFor: {
      S: {
        rearranged: "S = v_i t + ½ a t²",
        unit: "m",
        compute: (v) => v.v_i * v.t + 0.5 * v.a * v.t * v.t,
        steps: (v) => [
          { label: "v_i t", value: `${fmt(v.v_i)} x ${fmt(v.t)} = ${fmt(v.v_i * v.t)} m` },
          {
            label: "½ a t²",
            value: `0.5 x ${fmt(v.a)} x (${fmt(v.t)})² = ${fmt(0.5 * v.a * v.t * v.t)} m`,
          },
        ],
      },
      a: {
        rearranged: "a = 2(S − v_i t) / t²",
        unit: "m/s²",
        compute: (v) => (2 * (v.S - v.v_i * v.t)) / (v.t * v.t),
      },
      v_i: {
        rearranged: "v_i = (S − ½ a t²) / t",
        unit: "m/s",
        compute: (v) => (v.S - 0.5 * v.a * v.t * v.t) / v.t,
      },
    },
  },
  {
    id: "phy-v2-eq3",
    subject: "physics",
    classLevel: "9th",
    chapter: "Kinematics",
    title: "Third equation of motion",
    expression: "2 a S = v_f² − v_i²",
    romanUrdu: "Jab time maloom na ho to yeh equation use karein.",
    vars: [
      { sym: "v_f", name: "Final velocity", unit: "m/s" },
      { sym: "v_i", name: "Initial velocity", unit: "m/s" },
      { sym: "a", name: "Acceleration", unit: "m/s²" },
      { sym: "S", name: "Distance", unit: "m" },
    ],
    solveFor: {
      v_f: {
        rearranged: "v_f = √(v_i² + 2 a S)",
        unit: "m/s",
        compute: (v) => Math.sqrt(v.v_i * v.v_i + 2 * v.a * v.S),
        steps: (v) => [
          { label: "v_i²", value: `(${fmt(v.v_i)})² = ${fmt(v.v_i * v.v_i)}` },
          { label: "2 a S", value: `2 x ${fmt(v.a)} x ${fmt(v.S)} = ${fmt(2 * v.a * v.S)}` },
          {
            label: "v_i² + 2aS",
            value: `${fmt(v.v_i * v.v_i + 2 * v.a * v.S)}`,
          },
        ],
      },
      a: {
        rearranged: "a = (v_f² − v_i²) / (2S)",
        unit: "m/s²",
        compute: (v) => (v.v_f * v.v_f - v.v_i * v.v_i) / (2 * v.S),
      },
      S: {
        rearranged: "S = (v_f² − v_i²) / (2a)",
        unit: "m",
        compute: (v) => (v.v_f * v.v_f - v.v_i * v.v_i) / (2 * v.a),
      },
    },
  },
  {
    id: "phy-newton2",
    subject: "physics",
    classLevel: "9th",
    chapter: "Dynamics",
    title: "Newton's second law",
    expression: "F = m a",
    romanUrdu: "Force = mass x acceleration. Force ka unit newton (N) hai.",
    vars: [
      { sym: "F", name: "Force", unit: "N" },
      { sym: "m", name: "Mass", unit: "kg", positiveOnly: true },
      { sym: "a", name: "Acceleration", unit: "m/s²" },
    ],
    solveFor: {
      F: { rearranged: "F = m a", unit: "N", compute: (v) => v.m * v.a },
      m: { rearranged: "m = F / a", unit: "kg", compute: (v) => v.F / v.a },
      a: { rearranged: "a = F / m", unit: "m/s²", compute: (v) => v.F / v.m },
    },
  },
  {
    id: "phy-momentum",
    subject: "physics",
    classLevel: "9th",
    chapter: "Dynamics",
    title: "Linear momentum",
    expression: "p = m v",
    romanUrdu: "Momentum = mass x velocity, direction ke saath (vector quantity).",
    vars: [
      { sym: "p", name: "Momentum", unit: "kg·m/s" },
      { sym: "m", name: "Mass", unit: "kg", positiveOnly: true },
      { sym: "v", name: "Velocity", unit: "m/s" },
    ],
    solveFor: {
      p: { rearranged: "p = m v", unit: "kg·m/s", compute: (v) => v.m * v.v },
      m: { rearranged: "m = p / v", unit: "kg", compute: (v) => v.p / v.v },
      v: { rearranged: "v = p / m", unit: "m/s", compute: (v) => v.p / v.m },
    },
  },
  {
    id: "phy-torque",
    subject: "physics",
    classLevel: "9th",
    chapter: "Turning Effect of Forces",
    title: "Torque (moment of force)",
    expression: "τ = F × L",
    romanUrdu: "Torque = force x moment arm. Darwaza kholne mein yehi kaam karta hai.",
    vars: [
      { sym: "τ", name: "Torque", unit: "N·m" },
      { sym: "F", name: "Force", unit: "N" },
      { sym: "L", name: "Moment arm", unit: "m", positiveOnly: true },
    ],
    solveFor: {
      "τ": { rearranged: "τ = F L", unit: "N·m", compute: (v) => v.F * v.L },
      F: { rearranged: "F = τ / L", unit: "N", compute: (v) => v["τ"] / v.L },
      L: { rearranged: "L = τ / F", unit: "m", compute: (v) => v["τ"] / v.F },
    },
  },
  {
    id: "phy-gravitation",
    subject: "physics",
    classLevel: "9th",
    chapter: "Gravitation",
    title: "Newton's law of gravitation",
    expression: "F = G m₁ m₂ / r²",
    romanUrdu: "Do masses ke darmiyan attraction force. G = 6.673 x 10⁻¹¹ N·m²/kg².",
    vars: [
      { sym: "F", name: "Gravitational force", unit: "N" },
      { sym: "m1", name: "First mass", unit: "kg", positiveOnly: true },
      { sym: "m2", name: "Second mass", unit: "kg", positiveOnly: true },
      { sym: "r", name: "Distance between centres", unit: "m", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      F: {
        rearranged: "F = G m₁ m₂ / r²",
        unit: "N",
        compute: (v) => (6.673e-11 * v.m1 * v.m2) / (v.r * v.r),
        steps: (v) => [
          { label: "m₁ m₂", value: `${fmt(v.m1)} x ${fmt(v.m2)} = ${fmt(v.m1 * v.m2)}` },
          { label: "r²", value: `(${fmt(v.r)})² = ${fmt(v.r * v.r)}` },
          { label: "G", value: "6.673 x 10⁻¹¹ N·m²/kg²" },
        ],
      },
    },
  },
  {
    id: "phy-work",
    subject: "physics",
    classLevel: "9th",
    chapter: "Work and Energy",
    title: "Work done",
    expression: "W = F S cos θ",
    romanUrdu: "Kaam tabhi hota hai jab force lagne par jism harkat kare.",
    vars: [
      { sym: "W", name: "Work", unit: "J" },
      { sym: "F", name: "Force", unit: "N" },
      { sym: "S", name: "Displacement", unit: "m" },
      { sym: "θ", name: "Angle between F and S", unit: "degrees", hint: "Seedha kaam ho to 0 likhein" },
    ],
    solveFor: {
      W: {
        rearranged: "W = F S cos θ",
        unit: "J",
        compute: (v) => v.F * v.S * Math.cos((v["θ"] * Math.PI) / 180),
        steps: (v) => [
          {
            label: "cos θ",
            value: `cos(${fmt(v["θ"])}°) = ${fmt(Math.cos((v["θ"] * Math.PI) / 180))}`,
          },
        ],
      },
    },
  },
  {
    id: "phy-ke",
    subject: "physics",
    classLevel: "9th",
    chapter: "Work and Energy",
    title: "Kinetic energy",
    expression: "K.E = ½ m v²",
    romanUrdu: "Harkat ki wajah se jo energy hoti hai.",
    vars: [
      { sym: "KE", name: "Kinetic energy", unit: "J" },
      { sym: "m", name: "Mass", unit: "kg", positiveOnly: true },
      { sym: "v", name: "Velocity", unit: "m/s" },
    ],
    solveFor: {
      KE: {
        rearranged: "K.E = ½ m v²",
        unit: "J",
        compute: (v) => 0.5 * v.m * v.v * v.v,
        steps: (v) => [{ label: "v²", value: `(${fmt(v.v)})² = ${fmt(v.v * v.v)}` }],
      },
      v: {
        rearranged: "v = √(2 K.E / m)",
        unit: "m/s",
        compute: (v) => Math.sqrt((2 * v.KE) / v.m),
      },
      m: { rearranged: "m = 2 K.E / v²", unit: "kg", compute: (v) => (2 * v.KE) / (v.v * v.v) },
    },
  },
  {
    id: "phy-pe",
    subject: "physics",
    classLevel: "9th",
    chapter: "Work and Energy",
    title: "Potential energy",
    expression: "P.E = m g h",
    romanUrdu: "Bulandi ki wajah se jo energy jama hoti hai. g = 9.8 m/s².",
    vars: [
      { sym: "PE", name: "Potential energy", unit: "J" },
      { sym: "m", name: "Mass", unit: "kg", positiveOnly: true },
      { sym: "h", name: "Height", unit: "m", positiveOnly: true },
    ],
    solveFor: {
      PE: { rearranged: "P.E = m g h", unit: "J", compute: (v) => v.m * G_ACCEL * v.h },
      h: { rearranged: "h = P.E / (m g)", unit: "m", compute: (v) => v.PE / (v.m * G_ACCEL) },
      m: { rearranged: "m = P.E / (g h)", unit: "kg", compute: (v) => v.PE / (G_ACCEL * v.h) },
    },
  },
  {
    id: "phy-power",
    subject: "physics",
    classLevel: "9th",
    chapter: "Work and Energy",
    title: "Power",
    expression: "P = W / t",
    romanUrdu: "Kaam karne ki raftaar. 1 watt = 1 joule per second.",
    vars: [
      { sym: "P", name: "Power", unit: "W" },
      { sym: "W", name: "Work done", unit: "J" },
      { sym: "t", name: "Time", unit: "s", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      P: { rearranged: "P = W / t", unit: "W", compute: (v) => v.W / v.t },
      W: { rearranged: "W = P t", unit: "J", compute: (v) => v.P * v.t },
      t: { rearranged: "t = W / P", unit: "s", compute: (v) => v.W / v.P },
    },
  },
  {
    id: "phy-pressure",
    subject: "physics",
    classLevel: "9th",
    chapter: "Properties of Matter",
    title: "Pressure",
    expression: "P = F / A",
    romanUrdu: "Per unit area par lagne wali force. Unit pascal (Pa).",
    vars: [
      { sym: "P", name: "Pressure", unit: "Pa" },
      { sym: "F", name: "Force", unit: "N" },
      { sym: "A", name: "Area", unit: "m²", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      P: { rearranged: "P = F / A", unit: "Pa", compute: (v) => v.F / v.A },
      F: { rearranged: "F = P A", unit: "N", compute: (v) => v.P * v.A },
      A: { rearranged: "A = F / P", unit: "m²", compute: (v) => v.F / v.P },
    },
  },
  {
    id: "phy-density",
    subject: "physics",
    classLevel: "9th",
    chapter: "Properties of Matter",
    title: "Density",
    expression: "ρ = m / V",
    romanUrdu: "Per unit volume mein kitna mass hai.",
    vars: [
      { sym: "ρ", name: "Density", unit: "kg/m³" },
      { sym: "m", name: "Mass", unit: "kg", positiveOnly: true },
      { sym: "V", name: "Volume", unit: "m³", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      "ρ": { rearranged: "ρ = m / V", unit: "kg/m³", compute: (v) => v.m / v.V },
      m: { rearranged: "m = ρ V", unit: "kg", compute: (v) => v["ρ"] * v.V },
      V: { rearranged: "V = m / ρ", unit: "m³", compute: (v) => v.m / v["ρ"] },
    },
  },
  {
    id: "phy-heat",
    subject: "physics",
    classLevel: "9th",
    chapter: "Thermal Properties of Matter",
    title: "Specific heat capacity",
    expression: "Q = m c ΔT",
    romanUrdu: "Kisi cheez ka temperature barhane ke liye darkar heat.",
    vars: [
      { sym: "Q", name: "Heat absorbed", unit: "J" },
      { sym: "m", name: "Mass", unit: "kg", positiveOnly: true },
      { sym: "c", name: "Specific heat capacity", unit: "J/kg·K", hint: "Paani ke liye 4200" },
      { sym: "ΔT", name: "Temperature change", unit: "K" },
    ],
    solveFor: {
      Q: { rearranged: "Q = m c ΔT", unit: "J", compute: (v) => v.m * v.c * v["ΔT"] },
      c: { rearranged: "c = Q / (m ΔT)", unit: "J/kg·K", compute: (v) => v.Q / (v.m * v["ΔT"]) },
      "ΔT": { rearranged: "ΔT = Q / (m c)", unit: "K", compute: (v) => v.Q / (v.m * v.c) },
    },
  },
  {
    id: "phy-wave",
    subject: "physics",
    classLevel: "10th",
    chapter: "Simple Harmonic Motion and Waves",
    title: "Wave equation",
    expression: "v = f λ",
    romanUrdu: "Wave speed = frequency x wavelength.",
    vars: [
      { sym: "v", name: "Wave speed", unit: "m/s" },
      { sym: "f", name: "Frequency", unit: "Hz", positiveOnly: true },
      { sym: "λ", name: "Wavelength", unit: "m", positiveOnly: true },
    ],
    solveFor: {
      v: { rearranged: "v = f λ", unit: "m/s", compute: (v) => v.f * v["λ"] },
      f: { rearranged: "f = v / λ", unit: "Hz", compute: (v) => v.v / v["λ"] },
      "λ": { rearranged: "λ = v / f", unit: "m", compute: (v) => v.v / v.f },
    },
  },
  {
    id: "phy-timeperiod",
    subject: "physics",
    classLevel: "10th",
    chapter: "Simple Harmonic Motion and Waves",
    title: "Time period and frequency",
    expression: "T = 1 / f",
    romanUrdu: "Ek complete vibration mein lagne wala waqt.",
    vars: [
      { sym: "T", name: "Time period", unit: "s", positiveOnly: true, nonZero: true },
      { sym: "f", name: "Frequency", unit: "Hz", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      T: { rearranged: "T = 1 / f", unit: "s", compute: (v) => 1 / v.f },
      f: { rearranged: "f = 1 / T", unit: "Hz", compute: (v) => 1 / v.T },
    },
  },
  {
    id: "phy-pendulum",
    subject: "physics",
    classLevel: "10th",
    chapter: "Simple Harmonic Motion and Waves",
    title: "Simple pendulum",
    expression: "T = 2π √(L / g)",
    romanUrdu: "Pendulum ka time period sirf lambai par depend karta hai, mass par nahi.",
    vars: [
      { sym: "T", name: "Time period", unit: "s" },
      { sym: "L", name: "Length of pendulum", unit: "m", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      T: {
        rearranged: "T = 2π √(L / g)",
        unit: "s",
        compute: (v) => 2 * Math.PI * Math.sqrt(v.L / G_ACCEL),
        steps: (v) => [
          { label: "L / g", value: `${fmt(v.L)} / 9.8 = ${fmt(v.L / G_ACCEL)}` },
          { label: "√(L/g)", value: `${fmt(Math.sqrt(v.L / G_ACCEL))}` },
        ],
      },
      L: {
        rearranged: "L = g T² / (4π²)",
        unit: "m",
        compute: (v) => (G_ACCEL * v.T * v.T) / (4 * Math.PI * Math.PI),
      },
    },
  },
  {
    id: "phy-snell",
    subject: "physics",
    classLevel: "10th",
    chapter: "Geometrical Optics",
    title: "Refractive index (Snell's law)",
    expression: "n = sin i / sin r",
    romanUrdu: "Light jab medium badalti hai to kitni mudti hai.",
    vars: [
      { sym: "n", name: "Refractive index", unit: "" },
      { sym: "i", name: "Angle of incidence", unit: "degrees" },
      { sym: "r", name: "Angle of refraction", unit: "degrees" },
    ],
    solveFor: {
      n: {
        rearranged: "n = sin i / sin r",
        unit: "",
        compute: (v) =>
          Math.sin((v.i * Math.PI) / 180) / Math.sin((v.r * Math.PI) / 180),
        steps: (v) => [
          { label: "sin i", value: `sin(${fmt(v.i)}°) = ${fmt(Math.sin((v.i * Math.PI) / 180))}` },
          { label: "sin r", value: `sin(${fmt(v.r)}°) = ${fmt(Math.sin((v.r * Math.PI) / 180))}` },
        ],
      },
    },
  },
  {
    id: "phy-lens",
    subject: "physics",
    classLevel: "10th",
    chapter: "Geometrical Optics",
    title: "Lens equation",
    expression: "1/f = 1/p + 1/q",
    romanUrdu: "Object distance (p), image distance (q) aur focal length (f) ka rishta.",
    vars: [
      { sym: "f", name: "Focal length", unit: "cm", nonZero: true },
      { sym: "p", name: "Object distance", unit: "cm", nonZero: true },
      { sym: "q", name: "Image distance", unit: "cm", nonZero: true },
    ],
    solveFor: {
      f: {
        rearranged: "f = pq / (p + q)",
        unit: "cm",
        compute: (v) => (v.p * v.q) / (v.p + v.q),
      },
      q: { rearranged: "q = pf / (p − f)", unit: "cm", compute: (v) => (v.p * v.f) / (v.p - v.f) },
      p: { rearranged: "p = qf / (q − f)", unit: "cm", compute: (v) => (v.q * v.f) / (v.q - v.f) },
    },
  },
  {
    id: "phy-power-lens",
    subject: "physics",
    classLevel: "10th",
    chapter: "Geometrical Optics",
    title: "Power of a lens",
    expression: "P = 1 / f (metres)",
    romanUrdu: "Lens ki power diopter (D) mein, focal length metre mein.",
    vars: [
      { sym: "P", name: "Power of lens", unit: "D" },
      { sym: "f", name: "Focal length", unit: "m", nonZero: true },
    ],
    solveFor: {
      P: { rearranged: "P = 1 / f", unit: "D", compute: (v) => 1 / v.f },
      f: { rearranged: "f = 1 / P", unit: "m", compute: (v) => 1 / v.P },
    },
  },
  {
    id: "phy-ohm",
    subject: "physics",
    classLevel: "10th",
    chapter: "Current Electricity",
    title: "Ohm's law",
    expression: "V = I R",
    romanUrdu: "Voltage = current x resistance.",
    vars: [
      { sym: "V", name: "Voltage", unit: "V" },
      { sym: "I", name: "Current", unit: "A" },
      { sym: "R", name: "Resistance", unit: "Ω" },
    ],
    solveFor: {
      V: { rearranged: "V = I R", unit: "V", compute: (v) => v.I * v.R },
      I: { rearranged: "I = V / R", unit: "A", compute: (v) => v.V / v.R },
      R: { rearranged: "R = V / I", unit: "Ω", compute: (v) => v.V / v.I },
    },
  },
  {
    id: "phy-elec-power",
    subject: "physics",
    classLevel: "10th",
    chapter: "Current Electricity",
    title: "Electrical power",
    expression: "P = V I",
    romanUrdu: "Bijli ka kharch. Bulb par likha watt yehi hota hai.",
    vars: [
      { sym: "P", name: "Power", unit: "W" },
      { sym: "V", name: "Voltage", unit: "V" },
      { sym: "I", name: "Current", unit: "A" },
    ],
    solveFor: {
      P: {
        rearranged: "P = V I",
        unit: "W",
        compute: (v) => v.V * v.I,
      },
      V: { rearranged: "V = P / I", unit: "V", compute: (v) => v.P / v.I },
      I: { rearranged: "I = P / V", unit: "A", compute: (v) => v.P / v.V },
    },
  },
  {
    id: "phy-charge",
    subject: "physics",
    classLevel: "10th",
    chapter: "Current Electricity",
    title: "Charge, current and time",
    expression: "Q = I t",
    romanUrdu: "Kitna charge guzra = current x time.",
    vars: [
      { sym: "Q", name: "Charge", unit: "C" },
      { sym: "I", name: "Current", unit: "A" },
      { sym: "t", name: "Time", unit: "s", positiveOnly: true },
    ],
    solveFor: {
      Q: { rearranged: "Q = I t", unit: "C", compute: (v) => v.I * v.t },
      I: { rearranged: "I = Q / t", unit: "A", compute: (v) => v.Q / v.t },
      t: { rearranged: "t = Q / I", unit: "s", compute: (v) => v.Q / v.I },
    },
  },
  {
    id: "phy-coulomb",
    subject: "physics",
    classLevel: "10th",
    chapter: "Electrostatics",
    title: "Coulomb's law",
    expression: "F = k q₁ q₂ / r²",
    romanUrdu: "Do charges ke darmiyan force. k = 9 x 10⁹ N·m²/C².",
    vars: [
      { sym: "q1", name: "First charge", unit: "C" },
      { sym: "q2", name: "Second charge", unit: "C" },
      { sym: "r", name: "Distance apart", unit: "m", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      F: {
        rearranged: "F = k q₁ q₂ / r²",
        unit: "N",
        compute: (v) => (9e9 * v.q1 * v.q2) / (v.r * v.r),
        steps: (v) => [
          { label: "q₁ q₂", value: `${fmt(v.q1)} x ${fmt(v.q2)} = ${fmt(v.q1 * v.q2)}` },
          { label: "r²", value: `(${fmt(v.r)})² = ${fmt(v.r * v.r)}` },
          { label: "k", value: "9 x 10⁹ N·m²/C²" },
        ],
      },
    },
  },
  {
    id: "phy-halflife",
    subject: "physics",
    classLevel: "10th",
    chapter: "Atomic and Nuclear Physics",
    title: "Radioactive half-life",
    expression: "N = N₀ (1/2)^(t / T½)",
    romanUrdu: "Har half-life ke baad radioactive material aadha reh jaata hai.",
    vars: [
      { sym: "N0", name: "Initial amount", unit: "", positiveOnly: true },
      { sym: "t", name: "Time elapsed", unit: "s", positiveOnly: true },
      { sym: "T", name: "Half-life", unit: "s", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      N: {
        rearranged: "N = N₀ x (1/2)^(t / T½)",
        unit: "",
        compute: (v) => v.N0 * Math.pow(0.5, v.t / v.T),
        steps: (v) => [
          { label: "Number of half-lives", value: `t / T½ = ${fmt(v.t)} / ${fmt(v.T)} = ${fmt(v.t / v.T)}` },
          { label: "(1/2)^n", value: `${fmt(Math.pow(0.5, v.t / v.T))}` },
        ],
      },
    },
  },
];

/* ------------------------------------------------------------------ *
 * CHEMISTRY
 * ------------------------------------------------------------------ */

const chemistryFormulas: Formula[] = [
  {
    id: "chem-moles",
    subject: "chemistry",
    classLevel: "9th",
    chapter: "Fundamentals of Chemistry",
    title: "Moles from mass",
    expression: "n = m / M",
    romanUrdu: "Moles = diya gaya mass / molar mass.",
    vars: [
      { sym: "n", name: "Number of moles", unit: "mol" },
      { sym: "m", name: "Given mass", unit: "g", positiveOnly: true },
      { sym: "M", name: "Molar mass", unit: "g/mol", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      n: { rearranged: "n = m / M", unit: "mol", compute: (v) => v.m / v.M },
      m: { rearranged: "m = n M", unit: "g", compute: (v) => v.n * v.M },
      M: { rearranged: "M = m / n", unit: "g/mol", compute: (v) => v.m / v.n },
    },
  },
  {
    id: "chem-avogadro",
    subject: "chemistry",
    classLevel: "9th",
    chapter: "Fundamentals of Chemistry",
    title: "Number of particles (Avogadro)",
    expression: "N = n × N_A",
    romanUrdu: "1 mole mein 6.022 x 10²³ particles hote hain.",
    vars: [
      { sym: "n", name: "Number of moles", unit: "mol", positiveOnly: true },
    ],
    solveFor: {
      N: {
        rearranged: "N = n x 6.022 x 10²³",
        unit: "particles",
        compute: (v) => v.n * 6.022e23,
        steps: () => [{ label: "N_A", value: "6.022 x 10²³ particles/mol" }],
      },
    },
  },
  {
    id: "chem-molarity",
    subject: "chemistry",
    classLevel: "9th",
    chapter: "Solutions",
    title: "Molarity",
    expression: "M = n / V(dm³)",
    romanUrdu: "Ek litre solution mein kitne moles solute hain.",
    vars: [
      { sym: "M", name: "Molarity", unit: "mol/dm³" },
      { sym: "n", name: "Moles of solute", unit: "mol", positiveOnly: true },
      { sym: "V", name: "Volume of solution", unit: "dm³", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      M: { rearranged: "M = n / V", unit: "mol/dm³", compute: (v) => v.n / v.V },
      n: { rearranged: "n = M V", unit: "mol", compute: (v) => v.M * v.V },
      V: { rearranged: "V = n / M", unit: "dm³", compute: (v) => v.n / v.M },
    },
  },
  {
    id: "chem-percent",
    subject: "chemistry",
    classLevel: "9th",
    chapter: "Solutions",
    title: "Percentage composition (w/w)",
    expression: "% = (mass of solute / mass of solution) × 100",
    romanUrdu: "Solution ke total mass mein solute ka hissa, percent mein.",
    vars: [
      { sym: "ms", name: "Mass of solute", unit: "g", positiveOnly: true },
      { sym: "mt", name: "Mass of solution", unit: "g", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      pct: {
        rearranged: "% = (m_solute / m_solution) x 100",
        unit: "%",
        compute: (v) => (v.ms / v.mt) * 100,
      },
    },
  },
  {
    id: "chem-ph",
    subject: "chemistry",
    classLevel: "10th",
    chapter: "Acids, Bases and Salts",
    title: "pH of a solution",
    expression: "pH = −log[H⁺]",
    romanUrdu: "Hydrogen ion concentration se pH nikaalna.",
    vars: [
      { sym: "H", name: "[H⁺] concentration", unit: "mol/dm³", positiveOnly: true, nonZero: true },
    ],
    solveFor: {
      pH: {
        rearranged: "pH = −log[H⁺]",
        unit: "",
        compute: (v) => -Math.log10(v.H),
        steps: (v) => [
          { label: "log[H⁺]", value: `log(${fmt(v.H)}) = ${fmt(Math.log10(v.H))}` },
        ],
      },
    },
  },
  {
    id: "chem-poh",
    subject: "chemistry",
    classLevel: "10th",
    chapter: "Acids, Bases and Salts",
    title: "pH and pOH relation",
    expression: "pH + pOH = 14",
    romanUrdu: "25°C par pH aur pOH ka total hamesha 14 hota hai.",
    vars: [{ sym: "pOH", name: "pOH value", unit: "" }],
    solveFor: {
      pH: { rearranged: "pH = 14 − pOH", unit: "", compute: (v) => 14 - v.pOH },
    },
  },
];

/* ------------------------------------------------------------------ *
 * MATHEMATICS
 * ------------------------------------------------------------------ */

const mathFormulas: Formula[] = [
  {
    id: "math-quadratic",
    subject: "math",
    classLevel: "10th",
    chapter: "Quadratic Equations",
    title: "Quadratic formula",
    expression: "x = [−b ± √(b² − 4ac)] / 2a",
    romanUrdu: "ax² + bx + c = 0 ki roots nikalne ka formula.",
    vars: [
      { sym: "a", name: "Coefficient a", unit: "", nonZero: true },
      { sym: "b", name: "Coefficient b", unit: "" },
      { sym: "c", name: "Constant c", unit: "" },
    ],
    solveFor: {
      x1: {
        rearranged: "x = [−b + √(b² − 4ac)] / 2a",
        unit: "",
        compute: (v) => (-v.b + Math.sqrt(v.b * v.b - 4 * v.a * v.c)) / (2 * v.a),
        steps: (v) => {
          const d = v.b * v.b - 4 * v.a * v.c;
          return [
            { label: "Discriminant b² − 4ac", value: `(${fmt(v.b)})² − 4(${fmt(v.a)})(${fmt(v.c)}) = ${fmt(d)}` },
            {
              label: "Nature of roots",
              value:
                d > 0
                  ? "D > 0, so roots are real and distinct"
                  : d === 0
                  ? "D = 0, so roots are real and equal"
                  : "D < 0, so roots are imaginary (no real root)",
            },
            { label: "√D", value: d >= 0 ? fmt(Math.sqrt(d)) : "not real" },
          ];
        },
      },
      x2: {
        rearranged: "x = [−b − √(b² − 4ac)] / 2a",
        unit: "",
        compute: (v) => (-v.b - Math.sqrt(v.b * v.b - 4 * v.a * v.c)) / (2 * v.a),
      },
    },
  },
  {
    id: "math-distance",
    subject: "math",
    classLevel: "10th",
    chapter: "Introduction to Coordinate Geometry",
    title: "Distance between two points",
    expression: "d = √[(x₂−x₁)² + (y₂−y₁)²]",
    romanUrdu: "Do points ke darmiyan seedha faasla.",
    vars: [
      { sym: "x1", name: "x₁", unit: "" },
      { sym: "y1", name: "y₁", unit: "" },
      { sym: "x2", name: "x₂", unit: "" },
      { sym: "y2", name: "y₂", unit: "" },
    ],
    solveFor: {
      d: {
        rearranged: "d = √[(x₂−x₁)² + (y₂−y₁)²]",
        unit: "units",
        compute: (v) => Math.hypot(v.x2 - v.x1, v.y2 - v.y1),
        steps: (v) => [
          { label: "x₂ − x₁", value: `${fmt(v.x2)} − ${fmt(v.x1)} = ${fmt(v.x2 - v.x1)}` },
          { label: "y₂ − y₁", value: `${fmt(v.y2)} − ${fmt(v.y1)} = ${fmt(v.y2 - v.y1)}` },
          {
            label: "Sum of squares",
            value: `(${fmt(v.x2 - v.x1)})² + (${fmt(v.y2 - v.y1)})² = ${fmt(
              (v.x2 - v.x1) ** 2 + (v.y2 - v.y1) ** 2
            )}`,
          },
        ],
      },
    },
  },
  {
    id: "math-midpoint",
    subject: "math",
    classLevel: "10th",
    chapter: "Introduction to Coordinate Geometry",
    title: "Midpoint of a line segment",
    expression: "M = ((x₁+x₂)/2, (y₁+y₂)/2)",
    romanUrdu: "Line ke beech wale point ke coordinates.",
    vars: [
      { sym: "x1", name: "x₁", unit: "" },
      { sym: "y1", name: "y₁", unit: "" },
      { sym: "x2", name: "x₂", unit: "" },
      { sym: "y2", name: "y₂", unit: "" },
    ],
    solveFor: {
      Mx: { rearranged: "x = (x₁ + x₂) / 2", unit: "", compute: (v) => (v.x1 + v.x2) / 2 },
      My: { rearranged: "y = (y₁ + y₂) / 2", unit: "", compute: (v) => (v.y1 + v.y2) / 2 },
    },
  },
  {
    id: "math-slope",
    subject: "math",
    classLevel: "10th",
    chapter: "Introduction to Coordinate Geometry",
    title: "Slope of a line",
    expression: "m = (y₂ − y₁) / (x₂ − x₁)",
    romanUrdu: "Line kitni tirchi hai, yani uska jhukao.",
    vars: [
      { sym: "x1", name: "x₁", unit: "" },
      { sym: "y1", name: "y₁", unit: "" },
      { sym: "x2", name: "x₂", unit: "" },
      { sym: "y2", name: "y₂", unit: "" },
    ],
    solveFor: {
      m: {
        rearranged: "m = (y₂ − y₁) / (x₂ − x₁)",
        unit: "",
        compute: (v) => (v.y2 - v.y1) / (v.x2 - v.x1),
      },
    },
  },
  {
    id: "math-arc",
    subject: "math",
    classLevel: "10th",
    chapter: "Introduction to Trigonometry",
    title: "Arc length (radian measure)",
    expression: "S = r θ",
    romanUrdu: "Arc ki lambai = radius x angle (radians mein).",
    vars: [
      { sym: "r", name: "Radius", unit: "cm", positiveOnly: true },
      { sym: "θ", name: "Central angle", unit: "radians" },
    ],
    solveFor: {
      S: { rearranged: "S = r θ", unit: "cm", compute: (v) => v.r * v["θ"] },
      r: { rearranged: "r = S / θ", unit: "cm", compute: (v) => v.S / v["θ"] },
      "θ": { rearranged: "θ = S / r", unit: "rad", compute: (v) => v.S / v.r },
    },
  },
  {
    id: "math-compound",
    subject: "math",
    classLevel: "9th",
    chapter: "Percentage, Ratio and Proportion",
    title: "Compound interest / growth",
    expression: "A = P (1 + r)^n",
    romanUrdu: "Asal raqam par munafa jab har saal barhta jaye.",
    vars: [
      { sym: "P", name: "Principal amount", unit: "Rs", positiveOnly: true },
      { sym: "r", name: "Rate per period (decimal)", unit: "", hint: "10% ke liye 0.10 likhein" },
      { sym: "n", name: "Number of periods", unit: "", positiveOnly: true },
    ],
    solveFor: {
      A: {
        rearranged: "A = P (1 + r)^n",
        unit: "Rs",
        compute: (v) => v.P * Math.pow(1 + v.r, v.n),
        steps: (v) => [
          { label: "1 + r", value: `${fmt(1 + v.r)}` },
          { label: "(1+r)^n", value: `${fmt(Math.pow(1 + v.r, v.n))}` },
        ],
      },
    },
  },
  {
    id: "math-sphere",
    subject: "math",
    classLevel: "9th",
    chapter: "Mensuration",
    title: "Volume and surface area of a sphere",
    expression: "V = (4/3)πr³ , A = 4πr²",
    romanUrdu: "Gol shakal ka hajm aur bairooni raqba.",
    vars: [{ sym: "r", name: "Radius", unit: "cm", positiveOnly: true }],
    solveFor: {
      V: {
        rearranged: "V = (4/3) π r³",
        unit: "cm³",
        compute: (v) => (4 / 3) * Math.PI * Math.pow(v.r, 3),
        steps: (v) => [{ label: "r³", value: `(${fmt(v.r)})³ = ${fmt(Math.pow(v.r, 3))}` }],
      },
      A: {
        rearranged: "A = 4 π r²",
        unit: "cm²",
        compute: (v) => 4 * Math.PI * v.r * v.r,
      },
    },
  },
  {
    id: "math-cylinder",
    subject: "math",
    classLevel: "9th",
    chapter: "Mensuration",
    title: "Volume of a cylinder",
    expression: "V = π r² h",
    romanUrdu: "Belan numa shakal ka hajm.",
    vars: [
      { sym: "r", name: "Radius", unit: "cm", positiveOnly: true },
      { sym: "h", name: "Height", unit: "cm", positiveOnly: true },
    ],
    solveFor: {
      V: {
        rearranged: "V = π r² h",
        unit: "cm³",
        compute: (v) => Math.PI * v.r * v.r * v.h,
        steps: (v) => [{ label: "r²", value: `(${fmt(v.r)})² = ${fmt(v.r * v.r)}` }],
      },
      h: { rearranged: "h = V / (π r²)", unit: "cm", compute: (v) => v.V / (Math.PI * v.r * v.r) },
    },
  },
  {
    id: "math-derivative-power",
    subject: "math",
    classLevel: "12th",
    chapter: "Differentiation",
    title: "Power rule for differentiation",
    expression: "d/dx (a xⁿ) = n a xⁿ⁻¹",
    romanUrdu: "Power ko neeche laayein, phir power se 1 minus karein.",
    vars: [
      { sym: "a", name: "Coefficient a", unit: "" },
      { sym: "n", name: "Power n", unit: "" },
      { sym: "x", name: "Value of x", unit: "" },
    ],
    solveFor: {
      dydx: {
        rearranged: "dy/dx = n a x^(n−1)",
        unit: "",
        compute: (v) => v.n * v.a * Math.pow(v.x, v.n - 1),
        steps: (v) => [
          { label: "Derivative", value: `dy/dx = ${fmt(v.n * v.a)} x^${fmt(v.n - 1)}` },
          { label: "Substituting x", value: `x = ${fmt(v.x)}` },
        ],
      },
    },
  },
  {
    id: "math-integral-power",
    subject: "math",
    classLevel: "12th",
    chapter: "Integration",
    title: "Power rule for integration",
    expression: "∫ a xⁿ dx = a x^(n+1)/(n+1) + C",
    romanUrdu: "Power mein 1 jama karein, phir usi se divide karein.",
    vars: [
      { sym: "a", name: "Coefficient a", unit: "" },
      { sym: "n", name: "Power n", unit: "", hint: "n = −1 allowed nahi (log case)" },
      { sym: "x", name: "Evaluate at x", unit: "" },
    ],
    solveFor: {
      integral: {
        rearranged: "∫ a xⁿ dx = a x^(n+1) / (n+1) + C",
        unit: "",
        compute: (v) => (v.a * Math.pow(v.x, v.n + 1)) / (v.n + 1),
        steps: (v) => [
          { label: "n + 1", value: `${fmt(v.n + 1)}` },
          {
            label: "Antiderivative",
            value: `${fmt(v.a / (v.n + 1))} x^${fmt(v.n + 1)} + C`,
          },
        ],
      },
    },
  },
];

export const ALL_FORMULAS: Formula[] = [
  ...physicsFormulas,
  ...chemistryFormulas,
  ...mathFormulas,
];

/* ------------------------------------------------------------------ *
 * Solving
 * ------------------------------------------------------------------ */

export interface SolveResult {
  ok: boolean;
  error?: string;
  given: SolveStep[];
  formula: string;
  rearranged: string;
  steps: SolveStep[];
  answer: string;
  answerRaw?: number;
}

const CLASS_ORDER: ClassKey[] = ["9th", "10th", "11th", "12th"];

/** Formulas available to a student in a given class (their level and below). */
export function formulasFor(classLevel: ClassKey, subject?: SubjectKey): Formula[] {
  const maxIdx = CLASS_ORDER.indexOf(classLevel);
  return ALL_FORMULAS.filter((f) => {
    if (subject && f.subject !== subject) return false;
    return CLASS_ORDER.indexOf(f.classLevel) <= maxIdx;
  });
}

/**
 * Solve `target` for a formula given the student's inputs.
 *
 * Inputs arrive as strings straight from text fields, so everything is
 * validated before any arithmetic: missing values, non-numeric text and
 * domain violations each produce a specific message rather than NaN.
 */
export function solve(
  formula: Formula,
  target: string,
  inputs: Record<string, string>
): SolveResult {
  const branch = formula.solveFor[target];
  const empty: SolveResult = {
    ok: false,
    given: [],
    formula: formula.expression,
    rearranged: "",
    steps: [],
    answer: "",
  };
  if (!branch) return { ...empty, error: `Cannot solve for ${target}.` };

  // Required = every declared variable except the one being solved for, but
  // only those the branch actually needs. We infer need from the vars list.
  const needed = formula.vars.filter((v) => v.sym !== target);
  const values: Record<string, number> = {};
  const given: SolveStep[] = [];

  for (const spec of needed) {
    const raw = (inputs[spec.sym] ?? "").trim();
    if (raw === "") {
      return { ...empty, error: `Please enter a value for ${spec.name} (${spec.sym}).` };
    }
    const num = Number(raw);
    if (!Number.isFinite(num)) {
      return { ...empty, error: `"${raw}" is not a valid number for ${spec.sym}.` };
    }
    if (spec.positiveOnly && num < 0) {
      return { ...empty, error: `${spec.name} cannot be negative.` };
    }
    if (spec.nonZero && num === 0) {
      return { ...empty, error: `${spec.name} cannot be zero (division by zero).` };
    }
    values[spec.sym] = num;
    given.push({
      label: `${spec.sym} (${spec.name})`,
      value: `${fmt(num)}${spec.unit ? " " + spec.unit : ""}`,
    });
  }

  let raw: number;
  try {
    raw = branch.compute(values);
  } catch {
    return { ...empty, error: "Could not compute with these values." };
  }

  if (Number.isNaN(raw)) {
    return {
      ...empty,
      given,
      error:
        "The result is not a real number with these values - check the data (for example a negative under a square root).",
    };
  }
  if (!Number.isFinite(raw)) {
    return { ...empty, given, error: "Division by zero - check the values entered." };
  }

  return {
    ok: true,
    given,
    formula: formula.expression,
    rearranged: branch.rearranged,
    steps: branch.steps ? branch.steps(values) : [],
    answer: `${fmt(raw)}${branch.unit ? " " + branch.unit : ""}`,
    answerRaw: raw,
  };
}
