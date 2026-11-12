import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { askForHelpFilePath, digitalProductsBucket } from "@/lib/book-delivery";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase server storage is not configured." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase.storage
    .from(digitalProductsBucket)
    .createSignedUploadUrl(askForHelpFilePath, { upsert: true });

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Could not prepare the upload." },
      { status: 500 }
    );
  }

  return NextResponse.json({ path: data.path, token: data.token });
}
