-- Map teacher to classes (grades) they handle
create table if not exists public.teacher_classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  grade integer not null check (grade >= 1 and grade <= 12),
  created_at timestamptz not null default now(),
  unique(teacher_id, grade)
);

alter table public.teacher_classes enable row level security;
create policy "Read teacher_classes" on public.teacher_classes for select using (true);

-- Signup RPC: creates a student and assigns to the teacher who owns the selected grade
create or replace function public.student_signup(
  p_name text,
  p_grade integer,
  p_email text,
  p_username text,
  p_password text
) returns uuid
language plpgsql
security definer
set search_path = 'public'
as $$
declare
  v_teacher_id uuid;
  v_student_id uuid;
begin
  -- find a teacher assigned to this grade
  select tc.teacher_id into v_teacher_id
  from public.teacher_classes tc
  where tc.grade = p_grade
  order by tc.created_at asc
  limit 1;

  if v_teacher_id is null then
    raise exception 'No teacher assigned for grade %', p_grade using errcode = 'P0001';
  end if;

  -- create student record
  insert into public.students (username, password, email, grade, teacher_allocated, rural_area_id)
  values (p_username, p_password, p_email, p_grade, v_teacher_id, 'N/A')
  returning id into v_student_id;

  return v_student_id;
end;
$$;

grant execute on function public.student_signup(text, integer, text, text, text) to anon, authenticated;



