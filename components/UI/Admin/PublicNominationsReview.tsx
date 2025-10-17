'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Mail, 
  Eye, 
  Trash2, 
  Filter,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Button from '@/components/Common/Button';

interface PublicNomination {
  _id: string;
  fullName: string;
  organizationName?: string;
  country: string;
  region?: string;
  awardCategory: string;
  subcategory: string;
  achievementSummary: string;
  nominatorName?: string;
  nominatorEmail?: string;
  nominatorRelationship?: string;
  status: string;
  dateCreated: string;
}

const PublicNominationsReview: React.FC = () => {
  const [nominations, setNominations] = useState<PublicNomination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('PUBLIC_NOMINATION');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<any>({});
  const [selectedNomination, setSelectedNomination] = useState<PublicNomination | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchNominations();
  }, [selectedStatus, page, searchTerm]);

  const fetchNominations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: selectedStatus,
        page: page.toString(),
        limit: '10',
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`/api/v1/nrc/admin/public-nominations?${params}`);
      const data = await response.json();

      if (data.success) {
        setNominations(data.data.nominations);
        setTotalPages(data.data.pagination.pages);
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('Error fetching nominations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: string, notes?: string) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/v1/nrc/admin/public-nominations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reviewNotes: notes }),
      });

      const data = await response.json();

      if (data.success) {
        fetchNominations();
        setSelectedNomination(null);
        alert(data.message);
      } else {
        alert(data.message || 'Action failed');
      }
    } catch (error) {
      console.error('Error performing action:', error);
      alert('Failed to perform action');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this nomination?')) return;

    try {
      const response = await fetch(`/api/v1/nrc/admin/public-nominations/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchNominations();
        alert('Nomination deleted');
      }
    } catch (error) {
      console.error('Error deleting nomination:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Public Nominations Review</h1>
          <p className="text-gray-600">Review and manage public nominations from the community</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-600">Pending Review</p>
            <p className="text-2xl font-bold text-[#ea580c]">{stats.PUBLIC_NOMINATION || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">{stats.REVIEW || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.REJECTED || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-600">Verified</p>
            <p className="text-2xl font-bold text-blue-600">{stats.VERIFIED || 0}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              >
                <option value="PUBLIC_NOMINATION">Pending Review</option>
                <option value="REVIEW">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="VERIFIED">Verified</option>
                <option value="ALL">All</option>
              </select>
            </div>
          </div>
        </div>

        {/* Nominations List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading nominations...</p>
          </div>
        ) : nominations.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow">
            <p className="text-gray-600">No nominations found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {nominations.map((nomination) => (
              <motion.div
                key={nomination._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {nomination.fullName}
                    </h3>
                    {nomination.organizationName && (
                      <p className="text-sm text-gray-600 mb-2">{nomination.organizationName}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {nomination.country}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {nomination.subcategory}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        nomination.status === 'PUBLIC_NOMINATION' ? 'bg-yellow-100 text-yellow-700' :
                        nomination.status === 'REVIEW' ? 'bg-green-100 text-green-700' :
                        nomination.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {nomination.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {new Date(nomination.dateCreated).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">
                  {nomination.achievementSummary}
                </p>

                {nomination.nominatorName && (
                  <div className="bg-gray-50 rounded p-3 mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Nominated by:</strong> {nomination.nominatorName}
                      {nomination.nominatorEmail && ` (${nomination.nominatorEmail})`}
                    </p>
                    {nomination.nominatorRelationship && (
                      <p className="text-sm text-gray-600">
                        <strong>Relationship:</strong> {nomination.nominatorRelationship}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  <Button
                    text="View Details"
                    onClick={() => setSelectedNomination(nomination)}
                    variant="outlined"
                    className="border-[#ea580c] text-[#ea580c] text-sm"
                    icon={<Eye className="w-4 h-4" />}
                  />
                  
                  {nomination.status === 'PUBLIC_NOMINATION' && (
                    <>
                      <Button
                        text="Approve"
                        onClick={() => handleAction(nomination._id, 'APPROVE')}
                        variant="filled"
                        className="bg-green-600 hover:bg-green-700 text-white text-sm"
                        icon={<CheckCircle className="w-4 h-4" />}
                        disabled={actionLoading}
                      />
                      <Button
                        text="Reject"
                        onClick={() => {
                          const reason = prompt('Rejection reason:');
                          if (reason) handleAction(nomination._id, 'REJECT', reason);
                        }}
                        variant="filled"
                        className="bg-red-600 hover:bg-red-700 text-white text-sm"
                        icon={<XCircle className="w-4 h-4" />}
                        disabled={actionLoading}
                      />
                    </>
                  )}
                  
                  <Button
                    text="Delete"
                    onClick={() => handleDelete(nomination._id)}
                    variant="outlined"
                    className="border-red-600 text-red-600 text-sm"
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              text="Previous"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              variant="outlined"
              className="border-[#ea580c] text-[#ea580c]"
              icon={<ChevronLeft className="w-4 h-4" />}
            />
            <span className="text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              text="Next"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              variant="outlined"
              className="border-[#ea580c] text-[#ea580c]"
              icon={<ChevronRight className="w-4 h-4" />}
            />
          </div>
        )}

        {/* Detail Modal */}
        {selectedNomination && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">{selectedNomination.fullName}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Organization</h3>
                  <p className="text-gray-600">{selectedNomination.organizationName || 'N/A'}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Location</h3>
                  <p className="text-gray-600">
                    {selectedNomination.region}, {selectedNomination.country}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Category</h3>
                  <p className="text-gray-600">{selectedNomination.subcategory}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Achievement Summary</h3>
                  <p className="text-gray-600">{selectedNomination.achievementSummary}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Nominated By</h3>
                  <p className="text-gray-600">
                    {selectedNomination.nominatorName} ({selectedNomination.nominatorEmail})
                  </p>
                  <p className="text-gray-600 text-sm">
                    Relationship: {selectedNomination.nominatorRelationship}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  text="Close"
                  onClick={() => setSelectedNomination(null)}
                  variant="outlined"
                  className="border-gray-300 text-gray-700"
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicNominationsReview;
