'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Define endorsement types
interface Endorsement {
  id: string;
  organization_name: string;
  contact_person_name: string;
  email: string;
  country: string;
  endorser_category: string;
  endorsement_type: string;
  endorsement_tier?: string;
  endorsement_headline: string;
  endorsement_statement: string;
  logo_file?: string;
  video_link?: string;
  website?: string;
  status: 'pending_verification' | 'pending_review' | 'approved' | 'rejected';
  verified: boolean;
  created_at: string;
  approved_at?: string;
  updated_at?: string;
  featured?: boolean;
  rejection_reason?: string;
}

interface StatusCounts {
  pending_verification: number;
  pending_review: number;
  approved: number;
  rejected: number;
}

export default function AdminEndorsementsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    pending_verification: 0,
    pending_review: 0,
    approved: 0,
    rejected: 0
  });
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedEndorsement, setSelectedEndorsement] = useState<Endorsement | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'reject' | 'feature' | 'unfeature'>('approve');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    setIsAuthenticated(true);
    fetchEndorsements();
  }, [router]);

  // Fetch endorsements based on selected status
  const fetchEndorsements = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const url = selectedStatus === 'all' 
        ? '/api/admin/endorsements' 
        : `/api/admin/endorsements?status=${selectedStatus}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch endorsements');
      }
      
      const data = await response.json();
      setEndorsements(data.endorsements);
      setStatusCounts(data.statuses);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching endorsements:', error);
      setMessage({ type: 'error', text: 'Failed to load endorsements. Please try again.' });
      setIsLoading(false);
    }
  };

  // Handle status filter change
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    fetchEndorsements();
  };

  // Open modal for endorsement action
  const openModal = (endorsement: Endorsement, action: 'approve' | 'reject' | 'feature' | 'unfeature') => {
    setSelectedEndorsement(endorsement);
    setModalAction(action);
    setRejectionReason('');
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEndorsement(null);
  };

  // Handle endorsement action (approve, reject, feature, unfeature)
  const handleEndorsementAction = async () => {
    if (!selectedEndorsement) return;
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/endorsements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: selectedEndorsement.id,
          action: modalAction,
          reason: modalAction === 'reject' ? rejectionReason : undefined
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update endorsement');
      }
      
      const data = await response.json();
      
      // Update the endorsement in the list
      setEndorsements(prevEndorsements => 
        prevEndorsements.map(e => 
          e.id === selectedEndorsement.id ? data.endorsement : e
        )
      );
      
      // Show success message
      setMessage({ 
        type: 'success', 
        text: `Endorsement ${modalAction}d successfully.` 
      });
      
      // Close modal and refresh data
      closeModal();
      fetchEndorsements();
    } catch (error) {
      console.error(`Error ${modalAction}ing endorsement:`, error);
      setMessage({ 
        type: 'error', 
        text: `Failed to ${modalAction} endorsement. ${error instanceof Error ? error.message : ''}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending_verification':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get formatted status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_verification':
        return 'Pending Verification';
      case 'pending_review':
        return 'Pending Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  if (!isAuthenticated) {
    return <div className="flex justify-center items-center h-screen">Redirecting to login...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Endorsement Management</h1>
        <Link href="/admin/dashboard" className="text-orange-600 hover:text-orange-800">
          Back to Dashboard
        </Link>
      </div>

      {/* Status message */}
      {message.text && (
        <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
          <button 
            className="float-right text-sm"
            onClick={() => setMessage({ type: '', text: '' })}
          >
            ✕
          </button>
        </div>
      )}

      {/* Status filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-medium mb-4">Filter by Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            className={`p-3 rounded-md text-center ${selectedStatus === 'all' ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' : 'bg-gray-100'}`}
            onClick={() => handleStatusChange('all')}
          >
            All
            <span className="block text-lg font-bold">{Object.values(statusCounts).reduce((a, b) => a + b, 0)}</span>
          </button>
          <button
            className={`p-3 rounded-md text-center ${selectedStatus === 'pending_verification' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' : 'bg-yellow-50 text-yellow-800'}`}
            onClick={() => handleStatusChange('pending_verification')}
          >
            Pending Verification
            <span className="block text-lg font-bold">{statusCounts.pending_verification}</span>
          </button>
          <button
            className={`p-3 rounded-md text-center ${selectedStatus === 'pending_review' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' : 'bg-blue-50 text-blue-800'}`}
            onClick={() => handleStatusChange('pending_review')}
          >
            Pending Review
            <span className="block text-lg font-bold">{statusCounts.pending_review}</span>
          </button>
          <button
            className={`p-3 rounded-md text-center ${selectedStatus === 'approved' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-green-50 text-green-800'}`}
            onClick={() => handleStatusChange('approved')}
          >
            Approved
            <span className="block text-lg font-bold">{statusCounts.approved}</span>
          </button>
          <button
            className={`p-3 rounded-md text-center ${selectedStatus === 'rejected' ? 'bg-red-100 text-red-800 border-2 border-red-300' : 'bg-red-50 text-red-800'}`}
            onClick={() => handleStatusChange('rejected')}
          >
            Rejected
            <span className="block text-lg font-bold">{statusCounts.rejected}</span>
          </button>
        </div>
      </div>

      {/* Endorsements list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Endorsements</h2>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading endorsements...</p>
          </div>
        ) : endorsements.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No endorsements found for the selected status.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {endorsements.map((endorsement) => (
                  <tr key={endorsement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {endorsement.logo_file && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <Image 
                              src={endorsement.logo_file} 
                              alt={`${endorsement.organization_name} logo`}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{endorsement.organization_name}</div>
                          <div className="text-sm text-gray-500">{endorsement.country}</div>
                          {endorsement.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{endorsement.contact_person_name}</div>
                      <div className="text-sm text-gray-500">{endorsement.email}</div>
                      <div className="text-xs text-gray-500">
                        {endorsement.verified ? 
                          <span className="text-green-600">✓ Verified</span> : 
                          <span className="text-red-600">✗ Not Verified</span>
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(endorsement.status)}`}>
                        {getStatusText(endorsement.status)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {endorsement.endorsement_type} / {endorsement.endorsement_tier || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>Created: {formatDate(endorsement.created_at)}</div>
                      {endorsement.approved_at && (
                        <div>Approved: {formatDate(endorsement.approved_at)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => setSelectedEndorsement(endorsement)}
                      >
                        View
                      </button>
                      
                      {endorsement.status === 'pending_review' && endorsement.verified && (
                        <button 
                          className="text-green-600 hover:text-green-900 mr-3"
                          onClick={() => openModal(endorsement, 'approve')}
                        >
                          Approve
                        </button>
                      )}
                      
                      {['pending_verification', 'pending_review'].includes(endorsement.status) && (
                        <button 
                          className="text-red-600 hover:text-red-900 mr-3"
                          onClick={() => openModal(endorsement, 'reject')}
                        >
                          Reject
                        </button>
                      )}
                      
                      {endorsement.status === 'approved' && !endorsement.featured && (
                        <button 
                          className="text-purple-600 hover:text-purple-900"
                          onClick={() => openModal(endorsement, 'feature')}
                        >
                          Feature
                        </button>
                      )}
                      
                      {endorsement.status === 'approved' && endorsement.featured && (
                        <button 
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => openModal(endorsement, 'unfeature')}
                        >
                          Unfeature
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Endorsement detail modal */}
      {selectedEndorsement && !isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-900">Endorsement Details</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedEndorsement(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Organization Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedEndorsement.organization_name}</p>
                    <p><span className="font-medium">Country:</span> {selectedEndorsement.country}</p>
                    <p><span className="font-medium">Category:</span> {selectedEndorsement.endorser_category.replace('_', ' ')}</p>
                    <p><span className="font-medium">Website:</span> {selectedEndorsement.website || 'Not provided'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedEndorsement.contact_person_name}</p>
                    <p><span className="font-medium">Email:</span> {selectedEndorsement.email}</p>
                    <p>
                      <span className="font-medium">Verification:</span> 
                      {selectedEndorsement.verified ? 
                        <span className="text-green-600 ml-1">✓ Verified</span> : 
                        <span className="text-red-600 ml-1">✗ Not Verified</span>
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Endorsement Information</h3>
                <div className="mt-2 space-y-4">
                  <div>
                    <p className="font-medium">Type & Tier:</p>
                    <p>{selectedEndorsement.endorsement_type} / {selectedEndorsement.endorsement_tier || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Headline:</p>
                    <p className="text-gray-700">{selectedEndorsement.endorsement_headline}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Statement:</p>
                    <p className="text-gray-700">{selectedEndorsement.endorsement_statement}</p>
                  </div>
                  
                  {selectedEndorsement.logo_file && (
                    <div>
                      <p className="font-medium">Logo:</p>
                      <div className="mt-2 w-32 h-32 relative">
                        <Image 
                          src={selectedEndorsement.logo_file} 
                          alt={`${selectedEndorsement.organization_name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedEndorsement.video_link && (
                    <div>
                      <p className="font-medium">Video Link:</p>
                      <a 
                        href={selectedEndorsement.video_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedEndorsement.video_link}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Status Information</h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">Current Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(selectedEndorsement.status)}`}>
                      {getStatusText(selectedEndorsement.status)}
                    </span>
                  </p>
                  <p><span className="font-medium">Created:</span> {formatDate(selectedEndorsement.created_at)}</p>
                  {selectedEndorsement.approved_at && (
                    <p><span className="font-medium">Approved:</span> {formatDate(selectedEndorsement.approved_at)}</p>
                  )}
                  {selectedEndorsement.rejection_reason && (
                    <div>
                      <p className="font-medium">Rejection Reason:</p>
                      <p className="text-red-600">{selectedEndorsement.rejection_reason}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={() => setSelectedEndorsement(null)}
                >
                  Close
                </button>
                
                {selectedEndorsement.status === 'pending_review' && selectedEndorsement.verified && (
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={() => openModal(selectedEndorsement, 'approve')}
                  >
                    Approve
                  </button>
                )}
                
                {['pending_verification', 'pending_review'].includes(selectedEndorsement.status) && (
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => openModal(selectedEndorsement, 'reject')}
                  >
                    Reject
                  </button>
                )}
                
                {selectedEndorsement.status === 'approved' && !selectedEndorsement.featured && (
                  <button
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    onClick={() => openModal(selectedEndorsement, 'feature')}
                  >
                    Feature
                  </button>
                )}
                
                {selectedEndorsement.status === 'approved' && selectedEndorsement.featured && (
                  <button
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    onClick={() => openModal(selectedEndorsement, 'unfeature')}
                  >
                    Unfeature
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action confirmation modal */}
      {isModalOpen && selectedEndorsement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900">
                {modalAction === 'approve' && 'Approve Endorsement'}
                {modalAction === 'reject' && 'Reject Endorsement'}
                {modalAction === 'feature' && 'Feature Endorsement'}
                {modalAction === 'unfeature' && 'Unfeature Endorsement'}
              </h2>
              
              <p className="mt-4 text-gray-600">
                {modalAction === 'approve' && 'Are you sure you want to approve this endorsement? This will make it visible on the Wall of Endorsers.'}
                {modalAction === 'reject' && 'Are you sure you want to reject this endorsement? Please provide a reason for the rejection.'}
                {modalAction === 'feature' && 'Are you sure you want to feature this endorsement? Featured endorsements will be highlighted on the Wall of Endorsers.'}
                {modalAction === 'unfeature' && 'Are you sure you want to remove this endorsement from featured? It will still be visible but not highlighted.'}
              </p>
              
              <div className="mt-2">
                <p className="font-medium">{selectedEndorsement.organization_name}</p>
                {modalAction === 'approve' && (
                  <p className="text-sm text-gray-500">This will send an approval email to {selectedEndorsement.email}</p>
                )}
                {modalAction === 'reject' && (
                  <p className="text-sm text-gray-500">This will send a rejection email to {selectedEndorsement.email}</p>
                )}
              </div>
              
              {modalAction === 'reject' && (
                <div className="mt-4">
                  <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700">
                    Rejection Reason
                  </label>
                  <textarea
                    id="rejectionReason"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Please provide a reason for rejection"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                
                <button
                  className={`px-4 py-2 rounded-md text-white ${
                    modalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                    modalAction === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                    modalAction === 'feature' ? 'bg-purple-600 hover:bg-purple-700' :
                    'bg-gray-600 hover:bg-gray-700'
                  }`}
                  onClick={handleEndorsementAction}
                  disabled={isSubmitting || (modalAction === 'reject' && !rejectionReason)}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                      Processing...
                    </span>
                  ) : (
                    <>
                      {modalAction === 'approve' && 'Approve'}
                      {modalAction === 'reject' && 'Reject'}
                      {modalAction === 'feature' && 'Feature'}
                      {modalAction === 'unfeature' && 'Unfeature'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}