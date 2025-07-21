import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, MapPin, Briefcase, Twitter } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <img 
              src="/fotor-2025020519619[1].png" 
              alt="AlumConnect Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">About AlumConnect</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between alumni and students to create a thriving academic community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              AlumConnect was founded with a simple yet powerful mission: to create meaningful connections between alumni and students that benefit both groups and strengthen the academic community as a whole.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We believe that alumni are an invaluable resource for current students, offering mentorship, industry insights, and career opportunities. Simultaneously, students bring fresh perspectives and energy that keep alumni connected to their educational roots.
            </p>
            <p className="text-lg text-gray-700">
              Through our verified, secure platform, we're building bridges that span generations of learners and professionals, creating an ecosystem where knowledge and opportunities flow freely - completely free for everyone.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Team collaboration"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="bg-teal-100 text-teal-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Verification</h3>
              <p className="text-gray-700">
                We build trust through careful verification of all users, ensuring genuine connections between alumni and students.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="bg-teal-100 text-teal-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy & Security</h3>
              <p className="text-gray-700">
                We prioritize data protection and user privacy with state-of-the-art security measures and transparent policies.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="bg-teal-100 text-teal-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inclusive Community</h3>
              <p className="text-gray-700">
                We foster an inclusive environment where diverse perspectives are valued and all members feel welcomed.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet the Creator</h2>
          <div className="max-w-2xl mx-auto">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white shadow-xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-500 group rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <motion.img
                        src="/stuti-profile.jpg"
                        alt="Stuti Gupta"
                        className="w-32 h-32 rounded-full object-cover mx-auto ring-4 ring-indigo-100 group-hover:ring-indigo-200 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      />
                      <span className="absolute bottom-0 right-0 h-6 w-6 bg-green-400 rounded-full ring-4 ring-white"></span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mt-4 group-hover:text-indigo-600 transition-colors">Stuti Gupta</h3>
                    <p className="text-indigo-600 font-medium">Founder & Lead Developer</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
                      <Briefcase className="h-5 w-5 mr-2" />
                      <span>3rd year B.Tech. CSE student @ RCEW, Jaipur</span>
                    </div>
                    <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>Rajasthan, India</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-center group-hover:text-gray-700 transition-colors">
                    Design leader with a focus on creating intuitive and accessible experiences. Advocate for user-centered design and passionate about making technology more inclusive. Created AlumConnect to democratize mentorship and make it accessible to everyone.
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    {[
                      { icon: Github, href: "https://github.com/stuticoder123" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/stuticoder1/" },
                      { icon: Mail, href: "mailto:stuticoder123@gmail.com" },
                      { icon: Twitter, href: "https://twitter.com/stuticoder123" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        className="p-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300 group-hover:bg-indigo-50"
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-lg p-8 text-center border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Journey</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            We're continuously growing and improving. If you share our vision for connecting alumni and students, we'd love to hear from you.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;