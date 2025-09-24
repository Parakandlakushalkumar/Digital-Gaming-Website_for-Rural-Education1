-- 1) Enable pgcrypto for secure password hashing
create extension if not exists pgcrypto;

-- 2) Add password_hash columns if missing
alter table public.students add column if not exists password_hash text;
alter table public.teachers add column if not exists password_hash text;

-- 3) Backfill hashes from existing plaintext passwords (only where present)
update public.students
set password_hash = crypt(password, gen_salt('bf', 10))
where password is not null
  and (password_hash is null or password_hash = '');

update public.teachers
set password_hash = crypt(password, gen_salt('bf', 10))
where password is not null
  and (password_hash is null or password_hash = '');

-- 4) Stop storing plaintext: make password nullable and drop default, then null out values
alter table public.students alter column password drop not null;
alter table public.students alter column password drop default;
update public.students set password = null where password is not null;

alter table public.teachers alter column password drop not null;
alter table public.teachers alter column password drop default;
update public.teachers set password = null where password is not null;

-- 5) Prevent clients from reading/updating password and password_hash columns
revoke select (password) on table public.students from anon, authenticated;
revoke update (password) on table public.students from anon, authenticated;
revoke select (password_hash) on table public.students from anon, authenticated;
revoke update (password_hash) on table public.students from anon, authenticated;

revoke select (password) on table public.teachers from anon, authenticated;
revoke update (password) on table public.teachers from anon, authenticated;
revoke select (password_hash) on table public.teachers from anon, authenticated;
revoke update (password_hash) on table public.teachers from anon, authenticated;

-- 6) Secure RPC: Student login that returns a sanitized row
create or replace function public.student_login(p_username text, p_password text)
returns table (
  id uuid,
  username text,
  grade integer,
  no_of_games_played integer,
  current_score integer,
  email text,
  rural_area_id text,
  teacher_allocated uuid,
  created_at timestamptz,
  updated_at timestamptz
) as $$
begin
  return query
  select s.id, s.username, s.grade, s.no_of_games_played, s.current_score, s.email, s.rural_area_id, s.teacher_allocated, s.created_at, s.updated_at
  from public.students s
  where s.username = p_username
    and s.password_hash = crypt(p_password, s.password_hash)
  limit 1;
end; $$ language plpgsql security definer set search_path = public;

-- 7) Secure RPC: Teacher login that returns a sanitized row
create or replace function public.teacher_login(p_username text, p_password text)
returns table (
  id uuid,
  username text,
  name text,
  email text,
  rural_area_id text,
  created_at timestamptz,
  updated_at timestamptz
) as $$
begin
  return query
  select t.id, t.username, t.name, t.email, t.rural_area_id, t.created_at, t.updated_at
  from public.teachers t
  where t.username = p_username
    and t.password_hash = crypt(p_password, t.password_hash)
  limit 1;
end; $$ language plpgsql security definer set search_path = public;

-- 8) Allow clients to call the RPC functions
grant execute on function public.student_login(text, text) to anon, authenticated;
grant execute on function public.teacher_login(text, text) to anon, authenticated;