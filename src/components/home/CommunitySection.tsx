import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Code, Trophy, Zap, Heart, Star, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';

const CommunitySection: React.FC = () => {
  const communityStats = [
    { icon: Users, number: "50K+", label: "Active Developers", color: "text-blue-600" },
    { icon: MessageSquare, number: "100K+", label: "Daily Messages", color: "text-green-600" },
    { icon: Code, number: "25K+", label: "Projects Shared", color: "text-purple-600" },
    { icon: Trophy, number: "500+", label: "Challenges Completed", color: "text-yellow-600" }
  ];

  const communityFeatures = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Discussion Forums",
      description: "Get help, share knowledge, and connect with fellow developers in our active community forums."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Code Reviews",
      description: "Get your code reviewed by experienced developers and improve your coding skills."
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Coding Challenges",
      description: "Participate in weekly coding challenges and compete with developers worldwide."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Live Sessions",
      description: "Join live coding sessions, workshops, and Q&A with industry experts."
    }
  ];

  const topContributors = [
    {
      name: "Alex Chen",
      role: "Senior Developer",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
      contributions: 150,
      badge: "🏆"
    },
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
      contributions: 120,
      badge: "🥈"
    },
    {
      name: "Mike Rodriguez",
      role: "Frontend Specialist",
      avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
      contributions: 95,
      badge: "🥉"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Developer Community</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with passionate developers, share your projects, get help, and grow together in our supportive community.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-all duration-300">
                <stat.icon className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Community Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Community Features</h3>
            <div className="space-y-6">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-indigo-100 rounded-lg mr-4 group-hover:bg-indigo-200 transition-colors">
                    <div className="text-indigo-600">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Contributors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Top Contributors</h3>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={contributor.avatar}
                          alt={contributor.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-200 transition-all"
                        />
                        <span className="absolute -top-1 -right-1 text-lg">
                          {contributor.badge}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {contributor.name}
                        </h4>
                        <p className="text-gray-600 text-sm">{contributor.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-indigo-600">
                        {contributor.contributions}
                      </div>
                      <div className="text-xs text-gray-500">contributions</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 group"
              >
                View Leaderboard
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Join Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h3>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Connect with thousands of developers, share your knowledge, and accelerate your coding journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Join Discord Community
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
            >
              Follow on Social Media
            </motion.button>
          </div>
          
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
              >
                <social.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;