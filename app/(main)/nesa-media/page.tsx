import { raleway } from "@/lib/utils/font";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <header className="md:min-h-[35rem] min-h-screen relative">
        <Image
          src={"/images/bg/media-bg.jpg"}
          alt={"background"}
          width={1024}
          height={800}
          className="w-full h-full object-cover absolute top-0 left-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center pt-10">
          <div className="space-y-5 text-white md:max-w-4xl container mx-auto text-center mt-5">
            <h1 className={`${raleway.className} font-bold md:text-5xl text-4xl text-deepGold`}>NESA MEDIA</h1>
            <div className="flex items-center gap-4 justify-center">
              {["CATEGORIES VIDEOS", "STREETS OF AFRICA", "PICTURES"].map((_, id) => (
                <button key={id} className="px-5 py-2 rounded-xl border">
                  {_}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-3xl">ABOUT CATEGORIES</h2>

            <p className="font-bold text-deepGold">SEE MORE</p>
          </div>

          <div className="mt-2 grid md:grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, id) => (
              <div key={id} className="grid items-center bg-[#fff5e0] rounded-lg overflow-hidden">
                <div className="md:max-h-[25rem] max-h-[18rem] overflow-hidden">
                  <Image
                    src={`/images/media/${id >= 4 ? 1 : id + 1}.png`}
                    alt="image"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 p-8">
                  <p className="text-xl font-bold">
                    CATEGORY {id + 1}: <br />
                    NGO Contributions to Education{" "}
                  </p>
                  <p className="line-clamp-5">
                    The NGO Educational Champion of the Decade Award is established to honor and recognize the pivotal
                    role of Nigerian indigenous NGOs and civil society organizations in championing the cause of
                    &apos;Education for All&apos;. The 2023 award cycle specifically acknowledges those entities that
                    have excelled in aligning with the objectives of civil society organizations, including continuous
                    learning, adult education, environmental education, and alignment with Sustainable Development Goals
                    (SDGs) in education.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 relative bg-black">
          <div className="container text-white py-10 space-y-8">
            <h3 className="font-bold text-center text-3xl">STREETS OF AFRICA</h3>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 md:gap-20 gap-12">
              {Array.from({ length: 6 }).map((_, id) => (
                <div
                  key={id}
                  className="items-center space-y-2 cursor-pointer duration-200 hover:-translate-y-2 bg-darkGold rounded-md overflow-hidden"
                >
                  <div className="md:max-h-[15rem] max-h-[10rem] overflow-hidden">
                    <Image
                      src={`/images/media/${id >= 4 ? 1 : id + 1}.png`}
                      alt="image"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-center">NIGERIA: THE GIANT OF AFRICA DOCUMENTARY</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mt-16 space-y-8 relative">
          <h3 className="font-extrabold text-3xl text-center">MOMENTS IN PICTURES</h3>

          {/* left arrow */}
          <ChevronLeft className="cursor-pointer text-deepGold absolute top-[44%] -left-8" size={50} />

          {/* slides */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 lg:gap-10 md:gap-20 gap-12">
            {Array.from({ length: 4 }).map((_, id) => (
              <div
                key={id}
                className="items-center space-y-2 duration-200 group ring ring-darkGold/10 rounded-md overflow-hidden hover:ring-deepGold"
              >
                <div className="md:max-h-[15rem] max-h-[10rem] overflow-hidden rounded-md">
                  <Image
                    src={`/images/media/${
                      id >= 4 ? [1, 2, 3, 4][Math.floor(Math.random() * [1, 2, 3, 4].length)] : id + 1
                    }.png`}
                    alt="image"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 duration-200"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* right arrow */}
          <ChevronRight className="cursor-pointer text-deepGold absolute top-[44%] -right-8" size={50} />

          {/* indicators */}
          <div className="flex items-center gap-2 justify-center mt-5">
            {Array.from({ length: 4 }).map((_, id) => (
              <div
                key={id}
                className={`w-2 h-2 rounded-full duration-200 border ${
                  id === 2 ? "bg-deepGold border-deepGold px-3" : "bg-transparent border-darkGold/50"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
