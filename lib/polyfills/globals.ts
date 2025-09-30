// Polyfill for global object in browser environments
if (typeof window !== 'undefined' && typeof global === 'undefined') {
  (window as any).global = window;
}