import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { Post, PostReaction, Comment, Profile } from '../lib/supabase';

export const usePosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles(*),
          reactions:post_reactions(*),
          comments:comments(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, postType: 'text' | 'image' | 'video' | 'link' = 'text', mediaUrls?: string[]) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          author_id: user.id,
          content,
          post_type: postType,
          media_urls: mediaUrls
        })
        .select(`
          *,
          author:profiles(*),
          reactions:post_reactions(*),
          comments:comments(*)
        `)
        .single();

      if (error) throw error;

      setPosts(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  const addReaction = async (postId: string, reactionType: 'like' | 'love' | 'celebrate' | 'support' | 'insightful' | 'funny') => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('post_reactions')
        .upsert({
          post_id: postId,
          user_id: user.id,
          reaction_type: reactionType
        });

      if (error) throw error;
      await fetchPosts(); // Refresh posts to get updated reactions
    } catch (error) {
      console.error('Error adding reaction:', error);
      throw error;
    }
  };

  const removeReaction = async (postId: string, reactionType: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('post_reactions')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .eq('reaction_type', reactionType);

      if (error) throw error;
      await fetchPosts(); // Refresh posts to get updated reactions
    } catch (error) {
      console.error('Error removing reaction:', error);
      throw error;
    }
  };

  const addComment = async (postId: string, content: string, parentCommentId?: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          content,
          parent_comment_id: parentCommentId
        });

      if (error) throw error;
      await fetchPosts(); // Refresh posts to get updated comments
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  return {
    posts,
    loading,
    createPost,
    addReaction,
    removeReaction,
    addComment,
    refreshPosts: fetchPosts
  };
};