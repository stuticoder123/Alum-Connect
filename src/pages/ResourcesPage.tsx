import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { Book, Video, FileText, Download, ExternalLink } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'document' | 'video' | 'article';
  link: string;
  category: string;
  author: string;
  date: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Complete Guide to System Design Interviews",
    description: "A comprehensive resource covering system design concepts, best practices, and common interview questions.",
    type: "document",
    link: "#",
    category: "Technical",
    author: "Rahul Sharma",
    date: "Feb 15, 2025"
  },
  {
    id: 2,
    title: "Machine Learning Career Path",
    description: "Video series on building a career in ML/AI, including required skills and job opportunities.",
    type: "video",
    link: "#",
    category: "Career",
    author: "Dr. Priya Patel",
    date: "Feb 10, 2025"
  },
  {
    id: 3,
    title: "Startup Funding Guide",
    description: "Detailed article on different funding stages, pitch deck preparation, and investor networking.",
    type: "article",
    link: "#",
    category: "Entrepreneurship",
    author: "Amit Kumar",
    date: "Feb 5, 2025"
  }
];

const categories = [
  "All",
  "Technical",
  "Career",
  "Entrepreneurship",
  "Leadership",
  "Industry Insights"
];

const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-6 w-6 text-teal-600" />;
      case 'video':
        return <Video className="h-6 w-6 text-teal-600" />;
      case 'article':
        return <Book className="h-6 w-6 text-teal-600" />;
      default:
        return <FileText className="h-6 w-6 text-teal-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access curated resources shared by alumni to help you grow in your career
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full mr-2 ${
                    selectedCategory === category
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader className="flex items-start space-x-4">
                  <div className="p-2 bg-teal-50 rounded-lg">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      By {resource.author} • {resource.date}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                      {resource.category}
                    </span>
                    <a
                      href={resource.link}
                      className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
                    >
                      {resource.type === 'document' ? (
                        <>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </>
                      )}
                    </a>
                  </div>
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
            Want to Share Your Knowledge?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Help the next generation of professionals by sharing your expertise and experiences
          </p>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors duration-200">
            Contribute a Resource
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;