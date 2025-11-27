"use client";

import React, { useState } from "react";
import { Button } from "@/components/U-I/button"; 
import { Mail, Loader2 } from "lucide-react";

export default function AcceptanceLetterAutomation() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

 const handleDownloadAcceptanceLetters = async () => {
  setSending(true);        
  setStatus("idle");

  try {
    // Simulate backend PDF/ZIP generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // ---- Simulated File Blob (Replace with API response later) ----
    const fileContent = "Acceptance Letters Generated Successfully.";
    const blob = new Blob([fileContent], { type: "text/plain" });

    const url = window.URL.createObjectURL(blob);

    // Auto-download
    const link = document.createElement("a");
    link.href = url;
    link.download = "acceptance_letters.zip"; // or .pdf depending on backend
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);

    setStatus("success");
  } catch (error) {
    console.error("Error downloading acceptance letters:", error);
    setStatus("error");
  } finally {
    setSending(false);
  }
};
  // const handleSendAcceptanceLetters = async () => {
  //   setSending(true);
  //   setStatus("idle");

  //   try {
  //     // Simulate backend PDF/ZIP generation delay
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     // ---- Simulated File Blob (Replace with API response later) ----
  //     const fileContent = "Acceptance Letters Generated Successfully.";
  //     const blob = new Blob([fileContent], { type: "text/plain" });

  return (
    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 ">
            🔵 Acceptance Letter Automation
          </h3>
        </div>

        <Button className="p-2"
          onClick={handleDownloadAcceptanceLetters}
          disabled={sending}
        >
          {sending ? "Downloading..." : "Download Acceptance Letters"}
        </Button>

      </div>

      {status === "success" && (
        <p className="text-sm text-green-600 font-medium flex items-center gap-1">
          ✅ Download successful!
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-600 font-medium flex items-center gap-1">
          ❌ Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
};
