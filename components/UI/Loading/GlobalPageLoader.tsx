"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageLoader } from "./index";
import { useLoading } from "@/lib/context/LoadingContext";

const GlobalPageLoader: React.FC = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageLoadingMessage, setPageLoadingMessage] = useState("Loading NESA Africa...");
  const pathname = usePathname();

  // Use loading context for manual loading states
  const { isLoading: contextLoading, loadingMessage: contextMessage } = useLoading();

  // Handle initial page load
  useEffect(() => {
    const handlePageLoad = () => {
      // Show loader for at least 1.5 seconds for smooth experience
      setTimeout(() => {
        setIsPageLoading(false);
      }, 1500);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      // Wait for page to load
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  // Handle route changes
  useEffect(() => {
    setIsPageLoading(true);
    setPageLoadingMessage("Loading page...");

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle page refresh detection
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsPageLoading(true);
      setPageLoadingMessage("Refreshing page...");
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Page became visible again (could be from refresh)
        setIsPageLoading(true);
        setPageLoadingMessage("Loading NESA Africa...");
        setTimeout(() => setIsPageLoading(false), 1000);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Determine which loading state to show
  const isLoading = isPageLoading || contextLoading;
  const loadingMessage = contextLoading ? contextMessage : pageLoadingMessage;

  return <PageLoader isLoading={isLoading} message={loadingMessage} />;
};

export default GlobalPageLoader;
