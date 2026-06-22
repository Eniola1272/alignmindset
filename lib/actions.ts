"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

export type FormState = {
  ok: boolean;
  message: string;
};

export async function subscribeToNewsletter(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return {
      ok: false,
      message: "Add a valid email so we know where to send the notes."
    };
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      ok: true,
      message:
        "You are on the list locally. Add Supabase keys to store subscribers."
    };
  }

  const { error } = await supabase.from("subscribers").upsert(
    {
      email,
      source: "website",
      subscribed_at: new Date().toISOString()
    },
    { onConflict: "email" }
  );

  if (error) {
    return {
      ok: false,
      message: "Something blocked the signup. Please try again."
    };
  }

  return {
    ok: true,
    message: "You are in. Expect practical notes, not inbox noise."
  };
}
