import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { askForHelpBook, formatNaira } from "@/lib/book-bundle";
import { verifyFlutterwaveTransaction } from "@/lib/flutterwave";
import { escapeHtml, isResendConfigured, sendResendEmail } from "@/lib/resend";
import { site } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase";

export const digitalProductsBucket = "digital-products";
export const askForHelpFilePath = "ask-for-help/ask-for-help.pdf";

type BookOrder = {
  id: string;
  tx_ref: string;
  customer_name: string;
  customer_email: string;
  product_slug: string;
  amount: number;
  currency: string;
  status: string;
  delivery_status: string;
  delivery_attempts: number;
  delivery_email_sent_at: string | null;
};

export type BookFulfillmentResult = {
  ok: boolean;
  paid: boolean;
  delivered: boolean;
  downloadUrl: string | null;
  message: string;
};

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");
}

function getDeliverySecret() {
  return (
    process.env.BOOK_DELIVERY_SECRET ||
    process.env.FLUTTERWAVE_SECRET_KEY ||
    process.env.FLW_SECRET_KEY ||
    null
  );
}

function createDownloadToken(order: Pick<BookOrder, "id" | "tx_ref" | "customer_email">) {
  const secret = getDeliverySecret();

  if (!secret) {
    return null;
  }

  return createHmac("sha256", secret)
    .update(`${order.id}:${order.tx_ref}:${order.customer_email.toLowerCase()}`)
    .digest("base64url");
}

export function isValidBookDownloadToken(
  order: Pick<BookOrder, "id" | "tx_ref" | "customer_email">,
  suppliedToken: string
) {
  const expectedToken = createDownloadToken(order);

  if (!expectedToken || !suppliedToken) {
    return false;
  }

  const expected = Buffer.from(expectedToken);
  const supplied = Buffer.from(suppliedToken);

  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}

export function getBookDownloadUrl(
  order: Pick<BookOrder, "id" | "tx_ref" | "customer_email">
) {
  const token = createDownloadToken(order);

  if (!token) {
    return null;
  }

  const url = new URL("/api/books/ask-for-help/download", getSiteUrl());
  url.searchParams.set("order", order.id);
  url.searchParams.set("token", token);
  return url.toString();
}

export async function isAskForHelpDigitalFileReady() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase.storage
    .from(digitalProductsBucket)
    .list("ask-for-help", {
      limit: 10,
      search: "ask-for-help.pdf"
    });

  return !error && Boolean(data?.some((file) => file.name === "ask-for-help.pdf"));
}

function renderDeliveryEmail(name: string, downloadUrl: string) {
  const logoUrl = `${getSiteUrl()}/brand/align-mindset-logo.png`;

  return `
    <div style="margin:0;background:#f5f2e9;padding:32px 16px;font-family:Arial,sans-serif;color:#1e2a22">
      <div style="max-width:620px;margin:0 auto;border:1px solid #ded9cb;background:#ffffff">
        <div style="padding:24px 28px;border-bottom:1px solid #ded9cb">
          <img src="${escapeHtml(logoUrl)}" alt="Align Mindset" width="180" style="display:block;max-width:180px;height:auto" />
        </div>
        <div style="padding:36px 28px">
          <p style="margin:0 0 16px">Hi ${escapeHtml(name)},</p>
          <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:32px;line-height:1.1;font-weight:400">Your copy of Ask for Help is ready.</h1>
          <p style="margin:0 0 24px;line-height:1.7;color:#5f665f">Thank you for your purchase. Use the button below to download your digital edition. This order link is personal to you, so please keep it private.</p>
          <p style="margin:0 0 26px">
            <a href="${escapeHtml(downloadUrl)}" style="display:inline-block;background:#d8a327;color:#171717;text-decoration:none;padding:14px 22px;font-weight:700">Download Ask for Help</a>
          </p>
          <div style="border-top:1px solid #ded9cb;padding-top:18px;color:#6b716b;font-size:13px;line-height:1.7">
            <strong style="color:#1e2a22">Order summary</strong><br />
            Ask for Help, digital PDF<br />
            Amount paid: ${escapeHtml(formatNaira(askForHelpBook.price))}
          </div>
          <p style="margin:26px 0 0;color:#6b716b;font-size:13px;line-height:1.7">If the button does not work, reply to this email and we will help you.</p>
        </div>
        <div style="padding:18px 28px;background:#1e2a22;color:#d8a327;font-size:12px">Align Mindset Initiative</div>
      </div>
    </div>
  `;
}

