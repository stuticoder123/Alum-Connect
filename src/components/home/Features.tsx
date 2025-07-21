import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, BookOpen, MessageSquare, MapPin, Shield, Zap, Star, Globe, ArrowRight, Target, Briefcase, GraduationCap, Heart, ThumbsUp, Share2, Tag, Video, Gift } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-indigo-300 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-2xl opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-indigo-200 group-hover:to-purple-200 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
          <div className="text-indigo-600 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
        
        <div className="flex items-center text-indigo-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          Learn more
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="h-7 w-7" />,
      title: "Social Feed & Posts",
      description: "Share your experiences, achievements, and insights with the community. Create engaging posts that inspire and help others in their journey.",
      delay: 0.1,
    },
    {
      icon: <Heart className="h-7 w-7" />,
      title: "Reactions & Engagement",
      description: "React to posts with emojis, like, love, and celebrate others' achievements. Build meaningful connections through authentic engagement.",
      delay: 0.2,
    },
    {
      icon: <Tag className="h-7 w-7" />,
      title: "Smart Tagging System",
      description: "Tag alumni, students, or friends in your posts and comments. Mention people using @ to notify them and expand conversations.",
      delay: 0.3,
    },
    {
      icon: <Gift className="h-7 w-7" />,
      title: "Free Mentorship",
      description: "Connect with mentors completely free of charge. Industry experts volunteer their time to help students grow and succeed in their careers.",
      delay: 0.1,
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Smart Matching",
      description: "AI-powered algorithm matches students with the right alumni mentors based on career goals, interests, and industry preferences.",
      delay: 0.2,
    },
    {
      icon: <Video className="h-7 w-7" />,
      title: "Video Calls & Sessions",
      description: "Conduct mentorship sessions through integrated video calling. Schedule, manage, and track your mentoring sessions seamlessly.",
      delay: 0.3,
    },
    {
      icon: <Globe className="h-7 w-7" />,
      title: "Global Alumni Network",
      description: "Connect with alumni worldwide working in top companies. Access diverse perspectives and international career opportunities.",
      delay: 0.1,
    },
    {
      icon: <BookOpen className="h-7 w-7" />,
      title: "Knowledge Sharing",
      description: "Share resources, study materials, career guides, and industry insights. Build a collaborative learning environment for everyone.",
      delay: 0.2,
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: "Verified Profiles",
      description: "All alumni and student profiles are verified for authenticity. Connect with confidence knowing you're interacting with genuine members.",
      delay: 0.3,
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need for <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">social learning</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive social platform designed specifically for alumni-student connections, mentorship, and knowledge sharing - completely free for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300 group"
          >
            Join the Community
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;