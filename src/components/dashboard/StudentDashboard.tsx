import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import { useNotifications } from '../../hooks/useNotifications';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { 
  Users, 
  Briefcase, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Star, 
  MapPin, 
  Building, 
  GraduationCap,
  Bot,
  Sparkles,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Video,
  Coffee,
  Send,
  Heart,
  ThumbsUp,
  Share2,
  MoreHorizontal,
  Search,
  Filter,
  Bell,
  Plus,
  ArrowRight,
  Zap,
  Brain,
  Shield
} from 'lucide-react';
import { format } from 'date-fns';

interface MentorMatch {
  id: string;
  name: string;
  avatar: string;
  position: string;
  company: string;
  experience: number;
  skills: string[];
  matchScore: number;
  isVerified: boolean;
  responseRate: number;
  location: string;
  graduationYear: number;
  bio: string;
  menteeCount: number;
  rating: number;
}

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time';
  salary: string;
  postedBy: string;
  postedDate: Date;
  applicants: number;
  isRemote: boolean;
  skills: string[];
}

interface ResumeReview {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  reviewerPosition: string;
  status: 'pending' | 'in-progress' | 'completed';
  submittedDate: Date;
  feedback?: string;
  rating?: number;
}

const StudentDashboard: React.FC = () => {
  const { profile } = useAuth();
  const { posts, loading, createPost } = usePosts();
  const { notifications, unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState('overview');
  const [newPost, setNewPost] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<MentorMatch | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiChatMessage, setAiChatMessage] = useState('');

  // Mock data for AI-matched mentors
  const aiMentorMatches: MentorMatch[] = [
    {
      id: '1',
      name: 'Rahul Sharma',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      position: 'Senior Software Engineer',
      company: 'Google',
      experience: 5,
      skills: ['React', 'Node.js', 'System Design', 'Leadership'],
      matchScore: 95,
      isVerified: true,
      responseRate: 98,
      location: 'Bangalore, India',
      graduationYear: 2019,
      bio: 'Passionate about mentoring students and helping them navigate their tech careers.',
      menteeCount: 25,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Priya Patel',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      position: 'Product Manager',
      company: 'Microsoft',
      experience: 4,
      skills: ['Product Strategy', 'Data Analysis', 'User Research', 'Agile'],
      matchScore: 88,
      isVerified: true,
      responseRate: 95,
      location: 'Hyderabad, India',
      graduationYear: 2020,
      bio: 'Helping students transition from engineering to product management roles.',
      menteeCount: 18,
      rating: 4.8
    },
    {
      id: '3',
      name: 'Ankit Gupta',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      position: 'Data Scientist',
      company: 'Amazon',
      experience: 3,
      skills: ['Machine Learning', 'Python', 'Statistics', 'Deep Learning'],
      matchScore: 82,
      isVerified: true,
      responseRate: 92,
      location: 'Mumbai, India',
      graduationYear: 2021,
      bio: 'Specializing in ML/AI career guidance and technical mentorship.',
      menteeCount: 12,
      rating: 4.7
    }
  ];

  // Mock job opportunities
  const jobOpportunities: JobOpportunity[] = [
    {
      id: '1',
      title: 'Software Engineer Intern',
      company: 'Google',
      location: 'Bangalore',
      type: 'Internship',
      salary: '₹80,000/month',
      postedBy: 'Rahul Sharma',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      applicants: 45,
      isRemote: false,
      skills: ['React', 'JavaScript', 'Node.js']
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'Flipkart',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹12-18 LPA',
      postedBy: 'Priya Patel',
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      applicants: 23,
      isRemote: true,
      skills: ['React', 'TypeScript', 'CSS']
    },
    {
      id: '3',
      title: 'Data Science Intern',
      company: 'Zomato',
      location: 'Gurgaon',
      type: 'Internship',
      salary: '₹50,000/month',
      postedBy: 'Ankit Gupta',
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      applicants: 67,
      isRemote: false,
      skills: ['Python', 'Machine Learning', 'SQL']
    }
  ];

  // Mock resume reviews
  const resumeReviews: ResumeReview[] = [
    {
      id: '1',
      reviewerName: 'Rahul Sharma',
      reviewerAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      reviewerPosition: 'Senior Software Engineer at Google',
      status: 'completed',
      submittedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      feedback: 'Great technical skills highlighted! Consider adding more quantifiable achievements and impact metrics.',
      rating: 4.5
    },
    {
      id: '2',
      reviewerName: 'Priya Patel',
      reviewerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      reviewerPosition: 'Product Manager at Microsoft',
      status: 'in-progress',
      submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ];

  const handleConnectWithMentor = (mentor: MentorMatch) => {
    setSelectedMentor(mentor);
    setShowAIChat(true);
  };

  const handleSendAIMessage = () => {
    if (aiChatMessage.trim() && selectedMentor) {
      // Simulate AI-powered introduction
      console.log(`AI Introduction to ${selectedMentor.name}: ${aiChatMessage}`);
      setAiChatMessage('');
      setShowAIChat(false);
      // Show success message
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-gray-600">Active Mentors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-gray-600">Job Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-gray-600">Resume Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-gray-600">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Mentor Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-semibold">AI-Powered Mentor Matches</h3>
              <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
            </div>
            <span className="text-sm text-gray-500">Based on your profile & goals</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiMentorMatches.slice(0, 3).map((mentor) => (
              <motion.div
                key={mentor.id}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-indigo-50 rounded-xl p-4 border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {mentor.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900">{mentor.name}</h4>
                      <p className="text-sm text-gray-600">{mentor.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-green-800">{mentor.matchScore}% match</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-1" />
                    {mentor.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mentor.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {mentor.rating} ({mentor.menteeCount} mentees)
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleConnectWithMentor(mentor)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium group-hover:bg-indigo-700"
                >
                  Connect with AI Intro
                </button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Job Opportunities</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobOpportunities.slice(0, 3).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                    <p className="text-sm text-green-600">{job.salary}</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Resume Review Status</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumeReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={review.reviewerAvatar}
                      alt={review.reviewerName}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{review.reviewerName}</h4>
                      <p className="text-sm text-gray-600">{review.reviewerPosition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      review.status === 'completed' ? 'bg-green-100 text-green-800' :
                      review.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {review.status}
                    </span>
                    {review.rating && (
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{review.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMentorshipTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Find Your Perfect Mentor</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiMentorMatches.map((mentor) => (
          <motion.div
            key={mentor.id}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group"
          >
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
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900">{mentor.name}</h3>
                  <p className="text-gray-600">{mentor.position}</p>
                  <p className="text-sm text-gray-500">{mentor.company}</p>
                </div>
              </div>
              <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-3 py-1 rounded-full">
                <Sparkles className="h-4 w-4 text-indigo-600 mr-1" />
                <span className="text-sm font-medium text-indigo-800">{mentor.matchScore}% match</span>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4">{mentor.bio}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {mentor.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <GraduationCap className="h-4 w-4 mr-2" />
                Class of {mentor.graduationYear}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                {mentor.menteeCount} mentees • {mentor.responseRate}% response rate
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                {mentor.rating} rating
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleConnectWithMentor(mentor)}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Connect
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderJobBoardTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Job Opportunities</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobOpportunities.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.type === 'Internship' ? 'bg-blue-100 text-blue-800' :
                      job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {job.type}
                    </span>
                    {job.isRemote && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        Remote
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {format(job.postedDate, 'MMM d, yyyy')}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="font-semibold text-green-600">{job.salary}</span>
                    <span>{job.applicants} applicants</span>
                    <span>Posted by {job.postedBy}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                    Apply Now
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Save Job
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderResumeReviewTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Resume Reviews</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          Request New Review
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {resumeReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={review.reviewerAvatar}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{review.reviewerName}</h3>
                    <p className="text-gray-600">{review.reviewerPosition}</p>
                    <p className="text-sm text-gray-500">
                      Submitted {format(review.submittedDate, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    review.status === 'completed' ? 'bg-green-100 text-green-800' :
                    review.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                  {review.rating && (
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{review.rating}/5</span>
                    </div>
                  )}
                </div>
              </div>

              {review.feedback && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Feedback:</h4>
                  <p className="text-gray-700">{review.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // AI Chat Modal
  const renderAIChatModal = () => (
    showAIChat && selectedMentor && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Bot className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold">AI-Powered Introduction</h3>
            </div>
            <button
              onClick={() => setShowAIChat(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <img
                src={selectedMentor.avatar}
                alt={selectedMentor.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="font-medium">{selectedMentor.name}</h4>
                <p className="text-sm text-gray-600">{selectedMentor.position}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
              Our AI will craft a personalized introduction based on your shared interests, 
              background, and career goals to help break the ice!
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to discuss?
              </label>
              <textarea
                value={aiChatMessage}
                onChange={(e) => setAiChatMessage(e.target.value)}
                placeholder="e.g., Career guidance, technical skills, interview preparation..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowAIChat(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendAIMessage}
                disabled={!aiChatMessage.trim()}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Send AI Intro
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'mentorship', label: 'Find Mentors', icon: <Users className="h-5 w-5" /> },
    { id: 'jobs', label: 'Job Board', icon: <Briefcase className="h-5 w-5" /> },
    { id: 'resume', label: 'Resume Reviews', icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.full_name?.split(' ')[0]}! 🎓
          </h1>
          <p className="text-gray-600 mt-1">
            Your personalized dashboard to accelerate your career journey
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'mentorship' && renderMentorshipTab()}
        {activeTab === 'jobs' && renderJobBoardTab()}
        {activeTab === 'resume' && renderResumeReviewTab()}
      </div>

      {/* AI Chat Modal */}
      {renderAIChatModal()}
    </div>
  );
};

export default StudentDashboard;