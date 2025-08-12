"use client";

import Image from "next/image";
import { extractYouTubeID } from "@/lib/utils/youtube";

interface MediaSectionProps {
  activeCategory: {
    title: string;
    url: string;
  };
  setActiveCategory: (category: any) => void;
  mediaData: { title: string; url: string; description: string }[];
}

const MediaSection = ({
  activeCategory,
  setActiveCategory,
  mediaData,
}: MediaSectionProps) => {
  return (
    <section className="w-full px-6 py-12 bg-[#f5efe6] ">
      {/* Title and "See more" */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-lg font-semibold text-black">
          NESA Events and Media
        </h2>
        <a href="#" className="text-sm text-[#F0B561] hover:underline">
          See more &gt;
        </a>
      </div>

      <div className="flex flex-col gap-10">
        {mediaData.map((media, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-20 items-start cursor-pointer group"
            onClick={() => setActiveCategory(media)}
          >
            {/* Left: Black Card */}
            <div
              className={`w-full lg:w-1/4 md:w-1/2 rounded-xl bg-black overflow-hidden aspect-video relative border-2 transition-all ${
                media.url === activeCategory?.url
                  ? "border-[#F0B561]"
                  : "border-transparent"
              }`}
            >
              <Image
                src={
                  extractYouTubeID(media.url || "")
                    ? `https://img.youtube.com/vi/${extractYouTubeID(
                        media.url
                      )}/hqdefault.jpg`
                    : "/images/nesa-mg.png"
                }
                alt={media.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            {/* Right: Text */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-black mb-2 leading-tight">
                {media.title}
              </h3>
              <p className="text-sm text-gray-600">{media.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaSection;
