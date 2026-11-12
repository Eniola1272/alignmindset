import type { Metadata } from "next";
import { BookOpenCheck, MailCheck, ShoppingBag } from "lucide-react";
import { BookDeliveryAdmin } from "@/components/book-delivery-admin";
import { PendingSubmitButton } from "@/components/pending-submit-button";
import { resendBookDelivery } from "@/lib/actions";
import { askForHelpBook, formatNaira } from "@/lib/book-bundle";
import { isAskForHelpDigitalFileReady } from "@/lib/book-delivery";
import { createSupabaseServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book orders | Admin",
  description: "Manage paid book orders and digital delivery."
};

type AdminBookOrder = {
  id: string;
  tx_ref: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  currency: string;
  status: string;
  delivery_status: string;
  delivery_attempts: number;
  delivery_email_sent_at: string | null;
  download_count: number;
  created_at: string;
};

const deliveryLabels: Record<string, string> = {
  pending: "Waiting",
  awaiting_file: "Needs PDF",
  sending: "Sending",
  sent: "Delivered",
  failed: "Needs attention"
};

export default async function AdminOrdersPage() {
  const supabase = createSupabaseServerClient();
  const [fileReady, orderResult] = await Promise.all([
    isAskForHelpDigitalFileReady(),
    supabase
      ? supabase
          .from("book_orders")
          .select(
            "id, tx_ref, customer_name, customer_email, amount, currency, status, delivery_status, delivery_attempts, delivery_email_sent_at, download_count, created_at"
          )
          .eq("product_slug", askForHelpBook.slug)
          .order("created_at", { ascending: false })
          .limit(100)
          .returns<AdminBookOrder[]>()
      : Promise.resolve({ data: [], error: null })
  ]);
  const orders = orderResult.data ?? [];
  const paidOrders = orders.filter((order) => order.status === "paid");
  const deliveredOrders = orders.filter(
    (order) => order.delivery_status === "sent"
  );
  const revenue = paidOrders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <>
      <section className="adminPanel">
        <div className="panelHeader">
          <div>
            <span>Digital product</span>
            <h2>Ask for Help delivery</h2>
          </div>
          <BookOpenCheck size={24} aria-hidden="true" />
        </div>
        <BookDeliveryAdmin fileReady={fileReady} />
      </section>

      <section className="adminPanel">
        <div className="panelHeader">
          <div>
            <span>Sales</span>
            <h2>Orders and delivery</h2>
          </div>
          <ShoppingBag size={24} aria-hidden="true" />
        </div>

        <div className="orderStats">
          <div><strong>{orders.length}</strong><span>All orders</span></div>
          <div><strong>{paidOrders.length}</strong><span>Paid</span></div>
          <div><strong>{deliveredOrders.length}</strong><span>Delivered</span></div>
          <div><strong>{formatNaira(revenue)}</strong><span>Verified revenue</span></div>
        </div>

        {orderResult.error ? (
          <p className="adminNotice">
            Order delivery columns are missing. Run the latest `supabase/schema.sql`
            in Supabase, then reload this page.
          </p>
        ) : null}

        <div className="adminTableWrap orderTableWrap">
          <table className="adminTable">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Payment</th>
                <th>Delivery</th>
                <th>Downloads</th>
                <th>Ordered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.customer_name}</strong>
                      <small>{order.customer_email}</small>
                    </td>
                    <td>
                      <span className={`orderStatus is-${order.status}`}>
                        {order.status}
                      </span>
                      <small>{formatNaira(order.amount)}</small>
                    </td>
                    <td>
                      <span className={`orderStatus is-${order.delivery_status}`}>
                        {deliveryLabels[order.delivery_status] || order.delivery_status}
                      </span>
                      <small>
                        {order.delivery_email_sent_at
                          ? new Date(order.delivery_email_sent_at).toLocaleString("en-NG")
                          : `${order.delivery_attempts} attempts`}
                      </small>
                    </td>
                    <td>{order.download_count}</td>
                    <td>{new Date(order.created_at).toLocaleDateString("en-NG")}</td>
                    <td>
                      {order.status === "paid" ? (
                        <form action={resendBookDelivery}>
                          <input type="hidden" name="orderId" value={order.id} />
                          <PendingSubmitButton
                            className="secondaryButton orderResendButton"
                            pendingLabel="Sending"
                          >
                            <MailCheck size={15} aria-hidden="true" />
                            Resend
                          </PendingSubmitButton>
                        </form>
                      ) : (
                        <span className="orderMuted">Awaiting payment</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="emptyState">No Ask for Help orders yet.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
