"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import StarRating from "@/components/UI/StarRating/StarRating";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  MOCK_NOMINEES,
  MOCK_JUDGE,
  Judge,
  Review,
} from "../../data";
import CommentCard from "@/components/UI/judgenomination/JudgeComment";
import Button from "@/components/Common/Button";

// Simulating logged-in judge (picked the first one for demo)
const CURRENT_JUDGE: Judge = MOCK_JUDGE[0];

export default function NomineePage() {
  const params = useParams<{ id: string }>();
  const nomineeId = params.id;
  const nominee = MOCK_NOMINEES.find((n) => n.id === nomineeId);

  const [reviews, setReviews] = useState<Review[]>(nominee?.reviews || []);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

    const [selected, setSelected] = useState<"approve" | "reject" | null>(null);

  if (!nominee) {
    return <p className="p-6">Nominee not found</p>;
  }

  // Check if THIS judge has reviewed this nominee
  const existing = reviews.find(
    (r) => r.judgeId === CURRENT_JUDGE.id
  );

  // Preload existing review if available
  useEffect(() => {
    if (existing) {
      setRating(existing.rating);
      setComment(existing.comment || "");
    }
  }, [nomineeId]);

  const handleSubmit = () => {
    if (rating < 1 || comment == null ) {
      alert("Please rate the nominee and comment");
      return;
    }

    const newReview: Review = {
      id: existing ? existing.id : `r${Date.now()}`,
      judgeId: CURRENT_JUDGE.id,
      rating: rating,
      comment,
    };

    let updated: Review[];
    if (existing) {
      // Update existing review
      updated = reviews.map((r) =>
        r.judgeId === CURRENT_JUDGE.id ? newReview : r
      );
      alert("Review updated!");
    } else {
      // Add new review
      updated = [newReview, ...reviews];
      alert("Review submitted!");
    }

    // Update local state
    setReviews(updated);

    // Also update in MOCK_NOMINEES (so reviews stay tied to nominee)
    nominee.reviews = updated;
  };

// for the other judges review scrollbutton
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320; // how much to scroll per click
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=" flex flex-col gap-6">

      {/* Nominee info */}
      <div className="bg-[#FFF5DC] pb-[60px]">
        <div
          className="mb-[150px] md:mt-10"
          style={{
            backgroundImage: `url('/images/nomineeNav.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '200px',
          }}
        >
          <div className="flex flex-col  gap-6 pl-0 lg:pl-10 pt-28 lg:pt-28 items-center">
            <Image
              src={nominee.imageURL}
              alt={nominee.name}
              width={200}
              height={200}
              className="rounded-full object-cover w-[200px] h-[200px]"
            />

          </div>


        </div>

        <div className=" ml-10 mr-10 mt-20 flex flex-col space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-[30px] font-semibold">{nominee.name}</h1>
              <p className="text-[20px] font-normal">{nominee.title}</p>
            </div>

          <div className="flex flex-col gap-[4px]">
            <h1 className="text-[18px] font-bold mb-[10px]">Bio :</h1>
            <p className="text-[14px] font-normal">{nominee.bio}</p>
          </div>

          <div className="flex flex-col gap-[4px]">
            <h1 className="text-[18px] font-bold mb-[10px]">Achievements:</h1>
            <p className="text-[14px] font-normal">{nominee.achievements}</p>
          </div>

          <div className="flex flex-col gap-[4px]">
            <h1 className="text-[20px] font-bold mb-[20px]">Certificates</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              <Image
                src="/images/certificate1.png"
                alt={nominee.name}
                width={200}
                height={200}
              />
              <Image
                src="/images/certificate2.png"
                alt={nominee.name}
                width={200}
                height={200}
              />
              <Image
                src="/images/certificate1.png"
                alt={nominee.name}
                width={200}
                height={200}
              />
            </div>
          </div>

          <div>
            <h1 className="text-[20px] font-bold mb-[20px]">Images and Videos</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              <Image
                src="/images/video1.png"
                alt={nominee.name}
                width={200}
                height={200}
              />
              <Image
                src="/images/nomineeInfoImg.png"
                alt={nominee.name}
                width={200}
                height={200}
              />
              <Image
                src="/images/nomineeInfoImg1.png"
                alt={nominee.name}
                width={200}
                height={200}
              />
              <Image
                src="/images/nomineeInfoImg2.png"
                alt={nominee.name}
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Review section */}
      <div className="p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center sm:text-left mb-10 ">Submit Your Review</h2>

        <div className="flex flex-col items-center mb-20">
          <StarRating rating={rating} onRate={(val) => setRating(val)} />
        </div>



        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your justification..."
          rows={4}
          className="w-full border rounded-lg p-3 text-sm mb-10"
        />

              {/* ✅ Approve & Reject buttons */}
      <div className="flex justify-center gap-4 mb-20">
        <button
        className="mt-4 text-black py-2 px-4 rounded-lg border hover:bg-green-600 transition-colors cursor-pointer"
      >
        Approve
      </button>
        <button className="mt-4 text-black py-2 px-4 rounded-lg border hover:bg-red-600 transition-colors cursor-pointer">
          Reject
        </button>
      </div>




        <button
          onClick={handleSubmit}
          className="bg-[#FFA500]  text-sm font-bold py-4 px-8 rounded-3xl hover:bg-[#FFB52E] mx-auto block"
        >
          {existing ? "Update Review" : "Submit Review"}
        </button>

        {existing && (
          <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium">Your Previous Review:</h4>
            <p>
              {existing.rating}★ 
            </p>
            <p>
              {existing.comment}
            </p>
          </div>
        )}
      </div>
      </div>

{/* Other judges' reviews */}
    <div className="bg-gray-50 p-6 rounded-xl shadow relative">
      <h2 className="text-lg font-bold mb-4">Other Judges’ Reviews</h2>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-200 z-10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-200 z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
      >
        {nominee.reviews
          .filter((r) => r.judgeId !== CURRENT_JUDGE.id)
          .map((review) => {
            const judge = MOCK_JUDGE.find((j) => j.id === review.judgeId);
            const fullComment = {
              id: review.id,
              name: judge?.name || "Unknown Judge",
              title: judge?.title || "Judge",
              imageURL: judge?.imageURL || "/images/default.png",
              comment: review.comment,
              rating: review.rating,
            };
            return (
              <div key={review.id} className="min-w-[300px] max-w-[575px]">
                <CommentCard comment={fullComment} />
              </div>
            );
          })}
      </div>
    </div>


    </div>
  );
}
