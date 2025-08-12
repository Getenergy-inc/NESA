import Image from "next/image";


interface SlideImageProps {
  src: string;
  alt?: string;
}

const SlideImage2: React.FC<SlideImageProps> = ({ src, alt = "" }) => {
  return (
    <div className="flex h-screen">
      {/* Left half: Text */}
      <div className="w-1/2 flex flex-col justify-center text-white px-4">
                <div className="flex flex-col justify-center items-center">
                  <div className="mb-4 mt-10">
                    <Image src={"/images/nesa-mg.png"} alt="logo image" width={220} height={220} />
                  </div>
                  <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
                    East Africa
                  </h1>
                </div>
        <h1 className="text-lg leading-tight text-justify-center">
          Nominate your Heroes to celebrate the Excellence and Impacts of Education across East-Africa
        </h1>
      </div>

      {/* Right half: Image */}
      <div className="w-4/5 relative">
        <Image 
          src={src} 
          alt={alt} 
          fill
          className="object-cover"
          priority 
        />
      </div>
    </div>
  );
};

export default SlideImage2;
