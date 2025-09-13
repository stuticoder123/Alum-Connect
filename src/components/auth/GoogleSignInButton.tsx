import React, { useState } from 'react';
import Button from '../ui/Button';
// If you see a TS error that 'lucide-react' cannot be found, run `npm install` to restore dependencies.
import { Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Reusable Google Sign-In / Sign-Up button.
 * Uses Supabase OAuth provider (configured in Supabase dashboard).
 */
interface GoogleSignInButtonProps {
  mode?: 'login' | 'register';
  fullWidth?: boolean;
  className?: string;
  onError?: (message: string) => void;
}

const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5 mr-3' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><g><path fill="#4285F4" d="M12 11.5v2.9h7.2c-.3 1.7-2.1 5-7.2 5-4.2 0-7.6-3.5-7.6-7.7s3.4-7.7 7.6-7.7c2.4 0 4.1.9 5.3 2l3.6-3.5C18.7 1.6 15.7 0 12 0 5.4 0 0 5.4 0 12s5.4 12 12 12c6.9 0 11.5-4.8 11.5-11.6 0-.8-.1-1.6-.2-2.4H12z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.8-3l-3.7-3c-1 .7-2.3 1.1-4.1 1.1-3.2 0-5.9-2.1-6.8-5.1H1.3v3.2C3.2 21.8 7.2 24 12 24z"/><path fill="#FBBC05" d="M5.2 14.9c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2V7.3H1.3C.5 8.8 0 10.4 0 12c0 1.6.5 3.2 1.3 4.7l3.9-3.8z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.2C17.9 1.1 15.2 0 12 0 7.2 0 3.2 2.2 1.3 5.3l3.9 3.8c.9-2.9 3.6-5.1 6.8-5.1z"/></g></svg>
);

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  mode = 'login',
  fullWidth = true,
  className = '',
  onError
}) => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      const msg = err?.message || 'Google sign-in failed. Please try again.';
      onError?.(msg);
      setLoading(false); // Only reset if we got an error (success redirects)
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={loading}
      fullWidth={fullWidth}
      className={`bg-white border-2 border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white hover:border-[#4285F4] py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group relative overflow-hidden flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#EA4335] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {loading ? (
        <Loader className="h-5 w-5 mr-3 text-[#4285F4] animate-spin relative z-10" />
      ) : (
        <GoogleIcon className="h-5 w-5 mr-3 relative z-10" />
      )}
      <span className="relative z-10">
        {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
      </span>
    </Button>
  );
};

export default GoogleSignInButton;
