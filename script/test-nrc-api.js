// Simple script to test NRC API endpoints
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api/v1/nrc';

// Test headers for development
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0LXVzZXItaWQiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYzMjE1MDQwMCwiZXhwIjoxOTQ3NTEwNDAwfQ.testSignatureForDevelopment',
  'x-bypass-auth': 'development-testing'
};

// Test data
const volunteerData = {
  userId: 'test-user-123',
  region: 'West Africa',
  country: 'Nigeria',
  displayName: 'Test Volunteer'
};

// Test functions
async function testHealthCheck() {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    console.log('Health Check:', response.data);
    return true;
  } catch (error) {
    console.error('Health Check Failed:', error.message);
    return false;
  }
}

async function testVolunteerRegistration() {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/volunteers/register`, 
      volunteerData,
      { headers }
    );
    console.log('Volunteer Registration:', response.data);
    return true;
  } catch (error) {
    console.error('Volunteer Registration Failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

async function testCheckStatus() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/volunteers/check-status`,
      { headers }
    );
    console.log('Check Status:', response.data);
    return true;
  } catch (error) {
    console.error('Check Status Failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('=== Starting NRC API Tests ===');
  
  const healthCheckResult = await testHealthCheck();
  console.log(`Health Check: ${healthCheckResult ? 'PASSED' : 'FAILED'}`);
  
  const registrationResult = await testVolunteerRegistration();
  console.log(`Volunteer Registration: ${registrationResult ? 'PASSED' : 'FAILED'}`);
  
  const statusResult = await testCheckStatus();
  console.log(`Check Status: ${statusResult ? 'PASSED' : 'FAILED'}`);
  
  console.log('=== NRC API Tests Completed ===');
}

runTests();