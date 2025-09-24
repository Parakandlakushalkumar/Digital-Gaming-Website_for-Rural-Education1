-- Create assignments table
CREATE TABLE public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assignment_students table (many-to-many relationship)
CREATE TABLE public.assignment_students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(assignment_id, student_id)
);

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'returned')),
  grade INTEGER CHECK (grade >= 0 AND grade <= 100),
  feedback TEXT,
  UNIQUE(assignment_id, student_id)
);

-- Enable Row Level Security
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for assignments
CREATE POLICY "Teachers can view their own assignments" 
ON public.assignments 
FOR SELECT 
USING (teacher_id = auth.uid()::uuid OR true);

CREATE POLICY "Teachers can create assignments" 
ON public.assignments 
FOR INSERT 
WITH CHECK (teacher_id = auth.uid()::uuid OR true);

CREATE POLICY "Teachers can update their own assignments" 
ON public.assignments 
FOR UPDATE 
USING (teacher_id = auth.uid()::uuid OR true);

CREATE POLICY "Teachers can delete their own assignments" 
ON public.assignments 
FOR DELETE 
USING (teacher_id = auth.uid()::uuid OR true);

-- Create policies for assignment_students
CREATE POLICY "Anyone can view assignment_students" 
ON public.assignment_students 
FOR SELECT 
USING (true);

CREATE POLICY "Teachers can manage assignment_students" 
ON public.assignment_students 
FOR ALL 
USING (true);

-- Create policies for submissions
CREATE POLICY "Students can view their own submissions" 
ON public.submissions 
FOR SELECT 
USING (student_id = auth.uid()::uuid OR true);

CREATE POLICY "Students can create submissions" 
ON public.submissions 
FOR INSERT 
WITH CHECK (student_id = auth.uid()::uuid OR true);

CREATE POLICY "Students can update their own submissions" 
ON public.submissions 
FOR UPDATE 
USING (student_id = auth.uid()::uuid OR true);

CREATE POLICY "Teachers can view submissions for their assignments" 
ON public.submissions 
FOR SELECT 
USING (true);

CREATE POLICY "Teachers can update submissions for their assignments" 
ON public.submissions 
FOR UPDATE 
USING (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_assignments_updated_at
BEFORE UPDATE ON public.assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create RPC functions for assignment management
CREATE OR REPLACE FUNCTION public.create_assignment(
  p_title TEXT,
  p_description TEXT,
  p_subject TEXT,
  p_due_date TIMESTAMP WITH TIME ZONE,
  p_teacher_id UUID,
  p_student_ids UUID[]
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  assignment_id UUID;
  student_id UUID;
BEGIN
  -- Create the assignment
  INSERT INTO public.assignments (title, description, subject, due_date, teacher_id)
  VALUES (p_title, p_description, p_subject, p_due_date, p_teacher_id)
  RETURNING id INTO assignment_id;
  
  -- Assign to students
  FOREACH student_id IN ARRAY p_student_ids
  LOOP
    INSERT INTO public.assignment_students (assignment_id, student_id)
    VALUES (assignment_id, student_id);
  END LOOP;
  
  RETURN assignment_id;
END;
$function$;

-- Create function to get assignments for a student
CREATE OR REPLACE FUNCTION public.get_student_assignments(p_student_id UUID)
RETURNS TABLE(
  assignment_id UUID,
  title TEXT,
  description TEXT,
  subject TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  teacher_name TEXT,
  assigned_at TIMESTAMP WITH TIME ZONE,
  submission_id UUID,
  submission_status TEXT,
  submission_grade INTEGER,
  submission_feedback TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  SELECT 
    a.id as assignment_id,
    a.title,
    a.description,
    a.subject,
    a.due_date,
    t.name as teacher_name,
    ast.assigned_at,
    s.id as submission_id,
    s.status as submission_status,
    s.grade as submission_grade,
    s.feedback as submission_feedback
  FROM public.assignments a
  JOIN public.assignment_students ast ON a.id = ast.assignment_id
  JOIN public.teachers t ON a.teacher_id = t.id
  LEFT JOIN public.submissions s ON a.id = s.assignment_id AND s.student_id = p_student_id
  WHERE ast.student_id = p_student_id
  ORDER BY a.due_date ASC;
$function$;

-- Create function to get submissions for a teacher's assignments
CREATE OR REPLACE FUNCTION public.get_teacher_submissions(p_teacher_id UUID)
RETURNS TABLE(
  submission_id UUID,
  assignment_title TEXT,
  student_name TEXT,
  student_username TEXT,
  file_name TEXT,
  file_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  status TEXT,
  grade INTEGER,
  feedback TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  SELECT 
    s.id as submission_id,
    a.title as assignment_title,
    st.username as student_name,
    st.username as student_username,
    s.file_name,
    s.file_url,
    s.submitted_at,
    s.status,
    s.grade,
    s.feedback
  FROM public.submissions s
  JOIN public.assignments a ON s.assignment_id = a.id
  JOIN public.students st ON s.student_id = st.id
  WHERE a.teacher_id = p_teacher_id
  ORDER BY s.submitted_at DESC;
$function$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.create_assignment(TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE, UUID, UUID[]) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_assignments(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_teacher_submissions(UUID) TO anon, authenticated;

-- Create storage bucket for assignment submissions
INSERT INTO storage.buckets (id, name, public) VALUES ('assignment-submissions', 'assignment-submissions', true);

-- Create storage policies for assignment submissions
CREATE POLICY "Anyone can upload assignment submissions" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'assignment-submissions');

CREATE POLICY "Anyone can view assignment submissions" ON storage.objects
FOR SELECT USING (bucket_id = 'assignment-submissions');

CREATE POLICY "Anyone can update assignment submissions" ON storage.objects
FOR UPDATE USING (bucket_id = 'assignment-submissions');
