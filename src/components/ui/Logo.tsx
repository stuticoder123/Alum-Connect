import React from 'react';

interface LogoProps {
  color?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ color = 'dark', size = 'md' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex items-center">
      <img 
        src="/fotor-2025020519619[1].png" 
        alt="AlumConnect Logo" 
        className={`${sizes[size]} object-contain`}
      />
    </div>
  );
};

export default Logo;