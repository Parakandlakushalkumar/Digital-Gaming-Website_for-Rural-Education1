-- Update student_login function to use direct password comparison
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
set search_path = 'public'
as $function$
begin
  return query
  select s.id, s.username, s.grade, s.no_of_games_played, s.current_score, s.email, s.rural_area_id, s.teacher_allocated, s.created_at, s.updated_at
  from public.students s
  where s.username = p_username
    and s.password = p_password
  limit 1;
end;
$function$;

-- Update teacher_login function to use direct password comparison
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
set search_path = 'public'
as $function$
begin
  return query
  select t.id, t.username, t.name, t.email, t.rural_area_id, t.created_at, t.updated_at
  from public.teachers t
  where t.username = p_username
    and t.password = p_password
  limit 1;
end;
$function$;