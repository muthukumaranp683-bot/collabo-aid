-- Create enum types
CREATE TYPE public.user_role AS ENUM ('student', 'staff', 'superadmin');
CREATE TYPE public.leave_type AS ENUM ('sick', 'casual');
CREATE TYPE public.leave_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.fee_type AS ENUM ('tuition', 'exam');
CREATE TYPE public.fee_status AS ENUM ('pending', 'paid', 'overdue');
CREATE TYPE public.department_type AS ENUM ('computer_science', 'electronics', 'mechanical', 'civil', 'electrical');
CREATE TYPE public.semester_type AS ENUM ('1', '2', '3', '4', '5', '6', '7', '8');

-- User profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'student',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  roll_number TEXT NOT NULL UNIQUE,
  department department_type NOT NULL,
  year_of_study INTEGER NOT NULL CHECK (year_of_study BETWEEN 1 AND 4),
  current_semester semester_type NOT NULL,
  admission_date DATE NOT NULL,
  guardian_name TEXT,
  guardian_phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Staff table
CREATE TABLE public.staff (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  staff_id TEXT NOT NULL UNIQUE,
  department department_type NOT NULL,
  designation TEXT NOT NULL,
  joining_date DATE NOT NULL,
  qualifications TEXT,
  subjects_taught TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Subjects table
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_code TEXT NOT NULL UNIQUE,
  subject_name TEXT NOT NULL,
  department department_type NOT NULL,
  semester semester_type NOT NULL,
  credits INTEGER NOT NULL DEFAULT 3,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  attendance_date DATE NOT NULL,
  is_present BOOLEAN NOT NULL DEFAULT false,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(student_id, subject_id, attendance_date)
);

-- Marks table
CREATE TABLE public.marks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL, -- 'internal1', 'internal2', 'external', 'assignment'
  max_marks INTEGER NOT NULL,
  obtained_marks INTEGER NOT NULL,
  exam_date DATE,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  CHECK (obtained_marks >= 0 AND obtained_marks <= max_marks)
);

-- Fees table
CREATE TABLE public.fees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  fee_type fee_type NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  status fee_status NOT NULL DEFAULT 'pending',
  academic_year TEXT NOT NULL,
  semester semester_type,
  late_fee DECIMAL(10,2) DEFAULT 0,
  payment_reference TEXT,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  department department_type,
  is_holiday BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Holidays table
CREATE TABLE public.holidays (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  holiday_date DATE NOT NULL,
  holiday_type TEXT NOT NULL, -- 'government', 'college', 'festival'
  description TEXT,
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Leave requests table
CREATE TABLE public.leave_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  leave_type leave_type NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL,
  document_url TEXT,
  status leave_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Student sick leave tracking table
CREATE TABLE public.student_leave_quota (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  year INTEGER NOT NULL,
  sick_leaves_used INTEGER NOT NULL DEFAULT 0,
  casual_leaves_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(student_id, month, year)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_leave_quota ENABLE ROW LEVEL SECURITY;

-- Create helper function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE profiles.user_id = $1;
$$;

-- Create function to check if user is staff/superadmin
CREATE OR REPLACE FUNCTION public.is_staff_or_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = $1 
    AND role IN ('staff', 'superadmin')
  );
$$;

-- Create function to get student ID from user ID
CREATE OR REPLACE FUNCTION public.get_student_id(user_id UUID)
RETURNS UUID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.students WHERE students.user_id = $1;
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Staff and superadmin can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for students
CREATE POLICY "Students can view their own data" ON public.students
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Staff and superadmin can view students" ON public.students
  FOR SELECT USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff and superadmin can update students" ON public.students
  FOR UPDATE USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Superadmin can insert students" ON public.students
  FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'superadmin');

-- RLS Policies for staff
CREATE POLICY "Staff can view their own data" ON public.staff
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Superadmin can view all staff" ON public.staff
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Superadmin can manage staff" ON public.staff
  FOR ALL USING (public.get_user_role(auth.uid()) = 'superadmin');

