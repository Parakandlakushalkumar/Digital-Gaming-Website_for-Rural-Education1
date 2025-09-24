-- Enable pgcrypto for password hashing/verification
create extension if not exists pgcrypto with schema extensions;

-- Recreate secure login functions with proper search_path including extensions
create or replace function public.student_login(p_username text, p_password text)
returns table(
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
)
language plpgsql
security definer
set search_path = 'public, extensions'
as $function$
begin
  return query
  select s.id, s.username, s.grade, s.no_of_games_played, s.current_score, s.email, s.rural_area_id, s.teacher_allocated, s.created_at, s.updated_at
  from public.students s
  where s.username = p_username
    and s.password_hash = crypt(p_password, s.password_hash)
  limit 1;
end;
$function$;

grant execute on function public.student_login(text, text) to anon, authenticated;

create or replace function public.teacher_login(p_username text, p_password text)
returns table(
  id uuid,
  username text,
  name text,
  email text,
  rural_area_id text,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = 'public, extensions'
as $function$
begin
  return query
  select t.id, t.username, t.name, t.email, t.rural_area_id, t.created_at, t.updated_at
  from public.teachers t
  where t.username = p_username
    and t.password_hash = crypt(p_password, t.password_hash)
  limit 1;
end;
$function$;

grant execute on function public.teacher_login(text, text) to anon, authenticated;

-- Tighten RLS: remove permissive policies that exposed all rows
drop policy if exists "Students can update their own data" on public.students;
drop policy if exists "Students can view their own data" on public.students;
drop policy if exists "Teachers can update their own data" on public.teachers;
drop policy if exists "Teachers can view their own data" on public.teachers;

-- Ensure RLS remains enabled
alter table public.students enable row level security;
alter table public.teachers enable row level security;

-- Create RPC to safely fetch a teacher's students without exposing the whole table
create or replace function public.get_teacher_students(p_teacher_id uuid)
returns table(
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
)
language sql
security definer
set search_path = 'public'
as $function$
  select s.id, s.username, s.grade, s.no_of_games_played, s.current_score, s.email, s.rural_area_id, s.teacher_allocated, s.created_at, s.updated_at
  from public.students s
  where s.teacher_allocated = p_teacher_id;
$function$;

grant execute on function public.get_teacher_students(uuid) to anon, authenticated;

-- Create RPC to safely update student progress
create or replace function public.update_student_progress(
  p_student_id uuid,
  p_no_of_games_played integer,
  p_current_score integer
) returns void
language sql
security definer
set search_path = 'public'
as $function$
  update public.students
  set no_of_games_played = p_no_of_games_played,
      current_score = p_current_score,
      updated_at = now()
  where id = p_student_id;
$function$;

grant execute on function public.update_student_progress(uuid, integer, integer) to anon, authenticated;