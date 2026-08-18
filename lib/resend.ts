import "server-only";

const RESEND_API_BASE = "https://api.resend.com";
const BATCH_SIZE = 100;

export type ResendEmail = {
  to: string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return null;
  }

  return {
    apiKey,
    from,
    defaultReplyTo: process.env.RESEND_REPLY_TO
  };
}

export function isResendConfigured() {
  return Boolean(getResendConfig());
}

function toResendPayload(email: ResendEmail) {
  const config = getResendConfig();

  if (!config) {
    throw new Error("Resend is not configured.");
  }

  return {
    from: config.from,
    to: email.to,
    subject: email.subject,
    html: email.html,
    ...(email.text ? { text: email.text } : {}),
    ...(email.replyTo || config.defaultReplyTo
      ? { reply_to: email.replyTo || config.defaultReplyTo }
      : {})
  };
}

async function postToResend(path: string, body: unknown) {
  const config = getResendConfig();

  if (!config) {
    throw new Error("Resend is not configured.");
  }

  const response = await fetch(`${RESEND_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Resend request failed with ${response.status}: ${errorBody}`
    );
  }

  return response.json() as Promise<unknown>;
}

export async function sendResendEmail(email: ResendEmail) {
  return postToResend("/emails", toResendPayload(email));
}

export async function sendResendBatch(emails: ResendEmail[]) {
  const chunks = [];

  for (let index = 0; index < emails.length; index += BATCH_SIZE) {
    chunks.push(emails.slice(index, index + BATCH_SIZE));
  }

  for (const chunk of chunks) {
    await postToResend("/emails/batch", chunk.map(toResendPayload));
  }
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderMessageHtml(message: string) {
  return message
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map(
      (paragraph) =>
        `<p>${escapeHtml(paragraph).replaceAll("\n", "<br />")}</p>`
    )
    .join("");
}
