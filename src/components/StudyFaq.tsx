import { useState } from "react";

/**
 * StudyFaq
 * ----------------------------------------------------------------------
 * Visible, on-page answers to the questions Pakistani board students
 * actually type into Google ("9th class past papers", "paper scheme",
 * "passing marks", "notes for 10th class").
 *
 * Why this exists as real DOM rather than only JSON-LD: answer engines and
 * Google's helpful-content systems rank on-page text. The JSON-LD in
 * index.html mirrors these exact answers — the two must stay consistent,
 * because contradicting your own structured data is penalised.
 *
 * Every answer here reflects what the app genuinely does. Do not add
 * marketing claims for features that do not exist.
 */

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "Where can I get free 9th and 10th class notes in Pakistan?",
    a: "Open Chapter Study, pick your class and subject, and every chapter lists its textbook topics along with solved exercises, MCQs, short questions and a glossary of definitions. Physics, Chemistry, Mathematics, Computer Science, Biology, English, Urdu and Islamiat are covered for matric, and FSc Pre-Medical, Pre-Engineering, ICS and I.Com for intermediate. No sign-up and no payment.",
  },
  {
    q: "Are past papers available for all Pakistani boards?",
    a: "Yes. Board-format papers cover the last five years (2021–2026) for the Punjab boards (Lahore, Gujranwala, Multan, Faisalabad, Rawalpindi, Sargodha, Bahawalpur, Sahiwal, DG Khan) plus FBISE Federal, Sindh, KPK, Balochistan and AJK. Papers follow your saved class, group and board, with Morning and Evening variants.",
  },
  {
    q: "What is the paper scheme for 9th and 10th class science subjects?",
    a: "18 MCQs of 1 mark each (attempt all). 24 short questions as Q.2, Q.3 and Q.4 — three sections of 8, attempt any 6 per section, 2 marks each. Then 3 long questions (Q.5–Q.7) with parts (a) and (b), attempt any 2. In science subjects two of the three long questions carry a numerical. Total 74 marks.",
  },
  {
    q: "Do the numericals show full step-by-step working?",
    a: "Yes, in the format examiners expect: Given values, the formula used, the intermediate steps, then the final answer with correct SI units. Mathematics theorems are laid out as To Prove, Construction, Proof and Conclusion.",
  },
  {
    q: "What are the passing marks and grades for BISE?",
    a: "Provincial BISE boards pass at 33%: A+ 80–100, A 70–79, B 60–69, C 50–59, D 40–49, E 33–39, F below 33. Divisions are First at 60% and above, Second 45–59%, Third 33–44%. FBISE passes at 40%: A+ 90–100, A 80–89, B 70–79, C 60–69, D 50–59, E 40–49, F below 40.",
  },
  {
    q: "Which subjects have video lectures?",
    a: "All four classes (9th, 10th, 11th and 12th) across Physics, Chemistry, Biology, Mathematics and Computer Science, plus the I.Com commerce subjects — Principles of Accounting, Principles of Commerce, Principles of Economics, Principles of Banking and Commercial Geography. That is 1,278 lectures across 323 topics from 566 Pakistani teaching channels. Every link is verified automatically, so you will not hit a dead video.",
  },
  {
    q: "Do you cover I.Com (Commerce) subjects?",
    a: "Yes, both years in full. I.Com Part 1 has Principles of Accounting, Business Mathematics, Principles of Commerce and Principles of Economics. Part 2 has Principles of Accounting, Business Statistics, Principles of Banking and Commercial Geography. Each carries its real board chapter list, Urdu video lectures and a glossary of examinable definitions.",
  },
  {
    q: "Are there solved accounting questions for I.Com?",
    a: "Yes. Principles of Accounting has fully worked problems for both years — accounting equation, journal and ledger, cash book and imprest petty cash, bank reconciliation, rectification of errors, adjusting entries, final accounts, depreciation, partnership admission, retirement and dissolution, share and debenture issues, cash flow, non-trading concerns and single entry. Each shows the given data, formula, every step and the answer in rupees.",
  },
  {
    q: "Is Business Statistics covered for I.Com Part 2?",
    a: "Yes, as a full I.Com Part 2 subject with its board chapters. The statistics material covers mean, median and mode, measures of dispersion, index numbers, correlation and regression, and sampling — each with worked examples and definitions written in the wording examiners expect.",
  },
  {
    q: "Does it work without internet?",
    a: "Yes. It is a Progressive Web App, so after your first visit the study material is stored on your phone and you can revise with no connection. Useful on limited or slow mobile data.",
  },
  {
    q: "Is there an Android app?",
    a: "Yes — it runs as both a website and an Android app. Use the Install option in your browser to add it to your home screen; it then opens full screen and works offline like a normal app.",
  },
];

export default function StudyFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
    >
      <h2
        id="faq-heading"
        className="font-display text-lg sm:text-xl font-bold text-slate-900"
      >
        Frequently Asked Questions
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Common questions from Pakistani board students about notes, past papers
        and paper scheme.
      </p>

      <dl className="mt-5 divide-y divide-slate-200">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="py-1">
              <dt>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left min-h-[44px] group"
                >
                  <span className="text-[15px] font-semibold text-slate-800 group-hover:text-indigo-700">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-indigo-600 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 4v12M4 10h12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
              </dt>
              {/* Always rendered so crawlers read the answer even when collapsed. */}
              <dd className={isOpen ? "pb-4 pr-8" : "hidden"}>
                <p className="text-sm leading-relaxed text-slate-600">{f.a}</p>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
