import React from 'react';
import { motion } from 'framer-motion';

interface TouchOptimizedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const TouchOptimizedButton: React.FC<TouchOptimizedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-indigo-500',
  };
  
  // Mobile-optimized touch targets (minimum 44px)
  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
  };
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default TouchOptimizedButton;