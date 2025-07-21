import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, Award, TrendingUp, Star, CheckCircle, Heart, MessageCircle, Share2, X, UserPlus, Search, MessageSquare, Calendar, Briefcase } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const [showHowItWorks, setShowHowItWorks] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const renderHowItWorksModal = () => (
    showHowItWorks && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">How AlumConnect Works</h2>
                <p className="text-indigo-100">Your journey to career success in 5 simple steps</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowHowItWorks(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="space-y-8">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-6 group"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full mr-3">
                        Step {step.step}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features Highlight */}
            <div className="mt-12 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose AlumConnect?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "🆓", title: "Completely Free", desc: "No hidden costs or premium tiers" },
                  { icon: "🤖", title: "AI-Powered Matching", desc: "Smart algorithm finds perfect mentors" },
                  { icon: "✅", title: "Verified Profiles", desc: "All alumni are verified professionals" },
                  { icon: "🌍", title: "Global Network", desc: "Connect with alumni worldwide" },
                  { icon: "💼", title: "Job Opportunities", desc: "Exclusive job postings and referrals" },
                  { icon: "🎓", title: "Learning Resources", desc: "Courses, workshops, and materials" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowHowItWorks(false);
                  const element = document.getElementById('auth-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300 group"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <p className="text-gray-500 mt-4">Join 50,000+ students and alumni already connected</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  );

  return (
    <>
    <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                <Star className="h-4 w-4 mr-2" />
                Join 50,000+ Alumni & Students Worldwide
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-gray-900">Connect.</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Share.
              </span>
              <br />
              <span className="text-gray-900">Mentor.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-lg mb-8 leading-relaxed"
            >
              The social platform where alumni and students connect, share experiences, and build meaningful mentorship relationships - completely free for everyone.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all duration-300 group font-semibold"
                  onClick={() => {
                    const element = document.getElementById('auth-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Join the Community
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex items-center text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-600 px-8 py-4 rounded-2xl transition-all duration-300 group font-semibold"
                  onClick={() => setShowHowItWorks(true)}
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  See How It Works
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8"
            >
              {[
                { number: "50K+", label: "Active Members", icon: Users },
                { number: "Free", label: "Always", icon: Award },
                { number: "10K+", label: "Success Stories", icon: TrendingUp }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <stat.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative">
              {/* Main Social Feed Preview */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Alumni Feed</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Sample Post */}
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-3">
                      <img
                        src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                        alt="Alumni"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold text-sm">Rahul Sharma</p>
                        <p className="text-xs text-gray-500">Software Engineer at Google • 2h</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Just completed my 5th year at Google! Happy to mentor students interested in tech careers for FREE! 
                      Let's connect and grow together 🚀
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          <span>24</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1 text-blue-500" />
                          <span>8</span>
                        </div>
                        <div className="flex items-center">
                          <Share2 className="h-4 w-4 mr-1 text-green-500" />
                          <span>3</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Another Sample Post */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <img
                        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                        alt="Alumni"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold text-sm">Priya Patel</p>
                        <p className="text-xs text-gray-500">Product Manager at Microsoft • 4h</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Hosting a free webinar on "Breaking into Product Management" this Saturday! 
                      Tag your friends who might be interested 👥
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          <span>42</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1 text-blue-500" />
                          <span>15</span>
                        </div>
                        <div className="flex items-center">
                          <Share2 className="h-4 w-4 mr-1 text-green-500" />
                          <span>7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Free Mentorship Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Free Mentorship</div>
                    <div className="text-xs text-gray-500">Always free for everyone</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Community Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Active Community</div>
                    <div className="text-xs text-gray-500">50K+ members online</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      </div>
    
    {/* How It Works Modal */}
    {renderHowItWorksModal()}
    </>
  );
};

export default Hero;