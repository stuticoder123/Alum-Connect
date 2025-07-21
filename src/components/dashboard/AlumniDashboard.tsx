import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Briefcase, 
  Star, 
  MapPin, 
  Building, 
  GraduationCap,
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
  Shield,
  UserPlus,
  FileText,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Edit,
  Upload,
  BadgeCheck
} from 'lucide-react';
import { format } from 'date-fns';

interface MenteeRequest {
  id: string;
  studentName: string;
  studentAvatar: string;
  studentInstitution: string;
  studentYear: string;
  requestMessage: string;
  interests: string[];
  careerGoals: string;
  matchScore: number;
  requestDate: Date;
  status: 'pending' | 'accepted' | 'declined';
}

interface NetworkingRoom {
  id: string;
  title: string;
  description: string;
  topic: string;
  participants: number;
  maxParticipants: number;
  scheduledAt: Date;
  duration: number;
  host: string;
  isLive: boolean;
  tags: string[];
}

interface EventInvite {
  id: string;
  title: string;
  description: string;
  organizer: string;
  organizerAvatar: string;
  eventDate: Date;
  location: string;
  type: 'workshop' | 'webinar' | 'networking' | 'ama';
  attendees: number;
  status: 'invited' | 'accepted' | 'declined';
}

interface VerificationDocument {
  id: string;
  type: 'linkedin' | 'work_email' | 'college_docs' | 'company_id';
  status: 'pending' | 'verified' | 'rejected';
  uploadedDate: Date;
  fileName: string;
}

const AlumniDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // Mock data for mentee requests
  const menteeRequests: MenteeRequest[] = [
    {
      id: '1',
      studentName: 'Arjun Kumar',
      studentAvatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      studentInstitution: 'IIT Delhi',
      studentYear: '3rd Year B.Tech CSE',
      requestMessage: 'Hi! I\'m really interested in transitioning to product management after my engineering degree. Your journey from engineering to PM at Google is exactly what I aspire to achieve.',
      interests: ['Product Management', 'User Research', 'Data Analysis'],
      careerGoals: 'Transition to Product Management role at a top tech company',
      matchScore: 92,
      requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '2',
      studentName: 'Sneha Patel',
      studentAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      studentInstitution: 'BITS Pilani',
      studentYear: '4th Year B.Tech CSE',
      requestMessage: 'I\'m preparing for software engineering interviews and would love guidance on system design and coding interviews.',
      interests: ['Software Engineering', 'System Design', 'Algorithms'],
      careerGoals: 'Software Engineer at FAANG companies',
      matchScore: 88,
      requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '3',
      studentName: 'Vikram Singh',
      studentAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      studentInstitution: 'NIT Trichy',
      studentYear: '2nd Year B.Tech CSE',
      requestMessage: 'I want to build a strong foundation in machine learning and AI. Your expertise would be invaluable.',
      interests: ['Machine Learning', 'AI', 'Data Science'],
      careerGoals: 'AI/ML Engineer or Research Scientist',
      matchScore: 85,
      requestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'accepted'
    }
  ];

  // Mock networking rooms
  const networkingRooms: NetworkingRoom[] = [
    {
      id: '1',
      title: 'Tech Career Transitions',
      description: 'Discussion about transitioning between different tech roles',
      topic: 'Career Development',
      participants: 12,
      maxParticipants: 20,
      scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      duration: 60,
      host: 'Rahul Sharma',
      isLive: false,
      tags: ['Career', 'Tech', 'Transition']
    },
    {
      id: '2',
      title: 'Startup Founders Meetup',
      description: 'Connect with fellow entrepreneurs and startup founders',
      topic: 'Entrepreneurship',
      participants: 8,
      maxParticipants: 15,
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      duration: 90,
      host: 'Priya Patel',
      isLive: false,
      tags: ['Startup', 'Entrepreneurship', 'Networking']
    },
    {
      id: '3',
      title: 'AI/ML Research Discussion',
      description: 'Latest trends and opportunities in AI/ML research',
      topic: 'Technology',
      participants: 15,
      maxParticipants: 25,
      scheduledAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
      duration: 75,
      host: 'Dr. Ankit Gupta',
      isLive: true,
      tags: ['AI', 'ML', 'Research']
    }
  ];

  // Mock event invites
  const eventInvites: EventInvite[] = [
    {
      id: '1',
      title: 'Alumni Tech Summit 2025',
      description: 'Annual gathering of tech alumni for networking and knowledge sharing',
      organizer: 'AlumConnect Team',
      organizerAvatar: '/fotor-2025020519619[1].png',
      eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'Bangalore Convention Center',
      type: 'networking',
      attendees: 250,
      status: 'invited'
    },
    {
      id: '2',
      title: 'Product Management Workshop',
      description: 'Advanced PM strategies and frameworks workshop',
      organizer: 'PM Community',
      organizerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      location: 'Virtual Event',
      type: 'workshop',
      attendees: 45,
      status: 'accepted'
    }
  ];

  // Mock verification documents
  const verificationDocs: VerificationDocument[] = [
    {
      id: '1',
      type: 'linkedin',
      status: 'verified',
      uploadedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      fileName: 'linkedin_profile.pdf'
    },
    {
      id: '2',
      type: 'work_email',
      status: 'verified',
      uploadedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      fileName: 'work_email_verification.pdf'
    },
    {
      id: '3',
      type: 'college_docs',
      status: 'pending',
      uploadedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      fileName: 'degree_certificate.pdf'
    }
  ];

  const handleMenteeRequest = (requestId: string, action: 'accept' | 'decline') => {
    console.log(`${action} mentee request:`, requestId);
    // Handle mentee request logic
  };

  const handleJoinNetworkingRoom = (roomId: string) => {
    console.log('Joining networking room:', roomId);
    // Handle joining networking room
  };

  const handleEventResponse = (eventId: string, response: 'accept' | 'decline') => {
    console.log(`${response} event invite:`, eventId);
    // Handle event response logic
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
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-gray-600">Active Mentees</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-gray-600">Pending Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-gray-600">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg mr-4">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <p className="text-gray-600">Mentor Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Verification Status</h3>
              {profile?.is_verified && (
                <BadgeCheck className="h-6 w-6 text-blue-500 ml-2" />
              )}
            </div>
            <button
              onClick={() => setShowVerificationModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Verification
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {verificationDocs.map((doc) => (
              <div key={doc.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {doc.type === 'linkedin' && <Linkedin className="h-5 w-5 text-blue-600 mr-2" />}
                    {doc.type === 'work_email' && <Mail className="h-5 w-5 text-green-600 mr-2" />}
                    {doc.type === 'college_docs' && <GraduationCap className="h-5 w-5 text-purple-600 mr-2" />}
                    {doc.type === 'company_id' && <Building className="h-5 w-5 text-orange-600 mr-2" />}
                    <span className="text-sm font-medium capitalize">
                      {doc.type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                    doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{doc.fileName}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {format(doc.uploadedDate, 'MMM d, yyyy')}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Mentee Requests</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menteeRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={request.studentAvatar}
                      alt={request.studentName}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{request.studentName}</h4>
                      <p className="text-sm text-gray-600">{request.studentInstitution}</p>
                      <div className="flex items-center mt-1">
                        <Brain className="h-4 w-4 text-indigo-600 mr-1" />
                        <span className="text-xs text-indigo-600">{request.matchScore}% match</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMenteeRequest(request.id, 'accept')}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleMenteeRequest(request.id, 'decline')}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Upcoming Networking Rooms</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {networkingRooms.slice(0, 3).map((room) => (
                <div key={room.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{room.title}</h4>
                    {room.isLive && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                        Live
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {room.participants}/{room.maxParticipants}
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      {format(room.scheduledAt, 'MMM d, HH:mm')}
                    </div>
                    <button
                      onClick={() => handleJoinNetworkingRoom(room.id)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
                    >
                      {room.isLive ? 'Join Now' : 'Join'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMenteeRequestsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Mentee Requests</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {menteeRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <img
                    src={request.studentAvatar}
                    alt={request.studentName}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{request.studentName}</h3>
                      <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-3 py-1 rounded-full">
                        <Brain className="h-4 w-4 text-indigo-600 mr-1" />
                        <span className="text-sm font-medium text-indigo-800">{request.matchScore}% match</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        {request.studentInstitution}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {request.studentYear}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {format(request.requestDate, 'MMM d, yyyy')}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Message:</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{request.requestMessage}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Career Goals:</h4>
                      <p className="text-gray-700">{request.careerGoals}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {request.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                  
                  {request.status === 'pending' && (
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleMenteeRequest(request.id, 'accept')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Accept Request
                      </button>
                      <button
                        onClick={() => handleMenteeRequest(request.id, 'decline')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderNetworkingTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Networking Rooms</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          Create Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {networkingRooms.map((room) => (
          <Card key={room.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{room.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                </div>
                {room.isLive && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                    Live
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {room.participants}/{room.maxParticipants} participants
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {format(room.scheduledAt, 'MMM d, yyyy • HH:mm')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="h-4 w-4 mr-2" />
                  {room.topic}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {room.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleJoinNetworkingRoom(room.id)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                {room.isLive ? 'Join Live Room' : 'Join Room'}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderEventInvitesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Event Invitations</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {eventInvites.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'webinar' ? 'bg-green-100 text-green-800' :
                      event.type === 'networking' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {event.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(event.eventDate, 'MMM d, yyyy • HH:mm')}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees} attendees
                    </div>
                  </div>

                  <div className="flex items-center">
                    <img
                      src={event.organizerAvatar}
                      alt={event.organizer}
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <span className="text-sm text-gray-600">Organized by {event.organizer}</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === 'invited' ? 'bg-yellow-100 text-yellow-800' :
                    event.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  
                  {event.status === 'invited' && (
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleEventResponse(event.id, 'accept')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleEventResponse(event.id, 'decline')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Verification Modal
  const renderVerificationModal = () => (
    showVerificationModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Alumni Verification</h3>
            </div>
            <button
              onClick={() => setShowVerificationModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Why Get Verified?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Get a blue verification badge on your profile</li>
                <li>• Build trust with students and other alumni</li>
                <li>• Access exclusive verified alumni features</li>
                <li>• Higher visibility in mentor matching</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Linkedin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">LinkedIn Profile</h4>
                <p className="text-sm text-gray-600 mb-3">Connect your LinkedIn profile for verification</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Connect LinkedIn
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Work Email</h4>
                <p className="text-sm text-gray-600 mb-3">Verify with your company email address</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Verify Email
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">College Documents</h4>
                <p className="text-sm text-gray-600 mb-3">Upload degree certificate or transcript</p>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Upload Documents
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors cursor-pointer">
                <Building className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Company ID</h4>
                <p className="text-sm text-gray-600 mb-3">Upload company ID or employment letter</p>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Upload ID
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Verification Process</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Submit required documents
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                  Review process (2-3 business days)
                </div>
                <div className="flex items-center">
                  <BadgeCheck className="h-4 w-4 text-blue-500 mr-2" />
                  Get verified badge on approval
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'mentees', label: 'Mentee Requests', icon: <UserPlus className="h-5 w-5" /> },
    { id: 'networking', label: 'Networking Rooms', icon: <Users className="h-5 w-5" /> },
    { id: 'events', label: 'Event Invites', icon: <Calendar className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            Welcome back, {profile?.full_name?.split(' ')[0]}! 🎯
            {profile?.is_verified && (
              <BadgeCheck className="h-8 w-8 text-blue-500 ml-2" />
            )}
          </h1>
          <p className="text-gray-600 mt-1">
            Share your expertise and help shape the next generation of professionals
          </p>
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
        {activeTab === 'mentees' && renderMenteeRequestsTab()}
        {activeTab === 'networking' && renderNetworkingTab()}
        {activeTab === 'events' && renderEventInvitesTab()}
      </div>

      {/* Verification Modal */}
      {renderVerificationModal()}
    </div>
  );
};

export default AlumniDashboard;