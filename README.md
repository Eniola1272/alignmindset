# Align Mindset Initiative

A clean, educational, playful website and blogging system for Align Mindset Initiative.

Align Mindset helps people align identity, systems, skills, and daily action so they can grow with purpose, create long-term value, and live beyond survival mode.

## Stack

- Next.js App Router
- TypeScript
- Supabase-ready content backend
- Seed article fallback for local development

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env`.
4. Add your Supabase URL and keys.
5. Restart the dev server.

The app falls back to local seed articles until Supabase is configured.

## Content Workflow

- Draft article ideas from `/editorial`.
- Publish articles in Supabase with `status = 'published'`.
- Use the blog categories as the editorial lanes:
  - Identity
  - Systems
  - Skills
  - Action
  - Assets
  - Community

The recommended publishing rhythm is two useful articles per week: one mindset/systems essay and one practical guide members can act on immediately.

## AMI 90-Day Progress Builder

The **AMI 90-Day Progress Builder** turns participant confusion into an individualized 12-week development roadmap covering learning, skills, daily systems, proof-of-work projects, and accountability.

### Key Routes
- `/progress-builder` - Public landing page & 10-step intake assessment wizard with debounced autosave and exit warning modal.
- `/dashboard/progress-plan` - Participant dashboard showing draft status, under-review status, or active released 12-week blueprint.
- `/admin/progress-assessments` - Admin submissions table, completion metrics, and review mode settings.
- `/admin/progress-assessments/[id]` - Submission detail view: full submitted intake answers, generated AI plan, in-place JSON/notes editor, and release action.
- `/api/progress-builder/document/[id]?format=pdf|docx|json` - Downloadable branded PDF, DOCX, or JSON documents.

### Architecture & Capabilities
1. **Intake Assessment Wizard:**
   - 10 structured sections (61 questions) stored as schema data with conditional visibility logic (`lib/progress-builder/questions.ts`).
   - Debounced autosave (1.5 seconds) ensuring no work is lost.
   - Dual-layer exit warning: in-app branded confirmation modal plus browser `beforeunload` when unsaved changes exist.
   - Anonymous session persistence via secure cryptographic token (`align_pb_token` cookie) hashed with SHA-256 before database storage.
2. **AI Provider Abstraction:**
   - Supports OpenAI (`OPENAI_API_KEY`), Google Gemini (`GEMINI_API_KEY`), Anthropic Claude (`ANTHROPIC_API_KEY`), or built-in Deterministic Mock engine (`DeterministicMockProvider`).
   - Strict 12-week JSON schema validation and retry logic.
   - Versioned system prompt (`AMI_PLAN_SYSTEM_PROMPT`).
3. **Admin Review & Release Workflow:**
   - Mentorship team reviews submitted answers, AI assumptions, and weekly deliverables.
   - Toggle between Mandatory Human Review (default) and Automatic Release.
   - Generates and downloads branded PDF and DOCX blueprints.
4. **Testing Suite:**
   - 14 automated unit, schema, database, document-generation, and end-to-end integration tests.
   - Run tests: `npm test`
   - Run typecheck: `npm run typecheck`

### Phase 2 Recommendations
1. **SMS & WhatsApp Reminder Integration:** Automated weekly Sunday check-in reminders via WhatsApp API or SMS.
2. **Accountability Partner Access:** Allow participants to designate an accountability partner who receives an email with proof-of-progress links.
3. **Milestone Badges:** Digital verifiable credentials for Day 30, Day 60, and Day 90 capstone completion.
4. **Cohort Pairing:** Group participants targeting similar skill tracks into 4-person peer sprints.

