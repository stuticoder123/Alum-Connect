-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('connection_request', 'post_reaction', 'comment', 'mention', 'event_invite', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = recipient_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = recipient_id);

CREATE POLICY "Authenticated users can create notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(recipient_id, is_read);

-- Insert sample notifications for testing
DO $$
DECLARE
    sample_user_id UUID;
BEGIN
    -- Get a sample user ID
    SELECT id INTO sample_user_id FROM profiles LIMIT 1;
    
    -- Only insert if we have a user
    IF sample_user_id IS NOT NULL THEN
        INSERT INTO notifications (recipient_id, notification_type, title, message, created_at) VALUES
        (sample_user_id, 'system', 'Welcome to AlumConnect! 🎉', 'Welcome to AlumConnect! Start by completing your profile and connecting with alumni in your field. Explore coding challenges, join events, and find mentors to accelerate your career growth.', NOW() - INTERVAL '1 hour'),
        
        (sample_user_id, 'system', 'Daily Coding Challenge Available! 💻', 'A new coding challenge is ready for you! Solve today''s problem to earn points and maintain your coding streak. Check out the Coding Bot for hints and solutions.', NOW() - INTERVAL '30 minutes'),
        
        (sample_user_id, 'system', 'New Event: React Workshop 🚀', 'Join our upcoming React Workshop this Saturday! Learn advanced React patterns and best practices from industry experts. Limited seats available - register now!', NOW() - INTERVAL '15 minutes');
    END IF;
END $$;