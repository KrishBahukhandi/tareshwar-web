export type Course = {
  id: string;
  title: string;
  teacherName: string;
  teacherPhoto: string;
  teacherExperience: string;
  teacherBio: string;
  lectureCount: number;
  thumbnail: string;
  category: string;
  description: string;
  duration: string;
  format: string;
  learners: string;
  price: string;
  progress: string;
  outcome: string;
  nextClass: string;
  highlights: string[];
  curriculum: {
    subject: string;
    chapters: string[];
    lectures: number;
  }[];
  reviews: {
    name: string;
    role: string;
    rating: number;
    quote: string;
  }[];
};

export type Teacher = {
  name: string;
  initials: string;
  photo: string;
  subject: string;
  bio: string;
  experience: string;
  students: string;
  highlight: string;
};

export const courses: Course[] = [
  {
    id: "class-11-12-pcm",
    title: "Class 11 & 12 PCM Mastery",
    teacherName: "Rohan Verma",
    teacherPhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    teacherExperience: "9 years",
    teacherBio:
      "Rohan specializes in building deep conceptual understanding in Physics and Mathematics, helping Class 11 and 12 students master board-level problems with speed and accuracy.",
    lectureCount: 48,
    thumbnail:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
    category: "Class 11-12",
    description: "A rigorous PCM track with concept-first live classes, weekly tests, and mistake analysis for board exam success.",
    duration: "12 months",
    format: "Live + Recorded",
    learners: "2,400+",
    price: "24,999",
    progress: "89% satisfaction",
    outcome: "Students who want strong board marks and a clear conceptual foundation in Physics, Chemistry, and Maths.",
    nextClass: "Next class: Wednesday, 6:00 PM",
    highlights: [
      "Daily practice problems with faculty walkthroughs",
      "Weekly analytics and chapter-wise progress tracking",
      "Dedicated mentor support for revision planning"
    ],
    curriculum: [
      {
        subject: "Physics",
        chapters: ["Kinematics", "Laws of Motion", "Work, Power and Energy"],
        lectures: 18
      },
      {
        subject: "Chemistry",
        chapters: ["Atomic Structure", "Chemical Bonding", "Thermodynamics"],
        lectures: 15
      },
      {
        subject: "Mathematics",
        chapters: ["Functions", "Calculus Basics", "Coordinate Geometry"],
        lectures: 15
      }
    ],
    reviews: [
      {
        name: "Aarav Mehta",
        role: "Class 12 Student",
        rating: 5,
        quote: "The pace was intense but clear. The weekly analytics helped me spot exactly where I was losing marks."
      },
      {
        name: "Nisha Kulkarni",
        role: "Class 11 Student",
        rating: 5,
        quote: "Physics stopped feeling scary because every concept was broken down into manageable steps."
      }
    ]
  },
  {
    id: "class-9-10-science",
    title: "Class 9 & 10 Science Batch",
    teacherName: "Dr. Kavya Sharma",
    teacherPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    teacherExperience: "11 years",
    teacherBio:
      "Dr. Kavya uses a high-retention teaching style for Science, helping Class 9 and 10 students build strong conceptual clarity and score consistently in board exams.",
    lectureCount: 42,
    thumbnail:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80",
    category: "Class 9-10",
    description: "Chapter-wise Science coaching with live classes, doubt sessions, and mock tests designed for CBSE board results.",
    duration: "10 months",
    format: "Live Intensive",
    learners: "1,800+",
    price: "12,499",
    progress: "4.8 course rating",
    outcome: "A focused pathway for students aiming to improve recall, exam accuracy, and board scores in Science.",
    nextClass: "Next class: Thursday, 5:30 PM",
    highlights: [
      "Chapter-wise revision notes and quick recall sheets",
      "Timed mock tests every weekend with detailed review",
      "Doubt support with quick turnaround"
    ],
    curriculum: [
      {
        subject: "Biology",
        chapters: ["Life Processes", "Control and Coordination", "Reproduction"],
        lectures: 20
      },
      {
        subject: "Chemistry",
        chapters: ["Chemical Reactions", "Acids, Bases and Salts", "Metals and Non-metals"],
        lectures: 12
      },
      {
        subject: "Physics",
        chapters: ["Electricity", "Magnetic Effects", "Light — Reflection and Refraction"],
        lectures: 10
      }
    ],
    reviews: [
      {
        name: "Rahul Singh",
        role: "Class 10 Student",
        rating: 5,
        quote: "The revision notes and doubt support gave me structure when I was struggling with consistency before boards."
      },
      {
        name: "Pooja Deshmukh",
        role: "Parent",
        rating: 4,
        quote: "Very strong Science teaching and mock review sessions that genuinely improved my child's board confidence."
      }
    ]
  },
  {
    id: "boards-excellence",
    title: "Boards Excellence Program",
    teacherName: "Ananya Iyer",
    teacherPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    teacherExperience: "8 years",
    teacherBio:
      "Ananya is known for simplifying board exam strategy, improving answer presentation, and helping students maintain steady study routines.",
    lectureCount: 36,
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    category: "School Success",
    description: "Board-focused coaching with chapter mastery, answer-writing practice, and exam confidence.",
    duration: "6 months",
    format: "Hybrid Schedule",
    learners: "3,100+",
    price: "14,999",
    progress: "95% completion rate",
    outcome: "Ideal for students who want strong school marks without sacrificing conceptual clarity.",
    nextClass: "Next class: Friday, 4:00 PM",
    highlights: [
      "Chapter-wise study plans and printable notes",
      "Teacher-reviewed mock answers and feedback",
      "Parent progress summaries each month"
    ],
    curriculum: [
      {
        subject: "Mathematics",
        chapters: ["Algebra", "Probability", "Calculus"],
        lectures: 12
      },
      {
        subject: "Science",
        chapters: ["Electricity", "Acids and Bases", "Life Processes"],
        lectures: 12
      },
      {
        subject: "Exam Writing",
        chapters: ["Answer Framing", "Time Management", "Revision Strategy"],
        lectures: 12
      }
    ],
    reviews: [
      {
        name: "Saanvi Patel",
        role: "Board Student",
        rating: 5,
        quote: "The answer-writing feedback was the biggest difference. I finally understood how to write for marks."
      },
      {
        name: "Meera Nair",
        role: "Parent",
        rating: 5,
        quote: "The progress summaries made it much easier for us to support our child without creating pressure."
      }
    ]
  }
];

