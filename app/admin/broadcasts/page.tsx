import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BroadcastForm } from "@/components/broadcast-form";
import type { AdminCampaign } from "@/lib/admin-data";
import { getAdminDashboardData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

type BroadcastsPageProps = {
  searchParams: Promise<{
    campaign?: string;
  }>;
};

const statusLabels: Record<string, { label: string; tone: string }> = {
  sent_to_resend: { label: "Sent via Resend", tone: "success" },
  sent_to_webhook: { label: "Sent to webhook", tone: "success" },
  queued_for_send: { label: "Queued", tone: "neutral" },
  saved_no_provider: { label: "Saved only", tone: "warning" },
  no_recipients: { label: "No recipients", tone: "warning" },
  resend_failed: { label: "Resend failed", tone: "error" },
  webhook_failed: { label: "Webhook failed", tone: "error" },
  webhook_error: { label: "Webhook failed", tone: "error" },
  draft: { label: "Draft", tone: "neutral" }
};

function getStatusMeta(status: string) {
  return (
    statusLabels[status] ?? {
      label: status
        .split("_")
        .filter(Boolean)
        .map((word) => word[0]?.toUpperCase() + word.slice(1))
        .join(" "),
      tone: "neutral"
    }
  );
}

function getProviderLabel(provider: string) {
  const normalized = provider.toLowerCase();

  if (normalized === "resend") {
    return "Resend";
  }

  if (normalized === "webhook") {
    return "Webhook";
  }

  return "No sender";
}

function getChannelLabel(channel: AdminCampaign["channel"]) {
  return channel === "sms" ? "SMS" : "Newsletter";
}

export default async function AdminBroadcastsPage({
  searchParams
}: BroadcastsPageProps) {
  const params = await searchParams;
  const dashboard = await getAdminDashboardData();
  const selectedCampaign =
    dashboard.campaigns.find((campaign) => campaign.id === params.campaign) ??
    dashboard.campaigns.at(0);
  const selectedStatus = selectedCampaign
    ? getStatusMeta(selectedCampaign.status)
    : null;
  const emailConnected = Boolean(
    process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL
  );
  const smsConnected = Boolean(process.env.BROADCAST_WEBHOOK_URL);

  return (
    <section className="adminPanel">
      <div
        className="broadcastConnectionStrip"
        aria-label="Broadcast connection status"
      >
        <span className={emailConnected ? "isConnected" : "isMissing"}>
          Newsletter: {emailConnected ? "Resend connected" : "No email sender"}
        </span>
        <span className={smsConnected ? "isConnected" : "isMissing"}>
          SMS: {smsConnected ? "Webhook connected" : "No SMS sender"}
        </span>
      </div>
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
              dashboard.campaigns.map((campaign) => {
                const status = getStatusMeta(campaign.status);
                const isSelected = campaign.id === selectedCampaign?.id;

                return (
                  <article
                    className={isSelected ? "isSelected" : ""}
                    key={campaign.id}
                  >
                    <div>
                      <strong>
                        {campaign.subject || getChannelLabel(campaign.channel)}
                      </strong>
                      <span className={`campaignStatusBadge is-${status.tone}`}>
                        {status.label}
                      </span>
                    </div>
                    <p>{campaign.message}</p>
                    <small>
                      {getChannelLabel(campaign.channel)} ·{" "}
                      {getProviderLabel(campaign.provider)} ·{" "}
                      {campaign.recipientCount} recipients ·{" "}
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </small>
                    <Link href={`/admin/broadcasts?campaign=${campaign.id}`}>
                      View log
                    </Link>
                  </article>
                );
              })
            ) : (
              <p className="emptyState">No campaigns yet.</p>
            )}
          </div>
          {selectedCampaign && selectedStatus ? (
            <article className="campaignDetail">
              <span>Selected campaign</span>
              <h3>
                {selectedCampaign.subject ||
                  getChannelLabel(selectedCampaign.channel)}
              </h3>
              <dl>
                <div>
                  <dt>Channel</dt>
                  <dd>{getChannelLabel(selectedCampaign.channel)}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>
                    <span
                      className={`campaignStatusBadge is-${selectedStatus.tone}`}
                    >
                      {selectedStatus.label}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>Provider</dt>
                  <dd>{getProviderLabel(selectedCampaign.provider)}</dd>
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
