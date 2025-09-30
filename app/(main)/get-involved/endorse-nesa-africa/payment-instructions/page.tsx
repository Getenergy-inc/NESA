"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, ArrowLeft, CreditCard, Building2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Common/Button';

const PaymentInstructionsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const endorsementId = searchParams.get('endorsementId');

  useEffect(() => {
    if (endorsementId) {
      fetchPaymentData();
    } else {
      setLoading(false);
    }
  }, [endorsementId]);

  const fetchPaymentData = async () => {
    try {
      const response = await fetch(`/api/endorse/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endorsementId,
          paymentMethod: 'bank_transfer'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPaymentData(data);
      } else {
        console.error('Failed to get payment data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const bankDetails = paymentData?.payment?.bank_details || {
    bank_name: 'Access Bank PLC',
    account_name: 'NESA-Africa',
    account_number: '1234567890',
    swift_code: 'ABNGNGLA',
    branch: 'Lagos Main Branch'
  };

  const paymentInfo = paymentData?.payment || {
    amount: 0,
    currency: 'USD',
    reference: 'NESA-END-XXXXXX'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment instructions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#17120a] via-[#1a140b] to-[#17120a] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-[#ea580c] rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Complete Your Payment</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Follow the instructions below to complete your bank transfer payment for NESA-Africa endorsement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Instructions */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Bank Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-[#ea580c]" />
                <h2 className="text-xl font-bold text-gray-900">Bank Transfer Details</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-mono">{bankDetails.bank_name}</span>
                    <button
                      onClick={() => copyToClipboard(bankDetails.bank_name, 'bank')}
                      className="text-[#ea580c] hover:text-[#dc2626] p-1"
                    >
                      {copied === 'bank' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-mono">{bankDetails.account_name}</span>
                    <button
                      onClick={() => copyToClipboard(bankDetails.account_name, 'account')}
                      className="text-[#ea580c] hover:text-[#dc2626] p-1"
                    >
                      {copied === 'account' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-mono text-lg font-bold">{bankDetails.account_number}</span>
                    <button
                      onClick={() => copyToClipboard(bankDetails.account_number, 'number')}
                      className="text-[#ea580c] hover:text-[#dc2626] p-1"
                    >
                      {copied === 'number' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">SWIFT Code</label>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-mono">{bankDetails.swift_code}</span>
                    <button
                      onClick={() => copyToClipboard(bankDetails.swift_code, 'swift')}
                      className="text-[#ea580c] hover:text-[#dc2626] p-1"
                    >
                      {copied === 'swift' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >

              {/* Amount & Reference */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-[#ea580c]/5 border border-[#ea580c]/20 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Transfer</label>
                    <div className="text-2xl font-bold text-[#ea580c]">
                      ${paymentInfo.amount?.toLocaleString() || '0'} {paymentInfo.currency}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Reference</label>
                    <div className="flex items-center justify-between">
                      <span className=" font-mono font-bold text-blue-600">
                        {paymentInfo.reference}
                      </span>
                      <button
                        onClick={() => copyToClipboard(paymentInfo.reference, 'reference')}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        {copied === 'reference' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Include this reference in your transfer description
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Important Instructions</h3>

                <div className="space-y-3">
                  {paymentData?.payment?.instructions?.map((instruction: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#ea580c] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-sm">{instruction}</p>
                    </div>
                  )) || (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#ea580c] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                        <p className="text-gray-700 text-sm">Transfer the exact amount to the account details provided</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#ea580c] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                        <p className="text-gray-700 text-sm">Include the payment reference in your transfer description</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#ea580c] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                        <p className="text-gray-700 text-sm">Payment processing may take 1-3 business days</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#ea580c] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                        <p className="text-gray-700 text-sm">You will receive a confirmation email once payment is verified</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-lg font-bold text-yellow-800">Payment Status: Pending</h3>
                </div>
                <p className="text-yellow-700 text-sm">
                  Your endorsement is saved and waiting for payment verification.
                  We'll notify you once your payment is confirmed.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved/endorse-nesa-africa">
                <Button
                  text="Back to Endorsement Page"
                  variant="outlined"
                  className="border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white px-8 py-3"
                  icon={<ArrowLeft className="w-5 h-5" />}
                />
              </Link>

              <Button
                text="Contact Support"
                variant="filled"
                onClick={() => window.open('mailto:endorse@nesa.africa', '_blank')}
                className="bg-[#ea580c] hover:bg-[#dc2626] text-white px-8 py-3"
              />
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>Questions? Contact us at <a href="mailto:endorse@nesa.africa" className="text-[#ea580c] hover:underline">endorse@nesa.africa</a></p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PaymentInstructionsPage;