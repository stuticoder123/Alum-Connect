import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { Briefcase, MapPin, GraduationCap, Edit, X, Plus } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample data
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    headline: currentUser?.role === 'student' 
      ? 'Computer Science Student' 
      : 'Software Engineer at Google',
    location: 'Bangalore, India',
    about: `Passionate ${currentUser?.role === 'student' ? 'student' : 'professional'} with interests in artificial intelligence, web development, and cloud computing. ${currentUser?.role === 'alumni' ? 'Graduated in 2019 and currently working in the tech industry.' : 'Expected to graduate in 2025.'}`,
    experiences: [
      {
        id: 1,
        title: 'Software Engineer',
        company: 'Google',
        duration: 'Jan 2020 - Present',
        description: 'Working on cloud infrastructure and distributed systems.',
      },
      {
        id: 2,
        title: 'Software Engineering Intern',
        company: 'Microsoft',
        duration: 'May 2019 - Aug 2019',
        description: 'Worked on Azure cloud services and contributed to open-source projects.',
      }
    ],
    education: [
      {
        id: 1,
        degree: 'B.Tech in Computer Science',
        institution: 'Indian Institute of Technology',
        duration: '2015 - 2019',
        description: 'Specialized in Artificial Intelligence and Machine Learning.',
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Cloud Computing', 'Machine Learning']
  });

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <div className="relative h-48 bg-gradient-to-r from-teal-600 to-teal-800 rounded-t-lg">
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
                    {currentUser?.profileImage ? (
                      <img
                        src={currentUser.profileImage}
                        alt={currentUser.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-600">
                        {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full">
                      <Edit className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <Button
                  variant={isEditing ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className={isEditing ? 'bg-white' : ''}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </div>
            
            <CardContent className="pt-20">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    label="Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    fullWidth
                  />
                  <Input
                    label="Headline"
                    value={profileData.headline}
                    onChange={(e) => setProfileData({...profileData, headline: e.target.value})}
                    fullWidth
                  />
                  <Input
                    label="Location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    fullWidth
                  />
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                      About
                    </label>
                    <textarea
                      id="about"
                      rows={4}
                      value={profileData.about}
                      onChange={(e) => setProfileData({...profileData, about: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                  <p className="text-gray-600 mt-1">{profileData.headline}</p>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                    <p className="text-gray-700">{profileData.about}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Experience
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profileData.experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    {isEditing && (
                      <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        {isEditing ? (
                          <div className="space-y-3">
                            <Input
                              label="Title"
                              value={exp.title}
                              onChange={() => {}}
                              fullWidth
                            />
                            <Input
                              label="Company"
                              value={exp.company}
                              onChange={() => {}}
                              fullWidth
                            />
                            <Input
                              label="Duration"
                              value={exp.duration}
                              onChange={() => {}}
                              fullWidth
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <textarea
                                rows={3}
                                value={exp.description}
                                onChange={() => {}}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-gray-500 text-sm">{exp.duration}</p>
                            <p className="text-gray-700 mt-2">{exp.description}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Education</h2>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Education
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profileData.education.map((edu) => (
                  <div key={edu.id} className="relative">
                    {isEditing && (
                      <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        {isEditing ? (
                          <div className="space-y-3">
                            <Input
                              label="Degree"
                              value={edu.degree}
                              onChange={() => {}}
                              fullWidth
                            />
                            <Input
                              label="Institution"
                              value={edu.institution}
                              onChange={() => {}}
                              fullWidth
                            />
                            <Input
                              label="Duration"
                              value={edu.duration}
                              onChange={() => {}}
                              fullWidth
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <textarea
                                rows={3}
                                value={edu.description}
                                onChange={() => {}}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-gray-500 text-sm">{edu.duration}</p>
                            <p className="text-gray-700 mt-2">{edu.description}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Skill
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      isEditing
                        ? 'bg-gray-100 text-gray-800 flex items-center'
                        : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    {skill}
                    {isEditing && (
                      <button className="ml-1.5 text-gray-500 hover:text-gray-700">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-sm border border-dashed border-gray-300 cursor-pointer hover:bg-gray-200">
                    + Add new
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;