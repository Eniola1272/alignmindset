import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { bookBundle, formatNaira } from "@/lib/book-bundle";
import { verifyFlutterwaveTransaction } from "@/lib/flutterwave";
import { createSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book Order",
  description: "Your Align Mindset book bundle order status."
};

type BooksThankYouPageProps = {
  searchParams: Promise<{
    status?: string;
    tx_ref?: string;
    transaction_id?: string;
  }>;
};

export default async function BooksThankYouPage({
  searchParams
}: BooksThankYouPageProps) {
  const params = await searchParams;
  const status = params.status ?? "";
  const txRef = params.tx_ref ?? "";
  const transactionId = params.transaction_id ?? "";
  let verified = false;
  let message =
    "We could not verify this payment yet. If you paid, keep your Flutterwave receipt and contact Align Mindset.";

  if (status === "successful" && txRef && transactionId) {
    const verification = await verifyFlutterwaveTransaction(transactionId);

    if (
      verification.ok &&
      verification.data?.status === "successful" &&
      verification.data.tx_ref === txRef &&
      verification.data.amount === bookBundle.bundlePrice &&
      verification.data.currency === bookBundle.currency
    ) {
      verified = true;
      message =
        "Your payment has been verified. Your book delivery can now be sent to the email used at checkout.";

      const supabase = createSupabaseServerClient();

      if (supabase) {
        await supabase
          .from("book_orders")
          .update({
            flutterwave_transaction_id: String(verification.data.id ?? ""),
            status: "paid",
            verified_at: new Date().toISOString(),
            raw_response: verification.data
          })
          .eq("tx_ref", txRef);
      }
    } else {
      message = verification.message;
    }
  } else if (status === "cancelled") {
    message = "Checkout was cancelled. You can return to the bundle page anytime.";
  }

  return (
    <section className="pageHero booksThankYou">
      <div className="shell booksNarrow">
        <div className="thankYouCard">
          {verified ? (
            <CheckCircle2 size={34} aria-hidden="true" />
          ) : (
            <XCircle size={34} aria-hidden="true" />
          )}
          <span>{verified ? "Payment verified" : "Payment not completed"}</span>
          <h1>
            {verified
              ? "Thank you for getting the bundle."
              : "Your order is not complete yet."}
          </h1>
          <p>{message}</p>
          <div className="thankYouMeta">
            <div>
              <span>Bundle</span>
              <strong>{bookBundle.title}</strong>
            </div>
            <div>
              <span>Amount</span>
              <strong>{formatNaira(bookBundle.bundlePrice)}</strong>
            </div>
            {txRef ? (
              <div>
                <span>Reference</span>
                <strong>{txRef}</strong>
              </div>
            ) : null}
          </div>
          <Link className="primaryButton" href="/books">
            Back to books
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
