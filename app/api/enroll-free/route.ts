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

  // Authenticate via Supabase token
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

  // Parse body
  let courseId: string;
  try {
    const body = await request.json();
    courseId = body.courseId;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!courseId) {
    return NextResponse.json(
      { error: "courseId is required" },
      { status: 400, headers: corsHeaders }
    );
  }

  // Check course is free and published
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, price, is_published")
    .eq("id", courseId)
    .maybeSingle();

  if (courseError || !course) {
    return NextResponse.json(
      { error: "Course not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  if (Number(course.price) > 0) {
    return NextResponse.json(
      { error: "This course is not free" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!course.is_published) {
    return NextResponse.json(
      { error: "Course is not published" },
      { status: 400, headers: corsHeaders }
    );
  }

  // Check if already enrolled
  const { data: existing } = await supabase
    .from("enrollments")
    .select("id, student_id, course_id, enrolled_at, progress_percent")
    .eq("student_id", user.id)
    .eq("course_id", courseId)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(existing, { headers: corsHeaders });
  }

  // Enroll the student
  const { data: enrollment, error: enrollError } = await supabase
    .from("enrollments")
    .insert({ student_id: user.id, course_id: courseId })
    .select("id, student_id, course_id, enrolled_at, progress_percent")
    .single();

  if (enrollError) {
    return NextResponse.json(
      { error: "Enrollment failed: " + enrollError.message },
      { status: 500, headers: corsHeaders }
    );
  }

  return NextResponse.json(enrollment, { status: 201, headers: corsHeaders });
}
