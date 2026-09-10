/**
 * INDICATIVE BISE DATE SHEET (client-side, offline)
 * ------------------------------------------------------------------
 * This used to live behind POST /api/bise-datesheet in server.ts. That was
 * wrong for two reasons:
 *
 *   1. The route computed the schedule purely from the local tables below -
 *      it never called a board website - so the network round trip bought
 *      nothing.
 *   2. Vercel serves this app as a static build with no Node server, so the
 *      endpoint did not exist in production. Every load 404'd and the
 *      dashboard showed "Could not load the estimated exam schedule."
 *
 * Running it in the browser fixes the 404 and, more importantly, means the
 * countdown still works with no connection - which is the whole point of a
 * PWA aimed at students on patchy mobile data.
 *
 * IMPORTANT: these dates are INDICATIVE. They project the usual annual exam
 * window and are not an official date sheet. The note field says so, and the
 * UI must keep showing it.
 */

export interface BiseDatesheetEntry {
  date: string;
  subject: string;
  time: string;
}

export interface BiseDatesheet {
  success: boolean;
  isOffline: boolean;
  board: string;
  classLevel: string;
  startDate: string;
  examinationName: string;
  sourceUrl: string;
  isIndicative: boolean;
  note: string;
  schedule: BiseDatesheetEntry[];
}

function fmt(d: Date): string {
  return d.toISOString().split("T")[0];
}

const EXAM_PATTERNS: Record<string, { startMonth: number; startDay: number; papers: [number, string, string][] }> = {
  // [dayOffsetFromStart, subject, session]
  "9th": {
    startMonth: 4, startDay: 17,
    papers: [
      [0, "English Compulsory", "Morning (09:00 AM)"],
      [3, "Biology / Computer Science", "Morning (09:00 AM)"],
      [6, "Mathematics", "Morning (09:00 AM)"],
      [9, "Physics", "Morning (09:00 AM)"],
      [13, "Chemistry / General Science", "Morning (09:00 AM)"],
      [16, "Urdu Compulsory", "Morning (09:00 AM)"],
      [19, "Islamiyat / Pakistan Studies", "Morning (09:00 AM)"],
    ],
  },
  "10th": {
    startMonth: 3, startDay: 27,
    papers: [
      [3, "English Compulsory", "Morning (09:00 AM)"],
      [5, "Physics / Advanced Islamic Studies", "Morning (09:00 AM)"],
      [10, "Biology / Computer Science", "Morning (09:00 AM)"],
      [12, "Chemistry / General Science", "Morning (09:00 AM)"],
      [14, "Urdu Compulsory", "Morning (09:00 AM)"],
      [17, "Mathematics / General Mathematics", "Morning (09:00 AM)"],
      [19, "Pakistan Studies Compulsory", "Morning (09:00 AM)"],
    ],
  },
  "11th": {
    startMonth: 5, startDay: 12,
    papers: [
      [0, "English Compulsory", "Morning (09:00 AM)"],
      [2, "Computer Science / Civics", "Morning (09:00 AM)"],
      [4, "Tarjuma-tul-Quran Compulsory", "Morning (09:00 AM)"],
      [6, "Chemistry / Statistics", "Morning (09:00 AM)"],
      [8, "Physics / Principles of Commerce", "Morning (09:00 AM)"],
      [10, "Mathematics / Biology", "Morning (09:00 AM)"],
      [13, "Urdu Compulsory", "Morning (09:00 AM)"],
      [15, "Islamic Education Compulsory", "Morning (09:00 AM)"],
    ],
  },
  "12th": {
    startMonth: 5, startDay: 12,
    papers: [
      [0, "English Compulsory", "Morning (09:00 AM)"],
      [2, "Chemistry / Statistics", "Morning (09:00 AM)"],
      [4, "Physics / Principles of Accounting", "Morning (09:00 AM)"],
      [6, "Mathematics / Biology", "Morning (09:00 AM)"],
      [9, "Urdu Compulsory", "Morning (09:00 AM)"],
      [11, "Pakistan Studies / Ethics", "Morning (09:00 AM)"],
    ],
  },
};

const BOARD_PORTALS: [string, string][] = [
  ["federal", "https://www.fbise.edu.pk/"],
  ["fbise", "https://www.fbise.edu.pk/"],
  ["karachi", "https://biek.edu.pk/"],
  ["rawalpindi", "https://www.biserawalpindi.edu.pk/"],
  ["multan", "https://www.bisemultan.edu.pk/"],
  ["faisalabad", "https://www.bisefsd.edu.pk/"],
  ["peshawar", "https://www.bisep.edu.pk/"],
  ["gujranwala", "https://www.bisegrw.edu.pk/"],
  ["sahiwal", "https://www.bisesahiwal.edu.pk/"],
  ["sargodha", "https://www.bisesargodha.edu.pk/"],
  ["bahawalpur", "https://bisebwp.edu.pk/"],
  ["quetta", "https://bbiseqta.edu.pk/"],
  ["hyderabad", "https://www.biseh.edu.pk/"],
];

export function getBiseDatesheet(
  board: string,
  classLevel: string
): BiseDatesheet {
  const boardLower = (board || "").toLowerCase();
  const rawClass = (classLevel || "").toLowerCase();

  const key = ["9th", "10th", "11th", "12th"].find((k) => rawClass.includes(k)) || "10th";
  const pattern = EXAM_PATTERNS[key];

  // Roll forward: if this year's window has already begun, target next year's.
  const now = new Date();
  let year = now.getFullYear();
  let start = new Date(Date.UTC(year, pattern.startMonth - 1, pattern.startDay));
  if (start.getTime() < now.getTime()) {
    year += 1;
    start = new Date(Date.UTC(year, pattern.startMonth - 1, pattern.startDay));
  }

  const schedule = pattern.papers.map(([offset, subject, time]) => {
    const d = new Date(start.getTime());
    d.setUTCDate(d.getUTCDate() + offset);
    return { date: fmt(d), subject, time };
  });

  const entry = BOARD_PORTALS.find(([k]) => boardLower.includes(k));
  const sourceUrl = entry ? entry[1] : "https://www.biselahore.com/";

  return {
    success: true,
    isOffline: true,
    board,
    classLevel,
    startDate: fmt(start),
    examinationName: `${board} - ${classLevel} Annual Examination ${year}`,
    sourceUrl,
    isIndicative: true,
    note:
      `Indicative only - not an official date sheet. These dates follow the usual ${key} annual exam window ` +
      `and are projected for ${year}. Your board publishes the real schedule about 4-6 weeks before the first ` +
      `paper. Always confirm on the official portal before relying on any date.`,
    schedule,
  };
}
