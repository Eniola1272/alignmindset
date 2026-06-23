# Align Mindset Content Plan

## Positioning

Align Mindset Initiative helps people align identity, systems, skills, and disciplined action so they can grow with purpose, create long-term value, and live beyond survival mode.

## Site Sections

- Home: clear organization identity, framework, programs, community rhythm, popular content, newsletter signup.
- Blog: public article library, powered by seed data first and Supabase when configured.
- Article pages: simple educational essays with strong reading flow.
- Editorial: internal-facing article production system and weekly prompt bank.
- Admin: private block editor for writing posts with text, images, quotes, and videos.
- Volunteer: role descriptions for people who want to help run the community.

## Blogging System

Use six content lanes:

- Identity: self-concept, values, purpose, discipline.
- Systems: routines, accountability, environments, weekly reviews.
- Skills: career growth, writing, tech, public speaking, financial literacy.
- Action: execution challenges, reflection, habit building.
- Assets: portfolios, content, projects, services, products.
- Community: WhatsApp prompts, meeting recaps, volunteer culture.

## Weekly Rhythm

- Monday: publish a mindset note or short essay.
- Wednesday: host the live session and capture member questions.
- Friday: share a practical guide, resource, or checklist.
- Weekend: publish the recap and issue an action challenge.

## Article Template

1. Name the problem plainly.
2. Teach one useful idea.
3. Give a practical example.
4. End with one action challenge.
5. Turn the article into three community assets:
   - WhatsApp prompt
   - Quote graphic
   - Meeting discussion question

## Backend Recommendation

Supabase is a good fit for this phase because the project needs:

- Published posts and draft status.
- Rich article bodies stored as JSON blocks.
- Featured images for article cards and article pages.
- Subscriber capture.
- Subscriber overview with email/SMS opt-in fields.
- Newsletter and SMS campaign logging, with optional webhook delivery.
- Article idea collection.
- A private admin dashboard.
- Authentication later for editors and volunteers.

Start simple with the SQL schema in `supabase/schema.sql`. The admin dashboard uses `ADMIN_SECRET` plus the Supabase service role key to save posts securely from the server.
