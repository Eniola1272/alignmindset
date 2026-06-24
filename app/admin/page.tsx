import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Edit3,
  Eye,
  FileText,
  HandHeart,
  Inbox,
  LayoutDashboard,
  ListFilter,
  LockKeyhole,
  LogOut,
  Mail,
  MessageSquareText,
  Plus,
  Trash2,
  UsersRound
} from "lucide-react";
import { AdminEditor } from "@/components/admin-editor";
import { BroadcastForm } from "@/components/broadcast-form";
import { SectionHeading } from "@/components/section-heading";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/admin";
import { getAdminDashboardData } from "@/lib/admin-data";
import {
  deletePost,
  loginToAdmin,
  logoutFromAdmin,
  updateVolunteerStatus
} from "@/lib/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  description: "Private publishing space for Align Mindset Initiative."
};

type AdminPageProps = {
  searchParams: Promise<{
    error?: string;
    deleted?: string;
    edit?: string;
    subscriberQuery?: string;
    subscriberChannel?: string;
    campaign?: string;
    volunteerUpdated?: string;
    volunteerError?: string;
  }>;
};

const sidebarItems = [
  { href: "#overview", label: "Overview", icon: LayoutDashboard },
  { href: "#posts", label: "Posts", icon: FileText },
  { href: "#subscribers", label: "Subscribers", icon: UsersRound },
  { href: "#volunteers", label: "Volunteers", icon: HandHeart },
  { href: "#broadcasts", label: "Broadcasts", icon: Mail },
  { href: "#editor", label: "Editor", icon: Edit3 }
];

