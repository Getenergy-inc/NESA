"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";  

const Refer = () => {
  const router = useRouter();
  return (
    <section className="bg-white py-16 text-center flex flex-col items-center justify-center relative ">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-[20px] md:text-[24px] font-semibold text-[#1E1E1E]">
          Refer a Friend to Nominate and get free Afri-gold Coin
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#1E1E1E]">
          Invite your friends and others to submit nominations and earn bonus AFRI-Gold Coins for <br />
          voting in the competitive categories!
        </p>

        <button onClick={() => router.push("/ProfileSetting/refer")} className="mt-6 bg-[#F7A500] hover:bg-[#e59b00] text-[11px] font-semibold text-black px-6 py-2 rounded transition duration-300">
          Refer a Friend
        </button>
      </div>
      <div className="max-h-[100%]">
        <Image
          src="/images/refer/pana.png"
          alt="Refer a Friend"
          className="w-full h-auto max-w-[400px] mx-auto mt-8"
          width={30}
          height={80}
          
        />
      </div>
    </section>
  );
};

export default Refer;
