import Link from "next/link";
import {
  LockKeyhole,
  LogOut,
  Plus
} from "lucide-react";
import { AdminLoginError } from "@/components/admin-login-error";
import { AdminNav, type AdminNavItem } from "@/components/admin-nav";
import { SectionHeading } from "@/components/section-heading";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/admin";
import { loginToAdmin, logoutFromAdmin } from "@/lib/actions";

const sidebarItems: AdminNavItem[] = [
  { href: "/admin", label: "Overview", icon: "dashboard" },
  { href: "/admin/posts", label: "Posts", icon: "posts" },
  { href: "/admin/subscribers", label: "Subscribers", icon: "subscribers" },
  { href: "/admin/volunteers", label: "Volunteers", icon: "volunteers" },
  { href: "/admin/broadcasts", label: "Broadcasts", icon: "broadcasts" },
  { href: "/admin/editor", label: "Editor", icon: "editor" }
];

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <AdminLoginError />
        </div>
      </section>
    );
  }

  return (
    <section className="adminDashboard">
      <aside className="adminSidebar">
        <Link className="adminBrand" href="/">
          <img src="/brand/align-mindset-logo.png" alt="Align Mindset" />
        </Link>
        <AdminNav items={sidebarItems} />
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
          <Link className="primaryButton" href="/admin/editor">
            <Plus size={17} aria-hidden="true" />
            New post
          </Link>
        </header>
        {children}
      </div>
    </section>
  );
}
