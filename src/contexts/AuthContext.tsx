import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, authHelpers, profileHelpers } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '../lib/supabase';

export type UserRole = 'student' | 'alumni' | 'admin';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { 
    full_name: string; 
    role: UserRole; 
    institution?: string; 
    graduation_year?: number 
  }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
  isAuthenticated: boolean;
  // Legacy compatibility
  currentUser: Profile | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const profileData = await profileHelpers.getProfile(userId);
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: { 
    full_name: string; 
    role: UserRole; 
    institution?: string; 
    graduation_year?: number 
  }) => {
    setLoading(true);
    try {
      await authHelpers.signUp(email, password, userData);
      // Note: User will need to verify email before they can sign in
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw new Error(error.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authHelpers.signIn(email, password);
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(error.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signInWithLinkedIn = async () => {
    setLoading(true);
    try {
      await authHelpers.signInWithLinkedIn();
      // User will be redirected to LinkedIn for authentication
    } catch (error: any) {
      console.error('Error signing in with LinkedIn:', error);
      setLoading(false);
      throw new Error('LinkedIn sign-in failed. Please try email sign-up instead.');
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authHelpers.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw new Error('Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authHelpers.resetPassword(email);
    } catch (error: any) {
      console.error('Error resetting password:', error);
      throw new Error('Failed to send reset email. Please check your email address.');
    }
  };

  const updatePassword = async (password: string) => {
    try {
      await authHelpers.updatePassword(password);
    } catch (error: any) {
      console.error('Error updating password:', error);
      throw new Error('Failed to update password. Please try again.');
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const updatedProfile = await profileHelpers.updateProfile(user.id, updates);
      setProfile(updatedProfile);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile. Please try again.');
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    await fetchProfile(user.id);
  };

  // Legacy compatibility methods
  const login = async (email: string, password: string, role: UserRole) => {
    await signIn(email, password);
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    await signUp(email, password, { full_name: name, role });
  };

  const logout = async () => {
    await signOut();
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signInWithLinkedIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshProfile,
    isAuthenticated: !!user,
    // Legacy compatibility
    currentUser: profile,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};