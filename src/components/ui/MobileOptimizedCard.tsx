import React from 'react';
import { motion } from 'framer-motion';

interface MobileOptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  hover = true 
}) => {
  const paddingClasses = {
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8'
  };

  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.01 } : {}}
      className={`
        bg-white rounded-xl border border-gray-200 shadow-sm
        ${paddingClasses[padding]}
        ${hover ? 'hover:shadow-lg transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default MobileOptimizedCard;