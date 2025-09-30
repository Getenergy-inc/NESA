// Simple script to test admin login
// Run with: node scripts/test-admin-login.js

console.log('Testing admin login...');

// Admin credentials
const adminUsername = 'admin';
const adminPassword = 'nesa2025admin';

console.log('Admin credentials:');
console.log('Username:', adminUsername);
console.log('Password:', adminPassword);

// NextAuth configuration
console.log('\nNextAuth configuration:');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Not set (should be http://localhost:3000)');
console.log('NEXTAUTH_SECRET set:', !!process.env.NEXTAUTH_SECRET);

console.log('\nTo test admin login:');
console.log('1. Go to http://localhost:3000/admin');
console.log('2. You should be redirected to the login page');
console.log('3. Enter the admin credentials above');
console.log('4. You should be redirected to the admin dashboard');

console.log('\nIf login fails, check the browser console for errors');
console.log('Done testing admin login.');