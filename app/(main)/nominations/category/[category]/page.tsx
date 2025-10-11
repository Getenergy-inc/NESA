'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Award, MapPin, Building, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface Nominee {
  _id: string;
  fullName: string;
  organizationName?: string;
  country: string;
  region: string;
  awardCategory: string;
  subcategory: string;
  achievementSummary: string;
  impactMetrics: string;
  sdgAlignment: string[];
  profileImageUrl?: string;
  dateCreated: string;
}

export default function CategoryNomineesPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);
  
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);

  useEffect(() => {
    fetchNominees();
  }, [category]);

  const fetchNominees = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/nominations/by-category?category=${encodeURIComponent(category)}`);
      const data = await response.json();
      
      if (data.success) {
        setNominees(data.data.nominees);
      }
    } catch (error) {
      console.error('Error fetching nominees:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-[#ea580c]" />
            <h1 className="text-3xl font-bold text-gray-900">{category}</h1>
          </div>
          <p className="text-gray-600">
            Discover outstanding nominees in this category who are making a difference in African education
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium">{nominees.length}</span> nominees in this category
          </div>
        </div>

        {/* Nominees Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea580c] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading nominees...</p>
          </div>
        ) : nominees.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Nominees Yet</h3>
            <p className="text-gray-600">Be the first to nominate someone in this category!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nominees.map((nominee) => (
              <div
                key={nominee._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedNominee(nominee)}
              >
                {/* Profile Image */}
                <div className="h-48 bg-gradient-to-br from-[#ea580c] to-[#dc2626] relative">
                  {nominee.profileImageUrl ? (
                    <Image
                      src={nominee.profileImageUrl}
                      alt={nominee.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Award className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{nominee.fullName}</h3>
                  
                  {nominee.organizationName && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Building className="w-4 h-4" />
                      <span>{nominee.organizationName}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{nominee.country}</span>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {nominee.subcategory}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                    {nominee.achievementSummary}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNominee(nominee);
                    }}
                    className="w-full bg-[#ea580c] hover:bg-[#dc2626] text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedNominee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                {/* Header Image */}
                <div className="h-64 bg-gradient-to-br from-[#ea580c] to-[#dc2626] relative">
                  {selectedNominee.profileImageUrl ? (
                    <Image
                      src={selectedNominee.profileImageUrl}
                      alt={selectedNominee.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Award className="w-24 h-24 text-white opacity-50" />
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedNominee(null)}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedNominee.fullName}</h2>
                  
                  {selectedNominee.organizationName && (
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Building className="w-5 h-5" />
                      <span className="text-lg">{selectedNominee.organizationName}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedNominee.country}, {selectedNominee.region}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {selectedNominee.subcategory}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#ea580c]" />
                        Achievement Summary
                      </h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedNominee.achievementSummary}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#ea580c]" />
                        Impact Metrics
                      </h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedNominee.impactMetrics}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">SDG Alignment</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedNominee.sdgAlignment.map((sdg, index) => (
                          <span key={index} className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            {sdg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedNominee(null)}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
