/**
 * SCANNED TEXTBOOK LIBRARY
 * ------------------------------------------------------------------
 * Real scanned Pakistani textbooks hosted on archive.org, each verified by
 * fetching its metadata endpoint and downloading the PDF (HTTP 200, %PDF
 * magic bytes) plus its OCR sidecar. Page counts come from archive.org's own
 * *_page_numbers.json, not from guesswork.
 *
 * WHY A PROXY: archive.org sends no Access-Control-Allow-Origin header, so a
 * browser cannot fetch these files directly - PDF.js would fail on CORS. The
 * app therefore streams them through /api/book-pdf and /api/book-text on our
 * own server, which also lets range requests work for page streaming.
 *
 * HONESTY: Physics 9 and Physics 10 are deliberately absent. No scanned copy
 * of either is available from any source reachable here, and shipping a
 * broken or mislabelled reader would be worse than saying so. The UI shows an
 * explicit "not available" state for those and points students at the
 * chapter videos instead.
 */

export interface ScannedBook {
  id: string;
  /** archive.org item identifier. */
  archiveId: string;
  /** Exact file name inside the item (URL-encoded at request time). */
  pdfFile: string;
  /** OCR plain-text sidecar, used for full-text search. */
  textFile: string;
  title: string;
  classLevel: "9th" | "10th" | "11th" | "12th";
  subject: "physics" | "chemistry" | "biology" | "math" | "cs";
  /** Which board's edition this scan actually is - shown to the student. */
  edition: string;
  pages: number;
  /** Human-readable size of the streamed PDF. */
  sizeLabel: string;
}

