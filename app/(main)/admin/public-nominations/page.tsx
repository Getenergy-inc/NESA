'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Filter, Search, Mail, Phone, Award, Calendar, ExternalLink, Image as ImageIcon, X, Eye, CheckCircle, XCircle, Clock, Check, Ban, AlertCircle, RefreshCw } from 'lucide-react';

interface Nominee {
  _id: string;
  fullName: string;
  organizationName?: string;
  country: string;
  region?: string;
  email?: string;
  phone?: string;
  website?: string;
  awardCategory: string;
  subcategory: string;
  achievementSummary: string;
  impactMetrics?: string;
  verificationLinks?: string;
  profileImageUrl?: string;
  nominatorName?: string;
  nominatorEmail: string;
  nominatorPhone?: string;
  nominatorRelationship?: string;
  status: string;
  dateCreated: string;
  agcAwarded: number;
}

interface Stats {
  _id: string;
  count: number;
}

export default function PublicNominationsPage() {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchNominees();
  }, [selectedStatus]);

  const fetchNominees = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus) params.append('status', selectedStatus);
      
      const response = await fetch(`/api/v1/nrc/admin/public-nominations?${params}`);
      const result = await response.json();

      if (result.success) {
        setNominees(result.data.nominees);
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch nominees:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNominees = nominees.filter(nominee =>
    nominee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nominee.organizationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nominee.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLIC_NOMINATION': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'VERIFIED': return 'bg-green-100 text-green-700 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PUBLIC_NOMINATION': return <Clock className="w-4 h-4" />;
      case 'VERIFIED': return <CheckCircle className="w-4 h-4" />;
      case 'REJECTED': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalNominations = stats.reduce((sum, stat) => sum + stat.count, 0);

  const handleVerify = async () => {
    if (!selectedNominee) return;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const response = await fetch(`/api/v1/nrc/admin/nominees/${selectedNominee._id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewedBy: 'Admin',
          reviewNotes,
          publishToPublic: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setActionSuccess('Nomination verified successfully!');
        setShowVerifyModal(false);
        setReviewNotes('');
        setSelectedNominee(null);
        fetchNominees(); // Refresh the list
        setTimeout(() => setActionSuccess(null), 3000);
      } else {
        setActionError(result.message || 'Failed to verify nomination');
      }
    } catch (error) {
      setActionError('An error occurred while verifying the nomination');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedNominee) return;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      const response = await fetch(`/api/v1/nrc/admin/nominees/${selectedNominee._id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewedBy: 'Admin',
          rejectionReason,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setActionSuccess('Nomination rejected successfully!');
        setShowRejectModal(false);
        setRejectionReason('');
        setSelectedNominee(null);
        fetchNominees(); // Refresh the list
        setTimeout(() => setActionSuccess(null), 3000);
      } else {
        setActionError(result.message || 'Failed to reject nomination');
      }
    } catch (error) {
      setActionError('An error occurred while rejecting the nomination');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Public Nominations</h1>
              <p className="text-sm sm:text-base text-gray-600">Review and manage nominations submitted by the public</p>
            </div>
            <button
              onClick={fetchNominees}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </motion.div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {actionSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">{actionSuccess}</p>
            </motion.div>
          )}
          {actionError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="text-red-800 font-medium">{actionError}</p>
              </div>
              <button onClick={() => setActionError(null)} className="text-red-600 hover:text-red-800">
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 sm:p-6 text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
              <div className="text-right">
                <p className="text-xs sm:text-sm opacity-90">Total</p>
                <p className="text-2xl sm:text-3xl font-bold">{totalNominations}</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm opacity-90">All Nominations</p>
          </motion.div>

          {stats.map((stat, index) => {
            const colors = {
              'PUBLIC_NOMINATION': 'from-orange-500 to-orange-600',
              'VERIFIED': 'from-green-500 to-green-600',
              'REJECTED': 'from-red-500 to-red-600',
            };
            return (
              <motion.div
                key={stat._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * (index + 2) }}
                className={`bg-gradient-to-br ${colors[stat._id as keyof typeof colors] || 'from-gray-500 to-gray-600'} rounded-xl shadow-lg p-4 sm:p-6 text-white`}
              >
                <div className="flex items-center justify-between mb-2">
                  {getStatusIcon(stat._id)}
                  <div className="text-right">
                    <p className="text-xs sm:text-sm opacity-90">{stat._id.replace('_', ' ')}</p>
                    <p className="text-2xl sm:text-3xl font-bold">{stat.count}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm opacity-90">Submissions</p>
              </motion.div>
            );
          })}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 mr-2" />
                Search Nominations
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, organization, or email..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">All Statuses</option>
                <option value="PUBLIC_NOMINATION">Public Nomination</option>
                <option value="VERIFIED">Verified</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Nominees List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-orange-500 border-t-transparent"></div>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">Loading nominations...</p>
          </div>
        ) : filteredNominees.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center"
          >
            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-sm sm:text-base">No nominations found</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredNominees.map((nominee, index) => (
              <motion.div
                key={nominee._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Profile Image */}
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      {nominee.profileImageUrl ? (
                        <img
                          src={nominee.profileImageUrl}
                          alt={nominee.fullName}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover ring-4 ring-gray-100"
                        />
                      ) : (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ring-4 ring-gray-100">
                          <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="text-center sm:text-left">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{nominee.fullName}</h3>
                          {nominee.organizationName && (
                            <p className="text-sm text-gray-600 truncate">{nominee.organizationName}</p>
                          )}
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(nominee.status)} whitespace-nowrap self-center sm:self-start`}>
                          {getStatusIcon(nominee.status)}
                          {nominee.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                        <div className="space-y-2 text-xs sm:text-sm">
                          <p className="text-gray-600 flex items-center gap-2">
                            <Award className="w-4 h-4 flex-shrink-0 text-orange-500" />
                            <span className="truncate"><strong>Country:</strong> {nominee.country}</span>
                          </p>
                          {nominee.email && (
                            <p className="text-gray-600 flex items-center gap-2">
                              <Mail className="w-4 h-4 flex-shrink-0 text-blue-500" />
                              <span className="truncate">{nominee.email}</span>
                            </p>
                          )}
                          {nominee.phone && (
                            <p className="text-gray-600 flex items-center gap-2">
                              <Phone className="w-4 h-4 flex-shrink-0 text-green-500" />
                              <span className="truncate">{nominee.phone}</span>
                            </p>
                          )}
                        </div>
                        <div className="space-y-2 text-xs sm:text-sm">
                          <p className="text-gray-600 truncate">
                            <strong>Category:</strong> {nominee.awardCategory}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Calendar className="w-4 h-4 flex-shrink-0 text-purple-500" />
                            {new Date(nominee.dateCreated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Achievement:</p>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{nominee.achievementSummary}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                        <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                          <strong>Nominated by:</strong> {nominee.nominatorName || 'Anonymous'}
                        </div>
                        <button
                          onClick={() => setSelectedNominee(nominee)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedNominee && !showVerifyModal && !showRejectModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 overflow-y-auto"
              style={{ zIndex: 9998 }}
              onClick={() => setSelectedNominee(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Nomination Details</h2>
                  <button
                    onClick={() => setSelectedNominee(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="p-6">
                  {selectedNominee.profileImageUrl && (
                    <img
                      src={selectedNominee.profileImageUrl}
                      alt={selectedNominee.fullName}
                      className="w-full h-48 sm:h-64 object-cover rounded-xl mb-6"
                    />
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-orange-500" />
                        Nominee Information
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 space-y-2 text-sm">
                        <p><strong>Name:</strong> {selectedNominee.fullName}</p>
                        {selectedNominee.organizationName && (
                          <p><strong>Organization:</strong> {selectedNominee.organizationName}</p>
                        )}
                        <p><strong>Country:</strong> {selectedNominee.country}</p>
                        {selectedNominee.region && <p><strong>Region:</strong> {selectedNominee.region}</p>}
                        {selectedNominee.email && <p><strong>Email:</strong> {selectedNominee.email}</p>}
                        {selectedNominee.phone && <p><strong>Phone:</strong> {selectedNominee.phone}</p>}
                        {selectedNominee.website && (
                          <p className="flex items-center gap-2 flex-wrap">
                            <strong>Website:</strong>
                            <a href={selectedNominee.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                              {selectedNominee.website} <ExternalLink className="w-4 h-4" />
                            </a>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-orange-500" />
                        Award Category
                      </h3>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 space-y-2 text-sm">
                        <p><strong>Category:</strong> {selectedNominee.awardCategory}</p>
                        <p><strong>Subcategory:</strong> {selectedNominee.subcategory}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievement</h3>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-sm">
                        <p className="whitespace-pre-wrap">{selectedNominee.achievementSummary}</p>
                      </div>
                    </div>

                    {selectedNominee.impactMetrics && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact</h3>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-sm">
                          <p className="whitespace-pre-wrap">{selectedNominee.impactMetrics}</p>
                        </div>
                      </div>
                    )}

                    {selectedNominee.verificationLinks && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification Links</h3>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-sm">
                          <p className="break-all">{selectedNominee.verificationLinks}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-orange-500" />
                        Nominator Information
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 space-y-2 text-sm">
                        <p><strong>Name:</strong> {selectedNominee.nominatorName || 'Anonymous'}</p>
                        <p><strong>Email:</strong> {selectedNominee.nominatorEmail}</p>
                        {selectedNominee.nominatorPhone && (
                          <p><strong>Phone:</strong> {selectedNominee.nominatorPhone}</p>
                        )}
                        {selectedNominee.nominatorRelationship && (
                          <p><strong>Relationship:</strong> {selectedNominee.nominatorRelationship}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-200">
                    {selectedNominee.status === 'PUBLIC_NOMINATION' && (
                      <>
                        <button
                          onClick={() => {
                            setShowVerifyModal(true);
                            setActionError(null);
                          }}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <Check className="w-5 h-5" />
                          Verify & Publish
                        </button>
                        <button
                          onClick={() => {
                            setShowRejectModal(true);
                            setActionError(null);
                          }}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <Ban className="w-5 h-5" />
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setSelectedNominee(null)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verify Modal */}
        <AnimatePresence>
          {showVerifyModal && selectedNominee && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4"
              style={{ zIndex: 9999 }}
              onClick={() => !actionLoading && setShowVerifyModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Verify Nomination</h3>
                    <p className="text-sm text-gray-600">This will publish the nomination</p>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">{selectedNominee.fullName}</p>
                  <p className="text-xs text-gray-600">{selectedNominee.awardCategory}</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Notes (Optional)
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add any notes about this verification..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={actionLoading}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowVerifyModal(false);
                      setReviewNotes('');
                    }}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerify}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {actionLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Verify
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reject Modal */}
        <AnimatePresence>
          {showRejectModal && selectedNominee && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4"
              style={{ zIndex: 9999 }}
              onClick={() => !actionLoading && setShowRejectModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Ban className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Reject Nomination</h3>
                    <p className="text-sm text-gray-600">This action can be reversed later</p>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">{selectedNominee.fullName}</p>
                  <p className="text-xs text-gray-600">{selectedNominee.awardCategory}</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason *
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={actionLoading}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectionReason('');
                    }}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={actionLoading || !rejectionReason.trim()}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {actionLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Rejecting...
                      </>
                    ) : (
                      <>
                        <Ban className="w-4 h-4" />
                        Reject
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
