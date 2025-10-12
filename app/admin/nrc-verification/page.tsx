'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, Filter, Search, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Nominee {
  _id: string;
  fullName: string;
  organizationName?: string;
  country: string;
  region: string;
  email?: string;
  awardCategory: string;
  subcategory: string;
  achievementSummary: string;
  impactMetrics: string;
  sdgAlignment: string[];
  status: string;
  dateCreated: string;
  volunteerId: string;
  profileImageUrl?: string;
}

export default function NRCVerificationPage() {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingNominees();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const fetchPendingNominees = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/nrc/admin/nominees/pending');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setNominees(data.data.nominees || []);
        setStats(data.data.stats || { pending: 0, verified: 0, published: 0, rejected: 0 });
      } else {
        showToast('error', data.message || 'Failed to fetch nominees');
      }
    } catch (error: any) {
      console.error('Error fetching nominees:', error);
      showToast('error', `Failed to load nominees: ${error.message}`);
      setStats({ pending: 0, verified: 0, published: 0, rejected: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (nomineeId: string, publishToPublic: boolean = true) => {
    if (actionLoading) return;
    
    try {
      setActionLoading(true);
      const response = await fetch(`/api/v1/nrc/admin/nominees/${nomineeId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewedBy: 'admin',
          reviewNotes: 'Verified by admin',
          publishToPublic
        })
      });

      const data = await response.json();
      
      if (data.success) {
        showToast('success', `✅ Nominee ${publishToPublic ? 'verified and published' : 'verified'} successfully! Volunteer earned 10 AGC.`);
        await fetchPendingNominees();
        setSelectedNominee(null);
      } else {
        showToast('error', `❌ Failed to verify: ${data.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Error verifying nominee:', error);
      showToast('error', `❌ Network error: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (nomineeId: string) => {
    if (actionLoading) return;
    
    const reason = prompt('Enter rejection reason:');
    if (!reason || reason.trim() === '') {
      showToast('error', 'Rejection reason is required');
      return;
    }

    try {
      setActionLoading(true);
      const response = await fetch(`/api/v1/nrc/admin/nominees/${nomineeId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewedBy: 'admin',
          rejectionReason: reason
        })
      });

      const data = await response.json();
      
      if (data.success) {
        showToast('success', '✅ Nominee rejected successfully');
        await fetchPendingNominees();
        setSelectedNominee(null);
      } else {
        showToast('error', `❌ Failed to reject: ${data.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Error rejecting nominee:', error);
      showToast('error', `❌ Network error: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredNominees = nominees.filter(nominee => {
    const matchesSearch = searchQuery === '' || 
      nominee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nominee.awardCategory.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === '' || nominee.awardCategory === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-right duration-300">
            <div className={`rounded-lg shadow-lg p-4 ${
              toast.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    toast.type === 'success' ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {toast.message}
                  </p>
                </div>
                <button
                  onClick={() => setToast(null)}
                  className={`text-sm font-medium ${
                    toast.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">NRC Nominee Verification</h1>
              <p className="text-gray-600">Review and verify nominees uploaded by NRC volunteers</p>
            </div>
            <button
              onClick={fetchPendingNominees}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-yellow-800 text-sm font-medium">Pending Review</div>
              <div className="text-3xl font-bold text-yellow-900">{stats.pending}</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800 text-sm font-medium">Verified</div>
              <div className="text-3xl font-bold text-green-900">{stats.verified}</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-blue-800 text-sm font-medium">Published</div>
              <div className="text-3xl font-bold text-blue-900">{stats.published}</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-800 text-sm font-medium">Rejected</div>
              <div className="text-3xl font-bold text-red-900">{stats.rejected}</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search nominees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="NGO Educational Champion of the Decade">NGO Champion</option>
                <option value="Corporate Social Responsibility Champion of the Decade">CSR Champion</option>
                <option value="Faith-Based Educational Champion of the Decade">Faith-Based</option>
                {/* Add more categories as needed */}
              </select>
            </div>
          </div>
        </div>

        {/* Nominees List */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading nominees...</p>
            </div>
          ) : filteredNominees.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Nominees</h3>
              <p className="text-gray-500 mb-4">
                {stats?.pending === 0 
                  ? 'No nominees have been uploaded yet. Volunteers need to upload nominees first.'
                  : 'No nominees match your current filters. Try adjusting your search or filters.'}
              </p>
              {stats?.pending === 0 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left max-w-md mx-auto">
                  <p className="text-sm text-blue-900 font-medium mb-2">💡 To get started:</p>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Volunteers register at /get-involved/nrc-volunteer/apply</li>
                    <li>They upload nominees from their dashboard</li>
                    <li>Nominees appear here for verification</li>
                  </ol>
                </div>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNominees.map((nominee) => (
                <div key={nominee._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{nominee.fullName}</h3>
                      {nominee.organizationName && (
                        <p className="text-sm text-gray-600">{nominee.organizationName}</p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {nominee.country}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {nominee.awardCategory}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-700 line-clamp-2">{nominee.achievementSummary}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Uploaded: {new Date(nominee.dateCreated).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      <button
                        onClick={() => setSelectedNominee(nominee)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </button>
                      <button
                        onClick={() => handleVerify(nominee._id, true)}
                        disabled={actionLoading}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {actionLoading ? 'Processing...' : 'Verify & Publish'}
                      </button>
                      <button
                        onClick={() => handleReject(nominee._id)}
                        disabled={actionLoading}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        {actionLoading ? 'Processing...' : 'Reject'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedNominee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedNominee.fullName}</h2>
                  <button
                    onClick={() => setSelectedNominee(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Organization</label>
                    <p className="text-gray-900">{selectedNominee.organizationName || 'N/A'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Country</label>
                      <p className="text-gray-900">{selectedNominee.country}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Region</label>
                      <p className="text-gray-900">{selectedNominee.region}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Award Category</label>
                    <p className="text-gray-900">{selectedNominee.awardCategory}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Subcategory</label>
                    <p className="text-gray-900">{selectedNominee.subcategory}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Achievement Summary</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedNominee.achievementSummary}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Impact Metrics</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedNominee.impactMetrics}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">SDG Alignment</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedNominee.sdgAlignment.map((sdg, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {sdg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleVerify(selectedNominee._id, true)}
                      disabled={actionLoading}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {actionLoading ? 'Processing...' : 'Verify & Publish to Public'}
                    </button>
                    <button
                      onClick={() => handleReject(selectedNominee._id)}
                      disabled={actionLoading}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      {actionLoading ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
