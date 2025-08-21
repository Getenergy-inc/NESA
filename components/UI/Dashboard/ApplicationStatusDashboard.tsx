"use client";

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileText,
  Upload,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Button from '@/components/Common/Button';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { applicationService, ApplicationData, getApplicationStatusInfo } from '@/lib/services/applicationService';

interface ApplicationStatusDashboardProps {
  userId: string;
}

const ApplicationStatusDashboard: React.FC<ApplicationStatusDashboardProps> = ({ userId }) => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadApplications();
  }, [userId]);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const response = await applicationService.getUserApplications(userId);
      
      if (response.success && response.data) {
        setApplications(response.data.applications);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawApplication = async (applicationId: string) => {
    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    try {
      const response = await applicationService.withdrawApplication(applicationId);
      if (response.success) {
        await loadApplications(); // Reload applications
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to withdraw application');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'UNDER_REVIEW':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'SUBMITTED':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'DRAFT':
        return <FileText className="w-5 h-5 text-gray-600" />;
      case 'WITHDRAWN':
        return <XCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
        <p className="text-gray-600 mb-4">
          You haven't submitted any role applications. Start by applying for a role that interests you.
        </p>
        <Button
          text="Start New Application"
          onClick={() => window.location.href = '/applications/new'}
          className="inline-flex items-center gap-2"
          icon={<Upload className="w-4 h-4" />}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
        <Button
          text="New Application"
          onClick={() => window.location.href = '/applications/new'}
          className="inline-flex items-center gap-2"
          icon={<Upload className="w-4 h-4" />}
        />
      </div>

      <div className="space-y-4">
        {applications.map((application) => {
          const statusInfo = getApplicationStatusInfo(application.status);
          
          return (
            <div key={application.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  {getStatusIcon(application.status)}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {application.applicationType.replace('_', ' ')} Application
                    </h3>
                    <p className="text-sm text-gray-600">
                      Submitted on {application.submittedAt ? formatDate(application.submittedAt) : 'Not submitted'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
                    {statusInfo.label}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">{statusInfo.description}</p>
                {application.reviewComments && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-1">Review Comments:</p>
                    <p className="text-sm text-gray-700">{application.reviewComments}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Position:</span>
                  <p className="text-gray-600">{application.professionalInfo?.currentPosition || 'Not specified'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Organization:</span>
                  <p className="text-gray-600">{application.professionalInfo?.organization || 'Not specified'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Experience:</span>
                  <p className="text-gray-600">
                    {application.professionalInfo?.yearsOfExperience || 0} years
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {application.documents && application.documents.length > 0 && (
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {application.documents.length} document(s)
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    text="View"
                    variant="outline"
                    size="small"
                    onClick={() => window.location.href = `/applications/${application.id}`}
                    className="inline-flex items-center gap-1"
                    icon={<Eye className="w-4 h-4" />}
                  />

                  {(application.status === 'DRAFT' || application.status === 'SUBMITTED') && (
                    <Button
                      text="Edit"
                      variant="outline"
                      size="small"
                      onClick={() => window.location.href = `/applications/${application.id}/edit`}
                      className="inline-flex items-center gap-1"
                      icon={<Edit className="w-4 h-4" />}
                    />
                  )}

                  {(application.status === 'DRAFT' || application.status === 'SUBMITTED') && (
                    <Button
                      text="Withdraw"
                      variant="outline"
                      size="small"
                      onClick={() => handleWithdrawApplication(application.id!)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700"
                      icon={<Trash2 className="w-4 h-4" />}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Application Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure all required documents are uploaded before submitting</li>
          <li>• Review your application carefully before final submission</li>
          <li>• Applications are typically reviewed within 5-7 business days</li>
          <li>• You'll receive email notifications about status changes</li>
        </ul>
      </div>
    </div>
  );
};

export default ApplicationStatusDashboard;
