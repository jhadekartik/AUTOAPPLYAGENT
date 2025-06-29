import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          first_name: string | null;
          last_name: string | null;
          email: string | null;
          phone: string | null;
          location: string | null;
          current_position: string | null;
          skills: string | null;
          experience_level: string | null;
          desired_salary: string | null;
          work_type: string | null;
          job_type: string | null;
          resume_url: string | null;
          auto_apply: boolean;
          email_notifications: boolean;
          sms_alerts: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          location?: string | null;
          current_position?: string | null;
          skills?: string | null;
          experience_level?: string | null;
          desired_salary?: string | null;
          work_type?: string | null;
          job_type?: string | null;
          resume_url?: string | null;
          auto_apply?: boolean;
          email_notifications?: boolean;
          sms_alerts?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          location?: string | null;
          current_position?: string | null;
          skills?: string | null;
          experience_level?: string | null;
          desired_salary?: string | null;
          work_type?: string | null;
          job_type?: string | null;
          resume_url?: string | null;
          auto_apply?: boolean;
          email_notifications?: boolean;
          sms_alerts?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};