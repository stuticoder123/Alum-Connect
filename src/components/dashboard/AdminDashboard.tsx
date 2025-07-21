import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { 
  Users, 
  Shield, 
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
  BadgeCheck,
  UserCheck,
  UserX,
  FileText,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Edit,
  Upload,
  Eye,
  Download,
  AlertTriangle,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Database,
  Server,
  Wifi,
  HardDrive
} from 'lucide-react';
import { format } from 'date-fns';

interface PendingVerification {
  id: string;
  userName: string;
  userAvatar: string;
  userEmail: string;
  institution: string;
  graduationYear: number;
  currentPosition: string;
  documents: {
    type: string;
    fileName: string;
    uploadedDate: Date;
    status: 'pending' | 'approved' | 'rejected';
  }[];
  submittedDate: Date;
  priority: 'high' | 'medium' | 'low';
}

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time';
  salary: string;
  description: string;
  requirements: string[];
  postedBy: string;
  postedDate: Date;
  status: 'active' | 'closed' | 'draft';
  applicants: number;
}

interface EventManagement {
  id: string;
  title: string;
  description: string;
  organizer: string;
  organizerAvatar: string;
  eventDate: Date;
  location: string;
  type: 'workshop' | 'webinar' | 'networking' | 'ama';
  maxAttendees: number;
  currentAttendees: number;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  registrationDeadline: Date;
}

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  verifiedAlumni: number;
  pendingVerifications: number;
  totalEvents: number;
  totalJobs: number;
  mentorshipSessions: number;
  systemUptime: string;
}

const AdminDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVerification, setSelectedVerification] = useState<PendingVerification | null>(null);

  // Mock system metrics
  const systemMetrics: SystemMetrics = {
    totalUsers: 15420,
    activeUsers: 8750,
    verifiedAlumni: 3240,
    pendingVerifications: 45,
    totalEvents: 156,
    totalJobs: 89,
    mentorshipSessions: 1250,
    systemUptime: '99.9%'
  };

  // Mock pending verifications
  const pendingVerifications: PendingVerification[] = [
    {
      id: '1',
      userName: 'Rahul Sharma',
      userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      userEmail: 'rahul.sharma@google.com',
      institution: 'IIT Delhi',
      graduationYear: 2019,
      currentPosition: 'Senior Software Engineer at Google',
      documents: [
        {
          type: 'LinkedIn Profile',
          fileName: 'linkedin_verification.pdf',
          uploadedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: 'pending'
        },
        {
          type: 'Work Email',
          fileName: 'work_email_verification.pdf',
          uploadedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: 'pending'
        },
        {
          type: 'Degree Certificate',
          fileName: 'iit_delhi_degree.pdf',
          uploadedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: 'pending'
        }
      ],
      submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      priority: 'high'
    },
    {
      id: '2',
      userName: 'Priya Patel',
      userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      userEmail: 'priya.patel@microsoft.com',
      institution: 'BITS Pilani',
      graduationYear: 2020,
      currentPosition: 'Product Manager at Microsoft',
      documents: [
        {
          type: 'LinkedIn Profile',
          fileName: 'linkedin_verification.pdf',
          uploadedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: 'pending'
        },
        {
          type: 'Company ID',
          fileName: 'microsoft_id.pdf',
          uploadedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: 'pending'
        }
      ],
      submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      priority: 'medium'
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
      description: 'Join our engineering team to work on cutting-edge technologies and scalable systems.',
      requirements: ['React', 'JavaScript', 'Node.js', 'System Design'],
      postedBy: 'Rahul Sharma',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'active',
      applicants: 45
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Hyderabad',
      type: 'Full-time',
      salary: '₹25-35 LPA',
      description: 'Lead product strategy and development for our cloud services platform.',
      requirements: ['Product Strategy', 'Data Analysis', 'User Research', 'Agile'],
      postedBy: 'Priya Patel',
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'active',
      applicants: 23
    }
  ];

  // Mock events
  const events: EventManagement[] = [
    {
      id: '1',
      title: 'Alumni Tech Summit 2025',
      description: 'Annual gathering of tech alumni for networking and knowledge sharing',
      organizer: 'AlumConnect Team',
      organizerAvatar: '/fotor-2025020519619[1].png',
      eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'Bangalore Convention Center',
      type: 'networking',
      maxAttendees: 500,
      currentAttendees: 250,
      status: 'upcoming',
      registrationDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
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
      maxAttendees: 100,
      currentAttendees: 45,
      status: 'upcoming',
      registrationDeadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    }
  ];

  const handleVerificationAction = (verificationId: string, action: 'approve' | 'reject', documentType?: string) => {
    console.log(`${action} verification:`, verificationId, documentType);
    // Handle verification action logic
  };

  const handleJobAction = (jobId: string, action: 'approve' | 'reject' | 'edit') => {
    console.log(`${action} job:`, jobId);
    // Handle job action logic
  };

  const handleEventAction = (eventId: string, action: 'approve' | 'cancel' | 'edit') => {
    console.log(`${action} event:`, eventId);
    // Handle event action logic
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{systemMetrics.totalUsers.toLocaleString()}</p>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{systemMetrics.activeUsers.toLocaleString()}</p>
                <p className="text-gray-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <BadgeCheck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{systemMetrics.verifiedAlumni.toLocaleString()}</p>
                <p className="text-gray-600">Verified Alumni</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg mr-4">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{systemMetrics.pendingVerifications}</p>
                <p className="text-gray-600">Pending Verifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">System Health</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Server className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{systemMetrics.systemUptime}</p>
                <p className="text-sm text-gray-600">Uptime</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">98.5%</p>
                <p className="text-sm text-gray-600">DB Performance</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <Wifi className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">45ms</p>
                <p className="text-sm text-gray-600">Avg Response</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg mr-3">
                <HardDrive className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">78%</p>
                <p className="text-sm text-gray-600">Storage Used</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Verifications</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVerifications.slice(0, 3).map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={verification.userAvatar}
                      alt={verification.userName}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{verification.userName}</h4>
                      <p className="text-sm text-gray-600">{verification.currentPosition}</p>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          verification.priority === 'high' ? 'bg-red-100 text-red-800' :
                          verification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {verification.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleVerificationAction(verification.id, 'approve')}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setSelectedVerification(verification)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Platform Analytics</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Daily Active Users</span>
                <span className="font-semibold">+12.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Mentorship Sessions</span>
                <span className="font-semibold">{systemMetrics.mentorshipSessions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Job Applications</span>
                <span className="font-semibold">+8.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Event Attendance</span>
                <span className="font-semibold">89.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">User Satisfaction</span>
                <span className="font-semibold">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderVerificationTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Profile Verifications</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search verifications..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {pendingVerifications.map((verification) => (
          <Card key={verification.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <img
                    src={verification.userAvatar}
                    alt={verification.userName}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{verification.userName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        verification.priority === 'high' ? 'bg-red-100 text-red-800' :
                        verification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {verification.priority} priority
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-gray-600 mb-4">
                      <p>{verification.currentPosition}</p>
                      <p>{verification.institution} • Class of {verification.graduationYear}</p>
                      <p>{verification.userEmail}</p>
                      <p className="text-sm">Submitted {format(verification.submittedDate, 'MMM d, yyyy')}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Submitted Documents:</h4>
                      {verification.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-600 mr-2" />
                            <div>
                              <p className="font-medium text-gray-900">{doc.type}</p>
                              <p className="text-sm text-gray-600">{doc.fileName}</p>
                              <p className="text-xs text-gray-500">
                                Uploaded {format(doc.uploadedDate, 'MMM d, yyyy')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                              <Download className="h-4 w-4" />
                            </button>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {doc.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <button
                    onClick={() => handleVerificationAction(verification.id, 'approve')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Approve All
                  </button>
                  <button
                    onClick={() => handleVerificationAction(verification.id, 'reject')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Reject
                  </button>
                  <button
                    onClick={() => setSelectedVerification(verification)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderJobManagementTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Job Opportunities</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          Post New Job
        </button>
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === 'active' ? 'bg-green-100 text-green-800' :
                      job.status === 'closed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
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

                  <p className="text-gray-700 mb-3">{job.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="font-semibold text-green-600">{job.salary}</span>
                    <span>{job.applicants} applicants</span>
                    <span>Posted by {job.postedBy}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req) => (
                      <span
                        key={req}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <button
                    onClick={() => handleJobAction(job.id, 'edit')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Edit
                  </button>
                  {job.status === 'active' ? (
                    <button
                      onClick={() => handleJobAction(job.id, 'reject')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJobAction(job.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderEventManagementTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'live' ? 'bg-red-100 text-red-800' :
                      event.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
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
                      {event.currentAttendees}/{event.maxAttendees} attendees
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Registration until {format(event.registrationDeadline, 'MMM d')}
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
                  <button
                    onClick={() => handleEventAction(event.id, 'edit')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Edit Event
                  </button>
                  {event.status === 'upcoming' ? (
                    <button
                      onClick={() => handleEventAction(event.id, 'cancel')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEventAction(event.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'verification', label: 'Profile Verification', icon: <Shield className="h-5 w-5" /> },
    { id: 'jobs', label: 'Job Management', icon: <Briefcase className="h-5 w-5" /> },
    { id: 'events', label: 'Event Management', icon: <Calendar className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard 🛡️
          </h1>
          <p className="text-gray-600 mt-1">
            Manage platform operations, verify profiles, and oversee community activities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <Settings className="h-6 w-6" />
          </button>
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
        {activeTab === 'verification' && renderVerificationTab()}
        {activeTab === 'jobs' && renderJobManagementTab()}
        {activeTab === 'events' && renderEventManagementTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;