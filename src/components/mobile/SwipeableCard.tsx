import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: {
    icon: React.ReactNode;
    color: string;
    label: string;
  };
  rightAction?: {
    icon: React.ReactNode;
    color: string;
    label: string;
  };
  className?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  className = ''
}) => {
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const leftActionOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
  const rightActionOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);

  const handleDragStart = () => {
    setIsSwipeActive(true);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsSwipeActive(false);
    
    if (info.offset.x > 100 && onSwipeRight) {
      onSwipeRight();
    } else if (info.offset.x < -100 && onSwipeLeft) {
      onSwipeLeft();
    }
    
    x.set(0);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Left Action */}
      {leftAction && (
        <motion.div
          style={{ opacity: leftActionOpacity }}
          className={`absolute left-0 top-0 bottom-0 w-20 flex items-center justify-center ${leftAction.color}`}
        >
          <div className="text-center">
            {leftAction.icon}
            <p className="text-xs mt-1 text-white font-medium">{leftAction.label}</p>
          </div>
        </motion.div>
      )}

      {/* Right Action */}
      {rightAction && (
        <motion.div
          style={{ opacity: rightActionOpacity }}
          className={`absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center ${rightAction.color}`}
        >
          <div className="text-center">
            {rightAction.icon}
            <p className="text-xs mt-1 text-white font-medium">{rightAction.label}</p>
          </div>
        </motion.div>
      )}

      {/* Main Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -150, right: 150 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x, opacity }}
        className={`bg-white relative z-10 ${className} ${
          isSwipeActive ? 'shadow-xl' : 'shadow-sm'
        } transition-shadow duration-200`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SwipeableCard;