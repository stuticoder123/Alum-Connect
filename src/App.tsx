import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { usePWA } from './hooks/usePWA';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import ResourcesPage from './pages/ResourcesPage';
import BlogPage from './pages/BlogPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ResponsiveLayout from './components/layout/ResponsiveLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ChatBot from './components/chat/ChatBot';
import InstallPrompt from './components/pwa/InstallPrompt';
import OfflineIndicator from './components/pwa/OfflineIndicator';
import CoursesPage from './pages/CoursesPage';
import GetStartedPage from './pages/courses/GetStartedPage';
import FreeCoursesPage from './pages/FreeCoursesPage';

function AppContent() {
  const { registerServiceWorker, requestNotificationPermission } = usePWA();

  useEffect(() => {
    // Register service worker
    registerServiceWorker();
    
    // Request notification permission
    requestNotificationPermission();
  }, [registerServiceWorker, requestNotificationPermission]);

  return (
    <AuthProvider>
      <Router>
        <ResponsiveLayout>
          <Routes>
            <Route path="/" element={<FreeCoursesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/get-started" element={<GetStartedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ResponsiveLayout>
        
        {/* PWA Components */}
        <InstallPrompt />
        <OfflineIndicator />
        
        {/* Chat Components */}
        <ChatBot />
      </Router>
    </AuthProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;