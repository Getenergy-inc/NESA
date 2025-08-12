"use client";
import Image from 'next/image';

const JudgeProfile = () => {
  return (
    <div className="bg-[#FFF8E7] min-h-screen flex flex-col">
      {/* Header Image */}
      <div className="relative w-full h-[200px]">
        <Image
          src="/images/hero.jpeg" 
          alt="Header"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191307CC] to-[#191307AA]" />
      </div>

      {/* Main Content */}
      <div className="px-4 relative w-full flex justify-center flex-grow">
        {/* Profile Picture */}
        <div className="absolute -top-16 w-full max-w-5xl mx-auto px-4">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <Image
              src="/images/profilepic.png" 
              alt="Profile Picture"
              fill
              className="rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Nominee Information */}
        <div className="pt-24 sm:pt-32 flex flex-col items-start w-full max-w-5xl">
          <h1 className="text-2xl font-bold mb-1"><strong>Mr Joseph Johnson</strong></h1>
          <h2 className="text-md text-gray-700 mb-4">Brothers Building Futures (BBF)</h2>
          
          <h3 className="text-lg mb-2">Bio:</h3>
          <p className="mb-4">dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.</p>
          
          <h3 className="text-lg mb-2">Achievements:</h3>
          <p className="mb-4">
  dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She also partnered with the Ministry of Education to implement Yeelen&apos;s innovative after-school program in 10 public schools, improving standardized test scores by an average of 20%.
</p>

          <h3 className="text-lg mb-2">Certificates</h3>
          <div className="flex space-x-4 mb-4">
            <Image src="/images/certificate1.png" alt="Certificate 1" width={100} height={100} />
            <Image src="/images/certificate2.png" alt="Certificate 2" width={100} height={100} />
            <Image src="/images/certificate1.png" alt="Certificate 3" width={100} height={100} />
          </div>
          
          <h3 className="text-lg font-bold mb-2">Images and videos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            <div className="relative">
              <Image src="/images/video1.png" alt="Video 1" width={150} height={150} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-2">
                  {/* Add play icon here */}
                </div>
              </div>
            </div>
            <Image src="/images/image1.png" alt="Image 1" width={150} height={150} />
            <Image src="/images/image2.png" alt="Image 2" width={150} height={150} />
            <Image src="/images/image3.png" alt="Image 3" width={150} height={150} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeProfile;