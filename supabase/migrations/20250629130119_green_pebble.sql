-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create coding_problems table
CREATE TABLE IF NOT EXISTS coding_problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    platform TEXT NOT NULL,
    problem_url TEXT,
    tags TEXT[] DEFAULT '{}',
    estimated_time_minutes INTEGER DEFAULT 30,
    acceptance_rate DECIMAL(5,2),
    points INTEGER DEFAULT 10,
    hints TEXT[] DEFAULT '{}',
    solution_approach TEXT,
    is_daily_challenge BOOLEAN DEFAULT false,
    challenge_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL CHECK (event_type IN ('workshop', 'webinar', 'networking', 'ama', 'interview')),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    location TEXT,
    meeting_link TEXT,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    is_free BOOLEAN DEFAULT true,
    price DECIMAL(10,2),
    tags TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('document', 'video', 'article', 'course', 'tool')),
    resource_url TEXT,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    is_free BOOLEAN DEFAULT true,
    price DECIMAL(10,2),
    rating_average DECIMAL(3,2) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_problem_submissions table
CREATE TABLE IF NOT EXISTS user_problem_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES coding_problems(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('attempted', 'solved', 'skipped')),
    points_earned INTEGER DEFAULT 0,
    time_taken_minutes INTEGER,
    submission_date TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    UNIQUE(user_id, problem_id)
);

-- Create user_streaks table
CREATE TABLE IF NOT EXISTS user_streaks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    total_problems_solved INTEGER DEFAULT 0,
    total_points INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create event_participants table
