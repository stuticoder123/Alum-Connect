import React from 'react';
import { motion } from 'framer-motion';

const successStories = [
  {
    id: 1,
    title: "From Campus to Silicon Valley",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alumName: "Arjun Kapoor",
    alumRole: "Senior Software Engineer, Google",
    gradYear: "2019",
    studentName: "Vikram Sharma",
    studentClass: "Computer Science, Class of 2024",
    story: "Through AlumConnect, I found a mentor who guided me through internship applications and technical interviews. Their insights into Google's hiring process were invaluable, and I'm now set to join the company after graduation.",
    impact: "Secured internship and full-time offer at Google",
  },
  {
    id: 2,
    title: "Building a Startup with Alumni Support",
    image: "https://images.pexels.com/photos/7948026/pexels-photo-7948026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alumName: "Neha Gupta",
    alumRole: "Founder & CEO, HealthTech Solutions",
    gradYear: "2015",
    studentName: "Aanya Patel",
    studentClass: "Biomedical Engineering, Class of 2023",
    story: "My startup idea needed industry expertise and connections. Through AlumConnect, I found alumni in the healthcare sector who became advisors and even early investors in my company. Their guidance helped me navigate regulatory challenges and refine my business model.",
    impact: "Raised $500K seed funding with alumni support",
  },
  {
    id: 3,
    title: "International Career Launch",
    image: "https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alumName: "Rahul Mehta",
    alumRole: "Investment Banker, London",
    gradYear: "2017",
    studentName: "Ishaan Shah",
    studentClass: "Finance, Class of 2022",
    story: "I always dreamed of working internationally but had no connections abroad. An alumni working in London's financial district not only helped me understand the global job market but also referred me to his firm. His mentorship during the interview process was crucial to my success.",
    impact: "Secured position at top London investment bank",
  },
];

const SuccessStoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real connections. Real impact. See how AlumConnect has helped shape careers and create opportunities.
          </p>
        </motion.div>

        <div className="space-y-16">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{story.title}</h3>
                    <div className="flex items-center text-white text-sm">
                      <span className="bg-teal-600 px-2 py-1 rounded">Success Story #{story.id}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600 mb-6">
                  <p className="text-lg text-gray-700 italic">"{story.story}"</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-1">The Alumnus</h4>
                    <p className="text-gray-900">{story.alumName}</p>
                    <p className="text-gray-600 text-sm">{story.alumRole}</p>
                    <p className="text-gray-600 text-sm">Class of {story.gradYear}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-1">The Student</h4>
                    <p className="text-gray-900">{story.studentName}</p>
                    <p className="text-gray-600 text-sm">{story.studentClass}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Impact</h4>
                  <div className="bg-teal-50 text-teal-800 px-4 py-2 rounded-md inline-block">
                    {story.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 bg-gradient-to-r from-gray-900 to-slate-800 text-white rounded-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Share Your Success Story</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            Has AlumConnect helped you find a mentor, land a job, or make a valuable connection?
            We'd love to feature your story and inspire others.
          </p>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors duration-200">
            Submit Your Story
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;