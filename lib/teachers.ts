import { getCourses } from "@/lib/courses";

export type TeacherProfile = {
  id: string;
  name: string;
  avatarUrl: string | null;
  primaryCategory: string;
  courseCount: number;
  totalStudents: number;
};

export async function getTeachers() {
  const courses = await getCourses();
  const teachers = new Map<string, TeacherProfile>();

  for (const course of courses) {
    const current = teachers.get(course.teacherId);

    if (current) {
      current.courseCount += 1;
      current.totalStudents += course.totalStudents;
      continue;
    }

    teachers.set(course.teacherId, {
      id: course.teacherId,
      name: course.teacherName,
      avatarUrl: course.teacherAvatarUrl,
      primaryCategory: course.category,
      courseCount: 1,
      totalStudents: course.totalStudents
    });
  }

  return [...teachers.values()].sort((left, right) => {
    if (right.courseCount !== left.courseCount) {
      return right.courseCount - left.courseCount;
    }

    return right.totalStudents - left.totalStudents;
  });
}

// Static demo teachers — shown when no Supabase data is available
export const STATIC_TEACHERS: TeacherProfile[] = [
  {
    id: "kavya-sharma",
    name: "Dr. Kavya Sharma",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    primaryCategory: "NEET",
    courseCount: 2,
    totalStudents: 6500
  },
  {
    id: "rohan-verma",
    name: "Rohan Verma",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    primaryCategory: "JEE",
    courseCount: 2,
    totalStudents: 5200
  },
  {
    id: "ananya-iyer",
    name: "Ananya Iyer",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    primaryCategory: "Class 12 Boards",
    courseCount: 1,
    totalStudents: 4100
  }
];
