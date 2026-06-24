"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Edit3,
  FileText,
  HandHeart,
  LayoutDashboard,
  Mail,
  UsersRound
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: keyof typeof icons;
};

const icons = {
  dashboard: LayoutDashboard,
  posts: FileText,
  subscribers: UsersRound,
  volunteers: HandHeart,
  broadcasts: Mail,
  editor: Edit3
};

export function AdminNav({ items }: { items: AdminNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation">
      {items.map((item) => {
        const Icon = icons[item.icon];
        const active =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(item.href));

        return (
          <Link className={active ? "active" : undefined} href={item.href} key={item.href}>
            <Icon size={18} aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