-- RLS Policies for subjects
CREATE POLICY "Everyone can view active subjects" ON public.subjects
  FOR SELECT USING (is_active = true);

CREATE POLICY "Staff and superadmin can manage subjects" ON public.subjects
  FOR ALL USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for attendance
CREATE POLICY "Students can view their own attendance" ON public.attendance
  FOR SELECT USING (
    student_id = public.get_student_id(auth.uid())
  );

CREATE POLICY "Staff and superadmin can view all attendance" ON public.attendance
  FOR SELECT USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff and superadmin can manage attendance" ON public.attendance
  FOR ALL USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for marks
CREATE POLICY "Students can view their own marks" ON public.marks
  FOR SELECT USING (
    student_id = public.get_student_id(auth.uid())
  );

CREATE POLICY "Staff and superadmin can view all marks" ON public.marks
  FOR SELECT USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff and superadmin can manage marks" ON public.marks
  FOR ALL USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for fees
CREATE POLICY "Students can view their own fees" ON public.fees
  FOR SELECT USING (
    student_id = public.get_student_id(auth.uid())
  );

CREATE POLICY "Staff and superadmin can view all fees" ON public.fees
  FOR SELECT USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff and superadmin can manage fees" ON public.fees
  FOR ALL USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for events
CREATE POLICY "Everyone can view active events" ON public.events
  FOR SELECT USING (is_active = true);

CREATE POLICY "Staff and superadmin can manage events" ON public.events
  FOR ALL USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for holidays
CREATE POLICY "Everyone can view holidays" ON public.holidays
  FOR SELECT USING (true);

CREATE POLICY "Staff and superadmin can manage holidays" ON public.holidays
  FOR ALL USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for leave requests
CREATE POLICY "Students can view their own leave requests" ON public.leave_requests
  FOR SELECT USING (
    student_id = public.get_student_id(auth.uid())
  );

CREATE POLICY "Students can create their own leave requests" ON public.leave_requests
  FOR INSERT WITH CHECK (
    student_id = public.get_student_id(auth.uid())
  );

CREATE POLICY "Students can update their pending leave requests" ON public.leave_requests
  FOR UPDATE USING (
    student_id = public.get_student_id(auth.uid()) AND status = 'pending'
  );

CREATE POLICY "Staff and superadmin can view all leave requests" ON public.leave_requests
  FOR SELECT USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff and superadmin can update leave requests" ON public.leave_requests
  FOR UPDATE USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for student leave quota
CREATE POLICY "Students can view their own leave quota" ON public.student_leave_quota
  FOR SELECT USING (
    student_id = public.get_student_id(auth.uid())
  );

CREATE POLICY "Staff and superadmin can view all leave quotas" ON public.student_leave_quota
  FOR SELECT USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "System can manage leave quotas" ON public.student_leave_quota
  FOR ALL USING (true);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies for document uploads
CREATE POLICY "Users can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Staff and superadmin can view all documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents' AND public.is_staff_or_admin(auth.uid()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON public.staff FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_marks_updated_at BEFORE UPDATE ON public.marks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leave_requests_updated_at BEFORE UPDATE ON public.leave_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_leave_quota_updated_at BEFORE UPDATE ON public.student_leave_quota FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate attendance percentage
CREATE OR REPLACE FUNCTION public.calculate_attendance_percentage(student_uuid UUID, subject_uuid UUID DEFAULT NULL)
RETURNS DECIMAL(5,2)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    CASE 
      WHEN COUNT(*) = 0 THEN 0.00
      ELSE ROUND((COUNT(*) FILTER (WHERE is_present = true) * 100.0 / COUNT(*)), 2)
    END
  FROM public.attendance 
  WHERE student_id = student_uuid
    AND (subject_uuid IS NULL OR subject_id = subject_uuid);
$$;