"use client";

import DashboardLayout from "@/components/UI/SuperAdmin/DashboardLayout";
import AppCard from "@/components/UI/SuperAdmin/AppCard";
import { Bell, Mail, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/U-I/button";

const NotificationsPanel = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Title */}
        <h1 className="text-2xl font-bold">📬 Notifications & Messaging</h1>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Approvals, Flags, Reviews */}
          <AppCard
            title="Approvals, Flags & Reviews"
            className="bg-blue-50 border-blue-300 text-blue-800"
          >
            <p className="text-sm mb-3">
              Track system approvals, nominee flags, and volunteer reviews.
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
              Automatically notify nominees once they are publicly nominated.
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
              Send bulk messages to judges, volunteers, or nominees.
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
              Deliver updates via Email, WhatsApp, or in-app dashboard alerts.
            </p>
            <Button
              className="px-3 py-1 text-sm flex items-center justify-center gap-2"
              variant="secondary"
            >
              <MessageSquare className="w-4 h-4" /> Manage Channels
            </Button>
          </AppCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPanel;