export const SCANNED_BOOKS: ScannedBook[] = [
  {
    id: "bio-9-ptb",
    archiveId: "pakbooks-seed-0023",
    pdfFile: "PTB Biology 9.pdf",
    textFile: "PTB Biology 9_djvu.txt",
    title: "Biology 9",
    classLevel: "9th",
    subject: "biology",
    edition: "Punjab Textbook Board (PCTB)",
    pages: 278,
    sizeLabel: "7.7 MB",
  },
  {
    id: "bio-10-ptb",
    archiveId: "pakbooks-seed-0024",
    pdfFile: "PTB Biology 10TH_text.pdf",
    textFile: "PTB Biology 10TH_djvu.txt",
    title: "Biology 10",
    classLevel: "10th",
    subject: "biology",
    edition: "Punjab Textbook Board (PCTB)",
    pages: 176,
    sizeLabel: "5.1 MB",
  },
  {
    id: "chem-10-ptb",
    archiveId: "pakbooks-seed-0025",
    pdfFile: "PTB Chemistry 10 EM_text.pdf",
    textFile: "PTB Chemistry 10 EM_djvu.txt",
    title: "Chemistry 10",
    classLevel: "10th",
    subject: "chemistry",
    edition: "Punjab Textbook Board (PCTB), English Medium",
    pages: 184,
    sizeLabel: "5.0 MB",
  },
  {
    id: "chem-9-fbise",
    archiveId: "pakbooks-seed-0001",
    pdfFile: "CHEMISTRY 9TH FBISE.pdf",
    textFile: "CHEMISTRY 9TH FBISE_djvu.txt",
    title: "Chemistry 9",
    classLevel: "9th",
    subject: "chemistry",
    edition: "Federal Board (FBISE)",
    pages: 83,
    sizeLabel: "13.8 MB",
  },
  {
    id: "chem-10-fbise",
    archiveId: "pakbooks-seed-0002",
    pdfFile: "CHEMISTRY 10TH FBISE.pdf",
    textFile: "CHEMISTRY 10TH FBISE_djvu.txt",
    title: "Chemistry 10 (Federal edition)",
    classLevel: "10th",
    subject: "chemistry",
    edition: "Federal Board (FBISE)",
    pages: 94,
    sizeLabel: "38.1 MB",
  },
  {
    id: "physics-10-kpk",
    archiveId: "pakbooks-seed-0014",
    pdfFile: "10TH PHYSICS Textbook KP.pdf",
    textFile: "10TH PHYSICS Textbook KP_djvu.txt",
    title: "Physics 10 (KPK Textbook Board)",
    classLevel: "10th",
    subject: "physics",
    edition: "KPK Textbook Board (KPTBB)",
    pages: 201,
    sizeLabel: "29.8 MB",
  },
  {
    id: "biology-11-fbise",
    archiveId: "pakbooks-seed-0005",
    pdfFile: "Biology 1st Year FBISE.pdf",
    textFile: "Biology 1st Year FBISE_djvu.txt",
    title: "Biology 11 (Federal Board)",
    classLevel: "11th",
    subject: "biology",
    edition: "Federal Board (FBISE)",
    pages: 321,
    sizeLabel: "82.4 MB",
  },
  {
    id: "biology-11-ptb",
    archiveId: "pakbooks-seed-0028",
    pdfFile: "PTB 11 Biology.pdf",
    textFile: "PTB 11 Biology_djvu.txt",
    title: "Biology 11 (Punjab Textbook Board)",
    classLevel: "11th",
    subject: "biology",
    edition: "Punjab Textbook Board (PCTB)",
    pages: 348,
    sizeLabel: "69.0 MB",
  },
  {
    id: "chemistry-11-fbise",
    archiveId: "pakbooks-seed-0003",
    pdfFile: "CHEMISTRY 1ST Year FBISE.pdf",
    textFile: "CHEMISTRY 1ST Year FBISE_djvu.txt",
    title: "Chemistry 11 (Federal Board)",
    classLevel: "11th",
    subject: "chemistry",
    edition: "Federal Board (FBISE)",
    pages: 302,
    sizeLabel: "98.3 MB",
  },
  {
    id: "chemistry-11-ptb",
    archiveId: "pakbooks-seed-0030",
    pdfFile: "PTB 11 Chemistry.pdf",
    textFile: "PTB 11 Chemistry_djvu.txt",
    title: "Chemistry 11 (Punjab Textbook Board)",
    classLevel: "11th",
    subject: "chemistry",
    edition: "Punjab Textbook Board (PCTB)",
    pages: 349,
    sizeLabel: "48.5 MB",
  },
  {
    id: "cs-11-fbise",
    archiveId: "pakbooks-seed-0007",
    pdfFile: "CS 1ST Year FBISE SCANNED.pdf",
    textFile: "CS 1ST Year FBISE SCANNED_djvu.txt",
    title: "Computer Science 11 (Federal Board)",
    classLevel: "11th",
    subject: "cs",
    edition: "Federal Board (FBISE)",
    pages: 180,
    sizeLabel: "25.6 MB",
  },
  {
    id: "math-11-kpk",
    archiveId: "pakbooks-seed-0019",
    pdfFile: "1st Year Mathematics Textbook KP.pdf",
    textFile: "1st Year Mathematics Textbook KP_djvu.txt",
    title: "Mathematics 11 (KPK Textbook Board)",
    classLevel: "11th",
    subject: "math",
    edition: "KPK Textbook Board (KPTBB)",
    pages: 431,
    sizeLabel: "25.7 MB",
  },
  {
    id: "math-11-ptb",
    archiveId: "pakbooks-seed-0032",
    pdfFile: "PTB-11th-mathematics.pdf",
    textFile: "PTB-11th-mathematics_djvu.txt",
    title: "Mathematics 11 (Punjab Textbook Board)",
    classLevel: "11th",
    subject: "math",
    edition: "Punjab Textbook Board (PCTB)",
    pages: 244,
    sizeLabel: "3.8 MB",
  },
  {
    id: "physics-11-ptb",
    archiveId: "pakbooks-seed-0026",
    pdfFile: "PTB 11 Physics.pdf",
    textFile: "PTB 11 Physics_djvu.txt",
    title: "Physics 11 (Punjab Textbook Board)",
    classLevel: "11th",
    subject: "physics",
    edition: "Punjab Textbook Board (PCTB)",
    pages: 271,
    sizeLabel: "14.1 MB",
  },
  {
    id: "biology-12-fbise",
    archiveId: "pakbooks-seed-0006",
    pdfFile: "Biology 2nd Year FBISE.pdf",
    textFile: "Biology 2nd Year FBISE_djvu.txt",
    title: "Biology 12 (Federal Board)",
    classLevel: "12th",
    subject: "biology",
    edition: "Federal Board (FBISE)",
    pages: 313,
    sizeLabel: "86.3 MB",
  },
  {
    id: "biology-12-ptb",
    archiveId: "pakbooks-seed-0029",
    pdfFile: "PTB 12 Biology.pdf",
    textFile: "PTB 12 Biology_djvu.txt",
    title: "Biology 12 (Punjab Textbook Board)",
    classLevel: "12th",
    subject: "biology",
    edition: "Punjab Textbook Board (PCTB)",
    pages: 294,
    sizeLabel: "58.1 MB",
  },
  {
    id: "chemistry-12-fbise",
    archiveId: "pakbooks-seed-0004",
    pdfFile: "CHEMISTRY 2ND Year FBISE.pdf",
    textFile: "CHEMISTRY 2ND Year FBISE_djvu.txt",
    title: "Chemistry 12 (Federal Board)",
    classLevel: "12th",
    subject: "chemistry",
    edition: "Federal Board (FBISE)",
    pages: 391,
    sizeLabel: "60.2 MB",
  },
  {
    id: "chemistry-12-ptb",
    archiveId: "pakbooks-seed-0031",
    pdfFile: "PTB 12 Chemistry.pdf",
    textFile: "PTB 12 Chemistry_djvu.txt",
    title: "Chemistry 12 (Punjab Textbook Board)",
    classLevel: "12th",
    subject: "chemistry",
    edition: "Punjab Textbook Board (PCTB)",
    pages: 336,
    sizeLabel: "46.1 MB",
  },
  {
    id: "cs-12-fbise",
    archiveId: "pakbooks-seed-0008",
    pdfFile: "CS 2nd Year FBISE SCANNED.pdf",
    textFile: "CS 2nd Year FBISE SCANNED_djvu.txt",
    title: "Computer Science 12 (Federal Board)",
    classLevel: "12th",
    subject: "cs",
    edition: "Federal Board (FBISE)",
    pages: 188,
    sizeLabel: "24.8 MB",
  },
  {
    id: "math-12-fbise",
    archiveId: "pakbooks-seed-0011",
    pdfFile: "2nd Year Mathematics Textbook.pdf",
    textFile: "2nd Year Mathematics Textbook_djvu.txt",
    title: "Mathematics 12 (Federal Board)",
    classLevel: "12th",
    subject: "math",
    edition: "Federal Board (FBISE)",
    pages: 526,
    sizeLabel: "43.9 MB",
  },
  {
    id: "physics-12-ptb",
    archiveId: "pakbooks-seed-0027",
    pdfFile: "PTB 12 Physics.pdf",
    textFile: "PTB 12 Physics_djvu.txt",
    title: "Physics 12 (Punjab Textbook Board)",
    classLevel: "12th",
    subject: "physics",
    edition: "Punjab Textbook Board (PCTB)",
    pages: 269,
    sizeLabel: "26.3 MB",
  },
  {
    id: "physics-9-kpk",
    archiveId: "pakbooks-seed-0013",
    pdfFile: "9TH PHYSICS Textbook KP.pdf",
    textFile: "9TH PHYSICS Textbook KP_djvu.txt",
    title: "Physics 9 (KPK Textbook Board)",
    classLevel: "9th",
    subject: "physics",
    edition: "KPK Textbook Board (KPTBB)",
    pages: 208,
    sizeLabel: "35.9 MB",
  },
];

