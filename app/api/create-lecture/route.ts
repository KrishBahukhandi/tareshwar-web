import { NextRequest, NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabaseAdminClient";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500, headers: corsHeaders }
    );
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401, headers: corsHeaders }
    );
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401, headers: corsHeaders }
    );
  }

  let body: {
    chapterId: string;
    courseId: string;
    title: string;
    description?: string;
    videoUrl?: string;
    notesUrl?: string;
    durationSeconds?: number;
    isFree?: boolean;
    sortOrder?: number;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!body.chapterId || !body.courseId || !body.title) {
    return NextResponse.json(
      { error: "chapterId, courseId, and title are required" },
      { status: 400, headers: corsHeaders }
    );
  }

  // Verify the teacher owns the course
  const { data: course } = await supabase
    .from("courses")
    .select("teacher_id")
    .eq("id", body.courseId)
    .maybeSingle();

  if (!course || course.teacher_id !== user.id) {
    return NextResponse.json(
      { error: "You do not have permission to manage this course" },
      { status: 403, headers: corsHeaders }
    );
  }

  // Verify the chapter belongs to this course (chapter → subject → course)
  const { data: chapter } = await supabase
    .from("chapters")
    .select("id, subject_id, subjects!inner(course_id)")
    .eq("id", body.chapterId)
    .maybeSingle();

  if (!chapter) {
    return NextResponse.json(
      { error: "Chapter not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  // Insert the lecture (admin client bypasses RLS + PostgREST cache issues)
  const { data: lecture, error: insertError } = await supabase
    .from("lectures")
    .insert({
      chapter_id: body.chapterId,
      title: body.title,
      description: body.description ?? null,
      video_url: body.videoUrl ?? null,
      notes_url: body.notesUrl ?? null,
      duration_seconds: body.durationSeconds ?? null,
      is_free: body.isFree ?? false,
      sort_order: body.sortOrder ?? 0,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to create lecture: " + insertError.message },
      { status: 500, headers: corsHeaders }
    );
  }

  return NextResponse.json(lecture, { status: 201, headers: corsHeaders });
}
