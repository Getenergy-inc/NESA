'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ResponsiveEnhancerProps {
  children: React.ReactNode;
  className?: string;
}

interface BreakpointInfo {
  name: string;
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const ResponsiveEnhancer: React.FC<ResponsiveEnhancerProps> = ({ children, className = '' }) => {
  const [breakpoint, setBreakpoint] = useState<BreakpointInfo>({
    name: 'desktop',
    width: 1024,
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let breakpointInfo: BreakpointInfo;
      
      if (width < 640) {
        breakpointInfo = {
          name: 'mobile',
          width,
          isMobile: true,
          isTablet: false,
          isDesktop: false
        };
      } else if (width < 1024) {
        breakpointInfo = {
          name: 'tablet',
          width,
          isMobile: false,
          isTablet: true,
          isDesktop: false
        };
      } else {
        breakpointInfo = {
          name: 'desktop',
          width,
          isMobile: false,
          isTablet: false,
          isDesktop: true
        };
      }
      
      setBreakpoint(breakpointInfo);
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const detectTouchDevice = () => {
      setTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    updateBreakpoint();
    detectTouchDevice();

    window.addEventListener('resize', updateBreakpoint);
    window.addEventListener('orientationchange', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
      window.removeEventListener('orientationchange', updateBreakpoint);
    };
  }, []);

  // Add responsive classes to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing breakpoint classes
    root.classList.remove('mobile', 'tablet', 'desktop', 'portrait', 'landscape', 'touch', 'no-touch');
    
    // Add current breakpoint classes
    root.classList.add(breakpoint.name);
    root.classList.add(orientation);
    root.classList.add(touchDevice ? 'touch' : 'no-touch');
  }, [breakpoint, orientation, touchDevice]);

  const getResponsiveClasses = () => {
    const classes = [
      `breakpoint-${breakpoint.name}`,
      `orientation-${orientation}`,
      touchDevice ? 'touch-device' : 'no-touch-device'
    ];
    
    return classes.join(' ');
  };

  return (
    <div className={`responsive-container ${getResponsiveClasses()} ${className}`}>
      {children}
    </div>
  );
};

// Hook for responsive behavior
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<BreakpointInfo>({
    name: 'desktop',
    width: 1024,
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let breakpointInfo: BreakpointInfo;
      
      if (width < 640) {
        breakpointInfo = {
          name: 'mobile',
          width,
          isMobile: true,
          isTablet: false,
          isDesktop: false
        };
      } else if (width < 1024) {
        breakpointInfo = {
          name: 'tablet',
          width,
          isMobile: false,
          isTablet: true,
          isDesktop: false
        };
      } else {
        breakpointInfo = {
          name: 'desktop',
          width,
          isMobile: false,
          isTablet: false,
          isDesktop: true
        };
      }
      
      setBreakpoint(breakpointInfo);
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const detectTouchDevice = () => {
      setTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    updateBreakpoint();
    detectTouchDevice();

    window.addEventListener('resize', updateBreakpoint);
    window.addEventListener('orientationchange', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
      window.removeEventListener('orientationchange', updateBreakpoint);
    };
  }, []);

  return {
    breakpoint,
    orientation,
    touchDevice,
    isMobile: breakpoint.isMobile,
    isTablet: breakpoint.isTablet,
    isDesktop: breakpoint.isDesktop,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape'
  };
};

// Responsive Grid Component
export const ResponsiveGrid: React.FC<{
  children: React.ReactNode;
  cols?: { mobile?: number; tablet?: number; desktop?: number };
  gap?: number;
  className?: string;
}> = ({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 }, 
  gap = 4,
  className = '' 
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  const currentCols = isMobile ? cols.mobile : isTablet ? cols.tablet : cols.desktop;
  
  return (
    <div 
      className={`grid gap-${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${currentCols}, 1fr)`
      }}
    >
      {children}
    </div>
  );
};

// Responsive Text Component
export const ResponsiveText: React.FC<{
  children: React.ReactNode;
  size?: { mobile?: string; tablet?: string; desktop?: string };
  className?: string;
}> = ({ 
  children, 
  size = { mobile: 'text-sm', tablet: 'text-base', desktop: 'text-lg' },
  className = '' 
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  const currentSize = isMobile ? size.mobile : isTablet ? size.tablet : size.desktop;
  
  return (
    <span className={`${currentSize} ${className}`}>
      {children}
    </span>
  );
};

// Responsive Container Component
export const ResponsiveContainer: React.FC<{
  children: React.ReactNode;
  padding?: { mobile?: string; tablet?: string; desktop?: string };
  maxWidth?: { mobile?: string; tablet?: string; desktop?: string };
  className?: string;
}> = ({ 
  children, 
  padding = { mobile: 'p-4', tablet: 'p-6', desktop: 'p-8' },
  maxWidth = { mobile: 'max-w-full', tablet: 'max-w-4xl', desktop: 'max-w-6xl' },
  className = '' 
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  const currentPadding = isMobile ? padding.mobile : isTablet ? padding.tablet : padding.desktop;
  const currentMaxWidth = isMobile ? maxWidth.mobile : isTablet ? maxWidth.tablet : maxWidth.desktop;
  
  return (
    <div className={`${currentPadding} ${currentMaxWidth} mx-auto ${className}`}>
      {children}
    </div>
  );
};

// Responsive Show/Hide Component
export const ResponsiveShow: React.FC<{
  children: React.ReactNode;
  on?: ('mobile' | 'tablet' | 'desktop')[];
  className?: string;
}> = ({ children, on = ['desktop'], className = '' }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  const shouldShow = (
    (on.includes('mobile') && isMobile) ||
    (on.includes('tablet') && isTablet) ||
    (on.includes('desktop') && isDesktop)
  );
  
  if (!shouldShow) return null;
  
  return <div className={className}>{children}</div>;
};

// Responsive Navigation Component
export const ResponsiveNav: React.FC<{
  children: React.ReactNode;
  mobileLayout?: 'drawer' | 'bottom' | 'dropdown';
  className?: string;
}> = ({ children, mobileLayout = 'drawer', className = '' }) => {
  const { isMobile } = useResponsive();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (!isMobile) {
    return <nav className={`flex items-center space-x-6 ${className}`}>{children}</nav>;
  }
  
  switch (mobileLayout) {
    case 'bottom':
      return (
        <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 ${className}`}>
          <div className="flex justify-around py-2">
            {children}
          </div>
        </nav>
      );
      
    case 'dropdown':
      return (
        <div className={`relative ${className}`}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 py-2"
            >
              {children}
            </motion.div>
          )}
        </div>
      );
      
    case 'drawer':
    default:
      return (
        <>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {mobileMenuOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.nav
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-4 ${className}`}
              >
                <div className="flex flex-col space-y-4">
                  {children}
                </div>
              </motion.nav>
            </>
          )}
        </>
      );
  }
};

export default ResponsiveEnhancer;
