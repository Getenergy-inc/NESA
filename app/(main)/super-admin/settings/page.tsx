"use client";
import React from "react";

import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import AppCard from "@/components/UI/SuperAdmin/AppCard";
import { Clock, Gift, Server, Plug, FileSearch, Settings } from "lucide-react";
import { Button } from "@/components/U-I/button";

const SystemSettingsPanel = () => {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
          System Settings & Integrations
        </h1>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Voting Period Management */}
          <AppCard
            title="Voting Period Management"
            className="bg-blue-50 border border-blue-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Configure start & end dates for all nomination, review, and voting phases.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <Clock className="w-4 h-4" /> Manage Voting Periods
            </Button>
          </AppCard>

          {/* Bonus Campaigns */}
          <AppCard
            title="Bonus Campaigns"
            className="bg-blue-50 border border-blue-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Configure referral rewards, bonus AGC payouts, and engagement incentives.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <Gift className="w-4 h-4" /> Configure Campaigns
            </Button>
          </AppCard>

          {/* API Logs */}
          <AppCard
            title="API Logs"
            className="bg-blue-50 border border-blue-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Monitor wallet APIs, voting engine calls, settlements, payouts, and system errors.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <Server className="w-4 h-4" /> View Logs
            </Button>
          </AppCard>

          {/* Payment & Partner Integrations */}
          <AppCard
            title="Partner & Payment Integrations"
            className="bg-blue-50 border border-blue-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Connect to Eventbrite, Flutterwave, LemFi, and TapTap Send for payments,
              donations, and event processing.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <Plug className="w-4 h-4" /> Manage Integrations
            </Button>
          </AppCard>

          {/* Audit Trail */}
          <AppCard
            title="Audit Trail & Logs"
            className="bg-blue-50 border border-blue-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Track all system changes, reviewer actions, settlements, API calls, and admin logs.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <FileSearch className="w-4 h-4" /> Open Audit Trail
            </Button>
          </AppCard>

          {/* 🔴 NEW – Revenue Policy Configurator */}
          <AppCard
            title="Revenue Policy Configurator"
            className="bg-blue-50 border border-blue-200"
          >
            <p className="text-sm text-gray-600 mb-3">
              Adjust platform-wide revenue splits (commissions, chapters, referrals, HQ funds).  
              <br />
              <strong>⚠ Requires multi-admin approval before activation.</strong>
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <Settings className="w-4 h-4" /> Configure Revenue Policy
            </Button>
          </AppCard>

        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default SystemSettingsPanel;
