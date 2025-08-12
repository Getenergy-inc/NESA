// Export Service for NRC Data
// Handles data export in various formats (CSV, JSON, PDF)

import type { NRCApplication, NRCVolunteer, NomineeProfile } from './mockNRCService';

export interface ExportOptions {
  format: 'csv' | 'json' | 'pdf';
  includeHeaders?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  filters?: {
    status?: string[];
    category?: string[];
    country?: string[];
  };
}

export interface ExportResult {
  success: boolean;
  data?: string | Blob;
  filename: string;
  message: string;
}

// CSV Export Functions
const convertToCSV = (data: any[], headers: string[]): string => {
  const csvHeaders = headers.join(',');
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      // Handle arrays and objects
      if (Array.isArray(value)) {
        return `"${value.join('; ')}"`;
      }
      if (typeof value === 'object' && value !== null) {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      // Escape quotes and wrap in quotes if contains comma
      const stringValue = String(value || '');
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(',')
  );
  
  return [csvHeaders, ...csvRows].join('\n');
};

// Export Applications
export const exportApplications = async (
  applications: NRCApplication[],
  options: ExportOptions
): Promise<ExportResult> => {
  try {
    let filteredData = applications;

    // Apply date range filter
    if (options.dateRange) {
      const startDate = new Date(options.dateRange.start);
      const endDate = new Date(options.dateRange.end);
      filteredData = filteredData.filter(app => {
        const appDate = new Date(app.applicationDate);
        return appDate >= startDate && appDate <= endDate;
      });
    }

    // Apply status filter
    if (options.filters?.status?.length) {
      filteredData = filteredData.filter(app => 
        options.filters!.status!.includes(app.status)
      );
    }

    // Apply country filter
    if (options.filters?.country?.length) {
      filteredData = filteredData.filter(app => 
        options.filters!.country!.includes(app.country)
      );
    }

    const timestamp = new Date().toISOString().split('T')[0];

    switch (options.format) {
      case 'csv': {
        const headers = [
          'id', 'fullName', 'email', 'phone', 'country', 'motivation',
          'experience', 'availability', 'skills', 'applicationDate', 'status',
          'reviewedBy', 'reviewDate', 'reviewNotes'
        ];
        
        const csvData = convertToCSV(filteredData, headers);
        const filename = `nrc-applications-${timestamp}.csv`;
        
        return {
          success: true,
          data: csvData,
          filename,
          message: `Exported ${filteredData.length} applications to CSV`
        };
      }

      case 'json': {
        const jsonData = JSON.stringify(filteredData, null, 2);
        const filename = `nrc-applications-${timestamp}.json`;
        
        return {
          success: true,
          data: jsonData,
          filename,
          message: `Exported ${filteredData.length} applications to JSON`
        };
      }

      case 'pdf': {
        // For PDF, we'll return a structured data that can be used by a PDF library
        const pdfData = {
          title: 'NRC Applications Report',
          date: new Date().toLocaleDateString(),
          data: filteredData,
          summary: {
            total: filteredData.length,
            pending: filteredData.filter(a => a.status === 'pending').length,
            approved: filteredData.filter(a => a.status === 'approved').length,
            rejected: filteredData.filter(a => a.status === 'rejected').length
          }
        };
        
        const filename = `nrc-applications-report-${timestamp}.pdf`;
        
        return {
          success: true,
          data: JSON.stringify(pdfData),
          filename,
          message: `Generated PDF report for ${filteredData.length} applications`
        };
      }

      default:
        throw new Error('Unsupported export format');
    }
  } catch (error) {
    return {
      success: false,
      filename: '',
      message: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Export Volunteers
export const exportVolunteers = async (
  volunteers: NRCVolunteer[],
  options: ExportOptions
): Promise<ExportResult> => {
  try {
    let filteredData = volunteers;

    // Apply date range filter
    if (options.dateRange) {
      const startDate = new Date(options.dateRange.start);
      const endDate = new Date(options.dateRange.end);
      filteredData = filteredData.filter(vol => {
        const volDate = new Date(vol.approvalDate);
        return volDate >= startDate && volDate <= endDate;
      });
    }

    // Apply country filter
    if (options.filters?.country?.length) {
      filteredData = filteredData.filter(vol => 
        options.filters!.country!.includes(vol.country)
      );
    }

    const timestamp = new Date().toISOString().split('T')[0];

    switch (options.format) {
      case 'csv': {
        const headers = [
          'id', 'applicationId', 'fullName', 'email', 'country', 'approvalDate',
          'nomineesUploaded', 'targetNominees', 'completionRate', 'lastActive', 'status'
        ];
        
        const csvData = convertToCSV(filteredData, headers);
        const filename = `nrc-volunteers-${timestamp}.csv`;
        
        return {
          success: true,
          data: csvData,
          filename,
          message: `Exported ${filteredData.length} volunteers to CSV`
        };
      }

      case 'json': {
        const jsonData = JSON.stringify(filteredData, null, 2);
        const filename = `nrc-volunteers-${timestamp}.json`;
        
        return {
          success: true,
          data: jsonData,
          filename,
          message: `Exported ${filteredData.length} volunteers to JSON`
        };
      }

      case 'pdf': {
        const pdfData = {
          title: 'NRC Volunteers Report',
          date: new Date().toLocaleDateString(),
          data: filteredData,
          summary: {
            total: filteredData.length,
            active: filteredData.filter(v => v.status === 'active').length,
            totalNominees: filteredData.reduce((sum, v) => sum + v.nomineesUploaded, 0),
            averageCompletion: filteredData.length > 0 
              ? Math.round(filteredData.reduce((sum, v) => sum + v.completionRate, 0) / filteredData.length)
              : 0
          }
        };
        
        const filename = `nrc-volunteers-report-${timestamp}.pdf`;
        
        return {
          success: true,
          data: JSON.stringify(pdfData),
          filename,
          message: `Generated PDF report for ${filteredData.length} volunteers`
        };
      }

      default:
        throw new Error('Unsupported export format');
    }
  } catch (error) {
    return {
      success: false,
      filename: '',
      message: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Export Nominees
export const exportNominees = async (
  nominees: NomineeProfile[],
  options: ExportOptions
): Promise<ExportResult> => {
  try {
    let filteredData = nominees;

    // Apply date range filter
    if (options.dateRange) {
      const startDate = new Date(options.dateRange.start);
      const endDate = new Date(options.dateRange.end);
      filteredData = filteredData.filter(nom => {
        const nomDate = new Date(nom.dateCreated);
        return nomDate >= startDate && nomDate <= endDate;
      });
    }

    // Apply status filter
    if (options.filters?.status?.length) {
      filteredData = filteredData.filter(nom => 
        options.filters!.status!.includes(nom.status)
      );
    }

    // Apply category filter
    if (options.filters?.category?.length) {
      filteredData = filteredData.filter(nom => 
        options.filters!.category!.includes(nom.awardCategory)
      );
    }

    // Apply country filter
    if (options.filters?.country?.length) {
      filteredData = filteredData.filter(nom => 
        options.filters!.country!.includes(nom.country)
      );
    }

    const timestamp = new Date().toISOString().split('T')[0];

    switch (options.format) {
      case 'csv': {
        const headers = [
          'id', 'volunteerId', 'fullName', 'organizationName', 'country', 'region',
          'email', 'phone', 'website', 'linkedinProfile', 'awardCategory', 'subcategory',
          'achievementSummary', 'impactMetrics', 'beneficiariesCount', 'yearsOfImpact',
          'sdgAlignment', 'agendaAlignment', 'esgAlignment', 'status', 'dateCreated', 'completionScore'
        ];
        
        const csvData = convertToCSV(filteredData, headers);
        const filename = `nrc-nominees-${timestamp}.csv`;
        
        return {
          success: true,
          data: csvData,
          filename,
          message: `Exported ${filteredData.length} nominees to CSV`
        };
      }

      case 'json': {
        const jsonData = JSON.stringify(filteredData, null, 2);
        const filename = `nrc-nominees-${timestamp}.json`;
        
        return {
          success: true,
          data: jsonData,
          filename,
          message: `Exported ${filteredData.length} nominees to JSON`
        };
      }

      case 'pdf': {
        const pdfData = {
          title: 'NRC Nominees Report',
          date: new Date().toLocaleDateString(),
          data: filteredData,
          summary: {
            total: filteredData.length,
            approved: filteredData.filter(n => n.status === 'approved').length,
            pending: filteredData.filter(n => n.status === 'submitted').length,
            draft: filteredData.filter(n => n.status === 'draft').length,
            byCategory: filteredData.reduce((acc, nom) => {
              acc[nom.awardCategory] = (acc[nom.awardCategory] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
            byCountry: filteredData.reduce((acc, nom) => {
              acc[nom.country] = (acc[nom.country] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          }
        };
        
        const filename = `nrc-nominees-report-${timestamp}.pdf`;
        
        return {
          success: true,
          data: JSON.stringify(pdfData),
          filename,
          message: `Generated PDF report for ${filteredData.length} nominees`
        };
      }

      default:
        throw new Error('Unsupported export format');
    }
  } catch (error) {
    return {
      success: false,
      filename: '',
      message: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Download helper function
export const downloadFile = (data: string | Blob, filename: string, mimeType: string = 'text/plain') => {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// Get MIME type for format
export const getMimeType = (format: string): string => {
  switch (format) {
    case 'csv':
      return 'text/csv';
    case 'json':
      return 'application/json';
    case 'pdf':
      return 'application/pdf';
    default:
      return 'text/plain';
  }
};

// Generate summary report
export const generateSummaryReport = (
  applications: NRCApplication[],
  volunteers: NRCVolunteer[],
  nominees: NomineeProfile[]
) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Recent activity
  const recentApplications = applications.filter(a =>
    new Date(a.applicationDate) >= sevenDaysAgo
  );
  const recentNominees = nominees.filter(n =>
    new Date(n.dateCreated) >= sevenDaysAgo
  );

  // Performance metrics
  const totalNominees = nominees.length;
  const targetNominees = volunteers.length * 200; // 200 per volunteer
  const completionRate = targetNominees > 0 ? (totalNominees / targetNominees) * 100 : 0;

  // Country distribution
  const countryStats = nominees.reduce((acc, nominee) => {
    acc[nominee.country] = (acc[nominee.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Category distribution
  const categoryStats = nominees.reduce((acc, nominee) => {
    acc[nominee.awardCategory] = (acc[nominee.awardCategory] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Volunteer performance
  const volunteerStats = volunteers.map(volunteer => ({
    name: volunteer.fullName,
    country: volunteer.country,
    nomineesUploaded: volunteer.nomineesUploaded,
    completionRate: volunteer.completionRate,
    lastActive: volunteer.lastActive
  })).sort((a, b) => b.nomineesUploaded - a.nomineesUploaded);

  return {
    generatedAt: now.toISOString(),
    period: {
      start: thirtyDaysAgo.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0]
    },
    overview: {
      totalApplications: applications.length,
      pendingApplications: applications.filter(a => a.status === 'pending').length,
      approvedApplications: applications.filter(a => a.status === 'approved').length,
      rejectedApplications: applications.filter(a => a.status === 'rejected').length,
      totalVolunteers: volunteers.length,
      activeVolunteers: volunteers.filter(v => v.status === 'active').length,
      totalNominees,
      targetNominees,
      completionRate: Math.round(completionRate * 100) / 100
    },
    recentActivity: {
      newApplications: recentApplications.length,
      newNominees: recentNominees.length,
      applicationsThisWeek: recentApplications,
      nomineesThisWeek: recentNominees
    },
    distributions: {
      byCountry: Object.entries(countryStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      byCategory: Object.entries(categoryStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
    },
    topVolunteers: volunteerStats.slice(0, 10),
    statusBreakdown: {
      nominees: {
        approved: nominees.filter(n => n.status === 'approved').length,
        submitted: nominees.filter(n => n.status === 'submitted').length,
        draft: nominees.filter(n => n.status === 'draft').length,
        rejected: nominees.filter(n => n.status === 'rejected').length
      }
    }
  };
};
