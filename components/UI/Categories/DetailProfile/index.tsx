import Button from "@/components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCard = ({ key, data }: { key: any; data: any }) => {
  return (
    <div
      key={key}
      className={`min-h-[20rem] rounded-[2.3rem] bg-[#191307] overflow-hidden text-white relative`}
    >
      <div className="px-6 py-6 w-full h-full">
        <div className="flex flex-col justify-between gap-5 h-full">
          <div className="overflow-hidden rounded-xl h-[auto]">
            <Image
              src={"/images/join/nominee.png"}
              alt="card cover"
              className="w-[100%] h-[auto]"
              width={360}
              height={180}
            />
          </div>

          <p className="text-[1.25rem] leading-[1.9rem] font-[500]">
            Mr Joseph Johnson
            <br />
            <span className="text-[0.75rem] leading-[1.125rem] font-[400]">
              Brothers Building Futures (BBF)
            </span>
          </p>

          <p className="text-[1rem] leading-[1.5rem] font-[500] line-clamp-4">
            Achievements:
            <br />
            <span className=" font-[400]">
              dedication to improving rural education, particularly for girls,
              demonstrates a significant impact on her community.
            </span>
          </p>

          <div>
            <Link href={`/judge/sub-category/nominees/nomineeId`}>
              <Button
                text="Review"
                fullWidth
                variant="filled"
                rounded="lg"
                size="medium"
                // onClick={() => ""}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
