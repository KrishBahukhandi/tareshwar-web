import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

type StudentProfile = {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
};

export async function getCurrentStudent() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("id, name, email, role")
    .eq("id", session.user.id)
    .single<StudentProfile>();

  if (error || !profile || profile.role !== "student") {
    return null;
  }

  return profile;
}

export async function requireStudent() {
  const student = await getCurrentStudent();

  if (!student) {
    redirect("/login");
  }

  return student;
}
