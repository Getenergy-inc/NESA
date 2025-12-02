"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function NomineeAcceptPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Invalid acceptance link</h2>
        <p>No token provided. Please use the link sent to your email.</p>
      </div>
    );
  }

  const handleAction = async (action: "accept" | "decline") => {
    setLoading(true);
    setError(null);
    setMessage(null);

    let declineReason: string | undefined;
    if (action === "decline") {
      declineReason = window.prompt("Please provide a reason for declining (optional):") || undefined;
    }

    try {
      const res = await fetch(`${API_BASE}/api/v1/nominees/accept-nomination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, action, declineReason }),
      });

      const body = await res.json();

      if (!res.ok) {
        setError(body?.message || "Failed to process request");
        setLoading(false);
        return;
      }

      setMessage(body?.message || `Nomination ${action}ed successfully`);
      setLoading(false);

      // Optionally redirect to a confirmation page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Respond to Nomination</h2>
      <p>Please accept or decline the nomination using the buttons below.</p>

      {message && <div style={{ color: "green", margin: "12px 0" }}>{message}</div>}
      {error && <div style={{ color: "red", margin: "12px 0" }}>{error}</div>}

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => handleAction("accept")} disabled={loading}>
          {loading ? "Processing..." : "Accept Nomination"}
        </button>
        <button onClick={() => handleAction("decline")} disabled={loading}>
          {loading ? "Processing..." : "Decline Nomination"}
        </button>
      </div>
    </div>
  );
}
