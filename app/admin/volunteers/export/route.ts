import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin";
import { createSupabaseServerClient } from "@/lib/supabase";

type VolunteerExportRow = {
  name: string;
  phone: string;
  email: string;
  skills: string;
  motivation: string;
  value_add: string;
  status: string;
  created_at: string;
};

function csvCell(value: string | null | undefined) {
  const safeValue = String(value ?? "");

  return `"${safeValue.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role credentials are missing." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("volunteer_applications")
    .select("name, phone, email, skills, motivation, value_add, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const headers = [
    "Name",
    "Phone",
    "Email",
    "Skills",
    "Motivation",
    "Value add",
    "Status",
    "Applied at"
  ];
  const rows = ((data ?? []) as VolunteerExportRow[]).map((volunteer) => [
    volunteer.name,
    volunteer.phone,
    volunteer.email,
    volunteer.skills,
    volunteer.motivation,
    volunteer.value_add,
    volunteer.status,
    volunteer.created_at
  ]);
  const csv = [
    headers.map(csvCell).join(","),
    ...rows.map((row) => row.map(csvCell).join(","))
  ].join("\n");
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="align-volunteers-${stamp}.csv"`
    }
  });
}
