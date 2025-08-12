import { Career, CareerCategory } from "@/lib/data/careers";
import Image from "next/image";

const CareerCategoryHeader: React.FC<CareerCategory | undefined> = (category) => {
  if (!category) return null;

  const { image, title, description } = category;

  return (
    <header className="relative">
      {/* <Image
        src={"/images/join/join_us_hero.png"}
        alt="hero image"
        width={1024}
        height={800}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className={`md:min-h-[35rem] min-h-screen text-white relative flex items-center`}>
        <div className="container text-center md:mt-10">
          <div className="space-y-5 max-w-4xl mx-auto">
            <h1 className="font-bold md:text-5xl text-4xl text-deepGold">{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div> */}
      <div className="w-full md:min-h-[35rem] min-h-screen grid xl:grid-cols-7 md:grid-cols-2">
        <div className="xl:col-span-4 relative">
          <Image
            src={"/images/careers/header_.jpg"}
            alt="hero image"
            width={1024}
            height={800}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-end">
            <h1 className="font-extrabold md:text-5xl text-4xl text-deepGold md:p-20 p-10">Careers @ NESA 2023</h1>
          </div>
        </div>

        <div className="xl:col-span-3 bg-[#1f1f20] px-16 flex items-center text-white md:pt-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CareerCategoryHeader;