CREATE TABLE IF NOT EXISTS event_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    registration_date TIMESTAMPTZ DEFAULT NOW(),
    attendance_status TEXT DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'attended', 'no_show')),
    UNIQUE(event_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE coding_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_problem_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for coding_problems
CREATE POLICY "Anyone can view coding problems" ON coding_problems
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert coding problems" ON coding_problems
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create RLS policies for events
CREATE POLICY "Anyone can view published events" ON events
    FOR SELECT USING (is_published = true);

CREATE POLICY "Organizers can manage their events" ON events
    FOR ALL USING (organizer_id = auth.uid());

CREATE POLICY "Authenticated users can create events" ON events
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create RLS policies for resources
CREATE POLICY "Anyone can view resources" ON resources
    FOR SELECT USING (true);

CREATE POLICY "Authors can manage their resources" ON resources
    FOR ALL USING (author_id = auth.uid());

CREATE POLICY "Authenticated users can create resources" ON resources
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create RLS policies for user_problem_submissions
CREATE POLICY "Users can manage their own submissions" ON user_problem_submissions
    FOR ALL USING (user_id = auth.uid());

-- Create RLS policies for user_streaks
CREATE POLICY "Users can view their own streaks" ON user_streaks
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own streaks" ON user_streaks
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own streaks" ON user_streaks
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create RLS policies for event_participants
CREATE POLICY "Users can manage their own event participation" ON event_participants
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Event organizers can view participants" ON event_participants
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_participants.event_id 
            AND events.organizer_id = auth.uid()
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coding_problems_difficulty ON coding_problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_coding_problems_platform ON coding_problems(platform);
CREATE INDEX IF NOT EXISTS idx_coding_problems_daily_challenge ON coding_problems(is_daily_challenge, challenge_date);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(start_time);
CREATE INDEX IF NOT EXISTS idx_events_organizer ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_author ON resources(author_id);
CREATE INDEX IF NOT EXISTS idx_user_submissions_user ON user_problem_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_submissions_problem ON user_problem_submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_user_streaks_user ON user_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_event_participants_event ON event_participants(event_id);
CREATE INDEX IF NOT EXISTS idx_event_participants_user ON event_participants(user_id);

-- Insert sample coding problems
INSERT INTO coding_problems (title, description, difficulty, platform, problem_url, tags, estimated_time_minutes, acceptance_rate, points, hints, solution_approach, is_daily_challenge, challenge_date) VALUES
('Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.', 'Easy', 'LeetCode', 'https://leetcode.com/problems/two-sum/', ARRAY['Array', 'Hash Table'], 15, 49.2, 10, ARRAY['Think about using a hash map to store the numbers you''ve seen and their indices.', 'For each number, check if its complement (target - current number) exists in the hash map.'], 'Use a hash map to store each number and its index as you iterate through the array. For each element, calculate the complement and check if it exists in the hash map.', true, CURRENT_DATE),

('Valid Parentheses', 'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.', 'Easy', 'LeetCode', 'https://leetcode.com/problems/valid-parentheses/', ARRAY['String', 'Stack'], 20, 40.1, 10, ARRAY['Use a stack data structure.', 'Push opening brackets onto the stack and pop when you encounter closing brackets.'], 'Use a stack. Push opening brackets and pop when encountering closing brackets. Ensure they match.', false, NULL),

('Kadane''s Algorithm', 'Given an array arr[] of N integers. Find the contiguous sub-array(containing at least one number) which has the maximum sum and return its sum.', 'Medium', 'GeeksforGeeks', 'https://practice.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1', ARRAY['Dynamic Programming', 'Array'], 25, 65.8, 15, ARRAY['Think about the maximum sum ending at each position.', 'At each position, decide whether to extend the existing subarray or start a new one.'], 'Use dynamic programming. At each position, the maximum sum ending here is either the current element alone or the current element plus the maximum sum ending at the previous position.', true, CURRENT_DATE + INTERVAL '1 day'),

('Climbing the Leaderboard', 'An arcade game player wants to climb to the top of the leaderboard and track their ranking. The game uses Dense Ranking.', 'Medium', 'HackerRank', 'https://www.hackerrank.com/challenges/climbing-the-leaderboard/problem', ARRAY['Binary Search', 'Implementation'], 30, 42.1, 20, ARRAY['Use binary search to find the position efficiently.', 'Remove duplicates from the leaderboard first.'], 'Remove duplicates from leaderboard, then use binary search for each player score to find the rank efficiently.', true, CURRENT_DATE + INTERVAL '2 days'),

('Maximum Profit Trading', 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.', 'Hard', 'Unstop', 'https://unstop.com/competitions', ARRAY['Array', 'Dynamic Programming'], 35, 38.5, 25, ARRAY['Keep track of the minimum price seen so far.', 'For each day, calculate the profit if you sell on that day.'], 'Iterate through prices, keeping track of minimum price and maximum profit. For each price, update max profit and minimum price.', true, CURRENT_DATE + INTERVAL '3 days'),

('Binary Tree Inorder Traversal', 'Given the root of a binary tree, return the inorder traversal of its nodes'' values.', 'Medium', 'LeetCode', 'https://leetcode.com/problems/binary-tree-inorder-traversal/', ARRAY['Tree', 'DFS', 'Binary Tree'], 25, 74.3, 15, ARRAY['You can solve this recursively or iteratively.', 'For recursive: visit left subtree, process current node, visit right subtree.'], 'Recursive approach: traverse left, visit node, traverse right. Iterative approach: use a stack.', false, NULL),

('Merge Intervals', 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.', 'Medium', 'LeetCode', 'https://leetcode.com/problems/merge-intervals/', ARRAY['Array', 'Sorting'], 30, 46.3, 15, ARRAY['Sort the intervals by start time first.', 'Iterate through sorted intervals and merge overlapping ones.'], 'Sort intervals by start time, then iterate and merge overlapping intervals.', false, NULL),

('Longest Palindromic Substring', 'Given a string s, return the longest palindromic substring in s.', 'Medium', 'LeetCode', 'https://leetcode.com/problems/longest-palindromic-substring/', ARRAY['String', 'Dynamic Programming'], 35, 32.1, 20, ARRAY['Consider expanding around centers.', 'A palindrome can have odd or even length.'], 'Expand around centers approach: for each character, expand around it to find the longest palindrome.', false, NULL),

('Fibonacci Number', 'The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones.', 'Easy', 'LeetCode', 'https://leetcode.com/problems/fibonacci-number/', ARRAY['Math', 'Dynamic Programming', 'Recursion'], 15, 67.8, 10, ARRAY['You can solve this using recursion, memoization, or iterative approach.', 'Think about the base cases: F(0) = 0, F(1) = 1.'], 'Use dynamic programming or simple iteration to avoid redundant calculations.', true, CURRENT_DATE + INTERVAL '4 days'),

('Reverse Linked List', 'Given the head of a singly linked list, reverse the list, and return the reversed list.', 'Easy', 'LeetCode', 'https://leetcode.com/problems/reverse-linked-list/', ARRAY['Linked List', 'Recursion'], 20, 73.1, 10, ARRAY['You can solve this iteratively or recursively.', 'Keep track of previous, current, and next nodes.'], 'Iteratively reverse the links by maintaining three pointers: previous, current, and next.', true, CURRENT_DATE + INTERVAL '5 days'),

('Best Time to Buy and Sell Stock', 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.', 'Easy', 'LeetCode', 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', ARRAY['Array', 'Dynamic Programming'], 20, 54.2, 10, ARRAY['Keep track of the minimum price seen so far.', 'For each day, calculate the profit if you sell on that day.'], 'Single pass algorithm: keep track of minimum price and maximum profit.', true, CURRENT_DATE + INTERVAL '6 days'),

('Maximum Subarray', 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.', 'Easy', 'LeetCode', 'https://leetcode.com/problems/maximum-subarray/', ARRAY['Array', 'Dynamic Programming', 'Divide and Conquer'], 25, 49.8, 10, ARRAY['This is the classic Kadane''s algorithm problem.', 'At each position, decide whether to extend the existing subarray or start a new one.'], 'Use Kadane''s algorithm: at each position, the maximum sum ending here is either the current element alone or the current element plus the maximum sum ending at the previous position.', true, CURRENT_DATE + INTERVAL '7 days'),

('Contains Duplicate', 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.', 'Easy', 'LeetCode', 'https://leetcode.com/problems/contains-duplicate/', ARRAY['Array', 'Hash Table', 'Sorting'], 15, 60.1, 10, ARRAY['You can use a hash set to track seen elements.', 'Alternatively, sort the array and check adjacent elements.'], 'Use a hash set to store elements as you iterate. If an element is already in the set, return true.', false, NULL),

('Product of Array Except Self', 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].', 'Medium', 'LeetCode', 'https://leetcode.com/problems/product-of-array-except-self/', ARRAY['Array', 'Prefix Sum'], 30, 64.0, 15, ARRAY['Think about using left and right products.', 'You can solve this without division and in O(n) time.'], 'Use two passes: first calculate left products, then calculate right products while building the result.', false, NULL),

('3Sum', 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.', 'Medium', 'LeetCode', 'https://leetcode.com/problems/3sum/', ARRAY['Array', 'Two Pointers', 'Sorting'], 35, 32.4, 15, ARRAY['Sort the array first.', 'Use two pointers technique for each element.'], 'Sort the array, then for each element, use two pointers to find pairs that sum to the negative of that element.', false, NULL);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_coding_problems_updated_at BEFORE UPDATE ON coding_problems FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_streaks_updated_at BEFORE UPDATE ON user_streaks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();