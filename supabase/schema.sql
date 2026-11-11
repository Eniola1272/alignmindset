create extension if not exists pgcrypto;

do $$ begin
  create type post_status as enum ('draft', 'review', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type post_category as enum (
    'Identity',
    'Systems',
    'Skills',
    'Action',
    'Assets',
    'Community'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  category post_category not null,
  status post_status not null default 'draft',
  author text not null default 'Align Mindset Team',
  body jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  featured_image_url text,
  category_label text,
  tags text[] not null default '{}',
  meta_title text,
  meta_description text,
  og_image_url text,
  scheduled_for timestamptz,
  read_minutes integer not null default 4 check (read_minutes > 0),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  phone text,
  source text not null default 'website',
  newsletter_opt_in boolean not null default true,
  sms_opt_in boolean not null default false,
  status text not null default 'active',
  subscribed_at timestamptz not null default now()
);

create table if not exists public.broadcast_campaigns (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('newsletter', 'sms')),
  subject text,
  message text not null,
  recipient_count integer not null default 0,
  status text not null default 'draft',
  provider text not null default 'none',
  created_at timestamptz not null default now()
);

create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  skills text not null,
  motivation text not null,
  value_add text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.post_upvotes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  voter_key text not null check (char_length(voter_key) between 16 and 100),
  created_at timestamptz not null default now(),
  unique (post_id, voter_key)
);

create table if not exists public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 3 and 254),
  content text not null check (char_length(content) between 2 and 2000),
  status text not null default 'approved'
    check (status in ('pending', 'approved', 'hidden')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key default 'global' check (id = 'global'),
  newsletter_popup_enabled boolean not null default true,
  newsletter_popup_revision integer not null default 1
    check (newsletter_popup_revision > 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.book_orders (
  id uuid primary key default gen_random_uuid(),
  tx_ref text not null unique,
  flutterwave_transaction_id text,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  product_slug text not null default 'align-mindset-comeback-bundle',
  amount integer not null,
  currency text not null default 'NGN',
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'cancelled')),
  payment_link text,
  raw_response jsonb,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.site_settings (
  id,
  newsletter_popup_enabled,
  newsletter_popup_revision
) values ('global', true, 1)
on conflict (id) do nothing;

alter table public.posts
  add column if not exists featured_image_url text,
  add column if not exists category_label text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists og_image_url text,
  add column if not exists scheduled_for timestamptz;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-images',
  'post-images',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.subscribers
  add column if not exists name text,
  add column if not exists phone text,
  add column if not exists newsletter_opt_in boolean not null default true,
  add column if not exists sms_opt_in boolean not null default false,
  add column if not exists status text not null default 'active';

create table if not exists public.article_ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source text not null default 'community',
  category post_category not null default 'Identity',
  reader_promise text not null,
  status text not null default 'captured',
  created_at timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

create index if not exists posts_category_idx
  on public.posts (category);

create index if not exists volunteer_applications_created_at_idx
  on public.volunteer_applications (created_at desc);

create index if not exists post_upvotes_post_id_idx
  on public.post_upvotes (post_id);

create index if not exists post_comments_post_id_created_at_idx
  on public.post_comments (post_id, created_at desc)
  where status = 'approved';

create index if not exists book_orders_created_at_idx
  on public.book_orders (created_at desc);

create index if not exists book_orders_customer_email_idx
  on public.book_orders (customer_email);

alter table public.posts enable row level security;
alter table public.subscribers enable row level security;
alter table public.article_ideas enable row level security;
alter table public.broadcast_campaigns enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.post_upvotes enable row level security;
alter table public.post_comments enable row level security;
alter table public.site_settings enable row level security;
alter table public.book_orders enable row level security;

drop policy if exists "Post images are publicly readable" on storage.objects;
create policy "Post images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'post-images');

drop policy if exists "Published posts are readable" on public.posts;
create policy "Published posts are readable"
  on public.posts for select
  using (status = 'published');

drop policy if exists "Subscribers can join from website" on public.subscribers;
create policy "Subscribers can join from website"
  on public.subscribers for insert
  with check (true);

drop policy if exists "Article ideas can be captured" on public.article_ideas;
create policy "Article ideas can be captured"
  on public.article_ideas for insert
  with check (true);

drop policy if exists "Volunteer applications can be submitted" on public.volunteer_applications;
create policy "Volunteer applications can be submitted"
  on public.volunteer_applications for insert
  with check (true);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row
  execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row
  execute function public.set_updated_at();

drop trigger if exists book_orders_set_updated_at on public.book_orders;
create trigger book_orders_set_updated_at
  before update on public.book_orders
  for each row
  execute function public.set_updated_at();

insert into public.posts (
  slug,
  title,
  excerpt,
  category,
  status,
  author,
  body,
  featured,
  read_minutes,
  published_at
) values
(
  'align-your-identity-before-your-goals',
  'Align Your Identity Before Your Goals',
  'Goals become easier to sustain when your daily choices match who you are intentionally becoming.',
  'Identity',
  'published',
  'Align Mindset Team',
  '[
    "Most people begin with a target: pass the exam, earn more, build a business, become disciplined. Targets matter, but they often collapse when they are not supported by identity.",
    "Identity asks a deeper question: who must I become to make this goal normal? A person who studies consistently does not only need a timetable. They need to see themselves as someone who protects learning time even when the mood changes.",
    "This is why Align Mindset starts with identity. When people are clear about the kind of person they are becoming, systems become easier to build, skills become easier to practice, and action becomes less dramatic."
  ]'::jsonb,
  true,
  5,
  now()
)
on conflict (slug) do nothing;

