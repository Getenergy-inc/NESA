const { execSync } = require('child_process');

console.log('🚀 Starting custom Netlify build process...');

// Set environment variables
process.env.NODE_OPTIONS = '--max-old-space-size=4096';
process.env.NEXT_TELEMETRY_DISABLED = '1';

try {
  // Run the Next.js build
  console.log('🏗️ Building Next.js application...');
  execSync('next build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed with error:', error.message);
  process.exit(1);
}