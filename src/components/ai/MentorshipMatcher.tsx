import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { 
  Brain, 
  Users, 
  Star, 
  MapPin, 
  Building, 
  GraduationCap,
  CheckCircle,
  Sparkles,
  Target,
  BookOpen,
  Briefcase,
  MessageSquare,
  Bot,
  Zap,
  Heart,
  TrendingUp,
  Award,
  Clock,
  Send,
  ArrowRight,
  Filter,
  Search,
  Sliders
} from 'lucide-react';

interface MentorProfile {
  id: string;
  name: string;
  avatar: string;
  position: string;
  company: string;
  experience: number;
  skills: string[];
  interests: string[];
  location: string;
  graduationYear: number;
  institution: string;
  bio: string;
  menteeCount: number;
  rating: number;
  responseRate: number;
  isVerified: boolean;
  matchScore: number;
  matchReasons: string[];
  availability: 'high' | 'medium' | 'low';
  mentorshipStyle: string[];
  languages: string[];
}

interface MatchingCriteria {
  careerGoals: string[];
  interests: string[];
  preferredIndustries: string[];
  location: string;
  experienceLevel: string;
  mentorshipType: string[];
  communicationStyle: string;
}

const MentorshipMatcher: React.FC = () => {
  const { profile } = useAuth();
  const [matches, setMatches] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState<MatchingCriteria>({
    careerGoals: [],
    interests: [],
    preferredIndustries: [],
    location: '',
    experienceLevel: '',
    mentorshipType: [],
    communicationStyle: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [aiIntroMessage, setAiIntroMessage] = useState('');

  // Mock AI-generated mentor matches
  const mockMatches: MentorProfile[] = [
    {
      id: '1',
      name: 'Rahul Sharma',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      position: 'Senior Software Engineer',
      company: 'Google',
      experience: 5,
      skills: ['React', 'Node.js', 'System Design', 'Leadership', 'Microservices'],
      interests: ['AI/ML', 'Open Source', 'Mentoring', 'Tech Talks'],
      location: 'Bangalore, India',
      graduationYear: 2019,
      institution: 'IIT Delhi',
      bio: 'Passionate about building scalable systems and mentoring the next generation of engineers. Love to share knowledge about system design and career growth.',
      menteeCount: 25,
      rating: 4.9,
      responseRate: 98,
      isVerified: true,
      matchScore: 95,
      matchReasons: [
        'Same institution background (IIT)',
        'Expertise in your target skills (React, System Design)',
        'Strong mentoring track record',
        'Similar career trajectory'
      ],
      availability: 'high',
      mentorshipStyle: ['Technical Guidance', 'Career Coaching', 'Project Reviews'],
      languages: ['English', 'Hindi']
    },
    {
      id: '2',
      name: 'Priya Patel',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      position: 'Product Manager',
      company: 'Microsoft',
      experience: 4,
      skills: ['Product Strategy', 'Data Analysis', 'User Research', 'Agile', 'Leadership'],
      interests: ['Product Innovation', 'User Experience', 'Data Science', 'Startups'],
      location: 'Hyderabad, India',
      graduationYear: 2020,
      institution: 'BITS Pilani',
      bio: 'Helping engineers transition to product management. Experienced in building products from 0 to 1 and scaling them globally.',
      menteeCount: 18,
      rating: 4.8,
      responseRate: 95,
      isVerified: true,
      matchScore: 88,
      matchReasons: [
        'Perfect for PM transition goals',
        'Engineering to PM background',
        'Strong analytical skills match',
        'Excellent mentee feedback'
      ],
      availability: 'medium',
      mentorshipStyle: ['Career Transition', 'Strategic Thinking', 'Interview Prep'],
      languages: ['English', 'Hindi', 'Gujarati']
    },
    {
      id: '3',
      name: 'Ankit Gupta',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      position: 'Data Scientist',
      company: 'Amazon',
      experience: 3,
      skills: ['Machine Learning', 'Python', 'Statistics', 'Deep Learning', 'AWS'],
      interests: ['AI Research', 'Computer Vision', 'NLP', 'Open Source'],
      location: 'Mumbai, India',
      graduationYear: 2021,
      institution: 'NIT Trichy',
      bio: 'Specializing in ML/AI applications at scale. Love to help students break into data science and machine learning roles.',
      menteeCount: 12,
      rating: 4.7,
      responseRate: 92,
      isVerified: true,
      matchScore: 82,
      matchReasons: [
        'ML/AI expertise alignment',
        'Recent graduate perspective',
        'Hands-on project experience',
        'Industry best practices'
      ],
      availability: 'high',
      mentorshipStyle: ['Technical Deep-dives', 'Project Guidance', 'Research Mentoring'],
      languages: ['English', 'Hindi']
    }
  ];

  useEffect(() => {
    // Simulate AI matching algorithm
    setLoading(true);
    setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 1500);
  }, [criteria]);

  const generateAIIntroduction = (mentor: MentorProfile) => {
    const introTemplates = [
      `Hi ${mentor.name}! I'm ${profile?.full_name}, a ${profile?.role} at ${profile?.institution}. I'm really interested in ${mentor.skills.slice(0, 2).join(' and ')} and would love to learn from your experience at ${mentor.company}. Your background in ${mentor.matchReasons[0]} particularly resonates with my career goals.`,
      
      `Hello ${mentor.name}! I came across your profile and was impressed by your journey from ${mentor.institution} to ${mentor.company}. As someone aspiring to work in ${mentor.skills[0]}, I'd be grateful for any guidance you could share about ${mentor.matchReasons[1]}. I'm particularly interested in your experience with ${mentor.skills.slice(1, 3).join(' and ')}.`,
      
      `Hi ${mentor.name}! I'm ${profile?.full_name}, currently studying at ${profile?.institution}. Your expertise in ${mentor.skills.slice(0, 2).join(' and ')} aligns perfectly with my career interests. I'd love to learn more about your transition to ${mentor.position} and any advice you might have for someone starting their journey in this field.`
    ];
    
    return introTemplates[Math.floor(Math.random() * introTemplates.length)];
  };

  const handleConnectWithMentor = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setAiIntroMessage(generateAIIntroduction(mentor));
  };

  const handleSendIntroduction = () => {
    if (selectedMentor && aiIntroMessage.trim()) {
      console.log('Sending AI-generated introduction:', {
        mentorId: selectedMentor.id,
        message: aiIntroMessage
      });
      // Handle sending introduction logic
      setSelectedMentor(null);
      setAiIntroMessage('');
    }
  };

  const renderMatchingFilters = () => (
    showFilters && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-white rounded-xl p-6 border border-gray-200 mb-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Sliders className="h-5 w-5 mr-2" />
          Refine Your Matches
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Career Goals</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Software Engineering</option>
              <option>Product Management</option>
              <option>Data Science</option>
              <option>Entrepreneurship</option>
              <option>Research</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry Preference</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Consulting</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Entry Level (0-2 years)</option>
              <option>Mid Level (3-5 years)</option>
              <option>Senior Level (5+ years)</option>
              <option>Executive Level</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mentorship Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Career Guidance</option>
              <option>Technical Mentoring</option>
              <option>Interview Preparation</option>
              <option>Project Reviews</option>
              <option>Networking</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location Preference</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Any Location</option>
              <option>Same City</option>
              <option>Same Country</option>
              <option>Remote Only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Communication Style</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Regular Check-ins</option>
              <option>Project-based</option>
              <option>As-needed Basis</option>
              <option>Intensive Coaching</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Update Matches
          </button>
        </div>
      </motion.div>
    )
  );

  const renderMentorCard = (mentor: MentorProfile) => (
    <motion.div
      key={mentor.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Match Score Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {mentor.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-gray-900">{mentor.name}</h3>
            <p className="text-gray-600">{mentor.position}</p>
            <p className="text-sm text-gray-500">{mentor.company}</p>
          </div>
        </div>
        <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-3 py-2 rounded-full">
          <Brain className="h-4 w-4 text-indigo-600 mr-1" />
          <span className="text-sm font-bold text-indigo-800">{mentor.matchScore}% match</span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

      {/* Match Reasons */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
          Why this match?
        </h4>
        <div className="space-y-1">
          {mentor.matchReasons.slice(0, 2).map((reason, index) => (
            <div key={index} className="flex items-center text-xs text-gray-600">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
              {reason}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-gray-900">{mentor.menteeCount}</div>
          <div className="text-xs text-gray-600">Mentees</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900">{mentor.rating}</div>
          <div className="text-xs text-gray-600">Rating</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900">{mentor.responseRate}%</div>
          <div className="text-xs text-gray-600">Response</div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {mentor.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs"
            >
              {skill}
            </span>
          ))}
          {mentor.skills.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
              +{mentor.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span className={`font-medium ${
            mentor.availability === 'high' ? 'text-green-600' :
            mentor.availability === 'medium' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {mentor.availability === 'high' ? 'Highly Available' :
             mentor.availability === 'medium' ? 'Moderately Available' :
             'Limited Availability'}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {mentor.location}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => handleConnectWithMentor(mentor)}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center group-hover:bg-indigo-700"
        >
          <Bot className="h-4 w-4 mr-2" />
          AI Connect
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <MessageSquare className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );

  const renderAIIntroModal = () => (
    selectedMentor && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-semibold">AI-Powered Introduction</h3>
            </div>
            <button
              onClick={() => setSelectedMentor(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <img
              src={selectedMentor.avatar}
              alt={selectedMentor.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{selectedMentor.name}</h4>
              <p className="text-gray-600">{selectedMentor.position} at {selectedMentor.company}</p>
              <div className="flex items-center mt-1">
                <Brain className="h-4 w-4 text-indigo-600 mr-1" />
                <span className="text-sm text-indigo-600">{selectedMentor.matchScore}% match</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="font-semibold text-gray-900">AI-Generated Introduction</h4>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                Our AI has crafted a personalized introduction based on your profile, shared interests, 
                and career goals to help make a great first impression!
              </p>
            </div>
            <textarea
              value={aiIntroMessage}
              onChange={(e) => setAiIntroMessage(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={6}
              placeholder="Your AI-generated introduction will appear here..."
            />
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Match Highlights</h4>
            <div className="space-y-2">
              {selectedMentor.matchReasons.map((reason, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {reason}
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setSelectedMentor(null)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendIntroduction}
              disabled={!aiIntroMessage.trim()}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Introduction
            </button>
          </div>
        </motion.div>
      </div>
    )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="h-8 w-8 text-indigo-600 mr-3" />
            AI Mentor Matching
          </h2>
          <p className="text-gray-600 mt-1">
            Find your perfect mentor using our advanced AI matching algorithm
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* AI Matching Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mr-4">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Smart Matching Algorithm</h3>
                <p className="text-gray-600">Based on your profile, interests, and career goals</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{matches.length}</div>
              <div className="text-sm text-gray-600">Perfect Matches</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      {renderMatchingFilters()}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-gray-600">AI is finding your perfect mentors...</p>
          </div>
        </div>
      )}

      {/* Mentor Matches */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((mentor) => renderMentorCard(mentor))}
        </div>
      )}

      {/* AI Introduction Modal */}
      {renderAIIntroModal()}
    </div>
  );
};

export default MentorshipMatcher;