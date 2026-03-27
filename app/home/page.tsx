import { HomePage } from "@/components/layout/home-page";
import { getCourses } from "@/lib/courses";
import { getTeachers } from "@/lib/teachers";

export default async function HomeRoutePage() {
  const [courses, teachers] = await Promise.all([getCourses(), getTeachers()]);

  return <HomePage courses={courses} teachers={teachers} />;
}
