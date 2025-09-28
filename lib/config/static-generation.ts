// Configuration for static generation
// This helps prevent errors during build time with authentication components

// Determine if we're in a static generation context
export const isStaticGeneration = 
  typeof process !== 'undefined' && 
  process.env.NEXT_PHASE === 'phase-production-build';

// Determine if we should skip auth pages during static generation
export const shouldSkipAuthPages = 
  isStaticGeneration || 
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SKIP_AUTH_PAGES === 'true');

// Helper function to check if a route should be protected from static generation
export function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = [
    '/admin',
    '/sponsors',
    '/judge',
    '/member',
    '/dashboard',
    '/account',
  ];
  
  return protectedPaths.some(path => pathname.startsWith(path));
}