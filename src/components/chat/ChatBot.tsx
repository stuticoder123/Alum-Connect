import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Minimize2, Maximize2, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AlumConnect AI assistant. I can help you with questions about our platform, connecting with alumni, finding mentors, career advice, coding problems, and much more. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to AlumConnect! I'm here to help you navigate our platform and answer any questions you might have. Whether you're looking for mentors, career advice, or want to know about our features, I'm here to assist you!";
    }
    
    // About AlumConnect
    if (lowerMessage.includes('what is alumconnect') || lowerMessage.includes('about alumconnect') || lowerMessage.includes('tell me about')) {
      return "AlumConnect is a comprehensive social platform that bridges the gap between alumni and students. We offer:\n\n🎓 **Free Mentorship** - Connect with industry professionals\n💼 **Job Opportunities** - Access exclusive job postings\n📚 **Learning Resources** - Courses, articles, and study materials\n🏆 **Coding Challenges** - Daily problems with leaderboards\n🎯 **Events & Workshops** - Networking and skill-building sessions\n💬 **Community Forums** - Connect with like-minded professionals\n\nEverything is completely free and designed to help you succeed in your career!";
    }
    
    // Mentorship questions
    if (lowerMessage.includes('mentor') || lowerMessage.includes('mentorship')) {
      return "Great question about mentorship! Here's how our mentorship system works:\n\n🤖 **AI-Powered Matching** - Our algorithm matches you with relevant alumni based on your interests, career goals, and background\n\n✅ **Verified Profiles** - All mentors are verified alumni from top companies\n\n💰 **Completely Free** - No charges for mentorship sessions\n\n📅 **Flexible Scheduling** - Book sessions at your convenience\n\n🎯 **Personalized Guidance** - Get advice tailored to your specific goals\n\nTo find a mentor, go to the 'Find Mentors' section in your dashboard and browse through our AI-recommended matches!";
    }
    
    // Job-related questions
    if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('opportunity') || lowerMessage.includes('hiring')) {
      return "Excellent! AlumConnect offers amazing career opportunities:\n\n💼 **Exclusive Job Board** - Access jobs posted directly by alumni\n🔗 **Referral Network** - Get referrals from alumni at top companies\n📄 **Resume Reviews** - Free resume feedback from industry professionals\n🎯 **Interview Prep** - Mock interviews and preparation sessions\n📈 **Career Guidance** - Personalized career path recommendations\n\nMany of our students have landed jobs at Google, Microsoft, Amazon, and other top companies through our platform. Check out the 'Job Board' section in your dashboard to get started!";
    }
    
    // Events and workshops
    if (lowerMessage.includes('event') || lowerMessage.includes('workshop') || lowerMessage.includes('webinar')) {
      return "We host amazing events regularly! Here's what we offer:\n\n🎪 **Types of Events:**\n• Career workshops and skill-building sessions\n• Industry talks by senior professionals\n• Networking meetups (virtual & in-person)\n• AMA sessions with industry leaders\n• Technical workshops and coding bootcamps\n\n📅 **How to Join:**\n1. Check the Events section in your dashboard\n2. Browse upcoming events\n3. RSVP to secure your spot\n4. Attend and network with professionals\n\nEvents are free and a great way to expand your network and learn new skills!";
    }
    
    // Coding and technical questions
    if (lowerMessage.includes('coding') || lowerMessage.includes('programming') || lowerMessage.includes('algorithm') || lowerMessage.includes('technical')) {
      return "Perfect! AlumConnect has excellent coding resources:\n\n💻 **Daily Coding Challenges** - Solve problems from LeetCode, HackerRank, and more\n🏆 **Leaderboards** - Compete with peers and track your progress\n🔥 **Streak System** - Maintain daily coding streaks for rewards\n📚 **Learning Resources** - Curated programming tutorials and guides\n👨‍💻 **Code Reviews** - Get your code reviewed by experienced developers\n🎯 **Interview Prep** - Technical interview practice and tips\n\nOur Coding Bot can help you with daily challenges, hints, and solutions. Try typing '/problem' to get today's challenge!";
    }
    
    // How to get started
    if (lowerMessage.includes('how to start') || lowerMessage.includes('get started') || lowerMessage.includes('begin') || lowerMessage.includes('new user')) {
      return "Welcome to AlumConnect! Here's how to get started:\n\n1️⃣ **Complete Your Profile** - Add your education, interests, and career goals\n2️⃣ **Explore Mentors** - Browse AI-recommended mentors in your field\n3️⃣ **Join Events** - Attend workshops and networking sessions\n4️⃣ **Solve Coding Problems** - Start with daily challenges\n5️⃣ **Connect with Alumni** - Send connection requests and start conversations\n6️⃣ **Apply for Jobs** - Browse our exclusive job board\n\n🎯 **Pro Tip:** The more complete your profile, the better mentor matches you'll get!";
    }
    
    // Platform features
    if (lowerMessage.includes('feature') || lowerMessage.includes('what can i do') || lowerMessage.includes('capabilities')) {
      return "AlumConnect offers comprehensive features for your success:\n\n🎓 **For Students:**\n• Find mentors in your field\n• Access job opportunities\n• Join coding challenges\n• Attend free workshops\n• Get resume reviews\n• Connect with alumni\n\n👨‍💼 **For Alumni:**\n• Mentor students\n• Post job opportunities\n• Share resources\n• Host events\n• Build your network\n\n🤖 **AI-Powered:**\n• Smart mentor matching\n• Personalized recommendations\n• Career path suggestions\n• Skill assessments\n\nEverything is designed to help you succeed in your career journey!";
    }
    
    // Success stories
    if (lowerMessage.includes('success') || lowerMessage.includes('testimonial') || lowerMessage.includes('achievement')) {
      return "Our success stories are inspiring! Here are some highlights:\n\n🚀 **Career Transformations:**\n• 95% of students find mentors within 2 weeks\n• 78% receive job referrals through our network\n• 85% report improved interview performance\n• 92% say mentorship accelerated their career\n\n🏆 **Notable Achievements:**\n• Students placed at Google, Microsoft, Amazon, Meta\n• 500+ successful career transitions\n• 10,000+ mentorship sessions completed\n• 50+ countries represented in our community\n\n💡 **What Users Say:**\n\"AlumConnect changed my career trajectory completely!\" - Priya, Software Engineer at Google\n\nCheck out our Success Stories page for more inspiring journeys!";
    }
    
    // Pricing and cost
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('free') || lowerMessage.includes('payment')) {
      return "Great news! AlumConnect is completely FREE! 🎉\n\n💰 **What's Free:**\n• Unlimited mentorship sessions\n• Access to all job postings\n• Coding challenges and resources\n• Event participation\n• Resume reviews\n• Community access\n• AI-powered matching\n\n🎯 **Our Mission:** We believe quality mentorship and career guidance should be accessible to everyone, regardless of financial background.\n\n✨ **No Hidden Costs:** No premium tiers, no subscription fees, no charges for connecting with mentors.\n\nJust create your profile and start connecting!";
    }
    
    // Technical support
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      return "I'm here to help! Here are ways to get support:\n\n🤖 **AI Assistant (Me!):** Ask me anything about the platform\n📧 **Email Support:** stuticoder123@gmail.com\n💬 **Community Help:** Ask questions in our forums\n📚 **Help Center:** Check our FAQ and guides\n🎥 **Video Tutorials:** Step-by-step platform guides\n\n🔧 **Common Issues:**\n• Profile setup and verification\n• Mentor matching and connections\n• Event registration\n• Technical difficulties\n• Account management\n\nWhat specific issue can I help you with today?";
    }
    
    // LinkedIn integration
    if (lowerMessage.includes('linkedin') || lowerMessage.includes('sign in') || lowerMessage.includes('login')) {
      return "LinkedIn integration makes joining AlumConnect seamless!\n\n🔗 **LinkedIn Sign-In Benefits:**\n• Quick profile setup with your professional info\n• Automatic skill and experience import\n• Enhanced mentor matching based on your network\n• Verified professional background\n• Easy connection with colleagues\n\n✅ **How to Sign In:**\n1. Click 'Sign in with LinkedIn' on the homepage\n2. Authorize AlumConnect to access your basic profile\n3. Your profile will be automatically populated\n4. Complete any additional information\n5. Start connecting with mentors!\n\n🔒 **Privacy:** We only access basic profile information and never post on your behalf.";
    }
    
    // Verification process
    if (lowerMessage.includes('verify') || lowerMessage.includes('verification') || lowerMessage.includes('badge')) {
      return "Profile verification builds trust in our community!\n\n✅ **Verification Process:**\n• LinkedIn profile connection\n• Educational background confirmation\n• Current employment verification\n• Professional references (optional)\n\n🏆 **Benefits of Verification:**\n• Blue verification badge on your profile\n• Higher visibility in mentor matching\n• Increased trust from students/alumni\n• Access to exclusive verified-only events\n• Priority in job referrals\n\n⏱️ **Timeline:** Verification typically takes 2-3 business days\n\n🔒 **Security:** All verification data is encrypted and secure\n\nWant to start your verification process?";
    }
    
    // Coding bot specific
    if (lowerMessage.includes('/problem') || lowerMessage.includes('daily challenge') || lowerMessage.includes('coding challenge')) {
      return "🎯 **Today's Coding Challenge is ready!**\n\n**Problem:** Two Sum (Easy)\n**Platform:** LeetCode\n**Points:** 10\n**Estimated Time:** 15 minutes\n\n**Description:** Given an array of integers and a target, return indices of two numbers that add up to the target.\n\n💡 **Hint:** Consider using a hash map to store numbers and their indices.\n\n🚀 **Commands:**\n• `/hint` - Get additional hints\n• `/solution` - View solution approach\n• `/leaderboard` - Check your ranking\n• `/streak` - View your coding streak\n\nGood luck! Remember, consistency is key to improving your coding skills.";
    }
    
    // Default comprehensive response
    return "I'm here to help with anything related to AlumConnect! I can assist you with:\n\n🎓 **Mentorship:** Finding mentors, booking sessions, getting career advice\n💼 **Jobs:** Browsing opportunities, getting referrals, resume reviews\n💻 **Coding:** Daily challenges, technical prep, skill building\n🎪 **Events:** Workshops, networking, webinars\n🔗 **Networking:** Connecting with alumni, building relationships\n📚 **Learning:** Resources, courses, skill development\n🤖 **Platform:** Features, navigation, account management\n\n**Popular Commands:**\n• Ask about mentorship opportunities\n• Inquire about job search help\n• Get coding challenge assistance\n• Learn about upcoming events\n• Request platform guidance\n\nWhat would you like to know more about? I'm here to help you succeed! 🚀";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const response = getAIResponse(input);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Failed to get response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble processing your request right now. Please try again or contact our support team at stuticoder123@gmail.com for assistance.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // Dynamic floating button with animated elements
  const FloatingButton = () => (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.button
        onClick={toggleChat}
        className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group"
        animate={{
          boxShadow: [
            "0 10px 30px rgba(99, 102, 241, 0.3)",
            "0 10px 30px rgba(147, 51, 234, 0.3)",
            "0 10px 30px rgba(236, 72, 153, 0.3)",
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
          className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            background: [
              "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
              "linear-gradient(135deg, #8b5cf6, #ec4899, #6366f1)",
              "linear-gradient(135deg, #ec4899, #6366f1, #8b5cf6)",
              "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)"
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
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main icon */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Bot className="h-7 w-7 text-white drop-shadow-lg" />
          </motion.div>
        </div>
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full"
          animate={{
            y: [-2, -8, -2],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute bottom-3 left-3 w-1 h-1 bg-white rounded-full"
          animate={{
            y: [2, 8, 2],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1
          }}
        />
      </motion.button>
      
      {/* Notification badge */}
      <motion.div
        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="h-3 w-3 text-white" />
      </motion.div>
    </motion.div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className={`bg-white rounded-3xl shadow-2xl border border-gray-200 ${
              isMinimized ? 'h-20' : 'h-[600px]'
            } w-96 flex flex-col transition-all duration-300 overflow-hidden`}
            style={{ zIndex: 9999 }}
          >
            {/* Dynamic Header */}
            <motion.div 
              className="relative p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-3xl cursor-pointer overflow-hidden"
              onClick={() => setIsMinimized(!isMinimized)}
              whileHover={{ 
                background: "linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899, #4f46e5)"
              }}
              animate={{
                background: [
                  "linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899)",
                  "linear-gradient(90deg, #7c3aed, #ec4899, #4f46e5)",
                  "linear-gradient(90deg, #ec4899, #4f46e5, #7c3aed)",
                  "linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899)"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <Bot className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <motion.span 
                        className="font-bold text-lg"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(255,255,255,0.5)",
                            "0 0 20px rgba(255,255,255,0.8)",
                            "0 0 10px rgba(255,255,255,0.5)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        AlumConnect AI
                      </motion.span>
                      <div className="text-xs opacity-90 flex items-center">
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full mr-2"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        Always here to help
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      {isMinimized ? (
                        <Maximize2 className="h-4 w-4" />
                      ) : (
                        <Minimize2 className="h-4 w-4" />
                      )}
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <motion.div 
                          className={`max-w-[85%] rounded-2xl p-4 ${
                            message.role === 'user' 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white ml-4 shadow-lg' 
                              : 'bg-white text-gray-800 shadow-md border border-gray-100 mr-4'
                          }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start">
                            {message.role === 'assistant' && (
                              <motion.div 
                                className="mr-3 mt-1"
                                animate={{
                                  rotate: [0, 10, -10, 0],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                  <Bot className="h-4 w-4 text-white" />
                                </div>
                              </motion.div>
                            )}
                            <div className="flex-1">
                              <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                              <div className={`text-xs mt-2 opacity-70 ${
                                message.role === 'user' ? 'text-white' : 'text-gray-500'
                              }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            {message.role === 'user' && (
                              <motion.div 
                                className="ml-3 mt-1"
                                whileHover={{ scale: 1.1 }}
                              >
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-white" />
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 mr-4">
                        <div className="flex items-center space-x-2">
                          <motion.div 
                            className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Bot className="h-4 w-4 text-white" />
                          </motion.div>
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
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
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <motion.div 
                  className="p-4 border-t border-gray-100 bg-white rounded-b-3xl"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex space-x-3">
                    <motion.input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder="Ask me anything about AlumConnect..."
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      disabled={isLoading}
                      whileFocus={{ scale: 1.02 }}
                    />
                    <motion.button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <Send className="h-5 w-5 relative z-10" />
                    </motion.button>
                  </div>
                </motion.div>
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

export default ChatBot;