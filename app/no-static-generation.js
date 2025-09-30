// This file helps prevent static generation for certain pages
// It's imported by pages that should not be statically generated

// This will intentionally throw an error during static generation
// but work fine during server-side rendering at runtime
export function preventStaticGeneration() {
  // Only run this check during static generation (build time)
  if (process.env.NEXT_PHASE === 'phase-production-build' || 
      process.env.NEXT_PUBLIC_SKIP_AUTH_PAGES === 'true') {
    // This will cause static generation to fail for this page
    // but allow server-side rendering at runtime
    throw new Error('This page should not be statically generated');
  }
}

// Use this in pages that should not be statically generated
// Example: import { preventStaticGeneration } from '@/app/no-static-generation';
//          preventStaticGeneration();