comment on column public.posts.body is
  'JSON array of article blocks. Supported block types: paragraph, heading, quote, image, video.';

comment on column public.posts.featured_image_url is
  'Optional public image URL used by article cards and article pages.';

comment on table public.broadcast_campaigns is
  'Admin-only log of newsletter and SMS broadcasts. Delivery can be handled by BROADCAST_WEBHOOK_URL.';

comment on table public.volunteer_applications is
  'Volunteer application submissions from the public volunteer page.';

comment on table public.post_upvotes is
  'Anonymous article upvotes, limited to one vote per browser-generated voter key.';

comment on table public.post_comments is
  'Public article comments. Email addresses are private and are never selected for public display.';

comment on table public.site_settings is
  'Admin-managed settings that control public website features.';

comment on table public.book_orders is
  'Server-created Flutterwave checkout orders for Align Mindset books and bundles.';

-- ==================================================
-- AMI 90-Day Progress Builder
-- ==================================================

create table if not exists public.progress_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  anonymous_token_hash text,
  participant_name text,
  email text,
  status text not null default 'draft'
    check (status in ('draft', 'submitted', 'processing', 'completed', 'needs_review', 'failed')),
  question_version text not null default '1.0',
  current_step integer not null default 1,
  completion_percentage integer not null default 0 check (completion_percentage between 0 and 100),
  started_at timestamptz not null default now(),
  last_saved_at timestamptz not null default now(),
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  consent_version text,
  consented_at timestamptz
);

create table if not exists public.progress_assessment_answers (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.progress_assessments(id) on delete cascade,
  question_id text not null,
  answer_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (assessment_id, question_id)
);

create table if not exists public.progress_plans (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.progress_assessments(id) on delete cascade,
  generation_status text not null default 'pending'
    check (generation_status in ('pending', 'generating', 'generated', 'needs_review', 'failed', 'released')),
  plan_json jsonb not null default '{}'::jsonb,
  executive_summary text,
  model_provider text,
  model_name text,
  prompt_version text not null default '1.0',
  generated_at timestamptz not null default now(),
  reviewed_by text,
  reviewed_at timestamptz,
  reviewer_notes text,
  participant_visible boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.progress_plan_documents (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.progress_assessments(id) on delete cascade,
  plan_id uuid not null references public.progress_plans(id) on delete cascade,
  document_type text not null check (document_type in ('pdf', 'docx', 'json')),
  storage_path text,
  generated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.progress_assessment_events (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references public.progress_assessments(id) on delete cascade,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.progress_builder_settings (
  id text primary key default 'global' check (id = 'global'),
  require_human_review boolean not null default true,
  auto_generate_on_submit boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.progress_builder_settings (
  id,
  require_human_review,
  auto_generate_on_submit
) values ('global', true, true)
on conflict (id) do nothing;

create index if not exists progress_assessments_status_idx
  on public.progress_assessments (status, updated_at desc);

create index if not exists progress_assessments_user_id_idx
  on public.progress_assessments (user_id);

create index if not exists progress_assessments_token_hash_idx
  on public.progress_assessments (anonymous_token_hash);

create index if not exists progress_assessment_answers_assessment_id_idx
  on public.progress_assessment_answers (assessment_id);

create index if not exists progress_plans_assessment_id_idx
  on public.progress_plans (assessment_id);

create index if not exists progress_assessment_events_assessment_id_idx
  on public.progress_assessment_events (assessment_id, created_at desc);

drop trigger if exists progress_assessments_set_updated_at on public.progress_assessments;
create trigger progress_assessments_set_updated_at
  before update on public.progress_assessments
  for each row
  execute function public.set_updated_at();

drop trigger if exists progress_assessment_answers_set_updated_at on public.progress_assessment_answers;
create trigger progress_assessment_answers_set_updated_at
  before update on public.progress_assessment_answers
  for each row
  execute function public.set_updated_at();

drop trigger if exists progress_plans_set_updated_at on public.progress_plans;
create trigger progress_plans_set_updated_at
  before update on public.progress_plans
  for each row
  execute function public.set_updated_at();

drop trigger if exists progress_builder_settings_set_updated_at on public.progress_builder_settings;
create trigger progress_builder_settings_set_updated_at
  before update on public.progress_builder_settings
  for each row
  execute function public.set_updated_at();

alter table public.progress_assessments enable row level security;
alter table public.progress_assessment_answers enable row level security;
alter table public.progress_plans enable row level security;
alter table public.progress_plan_documents enable row level security;
alter table public.progress_assessment_events enable row level security;
alter table public.progress_builder_settings enable row level security;

