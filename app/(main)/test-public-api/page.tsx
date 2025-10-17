'use client';

import { useState, useEffect } from 'react';

export default function TestPublicAPIPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testAPI = async (category: string, subcategory: string) => {
    setLoading(true);
    try {
      const url = `/api/v1/public/nominees?awardCategory=${category}&subcategory=${subcategory}`;
      console.log('Fetching:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Response:', data);
      setResult(data);
    } catch (error: any) {
      console.error('Error:', error);
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testCases = [
    {
      name: 'Africa Icon - Philanthropy',
      category: 'africa-lifetime-education-icon',
      subcategory: 'africa-education-philanthropy-icon'
    },
    {
      name: 'Africa Icon - Literary',
      category: 'africa-lifetime-education-icon',
      subcategory: 'literary-new-curriculum-advocate'
    },
    {
      name: 'Africa Icon - Technical',
      category: 'africa-lifetime-education-icon',
      subcategory: 'africa-technical-educator-icon'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Public API
          </h1>
          <p className="text-gray-600 mb-8">
            Test the public nominees API to see what data is being returned
          </p>

          {/* Test Cases */}
          <div className="space-y-4 mb-8">
            {testCases.map((test) => (
              <button
                key={test.name}
                onClick={() => testAPI(test.category, test.subcategory)}
                disabled={loading}
                className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <h3 className="font-semibold text-gray-900">{test.name}</h3>
                <p className="text-sm text-gray-600">
                  Category: {test.category}
                </p>
                <p className="text-sm text-gray-600">
                  Subcategory: {test.subcategory}
                </p>
              </button>
            ))}
          </div>

          {/* Result */}
          {result && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-semibold text-gray-900 mb-2">Result:</h2>
              <pre className="text-xs overflow-auto bg-white p-4 rounded border">
                {JSON.stringify(result, null, 2)}
              </pre>
              
              {result.success && (
                <div className="mt-4">
                  <p className="font-semibold">
                    Found {result.count} nominees
                  </p>
                  {result.nominees && result.nominees.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {result.nominees.map((nominee: any, index: number) => (
                        <div key={index} className="p-3 bg-white rounded border">
                          <p><strong>Name:</strong> {nominee.name}</p>
                          <p><strong>Achievement:</strong> {nominee.achievement?.substring(0, 100)}...</p>
                          <p><strong>Country:</strong> {nominee.country}</p>
                          <p><strong>Source:</strong> {nominee.source || 'static'}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What to check:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Does the API return success: true?</li>
              <li>Is the count greater than 0?</li>
              <li>Are there any nominees with source: "nrc"?</li>
              <li>Check the browser console for detailed logs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
