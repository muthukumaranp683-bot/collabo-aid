export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'staff' | 'superadmin';
  name: string;
  studentId?: string;
  department?: string;
  year?: number;
}

export interface Student extends User {
  role: 'student';
  studentId: string;
  department: string;
  year: number;
  attendancePercentage: number;
  sickLeavesUsed: number;
  casualLeavesUsed: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent';
  subject?: string;
}

export interface Mark {
  id: string;
  studentId: string;
  subject: string;
  type: 'internal' | 'external';
  marks: number;
  totalMarks: number;
  examDate: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  type: 'tuition' | 'exam';
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid';
  description: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  type: 'sick' | 'casual';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  medicalProof?: string;
  submittedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'exam' | 'holiday' | 'event';
  isGovernmentHoliday?: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
}