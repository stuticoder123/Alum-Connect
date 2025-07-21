import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <img 
                src="/fotor-2025020519619[1].png" 
                alt="AlumConnect Logo" 
                className="h-10 w-10 object-contain mr-3"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                AlumConnect
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Connecting alumni and students worldwide through free mentorship, social networking, and knowledge sharing. Building bridges between generations of learners.
            </p>
            <div className="flex items-center text-gray-300 mb-4">
              <Heart className="h-4 w-4 mr-2 text-red-400" />
              <span className="text-sm">Made with love for the global student community</span>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Explore
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Success Stories', path: '/success-stories' },
                { name: 'Resources', path: '/resources' },
                { name: 'Blog', path: '/blog' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Community
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Join as Student', action: 'join' },
                { name: 'Become a Mentor', action: 'mentor' },
                { name: 'Help Center', action: 'help' },
                { name: 'Contact Us', action: 'contact' }
              ].map((item) => (
                <li key={item.name}>
                  <button className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 flex items-center group">
                    <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Creator Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-3">Created by</h4>
              <div className="flex items-center">
                <img
                  src="/stuti-profile.jpg"
                  alt="Stuti Gupta"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/50 mr-4"
                />
                <div>
                  <p className="text-white font-medium">Stuti Gupta</p>
                  <p className="text-gray-400 text-sm">3rd year B.Tech. CSE student @ RCEW, Jaipur</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/stuticoder123"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/stuticoder1/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com/stuticoder123"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:stuticoder123@gmail.com"
                className="p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AlumConnect. All rights reserved. Made with ❤️ for students worldwide.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <button className="hover:text-indigo-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-indigo-400 transition-colors">Terms of Service</button>
            <button className="hover:text-indigo-400 transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;