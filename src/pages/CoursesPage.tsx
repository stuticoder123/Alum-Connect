import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Logo from '../components/ui/Logo';

interface Course {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  // Add other fields as needed
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('resource_type', 'course');
      if (!error && data) setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <Logo size="lg" />
          <span className="text-xl font-bold text-blue-700">AlumConnect Courses</span>
        </div>
        <button
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center ${buttonLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={async () => {
            setButtonLoading(true);
            await new Promise(res => setTimeout(res, 2000));
            setButtonLoading(false);
            navigate('/courses/get-started');
          }}
          disabled={buttonLoading}
        >
          {buttonLoading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
          ) : null}
          Get Started
        </button>
      </header>
      <main className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Courses</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                {course.image_url && (
                  <img src={course.image_url} alt={course.title} className="h-32 w-full object-cover rounded mb-3" />
                )}
                <h2 className="text-lg font-semibold mb-2 text-blue-700">{course.title}</h2>
                <p className="text-gray-600 mb-4 text-center">{course.description}</p>
                <button
                  className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => navigate('/courses/get-started')}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CoursesPage; 