-- Add streak and time tracking fields to students
alter table public.students
  add column if not exists daily_streak integer not null default 0,
  add column if not exists last_played date,
  add column if not exists total_time_minutes integer not null default 0;

-- RPC to update daily activity: session minutes and optional played_today flag
create or replace function public.update_daily_activity(
  p_student_id uuid,
  p_session_minutes integer,
  p_played_today boolean
) returns void
language plpgsql
security definer
set search_path = 'public'
as $$
declare
  v_today date := (now() at time zone 'utc')::date;
  v_last date;
  v_streak integer;
begin
  -- Safeguards
  if p_session_minutes is null then p_session_minutes := 0; end if;
  if p_session_minutes < 0 then p_session_minutes := 0; end if;

  select last_played, daily_streak into v_last, v_streak
  from public.students where id = p_student_id for update;

  if p_played_today then
    if v_last is null then
      -- First ever play
      update public.students
      set daily_streak = 1,
          last_played = v_today,
          total_time_minutes = total_time_minutes + p_session_minutes,
          updated_at = now()
      where id = p_student_id;
    elsif v_last = v_today then
      -- Already played today; keep streak
      update public.students
      set total_time_minutes = total_time_minutes + p_session_minutes,
          updated_at = now()
      where id = p_student_id;
    elsif v_last = v_today - interval '1 day' then
      -- Played yesterday; increment streak
      update public.students
      set daily_streak = coalesce(v_streak, 0) + 1,
          last_played = v_today,
          total_time_minutes = total_time_minutes + p_session_minutes,
          updated_at = now()
      where id = p_student_id;
    else
      -- Missed one or more days; reset streak to 1 for today
      update public.students
      set daily_streak = 1,
          last_played = v_today,
          total_time_minutes = total_time_minutes + p_session_minutes,
          updated_at = now()
      where id = p_student_id;
    end if;
  else
    -- Only accumulate time; do not change last_played/streak
    update public.students
    set total_time_minutes = total_time_minutes + p_session_minutes,
        updated_at = now()
    where id = p_student_id;
  end if;
end;
$$;

grant execute on function public.update_daily_activity(uuid, integer, boolean) to anon, authenticated;

-- Optionally include the new fields in student_login RPC response if such function exists
-- This will not fail if absent; keep as a best-effort replacement matching existing signature
do $$
begin
  perform 1 from pg_proc where proname = 'student_login' and pronamespace = 'public'::regnamespace;
  if found then
    execute $$
    create or replace function public.student_login(p_username text, p_password text)
    returns table(
      id uuid,
      username text,
      email text,
      grade integer,
      no_of_games_played integer,
      current_score integer,
      rural_area_id text,
      teacher_allocated uuid,
      created_at timestamptz,
      updated_at timestamptz,
      daily_streak integer,
      last_played date,
      total_time_minutes integer
    )
    language sql
    security definer
    set search_path = 'public'
    as $fn$
      select s.id, s.username, s.email, s.grade, s.no_of_games_played, s.current_score,
             s.rural_area_id, s.teacher_allocated, s.created_at, s.updated_at,
             coalesce(s.daily_streak,0) as daily_streak,
             s.last_played,
             coalesce(s.total_time_minutes,0) as total_time_minutes
      from public.students s
      where s.username = p_username and s.password = p_password
    $fn$;
    $$;
  end if;
end$$;




