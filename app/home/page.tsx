import { HomePage } from "@/components/layout/home-page";
import { getCourses, STATIC_COURSES } from "@/lib/courses";
import { getTeachers, STATIC_TEACHERS } from "@/lib/teachers";

export default async function HomeRoutePage() {
  const [courses, teachers] = await Promise.all([getCourses(), getTeachers()]);

  return (
    <HomePage
      courses={courses.length ? courses : STATIC_COURSES}
      teachers={teachers.length ? teachers : STATIC_TEACHERS}
    />
  );
}
