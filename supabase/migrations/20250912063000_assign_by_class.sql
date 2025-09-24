-- Add grade to assignments to indicate target class (optional for legacy rows)
alter table public.assignments
  add column if not exists grade integer check (grade >= 1 and grade <= 12);

-- RPC to create an assignment and assign to all students in the teacher's class
create or replace function public.create_assignment_by_class(
  p_title text,
  p_description text,
  p_subject text,
  p_due_date timestamptz,
  p_teacher_id uuid,
  p_grade integer
) returns uuid
language plpgsql
security definer
set search_path = 'public'
as $$
declare
  v_assignment_id uuid;
begin
  -- Create the assignment with grade
  insert into public.assignments (title, description, subject, due_date, teacher_id, grade)
  values (p_title, p_description, p_subject, p_due_date, p_teacher_id, p_grade)
  returning id into v_assignment_id;

  -- Assign to all students of this teacher and grade
  insert into public.assignment_students (assignment_id, student_id)
  select v_assignment_id, s.id
  from public.students s
  where s.teacher_allocated = p_teacher_id
    and s.grade = p_grade;

  return v_assignment_id;
end;
$$;

grant execute on function public.create_assignment_by_class(text, text, text, timestamptz, uuid, integer) to anon, authenticated;



