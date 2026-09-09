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
  classLevel: "9th" | "10th";
  subject: "physics" | "chemistry" | "biology";
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
export function missingBookNote(classLevel: string, subject: string): string | null {
  if (booksFor(classLevel, subject).length > 0) return null;
  if (subject.toLowerCase() === "physics") {
    return `No scanned Physics ${classLevel} textbook is publicly available yet. Use the chapter videos and topic notes below - they cover the same syllabus.`;
  }
  return `No scanned ${subject} ${classLevel} textbook is available yet.`;
}
