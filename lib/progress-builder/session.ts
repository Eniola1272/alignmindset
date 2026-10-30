import { cookies } from "next/headers";
import crypto from "crypto";

export const SESSION_TOKEN_COOKIE = "align_pb_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function getOrCreateAnonymousToken(): Promise<{
  token: string;
  tokenHash: string;
  isNew: boolean;
}> {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(SESSION_TOKEN_COOKIE)?.value;

  if (existingToken && existingToken.length >= 32) {
    return {
      token: existingToken,
      tokenHash: hashToken(existingToken),
      isNew: false
    };
  }

  const newToken = generateSecureToken();
  const tokenHash = hashToken(newToken);

  cookieStore.set(SESSION_TOKEN_COOKIE, newToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE
  });

  return {
    token: newToken,
    tokenHash,
    isNew: true
  };
}

export async function getExistingTokenHash(): Promise<string | null> {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(SESSION_TOKEN_COOKIE)?.value;
  if (!existingToken) return null;
  return hashToken(existingToken);
}
