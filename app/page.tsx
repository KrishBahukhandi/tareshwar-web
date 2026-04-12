import type { Metadata } from "next";

import { HomePage } from "@/components/layout/home-page";
import { getCourses, STATIC_COURSES } from "@/lib/courses";
import { getCurrentStudent } from "@/lib/auth-server";
import { getStudentEnrolledCourses } from "@/lib/learning";
import { buildMetadata } from "@/lib/seo";

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
