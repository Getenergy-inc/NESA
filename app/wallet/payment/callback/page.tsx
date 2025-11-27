'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, ArrowRight, Home } from 'lucide-react';
import walletService from '@/lib/services/walletService';

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const status = searchParams.get('status');
  const txRef = searchParams.get('tx_ref');
  const transactionId = searchParams.get('transaction_id');
  
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [purchaseData, setPurchaseData] = useState<any>(null);

  useEffect(() => {
    // Check if payment was successful based on Flutterwave callback
    if (status === 'successful' && txRef) {
      verifyPurchase(txRef);
    } else if (status === 'cancelled') {
      setVerificationStatus('error');
      setMessage('Payment was cancelled. No charges were made.');
    } else {
      setVerificationStatus('error');
      setMessage('Payment verification failed. Please contact support if you were charged.');
    }
  }, [status, txRef]);

  const verifyPurchase = async (reference: string) => {
    try {
      const response = await walletService.verifyPurchase(reference);
      
      if (response.success) {
        setVerificationStatus('success');
        setMessage(response.message || 'Purchase completed successfully!');
        setPurchaseData(response.data);
      } else {
        setVerificationStatus('error');
        setMessage(response.message || 'Purchase verification failed');
      }
    } catch (error: any) {
      setVerificationStatus('error');
      setMessage(error.message || 'Failed to verify purchase');
    }
  };

  const formatAGC = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {verificationStatus === 'loading' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Payment
            </h1>
            <p className="text-gray-600">
              Please wait while we confirm your purchase...
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Transaction ID: {transactionId}
            </p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Purchase Successful! 🎉
              </h1>
              <p className="text-gray-600">
                {message}
              </p>
            </div>

            {purchaseData && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 mb-6 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">You received</p>
                  <p className="text-4xl font-bold text-orange-600">
                    {formatAGC(purchaseData.userAgc || 0)} AGC
                  </p>
                </div>

                <div className="border-t border-orange-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total AGC Purchased</span>
                    <span className="font-semibold text-gray-900">
                      {formatAGC(purchaseData.totalAgc || 0)} AGC
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Wallet (75%)</span>
                    <span className="font-semibold text-green-600">
                      +{formatAGC(purchaseData.userAgc || 0)} AGC
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Platform Reserve (25%)</span>
                    <span className="font-semibold text-blue-600">
                      {formatAGC(purchaseData.companyAgc || 0)} AGC
                    </span>
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg p-3 mt-3">
                  <p className="text-xs text-gray-600 text-center">
                    Reference: {txRef}
                  </p>
                  {transactionId && (
                    <p className="text-xs text-gray-500 text-center mt-1">
                      Transaction ID: {transactionId}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => router.push('/member/ProfileSetting/ProfileWallet')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
              >
                View Wallet
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push('/member')}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go to Dashboard
              </button>
            </div>
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {status === 'cancelled' ? 'Payment Cancelled' : 'Payment Failed'}
              </h1>
              <p className="text-gray-600">
                {message}
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                {status === 'cancelled' 
                  ? 'You cancelled the payment. No charges have been made to your account.'
                  : 'Your payment was not completed. If you were charged, please contact support with the transaction details below.'}
              </p>
              {txRef && (
                <p className="text-xs text-red-700 mt-2 font-mono">
                  Reference: {txRef}
                </p>
              )}
              {transactionId && (
                <p className="text-xs text-red-700 mt-1 font-mono">
                  Transaction ID: {transactionId}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/member/ProfileSetting/ProfileWallet')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
              >
                Try Again
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push('/member')}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
