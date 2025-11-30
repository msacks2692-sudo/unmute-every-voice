/*
  # Core Platform Schema for Multi-Agent Accessibility Platform

  ## Overview
  This migration creates the foundational database schema for a cognitive, multi-agent 
  accessibility platform with speech synthesis and learning capabilities.

  ## New Tables

  ### 1. `profiles`
  User profiles with accessibility preferences and settings
  - `id` (uuid, references auth.users)
  - `username` (text, unique)
  - `full_name` (text)
  - `bio` (text)
  - `avatar_url` (text)
  - `onboarding_completed` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `accessibility_preferences`
  Stores user-specific accessibility settings
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `font_size` (integer)
  - `high_contrast` (boolean)
  - `reduce_motion` (boolean)
  - `dyslexic_font` (boolean)
  - `reading_ruler` (boolean)
  - `screen_reader_optimized` (boolean)
  - `color_theme` (text)
  - `custom_settings` (jsonb)
  - `updated_at` (timestamptz)

  ### 3. `speech_profiles`
  Custom speech synthesis profiles per user
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `profile_name` (text)
  - `voice_name` (text)
  - `voice_lang` (text)
  - `speech_rate` (decimal)
  - `pitch` (decimal)
  - `volume` (decimal)
  - `is_default` (boolean)
  - `created_at` (timestamptz)

  ### 4. `resources`
  Accessibility resources and tools library
  - `id` (uuid, primary key)
  - `title` (text)
  - `description` (text)
  - `content` (text)
  - `resource_type` (text)
  - `category` (text)
  - `tags` (text[])
  - `url` (text)
  - `difficulty_level` (text)
  - `created_by` (uuid, references profiles)
  - `is_published` (boolean)
  - `view_count` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `user_interactions`
  Tracks user interactions for learning patterns
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `interaction_type` (text)
  - `resource_id` (uuid, references resources, nullable)
  - `agent_type` (text)
  - `duration_seconds` (integer)
  - `metadata` (jsonb)
  - `created_at` (timestamptz)

  ### 6. `learning_progress`
  Tracks user learning and skill development
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `skill_category` (text)
  - `progress_level` (integer)
  - `milestones_achieved` (text[])
  - `total_time_spent` (integer)
  - `last_activity` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. `agent_conversations`
  Stores conversations with AI agents
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `agent_type` (text)
  - `conversation_title` (text)
  - `messages` (jsonb)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 8. `resource_bookmarks`
  User bookmarks and favorites
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `resource_id` (uuid, references resources)
  - `notes` (text)
  - `created_at` (timestamptz)

  ### 9. `resource_ratings`
  User ratings and reviews for resources
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `resource_id` (uuid, references resources)
  - `rating` (integer)
  - `review` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
  - Resources have read access for all authenticated users
  - Only creators can modify their own resources

  ## Important Notes
  1. All tables use RLS for data security
  2. Timestamps use `timestamptz` for timezone awareness
  3. JSONB fields allow flexible metadata storage
  4. Foreign key constraints maintain data integrity
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  bio text,
  avatar_url text,
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create accessibility_preferences table
CREATE TABLE IF NOT EXISTS accessibility_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  font_size integer DEFAULT 100,
  high_contrast boolean DEFAULT false,
  reduce_motion boolean DEFAULT false,
  dyslexic_font boolean DEFAULT false,
  reading_ruler boolean DEFAULT false,
  screen_reader_optimized boolean DEFAULT false,
  color_theme text DEFAULT 'default',
  custom_settings jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE accessibility_preferences ENABLE ROW LEVEL SECURITY;

-- Create speech_profiles table
CREATE TABLE IF NOT EXISTS speech_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  profile_name text NOT NULL,
  voice_name text NOT NULL,
  voice_lang text DEFAULT 'en-US',
  speech_rate decimal DEFAULT 1.0,
  pitch decimal DEFAULT 1.0,
  volume decimal DEFAULT 1.0,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE speech_profiles ENABLE ROW LEVEL SECURITY;

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content text,
  resource_type text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT ARRAY[]::text[],
  url text,
  difficulty_level text DEFAULT 'beginner',
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  is_published boolean DEFAULT true,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create user_interactions table
CREATE TABLE IF NOT EXISTS user_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  interaction_type text NOT NULL,
  resource_id uuid REFERENCES resources(id) ON DELETE SET NULL,
  agent_type text,
  duration_seconds integer DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- Create learning_progress table
CREATE TABLE IF NOT EXISTS learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  skill_category text NOT NULL,
  progress_level integer DEFAULT 0,
  milestones_achieved text[] DEFAULT ARRAY[]::text[],
  total_time_spent integer DEFAULT 0,
  last_activity timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_category)
);

ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

-- Create agent_conversations table
CREATE TABLE IF NOT EXISTS agent_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  agent_type text NOT NULL,
  conversation_title text,
  messages jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agent_conversations ENABLE ROW LEVEL SECURITY;

-- Create resource_bookmarks table
CREATE TABLE IF NOT EXISTS resource_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, resource_id)
);

ALTER TABLE resource_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create resource_ratings table
CREATE TABLE IF NOT EXISTS resource_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, resource_id)
);

ALTER TABLE resource_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for accessibility_preferences
CREATE POLICY "Users can view own accessibility preferences"
  ON accessibility_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own accessibility preferences"
  ON accessibility_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own accessibility preferences"
  ON accessibility_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for speech_profiles
CREATE POLICY "Users can view own speech profiles"
  ON speech_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own speech profiles"
  ON speech_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own speech profiles"
  ON speech_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own speech profiles"
  ON speech_profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for resources
CREATE POLICY "Anyone can view published resources"
  ON resources FOR SELECT
  TO authenticated
  USING (is_published = true OR created_by = auth.uid());

CREATE POLICY "Users can insert own resources"
  ON resources FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own resources"
  ON resources FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own resources"
  ON resources FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- RLS Policies for user_interactions
CREATE POLICY "Users can view own interactions"
  ON user_interactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interactions"
  ON user_interactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for learning_progress
CREATE POLICY "Users can view own learning progress"
  ON learning_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning progress"
  ON learning_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning progress"
  ON learning_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for agent_conversations
CREATE POLICY "Users can view own conversations"
  ON agent_conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON agent_conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON agent_conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations"
  ON agent_conversations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for resource_bookmarks
CREATE POLICY "Users can view own bookmarks"
  ON resource_bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks"
  ON resource_bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON resource_bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for resource_ratings
CREATE POLICY "Anyone can view ratings"
  ON resource_ratings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own ratings"
  ON resource_ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON resource_ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own ratings"
  ON resource_ratings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_created_by ON resources(created_by);
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_created_at ON user_interactions(created_at);
CREATE INDEX IF NOT EXISTS idx_learning_progress_user_id ON learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_conversations_user_id ON agent_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_resource_bookmarks_user_id ON resource_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_resource_ratings_resource_id ON resource_ratings(resource_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  
  INSERT INTO public.accessibility_preferences (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accessibility_preferences_updated_at
  BEFORE UPDATE ON accessibility_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_progress_updated_at
  BEFORE UPDATE ON learning_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_conversations_updated_at
  BEFORE UPDATE ON agent_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resource_ratings_updated_at
  BEFORE UPDATE ON resource_ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();