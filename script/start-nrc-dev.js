#!/usr/bin/env node

/**
 * NRC Development Startup Script
 * Checks environment and starts the development server
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting NRC Development Environment...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ Error: .env file not found!');
  console.log('\n📝 Please create a .env file with the following variables:');
  console.log('   MONGODB_URI=your_mongodb_connection_string');
  console.log('   NRC_DATABASE_URL=your_nrc_mongodb_connection_string (optional)');
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf8');

// Check for required environment variables
const requiredVars = ['MONGODB_URI'];
const missingVars = [];

requiredVars.forEach(varName => {
  if (!envContent.includes(varName)) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.error('❌ Error: Missing required environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  process.exit(1);
}

console.log('✅ Environment variables configured');

// Check if node_modules exists
if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
  console.log('\n📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
}

// Check if upload directories exist
const uploadDirs = [
  'public/uploads/nominees/profiles',
  'public/uploads/nominees/documents'
];

uploadDirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`📁 Creating directory: ${dir}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

console.log('✅ Upload directories ready');

console.log('\n🎯 NRC Backend Endpoints:');
console.log('   Health Check: http://localhost:3000/api/v1/nrc/health');
console.log('   Volunteer Registration: http://localhost:3000/api/v1/nrc/volunteers/register');
console.log('   Check Status: http://localhost:3000/api/v1/nrc/volunteers/check-status');
console.log('   Dashboard: http://localhost:3000/api/v1/nrc/volunteers/{userId}/dashboard');
console.log('   Leaderboard: http://localhost:3000/api/v1/nrc/leaderboard');

console.log('\n🌐 NRC Frontend Pages:');
console.log('   Landing Page: http://localhost:3000/get-involved/nrc-volunteer');
console.log('   Application: http://localhost:3000/get-involved/nrc-volunteer/apply');
console.log('   Dashboard: http://localhost:3000/get-involved/nrc-volunteer/dashboard');
console.log('   Upload Nominee: http://localhost:3000/get-involved/nrc-volunteer/nominees/add');
console.log('   Test Integration: http://localhost:3000/test-nrc-integration');

console.log('\n🧪 Test Commands:');
console.log('   npm run test:nrc-backend');
console.log('   npm run test:nrc-auth');

console.log('\n📚 Documentation:');
console.log('   API Reference: app/api/v1/nrc/README.md');
console.log('   Quick Start: NRC_QUICK_START.md');
console.log('   Complete Guide: NRC_COMPLETE_IMPLEMENTATION.md');

console.log('\n🚀 Starting development server...\n');

try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error('\n❌ Development server failed to start');
  process.exit(1);
}
