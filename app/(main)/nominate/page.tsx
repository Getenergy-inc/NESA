'use client';

import { useSearchParams } from 'next/navigation';
import PublicNominationForm from '@/components/UI/nomination/PublicNominationForm';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle } from 'lucide-react';

const PublicNominatePage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nominate a Changemaker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Know someone making a difference in African education? Nominate them for the NESA-Africa 2025 Awards.
          </p>
          
          <div
            className="mx-auto mt-4"
            style={{
              height: '4px',
              width: '150px',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
            }}
          />
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-lg p-6 shadow-md">
            <Award className="w-10 h-10 text-[#ea580c] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Recognize Excellence</h3>
            <p className="text-gray-600 text-sm">
              Help us identify and celebrate outstanding contributions to African education.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <Users className="w-10 h-10 text-[#ea580c] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600 text-sm">
              Your nomination helps build a comprehensive database of education champions.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <CheckCircle className="w-10 h-10 text-[#ea580c] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Expert Review</h3>
            <p className="text-gray-600 text-sm">
              All nominations are reviewed by our team and expert judges panel.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PublicNominationForm
            initialCategory={category || undefined}
            initialSubcategory={subcategory || undefined}
          />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-lg p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Who can nominate?</h3>
              <p className="text-gray-600">
                Anyone can nominate! Whether you're an educator, student, colleague, or community member,
                we welcome your nominations for deserving individuals and organizations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens after I submit?</h3>
              <p className="text-gray-600">
                Your nomination will be reviewed by our team. We may contact you for additional information.
                Approved nominations will be added to our database and reviewed by our expert judges panel.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I nominate multiple people?</h3>
              <p className="text-gray-600">
                Yes! You can submit multiple nominations. However, we have a limit of 3 submissions per hour
                to prevent spam and ensure quality.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do I need to register?</h3>
              <p className="text-gray-600">
                No registration required for public nominations. However, if you'd like to become an NRC volunteer
                and earn AGC rewards for your contributions, you can register separately.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicNominatePage;
