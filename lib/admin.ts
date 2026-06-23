import "server-only";

import { cookies } from "next/headers";
import { createSupabaseAuthClient, hasSupabaseConfig } from "@/lib/supabase";

const accessCookieName = "align_admin_access";
const refreshCookieName = "align_admin_refresh";
const sessionMaxAge = 60 * 60 * 24 * 7;

export function isAdminEnabled() {
  return hasSupabaseConfig() && getAllowedAdminEmails().length > 0;
}

function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email?: string | null) {
  const allowedEmails = getAllowedAdminEmails();

  return Boolean(email && allowedEmails.includes(email.toLowerCase()));
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(accessCookieName)?.value;
  const refreshToken = cookieStore.get(refreshCookieName)?.value;
  const supabase = createSupabaseAuthClient();

  if (!supabase || !accessToken || !refreshToken) {
    return false;
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken
  });

  if (sessionError) {
    return false;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return false;
  }

  return isAllowedAdminEmail(data.user.email);
}

export async function setAdminSession(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge
  };

  cookieStore.set(accessCookieName, accessToken, options);
  cookieStore.set(refreshCookieName, refreshToken, options);
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(accessCookieName);
  cookieStore.delete(refreshCookieName);
}
