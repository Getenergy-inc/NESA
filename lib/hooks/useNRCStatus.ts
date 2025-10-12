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

    // For NRC, prioritize localStorage userId over authenticated user
    let userId = "";

    if (typeof window !== "undefined") {
      userId = localStorage.getItem("nrc_user_id") || "";
    }

    // If no NRC userId in localStorage, this user hasn't registered for NRC yet
    if (!userId) {
      console.log(
        "NRC Status Check - No NRC userId found in localStorage, user not registered for NRC"
      );
      setLoading(false);
      return;
    }

    console.log("NRC Status Check - Using NRC userId:", userId);
    setLoading(true);

    try {
      // Use the dedicated checkVolunteerStatus endpoint with userId
      const statusResponse = await nrcService.checkVolunteerStatus(userId);

      if (
        statusResponse.success &&
        statusResponse.data &&
        statusResponse.data.profile
      ) {
        const profile = statusResponse.data.profile;

        setHasApplication(true);
        setIsApproved(profile.status === "ACTIVE");

        setVolunteer({
          id: profile.id,
          applicationId: profile.applicationId || profile.id,
          fullName: profile.fullName,
          email: profile.email,
          country: profile.country,
          approvalDate: profile.approvalDate,
          nomineesUploaded: profile.nomineesUploaded || 0,
          targetNominees: profile.targetNominees || 200,
          completionRate: profile.completionRate || 0,
          lastActive: profile.lastActive,
          status: profile.status === "ACTIVE" ? "active" : "inactive",
        });

        // Create application data from profile
        setApplication({
          id: profile.applicationId || profile.id,
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone || "",
          country: profile.country,
          motivation: "NRC Volunteer Application",
          experience: "Approved volunteer",
          availability: "Active",
          skills: ["Research", "Data Collection"],
          commitment: true,
          terms: true,
          applicationDate: profile.approvalDate,
          status: profile.status === "ACTIVE" ? "approved" : "rejected",
        });
      } else {
        // User is not an NRC volunteer
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
