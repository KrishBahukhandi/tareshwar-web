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
    courseId: string;
    name: string;
    sortOrder: number;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!body.courseId || !body.name) {
    return NextResponse.json(
      { error: "courseId and name are required" },
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

  // Insert the subject
  const { data: subject, error: insertError } = await supabase
    .from("subjects")
    .insert({
      course_id: body.courseId,
      name: body.name,
      sort_order: body.sortOrder ?? 0,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to create subject: " + insertError.message },
      { status: 500, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    { ...subject, chapters: [] },
    { status: 201, headers: corsHeaders }
  );
}
