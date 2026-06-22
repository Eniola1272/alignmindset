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
