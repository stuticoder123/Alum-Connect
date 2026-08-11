import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserRole, useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Mail, CheckCircle, Eye, EyeOff, Shield, Zap, GraduationCap, Briefcase, Linkedin, AlertCircle, Loader } from 'lucide-react';

type FormMode = 'login' | 'register' | 'forgot-password';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<FormMode>('register');
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { signIn, signUp, signInWithLinkedIn, signInWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name');
        return false;
      }

      if (!collegeName.trim()) {
        setError('Please enter your college/institution name');
        return false;
      }

      if (!graduationYear) {
        setError('Please select your graduation year');
        return false;
      }

      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    } else if (mode === 'login') {
      if (!password) {
        setError('Please enter your password');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
        navigate('/dashboard');
      } else if (mode === 'register') {
        const userData = {
          full_name: name.trim(),
          role,
          institution: collegeName.trim(),
          graduation_year: parseInt(graduationYear)
        };
        
        await signUp(email, password, userData);
        setSuccess('Account created successfully! Please check your email to verify your account before signing in.');
        setMode('login');
        setPassword('');
        setConfirmPassword('');
      } else if (mode === 'forgot-password') {
        await resetPassword(email);
        setSuccess('Password reset email sent! Please check your inbox for instructions.');
        setMode('login');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInSignIn = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      await signInWithLinkedIn();
      // User will be redirected to LinkedIn for authentication
    } catch (err) {
      setError(err instanceof Error ? err.message : 'LinkedIn sign-in failed. Please try email sign-up instead.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      // User will be redirected to Google for authentication
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed. Please try email sign-up instead.');
      setIsLoading(false);
    }
  };

  const toggleMode = (newMode: FormMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
    setPassword('');
    setConfirmPassword('');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - 25 + i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-gray-100">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Welcome back!' : 
               mode === 'register' ? 'Join AlumConnect' : 
               'Reset Password'}
            </h2>
            <p className="text-gray-600">
              {mode === 'login' ? 'Connect with your community' : 
               mode === 'register' ? 'Start your free learning journey' : 
               'Enter your email to reset password'}
            </p>
          </motion.div>
        </CardHeader>
        
        <CardContent className="p-8">
          {/* LinkedIn Sign In Button - Only show for login and register */}
          {mode !== 'forgot-password' && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    onClick={handleLinkedInSignIn}
                    disabled={isLoading}
                    fullWidth
                    className="bg-[#0077B5] border-2 border-[#0077B5] text-white hover:bg-[#005885] hover:border-[#005885] py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0077B5] to-[#005885] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-center">
                      {isLoading ? (
                        <Loader className="h-5 w-5 text-white animate-spin relative z-10" />
                      ) : (
                        <Linkedin className="h-5 w-5 text-white group-hover:scale-110 transition-transform relative z-10" />
                      )}
                    </div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    fullWidth
                    className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-center">
                      {isLoading ? (
                        <Loader className="h-5 w-5 text-gray-700 animate-spin relative z-10" />
                      ) : (
                        <svg className="h-5 w-5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      )}
                    </div>
                  </Button>
                </motion.div>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </>
          )}

          {/* Role Selection - Only show for register */}
          {mode === 'register' && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Join as</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    role === 'student'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setRole('student')}
                >
                  <GraduationCap className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">Student</div>
                  <div className="text-xs opacity-75">Learn & Connect</div>
                  {role === 'student' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full p-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </motion.div>
                  )}
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    role === 'alumni'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setRole('alumni')}
                >
                  <Briefcase className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">Alumni</div>
                  <div className="text-xs opacity-75">Share & Mentor</div>
                  {role === 'alumni' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full p-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error and Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center"
              >
                <AlertCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                {success}
              </motion.div>
            )}
            
            {/* Registration Fields */}
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <Input
                  label="Full Name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  fullWidth
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                
                <Input
                  label="College/Institution Name"
                  id="collegeName"
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="Enter your college or institution name"
                  required
                  fullWidth
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                    {role === 'student' ? 'Expected Year of Graduation' : 'Year of Graduation'}
                  </label>
                  <select
                    id="graduationYear"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    {role === 'student' 
                      ? 'When do you expect to graduate?' 
                      : 'When did you graduate?'}
                  </p>
                </div>
              </motion.div>
            )}
            
            {/* Email Field */}
            <Input
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              fullWidth
              className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            
            {/* Password Fields */}
            {mode !== 'forgot-password' && (
              <>
                <div className="relative">
                  <Input
                    label="Password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'login' ? '••••••••' : 'Create a secure password'}
                    required
                    fullWidth
                
                    className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                  
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Confirm Password for Registration */}
                {mode === 'register' && (
                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      fullWidth
                      className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                )}
              </>
            )}
            
            {/* Forgot Password Link */}
            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => toggleMode('forgot-password')}
                  className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            )}
            
            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            
            >
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                fullWidth
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-center">
                  {mode === 'login' ? (
                    <>
                      <Shield className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      Sign In
                    </>
                  ) : mode === 'register' ? (
                    <>
                
                      <Zap className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      Join Community
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      Send Reset Email
                    </>
                  
                  )}
                </div>
              </Button>
            </motion.div>
          </form>

          {/* Benefits - Only show for register */}
          {mode === 'register' && (
            <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span>Verified profiles</span>
              </div>
              <div className="flex items-center">
                
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span>Free mentorship</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span>Global community</span>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="text-center bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account?" : 
             mode === 'register' ? 'Already have an account?' : 
             'Remember your password?'}
            
            <motion.button
              type="button"
              onClick={() => toggleMode(mode === 'login' ? 'register' : 'login')}
              whileHover={{ scale: 1.05 }}
              className="ml-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300"
            >
              {mode === 'login'
                ? 'Join now' : 
               mode === 'register' ? 'Sign in' : 
               'Sign in'}
            </motion.button>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AuthForm;