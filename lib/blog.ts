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
    slug: "jee-study-plan-for-beginners",
    title: "JEE Study Plan for Beginners: A 6-Month Strategy That Builds Momentum",
    author: "Rohan Verma",
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "A practical JEE preparation roadmap for beginners covering revision cycles, mock tests, and subject prioritization.",
    publishDate: "2026-03-10",
    category: "JEE Preparation",
    seoTitle: "JEE Study Plan for Beginners | 6-Month Exam Preparation Strategy",
    seoDescription:
      "Learn how to create a realistic JEE study plan for beginners with subject targets, mock test timing, and revision strategy for better scores.",
    keywords: [
      "jee study plan",
      "jee preparation tips",
      "exam preparation strategy",
      "jee beginners guide",
      "how to prepare for jee"
    ],
    content: [
      {
        heading: "Start with a realistic JEE preparation schedule",
        paragraphs: [
          "A strong JEE study plan starts with clarity, not intensity. Many students lose momentum because they copy unrealistic timetables instead of building a schedule that matches their actual school load, current level, and revision capacity.",
          "For most beginners, the first 6 months should focus on concept building, weekly practice, and a predictable revision loop. The goal is not to complete everything quickly. The goal is to understand the core chapters well enough that advanced problem solving becomes easier later."
        ]
      },
      {
        heading: "Divide your week by subject priority",
        paragraphs: [
          "A balanced exam preparation strategy usually works better than focusing on one subject for too long. Allocate your week so that Physics, Chemistry, and Mathematics all appear multiple times, but give extra time to your weakest subject.",
          "Students preparing for JEE often benefit from a weekly structure like concept sessions on weekdays, problem-solving blocks in the evening, and one full mock test plus analysis on the weekend. Test analysis matters as much as test performance because it shows which topics are costing marks repeatedly."
        ]
      },
      {
        heading: "Build revision into the plan from day one",
        paragraphs: [
          "One of the biggest mistakes in JEE preparation is postponing revision until the syllabus feels complete. That usually leads to low retention and high stress. Instead, keep one short revision block every day and one longer review session every week.",
          "If you want better exam outcomes, track questions you got wrong, formulas you forgot, and concepts that still feel unclear. This mistake log becomes one of the most useful revision tools during the final phase of preparation."
        ]
      }
    ]
  },
  {
    slug: "neet-biology-revision-tips",
    title: "NEET Biology Revision Tips: How to Retain More in Less Time",
    author: "Dr. Kavya Sharma",
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "Smart NEET Biology revision methods to improve recall, boost confidence, and avoid last-minute overload before the exam.",
    publishDate: "2026-03-05",
    category: "NEET Preparation",
    seoTitle: "NEET Biology Revision Tips | Improve Recall Before the Exam",
    seoDescription:
      "Discover effective NEET Biology revision tips including active recall, chapter prioritization, and memory-focused exam preparation techniques.",
    keywords: [
      "neet biology revision tips",
      "neet exam preparation",
      "biology revision strategy",
      "how to revise biology for neet",
      "neet study tips"
    ],
    content: [
      {
        heading: "Use active recall instead of passive rereading",
        paragraphs: [
          "NEET Biology contains large volumes of factual information, so passive reading often creates a false sense of confidence. Students feel familiar with the chapter, but they struggle to retrieve the information in a test setting.",
          "Active recall improves retention because it forces the brain to bring information back without depending on the textbook. Short self-quizzes, blank-page summaries, and flashcard review sessions work far better than repeated highlighting."
        ]
      },
      {
        heading: "Prioritize high-yield chapters first",
        paragraphs: [
          "Not all chapters contribute equally to NEET scoring patterns. A smart revision plan begins with high-frequency topics and then expands to moderate-weight chapters once confidence improves.",
          "This does not mean ignoring weak areas. It means creating scoring stability first. When students build momentum with chapters that appear regularly in exams, they gain confidence and reduce revision anxiety."
        ]
      },
      {
        heading: "Link diagrams, terms, and processes together",
        paragraphs: [
          "Biology recall becomes stronger when information is grouped into systems rather than isolated facts. For example, when revising physiology, connect structures, functions, hormones, and related diagrams in one review cycle.",
          "This approach is especially helpful for exam preparation because objective questions often test small links between related facts rather than large conceptual explanations."
        ]
      }
    ]
  },
  {
    slug: "board-exam-time-management-tips",
    title: "Board Exam Time Management Tips That Help Students Score Better",
    author: "Ananya Iyer",
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "Time management tips for board exams covering revision planning, answer-writing rhythm, and last-week preparation priorities.",
    publishDate: "2026-02-28",
    category: "Board Exams",
    seoTitle: "Board Exam Time Management Tips | Better Revision and Writing Strategy",
    seoDescription:
      "Improve board exam performance with practical time management tips for revision, answer writing, and daily study scheduling.",
    keywords: [
      "board exam time management tips",
      "board exam revision tips",
      "study timetable for board exams",
      "how to manage time in exams",
      "board preparation strategy"
    ],
    content: [
      {
        heading: "Plan revision by energy, not only by hours",
        paragraphs: [
          "Students often design board exam schedules around total study hours instead of their best focus windows. That creates long days with weak output. A better system is to place difficult subjects during your strongest concentration periods and lighter revision tasks later in the day.",
          "This small change improves efficiency and makes it easier to stay consistent. Strong board exam performance usually comes from repeatable routines, not occasional long sessions."
        ]
      },
      {
        heading: "Practice answer writing with time limits",
        paragraphs: [
          "Knowing the content is only one part of board exam success. Students also need answer-writing speed, structure, and clarity. Timed writing practice helps build this skill before the actual paper.",
          "When you write under time pressure, you learn how much detail is realistic for each question type. That prevents both overwriting and unfinished sections during the real exam."
        ]
      },
      {
        heading: "Use the final week for consolidation, not panic learning",
        paragraphs: [
          "The last week before a board exam should focus on formulas, summaries, high-probability questions, and previously made errors. Starting entirely new topics too late can reduce confidence without improving marks.",
          "A calm revision system helps students enter the exam with better recall and stronger decision-making. Confidence often improves when the plan is clear and the revision material is already organized."
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
