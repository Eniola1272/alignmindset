import "server-only";

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

export async function sendVolunteerApplicationNotifications(
  applicant: VolunteerNotificationInput
) {
  const emailWebhookUrl = process.env.VOLUNTEER_EMAIL_WEBHOOK_URL;
  const adminWebhookUrl =
    process.env.VOLUNTEER_ADMIN_NOTIFICATION_WEBHOOK_URL || emailWebhookUrl;
  const applicantWebhookUrl =
    process.env.VOLUNTEER_CONFIRMATION_WEBHOOK_URL || emailWebhookUrl;
  const onboardingUrl = new URL("/volunteer/onboarding", getSiteUrl()).toString();
  const adminEmails = getAdminEmails();
  const jobs: Promise<void>[] = [];

  if (adminWebhookUrl) {
    jobs.push(
      postNotification(adminWebhookUrl, {
        type: "volunteer_application_admin_notification",
        to: adminEmails,
        subject: `New volunteer application from ${applicant.name}`,
        applicant,
        adminUrl: new URL("/admin/volunteers", getSiteUrl()).toString()
      })
    );
  }

  if (applicantWebhookUrl) {
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
