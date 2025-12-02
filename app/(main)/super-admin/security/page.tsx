"use client";

import React from "react";
import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import AppCard from "@/components/UI/SuperAdmin/AppCard";

import {
  ShieldCheck,
  LockKeyhole,
  Users,
  Eye,
  BadgeCheck,
  FileSearch,
  KeyRound,
} from "lucide-react";

import { Button } from "@/components/U-I/button";

const SecurityCompliancePanel = () => {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
          Security & Compliance Center
        </h1>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* RBAC Controls */}
          <AppCard
            title="Role-Based Access Control (RBAC)"
            className="bg-red-50 border border-red-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Manage permissions for admins, judges, volunteers, and financial
              controllers. Enforce strict access for sensitive modules.
            </p>
            <Button variant="secondary" className="flex items-center gap-2 p-2">
              <Users className="w-4 h-4" /> Manage Roles & Permissions
            </Button>
          </AppCard>

          {/* 2FA Enforcement */}
          <AppCard
            title="Two-Factor Authentication (2FA)"
            className="bg-red-50 border border-red-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Enforce mandatory 2FA for financial admins, judges, and approval
              officers.
            </p>
            <Button variant="secondary" className="flex items-center gap-2 p-2">
              <KeyRound className="w-4 h-4" /> Configure 2FA Rules
            </Button>
          </AppCard>

          {/* GDPR / NDPR */}
          <AppCard
            title="GDPR / NDPR Compliance"
            className="bg-red-50 border border-red-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Ensure data protection and privacy compliance for user data,
              nominees, and voting activities.
            </p>
            <Button variant="secondary" className="flex items-center gap-2 p-2">
              <ShieldCheck className="w-4 h-4" /> View Compliance Settings
            </Button>
          </AppCard>

          {/* Security Logs */}
          <AppCard
            title="Security Logs & Monitoring"
            className="bg-red-50 border border-red-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Monitor suspicious login attempts, admin changes, and user access
              audit trails.
            </p>
            <Button variant="secondary" className="flex items-center gap-2 p-2">
              <Eye className="w-4 h-4" /> View Security Logs
            </Button>
          </AppCard>

          {/* Multi-Admin Approval */}
          <AppCard
            title="Multi-Admin Approval (Financial Policies)"
            className="bg-red-50 border border-red-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Protect revenue split changes and financial rules. Requires
              approval from at least 2–3 high-level admins.
            </p>
            <Button variant="secondary" className="flex items-center gap-2 p-2">
              <LockKeyhole className="w-4 h-4" /> Configure Approval Flows
            </Button>
          </AppCard>

          {/* External Compliance Audit Logs */}
          <AppCard
            title="External Audit & Compliance Logs"
            className="bg-red-50 border border-red-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Provide immutable logs for auditors. Includes timestamps,
              signatures, and system integrity checks.
            </p>
            <Button variant="secondary" className="flex items-center gap-2 p-2">
              <FileSearch className="w-4 h-4" /> Open Audit Logs
            </Button>
          </AppCard>

        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default SecurityCompliancePanel;
