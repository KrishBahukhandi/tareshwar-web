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
    id: "jee-mastery",
    title: "JEE Mastery Program",
    teacherName: "Rohan Verma",
    teacherPhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    teacherExperience: "9 years",
    teacherBio:
      "Rohan specializes in building deep conceptual understanding in physics and helping JEE students improve speed without losing accuracy.",
    lectureCount: 48,
    thumbnail:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
    category: "Competitive Exams",
    description: "A rigorous PCM track with concept-first live classes, weekly tests, and mistake analysis.",
    duration: "12 months",
    format: "Live + Recorded",
    learners: "2,400+",
    price: "24,999",
    progress: "89% satisfaction",
    outcome: "Students targeting top engineering entrances with structured daily practice.",
    nextClass: "Next class: Wednesday, 6:00 PM",
    highlights: [
      "Daily practice problems with faculty walkthroughs",
      "Weekly analytics and rank trend tracking",
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
        role: "JEE Aspirant",
        rating: 5,
        quote: "The pace was intense but clear. The weekly analytics helped me spot exactly where I was losing marks."
      },
      {
        name: "Nisha Kulkarni",
        role: "Class 12 Student",
        rating: 5,
        quote: "Physics stopped feeling scary because every concept was broken down into manageable steps."
      }
    ]
  },
  {
    id: "neet-momentum",
    title: "NEET Momentum Batch",
    teacherName: "Dr. Kavya Sharma",
    teacherPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    teacherExperience: "11 years",
    teacherBio:
      "Dr. Kavya brings a high-retention teaching style for biology and mentors repeaters on recall, revision, and exam confidence.",
    lectureCount: 42,
    thumbnail:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80",
    category: "Medical Entrance",
    description: "High-impact biology, chemistry, and physics preparation for consistent NEET performance.",
    duration: "10 months",
    format: "Live Intensive",
    learners: "1,800+",
    price: "22,499",
    progress: "4.8 course rating",
    outcome: "A focused pathway for students aiming to improve speed, recall, and exam accuracy.",
    nextClass: "Next class: Thursday, 5:30 PM",
    highlights: [
      "Fast-recall revision decks for biology",
      "Timed problem-solving workshops every weekend",
      "Doubt support with quick turnaround"
    ],
    curriculum: [
      {
        subject: "Biology",
        chapters: ["Human Physiology", "Genetics", "Ecology"],
        lectures: 20
      },
      {
        subject: "Chemistry",
        chapters: ["Organic Basics", "Biomolecules", "Equilibrium"],
        lectures: 12
      },
      {
        subject: "Physics",
        chapters: ["Current Electricity", "Optics", "Modern Physics"],
        lectures: 10
      }
    ],
    reviews: [
      {
        name: "Rahul Singh",
        role: "NEET Aspirant",
        rating: 5,
        quote: "The revision decks and doubt support gave me structure when I was struggling with consistency."
      },
      {
        name: "Pooja Deshmukh",
        role: "Repeat Student",
        rating: 4,
        quote: "Very strong biology teaching and mock review sessions that actually improved my test-taking confidence."
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
    highlight: "NEET repeaters specialist"
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
    highlight: "JEE advanced problem solving"
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
      "The dashboard kept me accountable, and the teachers explained concepts until I genuinely understood them."
  },
  {
    name: "Rahul Singh",
    role: "NEET Aspirant",
    quote:
      "I loved how quickly doubts were resolved. The test analysis helped me fix weak chapters instead of guessing."
  },
  {
    name: "Meera Nair",
    role: "Parent",
    quote:
      "It finally felt like we had visibility into our child’s progress. The support team was responsive and warm."
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
