import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Users, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  User, 
  Bell,
  Menu,
  X,
  Search,
  Plus
} from 'lucide-react';

const MobileNavbar: React.FC = () => {
  const { isAuthenticated, profile } = useAuth();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/', requireAuth: false },
    { icon: Users, label: 'Network', path: '/dashboard?tab=mentorship', requireAuth: true },
    { icon: Briefcase, label: 'Jobs', path: '/dashboard?tab=jobs', requireAuth: true },
    { icon: Calendar, label: 'Events', path: '/dashboard?tab=events', requireAuth: true },
    { icon: MessageSquare, label: 'Chat', path: '/dashboard?tab=chat', requireAuth: true },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.includes(path.split('?')[0]);
  };

  const filteredItems = navigationItems.filter(item => 
    !item.requireAuth || (item.requireAuth && isAuthenticated)
  );

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
        <div className="grid grid-cols-5 h-16">
          {filteredItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive(item.path)
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
              )}
            </Link>
          ))}
          
          {/* Menu Button */}
          <button
            onClick={() => setShowMenu(true)}
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {isAuthenticated && profile && (
                  <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold mr-3">
                      {profile.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{profile.full_name}</p>
                      <p className="text-sm text-gray-600">{profile.role}</p>
                    </div>
                  </div>
                )}

                <nav className="space-y-2">
                  {[
                    { icon: Home, label: 'Home', path: '/' },
                    { icon: Search, label: 'Search', path: '/search' },
                    { icon: Bell, label: 'Notifications', path: '/notifications' },
                    { icon: User, label: 'Profile', path: '/profile' },
                    { icon: Plus, label: 'Create Post', path: '/create' },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMenu(false)}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="space-y-2">
                    <Link
                      to="/about"
                      onClick={() => setShowMenu(false)}
                      className="block p-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      About
                    </Link>
                    <Link
                      to="/help"
                      onClick={() => setShowMenu(false)}
                      className="block p-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Help & Support
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowMenu(false)}
                      className="block p-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Settings
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for bottom navigation */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default MobileNavbar;