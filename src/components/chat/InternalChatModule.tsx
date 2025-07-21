import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Users, 
  Settings,
  Pin,
  Hash,
  Mic,
  Video,
  Phone,
  PhoneOff,
  MicOff,
  VideoOff,
  Crown,
  Trophy,
  Code,
  Bot,
  Search,
  Filter,
  MoreVertical,
  Smile,
  Paperclip,
  Image,
  FileText,
  Calendar,
  Star,
  Heart,
  ThumbsUp,
  Share2,
  Zap,
  Sparkles,
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import CodingBot from './CodingBot';

interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
  role: 'student' | 'alumni' | 'admin';
  contributions: number;
  badge?: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'code' | 'system';
  threadId?: string;
  isPinned?: boolean;
  reactions: { [emoji: string]: string[] };
  mentions: string[];
  edited?: boolean;
  editedAt?: Date;
}

interface ChatThread {
  id: string;
  title: string;
  topic: string;
  createdBy: string;
  createdAt: Date;
  messageCount: number;
  lastActivity: Date;
  isPinned: boolean;
  tags: string[];
}

interface LiveSession {
  id: string;
  title: string;
  host: ChatUser;
  type: 'ama' | 'workshop' | 'interview';
  scheduledAt: Date;
  isLive: boolean;
  participants: string[];
  maxParticipants: number;
}

