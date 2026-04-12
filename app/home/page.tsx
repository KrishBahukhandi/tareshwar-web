import { HomePage } from "@/components/layout/home-page";
import { getCourses, STATIC_COURSES } from "@/lib/courses";

export default async function HomeRoutePage() {
  const courses = await getCourses().catch(() => []);

  return (
    <HomePage
      courses={courses.length ? courses : STATIC_COURSES}
    />
  );
}
