/**
 * Scroll utility functions for better page navigation experience
 */

export const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior
    });
  }
};

export const scrollToElement = (elementId: string, behavior: ScrollBehavior = 'smooth') => {
  if (typeof window !== 'undefined') {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior, block: 'start' });
    }
  }
};

export const getScrollPosition = () => {
  if (typeof window !== 'undefined') {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }
  return { x: 0, y: 0 };
};

export const disableScroll = () => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
};

export const enableScroll = () => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'unset';
  }
};

// Debounced scroll handler
export const createScrollHandler = (callback: () => void, delay: number = 100) => {
  let timeoutId: NodeJS.Timeout;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};

// Check if element is in viewport
export const isElementInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};