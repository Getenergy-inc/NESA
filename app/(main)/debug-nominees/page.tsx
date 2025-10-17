'use client';

import { useState } from 'react';
import Button from '@/components/Common/Button';

export default function DebugNomineesPage() {
  const [loading, setLoading] = useState(false);
  const [dbNominees, setDbNominees] = useState<any[]>([]);
  const [apiNominees, setApiNominees] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const checkDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/nrc/admin/nominees/check-verified?email=samuelowase122@gmail.com');
      const data = await response.json();
      
      if (data.success) {
        setDbNominees(data.nominees);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkPublicAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/public/nominees?awardCategory=africa-lifetime-education-icon&subcategory=africa-education-philanthropy-icon');
      const data = await response.json();
      
      console.log('Public API Response:', data);
      
      if (data.success) {
        setApiNominees(data.nominees);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Debug Nominees Display
          </h1>
          <p className="text-gray-600 mb-8">
            Check what's in the database vs what the public API returns
          </p>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button
              text={loading ? 'Loading...' : 'Check Database'}
              onClick={checkDatabase}
              disabled={loading}
              variant="outlined"
              className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white"
            />
            <Button
              text={loading ? 'Loading...' : 'Check Public API'}
              onClick={checkPublicAPI}
              disabled={loading}
              variant="filled"
              className="bg-[#ea580c] hover:bg-[#dc2626] text-white"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Database Results */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Database (Verified Nominees)
              </h2>
              {dbNominees.length > 0 ? (
                <div className="space-y-4">
                  {dbNominees.map((nominee) => (
                    <div key={nominee.id} className="border border-gray-200 rounded-lg p-4 bg-green-50">
                      <h3 className="font-semibold text-gray-900">{nominee.fullName}</h3>
                      <p className="text-sm text-gray-600">{nominee.email}</p>
                      <div className="mt-2 text-xs space-y-1">
                        <p><strong>Super:</strong> {nominee.superAwardCategory}</p>
                        <p><strong>Category:</strong> {nominee.awardCategory}</p>
                        <p><strong>Subcategory:</strong> {nominee.subcategory}</p>
                        <p><strong>Status:</strong> <span className="text-green-600 font-semibold">{nominee.status}</span></p>
                        <p><strong>Created:</strong> {new Date(nominee.dateCreated).toLocaleString()}</p>
                        {nominee.reviewDate && (
                          <p><strong>Reviewed:</strong> {new Date(nominee.reviewDate).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No nominees found in database</p>
              )}
            </div>

            {/* API Results */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Public API Response
              </h2>
              {apiNominees.length > 0 ? (
                <div className="space-y-4">
                  {apiNominees.map((nominee, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                      <h3 className="font-semibold text-gray-900">{nominee.name}</h3>
                      <div className="mt-2 text-xs space-y-1">
                        <p><strong>Achievement:</strong> {nominee.achievement?.substring(0, 100)}...</p>
                        <p><strong>Country:</strong> {nominee.country}</p>
                        <p><strong>State:</strong> {nominee.state}</p>
                        <p><strong>Source:</strong> <span className={nominee.source === 'nrc' ? 'text-blue-600 font-semibold' : 'text-gray-600'}>{nominee.source || 'static'}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No nominees returned from API</p>
              )}
            </div>
          </div>

          {/* Comparison */}
          {dbNominees.length > 0 && (
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Analysis:</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  ✅ Database has <strong>{dbNominees.length}</strong> verified nominee(s)
                </li>
                <li>
                  {apiNominees.length > 0 ? '✅' : '❌'} Public API returned <strong>{apiNominees.length}</strong> nominee(s)
                </li>
                {dbNominees.length > 0 && apiNominees.length === 0 && (
                  <li className="text-red-600">
                    ⚠️ <strong>Issue:</strong> Nominees exist in database but API returns nothing!
                  </li>
                )}
                {dbNominees.length > 0 && apiNominees.filter((n: any) => n.source === 'nrc').length === 0 && apiNominees.length > 0 && (
                  <li className="text-orange-600">
                    ⚠️ <strong>Issue:</strong> API returns nominees but none are from NRC database!
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Debug Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Debug Info:</h3>
            <div className="text-xs space-y-1 text-gray-600">
              <p><strong>Expected Category:</strong> africa-lifetime-education-icon</p>
              <p><strong>Expected Subcategory:</strong> africa-education-philanthropy-icon</p>
              <p><strong>Database Query:</strong> status IN ['VERIFIED', 'PUBLISHED']</p>
              <p><strong>API Endpoint:</strong> /api/v1/public/nominees</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Click "Check Database" to see verified nominees in DB</li>
              <li>Click "Check Public API" to see what API returns</li>
              <li>Compare the results</li>
              <li>Check browser console for detailed logs</li>
              <li>If database has nominees but API doesn't, there's a query mismatch</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