export const teachers: Teacher[] = [
  {
    name: "Dr. Kavya Sharma",
    initials: "KS",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    subject: "Biology Mentor",
    bio: "Known for turning dense chapters into memorable systems and helping students revise with confidence.",
    experience: "11 years",
    students: "6,500+",
    highlight: "Class 9–10 Science specialist"
  },
  {
    name: "Rohan Verma",
    initials: "RV",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    subject: "Physics Faculty",
    bio: "Builds strong fundamentals through intuitive examples, visual explanations, and high-frequency practice.",
    experience: "9 years",
    students: "5,200+",
    highlight: "Class 11–12 Physics & Maths"
  },
  {
    name: "Ananya Iyer",
    initials: "AI",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    subject: "Maths Strategist",
    bio: "Helps students go from hesitation to speed with sharp shortcuts, pattern recognition, and mock drills.",
    experience: "8 years",
    students: "4,100+",
    highlight: "Board toppers mentor"
  }
];

export const testimonials = [
  {
    name: "Saanvi Patel",
    role: "Class 12 Student",
    quote:
      "The dashboard kept me accountable, and the teachers explained every concept until I genuinely understood it. My board scores improved significantly."
  },
  {
    name: "Rahul Singh",
    role: "Class 10 Student",
    quote:
      "I loved how quickly doubts were resolved. The chapter-wise test analysis helped me fix weak topics before the board exams instead of guessing."
  },
  {
    name: "Meera Nair",
    role: "Parent",
    quote:
      "It finally felt like we had real visibility into our child’s progress. The monthly reports and responsive support team made all the difference."
  }
];

export const posts = [
  {
    category: "Study Systems",
    title: "How to Build a Revision Plan That Actually Sticks",
    excerpt: "Create a revision rhythm that balances weak topics, mock tests, and rest without burnout.",
    readTime: "6 min read"
  },
  {
    category: "Parents",
    title: "What Support Looks Like During Exam Season",
    excerpt: "Practical ways families can support student focus without increasing pressure.",
    readTime: "4 min read"
  },
  {
    category: "Motivation",
    title: "Recovering Momentum After a Poor Test Score",
    excerpt: "A simple framework to review mistakes, reset confidence, and plan the next 7 days with clarity.",
    readTime: "5 min read"
  }
];
