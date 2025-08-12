
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface StarRatingProps {
  onRate: (rating: number) => void;
  rating: number;
}

export default function StarRating({ onRate, rating }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-row">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              className="hidden"
              onClick={() => onRate(currentRating)}
            />
            <Image
              src={currentRating <= (hover || rating) ? '/images/star-filled.png' : '/images/star-empty.png'}
              alt="star"
              width={50}
              height={50}
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  )}