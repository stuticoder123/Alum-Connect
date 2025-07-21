import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Shield, CheckCircle } from 'lucide-react';

interface VerificationBadgeProps {
  isVerified: boolean;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  isVerified, 
  size = 'md', 
  showTooltip = true,
  className = '' 
}) => {
  if (!isVerified) return null;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="relative"
      >
        <BadgeCheck className={`${sizeClasses[size]} text-blue-500`} />
        
        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
          Verified Alumni
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default VerificationBadge;