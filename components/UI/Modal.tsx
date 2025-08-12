"use client";

import React from "react";
import { useModal } from "@/lib/store/modal";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ThumbsUp, AlertCircle } from "lucide-react";

type ModalType = "success" | "error" | "info" | "vote";

interface ModalConfig {
  icon: React.ReactNode;
  iconColor: string;
  bgColor: string;
  textColor: string;
  buttonStyle: string;
}

const Modal: React.FC = () => {
  const { visible, content, type, hideModal } = useModal();

  if (!visible) return null;

  const modalConfig: Record<ModalType, ModalConfig> = {
    success: {
      icon: <CheckCircle className="w-12 h-12" />,
      iconColor: "text-green-600",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      buttonStyle: "bg-green-600 text-white hover:bg-green-700"
    },
    error: {
      icon: <XCircle className="w-12 h-12" />,
      iconColor: "text-red-600",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      buttonStyle: "bg-red-600 text-white hover:bg-red-700"
    },
    info: {
      icon: <AlertCircle className="w-12 h-12" />,
      iconColor: "text-blue-600",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700"
    },
    vote: {
      icon: <ThumbsUp className="w-12 h-12" />,
      iconColor: "text-deepGold",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      buttonStyle: "bg-deepGold text-black hover:bg-deepGold/90"
    },
  };

  const currentConfig = modalConfig[type || "info"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`${currentConfig.bgColor} rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100`}
      >
        {/* Header with icon */}
        <div className={`flex flex-col items-center py-6 px-6 ${currentConfig.iconColor}`}>
          <div className="mb-4">{currentConfig.icon}</div>
          <h3 className={`text-xl font-bold ${currentConfig.textColor}`}>
            {type === "success" && "Success!"}
            {type === "error" && "Oops!"}
            {type === "vote" && "Thank You!"}
            {type === "info" && "Notice"}
          </h3>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className={`text-center mb-6 ${currentConfig.textColor}`}>
            {content}
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={hideModal}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${currentConfig.buttonStyle}`}
            >
              {type === "vote" ? "Continue" : "OK"}
            </button>
          </div>
        </div>

        {/* Close Button (X) - Gold themed for vote, gray for others */}
        <button
          onClick={hideModal}
          className={`absolute top-4 right-4 ${
            type === "vote" ? "text-deepGold hover:text-deepGold/80" : "text-gray-400 hover:text-gray-600"
          } transition-colors`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;