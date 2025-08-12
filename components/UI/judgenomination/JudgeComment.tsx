'use client';

import React from 'react';
import Image from 'next/image';

interface CommentProps {
  id: number;
  name: string;
  title: string;
  comment: string;
  imageURL: string;
  rating: number;
}

interface ReviewCardProps {
  comment: CommentProps;
}

const CommentCard: React.FC<ReviewCardProps> = ({ comment }) => {
  return (
    <div className="bg-[#FFF5E0] rounded-[10px] w-full max-w-[575px] h-auto p-4 sm:p-6 md:p-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap justify-between items-start gap-4">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={comment.imageURL}
              alt={comment.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-sm sm:text-base font-medium">{comment.name}</h1>
              <p className="text-xs sm:text-sm font-light">{comment.title}</p>
            </div>
          </div>
          <div className="flex flex-row ml-auto">
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                src={index < comment.rating ? '/images/star-filled.png' : '/images/star-empty.png'}
                alt="Star"
                width={20}
                height={20}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm sm:text-base font-light">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;