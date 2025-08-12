// ForgotPasswordPage.tsx
"use client";
import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { MdLocationPin } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth"; // Ensure this points to the .ts file

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await resetPassword(email);

      if (response.status === 200) {
        setSuccessMessage(response.message);
      } else {
        setFormError(response.message || "Failed to reset password. Please try again.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left side with background image */}
      <div className="w-full md:w-2/5 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Hero section.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-10">
          <div>
            <Image
              src="/images/NESA logo_UPDATED 1.png"
              alt="NEW EDUCATION STANDARD AWARDS AFRICA"
              width={150}
              height={75}
              className="mb-4"
            />
          </div>
          <div className="flex justify-center items-center flex-grow">
            <Image
              src="/images/NESA Logo 2.png"
              alt="NESA Badge"
              width={250}
              height={250}
              className="max-w-full h-auto"
            />
          </div>
          <div className="text-sm">
            <p className="mb-2 flex items-center">
              <MdLocationPin className="mr-2" /> 19 Godwin Okigbo Street, Masha Kilo, bus stop, Surulere,
              Lagos
            </p>
            <p className="mb-2 flex items-center">
              <Phone className="mr-2" /> +234-907-962-1110
            </p>
            <p className="mb-2 flex items-center">
              <Phone className="mr-2" /> +234-810-976-5897
            </p>
            <p className="flex items-center">
              <Mail className="mr-2" /> nesa.africa@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-3/5 p-6 md:p-12 bg-white">
        <div className="max-w-md mx-auto">
          <button
            className="flex items-center text-gray-600 mb-8"
            onClick={() => router.back()}
          >
            <FiArrowLeftCircle className="text-3xl mr-2" />
            <span className="ml-2">Back</span>
          </button>
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-600 mb-8">
            Enter your email address to reset your password
          </p>

          {formError && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {formError}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full p-3 rounded-lg bg-[#FFF9ED] border border-[#FFC247] focus:border-[#E48900] focus:outline-none"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormError("");
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#FFC247] text-black font-bold py-3 px-4 rounded-lg w-full hover:bg-[#E48900] transition-colors duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;