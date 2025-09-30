#!/usr/bin/env node

/**
 * Simple NRC Integration Health Check
 * 
 * Verifies that all NRC integration files are properly set up
 * Does not require external dependencies
 */

const fs = require('fs');
const path = require('path');

class SimpleHealthChecker {
  constructor() {
    this.checks = [];
    this.passed = 0;
    this.failed = 0;
  }

  log(message, type = 'info') {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    console.log(`${icons[type]} ${message}`);
  }

  check(name, testFn) {
    try {
      const result = testFn();
      if (result) {
        this.log(`${name}: PASS`, 'success');
        this.passed++;
      } else {
        this.log(`${name}: FAIL`, 'error');
        this.failed++;
      }
    } catch (error) {
      this.log(`${name}: ERROR - ${error.message}`, 'error');
      this.failed++;
    }
  }

  fileExists(filePath) {
    return fs.existsSync(path.join(__dirname, '..', filePath));
  }

  fileContains(filePath, searchString) {
    if (!this.fileExists(filePath)) return false;
    try {
      const content = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');
      return content.includes(searchString);
    } catch (error) {
      return false;
    }
  }

  runAllChecks() {
    this.log('🔍 Running NRC Integration Health Checks...\n');

    // File existence checks
    this.check('NRC Service exists', () => 
      this.fileExists('lib/services/nrcService.ts')
    );

    this.check('NRC Dashboard Hook exists', () => 
      this.fileExists('lib/hooks/useNRCDashboard.ts')
    );

    this.check('NRC Status Hook exists', () => 
      this.fileExists('lib/hooks/useNRCStatus.ts')
    );

    this.check('NRC Registration Hook exists', () => 
      this.fileExists('lib/hooks/useNRCRegistration.ts')
    );

    this.check('NRC Application Form exists', () => 
      this.fileExists('components/UI/nrc/NRCApplicationForm.tsx')
    );

    this.check('NRC Dashboard Component exists', () => 
      this.fileExists('components/UI/nrc/NRCDashboard.tsx')
    );

    this.check('NRC Protected Route exists', () => 
      this.fileExists('components/Common/NRCProtectedRoute.tsx')
    );

    // Integration verification checks
    this.check('NRC Service uses real API calls', () => 
      this.fileContains('lib/services/nrcService.ts', 'apiClient.post') &&
      this.fileContains('lib/services/nrcService.ts', '/api/v1/nrc')
    );

    this.check('Dashboard Hook uses NRC Service', () => 
      this.fileContains('lib/hooks/useNRCDashboard.ts', 'nrcService.getVolunteerDashboard')
    );

    this.check('Status Hook uses real backend', () => 
      this.fileContains('lib/hooks/useNRCStatus.ts', 'nrcService.checkVolunteerStatus')
    );

    this.check('Registration Hook uses real API', () => 
      this.fileContains('lib/hooks/useNRCRegistration.ts', 'nrcService.registerVolunteer')
    );

    this.check('Application Form uses real registration', () => 
      this.fileContains('components/UI/nrc/NRCApplicationForm.tsx', 'useNRCRegistration')
    );

    this.check('Dashboard uses real data hooks', () => 
      this.fileContains('components/UI/nrc/NRCDashboard.tsx', 'useNRCStatus') &&
      this.fileContains('components/UI/nrc/NRCDashboard.tsx', 'nrcService')
    );

    this.check('Protected Route uses real auth', () => 
      this.fileContains('components/Common/NRCProtectedRoute.tsx', 'useAuth')
    );

    // Mock service removal checks
    this.check('No mock NRC service imports', () => 
      !this.fileContains('lib/hooks/useNRCDashboard.ts', 'mockNRCService') &&
      !this.fileContains('lib/hooks/useNRCStatus.ts', 'mockNRCService') &&
      !this.fileContains('components/UI/nrc/NRCDashboard.tsx', 'mockNRCService')
    );

    this.check('No TODO comments for mock removal', () => 
      !this.fileContains('components/UI/nrc/NRCApplicationForm.tsx', 'TODO: Re-enable authentication') &&
      !this.fileContains('components/Common/NRCProtectedRoute.tsx', 'TODO: Re-enable authentication')
    );

    // TypeScript and build checks
    this.check('Package.json has test script', () => 
      this.fileContains('package.json', 'test:nrc-integration')
    );

    this.check('Integration guide exists', () => 
      this.fileExists('NRC_INTEGRATION_GUIDE.md')
    );

    this.check('Integration verification exists', () => 
      this.fileExists('INTEGRATION_VERIFICATION.md')
    );

    // Summary
    this.log('\n📊 Health Check Results:');
    this.log(`✅ Passed: ${this.passed}`);
    this.log(`❌ Failed: ${this.failed}`);
    
    const total = this.passed + this.failed;
    const successRate = Math.round((this.passed / total) * 100);
    this.log(`📈 Success Rate: ${successRate}%`);

    if (this.failed === 0) {
      this.log('\n🎉 All health checks passed! NRC integration is ready.', 'success');
      this.log('Next steps:', 'info');
      this.log('1. Start your backend server: cd server && npm run dev', 'info');
      this.log('2. Start your frontend: npm run dev', 'info');
      this.log('3. Visit: http://localhost:3000/get-involved/nrc-volunteer', 'info');
      return true;
    } else {
      this.log('\n⚠️ Some health checks failed. Please review the issues above.', 'warning');
      return false;
    }
  }
}

// Run health checks
if (require.main === module) {
  const checker = new SimpleHealthChecker();
  const success = checker.runAllChecks();
  process.exit(success ? 0 : 1);
}

module.exports = SimpleHealthChecker;