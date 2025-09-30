"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  Building, 
  Globe, 
  FileText,
  Loader2,
  RefreshCw,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";

interface Partner {
  _id: string;
  name: string;
  email: string;
  phone: string;
  brandName: string;
  brandLink: string;
  description: string;
  partnershipGoals: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const AdminPartnerPage = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPartner, setExpandedPartner] = useState<string | null>(null);

  useEffect(() => {
    fetchPartners();
  }, [pagination.page]);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/partner-application?page=${pagination.page}&limit=${pagination.limit}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch partners");
      }

      setPartners(data.data.entries);
      setPagination(data.data.pagination);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching partners");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just filter the current results
    // In a real implementation, you'd want to send the search term to the API
    fetchPartners();
  };

  const toggleExpandPartner = (id: string) => {
    if (expandedPartner === id) {
      setExpandedPartner(null);
    } else {
      setExpandedPartner(id);
    }
  };

  const exportToCSV = () => {
    // Create CSV content
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Brand Name",
      "Brand Link",
      "Description",
      "Partnership Goals",
      "Created At",
    ].join(",");

    const rows = partners.map((partner) => {
      return [
        `"${partner.name.replace(/"/g, '""')}"`,
        `"${partner.email.replace(/"/g, '""')}"`,
        `"${partner.phone.replace(/"/g, '""')}"`,
        `"${partner.brandName.replace(/"/g, '""')}"`,
        `"${partner.brandLink.replace(/"/g, '""')}"`,
        `"${partner.description.replace(/"/g, '""')}"`,
        `"${partner.partnershipGoals.replace(/"/g, '""')}"`,
        `"${new Date(partner.createdAt).toLocaleString()}"`,
      ].join(",");
    });

    const csvContent = [headers, ...rows].join("\n");

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `partners_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-600 hover:text-deepGold transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Admin Dashboard</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="p-6 md:p-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Partner Applications
              </h1>

              <div className="flex flex-col sm:flex-row gap-4">
                <form
                  onSubmit={handleSearch}
                  className="relative flex-grow max-w-md"
                >
                  <input
                    type="text"
                    placeholder="Search partners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </form>

                <button
                  onClick={fetchPartners}
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  <RefreshCw size={18} className="mr-2" />
                  Refresh
                </button>

                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center justify-center px-4 py-2 bg-deepGold hover:bg-darkGold text-black font-medium rounded-lg transition-colors"
                >
                  <Download size={18} className="mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-deepGold" />
              <span className="ml-3 text-gray-600">Loading partners...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">{error}</div>
          ) : partners.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No partner applications found
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="overflow-x-auto"
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {partners.map((partner) => (
                    <React.Fragment key={partner._id}>
                      <motion.tr
                        variants={itemVariants}
                        className={`hover:bg-gray-50 ${
                          expandedPartner === partner._id ? "bg-gray-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {partner.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {partner.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {partner.brandName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(partner.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => toggleExpandPartner(partner._id)}
                            className="text-deepGold hover:text-darkGold"
                          >
                            {expandedPartner === partner._id
                              ? "Hide Details"
                              : "View Details"}
                          </button>
                        </td>
                      </motion.tr>
                      {expandedPartner === partner._id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan={5} className="px-6 py-4 bg-gray-50">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-medium text-gray-900 mb-3">
                                  Contact Information
                                </h3>
                                <div className="space-y-2">
                                  <div className="flex items-start">
                                    <UserIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">
                                        {partner.name}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                                    <div>
                                      <div className="text-sm text-gray-900">
                                        {partner.email}
                                      </div>
                                      <a
                                        href={`mailto:${partner.email}`}
                                        className="text-xs text-deepGold hover:underline"
                                      >
                                        Send Email
                                      </a>
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                                    <div>
                                      <div className="text-sm text-gray-900">
                                        {partner.phone}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <h3 className="font-medium text-gray-900 mt-6 mb-3">
                                  Brand Information
                                </h3>
                                <div className="space-y-2">
                                  <div className="flex items-start">
                                    <Building className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                                    <div className="text-sm text-gray-900">
                                      {partner.brandName}
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <Globe className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                                    <div>
                                      <div className="text-sm text-gray-900">
                                        {partner.brandLink}
                                      </div>
                                      <a
                                        href={partner.brandLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-deepGold hover:underline inline-flex items-center"
                                      >
                                        Visit Website
                                        <ExternalLink
                                          size={12}
                                          className="ml-1"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-medium text-gray-900 mb-3">
                                  Brand Description
                                </h3>
                                <div className="flex items-start">
                                  <FileText className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {partner.description}
                                  </div>
                                </div>

                                <h3 className="font-medium text-gray-900 mt-6 mb-3">
                                  Partnership Goals
                                </h3>
                                <div className="flex items-start">
                                  <FileText className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {partner.partnershipGoals}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* Pagination */}
          {!loading && partners.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(pagination.page - 1) * pagination.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span>{" "}
                results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${
                    pagination.page === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className={`inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${
                    pagination.page === pagination.pages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Next
                  <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};



export default AdminPartnerPage;