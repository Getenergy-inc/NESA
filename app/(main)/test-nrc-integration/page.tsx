'use client';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import nrcService from '@/lib/services/nrcService';

export default function TestNRCIntegration() {
  const { user, isAuthenticated } = useAuthContext();
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  const runTest = async (name: string, testFn: () => Promise<any>) => {
    try {
      setLoading(true);
      const result = await testFn();
      setTestResults(prev => [...prev, { name, status: 'PASS', result }]);
      return result;
    } catch (err: any) {
      setTestResults(prev => [...prev, { name, status: 'FAIL', error: err.message }]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const testHealthCheck = async () => {
    const response = await fetch('/api/v1/nrc/health');
    return await response.json();
  };

  const testCheckStatus = async () => {
    if (!user?.id) throw new Error('User not authenticated');
    const result = await nrcService.checkVolunteerStatus(user.id);
    setStatus(result);
    return result;
  };

  const testRegisterVolunteer = async () => {
    if (!user?.id) throw new Error('User not authenticated');
    const result = await nrcService.registerVolunteer({
      userId: user.id,
      region: 'Africa',
      country: 'Nigeria',
      fullName: user.fullName || user.name || 'Test User',
      email: user.email
    });
    return result;
  };

  const testGetDashboard = async () => {
    if (!user?.id) throw new Error('User not authenticated');
    const result = await nrcService.getVolunteerDashboard(user.id);
    return result;
  };

  const runAllTests = async () => {
    setTestResults([]);
    setError(null);
    
    try {
      await runTest('Health Check', testHealthCheck);
      await runTest('Check Volunteer Status', testCheckStatus);
      await runTest('Register Volunteer', testRegisterVolunteer);
      await runTest('Get Dashboard', testGetDashboard);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">NRC Integration Test</h1>

        {/* Auth Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
            <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <p><strong>Name:</strong> {user?.fullName || user?.name || 'N/A'}</p>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Run Tests</h2>
          <button
            onClick={runAllTests}
            disabled={loading || !isAuthenticated}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Running Tests...' : 'Run All Tests'}
          </button>
          {!isAuthenticated && (
            <p className="text-red-600 mt-2">Please log in to run tests</p>
          )}
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="space-y-4">
              {testResults.map((test, index) => (
                <div key={index} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={test.status === 'PASS' ? 'text-green-600' : 'text-red-600'}>
                      {test.status === 'PASS' ? '✅' : '❌'}
                    </span>
                    <strong>{test.name}</strong>
                  </div>
                  {test.result && (
                    <pre className="bg-gray-50 p-3 rounded text-sm overflow-auto">
                      {JSON.stringify(test.result, null, 2)}
                    </pre>
                  )}
                  {test.error && (
                    <p className="text-red-600 text-sm">{test.error}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteer Status */}
        {status && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Volunteer Status</h2>
            <pre className="bg-gray-50 p-4 rounded overflow-auto">
              {JSON.stringify(status, null, 2)}
            </pre>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800"><strong>Error:</strong> {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
