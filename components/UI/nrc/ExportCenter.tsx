'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  Users,
  Award,
  Calendar,
  Filter,
  Settings,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  FileJson,
  FileImage
} from 'lucide-react';
import Button from '@/components/Common/Button';
import {
  exportApplications,
  exportVolunteers,
  exportNominees,
  downloadFile,
  getMimeType,
  generateSummaryReport,
  type ExportOptions
} from '@/lib/services/exportService';
import {
  getAllNRCApplications,
  getAllNRCVolunteers,
  getVolunteerNominees
} from '@/lib/services/mockNRCService';

interface ExportCenterProps {
  userRole?: 'admin' | 'volunteer';
  volunteerId?: string;
}

const ExportCenter: React.FC<ExportCenterProps> = ({ userRole = 'volunteer', volunteerId }) => {
  const [loading, setLoading] = useState(false);
  const [exportType, setExportType] = useState<'applications' | 'volunteers' | 'nominees' | 'summary'>('nominees');
  const [format, setFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [filters, setFilters] = useState({
    status: [] as string[],
    category: [] as string[],
    country: [] as string[]
  });
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      const options: ExportOptions = {
        format,
        includeHeaders: true,
        dateRange,
        filters: Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value.length > 0)
        )
      };

      let result;

      switch (exportType) {
        case 'applications': {
          if (userRole !== 'admin') {
            throw new Error('Access denied: Admin role required');
          }
          const response = await getAllNRCApplications();
          if (!response.success) throw new Error(response.message);
          result = await exportApplications(response.data || [], options);
          break;
        }

        case 'volunteers': {
          if (userRole !== 'admin') {
            throw new Error('Access denied: Admin role required');
          }
          const response = await getAllNRCVolunteers();
          if (!response.success) throw new Error(response.message);
          result = await exportVolunteers(response.data || [], options);
          break;
        }

        case 'nominees': {
          if (userRole === 'admin') {
            // Admin can export all nominees
            const volunteersResponse = await getAllNRCVolunteers();
            if (!volunteersResponse.success) throw new Error(volunteersResponse.message);
            
            const allNominees = [];
            for (const volunteer of volunteersResponse.data || []) {
              const nomineesResponse = await getVolunteerNominees(volunteer.id);
              if (nomineesResponse.success) {
                allNominees.push(...(nomineesResponse.data || []));
              }
            }
            result = await exportNominees(allNominees, options);
          } else {
            // Volunteer can only export their own nominees
            if (!volunteerId) throw new Error('Volunteer ID required');
            const response = await getVolunteerNominees(volunteerId);
            if (!response.success) throw new Error(response.message);
            result = await exportNominees(response.data || [], options);
          }
          break;
        }

        case 'summary': {
          if (userRole !== 'admin') {
            throw new Error('Access denied: Admin role required');
          }
          
          const [applicationsResponse, volunteersResponse] = await Promise.all([
            getAllNRCApplications(),
            getAllNRCVolunteers()
          ]);

          if (!applicationsResponse.success || !volunteersResponse.success) {
            throw new Error('Failed to load data for summary report');
          }

          const allNominees = [];
          for (const volunteer of volunteersResponse.data || []) {
            const nomineesResponse = await getVolunteerNominees(volunteer.id);
            if (nomineesResponse.success) {
              allNominees.push(...(nomineesResponse.data || []));
            }
          }

          const summaryData = generateSummaryReport(
            applicationsResponse.data || [],
            volunteersResponse.data || [],
            allNominees
          );

          result = {
            success: true,
            data: JSON.stringify(summaryData, null, 2),
            filename: `nrc-summary-report-${new Date().toISOString().split('T')[0]}.json`,
            message: 'Summary report generated successfully'
          };
          break;
        }

        default:
          throw new Error('Invalid export type');
      }

      if (result.success && result.data) {
        downloadFile(result.data, result.filename, getMimeType(format));
        showNotification('success', result.message);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Export failed');
    } finally {
      setLoading(false);
    }
  };

  const getExportIcon = (type: string) => {
    switch (type) {
      case 'applications':
        return <FileText className="w-5 h-5" />;
      case 'volunteers':
        return <Users className="w-5 h-5" />;
      case 'nominees':
        return <Award className="w-5 h-5" />;
      case 'summary':
        return <FileImage className="w-5 h-5" />;
      default:
        return <Download className="w-5 h-5" />;
    }
  };

  const getFormatIcon = (fmt: string) => {
    switch (fmt) {
      case 'csv':
        return <FileSpreadsheet className="w-4 h-4" />;
      case 'json':
        return <FileJson className="w-4 h-4" />;
      case 'pdf':
        return <FileImage className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Download className="w-6 h-6 text-[#ea580c]" />
        <h2 className="text-xl font-semibold text-gray-900">Data Export Center</h2>
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-4 rounded-lg flex items-center gap-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </motion.div>
      )}

      <div className="space-y-6">
        {/* Export Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What would you like to export?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { key: 'nominees', label: 'Nominees', description: 'Nominee profiles and data', adminOnly: false },
              { key: 'applications', label: 'Applications', description: 'Volunteer applications', adminOnly: true },
              { key: 'volunteers', label: 'Volunteers', description: 'Volunteer information', adminOnly: true },
              { key: 'summary', label: 'Summary Report', description: 'Complete overview report', adminOnly: true }
            ].map(({ key, label, description, adminOnly }) => (
              <button
                key={key}
                onClick={() => setExportType(key as any)}
                disabled={adminOnly && userRole !== 'admin'}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  exportType === key
                    ? 'border-[#ea580c] bg-orange-50 text-[#ea580c]'
                    : adminOnly && userRole !== 'admin'
                    ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getExportIcon(key)}
                  <span className="font-medium">{label}</span>
                </div>
                <p className="text-xs">{description}</p>
                {adminOnly && userRole !== 'admin' && (
                  <p className="text-xs text-red-500 mt-1">Admin only</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Export Format
          </label>
          <div className="flex gap-3">
            {[
              { key: 'csv', label: 'CSV', description: 'Spreadsheet format' },
              { key: 'json', label: 'JSON', description: 'Structured data' },
              { key: 'pdf', label: 'PDF', description: 'Report format' }
            ].map(({ key, label, description }) => (
              <button
                key={key}
                onClick={() => setFormat(key as any)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                  format === key
                    ? 'border-[#ea580c] bg-orange-50 text-[#ea580c]'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {getFormatIcon(key)}
                <div className="text-left">
                  <div className="font-medium text-sm">{label}</div>
                  <div className="text-xs opacity-75">{description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Date Range
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">From</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">To</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            text={loading ? "Exporting..." : "Export Data"}
            onClick={handleExport}
            disabled={loading}
            variant="filled"
            className="w-full bg-[#ea580c] hover:bg-[#dc2626] text-white flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportCenter;
