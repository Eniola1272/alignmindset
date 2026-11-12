import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, XCircle } from "lucide-react";
import { askForHelpBook, formatNaira } from "@/lib/book-bundle";
import { verifyAndFulfillAskForHelpOrder } from "@/lib/book-delivery";
import { createSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ask for Help order",
  description: "Your Ask for Help digital book order."
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
  let downloadUrl: string | null = null;
  let message =
    "We could not verify this payment yet. If you paid, keep your Flutterwave receipt and contact Align Mindset.";

  if (status === "successful" && txRef && transactionId) {
    const fulfillment = await verifyAndFulfillAskForHelpOrder(
      txRef,
      transactionId
    );
    verified = fulfillment.paid;
    downloadUrl = fulfillment.downloadUrl;
    message = fulfillment.message;
  } else if (status === "cancelled") {
    message = "Checkout was cancelled. You can return to the book page when you are ready.";

    if (supabase && txRef) {
      await supabase
        .from("book_orders")
        .update({ status: "cancelled" })
        .eq("tx_ref", txRef)
        .eq("product_slug", askForHelpBook.slug);
    }
  }

  return (
    <section className="askHelpThankYou">
      <div className="container askHelpThankYouCard">
        <div className="askHelpThankYouCover">
          <Image
            src={askForHelpBook.coverImage}
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
          <span>{verified ? "Payment verified" : "Payment not completed"}</span>
          <h1>
            {verified
              ? "Your book is ready."
              : "Your order is not complete yet."}
          </h1>
          <p>{message}</p>
          <dl>
            <div>
              <dt>Book</dt>
              <dd>{askForHelpBook.title}</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>{formatNaira(askForHelpBook.price)}</dd>
            </div>
            {txRef ? (
              <div>
                <dt>Reference</dt>
                <dd>{txRef}</dd>
              </div>
            ) : null}
          </dl>
          <div className="askHelpThankYouActions">
            {downloadUrl ? (
              <a className="primaryButton" href={downloadUrl}>
                <Download size={17} aria-hidden="true" />
                Download your book
              </a>
            ) : null}
            <Link className="btn btn-dark" href="/books/ask-for-help">
              Back to the book
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
