"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, Award } from "lucide-react";

export default function CertificateEligibilityRule() {
  const [nominations, setNominations] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const eligible = nominations >= 10 && accepted;

  return (
    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
        🟩 Certificate Eligibility Rule
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Certificates auto-downloadable after 10 re-nominations + acceptance.
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center p-3 rounded-lg bg-gray-100 w-1/2 mr-2">
          <p className="text-sm text-gray-500">Re-Nominations</p>
          <p className="text-xl font-bold text-gray-800">{nominations}</p>
          <button
            className="text-xs text-blue-600 mt-1 hover:underline"
            onClick={() => setNominations((n) => n + 2)}
          >
            + Add 2 Nominations
          </button>
        </div>

        <div className="flex flex-col items-center p-3 rounded-lg bg-gray-100 w-1/2">
          <p className="text-sm text-gray-500">Acceptance</p>
          <p className="text-xl font-bold text-gray-800">
            {accepted ? "Yes" : "No"}
          </p>
          <button
            className="text-xs text-green-600 mt-1 hover:underline"
            onClick={() => setAccepted((a) => !a)}
          >
            Toggle
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mt-2">
        {eligible ? (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <CheckCircle className="w-5 h-5" />
            Eligible for Certificate Download
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <XCircle className="w-5 h-5" />
            Not yet eligible
          </div>
        )}
      </div>

      {eligible && (
        <button className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition">
          <Award className="w-4 h-4" />
          Download Certificate
        </button>
      )}
    </div>
  );
}
