'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiDownload, FiMail, FiCalendar, FiArrowRight, FiHome } from 'react-icons/fi';
import { SponsorFormData } from './SponsorFormWrapper';
import Link from 'next/link';

export default function SuccessStep({
  formData
}: {
  formData: SponsorFormData;
}) {
  const { selectedPlan, company_name, name, email } = formData;

  const nextSteps = [
    {
      icon: FiMail,
      title: 'Check Your Email',
      description: 'Payment instructions and invoice have been sent to your email address.',
      timeframe: 'Within 5 minutes'
    },
    {
      icon: FiCalendar,
      title: 'Payment Processing',
      description: 'Complete your payment using the provided instructions.',
      timeframe: 'Within 7 days'
    },
    {
      icon: FiCheck,
      title: 'Confirmation & Benefits',
      description: 'Receive your sponsorship certificate and benefit activation.',
      timeframe: '1-3 business days after payment'
    }
  ];

  const benefits = selectedPlan ? [
    'Digital Certificate of Social Impact',
    'Recognition on nesa.africa website',
    'Sponsor Profile in NESA Annual Report',
    'Digital badges for website & social media',
    ...selectedPlan.details.slice(0, 3)
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-24">
      <div className="max-w-4xl mx-auto p-6">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheck className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Sponsorship!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your sponsorship application has been successfully submitted.
          </p>
          <p className="text-gray-500">
            Application ID: <span className="font-mono font-semibold">NESA-{Date.now().toString().slice(-8)}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sponsorship Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Sponsorship Details</h2>
            
            {selectedPlan && (
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${selectedPlan.color} text-white mr-4`}>
                    <selectedPlan.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedPlan.name}</h3>
                    <p className="text-gray-600">{selectedPlan.badge}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      ${selectedPlan.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Your Benefits Include:</h4>
                  <div className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-4 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Contact Information:</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Company:</strong> {company_name}</p>
                <p><strong>Contact Person:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Happens Next?</h2>
            
            <div className="space-y-6">
              {nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <step.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">{step.description}</p>
                    <p className="text-xs text-blue-600 font-medium">{step.timeframe}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Important Deadlines:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Sponsorship Confirmation: November 31, 2025</li>
                <li>• Nominee Endorsement Rights: September 20, 2025</li>
                <li>• Exhibitor Slot Confirmation: November 15, 2025</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FiDownload className="w-5 h-5 mr-2" />
            Download Application Copy
          </button>
          
          <Link href="/sponsorship" className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <FiArrowRight className="w-5 h-5 mr-2" />
            View All Sponsorship Options
          </Link>
          
          <Link href="/" className="flex items-center justify-center px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
            <FiHome className="w-5 h-5 mr-2" />
            Return to Home
          </Link>
        </motion.div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our sponsorship team is here to assist you throughout the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:partnerships@nesa.africa" 
              className="flex items-center justify-center px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium"
            >
              <FiMail className="w-4 h-4 mr-2" />
              partnerships@nesa.africa
            </a>
            <a 
              href="tel:+234-907-962-1110" 
              className="flex items-center justify-center px-4 py-2 text-yellow-600 hover:text-yellow-700 font-medium"
            >
              <FiCalendar className="w-4 h-4 mr-2" />
              +234-907-962-1110
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}