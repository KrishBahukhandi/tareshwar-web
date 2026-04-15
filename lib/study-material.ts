export type MaterialType = "pdf_notes" | "question_notes" | "ppt" | "video";

export type StudyMaterial = {
  id: string;
  title: string;
  type: MaterialType;
  fileUrl: string;
  size?: string;
  pageCount?: number;
  description?: string;
};

export type Chapter = {
  id: string;
  slug: string;
  name: string;
  chapterNumber: number;
  materials: StudyMaterial[];
};

export type Subject = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  color: string; // tailwind bg class
  icon: string; // emoji
  chapters: Chapter[];
};

export type ClassLevel = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  subjects: Subject[];
};

export const STUDY_MATERIAL_DATA: ClassLevel[] = [
  {
    id: "class-10",
    slug: "class-10",
    name: "Class 10",
    shortName: "10th",
    description: "Board exam preparation with comprehensive notes, practice questions and chapter-wise material.",
    subjects: [
      {
        id: "c10-math",
        slug: "mathematics",
        name: "Mathematics",
        shortName: "Math",
        color: "bg-blue-50",
        icon: "📐",
        chapters: [
          {
            id: "c10-math-ch1",
            slug: "real-numbers",
            name: "Real Numbers",
            chapterNumber: 1,
            materials: [
              { id: "m1", title: "Real Numbers – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.2 MB", pageCount: 18 },
              { id: "m2", title: "Real Numbers – Question Bank", type: "question_notes", fileUrl: "#", size: "0.8 MB", pageCount: 10 },
              { id: "m3", title: "Real Numbers – PPT Slides", type: "ppt", fileUrl: "#", size: "3.5 MB" },
            ],
          },
          {
            id: "c10-math-ch2",
            slug: "polynomials",
            name: "Polynomials",
            chapterNumber: 2,
            materials: [
              { id: "m4", title: "Polynomials – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.4 MB", pageCount: 22 },
              { id: "m5", title: "Polynomials – Question Bank", type: "question_notes", fileUrl: "#", size: "0.9 MB", pageCount: 12 },
              { id: "m6", title: "Polynomials – PPT Slides", type: "ppt", fileUrl: "#", size: "4.1 MB" },
            ],
          },
          {
            id: "c10-math-ch3",
            slug: "pair-of-linear-equations",
            name: "Pair of Linear Equations in Two Variables",
            chapterNumber: 3,
            materials: [
              { id: "m7", title: "Linear Equations – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.6 MB", pageCount: 26 },
              { id: "m8", title: "Linear Equations – Question Bank", type: "question_notes", fileUrl: "#", size: "1.1 MB", pageCount: 15 },
            ],
          },
          {
            id: "c10-math-ch4",
            slug: "quadratic-equations",
            name: "Quadratic Equations",
            chapterNumber: 4,
            materials: [
              { id: "m9", title: "Quadratic Equations – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.3 MB", pageCount: 20 },
              { id: "m10", title: "Quadratic Equations – Question Bank", type: "question_notes", fileUrl: "#", size: "0.9 MB", pageCount: 11 },
              { id: "m11", title: "Quadratic Equations – PPT Slides", type: "ppt", fileUrl: "#", size: "3.8 MB" },
            ],
          },
          {
            id: "c10-math-ch5",
            slug: "arithmetic-progressions",
            name: "Arithmetic Progressions",
            chapterNumber: 5,
            materials: [
              { id: "m12", title: "Arithmetic Progressions – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.1 MB", pageCount: 16 },
              { id: "m13", title: "Arithmetic Progressions – Question Bank", type: "question_notes", fileUrl: "#", size: "0.7 MB", pageCount: 9 },
            ],
          },
          {
            id: "c10-math-ch6",
            slug: "triangles",
            name: "Triangles",
            chapterNumber: 6,
            materials: [
              { id: "m14", title: "Triangles – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.8 MB", pageCount: 28 },
              { id: "m15", title: "Triangles – Question Bank", type: "question_notes", fileUrl: "#", size: "1.2 MB", pageCount: 16 },
              { id: "m16", title: "Triangles – PPT Slides", type: "ppt", fileUrl: "#", size: "4.5 MB" },
            ],
          },
        ],
      },
      {
        id: "c10-science",
        slug: "science",
        name: "Science",
        shortName: "Science",
        color: "bg-green-50",
        icon: "🔬",
        chapters: [
          {
            id: "c10-sci-ch1",
            slug: "chemical-reactions-and-equations",
            name: "Chemical Reactions and Equations",
            chapterNumber: 1,
            materials: [
              { id: "m17", title: "Chemical Reactions – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.1 MB", pageCount: 30 },
              { id: "m18", title: "Chemical Reactions – Question Bank", type: "question_notes", fileUrl: "#", size: "1.4 MB", pageCount: 18 },
              { id: "m19", title: "Chemical Reactions – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch1-chemical-reactions.pptx", size: "794 KB" },
            ],
          },
          {
            id: "c10-sci-ch2",
            slug: "acids-bases-and-salts",
            name: "Acids, Bases and Salts",
            chapterNumber: 2,
            materials: [
              { id: "m20", title: "Acids, Bases and Salts – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.9 MB", pageCount: 24 },
              { id: "m21", title: "Acids, Bases and Salts – Question Bank", type: "question_notes", fileUrl: "#", size: "1.1 MB", pageCount: 14 },
              { id: "m21b", title: "Acids, Bases and Salts – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch2-acids-bases-salts.pptx", size: "5.9 MB" },
            ],
          },
          {
            id: "c10-sci-ch3",
            slug: "metals-and-non-metals",
            name: "Metals and Non-Metals",
            chapterNumber: 3,
            materials: [
              { id: "m21c", title: "Metals and Non-Metals – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch3-metals-nonmetals.pptx", size: "455 KB" },
            ],
          },
          {
            id: "c10-sci-ch4",
            slug: "carbon-and-its-compounds",
            name: "Carbon and Its Compounds",
            chapterNumber: 4,
            materials: [
              { id: "m22", title: "Carbon & Compounds – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.3 MB", pageCount: 34 },
              { id: "m23", title: "Carbon & Compounds – Question Bank", type: "question_notes", fileUrl: "#", size: "1.5 MB", pageCount: 20 },
              { id: "m24", title: "Carbon & Compounds – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch4-carbon-compounds.pptx", size: "2.0 MB" },
            ],
          },
          {
            id: "c10-sci-ch5",
            slug: "periodic-classification-of-elements",
            name: "Periodic Classification of Elements",
            chapterNumber: 5,
            materials: [
              { id: "m24b", title: "Periodic Classification – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch5-periodic-classification.ppt", size: "1.5 MB" },
            ],
          },
          {
            id: "c10-sci-ch6",
            slug: "life-processes",
            name: "Life Processes",
            chapterNumber: 6,
            materials: [
              { id: "m28", title: "Life Processes – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.0 MB", pageCount: 28 },
              { id: "m29", title: "Life Processes – Question Bank", type: "question_notes", fileUrl: "#", size: "1.3 MB", pageCount: 16 },
              { id: "m29b", title: "Life Processes – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch6-life-processes.pptx", size: "25 MB" },
            ],
          },
          {
            id: "c10-sci-ch7",
            slug: "control-and-coordination",
            name: "Control and Coordination",
            chapterNumber: 7,
            materials: [
              { id: "m29c", title: "Control and Coordination – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch7-control-coordination.pptx", size: "13 MB" },
            ],
          },
          {
            id: "c10-sci-ch8",
            slug: "how-do-organisms-reproduce",
            name: "How Do Organisms Reproduce?",
            chapterNumber: 8,
            materials: [
              { id: "m29d", title: "How Do Organisms Reproduce – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch8-how-organisms-reproduce.ppt", size: "4.9 MB" },
            ],
          },
          {
            id: "c10-sci-ch10",
            slug: "light-reflection-and-refraction",
            name: "Light – Reflection and Refraction",
            chapterNumber: 10,
            materials: [
              { id: "m25", title: "Light – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.4 MB", pageCount: 36 },
              { id: "m26", title: "Light – Question Bank", type: "question_notes", fileUrl: "#", size: "1.6 MB", pageCount: 22 },
              { id: "m27", title: "Light – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch10-light-reflection-refraction.ppsx", size: "516 KB" },
            ],
          },
          {
            id: "c10-sci-ch13",
            slug: "magnetic-effects-of-electric-current",
            name: "Magnetic Effects of Electric Current",
            chapterNumber: 13,
            materials: [
              { id: "m29e", title: "Magnetic Effects of Electric Current – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch13-magnetic-effects.pptx", size: "28 MB" },
            ],
          },
          {
            id: "c10-sci-ch14",
            slug: "sources-of-energy",
            name: "Sources of Energy",
            chapterNumber: 14,
            materials: [
              { id: "m29f", title: "Sources of Energy – PPT Slides", type: "ppt", fileUrl: "/study-material/class-10/science/ch14-sources-of-energy.pptx", size: "32 MB" },
            ],
          },
        ],
      },
      {
        id: "c10-sst",
        slug: "social-science",
        name: "Social Science",
        shortName: "SST",
        color: "bg-yellow-50",
        icon: "🌍",
        chapters: [
          {
            id: "c10-sst-ch1",
            slug: "the-rise-of-nationalism-in-europe",
            name: "The Rise of Nationalism in Europe",
            chapterNumber: 1,
            materials: [
              { id: "m30", title: "Nationalism in Europe – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.7 MB", pageCount: 24 },
              { id: "m31", title: "Nationalism in Europe – Question Bank", type: "question_notes", fileUrl: "#", size: "1.0 MB", pageCount: 12 },
            ],
          },
          {
            id: "c10-sst-ch2",
            slug: "nationalism-in-india",
            name: "Nationalism in India",
            chapterNumber: 2,
            materials: [
              { id: "m32", title: "Nationalism in India – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.9 MB", pageCount: 28 },
              { id: "m33", title: "Nationalism in India – Question Bank", type: "question_notes", fileUrl: "#", size: "1.2 MB", pageCount: 14 },
              { id: "m34", title: "Nationalism in India – PPT Slides", type: "ppt", fileUrl: "#", size: "4.3 MB" },
            ],
          },
        ],
      },
      {
        id: "c10-english",
        slug: "english",
        name: "English",
        shortName: "Eng",
        color: "bg-purple-50",
        icon: "📖",
        chapters: [
          {
            id: "c10-eng-ch1",
            slug: "a-letter-to-god",
            name: "A Letter to God",
            chapterNumber: 1,
            materials: [
              { id: "m35", title: "A Letter to God – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "0.9 MB", pageCount: 12 },
              { id: "m36", title: "A Letter to God – Question Bank", type: "question_notes", fileUrl: "#", size: "0.6 MB", pageCount: 8 },
            ],
          },
          {
            id: "c10-eng-ch2",
            slug: "nelson-mandela",
            name: "Nelson Mandela: Long Walk to Freedom",
            chapterNumber: 2,
            materials: [
              { id: "m37", title: "Nelson Mandela – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.0 MB", pageCount: 14 },
              { id: "m38", title: "Nelson Mandela – Question Bank", type: "question_notes", fileUrl: "#", size: "0.7 MB", pageCount: 9 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class-11",
    slug: "class-11",
    name: "Class 11",
    shortName: "11th",
    description: "Strong foundational concepts for Science and Commerce students with detailed notes and solved examples.",
    subjects: [
      {
        id: "c11-physics",
        slug: "physics",
        name: "Physics",
        shortName: "Physics",
        color: "bg-indigo-50",
        icon: "⚛️",
        chapters: [
          {
            id: "c11-phy-ch1",
            slug: "physical-world",
            name: "Physical World",
            chapterNumber: 1,
            materials: [
              { id: "m39", title: "Physical World – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.2 MB", pageCount: 16 },
              { id: "m40", title: "Physical World – Question Bank", type: "question_notes", fileUrl: "#", size: "0.8 MB", pageCount: 10 },
            ],
          },
          {
            id: "c11-phy-ch2",
            slug: "units-and-measurements",
            name: "Units and Measurements",
            chapterNumber: 2,
            materials: [
              { id: "m41", title: "Units & Measurements – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.5 MB", pageCount: 22 },
              { id: "m42", title: "Units & Measurements – Question Bank", type: "question_notes", fileUrl: "#", size: "1.0 MB", pageCount: 13 },
              { id: "m43", title: "Units & Measurements – PPT Slides", type: "ppt", fileUrl: "#", size: "3.9 MB" },
            ],
          },
          {
            id: "c11-phy-ch3",
            slug: "motion-in-a-straight-line",
            name: "Motion in a Straight Line",
            chapterNumber: 3,
            materials: [
              { id: "m44", title: "Motion in a Straight Line – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.8 MB", pageCount: 26 },
              { id: "m45", title: "Motion in a Straight Line – Question Bank", type: "question_notes", fileUrl: "#", size: "1.2 MB", pageCount: 16 },
              { id: "m46", title: "Motion in a Straight Line – PPT Slides", type: "ppt", fileUrl: "#", size: "4.7 MB" },
            ],
          },
          {
            id: "c11-phy-ch4",
            slug: "laws-of-motion",
            name: "Laws of Motion",
            chapterNumber: 5,
            materials: [
              { id: "m47", title: "Laws of Motion – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.1 MB", pageCount: 30 },
              { id: "m48", title: "Laws of Motion – Question Bank", type: "question_notes", fileUrl: "#", size: "1.4 MB", pageCount: 18 },
              { id: "m49", title: "Laws of Motion – PPT Slides", type: "ppt", fileUrl: "#", size: "5.5 MB" },
            ],
          },
          {
            id: "c11-phy-ch5",
            slug: "work-energy-and-power",
            name: "Work, Energy and Power",
            chapterNumber: 6,
            materials: [
              { id: "m50", title: "Work, Energy & Power – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.9 MB", pageCount: 28 },
              { id: "m51", title: "Work, Energy & Power – Question Bank", type: "question_notes", fileUrl: "#", size: "1.3 MB", pageCount: 16 },
            ],
          },
        ],
      },
      {
        id: "c11-chemistry",
        slug: "chemistry",
        name: "Chemistry",
        shortName: "Chem",
        color: "bg-orange-50",
        icon: "🧪",
        chapters: [
          {
            id: "c11-chem-ch1",
            slug: "some-basic-concepts-of-chemistry",
            name: "Some Basic Concepts of Chemistry",
            chapterNumber: 1,
            materials: [
              { id: "m52", title: "Basic Concepts – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.6 MB", pageCount: 24 },
              { id: "m53", title: "Basic Concepts – Question Bank", type: "question_notes", fileUrl: "#", size: "1.0 MB", pageCount: 14 },
              { id: "m54", title: "Basic Concepts – PPT Slides", type: "ppt", fileUrl: "#", size: "4.2 MB" },
            ],
          },
          {
            id: "c11-chem-ch2",
            slug: "structure-of-atom",
            name: "Structure of Atom",
            chapterNumber: 2,
            materials: [
              { id: "m55", title: "Structure of Atom – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.0 MB", pageCount: 30 },
              { id: "m56", title: "Structure of Atom – Question Bank", type: "question_notes", fileUrl: "#", size: "1.3 MB", pageCount: 17 },
              { id: "m57", title: "Structure of Atom – PPT Slides", type: "ppt", fileUrl: "#", size: "5.1 MB" },
            ],
          },
          {
            id: "c11-chem-ch3",
            slug: "periodic-classification",
            name: "Classification of Elements and Periodicity",
            chapterNumber: 3,
            materials: [
              { id: "m58", title: "Periodic Table – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.8 MB", pageCount: 26 },
              { id: "m59", title: "Periodic Table – Question Bank", type: "question_notes", fileUrl: "#", size: "1.1 MB", pageCount: 14 },
            ],
          },
        ],
      },
      {
        id: "c11-math",
        slug: "mathematics",
        name: "Mathematics",
        shortName: "Math",
        color: "bg-blue-50",
        icon: "📐",
        chapters: [
          {
            id: "c11-math-ch1",
            slug: "sets",
            name: "Sets",
            chapterNumber: 1,
            materials: [
              { id: "m60", title: "Sets – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.3 MB", pageCount: 18 },
              { id: "m61", title: "Sets – Question Bank", type: "question_notes", fileUrl: "#", size: "0.9 MB", pageCount: 11 },
              { id: "m62", title: "Sets – PPT Slides", type: "ppt", fileUrl: "#", size: "3.5 MB" },
            ],
          },
          {
            id: "c11-math-ch2",
            slug: "relations-and-functions",
            name: "Relations and Functions",
            chapterNumber: 2,
            materials: [
              { id: "m63", title: "Relations & Functions – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.5 MB", pageCount: 22 },
              { id: "m64", title: "Relations & Functions – Question Bank", type: "question_notes", fileUrl: "#", size: "1.0 MB", pageCount: 13 },
            ],
          },
          {
            id: "c11-math-ch3",
            slug: "trigonometric-functions",
            name: "Trigonometric Functions",
            chapterNumber: 3,
            materials: [
              { id: "m65", title: "Trigonometry – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.0 MB", pageCount: 30 },
              { id: "m66", title: "Trigonometry – Question Bank", type: "question_notes", fileUrl: "#", size: "1.4 MB", pageCount: 18 },
              { id: "m67", title: "Trigonometry – PPT Slides", type: "ppt", fileUrl: "#", size: "4.8 MB" },
            ],
          },
        ],
      },
      {
        id: "c11-biology",
        slug: "biology",
        name: "Biology",
        shortName: "Bio",
        color: "bg-green-50",
        icon: "🌱",
        chapters: [
          {
            id: "c11-bio-ch1",
            slug: "the-living-world",
            name: "The Living World",
            chapterNumber: 1,
            materials: [
              { id: "m68", title: "The Living World – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.4 MB", pageCount: 20 },
              { id: "m69", title: "The Living World – Question Bank", type: "question_notes", fileUrl: "#", size: "0.9 MB", pageCount: 12 },
            ],
          },
          {
            id: "c11-bio-ch2",
            slug: "biological-classification",
            name: "Biological Classification",
            chapterNumber: 2,
            materials: [
              { id: "m70", title: "Biological Classification – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.8 MB", pageCount: 26 },
              { id: "m71", title: "Biological Classification – Question Bank", type: "question_notes", fileUrl: "#", size: "1.2 MB", pageCount: 15 },
              { id: "m72", title: "Biological Classification – PPT Slides", type: "ppt", fileUrl: "#", size: "5.3 MB" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class-12",
    slug: "class-12",
    name: "Class 12",
    shortName: "12th",
    description: "Board & entrance exam focused material with previous year questions, in-depth notes and revision PPTs.",
    subjects: [
      {
        id: "c12-physics",
        slug: "physics",
        name: "Physics",
        shortName: "Physics",
        color: "bg-indigo-50",
        icon: "⚛️",
        chapters: [
          {
            id: "c12-phy-ch1",
            slug: "electric-charges-and-fields",
            name: "Electric Charges and Fields",
            chapterNumber: 1,
            materials: [
              { id: "m73", title: "Electric Charges & Fields – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.2 MB", pageCount: 32 },
              { id: "m74", title: "Electric Charges & Fields – Question Bank", type: "question_notes", fileUrl: "#", size: "1.5 MB", pageCount: 20 },
              { id: "m75", title: "Electric Charges & Fields – PPT Slides", type: "ppt", fileUrl: "#", size: "6.0 MB" },
            ],
          },
          {
            id: "c12-phy-ch2",
            slug: "electrostatic-potential-and-capacitance",
            name: "Electrostatic Potential and Capacitance",
            chapterNumber: 2,
            materials: [
              { id: "m76", title: "Electrostatics – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.4 MB", pageCount: 36 },
              { id: "m77", title: "Electrostatics – Question Bank", type: "question_notes", fileUrl: "#", size: "1.6 MB", pageCount: 22 },
              { id: "m78", title: "Electrostatics – PPT Slides", type: "ppt", fileUrl: "#", size: "6.4 MB" },
            ],
          },
          {
            id: "c12-phy-ch3",
            slug: "current-electricity",
            name: "Current Electricity",
            chapterNumber: 3,
            materials: [
              { id: "m79", title: "Current Electricity – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.1 MB", pageCount: 30 },
              { id: "m80", title: "Current Electricity – Question Bank", type: "question_notes", fileUrl: "#", size: "1.4 MB", pageCount: 18 },
            ],
          },
          {
            id: "c12-phy-ch8",
            slug: "electromagnetic-waves",
            name: "Electromagnetic Waves",
            chapterNumber: 8,
            materials: [
              { id: "m81", title: "EM Waves – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.6 MB", pageCount: 22 },
              { id: "m82", title: "EM Waves – Question Bank", type: "question_notes", fileUrl: "#", size: "1.0 MB", pageCount: 14 },
              { id: "m83", title: "EM Waves – PPT Slides", type: "ppt", fileUrl: "#", size: "4.8 MB" },
            ],
          },
        ],
      },
      {
        id: "c12-chemistry",
        slug: "chemistry",
        name: "Chemistry",
        shortName: "Chem",
        color: "bg-orange-50",
        icon: "🧪",
        chapters: [
          {
            id: "c12-chem-ch1",
            slug: "the-solid-state",
            name: "The Solid State",
            chapterNumber: 1,
            materials: [
              { id: "m84", title: "Solid State – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.9 MB", pageCount: 28 },
              { id: "m85", title: "Solid State – Question Bank", type: "question_notes", fileUrl: "#", size: "1.2 MB", pageCount: 16 },
              { id: "m86", title: "Solid State – PPT Slides", type: "ppt", fileUrl: "#", size: "5.0 MB" },
            ],
          },
          {
            id: "c12-chem-ch2",
            slug: "solutions",
            name: "Solutions",
            chapterNumber: 2,
            materials: [
              { id: "m87", title: "Solutions – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.0 MB", pageCount: 30 },
              { id: "m88", title: "Solutions – Question Bank", type: "question_notes", fileUrl: "#", size: "1.3 MB", pageCount: 17 },
            ],
          },
          {
            id: "c12-chem-ch3",
            slug: "electrochemistry",
            name: "Electrochemistry",
            chapterNumber: 3,
            materials: [
              { id: "m89", title: "Electrochemistry – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.2 MB", pageCount: 32 },
              { id: "m90", title: "Electrochemistry – Question Bank", type: "question_notes", fileUrl: "#", size: "1.5 MB", pageCount: 20 },
              { id: "m91", title: "Electrochemistry – PPT Slides", type: "ppt", fileUrl: "#", size: "5.8 MB" },
            ],
          },
        ],
      },
      {
        id: "c12-math",
        slug: "mathematics",
        name: "Mathematics",
        shortName: "Math",
        color: "bg-blue-50",
        icon: "📐",
        chapters: [
          {
            id: "c12-math-ch1",
            slug: "relations-and-functions",
            name: "Relations and Functions",
            chapterNumber: 1,
            materials: [
              { id: "m92", title: "Relations & Functions – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.5 MB", pageCount: 22 },
              { id: "m93", title: "Relations & Functions – Question Bank", type: "question_notes", fileUrl: "#", size: "1.0 MB", pageCount: 13 },
              { id: "m94", title: "Relations & Functions – PPT Slides", type: "ppt", fileUrl: "#", size: "3.8 MB" },
            ],
          },
          {
            id: "c12-math-ch4",
            slug: "determinants",
            name: "Determinants",
            chapterNumber: 4,
            materials: [
              { id: "m95", title: "Determinants – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.8 MB", pageCount: 26 },
              { id: "m96", title: "Determinants – Question Bank", type: "question_notes", fileUrl: "#", size: "1.2 MB", pageCount: 16 },
            ],
          },
          {
            id: "c12-math-ch5",
            slug: "continuity-and-differentiability",
            name: "Continuity and Differentiability",
            chapterNumber: 5,
            materials: [
              { id: "m97", title: "Continuity & Differentiability – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.2 MB", pageCount: 34 },
              { id: "m98", title: "Continuity & Differentiability – Question Bank", type: "question_notes", fileUrl: "#", size: "1.5 MB", pageCount: 20 },
              { id: "m99", title: "Continuity & Differentiability – PPT Slides", type: "ppt", fileUrl: "#", size: "5.5 MB" },
            ],
          },
          {
            id: "c12-math-ch6",
            slug: "application-of-derivatives",
            name: "Application of Derivatives",
            chapterNumber: 6,
            materials: [
              { id: "m100", title: "Application of Derivatives – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "2.0 MB", pageCount: 30 },
              { id: "m101", title: "Application of Derivatives – Question Bank", type: "question_notes", fileUrl: "#", size: "1.3 MB", pageCount: 17 },
            ],
          },
        ],
      },
      {
        id: "c12-biology",
        slug: "biology",
        name: "Biology",
        shortName: "Bio",
        color: "bg-green-50",
        icon: "🌱",
        chapters: [
          {
            id: "c12-bio-ch1",
            slug: "reproduction-in-organisms",
            name: "Reproduction in Organisms",
            chapterNumber: 1,
            materials: [
              { id: "m102", title: "Reproduction – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.7 MB", pageCount: 24 },
              { id: "m103", title: "Reproduction – Question Bank", type: "question_notes", fileUrl: "#", size: "1.1 MB", pageCount: 14 },
              { id: "m104", title: "Reproduction – PPT Slides", type: "ppt", fileUrl: "#", size: "4.4 MB" },
            ],
          },
          {
            id: "c12-bio-ch3",
            slug: "human-reproduction",
            name: "Human Reproduction",
            chapterNumber: 3,
            materials: [
              { id: "m105", title: "Human Reproduction – PDF Notes", type: "pdf_notes", fileUrl: "#", size: "1.9 MB", pageCount: 28 },
              { id: "m106", title: "Human Reproduction – Question Bank", type: "question_notes", fileUrl: "#", size: "1.2 MB", pageCount: 16 },
            ],
          },
        ],
      },
    ],
  },
];

// Helper functions
export function getClassBySlug(slug: string): ClassLevel | undefined {
  return STUDY_MATERIAL_DATA.find((c) => c.slug === slug);
}

export function getSubjectBySlug(classSlug: string, subjectSlug: string): { classLevel: ClassLevel; subject: Subject } | undefined {
  const classLevel = getClassBySlug(classSlug);
  if (!classLevel) return undefined;
  const subject = classLevel.subjects.find((s) => s.slug === subjectSlug);
  if (!subject) return undefined;
  return { classLevel, subject };
}

export function getChapterBySlug(
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string
): { classLevel: ClassLevel; subject: Subject; chapter: Chapter } | undefined {
  const result = getSubjectBySlug(classSlug, subjectSlug);
  if (!result) return undefined;
  const chapter = result.subject.chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) return undefined;
  return { ...result, chapter };
}

export const MATERIAL_TYPE_META: Record<MaterialType, { label: string; icon: string; color: string; bgColor: string }> = {
  pdf_notes: { label: "PDF Notes", icon: "📄", color: "text-red-600", bgColor: "bg-red-50" },
  question_notes: { label: "Question Bank", icon: "❓", color: "text-amber-600", bgColor: "bg-amber-50" },
  ppt: { label: "PPT Slides", icon: "🖥️", color: "text-blue-600", bgColor: "bg-blue-50" },
  video: { label: "Video", icon: "▶️", color: "text-purple-600", bgColor: "bg-purple-50" },
};
