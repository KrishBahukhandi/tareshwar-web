import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

// Handles the Supabase email-verification redirect.
// Supabase appends ?code=... (PKCE flow) to the emailRedirectTo URL.
// We exchange it for a session, then send the user to login with a
// ?verified=true flag so the login page can show a success banner.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Sign the user out immediately — they should log in explicitly.
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/login?verified=true`);
    }
  }

  // Expired or invalid link — send back to verify-email with an error flag.
  return NextResponse.redirect(
    `${origin}/verify-email?error=invalid_link`
  );
}
