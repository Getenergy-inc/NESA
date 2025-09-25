"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

const ReviewsAndComments = () => {
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      name: "Dr. Aminah Danjumah",
      organization: "Yeelen Education Project",
      rating: 4,
      comment: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community. Her innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change."
    },
    {
      id: 2,
      name: "Prof. Kwame Nkrumah",
      organization: "Pan-African Education Initiative",
      rating: 5,
      comment: "Exceptional work in bridging educational gaps. The nominee's efforts have not only improved literacy rates but also empowered entire communities through knowledge dissemination."
    },
    {
      id: 3,
      name: "Dr. Fatima Al-Fihri",
      organization: "Global Learning Outreach",
      rating: 4,
      comment: "Innovative approaches to distance learning have revolutionized access to education in remote areas. The nominee's dedication to inclusive education is truly commendable."
    },
    // Add more reviews as needed
  ];

  const totalPages = 4; // Always 4 dots

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white p-4 sm:p-8 w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-1">Reviews and Comments</h2>
      <div className="w-20 sm:w-24 h-1 bg-yellow-400 mb-4 sm:mb-8"></div>
      
      <div className="mb-6 sm:mb-8 text-center">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Rate Nominee</h3>
        <div className="flex justify-center">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`text-3xl sm:text-5xl mx-1 sm:mx-2 ${index < rating ? 'text-yellow-400' : 'text-gray-200'}`}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Judges Comments</h3>
        <div className="flex items-center mb-4">
          <Image src="/images/smallprofile.png" alt="Judge" width={40} height={40} className="rounded-full mr-3 sm:mr-4" />
          <div>
            <p className="font-bold text-sm sm:text-base">Dr. Aminah Danjumah</p>
            <p className="text-xs sm:text-sm text-gray-600">Yeelen Education Project</p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-3 sm:p-4 bg-[#FFF8E7] rounded-lg mb-4 sm:mb-6">
          <p className="text-gray-400 text-sm sm:text-base">Add Comment</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.slice(currentPage * 2, (currentPage * 2) + 2).map((review) => (
            <div key={review.id} className="bg-[#FFF8E7] p-3 sm:p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Image src="/images/smallprofile.png" alt="Judge" width={40} height={40} className="rounded-full mr-3 sm:mr-4" />
                  <div>
                    <p className="font-bold text-sm sm:text-base">{review.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{review.organization}</p>
                  </div>
                </div>
                <div>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-sm sm:text-base ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} inline-block`} />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6 sm:mt-8">
        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentPage ? 'bg-yellow-400' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
        <div className="flex space-x-2">
          <button onClick={handlePrevious} className="bg-gray-200 p-2 rounded-lg text-sm sm:text-base">&larr;</button>
          <button onClick={handleNext} className="bg-yellow-400 p-2 rounded-lg text-sm sm:text-base">&rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndComments;