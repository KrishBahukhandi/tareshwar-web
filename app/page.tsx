import type { Metadata } from "next";

import { HomePage } from "@/components/layout/home-page";
import { getCourses, STATIC_COURSES } from "@/lib/courses";
import { buildMetadata } from "@/lib/seo";
import { getTeachers, STATIC_TEACHERS } from "@/lib/teachers";

export const metadata: Metadata = buildMetadata({
  title: "Online Coaching for Class 8 to 12 School Students",
  description:
    "Join Tareshwar Tutorials for Class 8 to 12 school coaching with live classes, expert teachers, and structured study programs for CBSE and state board students.",
  keywords: [
    "class 8 online coaching",
    "class 9 coaching",
    "class 10 coaching",
    "class 11 coaching",
    "class 12 coaching",
    "cbse online coaching",
    "school tuition online",
    "board exam preparation"
  ],
  path: "/"
});

export default async function Page() {
  const [courses, teachers] = await Promise.all([getCourses(), getTeachers()]);

  return (
    <HomePage
      courses={courses.length ? courses : STATIC_COURSES}
      teachers={teachers.length ? teachers : STATIC_TEACHERS}
    />
  );
}
