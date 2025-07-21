import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Monitor, Zap, Wifi, Bell } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

const InstallPrompt: React.FC = () => {
  const { isInstallable, installApp, isOnline } = usePWA();
  const [showPrompt, setShowPrompt] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    const success = await installApp();
    if (success) {
      setShowPrompt(false);
    }
    setIsInstalling(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Store dismissal in localStorage to not show again for a while
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Don't show if not installable, already dismissed recently, or offline
  if (!isInstallable || !showPrompt || !isOnline) {
    return null;
  }

  // Check if dismissed recently (within 7 days)
  const dismissedTime = localStorage.getItem('installPromptDismissed');
  if (dismissedTime && Date.now() - parseInt(dismissedTime) < 7 * 24 * 60 * 60 * 1000) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Install AlumConnect</h3>
                  <p className="text-sm text-gray-600">Get the app experience</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-700">
                <Smartphone className="h-4 w-4 mr-2 text-indigo-600" />
                <span>Native app experience</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Wifi className="h-4 w-4 mr-2 text-indigo-600" />
                <span>Works offline</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Bell className="h-4 w-4 mr-2 text-indigo-600" />
                <span>Push notifications</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Zap className="h-4 w-4 mr-2 text-indigo-600" />
                <span>Faster loading</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
              >
                {isInstalling ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Install
                  </>
                )}
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPrompt;