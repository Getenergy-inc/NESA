"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

interface Nominee {
  id: string;
  fullName: string;
  profileImageUrl: string | null;
  nominationCount: number;
  approvedNominationCount: number;
  awardCategory: string;
  subcategory: string;
  organization?: string;
  country?: string;
}

interface NomineeGalleryProps {
  awardCategory: string;
  subcategory?: string;
  title: string;
  description: string | React.ReactNode;
  overviewImage: string;
  onNominate?: (nominee: Nominee) => void;
}

/**
 * NomineeGallery - Reusable component for displaying nominees dynamically
 * Fetches nominees from /api/v1/nominees API endpoint
 * Displays nominees with pagination and nomination count progress
 */
const NomineeGallery: React.FC<NomineeGalleryProps> = ({
  awardCategory,
  subcategory,
  title,
  description,
  overviewImage,
  onNominate,
}) => {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalNominees, setTotalNominees] = useState(0);
  const router = useRouter();

  // Fetch nominees from API
  useEffect(() => {
    const fetchNominees = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams({
          category: awardCategory,
          ...(subcategory && { subcategory }),
          skip: "0",
          take: "20",
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/nominees?${queryParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch nominees: ${response.statusText}`);
        }

        const data = await response.json();
        setNominees(data.data?.data || []);
        setTotalNominees(data.data?.pagination?.total || 0);
      } catch (err) {
        console.error("Error fetching nominees:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load nominees. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNominees();
  }, [awardCategory, subcategory]);

  const allSlides = [
    {
      type: "overview",
      title,
      description,
      image: overviewImage,
    },
    ...nominees.map((nominee) => ({
      type: "nominee",
      nominee,
      title: nominee.fullName,
      description: nominee.organization || nominee.country || "Nominee",
      image: nominee.profileImageUrl || "/images/default-nominee.png",
    })),
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + allSlides.length) % allSlides.length
    );
  };

  const handleNominate = (nominee?: Nominee) => {
    if (onNominate && nominee) {
      onNominate(nominee);
    } else if (nominee) {
      // Redirect to nomination form with nominee info
      router.push(
        `/nominateform?nomineeId=${nominee.id}&awardCategory=${encodeURIComponent(
          awardCategory
        )}&subcategory=${encodeURIComponent(subcategory || "")}`
      );
    } else {
      // Redirect to nomination form without pre-filled nominee
      router.push(
        `/nominateform?awardCategory=${encodeURIComponent(
          awardCategory
        )}&subcategory=${encodeURIComponent(subcategory || "")}`
      );
    }
  };

  const currentSlide =
    allSlides[currentIndex] ||
    ({
      type: "overview",
      title,
      description,
      image: overviewImage,
    } as any);

  const isOverviewSlide = currentIndex === 0;
  const isNomineeSlide = currentSlide.type === "nominee";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Carousel */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-[600px] flex items-center justify-center bg-gray-200">
            {/* Slide Image */}
            {currentSlide.image && (
              <div className="absolute inset-0">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            )}

            {/* Content Overlay */}
            <div className="relative z-10 text-center text-white px-6 py-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {currentSlide.title}
              </h2>

              {!isNomineeSlide && (
                <div className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                  {typeof currentSlide.description === "string"
                    ? currentSlide.description
                    : currentSlide.description}
                </div>
              )}

              {isNomineeSlide && currentSlide.type === "nominee" && (
                <div className="space-y-4">
                  <p className="text-lg">{currentSlide.description}</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-200">Nominations</p>
                      <p className="text-3xl font-bold">
                        {(currentSlide as any).nominee.approvedNominationCount}
                      </p>
                    </div>
                    <div className="w-px h-12 bg-white/30" />
                    <div className="text-center">
                      <p className="text-sm text-gray-200">
                        Toward Certificate
                      </p>
                      <p className="text-3xl font-bold">
                        {Math.round(
                          ((currentSlide as any).nominee.approvedNominationCount / 10) *
                            100
                        )}
                        %
                      </p>
                    </div>
                  </div>

                  {(currentSlide as any).nominee.approvedNominationCount >= 10 && (
                    <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full inline-block text-sm font-semibold">
                      🏆 Certificate Earned
                    </div>
                  )}
                </div>
              )}

              {isOverviewSlide && (
                <button
                  onClick={() => handleNominate()}
                  className="mt-6 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
                >
                  Start Nominating
                </button>
              )}

              {isNomineeSlide && currentSlide.type === "nominee" && (
                <button
                  onClick={() => handleNominate((currentSlide as any).nominee)}
                  className="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
                >
                  Nominate This Person
                </button>
              )}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <IoMdArrowBack size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <IoMdArrowForward size={24} />
            </button>

            {/* Slide Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {allSlides.length}
            </div>
          </div>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
            <p className="mt-4 text-gray-600">Loading nominees...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error Loading Nominees</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Nominees Summary */}
        {!loading && nominees.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold mb-4">
              Current Nominees ({totalNominees})
            </h3>

            {/* Nominees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nominees.map((nominee) => (
                <div
                  key={nominee.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Nominee Image */}
                  <div className="relative h-48 bg-gray-200">
                    {nominee.profileImageUrl ? (
                      <Image
                        src={nominee.profileImageUrl}
                        alt={nominee.fullName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Nominee Info */}
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {nominee.fullName}
                    </h4>
                    {nominee.organization && (
                      <p className="text-sm text-gray-600 mb-2">
                        {nominee.organization}
                      </p>
                    )}
                    {nominee.country && (
                      <p className="text-sm text-gray-500 mb-3">
                        📍 {nominee.country}
                      </p>
                    )}

                    {/* Approval Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-gray-700">
                          Approvals
                        </span>
                        <span className="text-xs font-bold text-orange-600">
                          {nominee.approvedNominationCount}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (nominee.approvedNominationCount / 10) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Certificate Status */}
                    {nominee.approvedNominationCount >= 10 && (
                      <div className="mb-3 bg-yellow-50 border border-yellow-200 rounded px-2 py-1 text-center">
                        <p className="text-xs font-semibold text-yellow-800">
                          🏆 Certificate Earned
                        </p>
                      </div>
                    )}

                    {/* Nominate Button */}
                    <button
                      onClick={() => handleNominate(nominee)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold text-sm transition-colors"
                    >
                      Nominate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && nominees.length === 0 && !error && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <p className="text-gray-700 mb-4">
              No nominees yet for this category.
            </p>
            <button
              onClick={() => handleNominate()}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              Be the First to Nominate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NomineeGallery;
