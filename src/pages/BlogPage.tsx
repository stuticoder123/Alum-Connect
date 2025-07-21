import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Card, { CardContent } from '../components/ui/Card';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: Date;
  readTime: number;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "From Campus to Silicon Valley: My Journey in Tech",
    excerpt: "Learn about my transition from a college student to working at one of the world's leading tech companies. I share insights, challenges, and key lessons learned along the way.",
    author: {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    date: new Date(2025, 1, 15),
    readTime: 8,
    category: "Career Growth",
    image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    title: "Building a Successful Startup: Lessons from the Trenches",
    excerpt: "Insights from my entrepreneurial journey, including fundraising strategies, team building, and overcoming common startup challenges.",
    author: {
      name: "Rahul Mehta",
      role: "Founder & CEO, TechStart",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    date: new Date(2025, 1, 10),
    readTime: 12,
    category: "Entrepreneurship",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    title: "The Future of AI in Healthcare",
    excerpt: "Exploring how artificial intelligence is transforming healthcare and creating new opportunities for innovation and career growth.",
    author: {
      name: "Dr. Anjali Gupta",
      role: "AI Research Lead, HealthTech",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    date: new Date(2025, 1, 5),
    readTime: 10,
    category: "Technology",
    image: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const categories = [
  "All",
  "Career Growth",
  "Technology",
  "Entrepreneurship",
  "Leadership",
  "Industry Insights"
];

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, experiences, and advice from our alumni community
          </p>
        </motion.div>

        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-sm text-gray-500">{post.author.role}</p>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(post.date, 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime} min read
                    </div>
                  </div>
                  <button className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-700 font-medium">
                    Read more
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-white rounded-lg shadow-md p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Share Your Story
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Inspire the next generation by sharing your experiences, insights, and advice
          </p>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors duration-200">
            Write a Blog Post
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;