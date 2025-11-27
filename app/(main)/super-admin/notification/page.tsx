"use client";

import SuperAdminLayout from "@/components/UI/SuperAdmin/SuperAdminLayout";
import AppCard from "@/components/UI/SuperAdmin/AppCard"
import { Bell, Mail, Users, MessageSquare, Wallet } from "lucide-react";
import { Button } from "@/components/U-I/button";

const NotificationsPanel = () => {
  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ea580c] bg-clip-text text-transparent">
          Notifications & Messaging
        </h1>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Approvals, Flags, Reviews */}
          <AppCard
            title="Approvals, Flags & Reviews"
            className="bg-blue-50 border-blue-300 text-blue-800"
          >
            <p className="text-sm mb-3">
              System-generated alerts for nominations, reviews, flags, and approvals.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <Bell className="w-4 h-4" /> View Activity
            </Button>
          </AppCard>

          {/* Auto-Notify Nominees */}
          <AppCard
            title="Auto-Notify Nominees"
            className="bg-blue-50 border-blue-300 text-blue-800"
          >
            <p className="text-sm mb-3">
              Automatically notify nominees once they’re publicly nominated.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <Mail className="w-4 h-4" /> Configure Auto-Notify
            </Button>
          </AppCard>

          {/* Bulk Messaging */}
          <AppCard
            title="Bulk Messaging"
            className="bg-blue-50 border-blue-300 text-blue-800"
          >
            <p className="text-sm mb-3">
              Send bulk messages to judges, volunteers, nominees, or chapter admins.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <Users className="w-4 h-4" /> Send Bulk Message
            </Button>
          </AppCard>

          {/* Multi-Channel Notifications */}
          <AppCard
            title="Multi-Channel Notifications"
            className="bg-blue-50 border-blue-300 text-blue-800"
          >
            <p className="text-sm mb-3">
              Deliver updates via Email, WhatsApp, SMS, and in-app dashboard alerts.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <MessageSquare className="w-4 h-4" /> Manage Channels
            </Button>
          </AppCard>

          {/* 🔴 NEW FINANCE ALERTS */}
          <AppCard
            title="Finance Alerts (New)"
            className="bg-green-50 border-green-300 text-green-800"
          >
            <p className="text-sm mb-3">
              Alerts for chapter settlements, ambassador referral credits, and commission payouts.
            </p>

            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <Wallet className="w-4 h-4" /> View Finance Alerts
            </Button>
          </AppCard>

        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default NotificationsPanel;
