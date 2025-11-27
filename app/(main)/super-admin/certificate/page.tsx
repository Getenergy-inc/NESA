"use client";

import { useState } from "react";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import AppCard from "@/components/UI/SuperAdmin/AppCard";
import AppTable from "@/components/UI/SuperAdmin/AppTable";
import AppButton from "@/components/UI/SuperAdmin/AppButton";
import WalletBadge from "@/components/UI/SuperAdmin/WalletBadge";

import {
  FileText,
  CheckCircle,
  RefreshCcw,
  Download,
  Printer,
  BadgeCheck,
  Clock,
} from "lucide-react";

const DigitalCertificateHub = () => {
  const [certificates, setCertificates] = useState([
    { id: 1, type: "Nomination", status: "Requested", renominations: 4 },
    { id: 2, type: "Recognition", status: "Approved", renominations: 12 },
  ]);

  const handleGenerate = (type: string) => {
    alert(`Generating ${type} Certificate...`);
  };

  const handleDownload = (id: number) => {
    alert(`Downloading certificate ID: ${id}`);
  };

  const handlePrintedCopy = (id: number) => {
    alert(`Requesting PAID printed copy for certificate ID: ${id}`);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "type", label: "Certificate Type" },
    { key: "status", label: "Status" },
    { key: "renominations", label: "Re-Nominations" },
    { key: "auto", label: "Auto-Download Rule" },
    { key: "action", label: "Action" },
  ];

  const data = certificates.map((cert) => ({
    ...cert,

    // Status badge
    status: (
      <span
        className={`px-2 py-1 rounded text-xs ${
          cert.status === "Requested"
            ? "bg-yellow-100 text-yellow-700"
            : cert.status === "Approved"
            ? "bg-blue-100 text-blue-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {cert.status}
      </span>
    ),

    // Auto-download rule logic
    auto:
      cert.renominations >= 50 ? (
        <span className="flex items-center gap-1 text-green-600 text-xs font-semibold">
          <BadgeCheck className="w-3 h-3" /> Eligible
        </span>
      ) : (
        <span className="text-gray-500 text-xs">
          {50 - cert.renominations} left
        </span>
      ),

    // Action buttons
    action: (
      <div className="flex gap-2">
        <AppButton
          label="Download"
          icon={Download}
          size="sm"
          variant="secondary"
          onClick={() => handleDownload(cert.id)}
        />
        <AppButton
          label="Print"
          icon={Printer}
          size="sm"
          variant="outline"
          onClick={() => handlePrintedCopy(cert.id)}
        />
      </div>
    ),
  }));

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
            Digital Certificate Hub
          </h1>

          <WalletBadge />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <AppCard title="Certificates of Nomination">
            <AppButton
              label="Generate"
              size="md"
              variant="primary"
              icon={FileText}
              onClick={() => handleGenerate("Nomination")}
            />
          </AppCard>

          <AppCard title="Certificates of Recognition">
            <AppButton
              label="Generate"
              size="md"
              variant="primary"
              icon={CheckCircle}
              onClick={() => handleGenerate("Recognition")}
            />
          </AppCard>

          <AppCard title="Judge/Volunteer Service Certificates">
            <AppButton
              label="Generate"
              size="md"
              variant="primary"
              icon={RefreshCcw}
              onClick={() => handleGenerate("Judge/Volunteer")}
            />
          </AppCard>
        </div>

        {/* RULE SET */}
        <AppCard title="Certificate Rules & Compliance">
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-green-600" />
              <span>
                Certificates auto-download after <strong>50 re-nominations</strong> + acceptance.
              </span>
            </li>

            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>
                Certificates are <strong>valid for 1 year</strong> from the date of issue.
              </span>
            </li>

            <li className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-purple-600" />
              <span>
                Printed copies available upon request — <strong>additional fee applies</strong>.
              </span>
            </li>

            <li className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-600" />
              <span>
                All certificates must include partner logos:{" "}
                <strong>AU, UNESCO, CSACEFA</strong>, and others.
              </span>
            </li>
          </ul>
        </AppCard>

        {/* Status Table */}
        <AppCard title="Status Tracker">
          <AppTable columns={columns} data={data} />
        </AppCard>

        {/* DOI Generator */}
        <AppCard title="DOI Verification Generator">
          <AppButton
            label="Generate DOI for Institutional Use"
            size="md"
            variant="secondary"
          />
        </AppCard>
      </div>
    </SuperAdminLayout>
  );
};

export default DigitalCertificateHub;
