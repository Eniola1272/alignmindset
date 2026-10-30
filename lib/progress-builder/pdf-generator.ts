import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { AiPlanOutput } from "./types";

export async function generatePlanPdf(
  participantName: string | null,
  plan: AiPlanOutput,
  generatedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Brand colors
  const ink = rgb(0.09, 0.08, 0.13); // #171421
  const green = rgb(0.09, 0.48, 0.26); // #177b42
  const muted = rgb(0.38, 0.37, 0.43); // #625f6d
  const softBg = rgb(0.96, 0.95, 0.92); // #f5f2ea
  const line = rgb(0.87, 0.85, 0.79); // #ded8ca

  let page = doc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const margin = 45;
  const contentWidth = width - margin * 2;
  let cursorY = height - 50;

  function checkNewPage(neededSpace: number) {
    if (cursorY - neededSpace < 50) {
      page = doc.addPage([595.28, 841.89]);
      cursorY = height - 50;
      return true;
    }
    return false;
  }

  function sanitizeForPdf(str: string): string {
    return str
      .replace(/[•●]/g, "- ")
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/[—–]/g, "-")
      .replace(/[^\x20-\x7E\xA0-\xFF\n]/g, "");
  }

  function drawTextWrapped(
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize: number,
    font = fontRegular,
    color = ink,
    lineHeight = fontSize * 1.35
  ): number {
    const cleanText = sanitizeForPdf(text);
    const paragraphs = cleanText.split("\n");
    let currentY = y;

    for (const para of paragraphs) {
      const words = para.split(" ");
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth > maxWidth && currentLine) {
          checkNewPage(lineHeight);
          page.drawText(currentLine, { x, y: currentY, size: fontSize, font, color });
          currentLine = word;
          currentY -= lineHeight;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        checkNewPage(lineHeight);
        page.drawText(currentLine, { x, y: currentY, size: fontSize, font, color });
        currentY -= lineHeight;
      }
    }

    return currentY;
  }

  // --- HEADER ---
  page.drawRectangle({
    x: margin,
    y: cursorY - 32,
    width: contentWidth,
    height: 48,
    color: softBg
  });

  page.drawText("ALIGN MINDSET INITIATIVE", {
    x: margin + 12,
    y: cursorY - 14,
    size: 11,
    font: fontBold,
    color: green
  });

  page.drawText("90-DAY PERSONAL PROGRESS BLUEPRINT", {
    x: margin + 12,
    y: cursorY - 28,
    size: 8,
    font: fontRegular,
    color: muted
  });

  cursorY -= 60;

  // Title
  page.drawText(
    sanitizeForPdf(`Personalized 90-Day Plan: ${plan.recommended_direction.primary_skill}`),
    {
      x: margin,
      y: cursorY,
      size: 16,
      font: fontBold,
      color: ink
    }
  );
  cursorY -= 20;

  page.drawText(
    sanitizeForPdf(`Prepared for: ${participantName || "Valued Participant"} | Date: ${generatedDate}`),
    {
      x: margin,
      y: cursorY,
      size: 9,
      font: fontRegular,
      color: muted
    }
  );
  cursorY -= 25;

  // Divider line
  page.drawLine({
    start: { x: margin, y: cursorY },
    end: { x: width - margin, y: cursorY },
    thickness: 1,
    color: line
  });
  cursorY -= 20;

  // --- SECTION: 90-DAY DESTINATION ---
  page.drawText("1. THE 90-DAY DESTINATION", {
    x: margin,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: green
  });
  cursorY -= 16;

  cursorY = drawTextWrapped(
    plan.recommended_direction.ninety_day_destination,
    margin,
    cursorY,
    contentWidth,
    10,
    fontBold,
    ink
  );
  cursorY -= 10;

  cursorY = drawTextWrapped(
    `Why this path: ${plan.recommended_direction.reason_for_recommendation}`,
    margin,
    cursorY,
    contentWidth,
    9,
    fontRegular,
    muted
  );
  cursorY -= 15;

  // --- SECTION: DAILY SYSTEM & HABITS ---
  checkNewPage(120);
  page.drawText("2. THE DAILY PROGRESS SYSTEM", {
    x: margin,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: green
  });
  cursorY -= 16;

  const sys = plan.daily_system;
  const sysText = [
    `• Daily Allocation: ${sys.daily_learning_minutes}m deliberate study + ${sys.daily_practice_minutes}m applied practice (${sys.days_per_week} days/week)`,
    `• Protected Time Window: ${sys.preferred_time} at ${sys.preferred_location}`,
    `• Emergency Minimum on Busy Days: ${sys.minimum_action_on_busy_days}`,
    `• Non-Negotiable Recovery Rule: ${sys.recovery_rule}`
  ].join("\n");

  cursorY = drawTextWrapped(sysText, margin, cursorY, contentWidth, 9, fontRegular, ink, 14);
  cursorY -= 15;

  // --- SECTION: MILESTONES & CAPSTONES ---
  checkNewPage(140);
  page.drawText("3. MILESTONE PROJECTS & EVIDENCE", {
    x: margin,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: green
  });
  cursorY -= 16;

  const m = plan.milestones;
  const milestonesText = [
    `• First 24-Hour Action: ${m.first_24_hour_action}`,
    `• Day 30 Project: ${m.day_30_project}`,
    `• Day 60 Project: ${m.day_60_project}`,
    `• Day 90 Capstone Project: ${m.day_90_project}`,
    `• Evidence Location: ${plan.evidence_and_portfolio.portfolio_location}`
  ].join("\n");

  cursorY = drawTextWrapped(milestonesText, margin, cursorY, contentWidth, 9, fontRegular, ink, 14);
  cursorY -= 15;

  // --- SECTION: 12-WEEK ROADMAP TABLE ---
  checkNewPage(180);
  page.drawText("4. 12-WEEK EXECUTION ROADMAP", {
    x: margin,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: green
  });
  cursorY -= 18;

  for (const week of plan.weekly_plan) {
    checkNewPage(55);

    // Week header badge
    page.drawRectangle({
      x: margin,
      y: cursorY - 14,
      width: 55,
      height: 16,
      color: softBg
    });

    page.drawText(`WEEK ${week.week_number}`, {
      x: margin + 6,
      y: cursorY - 10,
      size: 8,
      font: fontBold,
      color: green
    });

    page.drawText(sanitizeForPdf(week.primary_focus), {
      x: margin + 65,
      y: cursorY - 10,
      size: 9.5,
      font: fontBold,
      color: ink
    });
    cursorY -= 22;

    const details = `Target: ${week.learning_target} | Deliverable: ${week.deliverable}`;
    cursorY = drawTextWrapped(details, margin + 8, cursorY, contentWidth - 8, 8.5, fontRegular, muted, 11);
    cursorY -= 6;
  }

  cursorY -= 15;

  // --- SECTION: ACCOUNTABILITY & RISKS ---
  checkNewPage(120);
  page.drawText("5. ACCOUNTABILITY & DISTRACTION CONTROL", {
    x: margin,
    y: cursorY,
    size: 12,
    font: fontBold,
    color: green
  });
  cursorY -= 16;

  const acc = plan.accountability;
  const accText = [
    `• Accountability Partner: ${acc.accountability_person} (${acc.weekly_review_day})`,
    `• Evidence Required: ${acc.evidence_required}`,
    `• Action on Missed Commitments: ${acc.response_to_missed_commitments}`
  ].join("\n");

  cursorY = drawTextWrapped(accText, margin, cursorY, contentWidth, 9, fontRegular, ink, 14);
  cursorY -= 20;

  // Closing Encouragement & Disclaimer
  checkNewPage(90);
  cursorY = drawTextWrapped(
    `"${plan.closing_guidance}"`,
    margin,
    cursorY,
    contentWidth,
    9,
    fontOblique,
    ink
  );
  cursorY -= 15;

  cursorY = drawTextWrapped(
    `Disclaimer: ${plan.disclaimer}`,
    margin,
    cursorY,
    contentWidth,
    7.5,
    fontRegular,
    muted,
    10
  );

  return doc.save();
}
