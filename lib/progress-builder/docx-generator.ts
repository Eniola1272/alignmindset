import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType
} from "docx";
import type { AiPlanOutput } from "./types";

export async function generatePlanDocx(
  participantName: string | null,
  plan: AiPlanOutput
): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Align Mindset Initiative",
            heading: HeadingLevel.HEADING_2
          }),
          new Paragraph({
            text: `90-Day Personal Progress Blueprint: ${plan.recommended_direction.primary_skill}`,
            heading: HeadingLevel.TITLE
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Participant: ${participantName || "Anonymous Participant"} | Date: ${new Date().toLocaleDateString()}`,
                italics: true,
                color: "625F6D"
              })
            ]
          }),
          new Paragraph({ text: "" }),

          // Section 1: Destination
          new Paragraph({
            text: "1. The 90-Day Destination",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: plan.recommended_direction.ninety_day_destination,
                bold: true
              })
            ]
          }),
          new Paragraph({
            text: `Strategic Reason: ${plan.recommended_direction.reason_for_recommendation}`
          }),
          new Paragraph({ text: "" }),

          // Section 2: Daily System
          new Paragraph({
            text: "2. The Daily Progress System",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            text: `• Daily Study: ${plan.daily_system.daily_learning_minutes} minutes | Daily Practice: ${plan.daily_system.daily_practice_minutes} minutes`
          }),
          new Paragraph({
            text: `• Rhythm: ${plan.daily_system.days_per_week} days per week during ${plan.daily_system.preferred_time}`
          }),
          new Paragraph({
            text: `• Location: ${plan.daily_system.preferred_location}`
          }),
          new Paragraph({
            text: `• Emergency Minimum on Busy Days: ${plan.daily_system.minimum_action_on_busy_days}`
          }),
          new Paragraph({
            text: `• Recovery Rule: ${plan.daily_system.recovery_rule}`
          }),
          new Paragraph({ text: "" }),

          // Section 3: Milestones
          new Paragraph({
            text: "3. Project Milestones & Proof of Work",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            text: `• First 24-Hour Action: ${plan.milestones.first_24_hour_action}`
          }),
          new Paragraph({
            text: `• Day 30 Project: ${plan.milestones.day_30_project}`
          }),
          new Paragraph({
            text: `• Day 60 Project: ${plan.milestones.day_60_project}`
          }),
          new Paragraph({
            text: `• Day 90 Capstone: ${plan.milestones.day_90_project}`
          }),
          new Paragraph({
            text: `• Portfolio Destination: ${plan.evidence_and_portfolio.portfolio_location}`
          }),
          new Paragraph({ text: "" }),

          // Section 4: 12-Week Roadmap Table
          new Paragraph({
            text: "4. 12-Week Execution Roadmap",
            heading: HeadingLevel.HEADING_1
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Week", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Primary Focus", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Deliverable", bold: true })] })] })
                ]
              }),
              ...plan.weekly_plan.map(
                (w) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ text: `W${w.week_number}` })] }),
                      new TableCell({
                        children: [
                          new Paragraph({ children: [new TextRun({ text: w.primary_focus, bold: true })] }),
                          new Paragraph({ text: w.learning_target })
                        ]
                      }),
                      new TableCell({ children: [new Paragraph({ text: w.deliverable })] })
                    ]
                  })
              )
            ]
          }),
          new Paragraph({ text: "" }),

          // Section 5: Accountability
          new Paragraph({
            text: "5. Accountability & Distraction Control",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            text: `• Partner: ${plan.accountability.accountability_person} (${plan.accountability.weekly_review_day})`
          }),
          new Paragraph({
            text: `• Evidence Required: ${plan.accountability.evidence_required}`
          }),
          new Paragraph({
            text: `• Missed Commitment Action: ${plan.accountability.response_to_missed_commitments}`
          }),
          new Paragraph({ text: "" }),

          // Disclaimer
          new Paragraph({
            children: [
              new TextRun({
                text: `Disclaimer: ${plan.disclaimer}`,
                italics: true,
                size: 18,
                color: "625F6D"
              })
            ]
          })
        ]
      }
    ]
  });

  return Packer.toBuffer(doc);
}
