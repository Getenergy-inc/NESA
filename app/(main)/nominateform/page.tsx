'use client'
import { useSearchParams } from 'next/navigation'
import PublicNominationForm from '@/components/UI/nomination/PublicNominationForm';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getCategoryValue, getSubcategoryValue } from '@/lib/utils/categoryMapping';

export default function NominateFormPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryTitle = searchParams.get('title') || '';
  const categoryDescription = searchParams.get('description') || '';
  const categoryImage = searchParams.get('image') || '';
  const type = searchParams.get('type') || '';

  // Try to map the title to our category values
  const categoryValue = getCategoryValue(categoryTitle);
  const subcategoryValue = getSubcategoryValue(categoryTitle);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[#191307] text-white py-16 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: categoryImage ? `url(${categoryImage})` : "url('/images/nominatehero.jpeg')" }}
        ></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#FFC247] hover:text-[#E48900] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="mb-4">
            <span className="text-[#FFC247] text-sm font-medium">{type}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#FFC247] mb-4">
            {categoryTitle || 'Nominate a Changemaker'}
          </h1>
          {categoryDescription && (
            <p className="text-gray-300 max-w-3xl text-lg">
              {categoryDescription}
            </p>
          )}

          <div
            className="mt-6"
            style={{
              height: '4px',
              width: '150px',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
            }}
          />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <Award className="w-10 h-10 text-[#ea580c] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Recognize Excellence</h3>
            <p className="text-gray-600 text-sm">
              Help us identify and celebrate outstanding contributions to African education.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <Users className="w-10 h-10 text-[#ea580c] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600 text-sm">
              Your nomination helps build a comprehensive database of education champions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <CheckCircle className="w-10 h-10 text-[#ea580c] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Expert Review</h3>
            <p className="text-gray-600 text-sm">
              All nominations are reviewed by our team and expert judges panel.
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PublicNominationForm
            initialCategory={categoryValue}
            initialSubcategory={subcategoryValue}
            categoryTitle={categoryTitle}
            subcategoryTitle={categoryTitle}
          />
        </motion.div>
      </div>
    </div>
  );
}
