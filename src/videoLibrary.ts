/**
 * VERIFIED VIDEO LIBRARY - 9th to 12th, all core subjects
 * ------------------------------------------------------------------
 * Every videoId below was harvested from a real YouTube search and then
 * individually validated through the YouTube oEmbed endpoint
 * (https://www.youtube.com/oembed?url=...&format=json). Only IDs that
 * returned a real title were kept, so none of these are invented and none
 * were dead at the time of writing. Six candidates were rejected by that
 * check and dropped.
 *
 * IMPORTANT: never hand-write a videoId into this file. If you add entries,
 * re-run the oEmbed validation - fabricated IDs render as an unplayable
 * black box for the student, which is worse than showing no video at all.
 *
 * Channels are genuine Pakistani curriculum teachers (ilmkidunya, Allied
 * Schools, Sabaq Foundation, StudyWudy, Chemistry Plus and others).
 */

export interface TopicVideo {
  /** YouTube video id - oEmbed verified. */
  id: string;
  title: string;
  /** Channel/teacher name, shown so students can follow a teacher they like. */
  channel: string;
}

export interface VideoTopic {
  classLevel: "9th" | "10th" | "11th" | "12th";
  subject: "physics" | "chemistry" | "biology" | "math" | "cs";
  topic: string;
  videos: TopicVideo[];
}

