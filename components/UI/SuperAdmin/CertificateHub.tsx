
"use client";

import React, { useState } from "react";

const certificates = [
  { id: "CERT-001", name: "Nominee A", award: "Blue Garnet", status: "Issued" },
  { id: "CERT-002", name: "Nominee B", award: "Gold Certificate", status: "Issued" },
  { id: "CERT-003", name: "Nominee C", award: "Platinum", status: "Revoked" },
  { id: "CERT-004", name: "Nominee D", award: "Blue Garnet", status: "Pending" },
];

const statusColors: Record<string, string> = {
  Issued: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
  Revoked: "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100",
  Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100",
};

const CertificateHub: React.FC = () => {
  const [searchId, setSearchId] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const verifyCertificate = () => {
    const cert = certificates.find((c) => c.id.toLowerCase() === searchId.toLowerCase());
    setVerificationResult(cert ? `✅ Valid Certificate issued to ${cert.name}` : "❌ Certificate not found");
  };

  return (
    <div className="p-6 space-y-6"
          style={{
          backgroundImage: "url('/images/bg/about_.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
      <h2 className="text-2xl font-bold text-white dark:text-gray-100">
        🏆 Digital Certificate Hub
      </h2>

      {/* Issue Certificate */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-[#f59e0b] text-white rounded-lg">
          + Issue New Certificate
        </button>
      </div>

      {/* Verification */}
      <div className="bg-whiteGold dark:bg-gray-800 p-4 rounded-2xl shadow space-y-4">
        <h3 className="font-semibold text-[#17120a] dark:text-gray-200">🔍 Verify Certificate</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Certificate ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <button
            onClick={verifyCertificate}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Verify
          </button>
        </div>
        {verificationResult && (
          <p className="text-sm text-gray-700 dark:text-gray-300">{verificationResult}</p>
        )}
      </div>

      {/* Certificates Table */}
      <div className=" dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left text-gray-700 dark:text-gray-200">
          <thead>
            <tr className="border-b text-white border-gray-200 dark:border-gray-700">
              <th className="p-2">Certificate ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Award</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((c, idx) => (
              <tr key={idx} className="border-b text-whiteGold border-gray-100 dark:border-gray-700">
                <td className="p-2">{c.id}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.award}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  <button className="px-3 py-1  text-deepGold rounded-lg text-sm">
                    View
                  </button>
                  <button className="px-3 py-1 bg-[#ea580c] text-white rounded-lg text-sm">
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
            {certificates.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No certificates issued yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateHub;
