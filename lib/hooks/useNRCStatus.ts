"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/lib/context/AuthContext";
import nrcService from "@/lib/services/nrcService";

export interface NRCApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  motivation: string;
  experience: string;
  availability: string;
  skills: string[];
  commitment: boolean;
  terms: boolean;
  applicationDate: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  reviewDate?: string;
  reviewNotes?: string;
}

export interface NRCVolunteer {
  id: string;
  applicationId: string;
  fullName: string;
  email: string;
  country: string;
  approvalDate: string;
  nomineesUploaded: number;
  targetNominees: number;
  completionRate: number;
  lastActive: string;
  status: "active" | "inactive";
}

export interface NRCStatus {
  loading: boolean;
  hasApplication: boolean;
  application?: NRCApplication;
  isApproved: boolean;
  isPending: boolean;
  isRejected: boolean;
  volunteer?: NRCVolunteer;
  canAccessDashboard: boolean;
  refresh: () => Promise<void>;
}

export const useNRCStatus = (): NRCStatus => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [hasApplication, setHasApplication] = useState(false);
  const [application, setApplication] = useState<NRCApplication | undefined>();
  const [isApproved, setIsApproved] = useState(false);
  const [volunteer, setVolunteer] = useState<NRCVolunteer | undefined>();

  const checkStatus = async () => {
    console.log("NRC Status Check - User object:", user);

    const userId = user?.id || user?.userId;

    if (!userId) {
      console.log(
        "NRC Status Check - No userId found, setting loading to false"
      );
      setLoading(false);
      return;
    }

    console.log("NRC Status Check - Using userId:", userId);
    setLoading(true);

    try {
      // Use the dedicated checkVolunteerStatus endpoint
      const statusResponse = await nrcService.checkVolunteerStatus();

      if (statusResponse.success && statusResponse.data) {
        const status = statusResponse.data;

        if (status.isVolunteer && status.profile) {
          setHasApplication(true);
          setIsApproved(status.status === "active");

          setVolunteer({
            id: status.profile.id,
            applicationId: status.profile.id, // Using volunteer ID as application ID
            fullName: status.profile.fullName,
            email: status.profile.email,
            country: status.profile.country,
            approvalDate: status.profile.joinedAt,
            nomineesUploaded: status.profile.totalUploads,
            targetNominees: 200, // Default target
            completionRate: status.profile.completionRate,
            lastActive: status.profile.lastActiveAt,
            status: status.profile.isActive ? "active" : "inactive",
          });

          // Create application data from profile
          setApplication({
            id: status.profile.id,
            fullName: status.profile.fullName,
            email: status.profile.email,
            phone: status.profile.phone,
            country: status.profile.country,
            motivation: "NRC Volunteer Application",
            experience: "Approved volunteer",
            availability: "Active",
            skills: ["Research", "Data Collection"],
            commitment: true,
            terms: true,
            applicationDate: status.profile.joinedAt,
            status: status.profile.isActive ? "approved" : "rejected",
          });
        } else {
          // User is not an NRC volunteer
          setHasApplication(false);
          setIsApproved(false);
          setApplication(undefined);
          setVolunteer(undefined);
        }
      } else {
        // API call failed or returned no data
        setHasApplication(false);
        setIsApproved(false);
        setApplication(undefined);
        setVolunteer(undefined);
      }
    } catch (error) {
      console.error("Error checking NRC status:", error);
      // On error, assume no volunteer status
      setHasApplication(false);
      setIsApproved(false);
      setApplication(undefined);
      setVolunteer(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log(
        "NRC Status Check - Timeout reached, forcing loading to false"
      );
      setLoading(false);
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [user]);

  const isPending = hasApplication && application?.status === "pending";
  const isRejected = hasApplication && application?.status === "rejected";
  const canAccessDashboard = isApproved && !!volunteer;

  return {
    loading,
    hasApplication,
    application,
    isApproved,
    isPending,
    isRejected,
    volunteer,
    canAccessDashboard,
    refresh: checkStatus,
  };
};
