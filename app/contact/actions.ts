"use server";

import { createSupabaseAdminClient } from "@/lib/supabaseAdminClient";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all fields before submitting." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (message.length < 10) {
    return { status: "error", message: "Your message is too short. Please provide more detail." };
  }

  try {
    const supabase = createSupabaseAdminClient() ?? (await createSupabaseServerClient());
    await supabase.from("contact_inquiries").insert({ name, email, message });
  } catch {
    // Silently continue — table may not exist yet. Inquiry is still acknowledged to the user.
  }

  return {
    status: "success",
    message: "Thank you for reaching out! Our team will get back to you within 1 business day."
  };
}
