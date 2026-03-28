import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function mapSupabaseAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Invalid login credentials. Please check your email and password.";
  }

  if (normalized.includes("user already registered")) {
    return "An account with this email already exists.";
  }

  if (normalized.includes("password should be at least")) {
    return "Password is too weak. Use at least 6 characters.";
  }

  if (normalized.includes("password")) {
    return "Password is too weak. Please choose a stronger password.";
  }

  return message;
}

export async function signUpStudent(input: {
  name: string;
  email: string;
  password: string;
}) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        name: input.name,
        role: "student"
      }
    }
  });

  if (error) {
    return { error: mapSupabaseAuthError(error.message) };
  }

  const authUser = data.user;

  if (!authUser) {
    return {
      error: "We could not create your account right now. Please try again."
    };
  }

  const { error: profileError } = await supabase.from("users").upsert(
    {
      id: authUser.id,
      name: input.name,
      email: input.email,
      role: "student"
    },
    { onConflict: "id" }
  );

  if (profileError) {
    return {
      error: "Your account was created, but we could not finish your student profile setup."
    };
  }

  return {
    user: authUser,
    needsEmailVerification: !data.session
  };
}

export async function signInStudent(input: { email: string; password: string }) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase.auth.signInWithPassword(input);

  if (error) {
    return { error: mapSupabaseAuthError(error.message) };
  }

  const userId = data.user?.id;

  if (!userId) {
    return { error: "We could not start your session. Please try again." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError) {
    return {
      error: "We found your account, but could not load your student profile."
    };
  }

  if (profile.role !== "student") {
    await supabase.auth.signOut();
    return {
      error: "This website is for students only. Please use the mobile platform for teacher or admin access."
    };
  }

  await trackAnalyticsEvent({
    userId,
    eventType: "login",
    eventData: {
      email: input.email
    }
  });

  return { user: data.user };
}

export async function signOutStudent() {
  const supabase = createSupabaseBrowserClient();
  await supabase.auth.signOut();
}

export async function resendVerificationEmail(email: string) {
  const supabase = createSupabaseBrowserClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    return { error: mapSupabaseAuthError(error.message) };
  }

  return { success: true };
}

export async function requestPasswordReset(email: string) {
  const supabase = createSupabaseBrowserClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`
  });

  if (error) {
    return { error: mapSupabaseAuthError(error.message) };
  }

  return { success: true };
}
