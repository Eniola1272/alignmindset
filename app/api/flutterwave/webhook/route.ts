import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { verifyAndFulfillAskForHelpOrder } from "@/lib/book-delivery";

type FlutterwaveWebhook = {
  event?: string;
  data?: {
    id?: number | string;
    tx_ref?: string;
    status?: string;
  };
};

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET_HASH ?? "";
  const signature = request.headers.get("verif-hash") ?? "";

  if (!secretHash || !signature || !safeEqual(signature, secretHash)) {
    return new NextResponse(null, { status: 401 });
  }

  const payload = (await request.json()) as FlutterwaveWebhook;
  const transactionId = String(payload.data?.id ?? "");
  const txRef = payload.data?.tx_ref ?? "";

  if (
    payload.event === "charge.completed" &&
    payload.data?.status === "successful" &&
    transactionId &&
    txRef.startsWith("AMI-ASK-HELP-")
  ) {
    await verifyAndFulfillAskForHelpOrder(txRef, transactionId);
  }

  return new NextResponse(null, { status: 200 });
}
