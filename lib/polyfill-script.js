// This script will be injected into the HTML to provide polyfills
export const polyfillScript = `
  (function() {
    // Define global if it doesn't exist
    if (typeof window !== 'undefined' && typeof global === 'undefined') {
      window.global = window;
    }
  })();
`;