const volunteerStatuses = ["new", "contacted", "approved", "declined"] as const;

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const enabled = isAdminEnabled();
  const authenticated = enabled ? await isAdminAuthenticated() : false;

  if (!enabled) {
    return (
      <section className="pageHero">
        <div className="shell adminSetup">
          <SectionHeading
            eyebrow="Admin setup"
            title="Connect Supabase Auth before publishing from the dashboard."
            copy="Add Supabase public keys, create an admin user in Supabase Auth, and set ADMIN_EMAILS to the approved admin email address."
          />
        </div>
      </section>
    );
  }

  if (!authenticated) {
    return (
      <section className="pageHero adminLoginPage">
        <div className="shell adminLoginCard">
          <div className="joinIcon">
            <LockKeyhole size={26} aria-hidden="true" />
          </div>
          <h1>Admin sign in</h1>
          <p>
            Use your approved Align Mindset admin account to open the private
            publishing dashboard.
          </p>
          <form action={loginToAdmin}>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
            <button className="primaryButton">Open dashboard</button>
          </form>
          {params.error ? (
            <p className="adminMessage">
              That account could not be verified for admin access.
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  const dashboard = await getAdminDashboardData();
  const editingPost =
    dashboard.posts.find((post) => post.slug === params.edit) ??
    dashboard.posts.at(0);
  const selectedPost =
    dashboard.posts.find((post) => post.slug === params.edit) ?? undefined;
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
  const selectedCampaign =
    dashboard.campaigns.find((campaign) => campaign.id === params.campaign) ??
    dashboard.campaigns.at(0);

  return (
    <section className="adminDashboard">
      <aside className="adminSidebar">
        <Link className="adminBrand" href="/">
          <img src="/brand/align-mindset-logo.png" alt="Align Mindset" />
        </Link>
        <nav aria-label="Admin navigation">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.href} href={item.href}>
                <Icon size={18} aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </nav>
        <form action={logoutFromAdmin}>
          <button className="secondaryButton adminLogout">
            <LogOut size={17} aria-hidden="true" />
            Sign out
          </button>
        </form>
      </aside>

      <div className="adminContent">
        <header className="adminTopbar">
          <div>
            <span>Private admin</span>
            <h1>Align Mindset dashboard</h1>
          </div>
          <Link className="primaryButton" href="/admin#editor">
            <Plus size={17} aria-hidden="true" />
            New post
          </Link>
        </header>

        {dashboard.error ? (
          <p className="adminNotice">
            {dashboard.error}. If you just updated the schema, rerun the latest
            SQL migration in Supabase.
          </p>
        ) : null}
        {params.deleted ? (
          <p className="adminNotice success">Post deleted.</p>
        ) : null}
        {params.volunteerUpdated ? (
          <p className="adminNotice success">Volunteer status updated.</p>
        ) : null}
        {params.volunteerError ? (
          <p className="adminNotice">
            Volunteer status could not be updated. Please try again.
          </p>
        ) : null}

        <section className="adminPanel" id="overview">
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

        <section className="adminPanel" id="posts">
          <div className="panelHeader">
            <div>
              <span>Posts</span>
              <h2>Manage articles</h2>
            </div>
            <FileText size={24} aria-hidden="true" />
          </div>
          <div className="adminTableWrap">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <strong>{post.title}</strong>
                      <small>{post.slug}</small>
                    </td>
                    <td>
                      <span className={`statusPill status-${post.status}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>{post.category}</td>
                    <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <div className="tableActions">
                        <Link href={`/admin?edit=${post.slug}#editor`}>
                          <Edit3 size={16} aria-hidden="true" />
                          Edit
                        </Link>
                        <Link href={`/blog/preview/${post.slug}`}>
                          <Eye size={16} aria-hidden="true" />
                          Preview
                        </Link>
                        <form action={deletePost}>
                          <input name="id" type="hidden" value={post.id} />
                          <input name="slug" type="hidden" value={post.slug} />
                          <button>
                            <Trash2 size={16} aria-hidden="true" />
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="adminPanel" id="subscribers">
          <div className="panelHeader">
            <div>
              <span>Subscribers</span>
              <h2>People receiving updates</h2>
            </div>
            <Inbox size={24} aria-hidden="true" />
          </div>
          <form className="adminFilters" method="get" action="/admin">
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
            <Link className="textLink adminClearFilter" href="/admin#subscribers">
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
                    <td>
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>
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

        <section className="adminPanel" id="volunteers">
          <div className="panelHeader">
            <div>
              <span>Volunteers</span>
              <h2>Applications and follow-up status</h2>
            </div>
            <HandHeart size={24} aria-hidden="true" />
          </div>
          <div className="adminTableWrap">
            <table className="adminTable wideTable">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Contact</th>
                  <th>Skills and motivation</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.volunteers.map((volunteer) => (
                  <tr key={volunteer.id}>
                    <td>
                      <strong>{volunteer.name}</strong>
                      <small>{volunteer.email}</small>
                    </td>
                    <td>
                      <strong>{volunteer.phone}</strong>
                      <small>{volunteer.email}</small>
                    </td>
                    <td>
                      <details className="tableDetails">
                        <summary>{volunteer.skills}</summary>
                        <p>{volunteer.motivation}</p>
                        <p>{volunteer.valueAdd}</p>
                      </details>
                    </td>
                    <td>
                      <span className={`statusPill status-${volunteer.status}`}>
                        {volunteer.status}
                      </span>
                    </td>
                    <td>{new Date(volunteer.createdAt).toLocaleDateString()}</td>
                    <td>
                      <form className="statusForm" action={updateVolunteerStatus}>
                        <input name="id" type="hidden" value={volunteer.id} />
                        <select name="status" defaultValue={volunteer.status}>
                          {volunteerStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button type="submit">Save</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!dashboard.volunteers.length ? (
              <p className="emptyState tableEmpty">
                No volunteer applications yet.
              </p>
            ) : null}
          </div>
        </section>

        <section className="adminPanel" id="broadcasts">
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
                      <Link href={`/admin?campaign=${campaign.id}#broadcasts`}>
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

        <section className="adminPanel editorPanel" id="editor">
          <div className="panelHeader">
            <div>
              <span>Editor</span>
              <h2>{selectedPost ? `Editing ${selectedPost.title}` : "New article"}</h2>
            </div>
            <Edit3 size={24} aria-hidden="true" />
          </div>
          <AdminEditor key={selectedPost?.id ?? "new"} post={selectedPost} />
          {!selectedPost && editingPost ? (
            <p className="emptyState">
              Select a post above to edit, or start a new article here.
            </p>
          ) : null}
        </section>
      </div>
    </section>
  );
}