export const VIDEO_LIBRARY: VideoTopic[] = [
  {
    classLevel: "10th",
    subject: "biology",
    topic: "Biotechnology",
    videos: [
      { id: "Vk6bQf6IVXE", title: "Biotechnology  | Chapter # 17 | Biology Class 10th | Lec.# 1", channel: "Chemistry Plus" },
      { id: "HXaJV0JR7ds", title: "Class 10 - Biology - Chapter 17 - Lecture 1 - Introduction - Allied Schools", channel: "Allied Schools" },
      { id: "P-YCodUq-yg", title: "10th Class Biology Chapter 8 | Introduction of Biotechnology | Matric New Book 2026 - 2027", channel: "ilmkidunya" },
      { id: "r4exLL65gfk", title: "Biotechnology ( Urdu medium)  lecture 1st", channel: "Easy Biochem" },
    ],
  },
  {
    classLevel: "10th",
    subject: "biology",
    topic: "Coordination and Control",
    videos: [
      { id: "8gQg4tK4wlI", title: "Types of coordination and structure of neuron Class 10th  in Urdu  Hindi", channel: "Dr Hafiz Sultan Academy" },
      { id: "kKtwlM6FKzA", title: "10th Class Biology Chapter 3 - Human Nervous System - Class 10 Biology Chapter 12", channel: "ilmkidunya" },
      { id: "xfpayPqj3KM", title: "Structure and Functions Of Neuron 🔥|| Control and Coordination| Class 10 science | Prashant kirad", channel: "Next Toppers" },
      { id: "VReqS33NE6Y", title: "Central Nervous System(CNS) : Coordination | Biology | Science |  Class 10", channel: "PRATHIBHA" },
    ],
  },
  {
    classLevel: "10th",
    subject: "biology",
    topic: "Homeostasis",
    videos: [
      { id: "RNHsjxazf8o", title: "Class 10 - Biology - Chapter 11 - Lecture 1 Homeostasis in plants - Allied Schools", channel: "Allied Schools" },
      { id: "gjGaI5szJGA", title: "Homeostasis | 10th Class | Biology | Sindh Board | @otsedtech", channel: "OTS EdTech" },
      { id: "__DGmIuFWUg", title: "Homeostasis  | Chapter # 11 | Biology Class 10th  |Lec # 1", channel: "Chemistry Plus" },
      { id: "4bFVojD6HHk", title: "Homeostasis | Osmoregulation | Thermoregulation | Excretion | Homeostasis In Urdu Class 10", channel: "ALI ACADEMY BIOLOGY LECTURES" },
    ],
  },
  {
    classLevel: "10th",
    subject: "biology",
    topic: "Inheritance",
    videos: [
      { id: "upM5sp_AAkM", title: "Inheritance | Chapter # 15 | Biology Class 10th | Lec.# 01", channel: "Chemistry Plus" },
      { id: "k5je3r7Y0mw", title: "Class 10 - Biology - Chapter 15 - Lecture 01Genetics, inheritence, chromosomes  - Allied Schools", channel: "Allied Schools" },
      { id: "z6HYeyzYF1Y", title: "Inheritance Introduction l Biology 10th in Urdu/Hindi l Ch: Inheritance l Grade/Class 10", channel: "The Home of Science" },
      { id: "gHoyeIlBzPo", title: "📘 Class 10 Biology | Chapter 7 Inheritance | One-Shot Full Chapter Lecture by Dr. Madiha", channel: "The Grammar of Science" },
    ],
  },
  {
    classLevel: "10th",
    subject: "biology",
    topic: "Man and His Environment",
    videos: [
      { id: "pIqa_BMU9dg", title: "Man and his environment  | Chapter # 16 | Biology Class 10th | Lec# 1", channel: "Chemistry Plus" },
      { id: "i7-0cqMp3o4", title: "Man And His Environment I Class 10th Biology I Lecture No:02 I Ecological Level Of Organization I", channel: "Biology With Najeeb Ullah" },
      { id: "39rLIq2G-Zc", title: "Class 10 - Biology - Chapter 16 - Lecture 1 Introduction - Allied Schools", channel: "Allied Schools" },
      { id: "nyoohO-laPQ", title: "10th BIOLOGY,CH#16  (MAN AND HIS ENVIRONMENT),LEC#01,LEVELS OF ECOLOGICAL ORGANIZATION", channel: "Academy For Excellence, Lahore." },
    ],
  },
  {
    classLevel: "10th",
    subject: "biology",
    topic: "Pharmacology",
    videos: [
      { id: "J_eBDQHn_R8", title: "Pharmacology Introduction l Biology 10th in Urdu/Hindi l Ch: Pharmacology", channel: "The Home of Science" },
      { id: "dCG7tJtglpo", title: "Introduction To Pharmacology | Pharmaceutical And Addictive Drug | Class 10 Biology", channel: "ALI ACADEMY BIOLOGY LECTURES" },
      { id: "m4ASUu3hrjU", title: "Pharmacology | Drug | Chapter # 18 | Biology Class 10th | Lec.# 1", channel: "Chemistry Plus" },
      { id: "oK27lSplfHY", title: "Biology Lecture 55 Pharmacology, drugs, sources of drugs Class 10th", channel: "Oriental Public School Mardan" },
    ],
  },
  {
    classLevel: "10th",
    subject: "biology",
    topic: "Reproduction",
    videos: [
      { id: "-WzzbGtwOS4", title: "Class 10 - Biology - Chapter 14 - Lecture 1 - Introduction of reproduction - Allied Schools", channel: "Allied Schools" },
      { id: "vKKYiDR6i-o", title: "Reproduction  | Chapter # 14 | Biology Class 10th | Lec.# 01", channel: "Chemistry Plus" },
      { id: "msky9kTKEcM", title: "Reproduction Introduction l Biology 10th in Urdu/Hindi l Ch: Reproduction", channel: "The Home of Science" },
      { id: "RxXsUm8pwaA", title: "How Do Organisms Reproduce 🔥| Class 10th Science| NCERT covered| Prashant Kirad", channel: "Exphub 9th &10th" },
    ],
  },
  {
    classLevel: "10th",
    subject: "biology",
    topic: "Support and Movement",
    videos: [
      { id: "Wb6ELgVqbIA", title: "Composition of Skeleton (Bone) | Support and Movement | Class 10th Biology | Armaghan Tution Academy", channel: "Sardar Ali Kakakhel Official" },
      { id: "YIgsd5l02Fg", title: "Role of skeleton | Chapter # 13 | Biology Class 10th | Lec.# 02", channel: "Chemistry Plus" },
      { id: "0ljlIQz30qQ", title: "10th Class Biology Chapter 13 - Human Skeleton - Class 10 Biology Chapter 13", channel: "ilmkidunya" },
      { id: "wg7qmQco8BE", title: "MDCAT 2026 | Lecture 06 | Support and Movement (Part-01) | Dr. Sohail", channel: "Dr Sohail Lectures" },
    ],
  },
  {
    classLevel: "10th",
    subject: "chemistry",
    topic: "Acids Bases and Salts",
    videos: [
      { id: "EOev0rPpcZQ", title: "Class 10 | Acids, Bases and Salts | Chapter 02 | 10th Chemistry One Shot | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "bdVTKMG_y8c", title: "JKBOSE Class 10th Chemistry | ACIDS, BASES & SALTS | Full Chapter | Kohinoor Batch", channel: "JKBOSE Wallah" },
      { id: "VpfhAngci64", title: "CLASS 10 ACIDS BASES AND SALTS PART 1 IN URDU | تیزاب اساس اور نمک - جماعت دہم | WHAT IS ACID/BASE?", channel: "Study Manzil" },
      { id: "KC2SoyyN9dw", title: "Acid, Base & Salt | X-Chemistry | Lecture#01", channel: "Sir Nasim Zulfiqar" },
    ],
  },
  {
    classLevel: "10th",
    subject: "chemistry",
    topic: "Biochemistry",
    videos: [
      { id: "SCCOgepowAE", title: "Bio Chemistry Chapter # 05 | Class 10 | One Shot | 10th Chemistry | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "erCVT1rTdcI", title: "Class 10 - Chemistry - Chapter 13 - Lecture 01 - Introduction - Allied Schools", channel: "Allied Schools" },
      { id: "fY0DAJ44v0s", title: "Proteins, Carbohydrates & Lipids | Unit 13 Biochemistry | Class 10 Chemistry | Federal Board", channel: "PDW Class 9th & 10th" },
      { id: "U3tUXRxetTY", title: "Carbohydrates class 10 || 10th chemistry ch 13 lec 1 || Urdu /hindi", channel: "Muhammad Kaleem Haider" },
    ],
  },
  {
    classLevel: "10th",
    subject: "chemistry",
    topic: "Chemical Equilibrium",
    videos: [
      { id: "G83_4Vd_vPA", title: "Class 10 | Chemical Equilibrium | Chapter # 01 | 10th Chemistry One Shot | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "r-8981WYqgY", title: "10th chemistry ch 1 chemical equilibrium || class 10 chemistry new book stbb chapter 1", channel: "my online students" },
      { id: "-wyl5TdYdPg", title: "Chemical Equilibrium - 01 | Types of Chemical Reaction | Reversible | Irreversible |Dur Chemist", channel: "Dur Chemist Official" },
    ],
  },
  {
    classLevel: "10th",
    subject: "chemistry",
    topic: "Chemical Industries",
    videos: [
      { id: "oES_ePZuYq8", title: "Class 10 - Chemistry - Chapter 16 - Lecture 1 - Introduction of Industries - Allied Schools", channel: "Allied Schools" },
      { id: "cTahsFmN5mE", title: "10th Class Chemistry, ch 16, Basic Metallurgical Operations - Matric Class Chemistry", channel: "ilmkidunya" },
      { id: "sruKlb-TsEc", title: "02 | Introduction of Chemical Industries | Unit 16 Chemistry Class 10 | Hindi/Urdu", channel: "MK Smart Solution" },
    ],
  },
  {
    classLevel: "10th",
    subject: "chemistry",
    topic: "Environmental Chemistry",
    videos: [
      { id: "OcKz3WFy9sc", title: "Atmoshphere | Class 10 | Chapter # 06 | 10th Chemistry | One Shot | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "qWZj8FUZ0Zo", title: "10th Class Chemistry Chapter 6 - Layers of Atmosphere - 10th Class Chemistry Chapter 6", channel: "ilmkidunya" },
      { id: "vPvPFub32C4", title: "unit 14 Environmental chemistry 1: Atmosphere, class 10 || mmk chemistry", channel: "MMK CHEMISTRY" },
      { id: "0wawgzk9DgU", title: "X-Chem || CH#5 || Environmental Chemistry I || The Atmosphere || Lec#01", channel: "Sir Nasim Zulfiqar" },
    ],
  },
  {
    classLevel: "10th",
    subject: "chemistry",
    topic: "Hydrocarbons",
    videos: [
      { id: "lSHkUVCGF_0", title: "Class 10 | Hydrocarbons | Chapter # 04 | One Shot | 10th Chemistry | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "j5SkuMcyRis", title: "Class 10 Chemistry Chapter 4 - Introduction to Hydrocarbons - 10th Class Chemistry Chapter 4", channel: "ilmkidunya" },
      { id: "Y1AqKgZku_I", title: "10th Class Chemistry Chapter 22 Hydrocarbons | One Shot & Solved Exercise | New Book", channel: "Last Hope Study" },
      { id: "nHcV9LsXUYc", title: "Alkenes | Hydrocarbons | Chemistry Class 10 Chapter 22 | Lecture 1 | Urdu/Enghlish", channel: "Muhammad Samiullah" },
    ],
  },
  {
    classLevel: "10th",
    subject: "chemistry",
    topic: "Organic Chemistry",
    videos: [
      { id: "EGoPiJQU9QI", title: "Class 10 | Organic Chemistry One Shot | Chapter # 03 | 10th Chemistry | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "Y-7UO09AV40", title: "Unit 8 Organic Chemistry Class 10 Chemistry Chapter 8 New Book Federal Board FBISE FB NBF", channel: "Dr. Au Academy" },
      { id: "UTTRKBe4haw", title: "Class 10 Chemistry Chapter 3 - Introduction Organic Compound - 10th Class Chemistry Chapter 3", channel: "ilmkidunya" },
      { id: "7koWA2q6oGo", title: "Class 10 - Chemistry - Chapter 11 - Lecture 1 - Ornagic Chemistry - Allied Schools", channel: "Allied Schools" },
    ],
  },
  {
    classLevel: "10th",
    subject: "physics",
    topic: "Atomic and Nuclear Physics",
    videos: [
      { id: "cEqsJJMzpy8", title: "Class 10 - Physics - Chapter 18 - Lecture 1 - 18.1 Atom and Atomic Nucleus - Allied Schools", channel: "Allied Schools" },
      { id: "58KbB0-c1PQ", title: "Class 10 Physics | Unit 21 Nuclear Physics | One Shot Full Chapter | National Book Foundation", channel: "The Grammar of Science" },
      { id: "Kn18vY7Z2lg", title: "Class 10 | CH#19 Nuclear Physics 01 | Introduction to Nuclear Physics", channel: "Talha's Physics Academy" },
      { id: "VEqzKvBt4Qs", title: "Class 10 Physics Chapter 18 Numericals – Atomic and Nuclear Physics", channel: "Sir Sadam | AlBarrEducation" },
    ],
  },
  {
    classLevel: "10th",
    subject: "physics",
    topic: "Basic Electronics",
    videos: [
      { id: "OUCMrykFbr0", title: "Basic operations of electronics and logic gates class 10 | 10th class physics ch 18 | sabaq urdu", channel: "Atif Ahmad Official" },
      { id: "wlYeCx8wWec", title: "Class 10th Physics Chapter 16 -  Basic Operation of Logic Gates- 10th Class Physics Chapter 7", channel: "ilmkidunya" },
      { id: "qzuWW8QGnaQ", title: "Basic Operations on electronics | 5 LOGIC GATES | AND, OR, NOT, NAND, NOR Gates| Physics class 10.", channel: "AyubKhan Official" },
      { id: "Libh7RLyhC4", title: "Class 10 Physics | Unit 18 Electronics | Full Chapter One Shot | National Book Foundation", channel: "The Grammar of Science" },
    ],
  },
  {
    classLevel: "10th",
    subject: "physics",
    topic: "Current Electricity",
    videos: [
      { id: "3305COgCbNg", title: "Ohms law class 10 | 10th class physics | limitations of ohms law | statement and derivation of ohms", channel: "Atif Ahmad Official" },
      { id: "P2U2mMMObYE", title: "Current Electricity Chapter 8 | Ohm's Law and Resistance", channel: "Chemistry Tigers" },
      { id: "IClwGZvj12U", title: "Class 10 - Physics - Chapter 14 - Lecture 5 Ohm's Law/Ohmic and Non-Ohmic Conductors -Allied Schools", channel: "Allied Schools" },
      { id: "dA8z07Gzuxs", title: "14.4 Ohm's Law || Resistance || Ohm | 10th Class Physics | Urdu Medium | Unit 14 Current Electricity", channel: "Math With Sir M.Rizwan" },
    ],
  },
  {
    classLevel: "10th",
    subject: "physics",
    topic: "Electromagnetism",
    videos: [
      { id: "kTTG08yR-rU", title: "Electromagnetic Induction || 10th Class Physics || Urdu Medium || Unit 15 ||  Electromagnetism.", channel: "Math With Sir M.Rizwan" },
      { id: "R6M_BjrDb_I", title: "📘 Class 10 Physics | Unit 19 Electromagnetism | One Shot Complete Chapter | National Book Foundation", channel: "The Grammar of Science" },
      { id: "5YMxdILh5II", title: "Magnetic Effects of Electric Current 🔥| Class 10th Science | NCERT covered| Prashant Kirad", channel: "Exphub 9th &10th" },
      { id: "M4ANvLCwrmY", title: "10th Class Physics Chapter 06🔥| Current Electricity | Full Chapter Oneshot  |  | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
    ],
  },
  {
    classLevel: "10th",
    subject: "physics",
    topic: "Electrostatics",
    videos: [
      { id: "d8g-b_mnA-0", title: "10th Class Physics Chapter 04🔥| Electrostatics | Full Chapter Oneshot  |  | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "DXZEJqxFnTw", title: "Class 10 - Physics - Chapter 13 - Lecture 5 - 13.5 and Electric Field Intensity - Allied Schools", channel: "Allied Schools" },
      { id: "tfdjKNSFvns", title: "Electrostatics Class 10 | Electric Charge | Electrification | 10th Class Physics", channel: "University Physics" },
      { id: "Ls7izXpmwFw", title: "10th Class Physics New Book Chapter 15 | Electrostatics | 15.1 Electric Charge | Urdu Medium", channel: "Math With Sir M.Rizwan" },
    ],
  },
  {
    classLevel: "10th",
    subject: "physics",
    topic: "Geometrical Optics",
    videos: [
      { id: "-pViRAHGVY8", title: "10th Class Physics Chapter 03🔥| Geometical Optics| Full Chapter Oneshot  |  | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "RIfMBiBzTCs", title: "Class 10 - Physics - Chapter 12 - Lecture 2 Spherical Mirrors - Allied Schools", channel: "Allied Schools" },
      { id: "i-CFAIU2WGQ", title: "Spherical Mirrors 10th class🔥| Concave mirror and Convex mirror😱| Ch#12 Geometrical optics", channel: "Usman Shani" },
      { id: "-qUU9onT15A", title: "10th Class | Physics | Chapter 12 | Geometrical Optics | Camera | 10 Class Physics | Camera | Lec.21", channel: "Haytham Academy" },
    ],
  },
  {
    classLevel: "10th",
    subject: "physics",
    topic: "Information and Communication Technology",
    videos: [
      { id: "K3wYL1nkV7Y", title: "Information and Communication Technology Class 10 | 10th Class Physics Wallah Lesson in Urdu Hindi", channel: "Atif Ahmad Official" },
      { id: "jdI2K4QybHo", title: "10th Class Physics Chapter 8 -Information and Communication Technology-Class 10th Physics Chapter 17", channel: "ilmkidunya" },
      { id: "I8-d2a5vQkc", title: "Class 10 - Physics - Chapter 17 - Lecture 1 - 17.1 Infromation & Communication  - Allied Schools", channel: "Allied Schools" },
      { id: "7hQZnCe5-Vs", title: "Information and Communication Technology in Urdu Class 10 Physics Chapter 17", channel: "SciTech Urdu" },
    ],
  },
  {
    classLevel: "10th",
    subject: "physics",
    topic: "Simple Harmonic Motion and Waves",
    videos: [
      { id: "3XMdt_X7pmA", title: "Class 10 - Physics - Chapter 10 - Lecture 1 - 10.1|Simple Harmonic Motion (SHM)-IlmSekhoBySirHuzaifa", channel: "Ilm Sekho By Sir Huzaifa" },
      { id: "TW8p4t7qfyY", title: "10 Physics Chapter 1🔥| SHM and Waves | Complete Chapter | 10th Physics | Oneshot | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "xVzH5Ml0-Wo", title: "10th Class Physics Chapter 10 - Simple Harmonic Motion - Physics Class 10 Chapter 1", channel: "ilmkidunya" },
      { id: "eam6B2PFaIs", title: "Class 10 - Physics - Chapter 10 - Lecture 1 - 10.1 Simple Harmonic Motion (SHM) - Allied Schools", channel: "Allied Schools" },
    ],
  },
  {
    classLevel: "10th",
    subject: "physics",
    topic: "Sound",
    videos: [
      { id: "yKN-ny5iNkU", title: "Class 10th Physics Chapter 13 | Physics new book class 10 unit 13 | Production of Sound | Lecture 1", channel: "Ustad Shani" },
      { id: "5v6LUz0Gw34", title: "10th Class Physics Chapter 11- Reflection ECHO of Sound - Class 10 Physics Chapter 2", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "9th",
    subject: "biology",
    topic: "Biodiversity",
    videos: [
      { id: "_F6ojBzAJBc", title: "Class 9th Chapter # 3: Biodiversity One shot Lecture", channel: "PoWer Of KnOwledge Academy" },
      { id: "18FdO4UE4so", title: "Biodiversity  | Chapter 3 | 9th class Biology | Lec.1", channel: "Chemistry Plus" },
      { id: "EqG8pOwrOEk", title: "Biodiversity Class 9 | Importance of Biodiversity Class 9 | Ch# 03 | Lec# 01", channel: "Hadi Biology 20" },
      { id: "wvyJsoLz7Ps", title: "9th Class Biology Chapter 2 | Biodiversity | Class 9th Biology New Book 2025", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "9th",
    subject: "biology",
    topic: "Bioenergetics",
    videos: [
      { id: "9zGppjCTfNU", title: "7.2 - PHOTOSYNTHESIS PART 1 II CHAPTER 7 - BIOENERGETICS  II 9TH CLASS BIOLOGY", channel: "Neem Hakeem" },
      { id: "021E59XfLhc", title: "Photosynthesis | Smart syllabus | Chapter 7 | 9th class Biology |ALP |Lec 4", channel: "Chemistry Plus" },
      { id: "Go3P7uu79s4", title: "Class 9th Chapter 7 Bioenergetics: Photosynthesis (Light & Dark Reaction)", channel: "PoWer Of KnOwledge Academy" },
      { id: "LsUeGbc_llg", title: "Cellular respiration & its importance | Class 9 Biology Chapter 8 | Bioenergetics |PTB 2025 New book", channel: "Knowlogy360" },
    ],
  },
  {
    classLevel: "9th",
    subject: "biology",
    topic: "Cell Cycle",
    videos: [
      { id: "9AE5ifkDweQ", title: "Cell Cycle: Mitosis in Detail", channel: "PoWer Of KnOwledge Academy" },
      { id: "K_4MXGQsxNw", title: "Mitosis complete detail in Urdu by dr Hadi", channel: "Dr Hafiz Sultan Academy" },
      { id: "YxeRQ2NdhAE", title: "9th Class BIOLOGY Ch 04 MIOSIS|| 9 Biology MIOSIS-| &|| | MIOSIS phase, MIOSIS Cell Cycle", channel: "Single National Curriculum" },
      { id: "ZaAomXZReYY", title: "What is Mitosis & Meiosis? | Complete | Urdu/Hindi", channel: "UrduFreeAnimatedEducation" },
    ],
  },
  {
    classLevel: "9th",
    subject: "biology",
    topic: "Cell Structure and Function",
    videos: [
      { id: "92e1k8UaJnc", title: "9th Biology | New book | Chapter 3 | سیل | The CELL | Lecture 1 | Biology 9 class | Urdu Medium", channel: "DAE Concept Academy" },
      { id: "x_AGZ6-0oYk", title: "Class 9th Chapter 4: Cells and Tissues (complete chapter /One shot lecture)", channel: "PoWer Of KnOwledge Academy" },
      { id: "RjdGGBIB3g4", title: "9th Class Biology | Chapter 4 | Cellular Structures and Functions", channel: "ilmkidunya" },
      { id: "84YSaDgxvas", title: "Cell Structure Organelles Functions in Urdu Hindi By Waqas Teaching Academy", channel: "Dr. Waqas RPh" },
    ],
  },
  {
    classLevel: "9th",
    subject: "biology",
    topic: "Enzymes",
    videos: [
      { id: "bD_uAST_Te4", title: "Class 9th Chapter 6:  Enzymes complete One shot lecture", channel: "PoWer Of KnOwledge Academy" },
      { id: "416L-QUBWgc", title: "Enzymes | Smart syllabus | Chapter 6 | 9th class Biology | ALP | Lec 1", channel: "Chemistry Plus" },
      { id: "lwsGVLUkdFQ", title: "9th Class Biology Chapter 7 | Characteristics of Enzymes | Class 9th Biology New Book 2025", channel: "ilmkidunya" },
      { id: "Wf0M5yz6JhQ", title: "Enzymes Class 9 In Urdu Hindi By Haider.Ali | Lecture No 01 | Chapter No 06 | Biology Lecture Series", channel: "The Alpha Academy Yazman" },
    ],
  },
  {
    classLevel: "9th",
    subject: "biology",
    topic: "Introduction to Biology",
    videos: [
      { id: "fvzidglOINc", title: "Introduction Chapter  1 Biology -  Introduction to Biology - 9th Class Biology Balochistan Board", channel: "FREE EDUCATION" },
      { id: "a4Lt7pF5O3c", title: "Biology and Branches of Biology - Biology class 9 - Chapter 1 - Lecture 1 - In Urdu medium", channel: "Adnan Riaz" },
    ],
  },
  {
    classLevel: "9th",
    subject: "biology",
    topic: "Nutrition",
    videos: [
      { id: "NjCegUENihs", title: "Class 9th chapter 8: Nutrition (One shot lecture)", channel: "PoWer Of KnOwledge Academy" },
      { id: "x5XGlgKE5qg", title: "NUTRITION - Full Chapter in 30 Min | ICSE Class 9 Biology", channel: "ICSE Wallah 9 & 10" },
      { id: "q8j0PNXc9EU", title: "9th Class Biology Chapter 9 | Nutrition in Plants | Class 9th New Book 2025", channel: "ilmkidunya" },
      { id: "IYqADyAr-D0", title: "Nutrition and Nutrients  | Chapter 8 | 9th class Biology | Lec 01", channel: "Chemistry Plus" },
    ],
  },
  {
    classLevel: "9th",
    subject: "biology",
    topic: "Solving a Biological Problem",
    videos: [
      { id: "gPmz7s0XwZI", title: "Class 9th Chapter # 2: Solving a Biological Problem (One shot Lecture)", channel: "PoWer Of KnOwledge Academy" },
      { id: "h04r7_YGPdQ", title: "Solving a biological problem | class 9th biology Sindh board new book", channel: "Syed Ali Academy" },
      { id: "ClK__KQ7ggQ", title: "Biology class 9 chapter 2 | Solving a biological problem | By irtisams biology", channel: "irtisam's biology" },
      { id: "2zozrmwfSVY", title: "Biological method steps Explained lecture1 Chapter 2 class 9th", channel: "Dr Hafiz Sultan Academy" },
    ],
  },
  {
    classLevel: "9th",
    subject: "chemistry",
    topic: "Chemical Reactivity",
    videos: [
      { id: "txCFeX1SYZk", title: "Matric part 1 Chemistry, Introduction About Chemical Reactivity - Ch 8- 9th Class Chemistry", channel: "ilmkidunya" },
      { id: "B6cOZIvtRq4", title: "Matric part 1||Introduction to chemical reactivity-class 9 chemistry chapter 8", channel: "Shakir Waheed Academy" },
      { id: "ING5qcGpWEs", title: "Class 9 - Chemistry - Chapter 8 - Lecture 01 - Chemical Reactivity of Metals - Allied Schools", channel: "Allied Schools" },
      { id: "uBX6fyreHGQ", title: "Chemical Reactivity || Chapter 8 Complete || Sindh Board || Class 9 Chemistry || by ykSir", channel: "ME Education Center - ESY Learning" },
    ],
  },
  {
    classLevel: "9th",
    subject: "chemistry",
    topic: "Electrochemistry",
    videos: [
      { id: "rXScQaUOLbU", title: "Matric part 1 Chemistry, Introduction About Electrochemistry - Ch 7 - 9th Class Chemistry", channel: "ilmkidunya" },
      { id: "O3Hd3WYtS74", title: "Class 9 - Chemistry - Chapter 7 - Lecture 1 - Introduction to Electrochemistry - Allied Schools", channel: "Allied Schools" },
      { id: "gQbMxACD_l8", title: "chemistry class 9 chapter 7 in urdu medium- electrochemical cell class 9 chemistry", channel: "waqar ul hasan Academy" },
      { id: "1rrQCf9h9RM", title: "Matric part 1 Chemistry, Electrochemical Cells - Ch 7 - 9th Class Chemistry", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "9th",
    subject: "chemistry",
    topic: "Fundamentals of Chemistry",
    videos: [
      { id: "aBX6sqZPZgI", title: "9th Class Chemistry Chapter #01 | Fundamentals  of Chemistry | Complete One Shot | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "7MARm24Q4_k", title: "Chemistry and its branches - Chapter 1 - Chemistry class 9 - Lecture 1 - Urdu medium - New book", channel: "Adnan Riaz" },
      { id: "fVQZtLm-Obc", title: "9th Class Chemistry Chapter 1 New Book 2026-27 | Complete One Shot (MCQs, Short & Long)", channel: "Last Hope Study" },
      { id: "p_etRboQYvk", title: "Chemistry class 9 - Chapter 1 - Topic 1.4 and 1.5 - Lecture 4 - Urdu medium - new book", channel: "Adnan Riaz" },
    ],
  },
  {
    classLevel: "9th",
    subject: "chemistry",
    topic: "Periodic Table",
    videos: [
      { id: "6ckn-DuNyTg", title: "Learn Periodic Table in 5 minutes || English and Urdu both languages", channel: "Life Side" },
      { id: "T1gAMCfcKzc", title: "Periodic Table And Periodic Law Class 09 In Urdu Hindi || Lecture No 03 || Chapter No 03", channel: "Hadi Biology 20" },
      { id: "SM92dEDCRu0", title: "9th Class Chemistry Chapter 8 | Periodic Table and Periodicity | Punjab Board | PECTA | One Shot", channel: "Last Hope Study" },
      { id: "fPb0tUou9zM", title: "9th Class | Chemistry Chapter # 03 | Periodic Table & Periodicity | One Shot | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
    ],
  },
  {
    classLevel: "9th",
    subject: "chemistry",
    topic: "Physical States of Matter",
    videos: [
      { id: "5GMzPfp5qds", title: "9th Class Chemistry | Chapter #05 | Physical States of Matter | One Shot Lecture | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "lPg0DKy4cNw", title: "5.1 Physical States of Matter | Chemistry | Class 9 | Introduction | Chap # 5", channel: "Al-Farooq Academy" },
      { id: "E8ty4SrIDzk", title: "Chapter 5 Physical States Of Matter Complete Numericals Class 9 Chemistry Sindh Board", channel: "Explore Maths With Haris Islam" },
      { id: "ELqVsFQ6law", title: "chemistry | Physical state of matter | Class 9th | Chapter 5 | Lecture 93", channel: "Alizium Activities" },
    ],
  },
  {
    classLevel: "9th",
    subject: "chemistry",
    topic: "Solutions",
    videos: [
      { id: "sYrlGnIctBI", title: "9th Class Chemistry Chapter 1 | Solution, Colloidal Solution and Suspension |  9th New Book 2025", channel: "ilmkidunya" },
      { id: "6MdAiz_9Wmk", title: "🧪 9th Class Chemistry | Chapter 1 Full Explanation | Smart Syllabus 2026 | Urdu & English Medium", channel: "Last Hope Study" },
      { id: "4tC82o2pP_w", title: "9th Class Chemistry | Chapter #06 | Solutions | One Shot Lecture | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "aXlax7JZct8", title: "Matric Part 1 Chemistry, Solubility - Chapter 6 Solutions - 9th Class Chemistry", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "9th",
    subject: "chemistry",
    topic: "Structure of Atoms",
    videos: [
      { id: "dSgWIx_Z0io", title: "Atomic Structure || Chapter 2 Complete || Sindh Board || Class 9 Chemistry || by ykSir", channel: "ME Education Center - ESY Learning" },
      { id: "KTS_wlmhiks", title: "9th Class Chemistry Chapter # 02 | Structure of Atom | Complete One Shot | Faizan Tanveer", channel: "StudyWudy - Faizan Tanveer" },
      { id: "m6pd_af6D9Y", title: "Atom and its particles - Chemistry Class 9 - Chapter 2 Lecture 1 - Urdu medium - New book", channel: "Adnan Riaz" },
      { id: "K-QVMgaubU4", title: "9th Class Chemistry Chapter 2 | Structure of Atom, Discovery of Electron |  Class 9th New Book 2025", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "9th",
    subject: "chemistry",
    topic: "Structure of Molecules",
    videos: [
      { id: "NdY4khkOyi4", title: "9Th Class Chemistry New Book 2025 | Lecture 1| Chapter 3 Topic 3.1 Atoms Chemical Bond Ku Bnaty Hain", channel: "MATH BY RANA HASSAN ALI" },
      { id: "xnnZ-ofT39I", title: "Lecture 1 - Chapter 3 - Chemical bonding - Chemistry class 9 in Urdu - New book", channel: "Adnan Riaz" },
      { id: "lSAxWwtap5k", title: "class 9 chemistry ch 4 chemical bonding ||chemical bonding explanation in urdu/hindi | ix chemistry", channel: "my online students" },
      { id: "jQN8D0srCjU", title: "Chemical bonds | duplet rule and octet rule |smart syllabus | chapter 4 | ALP | 9th Chemistry lec 1", channel: "Chemistry Plus" },
    ],
  },
  {
    classLevel: "9th",
    subject: "physics",
    topic: "Dynamics",
    videos: [
      { id: "RgTkJRdrXGo", title: "Newtons laws of motion class 9 | Newton's, first, second, third, Law of motion | atifahmedofficial", channel: "Atif Ahmad Official" },
      { id: "E5GCGAlIayk", title: "Newton's First Law of Motion With Examples | 9th Class Physics | Urdu Medium | Unit 3 |  Dynamics.", channel: "Math With Sir M.Rizwan" },
      { id: "Y9XNWQSXuBw", title: "Newton’s laws of motion || First law of motion || Second law of motion || Third law of motion", channel: "Physics with Muhammad Arafat Khan" },
      { id: "2r7fWi7CabE", title: "Chapter 3 Class 9th Physics New Book PTB 2025 | Unit 3 Newtons First Law Of Motion | Urdu Medium", channel: "MATH BY RANA HASSAN ALI" },
    ],
  },
  {
    classLevel: "9th",
    subject: "physics",
    topic: "Gravitation",
    videos: [
      { id: "yeFQ2Ce_nKo", title: "Gravitation Complete Chapter🔥| CLASS 9th Science| NCERT covered | Prashant Kirad", channel: "Exphub 9th &10th" },
      { id: "K_gbborBB_A", title: "Gravitation Class 9 || Complete CHAPTER IN ONE SHOT || NCERT Covered | Alakh Pandey", channel: "Alakh Pandey - Class 9th & 10th" },
      { id: "S7SvMnkGKYo", title: "Lecture 1-Law of universal gravitation - 9th Physics-Chapter 05- Gravitation- Asaanphysics -pushto", channel: "Asaan Physics" },
      { id: "G3vEmjRR6Cs", title: "Class 9 - Physics - Chapter 5 - Lecture 1 The Force of Gravitation - Allied Schools", channel: "Allied Schools" },
    ],
  },
  {
    classLevel: "9th",
    subject: "physics",
    topic: "Kinematics",
    videos: [
      { id: "AWsDJYrb9A0", title: "Class 9 - Physics - Chapter 2 - Lecture 1 - 2.1 Rest & Motion & 2.2 Types of Motion - Allied Schools", channel: "Allied Schools" },
      { id: "0PENCqCUl88", title: "9Th Class Physics New Book Chapter 2 || Lecture 1 || Kinematics", channel: "Sir Shahzad Sair" },
      { id: "bqdqY5Awb5I", title: "9th Class Physics Chapter 2 | Kinematics | Class 9th New Book 2025", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "9th",
    subject: "physics",
    topic: "Physical Quantities and Measurement",
    videos: [
      { id: "p2GS0jGMXM8", title: "9th Class Physics Chapter 1 Physical & Non Physical Quantities | Based & Drived Physical Quantities", channel: "ilmkidunya" },
      { id: "RJXroMhzrfA", title: "Physical and Non-Physical Quantities Class 9 | Physical Quantities Class 9 | National Book Founda...", channel: "Atif Ahmad Official" },
      { id: "YOnm2_XWByA", title: "Physical Quantities and Measurements | Physics Chapter 1", channel: "Nimra_Academy _hub" },
      { id: "Ou7NyNWKt1A", title: "9th Class | Physics | Chapter 1 | Physical Quantities | Measurements | Physical Quantities | Lec.02", channel: "Haytham Academy" },
    ],
  },
  {
    classLevel: "9th",
    subject: "physics",
    topic: "Properties of Matter",
    videos: [
      { id: "dsohhgrNDXg", title: "9Th Class Physics New Book Chapter 6 || Lecture 1, Mechanical Properties of Matter", channel: "Sir Shahzad Sair" },
      { id: "ZSpZ7kiyikY", title: "Deformation of Solids | Class 9th Physics New Book| Mechanical Properties of Matter | Urdu Medium", channel: "MATH BY RANA HASSAN ALI" },
      { id: "HTqfp_T477o", title: "9th Class | Physics | Chapter 7 | Properties of Matter | kinetic Molecular Theory of Matter | Lec.01", channel: "Haytham Academy" },
      { id: "sSzw5kz0grA", title: "9th Class Physics  in Urdu, Thermal Expansion -Physics Ch 8- Matric Part 1", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "9th",
    subject: "physics",
    topic: "Thermal Properties of Matter",
    videos: [
      { id: "ZplF0RbGU4c", title: "Thermal Properties of Matter| Physics Class 09 | Chapter 9| Lecture 1 | SOS", channel: "Sindh Online School" },
      { id: "d25Eqvp5MGs", title: "9Th Class Physics New Book Chapter 7 || Lecture 1 || Thermal Properties of Matter", channel: "Sir Shahzad Sair" },
      { id: "fxLkf9l4JU8", title: "Temperature and heat class 9 | Difference between heat and temperature Thermal properties of matter", channel: "University Physics" },
      { id: "EyMy5Hg51Ak", title: "Lec 084, Temperature, Heat, Class 9 Physics, Unit 8 Thermal properties of matter, Pushto Tutor tech", channel: "pushto tutor" },
    ],
  },
  {
    classLevel: "9th",
    subject: "physics",
    topic: "Transfer of Heat",
    videos: [
      { id: "lvyCe0UaqJY", title: "Heat Transfer: Conduction, Convection, and Radiation", channel: "Wisc-Online (Part of WisTech Open)" },
      { id: "EjVotfgsODg", title: "Physics Class 9 | Chapter 9 | Topic 1 | Transfer of Heat | in urdu | tutoria.pk", channel: "tutoriadotpk" },
      { id: "j2yas3M3Q8M", title: "Class 9 - Physics - Chapter 9 - Lecture 1 9.1 Transfer of Heat & 9.2 Conduction - Allied Schools", channel: "Allied Schools" },
      { id: "cQ4URLmul6E", title: "Transfer of Heat Conduction Convection Radiation Urdu", channel: "Asim Educate" },
    ],
  },
  {
    classLevel: "9th",
    subject: "physics",
    topic: "Turning Effect of Forces",
    videos: [
      { id: "K5QdzM6urHw", title: "Moment of a Force Class 9 Physics | Torque | Turning Effect of Force | FBISE | NBF | kpk boards", channel: "Lectures Of Physics" },
      { id: "bppH2Vps7aE", title: "TORQUE | MOMENT OF FORCE in urdu/Hindi | Hassaan Fareed |PGC", channel: "Pocket Physics by Hassaan Fareed" },
      { id: "3_MOT9Cbk8c", title: "Torque or Moment of force physics class 9 | matric part 1 physics ch 4 torque or moment of force", channel: "Atif Ahmad Official" },
      { id: "mDaFyQlbtng", title: "9th Class | Physics | Chapter 4 | Turning Effect of Forces | Couple of Forces | Unit. 4 | Lec.09", channel: "Haytham Academy" },
    ],
  },
  {
    classLevel: "9th",
    subject: "physics",
    topic: "Work Power and Energy",
    videos: [
      { id: "fQlsY8oECuQ", title: "9Th Class Physics New Book Chapter 5 || Lecture 1, Work, Energy And Power ||", channel: "Sir Shahzad Sair" },
      { id: "k8UGYxZ7WtA", title: "Work | work and energy | unit 6 class 9 physics", channel: "University Physics" },
      { id: "iwzJP_Xprf4", title: "Physics New Book 2025 | Chapter 5 Work, Energy and power |  9th Class new Playlist", channel: "ilmkidunya" },
      { id: "bGFE2Z-VVM8", title: "Work and Energy 🔥| CLASS 9th Science | NCERT covered | Prashant Kirad", channel: "Exphub 9th &10th" },
    ],
  },
  {
    classLevel: "9th",
    subject: "math",
    topic: "Matrices and Determinants",
    videos: [
      { id: "dnJa9UwKpNs", title: "Class 9 - Mathematics - Chapter 1 - Lecture 12 Matrices & Determinants - Allied Schools", channel: "Allied Schools" },
      { id: "Kn4z7SLHUnM", title: "Class 9th | Math | Unit 1: Matrices and Determinants | Punjab Textbook Board | Lecture 1", channel: "Schoolance" },
      { id: "banYVoVFhtY", title: "Class 9 Math - Chapter 1 (Exercise 1.1) | Matrices and Determinants | Punjab Textbook Board", channel: "CLASSROOM" },
      { id: "S4ZAVk79qHQ", title: "Class 9th Lecturer #1 | Chapter No. 1 | Introduction of Matrix & Determinants", channel: "Bukhari Online Tutor" },
    ],
  },
  {
    classLevel: "9th",
    subject: "math",
    topic: "Real and Complex Numbers",
    videos: [
      { id: "NtBGLHphDbs", title: "Introduction Chapter-2 | Real and Complex Numbers | 9th class Maths | Urdu | imran knowledge link |", channel: "Course Leader Academy" },
      { id: "l1TiqOtJ9kE", title: "9th Mathematics Ch 2 Real and complex numbers - 9th class Mathematics Ch 2 Real and complex numbers", channel: "Guess Ki Dunya" },
      { id: "0F-95MR3Aos", title: "Class 9 - Mathematics - Chapter 2 - Lecture 1 Real and Complex numbers - Allied Schools", channel: "Allied Schools" },
      { id: "j2QL-z8Xkk4", title: "9th Grade Mathematics Ch 2: Real and Complex Numbers", channel: "Guess Ki Dunya" },
    ],
  },
  {
    classLevel: "9th",
    subject: "math",
    topic: "Logarithms",
    videos: [
      { id: "bajf_hVMR74", title: "9th class math LEC # 1 chapter # 3 logarithms !! In Urdu", channel: "Math with Asim" },
      { id: "PNLZBz1ery8", title: "Class 9 - Mathematics - Chapter 3 - Lecture 1 Logarithms - Allied Schools", channel: "Allied Schools" },
      { id: "OQNRFohVkwc", title: "Laws of Logarithm, Class 9 Mathematics, unit # 03, kpk Board", channel: "Samiullah Educational Zone" },
      { id: "fR-iNXBWpBQ", title: "Class 9 Math Chapter 3 | Laws of logarithms | Sir Naimat Ullah | Urdu", channel: "Naimat Maths" },
    ],
  },
  {
    classLevel: "9th",
    subject: "math",
    topic: "Algebraic Expressions and Formulas",
    videos: [
      { id: "AzoBReIQVGc", title: "Algebraic Expressions and Algebraic Formulae | Chapter 4 | Maths 9th Class | Matric Part 1 | tutoria", channel: "tutoriadotpk" },
      { id: "EtlhafGCzoA", title: "Exercise 4.1 Complete 9th Class Math | Urdu Medium | Unit 4 | Factorization & Algebraic Manipulation", channel: "Math With Sir M.Rizwan" },
      { id: "Du19zU3Psys", title: "Class 9 - Mathematics - Chapter 4 - Lecture 1 Algebraic Expressions & Formulas - Allied Schools", channel: "Allied Schools" },
      { id: "wLvSgz9kD7c", title: "Chap #4| Factorization & Algebraic Manipulation| Introduction |9th Class New Edition 2025 Math|Lec 1", channel: "Maths by Prof. Iqbal Haider Bhatti" },
    ],
  },
  {
    classLevel: "9th",
    subject: "math",
    topic: "Factorization",
    videos: [
      { id: "JY1f-RfXYBU", title: "What is Factorization Urdu/Hindi ? Introduction to Factorization Chapter 5 Class 9th Maths", channel: "Naimat Maths" },
      { id: "AC4Efthrua0", title: "What is Factorization?(SLO Based Concept)||Unit # 5(Factorization) Class 9 Maths kpk All Boards.", channel: "Saif Academy" },
      { id: "BXTMiNjcA-k", title: "Exercise 5.1,Q.1 to 10,Class 9 Maths Kpk All Boards|| Unit # 5 Factorization", channel: "Saif Academy" },
    ],
  },
  {
    classLevel: "9th",
    subject: "math",
    topic: "Linear Equations and Inequalities",
    videos: [
      { id: "5qNld_e7_e8", title: "CLASS 9  MATHEMATICS | CHAPTER # 7 LINEAR EQUATION AND INEQUALITIES IN URDU", channel: "The Math Lab" },
      { id: "22T-jecIE7o", title: "Class 9 - Mathematics - Chapter 7 - Lecture 1 Linear equations & inequaiities - Allied Schools", channel: "Allied Schools" },
      { id: "MR4aKJ6cS20", title: "Chap # 5| Linear Equations & Inequalities| Ex 5.1 Q1 & 2| 9th Class  New Edition 2025 Math| Lec 1", channel: "Maths by Prof. Iqbal Haider Bhatti" },
      { id: "YUVHd9keX-E", title: "Linear Equations & Inequalities | Class 9 Math Chapter 7 | SST & Lecturer  Math Jobs Preparation", channel: "MK Preparations" },
    ],
  },
  {
    classLevel: "10th",
    subject: "math",
    topic: "Quadratic Equations",
    videos: [
      { id: "Jg9NT1R_lSA", title: "LEC # 9 10TH CLASS MATHS  CHAPTER # 1 QUADRATIC EQUATION || IN URDU AND HINDII", channel: "Math with Asim" },
      { id: "dBOt9oK7pHE", title: "Solution of Quadratic Equation in Urdu class 10th punjab text book", channel: "Are You Learner" },
      { id: "sOSzdGWxLyc", title: "Class 10 - Mathematics - Chapter 1 - Lecture 1 Quadratic equations - Allied Schools", channel: "Allied Schools" },
      { id: "Rpy-2dTzBxQ", title: "10th Class Maths solution, Ch 1, Lecture 1 - Exercise 1.1 Question no 1 - Math 10th Class-10 Math", channel: "Mushahid Ali Zafar" },
    ],
  },
  {
    classLevel: "10th",
    subject: "math",
    topic: "Theory of Quadratic Equations",
    videos: [
      { id: "GHT1dO67oZU", title: "10th Class Math | Chapter 2 Exercise 2.1 Q9 & Q10 | Urdu Medium | Matric Math Full Solution Rules", channel: "Higher Maths" },
      { id: "d2uPWBdIn90", title: "10th Class Math Chapter 2 | Exercise 2.2 Q1 | Complete Solution in Urdu Medium (Punjab Board)", channel: "Higher Maths" },
      { id: "8BE5YtjKNIM", title: "\"10th Class Math|Theory of Quadratic Equation|Introduction Unit No.2|Punjab Board Lectures|Chapter 2", channel: "The Yasir Academy" },
      { id: "Nrc7Sx-6DvM", title: "10th Class Math Chapter 2 Introduction l Quadratic Equations l Punjab Board New Book 2026 l", channel: "mudassiralinoon" },
    ],
  },
  {
    classLevel: "10th",
    subject: "math",
    topic: "Variations",
    videos: [
      { id: "GK6hCzYxzKg", title: "KPK 10th Class Math |Chapter 3 Variation Introduction |Ratio, Proportion, Direct & Inverse Variation", channel: "Khan Math" },
      { id: "mQ_YLyv6fw4", title: "Variations | Class 10 Math Chapter 3 | SST Math Physics, One Paper & Lecturer Math Jobs Preparation", channel: "MK Preparations" },
      { id: "mzHO1fjreGw", title: "Class-10 Mathematics | Chapter-3 Variations | Important Questions | Must Prepare | Exams | Tests", channel: "AIMERS" },
      { id: "Ys5MbZYAnuc", title: "Lec 01, Exercise 3.1 complete, Class 10 maths |  Variation  | Pushto Tutor,  chapter 3 All kp boards", channel: "pushto tutor" },
    ],
  },
  {
    classLevel: "10th",
    subject: "math",
    topic: "Partial Fractions",
    videos: [
      { id: "FxCK2MMaxX8", title: "10th Class Mathematics| Chapter 4 |Partial Fraction| introduction | Letest Video | Minahil Khan", channel: "Easy Math With Minahil khan" },
      { id: "5Hk1XQL3rNw", title: "Class 10 - Mathematics - Chapter 4 - Lecture 1 - Exercise 4.1 - Allied Schools", channel: "Allied Schools" },
      { id: "VI2z_BTkL5s", title: "Exercise 4.1 - 10 Class Math |  Waqas Nasir", channel: "Waqas Nasir" },
      { id: "B0AjWIFCyzw", title: "Introduction to Partial Fractions  |Class 10th Maths |Class 11th| In Urdu", channel: "Maths With Awi Sir" },
    ],
  },
  {
    classLevel: "10th",
    subject: "math",
    topic: "Sets and Functions",
    videos: [
      { id: "lK5tQ2_KptE", title: "Class 10 Math Chapter 5 - Introduction to Sets and Functions - 10th Class Math Chapter 5", channel: "ilmkidunya" },
      { id: "QID8MTz9o5E", title: "Sets and Functions | Mathematics Class 10th | Unit#5 Lecture#1 | ft. Muhammad Bilal | Urdu", channel: "ihsan khakhi (ik)" },
      { id: "o33HPgigZog", title: "Sets & Functions | Class 10 Math Chapter 5 | SST Math Physics & Lecturer Math Jobs Preparation", channel: "MK Preparations" },
      { id: "kTWp6XpfyCU", title: "Class 10 Maths Chapter 5: Sets & Functions | Important Long Question Solved", channel: "Sir Shahzad Sair" },
    ],
  },
  {
    classLevel: "10th",
    subject: "math",
    topic: "Basic Statistics",
    videos: [
      { id: "aiLZ6wA_oDA", title: "Exercise 6.1 || Questions 1 to 4 Complete || 10th Class Math Urdu Medium || Unit 6 Basic Statistics.", channel: "Math With Sir M.Rizwan" },
      { id: "gq67WzJkT8U", title: "Class 10 - Mathematics - Chapter 6 - Lecture 1 Basic Statistics - Allied Schools", channel: "Allied Schools" },
      { id: "pbsGMhFaGro", title: "Arithmetic mean Complete concept | Chapter 6 basic Statistics | 10th class math chapter 6", channel: "Lecturer Asad Ali" },
      { id: "onWBFG5H5Z8", title: "Basic Statistics | Class 10 Math Chapter 6 | SST Math Physics & Lecturer Math Jobs Preparation", channel: "MK Preparations" },
    ],
  },
  {
    classLevel: "10th",
    subject: "math",
    topic: "Introduction to Trigonometry",
    videos: [
      { id: "-dOGdfiHSuM", title: "10th Class Math Exercise 7.1 Urdu Medium | Chapter 7 New Book 2026 | Punjab Board || Full Exercise", channel: "Sir Farhan Mayo" },
      { id: "3dbFUWAVJ0k", title: "10th Class Math KPK | Ch 7 Introduction to Trigonometry | Lec#01", channel: "Printpedia Lectures" },
      { id: "8qLnqk5tbyo", title: "Class 10 - Mathematics - Chapter 7 - Lecture 1 - Measurements Of an Angles - Allied Schools", channel: "Allied Schools" },
      { id: "6y5fKq9kB34", title: "Class 10th Math New Book Ch 7 Exercise 7.1 Complete- 10th Class Maths Exercise 7.1 - Trigonometry", channel: "Mushahid Ali Zafar and Mushahid Ali Vlogs" },
    ],
  },
  {
    classLevel: "10th",
    subject: "math",
    topic: "Chords and Tangents of a Circle",
    videos: [
      { id: "eLAi5IJ60HM", title: "Class: 10th | Mathematics (FBISE) | Lecture # | Unit #9 | Chords Of A Circle | Theorem #1 |", channel: "Maths Made Easy" },
      { id: "ZfF9Gii4XFo", title: "Class 10 - Mathematics - Chapter 9 - Lecture 1 - Chords of a Circle (Theorem 1) - Allied Schools", channel: "Allied Schools" },
      { id: "fkacPxMNpKQ", title: "Class 10 - Mathematics - Chapter 9 - Lecture 3 - Chords of a Circle (Theorem 4.5) - Allied Schools", channel: "Allied Schools" },
    ],
  },
  {
    classLevel: "9th",
    subject: "cs",
    topic: "Problem Solving",
    videos: [
      { id: "XhfIL67oMg8", title: "Problem Solving ( Urdu / Hindi ) | 9th Class computer science unit 1 | Computer 4 All", channel: "COMPUTER with Prof. Shahzad" },
      { id: "hot99oryV08", title: "Problem Solving 9th Class Computer Chapter 1 New Syllabus Urdu/Hindi", channel: "TubeLight Academy" },
      { id: "p-Vi7ai9tfk", title: "Problem Solving | 9th Class Computer Science Chapter 1 | Class 9 Computer Chapter 1 New Book", channel: "ilmkidunya" },
      { id: "zEbvRZ3elQY", title: "Class 9 Computer Science Chapter 1 | Long Questions | Introduction to Systems | Urdu Medium 2025", channel: "Sir Murtaza" },
    ],
  },
  {
    classLevel: "9th",
    subject: "cs",
    topic: "Binary System",
    videos: [
      { id: "n2cG4TWxz6I", title: "9th Class Computer Chapter 2 | Number System Explained with Urdu Translation | PTB 2025-26", channel: "HIGH AIM" },
      { id: "QD5aOKSskNM", title: "Binary Arithmetic Operations Hindi/Urdu | 9th Computer | Chapter 02 | Class 08 | Syed Bakht", channel: "Syed Bakht A Teacher" },
      { id: "QNGyFEdgIuY", title: "Data Representation in Computing System | 9th Class Computer Chapter 2| Class 9th New Book 2025", channel: "Easy Computers With Abdullah" },
      { id: "leObak_ITYA", title: "Number System | 9th computer new book chapter 2", channel: "Computer Teacher" },
    ],
  },
  {
    classLevel: "9th",
    subject: "cs",
    topic: "Networks",
    videos: [
      { id: "akr2-wfBCQU", title: "Computer Network in english/urdu/hindi | Networks | 9th Computer  chapter 3@ComputerTeacherOfficial", channel: "MKF Study Point" },
      { id: "AuSqQd9tank", title: "9th Class Computer Unit 3 | Introduction to Computer Networks | One Shot | English & Urdu Medium", channel: "Last Hope Study" },
      { id: "DUKn5R_68bQ", title: "Client Server Network in Hindi/Urdu | 9th Computer Science | Chapter 3 | Lecture 3 Digital Education", channel: "Digital Education" },
      { id: "QIjaq7nME50", title: "Class 9th | Computer Science New Book 2026 || Chapter 3 Computer Networks || Lecture 1 by Mian Awais", channel: "Learning With Mian Awais" },
    ],
  },
  {
    classLevel: "9th",
    subject: "cs",
    topic: "Data and Privacy",
    videos: [
      { id: "pEjkBAQyNaY", title: "9th Class Computer Confidential and Privacy Chapter # 4 Lecture # 18 Urdu/Hindi", channel: "Zavia Educational System Multan" },
      { id: "xDsXePSUOAo", title: "Lecture No 22 || Chapter 4 ||  Data and Privacy || Simple Encryption  || Class 9th || Urdu", channel: "Bairy Computer Science Academy" },
      { id: "5xa6N4YzDkI", title: "Lecture No 21 || Chapter 4 ||  Data and Privacy  || Data Privacy  || Class 9th || CS  || P 2 Urdu", channel: "Bairy Computer Science Academy" },
      { id: "owR9X7De7hI", title: "Lecture No 20 | Chapter 4 | Data and Privacy | Ethical issues | related to Security | Class 9th Urdu", channel: "Bairy Computer Science Academy" },
    ],
  },
  {
    classLevel: "9th",
    subject: "cs",
    topic: "Designing Website HTML",
    videos: [
      { id: "MRH_TsaMfV4", title: "Introduction to HTML || 9TH Class Computer new Book || Chapter-5", channel: "IBS Creator" },
      { id: "2lE2n55CuTM", title: "Designing Website, Class 9th, Computer Science, Unit 5, Lecture 1, How to Design Website in HTML", channel: "IT Education Zone" },
      { id: "oVThOP2OoaU", title: "Designing Website in HTML, Class 9th, Computer Science, Unit 5, Lecture 5, Website in HTML,", channel: "IT Education Zone" },
      { id: "6vOpuoc8coI", title: "Designing Website, Class 9th, Computer Science, Unit 5, Lecture 2, How to make a website in HTML", channel: "IT Education Zone" },
    ],
  },
  {
    classLevel: "10th",
    subject: "cs",
    topic: "Introduction to Programming",
    videos: [
      { id: "G2VDTNuUicE", title: "Introduction to Programming in hindi/ urdu | 10th class computer science new book chapter 1", channel: "The CS Mentor" },
      { id: "GvnqJDjhUVM", title: "Introduction to Programming in hindi/urdu | 10th class computer science new book chapter 1", channel: "Computer Teacher" },
      { id: "OLxrPSY3rD0", title: "Introduction to Programming in Urdu|10th Class Computer Science new book 2021 chapter 1 lecture#1", channel: "Noreen educationist" },
      { id: "MoJ-1YFMgfs", title: "Introduction to Programming in Urdu/Hindi | Class 10th | Computer Science | Chapter 1 | Teachzie", channel: "Teachzie" },
    ],
  },
  {
    classLevel: "10th",
    subject: "cs",
    topic: "User Interaction",
    videos: [
      { id: "jb3_2splveI", title: "getch( ) function || Chapter 2 in Urdu/Hindi || 10th Class Computer Science New Book || Lecture 4", channel: "Limitless Education" },
      { id: "_sc6lcCnVM0", title: "Programming Exercise Part 1 | Chapter 2 in Urdu | 10th Class Computer Science New Book | Lecture 11", channel: "Limitless Education" },
      { id: "HG60wZeY6gE", title: "User Interaction || Chapter 2 in Urdu || 10th Class Computer Science New Book || Lecture 1 #class10", channel: "Limitless Education" },
      { id: "L1K2Igs_v7o", title: "User Interaction | 10th Computer | Chapter 02 | Class 00 | by Syed Bakht", channel: "Syed Bakht A Teacher" },
    ],
  },
  {
    classLevel: "10th",
    subject: "cs",
    topic: "Conditional Logic",
    videos: [
      { id: "fd4cP9K_a74", title: "Class 10|Unit No 3 Conditional Logic |Example Code 3.3 and 3.5 in Urdu/Hindi", channel: "Muhammad Rizwan Guru" },
      { id: "Sk-bu7q2Rio", title: "Class 10|Unit No 3 Conditional Logic |Example Code 3.1| Programming Time 3.1 in Urdu/Hindi", channel: "Muhammad Rizwan Guru" },
      { id: "mGzMZ7WQNmU", title: "10th Class Computer Science Ch 3 | Control Statement | PTB| Introduction to conditional logic|Lec1", channel: "PMC Academy" },
      { id: "EBA0HNyw4DM", title: "What is Conditional Logic? | 10th Computer | Chapter 03 | Class 00 | By Syed Bakht", channel: "Syed Bakht A Teacher" },
    ],
  },
  {
    classLevel: "10th",
    subject: "cs",
    topic: "Data and Repetition",
    videos: [
      { id: "YKUvrD0Lfdc", title: "Data And Repetition| Loop Structure| For Loop Chapter 4 10th Class Computer Science", channel: "Irtaza Academy" },
      { id: "z-Y5WUcMk5s", title: "Data and Repetition| Nested Loops| Examples | 10th Class Computer Science Chapter 4", channel: "Irtaza Academy" },
      { id: "IH7D3rLAhkI", title: "10th Class Computer | Chapter 4 Data & Repetition | Nested Loop Explained with Examples", channel: "The Universal School Bahawalpur" },
      { id: "KBws3OnRlbk", title: "Class 10 Computer Science | Chapter 4 Data & Repetition | For Loop in C with Examples", channel: "hamzazafeer" },
    ],
  },
  {
    classLevel: "10th",
    subject: "cs",
    topic: "Functions",
    videos: [
      { id: "qus6gSS7qCs", title: "Chapter 05 | Functions | 10th Class | Computer | Sindh Board | @otsedtech  ​", channel: "OTS EdTech" },
      { id: "yvcDPLhqFhE", title: "10th Class Computer Science Chapter 5 | Functions and Its Types | Class 10 Computer Science Ch 5", channel: "ilmkidunya" },
      { id: "4U86pvSa8Xc", title: "Functions in C | 10th class computer science new book chapter 5", channel: "Computer Teacher" },
      { id: "BEix99N9sAw", title: "Class 10 - Computer Studies - Chapter 5 - Lecture 1 - Function Types - Allied Schools", channel: "Allied Schools" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Measurements",
    videos: [
      { id: "q-uRf48WaOI", title: "Scientific Notation class 11 | Fsc part 1 physics chapter 1 measurements | inter part 1 urdu / hindi", channel: "Atif Ahmad Official" },
      { id: "z9OEuDzSMEY", title: "Physics Chapter 1 Measurement  | Lecture No. 1 | Class 11 KPK & FBISE PHYSICS | @webmed-official", channel: "WEBMED OFFICIAL" },
      { id: "UHEffd7X2R0", title: "FSc 1st Year Physics Chapter 1 | Measurements | New Syllabus 2025 | Full Lecture in Urdu", channel: "One Solution" },
      { id: "ygxNjnl6lMY", title: "Class 11 Physics Chapter 1 | Measurements Full Chapter Overview | New Book 2025 | Urdu Lecture", channel: "The Blueprint Analysis" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Vectors and Equilibrium",
    videos: [
      { id: "ccX5FWI4ebg", title: "equilibrium class 11 | 11th class physics chapter 2 | urdu, hindi | kpk board, federal board", channel: "Atif Ahmad Official" },
      { id: "b-FG6UN_7dY", title: "Matric part 1 Physics,ch 2,Scalars and Vectors-9th class Urdu Lecture", channel: "ilmkidunya" },
      { id: "6iOLL6wXbPY", title: "11th Class Physics Chapter 2 - Class 11 Physics Ch 2 Basic Concept of Vector - 1st Year Physics Ch 2", channel: "ilmkidunya" },
      { id: "74_txikQDR4", title: "Physics Class 11 Chapter 2 - Lecture 1 | Vector, Scalar Simple Explanation In Urdu/Hindi", channel: "Anjum Academy" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Motion and Force",
    videos: [
      { id: "ZdkOJm6IyAA", title: "11th Class Physics Ch. 3 Lecture 1 Motion and Force Displacement, Velocity - 1st year", channel: "ilmkidunya" },
      { id: "sHkOAEIhMp8", title: "1st Year Physics Chapter 3: Newton’s Laws of Motion - 11th Class Physics Chapter 3", channel: "ilmkidunya" },
      { id: "SqKCF6Mtl0k", title: "Distance and Displacement | Motion & Force | Physics | in Urdu/Hindi By Mubashar Ahmad", channel: "Mubashar Ahmad" },
      { id: "hlxqOXfWFPk", title: "PGC lectures-Inter Part 1-KPK Board-Physics-Chapter 3-Newton Laws Of Motion PART (1)", channel: "PGC Lectures - KPK Board" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Work and Energy",
    videos: [
      { id: "n-7qPr10XSE", title: "11 Class Physics New Book PECTAA 2025 | What is work urdu/hindi | Unit 4 Work Energy and Power", channel: "Classroom with Ahsan Ammar" },
      { id: "5pSKGuaqEkQ", title: "11th Class Physics Chapter 4 | Work Energy Theorem | 11th Physics New Book 2025", channel: "ilmkidunya" },
      { id: "bLtAnpPufXQ", title: "11th Class Physics Chapter 4 | Work Done by a Variable Force (4.2) | 11th Physics New Book 2025", channel: "ilmkidunya" },
      { id: "xCiPg4tNhR0", title: "11 Class Physics New Book 2025 | Work done by variable Force Urdu | Chapter 4 Work Energy and Power", channel: "MATH BY RANA HASSAN ALI" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Circular Motion",
    videos: [
      { id: "kMAOuiNyUeA", title: "Angular Velocity | Circular Motion | Chap 05 | 1st year Physics | Urdu and Hindi language", channel: "Umar Education Zone" },
      { id: "QP-rQ0CKnv0", title: "PGC Lectures-Inter Part 1-Fedreal Board-Physics-Chapter 5-Angular Displacement (Circular Motion)", channel: "PGC Lectures - Federal Board" },
      { id: "TmvCwyKA3No", title: "11th Physics Live Lecture 1 Ch. 5 Circular Motion, Angular Displacement", channel: "ilmkidunya" },
      { id: "fldDQNbgqlk", title: "11th Physics Live Lecture 20, Ch. 5, Circular motion (Revision & Test Session)", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Fluid Dynamics",
    videos: [
      { id: "bDMqfNc1xCg", title: "Viscous Fluids Class 11 | 11th Physics Ch 6 | Viscosity in Urdu Hindi | KPK, Punjab, Federal Board", channel: "Atif Ahmad Official" },
      { id: "5jClj4_7ExI", title: "Inter Part1 Physics Chapter 06 Fluid Dynamics| in Urdu/Hindi", channel: "SCIENCE SPEAKS" },
      { id: "REq5yhIAtiU", title: "Physics Class 11 | Chapter 6: Fluid Mechanics | Lecture 1 | FBISE | PDF Notes  | English & Urdu", channel: "Khanpur Coaching" },
      { id: "WuBrXTlBCQQ", title: "11th Class Physics, Ch 6 - Relation Between Fluid Speed and Pressure - FSc Physics Book 1", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Oscillations",
    videos: [
      { id: "1bvY5tcLKOM", title: "PGC lectures-Inter Part 1-KPK Board-Physics-Chapter 7-Oscillations SHM", channel: "PGC Lectures - KPK Board" },
      { id: "7d6BGYv--qQ", title: "FSc Physics Book 1, Ch 7 - Introduction to Oscillations - 11th Class Physics", channel: "ilmkidunya" },
      { id: "LVCWcAyzePY", title: "FSC part 1 Physics, Ch 7 - Define Damped Oscillations - FSc Physics Book 1", channel: "ilmkidunya" },
      { id: "2bHEYEHxNkQ", title: "ECAT NGP Physics Live Lecture 1, Ch no 7, Oscillations (1st Half)", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Waves",
    videos: [
      { id: "OsAySDruR0o", title: "Polarization of Light urdu/hindi | 11th Class Physics New Book Chapter 8 Lecture 1", channel: "PECTAA Learners Club" },
      { id: "lZtzITHjqt0", title: "Polarization of Light urdu/hindi | 11th Class Physics New Book Chapter 8 Lecture 1", channel: "Classroom with Ahsan Ammar" },
      { id: "UsR1_igQr6k", title: "New Class-11 Physics | Chapter 8 | Malus's Law Urdu/Hindi | Physics Pulse | Muhammad Sajid", channel: "Physics Pulse" },
      { id: "dcJ29RqKrYE", title: "waves class 11 | introduction to waves | types of waves | 11th class physics ch 8 | matter waves", channel: "Atif Ahmad Official" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Physical Optics",
    videos: [
      { id: "Fxk9oAUD8SY", title: "Nature of light class 11 | 11th class physics ch 9 introduction | dual nature of light | in urdu", channel: "Atif Ahmad Official" },
      { id: "GZ-EjuilJtE", title: "1st Year Physics - Chapter 09 – Physical OPTICS", channel: "PHYSICS with Yasir Hanif" },
      { id: "OpflQdGDDt0", title: "First Year Physics, Ch 9 - Introduction to Physical Optics - FSc Physics Book 1", channel: "ilmkidunya" },
      { id: "0bfzdq-7qUI", title: "Class 11 Physics Chapter 9 Physical Optics One Shot Video KPK Book | Study With Me", channel: "Study With Me" },
    ],
  },
  {
    classLevel: "11th",
    subject: "physics",
    topic: "Thermodynamics",
    videos: [
      { id: "SKl-pkb83aU", title: "thermodynamic system class 11 | 11th class physics ch 10 | federal board, kpk board | in urdu", channel: "Atif Ahmad Official" },
      { id: "4X5OL-lquEQ", title: "First Law of Thermodynamics Urdu/Hindi | 11th Class Physics New Book | Unit 6 Heat & Thermodynamics", channel: "PECTAA Learners Club" },
      { id: "HkaAJ_lZfmY", title: "11th Class Physics, Ch 11 - First Law of Thermodynamics - FSc Physics Book 1", channel: "ilmkidunya" },
      { id: "lPfqHLeojqw", title: "FSc Physics Book 1, Ch 11 - Work and Heat in Physics - 11th Class Physics", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Electrostatics",
    videos: [
      { id: "9NFpl2NNuco", title: "12th Class Physics New Book 2026 | Physics Class 12 New Book Lecture 1", channel: "Physics Inside Out" },
      { id: "opvMQXuIUb8", title: "🚀 Electrostatics | Complete Chapter in ONE SHOT | MDCAT Physics | Manzil Series | PMDC MDCAT", channel: "Physics Ka Manjan - Bilal Zia" },
      { id: "CKKZM-Dfygk", title: "ELECTROSTATICS in One Shot || NDA Physics Crash Course", channel: "Defence Wallah" },
      { id: "NdSUElFEzV0", title: "MDCAT Physics Master Class | Electrostatics Part I", channel: "Physics In Seconds - Ustaad Jee" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Current Electricity",
    videos: [
      { id: "DOdD5iSEyD0", title: "Electric Current || Current Electricity || Urdu Hindi", channel: "The Base Academy" },
      { id: "0b4eFGzLuOw", title: "Electric Current | Types & Sources of Current | Current Electricity | Physics | in Urdu/Hindi By MA", channel: "Mubashar Ahmad" },
      { id: "uJLeHnq6icI", title: "/Chapter 13/ /Current Electricity/ /physics inside/ / Electric Current/ / Class: 2nd year/ /Urdu/", channel: "Physics Inside" },
      { id: "3ZL3v7zIXtg", title: "FSc Physics book 2, Ch 13 - Explain Electric Current - Current Electricity - 12th Class Physics", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Electromagnetism",
    videos: [
      { id: "J0kloX2d26g", title: "Lorentz Force| Chapter 14| Electromagnetism| 2nd Year Physics| Urdu Hindi", channel: "ZOHAIB TV" },
      { id: "js4pj_H1Xy4", title: "PGC Lectures-Inter Part II-Punjab Board-Physics-Chapter 14 - Force on a Moving Charge", channel: "Punjab Group Of Colleges" },
      { id: "ntKaV6_luNs", title: "2nd Year Physics - Chapter 14 – Electromagnetism", channel: "PHYSICS with Yasir Hanif" },
      { id: "HY2vack7DRk", title: "Lec 1 - Introduction to Electromagnetism || 12th Class Physics || Chapter# 14", channel: "The Base Academy" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Electromagnetic Induction",
    videos: [
      { id: "NQycnGYvX3c", title: "Introduction to electromagnetic induction | in Urdu / Hindi | 12th class physics | physics ka safar", channel: "Physics ka Safar" },
      { id: "9LbVzuLIlp0", title: "Faraday's law and induced EMF | in urdu/Hindi | 12th class physics | physics ka safar", channel: "Physics ka Safar" },
      { id: "9MVrRkwrN8w", title: "Transformer in Urdu Hindi || 12th Class Physics - Chapter 15", channel: "The Base Academy" },
      { id: "zLdxRdbxt58", title: "Lenz's Law 2nd Year Physics Chapter 15 | Urdu/Hindi", channel: "Waqas Khalil" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Alternating Current",
    videos: [
      { id: "RGAxXBNJxeY", title: "AC Current in Urdu Hindi || 12th Class Physics - Chapter 16", channel: "The Base Academy" },
      { id: "iacBZGHyJ2s", title: "A.C current chapter 16 in urdu hindi|| 12th class physics", channel: "Physics ka ilm" },
      { id: "mj_-I-iJr78", title: "FSC Physics book 2, Ch 16 - Alternating Current - 12th Class Physics", channel: "ilmkidunya" },
      { id: "2MqX6V7WxD0", title: "AC THROUGH INDUCTOR in Urdu #2nd year # FSc Physics # Ch. 16 Alternating Current", channel: "Physics World" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Physics of Solids",
    videos: [
      { id: "4B83Nhjm1EI", title: "Classification of Solids in Urdu Hindi || 12th Class Physics - Chapter 17", channel: "The Base Academy" },
      { id: "0j7IXbD5MVg", title: "mechanical properties of solids(ch-17)properties of solids...2nd year Physics (urdu/hindi).", channel: "Atia Naeem" },
      { id: "BLbRiqf5JXI", title: "2nd Year Physics - Chapter 17 – Physics of Solids", channel: "PHYSICS with Yasir Hanif" },
      { id: "Y3CyHwSaUVc", title: "Fast revision of Chapter 17 | physics of solids | 12th class physics | physics ka safar", channel: "Physics ka Safar" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Electronics",
    videos: [
      { id: "IVeOf0qjhZ0", title: "Transistor as an Amplifier in Urdu Hindi || 12th Class Physics - Chapter 18", channel: "The Base Academy" },
      { id: "k62HKNYuLCY", title: "Logic Gates in Urdu Hindi || 12th Class Physics - Chapter 18", channel: "The Base Academy" },
      { id: "TWXD20SBhVw", title: "P- N Junction || 2nd Year Physics - Chapter # 18 || 12th Class Physics", channel: "The Base Academy" },
      { id: "HwEz1D2_7d8", title: "PGC || 2nd Year || PHYSICS || Chp 18 || LECTURE # INTRO TO ELECTRONICS", channel: "QUICK LEARNERS (PGC)" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Dawn of Modern Physics",
    videos: [
      { id: "lCnknH1XrX8", title: "Black Body Radiations in Urdu Hindi || 12th Class Physics-Chapter #19 || 2nd year Physics", channel: "The Base Academy" },
      { id: "F7qcH1eEJRs", title: "PGC Lectures-Inter Part II-Punjab Board-Physics-Chapter 19 - Relative Motion, Frame of Reference", channel: "Punjab Group Of Colleges" },
      { id: "IymRv3fE-7g", title: "Dawn of modern physics 2nd year | Introduction | chapter 19 | class 12", channel: "Frank Physics" },
      { id: "KfZHORKmdm0", title: "12th physics chapter 19 Dawn of modern Physics", channel: "Brain Science Academy" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Atomic Spectra",
    videos: [
      { id: "JuwWz8H8TTg", title: "Atomic Spectra Lecture in Urdu FSC Physics Chapter 20 Atomic Spectra |12th class physics| Lec 1", channel: "Usman Mustafvi" },
      { id: "hBwqVy_za_U", title: "FSc Physics Book 2, Ch 20 - Atomic Spectra Spectrum - 12th Class Physics", channel: "ilmkidunya" },
      { id: "7Ai2iA5ODo0", title: "2nd Year Physics - Chapter 20 – Atomic Spectra", channel: "PHYSICS with Yasir Hanif" },
      { id: "XGNhnduSosY", title: "Atomic spectra | atomic spectrum of hydrogen | class 12 physics | physics ka safar", channel: "Physics ka Safar" },
    ],
  },
  {
    classLevel: "12th",
    subject: "physics",
    topic: "Nuclear Physics",
    videos: [
      { id: "Dg8HkHEdqew", title: "Introduction to Nuclear Physics || Properties of Nucleus || 12th Class Physics-Chapter 21", channel: "The Base Academy" },
      { id: "ziWJf9hKsig", title: "FSC Physics Book 2 Chapter 21 Topic 21 1 ATOMIC NUCLEUS  in Urdu   YouTube", channel: "Digital Imamia" },
      { id: "NByWE51308w", title: "2nd Year Physics - Chapter 21 – Nuclear Physics", channel: "PHYSICS with Yasir Hanif" },
      { id: "P-wnQiYYm24", title: "Atomic Nucleus , Isotopes , Mass Spectrograph | 2nd Year Physics Chapter 21 Nuclear Physics", channel: "Junaid Awais Bhatti" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Basic Concepts",
    videos: [
      { id: "lTM226Kybng", title: "1st year chemistry chapter 1 | lecture 3 | in urdu | in hindi", channel: "Kamran Chaudhary" },
      { id: "6FW_jvO_cbY", title: "11th Class Chemistry Chapter 1 - Determination of Relative Atomic Mass - 1st Year Chemistry Chapt...", channel: "ilmkidunya" },
      { id: "3cp5kI_LcHU", title: "11th Class Chemistry Chapter 1 - Concept of Mole - FSc Part 1 Chemistry Chapter 1", channel: "ilmkidunya" },
      { id: "pMoabHXnNbc", title: "FSc Chemistry book 1, ch 1, Concept of Atom - 1st year Chemistry", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Experimental Techniques in Chemistry",
    videos: [
      { id: "fu2QiD3geOQ", title: "|Sublimation Process||F.Sc 1st Year Chemistry||Chapter:2-Experimental Techniques|Urdu,English,Hindi|", channel: "BC Channel" },
      { id: "VQbaVGOmsZc", title: "Experimental Techniques in chemistry full chapter 02 in urdu/hindi", channel: "Qasim Mahi Official" },
      { id: "XMZjzttVIXM", title: "Chapter 2 Experimental Techniques | Introduction | Class 11-1st year | Punjab | Chemistry", channel: "Teach with Heart" },
      { id: "HijiphxcbAo", title: "Analytical Chemistry[1st Year Chemistry]{2nd Chapter-Experimental Techniques in Chemistry}", channel: "BC Channel" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Gases",
    videos: [
      { id: "x25pdefNcUw", title: "11th Class Chemistry Chapter 3 - Gas Laws - 1st Year Chemistry Chapter 3", channel: "ilmkidunya" },
      { id: "BWDZpfovgSM", title: "Boyle's Law-Chapter 3-Gases-Topic 1-Fsc 1st Year in Urdu/Hindi", channel: "VoiceOfAdnan" },
      { id: "Md4IOMdzXRg", title: "11th Class Chemistry Chapter 3 - States of Matter - 1st Year Chemistry Chapter 3", channel: "ilmkidunya" },
      { id: "TlLoIsF_joI", title: "1st Year Chemistry Chapter 3 -Class 11 Chemistry Chapter 3 Explanation Gas Laws Kinetic Theory Gases", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Liquids and Solids",
    videos: [
      { id: "Qa7ntRbPCr4", title: "1st year chemistry II Chapter #4 ll Liquid & Solids II Chapter 4 important MCQs & SQs ll Urdu/Hindi\"", channel: "EASY CHEMISTRY BY MUHAMMAD RIZWAN" },
      { id: "25zVc7xBZfM", title: "Fsc part I Chemistry  || Chapter# 4 Liquids & Solids || Liquid Crystal's / Urdu Hindi", channel: "Khawaja Fareed Lectures" },
      { id: "NpFLCuvhKQc", title: "Chemistry Class 11 | Punjab Board | Ch 4 | Liquids and Solids | Summary | in urdu | tutoria.pk", channel: "tutoriadotpk" },
      { id: "fsEd2ZBOp3o", title: "11th Class Chemistry Chapter 4 - Solids - FSc Part 1 Chemistry Chapter 4", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Atomic Structure",
    videos: [
      { id: "wMdWDJEIbGI", title: "11th Class Chemistry, ch 5 - Quantum Numbers - FSc Chemistry Book 1", channel: "ilmkidunya" },
      { id: "saTIzbNRInA", title: "11th Class Chemistry, ch 5 - Electronic Distribution - FSc Chemistry Book 1", channel: "ilmkidunya" },
      { id: "zVvL0yz1wHE", title: "11 Class Chemistry Chapter 3  - Derivation of Absolute Zero -1st Year Chemistry Chapter 3", channel: "ilmkidunya" },
      { id: "Bv5vVYfBwu8", title: "1st Year Chemistry Chapter 3 - Class 11 Chemistry Chapter 3 Kinetic Molecular Theory Of Gases", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Chemical Bonding",
    videos: [
      { id: "pa-RjGTY0iQ", title: "FSc Chemistry Book 1, ch 6 - Introduction Chemical Bonding - 11th Class Chemistry", channel: "ilmkidunya" },
      { id: "KucuC7FZ7xo", title: "11th Class Chemistry, Ch 6 - Molecular Orbital Theory - FSc Chemistry Book 1", channel: "ilmkidunya" },
      { id: "1de8kG-sYKI", title: "FSc Chemistry Book 1, Ch 6 - Define Effect of Bonding - 11th Class Chemistry", channel: "ilmkidunya" },
      { id: "uDRso14808I", title: "1st Year Chemistry|ch # 6| Lecture # 1| Chemical Bonding| Types of Bonds| Prof. Saleem Nasir|", channel: "Education Studio" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Thermochemistry",
    videos: [
      { id: "vsol5VI1zi8", title: "Internal Energy | Chapter 7 Thermochemistry | 1st year Chemistry | Lecture 93 | Sir Ramzan Ajmal", channel: "Alizium Activities" },
      { id: "hPG5gyrWOMU", title: "1st law of Thermodynamics | Chapter 7 Thermochemistry | 1st year Chemistry | Lecture 94| Sir Ramzan", channel: "Alizium Activities" },
      { id: "agyca5Vu-nI", title: "Thermochemistry | Chapter 7 |1st year Chemistry | Lecture 91 | Sir Ramzan Ajmal", channel: "Alizium Activities" },
      { id: "flcyHpUQpEI", title: "Ch 7 Lec 3 System Surrounding and State Function FSc Chemistry Part 1 Chap 7 Thermochemistry in Urdu", channel: "Chemistry with Sir Ibtihaj" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Chemical Equilibrium",
    videos: [
      { id: "oE3sEZixvXQ", title: "11th Class Chemistry Chapter 8 | Industrial Applications of Chemical Equilibrium | New Book 2025", channel: "ilmkidunya" },
      { id: "NOat5EYSJt4", title: "FSC Chemistry book 1, ch 8 - State of Chemical Equilibrium - 11th Class Chemistry", channel: "ilmkidunya" },
      { id: "pHVF97JyzRw", title: "11th Class Chemistry Chapter 8 | Reversible Reactions, Microscopic Events and Dynamic Equilibrium", channel: "ilmkidunya" },
      { id: "myzUAz7esdk", title: "11th Class Chemistry Chapter 8 | Equilibrium Constant and Position of Equilibrium | New Book 2025", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Solutions",
    videos: [
      { id: "SSXSiF1vSLs", title: "FSC Chemistry book 1, ch 9 - Solution of Liquids in Liquids (Part 1) - 11th Class Chemistry", channel: "ilmkidunya" },
      { id: "7663mFfHtY0", title: "11th Class Chemistry Chapter 9 | Buffer Solutions | Class 11th Chemistry New Book 2025", channel: "ilmkidunya" },
      { id: "meuLleYBhBw", title: "Buffer Solutions | Calculating The pH of Buffer | Lecture 6 | Chapter 9 | Fsc 1st Year Chemistry", channel: "Chemistry Lover" },
      { id: "7yE526xto7M", title: "FSC Chemistry book 1 ch 9,Concept of Solution-Chemistry ch 9-First year Chemistry", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Electrochemistry",
    videos: [
      { id: "SU4T54dkz2Y", title: "🚀 Electrochemistry | Complete Chapter in ONE SHOT | MDCAT Chemistry | Manzil Series | PMDC MDCAT", channel: "Physics Ka Manjan - Bilal Zia" },
      { id: "qupLdPe_ZGo", title: "MDCAT 2022 Chemistry Live Class Electrochemistry Lecture-1 #mdcat", channel: "Physics In Seconds - Ustaad Jee" },
      { id: "eMSacvR-Zk8", title: "Attitude is everything! | Learning Attitude In Classroom | Prof. Wajid Ali Kamboh", channel: "WAK Academy" },
    ],
  },
  {
    classLevel: "11th",
    subject: "chemistry",
    topic: "Reaction Kinetics",
    videos: [
      { id: "W_7sSb_qB04", title: "1st year chemistry Rate of Reaction ( Chemical Kinetics ) Explained in Hindi - Urdu by M.Tariq Khan", channel: "Tariq Pathan Science Academy" },
      { id: "6U7xGVyqbcs", title: "PGC Lectures-Inter Part 1-Punjab Board-Chemistry-Chapter 11- Lecture01-Reaction Kinetics", channel: "Punjab Group Of Colleges" },
      { id: "UV9OVF8pxAU", title: "Chemistry Class 11 | Punjab Board | Chapter 11 | Reactions Kinetic | Summary | in urdu | tutoria.pk", channel: "tutoriadotpk" },
      { id: "RPDJ9i2JbL4", title: "Reaction KINETICS CHAPTER 11  1st year Class", channel: "Chemistry Wala - HAMAD RAZA" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Periodic Classification of Elements",
    videos: [
      { id: "ThB8XHIXHKA", title: "2nd Year Chemistry, Ch 1, The Modern Periodic Table - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "8si7nnNw2sQ", title: "2nd Year Chemistry, Ch 1, The Modern Periodic Table Familes - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "NOGzBzOevrc", title: "FSc Chemistry Book 2 Ch 1 Periodic Classification Live Lectur - 2nd Year Chemistry Ch 1 Live Lecture", channel: "ilmkidunya" },
      { id: "45YKX0VGZEs", title: "FSc Chemistry Book 2, Ch 1 - Modern Periodic Table - 12th Class Chemistry", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "s-Block Elements",
    videos: [
      { id: "y7r1X3K-Ss4", title: "FSc Chemistry Book 2, Ch 2 - Introduction About S Block Elements - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "kXuxhKicMzc", title: "FSc Chemistry Book 2 Ch 2 S Block Elements - 12th Class Chemistry ch 2 Live Lecture", channel: "ilmkidunya" },
      { id: "lkCP3dsz3rQ", title: "Second Year Chemistry Chapter#2 S Block Elements Introduction||12th Class Chemistry S block Elements", channel: "AM Production HD" },
      { id: "CQsQOxNI9tQ", title: "Chemistry :Chapter 2 : s-Block elements : 2nd year", channel: "Beauty of Earth" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Group IIIA and IVA Elements",
    videos: [
      { id: "PJqbRiLKrKc", title: "Fsc Chemistry book 2, Ch 3 - Group Four Elements - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "NpSKvLtsAr8", title: "Fsc Chemistry book 2, Ch 3 - Group IIIA Elements & Occurrence - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "9pGbhvm0gNA", title: "PGC Lectures-Inter Part II-Punjab Board- Chemistry - Chapter 03 - Group IVA Elements", channel: "Punjab Group Of Colleges" },
      { id: "gp_Gu0Q8ePQ", title: "Chemistry Class 12 | Punjab Board | Ch 3 | Group III A and Group IV A Elements  | Summary | tutoria", channel: "tutoriadotpk" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Group VA and VIA Elements",
    videos: [
      { id: "vXDOexnYacI", title: "12th Class Chemistry Chapter 4 - Introduction Of Group VA Elements - 2nd Year Chemistry Chapter 4", channel: "ilmkidunya" },
      { id: "_d-Nbf3Pw9I", title: "12th Class Chemistry Chapter 4-General Features of Group VI A Elements- 2nd Year Chemistry Chapter 4", channel: "ilmkidunya" },
      { id: "Ao1NFm1Q-b8", title: "Chemistry Class 12 | Punjab Board | Ch 4 | Topic 4A | Group VI A Elements | in urdu | tutoria.pk", channel: "tutoriadotpk" },
      { id: "FIydxoG13BA", title: "PGC Lectures-Inter Part II-Punjab Board-Chemistry-Chapter 04- Characteristics of VA Group Elements", channel: "Punjab Group Of Colleges" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "The Halogens and Noble Gases",
    videos: [
      { id: "AJrcYDEarUE", title: "12th Class Chemistry Chapter 5 - Noble Gases - 2nd Year Chemistry Chapter 5", channel: "ilmkidunya" },
      { id: "s9i21YOY95o", title: "Halogens and Noble gases# Chapter 5#Lecture 1#chemistry 2nd year By Ghulam Mujtaba Shah", channel: "Ghulam Mujtaba Shah" },
      { id: "Wu0bUyAxIfQ", title: "Chemistry Class 12 | Punjab Board | Ch 5 | The Halogens and the Noble Gases | Summary | tutoria.pk", channel: "tutoriadotpk" },
      { id: "VDZv0vDCIo0", title: "Chemistry Class 12 | Punjab Board | Ch 5 | Topic 1 | Introduction to The Halogens & the Noble Gases", channel: "tutoriadotpk" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Transition Elements",
    videos: [
      { id: "Gu2y48OXWHk", title: "12th Class Chemistry Chapter 6 - Transition Elements - 2nd Year Chemistry Chapter 6", channel: "ilmkidunya" },
      { id: "5L_8twmSteU", title: "12th Class Chemistry Chapter 6 - Characteristics Transition Elements - 2nd Year Chemistry Chapter 6", channel: "ilmkidunya" },
      { id: "xB_vQuOClKA", title: "12th Class Chemistry Chapter 6 - characteristics Transition Elements 2- 2nd Year Chemistry Chapter 6", channel: "ilmkidunya" },
      { id: "12tCTyATXG4", title: "2nd year chemistry|chapter 6 Transition elements|potassium permanganate|preparation|properties", channel: "Scholar's academy" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Fundamental Principles of Organic Chemistry",
    videos: [
      { id: "_tYOQf77Das", title: "Features of Organic Compounds || Class 12 Ch 7 || 2nd year chemistry Urdu / hindi", channel: "Muhammad Kaleem Haider" },
      { id: "o43EbfRkguQ", title: "12th Class Chemistry Chapter 7 Fundamental Principles of Organic Chemistry", channel: "ilmkidunya" },
      { id: "cP7-UKIYdSQ", title: "Fundamental Principles of Organic Chemistry, FSc. Chemistry Book 2, Ch 7 - 2nd Year Chemistry", channel: "Chemistry Knowledge" },
      { id: "ZITc3DfA9m4", title: "Introduction of Organic Chemistry Fsc.II Chapter 7 Fundamental principles of Organic compounds. Urdu", channel: "chemistry123 Lovers" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Aliphatic Hydrocarbons",
    videos: [
      { id: "1fHMDJ5MW24", title: "Aliphatic Hydrocarbons | Chapter 8 | 2nd year Chemistry | In Hindi | In Urdu", channel: "CONCEPTO CHEMISTRY" },
      { id: "-JHUEBsZ8co", title: "Introduction of Aliphatic Hydrocarbons in Urdu Chapter 8 Class 12th/2nd Year", channel: "Alchemia Academy 417" },
      { id: "k8TvFIBgqFs", title: "Introduction of Aliphatic Hydrocarbons | Chapter 08 | F.Sc Chemistry Part-2 | Urdu/Hindi", channel: "RB Tutorials" },
      { id: "VEzvTtpF2W0", title: "Aliphatic hydrocarbons- nomenclature-part-1 Chemistry-2nd year", channel: "Information & Entertainment" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Aromatic Hydrocarbons",
    videos: [
      { id: "E31pOG5J2do", title: "Fsc Chemistry book 2, Ch 9 - Introduction to Aromatic Hydrocarbon - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "_CyIXjQk86Q", title: "PGC Lectures-Inter Part II-Punjab Board-Chemistry-Chapter 09- Aromatic Hydrocarbons", channel: "Punjab Group Of Colleges" },
      { id: "SaEPlp6lfnM", title: "Aromatic hydrocarbons and its Classification in Urdu Chapter 9 Class 12th/2nd year", channel: "Alchemia Academy 417" },
      { id: "s2PcW1tMS2s", title: "Fsc Chemistry book 2, Ch 9 - Nomenclature of Aromatic Hydrocarbons - 12th Class Chemistry", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Alkyl Halides",
    videos: [
      { id: "6i3kIJhrBuQ", title: "FSc Chemistry Book 2 Ch 10 Alkyl Halide - 12th Class Chemistry ch 10 Live lecture", channel: "ilmkidunya" },
      { id: "s79wqfMAR3s", title: "PGC Lectures-Inter Part II-Punjab Board-Chemistry-Chapter 10- Alkyl Halides & Their Nomenclature", channel: "Punjab Group Of Colleges" },
      { id: "kRar1xV65Kk", title: "Topic: Alkyl halide | Lecture # 57 | Chapter 10 | 2nd Year | Chemistry | Sir Ramzan", channel: "Alizium Activities" },
      { id: "VUKNuV0HKN8", title: "10.3: Preparation of Alkyl Halides; Lecture # 43, Chapter # 10, 2nd Year Chemistry", channel: "Prof. Ghulam Hussain Bhatti" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Alcohols, Phenols and Ethers",
    videos: [
      { id: "IKwcXqOYb-A", title: "2nd year Chemistry, Ch 11 - Introduction of Alcohols - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "7nL0aoZctYk", title: "2nd year Chemistry, Ch 11 - Industrial Preparation of Alcohols - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "1wyKMD8ME_M", title: "2nd year Chemistry, Ch 11 - Physical Properties and Reaction of Alcohol - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "jxie0gTyTKQ", title: "12th Class Chemistry Ch 11 Live Lecture - FSc Chemistry Book 2 Ch 11 Alcohols, Phenols, and Ethers", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Aldehydes and Ketones",
    videos: [
      { id: "gC478zLluK8", title: "2nd year Chemistry, Ch 12 - Addition of Alcohols- 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "-fWdfek_c0k", title: "2nd year Chemistry, Ch 12 - Reduction Reaction - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "b-m98XV8r_c", title: "Fsc chemistry book 2, ch 12, lec 1, introduction of Aldehydes and ketones by M. Usman in urdu/hindi", channel: "AQua Regia Chemist" },
      { id: "C08l23TFMEM", title: "FSc Chemistry Book 2 Ch 12 Live Lecture - 12th Class Chemistry ch 12 Live Lecture", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Carboxylic Acids",
    videos: [
      { id: "e3_RALuVKv0", title: "2nd year Chemistry, Ch 13 - Introduction to Carboxylic Acids - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "3pxRNDS_btk", title: "2nd year Chemistry, Ch 13 - Preparation of Carboxylic Acid - 12th Class Chemistry", channel: "ilmkidunya" },
      { id: "AJWUjg_-8fQ", title: "Chemistry Class 12 | Punjab Board | Ch 13 | Carboxylic Acids | Summary | in Urdu | tutoria.pk", channel: "tutoriadotpk" },
      { id: "MafuwLDlAXg", title: "Lecture 1: Chapter 13: Carboxylic Acids FSc. 2nd Year", channel: "Chemistry OpenCourseWare" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Macromolecules",
    videos: [
      { id: "n59oJdCwmno", title: "Chemistry Class 12 | Punjab Board | Ch 14 | Macromolecules | Summary | in urdu | tutoria.pk", channel: "tutoriadotpk" },
      { id: "3Vi7jDS83VU", title: "PGC Lectures-Inter Part II-Punjab Board-Chemistry-Chapter 14- Macromolecules And Polymers", channel: "Punjab Group Of Colleges" },
      { id: "n4TlxiOTjAU", title: "2nd Year Chemistry, Chapter 14: Macromolecules, Polymers and Classification of Polymers | Lecture 1", channel: "Learn Chemistry with Waqas" },
      { id: "2WZHNptMkhk", title: "2nd Year Chemistry Chapter 14| Macromolecules| Polymers| 12th Chemistry Chapter 14| Lec 1", channel: "Chemistry With M Abdullah Shahid" },
    ],
  },
  {
    classLevel: "12th",
    subject: "chemistry",
    topic: "Environmental Chemistry",
    videos: [
      { id: "4ewX88ICJQA", title: "FSc Chemistry Book 2 Ch 16 Live Lecture - 2nd year Chemistry ch 16 Environmental Chemistry", channel: "ilmkidunya" },
      { id: "hCuyg2xNyXA", title: "PGC Lectures-Inter Part II-Punjab Board-Chemistry-Chapter 16 - Components of The Environments", channel: "Punjab Group Of Colleges" },
      { id: "nakjXmGhwXg", title: "ECAT Chemistry - Ch 16 Environmental Chemistry Lecture Series - ECAT Chemistry", channel: "Guess Ki Dunya" },
      { id: "NLM36_JS4eQ", title: "Environmental Chemistry chapter 16 second year Chemistry part two | complete chapter one video", channel: "Muhammad Abdullah zia" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Number Systems",
    videos: [
      { id: "yXms-MHSy9E", title: "Exercise 1.1 - 11th Class Math | Waqas Nasir", channel: "Waqas Nasir" },
      { id: "nYi88V2h-uU", title: "Exercise 1.1 - 11th Class Math | Waqas Nasir", channel: "Waqas Nasir" },
      { id: "HuYfUYC3WKU", title: "Intro to Numbers || Lecture 1 || First Year || Urdu || Hindi || Prof. Waqas Mahmood || #Mathematics", channel: "Lectures Hub" },
      { id: "opk1dWS2JDY", title: "Exercise 1.2 - 11th Class Math | Waqas Nasir", channel: "Waqas Nasir" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Sets, Functions and Groups",
    videos: [
      { id: "EuFjmdTwnBg", title: "11th Class Maths,Ch.2 Lecture 10 Set, Functions, Groups (Introduction to Sets), 1st year Maths", channel: "ilmkidunya" },
      { id: "w_5qo0lGKDk", title: "What are Sets ? | Set Theory - All Basic", channel: "Waqas Nasir" },
      { id: "-JAwiaJek70", title: "Function | Discrete Mathematics", channel: "Waqas Nasir" },
      { id: "yGGJiJORtis", title: "11 Maths/Chapter 2/Lecture 1/Sets,Functions & Groups/FBISE", channel: "Maths with Adnan Abbasi" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Matrices and Determinants",
    videos: [
      { id: "cX9ntW3gz-A", title: "11Th Class Math Chapter 3 Matrices And Determinants || Exercise 3.1", channel: "Sir Shahzad Sair" },
      { id: "0Qw4frbrEAs", title: "Ch#3 Matrices and Determinants | Definitions | Fsc Part 1 (Lecture no. 1)", channel: "Maths by Prof. Iqbal Haider Bhatti" },
      { id: "3l0BZSMwSlQ", title: "Types Of Matrix - Waqas Nasir", channel: "Waqas Nasir" },
      { id: "RwivfbZsbKc", title: "F.Sc Math || Chapter #3 || Introduction to Matrices + Order of Matrices || Lecture No1", channel: "Math with Rana Ali" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Quadratic Equations",
    videos: [
      { id: "DNoAT-BItx8", title: "11Th Class Math New Book 2025 PCTB || Chapter 4 Exercise 4.1 || Matrices And Determinants", channel: "Sir Shahzad Sair" },
      { id: "PjQnnJ4VuDo", title: "11th Class Math || 1st Year Math New Book Exercise 4.1 - exercise 4.1 complete", channel: "Knowledge Zone" },
      { id: "HLA3agMqndM", title: "Formation of a Quadratic Equation", channel: "Waqas Nasir" },
      { id: "Kvq3gL91VL8", title: "Exercise 4.1 - 10th Class Math New Book Ex 4.1 Complete - exercise 4.1 class 10", channel: "Knowledge Zone" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Partial Fractions",
    videos: [
      { id: "L9SKb9TwN3c", title: "FSc Math Part 1 Chapter 5 | Basic Concepts of Partial Fraction | 11th Class Math Chapter 5 |", channel: "ilmkidunya" },
      { id: "mRQf1NZ0ID0", title: "Chap #5|PARTIAL FRACTION DEFINATIONS|11th Class BISE Maths Lec 1 PTB NEW BOOK", channel: "Maths by Prof. Iqbal Haider Bhatti" },
      { id: "V8t5hlRi_OQ", title: "Partial Fraction Decomposition - Proper Fraction & Improper Fraction", channel: "Waqas Nasir" },
      { id: "2EzUNdvotJ0", title: "1st Year Math | Chapter 5: Partial Fractions | Lecture 1: Introduction & Basics", channel: "SOLVER" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Sequences and Series",
    videos: [
      { id: "lwAR5jQRMjw", title: "11th Class Math , ch 6,Sequences & Series,Exercise 6.2 | Part 1 | Urdu\\Hindi", channel: "Online Solutions Academy" },
      { id: "Gc7PEKqpIT8", title: "1st Year Maths Chapter 6: Sequences & Series | Live Lecture for ICS & FSc | Prof. Waqas Zafar", channel: "Professor Syed Asad Ali" },
      { id: "_nQxZ3l1MMI", title: "Exercise 6.1 Chapter 6 || 11Th Class Math New Book 2025 PCTB || Sequences And Series", channel: "Sir Shahzad Sair" },
      { id: "EX857r8Gff0", title: "1st Year Maths ||  Chap # 6 || Sequences and Series", channel: "Math with Rana Ali" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Permutation, Combination and Probability",
    videos: [
      { id: "Kd0G4c7NOuI", title: "11th class math - Exercise 7.1 - New Book - class 11 maths exercise 7.1 - 11th math chapter 7 ex-7.1", channel: "Usman Shani" },
      { id: "zmLfn1eKH6k", title: "Exercise 7.1 Chapter 7 || 11Th Class Math New Book 2025 PCTB || Permutations And Combinations", channel: "Sir Shahzad Sair" },
      { id: "g7mNLlCxwUM", title: "ECAT Mathematics Ch 7 Permutation, Combination, and Probability Online Video Lecture ECAT Mathema...", channel: "Guess Ki Dunya" },
      { id: "tTkz1Qlgy44", title: "Ch#7 PERMUTATION COMBINATION and probability CONCEPT of Factorial and EX#7.1 Complete", channel: "Learn Math With Prof Usman" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Mathematical Induction and Binomial Theorem",
    videos: [
      { id: "5CrzN3Ssbwc", title: "Lec_8.1-01 1st year mathematics Ch 8 Principle of mathematical Induction (Urdu/Hindi)", channel: "MathLogic" },
      { id: "olLoiTmdcCQ", title: "Chap #8|MATHEMATICAL INDUCTION & BINOMIAL THEOREM INTRODUCTION|11th Class Maths Lec 1 PTB NEW BOOK", channel: "Maths by Prof. Iqbal Haider Bhatti" },
      { id: "r4LtrA_J6iw", title: "Chap #8 |Mathematical Induction| Exercise 8.1 Question 1 |F.Sc Part-1 Lec 1 in Urdu / Hindi", channel: "Maths by Prof. Iqbal Haider Bhatti" },
      { id: "dzLhB94cwtc", title: "11th Class Math || Ch 8 Mathematical Induction & Binomial Theorem || Proof Binomial Theorem", channel: "Great Science Academy" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Fundamentals of Trigonometry",
    videos: [
      { id: "3j6ClDPg9QU", title: "Math 1st year chapter 9 fundamentals of trigonometry Exercise 9.1", channel: "Waqas arshad" },
      { id: "pjyLbzFvBYw", title: "1st Year Maths || Fundamentals of Trigonometry  || Lecture No 2", channel: "Math with Rana Ali" },
      { id: "lk5wgQ2g3aQ", title: "Class 11 Maths Chapter 9 || Exercise 9.1 || Fundamentals Of Trigonometry", channel: "Sir Shahzad Sair" },
      { id: "MIgTjXLp7-A", title: "FSC | ICS  | F.A Math book 1 ch 9,Lec 1,Exercise 9.1  Math Chapter 9 Fundamentals of Trigonometry", channel: "mathkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "math",
    topic: "Trigonometric Identities",
    videos: [
      { id: "M2Q6zF4Bm9Y", title: "1st Year Math New Syllabus 2026 | Chapter 10 Trigonometric Identities | Full Lecture Urdu/Hindi", channel: "Maths by Dr. Naveel" },
      { id: "zQR8fzE2ITI", title: "Chap #10|TRIGONOMETRIC IDENTITIES Exercise 10.1 complete|11th Class BISE Maths Lec 1 PTB NEW BOOK", channel: "Maths by Prof. Iqbal Haider Bhatti" },
      { id: "ZqUyvJfzNyE", title: "1st Year Maths || Trigonometric Identities|| Lecture # 01", channel: "Math with Rana Ali" },
      { id: "hIyDZjfka2I", title: "Math 1st year chapter 10 Trigonometric identities exercise 10.1", channel: "Waqas arshad" },
    ],
  },
  {
    classLevel: "12th",
    subject: "math",
    topic: "Functions and Limits",
    videos: [
      { id: "R4kIaX9r1VQ", title: "Exercise 1.1 - 12th Class Math | Waqas Nasir", channel: "Waqas Nasir" },
      { id: "CYDZhVqxR5o", title: "2nd Year Math Chapter 1 - Class 12 Maths Chapter 1 Function and its Domain - 12 Class Math Chapter 1", channel: "ilmkidunya" },
      { id: "9XXJOnQ6oSI", title: "FSc Part 2 Math Chapter 1 | Introduction to Functions and Limits | 2nd Year Math Chapter 1 | Lect...", channel: "The Grade Academy" },
      { id: "-JAwiaJek70", title: "Function | Discrete Mathematics", channel: "Waqas Nasir" },
    ],
  },
  {
    classLevel: "12th",
    subject: "math",
    topic: "Differentiation",
    videos: [
      { id: "lw1HhKDodA4", title: "12th class Math Exercise 2.1 || 2nd year math new book Exercise 2.1 | Unit 2 Further Differentiation", channel: "Usman Shani" },
      { id: "dEMlShTbUV0", title: "12th Class Math || 2nd Year Math New Book Exercise 2.1 - exercise 2.1 class 12 maths", channel: "Knowledge Zone" },
      { id: "LO2eul_lBM8", title: "Chap # 2|FURTHER DIFFERENTIATION | FORMULAS OF DIFFERENTIATION |12th Class Maths Lec 1 PTB NEW BOOK", channel: "Maths by Prof. Iqbal Haider Bhatti" },
      { id: "gqNBTl1Mizc", title: "2nd Year Math New Book | Lecture 1 |Chapter 2 |Introduction | Further Differentiation", channel: "EduCast33" },
    ],
  },
  {
    classLevel: "12th",
    subject: "math",
    topic: "Integration",
    videos: [
      { id: "lidOfS3jMAQ", title: "12th Class Math Chapter 3 - 12th Maths Ch 3 Introduction to Integration - 2nd Year Math Chapter 3", channel: "ilmkidunya" },
      { id: "XHsrXUipDV8", title: "Integration| Chapter#3|Ex 3.3 Q #1-8|2nd year Mathematics| Smart Syllabus| Urdu/Hindi", channel: "House of Mathematics" },
      { id: "URdwpiqbswQ", title: "Integration |Chapter#3|Ex 3.7 Complete|2nd year mathematics | smart syllabus |Urdu/Hindi", channel: "House of Mathematics" },
      { id: "DFUf7z7oIzM", title: "2nd Year Mathematics Chapter 3|| Introduction of Integration || Rules of Integration   by Sir Zaheer", channel: "Informatics" },
    ],
  },
  {
    classLevel: "12th",
    subject: "math",
    topic: "Introduction to Analytic Geometry",
    videos: [
      { id: "GLrzmdfQafs", title: "2nd Year Maths || Chap # 4 || Analytical geometry || Lecture # 01", channel: "Math with Rana Ali" },
      { id: "aopVPYr9Cvs", title: "FSC Math Part 2 Chapter 4 || Exercise 4.1 Introduction To Analytic Geometry || 12Th Class Math", channel: "Sir Shahzad Sair" },
      { id: "-GOAcg6ELDs", title: "Chap # 4| Analytical Geometry | Exercise 4.1 Question 1 to 4| F.Sc Part-2 Math| Lec 3", channel: "Maths by Prof. Iqbal Haider Bhatti" },
      { id: "nZ6HpPGNTh4", title: "Introduction to Analytic Geometry [Second Year XII ] Exercise 4 .1 Q # 1 (All Parts)😷", channel: "Muhammad Atif Firdous" },
    ],
  },
  {
    classLevel: "12th",
    subject: "math",
    topic: "Linear Inequalities and Linear Programming",
    videos: [
      { id: "ChuvNJrbsyE", title: "FSC Math Part 2 Chapter 5 || Exercise 5.1 Linear Inequalities Linear Programming| || 12Th Class Math", channel: "Sir Shahzad Sair" },
      { id: "2PXvMB5mwHA", title: "Introduction to Linear Inequality || Chapter # 5 - Lec# 1 || 2nd Year Mathematics", channel: "The Base Academy" },
      { id: "hI5hbb4NpAw", title: "12 Maths/Chapter 5/Lecture 1/Linear Inequalities and Linear Programming/FBISE", channel: "Maths with Adnan Abbasi" },
      { id: "GrDsdg_hrUs", title: "2nd Year Math | Chapter 5: Linear Inequalities & Linear Programming | Lecture 1: Introduction", channel: "SOLVER" },
    ],
  },
  {
    classLevel: "12th",
    subject: "math",
    topic: "Conic Sections",
    videos: [
      { id: "-JVVdVdDu0s", title: "2nd Year Maths || Chapter # 6 || Conic Section || Lecture # 1", channel: "Math with Rana Ali" },
      { id: "xfLWvR4cA_Q", title: "FSC Math Part 2 Chapter 6 || Exercise 6.1 Conic Section || 12Th Class Math", channel: "Sir Shahzad Sair" },
      { id: "dnJ5fEFgFbc", title: "FSC Math Part 2 Chapter 4 || Exercise 4.3 Introduction To Analytic Geometry || 12Th Class Math", channel: "Sir Shahzad Sair" },
      { id: "OUJ5rcuEM1c", title: "FSC Math Part 2 Chapter 7 || Exercise 7.1 Vectors || 12Th Class Math", channel: "Sir Shahzad Sair" },
    ],
  },
  {
    classLevel: "12th",
    subject: "math",
    topic: "Vectors",
    videos: [
      { id: "XWlJfUqDH10", title: "FSc Maths Book 2 Ch 7 Live Lecture - 2nd Year Maths Ch 7 Vector Live lecture", channel: "ilmkidunya" },
      { id: "psabZ28xJDA", title: "F.Sc Math Part 2 | Chapter 7 Vectors | Urdu | Hindi | Math's Core", channel: "Math's Core" },
      { id: "nZ_fKQBMdzE", title: "Introduction to Vectors and its types || Lec# 1-Chapter # 7 || 2nd Year Mathematics", channel: "The Base Academy" },
      { id: "7JQS2ukFXoM", title: "Exercise # 7.1 || Lec# 5-Chapter # 7 || 2nd Year Mathematics", channel: "The Base Academy" },
    ],
  },
  {
    classLevel: "11th",
    subject: "cs",
    topic: "Basics of Information Technology",
    videos: [
      { id: "BvV1UwWS6S4", title: "Information Technology and Modern scenario | 1st Year Computer Science in Urdu | Chapter 1 Lecture 1", channel: "Punjab Educators" },
      { id: "PvhTu0cY_OE", title: "Information Technology| 1st year Computer Science chapter-1 in Urdu| Safaretalim", channel: "Safaretalim" },
      { id: "8iejbAlfcsA", title: "ICS Computer part 1- Ch 1- Information Technology - ICS/FSC Part 1", channel: "ilmkidunya" },
      { id: "aZX9n3KSCCA", title: "ICS Computer part 1, Hardware and Software - Ch 1 Basics of Information Technology - ICS/FSC Part 1", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "cs",
    topic: "Information Networks",
    videos: [
      { id: "KfUTNU3HTP4", title: "Chapter 2 - Information Networks  Part-1, 1st year, Computer Science.#information #Network", channel: "Dash Campus" },
      { id: "26hUJIU5g_U", title: "Chapter 2 - Information Networks  Part-1, 1st year, Computer Science. #LAN #WAN #COMMUNICATIN", channel: "Dash Campus" },
      { id: "k7ZM1EtkXt0", title: "Chapter2 - Information Networks Part-1, 1st year, Computer Science #information #Network #Workgroup", channel: "Dash Campus" },
      { id: "wOuyghLlSyo", title: "Chapter 2 - Information Networks  Part-1, 1st year, Computer Science.#information #Network", channel: "Dash Campus" },
    ],
  },
  {
    classLevel: "11th",
    subject: "cs",
    topic: "Data Communication",
    videos: [
      { id: "N51P76lztp0", title: "Data communication synopsis| ICS 1st year Computer lectures Chapter 3 Data communication in Urdu", channel: "MultiPedia" },
      { id: "mLdJAbaaHnE", title: "Chapter3 Data Communication Part-1, 1st year, Computer Science Part-1, 1st year, Computer Science", channel: "Dash Campus" },
      { id: "6HK9m9XF3vM", title: "Computer Science|1st year|Chapter#3|Data Communication|Types of data|Ms. Shiza Hasan", channel: "Shiza Hasan" },
      { id: "H2xaXXuSi30", title: "Computer Science|1st year|Chapter#3|Data Communication|Data Communication Components|Ms. Shiza Hasan", channel: "Shiza Hasan" },
    ],
  },
  {
    classLevel: "11th",
    subject: "cs",
    topic: "Applications and Uses of Computers",
    videos: [
      { id: "bZRfqQn3oJM", title: "Applications and uses of computer class 11 || 11th computer ch 4 lec 1 || urdu / hindi", channel: "Muhammad Kaleem Haider" },
      { id: "La59zff3akA", title: "Uses of Computer | Chp-04:Applications And Uses Of Computers | Computer Science Class 11 Sindh Board", channel: "Vtuitions" },
      { id: "XifejSskIuE", title: "How Computer are Used | Chp-04: Applications And Uses Of Computers | Computer Science XI Sindh Board", channel: "Vtuitions" },
      { id: "sSoCKBtOsXY", title: "FSc Computer Science Book 1, CH 4, LEC 72:Uses Of Computer In Different Fields", channel: "Maktab. pk" },
    ],
  },
  {
    classLevel: "11th",
    subject: "cs",
    topic: "Computer Architecture",
    videos: [
      { id: "8AyNDCNDym0", title: "Computer system Architecture || Lecture Number 14 || Chapter no# 5 | Com sci 1st year| Urdu lecture", channel: "gorsel mix" },
      { id: "fRR6enhNlZg", title: "Computer Architecture Synopsis| Chapter 5 ICS computer overview|ICS part 1 computer lectures in Urdu", channel: "MultiPedia" },
      { id: "3_JRD5iiNEA", title: "Ics part 1 Chapter 5 Computer Architecture and Van Neumann Design", channel: "Geo Urdu By Suffi Gee" },
      { id: "vnSkN_NqfFc", title: "ICS Computer Part 1 | Ch 5 Computer Architecture | Lecture No. 1 CPU and its Units | Prof Rashad", channel: "Learn with Qamar" },
    ],
  },
  {
    classLevel: "11th",
    subject: "cs",
    topic: "Security, Copyright and the Law",
    videos: [
      { id: "27z0PcTq51w", title: "ICS Computer part 1, Ch 6 - Causes of Virus - 11th Class Computer", channel: "ilmkidunya" },
      { id: "MmZDCnOze1c", title: "1st Year Computer Science Chapter 6  Data Security  Copyright and Law Computer Virus", channel: "SK Tax Consultantancy" },
      { id: "x8blpoZg3Mw", title: "1st Year Computer-Ch. 06-Virus-Antivirus Program-Password-Copyright Act", channel: "IQRA Centre" },
      { id: "ox5L724l4LM", title: "Computer Viruses And its Types | Security, Copyright And The Law | Computer Science XI Sindh Board", channel: "Vtuitions" },
    ],
  },
  {
    classLevel: "11th",
    subject: "cs",
    topic: "Operating Systems",
    videos: [
      { id: "svAXZkcUotk", title: "ICS Computer part 1,Ch 7,Objects of Windows Operating System -ICS/FSC Part 1- 11th Class", channel: "ilmkidunya" },
      { id: "mLN0YN2Q1mM", title: "ICS Computer part 1, Ch 7 - Starting to Use Windows Operating System - 11th Class Computer", channel: "ilmkidunya" },
      { id: "c81dnGlzXIg", title: "computer science 1st year lec#23 ch#7 topic operating system", channel: "CISC Talagang" },
      { id: "_tgPOC3vzJk", title: "Computer 1st Year CH # 7 Operating System & Different Types of OS", channel: "The Guardian College" },
    ],
  },
  {
    classLevel: "11th",
    subject: "cs",
    topic: "Word Processing",
    videos: [
      { id: "5ZX-ZHLSuD0", title: "Chapter 8 | 1st Year Class | Computer Science | Word Processing | Word Processor vs. Typewriter", channel: "Ustaadify" },
      { id: "Q44EA30rirM", title: "FSc Computer Science Book 1, CH 8, LEC 116: Creating Document In Word Processor", channel: "Maktab. pk" },
      { id: "She1XHI_AzU", title: "FSc Computer Science Book 1, CH 8, LEC 112:  Word Processing ( Overview  )", channel: "Maktab. pk" },
      { id: "2MCmnr2L50o", title: "Microsoft Word for Beginners - The Complete Course", channel: "Technology for Teachers and Students" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Data Basics and Database Concepts",
    videos: [
      { id: "fRSIdS8C4II", title: "ICS Computer Part 2, Ch 1 - Overview About Data Basics - Inter Part 2 Computer", channel: "ilmkidunya" },
      { id: "_TFLDR1UIoc", title: "ICS Computer Part 2, Ch 1 - Data Bases - Inter Part 2 Computer", channel: "ilmkidunya" },
      { id: "qyVNrR7wEe8", title: "Basics of Database  Lecture # 6 | Database lectures ICS part 2 computer |2nd year lecture in Urdu", channel: "MultiPedia" },
      { id: "dmMLqMOM7F8", title: "Database and its Types| Database basics| Database chapter 1 ICS computer 2nd year lectures", channel: "MultiPedia" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Data Integrity and Normalisation",
    videos: [
      { id: "MWQzfi0BLtQ", title: "ICS Computer Part 2- Ch 4 - Data Integrity and Normalization Overview - Inter Part 2 Computer", channel: "ilmkidunya" },
      { id: "zhCCUqjp7TU", title: "ICS Computer Part 2- Ch 4 - Data Integrity and Normalization Exercise - Inter Part 2 Computer", channel: "ilmkidunya" },
      { id: "yoUt1EfWAQc", title: "chapter 4 Data Integrity and Normalization | Computer Lecture in Urdu | FSc part 2 | GCW", channel: "Dr. Raabia Mumtaz" },
      { id: "J1V7EoyHJpA", title: "ICS 2nd year Chapter # 4 - Data Integrity & Normalization --- Lecture # 1", channel: "IN_A_NEW_PERSPECTIVE" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Introduction to Database Management Systems",
    videos: [
      { id: "5RQCTFUC6ZE", title: "ICS Part 2 Chapter 3 Database Design Process Data Modeling & Ingredients in Hindi/Urdu", channel: "Shahzaib Naz" },
      { id: "UFkxFOvko94", title: "ICS Computer Part 2- Ch 3 - Database Design - Inter Part 2 Computer", channel: "ilmkidunya" },
      { id: "6rM60QD7eyI", title: "ICS Computer Part 2- Ch 3 - Data Base Design Process Overview - Inter Part 2 Computer", channel: "ilmkidunya" },
      { id: "Awk6MzO04qE", title: "Introduction to Databases in Urdu|Ch#3 Lec.1|ICS/FSc.part2 #database#analysis step #ERD#datamodeling", channel: "Dr. Yousra Asim" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Microsoft Access and Query Design",
    videos: [
      { id: "5r-YKwBAQAc", title: "component of Database MS Access| Database basics in Urdu/Hindi| Database computer 2nd year lectures", channel: "MultiPedia" },
      { id: "M2vfFhljySI", title: "Query and its types| Database basics in Urdu/Hindi| Database basics in Urdu/Hindi| 2nd year computer", channel: "MultiPedia" },
      { id: "3ho1qoN1bIE", title: "MS Access   IDE   RDBMS in DB hindi urdu   2nd year computer chapter 05   Prof Waqar Makhdoom", channel: "Tec-Edu-Wor" },
      { id: "R9_pzN7Dec4", title: "Tables and Queries in MS Access | ICS Part 2 Chap 6 Urdu/Hindi Tutorial", channel: "CSIT Skills" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Structured Query Language (SQL)",
    videos: [
      { id: "c76T1ecq0pc", title: "Structured Query Language | SQL | Urdu/Hindi", channel: "Research Technology" },
      { id: "_6upkqhJMVk", title: "Structured Query Language | Basic SQL Statements | In Urdu/Hindi | Lecture # 14", channel: "Asma Moazzam" },
      { id: "mwZ8HN02UqM", title: "58. What is Structure Query Language SQL & How to use Its Statements|1st Year Computer Science Urdu", channel: "CourseEdx" },
      { id: "deLCl3p4jBc", title: "Computer 2nd year Chapter no 05 Lecture no 35 Database Object table and Queries", channel: "Computer Tutorial Hub" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Introduction to C Language",
    videos: [
      { id: "f1xLqt9Kfb4", title: "PGC lectures-Inter Part 2-KPK Board-Computer Science-Chapter 6 - Components of Functions", channel: "PGC Lectures - KPK Board" },
      { id: "X8N5vbATazQ", title: "PGC lectures-Inter Part 2-KPK Board-Computer Science-Chapter 6- User Defined Function Its Advantages", channel: "PGC Lectures - KPK Board" },
      { id: "3Odb-oWJxhE", title: "PGC lectures-Inter Part 2-KPK Board-Computer Science-Chapter 6-Introduction to Functions Types", channel: "PGC Lectures - KPK Board" },
      { id: "upqlQJqkDZ0", title: "PGC lectures-Inter Part 2-KPK Board-Computer Science-Chapter 6 - Scope of Variables & Types", channel: "PGC Lectures - KPK Board" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Input Output Handling in C",
    videos: [
      { id: "mI8waoikfMI", title: "Input and Output in C language (Hindi/Urdu) | 2nd year computer chapter 10 | ICS Part 2", channel: "Computer Teacher" },
      { id: "ECZMZzHke5g", title: "Input and Output in C language (Hindi/Urdu) | 2nd year computer chapter 10 | Let's Learn", channel: "Let's Learn" },
      { id: "6BtUZdpu874", title: "What are Input & Output Function | C Language | Lecture in Urdu/Hindi", channel: "THE FACT SCHOOL" },
      { id: "ydF84zBozmo", title: "Input and Output in C Language and printf() Function in Urdu | Hindi", channel: "Imran Rafique Toor" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Decision Constructs",
    videos: [
      { id: "T0mzVWlcyL4", title: "if else if statement in C in Urdu/Hindi | 2nd year computer chapter 11 | ICS Part 2", channel: "Computer Teacher" },
      { id: "T0nFfzDZsH0", title: "History of C Language | 2nd year computer chapter 8 | ICS Part 2", channel: "Computer Teacher" },
      { id: "_CXjFvhlTew", title: "ICS Part 2. Chapter 11 Decision Constructs. Overview about decision construcct", channel: "ilmkidunya" },
      { id: "Y-BBh5cAwoc", title: "ICS Part 2 - Chapter 8 - Getting Started with C Language - M. Hassan Hashmi - ||#csclassroom||", channel: "Computer Science Classroom" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Loop Constructs",
    videos: [
      { id: "zyTxp321hW0", title: "Rules For Naming Variable   Definition & Declaration in C hindi urdu   2nd Year Computer Chapter 9", channel: "Tec-Edu-Wor" },
      { id: "yu1saRCvHC0", title: "Learn C Language in Urdu/Hindi | Complete CH 9 | ICS Part 2 | M. Hassan Hashmi | #csclassroom", channel: "Computer Science Classroom" },
      { id: "zekq84SndyM", title: "Loop Structure in C/C++ in Hindi/Urdu | While loop", channel: "Computer Teacher" },
      { id: "LK96AZDLGjw", title: "Complete chapter 9 C language 2nd year for ICS|C laguage tutorial basics at intermediate level", channel: "MultiPedia" },
    ],
  },
  {
    classLevel: "12th",
    subject: "cs",
    topic: "Functions and Arrays",
    videos: [
      { id: "tGcwVUFl920", title: "getch and getche in c/c++ (hindi/urdu) | 2nd year computer chapter 10 | ICS Part 2", channel: "Computer Teacher" },
      { id: "2IQS9nc6bQU", title: "printf function in C (hindi/urdu) | 2nd year computer chapter 10 | ICS Part 2", channel: "Computer Teacher" },
      { id: "5wQQGucXUP8", title: "printf function in C (hindi/urdu) | 2nd year computer chapter 10 | ICS Part 2 || Abid ali computer", channel: "#ABID ALI COMPUTER INSTRUCTOR" },
      { id: "mI8waoikfMI", title: "Input and Output in C language (Hindi/Urdu) | 2nd year computer chapter 10 | ICS Part 2", channel: "Computer Teacher" },
    ],
  },
  {
    classLevel: "11th",
    subject: "biology",
    topic: "The Cell",
    videos: [
      { id: "yU_-KlRt_PQ", title: "cell : structure and function of the cell In Urdu Hindi", channel: "Dr UUT lectures doctor uut lectures druutlectures" },
      { id: "lwQMZl-mURc", title: "Cell Theory In Urdu English || 9th & 11th Class Biology || Chapter #4", channel: "Jupiter academy" },
      { id: "xQPV3l8TnJM", title: "11th Class Biology Live Lecture 1, Ch 4, The cell", channel: "ilmkidunya" },
      { id: "nQ9zC6FaKA8", title: "FSc Biology Book 1, Ch  4 The Cell - Structure of Generalized Cell - Inter part 1 Biology", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "biology",
    topic: "Biological Molecules",
    videos: [
      { id: "D92y3WJ5TrU", title: "Introduction Of Biological Molecules | Metabolism | Biological Molecules | Class 11 (Urdu/Hindi)", channel: "ALI ACADEMY BIOLOGY LECTURES" },
      { id: "WADH9GgNuRI", title: "11th Class Biology Chapter 4 | Biochemistry, Biological Molecules | Class 11th Biology New Book 2025", channel: "ilmkidunya" },
      { id: "9InkC6MIJtA", title: "Carbohydrates / Oligosaccharides (in Urdu) / First Year Biology / Chapter 2 / Part 8", channel: "Mansoor Abro" },
    ],
  },
  {
    classLevel: "11th",
    subject: "biology",
    topic: "Enzymes",
    videos: [
      { id: "6IBEaY5Xzwk", title: "Types of Enzymes - 11th Class Biology, Chapter 3 - Introduction to Enzymes in Urdu/Hindi by Sir Zain", channel: "Excellence Online" },
      { id: "5K_7vZJOe7g", title: "11th Class Biology, Ch 3 - Introduction to Enzymes - FSc Biology Part 1", channel: "ilmkidunya" },
      { id: "4MbIzQWOhC0", title: "Enzymes | Chapter 3  | 1st year Biology | Lec. # 01", channel: "Chemistry Plus" },
      { id: "bD_uAST_Te4", title: "Class 9th Chapter 6:  Enzymes complete One shot lecture", channel: "PoWer Of KnOwledge Academy" },
    ],
  },
  {
    classLevel: "11th",
    subject: "biology",
    topic: "Bioenergetics",
    videos: [
      { id: "BN74-WpggUk", title: "11th Class Biology Chapter 6 | Photosynthesis, Role of Light | Class 11th Biology New Book 2025", channel: "ilmkidunya" },
      { id: "W4asWqJeUKk", title: "PGC Lectures-Inter Part I-Punjab Board-Biology-Chapter 11 - Bioenergetics Introductions", channel: "Punjab Group Of Colleges" },
      { id: "meHZ9YF08Kg", title: "FSc Part 1 Biology, Ch 11 - Explain Photosynthesis - 11th Class Biology", channel: "ilmkidunya" },
      { id: "1ezVJgPSyHQ", title: "11th Class Biology Chapter 6 | Organization of Photosynthetic Pigments, Mechanism of Photosynthesis", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "11th",
    subject: "biology",
    topic: "Kingdom Prokaryotae",
    videos: [
      { id: "ofLAQ0eNiFI", title: "Bacteria ecology and Diversity || New biology book|| Sindh board|| Urdu Hindi|| by D.K.kataria", channel: "Dileep Kumar kataria" },
      { id: "DXeW9V3hWII", title: "Respiration, Growth, and Reproduction in Bacteria FSC 1st Year Chapter 6 in Urdu/Hindi", channel: "Mastery Expert" },
      { id: "dlmd0VsncO0", title: "11th Class Biology, Ch 6 - Nutrition and Respiration in Bacteria.- FSc Biology Part 1", channel: "ilmkidunya" },
      { id: "whhE9oAsgKI", title: "1st Year Biology 2025 New Book || Chapter#06 || Exercise Objectives MCqs || #ptbsyllabus", channel: "Hayat Ayoz" },
    ],
  },
  {
    classLevel: "12th",
    subject: "biology",
    topic: "Homeostasis",
    videos: [
      { id: "7t01y9W5LwY", title: "Homeostasis One Shot - Complete Chapter 1 | 12th Class Biology New Syllabus 2026 | Irtisam's Biology", channel: "irtisam's biology" },
      { id: "1LEqBt3C6fs", title: "🚀 HOMEOSTASIS | Complete Chapter in ONE SHOT | MDCAT 2026 Biology | Manzil Series | PMDC MDCAT", channel: "Physics Ka Manjan - Bilal Zia" },
      { id: "wemH0qK8uZI", title: "Watch This HOMEOSTASIS ONE-SHOT Lecture & You’ll Feel 100% Prepared for MDCAT! | Biology Guardian", channel: "Biology Guardian - Guardians' Academy" },
      { id: "omIeh4Uv9nQ", title: "HOMEOSTASIS | Positive and Negative feedback mechanism| Class 12 Biology Chapter 1", channel: "irtisam's biology" },
    ],
  },
  {
    classLevel: "12th",
    subject: "biology",
    topic: "Coordination and Control",
    videos: [
      { id: "RMNuR4hyByk", title: "PGC Lectures-Inter Part II-Punjab Board-Biology-Chapter 17 - Neurons", channel: "Punjab Group Of Colleges" },
      { id: "UrCyq9DBK4I", title: "2nd Year Biology Ch 17 Coordination And Control - FSc biology Book 2 Live Lecture", channel: "ilmkidunya" },
      { id: "CxQRxZs005o", title: "FSc Biology Book 2 - Coordination In Animals - Ch 17 Coordination And Control - 12th Class Biology", channel: "ilmkidunya" },
      { id: "Hlh6ddA14RQ", title: "FSc Biology Book 2, Chemical Coordination - Ch 17 Coordination And Control - 12th Class Biology", channel: "ilmkidunya" },
    ],
  },
  {
    classLevel: "12th",
    subject: "biology",
    topic: "Chromosomes and DNA",
    videos: [
      { id: "6Q15fAVT8Pk", title: "Biology, 2nd Year, Chapter No 20, Chromosomes and DNA Chemical Compositions", channel: "Information & Entertainment" },
      { id: "s4uUVVGBm1I", title: "Chromosomes And DNA Introduction By Mr.Hadi || Chapter No 20 || 2nd Year Biology || Lecture No 01", channel: "Hadi Biology 20" },
      { id: "njySZQDcnMA", title: "2ND YEAR BIOLOGY CHAPTER NO:20 CHROMOSOMES AND DNA | LECTURE NO:10 |STEP ACADEMY 2025", channel: "STEP ACADEMY" },
      { id: "AsZeYEwHiGA", title: "20.1 Chromosomes and DNA | composition of chromosomes chapter 20 | fsc Biology Class12", channel: "irtisam's biology" },
    ],
  },
  {
    classLevel: "12th",
    subject: "biology",
    topic: "Variation and Genetics",
    videos: [
      { id: "T-xVFdnAicc", title: "PGC Lectures-Inter Part II-Punjab Board-Biology-Chapter 22 - Variation & Genetics", channel: "Punjab Group Of Colleges" },
      { id: "5ctyh3Qwiss", title: "FSc Biology Book 2, Multiple Alleles - Ch 22 Variation and Genetics - 12th Class Biology", channel: "ilmkidunya" },
      { id: "-hgmIVitczk", title: "Lecture 01 || Variations And Genetics Introduction Class 12 In Urdu Hindi By Mr.Hadi | Chapter No 22", channel: "Hadi Biology 20" },
      { id: "ajvZ9iWlPAs", title: "FSc - 2nd year | Biology | Chapter 22 | Variation & Genetics | Lecturer : Rana Fiaz ul Haq", channel: "Muslim Hands Educational Complex - Online Lectures" },
    ],
  },
  {
    classLevel: "12th",
    subject: "biology",
    topic: "Biotechnology",
    videos: [
      { id: "KTOiIylaGgw", title: "BioTechnology complete chapter links FSc II IN Urdu", channel: "Dr Hafiz Sultan Academy" },
      { id: "dRDpkfER1ss", title: "2nd Year Biology || Ch.23-Introduction Of Biotechnology", channel: "IQRA Centre" },
      { id: "OCsrWqFPTTM", title: "Tissue Culture || 12TH BIOLOGY || CHAPTER 23 || LECTURE 18 ||", channel: "PCTB Online Academy" },
      { id: "Rj5cJvp4iGY", title: "Gene Sequencing (Sanger's method) | Biology 12th | Chapter 23 Biotechnology | Lecture 6", channel: "Abbas Biology TV" },
    ],
  },
];

/** All videos for a class+subject, flattened. */
export function videosForSubject(classLevel: string, subject: string): VideoTopic[] {
  return VIDEO_LIBRARY.filter(
    (v) => v.classLevel === classLevel && v.subject === subject.toLowerCase()
  );
}

/**
 * Best-effort match of a syllabus chapter name to a video topic. Chapter names
 * carry unit prefixes and bracketed detail, so both sides are normalised and
 * matched by containment, longest match winning.
 */
export function videosForChapter(
  classLevel: string,
  subject: string,
  chapterName: string
): TopicVideo[] {
  const norm = (s: string) =>
    s.toLowerCase().replace(/^(unit|chapter|ch)\s*[\divx\-\s]*:?\s*/i, "").replace(/\([^)]*\)/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  const hay = norm(chapterName);
  if (!hay) return [];
  let best: { len: number; vids: TopicVideo[] } | null = null;
  for (const entry of VIDEO_LIBRARY) {
    if (entry.classLevel !== classLevel) continue;
    if (entry.subject !== subject.toLowerCase()) continue;
    const key = norm(entry.topic);
    if (!key) continue;
    if (hay.includes(key) || key.includes(hay)) {
      const len = Math.min(key.length, hay.length);
      if (!best || len > best.len) best = { len, vids: entry.videos };
    }
  }
  return best ? best.vids : [];
}

/** Total count, used for honest UI copy. */
export const VIDEO_COUNT = VIDEO_LIBRARY.reduce((n, t) => n + t.videos.length, 0);
