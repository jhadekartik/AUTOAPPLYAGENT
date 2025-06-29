/*
  # Create profiles table for AutoApply.AI

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `current_position` (text)
      - `skills` (text)
      - `experience_level` (text)
      - `desired_salary` (text)
      - `work_type` (text)
      - `job_type` (text)
      - `resume_url` (text)
      - `auto_apply` (boolean)
      - `email_notifications` (boolean)
      - `sms_alerts` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `profiles` table
    - Add policy for users to manage their own profile data
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name text,
  last_name text,
  email text,
  phone text,
  location text,
  current_position text,
  skills text,
  experience_level text DEFAULT 'Mid Level (3-5 years)',
  desired_salary text,
  work_type text DEFAULT 'Remote',
  job_type text DEFAULT 'Full-time',
  resume_url text,
  auto_apply boolean DEFAULT true,
  email_notifications boolean DEFAULT true,
  sms_alerts boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);