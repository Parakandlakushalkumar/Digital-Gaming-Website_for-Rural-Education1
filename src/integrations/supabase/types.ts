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
      teacher_classes: {
        Row: {
          id: string
          teacher_id: string
          grade: number
          created_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          grade: number
          created_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          grade?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_classes_teacher_id_fkey",
            columns: ["teacher_id"],
            isOneToOne: false,
            referencedRelation: "teachers",
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          created_at: string
          description: string | null
          due_date: string
          id: string
          subject: string
          teacher_id: string
          title: string
          updated_at: string
          grade: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          subject: string
          teacher_id: string
          title: string
          updated_at?: string
          grade?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          subject?: string
          teacher_id?: string
          title?: string
          updated_at?: string
          grade?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_students: {
        Row: {
          assigned_at: string
          assignment_id: string
          id: string
          student_id: string
        }
        Insert: {
          assigned_at?: string
          assignment_id: string
          id?: string
          student_id: string
        }
        Update: {
          assigned_at?: string
          assignment_id?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_students_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string
          current_score: number
          email: string
          grade: number
          id: string
          no_of_games_played: number
          password: string | null
          password_hash: string | null
          rural_area_id: string
          teacher_allocated: string | null
          updated_at: string
          username: string
          daily_streak: number
          last_played: string | null
          total_time_minutes: number
        }
        Insert: {
          created_at?: string
          current_score?: number
          email: string
          grade: number
          id?: string
          no_of_games_played?: number
          password?: string | null
          password_hash?: string | null
          rural_area_id: string
          teacher_allocated?: string | null
          updated_at?: string
          username: string
          daily_streak?: number
          last_played?: string | null
          total_time_minutes?: number
        }
        Update: {
          created_at?: string
          current_score?: number
          email?: string
          grade?: number
          id?: string
          no_of_games_played?: number
          password?: string | null
          password_hash?: string | null
          rural_area_id?: string
          teacher_allocated?: string | null
          updated_at?: string
          username?: string
          daily_streak?: number
          last_played?: string | null
          total_time_minutes?: number
        }
        Relationships: [
          {
            foreignKeyName: "students_teacher_allocated_fkey"
            columns: ["teacher_allocated"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password: string | null
          password_hash: string | null
          rural_area_id: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password?: string | null
          password_hash?: string | null
          rural_area_id: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password?: string | null
          password_hash?: string | null
          rural_area_id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          assignment_id: string
          feedback: string | null
          file_name: string
          file_size: number | null
          file_url: string
          grade: number | null
          id: string
          status: string
          student_id: string
          submitted_at: string
        }
        Insert: {
          assignment_id: string
          feedback?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          grade?: number | null
          id?: string
          status?: string
          student_id: string
          submitted_at?: string
        }
        Update: {
          assignment_id?: string
          feedback?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          grade?: number | null
          id?: string
          status?: string
          student_id?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_teacher_students: {
        Args: { p_teacher_id: string }
        Returns: {
          created_at: string
          current_score: number
          email: string
          grade: number
          id: string
          no_of_games_played: number
          rural_area_id: string
          teacher_allocated: string
          updated_at: string
          username: string
        }[]
      }
      student_login: {
        Args: { p_password: string; p_username: string }
        Returns: {
          created_at: string
          current_score: number
          email: string
          grade: number
          id: string
          no_of_games_played: number
          rural_area_id: string
          teacher_allocated: string
          updated_at: string
          username: string
        }[]
      }
      teacher_login: {
        Args: { p_password: string; p_username: string }
        Returns: {
          created_at: string
          email: string
          id: string
          name: string
          rural_area_id: string
          updated_at: string
          username: string
        }[]
      }
      update_student_progress: {
        Args: {
          p_current_score: number
          p_no_of_games_played: number
          p_student_id: string
        }
        Returns: undefined
      }
      update_daily_activity: {
        Args: {
          p_student_id: string
          p_session_minutes: number
          p_played_today: boolean
        }
        Returns: undefined
      }
      student_signup: {
        Args: {
          p_name: string
          p_grade: number
          p_email: string
          p_username: string
          p_password: string
        }
        Returns: string
      }
      create_assignment_by_class: {
        Args: {
          p_title: string
          p_description: string | null
          p_subject: string
          p_due_date: string
          p_teacher_id: string
          p_grade: number
        }
        Returns: string
      }
      create_assignment: {
        Args: {
          p_description: string | null
          p_due_date: string
          p_student_ids: string[]
          p_subject: string
          p_teacher_id: string
          p_title: string
        }
        Returns: string
      }
      get_student_assignments: {
        Args: { p_student_id: string }
        Returns: {
          assignment_id: string
          assigned_at: string
          description: string | null
          due_date: string
          submission_feedback: string | null
          submission_grade: number | null
          submission_id: string | null
          submission_status: string | null
          subject: string
          teacher_name: string
          title: string
        }[]
      }
      get_teacher_submissions: {
        Args: { p_teacher_id: string }
        Returns: {
          assignment_title: string
          feedback: string | null
          file_name: string
          file_url: string
          grade: number | null
          status: string
          student_name: string
          student_username: string
          submission_id: string
          submitted_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
