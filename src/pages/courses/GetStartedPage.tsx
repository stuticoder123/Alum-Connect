import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Logo from '../../components/ui/Logo';

interface Course {
  id: string;
  title: string;
  description: string;
  image_url?: string;
}

const GetStartedPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

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
      <header className="flex items-center gap-2 px-6 py-4 bg-white shadow">
        <Logo size="lg" />
        <span className="text-xl font-bold text-blue-700">AlumConnect Courses</span>
      </header>
      <main className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Get Started with AlumConnect Courses</h1>
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
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default GetStartedPage; 