import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import CoursesSection from '../components/home/CoursesSection';
import CommunitySection from '../components/home/CommunitySection';
import Testimonials from '../components/home/Testimonials';
import AuthForm from '../components/home/AuthForm';
import { CTASection } from '../components/home/CTASection';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Github, Linkedin, Mail, Globe, MapPin, Briefcase, ArrowRight, CheckCircle, Users, Award, TrendingUp, Twitter, Code, BookOpen } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Handle OAuth callback
    const handleAuthCallback = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        // User is authenticated, redirect to dashboard
        window.location.href = '/dashboard';
      }
    };

    // Check if this is an OAuth callback
    if (window.location.hash.includes('access_token') || window.location.search.includes('code')) {
      handleAuthCallback();
    }
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Hero />
      
      {/* Boss Coder Academy Features Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Learn. Code. <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Succeed.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master programming with our comprehensive courses, connect with mentors, and join a thriving community of developers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Free Courses",
                description: "Access high-quality programming courses covering everything from basics to advanced topics. All completely free.",
                features: ["50+ Courses", "Video Tutorials", "Hands-on Projects", "Certificates"],
                button: { label: "Get Started", to: "/free-courses" }
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Mentorship Program",
                description: "Get personalized guidance from industry experts. One-on-one sessions to accelerate your learning journey.",
                features: ["1:1 Sessions", "Industry Experts", "Career Guidance", "Project Reviews"],
                button: { label: "Get Started", to: "/courses" }
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Coding Community",
                description: "Join thousands of developers, participate in challenges, share projects, and grow together.",
                features: ["50K+ Developers", "Daily Challenges", "Code Reviews", "Live Sessions"],
                button: { label: "Get Started", to: "/community" }
              }
              
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white shadow-xl border-2 border-gray-200 hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-8 relative z-10 flex flex-col flex-grow">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-2">
                      <a href={item.button.to} className="inline-block w-full">
                        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold shadow hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2">
                          {item.button.label}
                          <ArrowRight className="w-5 h-5 ml-1" />
                        </button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CoursesSection />
      <CommunitySection />
      <Features />
      
      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AlumConnect</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and begin building meaningful professional relationships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and create a comprehensive profile showcasing your background, interests, and career goals.",
                icon: "👤"
              },
              {
                step: "02", 
                title: "Get Matched",
                description: "Our AI-powered system matches you with relevant alumni or students based on your preferences and goals.",
                icon: "🤝"
              },
              {
                step: "03",
                title: "Start Connecting",
                description: "Begin meaningful conversations, schedule free mentoring sessions, and build lasting professional relationships.",
                icon: "🚀"
              }
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.step === "01" ? 0.2 : item.step === "02" ? 0.4 : 0.6, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by the <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">best</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a thriving community of professionals from top companies and institutions worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "10,000+", label: "Active Alumni", icon: Users },
              { number: "500+", label: "Partner Companies", icon: Award },
              { number: "95%", label: "Success Rate", icon: TrendingUp },
              { number: "50+", label: "Countries", icon: Globe }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:shadow-md transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Company Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-8">Alumni from top companies trust AlumConnect</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((company, index) => (
                <motion.div
                  key={company}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-all duration-300"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Meet the Creator Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet the Creator</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate mind behind AlumConnect, working to bridge the gap between alumni and students
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="bg-white h-full shadow-xl border-2 border-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
        </div>
      </section>
      
      <Testimonials />
      
      {/* Auth Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50" id="auth-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Join Our Community Today
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Whether you're a student looking for guidance or an alumnus wanting to give back, AlumConnect provides the platform you need to succeed - completely free.
              </p>
              <div className="space-y-4">
                {[
                  'Verified academic profiles with trust badges',
                  'AI-powered mentor matching system',
                  'Exclusive events and job opportunities',
                  'Secure and private communication platform',
                  'Global network of industry professionals',
                  'Career guidance and skill development'
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <CheckCircle className="h-5 w-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <AuthForm />
            </div>
          </motion.div>
        </div>
      </section>
      
      <CTASection />
    </div>
  );
};

export default HomePage;
