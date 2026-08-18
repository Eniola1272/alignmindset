import "server-only";

import { escapeHtml, isResendConfigured, sendResendEmail } from "@/lib/resend";
import { site } from "@/lib/site";

type VolunteerNotificationInput = {
  name: string;
  phone: string;
  email: string;
  skills: string;
  motivation: string;
  valueAdd: string;
};

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || site.url || "http://localhost:3000";
}

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

async function postNotification(url: string, payload: Record<string, unknown>) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (process.env.VOLUNTEER_EMAIL_WEBHOOK_SECRET) {
    headers.Authorization = `Bearer ${process.env.VOLUNTEER_EMAIL_WEBHOOK_SECRET}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Notification webhook failed with ${response.status}.`);
  }
}

function renderAdminNotificationHtml(
  applicant: VolunteerNotificationInput,
  adminUrl: string
) {
  const rows = [
    ["Name", applicant.name],
    ["Email", applicant.email],
    ["Phone", applicant.phone],
    ["Skills", applicant.skills],
    ["Why they want to volunteer", applicant.motivation],
    ["How they hope to add value", applicant.valueAdd]
  ];

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717">
      <h1 style="font-size:24px;margin:0 0 12px">New volunteer application</h1>
      <p>${escapeHtml(applicant.name)} just applied to volunteer with Align Mindset.</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #eee;padding:10px;font-weight:700;vertical-align:top">${escapeHtml(label)}</td>
                <td style="border:1px solid #eee;padding:10px;vertical-align:top">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <p>
        <a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:#d4a62f;color:#171717;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700">
          Review in admin
        </a>
      </p>
    </div>
  `;
}

function renderApplicantConfirmationHtml(name: string, onboardingUrl: string) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#171717">
      <h1 style="font-size:24px;margin:0 0 12px">We received your volunteer application.</h1>
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for raising your hand to support Align Mindset. We have received your application and will review it carefully.</p>
      <p>While you wait, you can read the volunteer onboarding page so you understand how we think about service, value, and community.</p>
      <p>
        <a href="${escapeHtml(onboardingUrl)}" style="display:inline-block;background:#d4a62f;color:#171717;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700">
          View onboarding page
        </a>
      </p>
      <p style="color:#666">Align Mindset Initiative</p>
    </div>
  `;
}

export async function sendVolunteerApplicationNotifications(
  applicant: VolunteerNotificationInput
) {
  const emailWebhookUrl = process.env.VOLUNTEER_EMAIL_WEBHOOK_URL;
  const adminWebhookUrl =
    process.env.VOLUNTEER_ADMIN_NOTIFICATION_WEBHOOK_URL || emailWebhookUrl;
  const applicantWebhookUrl =
    process.env.VOLUNTEER_CONFIRMATION_WEBHOOK_URL || emailWebhookUrl;
  const onboardingUrl = new URL("/volunteer/onboarding", getSiteUrl()).toString();
  const adminUrl = new URL("/admin/volunteers", getSiteUrl()).toString();
  const adminEmails = getAdminEmails();
  const jobs: Promise<void>[] = [];

  if (isResendConfigured()) {
    if (adminEmails.length) {
      jobs.push(
        sendResendEmail({
          to: adminEmails,
          subject: `New volunteer application from ${applicant.name}`,
          html: renderAdminNotificationHtml(applicant, adminUrl),
          text: `${applicant.name} applied to volunteer.\n\nEmail: ${applicant.email}\nPhone: ${applicant.phone}\nSkills: ${applicant.skills}\n\nMotivation: ${applicant.motivation}\n\nValue add: ${applicant.valueAdd}\n\nReview: ${adminUrl}`,
          replyTo: applicant.email
        }).then(() => undefined)
      );
    }

    jobs.push(
      sendResendEmail({
        to: [applicant.email],
        subject: "We received your Align Mindset volunteer application",
        html: renderApplicantConfirmationHtml(applicant.name, onboardingUrl),
        text: `Hi ${applicant.name},\n\nThank you for applying to volunteer with Align Mindset. We have received your application and will review it carefully.\n\nVolunteer onboarding: ${onboardingUrl}\n\nAlign Mindset Initiative`
      }).then(() => undefined)
    );
  } else if (adminWebhookUrl) {
    jobs.push(
      postNotification(adminWebhookUrl, {
        type: "volunteer_application_admin_notification",
        to: adminEmails,
        subject: `New volunteer application from ${applicant.name}`,
        applicant,
        adminUrl
      })
    );
  }

  if (!isResendConfigured() && applicantWebhookUrl) {
    jobs.push(
      postNotification(applicantWebhookUrl, {
        type: "volunteer_application_confirmation",
        to: [applicant.email],
        subject: "We received your Align Mindset volunteer application",
        applicant: {
          name: applicant.name,
          email: applicant.email
        },
        onboardingUrl,
        sequence: [
          {
            day: 0,
            subject: "Application received",
            purpose: "Confirm the application and share the onboarding page."
          },
          {
            day: 2,
            subject: "How volunteers add value",
            purpose: "Invite them to reflect on skills, availability, and fit."
          },
          {
            day: 5,
            subject: "Next steps",
            purpose: "Prompt the team to contact promising applicants."
          }
        ]
      })
    );
  }

  if (!jobs.length) {
    return;
  }

  const results = await Promise.allSettled(jobs);
  const failed = results.filter((result) => result.status === "rejected");

  if (failed.length) {
    console.error("Volunteer notification failure", failed);
  }
}
