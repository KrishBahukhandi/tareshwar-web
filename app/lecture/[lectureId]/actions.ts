"use server";

import { requireStudent } from "@/lib/auth-server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

function firstRelation<T>(value: T | T[] | null | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

export async function saveLectureProgress(input: {
  lectureId: string;
  watchedSeconds: number;
  completed: boolean;
}) {
  const student = await requireStudent();
  const supabase = await createSupabaseServerClient();

  const { data: lectureRow } = await supabase
    .from("lectures")
    .select("id, chapter:chapters(subject:subjects(course_id))")
    .eq("id", input.lectureId)
    .maybeSingle();

  const chapter = firstRelation(lectureRow?.chapter);
  const subject = firstRelation(chapter?.subject);
  const courseId = subject?.course_id;

  if (!courseId) {
    throw new Error("Lecture course could not be determined.");
  }

  const { data: enrollmentRows } = await supabase
    .from("enrollments")
    .select("id, batch:batches(id, course_id)")
    .eq("student_id", student.id);

  const matchingEnrollment = (enrollmentRows ?? []).find((entry) => {
    const batch = firstRelation(entry.batch);

    return batch?.course_id === courseId;
  });

  if (!matchingEnrollment) {
    throw new Error("You are not enrolled in this course.");
  }

  const { data: existingProgress } = await supabase
    .from("watch_progress")
    .select("id")
    .eq("student_id", student.id)
    .eq("lecture_id", input.lectureId)
    .maybeSingle();

  if (existingProgress) {
    await supabase
      .from("watch_progress")
      .update({
        watched_seconds: Math.max(0, Math.floor(input.watchedSeconds)),
        completed: input.completed,
        updated_at: new Date().toISOString()
      })
      .eq("id", existingProgress.id);
  } else {
    await supabase.from("watch_progress").insert({
      student_id: student.id,
      lecture_id: input.lectureId,
      watched_seconds: Math.max(0, Math.floor(input.watchedSeconds)),
      completed: input.completed
    });
  }

  const { data: subjectRows } = await supabase.from("subjects").select("id").eq("course_id", courseId);
  const subjectIds = (subjectRows ?? []).map((subject) => subject.id);
  const { data: chapterRows } = subjectIds.length
    ? await supabase.from("chapters").select("id").in("subject_id", subjectIds)
    : { data: [] as { id: string }[] };
  const chapterIds = (chapterRows ?? []).map((chapter) => chapter.id);
  const { data: lectureRows } = chapterIds.length
    ? await supabase.from("lectures").select("id").in("chapter_id", chapterIds)
    : { data: [] as { id: string }[] };
  const lectureIds = (lectureRows ?? []).map((lecture) => lecture.id);
  const totalLectures = lectureIds.length;

  const { data: completedRows } = lectureIds.length
    ? await supabase
        .from("watch_progress")
        .select("id")
        .eq("student_id", student.id)
        .eq("completed", true)
        .in("lecture_id", lectureIds)
    : { data: [] as { id: string }[] };

  const progressPercent = totalLectures
    ? (Number((completedRows ?? []).length) / totalLectures) * 100
    : 0;

  await supabase
    .from("enrollments")
    .update({
      progress_percent: progressPercent
    })
    .eq("id", matchingEnrollment.id);

  return {
    success: true,
    progressPercent
  };
}
