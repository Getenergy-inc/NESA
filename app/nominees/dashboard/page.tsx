"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NomineeProfile {
  id: string;
  fullName: string;
  email: string;
  profileImageUrl: string | null;
  approvedNominationCount: number;
  acceptanceStatus: "PENDING" | "ACCEPTED" | "DECLINED";
  awardCategory: string;
  organization?: string;
  country?: string;
  certificateUrl?: string;
  certificateIssuedAt?: string;
}

export default function NomineeDashboard() {
  const router = useRouter();
  const [nominee, setNominee] = useState<NomineeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certificateGenerating, setCertificateGenerating] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  // Fetch nominee profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get nominee ID from localStorage or URL
        const nomineeId = localStorage.getItem("nomineeId");
        if (!nomineeId) {
          setError("Not logged in as a nominee. Please use your acceptance link.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/api/v1/nominees/${nomineeId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch nominee profile");
        }

        const data = await res.json();
        setNominee(data.data);
      } catch (err) {
        console.error("Error fetching nominee:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load your profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_BASE]);

  const handleGenerateCertificate = async () => {
    if (!nominee) return;

    try {
      setCertificateGenerating(true);
      const res = await fetch(`${API_BASE}/api/v1/certificates/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomineeId: nominee.id,
          awardCategory: nominee.awardCategory,
          nomineeName: nominee.fullName,
          approvalCount: nominee.approvedNominationCount,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate certificate");
      }

      const data = await res.json();
      alert("Certificate generated! Check your email.");
      // Update nominee state with new certificate URL
      setNominee((prev) =>
        prev ? { ...prev, certificateUrl: data.data?.url } : null
      );
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to generate certificate"
      );
    } finally {
      setCertificateGenerating(false);
    }
  };

  const handleDownloadCertificate = () => {
    if (nominee?.certificateUrl) {
      window.open(nominee.certificateUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (!nominee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <p className="text-gray-600">No nominee data found.</p>
      </div>
    );
  }

  const certificateEarned = nominee.approvedNominationCount >= 10;
  const progressPercent = Math.min((nominee.approvedNominationCount / 10) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nominee Dashboard
          </h1>
          <p className="text-gray-600">Your nomination journey & achievements</p>
        </div>

        {/* Acceptance Status Alert */}
        {nominee.acceptanceStatus === "PENDING" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 font-semibold">
              ⏳ Your acceptance is pending. Please check your email for the acceptance link.
            </p>
          </div>
        )}

        {nominee.acceptanceStatus === "DECLINED" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800 font-semibold">
              ❌ You have declined this nomination.
            </p>
          </div>
        )}

        {nominee.acceptanceStatus === "ACCEPTED" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-green-800 font-semibold">
              ✅ You have accepted this nomination!
            </p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {nominee.profileImageUrl ? (
                  <Image
                    src={nominee.profileImageUrl}
                    alt={nominee.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <p className="text-4xl mb-2">👤</p>
                    <p className="text-sm">No image</p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {nominee.fullName}
              </h2>
              <p className="text-gray-600 mb-4">{nominee.email}</p>

              {nominee.organization && (
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Organization:</span>{" "}
                  {nominee.organization}
                </p>
              )}

              {nominee.country && (
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Country:</span>{" "}
                  {nominee.country}
                </p>
              )}

              <p className="text-gray-700">
                <span className="font-semibold">Award Category:</span>{" "}
                {nominee.awardCategory}
              </p>
            </div>
          </div>
        </div>

        {/* Nomination Progress */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Nomination Progress
          </h3>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-700">
                Approvals Received
              </span>
              <span className="text-2xl font-bold text-orange-600">
                {nominee.approvedNominationCount}/10
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 mt-2">
              {progressPercent.toFixed(0)}% toward certificate
            </p>
          </div>

          {/* Milestone Messages */}
          {nominee.approvedNominationCount < 5 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                🚀 Keep sharing your nomination link! You need{" "}
                <strong>{10 - nominee.approvedNominationCount}</strong> more
                approvals to earn your certificate.
              </p>
            </div>
          )}

          {nominee.approvedNominationCount >= 5 &&
            nominee.approvedNominationCount < 10 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800">
                  💜 You're halfway there! Just{" "}
                  <strong>{10 - nominee.approvedNominationCount}</strong> more
                  approvals left.
                </p>
              </div>
            )}

          {certificateEarned && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-semibold">
                🏆 Congratulations! You've earned your certificate!
              </p>
            </div>
          )}
        </div>

        {/* Certificate Section */}
        {certificateEarned && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Your Certificate
            </h3>

            <div className="flex flex-col items-center">
              {nominee.certificateUrl ? (
                <>
                  <div className="mb-6 p-4 border-2 border-orange-400 rounded-lg bg-orange-50">
                    <p className="text-center text-gray-700 mb-4">
                      Your certificate is ready!
                    </p>
                    <button
                      onClick={handleDownloadCertificate}
                      className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
                    >
                      📥 Download Certificate
                    </button>
                  </div>
                  {nominee.certificateIssuedAt && (
                    <p className="text-sm text-gray-500">
                      Issued on{" "}
                      {new Date(
                        nominee.certificateIssuedAt
                      ).toLocaleDateString()}
                    </p>
                  )}
                </>
              ) : (
                <button
                  onClick={handleGenerateCertificate}
                  disabled={certificateGenerating}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                >
                  {certificateGenerating ? "Generating..." : "🎓 Generate Certificate"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
