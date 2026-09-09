/**
 * VERIFIED VIDEO LIBRARY - 9th & 10th science
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
  classLevel: "9th" | "10th";
  subject: "physics" | "chemistry" | "biology";
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
