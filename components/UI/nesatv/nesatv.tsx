"use client";
import { useState } from "react";
import useSlider from "@/lib/hooks/useSlide"; // your custom hook
import { categoryData } from "@/lib/data/categoryData"; // extract to separate file
import Image from "next/image";
import { motion } from "framer-motion";
import { opacityTrans } from "@/lib/utils/transitions";
import styles from "@/components/Common/Slide/style.module.scss";
import { extractYouTubeID } from "@/lib/utils/youtube";

interface LiveTVProps {
    activeCategory: {
      title: string;
      url: string;
    };
    setActiveCategory: (category: any) => void;
  }
  
  const LiveTV = ({
    activeCategory,
    setActiveCategory,
    categoryData
  }: {
    activeCategory: { title: string; url: string };
    setActiveCategory: (category: any) => void;
    categoryData: { title: string; url: string }[];
  }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments((prevComments) => [...prevComments, comment]);
      setComment("");
    }
  };
  const { ref, scrollLeft, scrollRight } = useSlider();
    
  return (
    <section className="w-full px-6 py-20 mt-1.5 sm:mt-1 max-w-7xl mx-auto">
      {/* Announcement */}
      <div className="z-10 text-white relative pb-10">
        <motion.div
          {...opacityTrans}
          transition={{ delay: 1, duration: 1.5 }}
          className={`container relative ${styles["scroll-con"]}`}
        >
          <motion.div
            {...opacityTrans}
            className={`space-x-3 border-y-[2.5px] overflow-hidden border-[#d9a53c] ${styles["head-scroll-con"]} bg-transparent`}
          >
            {new Array(3).fill(null).map((_, id) => (
              <p key={id} className={`py-1 ${styles["head-scroll-text"]}`}>
          <span className="text-sm text-center font-medium text-gray-800">
            <span className="text-[#F0B561] font-bold">NESA TV</span> <strong>ANNOUNCEMENT</strong> - Nomination Starts from March 15th, 2024 , Get ready to nominate your Education Champion!
          </span>
          </p>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Video Player */}
    <div className="relative mb-4 rounded-xl overflow-hidden bg-black aspect-video max-w-[640px] max-h-[398px] lg:min-h-[500px] mx-auto lg:min-w-[1100px] ">
      {/* "Live", view count and comment badge */}
      <div className="absolute top-3 left-3 text-xs bg-primaryGold text-black px-2 py-1 rounded-full z-10">
        Live 🔴
      </div>
      <div className="absolute top-3 left-20 text-xs bg-white text-black px-2 py-1 rounded-full z-10">
        👁 15.2K
      </div>
      <div className="absolute top-4 right-3 bg-primaryGold px-3 py-1 rounded-full text-sm font-medium z-10 inline-flex items-center gap-2">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="text-black font-poppins"
        >
          Comments 💬
        </button>
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-20">
            <div className="mb-3 flex items-center">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment();
                  }
                }}
                placeholder="Write a comment..."
                className="flex-1 border border-gray-300 rounded px-2 py-1 mr-2"
              />
              <button
                onClick={() => setShowDropdown(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                X
              </button>
            </div>
            <button
              onClick={handleAddComment}
              className="bg-primaryGold text-white px-3 py-1 rounded-lg text-sm w-full"
            >
              →
            </button>
            <div className="mt-3 max-h-32 overflow-y-auto">
              {comments.map((c, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-sm">Santos:</span>
                  <span className="text-sm">{c}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="relative w-full h-full">
        <iframe
          width="640"
          height="360"
          src={`${activeCategory.url}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full aspect-video rounded-xl"
        ></iframe>
      </div>
      {/* Video content */}
      <video className="w-full h-full object-cover" autoPlay muted loop controls>
        <source src="" type="video/mp4" />
      </video>
    </div>

      {/* Category Title */}
      <h2 className="text-lg font-semibold mt-6 mb-6 _under_border">
        {activeCategory.title}
      </h2>


      <div className="relative mt-4">

        <div
          ref={ref}
          className="flex overflow-x-auto gap-3 no-scrollbar px-10"
        >
          {categoryData.map((cat, idx) => (
            <div
              key={idx}
              className={`min-w-[200px] cursor-pointer p-2 rounded-lg border ${
                cat.title === activeCategory.title
                  ? "border-[#F0B561]"
                  : "border-white"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
<div className="relative aspect-video w-full rounded overflow-hidden bg-gray-900">
    <Image
        src="/images/nesa-mg.png" // Fallback image
        alt={`${cat.title} fallback thumbnail`}
        fill
        className="object-cover transition-opacity duration-300"
        style={{ opacity: 1 }}
        onLoadingComplete={(e) => {
            setTimeout(() => {
                e.src = extractYouTubeID(cat.url || "")
                    ? `https://img.youtube.com/vi/${extractYouTubeID(cat.url || "")}/hqdefault.jpg`
                    : "/images/nesa-mg.png"; // Fallback if YouTube ID is invalid
            }, 3000); // Delay of 2 seconds
        }}
    />
</div>
              <p className="text-xs text-center mt-2 font-medium leading-tight">{cat.title}</p>
            </div>
          ))}
        </div>


         {/* Scroll Feature */}
         <div className="relative bottom-0 inset-x-0 flex items-center justify-between mx-12 ">

            {/* Dots */}
            <div className="flex items-center space-x-2 ">
              {Array.from({ length: categoryData.length }).map((_, id) => (
            <div
                key={id}
                className={`w-3 h-3  rounded-full cursor-pointer ${id===0 ? "bg-primaryGold" : "bg-gray-300"}`}
            ></div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-black shadow-lg hover:bg-gray-800 transition"
                  >
                <span className="material-icons">←</span>
                </button>
                <button
                    onClick={scrollRight}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#F0B561] text-white shadow-lg hover:bg-gray-200 transition"
                      >
                    <span className="material-icons">→</span>
              </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default LiveTV;
