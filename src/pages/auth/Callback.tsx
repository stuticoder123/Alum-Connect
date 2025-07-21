import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/?error=auth_failed');
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to dashboard
          navigate('/dashboard');
        } else {
          //  No session, redirect to home
          navigate('/');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        navigate('/?error=unexpected');
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we finish setting up your account.</p>
      </div>
    </div>
  );
};

export default AuthCallback;