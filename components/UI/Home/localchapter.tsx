import Image from "next/image";
import Link from "next/link";

const LocalChapterSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-10 px-4 bg-[#fdf6e3]">
      <h2 className="text-2xl font-semibold text-center text-[#333333] mb-2">
        Join a Local Chapter
      </h2>
      
      <p className="text-sm text-center text-[#333333] max-w-md mb-8">
        Expand the reach of NESA Africa! Join or start a local chapter in your region to support education initiatives.
      </p>
      
      <div className="relative w-full max-w-4xl h-[200px] md:h-[300px] mb-8">
        <Image 
          src="images/localmap.png" 
          alt="World map with chapter locations" 
          fill
          className="object-contain"
          priority
        />
      </div>
      
      <Link href="/ambassador">
        <button className="px-6 py-2 rounded bg-[#f0b64d] text-[#333333] font-medium hover:bg-[#e0a63d] transition-colors">
          join a Local Chapter
        </button>
      </Link>
    </div>
  );
};

export default LocalChapterSection;