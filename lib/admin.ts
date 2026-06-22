import "server-only";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";

const adminCookieName = "align_admin";

export function isAdminEnabled() {
  return Boolean(process.env.ADMIN_SECRET);
}

function getAdminToken() {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return "";
  }

  return createHash("sha256").update(secret).digest("hex");
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(adminCookieName)?.value === getAdminToken();
}

export async function setAdminCookie() {
  const cookieStore = await cookies();

  cookieStore.set(adminCookieName, getAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}