async function deliverOrder(order: BookOrder, force = false) {
  const supabase = createSupabaseServerClient();
  const downloadUrl = getBookDownloadUrl(order);

  if (!supabase || !downloadUrl) {
    return {
      delivered: false,
      downloadUrl: null,
      message: "Secure book delivery is not configured yet."
    };
  }

  if (!(await isAskForHelpDigitalFileReady())) {
    await supabase
      .from("book_orders")
      .update({
        delivery_status: "awaiting_file",
        last_delivery_error: "The Ask for Help PDF has not been uploaded."
      })
      .eq("id", order.id);

    return {
      delivered: false,
      downloadUrl: null,
      message: "Payment verified, but the book file is not available yet."
    };
  }

  if (order.delivery_email_sent_at && !force) {
    return {
      delivered: true,
      downloadUrl,
      message: "Payment verified. Your download is ready and has also been emailed to you."
    };
  }

  if (!isResendConfigured()) {
    await supabase
      .from("book_orders")
      .update({
        delivery_status: "failed",
        last_delivery_error: "Resend is not configured."
      })
      .eq("id", order.id);

    return {
      delivered: false,
      downloadUrl,
      message: "Payment verified. Download your book below; the email sender is not configured."
    };
  }

  const claimStatuses = force
    ? ["pending", "awaiting_file", "sending", "sent", "failed"]
    : ["pending", "awaiting_file", "failed"];
  const { data: claimed } = await supabase
    .from("book_orders")
    .update({
      delivery_status: "sending",
      delivery_attempts: (order.delivery_attempts || 0) + 1,
      last_delivery_error: null
    })
    .eq("id", order.id)
    .in("delivery_status", claimStatuses)
    .select("id")
    .maybeSingle();

  if (!claimed && !force) {
    return {
      delivered: order.delivery_status === "sent",
      downloadUrl,
      message: "Your delivery is already being processed."
    };
  }

  try {
    await sendResendEmail({
      to: [order.customer_email],
      subject: "Your copy of Ask for Help is ready",
      html: renderDeliveryEmail(order.customer_name, downloadUrl),
      text: `Hi ${order.customer_name},\n\nThank you for purchasing Ask for Help. Download your digital copy here:\n${downloadUrl}\n\nThis order link is personal to you.\n\nAlign Mindset Initiative`
    });

    const deliveredAt = new Date().toISOString();
    await supabase
      .from("book_orders")
      .update({
        delivery_status: "sent",
        delivery_email_sent_at: deliveredAt,
        delivered_at: deliveredAt,
        last_delivery_error: null
      })
      .eq("id", order.id);

    return {
      delivered: true,
      downloadUrl,
      message: "Payment verified. Your download is ready and has also been emailed to you."
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delivery email failed.";
    await supabase
      .from("book_orders")
      .update({ delivery_status: "failed", last_delivery_error: message })
      .eq("id", order.id);

    return {
      delivered: false,
      downloadUrl,
      message: "Payment verified. Download your book below; the email is being retried."
    };
  }
}

export async function verifyAndFulfillAskForHelpOrder(
  txRef: string,
  transactionId: string
): Promise<BookFulfillmentResult> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, paid: false, delivered: false, downloadUrl: null, message: "Order storage is not configured." };
  }

  const { data: order, error } = await supabase
    .from("book_orders")
    .select("id, tx_ref, customer_name, customer_email, product_slug, amount, currency, status, delivery_status, delivery_attempts, delivery_email_sent_at")
    .eq("tx_ref", txRef)
    .eq("product_slug", askForHelpBook.slug)
    .maybeSingle<BookOrder>();

  if (error || !order) {
    return { ok: false, paid: false, delivered: false, downloadUrl: null, message: "We could not find this order." };
  }

  const verification = await verifyFlutterwaveTransaction(transactionId);
  const paymentIsValid =
    verification.ok &&
    verification.data?.status === "successful" &&
    verification.data.tx_ref === order.tx_ref &&
    Number(verification.data.amount) >= order.amount &&
    verification.data.currency === order.currency;

  if (!paymentIsValid || !verification.data) {
    return {
      ok: false,
      paid: false,
      delivered: false,
      downloadUrl: null,
      message: verification.message || "Payment verification failed."
    };
  }

  await supabase
    .from("book_orders")
    .update({
      flutterwave_transaction_id: String(verification.data.id ?? transactionId),
      status: "paid",
      verified_at: new Date().toISOString(),
      raw_response: verification.data
    })
    .eq("id", order.id);

  const delivery = await deliverOrder({ ...order, status: "paid" });

  return {
    ok: true,
    paid: true,
    delivered: delivery.delivered,
    downloadUrl: delivery.downloadUrl,
    message: delivery.message
  };
}

export async function deliverPendingAskForHelpOrders() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return { sent: 0, failed: 0 };
  }

  const { data: orders } = await supabase
    .from("book_orders")
    .select("id, tx_ref, customer_name, customer_email, product_slug, amount, currency, status, delivery_status, delivery_attempts, delivery_email_sent_at")
    .eq("product_slug", askForHelpBook.slug)
    .eq("status", "paid")
    .is("delivery_email_sent_at", null)
    .limit(100)
    .returns<BookOrder[]>();

  let sent = 0;
  let failed = 0;

  for (const order of orders ?? []) {
    const result = await deliverOrder(order);
    result.delivered ? sent++ : failed++;
  }

  return { sent, failed };
}

export async function resendAskForHelpDelivery(orderId: string) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return false;
  }

  const { data: order } = await supabase
    .from("book_orders")
    .select("id, tx_ref, customer_name, customer_email, product_slug, amount, currency, status, delivery_status, delivery_attempts, delivery_email_sent_at")
    .eq("id", orderId)
    .eq("product_slug", askForHelpBook.slug)
    .eq("status", "paid")
    .maybeSingle<BookOrder>();

  if (!order) {
    return false;
  }

  return (await deliverOrder(order, true)).delivered;
}
