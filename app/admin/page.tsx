import type { Metadata } from "next";
import { BarChart3, SlidersHorizontal } from "lucide-react";
import { PopupSettingControl } from "@/components/popup-setting-control";
import { getAdminDashboardData } from "@/lib/admin-data";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  description: "Private publishing space for Align Mindset Initiative."
};

export default async function AdminOverviewPage() {
  const [dashboard, siteSettings] = await Promise.all([
    getAdminDashboardData(),
    getSiteSettings()
  ]);

  return (
    <>
      {dashboard.error ? (
        <p className="adminNotice">
          {dashboard.error}. If you just updated the schema, rerun the latest SQL
          migration in Supabase.
        </p>
      ) : null}

      <section className="adminPanel">
        <div className="panelHeader">
          <div>
            <span>Overview</span>
            <h2>Community and content health</h2>
          </div>
          <BarChart3 size={24} aria-hidden="true" />
        </div>
        <div className="adminStatsGrid">
          <div>
            <strong>{dashboard.stats.totalPosts}</strong>
            <span>Total posts</span>
          </div>
          <div>
            <strong>{dashboard.stats.publishedPosts}</strong>
            <span>Published</span>
          </div>
          <div>
            <strong>{dashboard.stats.draftPosts}</strong>
            <span>Drafts</span>
          </div>
          <div>
            <strong>{dashboard.stats.subscribers}</strong>
            <span>Subscribers</span>
          </div>
          <div>
            <strong>{dashboard.stats.newsletterSubscribers}</strong>
            <span>Newsletter opt-ins</span>
          </div>
          <div>
            <strong>{dashboard.stats.smsSubscribers}</strong>
            <span>SMS opt-ins</span>
          </div>
          <div>
            <strong>{dashboard.stats.volunteerApplications}</strong>
            <span>Volunteer applications</span>
          </div>
          <div>
            <strong>{dashboard.stats.newVolunteerApplications}</strong>
            <span>New volunteers</span>
          </div>
        </div>
      </section>

      <section className="adminPanel">
        <div className="panelHeader">
          <div>
            <span>Site settings</span>
            <h2>Public website controls</h2>
          </div>
          <SlidersHorizontal size={24} aria-hidden="true" />
        </div>
        <PopupSettingControl enabled={siteSettings.newsletterPopupEnabled} />
      </section>
    </>
  );
}
