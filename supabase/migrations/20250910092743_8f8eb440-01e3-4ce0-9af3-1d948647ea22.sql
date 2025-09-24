-- Create teachers table
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  rural_area_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL DEFAULT 'pass1234',
  email TEXT UNIQUE NOT NULL,
  teacher_allocated UUID REFERENCES public.teachers(id),
  grade INTEGER NOT NULL CHECK (grade >= 6 AND grade <= 12),
  no_of_games_played INTEGER NOT NULL DEFAULT 0,
  current_score INTEGER NOT NULL DEFAULT 0,
  rural_area_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policies for teachers
CREATE POLICY "Teachers can view their own data" 
ON public.teachers 
FOR SELECT 
USING (true);

CREATE POLICY "Teachers can update their own data" 
ON public.teachers 
FOR UPDATE 
USING (true);

-- Create policies for students
CREATE POLICY "Students can view their own data" 
ON public.students 
FOR SELECT 
USING (true);

CREATE POLICY "Students can update their own data" 
ON public.students 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_teachers_updated_at
BEFORE UPDATE ON public.teachers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.teachers (name, email, username, password, rural_area_id) VALUES
('Mrs. Priya Sharma', 'priya.sharma@rural-school.edu', 'priya_teacher', 'teacher123', 'rural_001'),
('Mr. Rajesh Kumar', 'rajesh.kumar@rural-school.edu', 'rajesh_teacher', 'teacher123', 'rural_001'),
('Ms. Anita Verma', 'anita.verma@rural-school.edu', 'anita_teacher', 'teacher123', 'rural_002');

INSERT INTO public.students (username, email, teacher_allocated, grade, rural_area_id) VALUES
('amit_6a', 'amit@student.edu', (SELECT id FROM public.teachers WHERE username = 'priya_teacher'), 6, 'rural_001'),
('priya_7b', 'priya@student.edu', (SELECT id FROM public.teachers WHERE username = 'priya_teacher'), 7, 'rural_001'),
('rohit_8a', 'rohit@student.edu', (SELECT id FROM public.teachers WHERE username = 'rajesh_teacher'), 8, 'rural_001'),
('meera_9b', 'meera@student.edu', (SELECT id FROM public.teachers WHERE username = 'rajesh_teacher'), 9, 'rural_001'),
('sita_10a', 'sita@student.edu', (SELECT id FROM public.teachers WHERE username = 'anita_teacher'), 10, 'rural_002'),
('ram_11b', 'ram@student.edu', (SELECT id FROM public.teachers WHERE username = 'anita_teacher'), 11, 'rural_002');