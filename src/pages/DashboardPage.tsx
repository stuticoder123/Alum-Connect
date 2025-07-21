import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import AlumniDashboard from '../components/dashboard/AlumniDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const DashboardPage: React.FC = () => {
  const { profile } = useAuth();

  const renderDashboard = () => {
    switch (profile?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'alumni':
        return <AlumniDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />; // Default to student dashboard
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default DashboardPage;