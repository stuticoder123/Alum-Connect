import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (event: any, info: PanInfo) => {
    if (containerRef.current?.scrollTop === 0 && info.offset.y > 0) {
      setPullDistance(Math.min(info.offset.y, threshold * 1.5));
    }
  };

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  };

  const refreshProgress = Math.min(pullDistance / threshold, 1);
  const shouldTrigger = pullDistance >= threshold;

  return (
    <div className="relative overflow-hidden">
      {/* Pull to refresh indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center bg-indigo-50 z-10"
        style={{
          height: pullDistance,
          opacity: refreshProgress
        }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{
              rotate: isRefreshing ? 360 : refreshProgress * 180
            }}
            transition={{
              duration: isRefreshing ? 1 : 0,
              repeat: isRefreshing ? Infinity : 0,
              ease: "linear"
            }}
          >
            <RefreshCw 
              className={`h-6 w-6 ${
                shouldTrigger ? 'text-indigo-600' : 'text-gray-400'
              }`} 
            />
          </motion.div>
          <p className={`text-xs mt-1 ${
            shouldTrigger ? 'text-indigo-600' : 'text-gray-400'
          }`}>
            {isRefreshing ? 'Refreshing...' : shouldTrigger ? 'Release to refresh' : 'Pull to refresh'}
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        ref={containerRef}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{
          y: pullDistance
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;