"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, MoreVertical, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface Endorsement {
  _id: string;
  organization_name: string;
  email: string;
  country: string;
  status: 'pending_review' | 'pending_approval' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: string;
}

const AdminEndorsementsPage = () => {
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEndorsements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/endorsements?status=${statusFilter}&page=${page}&limit=15`);
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch endorsements');
      }
      setEndorsements(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    fetchEndorsements();
  }, [fetchEndorsements]);

  const handleStatusChange = async (id: string, newStatus: Endorsement['status']) => {
    try {
      const res = await fetch(`/api/admin/endorsements/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchEndorsements(); // Refresh list
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleFeatureToggle = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/admin/endorsements/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentFeatured }),
      });
      if (!res.ok) throw new Error('Failed to toggle feature status');
      fetchEndorsements(); // Refresh list
    } catch (err) {
      console.error('Feature toggle error:', err);
    }
  };

  const getStatusChip = (status: Endorsement['status']) => {
    const styles = {
      pending_review: 'bg-yellow-100 text-yellow-800',
      pending_approval: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Endorsement Management</h1>
          <button
            onClick={() => fetchEndorsements()}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="status-filter" className="font-medium text-gray-700">Filter by status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All</option>
            <option value="pending_review">Pending Review</option>
            <option value="pending_approval">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">Loading...</td></tr>
                ) : error ? (
                  <tr><td colSpan={6} className="text-center py-8 text-red-500">{error}</td></tr>
                ) : endorsements.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">No endorsements found.</td></tr>
                ) : (
                  endorsements.map((endorsement) => (
                    <tr key={endorsement._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{endorsement.organization_name}</div>
                        <div className="text-sm text-gray-500">{endorsement.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{endorsement.country}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(endorsement.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusChip(endorsement.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button onClick={() => handleFeatureToggle(endorsement._id, endorsement.featured)}>
                          <Star className={`w-5 h-5 transition-colors ${endorsement.featured ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="relative inline-block text-left group">
                          <button className="p-1 rounded-full hover:bg-gray-200">
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                          </button>
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handleStatusChange(endorsement._id, 'approved')}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Check className="w-4 h-4 text-green-500" /> Approve
                              </button>
                              <button
                                onClick={() => handleStatusChange(endorsement._id, 'rejected')}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <X className="w-4 h-4 text-red-500" /> Reject
                              </button>
                              <div className="border-t my-1"></div>
                              <button
                                onClick={() => handleFeatureToggle(endorsement._id, endorsement.featured)}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Star className="w-4 h-4 text-yellow-500" /> {endorsement.featured ? 'Unfeature' : 'Feature'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminEndorsementsPage;