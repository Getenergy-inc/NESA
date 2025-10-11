'use client';

import { useState } from 'react';
import Button from '@/components/Common/Button';

export default function TestVerifyNomineePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [nominees, setNominees] = useState<any[]>([]);
  const [email, setEmail] = useState('samuelowase122@gmail.com');

  const fetchPendingNominees = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/nrc/admin/nominees/verify-latest');
      const data = await response.json();
      
      if (data.success) {
        setNominees(data.nominees);
        setResult({ type: 'info', message: `Found ${data.count} nominees in REVIEW status` });
      } else {
        setResult({ type: 'error', message: data.message });
      }
    } catch (error: any) {
      setResult({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const verifyLatestNominee = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/nrc/admin/nominees/verify-latest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || undefined })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult({ 
          type: 'success', 
          message: 'Nominee verified successfully!',
          data: data.data
        });
        // Refresh the list
        fetchPendingNominees();
      } else {
        setResult({ type: 'error', message: data.message });
      }
    } catch (error: any) {
      setResult({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quick Nominee Verification
          </h1>
          <p className="text-gray-600 mb-8">
            Test tool to verify nominees in REVIEW status
          </p>

          {/* Email Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter email to filter"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button
              text={loading ? 'Loading...' : 'Fetch Pending Nominees'}
              onClick={fetchPendingNominees}
              disabled={loading}
              variant="outlined"
              className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
            />
            <Button
              text={loading ? 'Verifying...' : 'Verify Latest Nominee'}
              onClick={verifyLatestNominee}
              disabled={loading}
              variant="filled"
              className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
            />
          </div>

          {/* Result */}
          {result && (
            <div className={`p-4 rounded-lg mb-6 ${
              result.type === 'success' ? 'bg-green-50 border border-green-200' :
              result.type === 'error' ? 'bg-red-50 border border-red-200' :
              'bg-blue-50 border border-blue-200'
            }`}>
              <p className={`font-medium ${
                result.type === 'success' ? 'text-green-700' :
                result.type === 'error' ? 'text-red-700' :
                'text-blue-700'
              }`}>
                {result.message}
              </p>
              {result.data && (
                <div className="mt-2 text-sm">
                  <p><strong>ID:</strong> {result.data.id}</p>
                  <p><strong>Name:</strong> {result.data.fullName}</p>
                  <p><strong>Email:</strong> {result.data.email}</p>
                  <p><strong>Category:</strong> {result.data.awardCategory}</p>
                  <p><strong>Subcategory:</strong> {result.data.subcategory}</p>
                  <p><strong>Status:</strong> {result.data.status}</p>
                </div>
              )}
            </div>
          )}

          {/* Nominees List */}
          {nominees.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pending Nominees ({nominees.length})
              </h2>
              <div className="space-y-4">
                {nominees.map((nominee) => (
                  <div key={nominee.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900">{nominee.fullName}</h3>
                    <p className="text-sm text-gray-600">{nominee.email}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Category:</strong> {nominee.awardCategory}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Subcategory:</strong> {nominee.subcategory}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(nominee.dateCreated).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Click "Fetch Pending Nominees" to see all nominees in REVIEW status</li>
              <li>Optionally enter an email to filter by specific nominee</li>
              <li>Click "Verify Latest Nominee" to verify the most recent one</li>
              <li>Go to the public page to see the verified nominee appear</li>
            </ol>
            <p className="mt-4 text-sm text-gray-600">
              <strong>Public Page:</strong>{' '}
              <a 
                href="/nomination/sub-categories/africa-lifetime-education-icon" 
                target="_blank"
                className="text-[#ea580c] hover:underline"
              >
                Africa Icon Blue Garnet Award
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
