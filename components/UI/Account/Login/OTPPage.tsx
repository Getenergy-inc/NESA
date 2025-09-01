"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAuthContext } from "@/lib/context/AuthContext";
import { ERROR_MESSAGES, createAuthError } from '@/lib/types/errors';
import ErrorDisplay, { SuccessMessage } from '@/components/Common/ErrorDisplay';

const OTPPage: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""; // Get email from query params
  const { verifyEmail } = useAuthContext();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]); // 6-digit OTP
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [error, setError] = useState<string>("");
  const [networkError, setNetworkError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const maxAttempts = 5;

  // Initialize refs for each OTP input
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    setError("");
    setNetworkError("");

    // Check attempt limit
    if (attemptCount >= maxAttempts) {
      setError(ERROR_MESSAGES.TOO_MANY_ATTEMPTS);
      return;
    }

    if (enteredOtp.length !== 6) {
      setError("Please enter a complete 6-digit code");
      return;
    }

    // Check if OTP has expired
    if (timeLeft <= 0) {
      setError(ERROR_MESSAGES.OTP_EXPIRED);
      return;
    }

    try {
      setIsVerifying(true);
      setAttemptCount(prev => prev + 1);

      const response = await verifyEmail(email, enteredOtp); // Use auth context method

      if (response.token) {
        setSuccessMessage("OTP verified successfully! Redirecting...");
        setAttemptCount(0); // Reset attempt count on success
        setTimeout(() => {
          // Redirect to dashboard after successful verification
          const searchParams = new URLSearchParams(window.location.search);
          const redirect = searchParams.get("redirect");
          if (redirect) {
            window.location.href = redirect;
          } else {
            window.location.href = "/dashboard";
          }
        }, 1000);
      } else {
        setError(ERROR_MESSAGES.OTP_INVALID);
      }
    } catch (err: any) {
      if (err.message?.toLowerCase().includes('network') || err.message?.toLowerCase().includes('timeout')) {
        setNetworkError(ERROR_MESSAGES.NETWORK_ERROR);
      } else if (err.message?.toLowerCase().includes('expired')) {
        setError(ERROR_MESSAGES.OTP_EXPIRED);
      } else if (err.message?.toLowerCase().includes('invalid')) {
        setError(ERROR_MESSAGES.OTP_INVALID);
      } else {
        setError(ERROR_MESSAGES.UNKNOWN_ERROR);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0 && timeLeft < 300) return;

    setIsResending(true);
    setError("");
    setNetworkError("");

    try {
      // Mock API call - replace with real service
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate network errors occasionally
          if (Math.random() < 0.1) {
            reject(new Error('Network timeout'));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      setTimeLeft(300);
      setOtp(["", "", "", "", "", ""]);
      setAttemptCount(0); // Reset attempt count
      setSuccessMessage("New verification code sent successfully!");
      inputRefs.current[0]?.focus();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      if (err.message?.toLowerCase().includes('network') || err.message?.toLowerCase().includes('timeout')) {
        setNetworkError(ERROR_MESSAGES.NETWORK_ERROR);
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-5xl h-[80vh] max-h-[600px] overflow-hidden rounded-lg">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Frame.png"
            alt="Popup Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="bg-[#FBF3E2] p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-[90%] sm:max-w-[80%] md:max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">Verify Email Address</h2>
            <p className="text-xs sm:text-sm text-center mb-4 sm:mb-6">
              Enter the 6 digit code we just sent to {email}
            </p>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4">
                <SuccessMessage
                  message={successMessage}
                  onDismiss={() => setSuccessMessage("")}
                />
              </div>
            )}

            {/* Error Messages */}
            {(error || networkError) && (
              <div className="mb-4">
                <ErrorDisplay
                  error={error || networkError}
                  onRetry={networkError ? handleResendOtp : undefined}
                  onDismiss={() => {
                    setError('');
                    setNetworkError('');
                  }}
                />
              </div>
            )}

            {/* Attempt Warning */}
            {attemptCount >= 3 && attemptCount < maxAttempts && (
              <div className="mb-4">
                <ErrorDisplay
                  error={`Warning: ${maxAttempts - attemptCount} attempts remaining before account is temporarily locked.`}
                />
              </div>
            )}

            <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el; // Assign refs dynamically
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={(e) => {
                    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
                    if (paste.length === 6) {
                      setOtp(paste.split(""));
                      setError("");
                      setTimeout(() => {
                        inputRefs.current[5]?.focus();
                      }, 0);
                      e.preventDefault();
                    }
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-2xl border border-gray-300 rounded-lg focus:border-[#FFC247] focus:outline-none bg-white"
                />
              ))}
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                {successMessage}
              </div>
            )}
            <div className="text-center mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-gray-600 bg-[#FFC247] px-2 sm:px-3 py-1 rounded-full">
                {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, "0")}` : "00:00"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-center mb-4 sm:mb-6">
              Didn't receive the code?{" "}
              <button
                onClick={handleResendOtp}
                disabled={(timeLeft > 0 && timeLeft < 300) || isResending}
                className={`text-[#FFC247] hover:underline focus:outline-none font-bold ${
                  timeLeft > 0 && timeLeft < 300 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            </p>
            <button
              onClick={handleVerify}
              disabled={otp.join("").length !== 6 || isVerifying}
              className={`bg-[#FFC247] text-black font-bold py-2 sm:py-3 px-4 rounded-lg w-full hover:bg-[#E48900] transition-colors duration-300 text-sm sm:text-base ${
                otp.join("").length !== 6 || isVerifying ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;