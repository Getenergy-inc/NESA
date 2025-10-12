#!/usr/bin/env node

/**
 * Comprehensive NRC Backend API Test
 * Tests all endpoints and functionality
 */

const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const NRC_BASE_URL = `${API_BASE_URL}/api/v1/nrc`;

class NRCBackendTest {
  constructor() {
    this.baseURL = NRC_BASE_URL;
    this.testVolunteerId = `test-${Date.now()}`;
    this.testNomineeId = null;
    this.testTaskId = null;
    this.results = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async makeRequest(method, endpoint, data = null) {
    try {
      const config = {
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (data) {
        config.data = data;
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
    this.log('Testing health check...');
    const result = await this.makeRequest('GET', '/health');
    
    if (result.success && result.data.success) {
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
      userId: this.testVolunteerId,
      region: 'Africa',
      country: 'Nigeria',
      fullName: 'Test Volunteer',
      email: `test-${Date.now()}@example.com`
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

  async testCheckVolunteerStatus() {
    this.log('Testing check volunteer status...');
    
    const result = await this.makeRequest('GET', `/volunteers/check-status?userId=${this.testVolunteerId}`);
    
    if (result.success && result.data.success && result.data.data.isVolunteer) {
      this.log('Check volunteer status passed', 'success');
      return true;
    } else {
      this.log(`Check volunteer status failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testGetDashboard() {
    this.log('Testing get dashboard...');
    
    const result = await this.makeRequest('GET', `/volunteers/${this.testVolunteerId}/dashboard`);
    
    if (result.success && result.data.success) {
      this.log('Get dashboard passed', 'success');
      this.log(`Dashboard data: ${JSON.stringify(result.data.data, null, 2)}`);
      return true;
    } else {
      this.log(`Get dashboard failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testCreateNominee() {
    this.log('Testing create nominee...');
    
    // Note: This is a simplified test. In real scenario, use FormData for file uploads
    const nomineeData = {
      volunteerId: this.testVolunteerId,
      fullName: 'Test Nominee',
      country: 'Nigeria',
      region: 'Lagos',
      superAwardCategory: 'Gold Certificate Awards',
      awardCategory: 'NGO Educational Champion of the Decade',
      subcategory: 'Best NGO for Inclusive Education and Literacy',
      achievementSummary: 'Outstanding work in education sector with measurable impact on student outcomes and community development.',
      impactMetrics: 'Reached 10,000+ students, improved literacy rates by 40%, established 50+ learning centers.',
      sdgAlignment: 'SDG 4: Quality Education,SDG 10: Reduced Inequalities',
      agendaAlignment: 'Aligned with AU Agenda 2063 goals for education and youth empowerment.',
      esgAlignment: 'Strong ESG principles with focus on social impact and governance.',
      status: 'REVIEW'
    };

    const result = await this.makeRequest('POST', '/nominees', nomineeData);
    
    if (result.success && result.data.success) {
      this.testNomineeId = result.data.data.id;
      this.log(`Create nominee passed. Nominee ID: ${this.testNomineeId}`, 'success');
      return true;
    } else {
      this.log(`Create nominee failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testGetNominees() {
    this.log('Testing get nominees...');
    
    const result = await this.makeRequest('GET', `/volunteers/${this.testVolunteerId}/nominees`);
    
    if (result.success && result.data.success) {
      this.log(`Get nominees passed. Found ${result.data.data.nominees.length} nominees`, 'success');
      return true;
    } else {
      this.log(`Get nominees failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testUpdateNominee() {
    if (!this.testNomineeId) {
      this.log('Skipping update nominee test (no nominee ID)', 'warning');
      return true;
    }

    this.log('Testing update nominee...');
    
    const updateData = {
      status: 'VERIFIED',
      reviewedBy: 'test-admin'
    };

    const result = await this.makeRequest('PUT', `/nominees/${this.testNomineeId}`, updateData);
    
    if (result.success && result.data.success) {
      this.log('Update nominee passed', 'success');
      return true;
    } else {
      this.log(`Update nominee failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testGetAGCTransactions() {
    this.log('Testing get AGC transactions...');
    
    const result = await this.makeRequest('GET', `/volunteers/${this.testVolunteerId}/agc/transactions`);
    
    if (result.success && result.data.success) {
      this.log(`Get AGC transactions passed. Found ${result.data.data.transactions.length} transactions`, 'success');
      return true;
    } else {
      this.log(`Get AGC transactions failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testCreateTask() {
    this.log('Testing create task...');
    
    const taskData = {
      volunteerId: this.testVolunteerId,
      title: 'Test Task',
      description: 'This is a test task',
      assignedTo: [this.testVolunteerId],
      priority: 'medium',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Research',
      agcReward: 1
    };

    const result = await this.makeRequest('POST', '/tasks', taskData);
    
    if (result.success && result.data.success) {
      this.testTaskId = result.data.data.id;
      this.log(`Create task passed. Task ID: ${this.testTaskId}`, 'success');
      return true;
    } else {
      this.log(`Create task failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testGetTasks() {
    this.log('Testing get tasks...');
    
    const result = await this.makeRequest('GET', `/volunteers/${this.testVolunteerId}/tasks`);
    
    if (result.success && result.data.success) {
      this.log(`Get tasks passed. Found ${result.data.data.tasks.length} tasks`, 'success');
      return true;
    } else {
      this.log(`Get tasks failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testCompleteTask() {
    if (!this.testTaskId) {
      this.log('Skipping complete task test (no task ID)', 'warning');
      return true;
    }

    this.log('Testing complete task...');
    
    const completionData = {
      completedBy: this.testVolunteerId,
      completionNotes: 'Task completed successfully'
    };

    const result = await this.makeRequest('PUT', `/tasks/${this.testTaskId}/complete`, completionData);
    
    if (result.success && result.data.success) {
      this.log('Complete task passed', 'success');
      return true;
    } else {
      this.log(`Complete task failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testGetLeaderboard() {
    this.log('Testing get leaderboard...');
    
    const result = await this.makeRequest('GET', '/leaderboard?type=monthly&limit=10');
    
    if (result.success && result.data.success) {
      this.log(`Get leaderboard passed. Found ${result.data.data.length} volunteers`, 'success');
      return true;
    } else {
      this.log(`Get leaderboard failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async testAnalyticsDashboard() {
    this.log('Testing analytics dashboard...');
    
    const result = await this.makeRequest('GET', '/analytics/dashboard?period=month');
    
    if (result.success && result.data.success) {
      this.log('Analytics dashboard passed', 'success');
      return true;
    } else {
      this.log(`Analytics dashboard failed: ${JSON.stringify(result.error)}`, 'error');
      return false;
    }
  }

  async runAllTests() {
    this.log('🚀 Starting NRC Backend Comprehensive Tests...');
    this.log(`API Base URL: ${this.baseURL}`);
    this.log(`Test Volunteer ID: ${this.testVolunteerId}`);
    
    const tests = [
      { name: 'Health Check', fn: () => this.testHealthCheck() },
      { name: 'Volunteer Registration', fn: () => this.testVolunteerRegistration() },
      { name: 'Check Volunteer Status', fn: () => this.testCheckVolunteerStatus() },
      { name: 'Get Dashboard', fn: () => this.testGetDashboard() },
      { name: 'Create Nominee', fn: () => this.testCreateNominee() },
      { name: 'Get Nominees', fn: () => this.testGetNominees() },
      { name: 'Update Nominee', fn: () => this.testUpdateNominee() },
      { name: 'Get AGC Transactions', fn: () => this.testGetAGCTransactions() },
      { name: 'Create Task', fn: () => this.testCreateTask() },
      { name: 'Get Tasks', fn: () => this.testGetTasks() },
      { name: 'Complete Task', fn: () => this.testCompleteTask() },
      { name: 'Get Leaderboard', fn: () => this.testGetLeaderboard() },
      { name: 'Analytics Dashboard', fn: () => this.testAnalyticsDashboard() }
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      try {
        this.log(`\n📋 Running: ${test.name}`);
        const result = await test.fn();
        
        if (result) {
          passed++;
          this.results.push({ name: test.name, status: 'PASS' });
        } else {
          failed++;
          this.results.push({ name: test.name, status: 'FAIL' });
        }
      } catch (error) {
        this.log(`Test ${test.name} threw an error: ${error.message}`, 'error');
        failed++;
        this.results.push({ name: test.name, status: 'ERROR', error: error.message });
      }
    }

    this.log('\n📊 Test Results Summary:');
    this.log(`✅ Passed: ${passed}`);
    this.log(`❌ Failed: ${failed}`);
    this.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

    this.log('\n📋 Detailed Results:');
    this.results.forEach((result, index) => {
      const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
      this.log(`${icon} ${index + 1}. ${result.name}: ${result.status}`);
    });

    if (failed === 0) {
      this.log('\n🎉 All tests passed! NRC backend is fully functional.', 'success');
      process.exit(0);
    } else {
      this.log(`\n⚠️ ${failed} test(s) failed. Please review the errors above.`, 'warning');
      process.exit(1);
    }
  }
}

// Run the tests
if (require.main === module) {
  const tester = new NRCBackendTest();
  tester.runAllTests().catch(error => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = NRCBackendTest;
