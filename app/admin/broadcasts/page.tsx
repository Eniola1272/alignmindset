import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BroadcastForm } from "@/components/broadcast-form";
import { getAdminDashboardData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

type BroadcastsPageProps = {
  searchParams: Promise<{
    campaign?: string;
  }>;
};

export default async function AdminBroadcastsPage({
  searchParams
}: BroadcastsPageProps) {
  const params = await searchParams;
  const dashboard = await getAdminDashboardData();
  const selectedCampaign =
    dashboard.campaigns.find((campaign) => campaign.id === params.campaign) ??
    dashboard.campaigns.at(0);

  return (
    <section className="adminPanel">
      <div className="adminTwoColumn">
        <BroadcastForm />
        <div>
          <div className="broadcastHeader">
            <MessageSquareText size={22} aria-hidden="true" />
            <div>
              <h2>Campaign history</h2>
              <p>Recent newsletter and SMS updates.</p>
            </div>
          </div>
          <div className="campaignList">
            {dashboard.campaigns.length ? (
              dashboard.campaigns.map((campaign) => (
                <article key={campaign.id}>
                  <div>
                    <strong>{campaign.subject || campaign.channel}</strong>
                    <span>{campaign.status}</span>
                  </div>
                  <p>{campaign.message}</p>
                  <small>
                    {campaign.channel} · {campaign.provider} ·{" "}
                    {campaign.recipientCount} recipients ·{" "}
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </small>
                  <Link href={`/admin/broadcasts?campaign=${campaign.id}`}>
                    View log
                  </Link>
                </article>
              ))
            ) : (
              <p className="emptyState">No campaigns yet.</p>
            )}
          </div>
          {selectedCampaign ? (
            <article className="campaignDetail">
              <span>Selected campaign</span>
              <h3>{selectedCampaign.subject || selectedCampaign.channel}</h3>
              <dl>
                <div>
                  <dt>Channel</dt>
                  <dd>{selectedCampaign.channel}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{selectedCampaign.status}</dd>
                </div>
                <div>
                  <dt>Provider</dt>
                  <dd>{selectedCampaign.provider}</dd>
                </div>
                <div>
                  <dt>Recipients</dt>
                  <dd>{selectedCampaign.recipientCount}</dd>
                </div>
              </dl>
              <p>{selectedCampaign.message}</p>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
