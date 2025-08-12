import React from "react";
import Button from "../Button";
import { poppins } from "@/lib/utils/font";
import Countdown, { CountdownRendererFn } from "react-countdown";

const Completionist = () => <span>Launch date!</span>;

const renderer: CountdownRendererFn = ({ hours, minutes, completed, days }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <>
        <div
          className={`md:text-9xl text-7xl font-bold flex gap-4 justify-center bg-gradient-to-r from-[#febf44] to-[#ed9d19] bg-clip-text text-transparent ${poppins.className}`}
        >
          <div className="space-y-1 text-center">
            <p>{days}</p>
            <p className="text-lg">Days</p>
          </div>

          <span>:</span>

          <div className="space-y-1 text-center">
            <p>{hours}</p>
            <p className="text-lg">Hours</p>
          </div>

          <span>:</span>

          <div className="space-y-1 text-center">
            <p>{minutes}</p>
            <p className="text-lg">Mins</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button text="Get your Ticket" variant="filled" />
        </div>
      </>
    );
  }
};

const CountdownTimer = () => {
  return (
    <div className="space-y-8 -mt-10 md:mt-0">
      <Countdown date={new Date(2024, 11, 30)} renderer={renderer} zeroPadTime={2} />
    </div>
  );
};

export default CountdownTimer;