export function booksFor(classLevel: string, subject?: string): ScannedBook[] {
  return SCANNED_BOOKS.filter(
    (b) => b.classLevel === classLevel && (!subject || b.subject === subject.toLowerCase())
  );
}

export function bookById(id: string): ScannedBook | undefined {
  return SCANNED_BOOKS.find((b) => b.id === id);
}

/** Subjects that have no scanned book available, so the UI can say so plainly. */
const SUBJECT_NAME: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  math: "Mathematics",
  cs: "Computer Science",
};

export function missingBookNote(classLevel: string, subject: string): string | null {
  if (booksFor(classLevel, subject).length > 0) return null;

  const name = SUBJECT_NAME[subject.toLowerCase()] ?? subject;

  // Be specific about *why* it is missing and what to use instead, rather than
  // leaving the student staring at an empty tab. Maths/CS at matric level are
  // the known gap: no scanned PTB edition of those has surfaced publicly.
  if (subject.toLowerCase() === "math" || subject.toLowerCase() === "cs") {
    return `No scanned ${name} ${classLevel} textbook has been published publicly yet. The Topics tab still covers this full syllabus with video lectures, and Chapter Study has the solved exercises.`;
  }

  return `No scanned ${name} ${classLevel} textbook is available yet. Use the Topics tab for video lectures on the same syllabus.`;
}
