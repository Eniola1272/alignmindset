import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { askForHelpPreorder, formatNaira } from "@/lib/book-bundle";
import { verifyFlutterwaveTransaction } from "@/lib/flutterwave";
import { createSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ask for Help preorder",
  description: "Your Ask for Help preorder status."
};

type AskForHelpThankYouPageProps = {
  searchParams: Promise<{
    status?: string;
    tx_ref?: string;
    transaction_id?: string;
  }>;
};

export default async function AskForHelpThankYouPage({
  searchParams
}: AskForHelpThankYouPageProps) {
  const params = await searchParams;
  const status = params.status ?? "";
  const txRef = params.tx_ref ?? "";
  const transactionId = params.transaction_id ?? "";
  const supabase = createSupabaseServerClient();
  let verified = false;
  let message =
    "We could not verify this preorder yet. If you paid, keep your Flutterwave receipt and contact Align Mindset.";

  if (status === "successful" && txRef && transactionId) {
    const verification = await verifyFlutterwaveTransaction(transactionId);

    if (
      verification.ok &&
      verification.data?.status === "successful" &&
      verification.data.tx_ref === txRef &&
      verification.data.amount === askForHelpPreorder.price &&
      verification.data.currency === askForHelpPreorder.currency
    ) {
      verified = true;
      message =
        "Your preorder is confirmed. We will send release updates and your digital copy to the email used at checkout.";

      if (supabase) {
        await supabase
          .from("book_orders")
          .update({
            flutterwave_transaction_id: String(verification.data.id ?? ""),
            status: "paid",
            verified_at: new Date().toISOString(),
            raw_response: verification.data
          })
          .eq("tx_ref", txRef)
          .eq("product_slug", askForHelpPreorder.slug);
      }
    } else {
      message = verification.message;
    }
  } else if (status === "cancelled") {
    message = "Checkout was cancelled. You can return to the preorder page when you are ready.";

    if (supabase && txRef) {
      await supabase
        .from("book_orders")
        .update({ status: "cancelled" })
        .eq("tx_ref", txRef)
        .eq("product_slug", askForHelpPreorder.slug);
    }
  }

  return (
    <section className="askHelpThankYou">
      <div className="container askHelpThankYouCard">
        <div className="askHelpThankYouCover">
          <Image
            src={askForHelpPreorder.coverImage}
            alt="Ask for Help book cover"
            width={1024}
            height={1536}
            sizes="(max-width: 640px) 42vw, 220px"
          />
        </div>
        <div>
          {verified ? (
            <CheckCircle2 size={34} aria-hidden="true" />
          ) : (
            <XCircle size={34} aria-hidden="true" />
          )}
          <span>{verified ? "Preorder confirmed" : "Payment not completed"}</span>
          <h1>
            {verified
              ? "Your copy is reserved."
              : "Your preorder is not complete yet."}
          </h1>
          <p>{message}</p>
          <dl>
            <div>
              <dt>Book</dt>
              <dd>{askForHelpPreorder.title}</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>{formatNaira(askForHelpPreorder.price)}</dd>
            </div>
            {txRef ? (
              <div>
                <dt>Reference</dt>
                <dd>{txRef}</dd>
              </div>
            ) : null}
          </dl>
          <Link className="btn btn-dark" href="/books/ask-for-help">
            Back to the book
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
