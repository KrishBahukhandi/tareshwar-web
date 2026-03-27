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
