"use client";

import Image from "next/image";
import { GoDotFill } from "react-icons/go";

const VotingHeader = () => {
  return (
    <header
      className={`bg-[#17120a] min-h-[40rem] text-white z-[100] flex items-center pt-28 md:pt-10 relative bg-cover bg-center`}
      style={{ backgroundImage: "url('/images/VotingBgImg.png')" }}
    >
      <div className="container py-20 relative z-10">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#E48900] leading-tight">
            Vote For Your Champions For The NESA <br /> 2024 Awards
          </h1>
          <p className="w-[55%] md:leading-relaxed leading-loose tracking-wide text-lg">
            Your participation in voting for the nominees in these subcategories
            is crucial in deciding which outstanding contributors in the
            Nigerian education sector would be celebrated with the prestigious
            Blue Garnet Awards
          </p>

          <div className="mt-10">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white inline-block">
                How to Vote Your Champion
              </h2>
              <div className="h-1 w-28 bg-[#E48900] rounded-xl"></div>
            </div>
            <ul className="space-y-3 text-lg">
              <div className="flex items-center">
                <GoDotFill color="#FFC247" size={20} />
                <div>Visit NESA AFRICA Voting Page</div>
              </div>
              <div className="flex items-center">
                <GoDotFill color="#FFC247" size={20} />
                <div>
                  Acquire or Purchase voting points by funding your wallet
                </div>
              </div>
              <div className="flex items-center">
                <GoDotFill color="#FFC247" size={20} />
                <div>Fund your wallet by......</div>
              </div>
              <div className="flex items-center">
                <GoDotFill color="#FFC247" size={20} />
                <div>
                  Choose your preferred award category, which usually has
                  subcategories
                </div>
              </div>
              <div className="flex items-center">
                <GoDotFill color="#FFC247" size={20} />
                <div>Select your preferred nominee</div>
              </div>
              <div className="flex items-center">
                <GoDotFill color="#FFC247" size={20} />
                <div>Vote for your champion</div>
              </div>
              <div className="flex items-center">
                <GoDotFill color="#FFC247" size={20} />
                <div>
                  Wait for an on-screen confirmation message acknowledging
                  successful Voting
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VotingHeader;
