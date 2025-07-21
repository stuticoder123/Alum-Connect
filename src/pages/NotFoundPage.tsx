import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-9xl font-bold text-teal-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mt-4 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button size="lg">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;