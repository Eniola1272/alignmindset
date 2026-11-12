import { NextRequest, NextResponse } from "next/server";
import {
  askForHelpFilePath,
  digitalProductsBucket,
  isValidBookDownloadToken
} from "@/lib/book-delivery";
import { askForHelpBook } from "@/lib/book-bundle";
import { createSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("order") ?? "";
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const supabase = createSupabaseServerClient();

  if (!orderId || !token || !supabase) {
    return NextResponse.json({ error: "Invalid download link." }, { status: 400 });
  }

  const { data: order } = await supabase
    .from("book_orders")
    .select("id, tx_ref, customer_email, status, product_slug, download_count")
    .eq("id", orderId)
    .maybeSingle<{
      id: string;
      tx_ref: string;
      customer_email: string;
      status: string;
      product_slug: string;
      download_count: number;
    }>();

  if (
    !order ||
    order.status !== "paid" ||
    order.product_slug !== askForHelpBook.slug ||
    !isValidBookDownloadToken(order, token)
  ) {
    return NextResponse.json({ error: "This download link is not valid." }, { status: 403 });
  }

  const { data, error } = await supabase.storage
    .from(digitalProductsBucket)
    .createSignedUrl(askForHelpFilePath, 60 * 5, {
      download: "Ask-for-Help-by-Eniola-Aderounmu.pdf"
    });

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { error: "The book file is temporarily unavailable." },
      { status: 503 }
    );
  }

  await supabase
    .from("book_orders")
    .update({
      download_count: (order.download_count || 0) + 1,
      last_downloaded_at: new Date().toISOString()
    })
    .eq("id", order.id);

  return NextResponse.redirect(data.signedUrl);
}
