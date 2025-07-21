import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { CodingProblem, UserProblemSubmission, LeaderboardEntry } from '../lib/supabase';

export const useCodingProblems = () => {
  const { user } = useAuth();
  const [dailyProblem, setDailyProblem] = useState<CodingProblem | null>(null);
  const [userSubmissions, setUserSubmissions] = useState<UserProblemSubmission[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    problemsSolved: 0,
    currentStreak: 0,
    rank: null as number | null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDailyProblem();
    if (user) {
      fetchUserSubmissions();
      fetchUserStats();
    }
    fetchLeaderboard();
  }, [user]);

  const fetchDailyProblem = async () => {
    try {
      const { data, error } = await supabase
        .from('coding_problems')
        .select('*')
        .eq('is_daily_challenge', true)
        .eq('challenge_date', new Date().toISOString().split('T')[0])
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setDailyProblem(data);
    } catch (error) {
      console.error('Error fetching daily problem:', error);
    }
  };

  const fetchUserSubmissions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_problem_submissions')
        .select(`
          *,
          problem:coding_problems(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setUserSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching user submissions:', error);
    }
  };

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setUserStats({
          totalPoints: data.total_points,
          problemsSolved: data.problems_solved,
          currentStreak: data.current_streak,
          rank: data.rank_position
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select(`
          *,
          user:profiles(*)
        `)
        .order('total_points', { ascending: false })
        .limit(10);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const submitProblem = async (problemId: string, isCompleted: boolean, completionTimeMinutes?: number) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('user_problem_submissions')
        .upsert({
          user_id: user.id,
          problem_id: problemId,
          is_completed: isCompleted,
          completion_time_minutes: completionTimeMinutes,
          points_earned: isCompleted ? 10 : 0
        })
        .select()
        .single();

      if (error) throw error;

      // Update leaderboard
      if (isCompleted) {
        await supabase.rpc('update_user_leaderboard', {
          user_id: user.id,
          points_to_add: 10
        });
      }

      await fetchUserSubmissions();
      await fetchUserStats();
      await fetchLeaderboard();

      return data;
    } catch (error) {
      console.error('Error submitting problem:', error);
      throw error;
    }
  };

  const isProblemCompleted = (problemId: string) => {
    return userSubmissions.some(
      submission => submission.problem_id === problemId && submission.is_completed
    );
  };

  return {
    dailyProblem,
    userSubmissions,
    leaderboard,
    userStats,
    loading,
    submitProblem,
    isProblemCompleted,
    refreshData: () => {
      fetchDailyProblem();
      if (user) {
        fetchUserSubmissions();
        fetchUserStats();
      }
      fetchLeaderboard();
    }
  };
};