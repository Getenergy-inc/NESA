// Simple script to check if environment variables are loaded correctly
// Run with: node scripts/check-env.js

console.log('Checking environment variables...');

// Check admin credentials
console.log('ADMIN_USERNAME:', process.env.ADMIN_USERNAME || 'Not set');
console.log('ADMIN_PASSWORD set:', !!process.env.ADMIN_PASSWORD);
console.log('ADMIN_TOKEN set:', !!process.env.ADMIN_TOKEN);

// Check NextAuth configuration
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Not set');
console.log('NEXTAUTH_SECRET set:', !!process.env.NEXTAUTH_SECRET);

console.log('Done checking environment variables.');