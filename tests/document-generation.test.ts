import test from "node:test";
import assert from "node:assert/strict";
import { DeterministicMockProvider } from "@/lib/progress-builder/ai-provider";
import { generatePlanPdf } from "@/lib/progress-builder/pdf-generator";
import { generatePlanDocx } from "@/lib/progress-builder/docx-generator";

test("Document Generation: generates valid PDF blueprint with proper binary header", async () => {
  const provider = new DeterministicMockProvider();
  const { plan } = await provider.generatePlan("Amina Bello", {
    target_skill_name: "UI/UX Product Design (Figma)",
    day_30_milestone_project: "Design System & Component Library",
    day_60_milestone_project: "Multi-device Fintech Prototype",
    day_90_capstone_project: "End-to-end B2B SaaS Case Study",
    first_24_hour_action: "Audit 3 fintech onboarding flows in Figma"
  });

  const pdfBytes = await generatePlanPdf("Amina Bello", plan);
  assert.ok(pdfBytes instanceof Uint8Array);
  assert.ok(pdfBytes.length > 1000, "PDF should have significant binary content");

  // PDF magic number check: starts with %PDF-
  const header = String.fromCharCode(...pdfBytes.slice(0, 5));
  assert.equal(header, "%PDF-");
});

test("Document Generation: generates valid DOCX blueprint with ZIP magic bytes", async () => {
  const provider = new DeterministicMockProvider();
  const { plan } = await provider.generatePlan("Chidi Okafor", {
    target_skill_name: "Backend Engineering (Go & PostgreSQL)",
    day_30_milestone_project: "REST API Microservice with Tests",
    day_60_milestone_project: "High-throughput Queue Worker",
    day_90_capstone_project: "Distributed Payment Gateway Simulator",
    first_24_hour_action: "Set up local Go module and Docker container"
  });

  const docxBuffer = await generatePlanDocx("Chidi Okafor", plan);
  assert.ok(Buffer.isBuffer(docxBuffer));
  assert.ok(docxBuffer.length > 1000, "DOCX should have significant content");

  // DOCX files are zip archives starting with 'PK' (0x50, 0x4B)
  assert.equal(docxBuffer[0], 0x50);
  assert.equal(docxBuffer[1], 0x4B);
});
