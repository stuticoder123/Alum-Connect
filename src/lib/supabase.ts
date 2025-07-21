import { createClient } from '@supabase/supabase-js';

// IMPORTANT: You must set your own Supabase project URL and Anon Key for your deployment.
// Visit https://app.supabase.com/project/_/settings/api to get your keys.
// Replace the placeholder values in your .env file (or environment variables) before running the app.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Enforce first-time setup: throw an error if the keys are not customized
if (!supabaseUrl || !supabaseAnonKey ||
    supabaseUrl === 'https://your-project.supabase.co' ||
    supabaseAnonKey === 'your-anon-key') {
  throw new Error(
    '\n\n❌ Supabase project keys are not set!\n' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.\n' +
    'You can find these in your Supabase project settings under API.\n' +
    'This step is required for secure, personalized authentication.\n\n'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'alumconnect-web'
    }
  }
});

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'student' | 'alumni' | 'admin';
  headline?: string;
  bio?: string;
  location?: string;
  graduation_year?: number;
  institution?: string;
  field_of_study?: string;
  current_company?: string;
  current_position?: string;
  linkedin_url?: string;
  linkedin_id?: string;
  github_url?: string;
  portfolio_url?: string;
  skills?: string[];
  interests?: string[];
  is_verified: boolean;
  is_mentor_available: boolean;
  mentor_price_per_hour?: number;
  total_points: number;
  coding_streak: number;
  last_active: string;
  email_verified: boolean;
  phone_number?: string;
  date_of_birth?: string;
  created_at: string;
  updated_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  session_token: string;
  device_info?: any;
  ip_address?: string;
  user_agent?: string;
  is_active: boolean;
  expires_at: string;
  created_at: string;
  last_accessed: string;
}

export interface EmailVerification {
  id: string;
  user_id: string;
  email: string;
  verification_token: string;
  expires_at: string;
  verified_at?: string;
  created_at: string;
}

export interface PasswordReset {
  id: string;
  user_id: string;
  reset_token: string;
  expires_at: string;
  used_at?: string;
  created_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
  privacy_level: 'public' | 'connections' | 'private';
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'auto';
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  content: string;
  post_type: 'text' | 'image' | 'video' | 'link' | 'poll';
  media_urls?: string[];
  tags?: string[];
  mentions?: string[];
  is_pinned: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  author?: Profile;
  reactions?: PostReaction[];
  comments?: Comment[];
}

export interface PostReaction {
  id: string;
  post_id: string;
  user_id: string;
  reaction_type: 'like' | 'love' | 'celebrate' | 'support' | 'insightful' | 'funny';
  created_at: string;
  user?: Profile;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  parent_comment_id?: string;
  mentions?: string[];
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface CodingProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platform: 'LeetCode' | 'GeeksforGeeks' | 'HackerRank' | 'Unstop' | 'CodeChef';
  problem_url: string;
  tags?: string[];
  estimated_time_minutes: number;
  acceptance_rate?: number;
  points: number;
  hints?: string[];
  solution_approach?: string;
  is_daily_challenge: boolean;
  challenge_date?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProblemSubmission {
  id: string;
  user_id: string;
  problem_id: string;
  is_completed: boolean;
  completion_time_minutes?: number;
  attempts: number;
  points_earned: number;
  submitted_at: string;
  problem?: CodingProblem;
}

export interface LeaderboardEntry {
  id: string;
  user_id: string;
  total_points: number;
  problems_solved: number;
  current_streak: number;
  max_streak: number;
  last_submission?: string;
  rank_position?: number;
  updated_at: string;
  user?: Profile;
}

export interface Event {
  id: string;
  organizer_id: string;
  title: string;
  description?: string;
  event_type: 'workshop' | 'webinar' | 'networking' | 'ama' | 'hackathon';
  start_time: string;
  end_time: string;
  location?: string;
  meeting_link?: string;
  max_participants?: number;
  is_free: boolean;
  price?: number;
  tags?: string[];
  image_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  organizer?: Profile;
  participants?: EventParticipant[];
}

export interface EventParticipant {
  id: string;
  event_id: string;
  user_id: string;
  registration_status: 'registered' | 'attended' | 'cancelled' | 'no_show';
  payment_status: 'pending' | 'paid' | 'refunded';
  registered_at: string;
  user?: Profile;
}

export interface Resource {
  id: string;
  author_id: string;
  title: string;
  description?: string;
  resource_type: 'document' | 'video' | 'article' | 'course' | 'tool';
  resource_url: string;
  category: string;
  tags?: string[];
  is_free: boolean;
  price?: number;
  download_count: number;
  rating_average: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface MentorshipSession {
  id: string;
  mentor_id: string;
  mentee_id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_link?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  feedback_rating?: number;
  feedback_comment?: string;
  price_paid?: number;
  created_at: string;
  updated_at: string;
  mentor?: Profile;
  mentee?: Profile;
}

export interface Connection {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  message?: string;
  created_at: string;
  updated_at: string;
  requester?: Profile;
  addressee?: Profile;
}

export interface Notification {
  id: string;
  recipient_id: string;
  sender_id?: string;
  notification_type: 'connection_request' | 'post_reaction' | 'comment' | 'mention' | 'event_invite' | 'system';
  title: string;
  message: string;
  related_id?: string;
  is_read: boolean;
  created_at: string;
  sender?: Profile;
}

// Authentication helper functions
export const authHelpers = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData: {
    full_name: string;
    role: 'student' | 'alumni' | 'admin';
    institution?: string;
    graduation_year?: number;
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;
    return data;
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  // Sign in with LinkedIn
  async signInWithLinkedIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'r_liteprofile r_emailaddress'
      }
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Reset password
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });

    if (error) throw error;
    return data;
  },

  // Update password
  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password
    });

    if (error) throw error;
    return data;
  },

  // Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Get current user
  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  }
};

// Profile helper functions
export const profileHelpers = {
  // Get profile by user ID
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  // Update profile
  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Search profiles
  async searchProfiles(query: string, filters?: {
    role?: string;
    institution?: string;
    skills?: string[];
  }) {
    let queryBuilder = supabase
      .from('profiles')
      .select('*')
      .or(`full_name.ilike.%${query}%,bio.ilike.%${query}%,headline.ilike.%${query}%`);

    if (filters?.role) {
      queryBuilder = queryBuilder.eq('role', filters.role);
    }

    if (filters?.institution) {
      queryBuilder = queryBuilder.ilike('institution', `%${filters.institution}%`);
    }

    if (filters?.skills && filters.skills.length > 0) {
      queryBuilder = queryBuilder.overlaps('skills', filters.skills);
    }

    const { data, error } = await queryBuilder.limit(50);

    if (error) throw error;
    return data;
  }
};

// Utility functions
export const utils = {
  // Generate avatar URL from name
  generateAvatarUrl(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=200`;
  },

  // Format date
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  },

  // Format relative time
  formatRelativeTime(date: string): string {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return past.toLocaleDateString();
  }
};