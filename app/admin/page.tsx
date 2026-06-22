import type { Metadata } from "next";
import { LockKeyhole, LogOut } from "lucide-react";
import { AdminEditor } from "@/components/admin-editor";
import { SectionHeading } from "@/components/section-heading";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/admin";
import { loginToAdmin, logoutFromAdmin } from "@/lib/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  description: "Private publishing space for Align Mindset Initiative."
};

type AdminPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

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
            title="Add an admin secret before publishing from the dashboard."
            copy="Set ADMIN_SECRET in your environment, restart the app, then return to this page."
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
            Use your private admin secret to open the Align Mindset publishing
            dashboard.
          </p>
          <form action={loginToAdmin}>
            <label htmlFor="secret">Admin secret</label>
            <input id="secret" name="secret" type="password" required />
            <button className="primaryButton">Open dashboard</button>
          </form>
          {params.error ? (
            <p className="adminMessage">That secret did not match.</p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="pageHero adminPage">
      <div className="shell splitHeader">
        <SectionHeading
          eyebrow="Private admin"
          title="Write, shape, and publish articles."
          copy="Compose articles in blocks, add media, save drafts, and publish directly to Supabase."
        />
        <form action={logoutFromAdmin}>
          <button className="secondaryButton">
            <LogOut size={17} aria-hidden="true" />
            Sign out
          </button>
        </form>
      </div>
      <div className="shell">
        <AdminEditor />
      </div>
    </section>
  );
}
