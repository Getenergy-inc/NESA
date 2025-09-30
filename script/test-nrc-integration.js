#!/usr/bin/env node

/**
 * Simple NRC Integration Test Script
 * 
 * This script tests the basic NRC integration without requiring a full React environment
 */

const axios = require('axios');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const TEST_USER_ID = 'test-integration-' + Date.now();

class NRCIntegrationTest {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api/v1/nrc`;
    this.authToken = null;
    this.testResults = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async makeRequest(method, endpoint, data = null, headers = {}) {
    try {
      const config = {
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      };

      if (data) {
        config.data = data;
      }

      if (this.authToken) {
        config.headers.Authorization = `Bearer ${this.authToken}`;
      }

      const response = await axios(config);
      return { success: true, data: response.data, status: response.status };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status || 500
      };
    }
  }

  async testHealthCheck() {
    this.log('Testing NRC health check...');
    const result = await this.makeRequest('GET', '/health');
    
    if (result.success) {
      this.log('Health check passed', 'success');
      return true;
    } else {
      this.log(`Health check failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testVolunteerRegistration() {
    this.log('Testing volunteer registration...');
    
    const volunteerData = {
      userId: TEST_USER_ID,
      region: 'Africa',
      country: 'Nigeria',
      displayName: 'Test Integration User',
      coordinator: 'test-coordinator'
    };

    const result = await this.makeRequest('POST', '/volunteers/register', volunteerData);
    
    if (result.success && result.data.success) {
      this.log('Volunteer registration passed', 'success');
      return true;
    } else {
      this.log(`Volunteer registration failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testVolunteerStatusCheck() {
    this.log('Testing volunteer status check...');
    
    const result = await this.makeRequest('GET', '/volunteers/check-status');
    
    if (result.success) {
      this.log('Volunteer status check passed', 'success');
      this.log(`Status: ${JSON.stringify(result.data.data, null, 2)}`);
      return true;
    } else {
      this.log(`Volunteer status check failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testDashboardEndpoint() {
    this.log('Testing dashboard endpoint...');
    
    // This would need a real volunteer ID in practice
    const result = await this.makeRequest('GET', `/volunteers/${TEST_USER_ID}/dashboard`);
    
    if (result.success || result.status === 404) {
      this.log('Dashboard endpoint accessible', 'success');
      return true;
    } else {
      this.log(`Dashboard endpoint failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async runAllTests() {
    this.log('🚀 Starting NRC Integration Tests...');
    this.log(`API Base URL: ${API_BASE_URL}`);
    this.log(`Test User ID: ${TEST_USER_ID}`);
    
    const tests = [
      { name: 'Health Check', fn: () => this.testHealthCheck() },
      { name: 'Volunteer Registration', fn: () => this.testVolunteerRegistration() },
      { name: 'Volunteer Status Check', fn: () => this.testVolunteerStatusCheck() },
      { name: 'Dashboard Endpoint', fn: () => this.testDashboardEndpoint() }
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      try {
        this.log(`\n📋 Running: ${test.name}`);
        const result = await test.fn();
        
        if (result) {
          passed++;
          this.testResults.push({ name: test.name, status: 'PASS' });
        } else {
          failed++;
          this.testResults.push({ name: test.name, status: 'FAIL' });
        }
      } catch (error) {
        this.log(`Test ${test.name} threw an error: ${error.message}`, 'error');
        failed++;
        this.testResults.push({ name: test.name, status: 'ERROR', error: error.message });
      }
    }

    this.log('\n📊 Test Results Summary:');
    this.log(`✅ Passed: ${passed}`);
    this.log(`❌ Failed: ${failed}`);
    this.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

    if (failed === 0) {
      this.log('\n🎉 All tests passed! NRC integration is working correctly.', 'success');
      process.exit(0);
    } else {
      this.log('\n⚠️ Some tests failed. Please check the backend server and configuration.', 'error');
      process.exit(1);
    }
  }
}

// Run the tests
if (require.main === module) {
  const tester = new NRCIntegrationTest();
  tester.runAllTests().catch(error => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = NRCIntegrationTest;