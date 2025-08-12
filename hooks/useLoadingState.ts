import { useLoading } from "@/lib/context/LoadingContext";

/**
 * Custom hook for managing loading states with predefined messages
 */
export const useLoadingState = () => {
  const { showLoading, hideLoading, setLoadingMessage, isLoading } = useLoading();

  const loadingStates = {
    // Page loading states
    pageLoad: () => showLoading("Loading NESA Africa..."),
    pageRefresh: () => showLoading("Refreshing page..."),
    navigation: () => showLoading("Navigating..."),
    
    // Form submission states
    submitting: () => showLoading("Submitting..."),
    saving: () => showLoading("Saving changes..."),
    uploading: () => showLoading("Uploading file..."),
    
    // API call states
    fetching: () => showLoading("Fetching data..."),
    processing: () => showLoading("Processing request..."),
    authenticating: () => showLoading("Authenticating..."),
    
    // Nomination specific states
    nominating: () => showLoading("Submitting nomination..."),
    voting: () => showLoading("Casting your vote..."),
    loadingNominees: () => showLoading("Loading nominees..."),
    
    // Payment states
    processing_payment: () => showLoading("Processing payment..."),
    verifying_payment: () => showLoading("Verifying payment..."),
    
    // Custom loading state
    custom: (message: string) => showLoading(message),
  };

  return {
    ...loadingStates,
    hideLoading,
    setLoadingMessage,
    isLoading,
  };
};

export default useLoadingState;
