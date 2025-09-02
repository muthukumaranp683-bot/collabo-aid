export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          attendance_date: string
          created_at: string
          id: string
          is_present: boolean
          remarks: string | null
          staff_id: string
          student_id: string
          subject_id: string
        }
        Insert: {
          attendance_date: string
          created_at?: string
          id?: string
          is_present?: boolean
          remarks?: string | null
          staff_id: string
          student_id: string
          subject_id: string
        }
        Update: {
          attendance_date?: string
          created_at?: string
          id?: string
          is_present?: boolean
          remarks?: string | null
          staff_id?: string
          student_id?: string
          subject_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string
          department: Database["public"]["Enums"]["department_type"] | null
          description: string | null
          event_date: string
          event_time: string | null
          id: string
          is_active: boolean
          is_holiday: boolean
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          department?: Database["public"]["Enums"]["department_type"] | null
          description?: string | null
          event_date: string
          event_time?: string | null
          id?: string
          is_active?: boolean
          is_holiday?: boolean
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          department?: Database["public"]["Enums"]["department_type"] | null
          description?: string | null
          event_date?: string
          event_time?: string | null
          id?: string
          is_active?: boolean
          is_holiday?: boolean
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      fees: {
        Row: {
          academic_year: string
          amount: number
          created_at: string
          due_date: string
          fee_type: Database["public"]["Enums"]["fee_type"]
          id: string
          late_fee: number | null
          paid_date: string | null
          payment_reference: string | null
          remarks: string | null
          semester: Database["public"]["Enums"]["semester_type"] | null
          status: Database["public"]["Enums"]["fee_status"]
          student_id: string
          updated_at: string
        }
        Insert: {
          academic_year: string
          amount: number
          created_at?: string
          due_date: string
          fee_type: Database["public"]["Enums"]["fee_type"]
          id?: string
          late_fee?: number | null
          paid_date?: string | null
          payment_reference?: string | null
          remarks?: string | null
          semester?: Database["public"]["Enums"]["semester_type"] | null
          status?: Database["public"]["Enums"]["fee_status"]
          student_id: string
          updated_at?: string
        }
        Update: {
          academic_year?: string
          amount?: number
          created_at?: string
          due_date?: string
          fee_type?: Database["public"]["Enums"]["fee_type"]
          id?: string
          late_fee?: number | null
          paid_date?: string | null
          payment_reference?: string | null
          remarks?: string | null
          semester?: Database["public"]["Enums"]["semester_type"] | null
          status?: Database["public"]["Enums"]["fee_status"]
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fees_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      holidays: {
        Row: {
          created_at: string
          description: string | null
          holiday_date: string
          holiday_type: string
          id: string
          is_recurring: boolean
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          holiday_date: string
          holiday_type: string
          id?: string
          is_recurring?: boolean
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          holiday_date?: string
          holiday_type?: string
          id?: string
          is_recurring?: boolean
          title?: string
        }
        Relationships: []
      }
      leave_requests: {
        Row: {
          created_at: string
          document_url: string | null
          end_date: string
          id: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string
          review_comments: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          start_date: string
          status: Database["public"]["Enums"]["leave_status"]
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          document_url?: string | null
          end_date: string
          id?: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string
          review_comments?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["leave_status"]
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          document_url?: string | null
          end_date?: string
          id?: string
          leave_type?: Database["public"]["Enums"]["leave_type"]
          reason?: string
          review_comments?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["leave_status"]
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      marks: {
        Row: {
          created_at: string
          exam_date: string | null
          exam_type: string
          id: string
          max_marks: number
          obtained_marks: number
          remarks: string | null
          staff_id: string
          student_id: string
          subject_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          exam_date?: string | null
          exam_type: string
          id?: string
          max_marks: number
          obtained_marks: number
          remarks?: string | null
          staff_id: string
          student_id: string
          subject_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          exam_date?: string | null
          exam_type?: string
          id?: string
          max_marks?: number
          obtained_marks?: number
          remarks?: string | null
          staff_id?: string
          student_id?: string
          subject_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marks_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marks_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_active?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string
          department: Database["public"]["Enums"]["department_type"]
          designation: string
          id: string
          joining_date: string
          qualifications: string | null
          staff_id: string
          subjects_taught: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department: Database["public"]["Enums"]["department_type"]
          designation: string
          id?: string
          joining_date: string
          qualifications?: string | null
          staff_id: string
          subjects_taught?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: Database["public"]["Enums"]["department_type"]
          designation?: string
          id?: string
          joining_date?: string
          qualifications?: string | null
          staff_id?: string
          subjects_taught?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_leave_quota: {
        Row: {
          casual_leaves_used: number
          created_at: string
          id: string
          month: number
          sick_leaves_used: number
          student_id: string
          updated_at: string
          year: number
        }
        Insert: {
          casual_leaves_used?: number
          created_at?: string
          id?: string
          month: number
          sick_leaves_used?: number
          student_id: string
          updated_at?: string
          year: number
        }
        Update: {
          casual_leaves_used?: number
          created_at?: string
          id?: string
          month?: number
          sick_leaves_used?: number
          student_id?: string
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_leave_quota_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          address: string | null
          admission_date: string
          created_at: string
          current_semester: Database["public"]["Enums"]["semester_type"]
          department: Database["public"]["Enums"]["department_type"]
          guardian_name: string | null
          guardian_phone: string | null
          id: string
          roll_number: string
          updated_at: string
          user_id: string
          year_of_study: number
        }
        Insert: {
          address?: string | null
          admission_date: string
          created_at?: string
          current_semester: Database["public"]["Enums"]["semester_type"]
          department: Database["public"]["Enums"]["department_type"]
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          roll_number: string
          updated_at?: string
          user_id: string
          year_of_study: number
        }
        Update: {
          address?: string | null
          admission_date?: string
          created_at?: string
          current_semester?: Database["public"]["Enums"]["semester_type"]
          department?: Database["public"]["Enums"]["department_type"]
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          roll_number?: string
          updated_at?: string
          user_id?: string
          year_of_study?: number
        }
        Relationships: []
      }
      subjects: {
        Row: {
          created_at: string
          credits: number
          department: Database["public"]["Enums"]["department_type"]
          id: string
          is_active: boolean
          semester: Database["public"]["Enums"]["semester_type"]
          subject_code: string
          subject_name: string
        }
        Insert: {
          created_at?: string
          credits?: number
          department: Database["public"]["Enums"]["department_type"]
          id?: string
          is_active?: boolean
          semester: Database["public"]["Enums"]["semester_type"]
          subject_code: string
          subject_name: string
        }
        Update: {
          created_at?: string
          credits?: number
          department?: Database["public"]["Enums"]["department_type"]
          id?: string
          is_active?: boolean
          semester?: Database["public"]["Enums"]["semester_type"]
          subject_code?: string
          subject_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_attendance_percentage: {
        Args: { student_uuid: string; subject_uuid?: string }
        Returns: number
      }
      get_student_id: {
        Args: { user_id: string }
        Returns: string
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_staff_or_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      department_type:
        | "computer_science"
        | "electronics"
        | "mechanical"
        | "civil"
        | "electrical"
      fee_status: "pending" | "paid" | "overdue"
      fee_type: "tuition" | "exam"
      leave_status: "pending" | "approved" | "rejected"
      leave_type: "sick" | "casual"
      semester_type: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
      user_role: "student" | "staff" | "superadmin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      department_type: [
        "computer_science",
        "electronics",
        "mechanical",
        "civil",
        "electrical",
      ],
      fee_status: ["pending", "paid", "overdue"],
      fee_type: ["tuition", "exam"],
      leave_status: ["pending", "approved", "rejected"],
      leave_type: ["sick", "casual"],
      semester_type: ["1", "2", "3", "4", "5", "6", "7", "8"],
      user_role: ["student", "staff", "superadmin"],
    },
  },
} as const
