'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import nrcService from '../../../../../lib/services/nrcService';
import { useAuth } from '../../../../../lib/hooks/useAuth';

export default function MyNomineesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [nominees, setNominees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNominees = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      
      try {
        const fetchedNominees = await nrcService.getVolunteerNominees(user.id);
        console.log('Fetched nominees:', fetchedNominees);
        setNominees(fetchedNominees);
      } catch (err) {
        console.error('Error fetching nominees:', err);
        setError('Failed to load nominees. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNominees();
  }, [user?.id]);

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REVIEW': return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'DRAFT': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusDisplay = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED': return 'Approved';
      case 'REVIEW': return 'Under Review';
      case 'REJECTED': return 'Rejected';
      case 'DRAFT': return 'Draft';
      default: return status || 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Nominations</h1>
              <p className="text-gray-600 mt-2">Manage and track your submitted nominations</p>
            </div>
            <button
              onClick={() => router.push('/get-involved/nrc-volunteer/nominees/add')}
              className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Nominee
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Submitted Nominations</h2>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ea580c] mx-auto mb-4"></div>
                <p className="text-gray-500">Loading nominees...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">⚠️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading nominees</h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Try Again
                </button>
              </div>
            ) : nominees.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nominee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {nominees.map((nominee, index) => (
                    <tr key={nominee.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{nominee.fullName}</div>
                          <div className="text-sm text-gray-500">{nominee.organizationName}</div>
                          <div className="text-xs text-gray-400">{nominee.country}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{nominee.awardCategory}</div>
                        <div className="text-xs text-gray-500">{nominee.subcategory}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(nominee.status)}`}>
                          {getStatusDisplay(nominee.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {nominee.dateCreated ? new Date(nominee.dateCreated).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No nominations yet</h3>
                <p className="text-gray-500 mb-4">Start by adding your first nominee</p>
                <button
                  onClick={() => router.push('/get-involved/nrc-volunteer/nominees/add')}
                  className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Add First Nominee
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}