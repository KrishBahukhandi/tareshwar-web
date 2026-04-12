import { HomePage } from "@/components/layout/home-page";
import { getCourses, STATIC_COURSES } from "@/lib/courses";
import { getCurrentStudent } from "@/lib/auth-server";
import { getStudentEnrolledCourses } from "@/lib/learning";

export default async function HomeRoutePage() {
  const [courses, student] = await Promise.all([
    getCourses().catch(() => []),
    getCurrentStudent().catch(() => null),
  ]);

  const enrolledCourses = student
    ? await getStudentEnrolledCourses(student.id).catch(() => [])
    : [];

  return (
    <HomePage
      courses={courses.length ? courses : STATIC_COURSES}
      student={student}
      enrolledCourses={enrolledCourses}
    />
  );
}
