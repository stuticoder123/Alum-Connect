import React from 'react';

const features = [
  '50+ Courses',
  'Video Tutorials',
  'Hands-on Projects',
  'Certificates',
];

const FreeCoursesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <div className="bg-violet-100 rounded-xl p-4 mb-4">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-violet-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12V4l8 4-8 4-8-4 8-4z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-violet-700 mb-2">Free Courses</h2>
        <p className="text-gray-600 text-center mb-4">
          Access high-quality programming courses covering everything from basics to advanced topics. All completely free.
        </p>
        <ul className="mb-6 w-full">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-gray-700 mb-2">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FreeCoursesPage; 