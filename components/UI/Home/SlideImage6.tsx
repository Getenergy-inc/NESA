import Image from "next/image";

interface SlideImageProps {
  src: string;
  alt?: string;
}

const SlideImage6: React.FC<SlideImageProps> = ({ src, alt = "" }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover" 
          priority
        />
      </div>
            {/* Text overlay in center */}
            <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-5xl px-4">
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4">
            <h1 className="text-4xl md:text-6xl leading-tight text-center text-white max-w-5xl">
          Nominate your Heroes to celebrate the Excellence and Impacts of Education across Africa from the diaspora
        </h1>
      </div>
      </div>
    </div>
    </div>
  );
};
export default SlideImage6;
