# ScholarStack Code & Logic Rules

These guidelines are persisted for all developers and future agents working on the ScholarStack BISE Pakistan Study application to maintain accuracy, consistency, and depth.

---

## 📅 General Board Exam Content Rigor
- **No Stubs / Empty Mockups:** All mockup generation, chapter study desk modules, and practice databases must contains rich, complete, authentic Pakistani BISE academic text.
- **Accurate Board Formats:** High school (9th/10th Matric) and HSSC (11th/12th Inter) should represent corresponding Punjab Boards (BISE Lahore etc.), Federal Board (FBISE), Sindh, Khyber Pakhtunkhwa (KPK) or Balochistan frameworks perfectly.

---

## 🧪 Scientific Numericals Standards (Physics, Chemistry & Math)
- **Step-by-Step Solver Integration:** Under no circumstances should simple output answers be returned. Always offer:
  1. **Given Data parameters** with corresponding standard symbols (m, v, F, [H+]).
  2. **Core Formula expressions** (e.g. $F = m \cdot a$, $pH = -\log[H^+]$).
  3. **Intermediate calculations** and divisions.
  4. **The final result** accompanied by physical SI units (Joules, Newtons, Moles, Pascals, Watts).

---

## 🗣 Language Subjects & B-Parts (English B & Urdu B)

### 1. English B Requirements
For and any class level practice:
- **Applications:** Proper layout ("To, The Principal... Subject:... Respected Sir/Madam... Yours obediently, X.Y.Z").
- **Letters:** Classical examiners format ("Examination Hall, City A.B.C, Date... My Dear... Your loving...").
- **Essays:** Structured bullet outlines (Introduction, Body Paragraphs with headers, Drawbacks/Advantages, and balanced Conclusion).
- **Grammar Drill:** Real tables explaining Active/Passive transforms and Direct/Indirect conversions with rules.

### 2. Urdu B Requirements (خلاصہ، سلیس، تشریح)
Use authentic, high-quality, native Urdu typography:
- **خلاصہ (Passage Summary):** Comprehensive sequence of actions corresponding to historical textbook prose (e.g., مرزا فرحت اللہ بیگ's 'امتحان' or 'اسوہ حسنہ').
- **سلیس اردو (Simplified Prose with Context):** Includes:
  - **حوالہ متن:** Proper title of the lesson (سبق کا عنوان) and writer name (مصنف کا نام).
  - **سیاق و سباق:** Location references (6-8 sentences explaining the context).
  - **سہل/سلیس ترجمہ:** High-quality conversion in native script.
- **اشعار کی تشریح (Poetic Interpretation):** Includes:
  - **شاعر کا نام** (Poet Name e.g. غالب، اقبال).
  - **مفہوم** (Literal Meaning).
  - **تفصیلی تشریح** (In-depth Interpretation in respectful literary style).
- **اردو گرامر:** Clear rules for سابقے لاحقے، رموزِ اوقاف، واحد جمع, and امدادی افعال, with examples.

---

## 🔒 State and UI Navigation Guardrails
- **Parallel Syncing:** Completing chapters inside the "Chapter Study" desk or "Syllabus Archive" must sync with local persistence (`localStorage` or Firestore) to coordinate Dashboard progress displays instantly.
- **Vite Integration:** Keep dev servers configured exclusively on Port `3000` with hot module replacement warnings safely muted.
- **Responsive Touch Design:** Support fluid screen widths from mobile phone viewports up to large high-density screens. Touch targets must be minimum 44px on smaller viewports.
