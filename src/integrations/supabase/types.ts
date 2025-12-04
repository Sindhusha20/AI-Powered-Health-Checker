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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      app_metadata: {
        Row: {
          category: string
          created_at: string | null
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      conditions: {
        Row: {
          condition_code: string
          created_at: string | null
          description_bn: string | null
          description_en: string | null
          description_hi: string | null
          description_te: string | null
          id: string
          name_bn: string | null
          name_en: string
          name_hi: string | null
          name_te: string | null
          updated_at: string | null
          urgency_level: string
        }
        Insert: {
          condition_code: string
          created_at?: string | null
          description_bn?: string | null
          description_en?: string | null
          description_hi?: string | null
          description_te?: string | null
          id?: string
          name_bn?: string | null
          name_en: string
          name_hi?: string | null
          name_te?: string | null
          updated_at?: string | null
          urgency_level: string
        }
        Update: {
          condition_code?: string
          created_at?: string | null
          description_bn?: string | null
          description_en?: string | null
          description_hi?: string | null
          description_te?: string | null
          id?: string
          name_bn?: string | null
          name_en?: string
          name_hi?: string | null
          name_te?: string | null
          updated_at?: string | null
          urgency_level?: string
        }
        Relationships: []
      }
      healthcare_api_logs: {
        Row: {
          api_endpoint: string
          created_at: string | null
          id: string
          request_data: Json | null
          response_data: Json | null
          status_code: number | null
          user_id: string | null
        }
        Insert: {
          api_endpoint: string
          created_at?: string | null
          id?: string
          request_data?: Json | null
          response_data?: Json | null
          status_code?: number | null
          user_id?: string | null
        }
        Update: {
          api_endpoint?: string
          created_at?: string | null
          id?: string
          request_data?: Json | null
          response_data?: Json | null
          status_code?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "healthcare_api_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          condition_id: string
          created_at: string | null
          id: string
          priority: number | null
          recommendation_bn: string | null
          recommendation_en: string
          recommendation_hi: string | null
          recommendation_te: string | null
          updated_at: string | null
        }
        Insert: {
          condition_id: string
          created_at?: string | null
          id?: string
          priority?: number | null
          recommendation_bn?: string | null
          recommendation_en: string
          recommendation_hi?: string | null
          recommendation_te?: string | null
          updated_at?: string | null
        }
        Update: {
          condition_id?: string
          created_at?: string | null
          id?: string
          priority?: number | null
          recommendation_bn?: string | null
          recommendation_en?: string
          recommendation_hi?: string | null
          recommendation_te?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_condition_id_fkey"
            columns: ["condition_id"]
            isOneToOne: false
            referencedRelation: "conditions"
            referencedColumns: ["id"]
          },
        ]
      }
      symptom_analyses: {
        Row: {
          analyzed_at: string | null
          conditions: Json
          id: string
          recommendations: string[]
          symptoms: string[]
          triage_level: string
          user_id: string
        }
        Insert: {
          analyzed_at?: string | null
          conditions: Json
          id?: string
          recommendations: string[]
          symptoms: string[]
          triage_level: string
          user_id: string
        }
        Update: {
          analyzed_at?: string | null
          conditions?: Json
          id?: string
          recommendations?: string[]
          symptoms?: string[]
          triage_level?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "symptom_analyses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      symptom_condition_mapping: {
        Row: {
          condition_id: string
          created_at: string | null
          id: string
          probability_weight: number | null
          symptom_id: string
        }
        Insert: {
          condition_id: string
          created_at?: string | null
          id?: string
          probability_weight?: number | null
          symptom_id: string
        }
        Update: {
          condition_id?: string
          created_at?: string | null
          id?: string
          probability_weight?: number | null
          symptom_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "symptom_condition_mapping_condition_id_fkey"
            columns: ["condition_id"]
            isOneToOne: false
            referencedRelation: "conditions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "symptom_condition_mapping_symptom_id_fkey"
            columns: ["symptom_id"]
            isOneToOne: false
            referencedRelation: "symptoms"
            referencedColumns: ["id"]
          },
        ]
      }
      symptoms: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          name_bn: string | null
          name_en: string
          name_hi: string | null
          name_te: string | null
          severity_score: number | null
          symptom_code: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          name_bn?: string | null
          name_en: string
          name_hi?: string | null
          name_te?: string | null
          severity_score?: number | null
          symptom_code: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          name_bn?: string | null
          name_en?: string
          name_hi?: string | null
          name_te?: string | null
          severity_score?: number | null
          symptom_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
