import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToTop } from '@/lib/utils/scrollUtils';

export const useScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      scrollToTop('instant');
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);
};

export const useScrollToTopOnMount = () => {
  useEffect(() => {
    // Immediate scroll to top on component mount
    scrollToTop('instant');
    
    // Also ensure scroll position is reset after a brief delay
    const timer = setTimeout(() => {
      scrollToTop('instant');
    }, 100);

    return () => clearTimeout(timer);
  }, []);
};

export const useScrollToTopOnRouteChange = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Force immediate scroll to top on route change
    scrollToTop('instant');
    
    // Double-check after DOM updates
    const timer = setTimeout(() => {
      scrollToTop('instant');
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);
};