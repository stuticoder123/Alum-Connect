/*
  # Create profiles table and authentication setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text, optional)
      - `role` (text, student/alumni/admin)
      - `headline` (text, optional)
      - `bio` (text, optional)
      - `location` (text, optional)
      - `graduation_year` (integer, optional)
      - `institution` (text, optional)
      - `field_of_study` (text, optional)
      - `current_company` (text, optional)
      - `current_position` (text, optional)
      - `linkedin_url` (text, optional)
      - `github_url` (text, optional)
      - `portfolio_url` (text, optional)
      - `skills` (text array, optional)
      - `interests` (text array, optional)
      - `is_verified` (boolean, default false)
      - `is_mentor_available` (boolean, default false)
      - `mentor_price_per_hour` (decimal, optional)
      - `total_points` (integer, default 0)
      - `coding_streak` (integer, default 0)
      - `last_active` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for users to read/update their own profile
    - Add policy for public to read verified profiles
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'alumni', 'admin')) DEFAULT 'student',
  headline TEXT,
  bio TEXT,
  location TEXT,
  graduation_year INTEGER,
  institution TEXT,
  field_of_study TEXT,
  current_company TEXT,
  current_position TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  is_verified BOOLEAN DEFAULT false,
  is_mentor_available BOOLEAN DEFAULT false,
  mentor_price_per_hour DECIMAL(10,2),
  total_points INTEGER DEFAULT 0,
  coding_streak INTEGER DEFAULT 0,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT DEFAULT 'text' CHECK (post_type IN ('text', 'image', 'video', 'link', 'poll')),
  media_urls TEXT[],
  tags TEXT[],
  mentions TEXT[],
  is_pinned BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create post_reactions table
CREATE TABLE IF NOT EXISTS post_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'love', 'celebrate', 'support', 'insightful', 'funny')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id, reaction_type)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  mentions TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_problem_submissions table (updated)
DROP TABLE IF EXISTS user_problem_submissions;
CREATE TABLE user_problem_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  problem_id UUID REFERENCES coding_problems(id) ON DELETE CASCADE NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  completion_time_minutes INTEGER,
  attempts INTEGER DEFAULT 1,
  points_earned INTEGER DEFAULT 0,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, problem_id)
);

-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_points INTEGER DEFAULT 0,
  problems_solved INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  max_streak INTEGER DEFAULT 0,
  last_submission TIMESTAMPTZ,
  rank_position INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_problem_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for posts
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- Create policies for post_reactions
CREATE POLICY "Reactions are viewable by everyone" ON post_reactions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reactions" ON post_reactions
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own reactions" ON post_reactions
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for comments
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = author_id);

-- Create policies for user_problem_submissions
CREATE POLICY "Users can view their own submissions" ON user_problem_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions" ON user_problem_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions" ON user_problem_submissions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for leaderboard
CREATE POLICY "Leaderboard is viewable by everyone" ON leaderboard
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own leaderboard entry" ON leaderboard
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leaderboard entry" ON leaderboard
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_verified ON profiles(is_verified);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_reactions_post ON post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_user_submissions_user_id ON user_problem_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_points ON leaderboard(total_points DESC);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, institution, graduation_year)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    NEW.raw_user_meta_data->>'institution',
    (NEW.raw_user_meta_data->>'graduation_year')::INTEGER
  );
  
  -- Create leaderboard entry
  INSERT INTO public.leaderboard (user_id, total_points, problems_solved, current_streak, max_streak)
  VALUES (NEW.id, 0, 0, 0, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leaderboard_updated_at BEFORE UPDATE ON leaderboard FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();