-- Migration: AMI 90-Day Progress Builder
-- Description: Adds tables, triggers, indexes, and RLS policies for the 90-Day Progress Builder

-- 1. Assessments Table
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

-- 2. Assessment Answers Table
create table if not exists public.progress_assessment_answers (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.progress_assessments(id) on delete cascade,
  question_id text not null,
  answer_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (assessment_id, question_id)
);

-- 3. Progress Plans Table
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

-- 4. Plan Documents Table
create table if not exists public.progress_plan_documents (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.progress_assessments(id) on delete cascade,
  plan_id uuid not null references public.progress_plans(id) on delete cascade,
  document_type text not null check (document_type in ('pdf', 'docx', 'json')),
  storage_path text,
  generated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- 5. Assessment Events Table
create table if not exists public.progress_assessment_events (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references public.progress_assessments(id) on delete cascade,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 6. Settings Table
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

-- Indexes
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

-- Triggers for updated_at
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

-- Row Level Security
alter table public.progress_assessments enable row level security;
alter table public.progress_assessment_answers enable row level security;
alter table public.progress_plans enable row level security;
alter table public.progress_plan_documents enable row level security;
alter table public.progress_assessment_events enable row level security;
alter table public.progress_builder_settings enable row level security;

-- Policies for Authenticated Users (Accessing their own records)
drop policy if exists "Users can view own assessments" on public.progress_assessments;
create policy "Users can view own assessments"
  on public.progress_assessments for select
  using (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Users can update own draft assessments" on public.progress_assessments;
create policy "Users can update own draft assessments"
  on public.progress_assessments for update
  using (auth.uid() is not null and auth.uid() = user_id and status = 'draft');

drop policy if exists "Users can insert own assessments" on public.progress_assessments;
create policy "Users can insert own assessments"
  on public.progress_assessments for insert
  with check (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Users can view own answers" on public.progress_assessment_answers;
create policy "Users can view own answers"
  on public.progress_assessment_answers for select
  using (
    exists (
      select 1 from public.progress_assessments pa
      where pa.id = assessment_id and pa.user_id = auth.uid()
    )
  );

drop policy if exists "Users can view released plans" on public.progress_plans;
create policy "Users can view released plans"
  on public.progress_plans for select
  using (
    participant_visible = true and exists (
      select 1 from public.progress_assessments pa
      where pa.id = assessment_id and pa.user_id = auth.uid()
    )
  );
