import Link from "next/link";
import { Inbox, ListFilter } from "lucide-react";
import { getAdminDashboardData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

type SubscribersPageProps = {
  searchParams: Promise<{
    subscriberQuery?: string;
    subscriberChannel?: string;
  }>;
};

export default async function AdminSubscribersPage({
  searchParams
}: SubscribersPageProps) {
  const params = await searchParams;
  const dashboard = await getAdminDashboardData();
  const subscriberQuery = (params.subscriberQuery ?? "").trim().toLowerCase();
  const subscriberChannel = params.subscriberChannel ?? "all";
  const filteredSubscribers = dashboard.subscribers.filter((subscriber) => {
    const matchesQuery =
      !subscriberQuery ||
      subscriber.email.toLowerCase().includes(subscriberQuery) ||
      subscriber.name.toLowerCase().includes(subscriberQuery) ||
      subscriber.phone.toLowerCase().includes(subscriberQuery);
    const matchesChannel =
      subscriberChannel === "all" ||
      (subscriberChannel === "newsletter" && subscriber.newsletterOptIn) ||
      (subscriberChannel === "sms" && subscriber.smsOptIn);

    return matchesQuery && matchesChannel;
  });

  return (
    <section className="adminPanel">
      <div className="panelHeader">
        <div>
          <span>Subscribers</span>
          <h2>People receiving updates</h2>
        </div>
        <Inbox size={24} aria-hidden="true" />
      </div>
      <form className="adminFilters" method="get" action="/admin/subscribers">
        <label>
          Search
          <input
            name="subscriberQuery"
            placeholder="Name, email, or phone"
            defaultValue={params.subscriberQuery ?? ""}
          />
        </label>
        <label>
          Channel
          <select name="subscriberChannel" defaultValue={subscriberChannel}>
            <option value="all">All subscribers</option>
            <option value="newsletter">Newsletter</option>
            <option value="sms">SMS</option>
          </select>
        </label>
        <button className="secondaryButton" type="submit">
          <ListFilter size={17} aria-hidden="true" />
          Filter
        </button>
        <Link className="textLink adminClearFilter" href="/admin/subscribers">
          Clear
        </Link>
      </form>
      <div className="adminTableWrap">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Channels</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map((subscriber) => (
              <tr key={subscriber.id}>
                <td>{subscriber.email}</td>
                <td>{subscriber.name || "—"}</td>
                <td>{subscriber.phone || "—"}</td>
                <td>
                  <div className="miniPills">
                    {subscriber.newsletterOptIn ? <span>Email</span> : null}
                    {subscriber.smsOptIn ? <span>SMS</span> : null}
                  </div>
                </td>
                <td>{new Date(subscriber.subscribedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredSubscribers.length ? (
          <p className="emptyState tableEmpty">
            No subscribers match this filter.
          </p>
        ) : null}
      </div>
    </section>
  );
}