const InternalChatModule: React.FC = () => {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'threads' | 'leaderboard' | 'live' | 'bot'>('chat');
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(5);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineCount, setOnlineCount] = useState(127);
  const [newMessageAnimation, setNewMessageAnimation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate dynamic activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate online count changes
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1);
      
      // Simulate new messages occasionally
      if (Math.random() < 0.1) {
        setNewMessageAnimation(true);
        setUnreadMessages(prev => prev + 1);
        setTimeout(() => setNewMessageAnimation(false), 2000);
      }
      
      // Simulate typing indicator
      if (Math.random() < 0.05) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock data
  const [onlineUsers] = useState<ChatUser[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      isOnline: true,
      lastSeen: new Date(),
      role: 'alumni',
      contributions: 150,
      badge: '🏆'
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      isOnline: true,
      lastSeen: new Date(),
      role: 'alumni',
      contributions: 120,
      badge: '🥈'
    },
    {
      id: '3',
      name: 'Ankit Gupta',
      email: 'ankit@example.com',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      isOnline: false,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000),
      role: 'student',
      contributions: 95,
      badge: '🥉'
    }
  ]);

  const [threads] = useState<ChatThread[]>([
    {
      id: '1',
      title: 'React Best Practices',
      topic: 'Frontend Development',
      createdBy: '1',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messageCount: 45,
      lastActivity: new Date(Date.now() - 10 * 60 * 1000),
      isPinned: true,
      tags: ['react', 'frontend', 'javascript']
    },
    {
      id: '2',
      title: 'System Design Interview Prep',
      topic: 'Career Guidance',
      createdBy: '2',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messageCount: 78,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
      isPinned: true,
      tags: ['system-design', 'interview', 'career']
    },
    {
      id: '3',
      title: 'Machine Learning Resources',
      topic: 'Learning Resources',
      createdBy: '3',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      messageCount: 32,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: false,
      tags: ['ml', 'ai', 'resources']
    }
  ]);

  const [liveSessions] = useState<LiveSession[]>([
    {
      id: '1',
      title: 'AMA with Google Engineer',
      host: onlineUsers[0],
      type: 'ama',
      scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      isLive: false,
      participants: [],
      maxParticipants: 100
    },
    {
      id: '2',
      title: 'React Workshop',
      host: onlineUsers[1],
      type: 'workshop',
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      isLive: false,
      participants: [],
      maxParticipants: 50
    }
  ]);

  const [messages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: '1',
      content: 'Hey everyone! Just wanted to share this amazing React optimization technique I learned recently. Anyone interested in a quick discussion?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
      threadId: '1',
      reactions: { '👍': ['2', '3'], '🔥': ['2'] },
      mentions: [],
      isPinned: false
    },
    {
      id: '2',
      userId: '2',
      content: 'Absolutely! I\'ve been working on performance optimization lately. What specific technique are you referring to?',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: 'text',
      threadId: '1',
      reactions: { '👍': ['1'] },
      mentions: ['1']
    },
    {
      id: '3',
      userId: '3',
      content: 'This is really helpful! Thanks for sharing @rahul',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      type: 'text',
      threadId: '1',
      reactions: { '❤️': ['1', '2'] },
      mentions: ['1']
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    console.log('Sending message:', message);
    setMessage('');
    
    if (unreadMessages > 0) {
      setUnreadMessages(prev => Math.max(0, prev - 1));
    }
  };

  const handleJoinCall = () => {
    setIsInCall(true);
    setIsMuted(false);
    setIsVideoOn(true);
  };

  const handleLeaveCall = () => {
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOn(false);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadMessages(0);
  };

  const renderChatTab = () => (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {selectedThread ? threads.find(t => t.id === selectedThread)?.title : 'General Chat'}
            </h3>
            <p className="text-sm text-gray-500 flex items-center">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {onlineCount} online
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleJoinCall}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages
          .filter(msg => !selectedThread || msg.threadId === selectedThread)
          .map((msg) => {
            const user = onlineUsers.find(u => u.id === msg.userId);
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3 group"
              >
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{user?.name}</span>
                    {user?.badge && <span>{user.badge}</span>}
                    <span className="text-xs text-gray-500">
                      {format(msg.timestamp, 'HH:mm')}
                    </span>
                    {msg.isPinned && <Pin className="h-3 w-3 text-yellow-500" />}
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <p className="text-gray-800">{msg.content}</p>
                    {Object.keys(msg.reactions).length > 0 && (
                      <div className="flex items-center space-x-2 mt-2">
                        {Object.entries(msg.reactions).map(([emoji, users]) => (
                          <button
                            key={emoji}
                            className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                          >
                            <span>{emoji}</span>
                            <span>{users.length}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 text-gray-500 text-sm"
          >
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            <span>Someone is typing...</span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Smile className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip className="h-4 w-4" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderThreadsTab = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Discussion Threads</h3>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
          New Thread
        </button>
      </div>
      
      <div className="space-y-3">
        {threads.map((thread) => (
          <motion.div
            key={thread.id}
            whileHover={{ scale: 1.02 }}
            className="p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-all cursor-pointer"
            onClick={() => {
              setSelectedThread(thread.id);
              setActiveTab('chat');
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <h4 className="font-medium text-gray-900">{thread.title}</h4>
                  {thread.isPinned && <Pin className="h-4 w-4 text-yellow-500" />}
                </div>
                <p className="text-sm text-gray-600 mt-1">{thread.topic}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span>{thread.messageCount} messages</span>
                  <span>{format(thread.lastActivity, 'MMM d, HH:mm')}</span>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  {thread.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLeaderboardTab = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Weekly Contributors</h3>
        <Trophy className="h-5 w-5 text-yellow-500" />
      </div>
      
      <div className="space-y-3">
        {onlineUsers
          .sort((a, b) => b.contributions - a.contributions)
          .map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200"
            >
              <div className="text-lg font-bold text-gray-500 w-6">
                #{index + 1}
              </div>
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{user.name}</span>
                  {user.badge && <span className="text-lg">{user.badge}</span>}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{user.contributions} contributions</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-400' : 'bg-gray-300'}`} />
            </motion.div>
          ))}
      </div>
    </div>
  );

  const renderLiveTab = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Live Sessions</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-red-600">Live</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {liveSessions.map((session) => (
          <motion.div
            key={session.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    session.type === 'ama' ? 'bg-purple-100 text-purple-800' :
                    session.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {session.type.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={session.host.avatar || `https://ui-avatars.com/api/?name=${session.host.name}&background=6366f1&color=fff`}
                    alt={session.host.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600">Hosted by {session.host.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{format(session.scheduledAt, 'MMM d, HH:mm')}</span>
                  <span>{session.participants.length}/{session.maxParticipants} participants</span>
                </div>
              </div>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                {session.isLive ? 'Join Live' : 'Set Reminder'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBotTab = () => (
    <div className="h-full">
      <CodingBot />
    </div>
  );

  const renderOnlineUsers = () => (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">
        Online Members ({onlineUsers.filter(u => u.isOnline).length})
      </h3>
      <div className="space-y-2">
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="relative">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                user.isOnline ? 'bg-green-400' : 'bg-gray-300'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                {user.badge && <span className="text-xs">{user.badge}</span>}
              </div>
              <p className="text-xs text-gray-500">
                {user.isOnline ? 'Online' : `Last seen ${format(user.lastSeen, 'HH:mm')}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCallInterface = () => (
    <AnimatePresence>
      {isInCall && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0 bg-gray-900 z-50 flex flex-col"
        >
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-16 w-16" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Session</h3>
                <p className="text-white/80">Connected to voice channel</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-800 flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-colors ${
                isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isMuted ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5 text-white" />}
            </button>
            
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full transition-colors ${
                !isVideoOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isVideoOn ? <Video className="h-5 w-5 text-white" /> : <VideoOff className="h-5 w-5 text-white" />}
            </button>
            
            <button
              onClick={handleLeaveCall}
              className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
            >
              <PhoneOff className="h-5 w-5 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Dynamic floating button with enhanced animations
  const FloatingButton = () => (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.button
        onClick={handleOpenChat}
        className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-2xl overflow-hidden group"
        animate={{
          boxShadow: [
            "0 10px 30px rgba(99, 102, 241, 0.3)",
            "0 15px 40px rgba(147, 51, 234, 0.4)",
            "0 10px 30px rgba(99, 102, 241, 0.3)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            background: [
              "linear-gradient(45deg, #6366f1, #8b5cf6)",
              "linear-gradient(45deg, #8b5cf6, #6366f1)",
              "linear-gradient(45deg, #6366f1, #8b5cf6)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 0.2, 0.7]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main icon with dynamic animation */}
        <div className="relative z-10 flex items-center justify-center">
          <motion.div
            animate={{
              rotate: newMessageAnimation ? [0, 10, -10, 0] : 0,
              scale: newMessageAnimation ? [1, 1.2, 1] : 1
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <MessageSquare className="h-6 w-6 relative z-10" />
          </motion.div>
        </div>
        
        {/* Activity indicator */}
        <motion.div
          className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${20 + i * 20}%`,
              left: `${20 + i * 20}%`
            }}
            animate={{
              y: [-2, -8, -2],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.button>
      
      {/* Enhanced notification badge */}
      {unreadMessages > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 min-w-[24px] h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
          style={{ zIndex: 9999 }}
        >
          <motion.span
            className="text-white text-xs font-bold px-1"
            animate={{
              scale: newMessageAnimation ? [1, 1.3, 1] : [1, 1.1, 1]
            }}
            transition={{
              duration: newMessageAnimation ? 0.5 : 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {unreadMessages > 99 ? '99+' : unreadMessages}
          </motion.span>
        </motion.div>
      )}
      
      {/* Online indicator */}
      <motion.div
        className="absolute -bottom-1 -left-1 bg-white rounded-full p-1 shadow-lg"
        animate={{
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
          <motion.div
            className="w-1 h-1 bg-white rounded-full"
            animate={{
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="fixed bottom-6 left-6 z-[9998]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className={`bg-white rounded-2xl shadow-2xl border border-gray-200 ${
              isMinimized ? 'w-80 h-16' : 'w-[900px] h-[700px]'
            } flex flex-col transition-all duration-300 overflow-hidden relative`}
            style={{ zIndex: 9998 }}
          >
            {renderCallInterface()}
            
            {/* Enhanced Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center relative overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />
              
              <div className="flex items-center space-x-3 relative z-10">
                <motion.div 
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <MessageSquare className="h-5 w-5" />
                </motion.div>
                <div>
                  <span className="font-semibold">AlumConnect Chat</span>
                  <div className="text-xs opacity-90 flex items-center">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full mr-2"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {onlineCount} members online
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 relative z-10">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
            
            {!isMinimized && (
              <>
                {/* Enhanced Tabs */}
                <div className="flex border-b border-gray-200 bg-gray-50">
                  {[
                    { id: 'chat', label: 'Chat', icon: MessageSquare },
                    { id: 'threads', label: 'Threads', icon: Hash },
                    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
                    { id: 'live', label: 'Live', icon: Video },
                    { id: 'bot', label: 'Coding Bot', icon: Bot }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-300 relative ${
                        activeTab === tab.id
                          ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                    >
                      <motion.div
                        animate={activeTab === tab.id ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <tab.icon className="h-4 w-4" />
                      </motion.div>
                      <span>{tab.label}</span>
                      {tab.id === 'live' && (
                        <motion.div
                          className="w-2 h-2 bg-red-500 rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.7, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
                
                {/* Content */}
                <div className="flex-1 flex overflow-hidden">
                  <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        {activeTab === 'chat' && renderChatTab()}
                        {activeTab === 'threads' && renderThreadsTab()}
                        {activeTab === 'leaderboard' && renderLeaderboardTab()}
                        {activeTab === 'live' && renderLiveTab()}
                        {activeTab === 'bot' && renderBotTab()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {activeTab === 'chat' && renderOnlineUsers()}
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="floating-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <FloatingButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InternalChatModule;