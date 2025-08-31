import { Student, AttendanceRecord, Mark, FeeRecord, LeaveRequest, Event } from '@/types';

export const mockStudents: Student[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@college.edu',
    role: 'student',
    name: 'John Doe',
    studentId: 'CS2021001',
    department: 'Computer Science',
    year: 3,
    attendancePercentage: 85,
    sickLeavesUsed: 1,
    casualLeavesUsed: 2
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@college.edu',
    role: 'student',
    name: 'Jane Smith',
    studentId: 'CS2021002',
    department: 'Computer Science',
    year: 3,
    attendancePercentage: 92,
    sickLeavesUsed: 0,
    casualLeavesUsed: 1
  }
];

export const mockAttendance: AttendanceRecord[] = [
  { id: '1', studentId: '1', date: '2024-01-15', status: 'present', subject: 'Data Structures' },
  { id: '2', studentId: '1', date: '2024-01-16', status: 'absent', subject: 'Algorithms' },
  { id: '3', studentId: '1', date: '2024-01-17', status: 'present', subject: 'Database Systems' },
];

export const mockMarks: Mark[] = [
  {
    id: '1',
    studentId: '1',
    subject: 'Data Structures',
    type: 'internal',
    marks: 85,
    totalMarks: 100,
    examDate: '2024-01-20'
  },
  {
    id: '2',
    studentId: '1',
    subject: 'Algorithms',
    type: 'external',
    marks: 78,
    totalMarks: 100,
    examDate: '2024-01-25'
  }
];

export const mockFees: FeeRecord[] = [
  {
    id: '1',
    studentId: '1',
    type: 'tuition',
    amount: 50000,
    dueDate: '2024-02-15',
    status: 'paid',
    description: 'Semester 6 Tuition Fee'
  },
  {
    id: '2',
    studentId: '1',
    type: 'exam',
    amount: 2500,
    dueDate: '2024-03-01',
    status: 'unpaid',
    description: 'Final Examination Fee'
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    studentId: '1',
    type: 'sick',
    startDate: '2024-01-22',
    endDate: '2024-01-24',
    reason: 'Fever and cold',
    status: 'approved',
    submittedAt: '2024-01-21T10:30:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Republic Day',
    description: 'National Holiday',
    date: '2024-01-26',
    type: 'holiday',
    isGovernmentHoliday: true
  },
  {
    id: '2',
    title: 'Mid-Term Examinations',
    description: 'Semester 6 Mid-Term Exams',
    date: '2024-02-15',
    type: 'exam'
  },
  {
    id: '3',
    title: 'Tech Fest 2024',
    description: 'Annual Technical Festival',
    date: '2024-03-10',
    type: 'event'
  }
];

// Mock current user - in real app this would come from authentication
export const mockCurrentUser: Student = mockStudents[0];