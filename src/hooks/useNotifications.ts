import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { Notification } from '../lib/supabase';

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      subscribeToNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select(`
          *,
          sender:profiles(*)
        `)
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.is_read).length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToNotifications = () => {
    if (!user) return;

    const subscription = supabase
      .channel('notifications')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'notifications',
          filter: `recipient_id=eq.${user.id}`
        }, 
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;
      
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('recipient_id', user.id)
        .eq('is_read', false);

      if (error) throw error;
      
      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const createNotification = async (
    recipientId: string,
    type: 'connection_request' | 'post_reaction' | 'comment' | 'mention' | 'event_invite' | 'system',
    title: string,
    message: string,
    relatedId?: string
  ) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          recipient_id: recipientId,
          sender_id: user?.id,
          notification_type: type,
          title,
          message,
          related_id: relatedId
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    createNotification,
    refreshNotifications: fetchNotifications
  };
};