import type { Metadata } from "next";

import { HomePage } from "@/components/layout/home-page";
import { getCourses } from "@/lib/courses";
import { buildMetadata } from "@/lib/seo";
import { getTeachers } from "@/lib/teachers";

export const metadata: Metadata = buildMetadata({
  title: "Online Coaching for JEE, NEET and Board Exam Preparation",
  description:
    "Join Tareshwar Tutorials for online exam preparation with live classes, expert teachers, structured courses, and study resources for JEE, NEET, and board exams.",
  keywords: [
    "online coaching",
    "jee preparation",
    "neet preparation",
    "board exam coaching",
    "exam preparation platform"
  ],
  path: "/"
});

export default async function Page() {
  const [courses, teachers] = await Promise.all([getCourses(), getTeachers()]);

  return <HomePage courses={courses} teachers={teachers} />;
}
