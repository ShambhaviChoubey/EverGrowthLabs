export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      business_leads: {
        Row: {
          assigned_to: string | null
          business_name: string | null
          business_type: string | null
          created_at: string
          email: string
          first_name: string
          follow_up_date: string | null
          id: string
          last_name: string
          lead_source: string | null
          message: string | null
          notes: string | null
          phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email: string
          first_name: string
          follow_up_date?: string | null
          id?: string
          last_name: string
          lead_source?: string | null
          message?: string | null
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email?: string
          first_name?: string
          follow_up_date?: string | null
          id?: string
          last_name?: string
          lead_source?: string | null
          message?: string | null
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          budget_range: string | null
          campaign_duration_months: number | null
          challenge_description: string
          client_industry: string
          client_name: string
          created_at: string
          featured: boolean | null
          id: string
          image_url: string | null
          leads_generated: number | null
          published: boolean | null
          results_description: string
          roi_percentage: number | null
          services_used: string[] | null
          solution_description: string
          testimonial_author: string | null
          testimonial_position: string | null
          testimonial_quote: string | null
          title: string
          updated_at: string
        }
        Insert: {
          budget_range?: string | null
          campaign_duration_months?: number | null
          challenge_description: string
          client_industry: string
          client_name: string
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          leads_generated?: number | null
          published?: boolean | null
          results_description: string
          roi_percentage?: number | null
          services_used?: string[] | null
          solution_description: string
          testimonial_author?: string | null
          testimonial_position?: string | null
          testimonial_quote?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          budget_range?: string | null
          campaign_duration_months?: number | null
          challenge_description?: string
          client_industry?: string
          client_name?: string
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          leads_generated?: number | null
          published?: boolean | null
          results_description?: string
          roi_percentage?: number | null
          services_used?: string[] | null
          solution_description?: string
          testimonial_author?: string | null
          testimonial_position?: string | null
          testimonial_quote?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      marketing_audits: {
        Row: {
          audit_notes: string | null
          audit_report_url: string | null
          business_description: string | null
          business_name: string
          completed_at: string | null
          created_at: string
          current_marketing_challenges: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          monthly_marketing_budget: string | null
          phone: string | null
          primary_goals: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          audit_notes?: string | null
          audit_report_url?: string | null
          business_description?: string | null
          business_name: string
          completed_at?: string | null
          created_at?: string
          current_marketing_challenges?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          monthly_marketing_budget?: string | null
          phone?: string | null
          primary_goals?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          audit_notes?: string | null
          audit_report_url?: string | null
          business_description?: string | null
          business_name?: string
          completed_at?: string | null
          created_at?: string
          current_marketing_challenges?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          monthly_marketing_budget?: string | null
          phone?: string | null
          primary_goals?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          business_address: string | null
          business_name: string | null
          business_type: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          industry: string | null
          last_name: string | null
          phone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          business_address?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          industry?: string | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          business_address?: string | null
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          industry?: string | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          display_order: number | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
