import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Users, Award, TrendingUp, Play, Clock, User } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  instructor: string;
  students: number;
  rating: number;
  tags: string[];
  thumbnail: string;
}

const FreeCoursesPage: React.FC = () => {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Web Development Fundamentals',
      description: 'Learn the basics of HTML, CSS, and JavaScript to build responsive websites.',
      level: 'Beginner',
      duration: '8 weeks',
      instructor: 'Sarah Chen',
      students: 2340,
      rating: 4.8,
      tags: ['Web', 'Frontend', 'JavaScript'],
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'Python for Data Science',
      description: 'Master Python programming for data analysis, visualization, and machine learning.',
      level: 'Intermediate',
      duration: '10 weeks',
      instructor: 'Alex Johnson',
      students: 3120,
      rating: 4.9,
      tags: ['Python', 'Data Science', 'ML'],
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'React.js Advanced Patterns',
      description: 'Deep dive into React hooks, state management, and component optimization.',
      level: 'Advanced',
      duration: '6 weeks',
      instructor: 'Emma Rodriguez',
      students: 1890,
      rating: 4.7,
      tags: ['React', 'JavaScript', 'Frontend'],
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: 'Cloud Computing with AWS',
      description: 'Learn to deploy and manage applications on Amazon Web Services.',
      level: 'Intermediate',
      duration: '8 weeks',
      instructor: 'Michael Zhang',
      students: 2560,
      rating: 4.6,
      tags: ['AWS', 'Cloud', 'DevOps'],
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop'
    },
    {
      id: '5',
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile applications using React Native and Flutter.',
      level: 'Intermediate',
      duration: '9 weeks',
      instructor: 'Jessica Lee',
      students: 2100,
      rating: 4.8,
      tags: ['Mobile', 'React Native', 'Flutter'],
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      id: '6',
      title: 'UI/UX Design Principles',
      description: 'Create beautiful and user-friendly interfaces with design best practices.',
      level: 'Beginner',
      duration: '6 weeks',
      instructor: 'David Park',
      students: 1650,
      rating: 4.9,
      tags: ['Design', 'UI/UX', 'Figma'],
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Courses</h1>
            <p className="text-xl text-indigo-100">
              Access world-class programming and technology courses completely free. Learn from industry experts and advance your skills.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2 text-indigo-600" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-indigo-600" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating and Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 font-semibold text-gray-900">{course.rating}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    Enroll
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FreeCoursesPage;