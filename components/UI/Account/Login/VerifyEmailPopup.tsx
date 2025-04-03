// components/UI/Account/Login/VerifyEmailPopup.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface VerifyEmailPopupProps {
  email: string;
  onClose: () => void;
  message: string;
  isSuccess: boolean;
}

const VerifyEmailPopup: React.FC<VerifyEmailPopupProps> = ({ email, onClose, message, isSuccess }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

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

      if (value && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleVerify = () => {
    console.log('Verifying OTP:', otp.join(''));
    // Add your OTP verification logic here
  };

  const handleResendOtp = () => {
    console.log('Resending OTP');
    setTimeLeft(45);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
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
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
              {isSuccess ? "Success" : "Verify Email Address"}
            </h2>
            <p className="text-xs sm:text-sm text-center mb-4 sm:mb-6">
              {message}
            </p>
            {!isSuccess && (
              <>
                <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-2xl border border-gray-300 rounded-lg focus:border-[#FFC247] focus:outline-none bg-white"
                    />
                  ))}
                </div>
                <div className="text-center mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm text-gray-600 bg-[#FFC247] px-2 sm:px-3 py-1 rounded-full">
                    {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, '0')}` : '00:00'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-center mb-4 sm:mb-6">
                  Didn't receive the code?{' '}
                  <button
                    onClick={handleResendOtp}
                    className="text-[#FFC247] hover:underline focus:outline-none font-bold"
                  >
                    Resend OTP
                  </button>
                </p>
                <button
                  onClick={handleVerify}
                  className="bg-[#FFC247] text-black font-bold py-2 sm:py-3 px-4 rounded-lg w-full hover:bg-[#E48900] transition-colors duration-300 text-sm sm:text-base"
                >
                  Verify
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="bg-[#FFC247] text-black font-bold py-2 sm:py-3 px-4 rounded-lg w-full hover:bg-[#E48900] transition-colors duration-300 text-sm sm:text-base mt-4"
            >
              {isSuccess ? "Go to Homepage" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPopup;