export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: BlogSection[];
  publishDate: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-score-90-percent-in-class-10-boards",
    title: "How to Score 90% in Class 10 Board Exams: A Practical Guide",
    author: "Dr. Kavya Sharma",
    coverImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "A step-by-step approach to scoring 90% and above in Class 10 CBSE boards — covering subject strategy, revision cycles, and exam-day tips.",
    publishDate: "2026-03-20",
    category: "Board Exams",
    seoTitle: "How to Score 90% in Class 10 Board Exams | CBSE Preparation Guide",
    seoDescription:
      "Score 90% in Class 10 CBSE boards with a proven study strategy, smart revision plan, and subject-wise tips for Science, Maths, and SST.",
    keywords: [
      "how to score 90 percent in class 10",
      "class 10 board exam preparation",
      "cbse class 10 study tips",
      "class 10 science maths tips",
      "board exam strategy class 10"
    ],
    content: [
      {
        heading: "Start with the NCERT — completely",
        paragraphs: [
          "Most Class 10 students underestimate how deeply CBSE board questions are rooted in NCERT textbooks. Before touching any guide or reference book, finish every chapter in NCERT, including the examples, exercises, and back questions. At least 80% of board marks come directly from NCERT content.",
          "This applies to every subject — Science definitions, Geography case studies, History dates, Economics diagrams. If your NCERT reading is thorough, your board preparation is already halfway done."
        ]
      },
      {
        heading: "Build a subject-wise revision schedule",
        paragraphs: [
          "Scoring 90% requires covering all subjects, not just your favourites. Divide your weekly schedule so that every subject appears at least 3 times. Give more slots to subjects where you are losing marks, not the ones you already enjoy.",
          "A simple pattern that works: Maths problem practice daily (30–45 minutes), Science concept review on alternate days, Social Science reading and map work twice a week, and English grammar and writing on the remaining days. Consistency matters far more than the number of hours."
        ]
      },
      {
        heading: "Practice previous years' papers under timed conditions",
        paragraphs: [
          "Board papers follow a predictable pattern. When you solve 5 to 7 years of previous papers, you start to see which types of questions repeat, what the mark distribution looks like, and how much time each section actually takes.",
          "Timed practice also reveals where you are overwriting or underwriting. Board examiners reward concise, point-wise answers. Knowing how much to write per mark is a skill that only comes from regular timed practice — and it can easily add 8 to 12 marks to your final score."
        ]
      },
      {
        heading: "Focus on presentation, not just content",
        paragraphs: [
          "Board marking is done by teachers evaluating hundreds of answer sheets. Neat handwriting, clear headings, underlined key terms, and labelled diagrams make your paper stand out positively. Examiners can give you the benefit of doubt when your answers are well-presented.",
          "Practice writing in the same format you will use in the actual exam. Use bullet points for long answers, draw diagrams where the question expects them, and always attempt every question — even a partial answer gets partial marks."
        ]
      }
    ]
  },
  {
    slug: "class-12-study-timetable-for-board-exams",
    title: "The Complete Class 12 Study Timetable for Board Exam Success",
    author: "Rohan Verma",
    coverImage:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "A realistic, subject-balanced Class 12 study timetable that keeps students consistent from the start of the year through the board exam.",
    publishDate: "2026-03-15",
    category: "Study Planning",
    seoTitle: "Class 12 Study Timetable for Board Exams | Full Year Schedule",
    seoDescription:
      "Get a practical Class 12 study timetable that balances school, coaching, revision, and rest — designed for CBSE board exam success.",
    keywords: [
      "class 12 study timetable",
      "class 12 board exam schedule",
      "how to study in class 12",
      "cbse class 12 preparation plan",
      "study timetable for boards"
    ],
    content: [
      {
        heading: "Why most Class 12 timetables fail",
        paragraphs: [
          "The most common mistake in Class 12 planning is building a timetable based on ideal conditions rather than real ones. Students write schedules that assume 10 hours of study every day, no interruptions, and perfect energy levels. These schedules break within a week.",
          "A timetable that actually works is built around what is already fixed — school hours, coaching sessions, meals, sleep — and fills the remaining gaps with study blocks. It also includes rest days and catch-up windows so one bad day does not destroy the whole week."
        ]
      },
      {
        heading: "Phase 1 (April to September): Concept building",
        paragraphs: [
          "The first half of Class 12 should focus on understanding, not cramming. Go through each chapter as it is taught in school, make concise notes, and solve NCERT exercises the same week. Do not leave chapters pending because Class 12 syllabus builds on itself — especially in Physics, Chemistry, and Mathematics.",
          "Aim for 2 to 3 hours of focused self-study per day during this phase. Spend time on concepts that confuse you, ask doubts early, and build a habit of weekly revision. Strong concept clarity in the first half makes the second half much less stressful."
        ]
      },
      {
        heading: "Phase 2 (October to January): Consolidation and mocks",
        paragraphs: [
          "By October, you should begin revisiting completed chapters while keeping up with new ones. This is where a subject-wise revision plan becomes essential. Make chapter summaries, revisit formulae, and start solving sample papers one subject at a time.",
          "Introduce full mock tests from November onwards. Solve one complete paper per week per subject and review every wrong answer the next day. Your mistake log from this phase is your most valuable revision material before the actual boards."
        ]
      },
      {
        heading: "Phase 3 (February onwards): Final revision",
        paragraphs: [
          "The two months before boards should be about consolidation, not new learning. Focus on high-probability topics, solve 5 to 7 years of board papers, and revise your own notes rather than picking up new books.",
          "Keep your schedule lighter and your sleep consistent. Students who maintain regular sleep in the final month perform better than those who study through the night because memory consolidation happens during sleep. Enter each paper calm, well-rested, and prepared."
        ]
      }
    ]
  },
  {
    slug: "how-parents-can-support-board-exam-preparation",
    title: "How Parents Can Support Their Child During Board Exam Preparation",
    author: "Ananya Iyer",
    coverImage:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "Practical ways parents can create a positive study environment at home and support their child through Class 10 and Class 12 board preparation.",
    publishDate: "2026-03-10",
    category: "For Parents",
    seoTitle: "How Parents Can Support Board Exam Preparation | Class 10 & 12 Tips",
    seoDescription:
      "Learn how to support your child during Class 10 and Class 12 board exam preparation — from creating a study environment to managing exam anxiety.",
    keywords: [
      "how parents can help in board exams",
      "board exam tips for parents",
      "class 10 class 12 exam support",
      "parenting during board exams",
      "student exam stress tips"
    ],
    content: [
      {
        heading: "Create a stable, distraction-free study environment",
        paragraphs: [
          "The physical environment at home has a direct impact on study quality. A dedicated study space — even a corner of a room — signals to the brain that this time is for focused work. Minimising noise, keeping phones away during study blocks, and ensuring good lighting all contribute to better concentration.",
          "Parents can support this by keeping household routines predictable during exam months. Meals at consistent times, reduced screen noise in shared spaces, and respecting study blocks without frequent interruptions make a genuine difference to a student's focus."
        ]
      },
      {
        heading: "Focus on consistency, not just marks",
        paragraphs: [
          "When parents measure their child's progress only by test scores, it creates pressure that often leads to anxiety rather than better performance. A more effective approach is to notice and appreciate consistent effort — whether that is sticking to a study schedule, asking doubts regularly, or completing revision without being reminded.",
          "Board results are important, but the habits built during board preparation last far longer. Students who feel supported rather than monitored tend to study more honestly and handle exam pressure better."
        ]
      },
      {
        heading: "Watch for signs of exam stress and act early",
        paragraphs: [
          "Board exam anxiety is real and common. Signs include sleep changes, loss of appetite, irritability, excessive self-doubt, or suddenly spending more time on distractions. These are not signs of laziness — they are signs that the student needs support.",
          "The most helpful response is calm conversation rather than advice. Ask open questions, listen without immediately offering solutions, and remind your child that you value them beyond their results. Sometimes a short walk, a break from studying, or a conversation with a trusted teacher can break an anxiety spiral faster than any study session."
        ]
      },
      {
        heading: "Stay involved in the coaching and school process",
        paragraphs: [
          "Parents who stay in touch with teachers and coaching faculty get early signals when a student is falling behind, skipping doubts, or struggling with a particular subject. Regular check-ins do not require hovering — a monthly update from the teacher is enough to stay informed.",
          "When parents and educators are aligned, students feel supported from both sides. They are more likely to ask for help early rather than hiding problems until exams are close. This kind of early intervention consistently leads to better outcomes."
        ]
      }
    ]
  },
  {
    slug: "class-9-10-maths-tips-to-clear-doubts-fast",
    title: "Class 9 & 10 Maths: How to Clear Doubts Faster and Stop Losing Marks",
    author: "Rohan Verma",
    coverImage:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "Common reasons Class 9 and 10 students lose marks in Maths — and a simple system for clearing doubts before they pile up.",
    publishDate: "2026-03-05",
    category: "Mathematics",
    seoTitle: "Class 9 & 10 Maths Tips | Clear Doubts and Score Better in CBSE",
    seoDescription:
      "Struggling with Class 9 or 10 Maths? Learn why doubts pile up and how to clear them faster with a structured approach to CBSE Maths preparation.",
    keywords: [
      "class 9 10 maths tips",
      "cbse maths class 10 doubts",
      "how to improve maths class 10",
      "class 9 maths preparation",
      "maths doubt clearing tips"
    ],
    content: [
      {
        heading: "Why Maths doubts pile up in Class 9 and 10",
        paragraphs: [
          "Class 9 is where school Maths gets significantly harder. Topics like polynomials, coordinate geometry, triangles, and surface areas require understanding of concepts that build on each other. When a student misses or misunderstands one foundational idea, the next chapter becomes confusing — and this compounds chapter after chapter.",
          "Most students do not clear doubts immediately because they either feel embarrassed to ask, do not know how to frame the question, or believe they will figure it out later. By the time boards arrive, a backlog of small confusions has become a major problem."
        ]
      },
      {
        heading: "The 24-hour doubt rule",
        paragraphs: [
          "One of the simplest and most effective habits in Maths is the 24-hour doubt rule: any concept or problem that confuses you must be addressed within 24 hours. This means writing the doubt down specifically, attempting it once more independently, and then asking a teacher, classmate, or using a resource to resolve it.",
          "The specificity matters. Instead of writing 'I don't understand triangles', write 'I don't understand why the exterior angle equals the sum of two non-adjacent interior angles.' A specific question gets a useful answer. A vague one gets a vague explanation."
        ]
      },
      {
        heading: "Practice in layers, not in one long session",
        paragraphs: [
          "Maths improves through spaced repetition — solving related problems across multiple days rather than completing an entire chapter in one sitting. After learning a new concept, solve 5 to 8 problems that day. Revisit the same topic in 2 days. Then again in a week. This spacing locks the method into memory far more reliably.",
          "Long single sessions often create false confidence. You solve problems successfully while the method is fresh, but a week later the approach feels unfamiliar. Short, regular practice sessions remove this problem."
        ]
      },
      {
        heading: "Know which chapters carry the most marks",
        paragraphs: [
          "In Class 10 CBSE Maths, chapters like Real Numbers, Polynomials, Triangles, Arithmetic Progressions, Coordinate Geometry, and Trigonometry consistently carry higher weightage. Mastering these thoroughly — including every NCERT example and exercise — gives you a strong foundation for scoring 80 marks out of 80.",
          "This does not mean ignoring other chapters. It means prioritising intelligently. Strong command over high-weightage chapters creates a safety net so that even if you lose a few marks in lower-weightage topics, your total score remains high."
        ]
      }
    ]
  },
  {
    slug: "class-11-science-subject-transition-tips",
    title: "Moving from Class 10 to Class 11 Science: What Students Must Know",
    author: "Dr. Kavya Sharma",
    coverImage:
      "https://images.unsplash.com/photo-1532094349884-543559059a1a?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "The jump from Class 10 to Class 11 Science is one of the most challenging transitions in school. Here is how to handle it without falling behind.",
    publishDate: "2026-02-25",
    category: "Class 11 & 12",
    seoTitle: "Class 10 to Class 11 Science Transition | How to Handle the Jump",
    seoDescription:
      "Understand the Class 10 to Class 11 Science difficulty jump and learn how to prepare for Physics, Chemistry, and Biology in Class 11 CBSE.",
    keywords: [
      "class 11 science tips",
      "class 10 to class 11 transition",
      "class 11 physics chemistry biology",
      "how to study class 11 science",
      "cbse class 11 preparation"
    ],
    content: [
      {
        heading: "Why Class 11 feels so much harder than Class 10",
        paragraphs: [
          "Class 10 Science is largely descriptive — students learn facts, diagrams, and processes. Class 11 Science is analytical — students need to understand why things happen, derive equations, apply concepts to unseen problems, and connect ideas across chapters.",
          "This shift from memory to understanding catches many students off guard. Students who scored 95 in Class 10 Science sometimes struggle to pass Class 11 unit tests in the first month. This is normal, and it happens because the approach they used in Class 10 no longer works."
        ]
      },
      {
        heading: "Physics in Class 11: Mathematics is the language",
        paragraphs: [
          "Class 11 Physics requires strong command over Class 9 and 10 Maths, especially algebra, trigonometry, and coordinate geometry. Concepts like kinematics, laws of motion, and work-energy require equation manipulation that surprises students who expected a Science class to feel like Science.",
          "The solution is to stop treating Physics derivations as things to memorise. Understand where each formula comes from. When you know the logic behind an equation, you can reconstruct it even under exam pressure instead of drawing a blank."
        ]
      },
      {
        heading: "Chemistry in Class 11: Concepts, not just reactions",
        paragraphs: [
          "Many students try to handle Class 11 Chemistry the same way they handled Class 10 — by memorising reactions. This approach fails because Class 11 Chemistry introduces thermodynamics, equilibrium, atomic structure, and chemical bonding, which require genuine conceptual understanding.",
          "Invest extra time in the first four chapters of Class 11 Chemistry. These lay the foundation for almost everything that follows. Students who understand atomic structure and the periodic table deeply find organic chemistry and electrochemistry far easier when they arrive."
        ]
      },
      {
        heading: "Build the habit of asking doubts in the first month itself",
        paragraphs: [
          "The first few weeks of Class 11 set the tone for the entire year. Students who ask doubts early, clear confusion before moving on, and maintain notes consistently find the year manageable. Students who let confusion accumulate find that by November, they are too far behind to recover before annual exams.",
          "Do not wait until you understand everything before asking a doubt. Ask as soon as something confuses you, ideally the same day. The pace in Class 11 is faster than Class 10, so unresolved doubts multiply faster than you expect."
        ]
      }
    ]
  },
  {
    slug: "cbse-class-8-foundation-importance",
    title: "Why Class 8 Is the Most Important Year for Board Exam Success",
    author: "Ananya Iyer",
    coverImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "Class 8 builds the foundation for Class 10 and Class 12 results. Here is why investing in Class 8 is one of the smartest decisions a student can make.",
    publishDate: "2026-02-18",
    category: "Foundation",
    seoTitle: "Why Class 8 Matters for Board Exams | Foundation Coaching for Class 8",
    seoDescription:
      "Discover why Class 8 is the foundation year for Class 10 and Class 12 board success, and how students can build strong basics in Maths and Science.",
    keywords: [
      "class 8 foundation coaching",
      "importance of class 8",
      "class 8 maths science preparation",
      "cbse class 8 tips",
      "foundation year for board exams"
    ],
    content: [
      {
        heading: "Class 8 lays the ground for Class 10 boards",
        paragraphs: [
          "Almost every chapter in Class 9 and 10 Maths and Science has its roots in Class 8. Linear equations, rational numbers, algebraic expressions, mensuration, and basic science concepts introduced in Class 8 are directly extended in Class 9. When the Class 8 foundation is shaky, students find Class 9 unnecessarily difficult.",
          "Students who build strong basics in Class 8 — even if they score average marks — are far better positioned for Class 9 and 10 than students who score high by memorising without understanding. Boards reward understanding, not rote learning."
        ]
      },
      {
        heading: "The right time to fix weak subjects is Class 8",
        paragraphs: [
          "Many parents and students postpone addressing weak subjects until Class 9 or Class 10. By then, the gap is larger, the pace is faster, and the pressure is higher. Class 8 is the ideal time to identify and fix weak areas because the stakes are lower and there is more room to rebuild.",
          "If a student consistently struggles with fractions, algebra, or grammar in Class 8, that struggle will follow them into Class 9 unless it is specifically addressed. Targeted help in Class 8 takes less time and has a longer positive impact than remedial work in Class 10."
        ]
      },
      {
        heading: "Build study habits in Class 8, not Class 10",
        paragraphs: [
          "Good study habits — keeping notes, solving exercises, reviewing regularly, asking doubts — take time to develop. Class 8 is the right time to build these habits because the syllabus allows room for trial and error. Students who develop consistent routines in Class 8 carry those habits into Class 9, 10, 11, and 12.",
          "On the other hand, students who try to suddenly become disciplined in Class 10 find it much harder because they are building habits and preparing for boards at the same time. Starting early is always the better investment."
        ]
      },
      {
        heading: "What a good Class 8 foundation looks like",
        paragraphs: [
          "A solid Class 8 foundation means: fluent handling of NCERT exercises in Maths without needing the solutions guide, clear understanding of core Science processes and definitions, comfort with reading and comprehension in English, and a basic system for organising notes and revision.",
          "Students do not need to be toppers in Class 8. They need to be genuinely clear on the fundamentals. That clarity is what separates students who find Class 9 manageable from those who find it overwhelming — and it is built one chapter at a time starting from Class 8."
        ]
      }
    ]
  }
];

export function getBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
