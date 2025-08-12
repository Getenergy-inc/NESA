'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeftCircle, FiCheck, FiCreditCard, FiDollarSign, FiGlobe, FiMail, FiPhone } from 'react-icons/fi';
import { SponsorFormData } from './SponsorFormWrapper';

const paymentMethods = [
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Direct bank transfer (Local & International)',
    icon: FiDollarSign,
    currencies: ['USD', 'NGN', 'GBP', 'EUR'],
    processingTime: '1-3 business days'
  },
  {
    id: 'card-payment',
    name: 'Card Payment',
    description: 'Visa/MasterCard via secure gateway',
    icon: FiCreditCard,
    currencies: ['USD'],
    processingTime: 'Instant'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Secure PayPal payment',
    icon: FiGlobe,
    currencies: ['USD'],
    processingTime: 'Instant'
  },
  {
    id: 'mobile-money',
    name: 'Mobile Money',
    description: 'MTN, Airtel, M-Pesa, Orange',
    icon: FiPhone,
    currencies: ['Local currencies'],
    processingTime: 'Instant'
  },
  {
    id: 'other-gateways',
    name: 'Other Gateways',
    description: 'Stripe, Flutterwave, Paystack, Zelle, Venmo',
    icon: FiGlobe,
    currencies: ['USD', 'NGN'],
    processingTime: 'Instant'
  }
];

export default function PaymentStep({
  formData,
  onBack,
  onSubmit
}: {
  formData: SponsorFormData;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 2000);
  };

  const { selectedPlan } = formData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-6">
            <FiArrowLeftCircle className="text-2xl mr-2" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Sponsorship</h1>
            <p className="text-gray-600">
              Choose your preferred payment method to finalize your sponsorship
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sponsorship Summary</h2>
              
              {selectedPlan && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${selectedPlan.color} text-white mr-4`}>
                      <selectedPlan.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedPlan.name}</h3>
                      <p className="text-sm text-gray-600">{selectedPlan.badge}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Sponsorship Amount:</span>
                      <span className="font-semibold text-gray-900">
                        ${selectedPlan.price.toLocaleString()}
                      </span>
                    </div>
                    {selectedPlan.priceRange && (
                      <p className="text-xs text-gray-500 mb-2">{selectedPlan.priceRange}</p>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {selectedPlan.details.slice(0, 4).map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <FiCheck className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                      {selectedPlan.details.length > 4 && (
                        <li className="text-sm text-gray-500 italic">
                          +{selectedPlan.details.length - 4} more benefits
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Contact Information:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Company:</strong> {formData.company_name}</p>
                  <p><strong>Contact:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>
              
              <div className="space-y-4 mb-8">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.01 }}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-4 ${
                          selectedPaymentMethod === method.id
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <method.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <span className="mr-4">
                              <strong>Currencies:</strong> {method.currencies.join(', ')}
                            </span>
                            <span>
                              <strong>Processing:</strong> {method.processingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedPaymentMethod === method.id
                          ? 'bg-yellow-500 border-yellow-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedPaymentMethod === method.id && (
                          <FiCheck className="w-3 h-3 text-white m-0.5" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Payment Instructions */}
              {selectedPaymentMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                >
                  <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
                  <div className="text-sm text-blue-800">
                    {selectedPaymentMethod === 'bank-transfer' && (
                      <div>
                        <p className="mb-2">After submitting this form, you will receive:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Official bank details for wire transfer</li>
                          <li>Payment reference number</li>
                          <li>Invoice with payment instructions</li>
                        </ul>
                      </div>
                    )}
                    {selectedPaymentMethod === 'card-payment' && (
                      <p>You will be redirected to our secure payment gateway to complete your card payment.</p>
                    )}
                    {selectedPaymentMethod === 'paypal' && (
                      <p>You will be redirected to PayPal to complete your payment securely.</p>
                    )}
                    {selectedPaymentMethod === 'mobile-money' && (
                      <p>You will receive SMS instructions with mobile money payment details.</p>
                    )}
                    {selectedPaymentMethod === 'other-gateways' && (
                      <p>You will be provided with multiple payment gateway options to choose from.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!selectedPaymentMethod || isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                  !selectedPaymentMethod || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Submit Sponsorship Application'
                )}
              </motion.button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By submitting this application, you agree to our terms and conditions. 
                You will receive a confirmation email with payment instructions and next steps.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need assistance with your sponsorship? Contact us at{' '}
            <a href="mailto:partnerships@nesa.africa" className="text-yellow-600 hover:text-yellow-700 font-medium">
              partnerships@nesa.africa
            </a>
            {' '}or call{' '}
            <a href="tel:+234-907-962-1110" className="text-yellow-600 hover:text-yellow-700 font-medium">
              +234-907-962-1110
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}