/**
 * Integration Test Script for NESA-Africa Judges Application Flow
 * 
 * This script tests the complete judge application flow including:
 * - Landing page accessibility
 * - Application form submission
 * - Status tracking
 * - Authentication integration
 * 
 * Run with: node scripts/test-judge-flow.js
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Test data
const testApplication = {
  full_name: 'Dr. Test Judge',
  email: 'test.judge@example.com',
  phone: '+1234567890',
  state: 'Test State',
  education: 'PhD in Educational Leadership from Test University',
  experience: 'Over 15 years of experience in educational administration and policy development',
  motivation: 'Passionate about improving education standards across Africa and committed to fair evaluation',
  application_type: 'individual',
  expertise_areas: ['Educational Leadership', 'Policy & Governance'],
  category_preferences: ['Africa Icon', 'Competitive (Gold Certificate)'],
  region_interest: 'Africa',
  conflict_declaration: true
};

// Test functions
async function testLandingPageAccess() {
  console.log('🧪 Testing Landing Page Access...');
  try {
    const response = await fetch(`${BASE_URL}/judgeapply`);
    if (response.ok) {
      console.log('✅ Landing page accessible');
      return true;
    } else {
      console.log('❌ Landing page not accessible:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Landing page error:', error.message);
    return false;
  }
}

async function testApplicationFormAccess() {
  console.log('🧪 Testing Application Form Access...');
  try {
    const response = await fetch(`${BASE_URL}/judge-application-form`);
    if (response.ok) {
      console.log('✅ Application form accessible');
      return true;
    } else {
      console.log('❌ Application form not accessible:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Application form error:', error.message);
    return false;
  }
}

async function testStatusTrackingAccess() {
  console.log('🧪 Testing Status Tracking Access...');
  try {
    const response = await fetch(`${BASE_URL}/judge-status`);
    if (response.ok) {
      console.log('✅ Status tracking page accessible');
      return true;
    } else {
      console.log('❌ Status tracking page not accessible:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Status tracking error:', error.message);
    return false;
  }
}

async function testApplicationSubmission() {
  console.log('🧪 Testing Application Submission API...');
  try {
    const response = await fetch(`${BASE_URL}/api/judge-apply/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testApplication)
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ Application submission successful');
      return true;
    } else {
      console.log('❌ Application submission failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Application submission error:', error.message);
    return false;
  }
}

async function testStatusTracking() {
  console.log('🧪 Testing Status Tracking API...');
  try {
    // Test with sample data
    const response = await fetch(`${BASE_URL}/api/judge-apply/status?email=sarah.johnson@example.com`);
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ Status tracking working - found application');
      console.log(`   Status: ${data.application.current_status}`);
      return true;
    } else if (response.status === 404) {
      console.log('✅ Status tracking working - no application found (expected)');
      return true;
    } else {
      console.log('❌ Status tracking failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Status tracking error:', error.message);
    return false;
  }
}

async function testJudgeDashboardAccess() {
  console.log('🧪 Testing Judge Dashboard Access...');
  try {
    const response = await fetch(`${BASE_URL}/judge`);
    // Note: This will likely redirect to login for unauthenticated users
    // which is expected behavior
    if (response.ok || response.status === 302 || response.status === 401) {
      console.log('✅ Judge dashboard route exists (authentication required)');
      return true;
    } else {
      console.log('❌ Judge dashboard not accessible:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Judge dashboard error:', error.message);
    return false;
  }
}

async function testNavigationIntegration() {
  console.log('🧪 Testing Navigation Integration...');
  try {
    // Test if the main pages are accessible
    const pages = [
      '/judgeapply',
      '/judge-application-form',
      '/judge-status',
      '/about-judges'
    ];
    
    let allPagesAccessible = true;
    
    for (const page of pages) {
      const response = await fetch(`${BASE_URL}${page}`);
      if (!response.ok) {
        console.log(`❌ Page not accessible: ${page} (${response.status})`);
        allPagesAccessible = false;
      }
    }
    
    if (allPagesAccessible) {
      console.log('✅ All navigation pages accessible');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('❌ Navigation integration error:', error.message);
    return false;
  }
}

// Main test runner
async function runIntegrationTests() {
  console.log('🚀 Starting NESA-Africa Judges Flow Integration Tests\n');
  console.log(`Testing against: ${BASE_URL}\n`);
  
  const tests = [
    { name: 'Landing Page Access', fn: testLandingPageAccess },
    { name: 'Application Form Access', fn: testApplicationFormAccess },
    { name: 'Status Tracking Access', fn: testStatusTrackingAccess },
    { name: 'Application Submission API', fn: testApplicationSubmission },
    { name: 'Status Tracking API', fn: testStatusTracking },
    { name: 'Judge Dashboard Access', fn: testJudgeDashboardAccess },
    { name: 'Navigation Integration', fn: testNavigationIntegration }
  ];
  
  let passedTests = 0;
  let totalTests = tests.length;
  
  for (const test of tests) {
    const result = await test.fn();
    if (result) passedTests++;
    console.log(''); // Add spacing between tests
  }
  
  console.log('📊 Test Results Summary:');
  console.log(`   Passed: ${passedTests}/${totalTests}`);
  console.log(`   Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! The judges application flow is ready.');
  } else {
    console.log('⚠️  Some tests failed. Please review the issues above.');
  }
  
  return passedTests === totalTests;
}

// Run tests if this script is executed directly
if (require.main === module) {
  runIntegrationTests()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Test runner error:', error);
      process.exit(1);
    });
}

module.exports = {
  runIntegrationTests,
  testLandingPageAccess,
  testApplicationFormAccess,
  testStatusTrackingAccess,
  testApplicationSubmission,
  testStatusTracking,
  testJudgeDashboardAccess,
  testNavigationIntegration
};
