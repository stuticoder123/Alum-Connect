import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWA();
  const [showOnlineMsg, setShowOnlineMsg] = useState(false);
  const [showOfflineMsg, setShowOfflineMsg] = useState(false);
  const prevIsOnline = useRef(isOnline);

  // Show 'Back online' for 3 seconds on initial load if online
  useEffect(() => {
    if (isOnline) {
      setShowOnlineMsg(true);
      const timer = setTimeout(() => setShowOnlineMsg(false), 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, []); // Only run on mount

  // Handle online/offline transitions
  useEffect(() => {
    if (isOnline && !prevIsOnline.current) {
      setShowOnlineMsg(true);
      const timer = setTimeout(() => setShowOnlineMsg(false), 3000);
      prevIsOnline.current = isOnline;
      return () => clearTimeout(timer);
    }
    if (!isOnline && prevIsOnline.current) {
      setShowOfflineMsg(true);
      const timer = setTimeout(() => setShowOfflineMsg(false), 3000);
      prevIsOnline.current = isOnline;
      return () => clearTimeout(timer);
    }
    prevIsOnline.current = isOnline;
  }, [isOnline]);

  return (
    <AnimatePresence>
      {showOfflineMsg && !isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-16 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
        >
          <div className="bg-orange-500 text-white rounded-lg p-3 shadow-lg">
            <div className="flex items-center">
              <WifiOff className="h-5 w-5 mr-2" />
              <div>
                <p className="font-medium text-sm">You're offline</p>
                <p className="text-xs opacity-90">Some features may be limited</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {isOnline && showOnlineMsg && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-16 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
        >
          <div className="bg-green-500 text-white rounded-lg p-3 shadow-lg">
            <div className="flex items-center">
              <Wifi className="h-5 w-5 mr-2" />
              <div>
                <p className="font-medium text-sm">Back online</p>
                <p className="text-xs opacity-90">All features available</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;