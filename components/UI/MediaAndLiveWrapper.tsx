// components/MediaAndLiveWrapper.tsx
"use client";

import { useState } from "react";
import MediaSection from "./nesatv/nesatvmedia";
import LiveTV from "./nesatv/nesatv";
import { mediaData as rawMediaData } from "@/lib/data/mediaData";
import { categoryData as rawCategoryData } from "@/lib/data/categoryData";

const categoryData = rawCategoryData.map((category) => ({
  ...category,
  url: category.url || "", // Ensure url is always a string
}));

const mediaData = rawMediaData.map((media) => ({
  title: media.title,
  url: media.videoUrl, // Map videoUrl to url
  description: media.description || "", // Ensure description is always a string
}));

const MediaAndLiveWrapper = () => {
    const [activeCategory, setActiveCategory] = useState(() => ({
        ...categoryData[0],
        url: categoryData[0].url || "", // Ensure url is always a string
    })); // Default live content
  
    return (
      <div>
        <LiveTV
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categoryData={categoryData} // this is LiveTV's own
        />
        <MediaSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          mediaData={mediaData} // this is MediaSection's own
        />
      </div>
    );
  };
  
export default MediaAndLiveWrapper;
