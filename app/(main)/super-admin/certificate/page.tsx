"use client";

import { useState } from "react";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import AppCard from "@/components/UI/SuperAdmin/AppCard";
import AppTable from "@/components/UI/SuperAdmin/AppTable";
import AppButton from "@/components/UI/SuperAdmin/AppButton";
import { FileText, CheckCircle, RefreshCcw, Download } from "lucide-react";

const DigitalCertificateHub = () => {
  const [certificates, setCertificates] = useState([
    { id: 1, type: "Nomination", status: "Requested" },
    { id: 2, type: "Recognition", status: "Approved" },
    { id: 3, type: "Judge Service", status: "Downloaded" },
    { id: 4, type: "Volunteer Service", status: "Requested" },
  ]);

  const handleGenerate = (type: string) => {
    alert(`Generating ${type} Certificate...`);
  };

  const handleDownload = (id: number) => {
    alert(`Downloading certificate ID: ${id}`);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "type", label: "Certificate Type" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const data = certificates.map((cert) => ({
    ...cert,
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
    action: (
      <AppButton
        label="Download"
        icon={Download}
        size="sm"
        variant="secondary"
        onClick={() => handleDownload(cert.id)}
      />
    ),
  }));

  return (
    <SuperAdminLayout>
        <div className="space-y-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">Digital Certificate Hub</h1>
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

      {/* Status Tracker Table */}
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
