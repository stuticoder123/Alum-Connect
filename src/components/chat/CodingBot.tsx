import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Code, Trophy, Lightbulb, BookOpen, ExternalLink, Clock, Star, Calendar, Award, Target, Zap, ChevronRight, Play, CheckCircle, Siren as Fire, Crown, Medal } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCodingProblems } from '../../hooks/useCodingProblems';

const CodingBot: React.FC = () => {
  const { user } = useAuth();
  const { 
    dailyProblem, 
    userStats, 
    leaderboard, 
    loading, 
    submitProblem, 
    isProblemCompleted 
  } = useCodingProblems();
  
  const [activeTab, setActiveTab] = useState<'today' | 'leaderboard' | 'resources' | 'progress'>('today');
  const [botResponse, setBotResponse] = useState<string>('');
  const [commandInput, setCommandInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const handleBotCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case '/problem':
        if (dailyProblem) {
          setBotResponse(`🎯 **Today's Coding Challenge**\n\n**${dailyProblem.title}** (${dailyProblem.difficulty})\n\n${dailyProblem.description}\n\n**Platform:** ${dailyProblem.platform}\n**Points:** ${dailyProblem.points}\n**Estimated Time:** ${dailyProblem.estimated_time_minutes} mins\n\nClick "Solve Problem" to start coding! 💪`);
        } else {
          setBotResponse('No daily problem available right now. Check back later! 🔄');
        }
        break;
        
      case '/hint':
        if (dailyProblem && dailyProblem.hints && dailyProblem.hints.length > 0) {
          const hint = dailyProblem.hints[0];
          setBotResponse(`💡 **Hint for ${dailyProblem.title}:**\n\n${hint}\n\nNeed more help? Try thinking about the problem step by step!`);
          setShowHint(true);
        } else {
          setBotResponse('No hints available for the current problem. Try breaking it down into smaller steps!');
        }
        break;
        
      case '/solution':
        if (dailyProblem?.solution_approach) {
          setBotResponse(`🔍 **Solution Approach for ${dailyProblem.title}:**\n\n${dailyProblem.solution_approach}\n\n⚠️ Try to implement this yourself first for better learning!`);
          setShowSolution(true);
        } else {
          setBotResponse('Solution not available yet. Try working through the problem step by step!');
        }
        break;
        
      case '/leaderboard':
        setActiveTab('leaderboard');
        setBotResponse(`🏆 **Current Leaderboard:**\n\nYou're ranked #${userStats.rank} with ${userStats.totalPoints} points!\n\nCheck the leaderboard tab to see your position and compete with others! 🚀`);
        break;
        
      case '/resources':
        setActiveTab('resources');
        setBotResponse(`📚 **Learning Resources:**\n\n• **Data Structures & Algorithms** - Master the fundamentals\n• **System Design** - Learn scalable architecture\n• **Interview Prep** - Practice coding interviews\n• **Competitive Programming** - Enhance problem-solving\n\nCheck the resources tab for detailed materials! 📖`);
        break;
        
      case '/next':
        setBotResponse(`⏭️ **Next Challenge:**\n\nComplete today's problem first to unlock the next challenge!\n\nKeep your streak going! 🔥`);
        break;
        
      case '/streak':
        setBotResponse(`🔥 **Your Coding Streak:**\n\n${userStats.currentStreak} days strong! 💪\n\nKeep it up! Solve today's problem to maintain your streak.`);
        break;
        
      case '/progress':
        setActiveTab('progress');
        setBotResponse(`📊 **Your Progress:**\n\n• **Total Points:** ${userStats.totalPoints}\n• **Problems Solved:** ${userStats.problemsSolved}\n• **Current Streak:** ${userStats.currentStreak} days\n• **Rank:** #${userStats.rank}\n\nKeep coding to climb higher! 🚀`);
        break;
        
      default:
        setBotResponse(`🤖 **Available Commands:**\n\n• **/problem** - Get today's coding problem\n• **/hint** - Get a hint for current problem\n• **/solution** - Get solution approach\n• **/leaderboard** - Show leaderboard\n• **/resources** - Get learning resources\n• **/streak** - Check your streak\n• **/progress** - View your progress\n\nTry any of these commands! 💻`);
    }
    
    setCommandInput('');
  };

  const handleSolveProblem = () => {
    if (dailyProblem) {
      window.open(dailyProblem.problem_url, '_blank');
    }
  };

  const handleMarkCompleted = async () => {
    if (dailyProblem && user && !isProblemCompleted(dailyProblem.id)) {
      try {
        await submitProblem(dailyProblem.id, true);
        setBotResponse(`🎉 **Congratulations!**\n\nYou earned **${dailyProblem.points} points** for solving "${dailyProblem.title}"!\n\n**New Stats:**\n• Total Points: ${userStats.totalPoints + dailyProblem.points}\n• Streak: ${userStats.currentStreak + 1} days\n• Problems Solved: ${userStats.problemsSolved + 1}\n\nKeep up the great work! 🚀`);
      } catch (error) {
        setBotResponse('❌ **Error:** Could not mark problem as completed. Please try again.');
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LeetCode':
        return 'bg-orange-100 text-orange-800';
      case 'GeeksforGeeks':
        return 'bg-green-100 text-green-800';
      case 'HackerRank':
        return 'bg-blue-100 text-blue-800';
      case 'Unstop':
        return 'bg-purple-100 text-purple-800';
      case 'CodeChef':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTodayTab = () => (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</p>
              <p className="text-sm text-blue-700">Total Points</p>
            </div>
            <Trophy className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{userStats.currentStreak}</p>
              <p className="text-sm text-green-700">Day Streak</p>
            </div>
            <Fire className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">#{userStats.rank || '—'}</p>
              <p className="text-sm text-purple-700">Your Rank</p>
            </div>
            <Medal className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Daily Problem */}
      {dailyProblem && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-gray-900 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-indigo-600" />
              Today's Challenge
            </h4>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(dailyProblem.difficulty)}`}>
                {dailyProblem.difficulty}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(dailyProblem.platform)}`}>
                {dailyProblem.platform}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {dailyProblem.points} pts
              </span>
            </div>
          </div>

          <h5 className="text-2xl font-bold text-gray-900 mb-3">{dailyProblem.title}</h5>
          <p className="text-gray-700 mb-4 leading-relaxed">{dailyProblem.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{dailyProblem.estimated_time_minutes} mins</span>
              </div>
              {dailyProblem.acceptance_rate && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{dailyProblem.acceptance_rate}% acceptance</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {dailyProblem.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white text-gray-600 rounded-md text-xs border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSolveProblem}
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Solve Problem
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMarkCompleted}
              disabled={isProblemCompleted(dailyProblem.id)}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isProblemCompleted(dailyProblem.id) ? 'Completed' : 'Mark Complete'}
            </motion.button>
          </div>

          {showHint && dailyProblem.hints && dailyProblem.hints.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h6 className="font-medium text-yellow-800 mb-2">Hints:</h6>
                  {dailyProblem.hints.map((hint, index) => (
                    <p key={index} className="text-yellow-700 text-sm mb-1">
                      {index + 1}. {hint}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {showSolution && dailyProblem.solution_approach && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div className="flex items-start space-x-2">
                <Code className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h6 className="font-medium text-blue-800 mb-2">Solution Approach:</h6>
                  <p className="text-blue-700 text-sm">{dailyProblem.solution_approach}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Bot Response */}
      {botResponse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{botResponse}</pre>
            </div>
          </div>
        </motion.div>
      )}

      {/* Command Input */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleBotCommand(commandInput)}
            placeholder="Type a command (e.g., /problem, /hint, /leaderboard)..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBotCommand(commandInput)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Send
          </motion.button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Try: /problem, /hint, /solution, /leaderboard, /resources, /streak, /progress
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">🏆 Coding Leaderboard</h3>
        <div className="text-sm text-gray-600">Updated daily</div>
      </div>
      
      {leaderboard.map((entry, index) => (
        <motion.div
          key={entry.user_id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            entry.user_id === user?.id
              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-500 w-8">
                #{entry.rank_position || index + 1}
              </div>
              <div className="text-2xl">
                {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐'}
              </div>
              <img
                src={entry.user?.avatar_url || `https://ui-avatars.com/api/?name=${entry.user?.full_name}&background=6366f1&color=fff`}
                alt={entry.user?.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-gray-900">{entry.user?.full_name}</h4>
                <p className="text-sm text-gray-600">{entry.problems_solved} problems solved</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-indigo-600">{entry.total_points}</div>
              <div className="text-sm text-gray-500">points</div>
              <div className="flex items-center text-sm text-orange-600 mt-1">
                <Fire className="h-4 w-4 mr-1" />
                {entry.current_streak} day streak
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">📚 Learning Resources</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: 'Data Structures & Algorithms',
            description: 'Master fundamental concepts with interactive examples',
            icon: <Code className="h-6 w-6" />,
            color: 'bg-blue-50 border-blue-200 text-blue-700'
          },
          {
            title: 'System Design',
            description: 'Learn to design scalable distributed systems',
            icon: <Target className="h-6 w-6" />,
            color: 'bg-green-50 border-green-200 text-green-700'
          },
          {
            title: 'Interview Preparation',
            description: 'Practice coding interviews with real questions',
            icon: <Award className="h-6 w-6" />,
            color: 'bg-purple-50 border-purple-200 text-purple-700'
          },
          {
            title: 'Competitive Programming',
            description: 'Enhance problem-solving with advanced techniques',
            icon: <Zap className="h-6 w-6" />,
            color: 'bg-orange-50 border-orange-200 text-orange-700'
          }
        ].map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-2 ${resource.color} hover:shadow-md transition-all duration-300 cursor-pointer`}
          >
            <div className="flex items-center space-x-3 mb-2">
              {resource.icon}
              <h4 className="font-semibold">{resource.title}</h4>
            </div>
            <p className="text-sm opacity-80">{resource.description}</p>
            <div className="flex items-center mt-3 text-sm font-medium">
              <span>Explore</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">📊 Your Progress</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{userStats.totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{userStats.problemsSolved}</div>
            <div className="text-sm text-gray-600">Problems Solved</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{userStats.currentStreak}</div>
            <div className="text-sm text-gray-600">Current Streak</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">#{userStats.rank || '—'}</div>
            <div className="text-sm text-gray-600">Global Rank</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Completion rate</span>
            <span className="font-medium text-green-600">
              {userStats.problemsSolved > 0 ? '100%' : '0%'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Favorite platform</span>
            <span className="font-medium">LeetCode</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Best streak</span>
            <span className="font-medium">{userStats.currentStreak} days</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="h-7 w-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">AlumConnect Coding Bot</h3>
            <p className="text-sm text-gray-600">Your daily coding companion with challenges & rewards</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'today', label: 'Today\'s Challenge', icon: <Calendar className="h-4 w-4" /> },
          { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="h-4 w-4" /> },
          { id: 'resources', label: 'Resources', icon: <BookOpen className="h-4 w-4" /> },
          { id: 'progress', label: 'Progress', icon: <Target className="h-4 w-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'today' && renderTodayTab()}
          {activeTab === 'leaderboard' && renderLeaderboard()}
          {activeTab === 'resources' && renderResources()}
          {activeTab === 'progress' && renderProgress()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CodingBot;